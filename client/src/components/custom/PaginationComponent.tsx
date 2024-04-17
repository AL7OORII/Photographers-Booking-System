import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../../components/ui/pagination";
import { Button } from "../ui/button";

interface PaginationComponentProps {
  metadata: MetadataType;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
}
const PaginationComponent: React.FC<PaginationComponentProps> = ({
  metadata,
  page,
  setPage,
  isFetching,
}) => {
  const { currentPage, nextPage, previousPage, totalPages } = metadata;

  return (
    <Pagination className="my-4">
      <PaginationContent className=" w-full flex justify-between gap-6 flex-wrap">
        <PaginationItem>
          <Button
            className="px-1 py-1 h-fit text-sm font-normal bg-dark_blue text-cream"
            onClick={() => setPage(page - 1)}
            disabled={!previousPage || isFetching}
          >
            Previous
          </Button>
        </PaginationItem>
        <div className="flex items-center gap-2 ">
          <p className="text-sm text-dark_blue font-semibold">
            page {currentPage} of {totalPages}
          </p>
          <Button
            className="px-1 py-1 h-fit text-sm font-normal bg-dark_blue text-cream"
            onClick={() => setPage(totalPages)}
            disabled={isFetching || !nextPage}
          >
            Most recent
          </Button>
        </div>

        <PaginationItem>
          <Button
            className="px-1 py-1 h-fit text-sm font-normal bg-dark_blue text-cream"
            onClick={() => setPage(page + 1)}
            disabled={!nextPage || isFetching}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
