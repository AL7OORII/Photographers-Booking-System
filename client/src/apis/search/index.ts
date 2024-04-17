import { useQuery } from "react-query";
import axios from "axios";
import { SEARCH_PHOTOGRAPHER_ENDPOINT } from "../endpoint";

// SEARCH PHOTOGRAPHER
export const useSearchPhotographer = ({
  location,
  name,
  max_price,
  min_price,
  photography_style,
  page,
  limit,
}: {
  page: number;
  limit: number;
  location?: string;
  name?: string;
  max_price?: string;
  min_price?: string;
  photography_style?: string;
}) => {
  return useQuery(
    ["search-photographers"],
    (): Promise<PhotographerSearchDataType> => {
      return axios
        .get(
          SEARCH_PHOTOGRAPHER_ENDPOINT(
            page,
            limit,
            location,
            name,
            max_price,
            min_price,
            photography_style
          ),
          {}
        )
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: false,
    }
  );
};
