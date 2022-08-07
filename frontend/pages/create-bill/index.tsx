import { ChangeEvent, createContext, ReactElement, useContext, useEffect, useState } from "react";
import InputElement from "../../components/InputElement";
import NavBar from "../../components/NavBar";
import useAuth from "../../hooks/useAuth";
import Customer from "../../models/Customer";
import { Product } from "../../models/Product";
import SaleDescription from "../../models/SaleDescription";
import TypeCustomer from "../../models/TypeCustomer";
import TypeDocument from "../../models/TypeDocument";
import { getAllTypeCustomers } from "../api/TypeCustomers";
import { getAllTypeDocuments } from "../api/TypeDocuments";
import SearchCustomers from "./SearchCustomers";
import { SearchProducts } from "./SearchProducts";

export const ModalsContext = createContext<ModalsContextModel>(
  {
    searchProductsOpen: false,
    setSearchProductsOpen: () => { },
    searchClientOpen: false,
    setSearchClientOpen: () => { }
  }
);

interface ModalsContextModel {
  searchProductsOpen: boolean,
  setSearchProductsOpen: Function,
  searchClientOpen: boolean,
  setSearchClientOpen: Function,
}

export const BillContext = createContext<BillContextModel>(
  {
    products: [],
    setProducts: () => { },
    descriptions: [],
    setDescriptions: () => { },
    customer: {},
    setCustomer: () => { },
  }
);

interface BillContextModel {
  products: Product[],
  setProducts: Function,
  descriptions: SaleDescription[],
  setDescriptions: Function,
  customer: Customer,
  setCustomer: Function,
}


export default function CreateBillPage(): ReactElement {
  const [searchProductsOpen, setSearchProductsOpen] = useState<boolean>(false);
  const [searchCustomersOpen, setSearchCustomerOpen] = useState<boolean>(false);

  const [customer, setCustomer] = useState<Customer>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [descriptions, setDescriptions] = useState<SaleDescription[]>([]);

  return (
    <ModalsContext.Provider value={{
      searchProductsOpen: searchProductsOpen,
      setSearchProductsOpen: setSearchProductsOpen,
      searchClientOpen: searchCustomersOpen,
      setSearchClientOpen: setSearchCustomerOpen,
    }}>
      <BillContext.Provider value={
        {
          customer: customer, setCustomer: setCustomer,
          products: products, setProducts: setProducts,
          descriptions: descriptions, setDescriptions: setDescriptions
        }}>
        {searchProductsOpen && <SearchProducts />}
        {searchCustomersOpen && <SearchCustomers />}
        <PageContent />
      </BillContext.Provider >
      <NavBar />
    </ModalsContext.Provider>
  )
}

function PageContent(): ReactElement {

  return (
    <div className="m-10">
      <CustomerData />
      <ProductsData />
    </div>
  )
}

function CustomerData(): ReactElement {
  const { customer, setCustomer } = useContext(BillContext);
  const { setSearchClientOpen } = useContext(ModalsContext);
  const [typesCustomer, setTypesCustomers] = useState<TypeCustomer[]>();
  const [typesDocument, setTypesDocument] = useState<TypeDocument[]>();
  const { token } = useAuth();

  useEffect(() => {
    const getSelectElements = async () => {
      const customersTypesFromBack = await getAllTypeCustomers(token?.access);
      const documentsTypesFromBack = await getAllTypeDocuments(token?.access);
      setTypesCustomers(customersTypesFromBack);
      setTypesDocument(documentsTypesFromBack);
      setCustomer({
        ...customer,
        type_document: documentsTypesFromBack[0].type_document_id,
        type_person: customersTypesFromBack[0].type_person_id
      });
    }
    getSelectElements();
  }, []);

  const handleChange = ({ target: { name, value } }: any) => {
    setCustomer({ ...customer, [name]: value });
    console.log(customer);
  };

  return (
    <>
      <div className="flex flex-row items-center w-1/6 ">
        <h1>Cliente</h1>
        <button className="text-white text-1xl rounded-full pr-3 pl-3 pt-2 pb-2 m-2 bg-green-1 whitespace-nowrap"
          onClick={() => setSearchClientOpen(true)}>
          Buscar +
        </button>
      </div>
      <div className="flex flex-row h-8 mt-2 ">
        <label>
          Identificación
        </label>
        <InputElement type="number"
          name="customer_id" placeHolder="identificacion del cliente"
          required={false} defaultValue={""}
          onChange={handleChange} />
        <label>
          Telefono
        </label>
        <InputElement type="number"
          name="customer_phone" placeHolder="Numero de telefono"
          required={false} defaultValue={""}
          onChange={handleChange} />
        <label className="whitespace-nowrap">
          Tipo Documento
        </label>
        {
          typesDocument &&
          <TypesDocumentSelect typesDocument={typesDocument}
            handleChange={(documentTypeId: string) => {
              const updatedCustomer = { ...customer, type_document: Number(documentTypeId) };
              setCustomer(updatedCustomer);
            }} />
        }
        <label className="whitespace-nowrap">
          Tipo Persona
        </label>
        {typesCustomer &&
          <TypesCustomersSelect typesCustomer={typesCustomer}
            handleChange={(customerTypeId: string) => {
              const updatedCustomer = { ...customer, type_customer: Number(customerTypeId) };
              setCustomer(updatedCustomer);
            }} />
        }
      </div>
      <div className="flex flex-row h-8 mt-2 ">
        <label>
          Nombres
        </label>
        <InputElement type="text"
          name="customer_name" placeHolder="Nombre"
          required={false} defaultValue={""}
          onChange={handleChange} />
        <label>
          Apellidos
        </label>
        <InputElement type="text"
          name="customer_last_name" placeHolder="Nombre"
          required={false} defaultValue={""}
          onChange={handleChange} />
        <label>
          Email
        </label>
        <InputElement type="email"
          name="phone" placeHolder="email@email.com"
          required={false} defaultValue={""}
          onChange={handleChange} />
      </div>
    </>
  )
}


function ProductsData(): ReactElement {
  const { setSearchProductsOpen } = useContext(ModalsContext);
  return (
    <>
      <div className="flex flex-row mt-8 justify-between items-center">
        Productos:
        <button className="text-white text-1xl rounded-full pr-3 pl-3 pt-2 pb-2 mt-2 bg-green-1"
          onClick={() => setSearchProductsOpen(true)}>
          Añadir +
        </button>
      </div >
      <ProductsTable />
    </>
  );
}

function ProductsTable(): ReactElement {
  const { products, descriptions } = useContext(BillContext);
  useEffect(() => {
    console.log(descriptions);
  }, [descriptions]);
  return (
    <table className="w-full mt-2">
      <TableHeader />
      {products &&
        products?.map((product, index) => {
          const description = descriptions.find(element => element.product_id === product.product_id);
          if (description != undefined)
            return <ProductComponent product={product} description={description} key={index} />
        })
      }
    </table>
  );

}


function TableHeader(): ReactElement {
  const lineStyle: string = "font-normal text-1xl bg-white ";
  return (
    <thead className="sticky top-0">
      <tr className="table-auto">
        <th className={lineStyle}>
          Cantidad
        </th>
        <th className={lineStyle}>
          Codigo
        </th>
        <th className={lineStyle}>
          Producto
        </th>
        <th className={lineStyle}>
          Valor Unitario
        </th>
        <th className={lineStyle}>
          Restantes
        </th>
      </tr>
    </thead>
  );
}

function ProductComponent(props: ProductProps): ReactElement {
  const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3 ";
  const { descriptions, setDescriptions } = useContext(BillContext);

  return (
    <tr className="shadow-md rounded">
      <td className={lineStyle + "w-1/12 pl-2"}>
        <InputElement
          type="number"
          name="quantity" placeHolder={""}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const index = descriptions.findIndex(description => description === props.description);
            const modifiedDescriptions = [...descriptions];
            const modifiedElement = props.description;
            modifiedElement.quantity = Number(event.target.value);
            modifiedDescriptions[index] = modifiedElement;
            setDescriptions(modifiedDescriptions);
          }}
          required={false} defaultValue={props.description.quantity?.toString() || ""} />
      </td>
      <td className={lineStyle}>
        {props.product.product_id}
      </td>
      <td className={lineStyle}>
        {props.product.product_name}
      </td>
      <td className={lineStyle}>
        {props.product.product_price}
      </td>
      <td className={lineStyle}>
        {props.product.product_units}
      </td>
    </tr>
  )
}

interface ProductProps {
  product: Product;
  description: SaleDescription;
}

function TypesCustomersSelect(props: TypesSelectProps): ReactElement {
  const handleChange = (event: any) => {
    const selected = event.target.value;
    props.handleChange(selected);
  };

  return (
    <select className="w-full rounded-full p-1 pl-2 pr-2 bg-gray-1 text-center outline-none" id="category" name="category" onChange={handleChange}>
      {props.typesCustomer.map((cat, index) =>
        <option key={index} value={cat.type_person_id}>
          {cat.type_person_name}
        </option>)}
    </select>
  )
}

interface TypesSelectProps {
  typesCustomer: TypeCustomer[]
  handleChange: (customerTypeId: string) => any;
}

function TypesDocumentSelect(props: TypesDocumentProps): ReactElement {
  const handleChange = (event: any) => {
    const selected = event.target.value;
    props.handleChange(selected);
  };

  return (
    <select className="w-full rounded-full p-1 pl-2 pr-2 bg-gray-1 text-center outline-none" id="category" name="category" onChange={handleChange}>
      {props.typesDocument.map((cat, index) =>
        <option key={index} value={cat.type_document_id}>
          {cat.type_document_name}
        </option>)}
    </select>
  )
}

interface TypesDocumentProps {
  typesDocument: TypeDocument[]
  handleChange: (documentTypeId: string) => any;
}
