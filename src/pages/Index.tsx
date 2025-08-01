import { useState, useEffect } from 'react';
import { SwipeCard } from '@/components/SwipeCard';
import { StatsPanel } from '@/components/StatsPanel';
import { ActionButtons } from '@/components/ActionButtons';
import { Button } from '@/components/ui/button';
import { User, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample CLDR language terms
// CLDR modules organized by type
const cldrModules = {
  "Time & Calendar": [
    { title: "January", category: "Month" },
    { title: "Morning", category: "Time" },
    { title: "Monday", category: "Weekday" },
    { title: "Spring", category: "Season" },
    { title: "Yesterday", category: "Time" },
    { title: "December", category: "Month" },
    { title: "Evening", category: "Time" },
    { title: "Sunday", category: "Weekday" },
    { title: "Winter", category: "Season" },
  ],
  "Languages & Communication": [
    { title: "English", category: "Language" },
    { title: "Hello", category: "Greeting" },
    { title: "Thank you", category: "Courtesy" },
    { title: "French", category: "Language" },
    { title: "Goodbye", category: "Farewell" },
    { title: "Please", category: "Courtesy" },
  ],
};

const moduleNames = Object.keys(cldrModules);
const allTerms = Object.values(cldrModules).flat();

const Index = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stats, setStats] = useState({
    currentModule: moduleNames[0],
    moduleProgress: 48,
    totalModules: moduleNames.length,
    totalReviews: 12,
    accuracy: 94,
  });
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Update stats based on action
    const newStats = { ...stats };
    newStats.totalReviews += 1;
    newStats.moduleProgress = Math.min(100, ((newStats.totalReviews % 25) / 25) * 100);
    
    // Switch module every 25 reviews
    if (newStats.totalReviews % 25 === 0) {
      const moduleIndex = Math.floor(newStats.totalReviews / 25) % moduleNames.length;
      newStats.currentModule = moduleNames[moduleIndex];
    }
    
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
      setCurrentCardIndex((prev) => (prev + 1) % allTerms.length);
      setIsAnimating(false);
    }, 300);
  };

  const currentCard = allTerms[currentCardIndex];
  const nextCard = allTerms[(currentCardIndex + 1) % allTerms.length];

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
      <div className="flex items-start justify-center gap-8 px-4 pt-8">
        {/* Stats Panel */}
        <StatsPanel stats={stats} />

        {/* Card Stack Area */}
        <div className="relative w-80 h-96">
          {/* Next card (background) */}
          {nextCard && (
            <SwipeCard
              key={`next-${(currentCardIndex + 1) % allTerms.length}`}
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

        {/* Instructions */}
        <div className="text-center p-4 bg-card/30 rounded-lg backdrop-blur-sm max-w-md">
          <p className="text-sm text-muted-foreground">
            Review language terms for accuracy. Swipe right to approve, left to flag issues, or up to skip.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center pb-8">
        <ActionButtons onAction={handleSwipe} disabled={isAnimating} />
      </div>
    </div>
  );
};

export default Index;