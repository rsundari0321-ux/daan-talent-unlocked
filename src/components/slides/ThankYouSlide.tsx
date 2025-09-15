import udaanLogo from '@/assets/udaan-logo.png';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Mail, Github, Linkedin } from 'lucide-react';

export const ThankYouSlide = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      {/* Main Thank You Section */}
      <div className="mb-12">
        <img src={udaanLogo} alt="UDAAN Logo" className="w-24 h-24 mx-auto mb-8" />
        
        <h1 className="text-6xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-6">
          Thank You
        </h1>
        
        <p className="text-2xl text-muted-foreground mb-8 max-w-2xl">
          Let's build the future of Indian sports, together.
        </p>

        {/* Patriotic Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-20 h-1 bg-primary rounded-full" />
          <div className="w-20 h-1 bg-white border border-gray-300 rounded-full" />
          <div className="w-20 h-1 bg-accent rounded-full" />
        </div>

        <p className="text-lg text-muted-foreground max-w-3xl">
          UDAAN represents our commitment to democratizing sports talent assessment across India. 
          Through AI-powered technology, we're creating equal opportunities for every aspiring athlete, 
          regardless of their location or background.
        </p>
      </div>

      {/* Team Section */}
      <Card className="w-full max-w-4xl shadow-patriotic border-2 border-primary/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Our Team</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Arjun Patel", role: "AI/ML Engineer", email: "arjun@udaan.in" },
              { name: "Priya Singh", role: "Full Stack Developer", email: "priya@udaan.in" },
              { name: "Rahul Kumar", role: "Mobile App Developer", email: "rahul@udaan.in" },
              { name: "Sneha Sharma", role: "UI/UX Designer", email: "sneha@udaan.in" },
            ].map((member, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl">
                <div className="w-16 h-16 bg-hero-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                <div className="flex justify-center gap-2">
                  <Mail className="w-4 h-4 text-primary cursor-pointer hover:text-primary/70" />
                  <Github className="w-4 h-4 text-secondary cursor-pointer hover:text-secondary/70" />
                  <Linkedin className="w-4 h-4 text-accent cursor-pointer hover:text-accent/70" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer Message */}
      <div className="mt-12 text-center">
        <p className="text-lg font-medium text-primary mb-2">
          🇮🇳 Empowering Athletic Excellence Across India 🇮🇳
        </p>
        <p className="text-muted-foreground">
          Smart India Hackathon 2024 • Sports Authority of India Partnership
        </p>
      </div>
    </div>
  );
};