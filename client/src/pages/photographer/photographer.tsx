import { useParams } from "react-router";
import PageLoader from "../../components/custom/PageLoader";
import DisplayPhotographyStyles from "../../components/custom/DisplayPhotographyStyles";
import { Button } from "../../components/ui/button";
import { useGetPhotographerDetails } from "../../apis/photographer";
import Rating from "../../components/custom/Rating";
import { useAuthContext } from "../../providers/AuthProvider";
import useDisclosure from "../../hooks/useDisclosure";
import PhotographerPhotos from "../../components/custom/PhotographerPhotos";
import BookPhotographerForm from "../../components/custom/BookPhotographerForm";
import { Separator } from "../../components/ui/separator";
import PhotographerReviews from "../../components/custom/PhotographerReviews";
import { Location, Profile } from "iconsax-react";
import FetchingError from "../../components/custom/FetchingError";

const PhotographerProfilePage = () => {
  const { isModalOpen, onModalClose, onModalOpen } = useDisclosure();
  const { photographerId } = useParams();
  const { user } = useAuthContext();
  const {
    data: photographer,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetPhotographerDetails(photographerId!);

  return (
    <div className="p-4 md:p-8">
      {isLoading && <PageLoader className="text-cream text-6xl" />}
      {photographer && (
        <>
          <div>
            <div className="space-y-5">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <h1 className="text-4xl text-cream">
                    {photographer.first_Name} {photographer.last_Name}
                  </h1>
                  <p className="text-cream text-xl">{photographer.email}</p>
                </div>
                {user && photographerId !== user.id && (
                  <Button
                    onClick={onModalOpen}
                    className="w-[200px] text-2xl text-cream h-12 bg-dark_red hover:bg-dark_red/80"
                  >
                    Book
                  </Button>
                )}
              </div>
              <div>
                <h1 className="text-cream">
                  $ {photographer.price_range.min} -{" "}
                  {photographer.price_range.max}
                </h1>
              </div>
              <h1 className="text-cream flex gap-1">
                <Location /> {photographer.location}
              </h1>
              <div className="flex items-center gap-2">
                <h1 className="text-cream text-lg">
                  {photographer.averageRating.toFixed(1)}
                </h1>
                <Rating
                  rating={photographer.averageRating}
                  edit={false}
                  size={30}
                  isHalf={true}
                />
                <span className="text-cream">
                  ({photographer.ratings.length} ratings)
                </span>
              </div>
              <h1 className="text-cream">
                {/* <Profile size={50} /> <br /> */}
                {photographer.description}
              </h1>
              <h1 className="text-cream">
                Other services: <br />
                <span>{photographer.other_services}</span>
              </h1>
              <DisplayPhotographyStyles
                styles={photographer.photography_style!}
              />
            </div>
          </div>
          <Separator className="my-12" />

          <PhotographerPhotos photographerId={photographerId!} />
          <Separator className="my-12" />
          <PhotographerReviews />
        </>
      )}
      <BookPhotographerForm close={onModalClose} isOpen={isModalOpen} />
      {isError && !isLoading && (
        <FetchingError
          message="Error fetching profile"
          refetching={isFetching}
          retryFunction={refetch}
        />
      )}
    </div>
  );
};

export default PhotographerProfilePage;
