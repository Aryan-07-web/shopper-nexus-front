
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/models';

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase.from('Product').select('*');
    
    if (error) throw error;
    
    // Transform database results to match our frontend model
    return data.map(item => ({
      product_id: item.Product_id,
      price: item.Price,
      details: item.Details || '',
      photos: item.Photos || '',
      category: item.Category || '',
      ratings: item.Ratings || 0,
      discount_percentage: item.Discount_percentage || 0,
      gst: item.GST || 0
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('Product_id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) return null;
    
    // Get product type specific details
    let additionalData = {};
    
    if (data.Category === 'clothing') {
      const { data: clothingData } = await supabase
        .from('Clothing')
        .select('*')
        .eq('Product_id', id)
        .single();
        
      if (clothingData) {
        additionalData = {
          fabric: clothingData.Fabric,
          gender: clothingData.Gender,
          size: clothingData.Size
        };
      }
    } else if (data.Category === 'groceries') {
      const { data: groceryData } = await supabase
        .from('Groceries')
        .select('*')
        .eq('Product_id', id)
        .single();
        
      if (groceryData) {
        additionalData = {
          use_by_date: groceryData.Use_By_date,
          weight: groceryData.Weight
        };
      }
    } else if (data.Category === 'electronics') {
      const { data: electronicsData } = await supabase
        .from('Electronics')
        .select('*')
        .eq('Product_id', id)
        .single();
        
      if (electronicsData) {
        additionalData = {
          warranty_period: electronicsData.Warranty_Period,
          manufacture_date: electronicsData.Manufacture_Date,
          manufacturing_city: electronicsData.Manufacturing_City,
          power_requirement: electronicsData.Power_Requirement
        };
      }
    }
    
    return {
      product_id: data.Product_id,
      price: data.Price,
      details: data.Details || '',
      photos: data.Photos || '',
      category: data.Category || '',
      ratings: data.Ratings || 0,
      discount_percentage: data.Discount_percentage || 0,
      gst: data.GST || 0,
      ...additionalData
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('Category', category);
    
    if (error) throw error;
    
    return data.map(item => ({
      product_id: item.Product_id,
      price: item.Price,
      details: item.Details || '',
      photos: item.Photos || '',
      category: item.Category || '',
      ratings: item.Ratings || 0,
      discount_percentage: item.Discount_percentage || 0,
      gst: item.GST || 0
    }));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

export const getTopProducts = async (limit = 3): Promise<Product[]> => {
  try {
    // Query implements "query 15: Retrieve Top 3 Most Popular Products Based on Order Quantity"
    const { data, error } = await supabase.rpc('get_top_products', { limit_count: limit });
    
    if (error) throw error;
    
    return data.map(item => ({
      product_id: item.product_id,
      price: item.price,
      details: item.details || '',
      photos: item.photos || '',
      category: item.category || '',
      ratings: item.ratings || 0,
      discount_percentage: item.discount_percentage || 0,
      gst: item.gst || 0,
      total_ordered: item.total_ordered
    }));
  } catch (error) {
    console.error('Error fetching top products:', error);
    
    // Fallback to regular products if RPC fails
    const { data } = await supabase
      .from('Product')
      .select('*')
      .order('Ratings', { ascending: false })
      .limit(limit);
      
    if (data) {
      return data.map(item => ({
        product_id: item.Product_id,
        price: item.Price,
        details: item.Details || '',
        photos: item.Photos || '',
        category: item.Category || '',
        ratings: item.Ratings || 0,
        discount_percentage: item.Discount_percentage || 0,
        gst: item.GST || 0
      }));
    }
    
    return [];
  }
};
