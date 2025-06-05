import { NextResponse } from "next/server";

export async function GET() {
  console.log(`[CRON TEST] Triggered at ${new Date().toISOString()}`);
  return NextResponse.json({ success: true, message: "Cron test triggered." });
}
