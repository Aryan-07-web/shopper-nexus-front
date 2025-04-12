
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCarousel from "@/components/ui/ProductCarousel";
import CategoryCard from "@/components/ui/CategoryCard";
import SearchBar from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/button";
import { categories, getNewArrivals, getBestSellers } from "@/lib/data";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Everything You Need, Delivered Fast
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Shop our extensive collection of electronics, clothing, and groceries all in one place with fast, reliable delivery.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
            <Link to="/products?category=electronics">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Explore Electronics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedCategories = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PromoBanner = () => {
  return (
    <section className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Limited Time Offer</h2>
            <p className="text-gray-300 mb-6">
              Get 20% off on all electronics. Use code TECH20 at checkout.
              Limited time offer, don't miss out!
            </p>
            <Link to="/products?category=electronics">
              <Button className="bg-white text-gray-900 hover:bg-gray-200">
                Shop Electronics
              </Button>
            </Link>
          </div>
          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D"
              alt="Electronics Promotion"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-8">
          <SearchBar />
        </div>
        
        <FeaturedCategories />
        
        <div className="container mx-auto px-4 py-12">
          <ProductCarousel 
            title="New Arrivals" 
            products={newArrivals} 
          />
        </div>
        
        <PromoBanner />
        
        <div className="container mx-auto px-4 py-12">
          <ProductCarousel 
            title="Best Sellers" 
            products={bestSellers} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
