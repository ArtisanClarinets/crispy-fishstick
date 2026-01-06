'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showMFA, setShowMFA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [_error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        code: showMFA ? code : undefined,
        redirect: false,
      });

      if (result?.error) {
        console.error("Authentication error:", result.error, result);
        if (result.error === "MFA_REQUIRED") {
          setShowMFA(true);
          toast({
            title: "MFA Required",
            description: "Please enter your 2FA code.",
          });
        } else if (result.error === "INVALID_MFA_CODE") {
          setShowMFA(true); // Ensure input is shown
          toast({
            variant: "destructive",
            title: "Invalid Code",
            description: "The 2FA code provided is invalid.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: "Invalid email or password. Please try again.",
          });
        }
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>
            {showMFA ? "Enter your 2FA code" : "Enter your credentials to access the secure area"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!showMFA ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@vantus.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="code">Two-Factor Code</Label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="123456"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                  maxLength={6}
                  pattern="\d{6}"
                />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : (showMFA ? "Verify Code" : "Sign In")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
