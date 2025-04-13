import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Login = ({ defaultTab }: { defaultTab?: "login" | "register" } = {}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "register">(defaultTab || (searchParams.get("tab") === "register" ? "register" : "login"));
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (tab === "login") {
      if (email === "test@example.com" && password === "password") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "customer");
        toast.success("Logged in successfully!");
        navigate("/");
      } else if (email === "admin@example.com" && password === "admin") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");
        toast.success("Admin logged in successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } else {
      toast.success("Registration successful! Please log in.");
      setTab("login");
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-md w-full mx-auto">
            <CardHeader className="flex flex-col space-y-1.5">
              <CardTitle className="text-2xl text-center">
                {tab === "login" ? "Login" : "Create an Account"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={tab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login" onClick={() => setTab("login")}>Login</TabsTrigger>
                  <TabsTrigger value="register" onClick={() => setTab("register")}>Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Logging In..." : "Login"}
                    </Button>
                    <div className="text-center text-sm text-gray-500">
                      <Link to="/terms" className="hover:underline">Terms of Service</Link> | <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="register">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Registering..." : "Register"}
                    </Button>
                    <div className="text-center text-sm text-gray-500">
                      <Link to="/terms" className="hover:underline">Terms of Service</Link> | <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
