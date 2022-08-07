import { Product } from "../../models/Product";
import { API_URL } from "./Constants";

export async function getAllProducts(authToken: string = ""): Promise<Product[]> {
  const response = await fetch(API_URL + "/products/", {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }
  });
  return await response.json() as Product[];
}

export async function createProduct(authToken: string = "", product: Product): Promise<boolean> {
  const body = JSON.stringify(product);
  const request = await fetch(API_URL + "/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
    },
    body: body
  });
  const response = await request.json() as Product;
  return product === response;
}

export async function deleteProduct(authToken: string = "", productId: number | undefined): Promise<boolean> {
  const request = await fetch(API_URL + `/products/${productId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    },
  });
  return request.type.toString() !== "";
}

export async function updateProduct(authToken: string = "", product: Product, idProduct:string | number): Promise<boolean> {
  const body = JSON.stringify(product);
  const request = await fetch("http://localhost:8000" + `/products/${idProduct}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
    },
    body: body
  });
  const response = await request.json() as Product;
  return product === response;
}

export async function getProduct(authToken: string = "", productId: number | string): Promise<Product> {
  const response = await fetch(API_URL + `/products/${productId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }
  });
  return await response.json() as Product;
}
