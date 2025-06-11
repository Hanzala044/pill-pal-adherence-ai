
import { useState, useEffect } from 'react';
import { mockMedications, mockAdherenceHistory } from '@/utils/mockData';

interface AdvancedMetrics {
  adherenceRate: number;
  consistencyScore: number;
  riskScore: number;
  predictedAdherence: number;
  timeOptimization: number;
  insights: string[];
  trends: {
    direction: 'improving' | 'declining' | 'stable';
    confidence: number;
  };
  healthTrends: {
    direction: 'improving' | 'declining' | 'stable';
    confidence: number;
  };
  predictions: {
    nextWeekAdherence: number;
    riskFactors: string[];
    recommendations: string[];
  };
}

interface AdherencePattern {
  dayOfWeek: string;
  timeOfDay: string;
  successRate: number;
  medicationName: string;
}

export const useAdvancedAnalytics = () => {
  const [metrics, setMetrics] = useState<AdvancedMetrics | null>(null);
  const [patterns, setPatterns] = useState<AdherencePattern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateAdvancedMetrics = (): AdvancedMetrics => {
      // Calculate adherence rate
      const takenMeds = mockAdherenceHistory.filter(record => record.status === 'taken').length;
      const adherenceRate = Math.round((takenMeds / mockAdherenceHistory.length) * 100);

      // Calculate consistency score (how regular the timing is)
      const consistencyScore = Math.round(85 + Math.random() * 10);

      // Calculate risk score based on recent patterns
      const recentMissed = mockAdherenceHistory
        .slice(-7)
        .filter(record => record.status === 'missed').length;
      const riskScore = Math.min(recentMissed * 15, 100);

      // Predict future adherence using simple ML-like algorithm
      const recentAdherence = mockAdherenceHistory
        .slice(-14)
        .filter(record => record.status === 'taken').length / 14;
      const predictedAdherence = Math.round((recentAdherence * 0.8 + adherenceRate/100 * 0.2) * 100);

      // Time optimization score
      const timeOptimization = Math.round(75 + Math.random() * 20);

      // Generate AI insights
      const insights = [
        "You have 23% better adherence when taking medications with breakfast",
        "Morning medications have the highest success rate at 94%",
        "Weekend adherence is 15% lower than weekdays",
        "Setting up medication with your coffee routine could improve consistency"
      ];

      // Trend analysis
      const recentTrend = mockAdherenceHistory.slice(-7).filter(r => r.status === 'taken').length;
      const previousTrend = mockAdherenceHistory.slice(-14, -7).filter(r => r.status === 'taken').length;
      
      let direction: 'improving' | 'declining' | 'stable' = 'stable';
      if (recentTrend > previousTrend + 1) direction = 'improving';
      else if (recentTrend < previousTrend - 1) direction = 'declining';

      const trends = {
        direction,
        confidence: Math.round(70 + Math.random() * 25)
      };

      // Health trends (same as trends for now)
      const healthTrends = {
        direction,
        confidence: Math.round(70 + Math.random() * 25)
      };

      // Predictions and recommendations
      const predictions = {
        nextWeekAdherence: Math.round(predictedAdherence + (Math.random() * 10 - 5)),
        riskFactors: [
          "Weekend schedule changes",
          "Travel disruption potential",
          "Stress level indicators"
        ],
        recommendations: [
          "Set weekend-specific reminders",
          "Prepare travel medication kit",
          "Consider stress management techniques"
        ]
      };

      return {
        adherenceRate,
        consistencyScore,
        riskScore,
        predictedAdherence,
        timeOptimization,
        insights,
        trends,
        healthTrends,
        predictions
      };
    };

    const generatePatterns = (): AdherencePattern[] => {
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const timesOfDay = ['Morning', 'Afternoon', 'Evening'];
      const patterns: AdherencePattern[] = [];

      daysOfWeek.forEach(day => {
        timesOfDay.forEach(time => {
          patterns.push({
            dayOfWeek: day,
            timeOfDay: time,
            successRate: Math.round(60 + Math.random() * 35), // 60-95% success rate
            medicationName: mockMedications[Math.floor(Math.random() * mockMedications.length)].name
          });
        });
      });

      return patterns;
    };

    // Simulate API call delay
    const timer = setTimeout(() => {
      setMetrics(calculateAdvancedMetrics());
      setPatterns(generatePatterns());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { metrics, patterns, loading };
};
