import { ReactElement, useContext, useEffect, useState } from "react";
import { SaleContext } from ".";
import LoadingComponent from "../../components/LoadingComponent";
import useAuth from "../../hooks/useAuth";
import { Product } from "../../models/Product";
import { getAllProducts } from "../api/Products";
import { SearchProductContext } from "./SearchProducts";

export default function ProductsViewer(): ReactElement {
  const { allProducts, setAllProducts, filteredProducts } = useContext(SearchProductContext);
  const [loading, setLoading] = useState<boolean>();
  const { token } = useAuth();

  const loadDataHandler = async () => {
    setLoading(true);
    const elements = await getAllProducts(token?.access);
    setAllProducts(elements);
    setLoading(false);
  }

  useEffect(() => {
    loadDataHandler();
  }, []);

  return (
    <div className="overflow-hidden relative">
      {loading === true &&
        <div className="absolute z-40 left-0 right-0 top-0 bottom-0">
          <LoadingComponent />
        </div>
      }
      <div className="flex flex-col h-80 m-5 overflow-scroll overflow-x-hidden">
        <table className="w-full " >
          <ListHeader />
          <tbody>
            {filteredProducts.length > 0 ?
              filteredProducts?.map((product, index) => <ProductComponent product={product} key={index} />) :
              (allProducts &&
                allProducts?.map((product, index) => <ProductComponent product={product} key={index} />)
              )
            }
          </tbody>
        </table >

      </div >
    </div >
  )
}

function ListHeader(): ReactElement {
  const lineStyle: string = "font-normal text-1xl bg-white";
  return (
    <thead className="sticky top-0">
      <tr className="table-auto">
        <th className={lineStyle}>
          Codigo
        </th>
        <th className={lineStyle}>
          Nombre
        </th>
        <th className={lineStyle}>
          Unidad de medida
        </th>
        <th className={lineStyle}>
          Valor Unitario
        </th>
        <th className={lineStyle}>
          Inventario
        </th>
      </tr>
    </thead>
  )
}

function ProductComponent(props: ProductProps): ReactElement {
  const lineStyle: string = "font-normal text-1xl text-center pt-3 pb-3";
  const { products, setProducts, descriptions, setDescriptions } = useContext(SaleContext);

  return (
    <tr className="shadow-md rounded cursor-pointer"
      onClick={() => {
        setProducts([...products, props.product]);
        setDescriptions([...descriptions, {
          product_id: props.product.product_id,
          quantity: 1,
          total: props.product.product_price,
          units: props.product.product_units,
          discount: 0,
          tax_id: 1
        }]);
      }
      }>
      <td className={lineStyle}>
        {props.product.product_id}
      </td>
      <td className={lineStyle}>
        {props.product.product_name}
      </td>
      <td className={lineStyle}>
        Kg
      </td>
      <td className={lineStyle}>
        {props.product.product_price}
      </td>
      <td className={lineStyle}>
        {props.product.product_units}
      </td>
    </tr>
  )
}

interface ProductProps {
  product: Product
}
