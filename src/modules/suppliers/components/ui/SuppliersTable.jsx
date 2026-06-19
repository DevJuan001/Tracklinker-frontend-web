// Constantes
import { supplierStatus } from "../../constants/supplierStatus";
// Componentes
import Icon from "../../../../globals/components/ui/Icon";
import Skeleton from "../../../../globals/components/ui/Skeleton";
import CreateButton from "../../../../globals/components/ui/CreateButton";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function SuppliersTable({
  suppliers,
  search,
  loading,
  openModal,
}) {
  const noSuppliers = suppliers.length === 0 && !loading;
  const isFirstLoad = suppliers.length === 0 && loading;

  return (
    <section
      className="relative w-full h-fit max-h-[82%] border rounded-3xl overflow-hidden overflow-y-auto
      dark:border-[#303033]"
    >
      {noSuppliers && (
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

              <span className="text-2xl font-medium">
                No hay resultados para <strong>"{search}"</strong>
              </span>

              <span className="text-center">
                Intenta con otro nombre o crea un nuevo proveedor.
              </span>

              <ul className="text-center text-sm mt-1">
                <li>• Revisa que el nombre esté bien escrito</li>

                <li>• Busca por ciudad o número de teléfono</li>

                <li>• Si no existe, crea un nuevo proveedor</li>
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
                <Icon name={"folder_copy"} size={60} fill />
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-2xl">
                  Aún no hay proveedores registrados
                </span>

                <span className="text-lg text-center">
                  Crea tu primer proveedor para empezar a organizar tus ordenes
                  de entrada.
                </span>

                <ul className="text-center text-sm mt-1">
                  <li>
                    • Crea proveedores para organizar tus órdenes de entrada
                  </li>

                  <li>• Gestiona tu inventario de manera eficiente</li>

                  <li>• Crea y edita proveedores fácilmente</li>
                </ul>
              </div>
            </div>
          )}

          <CreateButton
            text={"Crear proveedor"}
            onClick={(e) => openModal(null, "add", null, e.currentTarget)}
          />
        </div>
      )}

      {isFirstLoad ? (
        <Skeleton
          height="80px"
          count={11}
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
          borderRadius={12}
          marginBottom={2}
        />
      ) : (
        <table
          className="h-full w-full
          dark:bg-black"
        >
          <thead
            className="sticky h-10 top-0 z-10 border-b bg-white
            hover:bg-[#f5f3f6]
            dark:bg-black dark:border-[#17171a] dark:text-[#E4E2E5] dark:hover:bg-[#101012]"
          >
            <tr>
              <th className="font-medium text-sm pl-4 text-start">Nombre</th>

              <th className="font-medium text-sm pl-4 text-start">Estado</th>

              <th className="font-medium text-sm pl-4 text-start">Teléfono</th>

              <th className="font-medium text-sm pl-4 text-start">Correo</th>

              <th className="font-medium text-sm pl-4 text-start">Ciudad</th>

              <th className="font-medium text-sm pl-4 text-start">Dirección</th>

              <th className="font-medium text-sm pl-4 text-start">
                Fecha de creación
              </th>

              <th className="font-medium text-sm pl-4 text-start">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className="h-12 transition-colors duration-200
                hover:bg-[#f5f3f6]
                dark:hover:bg-[#101012] dark:text-[#E2E4E5]
                "
              >
                <th className="font-normal text-sm pl-4 text-start">
                  {supplier.name}
                </th>

                <th className="font-normal text-sm pl-4 text-start">
                  <div className={`${supplierStatus[supplier.status]?.styles}`}>
                    <Icon
                      name={supplierStatus[supplier.status]?.icon}
                      size={14}
                      fill={supplierStatus[supplier.status]?.fill}
                    />

                    <span>{supplierStatus[supplier.status]?.text}</span>
                  </div>
                </th>

                <th className="font-normal text-sm pl-4 text-start">
                  {supplier.phone}
                </th>

                <th className="font-normal text-sm pl-4 text-start">
                  {supplier.email}
                </th>

                <th className="font-normal text-sm pl-4 text-start">
                  {supplier.city_name}
                </th>

                <th className="font-normal text-sm pl-4 text-start">
                  {supplier.address}
                </th>

                <th className="font-normal text-sm pl-4 text-start">
                  {supplier.date}
                </th>

                <th className="relative h-full flex items-center">
                  <ActionButtons
                    moreInfoButtonVisible={false}
                    backgroundColor="#FFFFFF"
                    editButtonId={`edit-supplier-${supplier.id}-button`}
                    editButtonOnClick={(e) =>
                      openModal(supplier, "edit", null, e.currentTarget)
                    }
                    deleteButtonId={`delete-supplier-${supplier.id}-button`}
                    deleteButtonOnClick={(e) =>
                      openModal(
                        supplier,
                        supplierStatus[supplier.status]?.modalType,
                        null,
                        e.currentTarget,
                      )
                    }
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
