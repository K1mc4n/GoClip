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
