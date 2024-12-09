import { ColumnDef } from "@tanstack/react-table";
// constants/data.ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

// Function to generate a single fake product
function generateFakeProduct(id: number): Product {
  const categories = ["Electronics", "Books", "Clothing", "Home", "Sports"];
  const category = categories[Math.floor(Math.random() * categories?.length)];

  return {
    id,
    name: `Product ${id}`,
    category,
    price: parseFloat((Math.random() * 100).toFixed(2)), // Random price between 0 and 100
    stock: Math.floor(Math.random() * 200), // Random stock quantity
    description: `Description of product ${id} in the ${category} category.`,
  };
}

// Function to get multiple fake products
export const fakeProducts = {
  getProducts: async (filters: { page: number; limit: number }) => {
    const { page, limit } = filters;
    const start = (page - 1) * limit;
    const products = Array.from({ length: limit }, (_, index) =>
      generateFakeProduct(start + index + 1)
    );

    return {
      total_products: 1000, // Assume there are 1000 products in total
      products,
    };
  },
};

// components/product-tables/columns.ts

export const columns: ColumnDef<Product, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => info.getValue(),
  },
];
