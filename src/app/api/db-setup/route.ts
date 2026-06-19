/**
 * One-time database setup endpoint.
 * Visit /api/db-setup once after creating the Postgres database in Vercel
 * to create the officers and rush_events tables.
 *
 * Protected by SETUP_SECRET so it can't be triggered accidentally in production.
 * Call it with: /api/db-setup?secret=<your-SETUP_SECRET>
 */

import { NextRequest, NextResponse } from "next/server";
import { setupSchema } from "@/lib/db";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.SETUP_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await setupSchema();
    return NextResponse.json({ ok: true, message: "Tables created successfully." });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
