import {API_URL} from "./Constants";
import Sale from "../../models/Sale";
import SaleDescription from "../../models/SaleDescription";


export async function getSalesByDateReport(authToken: string = "", month: number, year:number) : Promise<SalesByDateReport> {
  const request = await fetch(API_URL + `/reports/report-sales/?month=${month}&year=${year}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    },

  });
  return await request.json() as SalesByDateReport;
}

interface SalesByDateReport {
  sales: Sale[];
  details: SaleDescription[];
  total_sales: {
    total:number;
  };
}