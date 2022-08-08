import Fuse from "fuse.js";
import * as Icon from "react-bootstrap-icons";
import { createContext, ReactElement, useContext, useState } from "react";
import { ModalsContext } from ".";
import Modal from "../../components/Modal";
import SearchserInput from "../../components/SearcherInput";
import Customer from "../../models/Customer";
import { getSearchOptions } from "../api/Searcher";
import CustomersViewer from "./CustomersViewer";

export const SearchCustomerContext = createContext<SearchContext>(
  {
    allCustomers: [],
    setAllCustomer: () => { },
    search: () => { },
    filteredCustomer: []
  }
);

interface SearchContext {
  allCustomers: Customer[];
  setAllCustomer: (customers: Customer[]) => void;
  search: (keyword: string) => void;
  filteredCustomer: Customer[];
}

export default function SearchCustomers(): ReactElement {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  const searchHandler = async (keyword: string) => {
    const fuse = new Fuse<Customer>(allCustomers, getSearchOptions(["customer_id", "customer_name", "customer_last_name"]));
    const searchResult: Fuse.FuseResult<Customer>[] = fuse.search(keyword);
    const resultsList: Customer[] = searchResult.map(({ item }) => item);
    setFilteredCustomers(resultsList);
  }

  return (
    <Modal>
      <SearchCustomerContext.Provider value={{ search: searchHandler, filteredCustomer: filteredCustomers, allCustomers: allCustomers, setAllCustomer: setAllCustomers }}>
        <ModalHeader />
        <CustomersViewer />
      </SearchCustomerContext.Provider>
    </Modal>
  );
}

function ModalHeader(): ReactElement {
  const { setSearchClientOpen } = useContext(ModalsContext);
  const { search } = useContext(SearchCustomerContext);
  const [_lastSearch, setLastSearch] = useState<string>("");

  return (
    <header className="flex flex-row m-5 justify-between tablet:flex-col">
      <h1 className="font-bold text-2xl">Clientes</h1>
      <SearchserInput placeholder="Busca los clientes aqui" onSearch={(text: string) => {
        setLastSearch(text);
        search(text);
      }} />
      <button onClick={() => setSearchClientOpen(false)}>
        <Icon.X size={30} className="text-black" />
      </button>
    </header>
  );
}
