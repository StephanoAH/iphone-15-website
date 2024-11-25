/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false
    })

    const [loadedData, setLoadedData] = useState([])

    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

    useEffect(() => {
        //TODO: Need to be dynamic
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause()
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    useEffect(() => {
      const currentVideoProgress = 0;
      let span = videoSpanRef.current;

      if (span[videoId]) {
        //TODO: animate progress bar
        let animation = gsap.to(span[videoId], {
            onUpdate: () => {

            },
            onComplete: () => {

            },
        })
      }
    }, [videoId, startPlay])
    
    const handleProcess = (type, i) => {
        switch (type) {
          case "video-end":
            setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, videoId: i + 1 }));
            break;
    
          case "video-last":
            setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
            break;
    
          case "video-reset":
            setVideo((prevVideo) => ({ ...prevVideo, videoId: 0, isLastVideo: false }));
            break;
    
          case "pause":
            setVideo((prevVideo) => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }));
            break;
    
          case "play":
            setVideo((prevVideo) => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }));
            break;
    
          default:
            return video;
        }
      };

    return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  className="pointer-events-none"
                  autoPlay
                  muted
                  playsInline={true}
                  preload="auto"
                  key={list.video}
                  ref={(e) => (videoRef.current[i] = e)}
                  onPlay={() => {setVideo((prevVideo) => ({
                    ...prevVideo, isPlaying: true
                  }))}}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                    <p key={text} className="md:text-2xl text-xl font-medium">
                        {text}
                    </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
            {videoRef.current.map((_, i) => (
                <span
                    key={i}
                    ref={(e) => (videoDivRef.current[i] = e)}
                    className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                >
                    <span
                        ref={(e) => (videoSpanRef.current[i] = e)}
                        className="absolute h-full w-full rounded-full"
                    />
                </span>
            ))}
        </div>
        
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
