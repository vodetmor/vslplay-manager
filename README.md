# 🎬 VSLPlay Influencers Manager

Uma plataforma web para mapear, qualificar e priorizar influenciadores, players e criadores do mercado digital como possíveis embaixadores do **VSLPlay** - a plataforma de hospedagem de VSL de baixo custo.

## 📋 Características

✅ **Organização de Influenciadores** - Gerencie mais de 100 nomes relevantes do mercado digital  
✅ **Avaliação de Potencial** - Classifique por autoridade, alinhamento, alcance e credibilidade  
✅ **Priorização de Abordagem** - Destaque quem deve ser contactado primeiro  
✅ **Links Diretos** - Acesso rápido para Instagram, YouTube, TikTok e Sites  
✅ **Rastreamento de Contatos** - Botões Sim/Não para marcar status de contato  
✅ **Importação em Lote** - Adicione múltiplos influenciadores via CSV/Excel  
✅ **Exportação de Dados** - Baixe todos os dados em formato CSV/Excel  
✅ **Armazenamento Local** - Dados salvos no navegador (sem servidor necessário)  
✅ **Interface Responsiva** - Funciona em desktop, tablet e mobile  

## 🚀 Como Usar

### 1. Abrir a Aplicação
Simplesmente abra o arquivo `index.html` em seu navegador (Chrome, Firefox, Safari, Edge, etc).

```bash
# No Windows
start index.html

# No Mac
open index.html

# No Linux
xdg-open index.html
```

Ou arraste o arquivo `index.html` para o navegador.

### 2. Visualizar Influenciadores
A tabela carrega automaticamente com os 24 influenciadores da planilha original. Você pode:
- 🔍 **Buscar** por nome, nicho ou rede social
- 📊 **Ver estatísticas** no topo (Total, Contactados, Convertidos, Alta Prioridade)
- 📱 **Clicar nos links** para acessar Instagram, YouTube, TikTok ou Site

### 3. Adicionar Influenciador
Clique em **"➕ Adicionar Influenciador"** para abrir o formulário:
- Preencha os dados (Nome é obrigatório)
- Selecione a relevância (Baixa, Média, Alta)
- Marque o status de contato (Sim/Não)
- Clique em "Salvar"

### 4. Editar Influenciador
Clique em **"✏️ Editar"** na linha do influenciador para modificar seus dados.

### 5. Deletar Influenciador
Clique em **"🗑️ Deletar"** para remover um influenciador (com confirmação).

### 6. Importar em Lote
Clique em **"📥 Importar CSV/Excel"**:
- Prepare um arquivo CSV com as colunas: Nome, Perfil IG, YouTube, Perfil TikTok, Site, Nicho, Relevância
- Selecione o arquivo
- Clique em "Importar"

**Exemplo de CSV:**
```
Nome,Perfil IG,YouTube,Perfil TikTok,Site,Nicho,Relevância
João Silva,https://instagram.com/joaosilva,https://youtube.com/@joao,,https://joao.com,Marketing Digital,Alta
Maria Santos,https://instagram.com/maria,,,https://maria.com,Vendas,Média
```

### 7. Exportar Dados
Clique em **"📊 Exportar Excel"** para baixar todos os influenciadores em formato CSV que pode ser aberto no Excel.

## 📁 Arquivos da Aplicação

- **index.html** - Interface principal da aplicação
- **styles.css** - Estilos e design responsivo
- **app.js** - Lógica da aplicação (CRUD, busca, importação, exportação)
- **README.md** - Este arquivo

## 💾 Armazenamento de Dados

Os dados são salvos automaticamente no **localStorage** do navegador. Isso significa:
- ✅ Nenhum servidor necessário
- ✅ Dados persistem entre sessões
- ✅ Funciona offline
- ⚠️ Dados são específicos do navegador/computador
- ⚠️ Limpar o cache do navegador pode deletar os dados

**Dica:** Exporte regularmente seus dados para ter um backup em Excel!

## 🎨 Cores e Status

### Status de Contato
- 🟢 **Verde** = Sim (Contactado/Teve Retorno/Converteu)
- 🔴 **Vermelho** = Não (Não contactado/Sem retorno/Não converteu)

### Prioridade
- 🔴 **Alta** - Contactar primeiro
- 🟡 **Média** - Prioridade normal
- 🔵 **Baixa** - Contactar depois

## 📱 Responsividade

A aplicação funciona perfeitamente em:
- 💻 Desktop (1920px+)
- 📱 Tablet (768px - 1024px)
- 📱 Mobile (até 480px)

A tabela se adapta automaticamente ao tamanho da tela.

## 🔒 Segurança

- ✅ Nenhum dado é enviado para servidores
- ✅ Tudo funciona localmente no seu navegador
- ✅ Você tem controle total dos seus dados
- ✅ Nenhuma conta necessária

## 🐛 Troubleshooting

### Os dados desapareceram
- Verifique se você limpou o cache/cookies do navegador
- Importe novamente o arquivo CSV de backup

### A tabela não carrega
- Atualize a página (F5 ou Ctrl+R)
- Verifique se o JavaScript está habilitado no navegador

### Não consigo importar o arquivo
- Certifique-se de que o arquivo é CSV ou Excel
- Verifique se os nomes das colunas estão corretos
- Tente salvar o Excel como CSV antes de importar

## 📝 Dicas de Uso

1. **Organize por Prioridade** - Marque como "Alta" os influenciadores mais relevantes
2. **Acompanhe Contatos** - Use o botão "Contato IG" para marcar quem você já abordou
3. **Registre Resultados** - Marque "Teve Retorno" e "Converteu" conforme avança
4. **Adicione Notas** - Use o campo de notas para guardar observações importantes
5. **Exporte Regularmente** - Faça backup dos dados em Excel periodicamente

## 🚀 Próximas Melhorias (Ideias)

- [ ] Filtros avançados por prioridade e status
- [ ] Gráficos e relatórios de conversão
- [ ] Integração com Google Sheets
- [ ] Sincronização entre dispositivos
- [ ] Histórico de contatos
- [ ] Envio automático de emails

## 📞 Suporte

Para dúvidas ou sugestões, você pode:
- Revisar este README
- Testar a funcionalidade no navegador
- Exportar dados para Excel para análise adicional

---

**VSLPlay © 2024** - Plataforma de Hospedagem de VSL de Baixo Custo  
Desenvolvido para escalar agressivamente sua rede de embaixadores.
