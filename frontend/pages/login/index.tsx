import { FormEvent, ReactElement, useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import * as Icon from "react-bootstrap-icons";
import InputElement from "../../components/InputElement";
import useAuth from "../../hooks/useAuth";
import ToastWarning from "../../components/ToastWarning";
import { useRouter } from "next/router";

export default function Login(): ReactElement {
    const { isError } = useAuth();
    return (
        <div className="flex w-full text-3xl h-screen tablet:flex-col">
            {isError == true && <ToastWarning text="Error en las credenciales de ingreso" />}
            <div className="flex items-center justify-center w-full h-full">
                <BrandContainer />
            </div>
            <div className="flex items-center justify-center w-full h-full">
                <LoginBoxContainer />
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
    const [credentials, setCredentials] = useState<LoginCredentials>();
    const { login, isLoading } = useAuth();
    const [loadingNext, setLoadingNext] = useState<boolean>(false);
    const handleChange = ({ target: { name, value } }: any) => setCredentials({ ...credentials, [name]: value});
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingNext(true);
        await login(credentials?.username, credentials?.password);
        setLoadingNext(false);
    }
    return (
        <div className="flex flex-col items-center justify-center shadow w-7/12 rounded-lg pt-10 pb-10 min-w-fit">
            <h1 className="w-11/12 font-bold mb-10">Ingresar</h1>
            <form method="post" id="login" className="flex flex-col items-center justify-center w-11/12" onSubmit={handleSubmit}>
                <label className="w-full font-bold mb-2">Usuario</label>
                <InputElement required={true} type="text" name="username" placeHolder="tuusuario@proveedor.com" defaultValue=""
                    onChange={handleChange} />
                <span className="h-5"> </span>
                <label className="w-full font-bold mb-2">Contraseña</label>
                <InputElement required={true} type="password" name="password" placeHolder="*******" defaultValue=""
                    onChange={handleChange} />
                <span className="h-5"> </span>
                {isLoading == true || loadingNext == true ?
                    <Icon.ArrowRepeat className="animate-spin text-green-2 h-20" /> :
                    <ActionButton text="Entrar" dark={true} onClick={undefined} preventDefault={false} />
                }
            </form>
        </div>
    );
}

interface LoginCredentials {
    username?: string;
    password?: string;
}
