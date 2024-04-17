"use client";
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
import { Input, InputProps } from "../../components/ui/input";

type FormInputProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
} & Omit<InputProps, "name">;

const FormInput = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
  description,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
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
          {description && (
            <p className="text-[12px] text-light -tracking-[0.28px]">
              {description}
            </p>
          )}
          <FormControl>
            {/* @ts-ignore */}
            <Input
              placeholder={placeholder}
              {...field}
              className={`focus-visible:ring-1 bg-light_blue text-text ${
                hasError
                  ? "focus-visible:ring-red-400"
                  : "focus-visible:ring-green"
              } focus-visible:ring-offset-2  border-transparent text-light  h-12 rounded-full px-4 text-sm md:text-base placeholder:text-cream`}
              {...props}
            />
          </FormControl>
          <FormMessage className="text-xs md:text-sm text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
