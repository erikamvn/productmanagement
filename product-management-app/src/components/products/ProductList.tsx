import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/router";
import ProductFilterSort from "./ProductFilterSort";
import useSearchAndFilter from "@/hook/useSearchAndFilter";
import { toast } from "react-toastify";
import _ from "lodash"; // Importando o lodash
import { useProductStore } from "@/store/productStore";
import Pagination from "../shared/Pagination";

const ProductList = () => {
  const router = useRouter();

  // Usando seletores para acessar os dados do produto no Zustand
  const products = useProductStore((state) => state.products) || [];
  const isLoading = useProductStore((state) => state.isLoading);
  const error = useProductStore((state) => state.error);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const currentPage = useProductStore((state) => state.currentPage);
  const itemsPerPage = useProductStore((state) => state.itemsPerPage);
  const totalProducts = useProductStore((state) => state.totalProducts);
  const setCurrentPage = useProductStore((state) => state.setCurrentPage);
  const sortBy = useProductStore((state) => state.sortBy);
  const setSortBy = useProductStore((state) => state.setSortBy);

  // Usando o hook para controle de busca e filtros
  const {
    searchQuery,
    setSearchQuery,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    debouncedSearchQuery,
    debouncedMinPrice,
    debouncedMaxPrice,
  } = useSearchAndFilter("", 0, 1000); // Valores iniciais de busca e preço

  const [hasLoaded, setHasLoaded] = React.useState(false);

  // Usando debounce do lodash para otimizar a chamada ao fetchProducts
  const debouncedFetchProducts = React.useMemo(
    () =>
      _.debounce(
        (
          currentPage,
          itemsPerPage,
          sortBy,
          debouncedSearchQuery,
          debouncedMinPrice,
          debouncedMaxPrice
        ) =>
          fetchProducts(
            currentPage,
            itemsPerPage,
            sortBy,
            debouncedSearchQuery,
            debouncedMinPrice,
            debouncedMaxPrice
          ),
        500 // Definindo 500ms de debounce
      ),
    [fetchProducts]
  );

  useEffect(() => {
    debouncedFetchProducts(
      currentPage,
      itemsPerPage,
      sortBy,
      debouncedSearchQuery,
      debouncedMinPrice,
      debouncedMaxPrice
    );
  }, [
    currentPage,
    itemsPerPage,
    sortBy,
    debouncedSearchQuery,
    debouncedMinPrice,
    debouncedMaxPrice,
    debouncedFetchProducts, // Certifique-se de passar a versão debounced da função
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedMinPrice, debouncedMaxPrice, setCurrentPage]);

  useEffect(() => {
    if (isLoading && !hasLoaded) {
      toast.info("Carregando produtos...");
      setHasLoaded(true);
    }
  }, [isLoading, hasLoaded]);

  useEffect(() => {
    if (error) {
      toast.error(`Erro: ${error}`);
    }
  }, [error]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as "price" | "title");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
  };

  const handleAddProductClick = () => {
    router.push("/products/new");
  };

  const renderCards = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            image={
              product.imageUrl || "https://picsum.photos/200/200?random=99999"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 ">Lista de Produtos</h1>
      <div className="mb-4 flex items-center justify-between">
        <ProductFilterSort
          sortBy={sortBy}
          searchQuery={searchQuery}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
        />

        <button
          onClick={handleAddProductClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          aria-label="Cadastrar um novo produto"
        >
          Cadastrar Produto
        </button>
      </div>
      {products.length === 0 ? (
        <div className="text-2xl font-bold text-center mt-20 mb-20">
          Não foram encontrados produtos
        </div>
      ) : (
        renderCards()
      )}

      {products.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
};

export default ProductList;
