import Customer from "../../models/Customer";
import { API_URL } from "./Constants";

export async function getAllCustomers(authToken: string | undefined): Promise<Customer[]> {
  const result = await fetch(API_URL + '/customers/', {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }

  });
  return await result.json() as Customer[];
}

export async function createCustomer(authToken: string = "", customer: Customer): Promise<boolean> {
  customer.customer_id = 12
  const body = JSON.stringify(customer);
  const request = await fetch(API_URL + "/customers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
    },
    body: body
  });
  const response = await request.json() as Customer;
  return customer === response;
}

