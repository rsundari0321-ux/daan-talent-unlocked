import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import udaanLogo from '@/assets/udaan-logo.png';

export const OnboardingSlide = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-4">
          Onboarding & Registration
        </h2>
        <p className="text-xl text-muted-foreground">
          Simple, secure, and user-friendly registration process
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Screen 1: Welcome */}
        <Card className="shadow-patriotic border-2 border-primary/20 hover:border-primary/40 transition-all">
          <CardHeader className="text-center pb-6">
            <img src={udaanLogo} alt="UDAAN" className="w-16 h-16 mx-auto mb-4" />
            <CardTitle className="text-2xl text-primary">Welcome to UDAAN</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground mb-6">
              Your journey to sporting excellence begins here
            </p>
            <Button className="w-full bg-hero-gradient hover:opacity-90 text-white font-semibold py-3">
              Register
            </Button>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 py-3">
              Login
            </Button>
          </CardContent>
        </Card>

        {/* Screen 2: Registration Form */}
        <Card className="shadow-hero border-2 border-secondary/20 hover:border-secondary/40 transition-all">
          <CardHeader>
            <CardTitle className="text-2xl text-secondary">Registration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sport">Sport</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="athletics">Athletics</SelectItem>
                  <SelectItem value="swimming">Swimming</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input id="aadhaar" placeholder="XXXX XXXX XXXX" />
            </div>
            <Button className="w-full bg-secondary hover:bg-secondary/90">
              Continue
            </Button>
          </CardContent>
        </Card>

        {/* Screen 3: OTP Verification */}
        <Card className="shadow-success border-2 border-accent/20 hover:border-accent/40 transition-all">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">Verify OTP</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground text-center">
              Enter the 6-digit code sent to your mobile number
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Input
                  key={i}
                  className="w-12 h-12 text-center text-lg font-bold border-2 border-accent/30 focus:border-accent"
                  maxLength={1}
                  placeholder="0"
                />
              ))}
            </div>
            <Button className="w-full bg-success-gradient hover:opacity-90 text-white">
              Verify & Continue
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Didn't receive code? <span className="text-accent cursor-pointer hover:underline">Resend</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};