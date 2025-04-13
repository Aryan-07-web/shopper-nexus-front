
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { formatPrice } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types/models";

interface UserData {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  house_no?: string;
  local_area?: string;
  pin_code?: string;
  city?: string;
  role: string;
}

const Profile = () => {
  // Mock user data - this would come from the database in a real app
  const [userData, setUserData] = useState<UserData>({
    customer_id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    contact_no: "1234567890",
    house_no: "123",
    local_area: "Main Street",
    pin_code: "100001",
    city: "New York",
    role: "customer"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [email, setEmail] = useState(userData.email);
  const [contactNo, setContactNo] = useState(userData.contact_no);
  const [houseNo, setHouseNo] = useState(userData.house_no || "");
  const [localArea, setLocalArea] = useState(userData.local_area || "");
  const [pinCode, setPinCode] = useState(userData.pin_code || "");
  const [city, setCity] = useState(userData.city || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate();
  
  // Mock orders - this would be fetched from the database in a real app
  const [userOrders, setUserOrders] = useState<Order[]>([
    {
      order_id: 1,
      tax: 25.00,
      order_cost: 500.00,
      discount_percentage: 10,
      status: "Completed",
      time: "2025-04-01T12:00:00",
      final_amount: 475.00
    },
    {
      order_id: 2,
      tax: 15.00,
      order_cost: 300.00,
      discount_percentage: 5,
      status: "Pending",
      time: "2025-04-05T14:30:00",
      final_amount: 300.00
    },
    {
      order_id: 3,
      tax: 10.00,
      order_cost: 200.00,
      discount_percentage: 0,
      status: "Completed",
      time: "2025-04-10T09:15:00",
      final_amount: 210.00
    }
  ]);
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      toast.error("Please log in to view your profile");
      navigate("/login");
    }
    
    // In a real app, we would fetch user data and orders from API/backend here
  }, [navigate]);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({
      ...userData,
      first_name: firstName,
      last_name: lastName,
      email: email,
      contact_no: contactNo,
      house_no: houseNo,
      local_area: localArea,
      pin_code: pinCode,
      city: city
    });
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    // In a real app, we would send the password change request to the API/backend
    toast.success("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    navigate("/login");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full text-white flex items-center justify-center text-4xl mb-4">
                  {userData.first_name.charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold">{userData.first_name} {userData.last_name}</p>
                <p className="text-sm text-gray-500">{userData.role}</p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" className="w-full" onClick={handleLogout}>Logout</Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-3">
              <Tabs defaultValue="details">
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Profile Details</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="orders">My Orders</TabsTrigger>
                  </TabsList>
                </CardHeader>
                
                <CardContent>
                  <TabsContent value="details">
                    {isEditing ? (
                      <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="contactNo">Contact Number</Label>
                          <Input
                            id="contactNo"
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="houseNo">House Number</Label>
                            <Input
                              id="houseNo"
                              value={houseNo}
                              onChange={(e) => setHouseNo(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="localArea">Area/Street</Label>
                            <Input
                              id="localArea"
                              value={localArea}
                              onChange={(e) => setLocalArea(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="pinCode">PIN Code</Label>
                            <Input
                              id="pinCode"
                              value={pinCode}
                              onChange={(e) => setPinCode(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Save Changes</Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                            <p className="mt-1">{userData.first_name}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                            <p className="mt-1">{userData.last_name}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Email</h3>
                          <p className="mt-1">{userData.email}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
                          <p className="mt-1">{userData.contact_no}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Address</h3>
                            <p className="mt-1">
                              {userData.house_no && `${userData.house_no}, `}
                              {userData.local_area && `${userData.local_area}, `}
                              {userData.city && `${userData.city}, `}
                              {userData.pin_code}
                            </p>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit">Change Password</Button>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="orders">
                    {userOrders.length > 0 ? (
                      <div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Order Cost</TableHead>
                              <TableHead>Discount</TableHead>
                              <TableHead>Tax</TableHead>
                              <TableHead>Final Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {userOrders.map((order) => (
                              <TableRow key={order.order_id}>
                                <TableCell className="font-medium">{order.order_id}</TableCell>
                                <TableCell>{new Date(order.time || "").toLocaleDateString()}</TableCell>
                                <TableCell>
                                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                    order.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}>
                                    {order.status}
                                  </div>
                                </TableCell>
                                <TableCell>{formatPrice(order.order_cost)}</TableCell>
                                <TableCell>{order.discount_percentage}%</TableCell>
                                <TableCell>{formatPrice(order.tax)}</TableCell>
                                <TableCell className="font-medium">{formatPrice(order.final_amount || 0)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                        <Button asChild>
                          <Link to="/products">Start Shopping</Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
