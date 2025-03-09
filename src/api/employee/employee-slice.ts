import { Employee } from "@/models/Employee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "../auth/auth-slice";

type EmployeeState = {
  data: Employee | null;
  error: string | null;
};

const initialState: EmployeeState = {
  data: null,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee: (state, action: PayloadAction<Employee>) => {
      state.data = action.payload;
      state.error = null;
    },
    removeEmployee: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.data = null;
      state.error = null;
    });
  },
});

export const { setEmployee, removeEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
