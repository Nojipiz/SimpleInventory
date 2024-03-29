import { ChangeEvent, createContext, ReactElement, useContext, useEffect, useState } from "react";
import InputElement from "../../components/InputElement"; import NavBar from "../../components/NavBar";
import useAuth from "../../hooks/useAuth";
import Customer from "../../models/Customer";
import Sale from "../../models/Sale";
import { Product } from "../../models/Product";
import SaleDescription from "../../models/SaleDescription";
import TypeCustomer from "../../models/TypeCustomer";
import TypeDocument from "../../models/TypeDocument";
import { createSale, createSaleDescriptions } from "../api/Sales";
import { getAllTypeCustomers } from "../api/TypeCustomers";
import { getAllTypeDocuments } from "../api/TypeDocuments";
import SearchCustomers from "./SearchCustomers";
import SearchProducts from "./SearchProducts";
import { formatDate } from "../../utils/Utils";

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

export const SaleContext = createContext<SaleContextModel>(
  {
    sale: {},
    setSale: () => { },
    products: [],
    setProducts: () => { },
    descriptions: [],
    setDescriptions: () => { },
    customer: {},
    setCustomer: () => { },
  }
);

interface SaleContextModel {
  sale: Sale,
  setSale: Function,
  products: Product[],
  setProducts: Function,
  descriptions: SaleDescription[],
  setDescriptions: Function,
  customer: Customer,
  setCustomer: Function,
}

export default function CreateSalePage(): ReactElement {
  const [searchProductsOpen, setSearchProductsOpen] = useState<boolean>(false);
  const [searchCustomersOpen, setSearchCustomerOpen] = useState<boolean>(false);

  const [customer, setCustomer] = useState<Customer>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [sale, setSale] = useState<Sale>({});
  const [descriptions, setDescriptions] = useState<SaleDescription[]>([]);

  return (
    <ModalsContext.Provider value={{
      searchProductsOpen: searchProductsOpen,
      setSearchProductsOpen: setSearchProductsOpen,
      searchClientOpen: searchCustomersOpen,
      setSearchClientOpen: setSearchCustomerOpen,
    }}>
      <SaleContext.Provider value={
        {
          sale: sale, setSale: setSale,
          customer: customer, setCustomer: setCustomer,
          products: products, setProducts: setProducts,
          descriptions: descriptions, setDescriptions: setDescriptions
        }}>
        {searchProductsOpen && <SearchProducts />}
        {searchCustomersOpen && <SearchCustomers />}
        <PageContent />
      </SaleContext.Provider >
      <NavBar />
    </ModalsContext.Provider>
  )
}

function PageContent(): ReactElement {
  return (
    <div className="m-10">
      <CustomerData />
      <BillData />
      <ProductsData />
    </div>
  )
}

function BillData(): ReactElement {
  const { sale, setSale, descriptions } = useContext(SaleContext);
  const calculateTotal = (): number => {
    if (descriptions.length <= 0) return 0;
    const validData: number[] = descriptions
      .map(item => item.total)
      .filter(item => item !== undefined && item !== null) as number[]
    const total: number = validData.reduce((total: number, currentPrice: number) => Number(total) + Number(currentPrice));
    return total || 0;
  };

  return (
    <div className="flex flex-row bottom-0 m-2">
      <label>
        Descripción
      </label>
      <InputElement
        value={sale.sale_details}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSale({ ...sale, sale_details: e.target.value });
        }} />
      <h2 className="whitespace-nowrap">
        Total ${calculateTotal()}
      </h2>
    </div>
  );
}

function CustomerData(): ReactElement {
  const { customer, setCustomer } = useContext(SaleContext);
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
  };

  return (
    <>
      <SaleHeader />
      <div className="flex flex-row h-8 mt-2 ">
        <label>
          Identificación
        </label>
        <InputElement type="number"
          name="customer_id" placeHolder="identificacion del cliente"
          value={customer.customer_id?.toString()}
          required={false} defaultValue={""}
          onChange={handleChange} />
        <label>
          Telefono
        </label>
        <InputElement type="number"
          value={customer.customer_phone?.toString()}
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
              setCustomer({ ...customer, type_document: Number(documentTypeId) });
            }} />
        }
        <label className="whitespace-nowrap">
          Tipo Persona
        </label>
        {typesCustomer &&
          <TypesCustomersSelect
            typesCustomer={typesCustomer}
            handleChange={(customerTypeId: string) => {
              setCustomer({ ...customer, type_person: Number(customerTypeId) });
            }} />
        }
      </div>
      <div className="flex flex-row h-8 mt-2 ">
        <label>
          Nombres
        </label>
        <InputElement type="text"
          value={customer.customer_name?.toString()}
          name="customer_name" placeHolder="Nombre"
          required={false} defaultValue={""}
          onChange={handleChange} />
        <label>
          Apellidos
        </label>
        <InputElement type="text"
          value={customer.customer_last_name?.toString()}
          name="customer_last_name" placeHolder="Nombre"
          required={false} defaultValue={""}
          onChange={handleChange} />
        <label>
          Email
        </label>
        <InputElement type="email"
          value={customer.customer_email?.toString()}
          name="customer_email" placeHolder="email@email.com"
          required={false} defaultValue={""}
          onChange={handleChange} />
      </div>
    </>
  )
}

function SaleHeader(): ReactElement {
  const { sale, customer, setCustomer, setProducts, descriptions, setDescriptions } = useContext(SaleContext);
  const { setSearchClientOpen } = useContext(ModalsContext);
  const { token } = useAuth();

  const cleanData = () => {
    setCustomer({});
    setProducts([]);
    setDescriptions([]);
  }
  const getSale = (): Sale => {
    return {
      sale_date: formatDate(new Date()),
      sale_details: sale.sale_details || "No descripción",
      customer_id: customer.customer_id || 1,
      employee_id: 0,
    }
  }
  const handleSaleUpload = async () => {
    const saleId = await createSale(token?.access, getSale());
    await createSaleDescriptions(token?.access, descriptions, saleId);
    cleanData();
  };

  return (
    <div className="flex flex-row w-full items-center justify-between">
      <div className="flex flex-row center w-1/6 items-center">
        <h1>Cliente</h1>
        <button className="text-white text-1xl rounded-full pr-3 pl-3 pt-2 pb-2 m-2 bg-green-1 whitespace-nowrap"
          onClick={() => setSearchClientOpen(true)}>
          Buscar +
        </button>
      </div>
      <button className="text-white text-1xl rounded-full pr-3 pl-3 pt-2 pb-2 m-2 bg-green-1 whitespace-nowrap"
        onClick={() => handleSaleUpload()}>
        Guardar
      </button>
    </div>
  );
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
  const { products, descriptions } = useContext(SaleContext);
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
          Valor Total
        </th>
      </tr>
    </thead>
  );
}

function ProductComponent(props: ProductProps): ReactElement {
  const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3 ";
  const { descriptions, setDescriptions } = useContext(SaleContext);
  const visibility = (props.description.quantity || 0) > 0 ? "opacity-100" : "opacity-20"

  return (
    <tr className={"shadow-md rounded " + visibility}>
      <td className={lineStyle + "w-1/12 pl-2"}>
        <InputElement
          type="number"
          name="quantity" placeHolder={""}
          value={props.description.quantity?.toString()}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const index = descriptions.findIndex(description => description === props.description);
            const modifiedDescriptions = [...descriptions];
            const modifiedElement = props.description;
            const quantity = Number(event.target.value);
            if (quantity < 0) return;
            modifiedElement.quantity = quantity;
            modifiedElement.total = Number(props.product.product_price) * modifiedElement.quantity;
            modifiedDescriptions[index] = modifiedElement;
            setDescriptions(modifiedDescriptions);
          }}
          required={false}
          defaultValue={"0"}
        />
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
        {props.description.total}
      </td>
    </tr >
  )
}

interface ProductProps {
  product: Product;
  description: SaleDescription;
}

function TypesCustomersSelect(props: TypesSelectProps): ReactElement {
  const { customer } = useContext(SaleContext);
  const handleChange = (event: any) => {
    const selected = event.target.value;
    props.handleChange(selected);
  };

  return (
    <select className="w-full rounded-full p-1 pl-2 pr-2 bg-gray-1 text-center outline-none" id="category" name="category"
      onChange={handleChange} value={customer.type_person}>
      {props.typesCustomer.map((type, index) =>
        <option key={index} value={type.type_person_id}>
          {type.type_person_name}
        </option>
      )}
    </select>
  )
}

interface TypesSelectProps {
  typesCustomer: TypeCustomer[]
  handleChange: (customerTypeId: string) => any;
}

function TypesDocumentSelect(props: TypesDocumentProps): ReactElement {
  const { customer } = useContext(SaleContext);
  const handleChange = (event: any) => {
    const selected = event.target.value;
    props.handleChange(selected);
  };

  return (
    <select className="w-full rounded-full p-1 pl-2 pr-2 bg-gray-1 text-center outline-none" id="category"
      name="category" onChange={handleChange} value={customer.type_document}>
      {props.typesDocument.map((type, index) =>
        <option key={index} value={type.type_document_id}>
          {type.type_document_name}
        </option>)}
    </select>
  )
}

interface TypesDocumentProps {
  typesDocument: TypeDocument[];
  handleChange: (documentTypeId: string) => any;
}
