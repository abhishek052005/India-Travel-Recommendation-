import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllPlaces, getRecommendations } from "../services/api";
import Loader from "./Loader";
import RecommendationCard from "./RecommendationCard";

const CLIMATE_OPTIONS = ["Any", "Tropical", "Arid", "Semi-Arid", "Humid Subtropical", "Alpine"];
const TRAVEL_TYPES = ["Adventure", "Spiritual", "Beach", "Hill Station", "Cultural", "Wildlife", "Heritage"];
const REGION_OPTIONS = ["Any Region", "North India", "South India", "East India", "West India", "Central India"];
const DURATION_OPTIONS = ["1-3 Days", "4-7 Days", "1-2 Weeks", "2-4 Weeks", "1+ Month"];

export default function TravelForm({ initialPlace = "", onRecommendations }) {
    const [allPlaces, setAllPlaces] = useState([]);
    const [query, setQuery] = useState(initialPlace || "");
    const [filtered, setFiltered] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(initialPlace || "");

    const [budget, setBudget] = useState(10000);
    const [climate, setClimate] = useState("Any");
    const [travelType, setTravelType] = useState("");
    const [duration, setDuration] = useState("4-7 Days");
    const [region, setRegion] = useState("Any Region");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [results, setResults] = useState([]);
    const [queryLabel, setQueryLabel] = useState("");

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const resultsRef = useRef(null);

    // Load all place names
    useEffect(() => {
        getAllPlaces()
            .then(setAllPlaces)
            .catch(() => setError("Could not connect to the backend. Please start the FastAPI server."));
    }, []);

    // Set initial place from parent
    useEffect(() => {
        if (initialPlace) {
            setQuery(initialPlace);
            setSelectedPlace(initialPlace);
        }
    }, [initialPlace]);

    // Filter dropdown
    useEffect(() => {
        if (!query) { setFiltered([]); return; }
        const q = query.toLowerCase();
        setFiltered(allPlaces.filter((p) => p.toLowerCase().includes(q)).slice(0, 8));
        setShowDropdown(true);
    }, [query, allPlaces]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (!dropdownRef.current?.contains(e.target) && !inputRef.current?.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const selectPlace = (name) => {
        setSelectedPlace(name);
        setQuery(name);
        setShowDropdown(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPlace && !query) {
            setError("Please select a destination you liked.");
            return;
        }
        const place = selectedPlace || query;
        setError("");
        setLoading(true);
        setResults([]);
        try {
            const data = await getRecommendations(place, 6);
            setResults(data.recommendations);
            setQueryLabel(data.query);
            onRecommendations && onRecommendations(data.recommendations);
            setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
        } catch (err) {
            setError(
                err.response?.status === 404
                    ? `"${place}" not found. Please select a place from the list.`
                    : "Failed to get recommendations. Make sure the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="explore" className="py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-teal-500 text-sm font-semibold uppercase tracking-widest mb-2">
                        🤖 AI-Powered Recommendations
                    </p>
                    <h2 className="section-title">Find Your Perfect Destination</h2>
                    <p className="text-white/50 mt-3 max-w-xl mx-auto">
                        Tell us about a place you love or want to visit, and our ML model
                        instantly finds the most similar hidden gems across India.
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-3xl p-6 sm:p-10 border border-white/10"
                >
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Place search */}
                        <div className="md:col-span-2 lg:col-span-3 relative">
                            <label className="label">📍 Select a Place You Liked</label>
                            <div className="relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value); setSelectedPlace(""); }}
                                    onFocus={() => query && setShowDropdown(true)}
                                    placeholder="e.g. India Gate, Taj Mahal, Goa Beach…"
                                    className="input-field pr-10"
                                    autoComplete="off"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-lg">🔍</span>
                            </div>
                            <AnimatePresence>
                                {showDropdown && filtered.length > 0 && (
                                    <motion.ul
                                        ref={dropdownRef}
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute z-40 mt-1 w-full glass-dark border border-white/15 rounded-2xl
                               overflow-hidden shadow-2xl max-h-60 overflow-y-auto"
                                    >
                                        {filtered.map((p) => (
                                            <li
                                                key={p}
                                                onMouseDown={() => selectPlace(p)}
                                                className="px-4 py-3 text-white/80 hover:text-white hover:bg-saffron/20
                                   cursor-pointer text-sm transition-colors border-b border-white/5 last:border-0"
                                            >
                                                📍 {p}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="label">
                                💰 Budget: <span className="text-saffron font-bold">₹{budget.toLocaleString()}</span>
                            </label>
                            <input
                                type="range" min="500" max="100000" step="500"
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value))}
                                className="w-full mt-2 accent-saffron"
                            />
                            <div className="flex justify-between text-white/30 text-xs mt-1">
                                <span>₹500</span><span>₹1,00,000</span>
                            </div>
                        </div>

                        {/* Climate */}
                        <div>
                            <label className="label">🌤️ Preferred Climate</label>
                            <select
                                value={climate}
                                onChange={(e) => setClimate(e.target.value)}
                                className="input-field"
                            >
                                {CLIMATE_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="label">📅 Trip Duration</label>
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="input-field"
                            >
                                {DURATION_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        {/* Region */}
                        <div>
                            <label className="label">🗺️ Preferred Region</label>
                            <select
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className="input-field"
                            >
                                {REGION_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>

                        {/* Travel Type chips */}
                        <div className="md:col-span-2 lg:col-span-2">
                            <label className="label">🎭 Travel Type</label>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {TRAVEL_TYPES.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setTravelType(travelType === t ? "" : t)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                      ${travelType === t
                                                ? "bg-saffron border-saffron text-white shadow-lg shadow-saffron/30"
                                                : "border-white/15 text-white/60 hover:border-saffron/50 hover:text-white"}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                        >
                            ⚠️ {error}
                        </motion.p>
                    )}

                    {/* Submit */}
                    <div className="mt-8 flex justify-center">
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary text-base px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center gap-3 min-w-56 justify-center"
                        >
                            {loading ? (
                                <>
                                    <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                        🧭
                                    </motion.span>
                                    Searching…
                                </>
                            ) : (
                                <>🚀 Get Recommendations</>
                            )}
                        </motion.button>
                    </div>
                </motion.form>

                {/* Results */}
                <div ref={resultsRef}>
                    {loading && (
                        <div className="mt-12">
                            <Loader />
                        </div>
                    )}

                    <AnimatePresence>
                        {results.length > 0 && !loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-14"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-saffron/30" />
                                    <h3 className="font-display text-2xl font-bold text-white">
                                        Because you liked{" "}
                                        <span className="gradient-text">{queryLabel}</span>
                                    </h3>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-saffron/30" />
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {results.map((place, i) => (
                                        <RecommendationCard
                                            key={place.name}
                                            place={place}
                                            index={i}
                                            onShowSimilar={(name) => {
                                                setQuery(name); setSelectedPlace(name);
                                                inputRef.current?.focus();
                                                setTimeout(() => {
                                                    inputRef.current?.closest("form")?.requestSubmit();
                                                }, 100);
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
