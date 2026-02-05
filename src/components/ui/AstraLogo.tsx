export default function AstraLogo({ className = "", size = "large" }: { className?: string, size?: "small" | "large" }) {
    const isLarge = size === "large";
    const width = isLarge ? 300 : 120;
    const height = isLarge ? 80 : 32;
    const fontSize = isLarge ? 60 : 24;

    return (
        <div className={`relative ${className} ${isLarge ? 'p-4' : 'p-1'}`}>
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse-glow"
            >
                {/* Main Text */}
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="var(--c-neon-cyan)"
                    fontFamily="var(--font-orbitron)"
                    fontWeight="900"
                    fontSize={fontSize}
                    letterSpacing="0.1em"
                >
                    ASTRA
                </text>

                {/* Subtle decorative line */}
                <path
                    d={`M${width * 0.1} ${height * 0.85} H${width * 0.9}`}
                    stroke="white"
                    strokeWidth={isLarge ? 2 : 1}
                    strokeOpacity="0.5"
                />
            </svg>

            {/* Glitch Overlay (Clone) */}
            <div className="absolute inset-0 blur-sm opacity-50 pointer-events-none mix-blend-screen">
                <svg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    fill="none"
                    className="opacity-70 translate-x-[1px]"
                >
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="red"
                        fontFamily="var(--font-orbitron)"
                        fontWeight="900"
                        fontSize={fontSize}
                        letterSpacing="0.1em"
                    >
                        ASTRA
                    </text>
                </svg>
            </div>
        </div>
    );
}
