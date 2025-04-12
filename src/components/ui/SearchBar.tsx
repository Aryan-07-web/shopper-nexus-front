
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      toast.success(`Searching for "${query}"`);
    } else {
      toast.error("Please enter a search term");
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto w-full">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-12"
          />
        </div>
        <Button type="submit" className="h-12">
          Search
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="h-12" 
          aria-label="Advanced filters"
          onClick={() => toast.info("Advanced filters coming soon")}
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
