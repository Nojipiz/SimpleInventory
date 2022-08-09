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
  customer.customer_id = Number(customer.customer_id);
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

export async function deleteCustomer(authToken: string = "", customerId: number | undefined): Promise<boolean> {
  const request = await fetch(API_URL + `/customers/${customerId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    },
  });
  return request.type.toString() !== "";
}


export async function updateCustomer(authToken: string = "", idCustomer:number , customer: Customer): Promise<boolean> {
  customer.customer_id = Number(customer.customer_id);
  const body = JSON.stringify(customer);
  const request = await fetch(API_URL + `/customers/${idCustomer}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
    },
    body: body
  });
  const response = await request.json() as Customer;
  return customer === response;
}

export async function getCustomer(authToken: string = "", customerId: number | undefined): Promise<Customer> {
  const request = await fetch(API_URL + `/customers/${customerId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    },
  });
  return await request.json() as Customer;
}
