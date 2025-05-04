
import { supabase } from '@/integrations/supabase/client';
import { Medication } from '@/utils/mockData';

export type MedicationInput = {
  name: string;
  dosage: string;
  frequency: string;
  time_of_day: string;
  instructions?: string;
  next_dose: string | Date;
  color?: string;
  refill_date?: string | Date | null;
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
  const { data, error } = await supabase
    .from('medications')
    .insert([medication])
    .select()
    .single();

  if (error) {
    console.error('Error creating medication:', error);
    throw error;
  }

  return data;
};

export const updateMedication = async (id: string, medication: Partial<MedicationInput>) => {
  const { data, error } = await supabase
    .from('medications')
    .update({ ...medication, updated_at: new Date().toISOString() })
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
