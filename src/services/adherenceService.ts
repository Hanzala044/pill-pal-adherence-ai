
import { supabase } from '@/integrations/supabase/client';

export type AdherenceInput = {
  medication_id: string;
  medicationName: string;
  status: 'taken' | 'missed' | 'skipped';
  timestamp?: string;
  pillVerified?: boolean;
  userVerified?: boolean;
  notes?: string | null;
};

export const getAdherenceHistory = async (days?: number) => {
  let query = supabase
    .from('adherence_history')
    .select('*')
    .order('timestamp', { ascending: false });
  
  if (days) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    query = query.gte('timestamp', cutoff.toISOString());
  }
  
  const { data, error } = await query;

  if (error) {
    console.error('Error fetching adherence history:', error);
    throw error;
  }

  return data;
};

export const recordAdherence = async (record: AdherenceInput) => {
  // Convert property names to match the database schema
  const dbRecord = {
    medication_id: record.medication_id,
    medicationname: record.medicationName, // lowercase 'name' to match DB column
    status: record.status,
    timestamp: record.timestamp || new Date().toISOString(),
    pillverified: record.pillVerified, // lowercase 'verified' to match DB column
    userverified: record.userVerified, // lowercase 'verified' to match DB column
    notes: record.notes
  };

  const { data, error } = await supabase
    .from('adherence_history')
    .insert(dbRecord)
    .select()
    .single();

  if (error) {
    console.error('Error recording adherence:', error);
    throw error;
  }

  return data;
};

export const getAdherenceByMedicationId = async (medicationId: string) => {
  const { data, error } = await supabase
    .from('adherence_history')
    .select('*')
    .eq('medication_id', medicationId)
    .order('timestamp', { ascending: false });

  if (error) {
    console.error('Error fetching adherence for medication:', error);
    throw error;
  }

  return data;
};
