import Fuse from "fuse.js";
import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import LoadingComponent from "../../components/LoadingComponent";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import useAuth from "../../hooks/useAuth";
import Customer from "../../models/Customer";
import { getAllCustomers } from "../api/Customers";
import { getSearchOptions } from "../api/Searcher";
import CreateCustomer from "./CreateCustomer";

export const AddCustomerContext = createContext<ContextModal>({ isOpen: false, setOpen: () => { } });
const SearchCustomerContext = createContext<SearchContext>(
  {
    allCustomers: [],
    setAllCustomer: () => { },
    search: () => { },
    filteredCustomer: []
  }
);

interface ContextModal {
  isOpen: boolean,
  setOpen: Function
}

interface SearchContext {
  allCustomers: Customer[];
  setAllCustomer: (customers: Customer[]) => void;
  search: (keyword: string) => void;
  filteredCustomer: Customer[];
}


export default function Customers(): ReactElement {
  const [addCustomerOpen, setAddCustomerOpne] = useState<boolean>(false);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  const searchHandler = async (keyword: string) => {
    const fuse = new Fuse<Customer>(allCustomers, getSearchOptions(["customer_name"]));
    const searchResult: Fuse.FuseResult<Customer>[] = fuse.search(keyword);
    const resultsList: Customer[] = searchResult.map(({ item }) => item);
    setFilteredCustomers(resultsList);
  }

  return (
    <AddCustomerContext.Provider value={{ isOpen: addCustomerOpen, setOpen: setAddCustomerOpne }}>
      {addCustomerOpen === true &&
        < CreateCustomer />
      }
      <SearchCustomerContext.Provider value={{ search: searchHandler, allCustomers: allCustomers, setAllCustomer: setAllCustomers, filteredCustomer: filteredCustomers }}>
        <Header />
        <CustomerList />
        <NavBar />
      </SearchCustomerContext.Provider>
    </AddCustomerContext.Provider>
  )
}

function Header(): ReactElement {
  const { setOpen } = useContext(AddCustomerContext);
  const { search, allCustomers } = useContext(SearchCustomerContext);
  const [lastSearch, setLastSearch] = useState<string>("");

  useEffect(() => {
    if (!lastSearch) return;
    search(lastSearch);
  }, [allCustomers]);

  return (
    <header className="flex flex-row m-5 justify-between tablet:flex-col">
      <h1 className="font-bold text-2xl">Categorias</h1>
      <SearchserInput placeholder="Busca los clientes aqui" onSearch={(text: string) => {
        setLastSearch(text);
        search(text);
      }} />
      <div className="w-100">
        <ActionButton onClick={() => setOpen(true)} text="Crear Cliente" dark={false} preventDefault={false} />
      </div>
    </header>
  );
}

function CustomerList(): ReactElement {
  const { allCustomers, setAllCustomer, filteredCustomer } = useContext(SearchCustomerContext);
  const { isOpen } = useContext(AddCustomerContext);
  const [loading, setLoading] = useState<boolean>();
  const { token } = useAuth();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    const getData = async () => {
      setLoading(true);
      const elements = await getAllCustomers(token?.access);
      setAllCustomer(elements);
      setLoading(false);
    }
    getData();
  }, [, isOpen]);

  return (
    <div className="flex flex-col items-center justify-center m-14 mb-20">
      <table className="w-full">
        <ListHeader />
        <tbody>
          {filteredCustomer.length > 0 ?
            filteredCustomer?.map(customer => <CustomerComponent key={customer.customer_id} customer={customer} />) :
            (allCustomers &&
              allCustomers?.map(customer => <CustomerComponent key={customer.customer_id} customer={customer} />))
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
          Identificación
        </th>
        <th className={lineStyle}>
          Nombre
        </th>
        <th className={lineStyle}>
          Apellido
        </th>
        <th className={lineStyle}>
          Telefono
        </th>
        <th className={lineStyle}>
          Email
        </th>
      </tr>
    </thead>
  )
}



function CustomerComponent(props: CustomerProps): ReactElement {
  const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3";
  console.log(props.customer)
  return (
    <tr className="shadow-md rounded">
      <td className={lineStyle}>
        {props.customer.customer_id}
      </td>
      <td className={lineStyle}>
        {props.customer.customer_name}
      </td>
      <td className={lineStyle}>
        {props.customer.customer_last_name}
      </td>
      <td className={lineStyle}>
        {props.customer.customer_phone}
      </td>
      <td className={lineStyle}>
        {props.customer.customer_email}
      </td>
    </tr>
  )
}

interface CustomerProps {
  customer: Customer
}
