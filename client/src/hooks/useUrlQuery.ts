import { useState } from "react";

const useUrlQuery = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return {
    page,
    setPage,
    limit,
    setLimit,
  };
};

export default useUrlQuery;
