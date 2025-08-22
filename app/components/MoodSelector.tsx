"use client";

interface MoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
  variant?: 'emoji' | 'text';
}

export function MoodSelector({ 
  selectedMood, 
  onMoodSelect,
  variant = 'emoji' 
}: MoodSelectorProps) {
  const moods = [
    { emoji: '😊', label: 'Happy', value: '😊' },
    { emoji: '😔', label: 'Sad', value: '😔' },
    { emoji: '😰', label: 'Anxious', value: '😰' },
    { emoji: '😴', label: 'Tired', value: '😴' },
    { emoji: '😐', label: 'Neutral', value: '😐' },
  ];

  return (
    <div className="mood-selector" role="radiogroup" aria-label="Select your current mood">
      {moods.map((mood) => (
        <button
          key={mood.value}
          className={`mood-emoji ${selectedMood === mood.value ? 'selected' : ''}`}
          onClick={() => onMoodSelect(mood.value)}
          aria-label={`Mood: ${mood.label}`}
          aria-checked={selectedMood === mood.value}
          role="radio"
          tabIndex={0}
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl mb-1">{mood.emoji}</div>
            {variant === 'text' && (
              <div className="text-xs text-muted dark:text-gray-300">{mood.label}</div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
