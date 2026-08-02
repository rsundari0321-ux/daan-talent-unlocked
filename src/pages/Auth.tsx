import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import udaanLogo from '@/assets/udaan-logo.png';

type Step = 'welcome' | 'register' | 'login' | 'otp';

export default function Auth() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { data: userRow } = await supabase.from('users').insert({
        username: name,
        email: email,
      }).select().single();

      if (userRow) {
        localStorage.setItem('user_id', String(userRow.id));
      }
    }

    setLoading(false);
    setStep('otp');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const { data: userRow } = await supabase.from('users').select('id').eq('email', email).single();
    if (userRow) {
      localStorage.setItem('user_id', String(userRow.id));
    }

    navigate('/dashboard');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-hero-gradient bg-clip-text text-transparent">UDAAN</h1>
        <p className="text-xl text-muted-foreground mt-2">Talent & Fitness Tracking Platform</p>
      </div>

      <Card className="w-full max-w-md shadow-patriotic border-2 border-primary/20">
        <CardHeader className="text-center">
          <img src={udaanLogo} alt="UDAAN" className="w-16 h-16 mx-auto mb-4" />
          <CardTitle className="text-2xl text-primary">
            {step === 'welcome' && 'Welcome to UDAAN'}
            {step === 'register' && 'Create Account'}
            {step === 'login' && 'Login'}
            {step === 'otp' && 'Verify OTP'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          {step === 'welcome' && (
            <div className="space-y-4">
              <Button className="w-full bg-hero-gradient hover:opacity-90 text-white font-semibold py-3" onClick={() => setStep('register')}>
                Register
              </Button>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 py-3" onClick={() => setStep('login')}>
                Login
              </Button>
            </div>
          )}

          {step === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" required minLength={6} />
              </div>
              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" disabled={loading}>
                {loading ? 'Creating account...' : 'Continue'}
              </Button>
            </form>
          )}

          {step === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loginEmail">Email</Label>
                <Input id="loginEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loginPassword">Password</Label>
                <Input id="loginPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" required />
              </div>
              <Button type="submit" className="w-full bg-hero-gradient hover:opacity-90 text-white" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <p className="text-muted-foreground text-center">
                Enter the 6-digit code sent to your mobile number
              </p>
              <div className="flex justify-center gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Input
                    key={index}
                    className="w-12 h-12 text-center text-lg font-bold border-2 border-accent/30 focus:border-accent"
                    maxLength={1}
                    placeholder="0"
                    value={otp[index] ?? ''}
                    onChange={(e) => {
                      const nextDigit = e.target.value.replace(/\D/g, '').slice(-1);
                      const digits = otp.padEnd(6, '').split('');
                      digits[index] = nextDigit;
                      setOtp(digits.join('').slice(0, 6));
                    }}
                  />
                ))}
              </div>
              <Button type="submit" className="w-full bg-success-gradient hover:opacity-90 text-white" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}