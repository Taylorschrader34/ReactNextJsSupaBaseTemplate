import { supabase } from "../../supabaseClient";

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
