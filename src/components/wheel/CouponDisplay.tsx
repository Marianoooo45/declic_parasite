"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import canvasConfetti from "canvas-confetti";
import { Check, Copy, Frown, Gift, PartyPopper, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface CouponDisplayProps {
    prize: string;
    onRetry?: () => void;
}

export function CouponDisplay({ prize, onRetry }: CouponDisplayProps) {
    const [copied, setCopied] = useState(false);
    const isLost = prize === "Perdu";

    // Code unique généré - dans un vrai système, ce serait côté serveur
    const code = isLost ? "" : `DECLIC${prize.replace("€", "")}`;
    const validUntil = new Date();
    validUntil.setMonth(validUntil.getMonth() + 3); // Valide 3 mois

    useEffect(() => {
        // Lancer les confettis seulement si gagné
        if (isLost) return;

        const duration = 4 * 1000;
        const end = Date.now() + duration;

        // Couleurs du site : vert primaire et or accent
        const colors = ["#1d4e2b", "#dbb341", "#ffffff", "#245c36", "#c9a227"];

        const frame = () => {
            canvasConfetti({
                particleCount: 3,
                angle: 60,
                spread: 65,
                origin: { x: 0 },
                colors: colors,
            });
            canvasConfetti({
                particleCount: 3,
                angle: 120,
                spread: 65,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, [isLost]);

    const copyToClipboard = () => {
        if (!code) return;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Affichage différent si perdu
    if (isLost) {
        return (
            <Card className="w-full max-w-md mx-auto border-2 border-gray-200 shadow-xl animate-in fade-in zoom-in duration-500 bg-gradient-to-br from-gray-50 to-gray-100">
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto bg-gray-200 p-4 rounded-full w-fit mb-4">
                        <Frown className="w-10 h-10 text-gray-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-600">
                        Pas de chance cette fois ! 😢
                    </CardTitle>
                    <CardDescription className="text-base text-gray-500 mt-2">
                        Mais merci infiniment pour votre avis !
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <div className="bg-white p-5 rounded-xl border border-gray-200">
                        <p className="text-gray-600 leading-relaxed">
                            Votre retour nous aide à toujours mieux vous servir.
                            <br />
                            <span className="font-semibold text-primary">Merci pour votre confiance !</span>
                        </p>
                    </div>

                    <div className="pt-2">
                        <p className="text-sm text-gray-400 mb-4">
                            💡 Conseil : Vos proches peuvent aussi tenter leur chance après leur intervention !
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center pb-6">
                    <Button
                        variant="outline"
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
                        onClick={() => window.location.href = "/"}
                    >
                        Retour à l'accueil
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    // Affichage quand gagné
    const prizeValue = parseInt(prize.replace("€", ""));
    const isPremium = prizeValue >= 20;

    return (
        <Card className={`w-full max-w-md mx-auto border-2 shadow-2xl animate-in fade-in zoom-in duration-500 ${isPremium
                ? "border-accent bg-gradient-to-br from-amber-50 via-white to-amber-50"
                : "border-primary/30 bg-gradient-to-br from-green-50 via-white to-green-50"
            }`}>
            <CardHeader className="text-center">
                <div className={`mx-auto p-4 rounded-full w-fit mb-4 ${isPremium ? "bg-gradient-to-br from-amber-100 to-amber-200" : "bg-green-100"
                    }`}>
                    {isPremium ? (
                        <Gift className="w-10 h-10 text-amber-600" />
                    ) : (
                        <PartyPopper className="w-10 h-10 text-green-600" />
                    )}
                </div>
                <CardTitle className={`text-3xl font-extrabold ${isPremium ? "text-amber-600" : "text-green-600"
                    }`}>
                    {isPremium ? "🏆 Jackpot !" : "🎉 Félicitations !"}
                </CardTitle>
                <CardDescription className="text-xl font-medium text-foreground mt-2">
                    Vous avez gagné : <span className={`font-black ${isPremium ? "text-amber-600" : "text-primary"
                        }`}>{prize}</span> de réduction !
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className={`p-6 rounded-xl border-2 border-dashed text-center ${isPremium
                        ? "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300"
                        : "bg-muted border-primary/30"
                    }`}>
                    <p className="text-sm text-muted-foreground mb-2">Votre code promo :</p>
                    <div className="flex items-center justify-center gap-3">
                        <code className={`text-2xl sm:text-3xl font-black tracking-widest ${isPremium ? "text-amber-600" : "text-primary"
                            }`}>
                            {code}
                        </code>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={copyToClipboard}
                            className="h-10 w-10 hover:bg-primary/10"
                        >
                            {copied ? (
                                <Check className="w-6 h-6 text-green-600" />
                            ) : (
                                <Copy className="w-6 h-6 text-muted-foreground hover:text-primary" />
                            )}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                        ⏰ Valable jusqu'au {validUntil.toLocaleDateString("fr-FR")} <br />
                        sur votre prochaine intervention.
                    </p>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                    <p className="text-sm text-center text-primary/80">
                        💡 <span className="font-semibold">Astuce :</span> Mentionnez ce code lors de votre prochain appel !
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <p className="text-center text-sm text-muted-foreground w-full">
                    📧 Un email de confirmation vous sera envoyé après validation.
                </p>
            </CardFooter>
        </Card>
    );
}
