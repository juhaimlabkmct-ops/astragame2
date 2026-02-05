import React from 'react';

const CyberBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050510]">
            {/* Moving Grid Floor */}
            <div className="absolute inset-0 perspective-grid opacity-20">
                <div className="grid-plane"></div>
            </div>

            {/* Floating Particles/Stars */}
            <div className="absolute inset-0 particles-container">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-radial-gradient"></div>
        </div>
    );
};

export default CyberBackground;
