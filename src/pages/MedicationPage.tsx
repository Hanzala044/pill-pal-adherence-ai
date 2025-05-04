
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
  nextDose: string;
  is_active: boolean;
  color: string;
  image?: string;
}

// Define the database medication type from Supabase
interface DbMedication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time_of_day: string;
  instructions: string | null;
  next_dose: string;
  is_active: boolean;
  color: string;
  created_at: string;
  updated_at: string;
  user_id: string | null;
  refill_date: string | null;
}

const MedicationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Map DB medication to the application's Medication type
  const mapDbMedicationToMedication = (dbMedication: DbMedication): Medication => {
    return {
      id: dbMedication.id,
      name: dbMedication.name,
      dosage: dbMedication.dosage,
      schedule: `${dbMedication.frequency} (${dbMedication.time_of_day})`,
      instructions: dbMedication.instructions || '',
      nextDose: dbMedication.next_dose,
      is_active: dbMedication.is_active,
      color: dbMedication.color,
      image: '/placeholder.svg',
    };
  };

  // Fetch medications from Supabase
  useEffect(() => {
    async function fetchMedications() {
      try {
        setLoading(true);
        
        let { data, error } = await supabase
          .from('medications')
          .select('*');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Map database records to the Medication type
          const mappedMedications = data.map(mapDbMedicationToMedication);
          setMedications(mappedMedications);
        } else {
          // If no data in the database yet, use mock data for demo purposes
          console.log('No data in database, using mock data');
          setMedications(mockMedications);
        }
      } catch (error) {
        console.error('Error fetching medications:', error);
        toast({
          title: 'Error fetching medications',
          description: 'Please try again later.',
          variant: 'destructive',
        });
        
        // Fall back to mock data on error
        setMedications(mockMedications);
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

  // Function to refresh medications after adding new one
  const refreshMedications = async () => {
    try {
      const { data, error } = await supabase
        .from('medications')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        const mappedMedications = data.map(mapDbMedicationToMedication);
        setMedications(mappedMedications);
      }
    } catch (error) {
      console.error('Error refreshing medications:', error);
      toast({
        title: 'Error refreshing data',
        description: 'Unable to load the latest medications.',
        variant: 'destructive',
      });
    }
  };

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
              refreshMedications();
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
                    nextDose: medication.nextDose,
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
                    nextDose: medication.nextDose,
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
                    nextDose: medication.nextDose,
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
