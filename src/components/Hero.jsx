import React from 'react'
import { useState, useRef } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIdx, setcurrentIdx] = useState(1);
    const [hasClicked, sethasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const animateVidRef = useRef(null);
    const currentVidRef = useRef(null);
    const nextVidIdx = (currentIdx % totalVideos) + 1



    
    const handleMiniVdClick = () => {
        sethasClicked(true);
        setcurrentIdx(nextVidIdx);
    }



    const handleVideoLoad = () => {
        setIsLoading(false);
        setLoadedVideos((prev) => (prev + 1));
    }



    const getVideoSrc = (index) => {
        return `../public/videos/hero-${index}.mp4`;
    }



    useGSAP(() => {
        gsap.set('#animate-video', { visibility: "visible" });
        gsap.to('#animate-video', {
            transformOrigin: "center center",
            width: "100%",
            height: "100%",
            scale: 1,
            duration: 1,
            ease: "power1.inOut",
            onStart: () => {
                animateVidRef.current.play();
                currentVidRef.current.src = getVideoSrc((currentIdx - 1 <= 0) ? 4 : currentIdx - 1)
            },
            onComplete: () => {
                currentVidRef.current.src = getVideoSrc(currentIdx)
            }
        })
        gsap.from("#next-video", {
            transformOrigin: "center center",
            scale: 0,
            duration: 1.5,
            ease: "power1.inOut"
        })
    }, { dependencies: [currentIdx], revertOnUpdate: true})



    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true
            },
        });
    }, {dependencies: []})


    
    return (
        <div id='hero' className="relative h-dvh w-screen overflow-x-hidden">
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                <div className="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                </div>
                </div>
            )}
            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniVdClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video id="next-video" 
                                   src={getVideoSrc(nextVidIdx)} 
                                   loop
                                   muted
                                   className="size-64 origin-center scale-150 object-cover object-center"
                                   onLoadedData={handleVideoLoad}/>
                        </div>
                    </div>
                </div>

                <video
                    id="animate-video"
                    ref={animateVidRef}
                    src={getVideoSrc(currentIdx)}
                    loop
                    muted
                    className="absolute-center invisible z-20 size-64 object-cover object-center"
                />

                <video 
                    id="current-video"
                    ref={currentVidRef}
                    src={getVideoSrc(currentIdx)}
                    autoPlay
                    loop 
                    muted
                    className="absolute top-0 left-0 object-cover object-center size-full"
                    onLoadedData={handleVideoLoad}
                />
                <h1 className="special-font hero-heading absolute right-5 bottom-5 z-40 text-blue-75">
                    G<b>a</b>ming
                </h1>
                <div className="absolute top-0 left-0 size-fit z-40">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className='special-font hero-heading text-blue-75'>
                            redefi<b>n</b>e
                        </h1>
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-75">
                            Enter the Metagame Layer <br/>
                            Unleash the play economy
                        </p>
                        <Button id="watch-trailer"
                                title="Watch Trailer" 
                                leftIcon={<TiLocationArrow/>} 
                                containerClass="!bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>
            <h1 className="special-font hero-heading absolute right-5 bottom-5 text-black">
                G<b>a</b>ming
            </h1>
            
           

        </div>
  )
}

export default Hero