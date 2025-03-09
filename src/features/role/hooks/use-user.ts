import { openModal } from '@/api/modal/modal-slice';
import { RootState } from '@/app/store';
import { rolesModalTypes } from '@/constants/modal-types';
import { useDispatch, useSelector } from 'react-redux';

const useRole = () => {
  const dispatch = useDispatch();
  const { createModal } = useSelector((state: RootState) => state.modal);
  const isOpenCreateUsers =
    createModal?.modalId === rolesModalTypes?.createRoles;

  const handleOpenModal = () =>
    dispatch(
      openModal({
        type: 'createModal',
        modalId: rolesModalTypes.createRoles,
      }),
    );

  return { isOpenCreateUsers, handleOpenModal };
};

export default useRole;
