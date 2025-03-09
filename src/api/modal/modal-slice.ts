// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   createModal: {
//     isOpen: false,
//     modalId: null,
//     data: null,
//   },
//   editModal: {
//     isOpen: false,
//     modalId: null,
//     data: null,
//   },
//   deleteModal: {
//     isOpen: false,
//     modalId: null,
//     data: null,
//   },
//   viewModal: {
//     isOpen: false,
//     modalId: null,
//     data: null,
//   },
// };

// const modalSlice = createSlice({
//   name: "modal",
//   initialState,
//   reducers: {
//     openCreateModal(state, action) {
//       state.createModal.isOpen = true;
//       state.createModal.modalId = action.payload.modalId;
//       state.createModal.data = action.payload.data;
//     },
//     closeCreateModal(state) {
//       state.createModal.isOpen = false;
//       state.createModal.modalId = null;
//       state.createModal.data = null;
//     },

//     openEditModal(state, action) {
//       state.editModal.isOpen = true;
//       state.editModal.modalId = action.payload.modalId;
//       state.editModal.data = action.payload.data;
//     },
//     closeEditModal(state) {
//       state.editModal.isOpen = false;
//       state.editModal.modalId = null;
//       state.editModal.data = null;
//     },

//     openDeleteModal(state, action) {
//       state.deleteModal.isOpen = true;
//       state.deleteModal.modalId = action.payload.modalId;
//       state.deleteModal.data = action.payload.data;
//     },
//     closeDeleteModal(state) {
//       state.deleteModal.isOpen = false;
//       state.deleteModal.modalId = null;
//       state.deleteModal.data = null;
//     },

//     openViewModal(state, action) {
//       state.viewModal.isOpen = true;
//       state.viewModal.modalId = action.payload.modalId;
//       state.viewModal.data = action.payload.data;
//     },
//     closeViewModal(state) {
//       state.viewModal.isOpen = false;
//       state.viewModal.modalId = null;
//       state.viewModal.data = null;
//     },
//   },
// });

// export const {
//   openCreateModal,
//   closeCreateModal,
//   openEditModal,
//   closeEditModal,
//   openViewModal,
//   closeViewModal,
//   openDeleteModal,
//   closeDeleteModal,
// } = modalSlice.actions;

// export default modalSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface ModalState<T = unknown> {
//   isOpen: boolean;
//   modalId: string | null;
//   data: T | null;
// }

// const initialState: {
//   createModal: ModalState;
//   editModal: ModalState;
//   deleteModal: ModalState;
//   viewModal: ModalState;
// } = {
//   createModal: {
//     isOpen: false,
//     modalId: null,
//     data: null,
//   },
//   editModal: {
//     isOpen: false,
//     modalId: null,
//     data: null,
//   },
//   deleteModal: {
//     isOpen: false,
//     modalId: null,
//     data: null,
//   },
//   viewModal: {
//     isOpen: false,
//     modalId: null,
//     data: null,
//   },
// };

// const modalSlice = createSlice({
//   name: "modal",
//   initialState,
//   reducers: {
//     openCreateModal<T>(
//       state: typeof initialState,
//       action: PayloadAction<{ modalId: string; data: T }>
//     ) {
//       state.createModal.isOpen = true;
//       state.createModal.modalId = action.payload.modalId;
//       state.createModal.data = action.payload.data;
//     },
//     closeCreateModal(state: typeof initialState) {
//       state.createModal.isOpen = false;
//       state.createModal.modalId = null;
//       state.createModal.data = null;
//     },

//     openEditModal<T>(
//       state: typeof initialState,
//       action: PayloadAction<{ modalId: string; data: T }>
//     ) {
//       state.editModal.isOpen = true;
//       state.editModal.modalId = action.payload.modalId;
//       state.editModal.data = action.payload.data;
//     },
//     closeEditModal(state: typeof initialState) {
//       state.editModal.isOpen = false;
//       state.editModal.modalId = null;
//       state.editModal.data = null;
//     },

//     openDeleteModal<T>(
//       state: typeof initialState,
//       action: PayloadAction<{ modalId: string; data: T }>
//     ) {
//       state.deleteModal.isOpen = true;
//       state.deleteModal.modalId = action.payload.modalId;
//       state.deleteModal.data = action.payload.data;
//     },
//     closeDeleteModal(state: typeof initialState) {
//       state.deleteModal.isOpen = false;
//       state.deleteModal.modalId = null;
//       state.deleteModal.data = null;
//     },

//     openViewModal<T>(
//       state: typeof initialState,
//       action: PayloadAction<{ modalId: string; data: T }>
//     ) {
//       state.viewModal.isOpen = true;
//       state.viewModal.modalId = action.payload.modalId;
//       state.viewModal.data = action.payload.data;
//     },
//     closeViewModal(state: typeof initialState) {
//       state.viewModal.isOpen = false;
//       state.viewModal.modalId = null;
//       state.viewModal.data = null;
//     },
//   },
// });

// export const {
//   openCreateModal,
//   closeCreateModal,
//   openEditModal,
//   closeEditModal,
//   openViewModal,
//   closeViewModal,
//   openDeleteModal,
//   closeDeleteModal,
// } = modalSlice.actions;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for a generic modal state
interface ModalState<T = unknown> {
  isOpen: boolean;
  modalId: string | null;
  data: T | null;
}

export type ModalType =
  | "createModal"
  | "editModal"
  | "viewModal"
  | "deleteModal";

// Consolidated type for all modal states
export type ModalsState = Record<ModalType, ModalState>;

// Define the initial state for the modal slice
const initialState: ModalsState = {
  createModal: { isOpen: false, modalId: null, data: null },
  editModal: { isOpen: false, modalId: null, data: null },
  deleteModal: { isOpen: false, modalId: null, data: null },
  viewModal: { isOpen: false, modalId: null, data: null },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal<T>(
      state: ModalsState,
      action: PayloadAction<{
        type: keyof ModalsState;
        modalId: string;
        data?: T;
      }>
    ) {
      const { type, modalId, data } = action.payload;
      state[type].isOpen = true;
      state[type].modalId = modalId;
      state[type].data = data;
    },
    closeModal(state: ModalsState, action: PayloadAction<keyof ModalsState>) {
      const type = action.payload;
      state[type].isOpen = false;
      state[type].modalId = null;
      state[type].data = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
