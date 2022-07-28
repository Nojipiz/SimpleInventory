import { FormEvent, ReactElement, useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import * as Icon from "react-bootstrap-icons";
import Customer from "../../models/Customer";
import useAuth from "../../hooks/useAuth";
import InputElement from "../../components/InputElement";
import LoadingComponent from "../../components/LoadingComponent";
import ActionButton from "../../components/ActionButton";
import TypeCustomer from "../../models/TypeCustomer";
import { getAllTypeCustomers } from "../api/TypeCustomers";
import TypeDocument from "../../models/TypeDocument";
import { getAllTypeDocuments } from "../api/TypeDocuments";
import { AddCustomerContext } from ".";
import { createCustomer } from "../api/Customers";

export default function CreateCustomer(): ReactElement {
  const { setOpen } = useContext(AddCustomerContext);
  const [loading, setLoading] = useState<boolean>();
  const [customer, setCustomer] = useState<Customer>();
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (customer === undefined) return;
    setLoading(true);
    await createCustomer(token?.access, customer);
    setOpen(false);
    setLoading(false);
  }
  const handleChange = ({ target: { name, value } }: any) => {
    setCustomer({ ...customer, [name]: value })
  };

  return (
    <Modal>
      <header className="flex flex-row justify-between">
        <h1 className="text-2xl bold">Crear Cliente</h1>
        <button onClick={() => setOpen(false)}>
          <Icon.X size={30} className="text-black" />
        </button>
      </header>
      <form className="flex flex-col m-5" onSubmit={handleSubmit}>
        <div className="flex flex-row m-3 justify-between">
          <div className="w-1/2">
            <label>Identificación</label>
            <InputElement type="number" name="customer_id"
              placeHolder="Numero de identificación"
              required={true} defaultValue=""
              onChange={handleChange} />
            <label>Tipo de documento</label>
            {typesDocument &&
              <TypesDocumentSelect typesDocument={typesDocument} handleChange={(documentTypeId: string) => {
                const updatedCustomer = { ...customer, type_document: Number(documentTypeId) };
                setCustomer(updatedCustomer);
              }} />
            }
            <label>Nombres</label>
            <InputElement type="text" name="customer_name"
              placeHolder="Nombres del cliente"
              required={true} defaultValue=""
              onChange={handleChange} />
          </div>
          <div className="w-1/2">
            <label>Apellidos</label>
            <InputElement type="text" name="customer_last_name"
              placeHolder="Apellidos del cliente"
              required={true} defaultValue=""
              onChange={handleChange} />
            <label>Telefono</label>
            <InputElement type="number" name="customer_phone"
              placeHolder="Numero de telefono"
              required={true} defaultValue=""
              onChange={handleChange} />
            <label>Email</label>
            <InputElement type="email" name="customer_email"
              placeHolder="Dirección de correo electronico"
              required={true} defaultValue=""
              onChange={handleChange} />
          </div>
        </div>
        <div className="ml-3 mr-3">
          <label>Tipo de persona</label>
          {typesCustomer &&
            <TypesCustomersSelect typesCustomer={typesCustomer} handleChange={(customerTypeId: string) => {
              const updatedCustomer = { ...customer, type_person: Number(customerTypeId) };
              setCustomer(updatedCustomer);
            }} />
          }
        </div>
        {loading === true ?
          <LoadingComponent /> :
          <ActionButton dark={true} text="Guardar"
            onClick={() => console.log(customer)}
            preventDefault={false} />
        }
      </form>
    </Modal >
  );
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
