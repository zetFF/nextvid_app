"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    musicUrl: "",
    captions: ["", "", "", ""],
    imageUrls: ["", "", "", ""],
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    videoUrl: string;
    videoId: string;
    message: string;
  }>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          musicUrl: formData.musicUrl,
          captions: formData.captions,
          imageUrls: formData.imageUrls,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate video");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number,
    key: "captions" | "imageUrls"
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) => (i === idx ? value : item)),
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Video Generator
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter video title"
          />
        </div>

        <div>
          <label
            htmlFor="musicUrl"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Music URL
          </label>
          <input
            type="url"
            id="musicUrl"
            name="musicUrl"
            value={formData.musicUrl}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/music.mp3"
          />
        </div>

        {[0, 1, 2, 3].map((idx) => (
          <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caption {idx + 1}
              </label>
              <textarea
                name={`caption${idx}`}
                value={formData.captions[idx]}
                onChange={(e) => handleArrayChange(e, idx, "captions")}
                required
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter caption ${idx + 1}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL {idx + 1}
              </label>
              <input
                type="url"
                name={`imageUrl${idx}`}
                value={formData.imageUrls[idx]}
                onChange={(e) => handleArrayChange(e, idx, "imageUrls")}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`https://example.com/image${idx + 1}.jpg`}
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Generating Video..." : "Generate Video"}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
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
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Download Video
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
