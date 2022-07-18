import { ReactElement, useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import useAuth from "../../hooks/useAuth";
import { Product_category } from "../../models/Products_category";
import { getAllProductsCategory } from "../api/Products_category";

export default function Productos(): ReactElement {
    return (
        <>
            <Header />
            <ProductsCategoryList />
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
                <ActionButton  onClick={() => console.log("Hi")} text="Crear Producto" dark={false} preventDefault={false} />
            </div>
        </header>
    );
}

function ProductsCategoryList(): ReactElement {
    const [products, setProducts] = useState<Product_category[]>();
    const { token } = useAuth();
    useEffect(() => {
        const getData = async () => {
            const elements = await getAllProductsCategory(token?.access);
            setProducts(elements);
        }
        getData();
    }, [])
    return (
        <div className="flex flex-col items-center justify-center m-14">
            <table className="w-full">
                <ListHeader />
                <tbody>
                    {products?.map(product => <ProductComponent key={product.category_id} product_category={product} />)}
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
                    ID
                </th>
                <th className={lineStyle}>
                    Nombre
                </th>
                <th className={lineStyle}>
                    Descripcion
                </th>                
            </tr>
        </thead>
    )
}

function ProductComponent(props: ProductProps): ReactElement {
    const lineStyle: string = "font-normal text-2xl text-center pt-3 pb-3";
    console.log(props.product_category)
    return (
        <tr className="shadow-md rounded">
            <td className={lineStyle}>
                {props.product_category.category_id}
            </td>
            <td className={lineStyle}>
                {props.product_category.category_name}
            </td>          
            <td className={lineStyle}>
                {props.product_category.category_description}
            </td>
        </tr>
    )
}

interface ProductProps {
    product_category: Product_category
}
