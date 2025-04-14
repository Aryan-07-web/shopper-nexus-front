
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Product as ProductType } from "@/types/models";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discountedPrice = product.discount_percentage && product.discount_percentage > 0
    ? product.price - (product.price * product.discount_percentage / 100)
    : product.price;
  
  // Use images array if it exists, otherwise default to empty array
  const photos = product.photos ? product.photos.split(',') : [];
  const mainPhoto = photos.length > 0 ? photos[0] : '/placeholder.svg';

  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/product/${product.product_id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={mainPhoto} 
            alt={product.details?.substring(0, 30) || 'Product'} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {product.discount_percentage && product.discount_percentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
              {product.discount_percentage}% OFF
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.product_id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10 mb-1">
            {product.details?.substring(0, 60) || `Product #${product.product_id}`}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          {product.ratings && (
            <div className="flex items-center bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-sm mr-2">
              <Star className="h-3 w-3 mr-0.5 fill-white" />
              <span>{product.ratings}</span>
            </div>
          )}
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-gray-800">{formatPrice(discountedPrice)}</span>
            {product.discount_percentage && product.discount_percentage > 0 && (
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
