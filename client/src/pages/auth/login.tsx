import FormInput from "../../components/custom/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import { loginSchema } from "../../schemas/authSchema";
import PasswordInput from "../../components/custom/PasswordInput";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Routes } from "../../utils/routeNames";
import { useLogin } from "../../apis/auth/auth";
import SpinnerLoader from "../../components/custom/SpinnerLoader";

const LoginPage = () => {
  const { mutateAsync: login, isLoading } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login(values);
  }

  return (
    <div className="bg-cream rounded-2xl p-6 flex flex-col h-fit w-[96%] max-w-[700px] items-center">
      <h1 className="text-2xl md:text-4xl mb-4 font-semibold text-dark_blue underline underline-offset-2">
        Login
      </h1>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormInput
            name="email"
            label="Email"
            type="email"
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
          <Button
            type="submit"
            className="w-full h-14 rounded-full font-bold  mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <SpinnerLoader conHeight="100%" className="text-xl" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>

      <div className="flex justify-center w-full mt-6">
        <Link
          to={Routes.SIGNUP}
          className="bg-transparent text-dark_blue font-medium hover:bg-transparent text-md md:text-xl"
        >
          Do not have an account
          <span className="text-md md:text-xl font-bold ml-1">SignUp</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
