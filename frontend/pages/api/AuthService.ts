import { API_URL } from "./Constants";

export async function loginRequest(username: string, password: string): Promise<Tokens> {
    const body = JSON.stringify({
        "username": username,
        "password": password
    });
    const response = await fetch(API_URL + "/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: body
    })
    const responseJson = await response.json();
    return responseJson as Tokens;
}

export async function refreshRequest(refresh:string): Promise<Tokens> {
    const body = JSON.stringify({
        "refresh": refresh,
    });
    const response = await fetch(API_URL + "/refresh", {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: body
    })
    const responseJson = await response.json();
    return responseJson as Tokens;
}

export interface Tokens{
    refresh:string,
    access:string
}
