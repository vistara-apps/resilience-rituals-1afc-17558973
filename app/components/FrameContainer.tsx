
"use client";

import { type ReactNode } from "react";

interface FrameContainerProps {
  children: ReactNode;
  className?: string;
}

export function FrameContainer({ children, className = "" }: FrameContainerProps) {
  return (
    <div className={`frame-container ${className}`}>
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
