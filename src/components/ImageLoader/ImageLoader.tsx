import { useEffect, useState } from "react";
import { Details } from "../Details/Details";

const images = [
  "burger.svg",
  "copy.svg",
  "correct-green-prize.svg",
  "correct-green.svg",
  "correct.svg",
  "cross-red.svg",
  "exit.svg",
  "facebook.svg",
  "img.svg",
  "instagram.svg",
  "players.svg",
  "pointer-right.svg",
  "prize.svg",
  "question.svg",
  "telegram.svg",
  "tiktok.svg",
  "twitch.svg",
  "y-burger.svg",
  "youtube.svg",
];

export default function useImagePreloader(imageList: string[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      console.log("PRELOAD");

      if (isCancelled) {
        return;
      }

      const imagesPromiseList: Promise<any>[] = [];
      for (const i of imageList) {
        imagesPromiseList.push(preloadImage(`/${i}`));
      }

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }

    effect();
    return () => {
      isCancelled = true;
    };
  }, [imageList]);

  return { imagesPreloaded };
}
function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = img.onabort = function () {
      reject(src);
    };
    window[src] = img;
    img.src = src;
  });
}
export const ImageLoader = ({ children }: { children: React.ReactNode }) => {
  const { imagesPreloaded } = useImagePreloader(images);

  if (!imagesPreloaded) {
    return (
      <Details isLoading={true} error={undefined} onClose={() => {}}></Details>
    );
  }

  return <>{children}</>;
};
