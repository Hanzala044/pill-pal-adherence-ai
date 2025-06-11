
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shared';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, Brain, AlertTriangle, Target, Activity } from 'lucide-react';

const PredictiveAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock predictive data - in a real app, this would come from ML models
  const adherencePrediction = [
    { date: '2024-01-01', actual: 85, predicted: 83, confidence: 92 },
    { date: '2024-01-02', actual: 90, predicted: 87, confidence: 88 },
    { date: '2024-01-03', actual: 82, predicted: 85, confidence: 90 },
    { date: '2024-01-04', actual: 88, predicted: 86, confidence: 85 },
    { date: '2024-01-05', actual: null, predicted: 84, confidence: 78 },
    { date: '2024-01-06', actual: null, predicted: 82, confidence: 75 },
    { date: '2024-01-07', actual: null, predicted: 80, confidence: 72 },
  ];

  const riskFactors = [
    { factor: 'Schedule Consistency', score: 78, trend: 'improving' },
    { factor: 'Medication Timing', score: 65, trend: 'stable' },
    { factor: 'Side Effects', score: 92, trend: 'improving' },
    { factor: 'Social Support', score: 45, trend: 'declining' },
    { factor: 'Health Literacy', score: 88, trend: 'stable' },
  ];

  const interventionRecommendations = [
    {
      type: 'High Priority',
      title: 'Improve Social Support Network',
      description: 'Low social support detected. Consider involving family members or caregivers.',
      expectedImpact: '+15% adherence',
      confidence: 85
    },
    {
      type: 'Medium Priority',
      title: 'Optimize Timing Strategy',
      description: 'Medication timing could be improved based on your daily patterns.',
      expectedImpact: '+8% adherence',
      confidence: 72
    },
    {
      type: 'Low Priority',
      title: 'Educational Resources',
      description: 'Additional medication education could enhance understanding.',
      expectedImpact: '+3% adherence',
      confidence: 60
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Predictive Analytics</h1>
        <p className="text-muted-foreground mt-1">AI-powered predictions and intervention recommendations</p>
      </div>

      {/* Adherence Prediction Chart */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Adherence Prediction Model
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adherencePrediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  name="Actual Adherence"
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicted Adherence"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-700">AI Prediction Summary</span>
            </div>
            <p className="text-sm text-blue-600">
              Based on current patterns, your adherence is predicted to decrease by 5% over the next week. 
              Consider implementing the high-priority interventions below.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factor Analysis */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Risk Factor Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{factor.factor}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        factor.score >= 80 ? 'bg-green-500' : 
                        factor.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="font-bold">{factor.score}%</div>
                  <div className={`text-xs ${
                    factor.trend === 'improving' ? 'text-green-600' :
                    factor.trend === 'declining' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {factor.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Intervention Recommendations */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            AI-Recommended Interventions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interventionRecommendations.map((rec, index) => (
              <div key={index} className="border border-purple-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.type === 'High Priority' ? 'bg-red-100 text-red-700' :
                    rec.type === 'Medium Priority' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {rec.type}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{rec.expectedImpact}</div>
                    <div className="text-xs text-muted-foreground">{rec.confidence}% confidence</div>
                  </div>
                </div>
                <h4 className="font-medium mb-1">{rec.title}</h4>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;
