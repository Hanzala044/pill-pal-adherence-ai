
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shared';
import { Button } from '@/components/ui/shared';
import { Switch } from '@/components/ui/switch';
import { Shield, Lock, Eye, Fingerprint, Key, AlertTriangle, CheckCircle } from 'lucide-react';

const SecurityCenter = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    biometricAuth: false,
    dataEncryption: true,
    auditLogging: true,
    hipaaCompliance: true,
    dataSharing: false,
  });

  const [auditLogs] = useState([
    { id: 1, action: 'User Login', timestamp: '2024-01-01 10:30:00', status: 'Success', ip: '192.168.1.1' },
    { id: 2, action: 'Medication Added', timestamp: '2024-01-01 10:32:15', status: 'Success', ip: '192.168.1.1' },
    { id: 3, action: 'Data Export', timestamp: '2024-01-01 11:45:22', status: 'Success', ip: '192.168.1.1' },
    { id: 4, action: 'Failed Login Attempt', timestamp: '2024-01-01 14:22:10', status: 'Failed', ip: '10.0.0.1' },
  ]);

  const securityScore = 85;

  const updateSetting = (key: string, value: boolean) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Security Center</h1>
          <p className="text-muted-foreground mt-1">Enterprise-grade security and privacy controls</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
          <Shield className="h-5 w-5 text-green-600" />
          <div>
            <div className="font-bold text-green-700">Security Score: {securityScore}%</div>
            <div className="text-xs text-green-600">Excellent</div>
          </div>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="gradient-card border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lock className="h-4 w-4 text-green-600" />
              Data Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">AES-256</div>
            <div className="text-xs text-muted-foreground">End-to-end encryption</div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              Privacy Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">HIPAA</div>
            <div className="text-xs text-muted-foreground">Compliant</div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Fingerprint className="h-4 w-4 text-purple-600" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">MFA</div>
            <div className="text-xs text-muted-foreground">Multi-factor enabled</div>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-blue-600" />
            Security Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">Additional security layer for account access</div>
            </div>
            <Switch
              checked={securitySettings.twoFactorAuth}
              onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Biometric Authentication</div>
              <div className="text-sm text-muted-foreground">Use fingerprint or face recognition</div>
            </div>
            <Switch
              checked={securitySettings.biometricAuth}
              onCheckedChange={(checked) => updateSetting('biometricAuth', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">End-to-End Encryption</div>
              <div className="text-sm text-muted-foreground">Encrypt all health data at rest and in transit</div>
            </div>
            <Switch
              checked={securitySettings.dataEncryption}
              onCheckedChange={(checked) => updateSetting('dataEncryption', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Audit Logging</div>
              <div className="text-sm text-muted-foreground">Track all access and modifications</div>
            </div>
            <Switch
              checked={securitySettings.auditLogging}
              onCheckedChange={(checked) => updateSetting('auditLogging', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">HIPAA Compliance Mode</div>
              <div className="text-sm text-muted-foreground">Enhanced privacy controls for healthcare data</div>
            </div>
            <Switch
              checked={securitySettings.hipaaCompliance}
              onCheckedChange={(checked) => updateSetting('hipaaCompliance', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Data Sharing</div>
              <div className="text-sm text-muted-foreground">Allow anonymized data for research</div>
            </div>
            <Switch
              checked={securitySettings.dataSharing}
              onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-gray-600" />
            Security Audit Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {log.status === 'Success' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                  <div>
                    <div className="font-medium text-sm">{log.action}</div>
                    <div className="text-xs text-muted-foreground">{log.timestamp}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${log.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>
                    {log.status}
                  </div>
                  <div className="text-xs text-muted-foreground">{log.ip}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityCenter;
