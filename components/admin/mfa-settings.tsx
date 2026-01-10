'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import QRCode from 'qrcode';
import Image from 'next/image';
import { fetchWithCsrf } from '@/lib/fetchWithCsrf';

interface MFASettingsProps {
  initialEnabled: boolean;
}

export function MFASettings({ initialEnabled }: MFASettingsProps) {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');

  const startSetup = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWithCsrf('/api/admin/auth/mfa/generate', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to generate MFA secret');
      
      const data = await res.json();
      setSecret(data.secret);
      
      const qrUrl = await QRCode.toDataURL(data.otpauth);
      setQrCodeUrl(qrUrl);
      setIsSetupOpen(true);
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start MFA setup",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAndEnable = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWithCsrf('/api/admin/auth/mfa/enable', {
        method: 'POST',
        body: JSON.stringify({ token, secret }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to verify token');
      }

      setIsEnabled(true);
      setIsSetupOpen(false);
      setToken('');
      setSecret('');
      setQrCodeUrl('');
      
      toast({
        title: "MFA Enabled",
        description: "Two-factor authentication has been successfully enabled.",
      });
      router.refresh();
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Invalid code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disableMFA = async () => {
    if (!confirm("Are you sure you want to disable MFA? This will lower your account security.")) return;

    setIsLoading(true);
    try {
      const res = await fetchWithCsrf('/api/admin/auth/mfa/disable', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to disable MFA');

      setIsEnabled(false);
      toast({
        title: "MFA Disabled",
        description: "Two-factor authentication has been disabled.",
      });
      router.refresh();
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to disable MFA",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-Factor Authentication (MFA)</CardTitle>
        <CardDescription>
          Add an extra layer of security to your account by requiring a code from your authenticator app.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-medium">Status</span>
              {isEnabled ? (
                <span className="flex items-center text-sm text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Enabled
                </span>
              ) : (
                <span className="flex items-center text-sm text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                  <XCircle className="mr-1 h-3 w-3" />
                  Disabled
                </span>
              )}
            </div>
          </div>
          {!isEnabled && !isSetupOpen && (
            <Button onClick={startSetup} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Setup MFA
            </Button>
          )}
          {isEnabled && (
            <Button variant="destructive" onClick={disableMFA} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Disable MFA
            </Button>
          )}
        </div>

        {isSetupOpen && (
          <div className="space-y-4 rounded-lg border p-4 bg-muted/50">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium">1. Scan QR Code</h3>
                <p className="text-sm text-muted-foreground">
                  Open your authenticator app (like Google Authenticator or Authy) and scan this QR code.
                </p>
                <div className="flex justify-center p-4 bg-white rounded-lg w-fit">
                  {qrCodeUrl && (
                    <Image
                      src={qrCodeUrl}
                      alt="MFA QR Code"
                      width={192}
                      height={192}
                      className="h-48 w-48"
                    />
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">2. Enter Verification Code</h3>
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code generated by your authenticator app to verify setup.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="token">Verification Code</Label>
                  <Input
                    id="token"
                    placeholder="000000"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={verifyAndEnable} disabled={isLoading || token.length !== 6}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify & Enable
                  </Button>
                  <Button variant="ghost" onClick={() => setIsSetupOpen(false)} disabled={isLoading}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
