import { cookieManager } from "./cookie-manager";

export const getTokens = (
  accessToken?: string | null,
  refreshToken?: string | null
) => ({
  accessToken: accessToken || cookieManager.getCookie("accessToken"),
  refreshToken: refreshToken || cookieManager.getCookie("refreshToken"),
});
