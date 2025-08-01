import { useState, useRef } from 'react';
import { Check, X, SkipForward } from 'lucide-react';

interface SwipeCardProps {
  title: string;
  category: string;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  isActive: boolean;
}

export const SwipeCard = ({ title, category, onSwipe, isActive }: SwipeCardProps) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isActive) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !isActive) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setDragOffset({ x: deltaX, y: deltaY });

    // Determine swipe direction based on offset
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setSwipeDirection(deltaX > 0 ? 'right' : 'left');
    } else if (deltaY < -50) {
      setSwipeDirection('up');
    } else {
      setSwipeDirection(null);
    }
  };

  const handlePointerUp = () => {
    if (!isDragging || !isActive) return;
    setIsDragging(false);

    const threshold = 100;
    const { x, y } = dragOffset;

    if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
      if (Math.abs(x) > Math.abs(y)) {
        // Animate card off screen
        const direction = x > 0 ? 'right' : 'left';
        const exitDistance = direction === 'right' ? 500 : -500;
        setDragOffset({ x: exitDistance, y: y });
        setTimeout(() => onSwipe(direction), 300);
      } else if (y < -threshold) {
        // Animate card up off screen
        setDragOffset({ x: x, y: -500 });
        setTimeout(() => onSwipe('up'), 300);
      }
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
    }
  };

  const getRotation = () => {
    return dragOffset.x * 0.1;
  };

  const getOpacity = () => {
    const distance = Math.sqrt(dragOffset.x ** 2 + dragOffset.y ** 2);
    return Math.max(0.3, 1 - distance / 200);
  };

  const getOverlayOpacity = () => {
    const distance = Math.sqrt(dragOffset.x ** 2 + dragOffset.y ** 2);
    return Math.min(0.8, distance / 150);
  };

  return (
    <div
      ref={cardRef}
      className={`absolute w-80 h-96 rounded-2xl bg-card border border-border shadow-2xl cursor-grab select-none transition-all duration-300 ${
        isActive ? 'z-20' : 'z-10 scale-95 -translate-y-4'
      } ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${getRotation()}deg)`,
        opacity: isActive ? getOpacity() : 0.7,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Overlay for swipe feedback */}
      {swipeDirection && (
        <div
          className={`absolute inset-0 rounded-2xl flex items-center justify-center transition-opacity ${
            swipeDirection === 'right' ? 'bg-gradient-success' : 
            swipeDirection === 'left' ? 'bg-gradient-error' : 
            'bg-gradient-warning'
          }`}
          style={{ opacity: getOverlayOpacity() }}
        >
          {swipeDirection === 'right' && <Check className="w-16 h-16 text-white animate-bounce-in" />}
          {swipeDirection === 'left' && <X className="w-16 h-16 text-white animate-bounce-in" />}
          {swipeDirection === 'up' && <SkipForward className="w-16 h-16 text-white animate-bounce-in" />}
        </div>
      )}

      {/* Card content */}
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
          {category}
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-8">{title}</h2>
        <div className="text-muted-foreground text-sm">
          Swipe → to approve, ← to flag, ↑ to skip
        </div>
      </div>
    </div>
  );
};