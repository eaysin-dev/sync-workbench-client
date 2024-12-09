import { RootState } from "@/app/store";
import PageHeader from "@/components/heading/page-heading";
import DefaultModal from "@/components/modal/default-modal";
import { Separator } from "@/components/ui/separator";
import { rolesModalTypes } from "@/constants/modal-types";
import PageContainer from "@/layout/root-layout/page-container";
import { useSelector } from "react-redux";
import UserForm from "./_components/forms/user-create";
import UserEditForm from "./_components/forms/user-edit";
import RolesTable from "./_components/table";
import useRoleForm from "./hooks/use-create";
import useUser from "./hooks/use-user";

const RolesPage = () => {
  const { closeModal, handleOpenModal, isOpenCreateUsers } = useUser();
  const { editModal } = useSelector((state: RootState) => state.modal);

  const { form, isPending, onSubmit, errors } = useRoleForm();
  const isOpenEditUsers = editModal?.modalId === rolesModalTypes?.editRoles;

  return (
    <PageContainer scrollable>
      <PageHeader
        title="Roles"
        description="Manage Roles"
        onAction={handleOpenModal}
        actionLabel="Add New"
      />
      <Separator />
      <RolesTable />

      <DefaultModal
        title="Create Roles"
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

export default RolesPage;
