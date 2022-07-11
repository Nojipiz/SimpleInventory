import { createContext, ReactElement, useState } from "react";
import { loginRequest, Tokens } from "../pages/api/AuthService";
import { sleep } from "../utils/Utils";


export const AuthProvider = ({ children }: ReactElementsProps): ReactElement => {
    const [token, setToken] = useState<Tokens | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const login = async (username: string, password: string) => {
        setIsLoading(true);
        const credential = await loginRequest(username, password);
        if (!credential.access)
            setCredentialsError();
        else
            setToken(credential);
        console.log("Added JWT " + credential.access);
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        setToken(null);
        setIsLoading(false);
    }

    const setCredentialsError = async () => {
        console.log("Hi")
        setIsError(true);
        await sleep(5000);
        setIsError(false);
    }

    return (
        <AuthContext.Provider value={{ login, token, logout, isLoading, isError }}>
            {children}
        </AuthContext.Provider>
    )
}

interface ReactElementsProps {
    children: ReactElement | ReactElement[]
}

interface AuthContextProps {
    login: Function,
    token: Tokens | null,
    logout: Function,
    isLoading: boolean,
    isError: boolean
}

const DEFAULT_AUTH_CONTEXT: AuthContextProps = {
    login: () => { },
    token: null,
    logout: () => { },
    isLoading: true,
    isError: false
}

export const AuthContext = createContext(DEFAULT_AUTH_CONTEXT);
