"use client";

import { useEffect, useState, useCallback } from "react";
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  usePrimaryButton,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { FrameContainer } from "./components/FrameContainer";
import { ActivityCard } from "./components/ActivityCard";
import { ScoreDisplay } from "./components/ScoreDisplay";
import { MoodSelector } from "./components/MoodSelector";
import { Button } from "./components/Button";

const activities = [
  {
    id: 1,
    title: "Gratitude Reflection",
    description: "Take a moment to think of three things you're grateful for today.",
    type: "gratitude",
  },
  {
    id: 2,
    title: "Deep Breathing",
    description: "Practice 4-7-8 breathing: Inhale for 4, hold for 7, exhale for 8.",
    type: "breathing",
  },
  {
    id: 3,
    title: "Mindful Moment",
    description: "Notice 5 things you can see, 4 you can hear, 3 you can touch.",
    type: "mindfulness",
  },
];

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(activities[0]);
  const [emotionalScore, setEmotionalScore] = useState(75);
  const [selectedMood, setSelectedMood] = useState("");
  const [activityCompleted, setActivityCompleted] = useState(false);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const handleCompleteActivity = useCallback(() => {
    setActivityCompleted(true);
    // Simulate score improvement based on mood
    const moodBonus = selectedMood === "😊" ? 10 : selectedMood === "😐" ? 5 : 2;
    setEmotionalScore(prev => Math.min(100, prev + moodBonus));
  }, [selectedMood]);

  const handleNextActivity = useCallback(() => {
    const nextIndex = (activities.indexOf(currentActivity) + 1) % activities.length;
    setCurrentActivity(activities[nextIndex]);
    setActivityCompleted(false);
    setSelectedMood("");
  }, [currentActivity]);

  usePrimaryButton(
    { text: activityCompleted ? "Next Activity" : "Complete Activity" },
    activityCompleted ? handleNextActivity : handleCompleteActivity
  );

  const saveFrameButton = context && !context.client.added ? (
    <Button
      variant="outline"
      size="sm"
      onClick={handleAddFrame}
      className="text-primary"
    >
      + Save Frame
    </Button>
  ) : frameAdded ? (
    <div className="flex items-center space-x-1 text-sm font-medium text-primary">
      <span>✓ Saved</span>
    </div>
  ) : null;

  return (
    <FrameContainer>
      <div className="w-full max-w-md mx-auto px-4 py-4">
        <header className="flex justify-between items-center mb-4">
          <div>
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <main className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-primary mb-2">
              Resilience Rituals
            </h1>
            <p className="text-base leading-6 text-gray-600">
              Build daily emotional resilience
            </p>
          </div>

          <ScoreDisplay 
            score={emotionalScore} 
            variant={emotionalScore >= 80 ? "positive" : emotionalScore >= 60 ? "neutral" : "negative"}
          />

          {!activityCompleted ? (
            <div className="space-y-4">
              <MoodSelector
                selectedMood={selectedMood}
                onMoodSelect={setSelectedMood}
                variant="emoji"
              />
              
              <ActivityCard activity={currentActivity} />
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-6 bg-surface rounded-lg shadow-card">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Activity Complete! 🎉
                </h3>
                <p className="text-gray-600">
                  Great job! Your emotional health score has improved.
                </p>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-6 pt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-500 text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </FrameContainer>
  );
}
