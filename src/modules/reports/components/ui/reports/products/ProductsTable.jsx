import Icon from "../../../../../../globals/components/ui/Icon";
import { productStatusConfig } from "../../../../../products/constants/productStatusConfig";
import { useProductsTableData } from "../../../../hooks/products/useProductsTableData";

export default function ProductsTable({ data }) {
  const hookData = useProductsTableData();
  const productsData = data || hookData.productsData || [];

  return (
    <table className="w-full h-full pt-2">
      <thead className="h-[30px]">
        <tr className="border-b pb-1 text-sm dark:border-[#94909028]">
          <th className="font-normal text-start pl-4">Modelo</th>

          <th className="hidden md:table-cell font-normal text-start pl-4">
            Serial
          </th>

          <th className="hidden md:table-cell font-normal text-start pl-4">
            Marca
          </th>

          <th className="font-normal text-start pl-4">Fecha de entrada</th>

          <th className="font-normal text-start pl-4">Estado</th>
        </tr>
      </thead>
      <tbody>
        {productsData.map((product) => (
          <tr
            key={product.serial}
            className="h-10 pb-1 text-sm border-b dark:border-[#94909028]"
          >
            <th className="font-normal text-start pl-4">{product.model}</th>

            <th className="hidden md:table-cell font-normal text-start pl-4">
              {product.serial}
            </th>

            <th className="hidden md:table-cell font-normal text-start pl-4">
              {product.brand}
            </th>

            <th className="font-normal text-start pl-4">
              {product.input_date}
            </th>

            <th className="font-normal text-start pl-4">
              <div
                className={`flex items-center py-1 px-2 gap-1 rounded-md ${productStatusConfig[product.status]?.styles}`}
              >
                <Icon
                  name={productStatusConfig[product.status]?.icon}
                  fill={productStatusConfig[product.status]?.fill}
                  size={14}
                />
                <span>{productStatusConfig[product.status]?.text}</span>
              </div>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
