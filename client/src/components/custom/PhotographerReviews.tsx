import { useParams } from "react-router-dom";
import { useGetPhotographerReviews } from "../../apis/photographer";
import useUrlQuery from "../../hooks/useUrlQuery";
import PageLoader from "./PageLoader";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import PaginationComponent from "./PaginationComponent";
import { format } from "date-fns";

interface PhotographerReviewsProps {}
const PhotographerReviews: React.FC<PhotographerReviewsProps> = () => {
  const { photographerId } = useParams();
  const { limit, page, setPage } = useUrlQuery();
  const {
    data: reviewsData,
    isLoading,
    isFetching,
  } = useGetPhotographerReviews(photographerId!, page, limit);

  return (
    <div className="bg-light px-4 py-8 my-8 space-y-6">
      <h1 className="text-dark_blue text-2xl md:text-4xl">Reviews</h1>
      {isLoading && <PageLoader className="text-dark_blue text-6xl" />}
      {!isLoading && reviewsData && reviewsData.data.length === 0 && (
        <h1 className="text-center my-10 text-2zl">No reviews yet</h1>
      )}
      {!isLoading && reviewsData && (
        <div className="space-y-10">
          <div className="space-y-8">
            {reviewsData.data.map((review) => (
              <div key={review._id} className="">
                <div className="flex justify-start items-start gap-3">
                  <Avatar className="">
                    <AvatarFallback className=" text-cream text-sm font-semibold bg-dark_red relative">
                      {review.client?.first_Name.slice(0, 1) ??
                        review.client?.last_Name.slice(0, 1) ??
                        ""}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start  ">
                      <h1 className="text-base capitalize font-semibold text-dark_blue">
                        {review?.client?.first_Name || review?.client?.last_Name
                          ? `${review?.client?.first_Name} ${review?.client?.last_Name}`
                          : "removed user"}
                      </h1>
                      <p className="text-sm text-dark_blue">
                        {format(new Date(review.createdAt), "MMMM dd yyyy")}
                      </p>
                    </div>
                    <h1 className="font-normal text-sm">{review.text}</h1>
                  </div>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
          <PaginationComponent
            isFetching={isFetching}
            metadata={reviewsData.metadata}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default PhotographerReviews;
