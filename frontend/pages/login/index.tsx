import { createContext, ReactElement, useContext } from "react";
import ActionButton from "../../components/ActionButton";
import * as Icon from "react-bootstrap-icons";
import InputElement from "../../components/InputElement";
import useAuth from "../../hooks/useAuth";
import ToastWarning from "../../components/ToastWarning";

const CredentialsContext = createContext<LoginCredentials>({ username: "", password: "" });

export default function Login(): ReactElement {
    const { isError } = useAuth();
    return (
        <div className="flex w-full text-3xl h-screen tablet:flex-col">
            {isError == true && <ToastWarning text="Error en las credenciales de ingreso" />}
            <div className="flex items-center justify-center w-full h-full">
                <BrandContainer />
            </div>
            <div className="flex items-center justify-center w-full h-full">
                <CredentialsContext.Provider value={{ username: "", password: "" }}>
                    <LoginBoxContainer />
                </CredentialsContext.Provider>
            </div>
        </div>
    )
}

function BrandContainer(): ReactElement {
    return (
        <div className="flex flex-col items-center justify-center">
            <Icon.BoxSeam className="text-green-1" size={200} />
            <h1 className="font-bold text-6xl tablet:text-4xl">SimpleInventory</h1>
            <h2 className="font-light text-3xl tablet:text-2xl">Inventory and sells software</h2>
        </div>
    )
}

function LoginBoxContainer(): ReactElement {
    const currentCredentials = useContext(CredentialsContext);
    const { login, isLoading } = useAuth();
    return (
        <div className="flex flex-col items-center justify-center shadow w-7/12 rounded-lg pt-10 pb-10 min-w-fit">
            <h1 className="w-11/12 font-bold mb-10">Ingresar</h1>
            <form method="post" id="login" className="flex flex-col items-center justify-center w-11/12">
                <label className="w-full font-bold">Usuario</label>
                <InputElement required={true} type="text" name="user" placeHolder="tuusuario@proveedor.com" onChange={(text: string) => currentCredentials.username = text} />
                <span className="h-5"> </span>
                <label className="w-full font-bold">Contraseña</label>
                <InputElement required={true} type="password" name="password" placeHolder="*******" onChange={(text: string) => currentCredentials.password = text} />
                <span className="h-5"> </span>
                {isLoading == true ?
                    <Icon.ArrowRepeat className="animate-spin text-green-2" />:
                    <ActionButton text="Entrar" dark={true} onClick={() => {
                        login(currentCredentials.username, currentCredentials.password);
                    }} preventDefault={true} />
                }
            </form>
        </div>
    );
}

interface LoginCredentials {
    username: string;
    password: string;
}
