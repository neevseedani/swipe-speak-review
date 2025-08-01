import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send } from 'lucide-react';

interface FeedbackFormProps {
  card: {
    title: string;
    category: string;
  };
  onSubmit: (feedback: string) => void;
  onBack: () => void;
}

export const FeedbackForm = ({ card, onSubmit, onBack }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback('');
  };

  return (
    <div className="w-80 space-y-6">
      {/* Card Display */}
      <div className="bg-card rounded-2xl border border-border/50 shadow-lg p-8 text-center">
        <div className="mb-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-1 bg-secondary/50 rounded-full">
            {card.category}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">{card.title}</h2>
        <div className="text-sm text-destructive font-medium">
          🚩 Flagged for Review
        </div>
      </div>

      {/* Feedback Form */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          What's the issue?
        </h3>
        <Textarea
          placeholder="Please describe what's incorrect about this term..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="min-h-[100px] mb-4"
        />
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!feedback.trim()}
            className="flex-1"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};