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
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { InputProps } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useAuthContext } from "../../providers/AuthProvider";

type FormSelectBookingStatusProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  status: string;
} & Omit<InputProps, "name">;

const FormSelectBookingStatus = <TFormValues extends Record<string, unknown>>({
  control,
  name,
  errors,
  status,
}: FormSelectBookingStatusProps<TFormValues>): JSX.Element => {
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;
  const { user } = useAuthContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className="text-text text-base">
            Select booking status
          </FormLabel>
          <FormControl>
            <Select
              {...field}
              // onValueChange={(value) => field.onChange(value)}
              // value={field.value && field.value}
              // defaultValue={status}
              onValueChange={(value) => field.onChange(value)}
              value={field.value ? String(field.value) : undefined}
              defaultValue={status ? String(status) : undefined}
            >
              <SelectTrigger className="rounded-full bg-light_blue h-12 border-subtle_text text-base text-cream focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {user?.role === "client" &&
                  clientStatusOptions?.map((option, i) => (
                    <SelectItem
                      value={option.value}
                      key={i}
                      className="text-dark_blue text-base font-medium"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                {user?.role === "photographer" &&
                  photographerStatusOptions?.map((option, i) => (
                    <SelectItem
                      value={option.value}
                      key={i}
                      className="text-dark_blue text-base font-medium"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelectBookingStatus;

const photographerStatusOptions = [
  // {
  //   value: "pending",
  //   label: "Pending",
  // },
  {
    value: "accepted",
    label: "Accept",
  },
  {
    value: "rejected",
    label: "Reject",
  },
  {
    value: "completed",
    label: "Complete  ",
  },
];

const clientStatusOptions = [
  {
    value: "closed",
    label: "Close booking",
  },
];
