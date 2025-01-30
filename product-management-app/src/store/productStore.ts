import { fetchProducts } from "@/services/productService";
import { Product } from "@/types/productTypes";
import { create } from "zustand";
import { filterProducts, sortProducts } from "../utils/products";

/** Define os critérios de ordenação */
type SortOption = "price" | "title";

/** Define a estrutura da store */
type ProductStore = {
  products: Product[];
  allProducts: Product[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalProducts: number;
  itemsPerPage: number;
  sortBy: SortOption;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  fetchProducts: (
    page: number,
    limit: number,
    sortBy: SortOption,
    searchQuery: string,
    minPrice: number,
    maxPrice: number
  ) => Promise<void>;
  addProduct: (newProduct: Product & { id: string | number }) => void;
  setError: (error: string) => void;
  setCurrentPage: (page: number) => void;
  setSortBy: (sortBy: SortOption) => void;
  setSearchQuery: (query: string) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
};

/** Estado inicial da store */
const initialState: Omit<
  ProductStore,
  | "fetchProducts"
  | "addProduct"
  | "setError"
  | "setCurrentPage"
  | "setSortBy"
  | "setSearchQuery"
  | "setMinPrice"
  | "setMaxPrice"
> = {
  products: [],
  allProducts: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalProducts: 0,
  itemsPerPage: 8,
  sortBy: "price",
  searchQuery: "",
  minPrice: 0,
  maxPrice: 10000,
};

/** Criação da store usando Zustand */
export const useProductStore = create<ProductStore>((set, get) => ({
  ...initialState,

  fetchProducts: async (
    page: number,
    limit: number,
    sortBy: SortOption,
    searchQuery: string,
    minPrice: number,
    maxPrice: number
  ): Promise<void> => {
    set({ isLoading: true });

    try {
      const state = get();
      const allProducts: Product[] =
        state.allProducts.length > 0
          ? state.allProducts
          : await fetchProducts();

      const filteredProducts: Product[] = filterProducts(
        allProducts,
        searchQuery,
        minPrice,
        maxPrice
      );
      const sortedProducts: Product[] = sortProducts(filteredProducts, sortBy);
      const paginatedProducts: Product[] = sortedProducts.slice(
        (page - 1) * limit,
        page * limit
      );

      set({
        products: paginatedProducts,
        isLoading: false,
        currentPage: page,
        totalProducts: filteredProducts.length,
        allProducts,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      set({ error: errorMessage, isLoading: false });
    }
  },

  addProduct: (newProduct: Product & { id: string | number }): void =>
    set((state) => {
      const allProducts: Product[] = [...state.allProducts];
      const products: Product[] = [...state.products];

      if (!allProducts.some((product) => product.id === newProduct.id)) {
        allProducts.push(newProduct);
        products.push(newProduct);
      }

      return {
        allProducts,
        products,
        totalProducts: allProducts.length,
      };
    }),

  setError: (error: string): void => set({ error }),
  setCurrentPage: (page: number): void => set({ currentPage: page }),
  setSortBy: (sortBy: SortOption): void => set({ sortBy }),
  setSearchQuery: (query: string): void => set({ searchQuery: query }),
  setMinPrice: (price: number): void => set({ minPrice: price }),
  setMaxPrice: (price: number): void => set({ maxPrice: price }),
}));
