import VideoCard from "@/components/VideoCard";

// Placeholder: Replace with actual user video fetch
const userVideos = [
  { url: "/sample1.mp4", title: "My First Clip", author: "user_address" },
];

export default function ProfilePage() {
  return (
    <div className="grid gap-6 mt-6">
      {userVideos.map((v, i) => (
        <VideoCard key={i} video={v} />
      ))}
    </div>
  );
}
