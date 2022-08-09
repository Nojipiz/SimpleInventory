import { ReactElement, useContext, useEffect, useState } from "react";
import { ModalsContext, SaleContext } from ".";
import LoadingComponent from "../../components/LoadingComponent";
import useAuth from "../../hooks/useAuth";
import Customer from "../../models/Customer";
import { getAllCustomers } from "../api/Customers";
import { SearchCustomerContext } from "./SearchCustomers";

export default function CustomersViewer(): ReactElement {
  const { allCustomers, setAllCustomer, filteredCustomer } = useContext(SearchCustomerContext);
  const [loading, setLoading] = useState<boolean>();
  const { token } = useAuth();

  const loadDataHandler = async () => {
    setLoading(true);
    const elements = await getAllCustomers(token?.access);
    setAllCustomer(elements);
    setLoading(false);
  }

  useEffect(() => {
    loadDataHandler();
  }, []);

  return (
    <div className="overflow-hidden relative">
      {loading === true &&
        <div className="absolute z-40 left-0 right-0 top-0 bottom-0">
          <LoadingComponent />
        </div>
      }
      <div className="flex flex-col h-80 m-5 overflow-scroll overflow-x-hidden">
        <table className="w-full " >
          <ListHeader />
          <tbody>
            {filteredCustomer.length > 0 ?
              filteredCustomer?.map(customer => <CustomerComponent key={customer.customer_id} customer={customer} />) :
              (allCustomers &&
                allCustomers?.map(customer => <CustomerComponent key={customer.customer_id} customer={customer} />))
            }
          </tbody>
        </table >
      </div >
    </div >
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
  const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3 justify-center items-center";
  const { setCustomer } = useContext(SaleContext);
  const { setSearchClientOpen } = useContext(ModalsContext);

  return (
    <tr className="shadow-md rounded cursor-pointer"
      onClick={() => {
        setCustomer(props.customer);
        setSearchClientOpen(false);
      }}>
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
    </tr >
  )
}

interface CustomerProps {
  customer: Customer
}

