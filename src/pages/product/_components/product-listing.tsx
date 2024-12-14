import DataTable from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { Product } from "@/constants/data";
import { fakeProducts } from "@/constants/mock-api";
import { useEffect, useState } from "react";
import { columns } from "./product-tables/columns";

const ProductListingPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products on component mount
    const fetchProducts = async () => {
      setLoading(true);
      const page = 1; // Example page, adjust based on your needs
      const pageLimit = 10;

      const { products, total_products: totalProducts } =
        await fakeProducts.getProducts({
          page,
          limit: pageLimit,
        });

      setProducts(products);
      setTotalProducts(totalProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <DataTableSkeleton columnCount={5} rowCount={10} />;

  return <DataTable columns={columns} data={products} />;
};

export default ProductListingPage;
