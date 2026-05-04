import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { warrantyStatusConfig } from "../../constants/warrantyStatus";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";
import Icon from "../../../../globals/components/ui/Icon";
import { useState } from "react";
import Modal from "../../../../globals/components/modals/Modal";
import { useEditWarrantyStatus } from "../../hooks/useEditWarrantyStatus";

export default function WarrantiesTable({ warranties, openModal }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const [activeProductSerial, setActiveProductSerial] = useState(null);
  const { handleStatusChange } = useEditWarrantyStatus();
  const noWarranties = !Array.isArray(warranties) || warranties.length === 0;

  return (
    <section
      className="h-auto max-h-[95%] max-w-full border border-gray-200 rounded-3xl overflow-y-auto overflow-x-auto overflow-hidden
    dark:border-[#303033]"
    >
      {noWarranties ? (
        <div
          className="w-full h-full flex flex-col items-center justify-center rounded-3xl gap-2 bg-[#F5F3F6] text-[#7E8088]
          dark:bg-[#17171a]"
        >
          <Icon name={"mist"} size={70} />
          <span className="text-2xl font-medium">
            No se encontraron garantías
          </span>
        </div>
      ) : (
        <table
          className="w-full h-auto border-collapse
          dark:text-white"
        >
          <thead className="sticky top-0 z-1">
            <tr className="h-[40px] border-b border-gray-200 dark:border-[#303033] text-sm">
              <th className="font-medium text-start pl-4">Estado</th>
              <th className="font-medium text-start pl-4">Fecha de creación</th>
              <th className="font-medium text-start pl-4">Cliente</th>
              <th className="font-medium text-start pl-4">Descripción</th>
              <th className="font-medium text-start pl-4">Serial Producto</th>
              <th className="font-medium text-start pl-4">Teléfono</th>
              <th className="font-medium text-start pl-4">Dirección</th>
              <th className="font-medium text-start pl-4">Ciudad</th>
              <th className="font-medium text-center">Acción</th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody className="font-normal dark:text-white">
            {warranties.map((warranty) => (
              <tr
                key={warranty.id}
                className="relative h-12 text-base overflow-x-auto overflow-y-auto transition duration-75 text-[#45474d]
            hover:bg-[#F5F3F6]
            dark:hover:bg-[#2d2d30] dark:text-white"
              >
                <th className="font-normal text-start pl-3 text-sm">
                  <div
                    className={`w-fit flex items-center pl-1.5 pr-3 py-0.5 gap-1.5 rounded-full border dark:border-transparent
                    ${warrantyStatusConfig[warranty.status]?.styles}
                    `}
                  >
                    <Icon
                      name={warrantyStatusConfig[warranty.status]?.icon}
                      size={16}
                      fill={warrantyStatusConfig[warranty.status]?.fill}
                    />
                    <span
                      className={`text-nowrap ${warrantyStatusConfig[warranty.status]?.textColor}`}
                    >
                      {warrantyStatusConfig[warranty.status]?.text}
                    </span>
                  </div>
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.date}</p>
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.customer}</p>
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.description}</p>
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.product_serial}</p>
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.phone}</p>
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.address}</p>
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.city_name}</p>
                </th>
                <th className="relative flex items-center justify-center gap-3 pt-1.5 text-end text-sm">
                  <ActionButtons
                    backgroundColor="#FFFFFF"
                    editButtonOnClick={(e) => {
                      e.stopPropagation();
                      openModal(warranty, "edit", null, e.currentTarget);
                    }}
                    deleteButtonVisible={false}
                    deleteButtonOnClick={(e) => {
                      e.stopPropagation();
                      openModal(
                        warranty,
                        warrantyStatusConfig[warranty.status]?.modalType,
                        null,
                        e.currentTarget,
                      );
                    }}
                  >
                    <button
                      onClick={(e) =>
                        openModal(warranty, "info", null, e.currentTarget)
                      }
                      className="flex items-center transition-colors duration-300 rounded-xl p-1.5 bg-white
                      hover:bg-[#969292a8]"
                    >
                      <Icon name={"arrow_outward"} />
                    </button>
                  </ActionButtons>
                  <button
                    onClick={(e) => {
                      openInnerModal("editStatus", e);
                      setActiveProductSerial(warranty.id);
                    }}
                    className="flex items-center transition-colors duration-300 rounded-xl p-1.5 bg-white
                  hover:bg-[#969292a8]"
                  >
                    <Icon name={"shuffle"} />
                  </button>
                  {innerType === "editStatus" &&
                    activeProductSerial === warranty.id && (
                      <Modal
                        triggerRef={innerTrigger}
                        isOpen={true}
                        onClose={() => {
                          openInnerModal(null);
                          setActiveProductSerial(null);
                        }}
                        location="anchored"
                        type={"select"}
                      >
                        {Object.entries(warrantyStatusConfig)
                          .filter(([id]) => {
                            const numId = Number(id);
                            const next = warranty.status + 1;

                            if (warranty.status === 1) return numId === 2;

                            return numId === next || numId === 1;
                          })
                          .map(([id, config]) => (
                            <div
                              key={id}
                              onClick={() =>
                                handleStatusChange(warranty, () => {
                                  openInnerModal(null);
                                  setActiveProductSerial(null);
                                })
                              }
                              className={`${config.optionStyles} px-4 py-3.5 rounded-3xl cursor-pointer text-sm font-normal transition-all duration-200
                              dark:hover:bg-[#333]`}
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
