import { createContext, ReactElement, useContext, useState } from "react";
import { ModalsContext } from ".";
import Modal from "../../components/Modal";
import * as Icon from "react-bootstrap-icons";
import SearchserInput from "../../components/SearcherInput";
import { Product } from "../../models/Product";
import Fuse from "fuse.js";
import { getSearchOptions } from "../api/Searcher";
import ProductsViewer from "./ProductsViewer";

export const SearchProductContext = createContext<SearchContext>(
  {
    allProducts: [],
    setAllProducts: () => { },
    search: () => { },
    filteredProducts: []
  }
);

interface SearchContext {
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;
  search: (keyword: string) => void;
  filteredProducts: Product[];
}

export default function SearchProducts(): ReactElement {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const searchHandler = async (keyword: string) => {
    const fuse = new Fuse<Product>(allProducts, getSearchOptions(["product_name"]));
    const searchResult: Fuse.FuseResult<Product>[] = fuse.search(keyword);
    const resultsList: Product[] = searchResult.map(({ item }) => item);
    setFilteredProducts(resultsList);
  }

  return (
    <Modal>
      <SearchProductContext.Provider value={{ search: searchHandler, filteredProducts: filteredProducts, allProducts: allProducts, setAllProducts: setAllProducts }}>
        <ModalHeader />
        <ProductsViewer />
      </SearchProductContext.Provider>
    </Modal>
  )
}

function ModalHeader(): ReactElement {
  const { setSearchProductsOpen } = useContext(ModalsContext);
  const [_lastSearch, setLastSearch] = useState<string>("");
  const { search } = useContext(SearchProductContext);

  return (
    <header className="flex flex-row justify-between">
      <h1 className="text-2xl bold">Buscar Productos</h1>
      <SearchserInput placeholder="Busca los productos aqui" onSearch={(text: string) => {
        setLastSearch(text);
        search(text);
      }} />
      <button onClick={() => setSearchProductsOpen(false)}>
        <Icon.X size={30} className="text-black" />
      </button>
    </header>
  );
}
