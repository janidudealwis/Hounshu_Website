import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

// Create supabase client with error handling
try {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn(
      "Missing Supabase environment variables. Products will use fallback data.",
    );
    supabase = null;
  } else {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (error) {
  console.error("Failed to initialize Supabase client:", error);
  supabase = null;
}

export { supabase };
