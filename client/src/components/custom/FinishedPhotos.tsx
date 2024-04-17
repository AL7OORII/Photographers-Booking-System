import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { useRef, useState } from "react";
import PageLoader from "./PageLoader";
import { Button } from "../ui/button";
import { useAuthContext } from "../../providers/AuthProvider";
import {
  handleDeleteFinishedPhoto,
  useGetPhotographerFinishedPhotos,
} from "../../apis/bookings";
import { useParams } from "react-router-dom";
import SpinnerLoader from "./SpinnerLoader";

interface FinishedPhotosProps {
  booking: BookingType;
}
const FinishedPhotos: React.FC<FinishedPhotosProps> = ({ booking }) => {
  const { client_accepted } = booking;

  const [isDeleting, setIsDeleting] = useState(false);

  const { bookingId } = useParams();
  const { user } = useAuthContext();
  const {
    data: photos,
    isLoading,
    refetch,
  } = useGetPhotographerFinishedPhotos(bookingId!);

  const handleDeletePhoto = async (photoId: string) => {
    setIsDeleting(true);
    try {
      const result = await handleDeleteFinishedPhoto(photoId);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
      refetch();
    }
  };

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className=" space-y-8 ">
      <h1 className="text-2xl md:text-4xl mb-4 font-semibold text-dark_blue underline underline-offset-2">
        Finished Photos
      </h1>
      <div className="flex justify-center px-2">
        {photos && (
          <Carousel
            plugins={[plugin.current]}
            className="w-[90%] md:w-[95%] max-w-[1500px]"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            {isLoading && <PageLoader className="text-6xl text-cream" />}

            {photos && photos.length === 0 && (
              <h1 className="text-light_red text-2xl md:text-4xl text-center">
                No Photos
              </h1>
            )}

            {photos && photos.length > 0 && (
              <>
                <CarouselContent className="overflow-x-visible my-10">
                  {photos.map((photo) => (
                    <CarouselItem
                      // className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      className="md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
                      key={photo._id}
                    >
                      <Card className="">
                        <CardContent className="flex aspect-square flex-col p-0 relative">
                          <img
                            src={photo.secure_url}
                            alt="picture"
                            className="absolute top-0 left-0 object-contain w-full h-full"
                          />
                          {user && photo.createdBy === user.id && (
                            <Button
                              className="absolute bottom-0 left-0 w-full hover:bg-dark_blue cursor-pointer"
                              onClick={() => handleDeletePhoto(photo._id)}
                              disabled={isDeleting || client_accepted}
                            >
                              {isDeleting ? (
                                <SpinnerLoader
                                  conHeight="100%"
                                  className="text-xl"
                                />
                              ) : (
                                "Delete"
                              )}
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default FinishedPhotos;
