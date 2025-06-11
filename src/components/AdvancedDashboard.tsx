
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shared';
import { Progress } from '@/components/ui/shared';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Brain, Activity, Target, Shield } from 'lucide-react';

const AdvancedDashboard = () => {
  const { metrics, patterns, loading } = useAdvancedAnalytics();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="h-32 bg-gray-200" />
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  const getRiskColor = (score: number) => {
    if (score < 20) return 'text-green-600 bg-green-100';
    if (score < 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = () => {
    switch (metrics.healthTrends.direction) {
      case 'improving': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'declining': return <TrendingDown className="h-5 w-5 text-red-600" />;
      default: return <Activity className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold gradient-text">Health Intelligence Dashboard</h1>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100">
          <Brain className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">AI-Powered Insights</span>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Adherence Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.adherenceRate}%</div>
            <Progress value={metrics.adherenceRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className={`gradient-card border-l-4 ${metrics.riskScore < 20 ? 'border-l-green-500' : metrics.riskScore < 50 ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getRiskColor(metrics.riskScore).split(' ')[0]}`}>
              {metrics.riskScore}
            </div>
            <div className={`text-xs px-2 py-1 rounded-full mt-2 ${getRiskColor(metrics.riskScore)}`}>
              {metrics.riskScore < 20 ? 'Low Risk' : metrics.riskScore < 50 ? 'Medium Risk' : 'High Risk'}
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              Predicted Adherence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{metrics.predictedAdherence}%</div>
            <div className="text-xs text-muted-foreground mt-1">Next 7 days</div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {getTrendIcon()}
              Health Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold capitalize text-purple-600">
              {metrics.healthTrends.direction}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {metrics.healthTrends.confidence}% confidence
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI-Generated Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                <div className="bg-purple-100 p-1 rounded-full mt-0.5">
                  <Activity className="h-3 w-3 text-purple-600" />
                </div>
                <p className="text-sm text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adherence Patterns */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Adherence Patterns Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patterns.slice(0, 6).map((pattern, index) => (
              <div key={index} className="p-4 bg-white/30 rounded-lg border border-purple-200/50">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">
                    {pattern.dayOfWeek} {pattern.timeOfDay}
                  </div>
                  <div className={`text-sm font-bold ${pattern.successRate > 80 ? 'text-green-600' : pattern.successRate > 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {Math.round(pattern.successRate)}%
                  </div>
                </div>
                <Progress value={pattern.successRate} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedDashboard;
