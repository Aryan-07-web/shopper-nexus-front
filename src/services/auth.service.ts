
import { supabase } from '@/lib/supabase';
import { Customer, Employee, Vendor } from '@/types/models';
import { toast } from 'sonner';

// Create a type for all possible users
type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'employee' | 'vendor' | 'admin';
};

export const login = async (email: string, password: string, role: string): Promise<User | null> => {
  try {
    // For admin - use hardcoded credentials
    if (role === 'admin' && email === 'admin@example.com' && password === 'admin') {
      const adminUser = {
        id: 0,
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin' as const
      };
      
      // Store admin user in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('user', JSON.stringify(adminUser));
      
      return adminUser;
    }
    
    // For customers
    if (role === 'customer') {
      const { data: customers, error: customerError } = await supabase
        .from('Customer')
        .select('*')
        .eq('Email', email)
        .single();
        
      if (customerError) throw customerError;
      
      if (customers && customers.Password === password) {
        const user: User = {
          id: customers.Customer_id,
          email: customers.Email,
          firstName: customers.First_Name,
          lastName: customers.Last_Name,
          role: 'customer'
        };
        
        // Store user in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'customer');
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', customers.Customer_id.toString());
        
        return user;
      }
    }
    
    // For employees
    if (role === 'employee') {
      const { data: employees, error: employeeError } = await supabase
        .from('Employee')
        .select('*')
        .eq('Email', email)
        .single();
        
      if (employeeError) throw employeeError;
      
      // In a real system, you would have employee passwords, but for now we'll simulate
      if (employees && password === 'employee') {
        const user: User = {
          id: employees.Employee_id,
          email: employees.Email,
          firstName: employees.First_Name,
          lastName: employees.Last_Name,
          role: 'employee'
        };
        
        // Store user in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'employee');
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', employees.Employee_id.toString());
        
        return user;
      }
    }
    
    // For vendors
    if (role === 'vendor') {
      const { data: vendors, error: vendorError } = await supabase
        .from('Vendor')
        .select('*')
        .eq('Contact_No', email) // Using contact number as login for vendors
        .single();
        
      if (vendorError) throw vendorError;
      
      // In a real system, you would have vendor passwords, but for now we'll simulate
      if (vendors && password === 'vendor') {
        const user: User = {
          id: vendors.Vendor_id,
          email: vendors.Contact_No, // Using contact as email
          firstName: vendors.Name,
          lastName: '',
          role: 'vendor'
        };
        
        // Store user in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'vendor');
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', vendors.Vendor_id.toString());
        
        return user;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Login failed. Please check your credentials and try again.');
    return null;
  }
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: 'customer' | 'vendor'
): Promise<boolean> => {
  try {
    if (role === 'customer') {
      // Register customer
      const { data, error } = await supabase
        .from('Customer')
        .insert([
          {
            First_Name: firstName,
            Last_Name: lastName,
            Email: email,
            Password: password, // In real app, use proper password hashing
            Contact_no: '0000000000' // Placeholder, should be provided by user
          }
        ])
        .select();
        
      if (error) throw error;
      
      // Also create an empty cart for the customer
      if (data && data[0]) {
        await supabase
          .from('Cart')
          .insert([
            {
              Customer_id: data[0].Customer_id,
              Total_product: 0,
              Total_cost: 0
            }
          ]);
      }
      
      return true;
    } else if (role === 'vendor') {
      // Register vendor
      const { error } = await supabase
        .from('Vendor')
        .insert([
          {
            Name: firstName + ' ' + lastName,
            Contact_No: email // Using email as contact for simplicity
          }
        ]);
        
      if (error) throw error;
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Registration error:', error);
    toast.error('Registration failed. Please try again.');
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userRole');
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
  
  // Return to home page
  window.location.href = '/';
};
