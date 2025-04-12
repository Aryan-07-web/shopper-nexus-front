
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
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
        <Button type="button" variant="outline" className="h-12" aria-label="Advanced filters">
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
