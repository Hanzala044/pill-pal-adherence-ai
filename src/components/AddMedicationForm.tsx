
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Button, Input, Label, Textarea, Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue } from '@/components/ui/shared';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { createMedication, MedicationInput } from '@/services/medicationService';

interface AddMedicationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AddMedicationForm({ onSuccess, onCancel }: AddMedicationFormProps) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [instructions, setInstructions] = useState('');
  const [nextDoseDate, setNextDoseDate] = useState('');
  const [nextDoseTime, setNextDoseTime] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!name || !dosage || !frequency || !timeOfDay || !nextDoseDate || !nextDoseTime) {
        throw new Error('Please fill in all required fields');
      }

      const nextDoseDateTime = new Date(`${nextDoseDate}T${nextDoseTime}`);
      
      if (isNaN(nextDoseDateTime.getTime())) {
        throw new Error('Invalid date or time format');
      }

      const newMedication: MedicationInput = {
        name,
        dosage,
        frequency,
        time_of_day: timeOfDay,
        instructions: instructions || undefined,
        next_dose: nextDoseDateTime.toISOString(),
      };

      await createMedication(newMedication);
      
      toast({
        title: "Success!",
        description: "Medication has been added.",
      });
      
      // Reset form
      setName('');
      setDosage('');
      setFrequency('');
      setTimeOfDay('');
      setInstructions('');
      setNextDoseDate('');
      setNextDoseTime('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error adding medication:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add medication.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Medication</CardTitle>
        <CardDescription>Enter the details of your medication</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name*</Label>
              <Input 
                id="name" 
                placeholder="e.g., Lisinopril" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage*</Label>
              <Input 
                id="dosage" 
                placeholder="e.g., 10mg" 
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency*</Label>
              <Select value={frequency} onValueChange={setFrequency} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once_daily">Once Daily</SelectItem>
                  <SelectItem value="twice_daily">Twice Daily</SelectItem>
                  <SelectItem value="three_daily">Three Times Daily</SelectItem>
                  <SelectItem value="once_weekly">Once Weekly</SelectItem>
                  <SelectItem value="as_needed">As Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time of Day*</Label>
              <Select value={timeOfDay} onValueChange={setTimeOfDay} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="noon">Noon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="bedtime">Bedtime</SelectItem>
                  <SelectItem value="custom">Custom Times</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nextDoseDate">Next Dose Date*</Label>
              <Input 
                id="nextDoseDate" 
                type="date" 
                value={nextDoseDate}
                onChange={(e) => setNextDoseDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nextDoseTime">Next Dose Time*</Label>
              <Input 
                id="nextDoseTime" 
                type="time" 
                value={nextDoseTime}
                onChange={(e) => setNextDoseTime(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea 
              id="instructions" 
              placeholder="e.g., Take with food" 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Medication'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
