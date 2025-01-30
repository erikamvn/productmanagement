import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const useSearchAndFilter = (
  initialSearchQuery: string = "",
  initialMinPrice: number = 0,
  initialMaxPrice: number = 1000
) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [minPrice, setMinPrice] = useState(Math.max(0, initialMinPrice));
  const [maxPrice, setMaxPrice] = useState(Math.max(minPrice, initialMaxPrice));

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);

  const debouncedFilter = useCallback(
    debounce(() => {
      setDebouncedSearchQuery(searchQuery);
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
    }, 500),
    [searchQuery, minPrice, maxPrice] // useCallback só recria quando essas variáveis mudam
  );

  useEffect(() => {
    debouncedFilter(); // Executa o filtro debounced
    return () => {
      debouncedFilter.cancel(); // Cancela o debounce se o componente for desmontado
    };
  }, [debouncedFilter]); // Dependência da função debounced

  return {
    searchQuery,
    setSearchQuery,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    debouncedSearchQuery,
    debouncedMinPrice,
    debouncedMaxPrice,
  };
};

export default useSearchAndFilter;
