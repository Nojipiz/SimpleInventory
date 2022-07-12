import { useRouter } from "next/router";
import { createContext, ReactElement, useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { loginRequest, Tokens } from "../pages/api/AuthService";
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
        localStorage.removeItem('refresh');
        localStorage.removeItem('access');
        setIsLoading(false);
    }

    const setCredentialsError = async () => {
        setIsError(true);
        await sleep(5000);
        setIsError(false);
    }

    const thereIsSavedToken = (): boolean => {
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
        if(isLoading) return;
        if(asPath === "/login"){
           if(token !== null || thereIsSavedToken())
               router.push("/home");
        }else{
           if(token === null && !thereIsSavedToken())
               router.push("/login");
        }
    },  [token, isLoading]);


    if (token  == null && !isLoading && asPath !== "/login")
        return(<LoadingScreen/>);
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
