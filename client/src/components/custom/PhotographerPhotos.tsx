import {
  handleDeletePhotographerPhoto,
  useGetPhotographerPhotos,
} from "../../apis/photographer";
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
import SpinnerLoader from "./SpinnerLoader";

interface PhotographerPhotosProps {
  photographerId: string;
}

const PhotographerPhotos: React.FC<PhotographerPhotosProps> = ({
  photographerId,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    isLoading,
    data: photos,
    refetch,
  } = useGetPhotographerPhotos(photographerId);
  const { user } = useAuthContext();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const handleDeletePhoto = async (photoId: string) => {
    console.log(photoId);
    
    setIsDeleting(true);
    try {
      const result = await handleDeletePhotographerPhoto(photoId);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
      refetch();
    }
  };

  return (
    <div className=" space-y-8 px-6">
      <h1 className="text-cream text-2xl md:text-4xl">Previous Works</h1>
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
                      {user && photographerId === user.id && (
                        <Button
                          className="absolute bottom-0 left-0 w-full hover:bg-dark_blue cursor-pointer"
                          onClick={() => handleDeletePhoto(photo._id)}
                          disabled={isDeleting}
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
    </div>
  );
};

export default PhotographerPhotos;
