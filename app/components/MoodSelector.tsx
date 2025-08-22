
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
    <div className="mood-selector">
      {moods.map((mood) => (
        <button
          key={mood.value}
          className={`mood-emoji ${selectedMood === mood.value ? 'selected' : ''}`}
          onClick={() => onMoodSelect(mood.value)}
        >
          <div className="text-center">
            <div className="text-3xl mb-1">{mood.emoji}</div>
            {variant === 'text' && (
              <div className="text-xs text-muted">{mood.label}</div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
