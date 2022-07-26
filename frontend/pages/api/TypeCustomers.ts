import TypeCustomer from "../../models/TypeCustomer";
import { API_URL } from "./Constants";

export async function getAllTypeCustomers(authToken: string | undefined): Promise<TypeCustomer[]> {
  const result = await fetch(API_URL + '/type-customer/', {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }

  });
  return await result.json() as TypeCustomer[];
}
