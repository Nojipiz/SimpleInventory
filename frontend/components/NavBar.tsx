import Link from "next/link";
import { ReactElement } from "react";
import * as Icon from "react-bootstrap-icons";
import useAuth from "../hooks/useAuth";

export default function NavBar(): ReactElement {
  return (
    <footer className="flex absolute w-screen bottom-0 bg-black justify-between">
      <ul className="flex flex-row text-white font-bold text-1xl">
        <HomeButton />
        <BillsButton />
        <ClientsButton />
        <ProductsButton />
        <ProductsCategoryButton />
        <ReportsButton />
      </ul>
      <ul className="flex-row text-white font-bold text-1xl">
        <LogoutButton />
      </ul>
    </footer>
  )
};

function HomeButton(): ReactElement {
  return (
    <Link href={"/home"}>
      <li className="flex flex-col bg-green-2 h-full justify-center items-center p-3 cursor-pointer">
        <Icon.House size={20} />
        <a>Inicio</a>
      </li>
    </Link>
  );
}

function BillsButton(): ReactElement {
  return (
    <Link href={"/bills"}>
      <li className="flex flex-col items-center justify-center p-3 ml-2 cursor-pointer">
        <Icon.Receipt size={20} />
        <a>Facturas</a>
      </li>
    </Link>
  );
}

function ClientsButton(): ReactElement {
  return (
    <Link href={"/clients"}>
      <li className="flex flex-col items-center justify-center p-3 ml-2 cursor-pointer">
        <Icon.People size={20} />
        <a>Clientes</a>
      </li>
    </Link>
  );
}

function ProductsButton(): ReactElement {
  return (
    <Link href={"/products"}>
      <li className="flex flex-col items-center justify-center p-3 ml-2 cursor-pointer">
        <Icon.BoxSeam size={20} />
        <a>Productos</a>
      </li>
    </Link>
  );
}

function ProductsCategoryButton(): ReactElement {
  return (
    <Link href={"/categories"}>
      <li className="flex flex-col items-center justify-center p-3 ml-2 cursor-pointer">
        <Icon.Tags size={20} />
        <a>Categorias</a>
      </li>
    </Link>
  );
}

function ReportsButton(): ReactElement {
  return (
    <Link href={"/reports"}>
      <li className="flex flex-col items-center justify-center p-3 ml-2 cursor-pointer">
        <Icon.GraphUpArrow size={20} />
        <a>Reportes</a>
      </li>
    </Link>
  );
}


function LogoutButton(): ReactElement {
  const { logout } = useAuth();
  return (
    <li className="flex flex-col items-center justify-center p-3 ml-2 cursor-pointer" onClick={() => logout()}>
      <Icon.BoxArrowRight size={20} />
      <a>Salir</a>
    </li>
  );
}
