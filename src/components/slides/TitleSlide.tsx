import heroAthlete from '@/assets/hero-athlete.jpg';
import udaanLogo from '@/assets/udaan-logo.png';
import saiLogo from '@/assets/sai-logo.png';
import sihLogo from '@/assets/sih-logo.png';

export const TitleSlide = () => {
  return (
    <div className="h-full flex flex-col relative overflow-hidden rounded-2xl">
      {/* Background Hero Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroAthlete})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Corner Logos */}
      <div className="absolute top-8 left-8 z-20">
        <img src={saiLogo} alt="Sports Authority of India" className="w-16 h-16 object-contain" />
      </div>
      <div className="absolute top-8 right-8 z-20">
        <img src={sihLogo} alt="Smart India Hackathon" className="w-16 h-16 object-contain" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-8">
        {/* UDAAN Logo */}
        <div className="mb-8">
          <img src={udaanLogo} alt="UDAAN Logo" className="w-32 h-32 mx-auto mb-6" />
        </div>

        {/* Main Title */}
        <h1 className="text-8xl font-bold text-white mb-6 drop-shadow-2xl">
          UDAAN
        </h1>

        {/* Tagline */}
        <p className="text-3xl text-white/90 font-medium mb-8 drop-shadow-lg">
          Democratizing Sports Talent Assessment
        </p>

        {/* Patriotic Accent */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-1 bg-primary rounded-full" />
          <div className="w-16 h-1 bg-white rounded-full" />
          <div className="w-16 h-1 bg-accent rounded-full" />
        </div>

        {/* Subtitle */}
        <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
          Empowering India's athletic talent through AI-powered assessment technology
        </p>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent z-5" />
    </div>
  );
};