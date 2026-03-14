import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pdhrnnyjdipfhdrjihkq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_jO27J3YPIARln-pOYc89OQ_tW6_Jx85";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
