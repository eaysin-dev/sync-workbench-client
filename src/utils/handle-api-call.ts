import defaultConfig from "@/config/default";
import { RootResponse } from "@/types";
import { ApiResponseError } from "@/types/error";
import { toast } from "sonner";

interface HandleApiCallArgs {
  apiCall: Promise<unknown>;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
}

export const handleApiCall = ({
  apiCall,
  successMessage,
  errorMessage,
  onSuccess,
}: HandleApiCallArgs) => {
  apiCall
    .then((response) => {
      const typedResponse = response as RootResponse<unknown>;

      const successMsg = typedResponse?.message || successMessage;
      toast.success(successMsg);
      if (onSuccess) onSuccess();
    })
    .catch((error: ApiResponseError) => {
      console.error("API Error:", error);

      const errorMsg =
        error?.data?.error?.message ||
        errorMessage ||
        defaultConfig?.defaultErrorMessage;
      toast.error(errorMsg);
    });
};
