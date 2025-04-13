
import { useState, useEffect } from "react";
import {
  Users,
  MessageSquare,
  Package,
  ChevronDown,
  Search,
  LogOut,
  User
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllCustomers } from "@/services/customer.service";
import { getEmployeeComplaints } from "@/services/employee.service";
import { logout } from "@/services/auth.service";
import { Customer } from "@/types/models";
import { toast } from "sonner";

// Employee Dashboard Component
const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if user is logged in as employee
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");
    
    if (!isLoggedIn || userRole !== "employee") {
      toast.error("You must be logged in as an employee to access this page.");
      navigate("/login");
      return;
    }
    
    // Load data
    const loadData = async () => {
      try {
        const customersData = await getAllCustomers();
        setCustomers(customersData);
        
        const userId = localStorage.getItem("userId");
        if (userId) {
          const complaintsData = await getEmployeeComplaints(parseInt(userId));
          setComplaints(complaintsData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredCustomers = customers.filter(
    customer => 
      customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary">ShopperNexus</h1>
          <p className="text-sm text-gray-600">Employee Dashboard</p>
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/employee-dashboard">
                <Users className="h-5 w-5 mr-2" />
                Customers
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/employee-dashboard/complaints">
                <MessageSquare className="h-5 w-5 mr-2" />
                Complaints
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                E
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Employee</p>
                <p className="text-xs text-gray-500">employee@example.com</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center md:hidden">
              <Button variant="outline" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold text-primary">Employee Dashboard</h1>
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search customers..."
                  className="w-[300px] pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                      E
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/" className="flex w-full">Back to Store</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
              <p className="text-gray-600">
                View and manage customer information and requests
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-lg">Loading data...</p>
              </div>
            ) : (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Customers</CardTitle>
                    <CardDescription>
                      List of all registered customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomers.length > 0 ? (
                          filteredCustomers.map((customer) => (
                            <TableRow key={customer.customer_id}>
                              <TableCell className="font-medium">{customer.customer_id}</TableCell>
                              <TableCell>{`${customer.first_name} ${customer.last_name}`}</TableCell>
                              <TableCell>{customer.email}</TableCell>
                              <TableCell>{customer.city || "Not specified"}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>View Orders</DropdownMenuItem>
                                    <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center">
                              {searchTerm.length > 0 ? "No customers match your search" : "No customers found"}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Customer Requests</CardTitle>
                    <CardDescription>
                      Customer support requests that need attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Request ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {complaints.length > 0 ? (
                          complaints.map((complaint) => (
                            <TableRow key={complaint.Complaint_No}>
                              <TableCell className="font-medium">{`REQ-${complaint.Complaint_No}`}</TableCell>
                              <TableCell>{`${complaint.Customer?.First_Name || ""} ${complaint.Customer?.Last_Name || ""}`}</TableCell>
                              <TableCell>{complaint.Orders ? "Order Issue" : "General Inquiry"}</TableCell>
                              <TableCell>
                                <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                                  Pending
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  Process
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center">No customer requests found</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

// Menu icon for mobile display
const Menu = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
