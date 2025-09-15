import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TitleSlide } from './slides/TitleSlide';
import { OnboardingSlide } from './slides/OnboardingSlide';
import { DashboardSlide } from './slides/DashboardSlide';
import { TestSelectionSlide } from './slides/TestSelectionSlide';
import { RecordingSlide } from './slides/RecordingSlide';
import { ResultsSlide } from './slides/ResultsSlide';
import { ProfileSlide } from './slides/ProfileSlide';
import { ThankYouSlide } from './slides/ThankYouSlide';

const slides = [
  { component: TitleSlide, title: "UDAAN - Title" },
  { component: OnboardingSlide, title: "Onboarding & Registration" },
  { component: DashboardSlide, title: "Athlete's Dashboard" },
  { component: TestSelectionSlide, title: "Test Selection & Tutorial" },
  { component: RecordingSlide, title: "AI-Powered Recording Interface" },
  { component: ResultsSlide, title: "Instant Results & Feedback" },
  { component: ProfileSlide, title: "Athlete Profile & Progress" },
  { component: ThankYouSlide, title: "Thank You" },
];

export const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iaHNsKHZhcigtLXByaW1hcnkpKSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent">
              UDAAN Presentation
            </h1>
            <span className="text-muted-foreground">
              {currentSlide + 1} of {slides.length}
            </span>
          </div>
          
          {/* Slide Navigator */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </header>

        {/* Slide Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto h-full">
            <CurrentSlideComponent />
          </div>
        </main>

        {/* Navigation Controls */}
        <footer className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-sm border-t border-border">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-center">
            <h3 className="font-medium text-foreground">
              {slides[currentSlide].title}
            </h3>
          </div>

          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 bg-hero-gradient hover:opacity-90"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </footer>
      </div>
    </div>
  );
};