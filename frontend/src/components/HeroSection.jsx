import { motion } from "framer-motion";

const FLASHCARDS = [
    { place: "Goa", desc: "Sun-kissed shores & vibrant culture", emoji: "🏖️" },
    { place: "Manali", desc: "Snow peaks & lush green valleys", emoji: "🏔️" },
    { place: "Jaipur", desc: "The magnificent Pink City", emoji: "🏰" },
    { place: "Kerala", desc: "God's Own Country backwaters", emoji: "🛶" },
    { place: "Leh-Ladakh", desc: "Breathtaking high-altitude desert", emoji: "🏍️" },
    { place: "Varanasi", desc: "Ancient spiritual capital", emoji: "🛕" },
    // Only 6 cards fit nicely in a 2x3 or 3x2 grid
];

export default function HeroSection() {
    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0F172A 0%, #0d2740 45%, #0a2a2a 100%)" }}
        >
            {/* Custom CSS for 3D flip effect */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .group:hover .flip-inner { transform: rotateY(180deg); }
            `}} />

            {/* Animated background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }}
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: [0, -60, 0] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "easeInOut", delay: 5 }}
                    className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15"
                    style={{ background: "radial-gradient(circle, #0D9488, transparent)" }}
                />
                <motion.div
                    animate={{ y: [0, -30, 0] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, #F59E0B, transparent)" }}
                />
                {/* Floating dots */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ repeat: Infinity, duration: 3 + (i % 3), delay: i * 0.4, ease: "easeInOut" }}
                        className="absolute rounded-full"
                        style={{
                            width: `${4 + (i % 4) * 2}px`,
                            height: `${4 + (i % 4) * 2}px`,
                            left: `${10 + i * 7}%`,
                            top: `${15 + (i % 5) * 15}%`,
                            background: ["#FF6B35", "#0D9488", "#F59E0B"][i % 3],
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left – Text */}
                    <div className="lg:pr-8">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 glass border border-saffron/30 rounded-full
                         px-4 py-2 text-sm text-saffron font-medium mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
                            🤖 ML-Powered Travel Intelligence
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6"
                        >
                            Discover{" "}
                            <span className="gradient-text">Incredible</span>
                            <br />
                            India
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg"
                        >
                            Our AI-powered system analyzes thousands of destinations across India
                            and finds the perfect match for your travel style — instantly.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a href="#explore" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
                                🧭 Start Exploring
                            </a>
                            <a href="#trending" className="btn-secondary text-base px-6 py-4 flex items-center gap-2">
                                🔥 See Trending
                            </a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-8 mt-12"
                        >
                            {[
                                { num: "500+", label: "Destinations" },
                                { num: "30+", label: "States" },
                                { num: "AI", label: "Powered" },
                            ].map((s) => (
                                <div key={s.label}>
                                    <p className="font-display font-bold text-2xl text-saffron">{s.num}</p>
                                    <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right – Flashcard Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[140px]"
                    >
                        {FLASHCARDS.map((card, i) => (
                            <motion.div
                                key={card.place}
                                animate={{ y: i % 2 === 0 ? [0, -6, 0] : [0, 6, 0] }}
                                transition={{ repeat: Infinity, duration: 4 + (i % 3), ease: "easeInOut" }}
                                className="group perspective-1000 cursor-pointer w-full h-full"
                            >
                                <div className="flip-inner relative w-full h-full transition-transform duration-700 preserve-3d">
                                    {/* Front of card */}
                                    <div className="absolute inset-0 backface-hidden glass rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 border border-white/10 hover:border-saffron/40 transition-colors">
                                        <span className="text-4xl drop-shadow-lg">{card.emoji}</span>
                                        <p className="font-display font-bold text-white text-base leading-tight">
                                            {card.place}
                                        </p>
                                    </div>

                                    {/* Back of card */}
                                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-saffron/90 to-teal-500/90 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl shadow-teal/20">
                                        <p className="font-display font-bold text-white text-base mb-1">{card.place}</p>
                                        <p className="text-white/90 text-[11px] leading-snug font-medium">
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                        <rect x="6" y="1" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 14l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
