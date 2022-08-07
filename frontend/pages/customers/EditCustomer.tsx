import {FormEvent, ReactElement, useContext, useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {getAllTypeCustomers} from "../api/TypeCustomers";
import {getAllTypeDocuments} from "../api/TypeDocuments";
import Customer from "../../models/Customer";
import TypeCustomer from "../../models/TypeCustomer";
import TypeDocument from "../../models/TypeDocument";
import {getCustomer, updateCustomer} from "../api/Customers";
import * as Icon from "react-bootstrap-icons";
import InputElement from "../../components/InputElement";
import LoadingComponent from "../../components/LoadingComponent";
import ActionButton from "../../components/ActionButton";
import Modal from "../../components/Modal";
import {EditCustomerContext, ReloadCustomersContext} from "./index";

export default function EditCustomer({idCustomer}: any): ReactElement {

  const {setOpen} = useContext(EditCustomerContext);
  const [loading, setLoading] = useState<boolean>();
  const [customer, setCustomer] = useState<Customer>();
  const [typesCustomer, setTypesCustomers] = useState<TypeCustomer[]>();
  const [typesDocument, setTypesDocument] = useState<TypeDocument[]>();
  const {token} = useAuth();
  const {setReload} = useContext(ReloadCustomersContext)

  useEffect(() => {
    const getSelectElements = async () => {
      const customersTypesFromBack = await getAllTypeCustomers(token?.access);
      const documentsTypesFromBack = await getAllTypeDocuments(token?.access);
      setTypesCustomers(customersTypesFromBack);
      setTypesDocument(documentsTypesFromBack);
      await getCustomer(token?.access, idCustomer).then((customer: Customer) => {
        setCustomer(customer);
      });
    }
    getSelectElements();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (customer === undefined) return;
    setLoading(true);
    await updateCustomer(token?.access, idCustomer, customer);
    setOpen(false);
    setLoading(false);
    setReload(!setReload);
  }

  const handleChange = ({target: {name, value}}: any) => {
    setCustomer({...customer, [name]: value})
  }

  return (
    <Modal>
      <header className="flex flex-row justify-between">
        <h1 className="text-2xl bold">Editar Cliente</h1>
        <button onClick={() => setOpen(false)}>
          <Icon.X size={30} className="text-black"/>
        </button>
      </header>
      <form className="flex flex-col m-5" onSubmit={handleSubmit}>
        <div className="flex flex-row m-3 justify-between">
          <div className="w-1/2">
            <label>Identificación</label>
            <InputElement type="number" name="customer_id"
                          placeHolder="Numero de identificación"
                          required={true} defaultValue={customer?.customer_id}
                          onChange={handleChange} disable/>
            <label>Tipo de documento</label>
            {typesDocument &&
              <TypesDocumentsSelect selectedType={customer?.type_document}
                                    typesDocument={typesDocument}
                                    handleChange={(documentTypeId: string) => {
                                      const updatedCustomer = {
                                        ...customer,
                                        type_document: Number(documentTypeId)
                                      };
                                      setCustomer(updatedCustomer);

                                    }}/>
            }
            <label>Nombres</label>
            <InputElement type="text" name="customer_name"
                          placeHolder="Nombres del cliente"
                          required={true} defaultValue={customer?.customer_name}
                          onChange={handleChange}/>
          </div>
          <div className="w-1/2">
            <label>Apellidos</label>
            <InputElement type="text" name="customer_last_name"
                          placeHolder="Apellidos del cliente"
                          required={true} defaultValue={customer?.customer_last_name}
                          onChange={handleChange}/>
            <label>Telefono</label>
            <InputElement type="number" name="customer_phone"
                          placeHolder="Numero de telefono"
                          required={true} defaultValue={customer?.customer_phone}
                          onChange={handleChange}/>
            <label>Email</label>
            <InputElement type="email" name="customer_email"
                          placeHolder="Dirección de correo electronico"
                          required={true} defaultValue={customer?.customer_email}
                          onChange={handleChange}/>
          </div>
        </div>
        <div className="ml-3 mr-3">
          <label>Tipo de persona</label>
          {typesCustomer &&
            <TypesCustomersSelect typesCustomer={typesCustomer}
                                  handleChange={(customerTypeId: string) => {
                                    const updatedCustomer = {
                                      ...customer,
                                      type_person: Number(customerTypeId)
                                    };
                                    setCustomer(updatedCustomer);
                                  }}/>
          }
        </div>
        {loading === true ?
          <LoadingComponent/> :
          <ActionButton dark={true} text="Guardar"
                        onClick={() => console.log(customer)}
                        preventDefault={false}/>
        }
      </form>
    </Modal>
  );
}

function TypesCustomersSelect(props: TypesSelectProps): ReactElement {
  const handleChange = (event: any) => {
    const selected = event.target.value;
    props.handleChange(selected);
  }

  return (
    <select className="w-full rounded-full p-1 pl-2 pr-2 bg-gray-1 text-center outline-none"
            id="category" name="category" onChange={handleChange}>
      {props.typesCustomer.map((cat: TypeCustomer, index: number) =>
        <option key={index} value={
          cat.type_person_id
        }>
          {cat.type_person_name}
        </option>)}
    </select>
  );
}

interface TypesSelectProps {
  typesCustomer: TypeCustomer[];
  handleChange: (customerTypeId: string) => void;
}

function TypesDocumentsSelect(props: TypesDocumentProps): ReactElement {

  const handleChange = (event: any) => {
    const selected = event.target.value;
    props.handleChange(selected);
  }

  return (
    <select
            className="w-full rounded-full p-1 pl-2 pr-2 bg-gray-1 text-center outline-none"
            id="category" name="category" onChange={handleChange}>
      {props.typesDocument.map((cat, index) =>
        <option key={index} value={cat.type_document_id} selected={props.selectedType === cat.type_document_id}>
          {cat.type_document_name}
        </option>)}
    </select>
  )
}

interface TypesDocumentProps {
  typesDocument: TypeDocument[];
  handleChange: (documentTypeId: string) => void;
  selectedType?: number;
}
