import PageHeader from "@/components/heading/page-heading";
import DefaultModal from "@/components/modal/default-modal";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/layout/root-layout/page-container";
import UserForm from "./_components/forms/user-create";
import UserEditForm from "./_components/forms/user-edit";
import UsersTable from "./_components/table";
import useUser from "./_hooks/use-user";
import useUserEdit from "./_hooks/use-user-edit";

const UsersPage = () => {
  const { closeModal, handleOpenModal, isOpenCreateUsers, isOpenEditUsers } =
    useUser();

  const { form, isPending, onSubmit, errors } = useUserEdit();

  return (
    <PageContainer scrollable>
      <PageHeader
        title="Users"
        description="Manage users"
        onAction={handleOpenModal}
        actionLabel="Add New"
      />
      <Separator />
      <UsersTable />

      <DefaultModal
        title="Create Users"
        description="description"
        opened={isOpenCreateUsers}
        onClose={closeModal}
        size="xl"
      >
        <UserForm />
      </DefaultModal>

      <DefaultModal
        opened={isOpenEditUsers}
        onClose={closeModal}
        title="Edit User"
      >
        <UserEditForm
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
          errors={errors}
          onClose={closeModal}
        />
      </DefaultModal>
    </PageContainer>
  );
};

export default UsersPage;
