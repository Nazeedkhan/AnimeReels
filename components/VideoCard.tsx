import React, { useState, useEffect, useRef } from "react";
import { Video } from "@/types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { HiFolderDownload } from "react-icons/hi";
interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideosPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  const downloadVideo = (fileName: any, dataUrl: any) => {
    console.log(fileName, dataUrl);
    // Construct the 'a' element
    var link = document.createElement("a");
    link.download = fileName;
    link.target = "_blank";

    // Construct the URI
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();

    // Cleanup the DOM
    document.body.removeChild(link);
  
    // delete link;
  };

  return (
    <>
      <div
        className="flex flex-col border-b-2 border-gray-200 pb-6 
      "
      >
        <div>
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
            <div className="md:w-16 md:h-16 w-10 h-10 ">
              <Link href={`/profile/${post.postedBy._id}`}>
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    alt="profile photo"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div className="w-full">
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className="flex gap-2 items-center">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary ">
                    {post.postedBy.userName}{" "}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {" "}
                    {post.postedBy.userName}{" "}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-4 relative " id="upperdiv">
          <div
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
            className="rounded-3xl"
          >
            <Link href={`/detail/${post._id}`}>
              <video
                loop
                id="videoCardLeftMargin"
                ref={videoRef}
                className="lg:w-[600px] h-[450px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100 pr-2"
                src={post.video.asset.url}
              ></video>
            </Link>
            {
              <div className="bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-8 lg:justify-between w-[100px] md:w-[50px] p-3 text-[#4a266a]">
                {playing ? (
                  <button onClick={onVideosPress}>
                    <BsFillPauseFill className="text-[#4a266a] text-4xl lg:text-4xl" />
                  </button>
                ) : (
                  <button onClick={onVideosPress}>
                    <BsFillPlayFill className="text-[#4a266a] text-4xl lg:text-4xl" />
                  </button>
                )}
                {isVideoMuted ? (
                  <button
                    onClick={() => {
                      setIsVideoMuted(false);
                    }}
                  >
                    <HiVolumeOff className="text-[#4a266a] text-4xl lg:text-4xl" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsVideoMuted(true);
                    }}
                  >
                    <HiVolumeUp className="text-[#4a266a] text-4xl lg:text-4xl" />
                  </button>
                )}
                <button
                  onClick={() => {
                    downloadVideo(post.caption, post.video.asset.url);
                  }}
                >
                  <HiFolderDownload className="text-[#4a266a] text-4xl lg:text-4xl" />
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
