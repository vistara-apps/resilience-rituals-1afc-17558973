"use client";

interface ScoreDisplayProps {
  score: number;
  variant?: 'positive' | 'neutral' | 'negative';
  showChange?: boolean;
  change?: number;
}

export function ScoreDisplay({ 
  score, 
  variant,
  showChange = false,
  change = 0 
}: ScoreDisplayProps) {
  const getVariant = () => {
    if (variant) return variant;
    if (score >= 80) return 'positive';
    if (score >= 60) return 'neutral';
    return 'negative';
  };

  const currentVariant = getVariant();
  
  const variantClasses = {
    positive: 'score-positive',
    neutral: 'score-neutral',
    negative: 'score-negative',
  };

  const getScoreMessage = () => {
    if (score >= 90) return 'Excellent resilience!';
    if (score >= 80) return 'Strong emotional health';
    if (score >= 70) return 'Good progress';
    if (score >= 60) return 'Building resilience';
    return 'Keep practicing';
  };

  return (
    <div 
      className={`score-display ${variantClasses[currentVariant]} transition-all-slow hover-scale`}
      role="region" 
      aria-label="Resilience Score"
    >
      <div className="flex items-center justify-center space-x-2">
        <div className="text-center">
          <div className="text-4xl font-bold">{score}</div>
          <div className="text-sm opacity-75">Resilience Score</div>
        </div>
        {showChange && change !== 0 && (
          <div 
            className={`text-lg font-semibold ${change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            aria-label={`Score change: ${change > 0 ? 'increased by' : 'decreased by'} ${Math.abs(change)} points`}
          >
            {change > 0 ? '+' : ''}{change}
          </div>
        )}
      </div>
      <div className="mt-2 text-sm font-medium">{getScoreMessage()}</div>
      
      {/* Progress bar */}
      <div 
        className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Resilience score: ${score} out of 100`}
      >
        <div 
          className="bg-current h-2 rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
