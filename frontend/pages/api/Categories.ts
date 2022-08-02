import Category from "../../models/Category";
import { API_URL } from "./Constants";

export async function getAllCategories(authToken: string | undefined): Promise<Category[]> {
  const result = await fetch(API_URL + '/category-products/', {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }

  });
  return await result.json() as Category[];
}

export async function createCategory(authToken: string = "", category: Category): Promise<boolean> {
  category.category_id = 12
  const body = JSON.stringify(category);
  const request = await fetch(API_URL + "/category-products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
    },
    body: body
  });
  const response = await request.json() as Category;
  return category === response;
}

export async function deleteCategory(authToken: string = "", categoryId: number | undefined): Promise<boolean> {
  const request = await fetch(API_URL + `/category-products/${categoryId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    },
  });
  return request.type.toString() !== "";
}
