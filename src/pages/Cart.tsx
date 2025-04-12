
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Info,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  formatPrice, 
  getProductById, 
  getDiscountedPrice
} from "@/lib/data";

// Cart Item Type
interface CartItem {
  productId: string;
  quantity: number;
}

const Cart = () => {
  const { toast } = useToast();
  
  // In a real app, this would come from state management or API
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: "prod-1", quantity: 1 },
    { productId: "prod-4", quantity: 2 },
    { productId: "prod-7", quantity: 3 }
  ]);
  
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const product = getProductById(productId);
    if (!product) return;
    
    // Check stock availability
    if (newQuantity > product.stock) {
      toast({
        variant: "destructive",
        title: "Maximum stock reached",
        description: `Sorry, only ${product.stock} units available.`
      });
      newQuantity = product.stock;
    }
    
    setCartItems(
      cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
    toast({
      title: "Item Removed",
      description: "Product has been removed from your cart"
    });
  };
  
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "DISCOUNT20") {
      setAppliedCoupon(code);
      setCouponDiscount(20);
      toast({
        title: "Coupon Applied",
        description: "20% discount applied to your order!"
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Coupon",
        description: "The coupon code you entered is invalid or expired."
      });
    }
    setCouponCode("");
  };
  
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    toast({
      title: "Coupon Removed",
      description: "Coupon has been removed from your cart"
    });
  };
  
  // Calculate cart totals
  const cartDetails = cartItems.map(item => {
    const product = getProductById(item.productId);
    if (!product) return null;
    
    const price = getDiscountedPrice(product);
    const itemTotal = price * item.quantity;
    
    return {
      product,
      quantity: item.quantity,
      price,
      total: itemTotal
    };
  }).filter(Boolean) as {
    product: ReturnType<typeof getProductById> & { id: string };
    quantity: number;
    price: number;
    total: number;
  }[];
  
  const subtotal = cartDetails.reduce((sum, item) => sum + item.total, 0);
  const discount = subtotal * (couponDiscount / 100);
  const gst = (subtotal - discount) * 0.18; // 18% GST
  const total = subtotal - discount + gst;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <ShoppingCart className="w-8 h-8 mr-2" />
            Your Shopping Cart
          </h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Cart Items ({cartItems.length})
                    </h2>
                    
                    <div className="space-y-6">
                      {cartDetails.map(({ product, quantity, price, total }) => (
                        <div key={product.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b">
                          {/* Product Image */}
                          <Link 
                            to={`/product/${product.id}`} 
                            className="w-full sm:w-24 h-24 flex-shrink-0"
                          >
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-full h-full object-contain"
                            />
                          </Link>
                          
                          {/* Product Details */}
                          <div className="flex-grow">
                            <Link to={`/product/${product.id}`} className="block">
                              <h3 className="font-medium">{product.name}</h3>
                            </Link>
                            <p className="text-sm text-gray-500 mb-2">
                              {product.brand}
                            </p>
                            <div className="flex items-center mb-3">
                              <span className="font-semibold mr-2">
                                {formatPrice(price)}
                              </span>
                              {product.discountPercentage && product.discountPercentage > 0 && (
                                <>
                                  <span className="text-sm text-gray-500 line-through mr-2">
                                    {formatPrice(product.price)}
                                  </span>
                                  <span className="text-xs text-green-600">
                                    {product.discountPercentage}% OFF
                                  </span>
                                </>
                              )}
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-l-md"
                                  onClick={() => updateQuantity(product.id, quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-10 text-center border-y h-8 flex items-center justify-center">
                                  {quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-r-md"
                                  onClick={() => updateQuantity(product.id, quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <span className="font-semibold">
                                  {formatPrice(total)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                                  onClick={() => removeItem(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Coupon Code */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Apply Coupon</h2>
                    
                    {appliedCoupon ? (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <Info className="h-5 w-5 text-green-600 mr-2" />
                          <span>
                            Coupon <strong>{appliedCoupon}</strong> applied! 
                            <span className="ml-1 text-green-600 font-semibold">
                              {couponDiscount}% OFF
                            </span>
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={removeCoupon}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-grow"
                        />
                        <Button onClick={applyCoupon}>Apply</Button>
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-500 mt-3">
                      Try <strong>DISCOUNT20</strong> for 20% off your order
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      
                      {appliedCoupon && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({couponDiscount}%)</span>
                          <span>-{formatPrice(discount)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">GST (18%)</span>
                        <span>{formatPrice(gst)}</span>
                      </div>
                      
                      <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6" size="lg" asChild>
                      <Link to="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    
                    <div className="mt-4">
                      <Link 
                        to="/products" 
                        className="text-primary hover:underline inline-flex items-center text-sm"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild size="lg">
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
