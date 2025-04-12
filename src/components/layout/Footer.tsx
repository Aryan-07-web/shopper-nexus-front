
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopperNexus</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for electronics, clothing, and groceries.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=electronics" className="text-gray-400 hover:text-primary">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="text-gray-400 hover:text-primary">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=groceries" className="text-gray-400 hover:text-primary">
                  Groceries
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-primary">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-primary">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-primary">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail size={18} className="text-gray-400 mt-0.5" />
                <span className="text-gray-400">support@shoppernexus.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone size={18} className="text-gray-400 mt-0.5" />
                <span className="text-gray-400">+91 1234567890</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>
        
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ShopperNexus. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-400 text-sm hover:text-primary">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/sitemap" className="text-gray-400 text-sm hover:text-primary">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
