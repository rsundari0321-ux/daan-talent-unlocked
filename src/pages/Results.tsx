import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Results() {
  const { testId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reps = Number(searchParams.get('reps') || 0);
  const [saved, setSaved] = useState(false);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    async function saveRecord() {
      if (!userId) return;
      await supabase.from('records').insert({
        user_id: Number(userId),
        activity: testId,
        value: reps,
      });
      setSaved(true);
    }
    saveRecord();
  }, []);

  const getFeedback = () => {
    if (reps >= 15) return 'Excellent performance! Keep up the great work.';
    if (reps >= 8) return 'Good effort! Consistent practice will improve your score.';
    return 'Nice start! Keep training to build up your reps.';
  };

  const progressPercent = Math.min((reps / 20) * 100, 100);
  const progressColor = reps >= 15 ? 'bg-green-500' : reps >= 8 ? 'bg-amber-500' : 'bg-orange-500';
  const progressLabel = reps >= 15 ? 'Elite' : reps >= 8 ? 'Strong' : 'Building';

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto flex items-center justify-center">
      <Card className="w-full shadow-success border-2 border-accent/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Trophy className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl text-accent">Test Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-lg text-muted-foreground">{testId} Results</p>

          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-4 border-primary/30 bg-primary/5">
            <div>
              <p className="text-5xl font-bold text-primary">{reps}</p>
              <p className="text-muted-foreground text-sm">reps completed</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Performance</span>
              <span className="font-medium text-secondary">{progressLabel}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div className={`h-full ${progressColor}`} style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <p className="text-secondary font-medium">{getFeedback()}</p>

          <div className="space-y-3 pt-2">
            <p className="font-semibold flex items-center gap-2">Performance Comparison</p>
            {[
              { label: 'District Average', avg: Math.round(reps * 0.85), reps },
              { label: 'State Average', avg: Math.round(reps * 0.9), reps },
              { label: 'National Average', avg: Math.round(reps * 0.95), reps },
            ].map((row) => (
              <div key={row.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{row.label}</span>
                  <span>{row.avg}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min((row.avg / (reps || 1)) * 100, 100)}%` }} />
                </div>
                <p className="text-xs text-green-600">+{reps - row.avg} above average</p>
              </div>
            ))}
          </div>

          {saved && <p className="text-sm text-muted-foreground">Result saved to your records</p>}

          <div className="space-y-2 pt-4">
            <Button className="w-full bg-hero-gradient hover:opacity-90 text-white" onClick={() => navigate('/test-selection')}>
              Try Another Test
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}