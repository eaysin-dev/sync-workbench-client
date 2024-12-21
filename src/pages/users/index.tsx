import PageHeader from "@/components/heading/page-heading";
import DefaultModal from "@/components/modal/default-modal";
import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import useModalClose from "@/hooks/use-close-modal";
import PageContainer from "@/layout/root-layout/page-container";
import UserForm from "./_components/forms/user-create";
import UserEditForm from "./_components/forms/user-edit";
import { columns } from "./_components/table/columns";
import Filters from "./_components/table/filters";
import useUserEdit from "./_hooks/use-user-edit";
import { useUsers } from "./_hooks/use-users";
import { useUsersModals } from "./_hooks/use-users-modals";

const UsersPage = () => {
  const { closeAllModals } = useModalClose();
  const { handleOpenCreateModal, isOpenCreateUsers, isOpenEditUsers } =
    useUsersModals();
  const { form, isSubmitting, onSubmit, errors } = useUserEdit();

  const {
    users,
    filters,
    searchQuery,
    isAnyFilterActive,
    updateFilter,
    resetAllFilters,
    resetFilterByKey,
    setSearchQuery,
    handlePageChange,
    handlePageSizeChange,
    paginationState,
    totalItems,
    setPage,
    pageSize,
    isLoading,
  } = useUsers();

  return (
    <PageContainer scrollable>
      <PageHeader
        title="Users"
        description="Manage users"
        onAction={handleOpenCreateModal}
        actionLabel="Add New"
      />
      <Separator />

      <div className="space-y-4">
        <Filters
          filters={filters}
          isAnyFilterActive={isAnyFilterActive}
          resetFilterByKey={resetFilterByKey}
          resetAllFilters={resetAllFilters}
          searchQuery={searchQuery}
          setPage={setPage}
          setSearchQuery={setSearchQuery}
          updateFilter={updateFilter}
        />

        {isLoading ? (
          <DataTableSkeleton rowCount={5} columnCount={columns.length} />
        ) : (
          <DataTable columns={columns} data={users} />
        )}

        <Pagination
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          paginationState={paginationState}
          totalItems={totalItems}
        />
      </div>

      <DefaultModal
        title="Create Users"
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
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          errors={errors}
          onClose={closeAllModals}
        />
      </DefaultModal>
    </PageContainer>
  );
};

export default UsersPage;
