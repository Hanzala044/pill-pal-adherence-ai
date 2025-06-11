
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HealthMetrics {
  adherenceRate: number;
  riskScore: number;
  predictedAdherence: number;
  healthTrends: {
    direction: 'improving' | 'declining' | 'stable';
    confidence: number;
  };
  insights: string[];
}

interface AdherencePattern {
  timeOfDay: string;
  dayOfWeek: string;
  successRate: number;
  factors: string[];
}

export const useAdvancedAnalytics = () => {
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [patterns, setPatterns] = useState<AdherencePattern[]>([]);
  const [loading, setLoading] = useState(true);

  const calculateRiskScore = (adherenceHistory: any[]) => {
    if (!adherenceHistory.length) return 0;

    const recentHistory = adherenceHistory.slice(-30); // Last 30 records
    const missedDoses = recentHistory.filter(record => record.status === 'missed').length;
    const totalDoses = recentHistory.length;
    
    const missedRate = missedDoses / totalDoses;
    const riskScore = Math.min(100, missedRate * 100 + 
      (adherenceHistory.filter(r => r.status === 'missed').length > 5 ? 20 : 0));
    
    return Math.round(riskScore);
  };

  const predictAdherence = (history: any[]) => {
    if (!history.length) return 85; // Default prediction

    const last7Days = history.slice(-7);
    const adherenceRate = last7Days.filter(r => r.status === 'taken').length / last7Days.length;
    
    // Simple ML-like prediction based on recent trends
    const trendFactor = adherenceRate > 0.8 ? 1.1 : adherenceRate < 0.6 ? 0.9 : 1.0;
    return Math.min(100, Math.round(adherenceRate * 100 * trendFactor));
  };

  const analyzePatterns = (history: any[]) => {
    const patternMap = new Map();
    
    history.forEach(record => {
      const date = new Date(record.timestamp);
      const timeOfDay = date.getHours() < 12 ? 'morning' : date.getHours() < 18 ? 'afternoon' : 'evening';
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      const key = `${timeOfDay}-${dayOfWeek}`;
      if (!patternMap.has(key)) {
        patternMap.set(key, { taken: 0, total: 0, timeOfDay, dayOfWeek });
      }
      
      const pattern = patternMap.get(key);
      pattern.total++;
      if (record.status === 'taken') pattern.taken++;
    });

    return Array.from(patternMap.values()).map(pattern => ({
      timeOfDay: pattern.timeOfDay,
      dayOfWeek: pattern.dayOfWeek,
      successRate: pattern.total > 0 ? (pattern.taken / pattern.total) * 100 : 0,
      factors: []
    }));
  };

  const generateInsights = (adherenceRate: number, riskScore: number, patterns: AdherencePattern[]) => {
    const insights = [];
    
    if (adherenceRate < 70) {
      insights.push("Your adherence is below optimal levels. Consider setting more frequent reminders.");
    }
    
    if (riskScore > 30) {
      insights.push("High risk detected. Please consult with your healthcare provider.");
    }
    
    const bestPattern = patterns.reduce((best, current) => 
      current.successRate > (best?.successRate || 0) ? current : best, null as AdherencePattern | null);
    
    if (bestPattern) {
      insights.push(`You have the highest success rate on ${bestPattern.dayOfWeek} ${bestPattern.timeOfDay}s.`);
    }
    
    return insights;
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data: adherenceHistory } = await supabase
          .from('adherence_history')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(100);

        if (adherenceHistory) {
          const adherenceRate = adherenceHistory.length > 0 
            ? (adherenceHistory.filter(r => r.status === 'taken').length / adherenceHistory.length) * 100 
            : 0;
          
          const riskScore = calculateRiskScore(adherenceHistory);
          const predictedAdherence = predictAdherence(adherenceHistory);
          const adherencePatterns = analyzePatterns(adherenceHistory);
          
          const healthTrends = {
            direction: adherenceRate > 80 ? 'improving' : adherenceRate < 60 ? 'declining' : 'stable' as const,
            confidence: Math.round(Math.min(100, adherenceHistory.length * 2))
          };

          const insights = generateInsights(adherenceRate, riskScore, adherencePatterns);

          setMetrics({
            adherenceRate: Math.round(adherenceRate),
            riskScore,
            predictedAdherence,
            healthTrends,
            insights
          });
          
          setPatterns(adherencePatterns);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { metrics, patterns, loading };
};
