import { RootResponse } from '@/types';
import { cookieManager } from '@/utils/cookie-manager';
import { decodeToken } from '@/utils/decode-token';
import { API } from '../base-api';
import { login, logout } from './auth-slice';

interface LoginPayload {
  username: string;
  password: string;
}

export interface RegistrationPayload {
  username: string;
  password: string;
  email: string;
  role: string;
  status: 'Pending' | 'Active' | 'Inactive';
}

export interface RefreshTokenData {
  accessToken: string;
  refreshToken: string;
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = RootResponse<LoginData>;
export type RegistrationResponse = RootResponse<LoginData>;
export type RefreshTokenResponse = RootResponse<RefreshTokenData>;

export const authApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description This endpoint is used to create user account
     * @param body
     * @returns UserAccount
     */
    register: builder.mutation<RegistrationResponse, RegistrationPayload>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        const { accessToken, refreshToken } = result.data.data;

        if (accessToken) {
          cookieManager.saveCookie('accessToken', accessToken, {
            sameSite: 'Lax',
          });
          cookieManager.saveCookie('refreshToken', refreshToken, {
            sameSite: 'Lax',
          });

          const decoded = decodeToken(accessToken) || null;

          dispatch(
            login({
              user: decoded,
              accessToken,
              refreshToken,
            }),
          );
        } else {
          dispatch(logout());
        }
      },
    }),
    /**
     * @Description login user
     * @URI /user-account/login
     * @Method POST
     */
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body: LoginPayload) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        const { accessToken, refreshToken } = result.data.data;

        if (accessToken) {
          cookieManager.saveCookie('accessToken', accessToken, {
            sameSite: 'Lax',
          });
          cookieManager.saveCookie('refreshToken', refreshToken, {
            sameSite: 'Lax',
          });

          const decoded = decodeToken(accessToken);

          dispatch(
            login({
              user: decoded,
              accessToken,
              refreshToken,
            }),
          );
        } else {
          dispatch(logout());
        }
      },
    }),

    /**
     * @description forgotPassword
     * @url /auth/forgot-password
     * @method POST
     */
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `/auth/forgot-password`,
        method: 'POST',
        body,
      }),
    }),

    /**
     * @description resetPassword
     * @url /auth/reset-password
     * @method POST
     */
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/auth/reset-password`,
        method: 'POST',
        body,
      }),
    }),

    /**
     * @description changePassword
     * @url /auth/change-password
     * @method POST
     */
    changePassword: builder.mutation({
      query: (body) => ({
        url: `/auth/change-password`,
        method: 'POST',
        body,
      }),
    }),

    refreshToken: builder.mutation<
      RefreshTokenResponse,
      { refreshToken: string }
    >({
      query: (body) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body,
      }),
      // async onQueryStarted(_args, { dispatch, queryFulfilled }) {
      //   try {
      //     const result = await queryFulfilled;
      //     const { accessToken } = result.data.data;

      //     if (accessToken) {
      //       cookieManager.saveCookie("accessToken", accessToken, {
      //         sameSite: "Lax",
      //       });

      //       const decoded = decodeToken(accessToken);
      //       dispatch(
      //         login({
      //           user: decoded,
      //           accessToken,
      //           refreshToken: _args.refreshToken,
      //         })
      //       );
      //     } else {
      //       dispatch(logout());
      //     }
      //   } catch {
      //     dispatch(logout());
      //   }
      // },
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
} = authApi;
export default authApi;
