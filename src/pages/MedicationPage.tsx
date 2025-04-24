
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, PillIcon, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AddMedicationForm from '@/components/AddMedicationForm';
import MedicationCard from '@/components/MedicationCard';
import { mockMedications } from '@/utils/mockData';

const MedicationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredMedications = mockMedications.filter(
    med => med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Medications</h1>
          <p className="text-muted-foreground mt-1">Manage your medications and schedules</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <PlusCircle className="h-5 w-5 mr-1" />
          Add Medication
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <AddMedicationForm />
        </div>
      )}

      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search medications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {filteredMedications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedications.map((medication) => (
                <MedicationCard key={medication.id} medication={medication} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <div className="flex justify-center mb-4">
                  <PillIcon className="h-12 w-12 text-muted" />
                </div>
                <h3 className="text-lg font-medium mb-2">No medications found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? `No results for "${searchTerm}"` : "You haven't added any medications yet"}
                </p>
                <Button onClick={() => setShowAddForm(true)}>Add Medication</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardContent className="py-10 text-center">
              <div className="flex justify-center mb-4">
                <PillIcon className="h-12 w-12 text-muted" />
              </div>
              <h3 className="text-lg font-medium">Active medications</h3>
              <p className="text-muted-foreground">This is a placeholder for the active medications tab</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-4">
          <Card>
            <CardContent className="py-10 text-center">
              <div className="flex justify-center mb-4">
                <PillIcon className="h-12 w-12 text-muted" />
              </div>
              <h3 className="text-lg font-medium">Inactive medications</h3>
              <p className="text-muted-foreground">This is a placeholder for the inactive medications tab</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicationPage;
