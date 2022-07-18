import { Product_category } from "../../models/Products_category";
import { API_URL } from "./Constants";

export async function getAllProductsCategory(authToken:string = ""):Promise<Product_category[]>{
    const response = await fetch(API_URL + "/category-products/",{
        method: "GET",
        headers:{
            "Content-Type": "none",
            'Authorization': 'Bearer '+ authToken
        }
    });
    return await response.json() as Product_category[];
}
