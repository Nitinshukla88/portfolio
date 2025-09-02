
import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="section-heading pb-4">
      {children}
    </h2>
  );
}
