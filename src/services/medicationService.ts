
import { supabase } from '@/integrations/supabase/client';
import { Medication } from '@/utils/mockData';

export type MedicationInput = {
  name: string;
  dosage: string;
  frequency: string;
  time_of_day: string;
  instructions?: string;
  next_dose: string;  // Changed to string only to match Supabase schema
  color?: string;
  refill_date?: string | null;  // Changed to string only to match Supabase schema
};

export const getMedications = async () => {
  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .order('next_dose', { ascending: true });

  if (error) {
    console.error('Error fetching medications:', error);
    throw error;
  }

  return data;
};

export const getMedicationById = async (id: string) => {
  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching medication:', error);
    throw error;
  }

  return data;
};

export const createMedication = async (medication: MedicationInput) => {
  // Ensure next_dose and refill_date are strings if they are Date objects
  const dbMedication = {
    ...medication,
    next_dose: medication.next_dose instanceof Date 
      ? medication.next_dose.toISOString() 
      : medication.next_dose,
    refill_date: medication.refill_date instanceof Date 
      ? medication.refill_date.toISOString() 
      : medication.refill_date
  };

  const { data, error } = await supabase
    .from('medications')
    .insert([dbMedication])
    .select()
    .single();

  if (error) {
    console.error('Error creating medication:', error);
    throw error;
  }

  return data;
};

export const updateMedication = async (id: string, medication: Partial<MedicationInput>) => {
  // Ensure next_dose and refill_date are strings if they are Date objects
  const dbMedication = {
    ...medication,
    updated_at: new Date().toISOString(),
    next_dose: medication.next_dose instanceof Date 
      ? medication.next_dose.toISOString() 
      : medication.next_dose,
    refill_date: medication.refill_date instanceof Date 
      ? medication.refill_date.toISOString() 
      : medication.refill_date
  };

  const { data, error } = await supabase
    .from('medications')
    .update(dbMedication)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating medication:', error);
    throw error;
  }

  return data;
};

export const deleteMedication = async (id: string) => {
  const { error } = await supabase
    .from('medications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting medication:', error);
    throw error;
  }

  return true;
};

export const setMedicationStatus = async (id: string, isActive: boolean) => {
  const { data, error } = await supabase
    .from('medications')
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating medication status:', error);
    throw error;
  }

  return data;
};
