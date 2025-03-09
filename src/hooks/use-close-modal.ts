import { closeModal, ModalType } from '@/api/modal/modal-slice';
import defaultConfig from '@/config/default';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useCloseModal = () => {
  const dispatch = useDispatch();

  const closeSpecificModal = useCallback(
    (modalType: ModalType) => dispatch(closeModal(modalType)),
    [dispatch],
  );

  const closeAllModals = useCallback(() => {
    defaultConfig?.modalType?.forEach((modalType) => {
      dispatch(closeModal(modalType as ModalType));
    });
  }, [dispatch]);

  return {
    closeSpecificModal,
    closeAllModals,
  };
};

export default useCloseModal;
