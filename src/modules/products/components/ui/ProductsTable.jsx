import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { productStatusConfig } from "../../constants/productStatusConfig";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";
import Icon from "../../../../globals/components/ui/Icon";
import Modal from "../../../../globals/components/modals/Modal";
import { useState } from "react";

export default function ProductsTable({ products, openModal }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const [activeProductSerial, setActiveProductSerial] = useState(null);
  const noProducts = !Array.isArray(products) || products.length === 0;

  return (
    <section
      className="h-auto max-h-[92.5%] w-full border rounded-3xl overflow-y-auto overflow-x-auto overflow-hidden
      md:max-h-[94.5%]
      dark:border-[#1e1e20cb]"
    >
      {noProducts ? (
        <div
          className="w-full min-h-[770px] flex flex-col items-center justify-center rounded-3xl gap-2 bg-[#F5F3F6] text-[#7E8088]
          md:min-h-[920px]
          dark:bg-[#17171a]"
        >
          <Icon name={"mist"} size={70} />
          <span className="text-2xl font-medium">
            No se encontraron productos
          </span>
        </div>
      ) : (
        <table
          className="h-auto w-full border-gray-200 appearance-none border-collapse
          dark:bg-black"
        >
          {/* Cabecera de la tabla */}
          <thead
            className="sticky h-10 min-w-full top-0 z-10
            dark:text-white dark:bg-black"
          >
            <tr
              className="border-b bg-white border-gray-200 text-sm text-nowrap
              dark:border-[#1e1e20e1] dark:bg-[#101012]"
            >
              <th className="font-medium text-start pl-4 pt-1">Estado</th>
              <th className="font-medium text-start pl-4 pt-1">
                Fecha de Ingreso
              </th>
              <th className="font-medium text-start pl-4 pt-1">
                Orden De Entrada
              </th>
              <th className="font-medium text-start pl-4 pt-1">Categoria</th>
              <th className="font-medium text-start pl-4 pt-1">Subcategoria</th>
              <th className="font-medium text-start pl-4 pt-1">Serial</th>
              <th className="font-medium text-start pl-4 pt-1">Modelo</th>
              <th className="font-medium text-start pl-4 pt-1">Descripción</th>
              <th className="font-medium text-start pl-4 pt-1">Marca</th>
              <th className="font-medium text-start px-4 pt-1">
                Tiempo de Garantia
              </th>
              <th className="font-medium text-start px-4">Acciones</th>
            </tr>
          </thead>

          {/* Contenido de la tabla */}
          <tbody className="w-full min-h-full font-normal dark:text-gray-300">
            {products.map((product) => (
              /* Productos */
              <tr
                key={product.product_serial}
                className="relative w-full text-base overflow-auto transition duration-75 text-[#45474d] dark:text-white
                hover:bg-[#F5F3F6]
                dark:hover:bg-[#101012]"
              >
                {/* Estado */}
                <th className="font-normal pl-4 text-sm">
                  <div
                    className={`w-fit flex items-center pl-1.5 pr-3 py-0.5 gap-1.5 rounded-full border text-nowrap
                  dark:border-transparent
                  ${productStatusConfig[product.status]?.styles}`}
                  >
                    <img
                      src={productStatusConfig[product.status]?.icon}
                      alt=""
                      className="w-3 h-3"
                    />
                    <span>{product.status_text}</span>
                  </div>
                </th>

                {/* Fecha de ingreso */}
                <th className="font-normal text-start pl-4 text-sm">
                  {product.input_date}
                </th>

                {/* Orden de Entrada */}
                <th className="font-normal text-start pl-4 text-sm">
                  {product.input_order}
                </th>
                {/* Categoria */}
                <th className="font-normal text-start pl-4 text-sm">
                  {product.category}
                </th>

                {/* Subcategoria */}
                <th className="font-normal text-start pl-4 text-sm">
                  {product.subcategory}
                </th>

                {/* Serial */}
                <th className="font-normal text-start pl-4 text-sm">
                  {product.product_serial}
                </th>

                {/* Modelo */}
                <th className="font-normal text-start pl-4 text-sm">
                  {product.model}
                </th>

                {/* Descripción */}
                <th className="font-normal text-start pl-4 text-sm">
                  {product.description}
                </th>

                {/* Marca */}
                <th className="font-normal text-start pl-4 text-sm">
                  {product.brand}
                </th>

                {/* Tiempo de garantía */}
                <th className="pl-4 font-normal text-start text-sm">
                  {product.warranty_time}
                </th>

                {/* Botones */}
                <th className="relative flex items-center justify-center h-14 pr-4 gap-3">
                  <ActionButtons
                    backgroundColor="#FFFFFF"
                    editButtonOnClick={(e) => {
                      openModal(product, "edit", null, e.currentTarget);
                    }}
                    deleteButtonVisible={false}
                  />
                  <button
                    onClick={(e) => {
                      openInnerModal("editStatus", e);
                      setActiveProductSerial(product.product_serial);
                    }}
                    className="flex items-center bg-white p-1.5 rounded-xl dark:bg-black"
                  >
                    <Icon name={"swap_horiz"} className="dark:brightness-200" />
                  </button>

                  {innerType === "editStatus" &&
                    activeProductSerial === product.product_serial && (
                      <Modal
                        triggerRef={innerTrigger}
                        isOpen={true}
                        onClose={() => {
                          openInnerModal(null);
                          setActiveProductSerial(null);
                        }}
                        location="anchored"
                        type={"edit_status"}
                      >
                        {Object.entries(productStatusConfig)
                          .filter(([id]) => {
                            const numId = Number(id);
                            if (numId === product.status) return false;
                            if (product.status === 4 && numId === 2)
                              return false;
                            return true;
                          })
                          .map(([id, config]) => (
                            <div
                              key={id}
                              onClick={(e) => {
                                openModal(
                                  product,
                                  config.modalType,
                                  null,
                                  e.currentTarget,
                                );
                              }}
                              className={`${config.optionStyles} px-4 py-3.5 rounded-3xl cursor-pointer text-sm font-normal transition-all duration-200`}
                            >
                              <span>{config.optionText}</span>
                            </div>
                          ))}
                      </Modal>
                    )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
