import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LeaderboardEntry {
  id: number;
  score: number;
  rank: number;
  users: { username: string } | null;
}

export default function Leaderboard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from('leaderboard')
      .select('id, score, rank, users(username)')
      .order('score', { ascending: false });
    setEntries((data as any) || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <Card className="shadow-patriotic border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && <p className="text-muted-foreground">Loading leaderboard...</p>}
          {!loading && entries.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No leaderboard entries yet.</p>
          )}

          <div className="space-y-2">
            {entries.map((e, index) => (
              <div key={e.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {index === 0 ? (
                    <span className="flex w-8 items-center justify-center text-yellow-500"><Trophy className="w-5 h-5" /></span>
                  ) : index === 1 ? (
                    <span className="flex w-8 items-center justify-center text-gray-500"><Trophy className="w-5 h-5" /></span>
                  ) : index === 2 ? (
                    <span className="flex w-8 items-center justify-center text-orange-500"><Trophy className="w-5 h-5" /></span>
                  ) : (
                    <span className="font-bold text-lg text-primary w-8">#{index + 1}</span>
                  )}
                  <span>{e.users?.username || 'Unknown user'}</span>
                </div>
                <span className="font-semibold text-secondary">{e.score} pts</span>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}