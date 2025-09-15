import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Trophy, TrendingUp, Send, RotateCcw } from 'lucide-react';

export const ResultsSlide = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-4">
          Instant Results & Verified Feedback
        </h2>
        <p className="text-xl text-muted-foreground">
          AI-verified results with comparative analysis
        </p>
      </div>

      <div className="flex-1 max-w-md mx-auto w-full">
        {/* Mobile Frame */}
        <div className="bg-white rounded-3xl shadow-hero border-8 border-gray-300 p-6 h-full max-h-[700px]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-success-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Assessment Complete!
            </h3>
            <p className="text-gray-600">Vertical Jump Test</p>
          </div>

          {/* Main Result */}
          <Card className="mb-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <span className="text-6xl font-bold text-primary">52</span>
                <span className="text-2xl text-primary ml-2">cm</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-600 font-semibold">AI Verified ✓</span>
              </div>
              <p className="text-muted-foreground">
                Excellent performance! Your result is above average for your age group.
              </p>
            </CardContent>
          </Card>

          {/* Comparative Analysis */}
          <Card className="mb-6 border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-secondary">
                <TrendingUp className="w-5 h-5" />
                Performance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>District Average</span>
                  <span className="font-semibold">45cm</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-green-600 mt-1">+7cm above average</p>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>State Average</span>
                  <span className="font-semibold">48cm</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-green-600 mt-1">+4cm above average</p>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>National Average</span>
                  <span className="font-semibold">50cm</span>
                </div>
                <Progress value={92} className="h-2" />
                <p className="text-xs text-green-600 mt-1">+2cm above average</p>
              </div>
            </CardContent>
          </Card>

          {/* Improvement Insight */}
          <Card className="mb-6 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-accent" />
                <div>
                  <h4 className="font-semibold text-gray-900">Personal Best!</h4>
                  <p className="text-sm text-gray-600">+3cm improvement from last test</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-success-gradient hover:opacity-90 text-white py-3">
              <Send className="w-4 h-4 mr-2" />
              Submit to SAI Database
            </Button>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 py-3">
              <RotateCcw className="w-4 h-4 mr-2" />
              Attempt Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};