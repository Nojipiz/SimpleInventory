import { createContext, ReactElement } from "react";
import ActionButton from "../../components/ActionButton";
import * as Icon from "react-bootstrap-icons";
import InputElement from "../../components/InputElement";

export default function Login(): ReactElement {
    const loginContext = createContext<LoginCredentials>({username: "", password: ""});
    return (
        <div className="flex w-full text-3xl ">
            <div className="flex items-center justify-center w-full h-screen">
              <BrandContainer/>
            </div>
            <div className="flex items-center justify-center w-full h-screen">
              <LoginBoxContainer/>
            </div>
        </div>
    )
}

function BrandContainer(): ReactElement {
    return (
        <div className="flex flex-col items-center justify-center">
            <Icon.BoxSeam className="text-green-1" size={200} />
            <h1 className="font-bold text-6xl">SimpleInventory</h1>
            <h2 className="font-light text-3xl">Inventory and sells software</h2>
        </div>
    )
}

function LoginBoxContainer():ReactElement{
    return (
      <div className="flex flex-col items-center justify-center shadow w-7/12 rounded-lg pt-10 pb-10 min-w-fit">
            <h1 className="w-11/12 font-bold mb-10">Ingresar</h1>
            <form method="post" id="login" className="flex flex-col items-center justify-center w-11/12">
                <label className="w-full font-bold">Usuario</label>
                <InputElement type="text" name="user" placeHolder="tuusuario@proveedor.com" onChange={(text: string) => console.log(text)} />
                <span className="h-5"> </span>
                <label className="w-full font-bold">Contraseña</label>
                <InputElement type="password" name="password" placeHolder="*******" onChange={(text: string) => console.log(text)} />
                <span className="h-5"> </span>
                <ActionButton text="Entrar" dark={true} onClick={() => console.log("sending data to server")}/>
            </form>
      </div>
    );
}

interface LoginCredentials{
  username: string;
  password: string;
}
