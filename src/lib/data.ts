import { Product as ProductModel } from "@/types/models";

export type Product = {
  id: string;
  name: string;
  category: "electronics" | "clothing" | "groceries";
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  description: string;
  features?: string[];
  images: string[];
  product_id: number; // Added property to match the model
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "employee" | "admin";
};

export type Order = {
  id: string;
  userId: string;
  products: { productId: string; quantity: number }[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered";
  orderDate: string;
};

export type Category = {
  id: string;
  name: string;
  image: string;
};

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "cat-2",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNsb3RoaW5nfGVufDB8fDB8fHww"
  },
  {
    id: "cat-3",
    name: "Groceries",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyaWVzfGVufDB8fDB8fHww"
  }
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Smartphone Pro Max",
    category: "electronics",
    price: 999.99,
    discountPercentage: 10,
    rating: 4.8,
    stock: 50,
    brand: "TechGiant",
    description: "The latest smartphone with advanced camera system and all-day battery life.",
    features: [
      "6.7-inch Super Display",
      "Triple camera system",
      "5G connectivity",
      "256GB storage",
      "Water resistant"
    ],
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1598327105854-0e05b0ccb219?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D"
    ],
    product_id: 1
  },
  {
    id: "prod-2",
    name: "Ultra HD Smart TV",
    category: "electronics",
    price: 1499.99,
    discountPercentage: 15,
    rating: 4.5,
    stock: 30,
    brand: "ViewMaster",
    description: "Crystal clear 4K resolution with smart features and voice control.",
    features: [
      "65-inch 4K display",
      "Smart TV capabilities",
      "Voice control",
      "Multiple HDMI ports",
      "Dolby Vision"
    ],
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjB0dnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB0dnxlbnwwfHwwfHx8MA%3D%3D"
    ],
    product_id: 2
  },
  {
    id: "prod-3",
    name: "Lightweight Laptop Pro",
    category: "electronics",
    price: 1299.99,
    discountPercentage: 8,
    rating: 4.7,
    stock: 40,
    brand: "ByteBook",
    description: "Powerful yet lightweight laptop for professionals and creatives.",
    features: [
      "13.3-inch Retina display",
      "16GB RAM",
      "512GB SSD storage",
      "10-hour battery life",
      "Backlit keyboard"
    ],
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wJTIwb24lMjBkZXNrfGVufDB8fDB8fHww"
    ],
    product_id: 3
  },
  {
    id: "prod-4",
    name: "Casual Cotton T-Shirt",
    category: "clothing",
    price: 24.99,
    discountPercentage: 0,
    rating: 4.3,
    stock: 200,
    brand: "ComfortWear",
    description: "Soft, comfortable cotton t-shirt for everyday wear.",
    features: [
      "100% cotton",
      "Machine washable",
      "Available in multiple colors",
      "Crew neck",
      "Regular fit"
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww"
    ],
    product_id: 4
  },
  {
    id: "prod-5",
    name: "Designer Jeans",
    category: "clothing",
    price: 89.99,
    discountPercentage: 20,
    rating: 4.6,
    stock: 120,
    brand: "UrbanStyle",
    description: "Premium denim jeans with perfect fit and style.",
    features: [
      "Premium denim",
      "Slim fit",
      "Five-pocket design",
      "Zip fly with button closure",
      "Versatile dark wash"
    ],
    images: [
      "https://images.unsplash.com/photo-1551854838-212c9a5fde3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amVhbnN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D"
    ],
    product_id: 5
  },
  {
    id: "prod-6",
    name: "Winter Jacket",
    category: "clothing",
    price: 149.99,
    discountPercentage: 15,
    rating: 4.5,
    stock: 75,
    brand: "NorthSide",
    description: "Warm and stylish jacket for cold winter days.",
    features: [
      "Water-resistant outer shell",
      "Thermal insulation",
      "Adjustable hood",
      "Multiple pockets",
      "Machine washable"
    ],
    images: [
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2ludGVyJTIwamFja2V0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1611080541496-53fc707cab1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2ludGVyJTIwamFja2V0fGVufDB8fDB8fHww"
    ],
    product_id: 6
  },
  {
    id: "prod-7",
    name: "Organic Bananas",
    category: "groceries",
    price: 1.99,
    discountPercentage: 0,
    rating: 4.2,
    stock: 500,
    brand: "NaturaFood",
    description: "Fresh, organic bananas. Perfect for snacking or baking.",
    features: [
      "Organic certified",
      "No pesticides",
      "Rich in potassium",
      "Ethically sourced",
      "Approximately 5-7 per bunch"
    ],
    images: [
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1603833797131-3c0a18fcb6b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFuYW5hc3xlbnwwfHwwfHx8MA%3D%3D"
    ],
    product_id: 7
  },
  {
    id: "prod-8",
    name: "Premium Coffee Beans",
    category: "groceries",
    price: 14.99,
    discountPercentage: 5,
    rating: 4.8,
    stock: 150,
    brand: "MountainBrew",
    description: "Specialty coffee beans from high-altitude farms for the perfect cup.",
    features: [
      "Single-origin",
      "Medium roast",
      "Ethically sourced",
      "Rich flavor profile",
      "1lb bag, whole bean"
    ],
    images: [
      "https://images.unsplash.com/photo-1559525850-c71f69f8bcf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwYmVhbnN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZmZlZSUyMGJlYW5zfGVufDB8fDB8fHww"
    ],
    product_id: 8
  },
  {
    id: "prod-9",
    name: "Organic Vegetable Box",
    category: "groceries",
    price: 29.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 50,
    brand: "FarmFresh",
    description: "Weekly subscription box with seasonal organic vegetables.",
    features: [
      "100% organic",
      "Locally sourced",
      "Seasonal selection",
      "Supports local farmers",
      "Approximately 8-10 items per box"
    ],
    images: [
      "https://images.unsplash.com/photo-1543168256-418811576931?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b3JnYW5pYyUyMHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG9yZ2FuaWMlMjB2ZWdldGFibGVzfGVufDB8fDB8fHww"
    ],
    product_id: 9
  }
];

export const users: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: "customer"
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "employee"
  },
  {
    id: "user-3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin"
  }
];

export const orders: Order[] = [
  {
    id: "order-1",
    userId: "user-1",
    products: [
      { productId: "prod-1", quantity: 1 },
      { productId: "prod-4", quantity: 2 }
    ],
    totalAmount: 1049.97,
    status: "delivered",
    orderDate: "2023-03-15"
  },
  {
    id: "order-2",
    userId: "user-1",
    products: [
      { productId: "prod-3", quantity: 1 },
      { productId: "prod-7", quantity: 3 }
    ],
    totalAmount: 1305.96,
    status: "shipped",
    orderDate: "2023-03-28"
  },
  {
    id: "order-3",
    userId: "user-1",
    products: [
      { productId: "prod-2", quantity: 1 },
      { productId: "prod-8", quantity: 2 }
    ],
    totalAmount: 1529.97,
    status: "pending",
    orderDate: "2023-04-05"
  }
];

// Helper functions adapted to work with both Product types
export const formatPrice = (price: number): string => {
  return `₹${price.toFixed(2)}`;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getDiscountedPrice = (product: Product): number => {
  if (!product.discountPercentage) return product.price;
  
  const discountAmount = product.price * (product.discountPercentage / 100);
  return Number((product.price - discountAmount).toFixed(2));
};

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getNewArrivals = (): Product[] => {
  // In a real app, this would filter by date added
  return products.slice(0, 4);
};

export const getBestSellers = (): Product[] => {
  // In a real app, this would be ordered by sales volume
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
};

// Function to convert the Product type to ProductModel type for backend compatibility
export const convertToProductModel = (product: Product): ProductModel => {
  return {
    product_id: product.product_id,
    price: product.price,
    details: product.description,
    photos: product.images.join(','),
    category: product.category,
    ratings: product.rating,
    discount_percentage: product.discountPercentage,
    // Default values for other required fields
    gst: 0
  };
};

// Function to convert ProductModel to Product for frontend display
export const convertToFrontendProduct = (productModel: ProductModel): Product => {
  return {
    id: productModel.product_id.toString(),
    product_id: productModel.product_id,
    name: productModel.details?.substring(0, 30) || `Product #${productModel.product_id}`,
    category: (productModel.category || "electronics") as "electronics" | "clothing" | "groceries",
    price: productModel.price,
    discountPercentage: productModel.discount_percentage,
    rating: productModel.ratings || 0,
    stock: 0, // Default value
    brand: "",  // Default value
    description: productModel.details || "",
    images: productModel.photos ? productModel.photos.split(',') : []
  };
};
