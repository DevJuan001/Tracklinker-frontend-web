// Constantes
import { warrantyStatusConfig } from "../../constants/warrantyStatus";
// Componentes
import Icon from "../../../../globals/components/ui/Icon";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";
// Modales
import Avatar from "../../../../globals/components/ui/Avatar";
import Modal from "../../../../globals/components/modals/Modal";
import CreateButton from "../../../../globals/components/ui/CreateButton";
import Skeleton from "../../../../globals/components/ui/Skeleton";

export default function WarrantiesTable({
  warranties,
  loading,
  search,
  openModal,
}) {
  const noWarranties = warranties.length === 0 && !loading;
  const isFirstLoad = warranties.length === 0 && loading;

  return (
    <section
      className={`${noWarranties || isFirstLoad ? "h-full" : "h-auto border"} w-full border-gray-200 rounded-3xl overflow-y-auto overflow-x-auto overflow-hidden
      md:max-h-[94.5%]
      dark:border-[#303033]`}
    >
      {noWarranties && (
        <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl gap-5">
          {search !== "" ? (
            <div
              className="flex flex-col items-center justify-center gap-0.5 text-[#7E8088]
              dark:text-[#E4E2E5]"
            >
              <div
                className="flex items-center justify-center bg-[#F5F3F6] w-28 h-28 rounded-full 
                dark:bg-[#101012]"
              >
                <Icon name={"search_off"} size={60} />
              </div>

              <span className="text-2xl font-medium text-center">
                No hay resultados para <strong>"{search}"</strong>.
              </span>

              <span className="text-lg text-center">
                Intenta con otro modelo o crea una nueva garantía.
              </span>

              <ul className="text-center text-sm mt-1">
                <li>• Revisa que el serial esté bien escrito</li>
                <li>• Busca por modelo, marca o fecha de creación</li>
                <li>• Si no existe, crea una nueva garantía</li>
              </ul>
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
                <Icon name={"shopping_cart"} size={60} />
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-2xl">
                  Aún no hay garantías
                </span>

                <span className="text-lg text-center">
                  Agrega una nueva garantía y empieza a crecer junto a tu
                  empresa.
                </span>

                <ul className="text-center text-sm mt-1">
                  <li>• Asigna garantías a tus productos</li>
                  <li>• Gestiona el inventario de manera eficiente</li>
                  <li>• Crea garantías con un solo click</li>
                </ul>
              </div>
            </div>
          )}

          <CreateButton
            text={"Crear garantía"}
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
        <table
          className={`${noWarranties ? "hidden" : ""} w-full h-auto border-collapse
          dark:text-white`}
        >
          <thead
            className="sticky -top-0 z-10 bg-white border-b border-gray-200
          dark:bg-black dark:border-[#303033]"
          >
            <tr className="h-[40px] dark:border-[#303033] text-sm">
              <th className="font-medium text-start pl-4">Estado</th>
              <th className="font-medium text-start pl-4">Fecha de creación</th>
              <th className="font-medium text-start pl-4">Creada por</th>
              <th className="font-medium text-start pl-4">Asignada a</th>
              <th className="font-medium text-start pl-5">Cliente</th>
              <th className="font-medium text-start pl-4">Descripción</th>
              <th className="font-medium text-start pl-4">Serial Producto</th>
              <th className="font-medium text-start pl-4">Teléfono</th>
              <th className="font-medium text-start pl-4">Ciudad</th>
              <th className="font-medium text-start pl-4">Dirección</th>
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

                {/* Fecha de creación */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.date}</p>
                </th>

                {/* Creada por */}
                <th className="font-normal text-start pl-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span>{warranty.created_by}</span>
                  </div>
                </th>

                {/* Asignada a */}
                <th className="font-normal text-start pl-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span>{warranty.assigned_to || "No asignada"}</span>
                  </div>
                </th>

                {/* Cliente */}
                <th className="font-normal text-start pl-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span>{warranty.customer}</span>
                  </div>
                </th>

                {/* Descripción */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.description}</p>
                </th>

                {/* Serial del producto */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.product_serial}</p>
                </th>

                {/* Teléfono */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.phone}</p>
                </th>

                {/* Ciudad */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.city_name}</p>
                </th>

                {/* Dirección */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{warranty.address}</p>
                </th>

                {/* Botones de acción */}
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
                    moreInfoButtonOnClick={(e) => {
                      e.stopPropagation();
                      openModal(warranty, "info", null, e.currentTarget);
                    }}
                  />

                  <button
                    onClick={(e) => {
                      openModal(warranty, "editStatus", null, e.currentTarget);
                    }}
                    className="flex items-center transition-colors duration-300 rounded-xl p-1.5 bg-white
                    hover:bg-[#969292a8]
                    dark:bg-black"
                  >
                    <Icon name={"shuffle"} />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
