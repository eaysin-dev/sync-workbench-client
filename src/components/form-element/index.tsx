// import {
//   FormControl,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { PasswordInput } from "@/components/ui/password-input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Control, Controller } from "react-hook-form";

// type FormInputProps = {
//   name: string;
//   label: string;
//   type: "text" | "email" | "password" | "select";
//   placeholder: string;
//   options?: string[];
//   control: Control<any>;
//   disabled: boolean;
// };

// export const FormInput = ({
//   name,
//   label,
//   type,
//   placeholder,
//   options = [],
//   control,
//   disabled,
// }: FormInputProps) => {
//   // Helper functions to render specific field types
//   const renderInputField = (field: any) => (
//     <Input
//       type={type}
//       placeholder={placeholder}
//       disabled={disabled}
//       {...field}
//     />
//   );

//   const renderPasswordField = (field: any) => (
//     <PasswordInput placeholder={placeholder} disabled={disabled} {...field} />
//   );

//   const renderSelectField = (field: any) => (
//     <Select
//       value={field.value}
//       onValueChange={field.onChange}
//       disabled={disabled}
//     >
//       <SelectTrigger>
//         <SelectValue placeholder={placeholder} />
//       </SelectTrigger>
//       <SelectContent>
//         {options.map((option) => (
//           <SelectItem key={option} value={option}>
//             {option}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );

//   // Determine the field renderer based on the type
//   const renderField = (field: any) => {
//     if (type === "select") return renderSelectField(field);
//     if (type === "password") return renderPasswordField(field);
//     return renderInputField(field);
//   };

//   return (
//     <FormItem>
//       <FormLabel>{label}</FormLabel>
//       <FormControl>
//         <Controller
//           name={name}
//           control={control}
//           render={({ field }) => renderField(field)}
//         />
//       </FormControl>
//       <FormMessage />
//     </FormItem>
//   );
// };

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

type FormInputProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label: string;
  type: "text" | "email" | "password" | "select";
  placeholder: string;
  options?: string[];
  control: Control<TFieldValues>;
  disabled: boolean;
  readOnly?: boolean;
  errorMsg?: string;
};

export const FormInput = <TFieldValues extends FieldValues>({
  name,
  label,
  type,
  placeholder,
  options = [],
  control,
  disabled,
  readOnly,
  errorMsg,
}: FormInputProps<TFieldValues>) => {
  const renderInputField = ({
    value,
    onChange,
    ...rest
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <Input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      readOnly={readOnly}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );

  const renderPasswordField = ({
    value,
    onChange,
    ...rest
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <PasswordInput
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );

  const renderSelectField = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const renderField = (field: {
    value: string;
    onChange: (value: string) => void;
  }) => {
    if (type === "select") return renderSelectField(field);
    if (type === "password") return renderPasswordField(field);
    return renderInputField(field);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => renderField(field)}
        />
      </FormControl>
      {errorMsg && <FormMessage>{errorMsg}</FormMessage>}
    </FormItem>
  );
};
