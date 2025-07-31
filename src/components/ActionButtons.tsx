import { X, Check, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onAction: (action: 'left' | 'right' | 'up') => void;
  disabled?: boolean;
}

export const ActionButtons = ({ onAction, disabled }: ActionButtonsProps) => {
  return (
    <div className="flex items-center justify-center space-x-6 mt-8">
      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full border-destructive/50 hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
        onClick={() => onAction('left')}
        disabled={disabled}
      >
        <X className="w-6 h-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full border-warning/50 hover:bg-warning hover:text-warning-foreground disabled:opacity-50"
        onClick={() => onAction('up')}
        disabled={disabled}
      >
        <SkipForward className="w-6 h-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full border-success/50 hover:bg-success hover:text-success-foreground disabled:opacity-50"
        onClick={() => onAction('right')}
        disabled={disabled}
      >
        <Check className="w-6 h-6" />
      </Button>
    </div>
  );
};