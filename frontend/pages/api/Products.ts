import { Product } from "../../models/Product";
import { API_URL } from "./Constants";

export async function getAllProducts(authToken:string = ""):Promise<Product[]>{
    const response = await fetch(API_URL + "/products/",{
        method: "GET",
        headers:{
            "Content-Type": "none",
            'Authorization': 'Bearer '+ authToken
        }
    });
    return await response.json() as Product[];
}
