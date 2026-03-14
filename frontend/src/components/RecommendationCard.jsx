import { motion } from "framer-motion";

const REGION_EMOJIS = {
    Northern: "🏔️", Southern: "🌴", Eastern: "🌿", Western: "🏜️", Central: "🌾",
};
const TYPE_EMOJIS = {
    Temple: "🛕", Tomb: "🏛️", Park: "🌳", Museum: "🏛️", Beach: "🏖️",
    Trek: "🥾", Fort: "🏰", Wildlife: "🐾", Waterfall: "💦", Lake: "🌊",
    "Theme Park": "🎡", "War Memorial": "⚔️", "Heritage Site": "🏺",
};

function StarRating({ rating }) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.3;
    return (
        <span className="stars text-sm">
            {"★".repeat(full)}
            {half ? "½" : ""}
            {"☆".repeat(Math.max(0, 5 - full - (half ? 1 : 0)))}
        </span>
    );
}

export default function RecommendationCard({ place, onShowSimilar, index = 0 }) {
    const emoji = TYPE_EMOJIS[place.type] || REGION_EMOJIS[place.zone] || "📍";
    const fee = Number(place.entrance_fee);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass rounded-2xl overflow-hidden card-hover flex flex-col"
        >
            {/* Colorful header band */}
            <div
                className="h-44 flex items-center justify-center relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, hsl(${(index * 60) % 360},60%,20%), hsl(${(index * 60 + 40) % 360},70%,35%))`,
                }}
            >
                {/* Decorative circles */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/8" />
                <span className="text-6xl relative z-10 drop-shadow-lg">{emoji}</span>

                {/* Type badge */}
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest
                         bg-black/40 backdrop-blur-sm text-white/80 px-2.5 py-1 rounded-full">
                    {place.type}
                </span>
                {/* Zone badge */}
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest
                         bg-white/10 backdrop-blur-sm text-white/70 px-2.5 py-1 rounded-full">
                    {place.zone}
                </span>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1 gap-3">
                <div>
                    <h3 className="font-display font-bold text-xl text-white leading-tight">{place.name}</h3>
                    <p className="text-white/50 text-sm mt-0.5">
                        📍 {place.city}, {place.state}
                    </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <StarRating rating={Number(place.rating)} />
                    <span className="text-white/60 text-xs">{place.rating} / 5</span>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                    <Stat icon="💰" label="Entry Fee" value={fee === 0 ? "Free" : `₹${fee}`} />
                    <Stat icon="⏱️" label="Visit Time" value={`${place.visit_hours} hrs`} />
                    <Stat icon="🌤️" label="Best Time" value={place.best_time || "Any"} />
                    <Stat icon="✨" label="Significance" value={place.significance || "Cultural"} />
                </div>

                {/* Camera badge */}
                {place.dslr_allowed === "Yes" && (
                    <span className="text-xs text-teal-500 font-medium">📷 DSLR Photography Allowed</span>
                )}

                {/* Action */}
                <button
                    onClick={() => onShowSimilar && onShowSimilar(place.name)}
                    className="mt-auto btn-secondary text-sm w-full text-center"
                >
                    🔍 Show Similar Places
                </button>
            </div>
        </motion.div>
    );
}

function Stat({ icon, label, value }) {
    return (
        <div className="bg-white/5 rounded-xl p-2.5 flex flex-col gap-0.5">
            <span className="text-white/40 text-[10px] uppercase tracking-wide">{icon} {label}</span>
            <span className="text-white text-sm font-semibold truncate">{value}</span>
        </div>
    );
}
