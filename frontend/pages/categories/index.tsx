import Fuse from "fuse.js";
import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import LoadingComponent from "../../components/LoadingComponent";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import useAuth from "../../hooks/useAuth";
import Category from "../../models/Category";
import { deleteCategory, getAllCategories } from "../api/Categories";
import { getSearchOptions } from "../api/Searcher";
import CreateCategory from "./CreateCategory";
import * as Icon from "react-bootstrap-icons";

export const AddCategoryContext = createContext<ContextModal>({ isOpen: false, setOpen: () => { } });
const ReloadCategoriesContext = createContext<ReloadContext>({ reload: false, setReload: () => { } });
const SearchCategoriesContext = createContext<SearchContext>(
  {
    allCategories: [],
    setAllCategories: () => { },
    search: () => { },
    filteredCategories: []
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

interface SearchContext {
  allCategories: Category[];
  setAllCategories: (categories: Category[]) => void;
  search: (keyword: string) => void;
  filteredCategories: Category[];
}

export default function Categories(): ReactElement {
  const [addCategoryOpen, setAddCategoryOpen] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [reloadCategories, setReloadCategories] = useState<boolean>(false);

  const searchHandler = async (keyword: string) => {
    const fuse = new Fuse<Category>(allCategories, getSearchOptions(["category_name"]));
    const searchResult: Fuse.FuseResult<Category>[] = fuse.search(keyword);
    const resultsList: Category[] = searchResult.map(({ item }) => item);
    setFilteredCategories(resultsList);
  }

  return (
    <AddCategoryContext.Provider value={{ isOpen: addCategoryOpen, setOpen: setAddCategoryOpen }}>
      {addCategoryOpen === true &&
        <CreateCategory />
      }
      <SearchCategoriesContext.Provider value={{ search: searchHandler, allCategories: allCategories, setAllCategories: setAllCategories, filteredCategories: filteredCategories }}>
        <Header />
        <ReloadCategoriesContext.Provider value={{ reload: reloadCategories, setReload: setReloadCategories }}>
          <CategoriesList />
        </ReloadCategoriesContext.Provider>
        <NavBar />
      </SearchCategoriesContext.Provider>
    </AddCategoryContext.Provider>
  )
}


function Header(): ReactElement {
  const { setOpen } = useContext(AddCategoryContext);
  const { search, allCategories } = useContext(SearchCategoriesContext);
  const [lastSearch, setLastSearch] = useState<string>("");

  useEffect(() => {
    if (!lastSearch) return;
    search(lastSearch);
  }, [allCategories]);

  return (
    <header className="flex flex-row m-5 justify-between tablet:flex-col">
      <h1 className="font-bold text-2xl">Categorias</h1>
      <SearchserInput placeholder="Busca las categorias aqui" onSearch={(text: string) => {
        setLastSearch(text);
        search(text);
      }} />
      <div className="w-100">
        <ActionButton onClick={() => setOpen(true)} text="Crear Categoria" dark={false} preventDefault={false} />
      </div>
    </header>
  );
}

function CategoriesList(): ReactElement {
  const { allCategories, setAllCategories, filteredCategories } = useContext(SearchCategoriesContext);
  const { isOpen } = useContext(AddCategoryContext);
  const { reload } = useContext(ReloadCategoriesContext);
  const [loading, setLoading] = useState<boolean>();
  const { token } = useAuth();

  const loadDataHandler = async () => {
    setLoading(true);
    const elements = await getAllCategories(token?.access);
    setAllCategories(elements);
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
        <ListHeader />
        <tbody>
          {filteredCategories.length > 0 ?
            filteredCategories?.map((product, index) => <CategoryComponent key={index} category={product} />) :
            (allCategories &&
              allCategories?.map((product, index) => <CategoryComponent key={index} category={product} />))
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

function CategoryComponent(props: CategoryProps): ReactElement {
  const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3";
  const { reload, setReload } = useContext(ReloadCategoriesContext);
  const { token } = useAuth();
  return (
    <tr className="shadow-md rounded">
      <td className={lineStyle}>
        {props.category.category_name}
      </td>
      <td className={lineStyle}>
        {props.category.category_description}
      </td>
      <td className={lineStyle}>
        <button className="items-center justify-center"
          onClick={async () => {
            await deleteCategory(token?.access, props.category.category_id);
            setReload(!reload);
          }}>
          <Icon.Trash size={28} className={"text-black hover:scale-105"} />
        </button>
      </td>
      <td className={lineStyle}>
        <button className="items-center justify-center"
          onClick={() => console.log("Editar")}>
          <Icon.PencilSquare size={28} className={"text-black hover:scale-105"} />
        </button>
      </td>
    </tr>
  )
}

interface CategoryProps {
  category: Category
}
