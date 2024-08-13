export const extractYouTubeVideoId = (url: string): string | null => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const extractTwitchChannel = (url: string): string | null => {
  const regex = /(?:twitch\.tv\/)([^"&?\/\s]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
