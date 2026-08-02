import { useNavigate } from 'react-router-dom';
import { Activity, TrendingUp, Target, Waves, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TESTS = [
  { id: 'situps', name: 'Sit-ups', description: 'Core strength test - count your reps' },
  { id: 'pushups', name: 'Push-ups', description: 'Upper body strength test - count your reps' },
  { id: 'jump', name: 'Vertical Jump', description: 'Explosive power test' },
];

const getTestIcon = (testId: string) => {
  if (testId === 'situps') return Activity;
  if (testId === 'pushups') return Target;
  if (testId === 'jump') return TrendingUp;
  if (testId === 'dash' || testId === 'sprint') return Zap;
  return Waves;
};

export default function TestSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <Card className="shadow-hero border-2 border-secondary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-secondary">Select Assessment</CardTitle>
          <p className="text-muted-foreground">Choose a test to begin your evaluation</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {TESTS.map((test) => {
            const Icon = getTestIcon(test.id);

            return (
              <div key={test.id} className="p-4 border rounded-lg flex justify-between items-center gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-secondary/10 p-2 text-secondary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{test.name}</h3>
                    <p className="text-sm text-muted-foreground">{test.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="text-xs px-3 py-2" type="button">
                    Tutorial
                  </Button>
                  <Button onClick={() => navigate(`/recording/${test.id}`)}>Start</Button>
                </div>
              </div>
            );
          })}
          <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}