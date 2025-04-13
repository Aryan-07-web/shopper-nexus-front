
import { supabase } from '@/lib/supabase';
import { Employee } from '@/types/models';
import { toast } from 'sonner';

export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const { data, error } = await supabase
      .from('Employee')
      .select('*');
      
    if (error) throw error;
    
    return data.map(employee => ({
      employee_id: employee.Employee_id,
      first_name: employee.First_Name,
      last_name: employee.Last_Name,
      email: employee.Email,
      department: employee.Department || undefined,
      city: employee.City || undefined,
      pin_code: employee.Pin_Code || undefined,
      house_no: employee.House_No || undefined,
      local_area: employee.Local_Area || undefined,
      date_of_joining: employee.Date_of_Joining || undefined,
      age: employee.Age || undefined,
      date_of_birth: employee.Date_of_Birth || undefined,
      gender: employee.Gender as 'Male' | 'Female' | 'Other' | undefined
    }));
  } catch (error) {
    console.error('Error fetching employees:', error);
    toast.error('Failed to load employees. Please try again.');
    return [];
  }
};

export const getEmployeeById = async (employeeId: number): Promise<Employee | null> => {
  try {
    const { data, error } = await supabase
      .from('Employee')
      .select('*')
      .eq('Employee_id', employeeId)
      .single();
      
    if (error) throw error;
    
    if (!data) return null;
    
    return {
      employee_id: data.Employee_id,
      first_name: data.First_Name,
      last_name: data.Last_Name,
      email: data.Email,
      department: data.Department || undefined,
      city: data.City || undefined,
      pin_code: data.Pin_Code || undefined,
      house_no: data.House_No || undefined,
      local_area: data.Local_Area || undefined,
      date_of_joining: data.Date_of_Joining || undefined,
      age: data.Age || undefined,
      date_of_birth: data.Date_of_Birth || undefined,
      gender: data.Gender as 'Male' | 'Female' | 'Other' | undefined
    };
  } catch (error) {
    console.error('Error fetching employee:', error);
    toast.error('Failed to load employee data. Please try again.');
    return null;
  }
};

export const getEmployeeComplaints = async (employeeId: number): Promise<any[]> => {
  try {
    // Implements query 7: "Find the total number of complaints registered for each employee"
    const { data, error } = await supabase
      .from('Complaints')
      .select(`
        Complaint_No,
        Customer:Customer_id (
          First_Name,
          Last_Name,
          Email
        ),
        Orders:Order_id (
          Order_id
        )
      `)
      .eq('Employee_id', employeeId);
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching employee complaints:', error);
    toast.error('Failed to load complaint data. Please try again.');
    return [];
  }
};
