import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import LoadingComponent from "../../components/LoadingComponent";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import useAuth from "../../hooks/useAuth";
import { Product } from "../../models/Product";
import { getAllProducts } from "../api/Products";
import CreateProduct from "./CreateProduct";

export const AddProductContext = createContext<ContextModal>({ isOpen: false, setOpen: () => { } });

interface ContextModal {
    isOpen: boolean,
    setOpen: Function
}

export default function Productos(): ReactElement {
    const [addProductOpen, setAddProductOpen] = useState<boolean>(false);
    return (
        <AddProductContext.Provider value={{ isOpen: addProductOpen, setOpen: setAddProductOpen }}>
            {addProductOpen === true &&
                <CreateProduct />
            }
            <Header />
            <ProductsList />
            <NavBar />
        </AddProductContext.Provider>
    )
}


function Header(): ReactElement {
    const { setOpen } = useContext(AddProductContext);
    return (
        <header className="flex flex-row m-5 justify-between tablet:flex-col">
            <h1 className="font-bold text-2xl">Productos</h1>
            <SearchserInput placeholder="Busca los productos aqui" onSearch={() => console.log("This must search")} />
            <div className="w-100">
                <ActionButton onClick={() => setOpen(true)} text="Crear Producto" dark={false} preventDefault={false} />
            </div>
        </header>
    );
}


function ProductsList(): ReactElement {
    const { isOpen } = useContext(AddProductContext);
    const [products, setProducts] = useState<Product[]>();
    const [loading, setLoading] = useState<boolean>();
    const { token } = useAuth();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const elements = await getAllProducts(token?.access);
            setProducts(elements);
            setLoading(false);
        }
        getData();
    }, [, isOpen]);

    return (
        <div className="flex flex-col items-center justify-center m-14">
            <table className="w-full">
                <ListHeader />
                <tbody>
                    {products &&
                     products?.map((product,index) => <ProductComponent product={product} key={index}/>)}
                </tbody>
            </table>
            {loading === true &&
                <LoadingComponent />
            }
        </div>
    )
}

function ListHeader(): ReactElement {
    const lineStyle: string = "font-normal text-1xl bg-white";
    return (
        <thead className="sticky top-0">
            <tr className="table-auto">
                <th className={lineStyle}>
                    Nombre
                </th>
                <th className={lineStyle}>
                    Unidad de medida
                </th>
                <th className={lineStyle}>
                    Valor Unitario
                </th>
                <th className={lineStyle}>
                    Inventario
                </th>
                <th className={lineStyle}>
                    Entrega
                </th>
            </tr>
        </thead>
    )
}

function ProductComponent(props: ProductProps): ReactElement {
    const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3";
    return (
        <tr className="shadow-md rounded">
            <td className={lineStyle}>
                {props.product.product_name}
            </td>
            <td className={lineStyle}>
                Kg
            </td>
            <td className={lineStyle}>
                {props.product.product_price}
            </td>
            <td className={lineStyle}>
                {props.product.product_units}
            </td>
            <td className={lineStyle}>
                {props.product.product_units != "0" ? "Disponible" : "Agotado"}
            </td>
        </tr>
    )
}

interface ProductProps {
    product: Product
}
