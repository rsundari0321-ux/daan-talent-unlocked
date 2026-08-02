import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import udaanLogo from '@/assets/udaan-logo.png';
import heroAthlete from '@/assets/hero-athlete.jpg';
import saiLogo from '@/assets/sai-logo.png';
import sihLogo from '@/assets/sih-logo.png';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div
        className="w-full max-w-4xl rounded-2xl overflow-hidden relative bg-cover bg-center min-h-[500px] flex flex-col items-center justify-center text-center p-8"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroAthlete})` }}
      >
        <div className="absolute top-6 left-6 bg-white rounded-lg p-2">
          <img src={saiLogo} alt="SAI" className="w-10 h-10" />
        </div>
        <div className="absolute top-6 right-6 bg-white rounded-lg p-2">
          <img src={sihLogo} alt="SIH" className="w-10 h-10" />
        </div>
        <div className="bg-white rounded-lg p-3 mb-6">
          <img src={udaanLogo} alt="UDAAN" className="w-16 h-16" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">UDAAN</h1>
        <p className="text-2xl text-white/90 mb-4">Democratizing Sports Talent Assessment</p>
        <div className="flex gap-2 mb-6">
          <div className="w-16 h-1 bg-orange-500 rounded"></div>
          <div className="w-16 h-1 bg-white rounded"></div>
          <div className="w-16 h-1 bg-green-600 rounded"></div>
        </div>
        <p className="text-white/80 max-w-lg mb-8">
          Empowering India's athletic talent through AI-powered assessment technology
        </p>
        <Button className="bg-hero-gradient hover:opacity-90 text-white font-semibold py-6 px-8 text-lg" onClick={() => navigate('/auth')}>
          Get Started
        </Button>
      </div>
    </div>
  );
}