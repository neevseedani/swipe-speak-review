import { useState, useEffect } from 'react';
import { SwipeCard } from '@/components/SwipeCard';
import { StatsPanel } from '@/components/StatsPanel';
import { ActionButtons } from '@/components/ActionButtons';
import { Button } from '@/components/ui/button';
import { User, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample CLDR language terms
const languageTerms = [
  { title: "January", category: "Month" },
  { title: "English", category: "Language" },
  { title: "Morning", category: "Time" },
  { title: "Monday", category: "Weekday" },
  { title: "Spring", category: "Season" },
  { title: "Hello", category: "Greeting" },
  { title: "Thank you", category: "Courtesy" },
  { title: "Yesterday", category: "Time" },
  { title: "French", category: "Language" },
  { title: "December", category: "Month" },
  { title: "Evening", category: "Time" },
  { title: "Sunday", category: "Weekday" },
  { title: "Winter", category: "Season" },
  { title: "Goodbye", category: "Farewell" },
  { title: "Please", category: "Courtesy" },
];

const Index = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stats, setStats] = useState({
    dailyProgress: 12,
    dailyGoal: 50,
    streak: 7,
    totalReviews: 1247,
    accuracy: 94,
  });
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Update stats based on action
    const newStats = { ...stats };
    newStats.dailyProgress += 1;
    newStats.totalReviews += 1;
    
    // Show feedback toast
    const messages = {
      right: { title: "✅ Approved!", description: "Good catch! This term looks correct." },
      left: { title: "🚩 Flagged!", description: "Thanks for flagging this issue." },
      up: { title: "⏭️ Skipped", description: "No worries, skipping to the next one." }
    };
    
    toast(messages[direction]);
    
    setStats(newStats);
    
    // Move to next card after animation
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % languageTerms.length);
      setIsAnimating(false);
    }, 300);
  };

  const currentCard = languageTerms[currentCardIndex];
  const nextCard = languageTerms[(currentCardIndex + 1) % languageTerms.length];

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            QualitySwipe
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-4 pt-8">
        {/* Stats Panel */}
        <StatsPanel stats={stats} />

        {/* Card Stack Area */}
        <div className="relative mt-12 mb-8 w-80 h-96">
          {/* Next card (background) */}
          {nextCard && (
            <SwipeCard
              key={`next-${(currentCardIndex + 1) % languageTerms.length}`}
              title={nextCard.title}
              category={nextCard.category}
              onSwipe={() => {}}
              isActive={false}
            />
          )}
          
          {/* Current card (foreground) */}
          <SwipeCard
            key={`current-${currentCardIndex}`}
            title={currentCard.title}
            category={currentCard.category}
            onSwipe={handleSwipe}
            isActive={!isAnimating}
          />
        </div>

        {/* Action Buttons */}
        <ActionButtons onAction={handleSwipe} disabled={isAnimating} />

        {/* Instructions */}
        <div className="text-center mt-8 p-4 bg-card/30 rounded-lg backdrop-blur-sm max-w-md">
          <p className="text-sm text-muted-foreground">
            Review language terms for accuracy. Swipe right to approve, left to flag issues, or up to skip.
          </p>
        </div>

        {/* Account Setup Notice */}
        <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg max-w-md text-center">
          <p className="text-sm text-primary mb-2">Ready to save your progress?</p>
          <p className="text-xs text-muted-foreground">
            Connect to Supabase to enable user accounts, leaderboards, and progress tracking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;