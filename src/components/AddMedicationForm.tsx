
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Button, Input, Label, Textarea, Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue } from '@/components/ui/shared';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { mockMedications } from '@/utils/mockData';
import { v4 as uuidv4 } from 'uuid';

// Type for props
interface AddMedicationFormProps {
  onSuccess?: () => void;
}

export default function AddMedicationForm({ onSuccess }: AddMedicationFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    timeOfDay: '',
    instructions: '',
    image: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateNextDose = (timeOfDay: string) => {
    const now = new Date();
    let nextDose = new Date();
    
    // Set hours based on time of day
    switch(timeOfDay) {
      case 'morning':
        nextDose.setHours(8, 0, 0);
        break;
      case 'noon':
        nextDose.setHours(12, 0, 0);
        break;
      case 'evening':
        nextDose.setHours(18, 0, 0);
        break;
      case 'bedtime':
        nextDose.setHours(22, 0, 0);
        break;
      default:
        nextDose.setHours(8, 0, 0);
    }

    // If the time is already past for today, set it for tomorrow
    if (nextDose < now) {
      nextDose.setDate(nextDose.getDate() + 1);
    }

    return nextDose.toISOString();
  };

  // Helper function to get random color
  const getRandomColor = () => {
    const colors = ['purple', 'blue', 'green', 'orange', 'red', 'pink', 'teal'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dosage || !formData.frequency || !formData.timeOfDay) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create medication object
      const nextDose = calculateNextDose(formData.timeOfDay);
      const scheduleDisplay = `${formData.frequency} (${formData.timeOfDay})`;
      
      // Try to insert into Supabase first
      try {
        const newMedication = {
          name: formData.name,
          dosage: formData.dosage,
          frequency: formData.frequency,
          time_of_day: formData.timeOfDay,
          instructions: formData.instructions,
          next_dose: nextDose,
          is_active: true,
          color: getRandomColor()
        };

        const { data, error } = await supabase
          .from('medications')
          .insert([newMedication])
          .select();

        if (error) {
          throw error;
        }
        
      } catch (supabaseError) {
        console.error('Supabase error, falling back to mock data:', supabaseError);
        
        // If Supabase fails, add to mock data
        const newMockMedication = {
          id: uuidv4(),
          name: formData.name,
          dosage: formData.dosage,
          schedule: scheduleDisplay,
          instructions: formData.instructions,
          image: '/placeholder.svg',
          nextDose: nextDose,
          is_active: true,
          color: getRandomColor()
        };
        
        // Add to the mock medications array
        mockMedications.push(newMockMedication);
      }

      toast({
        title: "Success",
        description: "Medication added successfully!",
      });

      // Reset form
      setFormData({
        name: '',
        dosage: '',
        frequency: '',
        timeOfDay: '',
        instructions: '',
        image: ''
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.error('Error adding medication:', error);
      toast({
        title: "Error",
        description: "Failed to add medication. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-purple-200 shadow-md transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
        <CardTitle className="text-xl font-bold text-purple-700">Add New Medication</CardTitle>
        <CardDescription>Enter the details of your medication</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-700">Medication Name*</Label>
              <Input 
                id="name" 
                placeholder="e.g., Lisinopril" 
                value={formData.name}
                onChange={handleChange}
                className="border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dosage" className="text-purple-700">Dosage*</Label>
              <Input 
                id="dosage" 
                placeholder="e.g., 10mg" 
                value={formData.dosage}
                onChange={handleChange}
                className="border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency" className="text-purple-700">Frequency*</Label>
              <Select 
                value={formData.frequency} 
                onValueChange={(value) => handleSelectChange('frequency', value)}
              >
                <SelectTrigger className="border-purple-200 focus:ring-2 focus:ring-purple-200">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Once daily">Once Daily</SelectItem>
                  <SelectItem value="Twice daily">Twice Daily</SelectItem>
                  <SelectItem value="Three times daily">Three Times Daily</SelectItem>
                  <SelectItem value="Once weekly">Once Weekly</SelectItem>
                  <SelectItem value="As needed">As Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeOfDay" className="text-purple-700">Time of Day*</Label>
              <Select 
                value={formData.timeOfDay} 
                onValueChange={(value) => handleSelectChange('timeOfDay', value)}
              >
                <SelectTrigger className="border-purple-200 focus:ring-2 focus:ring-purple-200">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="noon">Noon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="bedtime">Bedtime</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-purple-700">Special Instructions</Label>
            <Textarea 
              id="instructions" 
              placeholder="e.g., Take with food" 
              value={formData.instructions}
              onChange={handleChange}
              className="min-h-[100px] border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image" className="text-purple-700">Pill Image</Label>
            <div className="border-2 border-dashed border-purple-200 rounded-md p-6 text-center cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-purple-500">Click to upload or drag and drop</div>
                <div className="text-xs text-purple-400">PNG, JPG or WEBP (max. 2MB)</div>
              </div>
              <Input id="image" type="file" className="hidden" />
            </div>
          </div>
        
          <CardFooter className="flex justify-between px-0 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/medications')}
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
      </CardContent>
    </Card>
  );
}
