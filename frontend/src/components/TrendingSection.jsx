import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTrending } from "../services/api";

const TYPE_EMOJIS = {
    Temple: "🛕", Tomb: "🏛️", Park: "🌳", Museum: "🏛️",
    Beach: "🏖️", Fort: "🏰", "Theme Park": "🎡",
};

export default function TrendingSection({ onExplore }) {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrending()
            .then(setTrending)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="trending" className="py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
                >
                    <div>
                        <p className="text-saffron text-sm font-semibold uppercase tracking-widest mb-2">
                            🔥 Most Popular Right Now
                        </p>
                        <h2 className="section-title">Trending Destinations</h2>
                        <p className="text-white/50 mt-2 max-w-md">
                            Top-rated places loved by thousands of travellers across India.
                        </p>
                    </div>
                    <a href="#explore" className="btn-secondary text-sm self-start sm:self-auto">
                        View All →
                    </a>
                </motion.div>

                {loading ? (
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 w-52 h-64 glass rounded-2xl animate-pulse"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
                        {trending.map((place, i) => (
                            <motion.div
                                key={place.name}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex-shrink-0 w-56 glass rounded-2xl overflow-hidden card-hover snap-start cursor-pointer"
                                onClick={() => onExplore && onExplore(place.name)}
                            >
                                {/* Card top */}
                                <div
                                    className="h-36 flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, hsl(${i * 55}deg 60% 18%), hsl(${i * 55 + 50}deg 65% 30%))`,
                                    }}
                                >
                                    <span className="text-5xl">{TYPE_EMOJIS[place.type] || "📍"}</span>
                                    <div className="absolute top-2 right-2 bg-gold-500/90 text-navy text-[10px] font-black
                                  px-2 py-0.5 rounded-full text-navy-900">
                                        #{i + 1}
                                    </div>
                                </div>

                                {/* Card body */}
                                <div className="p-4">
                                    <h3 className="font-bold text-white text-sm leading-tight">{place.name}</h3>
                                    <p className="text-white/45 text-xs mt-1">📍 {place.city}</p>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-gold-300 text-xs font-semibold">★ {place.rating}</span>
                                        <span className="text-white/40 text-[10px]">{place.type}</span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onExplore && onExplore(place.name); }}
                                        className="mt-3 w-full text-center text-xs font-medium text-saffron hover:text-white
                               border border-saffron/30 hover:border-saffron/80 rounded-lg py-1.5
                               transition-all duration-200"
                                    >
                                        Explore →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
