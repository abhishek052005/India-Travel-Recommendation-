import { useState } from "react";
import HeroSection from "../components/HeroSection";
import TrendingSection from "../components/TrendingSection";
import TravelForm from "../components/TravelForm";
import Navbar from "../components/Navbar";

export default function Home() {
    const [selectedFromTrending, setSelectedFromTrending] = useState("");

    const handleTrendingExplore = (placeName) => {
        setSelectedFromTrending(placeName);
        // Scroll to explore section
        setTimeout(() => {
            document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroSection />

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />

            <TrendingSection onExplore={handleTrendingExplore} />

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

            <TravelForm initialPlace={selectedFromTrending} />

            {/* Footer */}
            <footer className="border-t border-white/10 py-10 px-4 text-center">
                <p className="text-white/30 text-sm">
                    Built with ❤️ · India Travel Recommender
                </p>
                <p className="text-white/20 text-xs mt-1">
                    Data sourced from Google Reviews · For personal &amp; educational use
                </p>
            </footer>
        </div>
    );
}
