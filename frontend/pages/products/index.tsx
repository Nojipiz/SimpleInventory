import { ReactElement, useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import useAuth from "../../hooks/useAuth";
import { Product } from "../../models/Product";
import { getAllProducts } from "../api/Products";

export default function Productos(): ReactElement {
    return (
        <>
            <Header />
            <ProductsList />
            <NavBar />
        </>
    )
}


function Header(): ReactElement {
    return (
        <header className="flex flex-row m-5 justify-between tablet:flex-col">
            <h1 className="font-bold text-2xl">Productos</h1>
            <SearchserInput placeholder="Busca los productos aqui" onSearch={() => console.log("This must search")} />
            <div className="w-100">
                <ActionButton onClick={() => console.log("Hi")} text="Crear Producto" dark={false} preventDefault={false} />
            </div>
        </header>
    );
}

function ProductsList(): ReactElement {
    const [products, setProducts] = useState<Product[]>();
    const { token } = useAuth();
    useEffect(() => {
        const getData = async () => {
            const elements = await getAllProducts(token?.access);
            setProducts(elements);
        }
        getData();
    }, [])
    return (
        <div className="flex flex-col items-center justify-center m-14">
            <table className="w-full">
                <ListHeader />
                <tbody>
                    {products?.map(product => <ProductComponent product={product} />)}
                </tbody>
            </table>
        </div>
    )
}

function ListHeader(): ReactElement {
    const lineStyle: string = "font-normal text-2xl";
    return (
        <thead>
            <tr className="table-auto">
                <th className={lineStyle}>
                    Codigo
                </th>
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
    const lineStyle: string = "font-normal text-2xl text-center pt-3 pb-3";
    return (
        <tr className="shadow-md rounded">
            <td className={lineStyle}>
                {props.product.product_id}
            </td>
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
