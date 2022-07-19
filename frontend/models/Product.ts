import Category from "./Category"

export interface Product{
    product_id?: number,
    category_id?: number,
    product_name?: string,
    product_description?:string
    product_units?: string,
    product_price?: string,
    product_status?: boolean
}
