import { createClient } from '@supabase/supabase-js'

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
// const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient("https://wgaehxoklaievwywyvjs.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnYWVoeG9rbGFpZXZ3eXd5dmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NTQ2MDEsImV4cCI6MjA1ODMzMDYwMX0.ZcgIvy3ySlfYB8adFrpyDnBWbrgznnKQg2sguTAvYyI");
 
export default supabase;