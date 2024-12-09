import { RootState } from "@/app/store";
import { usersModalTypes } from "@/constants/modal-types";
import {
  closeCreateModal,
  closeEditModal,
  openCreateModal,
} from "@/features/modal/modal-slice";
import { useDispatch, useSelector } from "react-redux";

const useUser = () => {
  const dispatch = useDispatch();
  const { createModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );
  const isOpenCreateUsers =
    createModal?.modalId === usersModalTypes?.createUsers;
  const isOpenEditUsers = editModal?.modalId === usersModalTypes?.editUsers;

  const handleOpenModal = () =>
    dispatch(
      openCreateModal({ modalId: usersModalTypes.createUsers, data: null })
    );
  const closeModal = () => {
    dispatch(closeCreateModal());
    dispatch(closeEditModal());
  };

  return { isOpenCreateUsers, isOpenEditUsers, handleOpenModal, closeModal };
};

export default useUser;
