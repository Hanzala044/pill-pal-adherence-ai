
import React from 'react';
import { Clock, CheckCircle, Calendar, Activity, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import MedicationCard from './MedicationCard';
import { Medication, mockMedications, mockAdherenceHistory } from '@/utils/mockData';

export default function Dashboard() {
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
      <div>
        <h1 className="text-3xl font-bold">Welcome back, John</h1>
        <p className="text-muted-foreground mt-1">Here's your medication overview for today</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Adherence Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-primary">{adherenceRate}%</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Next Medication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcomingMeds[0] ? (
              <>
                <p className="font-medium">{upcomingMeds[0].name} {upcomingMeds[0].dosage}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(upcomingMeds[0].nextDose).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming medications</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm" asChild>
              <a href="/camera">Take Now</a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Upcoming Medications */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Medications</h2>
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
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/history">View All</a>
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {mockAdherenceHistory.slice(0, 5).map((record) => (
                <div key={record.id} className="flex items-center p-4">
                  <div className="mr-4">
                    {record.status === 'taken' ? (
                      <div className="bg-green-100 text-green-700 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    ) : record.status === 'missed' ? (
                      <div className="bg-red-100 text-red-700 p-2 rounded-full">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                    ) : (
                      <div className="bg-yellow-100 text-yellow-700 p-2 rounded-full">
                        <Clock className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{record.medicationName}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.status === 'taken' 
                        ? 'Taken' 
                        : record.status === 'missed' 
                          ? 'Missed' 
                          : 'Skipped'}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
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
