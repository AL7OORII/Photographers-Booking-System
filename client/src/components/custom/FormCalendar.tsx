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
import { format } from "date-fns";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { InputProps } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar1 } from "iconsax-react";
import { Calendar } from "../ui/calendar";

type FormCalendarProps<TFormValues extends FieldValues = FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
} & Omit<InputProps, "name">;

const FormCalendar = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  errors,
}: FormCalendarProps<TFormValues>): JSX.Element => {
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full md:max-w-[500px]">
          <h3 className="text-sm md:text-base font-semibold text-dark_blue">
            {label}
          </h3>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={`${
                    hasError && " border-[1px] border-red-500"
                  } text-cream text-lg h-12 rounded-full w-full pl-3 flex justify-between font-normal bg-light_blue hover:bg-light_blue`}
                >
                  {field.value ? (
                    format(Number(field.value), "PPP")
                  ) : (
                    <span className="text-sm md:text-base text-cream">
                      Select Date
                    </span>
                  )}
                  <Calendar1 size="25" className="text-text" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                // @ts-ignore
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormCalendar;
