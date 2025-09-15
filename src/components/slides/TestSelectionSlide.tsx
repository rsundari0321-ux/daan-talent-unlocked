import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Clock, TrendingUp, Target, Zap, Activity, Timer, Gauge } from 'lucide-react';

const tests = [
  { name: 'Vertical Jump', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
  { name: '30m Dash', icon: Zap, color: 'text-secondary', bg: 'bg-secondary/10' },
  { name: 'Sit-Ups', icon: Activity, color: 'text-accent', bg: 'bg-accent/10' },
  { name: 'Push-Ups', icon: Target, color: 'text-primary', bg: 'bg-primary/10' },
  { name: 'Flexibility', icon: Gauge, color: 'text-secondary', bg: 'bg-secondary/10' },
  { name: 'Endurance Run', icon: Timer, color: 'text-accent', bg: 'bg-accent/10' },
];

export const TestSelectionSlide = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-4">
          Test Selection & Tutorial
        </h2>
        <p className="text-xl text-muted-foreground">
          Choose your assessment with guided tutorials for perfect form
        </p>
      </div>

      <div className="flex-1 max-w-md mx-auto w-full">
        {/* Mobile Frame */}
        <div className="bg-white rounded-3xl shadow-hero border-8 border-gray-300 p-6 h-full max-h-[700px] overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Select Assessment
            </h3>
            <p className="text-gray-600">Choose a test to begin your evaluation</p>
          </div>

          {/* Test Grid */}
          <div className="space-y-4 mb-6">
            {tests.map((test, index) => {
              const IconComponent = test.icon;
              return (
                <Card key={index} className="border-2 border-gray-100 hover:border-primary/30 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${test.bg} flex items-center justify-center`}>
                          <IconComponent className={`w-6 h-6 ${test.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{test.name}</h4>
                          <p className="text-sm text-gray-500">AI-guided assessment</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-primary text-primary hover:bg-primary/10"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Tutorial
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-hero-gradient hover:opacity-90"
                        >
                          Start
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Tutorial Feature Highlight */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Play className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-gray-900">Watch Tutorials</h4>
                  <p className="text-sm text-gray-600">Learn correct form and procedures for standardized results</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};