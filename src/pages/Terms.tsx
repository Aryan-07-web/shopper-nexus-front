
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to E-Commerce. These Terms of Service govern your use of our website and services.
              By accessing or using our services, you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Account Registration</h2>
            <p className="mb-4">
              To access certain features of the website, you may be required to register for an account.
              You agree to provide accurate information and to keep your account secure.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Purchasing Products</h2>
            <p className="mb-4">
              When you make a purchase, you agree to provide accurate payment information.
              We reserve the right to refuse or cancel orders at our discretion.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Returns and Refunds</h2>
            <p className="mb-4">
              We offer returns and refunds in accordance with our Returns Policy.
              Please refer to our Returns Policy for more information.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              All content on this website is the property of E-Commerce and is protected by copyright laws.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Your continued use of the website
              after any changes constitutes your acceptance of the new Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at support@ecommerce.com.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
