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
import { useState } from "react";
import { Button } from "../ui/button";

type PasswordInputProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
} & Omit<InputProps, "name">;

const PasswordInput = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
  description,
  ...props
}: PasswordInputProps<TFormValues>): JSX.Element => {
  const [show, setShow] = useState(false);
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <h3 className="text-sm md:text-base font-semibold text-dark_blue">{label}</h3>
          {description && (
            <p className="text-[12px] text-light -tracking-[0.28px]">
              {description}
            </p>
          )}
          <FormControl>
            <div className="relative">
              {/* @ts-ignore */}
              <Input
                placeholder={placeholder}
                {...field}
                className={`focus-visible:ring-1 bg-light_blue text-text ${
                  hasError
                    ? "focus-visible:ring-red-400"
                    : "focus-visible:ring-green"
                } focus-visible:ring-offset-2   border-transparent text-light  h-12 rounded-full px-4 text-base placeholder:text-light`}
                {...props}
                type={show ? "text" : "password"}
              />
              <Button
                onClick={() => setShow(!show)}
                type="button"
                className="absolute top-0 right-0 h-12 w-20 rounded-r-full hover:bg-green/50 bg-green text-light"
              >
                {show ? "Hide" : "Show"}
              </Button>
            </div>
          </FormControl>
          <FormMessage className="text-xs md:text-sm text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
