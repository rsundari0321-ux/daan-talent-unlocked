import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import udaanLogo from '@/assets/udaan-logo.png';

export default function ThankYou() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-center">
      <div className="max-w-lg">
        <img src={udaanLogo} alt="UDAAN" className="w-16 h-16 mx-auto mb-6" />
        <h1 className="text-5xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-4">Thank You</h1>
        <p className="text-xl text-muted-foreground mb-6">Let's build the future of Indian sports, together.</p>
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-16 h-1 bg-orange-500 rounded"></div>
          <div className="w-16 h-1 bg-white border rounded"></div>
          <div className="w-16 h-1 bg-green-600 rounded"></div>
        </div>
        <p className="text-muted-foreground mb-8">
          UDAAN represents our commitment to democratizing sports talent assessment across India. Through AI-powered technology, we're creating equal opportunities for every aspiring athlete, regardless of their location or background.
        </p>
        <Button className="bg-hero-gradient hover:opacity-90 text-white" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}