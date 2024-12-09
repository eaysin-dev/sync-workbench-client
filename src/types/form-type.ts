import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface FormProps<TFormData extends FieldValues> {
  form: UseFormReturn<TFormData>;
  isError: boolean;
  isPending: boolean;
  error?: FetchBaseQueryError | SerializedError | { message?: string } | null;
  onSubmit: (data: TFormData) => void;
  successMessage?: string;
  onReset?: () => void;
  onValidate?: (data: TFormData) => boolean | Promise<boolean>;
  showResetButton?: boolean;
}
