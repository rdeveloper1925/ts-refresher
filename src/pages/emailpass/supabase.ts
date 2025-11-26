import { createClient } from "@supabase/supabase-js";

const selfHostedSupabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_SECRET
);

export default selfHostedSupabase