// components/logo-declic.tsx
import { cn } from "@/lib/utils";

const colors = {
  green: "#2d5a42",
  yellow: "#ebb12c",
  dark: "#1a2e22",
};

export function LogoDeclic({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 380 70"
      fill="none"
      className={cn("h-auto w-auto", className)}
      aria-label="Logo Déclic Parasite"
    >
      {/* ICÔNE : Insecte barré */}
      <g transform="translate(0, 2)">
        {/* Fond Cercle */}
        <circle cx="30" cy="30" r="26" fill={colors.green} opacity="0.1" />
        <circle cx="30" cy="30" r="26" stroke={colors.green} strokeWidth="2" />

        {/* Silhouette Insecte (Abstraite mais reconnaissable) */}
        <path 
          d="M30 14c-4 0-7 5-7 10v8c0 5 3 8 7 8s7-3 7-8v-8c0-5-3-10-7-10z" 
          fill={colors.dark} 
        />
        {/* Pattes */}
        <path d="M23 20l-5-2 M37 20l5-2 M23 30l-6 0 M37 30l6 0 M23 40l-5 2 M37 40l5 2" stroke={colors.dark} strokeWidth="2" strokeLinecap="round"/>

        {/* L'Éclair qui barre (L'action Déclic) */}
        <path 
          d="M14 42l10-10 4 4 18-20" 
          stroke={colors.yellow} 
          strokeWidth="4" 
          strokeLinecap="round" 
          fill="none"
        />
      </g>

      {/* RESTE DU LAYOUT (Validé V1) */}
      <g fontFamily="sans-serif">
        <text x="70" y="32" fill={colors.green} fontWeight="900" fontSize="30" letterSpacing="-1px">DÉCLIC</text>
        <text x="70" y="56" fill={colors.yellow} fontWeight="800" fontSize="22" letterSpacing="0px">PARASITE</text>
      </g>
      <line x1="215" y1="15" x2="215" y2="55" stroke={colors.green} strokeWidth="1" opacity="0.3" />
      <g fontFamily="sans-serif">
        <text x="230" y="25" fill={colors.dark} fontWeight="700" fontSize="13">EXPERTS</text>
        <text x="230" y="40" fill={colors.dark} fontWeight="700" fontSize="13">NUISIBLES</text>
        <text x="230" y="55" fill={colors.green} fontWeight="500" fontSize="10" opacity="0.8">Orléans & Loiret</text>
      </g>
    </svg>
  );
}