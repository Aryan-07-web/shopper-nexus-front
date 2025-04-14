
import { useState } from "react";
import { 
  Users,
  ShoppingBag,
  MessageSquare,
  Package,
  ChevronDown,
  BarChart3,
  LogOut,
  User
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
import { products, orders, users } from "@/lib/data";

// Dashboard Stats for Admin View
const StatsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users.filter(u => u.role === "customer").length}</div>
          <p className="text-xs text-muted-foreground">
            +10% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{orders.length}</div>
          <p className="text-xs text-muted-foreground">
            +20% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Shipments</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {orders.filter(order => order.status === "pending").length}
          </div>
          <p className="text-xs text-muted-foreground">
            -5% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Complaints</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">
            +2 new since yesterday
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Recent Orders Table
const RecentOrdersTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          Overview of the latest customer orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const customer = users.find(user => user.id === order.userId);
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{customer?.name || "Unknown"}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Inventory Table
const InventoryTable = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Inventory Status</CardTitle>
          <CardDescription>
            Current stock levels for all products
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.slice(0, 5).map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    product.stock > 20
                      ? "bg-green-100 text-green-800"
                      : product.stock > 0
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {product.stock > 20
                      ? "In Stock"
                      : product.stock > 0
                      ? "Low Stock"
                      : "Out of Stock"}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Customer Management Component
const CustomersTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Management</CardTitle>
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
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : user.role === "employee"
                      ? "bg-blue-100 text-blue-800"
                      : user.role === "vendor"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Complaints Management Component
const ComplaintsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Complaints Management</CardTitle>
        <CardDescription>
          View and manage all customer complaints
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Complaint ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">CMP-001</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>Product Damaged During Shipping</TableCell>
              <TableCell>2023-04-10</TableCell>
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
              <TableCell>2023-04-09</TableCell>
              <TableCell>
                <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">
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
              <TableCell>2023-04-08</TableCell>
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
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [activeView, setActiveView] = useState<string>("dashboard");
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary">ShopperNexus</h1>
          <p className="text-sm text-gray-600">Admin Dashboard</p>
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <div className="space-y-1">
            <Button 
              variant={activeView === "dashboard" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveView("dashboard")}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant={activeView === "orders" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveView("orders")}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Orders
            </Button>
            <Button 
              variant={activeView === "products" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveView("products")}
            >
              <Package className="h-5 w-5 mr-2" />
              Products
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
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
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
              <h1 className="text-xl font-bold text-primary">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-1" />
                Switch Role
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                      A
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/" className="flex w-full">Back to Store</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {activeView === "dashboard" && "Welcome back, Admin!"}
                {activeView === "orders" && "Orders Management"}
                {activeView === "products" && "Products Management"}
                {activeView === "customers" && "Customer Management"}
                {activeView === "complaints" && "Complaints Management"}
              </h1>
              <p className="text-gray-600">
                {activeView === "dashboard" && "Here's what's happening in your store today."}
                {activeView === "orders" && "View and manage all customer orders."}
                {activeView === "products" && "View and manage your product inventory."}
                {activeView === "customers" && "View and manage all registered customers."}
                {activeView === "complaints" && "Handle and resolve customer complaints."}
              </p>
            </div>
            
            {activeView === "dashboard" && (
              <div className="space-y-8">
                <StatsCards />
                <Tabs defaultValue="orders">
                  <TabsList className="mb-4">
                    <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  </TabsList>
                  <TabsContent value="orders">
                    <RecentOrdersTable />
                  </TabsContent>
                  <TabsContent value="inventory">
                    <InventoryTable />
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {activeView === "orders" && <RecentOrdersTable />}
            {activeView === "products" && <InventoryTable />}
            {activeView === "customers" && <CustomersTable />}
            {activeView === "complaints" && <ComplaintsTable />}
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
