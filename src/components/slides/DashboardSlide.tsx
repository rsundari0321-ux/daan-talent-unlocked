import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, User, Trophy, Play, TrendingUp, Target, Clock, Medal } from 'lucide-react';

export const DashboardSlide = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-4">
          Athlete's Dashboard
        </h2>
        <p className="text-xl text-muted-foreground">
          Personalized home screen for seamless user experience
        </p>
      </div>

      <div className="flex-1 max-w-md mx-auto w-full">
        {/* Mobile Frame */}
        <div className="bg-white rounded-3xl shadow-hero border-8 border-gray-300 p-6 h-full max-h-[700px]">
          {/* Status Bar */}
          <div className="flex justify-between items-center text-xs text-gray-600 mb-6">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
              <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
              <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, Priya! 👋
            </h3>
            <p className="text-gray-600">Ready to push your limits today?</p>
          </div>

          {/* Main CTA */}
          <Card className="mb-6 bg-hero-gradient border-0 text-white shadow-patriotic">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h4 className="text-xl font-bold mb-2">Start New Assessment</h4>
              <p className="text-white/90 mb-4">Begin your performance evaluation</p>
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Let's Go!
              </Button>
            </CardContent>
          </Card>

          {/* Recent Performance */}
          <Card className="mb-6 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <TrendingUp className="w-5 h-5" />
                Recent Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Vertical Jump</p>
                  <p className="text-2xl font-bold text-accent">45 cm</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                  <p className="text-sm text-green-600 font-medium">+3cm improved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Tests */}
          <Card className="mb-6 border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-secondary">
                <Medal className="w-5 h-5" />
                Recommended Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-medium">30m Dash</p>
                </div>
                <div className="text-center p-3 bg-secondary/5 rounded-lg">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-secondary" />
                  <p className="text-xs font-medium">Push-ups</p>
                </div>
                <div className="text-center p-3 bg-accent/5 rounded-lg">
                  <Target className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <p className="text-xs font-medium">Sit-ups</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Navigation */}
          <div className="flex justify-around items-center pt-4 border-t border-gray-200">
            <div className="flex flex-col items-center gap-1">
              <Home className="w-6 h-6 text-primary" />
              <span className="text-xs text-primary font-medium">Home</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <User className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">Profile</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Trophy className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">Leaderboard</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Play className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">Tutorials</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};