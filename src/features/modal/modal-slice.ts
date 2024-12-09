import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createModal: {
    isOpen: false,
    modalId: null,
    data: null,
  },
  editModal: {
    isOpen: false,
    modalId: null,
    data: null,
  },
  deleteModal: {
    isOpen: false,
    modalId: null,
    data: null,
  },
  viewModal: {
    isOpen: false,
    modalId: null,
    data: null,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCreateModal(state, action) {
      state.createModal.isOpen = true;
      state.createModal.modalId = action.payload.modalId;
      state.createModal.data = action.payload.data;
    },
    closeCreateModal(state) {
      state.createModal.isOpen = false;
      state.createModal.modalId = null;
      state.createModal.data = null;
    },

    openEditModal(state, action) {
      state.editModal.isOpen = true;
      state.editModal.modalId = action.payload.modalId;
      state.editModal.data = action.payload.data;
    },
    closeEditModal(state) {
      state.editModal.isOpen = false;
      state.editModal.modalId = null;
      state.editModal.data = null;
    },

    openDeleteModal(state, action) {
      state.deleteModal.isOpen = true;
      state.deleteModal.modalId = action.payload.modalId;
      state.deleteModal.data = action.payload.data;
    },
    closeDeleteModal(state) {
      state.deleteModal.isOpen = false;
      state.deleteModal.modalId = null;
      state.deleteModal.data = null;
    },

    openViewModal(state, action) {
      state.viewModal.isOpen = true;
      state.viewModal.modalId = action.payload.modalId;
      state.viewModal.data = action.payload.data;
    },
    closeViewModal(state) {
      state.viewModal.isOpen = false;
      state.viewModal.modalId = null;
      state.viewModal.data = null;
    },
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  openEditModal,
  closeEditModal,
  openViewModal,
  closeViewModal,
  openDeleteModal,
  closeDeleteModal,
} = modalSlice.actions;

export default modalSlice.reducer;
