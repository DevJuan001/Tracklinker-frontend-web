// Hooks
import { useInfiniteScroll } from "../../../../globals/hooks/useInfiniteScroll";
// Constantes
import { userStatus } from "../../constants/userStatus";
// Componentes
import Icon from "../../../../globals/components/ui/Icon";
import Skeleton from "../../../../globals/components/ui/Skeleton";
import CreateButton from "../../../../globals/components/ui/CreateButton";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function UsersTable({
  users,
  loading,
  search,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  openModal,
}) {
  const noUsers = users.length === 0 && !loading;
  const isFirstLoad = users.length === 0 && loading;
  const { getItemRef } = useInfiniteScroll({
    items: users,
    hasNextPage,
    fetchNextPage,
  });

  return (
    <section
      className={`${noUsers || isFirstLoad ? "h-full" : "h-auto border"} w-full max-h-[55%] border-gray-200 rounded-3xl overflow-y-auto overflow-x-auto overflow-hidden
      md:max-h-[83%]
      dark:border-[#17171a]`}
    >
      {noUsers && (
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
                No hay resultados para "{search}".
              </span>

              <span>
                Intenta nuevamente con otro nombre o crea un nuevo usuario
              </span>

              <ul className="text-center text-sm mt-1">
                <li>• Revisa que el nombre esté bien escrito</li>

                <li>• Busca por correo electrónico o rol</li>

                <li>• Si no existe, agrégalo como nuevo usuario</li>
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
                <Icon name={"groups"} size={60} fill />
              </div>

              <div className="flex flex-col items-center">
                <span className="font-medium text-2xl">
                  Aún no hay usuarios
                </span>

                <span className="text-lg text-center">
                  Crea tu primer usuario o empleado
                </span>

                <ul className="text-center text-sm mt-1">
                  <li>• Asigna roles a cada usuario</li>

                  <li>• Gestiona el acceso al sistema fácilmente</li>

                  <li>• Invita empleados con un solo clic</li>
                </ul>
              </div>
            </div>
          )}
          <CreateButton
            text={"Agregar Usuario"}
            onClick={(e) => openModal(null, "add", null, e.currentTarget)}
          />
        </div>
      )}
      {isFirstLoad ? (
        <Skeleton
          height="100%"
          borderRadius={28}
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
        />
      ) : (
        <table
          className={`${noUsers ? "hidden" : "w-full h-auto"} border-collapse
          dark:text-white`}
        >
          <thead
            className="sticky top-0 z-10 bg-white border-b border-gray-200
            dark:bg-black dark:border-[#17171a]"
          >
            <tr className="h-10 text-sm text-nowrap">
              <th className="font-medium text-start pl-4">Rol</th>

              <th className="font-medium text-start pl-4">Nombre</th>

              <th className="font-medium text-start pl-4">Telefóno</th>

              <th className="font-medium text-start pl-4">
                Correo electrónico
              </th>

              <th className="font-medium text-start pl-4">Ciudad</th>

              <th className="font-medium text-start pl-4">Dirección</th>

              <th className="font-medium text-start pl-4">Fecha de creación</th>

              <th className="font-medium text-start pl-4">Estado</th>

              <th className="font-medium text-center">Acciones</th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody
            className="font-normal 
            dark:text-white"
          >
            {users?.map((user, index) => (
              <tr
                ref={getItemRef(index)}
                key={user.id}
                className="relative h-12 text-base overflow-x-auto overflow-y-auto transition duration-75 text-[#45474d]
                hover:bg-[#F5F3F6]
                dark:hover:bg-[#2d2d30] dark:text-white"
              >
                {/* Rol */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{user.role_name}</p>
                </th>

                {/* Nombre */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{`${user.name} ${user.first_surname} ${user.second_surname}`}</p>
                </th>

                {/* Telefóno */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{user.phone}</p>
                </th>

                {/* Correo eléctronico */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{user.email}</p>
                </th>

                {/* Ciudad */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{user.city_name}</p>
                </th>

                {/* Dirección */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{user.address}</p>
                </th>

                {/* Fecha de creación */}
                <th className="font-normal text-start pl-4 text-sm">
                  <p>{user.date}</p>
                </th>

                {/* Estado */}
                <th className="font-normal text-start pl-3 text-sm">
                  <div className={`${userStatus[user.status]?.styles}`}>
                    <Icon
                      name={userStatus[user.status]?.icon}
                      size={14}
                      fill={userStatus[user.status]?.fill}
                    />

                    <span
                      className={`text-nowrap ${userStatus[user.status]?.textColor}`}
                    >
                      {userStatus[user.status]?.text}
                    </span>
                  </div>
                </th>

                {/* Botones de acción */}
                <th className="relative flex items-center justify-center gap-3 pt-1.5 text-end text-sm">
                  <ActionButtons
                    editButtonId={`edit-user-${user.id}-button`}
                    backgroundColor="#FFFFFF"
                    editButtonOnClick={(e) => {
                      e.stopPropagation();
                      openModal(user, "edit", null, e.currentTarget);
                    }}
                    deleteButtonOnClick={(e) => {
                      e.stopPropagation();
                      openModal(
                        user,
                        userStatus[user.status]?.modalType,
                        null,
                        e.currentTarget,
                      );
                    }}
                    visibilityIcon={userStatus[user.status]?.visibilityIcon}
                    moreInfoButtonVisible={false}
                  />
                </th>
              </tr>
            ))}

            {isFetchingNextPage && (
              <tr>
                <td colSpan={11}>
                  <Skeleton
                    count={4}
                    height="56px"
                    width="100%"
                    marginBottom={1}
                    backgroundColor={"#F3EEF5"}
                    darkModeBackgroundColor={"#101012"}
                    shineColor="#C5C1C7"
                    darkModeShineColor="#1e1e1e"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}
