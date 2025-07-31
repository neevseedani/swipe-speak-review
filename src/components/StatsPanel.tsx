import { Trophy, Target, Flame, TrendingUp } from 'lucide-react';

interface StatsPanelProps {
  stats: {
    dailyProgress: number;
    dailyGoal: number;
    streak: number;
    totalReviews: number;
    accuracy: number;
  };
}

export const StatsPanel = ({ stats }: StatsPanelProps) => {
  const progressPercentage = (stats.dailyProgress / stats.dailyGoal) * 100;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Daily Progress</h3>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Reviews</span>
          <span className="text-sm font-medium text-foreground">
            {stats.dailyProgress}/{stats.dailyGoal}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {Math.round(progressPercentage)}% complete
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
          <div className="p-2 rounded-full bg-primary/20">
            <Flame className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Streak</div>
            <div className="text-lg font-bold text-foreground">{stats.streak}🔥</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
          <div className="p-2 rounded-full bg-success/20">
            <Target className="w-4 h-4 text-success" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
            <div className="text-lg font-bold text-foreground">{stats.accuracy}%</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
          <div className="p-2 rounded-full bg-warning/20">
            <Trophy className="w-4 h-4 text-warning" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-lg font-bold text-foreground">{stats.totalReviews.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
          <div className="p-2 rounded-full bg-primary/20 animate-pulse-glow">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Ranking</div>
            <div className="text-lg font-bold text-foreground">#3</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-6">
        <div className="text-sm text-muted-foreground mb-2">Recent Achievements</div>
        <div className="flex space-x-2">
          <span className="text-2xl animate-bounce" title="100 Reviews">🏆</span>
          <span className="text-2xl animate-bounce" title="High Accuracy">🥇</span>
          <span className="text-2xl animate-bounce" title="7 Day Streak">🎯</span>
          <span className="text-2xl animate-bounce" title="Community Helper">🌟</span>
          <span className="text-2xl animate-bounce" title="Speed Reviewer">⭐</span>
        </div>
      </div>
    </div>
  );
};