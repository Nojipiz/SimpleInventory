import Fuse from "fuse.js";
import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import LoadingComponent from "../../components/LoadingComponent";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import useAuth from "../../hooks/useAuth";
import Category from "../../models/Category";
import { getAllCategories } from "../api/Categories";
import { getSearchOptions } from "../api/Searcher";
import CreateCategory from "./CreateCategory";

export const AddCategoryContext = createContext<ContextModal>({ isOpen: false, setOpen: () => { } });
const SearchCategoriesContext = createContext<SearchContext>(
  {
    allCategories: [],
    setAllCategories: () => { },
    search: () => { },
    filteredCategories: []
  }
);

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
        <CategoriesList />
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
  const [loading, setLoading] = useState<boolean>();
  const { token } = useAuth();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    const getData = async () => {
      setLoading(true);
      const elements = await getAllCategories(token?.access);
      setAllCategories(elements);
      setLoading(false);
    }
    getData();
  }, [, isOpen]);

  return (
    <div className="flex flex-col items-center justify-center m-14 mb-20">
      <table className="w-full">
        <ListHeader />
        <tbody>
          {filteredCategories.length > 0 ?
            filteredCategories?.map((product, index) => <CategoryComponent key={index} categories={product} />) :
            (allCategories &&
              allCategories?.map((product, index) => <CategoryComponent key={index} categories={product} />))
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
      </tr>
    </thead>
  )
}

function CategoryComponent(props: CategoryProps): ReactElement {
  const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3";
  return (
    <tr className="shadow-md rounded">
      <td className={lineStyle}>
        {props.categories.category_name}
      </td>
      <td className={lineStyle}>
        {props.categories.category_description}
      </td>
    </tr>
  )
}

interface CategoryProps {
  categories: Category
}
