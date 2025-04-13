
import { supabase } from '@/lib/supabase';
import { Order, OrderItem } from '@/types/models';
import { toast } from 'sonner';

export const getOrdersByCustomerId = async (customerId: number): Promise<Order[]> => {
  try {
    // First get all orders from the Transaction table
    const { data: transactions, error } = await supabase
      .from('Transaction')
      .select(`
        Order_id,
        Status,
        Time,
        Orders!inner (
          Order_id,
          Tax,
          Order_cost,
          Discount_percentage
        )
      `)
      .eq('Customer_id', customerId);
      
    if (error) throw error;
    
    // Format the orders with calculated final amount (implements query 2)
    const orders = transactions.map(tx => {
      const order = tx.Orders;
      const finalAmount = Number((order.Order_cost - 
                        (order.Order_cost * order.Discount_percentage / 100) + 
                        order.Tax).toFixed(2));
      
      return {
        order_id: order.Order_id,
        tax: order.Tax,
        order_cost: order.Order_cost,
        discount_percentage: order.Discount_percentage,
        final_amount: finalAmount,
        status: tx.Status,
        time: tx.Time
      };
    });
    
    // Now get the order items for each order
    for (let order of orders) {
      const { data: items } = await supabase
        .from('Includes')
        .select(`
          order_id,
          product_id,
          quantity,
          Product:product_id (*)
        `)
        .eq('order_id', order.order_id);
        
      if (items) {
        order.items = items.map(item => ({
          product_id: item.product_id,
          order_id: item.order_id,
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
      }
    }
    
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    toast.error('Failed to load orders. Please try again.');
    return [];
  }
};

export const createOrder = async (customerId: number): Promise<number | null> => {
  try {
    // First, get the customer's cart
    const { data: cart, error: cartError } = await supabase
      .from('Cart')
      .select('*')
      .eq('Customer_id', customerId)
      .single();
      
    if (cartError) throw cartError;
    
    // Get cart items
    const { data: cartItems, error: itemsError } = await supabase
      .from('Contains')
      .select(`
        product_id,
        quantity,
        Product:product_id (
          Price,
          GST
        )
      `)
      .eq('customer_id', customerId);
      
    if (itemsError) throw itemsError;
    
    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty. Add items before checkout.');
      return null;
    }
    
    // Calculate tax (sum of GST for all products)
    const tax = cartItems.reduce((sum, item) => {
      const price = item.Product?.Price || 0;
      const gst = item.Product?.GST || 0;
      return sum + ((price * gst / 100) * item.quantity);
    }, 0);
    
    // Create a new order
    const { data: orderData, error: orderError } = await supabase
      .from('Orders')
      .insert([{
        Tax: tax,
        Order_cost: cart.Total_cost,
        Discount_percentage: cart.Coupon_id ? await getCouponDiscount(cart.Coupon_id) : 0
      }])
      .select();
      
    if (orderError) throw orderError;
    
    const orderId = orderData[0].Order_id;
    
    // Create order items
    const includes = cartItems.map(item => ({
      Order_id: orderId,
      Product_id: item.product_id,
      Quantity: item.quantity
    }));
    
    const { error: includesError } = await supabase
      .from('Includes')
      .insert(includes);
      
    if (includesError) throw includesError;
    
    // Create transaction record
    const { error: txError } = await supabase
      .from('Transaction')
      .insert([{
        Order_id: orderId,
        Status: 'Pending',
        Customer_id: customerId
      }]);
      
    if (txError) throw txError;
    
    // Clear the customer's cart
    const { error: clearError } = await supabase
      .from('Contains')
      .delete()
      .eq('customer_id', customerId);
      
    if (clearError) throw clearError;
    
    // Update cart totals
    const { error: updateCartError } = await supabase
      .from('Cart')
      .update({
        Total_product: 0,
        Total_cost: 0,
        Coupon_id: null
      })
      .eq('Customer_id', customerId);
      
    if (updateCartError) throw updateCartError;
    
    toast.success('Order placed successfully!');
    return orderId;
  } catch (error) {
    console.error('Error creating order:', error);
    toast.error('Failed to place order. Please try again.');
    return null;
  }
};

// Helper function to get coupon discount
const getCouponDiscount = async (couponId: number): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('Coupon')
      .select('Discount_percentage')
      .eq('Coupon_id', couponId)
      .single();
      
    if (error) throw error;
    
    return data?.Discount_percentage || 0;
  } catch (error) {
    console.error('Error fetching coupon:', error);
    return 0;
  }
};
