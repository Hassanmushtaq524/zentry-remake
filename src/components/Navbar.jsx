import React, { useEffect, useRef, useState } from 'react'
import Button from './Button.jsx';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

/**
 * Define nav items
 */
const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];


/**
 * @returns The navbar component
 */
const Navbar = () => {
    const [indicatorActive, setIndicatorActive] = useState(true);
    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);
    const { y: currentScrollY } = useWindowScroll();
    const [ navVisible, setNavVisible] = useState(true);
    const [lastY, setLastY] = useState(0);

    /**
     * Toggle the audio element
     */
    const toggleAudioElement = () => {
        setIndicatorActive((prev) => !prev);
    }


    /**
     * For navbar 
     */
    useEffect(( ) => {
        if (currentScrollY == 0) {
            setNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        } else if (currentScrollY > lastY) {
            setNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        } else if (currentScrollY < lastY) {
            setNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }
        setLastY(currentScrollY);
    }, [currentScrollY])



    /** animation of navbar */
    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y : navVisible ? 0 : -200,
            opacity: navVisible ? 1 : 0,
            duration: 0.2
        })
    }, [navVisible])



    /**
     * For audio
     */
    useEffect(() => {
        if (indicatorActive) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [indicatorActive])



    return (
        <div ref={navContainerRef} className="fixed z-[100] floating-nav top-4 h-16 border-none transition-all duration-700 sm:inset-x-6 inset-x-0">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    {/* left */}
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.png" alt="logo" className="w-10"/>
                        <Button id="product-button" title="Products" leftIcon={<TiLocationArrow/>} containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"/>
                    </div>
                    {/* right */}
                    <div className="flex items-center h-full">
                        {/* all nav items */}
                        <div className="hidden md:block">
                            {navItems.map((item, idx) => (
                                <a key={idx} href={`${item.toLowerCase()}`} className="nav-hover-btn">
                                    {item}
                                </a>
                            ))}
                        </div>
                        {/* music btn */}
                        <button className="ml-10 flex items-center space-x-0.5" onClick={toggleAudioElement}>
                            <audio ref={audioElementRef} src="/public/audio/loop.mp3" loop className="hidden" />
                            {[1, 2, 3, 4].map((bar) => (
                                <div key={bar} className={`indicator-line ${indicatorActive ? 'active' : ''}`} style={{animationDelay : `${bar * 0.1}s`}}/>
                            ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar