import { userStatus } from "../../../users/constants/userStatus";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";
import Icon from "../../../../globals/components/ui/Icon";

export default function OutputOrdersTable({ outputOrders, openModal }) {
  return (
    <section
      className="h-auto max-h-[92.5%] w-full border border-gray-200 rounded-3xl overflow-y-auto overflow-x-auto overflow-hidden
      md:max-h-[94.5%]
      dark:border-[#303033]"
    >
      <table className="min-h-full min-w-full">
        {/* Encabezado */}
        <thead className="sticky top-0 z-10">
          <tr className="h-[40px] border-b border-gray-200 text-sm dark:text-white dark:border-[#303033]">
            <th className="font-medium pl-4 text-start">Estado</th>
            <th className="font-medium pl-4 text-start">N°</th>
            <th className="font-medium pl-4 text-start">Fecha de registro</th>
            <th className="font-medium pl-4 text-start">Seriales</th>
            <th className="font-medium pl-4 text-start">Marca</th>
            <th className="font-medium pl-4 text-start">Modelo</th>
            <th className="font-medium pl-4 text-start">Tiempo de garantía</th>
            <th className="font-medium pl-4 text-center">Acciones</th>
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody className="font-normal dark:text-white">
          {outputOrders.map((outputOrder) => (
            <tr
              key={outputOrder.output_order_id}
              className="relative h-12 text-base overflow-x-auto overflow-y-auto transition duration-75 text-[#45474d]
            hover:bg-[#F5F3F6]
            dark:hover:bg-[#2d2d30] dark:text-white"
            >
              <th className="w-20 font-normal text-start pl-4 text-sm">
                <div
                  className={`flex items-center px-2 py-0.5 gap-1 rounded-full border text-xs ${userStatus[outputOrder.output_order_status]?.styles}`}
                >
                  <Icon
                    name={userStatus[outputOrder.output_order_status]?.icon}
                    fill={userStatus[outputOrder.output_order_status]?.fill}
                    size={14}
                  />
                  <span>
                    {userStatus[outputOrder.output_order_status]?.text}
                  </span>
                </div>
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                {outputOrder.output_order_id}
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                {outputOrder.output_order_date}
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                {outputOrder.product_serial}
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                {outputOrder.product_brand_name}
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                {outputOrder.product_model_name}
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                {outputOrder.output_product_garanty}
              </th>
              <th className="relative">
                <ActionButtons
                  backgroundColor="#FFFFFF"
                  editButtonOnClick={(e) => {
                    e.stopPropagation();
                    openModal(outputOrder, "edit", null, e.currentTarget);
                  }}
                  deleteButtonOnClick={(e) => {
                    e.stopPropagation();
                    openModal(
                      outputOrder,
                      userStatus[outputOrder.output_order_status]?.modalType,
                      null,
                      e.currentTarget,
                    );
                  }}
                  visibilityIcon={
                    userStatus[outputOrder.output_order_status]?.visibilityIcon
                  }
                  moreInfoButtonOnClick={(e) => {
                    e.stopPropagation();
                    openModal(outputOrder, "moreInfo", null, e.currentTarget);
                  }}
                />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
