
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Dashboard from "@/pages/Dashboard";
import EmployeeDashboard from "@/pages/EmployeeDashboard";
import VendorDashboard from "@/pages/VendorDashboard";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

const queryClient = new QueryClient();

// Route guard components
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin");
    setLoading(false);
  }, []);
  
  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  
  return isAdmin ? <>{children}</> : <Navigate to="/login" replace />;
};

const EmployeeRoute = ({ children }: { children: React.ReactNode }) => {
  const [isEmployee, setIsEmployee] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is employee
    const userRole = localStorage.getItem("userRole");
    setIsEmployee(userRole === "employee");
    setLoading(false);
  }, []);
  
  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  
  return isEmployee ? <>{children}</> : <Navigate to="/login" replace />;
};

const VendorRoute = ({ children }: { children: React.ReactNode }) => {
  const [isVendor, setIsVendor] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is vendor
    const userRole = localStorage.getItem("userRole");
    setIsVendor(userRole === "vendor");
    setLoading(false);
  }, []);
  
  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  
  return isVendor ? <>{children}</> : <Navigate to="/login" replace />;
};

const CustomerRoute = ({ children }: { children: React.ReactNode }) => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is customer
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");
    setIsCustomer(isLoggedIn && (userRole === "customer" || !userRole)); // Backward compatibility
    setLoading(false);
  }, []);
  
  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  
  return isCustomer ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login defaultTab="register" />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CustomerRoute><Cart /></CustomerRoute>} />
          <Route path="/checkout" element={<CustomerRoute><Checkout /></CustomerRoute>} />
          <Route path="/profile" element={<CustomerRoute><Profile /></CustomerRoute>} />
          <Route path="/dashboard/*" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/employee-dashboard/*" element={<EmployeeRoute><EmployeeDashboard /></EmployeeRoute>} />
          <Route path="/vendor-dashboard/*" element={<VendorRoute><VendorDashboard /></VendorRoute>} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
