
import { supabase } from '@/integrations/supabase/client';

export type ProfileInput = {
  name?: string;
  avatar_url?: string | null;
};

export const getProfile = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session?.user) {
    throw new Error('No user authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.session.user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }

  return data;
};

export const updateProfile = async (profile: ProfileInput) => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session?.user) {
    throw new Error('No user authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .eq('id', session.session.user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }

  return data;
};
