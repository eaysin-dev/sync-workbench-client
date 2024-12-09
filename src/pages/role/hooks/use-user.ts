import { RootState } from "@/app/store";
import { rolesModalTypes } from "@/constants/modal-types";
import {
  closeCreateModal,
  closeEditModal,
  openCreateModal,
} from "@/features/modal/modal-slice";
import { useDispatch, useSelector } from "react-redux";

const useRole = () => {
  const dispatch = useDispatch();
  const { createModal } = useSelector((state: RootState) => state.modal);
  const isOpenCreateUsers =
    createModal?.modalId === rolesModalTypes?.createRoles;

  const handleOpenModal = () =>
    dispatch(
      openCreateModal({ modalId: rolesModalTypes.createRoles, data: null })
    );

  const closeModal = () => {
    dispatch(closeCreateModal());
    dispatch(closeEditModal());
  };

  return { isOpenCreateUsers, handleOpenModal, closeModal };
};

export default useRole;
