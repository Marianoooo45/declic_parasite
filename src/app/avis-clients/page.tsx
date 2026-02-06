"use client";

import { CouponDisplay } from "@/components/wheel/CouponDisplay";
import { ReviewPrompt } from "@/components/wheel/ReviewPrompt";
import { WheelGame } from "@/components/wheel/WheelGame";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, Lock, X } from "lucide-react";
import { useEffect, useState } from "react";

type GameState = "LOADING" | "ALREADY_PLAYED" | "REVIEW" | "SPIN" | "REWARD";

const STORAGE_KEY = "declic_wheel_played";
const STORAGE_PRIZE_KEY = "declic_wheel_prize";

export default function AvisClientsPage() {
    const [gameState, setGameState] = useState<GameState>("LOADING");
    const [prize, setPrize] = useState<string>("");
    const [showPopup, setShowPopup] = useState(false);
    const [savedPrize, setSavedPrize] = useState<string>("");

    // Vérifier si l'utilisateur a déjà joué (au chargement)
    useEffect(() => {
        // Exception pour localhost (dev/test)
        const isLocalhost = typeof window !== "undefined" &&
            (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

        if (isLocalhost) {
            setGameState("REVIEW");
            return;
        }

        const hasPlayed = localStorage.getItem(STORAGE_KEY);
        const previousPrize = localStorage.getItem(STORAGE_PRIZE_KEY);

        if (hasPlayed === "true") {
            setSavedPrize(previousPrize || "");
            setGameState("ALREADY_PLAYED");
        } else {
            setGameState("REVIEW");
        }
    }, []);

    const handleReviewConfirmed = () => {
        setGameState("SPIN");
    };

    const handleSpinComplete = (wonPrize: string) => {
        setPrize(wonPrize);

        // Sauvegarder dans localStorage
        localStorage.setItem(STORAGE_KEY, "true");
        localStorage.setItem(STORAGE_PRIZE_KEY, wonPrize);

        setTimeout(() => {
            setShowPopup(true);
            setGameState("REWARD");
        }, 1500);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    // Écran de chargement
    if (gameState === "LOADING") {
        return (
            <main className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Chargement...</div>
            </main>
        );
    }

    // Écran "Déjà joué"
    if (gameState === "ALREADY_PLAYED") {
        return (
            <main className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
                </div>

                <div className="container max-w-2xl mx-auto flex flex-col items-center justify-center min-h-screen py-8 px-4 relative z-10">
                    <motion.div
                        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center max-w-md w-full"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-10 h-10 text-gray-500" />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 mb-3">
                            Vous avez déjà participé ! 🎰
                        </h1>

                        <p className="text-gray-600 mb-6">
                            Chaque client ne peut jouer qu'une seule fois à la roue de la fortune.
                        </p>

                        {savedPrize && savedPrize !== "Perdu" && (
                            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
                                <p className="text-sm text-gray-600 mb-1">Votre gain :</p>
                                <p className="text-2xl font-bold text-primary">{savedPrize} de réduction</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Code : DECLIC{savedPrize.replace("€", "")}
                                </p>
                            </div>
                        )}

                        {savedPrize === "Perdu" && (
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <p className="text-gray-600">
                                    Malheureusement, vous n'avez pas gagné cette fois-ci. 😔
                                </p>
                            </div>
                        )}

                        <p className="text-xs text-gray-400 mt-6">
                            Merci pour votre avis ! 💚
                        </p>
                    </motion.div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Image de fond */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/home-hero.jpg')" }}
            />

            {/* Overlay vert */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85" />

            {/* Fond décoratif */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
                <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] bg-accent/5 rounded-full blur-2xl" />
            </div>

            {/* Container principal */}
            <div className="container max-w-6xl mx-auto flex flex-col items-center pt-4 sm:pt-6 lg:pt-8 pb-8 px-4 relative z-10">

                {/* Header */}
                <motion.div
                    className="text-center space-y-3 mb-4 lg:mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Gift className="w-4 h-4" />
                        Jusqu'à 20€ à gagner !
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-lg">
                        <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                            Le Club Déclic
                        </span>
                        <span className="ml-2">🐞</span>
                    </h1>
                    <p className="text-base sm:text-lg text-white/80 max-w-md mx-auto font-medium">
                        Votre avis compte... et il peut vous rapporter gros !
                    </p>
                </motion.div>

                {/* Zone principale */}
                <motion.div
                    className="w-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <WheelGame
                        onSpinComplete={handleSpinComplete}
                        autoSpin={gameState === "SPIN"}
                        actionSlot={
                            gameState === "REVIEW" ? (
                                <ReviewPrompt onReviewConfirmed={handleReviewConfirmed} />
                            ) : undefined
                        }
                    />
                </motion.div>

                {/* Footer */}
                {gameState === "REVIEW" && (
                    <motion.div
                        className="mt-8 text-center text-xs text-white/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <p>🔒 Vos données sont protégées • 1 tentative par client</p>
                    </motion.div>
                )}
            </div>

            {/* POPUP MODAL */}
            <AnimatePresence>
                {showPopup && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closePopup}
                        />

                        <motion.div
                            className="fixed inset-0 flex items-center justify-center z-50 p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="relative w-full max-w-md"
                                initial={{ scale: 0.8, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.8, y: 50 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            >
                                <button
                                    onClick={closePopup}
                                    className={cn(
                                        "absolute -top-3 -right-3 z-10",
                                        "w-10 h-10 rounded-full",
                                        "bg-white shadow-xl",
                                        "flex items-center justify-center",
                                        "hover:bg-gray-100 transition-colors",
                                        "border-2 border-gray-200"
                                    )}
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>

                                <CouponDisplay prize={prize} />
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
}
