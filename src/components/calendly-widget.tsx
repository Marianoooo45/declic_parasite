"use client";

import Script from "next/script";

interface CalendlyWidgetProps {
    url?: string;
    className?: string;
}

export function CalendlyWidget({
    url = "https://calendly.com/contact-declicparasites",
    className = "",
}: CalendlyWidgetProps) {
    return (
        <>
            <div
                className={`calendly-inline-widget ${className}`}
                data-url={url}
                style={{ minWidth: "320px", height: "700px", width: "100%" }}
            />
            <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
            />
        </>
    );
}
