import PageContainer from "@/layout/root-layout/page-container";
import ProfileCreateForm from "./_components/profile-create-form";

export default function ProfileViewPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <ProfileCreateForm categories={[]} initialData={null} />
      </div>
    </PageContainer>
  );
}
