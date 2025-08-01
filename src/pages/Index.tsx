import { useState } from 'react';
import { SwipeCard } from '@/components/SwipeCard';
import { ActionButtons } from '@/components/ActionButtons';
import { FeedbackForm } from '@/components/FeedbackForm';
import { Button } from '@/components/ui/button';
import { User, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// CLDR modules organized by type
const cldrModules = {
  "Basic Greetings": [
    { title: "Hello", category: "Greeting" },
    { title: "Goodbye", category: "Farewell" },
    { title: "Thank you", category: "Courtesy" },
    { title: "Please", category: "Courtesy" },
    { title: "Sorry", category: "Courtesy" },
  ],
  "Time & Calendar": [
    { title: "January", category: "Month" },
    { title: "Morning", category: "Time" },
    { title: "Monday", category: "Weekday" },
    { title: "Spring", category: "Season" },
    { title: "Yesterday", category: "Time" },
  ],
  "Languages": [
    { title: "English", category: "Language" },
    { title: "French", category: "Language" },
    { title: "Spanish", category: "Language" },
    { title: "German", category: "Language" },
    { title: "Italian", category: "Language" },
  ],
};

const moduleNames = Object.keys(cldrModules);

const Index = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [flaggedCard, setFlaggedCard] = useState<{title: string, category: string} | null>(null);
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>({
    "Basic Greetings": 0,
    "Time & Calendar": 0,
    "Languages": 0,
  });
  const [stats, setStats] = useState({
    totalReviews: 0,
    accuracy: 94,
  });
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (isAnimating) return;
    
    // If flagging (left swipe), show feedback form
    if (direction === 'left') {
      setFlaggedCard({ title: currentCard.title, category: currentCard.category });
      setShowFeedbackForm(true);
      return;
    }
    
    setIsAnimating(true);
    
    // Update stats
    const newStats = { ...stats };
    newStats.totalReviews += 1;
    
    // Update current module progress
    const currentModuleName = moduleNames[currentModuleIndex];
    const currentModuleTerms = cldrModules[currentModuleName];
    const newProgress = { ...moduleProgress };
    const currentProgress = newProgress[currentModuleName];
    const incrementPerTerm = 100 / currentModuleTerms.length;
    newProgress[currentModuleName] = Math.min(100, Math.round(currentProgress + incrementPerTerm));
    
    // Show feedback toast
    const messages = {
      right: { title: "✅ Approved!", description: "Good catch! This term looks correct." },
      up: { title: "⏭️ Skipped", description: "No worries, skipping to the next one." }
    };
    
    toast(messages[direction]);
    
    setStats(newStats);
    setModuleProgress(newProgress);
    
    // Move to next card after animation
    setTimeout(() => {
      const moduleTerms = cldrModules[moduleNames[currentModuleIndex]];
      setCurrentCardIndex((prev) => (prev + 1) % moduleTerms.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    // Update stats
    const newStats = { ...stats };
    newStats.totalReviews += 1;
    
    // Update current module progress
    const currentModuleName = moduleNames[currentModuleIndex];
    const currentModuleTerms = cldrModules[currentModuleName];
    const newProgress = { ...moduleProgress };
    const currentProgress = newProgress[currentModuleName];
    const incrementPerTerm = 100 / currentModuleTerms.length;
    newProgress[currentModuleName] = Math.min(100, Math.round(currentProgress + incrementPerTerm));
    
    toast({ 
      title: "🚩 Feedback Submitted!", 
      description: "Thanks for the detailed feedback on this term." 
    });
    
    setStats(newStats);
    setModuleProgress(newProgress);
    setShowFeedbackForm(false);
    setFlaggedCard(null);
    
    // Move to next card
    const feedbackModuleTerms = cldrModules[moduleNames[currentModuleIndex]];
    setCurrentCardIndex((prev) => (prev + 1) % feedbackModuleTerms.length);
  };

  const handleFeedbackBack = () => {
    setShowFeedbackForm(false);
    setFlaggedCard(null);
  };

  const currentModuleTerms = cldrModules[moduleNames[currentModuleIndex]];
  const currentCard = currentModuleTerms[currentCardIndex];
  const nextCard = currentModuleTerms[(currentCardIndex + 1) % currentModuleTerms.length];

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            SILICON UI/UX Test
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
        {/* Module Selector & Progress */}
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex bg-card/50 backdrop-blur-sm rounded-lg p-1 border border-border/50">
              {moduleNames.map((moduleName, index) => (
                <button
                  key={moduleName}
                  onClick={() => {
                    setCurrentModuleIndex(index);
                    setCurrentCardIndex(0);
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    index === currentModuleIndex
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {moduleName}
                </button>
              ))}
            </div>
          </div>
          
          {/* Progress for current module */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
            <div className="text-center mb-3">
              <h3 className="text-lg font-bold text-foreground">{moduleNames[currentModuleIndex]}</h3>
              <div className="text-sm text-muted-foreground">
                {Math.round(moduleProgress[moduleNames[currentModuleIndex]])}% Complete
              </div>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div 
                className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${moduleProgress[moduleNames[currentModuleIndex]]}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card Stack Area or Feedback Form */}
        <div className="relative w-80 h-96 mb-8">
          {showFeedbackForm && flaggedCard ? (
            <FeedbackForm
              card={flaggedCard}
              onSubmit={handleFeedbackSubmit}
              onBack={handleFeedbackBack}
            />
          ) : (
            <>
              {/* Next card (background) */}
              {nextCard && (
                <SwipeCard
                  key={`next-${currentModuleIndex}-${(currentCardIndex + 1) % currentModuleTerms.length}`}
                  title={nextCard.title}
                  category={nextCard.category}
                  onSwipe={() => {}}
                  isActive={false}
                />
              )}
              
              {/* Current card (foreground) */}
              <SwipeCard
                key={`current-${currentModuleIndex}-${currentCardIndex}`}
                title={currentCard.title}
                category={currentCard.category}
                onSwipe={handleSwipe}
                isActive={!isAnimating}
              />
            </>
          )}
        </div>

        {/* Action Buttons - only show when not in feedback mode */}
        {!showFeedbackForm && (
          <ActionButtons onAction={handleSwipe} disabled={isAnimating} />
        )}

        {/* Instructions */}
        <div className="text-center mt-8 p-4 bg-card/30 rounded-lg backdrop-blur-sm max-w-md">
          <p className="text-sm text-muted-foreground">
            Review language terms for accuracy. Swipe right to approve, left to flag issues, or up to skip.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;