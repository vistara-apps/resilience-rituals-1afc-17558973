
"use client";

import { Button } from "./Button";

interface Activity {
  title: string;
  description: string;
  duration: string;
  type: string;
}

interface ActivityFlowProps {
  activity: Activity;
  completed: boolean;
  onComplete: () => void;
}

export function ActivityFlow({ activity, completed, onComplete }: ActivityFlowProps) {
  const getActivityIcon = (type: string) => {
    const icons = {
      gratitude: '🙏',
      breathing: '🫁',
      grounding: '🌱',
      movement: '💪',
      mindfulness: '🧘',
    };
    return icons[type as keyof typeof icons] || '✨';
  };

  return (
    <div className="activity-card">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">{getActivityIcon(activity.type)}</div>
        <h2 className="text-2xl font-semibold mb-2">{activity.title}</h2>
        <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
          ⏱️ {activity.duration}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
        <p className="text-text leading-relaxed">{activity.description}</p>
      </div>

      {!completed && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-blue-800 text-sm text-center">
            💡 Take your time with this activity. When you're ready, mark it as complete below.
          </p>
        </div>
      )}

      {completed && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-green-600 text-xl">✅</span>
            <p className="text-green-800 font-medium">Activity completed!</p>
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        <Button
          variant={completed ? "primary" : "outline"}
          onClick={onComplete}
          className="flex-1"
        >
          {completed ? "I'm done!" : "Mark as Complete"}
        </Button>
      </div>
    </div>
  );
}
