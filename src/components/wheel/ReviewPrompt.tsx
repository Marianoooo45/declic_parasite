"use strict";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Gift, Star } from "lucide-react";

interface ReviewPromptProps {
    onReviewConfirmed: () => void;
}

export function ReviewPrompt({ onReviewConfirmed }: ReviewPromptProps) {
    const GOOGLE_REVIEW_URL = "https://g.page/r/CRjgrtuNQnoHEBM/review";

    return (
        <Card className="w-full border-2 border-white/20 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-3 pt-6 pb-4">
                <div className="mx-auto">
                    <div className="relative">
                        <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full animate-pulse" />
                        <div className="relative flex items-center justify-center gap-1 bg-gradient-to-r from-accent to-amber-500 text-white px-5 py-2.5 rounded-full shadow-lg">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-5 h-5 fill-current" />
                            ))}
                        </div>
                    </div>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">
                    Débloquez la Roue ! 🎯
                </CardTitle>
                <CardDescription className="text-base text-foreground/80">
                    Laissez un avis <span className="font-semibold text-accent">5 étoiles</span> pour tenter de gagner jusqu'à{" "}
                    <span className="font-bold text-primary">20€ de réduction</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
                {/* Étape 1 */}
                <Button
                    variant="outline"
                    className="w-full h-auto py-4 text-base border-2 border-primary/20 hover:bg-primary/5 hover:border-primary group whitespace-normal text-left justify-start relative px-5 transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => window.open(GOOGLE_REVIEW_URL, "_blank")}
                >
                    <span className="flex-shrink-0 bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 shadow-md">
                        1
                    </span>
                    <span className="flex-1 font-medium text-base">Poster mon avis sur Google</span>
                    <ExternalLink className="w-5 h-5 ml-2 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Button>

                {/* Étape 2 */}
                <Button
                    className="w-full h-auto py-5 text-lg font-bold shadow-xl bg-gradient-to-r from-primary to-green-700 hover:from-primary/90 hover:to-green-600 text-white whitespace-normal transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl border-2 border-primary/20"
                    onClick={onReviewConfirmed}
                >
                    <span className="flex-shrink-0 bg-white/20 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4">
                        2
                    </span>
                    <span className="flex-1 flex items-center justify-center gap-2">
                        C'est fait, je veux tourner !
                        <Gift className="w-5 h-5" />
                    </span>
                </Button>

                {/* Gains possibles */}
                <div className="flex justify-center gap-3 pt-2">
                    {["5€", "10€", "20€"].map((prize) => (
                        <span
                            key={prize}
                            className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-bold px-4 py-1.5 rounded-full text-sm border border-primary/20"
                        >
                            {prize}
                        </span>
                    ))}
                </div>

                <p className="text-xs text-center text-muted-foreground pt-1">
                    * L'équipe validera votre avis avant l'envoi du code promo.
                </p>
            </CardContent>
        </Card>
    );
}
