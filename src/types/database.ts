
// This is a simplified representation of your database schema in TypeScript
export type Database = {
  public: {
    Tables: {
      Customer: {
        Row: {
          Customer_id: number;
          First_Name: string;
          Last_Name: string;
          Contact_no: string;
          Email: string;
          Password: string;
          House_No?: string | null;
          Local_Area?: string | null;
          Pin_Code?: string | null;
          City?: string | null;
        };
        Insert: {
          Customer_id?: number;
          First_Name: string;
          Last_Name: string;
          Contact_no: string;
          Email: string;
          Password: string;
          House_No?: string | null;
          Local_Area?: string | null;
          Pin_Code?: string | null;
          City?: string | null;
        };
        Update: {
          Customer_id?: number;
          First_Name?: string;
          Last_Name?: string;
          Contact_no?: string;
          Email?: string;
          Password?: string;
          House_No?: string | null;
          Local_Area?: string | null;
          Pin_Code?: string | null;
          City?: string | null;
        };
      };
      Coupon: {
        Row: {
          Coupon_id: number;
          Discount_percentage: number;
        };
        Insert: {
          Coupon_id?: number;
          Discount_percentage: number;
        };
        Update: {
          Coupon_id?: number;
          Discount_percentage?: number;
        };
      };
      Cart: {
        Row: {
          Customer_id: number;
          Total_product: number;
          Total_cost: number;
          Coupon_id?: number | null;
        };
        Insert: {
          Customer_id: number;
          Total_product?: number;
          Total_cost?: number;
          Coupon_id?: number | null;
        };
        Update: {
          Customer_id?: number;
          Total_product?: number;
          Total_cost?: number;
          Coupon_id?: number | null;
        };
      };
      Orders: {
        Row: {
          Order_id: number;
          Tax: number;
          Order_cost: number;
          Discount_percentage: number;
        };
        Insert: {
          Order_id?: number;
          Tax: number;
          Order_cost: number;
          Discount_percentage: number;
        };
        Update: {
          Order_id?: number;
          Tax?: number;
          Order_cost?: number;
          Discount_percentage?: number;
        };
      };
      Employee: {
        Row: {
          Employee_id: number;
          First_Name: string;
          Last_Name: string;
          Email: string;
          Department?: string | null;
          City?: string | null;
          Pin_Code?: string | null;
          House_No?: string | null;
          Local_Area?: string | null;
          Date_of_Joining?: string | null;
          Age?: number | null;
          Date_of_Birth?: string | null;
          Gender?: string | null;
        };
        Insert: {
          Employee_id?: number;
          First_Name: string;
          Last_Name: string;
          Email: string;
          Department?: string | null;
          City?: string | null;
          Pin_Code?: string | null;
          House_No?: string | null;
          Local_Area?: string | null;
          Date_of_Joining?: string | null;
          Age?: number | null;
          Date_of_Birth?: string | null;
          Gender?: string | null;
        };
        Update: {
          Employee_id?: number;
          First_Name?: string;
          Last_Name?: string;
          Email?: string;
          Department?: string | null;
          City?: string | null;
          Pin_Code?: string | null;
          House_No?: string | null;
          Local_Area?: string | null;
          Date_of_Joining?: string | null;
          Age?: number | null;
          Date_of_Birth?: string | null;
          Gender?: string | null;
        };
      };
      Vendor: {
        Row: {
          Vendor_id: number;
          Name: string;
          Contact_No: string;
          City?: string | null;
          Local_Area?: string | null;
          Pin_Code?: string | null;
        };
        Insert: {
          Vendor_id?: number;
          Name: string;
          Contact_No: string;
          City?: string | null;
          Local_Area?: string | null;
          Pin_Code?: string | null;
        };
        Update: {
          Vendor_id?: number;
          Name?: string;
          Contact_No?: string;
          City?: string | null;
          Local_Area?: string | null;
          Pin_Code?: string | null;
        };
      };
      Product: {
        Row: {
          Product_id: number;
          Price: number;
          Details?: string | null;
          Photos?: string | null;
          Category?: string | null;
          Ratings?: number | null;
          Discount_percentage?: number | null;
          GST?: number | null;
        };
        Insert: {
          Product_id?: number;
          Price: number;
          Details?: string | null;
          Photos?: string | null;
          Category?: string | null;
          Ratings?: number | null;
          Discount_percentage?: number | null;
          GST?: number | null;
        };
        Update: {
          Product_id?: number;
          Price?: number;
          Details?: string | null;
          Photos?: string | null;
          Category?: string | null;
          Ratings?: number | null;
          Discount_percentage?: number | null;
          GST?: number | null;
        };
      };
      Clothing: {
        Row: {
          Product_id: number;
          Fabric?: string | null;
          Gender?: string | null;
          Size?: string | null;
        };
        Insert: {
          Product_id: number;
          Fabric?: string | null;
          Gender?: string | null;
          Size?: string | null;
        };
        Update: {
          Product_id?: number;
          Fabric?: string | null;
          Gender?: string | null;
          Size?: string | null;
        };
      };
      Groceries: {
        Row: {
          Product_id: number;
          Use_By_date?: string | null;
          Weight?: number | null;
        };
        Insert: {
          Product_id: number;
          Use_By_date?: string | null;
          Weight?: number | null;
        };
        Update: {
          Product_id?: number;
          Use_By_date?: string | null;
          Weight?: number | null;
        };
      };
      Electronics: {
        Row: {
          Product_id: number;
          Warranty_Period?: number | null;
          Manufacture_Date?: string | null;
          Manufacturing_City?: string | null;
          Power_Requirement?: string | null;
        };
        Insert: {
          Product_id: number;
          Warranty_Period?: number | null;
          Manufacture_Date?: string | null;
          Manufacturing_City?: string | null;
          Power_Requirement?: string | null;
        };
        Update: {
          Product_id?: number;
          Warranty_Period?: number | null;
          Manufacture_Date?: string | null;
          Manufacturing_City?: string | null;
          Power_Requirement?: string | null;
        };
      };
      Includes: {
        Row: {
          Order_id: number;
          Product_id: number;
          Quantity: number;
        };
        Insert: {
          Order_id: number;
          Product_id: number;
          Quantity: number;
        };
        Update: {
          Order_id?: number;
          Product_id?: number;
          Quantity?: number;
        };
      };
      Transaction: {
        Row: {
          Order_id: number;
          Status: string;
          Time: string;
          Customer_id: number;
        };
        Insert: {
          Order_id: number;
          Status: string;
          Time?: string;
          Customer_id: number;
        };
        Update: {
          Order_id?: number;
          Status?: string;
          Time?: string;
          Customer_id?: number;
        };
      };
      Contains: {
        Row: {
          Customer_id: number;
          product_id: number;
          quantity: number;
        };
        Insert: {
          Customer_id: number;
          product_id: number;
          quantity: number;
        };
        Update: {
          Customer_id?: number;
          product_id?: number;
          quantity?: number;
        };
      };
      WareHouse: {
        Row: {
          Warehouse_id: number;
          Plot_No?: string | null;
          City?: string | null;
          Contact_No?: string | null;
          Pin_Code?: string | null;
        };
        Insert: {
          Warehouse_id?: number;
          Plot_No?: string | null;
          City?: string | null;
          Contact_No?: string | null;
          Pin_Code?: string | null;
        };
        Update: {
          Warehouse_id?: number;
          Plot_No?: string | null;
          City?: string | null;
          Contact_No?: string | null;
          Pin_Code?: string | null;
        };
      };
      Stores: {
        Row: {
          Product_id: number;
          Warehouse_id: number;
          Stocks: number;
        };
        Insert: {
          Product_id: number;
          Warehouse_id: number;
          Stocks: number;
        };
        Update: {
          Product_id?: number;
          Warehouse_id?: number;
          Stocks?: number;
        };
      };
    };
  };
};
