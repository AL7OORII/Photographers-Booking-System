import { useEffect, useState } from "react";
import FormInput from "../../components/custom/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { photographerUpdateProfileSchema } from "../../schemas/authSchema";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import FormPhotographyStyles from "../../components/custom/FormInputPhotoGraphyStyles";
import { usePhotographerSignUp } from "../../apis/auth/auth";
// @ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import FormTextArea from "../../components/custom/FormTextArea";
import SpinnerLoader from "../../components/custom/SpinnerLoader";
import { useParams } from "react-router-dom";
import {
  useGetPhotographerDetails,
  useUpdatePhotographerDetails,
} from "../../apis/photographer";
import PageLoader from "../../components/custom/PageLoader";

const UpdatePhotographerDetailsForm = () => {
  const { photographerId } = useParams();

  const { data: photographer, isLoading: isLoadingDetails } =
    useGetPhotographerDetails(photographerId!);

  const [styles, setStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 0]);

  const { mutateAsync: update, isLoading } = useUpdatePhotographerDetails();

  const form = useForm<z.infer<typeof photographerUpdateProfileSchema>>({
    resolver: zodResolver(photographerUpdateProfileSchema),
    defaultValues: {
      location: photographer?.location ?? "",
      photography_style: photographer?.photography_style ?? [],
      price_range: {
        max: String(photographer?.price_range.max) ?? undefined,
        min: String(photographer?.price_range.min) ?? undefined,
      },
      other_services: photographer?.other_services ?? "",
      description: photographer?.description ?? "",
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof photographerUpdateProfileSchema>) {
    console.log(values);
    update(values);
  }

  useEffect(() => {
    setValue("photography_style", styles);
  }, [styles]);

  useEffect(() => {
    setValue("price_range.max", String(priceRange[1]));
    setValue("price_range.min", String(priceRange[0]));
  }, [priceRange]);

  useEffect(() => {
    if (photographer) {
      const {
        location,
        other_services,
        description,
        price_range,
        photography_style,
        // phone_Number,
      } = photographer;

      // setValue("phone_Number", String(phone_Number));
      setValue("location", location);
      setValue("other_services", other_services);
      setValue("description", description);
      setPriceRange([price_range.min, price_range.max]);
      setStyles(photography_style);
    }
  }, [photographer]);
  return (
    <div className="w-full bg-light min-h-screen">
      {isLoadingDetails && <PageLoader className="text-6xl text-dark_blue" />}

      {!isLoadingDetails && photographer && (
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[700px] space-y-4"
          >
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

            <div className="col-span-2">
              <FormPhotographyStyles setStyles={setStyles} styles={styles} />
            </div>

            <Button
              type="submit"
              className="w-full max-w-[400px]  h-12 text-base md:text-xl rounded-xl  font-bold mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <SpinnerLoader conHeight="100%" className="text-xl" />
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default UpdatePhotographerDetailsForm;
