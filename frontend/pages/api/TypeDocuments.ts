import TypeDocument from "../../models/TypeDocument";
import { API_URL } from "./Constants";

export async function getAllTypeDocuments(authToken: string | undefined): Promise<TypeDocument[]> {
  const result = await fetch(API_URL + '/type-document/', {
    method: "GET",
    headers: {
      "Content-Type": "none",
      'Authorization': 'Bearer ' + authToken
    }

  });
  return await result.json() as TypeDocument[];
}
