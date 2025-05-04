
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Info, Check, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: string;
  image: string;
  instructions?: string;
  nextDose: string;
  lastTaken?: string;
}

interface MedicationCardProps {
  medication: Medication;
  className?: string;
}

export default function MedicationCard({ medication, className }: MedicationCardProps) {
  const formattedNextDose = formatDistanceToNow(new Date(medication.nextDose), { addSuffix: true });
  const isOverdue = new Date(medication.nextDose) < new Date();
  
  return (
    <Card className={`overflow-hidden group ${isOverdue ? 'border-red-400' : 'border-purple-200'} ${className || ''} transition-all duration-300 hover:shadow-md hover:-translate-y-1`}>
      <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardTitle className="text-lg text-purple-700">{medication.name}</CardTitle>
        <CardDescription className="text-purple-500">{medication.dosage} - {medication.schedule}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 pt-4">
        <div className="flex items-center gap-2 mb-2">
          {isOverdue ? (
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm text-red-500 font-medium">Overdue</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-purple-400 mr-1" />
              <span className="text-sm text-purple-600">{formattedNextDose}</span>
            </div>
          )}
        </div>
        {medication.instructions && (
          <div className="text-sm text-gray-600 mt-2 line-clamp-2">{medication.instructions}</div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t border-purple-100 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
        <Button variant="outline" size="sm" className="w-1/2 border-purple-200 text-purple-700 hover:bg-purple-50" asChild>
          <a href={`/medications/${medication.id}`}>
            <Info className="h-4 w-4 mr-1" />
            Details
          </a>
        </Button>
        <Button 
          size="sm" 
          className="w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 group-hover:scale-105 transition-transform duration-300" 
          asChild
        >
          <a href="/camera">
            <Check className="h-4 w-4 mr-1" />
            Take Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
