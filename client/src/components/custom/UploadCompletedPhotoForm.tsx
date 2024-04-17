import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import SpinnerLoader from "../../components/custom/SpinnerLoader";
import { uploadPhotographerFinishedPhotoSchema } from "../../schemas/bookingSchema";
import {
  useUploadPhotographerFinishedPhoto,
} from "../../apis/bookings";
import FormImageInput from "./FormImageInput";
import { useEffect, useState } from "react";

interface UploadCompletedPhotoFormProps {
  booking: BookingType;
}
const UploadCompletedPhotoForm: React.FC<UploadCompletedPhotoFormProps> = ({
  booking,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [img, setImg] = useState<ArrayBuffer | string | null>();
  const { mutateAsync: upload, isLoading } = useUploadPhotographerFinishedPhoto(
    booking.photographerId
  );

  const form = useForm<z.infer<typeof uploadPhotographerFinishedPhotoSchema>>({
    resolver: zodResolver(uploadPhotographerFinishedPhotoSchema),
    defaultValues: {
      createdBy: booking.photographerId,
      image: undefined,
      bookingId: booking._id,
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  async function onSubmit(
    values: z.infer<typeof uploadPhotographerFinishedPhotoSchema>
  ) {
    await upload({ image: img!, bookingId: values.bookingId });
    setValue("image", undefined);
    setSelectedImage(null);
  }

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
  return (
    <div className="w-full space-y-4 p-4">
      <h1 className="text-2xl md:text-4xl mb-4 font-semibold text-dark_blue underline underline-offset-2">
        Upload Finished Photos
      </h1>
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormImageInput
              name="image"
              control={control}
              errors={errors}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <Button
              type="submit"
              className="w-full max-w-[200px] h-12 rounded-full font-bold  mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-4"
              disabled={isLoading || booking.client_accepted}
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
    </div>
  );
};

export default UploadCompletedPhotoForm;
