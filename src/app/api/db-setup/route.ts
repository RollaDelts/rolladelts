/**
 * Database setup helper — returns the SQL to run in the Supabase SQL Editor.
 *
 * Visit /api/db-setup in your browser to see setup instructions.
 * The actual schema file is at supabase/schema.sql in the repository.
 */

import { NextResponse } from "next/server";
import { supabaseAvailable } from "@/lib/supabase";

export async function GET() {
  const connected = supabaseAvailable();
  return NextResponse.json({
    connected,
    message: connected
      ? "Supabase env vars are set. Run supabase/schema.sql in your Supabase SQL Editor if you haven't already."
      : "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    instructions: [
      "1. Create a project at https://supabase.com",
      "2. Go to Project Settings → API to find your URL and service role key",
      "3. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to Vercel env vars",
      "4. Open the Supabase SQL Editor and run the contents of supabase/schema.sql",
    ],
  });
}
