import { ReactElement } from "react";
import ActionButton from "../../components/ActionButton";
import NavBar from "../../components/NavBar";
import SearchserInput from "../../components/SearcherInput";

export default function Productos():ReactElement{
    return(
        <>
            <Header/>
            <NavBar/>
        </>
    )
}


function Header():ReactElement{
    return(
        <header className="flex flex-row m-5 justify-between tablet:flex-col">
            <h1 className="font-bold text-2xl">Productos</h1>
            <SearchserInput placeholder="Busca los productos aqui"  onSearch={() => console.log("This must search")} />
            <div className="w-100">
                <ActionButton onClick={() => console.log("Hi")} text="Crear Producto" dark={false} preventDefault={false} />
            </div>
        </header>
    );
}
