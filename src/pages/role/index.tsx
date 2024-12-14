import { RootState } from "@/app/store";
import PageHeader from "@/components/heading/page-heading";
import DefaultModal from "@/components/modal/default-modal";
import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/ui/table/data-table";
import { rolesModalTypes } from "@/constants/modal-types";
import { useReadRolesQuery } from "@/features/role/role-api";
import useCloseModal from "@/hooks/use-close-modal";
import usePagination from "@/hooks/use-pagination";
import { useTableFilter } from "@/hooks/use-table-filters";
import PageContainer from "@/layout/root-layout/page-container";
import { useSelector } from "react-redux";
import UserForm from "./_components/forms/user-create";
import UserEditForm from "./_components/forms/user-edit";
import { columns } from "./_components/table/columns";
import Filters from "./_components/table/filters";
import useRoleForm from "./hooks/use-create";
import useUser from "./hooks/use-user";

const RolesPage = () => {
  const { handleOpenModal, isOpenCreateUsers } = useUser();
  const { closeAllModals } = useCloseModal();
  const { editModal } = useSelector((state: RootState) => state.modal);

  const { form, isPending, onSubmit, errors } = useRoleForm({ mode: "edit" });
  const isOpenEditUsers = editModal?.modalId === rolesModalTypes?.editRoles;

  const {
    searchQuery,
    isAnyFilterActive,
    resetFilters,
    setSearchQuery,
    setPage,
    sortBy,
    sortType,
  } = useTableFilter();

  const {
    handlePageChange,
    handlePageSizeChange,
    paginationState,
    currentPage,
    pageSize,
  } = usePagination({});

  const { data: roles } = useReadRolesQuery({
    limit: pageSize,
    page: currentPage,
    populate: ["role"],
    searchQuery: searchQuery || "",
    sortBy: sortBy || "",
    sortType: sortType || "asc",
  });

  return (
    <PageContainer scrollable>
      <PageHeader
        title="Roles"
        description="Manage Roles"
        onAction={handleOpenModal}
        actionLabel="Add New"
      />
      <Separator />

      <div className="space-y-4">
        <Filters
          isAnyFilterActive={isAnyFilterActive}
          resetFilters={resetFilters}
          searchQuery={searchQuery}
          setPage={setPage}
          setSearchQuery={setSearchQuery}
        />

        <DataTable columns={columns} data={roles?.data || []} />

        <Pagination
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          paginationState={paginationState}
          totalItems={roles?.data?.length || 0}
        />
      </div>

      <DefaultModal
        title="Create Roles"
        description="description"
        opened={isOpenCreateUsers}
        onClose={closeAllModals}
        size="xl"
      >
        <UserForm />
      </DefaultModal>

      <DefaultModal
        opened={isOpenEditUsers}
        onClose={closeAllModals}
        title="Edit User"
      >
        <UserEditForm
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
          errors={errors}
          onClose={closeAllModals}
        />
      </DefaultModal>
    </PageContainer>
  );
};

export default RolesPage;
