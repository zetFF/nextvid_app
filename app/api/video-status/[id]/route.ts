import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const videoPath = path.join(process.cwd(), "public", "videos", `${id}.mp4`);

    try {
      await fs.access(videoPath);
      return NextResponse.json({ exists: true, ready: true });
    } catch {
      return NextResponse.json({ exists: false, ready: false });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check video status" },
      { status: 500 }
    );
  }
}
