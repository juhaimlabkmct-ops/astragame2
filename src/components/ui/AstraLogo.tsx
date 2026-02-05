export default function AstraLogo({ className = "", size = "large" }: { className?: string, size?: "small" | "large" }) {
    const isLarge = size === "large";
    const width = isLarge ? 300 : 120;
    const height = isLarge ? 'auto' : 40;

    return (
        <div className={`relative ${className} ${isLarge ? 'p-4' : 'p-1'} flex justify-center items-center perspective-container`}>
            <img
                src="/logo.png"
                alt="ASTRA Logo"
                style={{ width: isLarge ? '100%' : width, maxWidth: width, height: height }}
                className="object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] animate-float-3d"
            />
        </div>
    );
}
