
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { mockAdherenceHistory } from '@/utils/mockData';

export default function AdherenceHistory() {
  const [period, setPeriod] = useState('week');
  
  // Filter based on selected period
  const filterRecords = () => {
    const now = new Date();
    let cutoffDate = new Date();
    
    switch (period) {
      case 'day':
        cutoffDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      default:
        cutoffDate.setFullYear(now.getFullYear() - 100); // Show all records
    }
    
    return mockAdherenceHistory.filter(record => 
      new Date(record.timestamp) >= cutoffDate
    );
  };
  
  const filteredRecords = filterRecords();
  
  // Calculate adherence rate
  const takenCount = filteredRecords.filter(record => record.status === 'taken').length;
  const missedCount = filteredRecords.filter(record => record.status === 'missed').length;
  const skippedCount = filteredRecords.filter(record => record.status === 'skipped').length;
  const adherenceRate = Math.round((takenCount / filteredRecords.length) * 100) || 0;
  
  // Group records by date for 'all' view
  const recordsByDate = filteredRecords.reduce((acc, record) => {
    const date = record.timestamp.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {} as Record<string, typeof mockAdherenceHistory>);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Medication History</h2>
        
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 hours</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <div className="bg-green-100 text-green-700 p-1 rounded">
                <CheckCircle className="h-4 w-4" />
              </div>
              Taken
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{takenCount}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <div className="bg-red-100 text-red-700 p-1 rounded">
                <AlertTriangle className="h-4 w-4" />
              </div>
              Missed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{missedCount}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <div className="bg-yellow-100 text-yellow-700 p-1 rounded">
                <Clock className="h-4 w-4" />
              </div>
              Skipped
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{skippedCount}</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {Object.entries(recordsByDate).map(([date, records]) => (
                  <div key={date}>
                    <div className="bg-muted/50 px-4 py-2 text-sm font-medium">
                      {new Date(date).toLocaleDateString(undefined, { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    {records.map((record) => (
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
                          <div className="flex gap-6">
                            <p className="text-sm text-muted-foreground">
                              {record.status === 'taken' 
                                ? 'Taken' 
                                : record.status === 'missed' 
                                  ? 'Missed' 
                                  : 'Skipped'}
                            </p>
                            <div className="flex gap-2">
                              {record.pillVerified && (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                  Pill Verified
                                </span>
                              )}
                              {record.userVerified && (
                                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                                  User Verified
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(record.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                
                {filteredRecords.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No records found for this period</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card className="p-4">
            <p className="text-center text-muted-foreground">Calendar view coming soon</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
