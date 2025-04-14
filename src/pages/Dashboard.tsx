import { useState } from "react";
import {
  Users,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { users } from "@/lib/data";
// Import the DatabaseStatus component
import DatabaseStatus from "@/components/DatabaseStatus";

// Admin Dashboard Component
const Dashboard = () => {
  const [activeView, setActiveView] = useState("overview");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary">E-Commerce</h1>
          <p className="text-sm text-gray-600">Admin Dashboard</p>
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <div className="space-y-1">
            <Button 
              variant={activeView === "overview" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveView("overview")}
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Overview
            </Button>
            <Button 
              variant={activeView === "customers" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveView("customers")}
            >
              <Users className="h-5 w-5 mr-2" />
              Customers
            </Button>
            <Button 
              variant={activeView === "products" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveView("products")}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Products
            </Button>
            <Button 
              variant={activeView === "orders" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveView("orders")}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Orders
            </Button>
            <Button 
              variant={activeView === "complaints" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveView("complaints")}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Complaints
            </Button>
          </div>
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
            {/* <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button> */}
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
              <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                      A
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
                  {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/" className="flex w-full">Back to Store</Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <DatabaseStatus />
            
            <Tabs value={activeView} onValueChange={setActiveView}>
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="complaints">Complaints</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                  <p className="text-gray-600">
                    A summary of key metrics and recent activity
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Revenue</CardTitle>
                      <CardDescription>Over the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹24,579</div>
                      <div className="text-sm text-green-500">+12% from last month</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>New Customers</CardTitle>
                      <CardDescription>Number of new customers this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">324</div>
                      <div className="text-sm text-green-500">+8% from last month</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Orders</CardTitle>
                      <CardDescription>Number of orders placed this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4,508</div>
                      <div className="text-sm text-red-500">-3% from last month</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Complaints</CardTitle>
                      <CardDescription>Number of unresolved complaints</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">16</div>
                      <div className="text-sm text-yellow-500">No change from last month</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="customers">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
                  <p className="text-gray-600">
                    View and manage customer information and requests
                  </p>
                </div>
                
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
                            <TableHead>Location</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.filter(u => u.role === "customer").map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>Not specified</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      Actions
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
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="products">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Product Management</h1>
                  <p className="text-gray-600">
                    Add, edit, and manage products in the store
                  </p>
                </div>
                
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Products</CardTitle>
                      <CardDescription>
                        List of all available products
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">PROD-001</TableCell>
                            <TableCell>Awesome Gadget</TableCell>
                            <TableCell>Electronics</TableCell>
                            <TableCell>₹199.99</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">PROD-002</TableCell>
                            <TableCell>Comfort T-Shirt</TableCell>
                            <TableCell>Clothing</TableCell>
                            <TableCell>₹29.99</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">PROD-003</TableCell>
                            <TableCell>Fresh Apples</TableCell>
                            <TableCell>Groceries</TableCell>
                            <TableCell>₹2.49/lb</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="orders">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Order Management</h1>
                  <p className="text-gray-600">
                    View and manage customer orders
                  </p>
                </div>
                
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Orders</CardTitle>
                      <CardDescription>
                        List of all placed orders
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">ORD-001</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell>2023-08-15</TableCell>
                            <TableCell>₹249.97</TableCell>
                            <TableCell>
                              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                                Pending
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">ORD-002</TableCell>
                            <TableCell>Sarah Smith</TableCell>
                            <TableCell>2023-08-14</TableCell>
                            <TableCell>₹79.98</TableCell>
                            <TableCell>
                              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                                Completed
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">ORD-003</TableCell>
                            <TableCell>Michael Brown</TableCell>
                            <TableCell>2023-08-10</TableCell>
                            <TableCell>₹49.99</TableCell>
                            <TableCell>
                              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800">
                                Cancelled
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="complaints">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Customer Complaints</h1>
                  <p className="text-gray-600">
                    Manage and respond to customer complaints
                  </p>
                </div>
                
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Complaints</CardTitle>
                      <CardDescription>
                        Customer complaints that need attention
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Complaint ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Issue</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">CMP-001</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell>Product Damaged During Shipping</TableCell>
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
                          <TableRow>
                            <TableCell className="font-medium">CMP-002</TableCell>
                            <TableCell>Sarah Smith</TableCell>
                            <TableCell>Wrong Item Received</TableCell>
                            <TableCell>
                              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                                In Progress
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">CMP-003</TableCell>
                            <TableCell>Michael Brown</TableCell>
                            <TableCell>Refund Request</TableCell>
                            <TableCell>
                              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                                Resolved
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

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
