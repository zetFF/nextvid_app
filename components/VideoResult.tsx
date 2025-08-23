import * as React from "react";

interface VideoResultProps {
  result: {
    videoUrl: string;
    videoId: string;
    message: string;
  } | null;
}

export function VideoResult({ result }: VideoResultProps) {
  if (!result) return null;
  return (
    <div className="shadcn-card mt-6">
      <p className="font-medium mb-2">Video generated successfully!</p>
      <video controls className="w-full rounded-md" src={result.videoUrl}>
        Your browser does not support the video tag.
      </video>
      <div className="mt-4 space-y-2">
        <p>
          <strong>Video ID:</strong> {result.videoId}
        </p>
        <p>
          <strong>Video URL:</strong> {result.videoUrl}
        </p>
        <a
          href={result.videoUrl}
          download
          className="shadcn-button"
        >
          Download Video
        </a>
      </div>
    </div>
  );
}
