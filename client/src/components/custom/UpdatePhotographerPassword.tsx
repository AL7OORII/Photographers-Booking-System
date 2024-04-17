import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { photographerUpdatePasswordSchema } from "../../schemas/authSchema";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { Form } from "../../components/ui/form";
// @ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import SpinnerLoader from "../../components/custom/SpinnerLoader";
import PasswordInput from "./PasswordInput";
import { useUpdatePhotographerPassword } from "../../apis/photographer";

const UpdatePhotographerPassword = () => {
  const { mutateAsync: update, isLoading } = useUpdatePhotographerPassword();

  const form = useForm<z.infer<typeof photographerUpdatePasswordSchema>>({
    resolver: zodResolver(photographerUpdatePasswordSchema),
    defaultValues: {
      confirm_password: "",
      new_password: "",
      old_password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof photographerUpdatePasswordSchema>) {
    update(values);
  }

  return (
    <div className="w-full bg-light min-h-screen">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[700px] space-y-4"
        >
          <PasswordInput
            name="old_password"
            label="Old password"
            control={control}
            errors={errors}
          />
          <PasswordInput
            name="new_password"
            label="New password"
            control={control}
            errors={errors}
          />
          <PasswordInput
            name="confirm_password"
            label="Confirm password"
            control={control}
            errors={errors}
          />
          <Button
            type="submit"
            className="w-full max-w-[400px]  h-12 text-base md:text-xl rounded-xl  font-bold mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <SpinnerLoader conHeight="100%" className="text-xl" />
            ) : (
              "Update password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePhotographerPassword;
