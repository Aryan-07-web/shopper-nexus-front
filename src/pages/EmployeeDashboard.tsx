
import { useState } from "react";
import {
  Users,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { users } from "@/lib/data";

// Employee Dashboard Component
const EmployeeDashboard = () => {
  const [activeView, setActiveView] = useState("customers");

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
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                E
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">Employee</p>
                <p className="text-xs text-gray-500">employee@example.com</p>
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
              <h1 className="text-xl font-bold text-primary">Employee Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
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
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="complaints">Complaints</TabsTrigger>
              </TabsList>
              
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
                              <TableCell>{user.city || "Not specified"}</TableCell>
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
