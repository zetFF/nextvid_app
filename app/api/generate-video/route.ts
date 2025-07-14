import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const execAsync = promisify(exec);

// Function to get appropriate font for different OS
function getSystemFont() {
  const platform = process.platform;

  if (platform === "win32") {
    return "arial"; // Use built-in font name for Windows
  } else if (platform === "darwin") {
    return "Arial"; // macOS
  } else {
    return "DejaVu Sans"; // Linux
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      captions,
      imageUrls,
      musicUrl,
    }: {
      title: string;
      captions: string[];
      imageUrls: string[];
      musicUrl: string;
    } = await request.json();

    if (
      !title ||
      !musicUrl ||
      !Array.isArray(captions) ||
      !Array.isArray(imageUrls) ||
      captions.length !== 4 ||
      imageUrls.length !== 4
    ) {
      return NextResponse.json(
        {
          error:
            "Missing or invalid fields: title, musicUrl, captions[4], imageUrls[4]",
        },
        { status: 400 }
      );
    }

    const videoId = uuidv4();
    const outputPath = path.join(
      process.cwd(),
      "public",
      "videos",
      `${videoId}.mp4`
    );
    const tempDir = path.join(process.cwd(), "temp", videoId);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.mkdir(tempDir, { recursive: true });

    // Download images and audio
    const imagePaths: string[] = [];
    for (let i = 0; i < 4; i++) {
      const imgRes = await fetch(imageUrls[i]);
      const imgBuf = await imgRes.arrayBuffer();
      const imgPath = path.join(tempDir, `img${i + 1}.jpg`);
      await fs.writeFile(imgPath, Buffer.from(imgBuf));
      imagePaths.push(imgPath);
    }
    const audioRes = await fetch(musicUrl);
    const audioBuf = await audioRes.arrayBuffer();
    const audioPath = path.join(tempDir, `audio.mp3`);
    await fs.writeFile(audioPath, Buffer.from(audioBuf));

    // Layout constants
    const gridW = 1000,
      gridH = 1000;
    const imgW = 460,
      imgH = 460; // margin antar gambar 40px
    const marginX = 40,
      marginY = 100; // marginY diperbesar dari 40 ke 100
    const gridStartX = 40,
      gridStartY = 200;
    const capH = 60;

    // Get system font (no path issues)
    const font = getSystemFont();

    // Buat video fade-in untuk tiap gambar+caption dengan durasi 0.6 detik
    const fadeIns: string[] = [];
    for (let i = 0; i < 4; i++) {
      const fadePath = path.join(tempDir, `fade${i + 1}.mp4`);
      const cap = captions[i].replace(/'/g, "\\'");
      const cmd = `"${process.env.FFMPEG_PATH || "ffmpeg"}" -y -loop 1 -i "${
        imagePaths[i]
      }" -f lavfi -t 7 -i color=white:s=${imgW}x${
        imgH + capH
      } -filter_complex "[1:v][0:v]overlay=0:${capH},drawtext=fontfile=${font}:text='${cap}':fontsize=36:fontcolor=black:shadowcolor=gray:shadowx=1:shadowy=1:x=(w-text_w)/2:y=10,fade=t=in:st=${
        i * 0.2
      }:d=0.5:alpha=1,format=yuva420p" -t 7 -pix_fmt yuv420p -c:v libx264 "${fadePath}"`;
      await execAsync(cmd);
      fadeIns.push(fadePath);
    }

    // Gabungkan 4 fade-in ke grid 2x2
    // Posisi: 0,0 | 1,0 | 0,1 | 1,1
    // X: gridStartX + (col * (imgW+marginX)), Y: gridStartY + (row * (imgH+marginY))
    const filterGrid = `
      [0:v][1:v]overlay=${gridStartX}:${gridStartY}[tmp1];
      [tmp1][2:v]overlay=${gridStartX + imgW + marginX}:${gridStartY}[tmp2];
      [tmp2][3:v]overlay=${gridStartX}:${gridStartY + imgH + marginY}[tmp3];
      [tmp3][4:v]overlay=${gridStartX + imgW + marginX}:${
      gridStartY + imgH + marginY
    }[withgrid];
      [withgrid]drawtext=fontfile=${font}:text='${title.replace(
      /'/g,
      "\\'"
    )}':fontsize=60:fontcolor=black:shadowcolor=gray:shadowx=1:shadowy=1:x=(w-text_w)/2:y=80[final]
    `.replace(/\n/g, "");

    // Buat video grid
    const gridCmd = `"${
      process.env.FFMPEG_PATH || "ffmpeg"
    }" -y -f lavfi -i color=white:s=1080x1920:d=7 -i "${fadeIns[0]}" -i "${
      fadeIns[1]
    }" -i "${fadeIns[2]}" -i "${
      fadeIns[3]
    }" -filter_complex "${filterGrid}" -map "[final]" -t 7 -r 30 -pix_fmt yuv420p -c:v libx264 "${tempDir}/video.mp4"`;
    await execAsync(gridCmd);

    // Add audio
    const finalCmd = `"${
      process.env.FFMPEG_PATH || "ffmpeg"
    }" -y -i "${tempDir}/video.mp4" -i "${audioPath}" -c:v copy -c:a aac -shortest "${outputPath}"`;
    await execAsync(finalCmd);

    await fs.rm(tempDir, { recursive: true, force: true });

    const videoUrl = `/videos/${videoId}.mp4`;
    return NextResponse.json({
      success: true,
      videoUrl,
      videoId,
      message: "Video generated successfully",
    });
  } catch (error: any) {
    console.error("Error generating video:", error);
    return NextResponse.json(
      { error: "Failed to generate video", details: error.message },
      { status: 500 }
    );
  }
}
