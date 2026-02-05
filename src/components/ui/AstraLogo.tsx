export default function AstraLogo({ className = "", size = "large" }: { className?: string, size?: "small" | "large" }) {
    const isLarge = size === "large";
    const width = isLarge ? 300 : 120;
    const height = isLarge ? 100 : 40; // Adjusted for aspect ratio

    return (
        <div className={`relative ${className} ${isLarge ? 'p-4' : 'p-1'} flex justify-center items-center`}>
            <img
                src="/logo.png"
                alt="ASTRA Logo"
                width={width}
                height={height}
                className="object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            />
        </div>
    );
}
