import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";
import { TypedSupabaseClient } from "./types/types";

const supabaseUrl = "https://opmliiavikfniknrvlgt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbWxpaWF2aWtmbmlrbnJ2bGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3NDMzNTIsImV4cCI6MjAzMzMxOTM1Mn0.mG2HJBsvHNkWs4cxOrNSEzYSld_ZHE4SdH3g05EZj8I";
const supabase: TypedSupabaseClient = createClient<Database>(
  supabaseUrl,
  supabaseKey,
);

supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.provider_token) {
    window.localStorage.setItem("oauth_provider_token", session.provider_token);
  }

  if (session && session.refresh_token) {
    window?.localStorage.setItem("oauth_refresh_token", session.refresh_token);
  }

  if (event === "SIGNED_OUT") {
    window.localStorage.removeItem("oauth_provider_token");
    window.localStorage.removeItem("oauth_refresh_token");
  }

  //  Remove the hash (#) from the URL after sign-in
  if (window.location.href.slice(-1).includes("#")) {
    window.history.replaceState(null, "", window.location.pathname);
  }
});


export default supabase;
