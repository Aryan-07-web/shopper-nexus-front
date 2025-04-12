
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Product, formatPrice, getDiscountedPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discountedPrice = getDiscountedPrice(product);
  
  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {product.discountPercentage && product.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
              {product.discountPercentage}% OFF
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10 mb-1">{product.name}</h3>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex items-center bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-sm mr-2">
            <Star className="h-3 w-3 mr-0.5 fill-white" />
            <span>{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500">{product.brand}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-gray-800">{formatPrice(discountedPrice)}</span>
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="text-xs text-gray-500 line-through ml-2">{formatPrice(product.price)}</span>
            )}
          </div>
          <Button size="sm" variant="secondary">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
