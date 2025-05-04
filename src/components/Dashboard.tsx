
import React, { useState } from 'react';
import { Clock, CheckCircle, Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button, Progress } from '@/components/ui/shared';
import MedicationCard from './MedicationCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';
import { getMedications } from '@/services/medicationService';
import { getAdherenceHistory } from '@/services/adherenceService';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState(7); // days

  // Get medications data
  const { data: medications = [] } = useQuery({
    queryKey: ['medications'],
    queryFn: getMedications,
  });

  // Get adherence history
  const { data: adherenceHistory = [] } = useQuery({
    queryKey: ['adherenceHistory', timeframe],
    queryFn: () => getAdherenceHistory(timeframe),
  });

  const upcomingMeds = medications
    .filter((med: any) => new Date(med.next_dose) > new Date() && med.is_active)
    .sort((a: any, b: any) => new Date(a.next_dose).getTime() - new Date(b.next_dose).getTime())
    .slice(0, 3);

  // Calculate adherence rate
  const adherenceRate = adherenceHistory.length > 0 
    ? Math.round((adherenceHistory.filter((record: any) => record.status === 'taken').length / adherenceHistory.length) * 100)
    : 0;

  // Calculate today's doses
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = adherenceHistory.filter(
    (record: any) => record.timestamp.startsWith(today)
  );
  const takenToday = todayRecords.filter((record: any) => record.status === 'taken').length;
  const totalToday = medications.filter((med: any) => med.is_active).length; // simplified assumption

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent`}>
          Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}
        </h1>
        <p className="text-muted-foreground mt-1">Here's your medication overview for today</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <Progress value={(totalToday > 0 ? takenToday/totalToday : 0) * 100} className="h-2" />
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
            <p className="text-xs text-muted-foreground">Last {timeframe} days</p>
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
                  {new Date(upcomingMeds[0].next_dose).toLocaleTimeString([], {
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
              <Link to="/camera">Take Now</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Upcoming Medications */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold`}>Upcoming Medications</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/medications">View All</Link>
          </Button>
        </div>
        {medications.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No medications added yet</p>
              <Button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500" asChild>
                <Link to="/medications">Add Medication</Link>
              </Button>
            </CardContent>
          </Card>
        ) : upcomingMeds.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No upcoming medications</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMeds.map((medication: any) => (
              <MedicationCard key={medication.id} medication={medication} />
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold`}>Recent Activity</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/history">View All</Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {adherenceHistory.length > 0 ? (
                adherenceHistory.slice(0, 5).map((record: any) => (
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
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No activity recorded yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
