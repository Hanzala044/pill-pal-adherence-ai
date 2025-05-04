
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, PillIcon, Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AddMedicationForm from '@/components/AddMedicationForm';
import MedicationCard from '@/components/MedicationCard';
import { mockMedications } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Define the Medication type for TypeScript
interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: string;
  instructions: string;
  next_dose: string;
  is_active: boolean;
  color: string;
}

const MedicationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Fetch medications from Supabase
  useEffect(() => {
    async function fetchMedications() {
      try {
        setLoading(true);
        
        // For development, we're using the mockData initially for testing
        let { data, error } = await supabase
          .from('medications')
          .select('*');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setMedications(data as Medication[]);
        } else {
          // If no data in the database yet, use mock data for demo purposes
          console.log('No data in database, using mock data');
          setMedications(mockMedications.map(med => ({
            id: med.id,
            name: med.name,
            dosage: med.dosage,
            schedule: med.schedule,
            instructions: med.instructions || '',
            next_dose: med.nextDose,
            is_active: true,
            color: 'purple'
          })));
        }
      } catch (error) {
        console.error('Error fetching medications:', error);
        toast({
          title: 'Error fetching medications',
          description: 'Please try again later.',
          variant: 'destructive',
        });
        
        // Fall back to mock data on error
        setMedications(mockMedications.map(med => ({
          id: med.id,
          name: med.name,
          dosage: med.dosage,
          schedule: med.schedule,
          instructions: med.instructions || '',
          next_dose: med.nextDose,
          is_active: true,
          color: 'purple'
        })));
      } finally {
        setLoading(false);
      }
    }
    
    fetchMedications();
  }, [toast]);

  // Filter medications based on search term and active tab
  const filteredMedications = medications
    .filter(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(med => {
      if (activeTab === 'active') return med.is_active;
      if (activeTab === 'inactive') return !med.is_active;
      return true; // 'all' tab
    });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">My Medications</h1>
          <p className="text-muted-foreground mt-1">Manage your medications and schedules</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          {showAddForm ? 'Hide Form' : 'Add Medication'}
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <AddMedicationForm 
            onSuccess={() => {
              setShowAddForm(false);
              // Refresh medications after adding
              supabase
                .from('medications')
                .select('*')
                .then(({ data }) => {
                  if (data) setMedications(data as Medication[]);
                });
            }} 
          />
        </div>
      )}

      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search medications..."
            className="pl-8 border-purple-300 focus:border-purple-500 transition-all duration-300 focus:ring-2 focus:ring-purple-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs 
        defaultValue="all" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="bg-gradient-to-r from-purple-100 to-pink-100 p-1 rounded-full">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-full transition-all duration-300"
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="active" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-full transition-all duration-300"
          >
            Active
          </TabsTrigger>
          <TabsTrigger 
            value="inactive" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-full transition-all duration-300"
          >
            Inactive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : filteredMedications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedications.map((medication) => (
                <MedicationCard 
                  key={medication.id} 
                  medication={{
                    id: medication.id,
                    name: medication.name,
                    dosage: medication.dosage,
                    schedule: medication.schedule,
                    instructions: medication.instructions,
                    nextDose: medication.next_dose,
                    image: '/placeholder.svg',
                  }} 
                  className="border-purple-200 hover:border-purple-400 transition-colors duration-300 hover:shadow-md"
                />
              ))}
            </div>
          ) : (
            <Card className="border-purple-200 shadow-sm">
              <CardContent className="py-10 text-center">
                <div className="flex justify-center mb-4">
                  <PillIcon className="h-12 w-12 text-purple-300" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-purple-700">No medications found</h3>
                <p className="text-purple-500 mb-4">
                  {searchTerm ? `No results for "${searchTerm}"` : "You haven't added any medications yet"}
                </p>
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Add Medication
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : filteredMedications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedications.map((medication) => (
                <MedicationCard 
                  key={medication.id} 
                  medication={{
                    id: medication.id,
                    name: medication.name,
                    dosage: medication.dosage,
                    schedule: medication.schedule,
                    instructions: medication.instructions,
                    nextDose: medication.next_dose,
                    image: '/placeholder.svg',
                  }}
                  className="border-purple-200 hover:border-purple-400 transition-colors duration-300 hover:shadow-md"
                />
              ))}
            </div>
          ) : (
            <Card className="border-purple-200">
              <CardContent className="py-10 text-center">
                <div className="flex justify-center mb-4">
                  <PillIcon className="h-12 w-12 text-purple-300" />
                </div>
                <h3 className="text-lg font-medium text-purple-700">No active medications</h3>
                <p className="text-purple-500">You don't have any active medications</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : filteredMedications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedications.map((medication) => (
                <MedicationCard 
                  key={medication.id} 
                  medication={{
                    id: medication.id,
                    name: medication.name,
                    dosage: medication.dosage,
                    schedule: medication.schedule,
                    instructions: medication.instructions,
                    nextDose: medication.next_dose,
                    image: '/placeholder.svg',
                  }}
                  className="border-purple-200 hover:border-purple-400 transition-colors duration-300 hover:shadow-md"
                />
              ))}
            </div>
          ) : (
            <Card className="border-purple-200">
              <CardContent className="py-10 text-center">
                <div className="flex justify-center mb-4">
                  <PillIcon className="h-12 w-12 text-purple-300" />
                </div>
                <h3 className="text-lg font-medium text-purple-700">No inactive medications</h3>
                <p className="text-purple-500">You don't have any inactive medications</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicationPage;
