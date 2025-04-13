
import { supabase } from '@/lib/supabase';
import { Vendor } from '@/types/models';
import { toast } from 'sonner';

export const getAllVendors = async (): Promise<Vendor[]> => {
  try {
    const { data, error } = await supabase
      .from('Vendor')
      .select('*');
      
    if (error) throw error;
    
    return data.map(vendor => ({
      vendor_id: vendor.Vendor_id,
      name: vendor.Name,
      contact_no: vendor.Contact_No,
      city: vendor.City || undefined,
      local_area: vendor.Local_Area || undefined,
      pin_code: vendor.Pin_Code || undefined
    }));
  } catch (error) {
    console.error('Error fetching vendors:', error);
    toast.error('Failed to load vendors. Please try again.');
    return [];
  }
};

export const getVendorStock = async (vendorId: number): Promise<any[]> => {
  try {
    // Get products supplied by this vendor
    const { data: supplies, error } = await supabase
      .from('Supplies')
      .select(`
        Product_id,
        Quantity,
        Product:Product_id (
          Product_id,
          Category,
          Price,
          Details,
          Photos
        )
      `)
      .eq('Vendor_id', vendorId);
      
    if (error) throw error;
    
    // For each product, get its warehouse stock
    const productsWithStock = [];
    
    for (const supply of supplies) {
      const { data: stocks } = await supabase
        .from('Stores')
        .select(`
          Stocks,
          WareHouse:Warehouse_id (
            Warehouse_id,
            City
          )
        `)
        .eq('Product_id', supply.Product_id);
        
      productsWithStock.push({
        product: supply.Product,
        suppliedQuantity: supply.Quantity,
        warehouseStock: stocks || []
      });
    }
    
    return productsWithStock;
  } catch (error) {
    console.error('Error fetching vendor stock:', error);
    toast.error('Failed to load stock information. Please try again.');
    return [];
  }
};

export const updateProductStock = async (
  productId: number,
  warehouseId: number,
  newStock: number
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('Stores')
      .update({ Stocks: newStock })
      .eq('Product_id', productId)
      .eq('Warehouse_id', warehouseId);
      
    if (error) throw error;
    
    toast.success('Stock updated successfully!');
    return true;
  } catch (error) {
    console.error('Error updating stock:', error);
    toast.error('Failed to update stock. Please try again.');
    return false;
  }
};

export const getVendorsWithSingleProduct = async (): Promise<any[]> => {
  try {
    // Implements query 4: "Identify vendors who supply only one product"
    const { data, error } = await supabase.rpc('get_vendors_with_one_product');
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching vendors with single product:', error);
    // Fallback to manual query if RPC fails
    try {
      const { data } = await supabase
        .from('Vendor')
        .select('*');
        
      if (!data) return [];
      
      const result = [];
      
      for (const vendor of data) {
        const { count } = await supabase
          .from('Supplies')
          .select('*', { count: 'exact', head: false })
          .eq('Vendor_id', vendor.Vendor_id);
          
        if (count === 1) {
          result.push({
            vendor_id: vendor.Vendor_id,
            name: vendor.Name,
            total_products_supplied: 1
          });
        }
      }
      
      return result;
    } catch (innerError) {
      console.error('Error in fallback query:', innerError);
      return [];
    }
  }
};
