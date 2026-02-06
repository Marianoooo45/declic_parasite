"use client";

import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue } from "framer-motion";
import { Clover } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface WheelGameProps {
    onSpinComplete: (prize: string) => void;
    actionSlot?: React.ReactNode;
    autoSpin?: boolean;
}

// 8 segments, chaque segment fait 45°
// À rotation 0°, le segment 0 est sous le pointeur (en haut)
const SEGMENTS = [
    { label: "5€", color: "#1d4e2b", textColor: "#ffffff" },      // 0
    { label: "Perdu", color: "#374151", textColor: "#d1d5db" },   // 1
    { label: "10€", color: "#dbb341", textColor: "#1d2a1b" },     // 2
    { label: "Perdu", color: "#4b5563", textColor: "#d1d5db" },   // 3
    { label: "5€", color: "#245c36", textColor: "#ffffff" },      // 4
    { label: "20€", color: "#d97706", textColor: "#ffffff" },     // 5
    { label: "10€", color: "#c9a227", textColor: "#1d2a1b" },     // 6
    { label: "Perdu", color: "#2d3748", textColor: "#9ca3af" },   // 7
];

const NUM_SEGMENTS = SEGMENTS.length;
const DEG_PER_SEGMENT = 360 / NUM_SEGMENTS; // 45°

export function WheelGame({ onSpinComplete, actionSlot, autoSpin = false }: WheelGameProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [showGlow, setShowGlow] = useState(false);
    const [hasAutoSpun, setHasAutoSpun] = useState(false);
    const rotation = useMotionValue(0);
    const finalPrizeRef = useRef<string>("");

    const spinWheel = useCallback(() => {
        if (isSpinning) return;

        setIsSpinning(true);
        setShowGlow(true);

        // 1. Déterminer le prix selon les probabilités
        const random = Math.random();
        let targetPrize: string;
        if (random < 0.05) targetPrize = "Perdu";        // 5%
        else if (random < 0.80) targetPrize = "5€";      // 75% (0.05 + 0.75 = 0.80)
        else if (random < 0.98) targetPrize = "10€";     // 18% (0.80 + 0.18 = 0.98)
        else targetPrize = "20€";                         // 2%

        // 2. Trouver les indices de segments qui correspondent à ce prix
        const matchingIndices: number[] = [];
        SEGMENTS.forEach((seg, idx) => {
            if (seg.label === targetPrize) matchingIndices.push(idx);
        });

        // Choisir un segment au hasard parmi ceux qui correspondent
        const targetSegmentIndex = matchingIndices[Math.floor(Math.random() * matchingIndices.length)];

        // Stocker le prix pour le callback
        finalPrizeRef.current = SEGMENTS[targetSegmentIndex].label;

        // 3. Calculer la rotation pour que ce segment soit sous le pointeur
        // Quand rotation = 0, segment 0 est en haut
        // Quand rotation = 45, segment 7 est en haut (on tourne dans le sens horaire)
        // Quand rotation = 90, segment 6 est en haut
        // Formule : pour mettre segment X en haut, rotation = (NUM_SEGMENTS - X) * DEG_PER_SEGMENT

        const rotationForSegment = (NUM_SEGMENTS - targetSegmentIndex) * DEG_PER_SEGMENT;

        // Normaliser entre 0 et 360
        const normalizedTarget = ((rotationForSegment % 360) + 360) % 360;

        // Ajouter un petit offset aléatoire pour ne pas toujours atterrir au centre exact
        const randomOffset = (Math.random() - 0.5) * (DEG_PER_SEGMENT * 0.6);

        // 4. Calculer la rotation totale
        const spins = 6 + Math.floor(Math.random() * 3); // 6-8 tours
        const currentRotation = rotation.get();
        const currentNormalized = ((currentRotation % 360) + 360) % 360;

        // Delta pour aller de la position actuelle à la cible
        let delta = normalizedTarget + randomOffset - currentNormalized;
        if (delta <= 0) delta += 360; // S'assurer qu'on tourne toujours vers l'avant

        const totalRotation = currentRotation + (spins * 360) + delta;

        animate(rotation, totalRotation, {
            duration: 6,
            ease: [0.15, 0.85, 0.25, 1],
            onComplete: () => {
                setIsSpinning(false);
                setTimeout(() => setShowGlow(false), 500);
                // Utiliser le prix pré-calculé (pas besoin de recalculer depuis l'angle)
                onSpinComplete(finalPrizeRef.current);
            },
        });
    }, [isSpinning, onSpinComplete, rotation]);

    // Auto-spin
    useEffect(() => {
        if (autoSpin && !hasAutoSpun && !isSpinning) {
            setHasAutoSpun(true);
            setTimeout(() => {
                spinWheel();
            }, 300);
        }
    }, [autoSpin, hasAutoSpun, isSpinning, spinWheel]);

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 w-full px-2">
            {/* Container de la roue */}
            <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] flex-shrink-0">

                {/* Effet de lueur pulsante */}
                <div className={cn(
                    "absolute inset-[-20px] rounded-full transition-all duration-500",
                    showGlow
                        ? "bg-gradient-to-r from-primary/30 via-accent/40 to-primary/30 blur-xl animate-pulse"
                        : "opacity-0"
                )} />

                {/* Anneau décoratif extérieur */}
                <div className="absolute inset-[-6px] rounded-full bg-gradient-to-br from-accent via-primary to-accent p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-gray-800" />
                </div>

                {/* Pointeur */}
                <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <div className="relative">
                        <div
                            className="w-0 h-0 drop-shadow-2xl"
                            style={{
                                borderLeft: "16px solid transparent",
                                borderRight: "16px solid transparent",
                                borderTop: "28px solid #dbb341",
                                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
                            }}
                        />
                        <div
                            className="absolute top-[2px] left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                                borderLeft: "8px solid transparent",
                                borderRight: "8px solid transparent",
                                borderTop: "14px solid #f5e6a3",
                            }}
                        />
                    </div>
                </div>

                {/* Roue principale */}
                <motion.div
                    className="w-full h-full rounded-full border-[5px] border-accent/80 shadow-2xl overflow-hidden relative bg-gray-900"
                    style={{ rotate: rotation }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <defs>
                            {SEGMENTS.map((segment, index) => (
                                <linearGradient
                                    key={`gradient-${index}`}
                                    id={`segment-gradient-${index}`}
                                    x1="0%" y1="0%" x2="100%" y2="100%"
                                >
                                    <stop offset="0%" stopColor={segment.color} />
                                    <stop offset="100%" stopColor={adjustColor(segment.color, -25)} />
                                </linearGradient>
                            ))}
                            <radialGradient id="shine" cx="30%" cy="30%" r="50%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                            </radialGradient>
                        </defs>

                        {SEGMENTS.map((segment, index) => {
                            const startAngle = (index * 360) / NUM_SEGMENTS;
                            const endAngle = ((index + 1) * 360) / NUM_SEGMENTS;
                            const midAngle = (startAngle + endAngle) / 2;

                            const getCoordinatesForPercent = (percent: number) => {
                                const x = Math.cos(2 * Math.PI * percent);
                                const y = Math.sin(2 * Math.PI * percent);
                                return [x, y];
                            };

                            const startPercent = startAngle / 360;
                            const endPercent = endAngle / 360;

                            const [startX, startY] = getCoordinatesForPercent(startPercent);
                            const [endX, endY] = getCoordinatesForPercent(endPercent);

                            const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;

                            const pathData = [
                                `M 50 50`,
                                `L ${50 + 50 * startX} ${50 + 50 * startY}`,
                                `A 50 50 0 ${largeArcFlag} 1 ${50 + 50 * endX} ${50 + 50 * endY}`,
                                `Z`
                            ].join(" ");

                            const textRadius = 35;
                            const textAngle = (midAngle * Math.PI) / 180;
                            const textX = 50 + textRadius * Math.cos(textAngle);
                            const textY = 50 + textRadius * Math.sin(textAngle);

                            const isLost = segment.label === "Perdu";

                            return (
                                <g key={index}>
                                    <path
                                        d={pathData}
                                        fill={`url(#segment-gradient-${index})`}
                                        stroke="rgba(255,255,255,0.3)"
                                        strokeWidth="0.4"
                                    />
                                    <text
                                        x={textX}
                                        y={textY}
                                        fill={segment.textColor}
                                        fontSize={isLost ? "5" : "6"}
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                                    >
                                        {segment.label}
                                    </text>
                                </g>
                            );
                        })}

                        <circle cx="50" cy="50" r="50" fill="url(#shine)" />
                    </svg>
                </motion.div>

                {/* Centre de la roue - LOGO */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                        className={cn(
                            "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32",
                            "bg-white",
                            "rounded-full border-4 border-accent",
                            "shadow-xl flex items-center justify-center",
                            "relative overflow-hidden"
                        )}
                        animate={isSpinning ? {
                            boxShadow: [
                                "0 0 20px rgba(219,179,65,0.5)",
                                "0 0 40px rgba(219,179,65,0.8)",
                                "0 0 20px rgba(219,179,65,0.5)"
                            ]
                        } : {}}
                        transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0 }}
                    >
                        <Image
                            src="/icon.png"
                            alt="Déclic Parasites"
                            width={100}
                            height={100}
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                        />
                    </motion.div>
                </div>

                {/* Particules */}
                {isSpinning && (
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-accent"
                                initial={{ x: "50%", y: "50%", opacity: 0, scale: 0 }}
                                animate={{
                                    x: `${50 + Math.cos(i * 45 * Math.PI / 180) * 60}%`,
                                    y: `${50 + Math.sin(i * 45 * Math.PI / 180) * 60}%`,
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0]
                                }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: "easeOut" }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Zone d'action */}
            {actionSlot && (
                <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto lg:min-w-[400px] lg:max-w-[450px]">
                    {actionSlot}
                </div>
            )}

            {/* Message pendant le spin */}
            {!actionSlot && isSpinning && (
                <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto lg:min-w-[400px] lg:max-w-[450px]">
                    <div className="text-center lg:text-left">
                        <p className="text-base sm:text-lg font-medium text-white/80 flex items-center gap-2">
                            <Clover className="w-5 h-5 text-accent animate-spin" />
                            Bonne chance... 🍀
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function adjustColor(color: string, amount: number): string {
    const hex = color.replace("#", "");
    const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount));
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
