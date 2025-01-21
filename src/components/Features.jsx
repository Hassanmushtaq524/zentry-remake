import React, { useRef, useState } from 'react'
import BentoCard from './BentoCard';
import { TiLocationArrow } from 'react-icons/ti';

const BentoTilt = ({children, className = ''}) => {
    const [transformStyle, setTransformStyle] = useState('');
    const itemRef = useRef();


    const handleMouseMove = (e) => {
        if (!itemRef.current) return;

        const { left, top, width, height } = itemRef.current.getBoundingClientRect();
        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;
        const tiltX = (relativeY -0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;
        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;
        setTransformStyle(newTransform)
    } 

    const handleMouseLeave = () => {
        setTransformStyle('');
    }

    return (
        <div className={className} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transform: transformStyle }}>
            {children}
        </div>
    )
}

const Features = () => {
  return (
    <section id="features" className="bg-black pb-52">
        <div className="container mx-auto px-3 md:px-10">
            <div className="px-5 py-32">
                <p className="font-circular-web text-lg text-blue-50">Into the Metagame Layer</p>
                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">Immerse yourself in an IP-rich product universe where AI-driven gamification and hyper-personalization lead humans & AI into a global play economy.</p>
            </div>
            <div className="border-hsla mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh] cursor-pointer">
                <BentoCard
                    title={<>Radia<b>n</b>t</>}
                    src={"/public/videos/feature-1.mp4"}
                    desc={"The game of games transforming your in-game actions across Web2 & Web3 titles into a rewarding adventure."}
                />
            </div>
            <div className='grid grid-rows-3 grid-cols-2 h-[135vh] gap-7'>
                <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                    <BentoCard
                        src={"/public/videos/feature-2.mp4"}
                        title={<>Zig<b>m</b>a</>}
                        desc={"The game of games transforming your in-game actions across Web2 & Web3 titles into a rewarding adventure."}
                    />
                </BentoTilt>
                <BentoTilt className="bento-tilt_1 row-span-1 md:ms-0 ms-32  md:col-span-1">
                    <BentoCard
                        src={"/public/videos/feature-3.mp4"}
                        title={<>N<b>e</b>xus</>}
                        desc={"The game of games transforming your in-game actions across Web2 & Web3 titles into a rewarding adventure."}
                    />
                </BentoTilt>
                <BentoTilt className="bento-tilt_1 md:me-0 me-14  md:col-span-1">
                    <BentoCard
                        src={"/public/videos/feature-4.mp4"}
                        title={<>Azul</>}
                        desc={"The game of games transforming your in-game actions across Web2 & Web3 titles into a rewarding adventure."}
                    />
                </BentoTilt>
                <BentoTilt className="bento-tilt_2 hover:scale-95 duration-700">
                    <div className="flex size-full flex-col justify-between bg-violet-300 p-5 hover:scale-105 duration-700">
                        <h1 className="bento-title special-font">More coming soon</h1>
                        <TiLocationArrow className="m-5 scale-[5] self-end"/>
                    </div>
                </BentoTilt>
                <BentoTilt className="bento-tilt_2">
                    <video
                        src='/public/videos/feature-5.mp4'
                        loop
                        muted
                        autoPlay
                        className="object-cover size-full object-center"
                    />
                </BentoTilt>
            </div>
        </div>
    </section>
    
  )
}

export default Features;