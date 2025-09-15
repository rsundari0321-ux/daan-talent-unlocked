import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, TrendingUp, Calendar, MapPin, Trophy, Target } from 'lucide-react';

const performanceData = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 45 },
  { month: 'Mar', value: 43 },
  { month: 'Apr', value: 48 },
  { month: 'May', value: 50 },
  { month: 'Jun', value: 52 },
];

const testHistory = [
  { test: 'Vertical Jump', date: 'June 15, 2024', score: '52 cm', verified: true },
  { test: '30m Dash', date: 'June 10, 2024', score: '4.8 sec', verified: true },
  { test: 'Push-ups', date: 'June 5, 2024', score: '28 reps', verified: true },
  { test: 'Sit-ups', date: 'May 28, 2024', score: '35 reps', verified: true },
  { test: 'Vertical Jump', date: 'May 20, 2024', score: '50 cm', verified: true },
];

export const ProfileSlide = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-4">
          Athlete Profile & Progress Tracking
        </h2>
        <p className="text-xl text-muted-foreground">
          Comprehensive performance analytics and improvement tracking
        </p>
      </div>

      <div className="flex-1 max-w-md mx-auto w-full">
        {/* Mobile Frame */}
        <div className="bg-white rounded-3xl shadow-hero border-8 border-gray-300 p-6 h-full max-h-[700px] overflow-y-auto">
          {/* User Profile Header */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
            <div className="w-16 h-16 bg-hero-gradient rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">Priya Sharma</h3>
              <p className="text-gray-600">Age: 16 | Athletics</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Performance Graph */}
          <Card className="mb-6 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <TrendingUp className="w-5 h-5" />
                Vertical Jump Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-end justify-between gap-2 mb-4">
                {performanceData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div 
                      className="w-6 bg-gradient-to-t from-primary to-accent rounded-t"
                      style={{ height: `${(data.value / 55) * 100}%` }}
                    />
                    <span className="text-xs text-gray-600">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Starting: 42cm</span>
                <span className="text-green-600 font-semibold">Current: 52cm (+23%)</span>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Badge */}
          <Card className="mb-6 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-accent" />
                <div>
                  <h4 className="font-semibold text-gray-900">Rising Star</h4>
                  <p className="text-sm text-gray-600">Consistent improvement over 6 months</p>
                </div>
                <Badge className="bg-accent/10 text-accent">New!</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Test History */}
          <Card className="border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-secondary">
                <Calendar className="w-5 h-5" />
                Assessment History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {testHistory.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-gray-900">{test.test}</p>
                      <p className="text-xs text-gray-500">{test.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{test.score}</p>
                    {test.verified && (
                      <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};