export interface GetAllQueryParams {
  searchQuery?: string;
  page?: number;
  limit?: number;
  sortType?: "asc" | "desc";
  sortBy?: string;
  populate?: string | string[];
}

export interface GetByIdQueryParams {
  id: string;
  populate?: string | string[];
}

export const buildGetByIdQueryString = (params: GetByIdQueryParams): string => {
  const queryParams: string[] = [];

  if (params.populate) {
    const populateValue = Array.isArray(params.populate)
      ? params.populate.join(",")
      : params.populate;
    queryParams.push(`populate=${populateValue}`);
  }

  return queryParams?.length ? `?${queryParams.join("&")}` : "";
};

export const buildGetAllQueryString = (params: GetAllQueryParams): string => {
  const queryParams: string[] = [];

  if (params.searchQuery) queryParams.push(`search=${params.searchQuery}`);
  if (params.page) queryParams.push(`page=${params.page}`);
  if (params.limit) queryParams.push(`limit=${params.limit}`);
  if (params.sortType) queryParams.push(`sort_type=${params.sortType}`);
  if (params.sortBy) queryParams.push(`sort_by=${params.sortBy}`);

  if (params.populate) {
    const populateValue = Array.isArray(params.populate)
      ? params.populate.join(",")
      : params.populate;
    queryParams.push(`populate=${populateValue}`);
  }

  return queryParams?.length ? `?${queryParams.join("&")}` : "";
};

export const buildQueryString = (
  endpoint: string,
  params: GetAllQueryParams | GetByIdQueryParams
): string => {
  let url = endpoint;

  // Check if 'id' exists and append it to the URL path
  if ("id" in params) {
    url += `/${params.id}`;
  }

  // Generate the query string (but don't add 'id' again)
  const queryString =
    "id" in params
      ? buildGetByIdQueryString(params as GetByIdQueryParams)
      : buildGetAllQueryString(params as GetAllQueryParams);

  // Return the URL with the query string, excluding the id in the query params
  return `${url}${queryString}`;
};
