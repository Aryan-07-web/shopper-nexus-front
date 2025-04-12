
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect personal information such as your name, email address, shipping address, 
              and payment information when you make a purchase or create an account.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use your information to process orders, provide customer service, 
              and send you updates about your order or account.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience on our website,
              analyze how our website is used, and improve our marketing efforts.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Information Sharing</h2>
            <p className="mb-4">
              We may share your information with third-party service providers who help us operate our business,
              such as payment processors and shipping companies.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-4">
              We take reasonable measures to protect your personal information from unauthorized access or disclosure.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights</h2>
            <p className="mb-4">
              You have the right to access, correct, or delete your personal information.
              To exercise these rights, please contact us at privacy@ecommerce.com.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will notify you of any significant changes.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our Privacy Policy, please contact us at privacy@ecommerce.com.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
