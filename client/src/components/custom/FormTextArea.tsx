/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import * as lodash from "lodash";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { InputProps } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

type FormTextAreaProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  rows: number;
} & Omit<InputProps, "name">;

const FormTextArea = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
  rows,
  ...props
}: FormTextAreaProps<TFormValues>): JSX.Element => {
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <h3 className="text-sm md:text-base font-semibold text-dark_blue">
            {label}
          </h3>
          <FormControl>
            {/* @ts-ignore */}
            <Textarea
              placeholder={placeholder}
              className={`focus-visible:ring-1 bg-light_blue ${
                hasError
                  ? "focus-visible:ring-red-400"
                  : "focus-visible:ring-green"
              } focus-visible:ring-offset-2  border-transparent text-light  px-4 text-sm md:text-base placeholder:text-cream`}
              {...field}
              {...props}
              rows={rows}
            />
          </FormControl>
          <FormMessage className="text-xs md:text-sm" />
        </FormItem>
      )}
    />
  );
};

export default FormTextArea;
