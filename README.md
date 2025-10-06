# # 🚀 Project Prompt: GoClips v0.3 — Web3 Ready Social Video App

You are GitHub Copilot working as a full-stack Next.js assistant.

Create a project called **GoClips**, a decentralized short video sharing app with:
- Wallet login (Coinbase OnchainKit)
- Video upload (to IPFS via Web3.Storage)
- Feed page (shows uploaded videos)
- Profile page (shows user’s uploaded videos)
- Share button (share to Baseapp or Farcaster)
- Styled using TailwindCSS + Shadcn UI
- Built with Next.js (App Router, TypeScript)

---

## 📁 Project Structure
```
GoClips/
 ├─ app/
 │   ├─ layout.tsx
 │   ├─ page.tsx                → Feed
 │   ├─ upload/page.tsx         → Upload video
 │   ├─ profile/[address]/page.tsx
 │   └─ globals.css
 ├─ components/
 │   ├─ Navbar.tsx
 │   ├─ VideoCard.tsx
 │   └─ UploadForm.tsx
 ├─ lib/
 │   ├─ ipfs.ts                 → Web3.Storage helper
 │   └─ supabase.ts             → (for metadata)
 ├─ types/
 │   └─ video.ts
 ├─ public/
 │   └─ logo.png
 ├─ package.json
 └─ README.md
```

---

## ⚙️ Features Implementation Guide

### 1. Setup & Dependencies
Install base dependencies:
```bash
npx create-next-app@latest GoClips --typescript --app
cd GoClips
npm install tailwindcss postcss autoprefixer @coinbase/onchainkit web3.storage
npx tailwindcss init -p
npx shadcn-ui@latest init
```

### 2. Tailwind config
In `tailwind.config.js`:
```js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

Add to `globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-950 text-gray-100;
}
```

---

### 3. Components

#### `components/Navbar.tsx`
```tsx
"use client";
import { Wallet } from "@coinbase/onchainkit/wallet";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-gray-900">
      <h1 className="text-xl font-bold text-white">GoClips</h1>
      <Wallet />
    </nav>
  );
}
```

#### `components/VideoCard.tsx`
```tsx
type Props = { video: { url: string; title: string; author: string } };

export default function VideoCard({ video }: Props) {
  return (
    <div className="rounded-xl overflow-hidden bg-gray-900 shadow-lg">
      <video controls className="w-full h-64 object-cover">
        <source src={video.url} type="video/mp4" />
      </video>
      <div className="p-3">
        <h3 className="text-white font-semibold">{video.title}</h3>
        <p className="text-gray-400 text-sm">@{video.author}</p>
      </div>
    </div>
  );
}
```

---

### 4. IPFS Helper (`lib/ipfs.ts`)
```ts
import { Web3Storage } from "web3.storage";

export function getAccessToken() {
  return process.env.WEB3_STORAGE_TOKEN!;
}

export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export async function uploadToIPFS(file: File) {
  const client = makeStorageClient();
  const cid = await client.put([file]);
  return `https://${cid}.ipfs.w3s.link/${file.name}`;
}
```

---

### 5. Upload Page (`app/upload/page.tsx`)
```tsx
"use client";
import { useState } from "react";
import { uploadToIPFS } from "@/lib/ipfs";

export default function UploadPage() {
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
```

---

### 6. Feed Page (`app/page.tsx`)
```tsx
import VideoCard from "@/components/VideoCard";

const sampleVideos = [
  { url: "/sample1.mp4", title: "First Clip", author: "demo_user" },
  { url: "/sample2.mp4", title: "Second Clip", author: "builder123" },
];

export default function HomePage() {
  return (
    <div className="grid gap-6 mt-6">
      {sampleVideos.map((v, i) => (
        <VideoCard key={i} video={v} />
      ))}
    </div>
  );
}
```

---

### 7. Share Button (to Farcaster)
```tsx
export function ShareToFarcaster({ url }: { url: string }) {
  const handleShare = () => {
    const shareUrl = `https://warpcast.com/~/compose?embeds[]=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank");
  };
  return (
    <button
      onClick={handleShare}
      className="bg-purple-600 text-white px-3 py-1 rounded-md mt-2"
    >
      Share to Farcaster
    </button>
  );
}
```

---

### 8. Root Layout
```tsx
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950 text-gray-100">
        <Navbar />
        <main className="p-6 max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
```

---

### 9. Run Project
```bash
npm install
npm run dev
```

Set your `.env.local`:
```
WEB3_STORAGE_TOKEN=your_web3_storage_api_key_here
```

Visit: [http://localhost:3000](http://localhost:3000)

---

💡 *Optional next steps for Copilot:*
- Add comments section under each video  
- Connect Supabase for metadata storage  
- Add “mint as NFT” button using Zora or Base network  
- Enable Farcaster Frames preview  

---

🧠 Goal for Copilot:
> Generate and complete this entire project structure, making it runnable instantly with placeholder components, correct imports, and full functionality as described.
