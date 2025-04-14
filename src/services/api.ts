
// API service to interface with the backend

import { 
  getProducts, 
  getProductById, 
  createProduct,
  getCustomers,
  getCustomerById,
  getOrders,
  getOrderById,
  getEmployees,
  getVendors,
  getComplaints 
} from "@/lib/db";

import { 
  Product, 
  Customer, 
  Order, 
  Employee, 
  Vendor, 
  Complaint 
} from "@/types/models";

// Product APIs
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    return await getProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    return await getProductById(id);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error("Failed to fetch product");
  }
};

export const addProduct = async (product: Omit<Product, 'product_id'>): Promise<Product> => {
  try {
    return await createProduct(product);
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
};

// Customer APIs
export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    return await getCustomers();
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch customers");
  }
};

export const fetchCustomerById = async (id: number): Promise<Customer | null> => {
  try {
    return await getCustomerById(id);
  } catch (error) {
    console.error(`Error fetching customer ${id}:`, error);
    throw new Error("Failed to fetch customer");
  }
};

// Order APIs
export const fetchOrders = async (): Promise<Order[]> => {
  try {
    return await getOrders();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

export const fetchOrderById = async (id: number): Promise<Order | null> => {
  try {
    return await getOrderById(id);
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    throw new Error("Failed to fetch order");
  }
};

// Employee APIs
export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    return await getEmployees();
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw new Error("Failed to fetch employees");
  }
};

// Vendor APIs
export const fetchVendors = async (): Promise<Vendor[]> => {
  try {
    return await getVendors();
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw new Error("Failed to fetch vendors");
  }
};

// Complaint APIs
export const fetchComplaints = async (): Promise<Complaint[]> => {
  try {
    return await getComplaints();
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw new Error("Failed to fetch complaints");
  }
};
