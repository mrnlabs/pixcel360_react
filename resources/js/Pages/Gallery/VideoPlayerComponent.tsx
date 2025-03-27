import { useEffect, useRef } from "react";
import { VideoPlayer, VideoPlayerProps } from "@graphland/react-video-player";
import { useWindowSize } from "@/hooks/useWindowSize";


const VideoPlayerComponent = ({ videoSrc }: any) => {
  const videoRef = useRef(null);
  const { width } = useWindowSize();

  const videoSources = [
    {
      src: videoSrc,
      type: "video/mp4",
    },
    // Add more video sources as needed
  ];
  
  const videoProps: VideoPlayerProps = {
    theme: "forest", // 'city', 'fantasy', 'forest', 'sea'
    height: 500,
    width: width > 1300 ? 600 : 250,
    autoPlay: false,
    loop: false,
    sources: videoSources,
    controlBar: {
      skipButtons: {
        forward: 5,
        backward: 5,
      },
    },
    playbackRates: [0.5, 1, 1.5, 2],
    disablePictureInPicture: false,
    onReady: () => {
      // console.log("Video player is ready!");
    },
  };

  return (
    <VideoPlayer {...videoProps} />
  );
};

export default VideoPlayerComponent;
