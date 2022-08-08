import Sale from "../../models/Sale";
import SaleDescription from "../../models/SaleDescription";
import { API_URL } from "./Constants";

export async function createSale(authToken: string = "", sale: Sale) {
  const body = JSON.stringify(sale);
  const request = await fetch(API_URL + "/sales/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
    },
    body: body
  });
  const response = await request.json() as Sale;
  return sale === response;
}

export async function createSaleDescriptions(authToken: string = "", descriptions: SaleDescription[]) {
  descriptions.forEach(description =>
    createSaleDescription(authToken, description)
  );
}

async function createSaleDescription(authToken: string = "", description: SaleDescription) {
  const body = JSON.stringify(description);
  const request = await fetch(API_URL + "/sales-descriptions/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
    },
    body: body
  });
  const response = await request.json() as Sale;
  return description === response;
}
