import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react'
import gsap from 'gsap';
import AnimatedTitle from './AnimatedTitle';


const About = () => {
    gsap.registerPlugin(ScrollTrigger);
    
    /**
     * For about image clipping
     */
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#clip",
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true
            }
        })

        tl.to(".mask-clip-path", {
            width: "100%",
            height: "100%"
        })
    })

    return (
        <div id='about' className="min-h-screen w-screen">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <h2 className="text-sm font-general uppercase md:text-[10px]">Welcome to Zentry</h2>

                <AnimatedTitle 
                    title="Disc<b>o</b>ver the world's l<b>a</b>rgest shared adventure" 
                    containerClass="font-zentry mt-5 text-center text-4xl !text-black uppercase leading-[0.8] md:text-[6rem]"
                />

                <div className="about-subtext">
                    <p>The Game of Games begins-your life, now an epic MMORPG</p>
                    <p>Zentry now unites every player from countless games and platforms</p>
                </div>
            </div>
            <div id="clip" className="h-dvh w-screen">
                <div className="mask-clip-path about-image">
                    <img className="absolute top-0 left-0 size-full object-cover" src="/public/img/about.webp" alt="about-image" />
                </div>
            </div>
        </div>
    )
}

export default About;