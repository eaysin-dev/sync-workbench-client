import { Employee } from '@/models/Employee';

import { RootResponse } from '@/types';
import {
  buildQueryString,
  GetAllQueryParams,
  GetByIdQueryParams,
} from '@/utils/build-query-string';
import { logout } from '../auth/auth-slice';
import { API } from '../base-api';
import { setEmployee } from './employee-slice';

const employeeApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description create employee
     * @url /employees
     * @method POST
     */
    createEmployee: builder.mutation({
      query: (body) => ({
        url: `/employees`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Employee'],
    }),

    /**
     * @description read all employees
     * @url /employees
     * @method GET
     */
    readEmployees: builder.query<RootResponse<Employee>, GetAllQueryParams>({
      query: (queryParams: GetAllQueryParams) => {
        return buildQueryString('/employees', queryParams);
      },
      providesTags: ['Employee'],
    }),

    /**
     * @description read employee by ID
     * @url /employees/{id}
     * @method GET
     */
    readEmployeeById: builder.query({
      query: (queryParams) => {
        return buildQueryString('/employees', queryParams);
      },
      providesTags: ['Employee'],
    }),

    /**
     * @description read employee by user ID
     * @url /employee/get-employee-by-user/{userId}
     * @method GET
     */
    readEmployeeByUserId: builder.query<
      RootResponse<Employee>,
      GetByIdQueryParams
    >({
      query: (queryParams) => buildQueryString('/employees/user', queryParams),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        const { data: employee, statusCode } = result.data;

        if (statusCode === 200) {
          dispatch(setEmployee(employee));
        } else {
          dispatch(logout());
        }
      },
      providesTags: ['Employee'],
    }),

    /**
     * @description update employee by ID
     * @url /employees/{id}
     * @method PUT
     */
    updateEmployee: builder.mutation({
      query: ({ id, body }) => ({
        url: `/employees/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Employee'],
    }),

    /**
     * @description delete employee by ID
     * @url /employees/{id}
     * @method DELETE
     */
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateEmployeeMutation,
  useReadEmployeesQuery,
  useReadEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useReadEmployeeByUserIdQuery,
} = employeeApi;

// Export API endpoints
export const { endpoints: employeeApiEndpoints } = employeeApi;

// Export API
export default employeeApi;
