'use client';

import React, { useEffect, useState } from 'react';

const CyberBackground = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Parallax mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050510]">
            {/* Primary Parallax Grid Floor */}
            <div
                className="absolute inset-0 perspective-grid opacity-60"
                style={{
                    transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                    transition: 'transform 0.1s ease-out'
                }}
            >
                <div className="grid-plane"></div>
            </div>

            {/* Secondary Depth Grid */}
            <div className="absolute inset-0 perspective-grid opacity-30">
                <div className="grid-plane-secondary"></div>
            </div>

            {/* Floating Particles/Stars */}
            <div className="absolute inset-0 particles-container">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Data Streams */}
            <div className="absolute inset-0">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={`stream-${i}`}
                        className="data-stream"
                        style={{
                            left: `${(i + 1) * 12}%`,
                            animationDelay: `${i * 0.7}s`,
                            animationDuration: `${4 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Floating 3D Geometric Shapes */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
                    transition: 'transform 0.1s ease-out'
                }}
            >
                <div className="shape-cube w-20 h-20 top-[20%] left-[15%]"></div>
                <div className="shape-cube w-32 h-32 top-[60%] right-[10%]" style={{ animationDelay: '2s' }}></div>
                <div className="shape-cube w-16 h-16 bottom-[15%] left-[40%]" style={{ animationDelay: '4s' }}></div>
                <div className="shape-cube w-24 h-24 top-[40%] right-[30%]" style={{ animationDelay: '6s' }}></div>
            </div>

            {/* Vignette Overlay with breathing effect */}
            <div className="absolute inset-0 bg-radial-gradient"></div>
        </div>
    );
};

export default CyberBackground;
