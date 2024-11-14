import apiTags from "@/features/API/tags";
import { cookieManager } from "@/utils/cookie-manager";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_URL,
//   prepareHeaders: (headers) => {
//     const token = cookieManager.getCookie("accessToken");
//     if (token) headers.set("authorization", `Bearer ${token}`);

//     return headers;
//   },
// });

// const baseQueryWithReAuth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);

//   if (
//     result?.error?.status === 401 ||
//     (result?.error?.data as RefreshTokenResponse)?.statusCode === 401
//   ) {
//     const refreshResult = await baseQuery(
//       {
//         url: "/auth/refresh-token",
//         method: "POST",
//         body: { refreshToken: cookieManager.getCookie("accessToken") },
//       },
//       api,
//       extraOptions
//     );

//     if ((refreshResult?.data as RefreshTokenResponse)?.statusCode === 200) {
//       cookieManager.saveCookie(
//         "accessToken",
//         (refreshResult?.data as RefreshTokenResponse)?.data?.accessToken,
//         { sameSite: "Lax" }
//       );

//       cookieManager.saveCookie(
//         "refreshToken",
//         (refreshResult?.data as RefreshTokenResponse)?.data?.refreshToken,
//         { sameSite: "Lax" }
//       );

//       api.dispatch(
//         setToken({
//           accessToken: (refreshResult?.data as RefreshTokenResponse)?.data
//             ?.accessToken,
//           refreshToken: (refreshResult?.data as RefreshTokenResponse)?.data
//             ?.refreshToken,
//         })
//       );

//       return baseQuery(args, api, extraOptions);
//     }
//   } else {
//     api.dispatch(logout());
//   }

//   return result;
// };

// export const API = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReAuth,
//   endpoints: () => ({}),
//   tagTypes: [...apiTags],
// });

export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
    prepareHeaders: (headers) => {
      const token = cookieManager.getCookie("accessToken");
      if (token) headers.set("authorization", `Bearer ${token}`);
    },
  }),
  endpoints: () => ({}),
  tagTypes: [...apiTags],
});
