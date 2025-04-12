
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            ShopperNexus
          </Link>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for products..." className="pl-9 w-full" />
            </div>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            <Link to="/products" className="px-3 py-2 text-sm hover:text-primary">
              Products
            </Link>
            <Link to="/login" className="px-3 py-2 text-sm hover:text-primary">
              Log in
            </Link>
            <Link to="/register" className="px-3 py-2 text-sm hover:text-primary">
              Register
            </Link>
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search - Visible only on mobile */}
        <div className="mt-4 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for products..." className="pl-9 w-full" />
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white pt-4 pb-6 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link to="/products" className="px-3 py-2 text-sm hover:text-primary">
                Products
              </Link>
              <Link to="/login" className="px-3 py-2 text-sm hover:text-primary">
                Log in
              </Link>
              <Link to="/register" className="px-3 py-2 text-sm hover:text-primary">
                Register
              </Link>
              <Link to="/profile" className="px-3 py-2 text-sm hover:text-primary">
                My Profile
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
