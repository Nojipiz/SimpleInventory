import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import LoadingComponent from "../../components/LoadingComponent";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import useAuth from "../../hooks/useAuth";
import Category from "../../models/Category";
import { getAllCategories } from "../api/Categories";
import CreateCategory from "./CreateCategory";

export const AddCategoryContext = createContext<ContextModal>({ isOpen: false, setOpen: () => { } });

interface ContextModal {
  isOpen: boolean,
  setOpen: Function
}
export default function Categories(): ReactElement {
  const [addCategoryOpen, setAddCategoryOpen] = useState<boolean>(false);
  return (
    <AddCategoryContext.Provider value={{ isOpen: addCategoryOpen, setOpen: setAddCategoryOpen }}>
      {addCategoryOpen === true &&
        <CreateCategory />
      }
      <Header />
      <CategoriesList />
      <NavBar />
    </AddCategoryContext.Provider>
  )
}


function Header(): ReactElement {
  const { setOpen } = useContext(AddCategoryContext);
  return (
    <header className="flex flex-row m-5 justify-between tablet:flex-col">
      <h1 className="font-bold text-2xl">Categorias</h1>
      <SearchserInput placeholder="Busca las categorias aqui" onSearch={() => console.log("This must search")} />
      <div className="w-100">
        <ActionButton onClick={() => setOpen(true)} text="Crear Categoria" dark={false} preventDefault={false} />
      </div>
    </header>
  );
}

function CategoriesList(): ReactElement {
  const { isOpen } = useContext(AddCategoryContext);
  const [products, setProducts] = useState<Category[]>();
  const [loading, setLoading] = useState<boolean>();
  const { token } = useAuth();
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    const getData = async () => {
      setLoading(true);
      const elements = await getAllCategories(token?.access);
      setProducts(elements);
      setLoading(false);
    }
    getData();
  }, [, isOpen])
  return (
    <div className="flex flex-col items-center justify-center m-14">
      <table className="w-full">
        <ListHeader />
        <tbody>
          {products &&
            products?.map((product, index) => <ProductComponent key={index} product_category={product} />)}
        </tbody>
      </table>
      {loading === true &&
        <LoadingComponent />
      }
    </div>
  )
}

function ListHeader(): ReactElement {
  const lineStyle: string = "font-normal text-1xl";
  return (
    <thead className="sticky top-0">
      <tr className="table-auto">
        <th className={lineStyle}>
          Nombre
        </th>
        <th className={lineStyle}>
          Descripcion
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
        {props.product_category.category_name}
      </td>
      <td className={lineStyle}>
        {props.product_category.category_description}
      </td>
    </tr>
  )
}

interface ProductProps {
  product_category: Category
}
