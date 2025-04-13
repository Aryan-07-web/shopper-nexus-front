
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { logout } from "@/services/auth.service";
import { getCartItems } from "@/services/cart.service";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  useEffect(() => {
    // Check authentication state
    const checkAuth = async () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const role = localStorage.getItem("userRole");
      setIsLoggedIn(loggedIn);
      setUserRole(role);
      
      // If logged in as customer, get cart count
      if (loggedIn && role === "customer") {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const items = await getCartItems(parseInt(userId));
          setCartItemCount(items.length);
        }
      }
    };
    
    checkAuth();
  }, []);
  
  const handleProfileClick = () => {
    if (isLoggedIn) {
      // Redirect based on role
      if (userRole === "admin") {
        navigate("/dashboard");
      } else if (userRole === "employee") {
        navigate("/employee-dashboard");
      } else if (userRole === "vendor") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/profile");
      }
    } else {
      toast.info("Please log in or register to view your profile", {
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });
    }
  };
  
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserRole(null);
    toast.success("Logged out successfully");
    navigate("/");
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      toast.success(`Searching for "${searchQuery}"`);
    } else {
      toast.error("Please enter a search term");
    }
  };
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:text-yellow-300">
            <span className="mr-1">E</span>-Commerce
          </Link>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search for products..." 
                className="pl-9 w-full" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            <Link to="/products" className="px-3 py-2 text-sm hover:text-yellow-300 transition-colors">
              Products
            </Link>
            
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="px-3 py-2 text-sm hover:text-yellow-300 transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="px-3 py-2 text-sm hover:text-yellow-300 transition-colors">
                  Register
                </Link>
              </>
            ) : (
              <Button 
                variant="ghost"
                className="px-3 py-2 text-sm hover:text-yellow-300 text-white hover:bg-transparent transition-colors"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
            
            {userRole === "customer" && (
              <Link to="/cart">
                <Button variant="outline" size="icon" className="relative bg-white/10 hover:bg-white/20 border-white/20">
                  <ShoppingCart className="h-5 w-5 text-white" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-800 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            )}
            
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/10 hover:bg-white/20 border-white/20"
              onClick={handleProfileClick}
            >
              <User className="h-5 w-5 text-white" />
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {userRole === "customer" && (
              <Link to="/cart">
                <Button variant="outline" size="icon" className="relative bg-white/10 hover:bg-white/20 border-white/20">
                  <ShoppingCart className="h-5 w-5 text-white" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-800 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search - Visible only on mobile */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for products..." 
              className="pl-9 w-full bg-white/10 border-white/20 text-white placeholder:text-white/70" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-blue-700 to-indigo-800 pt-4 pb-6 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link to="/products" className="px-3 py-2 text-sm hover:text-yellow-300 transition-colors">
                Products
              </Link>
              
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="px-3 py-2 text-sm hover:text-yellow-300 transition-colors">
                    Log in
                  </Link>
                  <Link to="/register" className="px-3 py-2 text-sm hover:text-yellow-300 transition-colors">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  {userRole === "admin" && (
                    <Link to="/dashboard" className="px-3 py-2 text-sm hover:text-yellow-300 transition-colors">
                      Admin Dashboard
                    </Link>
                  )}
                  {userRole === "employee" && (
                    <Link to="/employee-dashboard" className="px-3 py-2 text-sm hover:text-yellow-300 transition-colors">
                      Employee Dashboard
                    </Link>
                  )}
                  {userRole === "vendor" && (
                    <Link to="/vendor-dashboard" className="px-3 py-2 text-sm hover:text-yellow-300 transition-colors">
                      Vendor Dashboard
                    </Link>
                  )}
                  {userRole === "customer" && (
                    <Link to="/profile" className="px-3 py-2 text-sm hover:text-yellow-300 transition-colors">
                      My Profile
                    </Link>
                  )}
                  <Button 
                    variant="ghost"
                    className="justify-start px-3 py-2 text-sm text-white hover:text-yellow-300 hover:bg-transparent transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
