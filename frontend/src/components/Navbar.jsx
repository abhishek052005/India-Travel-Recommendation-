import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiCompass } from "react-icons/fi";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = ["Home"];

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-dark shadow-xl shadow-black/40" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-saffron flex items-center justify-center shadow-lg shadow-saffron/40">
                        <FiCompass className="text-white text-lg" />
                    </div>
                    <div>
                        <span className="font-display font-bold text-white text-lg leading-none block">
                            India Travel
                        </span>
                        <span className="text-saffron text-[10px] font-medium tracking-widest uppercase leading-none">
                            Recommender
                        </span>
                    </div>
                </div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map((l) => (
                        <a
                            key={l}
                            href="#"
                            className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/8
                         rounded-lg transition-all duration-200"
                        >
                            {l}
                        </a>
                    ))}
                    <a
                        href="#explore"
                        className="ml-4 btn-primary text-sm px-5 py-2"
                    >
                        Get Recommendations
                    </a>
                </div>

                {/* Hamburger */}
                <button
                    className="md:hidden text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden glass-dark border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-2">
                            {links.map((l) => (
                                <a
                                    key={l}
                                    href="#"
                                    className="py-2 text-white/80 hover:text-white font-medium"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {l}
                                </a>
                            ))}
                            <a href="#explore" className="btn-primary text-center mt-2" onClick={() => setMenuOpen(false)}>
                                Get Recommendations
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
