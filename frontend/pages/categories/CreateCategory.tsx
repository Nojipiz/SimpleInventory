import { FormEvent, ReactElement, useContext, useEffect, useState } from "react";
import { AddCategoryContext } from ".";
import ActionButton from "../../components/ActionButton";
import InputElement from "../../components/InputElement";
import Modal from "../../components/Modal";
import * as Icon from "react-bootstrap-icons";
import Category from "../../models/Category";
import useAuth from "../../hooks/useAuth";
import LoadingComponent from "../../components/LoadingComponent";
import { createCategory } from "../api/Categories";

export default function CreateCategory(): ReactElement {
  const { setOpen } = useContext(AddCategoryContext);
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState<boolean>();
  const { token } = useAuth();

  const handleChange = ({ target: { name, value } }: any) => {
    setCategory({ ...category, [name]: value })
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category === undefined) return;
    setLoading(true);
    await createCategory(token?.access, category)
    setOpen(false);
    setLoading(false);
  }

  return (
    <Modal>
      <header className="flex flex-row justify-between">
        <h1 className="text-2xl bold">Crear Categoria</h1>
        <button onClick={() => setOpen(false)}>
          <Icon.X size={30} className="text-black" />
        </button>
      </header>
      <form className="flex flex-col m-5" onSubmit={handleSubmit}>
        <div className="flex flex-row m-3 justify-center items-center">
          <label>Titulo</label>
          <InputElement type="text" name="category_name"
            placeHolder="Nombre del producto"
            required={true} defaultValue=""
            onChange={handleChange} />
          <label>Descripción</label>
          <InputElement type="text" name="category_description"
            placeHolder="Descripción del producto"
            required={true} defaultValue=""
            onChange={handleChange} />
        </div>
        {loading === true ?
          <LoadingComponent /> :
          <ActionButton dark={true} text="Guardar"
            onClick={() => console.log(category)}
            preventDefault={false} />
        }
      </form>
    </Modal>
  )
}
