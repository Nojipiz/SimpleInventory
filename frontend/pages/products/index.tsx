import Fuse from "fuse.js";
import {createContext, ReactElement, useContext, useEffect, useState} from "react";
import ActionButton from "../../components/ActionButton";
import LoadingComponent from "../../components/LoadingComponent";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import useAuth from "../../hooks/useAuth";
import {Product} from "../../models/Product";
import {deleteProduct, getAllProducts} from "../api/Products";
import {getSearchOptions} from "../api/Searcher";
import CreateProduct from "./CreateProduct";
import * as Icon from "react-bootstrap-icons";
import EditProduct from "./EditProduct";

export const AddProductContext = createContext<ContextModal>({
  isOpen: false, setOpen: () => {
  }
});
export const EditProductContext = createContext<ContextModalEdit>({
  isOpen: false, setOpen: () => {
  },
  idProduct: "",
  setIdProduct: () => {
  }
});
export const ReloadProductsContext = createContext<ReloadContext>({
  reload: false, setReload: () => {
  }
});
const SearchProductContext = createContext<SearchContext>(
  {
    allProducts: [],
    setAllProducts: () => {
    },
    search: () => {
    },
    filteredProducts: []
  }
);

interface ReloadContext {
  reload: boolean;
  setReload: Function
}

interface ContextModal {
  isOpen: boolean,
  setOpen: Function
}

interface ContextModalEdit {
  isOpen: boolean,
  setOpen: Function,
  idProduct: string,
  setIdProduct: Function
}

interface SearchContext {
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;
  search: (keyword: string) => void;
  filteredProducts: Product[];
}

export default function Products(): ReactElement {
  const [addProductOpen, setAddProductOpen] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [reloadProducts, setReloadProducts] = useState<boolean>(false);
  const [editProductOpen, setEditProductOpen] = useState<boolean>(false);
  const [idProduct, setIdProduct] = useState<string>("");

  const searchHandler = async (keyword: string) => {
    const fuse = new Fuse<Product>(allProducts, getSearchOptions(["product_name"]));
    const searchResult: Fuse.FuseResult<Product>[] = fuse.search(keyword);
    const resultsList: Product[] = searchResult.map(({item}) => item);
    setFilteredProducts(resultsList);
  }

  return (
    <ReloadProductsContext.Provider
      value={{reload: reloadProducts, setReload: setReloadProducts}}>
      <EditProductContext.Provider value={{
        isOpen: editProductOpen,
        setOpen: setEditProductOpen,
        idProduct: idProduct,
        setIdProduct: setIdProduct
      }}>
        {
          editProductOpen===true && <EditProduct idProduct={idProduct}/>
        }
        <AddProductContext.Provider value={{isOpen: addProductOpen, setOpen: setAddProductOpen}}>
          {addProductOpen &&
            <CreateProduct/>
          }
          <SearchProductContext.Provider value={{
            search: searchHandler,
            filteredProducts: filteredProducts,
            allProducts: allProducts,
            setAllProducts: setAllProducts
          }}>
            <Header/>

            <ProductsList/>

            <NavBar/>
          </SearchProductContext.Provider>
        </AddProductContext.Provider>
      </EditProductContext.Provider>
    </ReloadProductsContext.Provider>
  )
}


function Header(): ReactElement {
  const {setOpen} = useContext(AddProductContext);
  const {search, allProducts} = useContext(SearchProductContext);
  const [lastSearch, setLastSearch] = useState<string>("");

  useEffect(() => {
    if (!lastSearch) return;
    search(lastSearch);
  }, [allProducts]);

  return (
    <header className="flex flex-row m-5 justify-between tablet:flex-col">
      <h1 className="font-bold text-2xl">Productos</h1>
      <SearchserInput placeholder="Busca los productos aqui" onSearch={(text: string) => {
        setLastSearch(text);
        search(text);
      }}/>
      <div className="w-100">
        <ActionButton onClick={() => setOpen(true)} text="Crear Producto" dark={false}
                      preventDefault={false}/>
      </div>
    </header>
  );
}


function ProductsList(): ReactElement {
  const {allProducts, setAllProducts, filteredProducts} = useContext(SearchProductContext);
  const {isOpen} = useContext(AddProductContext);
  const {reload} = useContext(ReloadProductsContext);
  const [loading, setLoading] = useState<boolean>();
  const {token} = useAuth();

  const loadDataHandler = async () => {
    setLoading(true);
    const elements = await getAllProducts(token?.access);
    setAllProducts(elements);
    setLoading(false);
  }

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    loadDataHandler();
  }, [, isOpen, reload]);

  return (
    <div className="flex flex-col items-center justify-center m-14 mb-20">
      <table className="w-full">
        <ListHeader/>
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
        <LoadingComponent/>
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
      <th className={lineStyle}>
        Borrar
      </th>
      <th className={lineStyle}>
        Editar
      </th>
    </tr>
    </thead>
  )
}

function ProductComponent(props: ProductProps): ReactElement {
  const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3";
  const {reload, setReload} = useContext(ReloadProductsContext);
  const {token} = useAuth();
  const {setOpen, setIdProduct} = useContext(EditProductContext);

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
      <td className={lineStyle}>
        <button className="items-center justify-center"
                onClick={async () => {
                  await deleteProduct(token?.access, props.product.product_id);
                  setReload(!reload);
                }}>
          <Icon.Trash size={28} className={"text-black hover:scale-105"}/>
        </button>
      </td>
      <td className={lineStyle}>
        <button className="items-center justify-center"
                onClick={() => {
                  setOpen(true);
                  setIdProduct(props.product.product_id);
                }}>
          <Icon.PencilSquare size={28} className={"text-black hover:scale-105"}/>
        </button>
      </td>
    </tr>
  )
}

interface ProductProps {
  product: Product
}
