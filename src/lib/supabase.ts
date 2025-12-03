import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ridztjcycoxqjiuwarvx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHp0amN5Y294cWppdXdhcnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MDU1NjIsImV4cCI6MjA4MDI4MTU2Mn0.p1QPJKfzCIn_ph7vITiuHSCLIqP79hyPXwtdJwYSftI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
