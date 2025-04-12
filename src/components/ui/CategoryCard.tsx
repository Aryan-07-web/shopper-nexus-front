
import { Link } from "react-router-dom";
import { Category } from "@/lib/data";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/products?category=${category.name.toLowerCase()}`} className="block group">
      <div className="relative rounded-xl overflow-hidden">
        <div className="aspect-square">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
          <h3 className="text-white text-xl font-bold">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
