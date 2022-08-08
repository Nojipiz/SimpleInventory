import Sale from "../../models/Sale";
import SaleDescription from "../../models/SaleDescription";
import { API_URL } from "./Constants";

export async function getAllSales(authToken: string = ""): Promise<Sale[]> {
  const response = await fetch(API_URL + "/sales/", {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }
  });
  return await response.json() as Sale[];
}

export async function createSale(authToken: string = "", sale: Sale): Promise<number | undefined> {
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
  return response.sale_id;
}

export async function createSaleDescriptions(authToken: string = "", descriptions: SaleDescription[], saleId?: number) {
  descriptions.forEach(description => {
    description.sale_id = saleId;
    createSaleDescription(authToken, description);
  }
  );
}

async function createSaleDescription(authToken: string = "", description: SaleDescription) {
  description.tax_id = 1;
  description.units = 100;
  description.discount = 0;
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
