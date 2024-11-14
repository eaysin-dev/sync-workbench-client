import FormCardSkeleton from "@/components/form-card-skeleton";
import PageContainer from "@/layout/root-layout/page-container";
import { Suspense } from "react";
import ProductForm from "../product-form";

export default function ProductViewPage() {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductForm />
        </Suspense>
      </div>
    </PageContainer>
  );
}
