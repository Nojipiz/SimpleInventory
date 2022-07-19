import { FormEvent, Fragment, ReactElement, useContext, useEffect, useState } from "react";
import { AddProductContext } from ".";
import ActionButton from "../../components/ActionButton";
import InputElement from "../../components/InputElement";
import Modal from "../../components/Modal";
import * as Icon from "react-bootstrap-icons";
import { Product } from "../../models/Product";
import Category from "../../models/Category";
import getAllCategories from "../api/Categories";
import useAuth from "../../hooks/useAuth";
import { createProduct } from "../api/Products";

export default function CreateProduct(): ReactElement {
    const { setOpen } = useContext(AddProductContext);
    const [product, setProduct] = useState<Product>();
    const [ categories, setCategories] = useState<Category[]>();
    const {token} = useAuth();

    const handleChange = ({ target: { name, value } }: any) => {
        setProduct({ ...product, [name]: value})
    };
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(product === undefined) return;
        await createProduct(token?.access, product).
        then(() => {
            setOpen(false);
        });
    }

    useEffect(() => {
        const updatedCategories = async () => {
            const result = await getAllCategories(token?.access);
            setCategories(result);
        }
        updatedCategories()
    },[]);

    return (
        <Modal>
            <header className="flex flex-row justify-between">
                <h1 className="text-2xl bold">Crear Producto</h1>
                <button onClick={() => setOpen(false)}>
                    <Icon.X size={30} className="text-black" />
                </button>
            </header>
            <form className="flex flex-col m-5" onSubmit={handleSubmit}>
                <div className="flex flex-row m-3 justify-between">
                    <div className="w-1/2">
                        <label>Nombre</label>
                        <InputElement type="text" name="product_name"
                            placeHolder="Nombre del producto"
                            required={true} defaultValue=""
                            onChange={handleChange} />
                        <label>Descripción</label>
                        <InputElement type="text" name="product_description"
                            placeHolder="Descripción del producto"
                            required={true} defaultValue=""
                            onChange={handleChange} />
                        <label>Inventario</label>
                        <InputElement type="number" name="product_units"
                            placeHolder="Cantidad de producto"
                            required={true} defaultValue=""
                            onChange={handleChange} />
                    </div>
                    <div className="w-1/2">
                        <label>Valor</label>
                        <InputElement type="number" name="product_price"
                            placeHolder="Valor del producto"
                            required={true} defaultValue=""
                            onChange={handleChange} />
                        <label>Categoria</label>
                        {categories &&
                            <CategorySelector categories={categories} handleChange={(categoryId:string) => {
                                const category = categories.find(cat => cat.category_id.toString() === categoryId);
                                const updatedProduct = {...product, category_id:Number(categoryId)};
                                setProduct(updatedProduct);
                            }}/>
                        }
                    </div>
                </div>
                <ActionButton dark={true} text="Guardar"
                    onClick={() => console.log(product)}
                    preventDefault={false} />
            </form>
        </Modal>
    )
}


function CategorySelector(props:Props):ReactElement{
    const handleChange = (event:any) => {
        const selected = event.target.value;
        console.log("seleccionado" + selected);
        props.handleChange(selected);
    }
    return (
        <select className="w-full rounded-full p-1 pl-2 pr-2 bg-gray-1 text-center outline-none" id="category" name="category" onChange={handleChange}>
            {props.categories.map(cat =>
                <option key={cat.category_id} value={cat.category_id}>
                     {cat.category_name}
                 </option>)}
        </select>
    )
}

interface Props{
    categories: Category[];
    handleChange:(categoryId:string) => any;
}
