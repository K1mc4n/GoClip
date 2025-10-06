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
