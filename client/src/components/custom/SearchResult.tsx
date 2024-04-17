import TopRatedCard from "./TopRatedCard";

interface SearchResultProps {
  photographers: PhotographerType[];
}
const SearchResult: React.FC<SearchResultProps> = ({ photographers }) => {
  if (photographers.length === 0) {
    return (
      <div className="space-y-8">
        <h1 className="text-2xl md:text-4xl mb-4 font-semibold text-dark_blue">
          Result
        </h1>
        <h1 className="text-2xl text-cream font-medium">
          No Photographer meets your search criteria
        </h1>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-4xl mb-4 font-semibold text-dark_blue">
        Result
      </h1>
      <div className="grid lg:grid-cols-2  gap-4">
        {photographers.map((photographer) => (
          <TopRatedCard photographer={photographer} key={photographer._id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
