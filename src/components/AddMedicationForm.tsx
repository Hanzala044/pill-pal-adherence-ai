
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Button, Input, Label, Textarea, Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue } from '@/components/ui/shared';
import { mockMedications } from '@/utils/mockData';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function AddMedicationForm() {
  const navigate = useNavigate();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dosage || !formData.frequency || !formData.timeOfDay) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    // Create a new medication object
    const newMedication = {
      id: `${mockMedications.length + 1}`,
      name: formData.name,
      dosage: formData.dosage,
      schedule: formData.frequency,
      image: '/placeholder.svg',
      instructions: formData.instructions,
      nextDose: calculateNextDose(formData.timeOfDay)
    };

    // Add to the mock medications array
    mockMedications.unshift(newMedication);

    toast({
      title: "Success",
      description: "Medication added successfully!",
    });

    // Navigate back to dashboard
    navigate('/');
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Medication</CardTitle>
        <CardDescription>Enter the details of your medication</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name*</Label>
              <Input 
                id="name" 
                placeholder="e.g., Lisinopril" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage*</Label>
              <Input 
                id="dosage" 
                placeholder="e.g., 10mg" 
                value={formData.dosage}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency*</Label>
              <Select 
                value={formData.frequency} 
                onValueChange={(value) => handleSelectChange('frequency', value)}
              >
                <SelectTrigger>
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
              <Label htmlFor="timeOfDay">Time of Day*</Label>
              <Select 
                value={formData.timeOfDay} 
                onValueChange={(value) => handleSelectChange('timeOfDay', value)}
              >
                <SelectTrigger>
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
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea 
              id="instructions" 
              placeholder="e.g., Take with food" 
              value={formData.instructions}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Pill Image</Label>
            <div className="border-2 border-dashed border-border rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-muted-foreground">Click to upload or drag and drop</div>
                <div className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 2MB)</div>
              </div>
              <Input id="image" type="file" className="hidden" />
            </div>
          </div>
        
          <CardFooter className="flex justify-between px-0 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate('/medications')}>Cancel</Button>
            <Button type="submit">Add Medication</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
