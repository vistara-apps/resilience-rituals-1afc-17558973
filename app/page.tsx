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
import { ThemeToggle } from "./components/ThemeToggle";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Notification } from "./components/Notification";

const activities = [
  {
    id: 1,
    title: "Gratitude Reflection",
    description: "Take a moment to think of three things you're grateful for today. Consider why they matter to you and how they impact your life positively.",
    type: "gratitude",
    duration: "2-3 min",
  },
  {
    id: 2,
    title: "Deep Breathing",
    description: "Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat this cycle 4 times.",
    type: "breathing",
    duration: "1-2 min",
  },
  {
    id: 3,
    title: "Mindful Moment",
    description: "Notice 5 things you can see, 4 you can hear, 3 you can touch, 2 you can smell, and 1 you can taste. Focus on each sensation fully.",
    type: "mindfulness",
    duration: "3-5 min",
  },
];

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(activities[0]);
  const [emotionalScore, setEmotionalScore] = useState(75);
  const [selectedMood, setSelectedMood] = useState("");
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info" | "warning";
    message: string;
    show: boolean;
  } | null>(null);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    try {
      setIsLoading(true);
      const frameAdded = await addFrame();
      setFrameAdded(Boolean(frameAdded));
      
      if (frameAdded) {
        setNotification({
          type: "success",
          message: "Frame saved successfully!",
          show: true,
        });
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to save frame. Please try again.",
        show: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [addFrame]);

  const handleCompleteActivity = useCallback(() => {
    if (!selectedMood) {
      setNotification({
        type: "warning",
        message: "Please select your mood first",
        show: true,
      });
      return;
    }
    
    setActivityCompleted(true);
    // Simulate score improvement based on mood
    const moodBonus = selectedMood === "😊" ? 10 : selectedMood === "😐" ? 5 : 2;
    setEmotionalScore(prev => Math.min(100, prev + moodBonus));
    
    setNotification({
      type: "success",
      message: "Activity completed! Great job!",
      show: true,
    });
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
      className="text-primary dark:text-primary"
      loading={isLoading && frameAdded === false}
      ariaLabel="Save frame"
    >
      + Save Frame
    </Button>
  ) : frameAdded ? (
    <div className="flex items-center space-x-1 text-sm font-medium text-primary dark:text-primary animate-scale-in">
      <span>✓ Saved</span>
    </div>
  ) : null;

  return (
    <FrameContainer>
      <div className="w-full max-w-md mx-auto px-4 py-4">
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            show={notification.show}
            onClose={() => setNotification(null)}
          />
        )}
        
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
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {saveFrameButton}
          </div>
        </header>

        <main className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-primary mb-2 animate-fade-in">
              Resilience Rituals
            </h1>
            <p className="text-base leading-6 text-gray-600 dark:text-gray-300">
              Build daily emotional resilience
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              <ScoreDisplay 
                score={emotionalScore} 
                variant={emotionalScore >= 80 ? "positive" : emotionalScore >= 60 ? "neutral" : "negative"}
                showChange={activityCompleted}
                change={selectedMood === "😊" ? 10 : selectedMood === "😐" ? 5 : selectedMood ? 2 : 0}
              />

              {!activityCompleted ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-center mb-2">
                    <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">How are you feeling today?</h2>
                  </div>
                  
                  <MoodSelector
                    selectedMood={selectedMood}
                    onMoodSelect={setSelectedMood}
                    variant="text"
                  />
                  
                  <ActivityCard activity={currentActivity} />
                  
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleCompleteActivity}
                      disabled={!selectedMood}
                      className="w-full sm:w-auto"
                      ariaLabel="Complete activity"
                    >
                      Complete Activity
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 animate-scale-in">
                  <div className="p-6 bg-surface dark:bg-gray-800 rounded-lg shadow-card activity-complete">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      Activity Complete! 🎉
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Great job! Your emotional health score has improved.
                    </p>
                    
                    <div className="mt-4">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={handleNextActivity}
                        className="w-full sm:w-auto"
                        ariaLabel="Go to next activity"
                      >
                        Next Activity
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        <footer className="mt-6 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 dark:text-gray-400 text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
            ariaLabel="Visit Base MiniKit website"
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </FrameContainer>
  );
}
