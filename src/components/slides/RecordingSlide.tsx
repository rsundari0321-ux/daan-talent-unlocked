import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Square, RotateCcw } from 'lucide-react';
import aiPoseOverlay from '@/assets/ai-pose-overlay.png';

export const RecordingSlide = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-4">
          AI-Powered Recording Interface
        </h2>
        <p className="text-xl text-muted-foreground">
          Advanced pose estimation for accurate performance analysis
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Mobile Camera Interface */}
        <div className="max-w-md mx-auto w-full">
          <div className="bg-black rounded-3xl shadow-hero border-8 border-gray-800 p-4 aspect-[9/16] relative overflow-hidden">
            {/* Camera View Background */}
            <div className="absolute inset-4 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-2xl">
              {/* AI Pose Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={aiPoseOverlay} 
                  alt="AI Pose Detection" 
                  className="w-3/4 h-3/4 object-contain opacity-80"
                />
              </div>
              
              {/* Frame Guide */}
              <div className="absolute inset-4 border-2 border-white/50 border-dashed rounded-lg">
                <div className="absolute -top-8 left-0 right-0 text-center">
                  <span className="bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                    Position full body within frame
                  </span>
                </div>
              </div>
            </div>

            {/* Top Status */}
            <div className="absolute top-8 left-4 right-4 flex justify-between items-center z-10">
              <div className="bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                Vertical Jump Test
              </div>
              <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-full animate-pulse">
                ● REC
              </div>
            </div>

            {/* Guidance Text */}
            <div className="absolute bottom-32 left-4 right-4 text-center z-10">
              <div className="bg-black/70 text-white p-3 rounded-xl">
                <p className="text-lg font-semibold mb-1">Ready to start?</p>
                <p className="text-sm opacity-90">Jump on the beep sound</p>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="absolute bottom-8 left-4 right-4 flex justify-center gap-6 z-10">
              <Button
                variant="outline"
                size="lg"
                className="w-16 h-16 rounded-full border-white text-white hover:bg-white/20"
              >
                <Square className="w-6 h-6" />
              </Button>
              
              <Button
                size="lg"
                className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
              >
                <Video className="w-8 h-8" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-16 h-16 rounded-full border-white text-white hover:bg-white/20"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Explanations */}
        <div className="space-y-6">
          <Card className="shadow-patriotic border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Real-time AI Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced pose estimation tracks body movement with precision, ensuring accurate performance measurement across all assessments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-hero border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">
                    Guided Positioning
                  </h3>
                  <p className="text-muted-foreground">
                    Visual cues and audio prompts guide athletes to optimal positioning, ensuring standardized testing conditions for fair comparison.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-success border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Square className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-accent mb-2">
                    Instant Processing
                  </h3>
                  <p className="text-muted-foreground">
                    Results are calculated immediately using on-device AI, providing instant feedback without requiring internet connectivity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};