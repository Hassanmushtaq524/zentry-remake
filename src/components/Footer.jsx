import React from 'react';
import { FaTwitter, FaTwitch, FaYoutube } from 'react-icons/fa';


const links = [
    { href: "", icon: <FaYoutube/> },
    { href: "", icon: <FaTwitter/> },
    { href: "", icon: <FaTwitch/> }
]

const Footer = () => {
  return (
    <footer className="h-fit w-screen bg-violet-300 py-4 text-black flex flex-col items-center justify-between gap-10">
        <h1 className="text-6xl font-zentry h-fit w-fit">
            Zentry
        </h1>
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row px-4">
            <p className="text-center text-sm md:text-left">&copy; Nova 2024. All rights reserved</p>
            <div className="flex justify-center gap-4 md:justify-start">
                {links.map((link, idx) => (
                    <a href={link.href} key={idx} rel='noopener noreferrer' className="text-black transition-colors duration-500 ease-in-out hover:text-white">
                        {link.icon}
                    </a>
                ))}
            </div>
            <a href="#privacy-policy" className="text-center text-sm hover:underline md:text-right">
                Privacy Policy
            </a>
        </div>

    </footer>
  )
}

export default Footer