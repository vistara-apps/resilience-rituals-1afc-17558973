"use client";

import { type ReactNode } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-muted hover:text-text dark:text-gray-300 dark:hover:text-white',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-sm',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };

  const spinnerSize = size === 'lg' ? 'md' : 'sm';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <LoadingSpinner size={spinnerSize} className="mr-2" />
          <span>{typeof children === 'string' ? children : 'Loading...'}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
