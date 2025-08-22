"use client";

interface Activity {
  id: number;
  title: string;
  description: string;
  type: string;
  duration?: string;
}

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
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
      <div className="text-center mb-4">
        <div className="text-5xl mb-3">{getActivityIcon(activity.type)}</div>
        <h2 className="text-2xl font-semibold mb-2">{activity.title}</h2>
        {activity.duration && (
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            ⏱️ {activity.duration}
          </div>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-primary">
        <p className="text-text dark:text-gray-200 leading-relaxed">{activity.description}</p>
      </div>
    </div>
  );
}

