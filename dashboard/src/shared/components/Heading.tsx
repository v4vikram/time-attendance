import React, { forwardRef } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: HeadingTag;
    children: React.ReactNode;
}

// Default styles (can customize)
const baseStyles: Record<HeadingTag, string> = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-medium",
    h5: "text-lg font-medium",
    h6: "text-base font-medium",
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ as = "h1", children, className = "", ...props }, ref) => {
        const Tag = as;

        return (
            <Tag
                ref={ref}
                className={`${baseStyles[as]} ${className}`}
                {...props}
            >
                {children}
            </Tag>
        );
    }
);

Heading.displayName = "Heading";

export default Heading;