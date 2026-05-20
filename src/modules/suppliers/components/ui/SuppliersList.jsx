import SupplierItem from "./SupplierItem";
import Icon from "../../../../globals/components/ui/Icon";
import { userStatus } from "../../../users/constants/userStatus";
import Skeleton from "../../../../globals/components/ui/Skeleton";
import CreateButton from "../../../../globals/components/ui/CreateButton";

export default function SuppliersList({
  suppliers,
  search,
  loading,
  openModal,
}) {
  const noSuppliers = suppliers.length === 0 && !loading;
  const isFirstLoad = suppliers.length === 0 && loading;

  return (
    <section className="h-[95%] w-full flex flex-col gap-1 overflow-x-auto overflow-y-auto">
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
        <ul className="flex flex-col gap-1">
          {suppliers.map((supplier) => (
            <SupplierItem
              key={supplier.id}
              supplier={supplier}
              moreInfoOnClick={(e) => {
                e.stopPropagation();
                openModal(supplier, "info", null, e.currentTarget);
              }}
              editButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(supplier, "edit", null, e.currentTarget);
              }}
              deleteButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(
                  supplier,
                  userStatus[supplier.status]?.modalType,
                  null,
                  e.currentTarget,
                );
              }}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
