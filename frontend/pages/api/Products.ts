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

export async function createProduct(authToken:string = "", product:Product):Promise<boolean>{
    const body = JSON.stringify(product);
    const request = await fetch(API_URL + "/products/",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            'Authorization': 'Bearer '+ authToken
        },
        body: body
    });
    const response = await request.json() as Product;
    return product === response;
}
