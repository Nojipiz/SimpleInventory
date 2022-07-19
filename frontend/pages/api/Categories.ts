import { handleClientScriptLoad } from "next/script";
import Category from "../../models/Category";
import { API_URL } from "./Constants";

export default async function getAllCategories(authToken: string | undefined): Promise<Category[]> {
    const result = await fetch(API_URL + '/category-products/', {
        method: "GET",
        headers: {
            "Content-Type": "none",
            'Authorization': 'Bearer ' + authToken
        }

    });
    return await result.json() as Category[];
}
