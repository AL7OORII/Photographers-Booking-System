import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { uploadPicSchema } from "../../schemas/uploadPicSchema";
import { useEffect, useState } from "react";
import { useUploadPhotographerPhotos } from "../../apis/photographer";
import FormImageInput from "../../components/custom/FormImageInput";
import SpinnerLoader from "../../components/custom/SpinnerLoader";
import PhotographerPhotos from "../../components/custom/PhotographerPhotos";
import { useParams } from "react-router-dom";
import { Separator } from "../../components/ui/separator";

const UploadPicsPage = () => {
  const [img, setImg] = useState<ArrayBuffer | string | null>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { photographerId } = useParams();

  const { mutateAsync: upload, isLoading } = useUploadPhotographerPhotos(
    photographerId!
  );

  const form = useForm<z.infer<typeof uploadPicSchema>>({
    resolver: zodResolver(uploadPicSchema),
    defaultValues: {},
  });

  const {
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    const reader = new FileReader();
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setImg(reader.result);
      };
    } else {
      setImg(null);
    }
  }, [selectedImage]);

  async function onSubmit(values: z.infer<typeof uploadPicSchema>) {
    await upload(img!);
    setSelectedImage(null);
  }

  useEffect(() => {
    trigger("image");
  }, [selectedImage]);
  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="bg-cream rounded-2xl p-6 flex flex-col h-fit w-[96%] max-w-[700px] items-center">
        <h1 className="text-2xl md:text-4xl mb-4 font-semibold underline underline-offset-2">
          Upload Pictures
        </h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormImageInput
              name="image"
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              errors={errors}
              control={control}
            />
            <Button
              type="submit"
              className="w-full h-14 rounded-full font-bold  mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <SpinnerLoader conHeight="100%" className="text-xl" />
              ) : (
                "Upload"
              )}
            </Button>
          </form>
        </Form>
      </div>
      <Separator className="my-12" />

      <PhotographerPhotos photographerId={photographerId!} />
    </div>
  );
};

export default UploadPicsPage;
