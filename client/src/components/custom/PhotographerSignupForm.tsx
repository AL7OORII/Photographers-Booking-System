import { useEffect, useState } from "react";
import FormInput from "../../components/custom/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { photographerSignUpSchema } from "../../schemas/authSchema";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import PasswordInput from "../../components/custom/PasswordInput";
import { Form } from "../../components/ui/form";
import FormPhotographyStyles from "../../components/custom/FormInputPhotoGraphyStyles";
import { usePhotographerSignUp } from "../../apis/auth/auth";
import FormTextArea from "./FormTextArea";
// @ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import SpinnerLoader from "./SpinnerLoader";

const PhotographerSignupForm = () => {
  const [step, setStep] = useState(1);
  const [styles, setStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 0]);

  const {
    mutateAsync: photographerSignup,
    isLoading: isLoadingPhotographerSignUp,
  } = usePhotographerSignUp();

  const form = useForm<z.infer<typeof photographerSignUpSchema>>({
    resolver: zodResolver(photographerSignUpSchema),
    defaultValues: {
      confirm_password: "",
      password: "",
      email: "",
      first_Name: "",
      last_Name: "",
      location: "",
      phone_Number: "",
      photography_style: [],
      price_range: undefined,
      other_services: "",
      description: "",
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof photographerSignUpSchema>) {
    photographerSignup(values);
  }

  useEffect(() => {
    setValue("photography_style", styles);
  }, [styles]);

  useEffect(() => {
    setValue("price_range.max", String(priceRange[1]));
    setValue("price_range.min", String(priceRange[0]));
  }, [priceRange]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>
          )}

          {step === 2 && (
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                name="location"
                label="Location"
                control={control}
                placeholder=""
                errors={errors}
              />

              <div className=" flex flex-col justify-center gap-2">
                <h3 className="text-sm md:text-base font-semibold text-dark_blue">
                  Price range
                </h3>
                <RangeSlider
                  value={priceRange}
                  onInput={setPriceRange}
                  min={0}
                  max={10000}
                  step={5}
                />
                <p className="text-base font-medium">
                  $ {priceRange[0]} - $ {priceRange[1]}
                </p>
              </div>
              {/* <div className="col-span-2"> */}
              <FormTextArea
                control={control}
                errors={errors}
                name="other_services"
                rows={2}
                label="Other services"
              />
              <FormTextArea
                control={control}
                errors={errors}
                name="description"
                rows={4}
                label="Description"
              />
              {/* </div> */}

              <div className="col-span-2">
                <FormPhotographyStyles setStyles={setStyles} styles={styles} />
              </div>
            </div>
          )}

          {step !== 1 ? (
            <div className="flex">
              <Button
                type="button"
                className="w-full max-w-[400px]  h-12 text-base md:text-xl rounded-xl  font-bold mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-6"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full max-w-[400px]  h-12 text-base md:text-xl rounded-xl  font-bold mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-6"
                disabled={isLoadingPhotographerSignUp}
              >
                {isLoadingPhotographerSignUp ? (
                  <SpinnerLoader conHeight="100%" className="text-xl" />
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              className="w-full max-w-[400px]  h-12 text-base md:text-xl rounded-xl  font-bold mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-6"
              onClick={() => setStep(2)}
            >
              Next
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default PhotographerSignupForm;
