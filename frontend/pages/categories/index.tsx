import { ReactElement, useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import LoadingComponent from "../../components/LoadingComponent";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";
import useAuth from "../../hooks/useAuth";
import Category from "../../models/Category";
import getAllCategories from "../api/Categories";

export default function Productos(): ReactElement {
    return (
        <>
            <Header />
            <CategoriesList />
            <NavBar />
        </>
    )
}


function Header(): ReactElement {
    return (
        <header className="flex flex-row m-5 justify-between tablet:flex-col">
            <h1 className="font-bold text-2xl">Categorias</h1>
            <SearchserInput placeholder="Busca las categorias aqui" onSearch={() => console.log("This must search")} />
            <div className="w-100">
                <ActionButton  onClick={() => console.log("Hi")} text="Crear Categoria" dark={false} preventDefault={false} />
            </div>
        </header>
    );
}

function CategoriesList(): ReactElement {
    const [products, setProducts] = useState<Category[]>();
    const [loading, setLoading] = useState<boolean>();
    const { token } = useAuth();
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const elements = await getAllCategories(token?.access);
            setProducts(elements);
            setLoading(false);
        }
        getData();
    }, [])
    return (
        <div className="flex flex-col items-center justify-center m-14">
            <table className="w-full">
                <ListHeader />
                <tbody>
                    { products &&
                        products?.map(product => <ProductComponent key={product.category_id} product_category={product} />)}
                </tbody>
            </table>
            {loading === true &&
                <LoadingComponent />
            }
        </div>
    )
}

function ListHeader(): ReactElement {
    const lineStyle: string = "font-normal text-1xl";
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
    const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3";
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
    product_category:Category
}
