export interface ApiResponseError {
  status: number;
  data: ErrorResponseBody;
}

export interface ErrorResponseBody {
  status: string;
  statusCode: number;
  error: ErrorDetails;
  requestId: string;
  documentationUrl: string;
  timestamp: string;
}

export interface ErrorDetails {
  code: string;
  message: string;
  details: string;
  suggestion: string;
}
