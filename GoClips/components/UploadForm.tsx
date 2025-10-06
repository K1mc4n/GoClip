"use client";
import { useState } from "react";
import { uploadToIPFS } from "@/lib/ipfs";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("No file selected");
    const ipfsUrl = await uploadToIPFS(file);
    setUrl(ipfsUrl);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Upload New Clip</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-600 rounded-lg">
        Upload
      </button>
      {url && (
        <div className="mt-4">
          <p className="text-green-400">Uploaded successfully!</p>
          <video src={url} controls className="w-full mt-2 rounded-lg" />
        </div>
      )}
    </div>
  );
}
