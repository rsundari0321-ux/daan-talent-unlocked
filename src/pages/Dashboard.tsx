import { useNavigate } from 'react-router-dom';
import { Target, MessageCircle, Trophy, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import udaanLogo from '@/assets/udaan-logo.png';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <Card className="w-full shadow-patriotic border-2 border-primary/20">
        <CardHeader className="text-center">
          <img src={udaanLogo} alt="UDAAN" className="w-16 h-16 mx-auto mb-4" />
          <CardTitle className="text-2xl text-primary">Welcome back!</CardTitle>
          <p className="text-muted-foreground">Ready to push your limits today?</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button className="h-32 flex flex-col items-center justify-center gap-2 bg-hero-gradient hover:opacity-90 text-white font-semibold text-lg rounded-xl" onClick={() => navigate('/tasks')}>
              <Target className="w-7 h-7" />
              <span>My Daily Tasks</span>
            </Button>
            <Button className="h-32 flex flex-col items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white text-lg rounded-xl" onClick={() => navigate('/chat')}>
              <MessageCircle className="w-7 h-7" />
              <span>AI Assistant</span>
            </Button>
            <Button className="h-32 flex flex-col items-center justify-center gap-2 bg-success-gradient hover:opacity-90 text-white text-lg rounded-xl" onClick={() => navigate('/leaderboard')}>
              <Trophy className="w-7 h-7" />
              <span>Leaderboard</span>
            </Button>
            <Button className="h-32 flex flex-col items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold text-lg rounded-xl" onClick={() => navigate('/profile')}>
              <User className="w-7 h-7" />
              <span>My Profile</span>
            </Button>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-xl" onClick={() => navigate('/test-selection')}>
            Take a Fitness Test
          </Button>
          <Button variant="outline" className="w-full mt-4" onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}