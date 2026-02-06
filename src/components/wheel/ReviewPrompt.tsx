"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExternalLink, Gift, Lock, Star } from "lucide-react";
import { useState } from "react";

interface ReviewPromptProps {
    onReviewConfirmed: () => void;
}

export function ReviewPrompt({ onReviewConfirmed }: ReviewPromptProps) {
    const GOOGLE_REVIEW_URL = "https://g.page/r/CRjgrtuNQnoHEBM/review";
    const [hasClickedReview, setHasClickedReview] = useState(false);

    const handleReviewClick = () => {
        window.open(GOOGLE_REVIEW_URL, "_blank");
        setHasClickedReview(true);
    };

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
                    className={cn(
                        "w-full h-auto py-4 text-base border-2 group whitespace-normal text-left justify-start relative px-5 transition-all duration-300",
                        hasClickedReview
                            ? "border-green-500 bg-green-50 hover:bg-green-50"
                            : "border-primary/20 hover:bg-primary/5 hover:border-primary hover:scale-[1.02]"
                    )}
                    onClick={handleReviewClick}
                >
                    <span className={cn(
                        "flex-shrink-0 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 shadow-md",
                        hasClickedReview
                            ? "bg-green-500 text-white"
                            : "bg-primary text-white"
                    )}>
                        {hasClickedReview ? "✓" : "1"}
                    </span>
                    <span className="flex-1 font-medium text-base">
                        {hasClickedReview ? "Avis posté ✓" : "Poster mon avis sur Google"}
                    </span>
                    <ExternalLink className={cn(
                        "w-5 h-5 ml-2 transition-transform flex-shrink-0",
                        hasClickedReview ? "text-green-500" : "text-primary group-hover:translate-x-1"
                    )} />
                </Button>

                {/* Étape 2 */}
                <Button
                    className={cn(
                        "w-full h-auto py-5 text-lg font-bold shadow-xl whitespace-normal transition-all duration-300 border-2",
                        hasClickedReview
                            ? "bg-gradient-to-r from-primary to-green-700 hover:from-primary/90 hover:to-green-600 text-white hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl border-primary/20"
                            : "bg-primary/40 text-white/70 cursor-not-allowed border-primary/30"
                    )}
                    onClick={hasClickedReview ? onReviewConfirmed : undefined}
                    disabled={!hasClickedReview}
                >
                    <span className={cn(
                        "flex-shrink-0 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4",
                        hasClickedReview ? "bg-white/20 text-white" : "bg-white/20 text-white/70"
                    )}>
                        2
                    </span>
                    <span className="flex-1 flex items-center justify-center gap-2">
                        {hasClickedReview ? (
                            <>
                                C'est fait, je veux tourner !
                                <Gift className="w-5 h-5" />
                            </>
                        ) : (
                            <>
                                C'est fait, je veux tourner !
                                <Lock className="w-5 h-5" />
                            </>
                        )}
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
