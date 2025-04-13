
// Customer model
export interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  contact_no: string;
  email: string;
  password: string;
  house_no?: string;
  local_area?: string;
  pin_code?: string;
  city?: string;
}

// Coupon model
export interface Coupon {
  coupon_id: number;
  discount_percentage: number;
}

// Cart model
export interface Cart {
  customer_id: number;
  total_product: number;
  total_cost: number;
  coupon_id?: number;
  coupon?: Coupon;
}

// Order model
export interface Order {
  order_id: number;
  tax: number;
  order_cost: number;
  discount_percentage: number;
  final_amount?: number; // Calculated field
  status?: string; // From Transaction table
  time?: string; // From Transaction table
  items?: OrderItem[];
}

// Order item model
export interface OrderItem {
  product_id: number;
  order_id: number;
  quantity: number;
  product?: Product;
}

// Employee model
export interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  department?: string;
  city?: string;
  pin_code?: string;
  house_no?: string;
  local_area?: string;
  date_of_joining?: string;
  age?: number;
  date_of_birth?: string;
  gender?: 'Male' | 'Female' | 'Other';
}

// Vendor model
export interface Vendor {
  vendor_id: number;
  name: string;
  contact_no: string;
  city?: string;
  local_area?: string;
  pin_code?: string;
}

// Product model
export interface Product {
  product_id: number;
  price: number;
  details?: string;
  photos?: string;
  category?: string;
  ratings?: number;
  discount_percentage?: number;
  gst?: number;
  
  // Additional fields for product subtypes
  fabric?: string; // Clothing
  gender?: string; // Clothing
  size?: string; // Clothing
  use_by_date?: string; // Groceries
  weight?: number; // Groceries
  warranty_period?: number; // Electronics
  manufacture_date?: string; // Electronics
  manufacturing_city?: string; // Electronics
  power_requirement?: string; // Electronics
}

// Warehouse model
export interface Warehouse {
  warehouse_id: number;
  plot_no?: string;
  city?: string;
  contact_no?: string;
  pin_code?: string;
}

// CartItem model (for Contains table)
export interface CartItem {
  customer_id: number;
  product_id: number;
  quantity: number;
  product?: Product;
}

// Transaction model
export interface Transaction {
  order_id: number;
  status: 'Pending' | 'Completed' | 'Failed';
  time: string;
  customer_id: number;
}

// Complaint model
export interface Complaint {
  complaint_no: number;
  employee_id?: number;
  customer_id?: number;
  order_id?: number;
}

// DeliveryPartner model
export interface DeliveryPartner extends Employee {
  vehicle_type?: string;
  vehicle_no?: string;
}

// Delivery model
export interface Delivery {
  order_id: number;
  customer_id: number;
  warehouse_id: number;
  employee_id: number;
}

// ProductStock model
export interface ProductStock {
  product_id: number;
  warehouse_id: number;
  stocks: number;
}
