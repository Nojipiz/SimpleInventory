import { FormEvent, ReactElement, useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import * as Icon from "react-bootstrap-icons";
import { AddCustomerContext } from ".";
import Customer from "../../models/Customer";
import useAuth from "../../hooks/useAuth";
import InputElement from "../../components/InputElement";
import LoadingComponent from "../../components/LoadingComponent";
import ActionButton from "../../components/ActionButton";
import TypeCustomer from "../../models/TypeCustomer";
import { getAllTypeCustomers } from "../api/TypeCustomers";

export default function CreateCustomer(): ReactElement {
  const { setOpen } = useContext(AddCustomerContext);
  const [loading, setLoading] = useState<boolean>();
  const [customer, setCustomer] = useState<Customer>();
  const [typesCustomer, setTypesCustomers] = useState<TypeCustomer[]>();
  const { token } = useAuth();

  useEffect(() => {
    const getSelectElements = async () => {
      const elementsTypes = await getAllTypeCustomers(token?.access);
      setTypesCustomers(elementsTypes);
    }
    getSelectElements();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //TODO!
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
            <InputElement type="number" name="product_name"
              placeHolder="Numero de identificación"
              required={true} defaultValue=""
              onChange={handleChange} />
            <label>Nombres</label>
            <InputElement type="text" name="product_description"
              placeHolder="Nombres del cliente"
              required={true} defaultValue=""
              onChange={handleChange} />
            <label>Apellidos</label>
            <InputElement type="text" name="product_units"
              placeHolder="Apellidos del cliente"
              required={true} defaultValue=""
              onChange={handleChange} />
          </div>
          <div className="w-1/2">
            <label>Telefono</label>
            <InputElement type="number" name="product_price"
              placeHolder="Numero de telefono"
              required={true} defaultValue=""
              onChange={handleChange} />
            <label>Email</label>
            <InputElement type="email" name="product_price"
              placeHolder="Dirección de correo electronico"
              required={true} defaultValue=""
              onChange={handleChange} />
            <label>Tipo de persona</label>
            {typesCustomer &&
              <TypesCustomersSelect typesCustomer={typesCustomer} />
            }
          </div>
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
  const handleChange = () => {
    // TODO!
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
}
