import { useGetTopPhotographers } from "../../apis/photographer";
import PageLoader from "./PageLoader";
import TopRatedCard from "./TopRatedCard";

interface RecommendationProps {}

const Recommendation: React.FC<RecommendationProps> = () => {
  const { data: photographers, isLoading } = useGetTopPhotographers();

  return (
    <div className="bg-light p-4 md:p-8 min-h-[50vh]">
      <h1 className="text-2xl md:text-4xl mb-4 font-semibold text-dark_blue underline underline-offset-2">
        Recommendations
      </h1>
      {isLoading && <PageLoader className="text-6xl text-dark_blue" />}
      {photographers && (
        <div className="my-6">
          <div className="grid md:grid-cols-2 min-[1400px]:grid-cols-3 gap-4">
            {photographers.map((photographer) => (
              <TopRatedCard
                photographer={photographer}
                key={photographer._id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
