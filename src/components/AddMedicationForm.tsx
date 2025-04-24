
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddMedicationForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Medication</CardTitle>
        <CardDescription>Enter the details of your medication</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Medication Name</Label>
            <Input id="name" placeholder="e.g., Lisinopril" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input id="dosage" placeholder="e.g., 10mg" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select>
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
            <Label htmlFor="time">Time of Day</Label>
            <Select>
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
        
        <div className="space-y-2">
          <Label htmlFor="instructions">Special Instructions</Label>
          <Textarea id="instructions" placeholder="e.g., Take with food" />
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Add Medication</Button>
      </CardFooter>
    </Card>
  );
}
