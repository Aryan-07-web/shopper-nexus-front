
import { useState } from "react";
import {
  Package,
  TruckIcon,
  LogOut,
  Edit,
  Plus,
  Warehouse
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
import { products } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Vendor Dashboard Component
const VendorDashboard = () => {
  const [activeView, setActiveView] = useState("products");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary">ShopperNexus</h1>
          <p className="text-sm text-gray-600">Vendor Dashboard</p>
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <div className="space-y-1">
            <Button 
              variant={activeView === "products" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveView("products")}
            >
              <Package className="h-5 w-5 mr-2" />
              My Products
            </Button>
            <Button 
              variant={activeView === "inventory" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveView("inventory")}
            >
              <Warehouse className="h-5 w-5 mr-2" />
              Warehouse Stock
            </Button>
            <Button 
              variant={activeView === "shipments" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveView("shipments")}
            >
              <TruckIcon className="h-5 w-5 mr-2" />
              Shipments
            </Button>
          </div>
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                V
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Vendor</p>
                <p className="text-xs text-gray-500">vendor@example.com</p>
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
              <h1 className="text-xl font-bold text-primary">Vendor Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                      V
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
                  <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeView} onValueChange={setActiveView}>
              <TabsList className="mb-8">
                <TabsTrigger value="products">My Products</TabsTrigger>
                <TabsTrigger value="inventory">Warehouse Stock</TabsTrigger>
                <TabsTrigger value="shipments">Shipments</TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">My Products</h1>
                    <p className="text-gray-600">
                      Manage your product catalog
                    </p>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </div>
                
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Catalog</CardTitle>
                      <CardDescription>
                        All products you offer on the marketplace
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.slice(0, 5).map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.id}</TableCell>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>₹{product.price.toFixed(2)}</TableCell>
                              <TableCell>
                                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  product.stock > 0
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {product.stock > 0
                                    ? "Active"
                                    : "Inactive"}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-3.5 w-3.5 mr-1" />
                                  Update
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="inventory">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Warehouse Inventory</h1>
                    <p className="text-gray-600">
                      Manage your product inventory across warehouses
                    </p>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Stock
                  </Button>
                </div>
                
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Stock Status</CardTitle>
                      <CardDescription>
                        Current inventory levels for your products
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Warehouse</TableHead>
                            <TableHead>Current Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.slice(0, 5).map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.id}</TableCell>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>Warehouse 1</TableCell>
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
                                <Button variant="outline" size="sm">
                                  <Edit className="h-3.5 w-3.5 mr-1" />
                                  Update
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="shipments">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Shipments</h1>
                  <p className="text-gray-600">
                    Track and manage product shipments
                  </p>
                </div>
                
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Shipments</CardTitle>
                      <CardDescription>
                        Status of your recent product shipments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Shipment ID</TableHead>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Products</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">SHP-001</TableCell>
                            <TableCell>ORD-1234</TableCell>
                            <TableCell>3 items</TableCell>
                            <TableCell>Mumbai, Maharashtra</TableCell>
                            <TableCell>
                              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">
                                In Transit
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Track
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">SHP-002</TableCell>
                            <TableCell>ORD-1235</TableCell>
                            <TableCell>1 item</TableCell>
                            <TableCell>Delhi, NCR</TableCell>
                            <TableCell>
                              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                                Processing
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">SHP-003</TableCell>
                            <TableCell>ORD-1236</TableCell>
                            <TableCell>2 items</TableCell>
                            <TableCell>Bangalore, Karnataka</TableCell>
                            <TableCell>
                              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                                Delivered
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Details
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

export default VendorDashboard;

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
