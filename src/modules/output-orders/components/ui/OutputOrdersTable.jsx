// Hooks
import { useState } from "react";
// Constantes
import { userStatus } from "../../../users/constants/userStatus";
// Componentes
import { Fragment } from "react";
import Icon from "../../../../globals/components/ui/Icon";
import OutputOrderProductsTable from "./OutputOrderProductsTable";
import Skeleton from "../../../../globals/components/ui/Skeleton";
import CreateButton from "../../../../globals/components/ui/CreateButton";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function OutputOrdersTable({
  outputOrders,
  loading,
  search,
  openModal,
}) {
  const [selectedOutputOrder, setSelectedOutputOrder] = useState(null);
  const noOutputOrders = outputOrders.length === 0 && !loading;
  const isFirstLoad = outputOrders.length === 0 && loading;

  return (
    <section
      className={`max-h-[92.5%] w-full border-gray-200 rounded-3xl overflow-y-auto overflow-x-auto overflow-hidden
      ${noOutputOrders || isFirstLoad ? "h-full" : "h-auto border"}
      md:max-h-[94.5%]
      dark:border-[#1e1e20cb]`}
    >
      {noOutputOrders && (
        <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl gap-5">
          {search !== "" ? (
            <div
              className="flex flex-col items-center justify-center gap-2 text-[#7E8088]
              dark:text-[#E4E2E5]"
            >
              <div
                className="flex items-center justify-center bg-[#F5F3F6] w-24 h-24 rounded-full 
                dark:bg-[#101012]"
              >
                <Icon name={"search_off"} size={60} />
              </div>

              <span className="text-xl font-medium text-center">
                No hay resultados para <strong>"{search}"</strong>. Intenta con
                otro nombre o N° o crea una nueva.
              </span>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-2 text-[#7E8088] 
              dark:text-[#E4E2E5]"
            >
              <div
                className="flex items-center justify-center bg-[#F5F3F6] w-28 h-28 rounded-full
                dark:bg-[#101012]"
              >
                <Icon name={"shuffle"} size={60} />
              </div>

              <div className="flex flex-col items-center">
                <span className="font-medium text-2xl">
                  Aún no hay ordenes de salida
                </span>

                <span className="text-lg text-center">
                  Crea tu primera orden de salida para empezar a organizar tus
                  productos.
                </span>
              </div>
            </div>
          )}
          <CreateButton
            text={"Crear orden"}
            onClick={(e) => openModal(null, "add", null, e.currentTarget)}
          />
        </div>
      )}

      {isFirstLoad ? (
        <Skeleton
          height="100%"
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
        />
      ) : (
        <table className="min-h-full min-w-full">
          {/* Encabezado */}
          <thead
            className="sticky top-0 z-10 bg-white
            dark:bg-black"
          >
            <tr
              className="h-[40px] border-b border-gray-200 text-sm
              dark:text-white dark:border-[#1e1e20cb]"
            >
              <th className="w-16 font-medium pl-4 text-start"></th>

              <th className="font-medium pl-4 text-start">Estado</th>

              <th className="font-medium pl-4 text-start">N°</th>

              <th className="font-medium pl-4 text-start">Fecha de creación</th>

              <th className="font-medium pl-4 text-start">Productos</th>

              <th className="font-medium pl-4 text-center">Acciones</th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody className="font-normal dark:text-white">
            {outputOrders.map((outputOrder) => (
              <Fragment key={outputOrder.output_order_id}>
                <tr
                  key={outputOrder.output_order_id}
                  onClick={() =>
                    setSelectedOutputOrder((prev) =>
                      prev === outputOrder.output_order_id
                        ? null
                        : outputOrder.output_order_id,
                    )
                  }
                  className="relative h-12 text-base overflow-x-auto overflow-y-auto transition duration-75 text-[#45474d]
                  hover:bg-[#F5F3F6]
                  dark:hover:bg-[#101012] dark:text-white"
                >
                  <th className="w-16">
                    <Icon
                      name={
                        selectedOutputOrder === outputOrder.output_order_id
                          ? "keyboard_arrow_up"
                          : "keyboard_arrow_down"
                      }
                      size={26}
                    />
                  </th>

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
                    <div className="flex">
                      <span>
                        {outputOrder.products.length > 1
                          ? `${outputOrder.products.length} Productos`
                          : `${outputOrder.products.length} Producto`}
                      </span>
                    </div>
                  </th>

                  <th className="relative">
                    <ActionButtons
                      editButtonId={`edit-output-${outputOrder.output_order_id}-button`}
                      deleteButtonId={`${userStatus[outputOrder.output_order_status]?.modalType}-output-${outputOrder.output_order_id}-button`}
                      moreInfoButtonVisible={false}
                      backgroundColor="#FFFFFF"
                      editButtonOnClick={(e) => {
                        e.stopPropagation();
                        openModal(outputOrder, "edit", null, e.currentTarget);
                      }}
                      deleteButtonOnClick={(e) => {
                        e.stopPropagation();
                        openModal(
                          outputOrder,
                          userStatus[outputOrder.output_order_status]
                            ?.modalType,
                          null,
                          e.currentTarget,
                        );
                      }}
                      visibilityIcon={
                        userStatus[outputOrder.output_order_status]
                          ?.visibilityIcon
                      }
                    />
                  </th>
                </tr>

                {selectedOutputOrder === outputOrder.output_order_id && (
                  <OutputOrderProductsTable outputOrder={outputOrder} />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
