import Icon from "../../../../globals/components/ui/Icon";
import { productStatusConfig } from "../../../products/constants/productStatusConfig";

export default function OutputOrderProductsTable({ outputOrder }) {
  return (
    <tr
      key={`${outputOrder.output_order_id}-expanded`}
      className="bg-[#FAFAFA] dark:bg-[#0d0d0f]"
    >
      <td
        colSpan={6}
        className="px-6 py-4 border-gray-200 dark:border-[#1e1e20cb]"
      >
        <div className="w-full flex flex-col gap-2">
          <span className="text-sm">Productos de la orden</span>

          <div className="border rounded-xl w-full dark:border-[#1e1e20cb]">
            <table className="h-full w-full">
              <thead className="h-10 border-b text-nowrap dark:border-[#1e1e20cb]">
                <tr>
                  <th className="text-start pl-4 py-1 text-sm">Serial</th>

                  <th className="text-start pl-4 py-1 text-sm">Marca</th>

                  <th className="text-start pl-4 py-1 text-sm">Modelo</th>

                  <th className="text-start pl-4 py-1 text-sm">
                    Tiempo de garantía
                  </th>

                  <th className="text-start pl-4 py-1 text-sm">Estado</th>
                </tr>
              </thead>

              <tbody>
                {outputOrder.products.map((product) => (
                  <tr key={product.output_details_id} className="h-12">
                    <td className="text-start pl-4 py-1 text-sm">
                      {product.product_serial}
                    </td>

                    <td className="text-start pl-4 py-1 text-sm">
                      {product.product_brand_name}
                    </td>

                    <td className="text-start pl-4 py-1 text-sm">
                      {product.product_model_name}
                    </td>

                    <td className="text-start pl-4 py-1 text-sm">
                      {product.output_product_garanty}
                    </td>

                    <td className="text-start px-4 py-1 text-xs">
                      <div
                        className={`flex items-center py-1 px-2 gap-1 border rounded-2xl
                        ${productStatusConfig[product.product_status].styles}
                        dark:border-none`}
                      >
                        <Icon
                          name={
                            productStatusConfig[product.product_status].icon
                          }
                          size={14}
                          fill={
                            productStatusConfig[product.product_status].fill
                          }
                        />
                        <span>
                          {productStatusConfig[product.product_status].text}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </td>
    </tr>
  );
}
