import { RootResponse } from "@/constants/api-interface/root";
import { User } from "@/models/User";
import {
  buildQueryString,
  GetAllQueryParams,
  GetByIdQueryParams,
} from "@/utils/build-query-string";
import { cookieManager } from "@/utils/cookie-manager";
import { API } from "../API/API";
import { login, logout } from "../auth/auth-slice";

const userApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description create user
     * @url /users
     * @method POST
     */
    createUser: builder.mutation({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * @description read all users
     * @url /users
     * @method GET
     */
    readUsers: builder.query<RootResponse<User>, GetAllQueryParams>({
      query: (queryParams: GetAllQueryParams) => {
        return buildQueryString("/users", queryParams);
      },
      providesTags: ["User"],
    }),

    /**
     * @description read user by ID
     * @url /users/{id}
     * @method GET
     */
    readUserById: builder.query<RootResponse<User>, GetByIdQueryParams>({
      query: (queryParams: GetByIdQueryParams) =>
        buildQueryString(`/users`, queryParams),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        const { data: user, statusCode } = result.data;
        const accessToken = cookieManager.getCookie("accessToken") || "";
        const refreshToken = cookieManager.getCookie("refreshToken") || "";

        if (statusCode === 200) {
          dispatch(login({ user, accessToken, refreshToken }));
        } else {
          dispatch(logout());
        }
      },
      providesTags: ["User"],
    }),

    /**
     * @description update user by ID
     * @url /users/{id}
     * @method PUT
     */
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * @description partially update user by ID
     * @url /users/{id}
     * @method PATCH
     */
    updateUserPartially: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * @description delete user by ID
     * @url /users/{id}
     * @method DELETE
     */
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateUserMutation,
  useReadUsersQuery,
  useReadUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateUserPartiallyMutation,
} = userApi;

// Export API endpoints
export const { endpoints: userApiEndpoints } = userApi;

// Export API
export default userApi;
