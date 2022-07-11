import { useRouter } from "next/router";
import { createContext, ReactElement, useEffect, useState } from "react";
import { loginRequest, refreshRequest, Tokens } from "../pages/api/AuthService";
import { sleep } from "../utils/Utils";


export const AuthProvider = ({ children }: ReactElementsProps): ReactElement => {
    const [token, setToken] = useState<Tokens | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const { asPath } = useRouter();
    const router = useRouter();

    const login = async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        const credential = await loginRequest(username, password);
        if (!credential.access)
            setCredentialsError();
        else {
            setToken(credential);
            localStorage.setItem('refresh', credential.refresh);
            localStorage.setItem('access', credential.access);
        }
        setIsLoading(false);
        return !(credential.access == undefined);
    }

    const logout = () => {
        setIsLoading(true);
        setToken(null);
        setIsLoading(false);
    }

    const setCredentialsError = async () => {
        setIsError(true);
        await sleep(5000);
        setIsError(false);
    }

    const checkForSavedToken = (): boolean => {
        console.log("Loaded last session from local data")
        const savedAccess = localStorage.getItem('access');
        const savedRefresh = localStorage.getItem('refresh');
        if (savedAccess != null) {
            setToken({ access: savedAccess, refresh: savedRefresh ? savedRefresh : savedAccess });
            return true;
        }
        return false;

    }

    useEffect(() => {
        if (token != null || isLoading || asPath == "/login") return;
        if(token == null && checkForSavedToken()) return;
        router.push("/login")
    }, [token, isLoading]);

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
