import Fuse from "fuse.js";
import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import LoadingComponent from "../../components/LoadingComponent";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import useAuth from "../../hooks/useAuth";
import { getSearchOptions } from "../api/Searcher";
import Sale from "../../models/Sale";
import { getAllSales } from "../api/Sales";

const ReloadSalesContext = createContext<ReloadContext>({ reload: false, setReload: () => { } });
const SearchSalesContext = createContext<SearchContext>(
  {
    allSales: [],
    setAllSales: () => { },
    search: () => { },
    filteredSales: []
  }
);

interface ReloadContext {
  reload: boolean;
  setReload: Function
}

interface SearchContext {
  allSales: Sale[];
  setAllSales: (sales: Sale[]) => void;
  search: (keyword: string) => void;
  filteredSales: Sale[];
}

export default function Sales(): ReactElement {
  const [allSales, setAllSales] = useState<Sale[]>([]);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [reloadSales, setReloadSales] = useState<boolean>(false);

  const searchHandler = async (keyword: string) => {
    const fuse = new Fuse<Sale>(allSales, getSearchOptions(["sale_id"]));
    const searchResult: Fuse.FuseResult<Sale>[] = fuse.search(keyword);
    const resultsList: Sale[] = searchResult.map(({ item }) => item);
    setFilteredSales(resultsList);
  }

  return (
    <SearchSalesContext.Provider value={{ search: searchHandler, allSales: allSales, setAllSales: setAllSales, filteredSales: filteredSales }}>
      <Header />
      <ReloadSalesContext.Provider value={{ reload: reloadSales, setReload: setReloadSales }}>
        <SalesList />
      </ReloadSalesContext.Provider>
      <NavBar />
    </SearchSalesContext.Provider>
  )
}


function Header(): ReactElement {
  const { search, allSales } = useContext(SearchSalesContext);
  const [lastSearch, setLastSearch] = useState<string>("");

  useEffect(() => {
    if (!lastSearch) return;
    search(lastSearch);
  }, [allSales]);

  return (
    <header className="flex flex-row m-5 justify-between tablet:flex-col">
      <h1 className="font-bold text-2xl">Facturas</h1>
      <SearchserInput placeholder="Busca las facturas aqui" onSearch={(text: string) => {
        setLastSearch(text);
        search(text);
      }} />
    </header>
  );
}

function SalesList(): ReactElement {
  const { allSales, setAllSales, filteredSales } = useContext(SearchSalesContext);
  const { reload } = useContext(ReloadSalesContext);
  const [loading, setLoading] = useState<boolean>();
  const { token } = useAuth();

  const loadDataHandler = async () => {
    setLoading(true);
    const elements = await getAllSales(token?.access);
    setAllSales(elements);
    setLoading(false);
  }

  useEffect(() => {
    loadDataHandler();
  }, [, reload]);

  return (
    <div className="flex flex-col items-center justify-center m-14 mb-20">
      <table className="w-full">
        <ListHeader />
        <tbody>
          {filteredSales.length > 0 ?
            filteredSales?.map((product, index) => <SaleComponent key={index} sale={product} />) :
            (allSales &&
              allSales?.map((product, index) => <SaleComponent key={index} sale={product} />))
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
          Codigo
        </th>
        <th className={lineStyle}>
          Fecha
        </th>
        <th className={lineStyle}>
          Cliente
        </th>
        <th className={lineStyle}>
          Descripción
        </th>
      </tr>
    </thead>
  )
}

function SaleComponent(props: SaleProps): ReactElement {
  const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3";

  return (
    <tr className="shadow-md rounded">
      <td className={lineStyle}>
        {props.sale.sale_id}
      </td>
      <td className={lineStyle}>
        {props.sale.sale_date}
      </td>
      <td className={lineStyle}>
        {props.sale.customer_id}
      </td>
    </tr>
  )
}

interface SaleProps {
  sale: Sale
}
