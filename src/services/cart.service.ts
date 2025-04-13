
import { supabase } from '@/lib/supabase';
import { CartItem, Product } from '@/types/models';
import { toast } from 'sonner';

export const getCartItems = async (customerId: number): Promise<CartItem[]> => {
  try {
    // Get cart items using the Contains table (joins with Product)
    const { data, error } = await supabase
      .from('Contains')
      .select(`
        customer_id,
        product_id,
        quantity,
        Product:product_id (
          Product_id,
          Price,
          Details,
          Photos,
          Category,
          Ratings,
          Discount_percentage,
          GST
        )
      `)
      .eq('customer_id', customerId);
      
    if (error) throw error;
    
    // Transform the data to match our frontend model
    return data.map(item => ({
      customer_id: item.customer_id,
      product_id: item.product_id,
      quantity: item.quantity,
      product: item.Product ? {
        product_id: item.Product.Product_id,
        price: item.Product.Price,
        details: item.Product.Details || '',
        photos: item.Product.Photos || '',
        category: item.Product.Category || '',
        ratings: item.Product.Ratings || 0,
        discount_percentage: item.Product.Discount_percentage || 0,
        gst: item.Product.GST || 0
      } : undefined
    }));
  } catch (error) {
    console.error('Error fetching cart items:', error);
    toast.error('Failed to load cart items. Please try again.');
    return [];
  }
};

export const addToCart = async (customerId: number, productId: number, quantity: number): Promise<boolean> => {
  try {
    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('Contains')
      .select('quantity')
      .eq('customer_id', customerId)
      .eq('product_id', productId)
      .single();
      
    if (existingItem) {
      // Update quantity if item already exists
      const { error } = await supabase
        .from('Contains')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('customer_id', customerId)
        .eq('product_id', productId);
        
      if (error) throw error;
    } else {
      // Add new item to cart
      const { error } = await supabase
        .from('Contains')
        .insert([{
          customer_id: customerId,
          product_id: productId,
          quantity: quantity
        }]);
        
      if (error) throw error;
    }
    
    // Update the Cart table totals
    await updateCartTotals(customerId);
    
    toast.success('Item added to cart!');
    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error('Failed to add item to cart. Please try again.');
    return false;
  }
};

export const removeFromCart = async (customerId: number, productId: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('Contains')
      .delete()
      .eq('customer_id', customerId)
      .eq('product_id', productId);
      
    if (error) throw error;
    
    // Update the Cart table totals
    await updateCartTotals(customerId);
    
    toast.success('Item removed from cart!');
    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    toast.error('Failed to remove item from cart. Please try again.');
    return false;
  }
};

export const updateCartQuantity = async (customerId: number, productId: number, quantity: number): Promise<boolean> => {
  try {
    if (quantity <= 0) {
      return await removeFromCart(customerId, productId);
    }
    
    const { error } = await supabase
      .from('Contains')
      .update({ quantity: quantity })
      .eq('customer_id', customerId)
      .eq('product_id', productId);
      
    if (error) throw error;
    
    // Update the Cart table totals
    await updateCartTotals(customerId);
    
    toast.success('Cart updated!');
    return true;
  } catch (error) {
    console.error('Error updating cart:', error);
    toast.error('Failed to update cart. Please try again.');
    return false;
  }
};

// Helper function to update cart totals
const updateCartTotals = async (customerId: number): Promise<void> => {
  try {
    // Calculate totals from the Contains table
    const { data, error } = await supabase
      .from('Contains')
      .select(`
        quantity,
        Product:product_id (
          Price,
          Discount_percentage
        )
      `)
      .eq('customer_id', customerId);
      
    if (error) throw error;
    
    // Calculate the total products and cost
    const totalProduct = data.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = data.reduce((sum, item) => {
      const price = item.Product?.Price || 0;
      const discount = item.Product?.Discount_percentage || 0;
      const discountedPrice = price - (price * discount / 100);
      return sum + (discountedPrice * item.quantity);
    }, 0);
    
    // Update the Cart table
    const { error: updateError } = await supabase
      .from('Cart')
      .update({
        Total_product: totalProduct,
        Total_cost: totalCost
      })
      .eq('Customer_id', customerId);
      
    if (updateError) throw updateError;
    
  } catch (error) {
    console.error('Error updating cart totals:', error);
  }
};
