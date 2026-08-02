import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Target, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserInfo {
  username: string;
  email: string;
}

interface RecordEntry {
  id: number;
  activity: string;
  value: number;
  created_at: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
  const [user, setUser] = useState<UserInfo | null>(null);
  const [records, setRecords] = useState<RecordEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: userData } = await supabase
      .from('users')
      .select('username, email')
      .eq('id', userId)
      .single();
    setUser(userData);

    const { data: recordData } = await supabase
      .from('records')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    setRecords(recordData || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <Card className="shadow-patriotic border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading && <p className="text-muted-foreground text-center">Loading...</p>}

          {user && (
            <div className="p-4 border rounded-lg flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-lg">{user.username}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          )}

          <div className="p-4 border rounded-lg space-y-3">
            <p className="font-semibold flex items-center gap-2">Progress Overview</p>
            <div className="flex items-end justify-between h-24 gap-2">
              {records.slice(0, 6).reverse().map((r) => (
                <div key={r.id} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-primary rounded-t" style={{ height: `${Math.min(r.value * 4, 90)}px` }} />
                  <span className="text-xs text-muted-foreground capitalize">{r.activity.slice(0, 4)}</span>
                </div>
              ))}
              {records.length === 0 && <p className="text-sm text-muted-foreground w-full text-center">No data yet</p>}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Test History</h3>
            </div>
            {!loading && records.length === 0 && (
              <p className="text-muted-foreground text-center py-4">No test records yet.</p>
            )}
            <div className="space-y-2">
              {records.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                      <Target className="w-4 h-4" />
                    </div>
                    <span className="capitalize">{r.activity}</span>
                  </div>
                  <span className="font-semibold text-secondary">{r.value} reps</span>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}