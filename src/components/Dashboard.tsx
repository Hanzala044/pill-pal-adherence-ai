
import React from 'react';
import { Clock, CheckCircle, Calendar, Activity, AlertTriangle, Brain, TrendingUp, Shield, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button, Progress } from '@/components/ui/shared';
import MedicationCard from './MedicationCard';
import { mockMedications, mockAdherenceHistory } from '@/utils/mockData';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';

export default function Dashboard() {
  const isMobile = useIsMobile();
  const { metrics, loading } = useAdvancedAnalytics();

  const upcomingMeds = mockMedications
    .filter(med => new Date(med.nextDose) > new Date())
    .sort((a, b) => new Date(a.nextDose).getTime() - new Date(b.nextDose).getTime())
    .slice(0, 3);

  const adherenceRate = Math.round((mockAdherenceHistory.filter(record => record.status === 'taken').length / 
    mockAdherenceHistory.length) * 100);

  // Calculate today's doses
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = mockAdherenceHistory.filter(
    record => record.timestamp.startsWith(today)
  );
  const takenToday = todayRecords.filter(record => record.status === 'taken').length;
  const totalToday = mockMedications.length; // simplified assumption

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold gradient-text`}>Welcome back, John</h1>
          <p className="text-muted-foreground mt-1">AI-powered health insights for today</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100">
          <Brain className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">AI Active</span>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="text-sm font-medium">{takenToday}/{totalToday}</span>
              </div>
              <Progress value={(takenToday/totalToday) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              Adherence Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-blue-600">{adherenceRate}%</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              AI Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-purple-600">{metrics?.riskScore || 15}</div>
            <p className="text-xs text-muted-foreground">Low risk</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Brain className="h-5 w-5 text-orange-600" />
              Predicted Adherence
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-orange-600">{metrics?.predictedAdherence || 88}%</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Card */}
      {metrics?.insights && (
        <Card className="gradient-card border border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Health Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {metrics.insights.slice(0, 2).map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <Activity className="h-4 w-4 text-purple-600 mt-0.5" />
                  <p className="text-sm">{insight}</p>
                </div>
              ))}
            </div>
            <CardFooter className="px-0 pt-4">
              <Button variant="outline" className="w-full" size="sm" asChild>
                <a href="/analytics">View Full Analytics</a>
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-4 text-center">
            <Camera className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-medium mb-1">Take Medication</h3>
            <p className="text-xs text-muted-foreground mb-3">AI-powered verification</p>
            <Button variant="pill" size="sm" className="w-full" asChild>
              <a href="/camera">Start Camera</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium mb-1">Predictive Analytics</h3>
            <p className="text-xs text-muted-foreground mb-3">ML-powered insights</p>
            <Button variant="pill" size="sm" className="w-full" asChild>
              <a href="/predictive">View Predictions</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium mb-1">Security Center</h3>
            <p className="text-xs text-muted-foreground mb-3">HIPAA compliant</p>
            <Button variant="pill" size="sm" className="w-full" asChild>
              <a href="/security">Security Settings</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Medications */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold`}>Upcoming Medications</h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/medications">View All</a>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingMeds.map((medication) => (
            <MedicationCard key={medication.id} medication={medication} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold`}>Recent Activity</h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/history">View All</a>
          </Button>
        </div>
        <Card className="gradient-card">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {mockAdherenceHistory.slice(0, 5).map((record) => (
                <div key={record.id} className="flex items-center p-3 sm:p-4">
                  <div className="mr-3 sm:mr-4">
                    {record.status === 'taken' ? (
                      <div className="bg-green-100 text-green-700 p-2 rounded-full">
                        <CheckCircle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                      </div>
                    ) : record.status === 'missed' ? (
                      <div className="bg-red-100 text-red-700 p-2 rounded-full">
                        <AlertTriangle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                      </div>
                    ) : (
                      <div className="bg-yellow-100 text-yellow-700 p-2 rounded-full">
                        <Clock className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${isMobile ? 'text-sm' : 'text-base'}`}>
                      {record.medicationName}
                    </p>
                    <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {record.status === 'taken' 
                        ? 'Taken' 
                        : record.status === 'missed' 
                          ? 'Missed' 
                          : 'Skipped'}
                    </p>
                  </div>
                  <div className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {new Date(record.timestamp).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
