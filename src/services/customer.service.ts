
import { supabase } from '@/lib/supabase';
import { Customer } from '@/types/models';
import { toast } from 'sonner';

export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const { data, error } = await supabase
      .from('Customer')
      .select('*');
      
    if (error) throw error;
    
    return data.map(customer => ({
      customer_id: customer.Customer_id,
      first_name: customer.First_Name,
      last_name: customer.Last_Name,
      contact_no: customer.Contact_no,
      email: customer.Email,
      password: '',  // Don't return actual passwords
      house_no: customer.House_No || undefined,
      local_area: customer.Local_Area || undefined,
      pin_code: customer.Pin_Code || undefined,
      city: customer.City || undefined
    }));
  } catch (error) {
    console.error('Error fetching customers:', error);
    toast.error('Failed to load customers. Please try again.');
    return [];
  }
};

export const getCustomerById = async (customerId: number): Promise<Customer | null> => {
  try {
    const { data, error } = await supabase
      .from('Customer')
      .select('*')
      .eq('Customer_id', customerId)
      .single();
      
    if (error) throw error;
    
    if (!data) return null;
    
    return {
      customer_id: data.Customer_id,
      first_name: data.First_Name,
      last_name: data.Last_Name,
      contact_no: data.Contact_no,
      email: data.Email,
      password: '',  // Don't return actual password
      house_no: data.House_No || undefined,
      local_area: data.Local_Area || undefined,
      pin_code: data.Pin_Code || undefined,
      city: data.City || undefined
    };
  } catch (error) {
    console.error('Error fetching customer:', error);
    toast.error('Failed to load customer data. Please try again.');
    return null;
  }
};

export const updateCustomer = async (customer: Partial<Customer> & { customer_id: number }): Promise<boolean> => {
  try {
    const { customer_id, ...updates } = customer;
    
    // Transform the data to match database column names
    const dbUpdates: Record<string, any> = {};
    
    if (updates.first_name) dbUpdates.First_Name = updates.first_name;
    if (updates.last_name) dbUpdates.Last_Name = updates.last_name;
    if (updates.contact_no) dbUpdates.Contact_no = updates.contact_no;
    if (updates.email) dbUpdates.Email = updates.email;
    if (updates.house_no) dbUpdates.House_No = updates.house_no;
    if (updates.local_area) dbUpdates.Local_Area = updates.local_area;
    if (updates.pin_code) dbUpdates.Pin_Code = updates.pin_code;
    if (updates.city) dbUpdates.City = updates.city;
    
    const { error } = await supabase
      .from('Customer')
      .update(dbUpdates)
      .eq('Customer_id', customer_id);
      
    if (error) throw error;
    
    toast.success('Profile updated successfully!');
    return true;
  } catch (error) {
    console.error('Error updating customer:', error);
    toast.error('Failed to update profile. Please try again.');
    return false;
  }
};
