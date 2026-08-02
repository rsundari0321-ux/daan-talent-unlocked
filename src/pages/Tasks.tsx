import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListTodo } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface DailyTask {
  id: number;
  task: string;
  completed: boolean;
}

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await supabase
      .from('daily_tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    setTasks(data || []);
    setLoading(false);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    const { error } = await supabase.from('daily_tasks').insert({
      user_id: Number(userId),
      task: newTask,
      completed: false,
    });
    if (!error) {
      setNewTask('');
      fetchTasks();
    }
  };

  const toggleTask = async (id: number, completed: boolean) => {
    await supabase.from('daily_tasks').update({ completed: !completed }).eq('id', id);
    fetchTasks();
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const progressText = `${completedCount} of ${tasks.length} completed`;

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <Card className="shadow-hero border-2 border-secondary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-secondary" />
            <CardTitle className="text-2xl text-secondary">My Daily Tasks</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{progressText}</p>
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <Button onClick={addTask}>Add</Button>
          </div>

          {loading && <p className="text-muted-foreground">Loading tasks...</p>}
          {!loading && tasks.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No tasks yet. Add one above!</p>
          )}

          <div className="space-y-2">
            {tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-lg border p-3">
                <Checkbox checked={t.completed} onCheckedChange={() => toggleTask(t.id, t.completed)} />
                <span className={t.completed ? 'line-through text-muted-foreground' : ''}>{t.task}</span>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
