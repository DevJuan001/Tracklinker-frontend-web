import { warrantyStatusConfig } from "../../constants/warrantyStatus";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";
import Icon from "../../../../globals/components/ui/Icon";

export default function WarrantiesTable({ warranties, openModal }) {
  const noWarranties = !Array.isArray(warranties) || warranties.length === 0;

  return noWarranties ? (
    <div className="flex flex-col items-center justify-center gap-4 text-[#7E7775]">
      <Icon name={"search_off"} size={75} />
      <span className="text-xl font-medium">
        No se han encontrado resultados
      </span>
    </div>
  ) : (
    <section
      className="max-h-[95%] max-w-full border border-gray-200 rounded-3xl overflow-y-auto overflow-x-auto overflow-hidden
    dark:border-[#303033]"
    >
      <table
        className="min-w-full min-h-full border-collapse
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
            <th className="font-medium text-center pl-4">Acción</th>
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
              <th className="relative text-end text-sm">
                <ActionButtons
                  editButtonOnClick={(e) => {
                    e.stopPropagation();
                    openModal(warranty, "edit", null, e.currentTarget);
                  }}
                  deleteButtonOnClick={(e) => {
                    e.stopPropagation();
                    openModal(warranty, "delete", null, e.currentTarget);
                  }}
                >
                  <button
                    onClick={(e) =>
                      openModal(warranty, "info", null, e.currentTarget)
                    }
                    className="flex items-center transition-colors duration-300 rounded-xl p-1.5
                    hover:bg-[#969292a8]"
                  >
                    <Icon name={"arrow_outward"} />
                  </button>
                </ActionButtons>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
