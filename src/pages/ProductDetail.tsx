
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Truck, ShoppingCart, Heart, Share2, ChevronRight, Check, Minus, Plus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCarousel from "@/components/ui/ProductCarousel";
import { products, getProductById, formatPrice, getDiscountedPrice } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const product = getProductById(id || "");
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const addToCart = () => {
    // In a real app, this would add to cart via state management or API
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };
  
  const discountedPrice = getDiscountedPrice(product);
  const totalPrice = discountedPrice * quantity;
  
  // Get similar products (same category)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-6">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <Link 
              to={`/products?category=${product.category}`} 
              className="text-gray-500 hover:text-gray-700"
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
          
          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Images */}
              <div className="p-6 bg-gray-50">
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative w-20 h-20 rounded border ${
                        selectedImage === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - View ${index + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="mb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center bg-green-600 text-white text-sm px-2 py-0.5 rounded mr-2">
                      <Star className="h-3 w-3 mr-1 fill-white" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">Brand: {product.brand}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline mb-1">
                    <span className="text-3xl font-bold">{formatPrice(discountedPrice)}</span>
                    {product.discountPercentage && product.discountPercentage > 0 && (
                      <>
                        <span className="text-gray-500 line-through ml-2">{formatPrice(product.price)}</span>
                        <span className="text-red-500 ml-2">
                          {product.discountPercentage}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Inclusive of all taxes
                  </p>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  
                  <div className="space-y-2">
                    {product.features && product.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <Truck className="h-4 w-4 mr-1" />
                    <span>Free delivery available</span>
                  </div>
                  <div className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {product.stock > 0 
                      ? `In Stock (${product.stock} available)`
                      : "Out of Stock"}
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="ml-4 text-sm text-gray-600">
                    Total: {formatPrice(totalPrice)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Button 
                    onClick={addToCart} 
                    className="flex-1"
                    size="lg"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="flex-shrink-0"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="flex-shrink-0"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mb-10">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="py-4">
              <div className="prose max-w-none">
                <h3 className="text-xl font-bold mb-3">Product Description</h3>
                <p className="mb-4">{product.description}</p>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl sed
                  aliquet lacinia, nunc nisl tincidunt nunc, eget tincidunt nisl nisl eget nisl.
                  Nullam euismod, nisl sed aliquet lacinia, nunc nisl tincidunt nunc, eget tincidunt
                  nisl nisl eget nisl.
                </p>
                {product.features && (
                  <>
                    <h4 className="text-lg font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc pl-5 mb-4">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="py-4">
              <div className="prose max-w-none">
                <h3 className="text-xl font-bold mb-3">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <th className="text-left p-3 bg-gray-50">Brand</th>
                          <td className="p-3">{product.brand}</td>
                        </tr>
                        <tr className="border-b">
                          <th className="text-left p-3 bg-gray-50">Category</th>
                          <td className="p-3">{product.category}</td>
                        </tr>
                        <tr className="border-b">
                          <th className="text-left p-3 bg-gray-50">In Stock</th>
                          <td className="p-3">{product.stock > 0 ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                          <th className="text-left p-3 bg-gray-50">Shipping</th>
                          <td className="p-3">Free Shipping</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="py-4">
              <div className="prose max-w-none">
                <h3 className="text-xl font-bold mb-3">Customer Reviews</h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded mr-4">
                    <Star className="h-4 w-4 mr-1 fill-white" />
                    <span className="font-bold">{product.rating}</span>
                  </div>
                  <p>Based on 24 reviews</p>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <h4 className="font-semibold mr-2">John D.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-auto">2 weeks ago</span>
                    </div>
                    <p className="text-gray-700">
                      Great product, exactly as described. Fast shipping and well packaged.
                      Would buy again!
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <h4 className="font-semibold mr-2">Sarah M.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-auto">1 month ago</span>
                    </div>
                    <p className="text-gray-700">
                      Very happy with my purchase. The quality is excellent and it works perfectly.
                      Just one star off because delivery was a bit delayed.
                    </p>
                  </div>
                </div>
                
                <Button className="mt-6">Write a Review</Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mb-10">
              <ProductCarousel
                title="Similar Products"
                products={similarProducts}
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
