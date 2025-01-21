import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'
import ScrollTrigger from 'gsap/ScrollTrigger';

const AnimatedTitle = ({ title, containerClass }) => {
    const containerRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);


    useEffect(() => {   
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "100 bottom",
                    end: "top bottom",
                    toggleActions: "play none none reverse"
                }
            })
            tl.to(".animated-word", {
                opacity: 1,
                transform: "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)",
                ease: "power2.inOut",
                stagger: 0.02
            })
        }, containerRef.current)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className={`animated-title ${containerClass}`}>
            {title.split('<br/>').map((line, idx) => {
                return (
                    <div key={idx} className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3">
                        {line.split(' ').map((word, i) => (
                            <span key={i} className="animated-word" dangerouslySetInnerHTML={{__html: word}}></span>
                        ))}
                    </div>  
                )
            })}
        </div>
    )
}

export default AnimatedTitle;