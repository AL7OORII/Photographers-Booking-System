import { useState } from "react";
import FormInput from "../../components/custom/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSignUpSchema } from "../../schemas/authSchema";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import PasswordInput from "../../components/custom/PasswordInput";
import { Form } from "../../components/ui/form";
import { useClientSignUp } from "../../apis/auth/auth";
import { Link } from "react-router-dom";
import { Routes } from "../../utils/routeNames";
import PhotographerSignupForm from "../../components/custom/PhotographerSignupForm";
import SpinnerLoader from "../../components/custom/SpinnerLoader";
const SignUpPage = () => {
  const [account, setAccount] = useState("client");
  const [_, setStyles] = useState<string[]>([]);

  const { mutateAsync: clientSignup, isLoading } = useClientSignUp();

  const form = useForm<z.infer<typeof clientSignUpSchema>>({
    resolver: zodResolver(clientSignUpSchema),
    defaultValues: {
      confirm_password: "",
      password: "",
      email: "",
      first_Name: "",
      last_Name: "",
      phone_Number: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof clientSignUpSchema>) {
    clientSignup(values);
  }

  const toggleAcount = () => {
    if (account === "client") {
      setAccount("photographer");
    } else {
      setAccount("client");
    }
    setStyles([]);
    reset();
  };

  return (
    <div className="bg-cream rounded-2xl p-6 flex flex-col h-fit w-[96%] max-w-[900px] items-center">
      <h1 className="text-2xl md:text-4xl mb-4 font-semibold text-dark_blue underline underline-offset-2">
        Register
      </h1>
      {account === "photographer" ? (
        <PhotographerSignupForm />
      ) : (
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-4 w-full md:grid md:grid-cols-2"
          >
            <FormInput
              name="first_Name"
              label="First Name"
              control={control}
              placeholder=""
              errors={errors}
            />
            <FormInput
              name="last_Name"
              label="Last Name"
              control={control}
              placeholder=""
              errors={errors}
            />
            <FormInput
              name="email"
              label="Email"
              type="email"
              control={control}
              placeholder=""
              errors={errors}
            />
            <FormInput
              name="phone_Number"
              label="Phone Number"
              type="number"
              control={control}
              placeholder=""
              errors={errors}
            />

            <PasswordInput
              name="password"
              label="Password"
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
              className="w-full h-12 rounded-full text-xl md:text-2xl  font-bold  mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 col-span-2 my-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <SpinnerLoader conHeight="100%" className="text-xl" />
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
      )}

      <div className="flex justify-between items-center flex-wrap w-full">
        <Button
          onClick={toggleAcount}
          className="bg-transparent block text-dark_blue font-medium hover:bg-transparent md:text-xl"
        >
          Sign up as{" "}
          <span className="md:text-xl text-md font-bold ml-1">
            {account === "client" ? "Photographer" : "Client"}
          </span>
        </Button>
        <Link
          to={Routes.LOGIN}
          className="bg-transparent text-dark_blue font-medium hover:bg-transparent md:text-xl"
        >
          Already have an account
          <span className="text-xl font-bold ml-1">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
