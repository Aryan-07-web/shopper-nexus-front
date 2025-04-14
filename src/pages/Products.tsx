import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Filter, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { products } from "@/lib/data";

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const searchParam = queryParams.get("search");
  
  // Filter state
  const [category, setCategory] = useState<string | null>(categoryParam);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortOption, setSortOption] = useState("featured");
  const [minRating, setMinRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  // Derived data
  const allBrands = [...new Set(products.map(product => product.brand))];
  
  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Category filter
    if (category) {
      result = result.filter(product => product.category === category);
    }
    
    // Search filter
    if (searchParam) {
      const searchLower = searchParam.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      );
    }
    
    // Price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Rating filter
    result = result.filter(product => product.rating >= minRating);
    
    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default is "featured", no sorting needed
        break;
    }
    
    setFilteredProducts(result);
  }, [category, searchParam, priceRange, minRating, selectedBrands, sortOption]);
  
  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  
  const clearFilters = () => {
    setCategory(null);
    setPriceRange([0, 2000]);
    setMinRating(0);
    setSelectedBrands([]);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {category 
                ? `${category.charAt(0).toUpperCase() + category.slice(1)}` 
                : searchParam 
                ? `Search results for "${searchParam}"` 
                : "All Products"}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} products found
            </p>
          </div>
          
          {/* Filter and Sort Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:w-auto w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down products based on your preferences
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-medium mb-3">Category</h3>
                    <Select value={category || ""} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="groceries">Groceries</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="mb-4">
                      <Slider
                        defaultValue={[0, 2000]}
                        value={priceRange}
                        max={2000}
                        step={10}
                        onValueChange={setPriceRange}
                        className="mb-6"
                      />
                      <div className="flex justify-between">
                        <div>
                          <span className="text-sm text-gray-500">Min:</span>
                          <span className="font-medium ml-1">₹{priceRange[0]}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Max:</span>
                          <span className="font-medium ml-1">₹{priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating Filter */}
                  <div>
                    <h3 className="font-medium mb-3">Rating</h3>
                    <Select 
                      value={minRating.toString()} 
                      onValueChange={(value) => setMinRating(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any Rating</SelectItem>
                        <SelectItem value="4">4★ & Above</SelectItem>
                        <SelectItem value="3">3★ & Above</SelectItem>
                        <SelectItem value="2">2★ & Above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Brand Filter */}
                  <div>
                    <h3 className="font-medium mb-3">Brands</h3>
                    <div className="space-y-2">
                      {allBrands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`brand-${brand}`}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                          />
                          <label htmlFor={`brand-${brand}`} className="ml-2 text-sm">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <SheetFooter>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                  <SheetClose asChild>
                    <Button className="w-full sm:w-auto">Apply Filters</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            
            {/* Sort Dropdown */}
            <div className="w-full sm:w-auto">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active Filters */}
          {(category || priceRange[0] > 0 || priceRange[1] < 2000 || minRating > 0 || selectedBrands.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {category && (
                <div className="bg-white shadow-sm rounded-full px-3 py-1 text-sm flex items-center">
                  Category: {category.charAt(0).toUpperCase() + category.slice(1)}
                  <button 
                    onClick={() => setCategory(null)} 
                    className="ml-2 text-gray-500 hover:text-gray-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                <div className="bg-white shadow-sm rounded-full px-3 py-1 text-sm flex items-center">
                  Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                  <button 
                    onClick={() => setPriceRange([0, 2000])} 
                    className="ml-2 text-gray-500 hover:text-gray-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {minRating > 0 && (
                <div className="bg-white shadow-sm rounded-full px-3 py-1 text-sm flex items-center">
                  Rating: {minRating}★ & Above
                  <button 
                    onClick={() => setMinRating(0)} 
                    className="ml-2 text-gray-500 hover:text-gray-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {selectedBrands.length > 0 && (
                <div className="bg-white shadow-sm rounded-full px-3 py-1 text-sm flex items-center">
                  Brands: {selectedBrands.length}
                  <button 
                    onClick={() => setSelectedBrands([])} 
                    className="ml-2 text-gray-500 hover:text-gray-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters} 
                className="text-sm"
              >
                Clear All
              </Button>
            </div>
          )}
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or search criteria
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
