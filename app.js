// Dados iniciais
let influencers = [];
let currentEditingId = null;
let selectedIds = new Set();
let isEditMode = false;
let editBackup = null; // Backup for cancel edit
const STORAGE_KEY = 'vslplay_influencers';
const COLUMN_SCHEMA_KEY = 'vslplay_column_schema';
let charts = {};
let pendingAction = null;
let columnSchema = [];
let carouselPosition = 0;
let generateMode = 'chart'; // 'chart' or 'stat'

// Authentication
const AUTH_KEY = 'vslplay_auth';
const VALID_CREDENTIALS = {
    email: 'admin@reidavsl.com',
    password: '#reidavsl1243#'
};

// Supabase Configuration
const SUPABASE_URL = 'https://ridztjcycoxqjiuwarvx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHp0amN5Y294cWppdXdhcnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MDU1NjIsImV4cCI6MjA4MDI4MTU2Mn0.p1QPJKfzCIn_ph7vITiuHSCLIqP79hyPXwtdJwYSftI';

let supabase = null;
let currentUser = null;
let useSupabase = false;

// Initialize Supabase client
function initSupabase() {
    try {
        if (window.supabase) {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            useSupabase = true;
            console.log('✅ Supabase initialized');
        } else {
            console.warn('⚠️ Supabase library not loaded, using localStorage');
            useSupabase = false;
        }
    } catch (error) {
        console.error('❌ Supabase initialization failed:', error);
        useSupabase = false;
    }
    updateConnectionStatus();
}

function updateConnectionStatus() {
    const statusEl = document.getElementById('connectionStatus');
    const dotEl = statusEl.querySelector('.status-dot');
    const textEl = statusEl.querySelector('.status-text');

    if (useSupabase && currentUser) {
        statusEl.className = 'connection-status status-online';
        textEl.textContent = 'Online (Supabase)';
        statusEl.title = `Conectado como ${currentUser.email}`;
    } else if (currentUser) {
        statusEl.className = 'connection-status status-offline';
        textEl.textContent = 'Local (Offline)';
        statusEl.title = 'Salvando apenas neste dispositivo';
    } else {
        statusEl.className = 'connection-status';
        textEl.textContent = 'Desconectado';
    }
}


// Elementos do DOM
const tableBody = document.getElementById('tableBody');
const tableHeadRow = document.querySelector('#influencersTable thead tr');
const importModal = document.getElementById('importModal');
const addInfluencerBtn = document.getElementById('addInfluencerBtn');
const importBtn = document.getElementById('importBtn');
const exportBtn = document.getElementById('exportBtn');
const closeImportBtn = document.getElementById('closeImportBtn');
const cancelImportBtn = document.getElementById('cancelImportBtn');
const confirmImportBtn = document.getElementById('confirmImportBtn');
const searchInput = document.getElementById('searchInput');
const csvFile = document.getElementById('csvFile');

// Advanced UX Elements
const toggleEditModeBtn = document.getElementById('toggleEditModeBtn');
const toggleChartsBtn = document.getElementById('toggleChartsBtn');
const dashboardContainer = document.getElementById('dashboardContainer');
const confirmationModal = document.getElementById('confirmationModal');
const confirmActionBtn = document.getElementById('confirmActionBtn');
const cancelConfirmBtn = document.getElementById('cancelConfirmBtn');
const confirmationMessage = document.getElementById('confirmationMessage');
const manageColumnsBtn = document.getElementById('manageColumnsBtn');
const columnManagementModal = document.getElementById('columnManagementModal');
const closeColumnManagementBtn = document.getElementById('closeColumnManagementBtn');
const cancelColumnManagementBtn = document.getElementById('cancelColumnManagementBtn');
const addColumnBtn = document.getElementById('addColumnBtn');
const newColumnName = document.getElementById('newColumnName');
const newColumnType = document.getElementById('newColumnType');
const columnsList = document.getElementById('columnsList');

// Bulk Actions Elements
const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
const bulkEditBtn = document.getElementById('bulkEditBtn'); // May be null if removed from HTML
const bulkEditModal = document.getElementById('bulkEditModal'); // May be null
const closeBulkEditBtn = document.getElementById('closeBulkEditBtn'); // May be null
const cancelBulkEditBtn = document.getElementById('cancelBulkEditBtn'); // May be null
const confirmBulkEditBtn = document.getElementById('confirmBulkEditBtn'); // May be null
const bulkFieldSelect = document.getElementById('bulkField'); // May be null
const bulkValueInput = document.getElementById('bulkValueInput'); // May be null
const bulkValueSelect = document.getElementById('bulkValueSelect'); // May be null

// Authentication Functions
function checkAuth() {
    const auth = localStorage.getItem(AUTH_KEY);
    if (auth) {
        try {
            const authData = JSON.parse(auth);
            if (authData.trusted && authData.email === VALID_CREDENTIALS.email) {
                return true;
            }
        } catch (e) {
            return false;
        }
    }
    return false;
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const trustDevice = document.getElementById('trustDevice').checked;

    // Try Supabase auth first
    if (useSupabase && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('❌ Supabase auth error:', error);
            alert('Erro: ' + error.message);
            return;
        }
        currentUser = data.user;
        console.log('✅ Logged in via Supabase:', currentUser.email);

        // Set local storage backup if trusted
        if (trustDevice) {
            localStorage.setItem(AUTH_KEY, JSON.stringify({ email, trusted: true, timestamp: Date.now() }));
        }

        document.getElementById('loginScreen').style.display = 'none';
        await initializeApp();
        return;
    }

    // Fallback
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        if (trustDevice) {
            localStorage.setItem(AUTH_KEY, JSON.stringify({ email, trusted: true, timestamp: Date.now() }));
        }
        currentUser = { id: 'local-user', email: email };
        console.log('✅ Logged in locally:', email);
        document.getElementById('loginScreen').style.display = 'none';
        await initializeApp();
    } else {
        alert('Credenciais inválidas!');
    }
}

async function logout() {
    if (useSupabase && supabase) await supabase.auth.signOut();
    localStorage.removeItem(AUTH_KEY);
    location.reload();
}

// Inicializar aplicação
// Inicializar aplicação
document.addEventListener('DOMContentLoaded', async () => {
    // Attach login listener IMMEDIATELY to prevent race conditions
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    initSupabase();

    // Check Supabase auth first
    if (useSupabase && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            currentUser = session.user;
            document.getElementById('loginScreen').style.display = 'none';
            await initializeApp();
            return;
        }
    }

    // Fallback to local auth
    if (checkAuth()) {
        document.getElementById('loginScreen').style.display = 'none';
        await initializeApp();
        return;
    }

    // If we get here, we are not logged in, and the login form is already ready.
});

async function initializeApp() {
    console.log('🚀 Initializing app...');
    updateConnectionStatus();
    loadColumnSchema();
    await loadData();
    setupEventListeners();
    initCharts();
    renderTable();
    updateStats();
    setupDragScroll();
    console.log('✅ App initialized');
}

// Number Normalization Functions
function parseAbbreviatedNumber(value) {
    if (typeof value === 'number') return value;
    if (!value) return 0;

    const str = String(value).toLowerCase().trim();

    // Remove spaces and commas
    const cleaned = str.replace(/[,\s]/g, '');

    // Check for millions
    if (cleaned.includes('m') || cleaned.includes('milhão') || cleaned.includes('milhões')) {
        const num = parseFloat(cleaned.replace(/[^\d.]/g, ''));
        return Math.round(num * 1000000);
    }

    // Check for thousands
    if (cleaned.includes('k') || cleaned.includes('mil')) {
        const num = parseFloat(cleaned.replace(/[^\d.]/g, ''));
        return Math.round(num * 1000);
    }

    // Return as number
    return parseFloat(cleaned) || 0;
}

function formatNumberAbbreviated(value) {
    const num = parseFloat(value);
    if (isNaN(num) || num === 0) return '0';

    if (num >= 1000000) {
        const formatted = (num / 1000000).toFixed(1);
        return formatted.replace('.0', '') + 'M';
    }
    if (num >= 1000) {
        const formatted = (num / 1000).toFixed(1);
        return formatted.replace('.0', '') + 'k';
    }
    return num.toString();
}


// DEFAULT COLUMN SCHEMA
function getDefaultColumnSchema() {
    return [
        { id: 'nome', label: 'Nome', type: 'text' },
        { id: 'perfil_ig', label: 'Instagram', type: 'url' },
        { id: 'youtube', label: 'YouTube', type: 'url' },
        { id: 'perfil_tiktok', label: 'TikTok', type: 'url' },
        { id: 'site', label: 'Site', type: 'url' },
        { id: 'email', label: 'Email', type: 'text' },
        { id: 'whatsapp', label: 'WhatsApp', type: 'text' },
        { id: 'nicho', label: 'Nicho', type: 'text' },
        { id: 'media_views', label: 'Média de Visualizações (últimos 10)', type: 'number' },
        { id: 'relevancia', label: 'Relevância', type: 'select', options: ['Baixa', 'Média', 'Alta'] },
        { id: 'contato_ig', label: 'Contato IG', type: 'select', options: ['Sim', 'Não'] },
        { id: 'teve_retorno', label: 'Teve Retorno', type: 'select', options: ['Sim', 'Não'] },
        { id: 'converteu', label: 'Converteu', type: 'select', options: ['Sim', 'Não'] }
    ];
}

function loadColumnSchema() {
    const stored = localStorage.getItem(COLUMN_SCHEMA_KEY);
    if (stored) {
        columnSchema = JSON.parse(stored);
    } else {
        columnSchema = getDefaultColumnSchema();
        saveColumnSchema();
    }
}

function saveColumnSchema() {
    localStorage.setItem(COLUMN_SCHEMA_KEY, JSON.stringify(columnSchema));
}

// Database Functions
async function loadData() {
    if (useSupabase && supabase && currentUser) {
        try {
            const { data, error } = await supabase.from('influencers').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            influencers = data || [];
            console.log(`✅ Loaded ${influencers.length} from Supabase`);
            updateConnectionStatus();
            return;
        } catch (error) {
            console.error('❌ Supabase load error:', error);
            // Don't fallback silently if we expected Supabase to work
            alert('Erro de conexão com o banco de dados. Verifique sua internet.');
        }
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    influencers = stored ? JSON.parse(stored) : [];
    console.log(`📦 Loaded ${influencers.length} from localStorage`);
    updateConnectionStatus();
}

async function saveData() {
    if (useSupabase && supabase && currentUser) {
        try {
            const dataToSave = influencers.map(inf => ({ ...inf, user_id: currentUser.id }));
            const { error } = await supabase.from('influencers').upsert(dataToSave, { onConflict: 'id' });
            if (error) throw error;
            console.log('✅ Saved to Supabase');
            return;
        } catch (error) {
            console.error('❌ Supabase save error:', error);
        }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(influencers));
    console.log('📦 Saved to localStorage');
}

async function deleteInfluencerFromDB(id) {
    if (useSupabase && supabase) {
        try {
            await supabase.from('influencers').delete().eq('id', id);
        } catch (error) {
            console.error('❌ Delete error:', error);
        }
    }
}


// Configurar event listeners
function setupEventListeners() {
    addInfluencerBtn.addEventListener('click', openAddInfluencerModal);
    importBtn.addEventListener('click', openImportModal);
    exportBtn.addEventListener('click', exportToExcel);
    closeImportBtn.addEventListener('click', closeImportModal);
    cancelImportBtn.addEventListener('click', closeImportModal);
    confirmImportBtn.addEventListener('click', handleImport);
    searchInput.addEventListener('input', handleSearch);

    // Add Influencer Modal
    document.getElementById('closeAddInfluencerBtn').addEventListener('click', closeAddInfluencerModal);
    document.getElementById('cancelAddInfluencerBtn').addEventListener('click', closeAddInfluencerModal);
    document.getElementById('confirmAddInfluencerBtn').addEventListener('click', confirmAddInfluencer);

    // Advanced UX Listeners
    toggleEditModeBtn.addEventListener('click', toggleEditMode);
    document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);
    toggleChartsBtn.addEventListener('click', toggleCharts);
    confirmActionBtn.addEventListener('click', executePendingAction);
    cancelConfirmBtn.addEventListener('click', closeConfirmationModal);

    // Generate Chart/Stat
    document.getElementById('generateChartBtn').addEventListener('click', openGenerateChartModal);
    document.getElementById('generateStatBtn').addEventListener('click', openGenerateStatModal);
    document.getElementById('closeGenerateChartBtn').addEventListener('click', closeGenerateChartModal);
    document.getElementById('cancelGenerateChartBtn').addEventListener('click', closeGenerateChartModal);
    document.getElementById('confirmGenerateChartBtn').addEventListener('click', confirmGenerateChart);

    // Column Management
    manageColumnsBtn.addEventListener('click', openColumnManagementModal);
    closeColumnManagementBtn.addEventListener('click', closeColumnManagementModal);
    cancelColumnManagementBtn.addEventListener('click', closeColumnManagementModal);
    addColumnBtn.addEventListener('click', addNewColumn);

    // Rename Column Modal
    document.getElementById('closeRenameColumnBtn').addEventListener('click', closeRenameColumnModal);
    document.getElementById('cancelRenameColumnBtn').addEventListener('click', closeRenameColumnModal);
    document.getElementById('confirmRenameColumnBtn').addEventListener('click', confirmRenameColumn);

    // Handle Enter key in rename input
    document.getElementById('renameColumnInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            confirmRenameColumn();
        }
    });

    // Bulk Delete (only)
    bulkDeleteBtn.addEventListener('click', () => {
        showConfirmationModal(`Tem certeza que deseja excluir ${selectedIds.size} itens?`, deleteSelected);
    });

    // Download Model Button
    document.getElementById('downloadModelBtn').addEventListener('click', downloadCSVModel);
}

// Carregar dados do localStorage
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
        influencers = JSON.parse(stored);
        // Ensure all influencers have all columns from schema
        influencers = influencers.map(inf => {
            const updated = { ...inf };
            columnSchema.forEach(col => {
                if (!(col.id in updated)) {
                    updated[col.id] = col.type === 'number' ? 0 : '';
                }
            });
            return updated;
        });
    } else {
        influencers = getDefaultData();
        saveData();
    }
}

function getDefaultData() {
    return [
        {
            id: 1,
            nome: "Cássio Hart",
            perfil_ig: "instagram.com/cassiohart",
            youtube: "https://www.youtube.com/@cassiohart/videos",
            perfil_tiktok: "",
            site: "",
            email: "",
            whatsapp: "",
            nicho: "",
            relevancia: "Média",
            contato_ig: "Não",
            teve_retorno: "Não",
            converteu: "Não"
        },
        {
            id: 2,
            nome: "Anna Clara",
            perfil_ig: "https://www.instagram.com/annalimax",
            youtube: "https://www.youtube.com/@descomplicads",
            perfil_tiktok: "",
            site: "https://descomplicads.com.br/",
            email: "",
            whatsapp: "",
            nicho: "",
            relevancia: "Média",
            contato_ig: "Não",
            teve_retorno: "Não",
            converteu: "Não"
        },
        {
            id: 3,
            nome: "Felipe Lona",
            perfil_ig: "",
            youtube: "https://www.youtube.com/@Lonamkt",
            perfil_tiktok: "",
            site: "",
            email: "",
            whatsapp: "",
            nicho: "",
            relevancia: "Média",
            contato_ig: "Não",
            teve_retorno: "Não",
            converteu: "Não"
        }
    ];
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(influencers));
}

// --- Column Management ---

function openColumnManagementModal() {
    renderColumnsList();
    columnManagementModal.classList.add('active');
}

function closeColumnManagementModal() {
    columnManagementModal.classList.remove('active');
    newColumnName.value = '';
    newColumnType.value = 'text';
}

function renderColumnsList() {
    columnsList.innerHTML = '';
    columnSchema.forEach((col, index) => {
        const item = document.createElement('div');
        item.className = 'column-item';
        item.draggable = true;
        item.dataset.index = index;

        const typeLabels = { text: 'Texto', number: 'Número', url: 'URL', select: 'Seleção' };

        item.innerHTML = `
            <div class="column-info">
                <span class="column-drag-handle">☰</span>
                <span class="column-name">${col.label}</span>
                <span class="column-type-badge">${typeLabels[col.type]}</span>
            </div>
            <div class="column-actions">
                <button class="icon-btn" onclick="renameColumn(${index})">✏️</button>
                <button class="icon-btn delete" onclick="confirmDeleteColumn(${index})">🗑️</button>
            </div>
        `;

        // Drag and drop listeners
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);

        columnsList.appendChild(item);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (draggedElement !== this) {
        const draggedIndex = parseInt(draggedElement.dataset.index);
        const targetIndex = parseInt(this.dataset.index);

        // Reorder schema
        const [removed] = columnSchema.splice(draggedIndex, 1);
        columnSchema.splice(targetIndex, 0, removed);

        saveColumnSchema();
        renderColumnsList();
        renderTable();
    }

    return false;
}

function handleDragEnd() {
    this.classList.remove('dragging');
}

function addNewColumn() {
    const name = newColumnName.value.trim();
    const type = newColumnType.value;

    if (!name) {
        alert('Digite um nome para a coluna');
        return;
    }

    const id = name.toLowerCase().replace(/\s+/g, '_');

    // Check if ID already exists
    if (columnSchema.find(col => col.id === id)) {
        alert('Já existe uma coluna com esse nome');
        return;
    }

    const newColumn = {
        id: id,
        label: name,
        type: type
    };

    if (type === 'select') {
        newColumn.options = ['Sim', 'Não'];
    }

    columnSchema.push(newColumn);

    // Add column to all influencers
    influencers = influencers.map(inf => ({
        ...inf,
        [id]: type === 'number' ? 0 : ''
    }));

    saveColumnSchema();
    saveData();
    renderColumnsList();
    renderTable();
    updateStats();

    // Auto-generate chart for numeric columns
    if (type === 'number') {
        initDynamicCharts();
        updateCharts();
    }

    newColumnName.value = '';
}

function confirmDeleteColumn(index) {
    const col = columnSchema[index];
    showConfirmationModal(`Tem certeza que deseja excluir a coluna "${col.label}"?`, () => deleteColumn(index));
}

function deleteColumn(index) {
    const col = columnSchema[index];

    // Remove from schema
    columnSchema.splice(index, 1);

    // Remove from all influencers
    influencers = influencers.map(inf => {
        const updated = { ...inf };
        delete updated[col.id];
        return updated;
    });

    saveColumnSchema();
    saveData();
    renderColumnsList();
    renderTable();
    updateStats();
}

let renameColumnIndex = null;

function renameColumn(index) {
    renameColumnIndex = index;
    const col = columnSchema[index];
    const renameInput = document.getElementById('renameColumnInput');
    renameInput.value = col.label;
    document.getElementById('renameColumnModal').classList.add('active');

    // Focus and select text
    setTimeout(() => {
        renameInput.focus();
        renameInput.select();
    }, 100);
}

function closeRenameColumnModal() {
    document.getElementById('renameColumnModal').classList.remove('active');
    renameColumnIndex = null;
}

function confirmRenameColumn() {
    if (renameColumnIndex === null) return;

    const newName = document.getElementById('renameColumnInput').value.trim();

    if (newName && newName.length > 0) {
        columnSchema[renameColumnIndex].label = newName;
        saveColumnSchema();
        renderColumnsList();
        renderTable();
        closeRenameColumnModal();
    } else {
        alert('Digite um nome válido para a coluna');
    }
}

// --- Advanced UX Functions ---

function toggleEditMode() {
    if (isEditMode) {
        // Exiting edit mode - show confirmation
        showConfirmationModal('Tem certeza que deseja concluir a edição? As alterações serão salvas.', finishEditMode);
    } else {
        // Entering edit mode
        isEditMode = true;
        editBackup = JSON.parse(JSON.stringify(influencers));
        toggleEditModeBtn.textContent = "✅ Concluir Edição";
        toggleEditModeBtn.classList.add('btn-primary');
        toggleEditModeBtn.classList.remove('btn-secondary');

        const cancelBtn = document.getElementById('cancelEditBtn');
        if (cancelBtn) cancelBtn.style.display = 'inline-block';

        manageColumnsBtn.style.display = 'inline-block';

        renderTable();
        updateBulkActionsUI();
    }
}

function finishEditMode() {
    isEditMode = false;
    editBackup = null;
    selectedIds.clear();

    toggleEditModeBtn.textContent = "✏️ Editar";
    toggleEditModeBtn.classList.remove('btn-primary');
    toggleEditModeBtn.classList.add('btn-secondary');

    const cancelBtn = document.getElementById('cancelEditBtn');
    if (cancelBtn) cancelBtn.style.display = 'none';

    manageColumnsBtn.style.display = 'none';

    renderTable();
    updateBulkActionsUI();
}

function cancelEdit() {
    if (editBackup) {
        showConfirmationModal('Tem certeza que deseja cancelar? Todas as alterações não salvas serão perdidas.', () => {
            influencers = JSON.parse(JSON.stringify(editBackup));
            editBackup = null;
            isEditMode = false;
            selectedIds.clear();

            toggleEditModeBtn.textContent = "✏️ Editar";
            toggleEditModeBtn.classList.remove('btn-primary');
            toggleEditModeBtn.classList.add('btn-secondary');

            const cancelBtn = document.getElementById('cancelEditBtn');
            if (cancelBtn) cancelBtn.style.display = 'none';

            manageColumnsBtn.style.display = 'none';

            saveData();
            renderTable();
            updateStats();
            updateBulkActionsUI();
        });
    }
}

function toggleCharts() {
    const statsBar = document.getElementById('statsBar');
    dashboardContainer.classList.toggle('collapsed');
    statsBar.classList.toggle('collapsed');

    const isCollapsed = dashboardContainer.classList.contains('collapsed');
    toggleChartsBtn.textContent = isCollapsed ? "📊 Mostrar Dados" : "📉 Ocultar Dados";
}

// Generate Custom Chart / Stat
let currentChartTab = 'custom';

function openGenerateChartModal() {
    generateMode = 'chart';
    document.querySelector('#generateChartModal h2').textContent = '📊 Gerar Novo Gráfico';
    document.getElementById('confirmGenerateChartBtn').textContent = 'Criar Gráfico';
    document.getElementById('nameInputLabel').textContent = 'Nome do Gráfico:';

    setupGenerateModal();
}

function openGenerateStatModal() {
    generateMode = 'stat';
    document.querySelector('#generateChartModal h2').textContent = '🔢 Gerar Novo Dado';
    document.getElementById('confirmGenerateChartBtn').textContent = 'Criar Dado';
    document.getElementById('nameInputLabel').textContent = 'Nome do Dado:';

    setupGenerateModal();
}

function setupGenerateModal() {
    const chartColumnSelect = document.getElementById('chartColumnSelect');
    chartColumnSelect.innerHTML = '';

    // Populate with available columns
    columnSchema.forEach(col => {
        const option = document.createElement('option');
        option.value = col.id;
        option.textContent = col.label;
        chartColumnSelect.appendChild(option);
    });

    // Update type options based on selected column
    updateChartTypeOptions();
    chartColumnSelect.onchange = updateChartTypeOptions; // Use onchange property to avoid duplicate listeners

    // Set up tab switching
    const customTab = document.getElementById('customChartTabBtn');
    const predefinedTab = document.getElementById('predefinedChartTabBtn');
    const customSection = document.getElementById('customChartSection');
    const predefinedSection = document.getElementById('predefinedChartSection');

    customTab.onclick = () => {
        currentChartTab = 'custom';
        customTab.classList.add('btn-primary');
        customTab.classList.remove('btn-secondary');
        predefinedTab.classList.remove('btn-primary');
        predefinedTab.classList.add('btn-secondary');
        customSection.style.display = 'block';
        predefinedSection.style.display = 'none';
    };

    predefinedTab.onclick = () => {
        currentChartTab = 'predefined';
        predefinedTab.classList.add('btn-primary');
        predefinedTab.classList.remove('btn-secondary');
        customTab.classList.remove('btn-primary');
        customTab.classList.add('btn-secondary');
        customSection.style.display = 'none';
        predefinedSection.style.display = 'block';
    };

    // Reset to custom tab
    currentChartTab = 'custom';
    customTab.classList.add('btn-primary');
    customTab.classList.remove('btn-secondary');
    predefinedTab.classList.remove('btn-primary');
    predefinedTab.classList.add('btn-secondary');
    customSection.style.display = 'block';
    predefinedSection.style.display = 'none';

    document.getElementById('generateChartModal').classList.add('active');
}

function closeGenerateChartModal() {
    document.getElementById('generateChartModal').classList.remove('active');
    document.getElementById('chartNameInput').value = '';
}

function updateChartTypeOptions() {
    const selectedColumn = document.getElementById('chartColumnSelect').value;
    const col = columnSchema.find(c => c.id === selectedColumn);
    const chartTypeSelect = document.getElementById('chartTypeSelect');
    const statValueGroup = document.getElementById('statValueGroup');
    const statTargetValue = document.getElementById('statTargetValue');

    chartTypeSelect.innerHTML = '';
    statValueGroup.style.display = 'none';

    if (col && col.type === 'number') {
        // Numeric column: sum, average, count
        chartTypeSelect.innerHTML = `
            <option value="sum">Soma (somar valores)</option>
            <option value="average">Média (calcular média)</option>
            <option value="count">Contagem (contar registros)</option>
        `;
    } else {
        // Text/Select column
        if (generateMode === 'stat') {
            chartTypeSelect.innerHTML = `
                <option value="count_specific">Contagem Específica (ex: contar "Sim")</option>
                <option value="count_all">Contagem Total (registros preenchidos)</option>
            `;

            // If specific count, show value selector
            chartTypeSelect.onchange = () => {
                if (chartTypeSelect.value === 'count_specific') {
                    statValueGroup.style.display = 'block';
                    statTargetValue.innerHTML = '';
                    if (col.options) {
                        col.options.forEach(opt => {
                            const o = document.createElement('option');
                            o.value = opt;
                            o.textContent = opt;
                            statTargetValue.appendChild(o);
                        });
                    } else {
                        statTargetValue.innerHTML = '<option value="Sim">Sim</option><option value="Não">Não</option>';
                    }
                } else {
                    statValueGroup.style.display = 'none';
                }
            };
            chartTypeSelect.onchange(); // Trigger initial check

        } else {
            chartTypeSelect.innerHTML = `
                <option value="count">Contagem (contar ocorrências)</option>
            `;
        }
    }
}

function confirmGenerateChart() {
    if (generateMode === 'chart' && currentChartTab === 'predefined') {
        // Add predefined chart
        const chartId = document.getElementById('predefinedChartSelect').value;
        addPredefinedChart(chartId);
        closeGenerateChartModal();
        return;
    }

    // Custom chart/stat logic
    const name = document.getElementById('chartNameInput').value.trim();
    const columnId = document.getElementById('chartColumnSelect').value;
    const type = document.getElementById('chartTypeSelect').value;

    if (!name) {
        alert('Digite um nome');
        return;
    }

    const col = columnSchema.find(c => c.id === columnId);
    if (!col) return;

    if (generateMode === 'stat') {
        // Generate Stat
        let targetValue = null;
        if (type === 'count_specific') {
            targetValue = document.getElementById('statTargetValue').value;
        }
        createCustomStat(name, columnId, type, targetValue);
    } else {
        // Generate Chart
        createCustomChart(name, columnId, type);
    }

    closeGenerateChartModal();
}

function createCustomStat(name, columnId, type, targetValue) {
    const statId = `stat_${Date.now()}`;
    const statsBar = document.getElementById('statsBar');

    const statItem = document.createElement('div');
    statItem.className = 'stat-item';
    statItem.dataset.statId = statId;
    statItem.dataset.columnId = columnId;
    statItem.dataset.type = type;
    if (targetValue) statItem.dataset.targetValue = targetValue;

    statItem.innerHTML = `
        <h3>${name} <button class="icon-btn delete-stat" onclick="deleteStat('${statId}')" style="font-size: 0.8em; opacity: 0.5;">×</button></h3>
        <p class="stat-value">0</p>
    `;

    statsBar.appendChild(statItem);
    updateStats();
}

function deleteStat(statId) {
    if (confirm('Excluir este dado?')) {
        const el = document.querySelector(`[data-stat-id="${statId}"]`);
        if (el) el.remove();
    }
}

function createCustomChart(name, columnId, chartType) {
    // Create unique chart ID
    const chartId = `custom_${columnId}_${Date.now()}`;

    // Create chart card
    const chartCard = document.createElement('div');
    chartCard.className = 'chart-card';
    chartCard.dataset.chartId = chartId;
    chartCard.innerHTML = `
        <div class="chart-header">
            <button class="chart-nav prev" onclick="switchChartType('${chartId}', -1)">❮</button>
            <h3>${name}</h3>
            <button class="chart-nav next" onclick="switchChartType('${chartId}', 1)">❯</button>
            <button class="icon-btn delete" onclick="deleteChart('${chartId}')" style="margin-left: auto; color: #ef4444;" title="Excluir gráfico">🗑️</button>
        </div>
        <canvas id="chart_${chartId}"></canvas>
    `;

    dashboardContainer.appendChild(chartCard);

    // Add to chart configs
    chartConfigs[chartId] = {
        typeIndex: 0,
        instance: null,
        ctxId: `chart_${chartId}`,
        label: name,
        columnId: columnId,
        chartType: chartType,
        isCustom: true
    };

    createChart(chartId);
    updateCustomChart(chartId);
    setupChartCarousel();
}

function addPredefinedChart(chartId) {
    // Check if chart already exists
    if (document.querySelector(`[data-chart-id="${chartId}"]`)) {
        alert('Este gráfico já existe!');
        return;
    }

    const chartDefinitions = {
        funnel: {
            title: 'Funil de Conversão',
            titleId: 'funnelTitle',
            canvasId: 'funnelChart'
        },
        niche: {
            title: 'Distribuição por Nicho',
            titleId: null,
            canvasId: 'nicheChart'
        },
        priority: {
            title: 'Relevância',
            titleId: null,
            canvasId: 'priorityChart'
        }
    };

    const def = chartDefinitions[chartId];
    if (!def) return;

    // Create chart card
    const chartCard = document.createElement('div');
    chartCard.className = 'chart-card';
    chartCard.dataset.chartId = chartId;
    chartCard.innerHTML = `
        <div class="chart-header">
            <button class="chart-nav prev" onclick="switchChartType('${chartId}', -1)">❮</button>
            <h3 ${def.titleId ? `id="${def.titleId}"` : ''}>${def.title}</h3>
            <button class="chart-nav next" onclick="switchChartType('${chartId}', 1)">❯</button>
            <button class="icon-btn delete" onclick="deleteChart('${chartId}')" style="margin-left: auto; color: #ef4444;" title="Excluir gráfico">🗑️</button>
        </div>
        <canvas id="${def.canvasId}"></canvas>
    `;

    dashboardContainer.appendChild(chartCard);

    // Re-initialize chart config
    if (chartId === 'funnel') {
        chartConfigs.funnel = { typeIndex: 0, instance: null, ctxId: 'funnelChart', label: 'Funil de Conversão' };
    } else if (chartId === 'niche') {
        chartConfigs.niche = { typeIndex: 0, instance: null, ctxId: 'nicheChart', label: 'Distribuição por Nicho' };
    } else if (chartId === 'priority') {
        chartConfigs.priority = { typeIndex: 3, instance: null, ctxId: 'priorityChart', label: 'Relevância' };
    }

    createChart(chartId);
    updateCharts();
    setupChartCarousel();
}

function deleteChart(chartId) {
    showConfirmationModal('Tem certeza que deseja excluir este gráfico?', () => {
        // Remove from DOM
        const chartCard = document.querySelector(`[data-chart-id="${chartId}"]`);
        if (chartCard) {
            chartCard.remove();
        }

        // Destroy chart instance
        if (chartConfigs[chartId] && chartConfigs[chartId].instance) {
            chartConfigs[chartId].instance.destroy();
        }

        // Remove from configs
        delete chartConfigs[chartId];

        setupChartCarousel();
    });
}

function updateCustomChart(chartId) {
    const config = chartConfigs[chartId];
    if (!config || !config.instance) return;

    const col = columnSchema.find(c => c.id === config.columnId);
    if (!col) return;

    let labels = [];
    let data = [];

    if (config.chartType === 'count') {
        // Count occurrences
        const counts = {};
        influencers.forEach(inf => {
            const value = inf[config.columnId] || 'Vazio';
            counts[value] = (counts[value] || 0) + 1;
        });
        labels = Object.keys(counts);
        data = Object.values(counts);
    } else if (config.chartType === 'sum') {
        // Sum values (for numeric)
        const total = influencers.reduce((sum, inf) => {
            return sum + (parseFloat(inf[config.columnId]) || 0);
        }, 0);
        labels = ['Total'];
        data = [total];
    } else if (config.chartType === 'average') {
        // Average values (for numeric)
        const values = influencers.map(inf => parseFloat(inf[config.columnId]) || 0);
        const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        labels = ['Média'];
        data = [avg.toFixed(2)];
    }

    config.instance.data.labels = labels;
    config.instance.data.datasets[0].data = data;
    config.instance.update();
}

function showConfirmationModal(message, action) {
    confirmationMessage.textContent = message;
    pendingAction = action;
    confirmationModal.classList.add('active');
}

function closeConfirmationModal() {
    confirmationModal.classList.remove('active');
    pendingAction = null;
}

function executePendingAction() {
    if (pendingAction) {
        pendingAction();
    }
    closeConfirmationModal();
}

// Renderizar tabela
function renderTable(dataToRender = influencers) {
    updateTableHeader();
    tableBody.innerHTML = '';

    if (dataToRender.length === 0) {
        const colSpan = isEditMode ? columnSchema.length + 1 : columnSchema.length;
        tableBody.innerHTML = `<tr><td colspan="${colSpan}" style="text-align: center; padding: 30px;">Nenhum influenciador encontrado</td></tr>`;
        return;
    }

    dataToRender.forEach(influencer => {
        const row = document.createElement('tr');
        const isSelected = selectedIds.has(String(influencer.id));

        if (isEditMode) {
            row.classList.add('editing-row');
            let rowHTML = `<td><input type="checkbox" class="row-checkbox" ${isSelected ? 'checked' : ''} onchange="toggleSelect('${influencer.id}')"></td>`;

            columnSchema.forEach(col => {
                const value = influencer[col.id] || '';

                if (col.type === 'select') {
                    // Interactive Badge for Selects in Edit Mode
                    let badgeClass = 'badge-gray';
                    if (value === 'Sim') badgeClass = 'badge-green';
                    else if (value === 'Não') badgeClass = 'badge-red';
                    else if (value === 'Alta') badgeClass = 'badge-red';
                    else if (value === 'Média') badgeClass = 'badge-yellow';
                    else if (value === 'Baixa') badgeClass = 'badge-gray';

                    rowHTML += `
                        <td>
                            <button class="badge ${badgeClass} interactive-badge" onclick="toggleBadgeValue('${influencer.id}', '${col.id}')">
                                ${value || 'Selecione'}
                            </button>
                        </td>
                    `;
                } else {
                    // Handle number types with abbreviated display
                    if (col.type === 'number') {
                        const displayValue = value ? formatNumberAbbreviated(value) : '';
                        rowHTML += `<td><input type="text" class="inline-input" value="${displayValue}" onchange="updateField('${influencer.id}', '${col.id}', this.value)"></td>`;
                    } else {
                        rowHTML += `<td><input type="${col.type === 'number' ? 'number' : 'text'}" class="inline-input" value="${value}" onchange="updateField('${influencer.id}', '${col.id}', this.value)"></td>`;
                    }
                }
            });

            row.innerHTML = rowHTML;
        } else {
            // Read-Only Mode
            let rowHTML = '';

            columnSchema.forEach(col => {
                const value = influencer[col.id] || '';

                if (col.id === 'nome') {
                    rowHTML += `<td><strong>${value}</strong></td>`;
                } else if (col.type === 'url') {
                    if (value) {
                        const url = formatUrl(value);
                        let btnClass = 'btn-site';
                        if (col.id === 'perfil_ig') btnClass = 'btn-instagram';
                        else if (col.id === 'youtube') btnClass = 'btn-youtube';
                        else if (col.id === 'perfil_tiktok') btnClass = 'btn-tiktok';

                        rowHTML += `<td><a href="${url}" target="_blank" class="btn-social ${btnClass}">Acessar</a></td>`;
                    } else {
                        rowHTML += `<td>-</td>`;
                    }
                } else if (col.type === 'select') {
                    // Interactive Badge for Selects (Read-Only Mode)
                    let badgeClass = 'badge-gray';
                    if (value === 'Sim') badgeClass = 'badge-green';
                    else if (value === 'Não') badgeClass = 'badge-red';
                    else if (value === 'Alta') badgeClass = 'badge-red';
                    else if (value === 'Média') badgeClass = 'badge-yellow';
                    else if (value === 'Baixa') badgeClass = 'badge-gray';

                    rowHTML += `
                        <td>
                            <button class="badge ${badgeClass} interactive-badge" onclick="toggleBadgeValue('${influencer.id}', '${col.id}')">
                                ${value || '-'}
                            </button>
                        </td>
                    `;
                } else {
                    // Display numbers in abbreviated format
                    if (col.type === 'number' && value) {
                        rowHTML += `<td>${formatNumberAbbreviated(value)}</td>`;
                    } else {
                        rowHTML += `<td>${value || '-'}</td>`;
                    }
                }
            });

            row.innerHTML = rowHTML;
        }

        tableBody.appendChild(row);
    });
}

function updateTableHeader() {
    let headerHTML = '';

    if (isEditMode) {
        headerHTML = `<th style="width: 40px;"><input type="checkbox" id="selectAll"></th>`;
    }

    columnSchema.forEach(col => {
        headerHTML += `<th>${col.label}</th>`;
    });

    tableHeadRow.innerHTML = headerHTML;

    // Re-attach listener to new selectAll checkbox
    const newSelectAll = document.getElementById('selectAll');
    if (newSelectAll) {
        newSelectAll.addEventListener('change', toggleSelectAll);
        if (selectedIds.size > 0 && selectedIds.size < influencers.length) {
            newSelectAll.indeterminate = true;
        }
    }
}

function updateField(id, field, value) {
    const index = influencers.findIndex(i => String(i.id) === String(id));
    if (index !== -1) {
        const col = columnSchema.find(c => c.id === field);

        // Normalize if number type
        if (col && col.type === 'number') {
            influencers[index][field] = parseAbbreviatedNumber(value);
        } else {
            influencers[index][field] = value;
        }

        saveData();
        renderTable(); // Re-render to show abbreviated format
        updateStats();
    }
}

// Function to toggle badge values
function toggleBadgeValue(id, colId) {
    const influencer = influencers.find(i => String(i.id) === String(id));
    if (!influencer) return;

    const col = columnSchema.find(c => c.id === colId);
    if (!col || !col.options) return;

    const currentIndex = col.options.indexOf(influencer[colId]);
    let nextIndex = currentIndex + 1;
    if (nextIndex >= col.options.length) nextIndex = 0;

    const newValue = col.options[nextIndex];

    // Update value
    influencer[colId] = newValue;

    // Save changes immediately
    saveData();

    // Update UI immediately
    renderTable();
    updateStats();
    updateCharts();
}

function formatUrl(url) {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return 'https://' + url;
}

// --- Charts ---
const chartTypes = ['bar', 'pie', 'line', 'doughnut'];
let chartConfigs = {
    funnel: { typeIndex: 0, instance: null, ctxId: 'funnelChart', label: 'Funil de Conversão' },
    averageViews: { typeIndex: 0, instance: null, ctxId: 'averageViewsChart', label: 'Média de Visualizações' },
    priority: { typeIndex: 0, instance: null, ctxId: 'priorityChart', label: 'Média de Seguidores' }
};

function initCharts() {
    createChart('funnel');
    createChart('averageViews');
    createChart('priority');
    initDynamicCharts();
    setupChartCarousel();
}

function initDynamicCharts() {
    // Create charts for numeric custom columns
    const numericColumns = columnSchema.filter(col => col.type === 'number' && !col.fixed);

    numericColumns.forEach(col => {
        if (!chartConfigs[col.id]) {
            chartConfigs[col.id] = {
                typeIndex: 0,
                instance: null,
                ctxId: `chart_${col.id}`,
                label: col.label,
                isDynamic: true
            };

            // Create canvas element
            const chartCard = document.createElement('div');
            chartCard.className = 'chart-card';
            chartCard.innerHTML = `
                <div class="chart-header">
                    <button class="chart-nav prev" onclick="switchChartType('${col.id}', -1)">❮</button>
                    <h3>${col.label}</h3>
                    <button class="chart-nav next" onclick="switchChartType('${col.id}', 1)">❯</button>
                </div>
                <canvas id="chart_${col.id}"></canvas>
            `;
            dashboardContainer.appendChild(chartCard);

            createChart(col.id);
        }
    });

    setupChartCarousel();
}

function createChart(key) {
    const config = chartConfigs[key];
    const ctx = document.getElementById(config.ctxId);
    if (!ctx) return;

    const type = chartTypes[config.typeIndex];

    config.instance = new Chart(ctx.getContext('2d'), {
        type: type,
        data: {
            labels: [],
            datasets: [{
                label: config.label,
                data: [],
                backgroundColor: getChartColors(key, type),
                borderColor: getChartColors(key, type, true),
                borderWidth: 1,
                fill: type === 'line'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    display: type !== 'pie' && type !== 'doughnut'
                },
                x: {
                    display: type !== 'pie' && type !== 'doughnut'
                }
            }
        }
    });
}

function switchChartType(key, direction) {
    const config = chartConfigs[key];

    config.typeIndex += direction;
    if (config.typeIndex < 0) config.typeIndex = chartTypes.length - 1;
    if (config.typeIndex >= chartTypes.length) config.typeIndex = 0;

    if (config.instance) {
        config.instance.destroy();
    }

    createChart(key);
    updateCharts();
}

function getChartColors(key, type, isBorder = false) {
    const opacity = isBorder ? 1 : 0.6;

    if (key === 'funnel') {
        return [
            `rgba(54, 162, 235, ${opacity})`,
            `rgba(255, 206, 86, ${opacity})`,
            `rgba(75, 192, 192, ${opacity})`
        ];
    } else if (key === 'priority') {
        return [
            `rgba(255, 99, 132, ${opacity})`,
            `rgba(255, 206, 86, ${opacity})`,
            `rgba(75, 192, 192, ${opacity})`
        ];
    } else {
        return `rgba(153, 102, 255, ${opacity})`;
    }
}

function updateCharts() {
    if (chartConfigs.funnel.instance) {
        const contacted = influencers.filter(i => i.contato_ig === 'Sim').length;
        const returned = influencers.filter(i => i.teve_retorno === 'Sim').length;
        const converted = influencers.filter(i => i.converteu === 'Sim').length;

        chartConfigs.funnel.instance.data.labels = ['Contactados', 'Retornaram', 'Convertidos'];
        chartConfigs.funnel.instance.data.datasets[0].data = [contacted, returned, converted];
        chartConfigs.funnel.instance.update();

        const conversionRate = contacted > 0 ? ((converted / contacted) * 100).toFixed(1) : 0;
        const title = document.getElementById('funnelTitle');
        if (title) title.textContent = `Funil de Conversão (Taxa: ${conversionRate}%)`;
    }

    if (chartConfigs.averageViews.instance) {
        const views = influencers.map(i => parseAbbreviatedNumber(i.media_views || 0));
        const totalViews = views.reduce((a, b) => a + b, 0);
        const avgViews = views.length > 0 ? totalViews / views.length : 0;
        const maxViews = Math.max(...views, 0);

        chartConfigs.averageViews.instance.data.labels = ['Média', 'Máxima'];
        chartConfigs.averageViews.instance.data.datasets[0].data = [avgViews, maxViews];
        chartConfigs.averageViews.instance.update();
    }

    if (chartConfigs.priority.instance) {
        // Calculate average followers (assuming there's a seguidores field)
        // If not, we'll use a placeholder or create one
        const followersData = influencers.map(i => {
            // Try to get followers from various possible fields
            return parseAbbreviatedNumber(i.seguidores || i.followers || i.media_views || 0);
        });

        const totalFollowers = followersData.reduce((a, b) => a + b, 0);
        const avgFollowers = followersData.length > 0 ? totalFollowers / followersData.length : 0;
        const maxFollowers = Math.max(...followersData, 0);

        chartConfigs.priority.instance.data.labels = ['Média', 'Máxima'];
        chartConfigs.priority.instance.data.datasets[0].data = [avgFollowers, maxFollowers];
        chartConfigs.priority.instance.update();
    }

    // Update dynamic charts
    Object.keys(chartConfigs).forEach(key => {
        const config = chartConfigs[key];
        if (config.isDynamic && config.instance) {
            // Aggregate numeric data
            const values = influencers.map(i => parseFloat(i[key]) || 0);
            const sum = values.reduce((a, b) => a + b, 0);
            const avg = values.length > 0 ? sum / values.length : 0;

            config.instance.data.labels = ['Total', 'Média'];
            config.instance.data.datasets[0].data = [sum, avg];
            config.instance.update();
        } else if (config.isCustom && config.instance) {
            // Update custom charts
            updateCustomChart(key);
        }
    });
}

// Chart Carousel
function setupChartCarousel() {
    const charts = document.querySelectorAll('.chart-card');

    if (charts.length > 3) {
        dashboardContainer.classList.add('chart-carousel');

        // Wrap in track
        const track = document.createElement('div');
        track.className = 'chart-carousel-track';

        charts.forEach(chart => {
            dashboardContainer.removeChild(chart);
            track.appendChild(chart);
        });

        dashboardContainer.appendChild(track);

        // Add navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.className = 'chart-carousel-btn prev';
        prevBtn.innerHTML = '❮';
        prevBtn.onclick = () => moveCarousel(-1);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'chart-carousel-btn next';
        nextBtn.innerHTML = '❯';
        nextBtn.onclick = () => moveCarousel(1);

        dashboardContainer.appendChild(prevBtn);
        dashboardContainer.appendChild(nextBtn);
    }
}

function moveCarousel(direction) {
    const track = document.querySelector('.chart-carousel-track');
    const charts = document.querySelectorAll('.chart-card');
    const maxPosition = Math.max(0, charts.length - 3);

    carouselPosition += direction;
    if (carouselPosition < 0) carouselPosition = 0;
    if (carouselPosition > maxPosition) carouselPosition = maxPosition;

    const offset = -carouselPosition * 33.33; // Each chart is ~33% width
    track.style.transform = `translateX(${offset}%)`;
}

// Drag Scroll
function setupDragScroll() {
    const tableWrapper = document.querySelector('.table-wrapper');
    let isDown = false;
    let startX;
    let scrollLeft;

    tableWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        tableWrapper.style.cursor = 'grabbing';
        startX = e.pageX - tableWrapper.offsetLeft;
        scrollLeft = tableWrapper.scrollLeft;
    });

    tableWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        tableWrapper.style.cursor = 'grab';
    });

    tableWrapper.addEventListener('mouseup', () => {
        isDown = false;
        tableWrapper.style.cursor = 'grab';
    });

    tableWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - tableWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        tableWrapper.scrollLeft = scrollLeft - walk;
    });
}

// Add Influencer Modal
function openAddInfluencerModal() {
    const fieldsContainer = document.getElementById('addInfluencerFields');
    fieldsContainer.innerHTML = '';

    columnSchema.forEach(col => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';

        const label = document.createElement('label');
        label.textContent = col.label + ':';
        label.setAttribute('for', `add_${col.id}`);

        let input;
        if (col.type === 'select') {
            input = document.createElement('select');
            input.className = 'inline-input';

            // Set default value for status fields
            const defaultValue = ['contato_ig', 'teve_retorno', 'converteu'].includes(col.id) ? 'Não' : null;

            (col.options || ['Sim', 'Não']).forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                if (defaultValue && opt === defaultValue) {
                    option.selected = true;
                }
                input.appendChild(option);
            });
        } else {
            input = document.createElement('input');
            input.type = col.type === 'number' ? 'number' : 'text';
            input.className = 'inline-input';
            input.placeholder = `Digite ${col.label.toLowerCase()}`;
        }

        input.id = `add_${col.id}`;

        formGroup.appendChild(label);
        formGroup.appendChild(input);
        fieldsContainer.appendChild(formGroup);
    });

    document.getElementById('addInfluencerModal').classList.add('active');
}

function closeAddInfluencerModal() {
    document.getElementById('addInfluencerModal').classList.remove('active');
}

async function confirmAddInfluencer() {
    const newInfluencer = { id: generateUUID() };

    columnSchema.forEach(col => {
        const input = document.getElementById(`add_${col.id}`);
        let value = input.value || (col.type === 'number' ? 0 : '');

        // Normalize number inputs
        if (col.type === 'number' && value) {
            value = parseAbbreviatedNumber(value);
        }

        newInfluencer[col.id] = value;
    });

    // Validate that at least name is filled
    if (!newInfluencer.nome || !newInfluencer.nome.trim()) {
        alert('O nome é obrigatório!');
        return;
    }

    influencers.push(newInfluencer);
    console.log('➕ Adding influencer:', newInfluencer.nome);
    await saveData();
    renderTable();
    updateStats();
    closeAddInfluencerModal();
}

// Generate UUID helper (if not already defined)
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Bulk Actions
function toggleSelectAll(e) {
    const isChecked = e.target.checked;
    if (isChecked) {
        influencers.forEach(i => selectedIds.add(String(i.id)));
    } else {
        selectedIds.clear();
    }
    renderTable();
    updateBulkActionsUI();
}

function toggleSelect(id) {
    const strId = String(id);
    if (selectedIds.has(strId)) {
        selectedIds.delete(strId);
    } else {
        selectedIds.add(strId);
    }
    updateBulkActionsUI();
}

function updateBulkActionsUI() {
    const count = selectedIds.size;
    const bulkGroup = document.getElementById('bulkActionsGroup');

    if (count > 0 && isEditMode) {
        bulkGroup.style.display = 'flex';
    } else {
        bulkGroup.style.display = 'none';
    }

    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        if (count === 0) {
            selectAll.checked = false;
            selectAll.indeterminate = false;
        } else if (count === influencers.length) {
            selectAll.checked = true;
            selectAll.indeterminate = false;
        } else {
            selectAll.checked = false;
            selectAll.indeterminate = true;
        }
    }
}

async function deleteSelected() {
    const idsToDelete = Array.from(selectedIds);
    console.log('🗑️ Deleting influencers:', idsToDelete.length);

    // Delete from database
    for (const id of idsToDelete) {
        await deleteInfluencerFromDB(id);
    }

    influencers = influencers.filter(i => !selectedIds.has(String(i.id)));
    selectedIds.clear();
    await saveData();
    renderTable();
    updateStats();
    updateBulkActionsUI();
}

// Search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();

    if (!searchTerm) {
        renderTable();
        return;
    }

    const filtered = influencers.filter(influencer => {
        return columnSchema.some(col => {
            const value = influencer[col.id];
            return value && value.toString().toLowerCase().includes(searchTerm);
        });
    });

    renderTable(filtered);
}

// Stats
function updateStats() {
    const total = influencers.length;
    const contacted = influencers.filter(i => i.contato_ig === 'Sim').length;
    const returned = influencers.filter(i => i.teve_retorno === 'Sim').length;
    const converted = influencers.filter(i => i.converteu === 'Sim').length;
    const highPriority = influencers.filter(i => i.relevancia === 'Alta').length;

    // Update Standard Stats
    const totalEl = document.getElementById('totalInfluencers') || document.getElementById('totalCount');
    const contactedEl = document.getElementById('totalContacted') || document.getElementById('contactedCount');
    const returnedEl = document.getElementById('totalReturned') || document.getElementById('returnedCount');
    const convertedEl = document.getElementById('totalConverted') || document.getElementById('convertedCount');
    const highPriorityEl = document.getElementById('highPriorityCount');

    if (totalEl) totalEl.textContent = total;
    if (contactedEl) contactedEl.textContent = contacted;
    if (returnedEl) returnedEl.textContent = returned;
    if (convertedEl) convertedEl.textContent = converted;
    if (highPriorityEl) highPriorityEl.textContent = highPriority;

    // Update Custom Stats
    document.querySelectorAll('.stat-item[data-stat-id]').forEach(item => {
        const colId = item.dataset.columnId;
        const type = item.dataset.type;
        const target = item.dataset.targetValue;
        const valueEl = item.querySelector('.stat-value');

        if (!valueEl) return;

        let value = 0;
        if (type === 'sum') {
            value = influencers.reduce((acc, curr) => acc + (parseFloat(curr[colId]) || 0), 0);
            valueEl.textContent = value.toLocaleString('pt-BR');
        } else if (type === 'average') {
            const sum = influencers.reduce((acc, curr) => acc + (parseFloat(curr[colId]) || 0), 0);
            value = total > 0 ? (sum / total) : 0;
            valueEl.textContent = value.toFixed(2);
        } else if (type === 'count_specific') {
            value = influencers.filter(i => i[colId] === target).length;
            valueEl.textContent = value;
        } else if (type === 'count_all') {
            value = influencers.filter(i => i[colId] && i[colId].toString().trim() !== '').length;
            valueEl.textContent = value;
        }
    });

    updateCharts();
}

// Import/Export
function closeImportModal() {
    importModal.classList.remove('active');
    csvFile.value = '';
}

function openImportModal() {
    importModal.classList.add('active');
}

function handleImport() {
    const file = csvFile.files[0];
    if (!file) {
        alert('Selecione um arquivo para importar');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const csv = e.target.result;
            // Robust CSV parsing handling quotes
            const lines = [];
            let currentLine = [];
            let currentVal = '';
            let inQuotes = false;

            for (let i = 0; i < csv.length; i++) {
                const char = csv[i];
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    currentLine.push(currentVal.trim());
                    currentVal = '';
                } else if ((char === '\n' || char === '\r') && !inQuotes) {
                    if (currentVal || currentLine.length > 0) {
                        currentLine.push(currentVal.trim());
                        lines.push(currentLine);
                    }
                    currentLine = [];
                    currentVal = '';
                    // Skip following \n if \r
                    if (char === '\r' && csv[i + 1] === '\n') i++;
                } else {
                    currentVal += char;
                }
            }
            if (currentVal || currentLine.length > 0) {
                currentLine.push(currentVal.trim());
                lines.push(currentLine);
            }

            if (lines.length < 2) {
                throw new Error('Arquivo CSV vazio ou inválido');
            }

            // Normalization map
            const normalizationMap = {
                'nome': 'nome', 'name': 'nome', 'full name': 'nome',
                'instagram': 'perfil_ig', 'ig': 'perfil_ig', 'link': 'perfil_ig', 'url': 'perfil_ig',
                'youtube': 'youtube', 'yt': 'youtube', 'channel': 'youtube',
                'tiktok': 'perfil_tiktok', 'tk': 'perfil_tiktok',
                'site': 'site', 'website': 'site',
                'email': 'email', 'e-mail': 'email', 'mail': 'email',
                'whatsapp': 'whatsapp', 'tel': 'whatsapp', 'phone': 'whatsapp',
                'nicho': 'nicho', 'niche': 'nicho', 'category': 'nicho',
                'relevância': 'relevancia', 'relevancia': 'relevancia', 'priority': 'relevancia',
                'contato ig': 'contato_ig', 'contacted': 'contato_ig',
                'teve retorno': 'teve_retorno', 'replied': 'teve_retorno',
                'converteu': 'converteu', 'converted': 'converteu'
            };

            const headers = lines[0].map(h => h.toLowerCase().replace(/['"]/g, '').trim());

            let newCount = 0;

            // Generate UUID helper
            const generateUUID = () => {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i];
                if (values.length === 0) continue;

                const newInfluencer = { id: generateUUID() };
                let hasData = false;

                columnSchema.forEach(col => {
                    // Find matching header
                    let headerIndex = -1;

                    // 1. Direct match
                    headerIndex = headers.indexOf(col.id.toLowerCase());

                    // 2. Normalized match
                    if (headerIndex === -1) {
                        const normalizedKey = Object.keys(normalizationMap).find(key => normalizationMap[key] === col.id);
                        if (normalizedKey) {
                            // Reverse lookup in headers? No, check if any header maps to this col.id
                            headerIndex = headers.findIndex(h => normalizationMap[h] === col.id);
                        }
                    }

                    // 3. Label match
                    if (headerIndex === -1) {
                        headerIndex = headers.indexOf(col.label.toLowerCase());
                    }

                    let value = '';
                    if (headerIndex !== -1 && values[headerIndex]) {
                        // Remove multiple levels of surrounding quotes and trim
                        value = values[headerIndex].replace(/^["']+|["']+$/g, '').trim();

                        // NORMALIZE NUMBERS
                        if (col.type === 'number') {
                            value = parseAbbreviatedNumber(value);
                        }

                        hasData = true;
                    }

                    newInfluencer[col.id] = value || (col.type === 'number' ? 0 : '');
                });

                if (hasData && (newInfluencer.nome || newInfluencer.perfil_ig)) {
                    influencers.push(newInfluencer);
                    newCount++;
                }
            }

            saveData();
            renderTable();
            updateStats();
            closeImportModal();
            alert(`${newCount} influenciador(es) importado(s) com sucesso!`);
        } catch (error) {
            console.error(error);
            alert('Erro ao importar arquivo: ' + error.message);
        }
    };
    reader.readAsText(file);
}

function exportToExcel() {
    let csv = columnSchema.map(col => col.label).join(',') + '\n';

    influencers.forEach(influencer => {
        const row = columnSchema.map(col => `"${influencer[col.id] || ''}"`);
        csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `vslplay_influencers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('Dados exportados com sucesso!');
}

function downloadCSVModel() {
    const headers = columnSchema.map(col => col.label);
    const exampleRow = columnSchema.map(col => {
        if (col.type === 'number') return '0';
        if (col.type === 'select') return col.options ? col.options[0] : '';
        return 'Exemplo';
    });

    const csvContent = headers.join(',') + '\n' + exampleRow.join(',');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'modelo_importacao_vslplay.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target === importModal) closeImportModal();
    if (e.target === confirmationModal) closeConfirmationModal();
    if (e.target === columnManagementModal) closeColumnManagementModal();
    if (e.target === document.getElementById('addInfluencerModal')) closeAddInfluencerModal();
    if (e.target === document.getElementById('renameColumnModal')) closeRenameColumnModal();
    if (e.target === document.getElementById('generateChartModal')) closeGenerateChartModal();
});
