
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Implement query 1: Retrieve the list of customers along with their cart details and any coupon applied
export const getCustomerCartSummary = async () => {
  try {
    const { data, error } = await supabase
      .from('Customer')
      .select(`
        Customer_id,
        First_Name,
        Last_Name,
        Cart!inner (
          Total_product,
          Total_cost,
          Coupon:Coupon_id (
            Discount_percentage
          )
        )
      `);
      
    if (error) throw error;
    
    return data.map(item => ({
      customerId: item.Customer_id,
      firstName: item.First_Name,
      lastName: item.Last_Name,
      totalProducts: item.Cart.Total_product,
      totalCost: item.Cart.Total_cost,
      discountPercentage: item.Cart.Coupon?.Discount_percentage || 0
    }));
  } catch (error) {
    console.error('Error fetching customer cart summary:', error);
    return [];
  }
};

// Implement query 3: Display the total units sold and total revenue generated for each product, grouped by product category
export const getProductSalesAnalytics = async () => {
  try {
    const { data, error } = await supabase.rpc('get_product_sales_analytics');
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching product sales analytics:', error);
    toast.error('Failed to load sales analytics. Please try again.');
    return [];
  }
};

// Implement query 5: List the products that are out of stock in all warehouses
export const getOutOfStockProducts = async () => {
  try {
    const { data, error } = await supabase.rpc('get_out_of_stock_products');
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching out of stock products:', error);
    toast.error('Failed to load stock information. Please try again.');
    return [];
  }
};

// Implement query 6: Find customers who have placed orders with a cost greater than the average order cost
export const getHighValueCustomers = async () => {
  try {
    const { data, error } = await supabase.rpc('get_high_value_customers');
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching high value customers:', error);
    toast.error('Failed to load customer analytics. Please try again.');
    return [];
  }
};

// Implement query 8: Retrieve the top three most expensive products available in the system
export const getMostExpensiveProducts = async (limit = 3) => {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select('Product_id, Category, Price')
      .order('Price', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching most expensive products:', error);
    toast.error('Failed to load product data. Please try again.');
    return [];
  }
};

// Implement query 9: Display the order delivery summary
export const getOrderDeliverySummary = async () => {
  try {
    const { data, error } = await supabase.rpc('get_delivery_summary');
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching delivery summary:', error);
    toast.error('Failed to load delivery data. Please try again.');
    return [];
  }
};

// Implement query 10: List all electronics that were manufactured before the year 2024
export const getOlderElectronics = async () => {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select(`
        Product_id,
        Category,
        Electronics!inner (
          Manufacture_Date
        )
      `)
      .eq('Category', 'electronics')
      .lt('Electronics.Manufacture_Date', '2024-01-01');
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching older electronics:', error);
    toast.error('Failed to load product data. Please try again.');
    return [];
  }
};

// Implement query 13: Calculate the average rating of products in each category
export const getCategoryRatings = async () => {
  try {
    const { data, error } = await supabase.rpc('get_category_ratings');
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching category ratings:', error);
    toast.error('Failed to load rating data. Please try again.');
    
    // Fallback to direct query if RPC fails
    try {
      const { data } = await supabase
        .from('Product')
        .select('Category, Ratings');
        
      if (!data) return [];
      
      const categoriesMap = data.reduce((acc, product) => {
        const category = product.Category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = { total: 0, count: 0 };
        }
        if (product.Ratings) {
          acc[category].total += product.Ratings;
          acc[category].count += 1;
        }
        return acc;
      }, {});
      
      return Object.entries(categoriesMap).map(([category, info]) => ({
        category,
        average_rating: info.count > 0 ? Number((info.total / info.count).toFixed(2)) : 0
      }));
    } catch (innerError) {
      console.error('Error in fallback query:', innerError);
      return [];
    }
  }
};
