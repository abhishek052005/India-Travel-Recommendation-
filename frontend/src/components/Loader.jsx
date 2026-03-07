import { motion } from "framer-motion";

export default function Loader({ text = "Finding your perfect destinations…" }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-8">
            {/* Animated compass */}
            <div className="relative w-20 h-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-4 border-t-saffron border-r-teal border-b-gold border-l-transparent"
                />
                <div className="absolute inset-3 rounded-full bg-navy-900 flex items-center justify-center text-2xl">
                    🧭
                </div>
            </div>

            {/* Bouncing dots */}
            <div className="flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -12, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: "easeInOut" }}
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                            background: ["#FF6B35", "#0D9488", "#F59E0B", "#FF6B35"][i],
                        }}
                    />
                ))}
            </div>

            <p className="text-white/60 text-sm font-medium animate-pulse">{text}</p>
        </div>
    );
}
