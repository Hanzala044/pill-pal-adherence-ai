
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button } from '@/components/ui/shared';
import { Clock, Info, CheckCircle, MoreVertical, Edit, Trash2, Power } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/shared';
import { useToast } from '@/components/ui/use-toast';
import { deleteMedication, setMedicationStatus } from '@/services/medicationService';

interface MedicationCardProps {
  medication: any;
  className?: string;
  onUpdate?: () => void;
}

export default function MedicationCard({ medication, className, onUpdate }: MedicationCardProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const isOverdue = new Date(medication.next_dose) < new Date();
  const formattedNextDose = formatDistanceToNow(new Date(medication.next_dose), { addSuffix: true });
  
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${medication.name}?`)) {
      return;
    }
    
    setLoading(true);
    try {
      await deleteMedication(medication.id);
      toast({
        title: "Medication deleted",
        description: `${medication.name} has been deleted.`,
      });
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error deleting medication:', error);
      toast({
        title: "Error",
        description: "Failed to delete medication.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const toggleActive = async () => {
    setLoading(true);
    try {
      await setMedicationStatus(medication.id, !medication.is_active);
      toast({
        title: medication.is_active ? "Medication deactivated" : "Medication activated",
        description: `${medication.name} is now ${medication.is_active ? 'inactive' : 'active'}.`,
      });
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating medication status:', error);
      toast({
        title: "Error",
        description: "Failed to update medication status.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className={`overflow-hidden relative ${isOverdue ? 'border-red-400' : ''} ${!medication.is_active ? 'opacity-60' : ''} ${className || ''}`}>
      {!medication.is_active && (
        <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-0.5 rounded">
          Inactive
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{medication.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" disabled={loading}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={toggleActive} disabled={loading}>
                <Power className="mr-2 h-4 w-4" />
                {medication.is_active ? 'Deactivate' : 'Activate'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleDelete} disabled={loading}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>{medication.dosage} - {medication.time_of_day}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Clock className={`h-4 w-4 ${isOverdue ? 'text-red-500' : 'text-muted-foreground'}`} />
          <span className={`text-sm ${isOverdue ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
            {isOverdue ? 'Overdue' : formattedNextDose}
          </span>
        </div>
        <div className="text-sm">{medication.instructions || "No special instructions"}</div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" className="w-1/2">
          <Info className="h-4 w-4 mr-1" />
          Details
        </Button>
        <Button size="sm" className="w-1/2" asChild>
          <a href="/camera">Take Now</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
