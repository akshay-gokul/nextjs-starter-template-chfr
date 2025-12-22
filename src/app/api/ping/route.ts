import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Response from next js server" });
}
