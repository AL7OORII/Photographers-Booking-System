import FormInput from "../../components/custom/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import SpinnerLoader from "../../components/custom/SpinnerLoader";
import { searchSchemaSchema } from "../../schemas/searchPhotographerSchema";
// @ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useEffect, useState } from "react";
import FormPhotographyStyles from "./FormInputPhotoGraphyStyles";
import { useSearchPhotographer } from "../../apis/search";
import SearchResult from "./SearchResult";
import { Separator } from "../ui/separator";
import useUrlQuery from "../../hooks/useUrlQuery";
import PaginationComponent from "./PaginationComponent";
import { IoClose } from "react-icons/io5";

interface MainSearchProps {}

const MainSearch: React.FC<MainSearchProps> = () => {
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [styles, setStyles] = useState<string[]>([]);
  const { limit, page, setPage } = useUrlQuery();
  const [initialRender, setInitialRender] = useState(true);

  const form = useForm<z.infer<typeof searchSchemaSchema>>({
    resolver: zodResolver(searchSchemaSchema),
    defaultValues: {
      location: "",
      name: "",
      email: "",
      price_range: {
        max: "0",
        min: "0",
      },
      photography_style: [],
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const {
    data: photographerData,
    isLoading,
    refetch,
    isFetching,
  } = useSearchPhotographer({
    page,
    limit,
    location: getValues("location"),
    name: getValues("name"),
    max_price: getValues("price_range.max"),
    min_price: getValues("price_range.min"),
    photography_style: JSON.stringify(getValues("photography_style")),
  });

  function onSubmit(values: z.infer<typeof searchSchemaSchema>) {
    refetch();
  }

  useEffect(() => {
    if (!initialRender) {
      refetch();
    } else {
      setInitialRender(false);
    }
  }, [page]);

  useEffect(() => {
    setValue("price_range.max", String(priceRange[1]));
    setValue("price_range.min", String(priceRange[0]));
  }, [priceRange]);

  useEffect(() => {
    setValue("photography_style", styles);
  }, [styles]);

  return (
    <div className="bg-light_blue p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl mb-4 font-semibold text-dark_blue underline underline-offset-2">
        Search Photographer
      </h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
          <div className=" w-full md:grid items-center grid-cols-3 gap-4 space-y-4 md:space-y-0">
            {/* <div className=" relative">
              <FormInput
                name="name"
                label="Name"
                control={control}
                placeholder=""
                errors={errors}
                className="bg-cream relative   focus-visible:ring-0 focus:ring-offset-0 focus:outline-none focus:border-none text-lg text-dark_blue font-medium"
              />
              <IoClose
                onClick={() => setValue("name", "")}
                className="absolute right-1 bottom-2 z-10 cursor-pointer text-xl text-dark_blue"
              />
            </div> */}

            <div className=" relative">
              <FormInput
                name="location"
                label="Location"
                control={control}
                errors={errors}
                className="bg-cream  focus-visible:ring-0 focus:ring-offset-0 focus:outline-none focus:border-none text-lg text-dark_blue font-medium"
              />
              <IoClose
                onClick={() => setValue("location", "")}
                className="absolute right-1 bottom-2 z-10 cursor-pointer text-xl text-dark_blue"
              />
            </div>
            <div className=" flex flex-col justify-start gap-2 md:gap-3 h-full">
              <h3 className="text-sm md:text-base font-semibold text-dark_blue">
                Price range
              </h3>
              <RangeSlider
                value={priceRange}
                onInput={setPriceRange}
                min={0}
                max={10000}
                step={10}
                id="range-slider-yellow"
              />
              <p className="text-base font-medium p-0">
                $ {priceRange[0]} - $ {priceRange[1]}
              </p>
            </div>
            <div className="col-span-1 relative max-w-[600px]">
              <FormPhotographyStyles
                setStyles={setStyles}
                styles={styles}
                label="Specialization"
                search={true}
              />
              {styles.length > 0 && (
                <Button
                  onClick={() => setStyles([])}
                  className="h-fit px-1 py-1 text-xs font-light"
                >
                  Clear filter
                </Button>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full max-w-[300px] h-12 rounded-full font-bold  mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-4"
            disabled={isLoading}
          >
            {isLoading || isFetching ? (
              <SpinnerLoader conHeight="100%" className="text-xl" />
            ) : (
              "Search"
            )}
          </Button>
        </form>
      </Form>

      <Separator className="my-12" />
      {photographerData && (
        <div className="space-y-14">
          <SearchResult photographers={photographerData.data} />
          <PaginationComponent
            isFetching={isFetching}
            metadata={photographerData.metadata}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default MainSearch;
