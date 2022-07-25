import Fuse from "fuse.js";
import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import LoadingComponent from "../../components/LoadingComponent";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import useAuth from "../../hooks/useAuth";
import { Product } from "../../models/Product";
import { getAllProducts } from "../api/Products";
import { getSearchOptions } from "../api/Searcher";
import CreateProduct from "./CreateProduct";

export const AddProductContext = createContext<ContextModal>({ isOpen: false, setOpen: () => { } });
const SearchProductContext = createContext<SearchContext>(
  {
    allProducts: [],
    setAllProducts: () => { },
    search: () => { },
    filteredProducts: []
  }
);

interface ContextModal {
  isOpen: boolean,
  setOpen: Function
}

interface SearchContext {
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;
  search: (keyword: string) => void;
  filteredProducts: Product[];
}

export default function Productos(): ReactElement {
  const [addProductOpen, setAddProductOpen] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const searchHandler = async (keyword: string) => {
    console.log("Searching..." + keyword)
    const fuse = new Fuse<Product>(allProducts, getSearchOptions(["product_name"]));
    const searchResult: Fuse.FuseResult<Product>[] = fuse.search(keyword);
    const resultsList: Product[] = searchResult.map(({ item }) => item);
    console.log("Res" + resultsList)
    setFilteredProducts(resultsList);
  }

  return (
    <AddProductContext.Provider value={{ isOpen: addProductOpen, setOpen: setAddProductOpen }}>
      {addProductOpen === true &&
        <CreateProduct />
      }
      <SearchProductContext.Provider value={{ search: searchHandler, filteredProducts: filteredProducts, allProducts: allProducts, setAllProducts: setAllProducts }}>
        <Header />
        <ProductsList />
        <NavBar />
      </SearchProductContext.Provider>
    </AddProductContext.Provider>
  )
}


function Header(): ReactElement {
  const { setOpen } = useContext(AddProductContext);
  const { search } = useContext(SearchProductContext);
  return (
    <header className="flex flex-row m-5 justify-between tablet:flex-col">
      <h1 className="font-bold text-2xl">Productos</h1>
      <SearchserInput placeholder="Busca los productos aqui" onSearch={(text: string) => search(text)} />
      <div className="w-100">
        <ActionButton onClick={() => setOpen(true)} text="Crear Producto" dark={false} preventDefault={false} />
      </div>
    </header>
  );
}


function ProductsList(): ReactElement {
  const { allProducts, setAllProducts, filteredProducts } = useContext(SearchProductContext);
  const { isOpen } = useContext(AddProductContext);
  const [loading, setLoading] = useState<boolean>();
  const { token } = useAuth();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const elements = await getAllProducts(token?.access);
      setAllProducts(elements);
      setLoading(false);
    }
    getData();
  }, [, isOpen]);

  return (
    <div className="flex flex-col items-center justify-center m-14">
      <table className="w-full">
        <ListHeader />
        <tbody>
          {filteredProducts.length > 0 ?
            filteredProducts?.map((product, index) => <ProductComponent product={product} key={index} />) :
            (allProducts &&
              allProducts?.map((product, index) => <ProductComponent product={product} key={index} />)
            )
          }
        </tbody>
      </table>
      {loading === true &&
        <LoadingComponent />
      }
    </div>
  )
}

function ListHeader(): ReactElement {
  const lineStyle: string = "font-normal text-1xl bg-white";
  return (
    <thead className="sticky top-0">
      <tr className="table-auto">
        <th className={lineStyle}>
          Nombre
        </th>
        <th className={lineStyle}>
          Unidad de medida
        </th>
        <th className={lineStyle}>
          Valor Unitario
        </th>
        <th className={lineStyle}>
          Inventario
        </th>
        <th className={lineStyle}>
          Entrega
        </th>
      </tr>
    </thead>
  )
}

function ProductComponent(props: ProductProps): ReactElement {
  const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3";
  return (
    <tr className="shadow-md rounded">
      <td className={lineStyle}>
        {props.product.product_name}
      </td>
      <td className={lineStyle}>
        Kg
      </td>
      <td className={lineStyle}>
        {props.product.product_price}
      </td>
      <td className={lineStyle}>
        {props.product.product_units}
      </td>
      <td className={lineStyle}>
        {props.product.product_units != "0" ? "Disponible" : "Agotado"}
      </td>
    </tr>
  )
}

interface ProductProps {
  product: Product
}
