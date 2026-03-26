import React, { forwardRef } from "react";

type ParagraphSize = "sm" | "md" | "lg";

interface ParagraphProps
    extends React.HTMLAttributes<HTMLParagraphElement> {
    size?: ParagraphSize;
    children: React.ReactNode;
}

// default styles
const sizeStyles: Record<ParagraphSize, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
};

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({ size = "md", className = "", children, ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={`${sizeStyles[size]} text-gray-700 leading-relaxed ${className}`}
                {...props}
            >
                {children}
            </p>
        );
    }
);

Paragraph.displayName = "Paragraph";

export default Paragraph;