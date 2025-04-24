
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Info } from 'lucide-react';
import { Medication } from '@/utils/mockData';
import { formatDistanceToNow } from 'date-fns';

interface MedicationCardProps {
  medication: Medication;
}

export default function MedicationCard({ medication }: MedicationCardProps) {
  const formattedNextDose = formatDistanceToNow(new Date(medication.nextDose), { addSuffix: true });
  const isOverdue = new Date(medication.nextDose) < new Date();
  
  return (
    <Card className={`overflow-hidden ${isOverdue ? 'border-red-400' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{medication.name}</CardTitle>
        <CardDescription>{medication.dosage} - {medication.schedule}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Clock className={`h-4 w-4 ${isOverdue ? 'text-red-500' : 'text-muted-foreground'}`} />
          <span className={`text-sm ${isOverdue ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
            {isOverdue ? 'Overdue' : formattedNextDose}
          </span>
        </div>
        <div className="text-sm">{medication.instructions}</div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" className="w-1/2" asChild>
          <a href={`/medications/${medication.id}`}>
            <Info className="h-4 w-4 mr-1" />
            Details
          </a>
        </Button>
        <Button size="sm" className="w-1/2" asChild>
          <a href="/camera">Take Now</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
