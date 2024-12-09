import { Heading } from "@/components/heading/heading";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import PageContainer from "@/layout/root-layout/page-container";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import ProductListingPage from "./_components/product-listing";
import ProductTableAction from "./_components/product-tables/product-table-action";

const ProductPage = () => {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Products"
            description="Manage products (Server side table functionalities.)"
          />
          <Link
            to="/dashboard/product/new"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ProductTableAction />
        <Suspense
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ProductListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default ProductPage;
