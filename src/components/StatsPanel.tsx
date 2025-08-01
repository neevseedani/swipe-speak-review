import { Trophy, Target, Flame, TrendingUp } from 'lucide-react';

interface StatsPanelProps {
  stats: {
    currentModule: string;
    moduleProgress: number;
    totalModules: number;
    totalReviews: number;
    accuracy: number;
  };
}

export const StatsPanel = ({ stats }: StatsPanelProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 w-72">
      <div className="space-y-6">
        {/* Current Module */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-foreground mb-2">{stats.currentModule}</h3>
          <div className="text-sm text-muted-foreground mb-3">
            Module {Math.floor((stats.totalReviews / 25) % stats.totalModules) + 1} of {stats.totalModules}
          </div>
          <div className="w-full bg-secondary rounded-full h-3">
            <div 
              className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${stats.moduleProgress}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {stats.moduleProgress}% Complete
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Reviews</span>
            <span className="text-lg font-bold text-foreground">
              {stats.totalReviews.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Accuracy</span>
            <span className="text-lg font-bold text-success">
              {stats.accuracy}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};