import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
  videoSrc: string;
}

const VideoPlayer = ({ videoSrc }: VideoPlayerProps) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, {
        controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
      });

      return () => {
        player.destroy(); // Clean up
      };
    }
  }, []);

  return (
  <video id="player" playsInline={true} controls data-poster={videoSrc}>
  <source src={videoSrc} type="video/mp4" />
  <source src={videoSrc} type="video/webm" />
</video>

  );
};

export default VideoPlayer;
