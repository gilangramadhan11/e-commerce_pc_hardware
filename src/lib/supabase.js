import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL='https://ffzmipuvlcjokmxtpdbj.supabase.co'
const SUPABASE_KEY='sb_publishable_9A-rTTPMcbBAgboD92olqA_7X1bwvAw'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
