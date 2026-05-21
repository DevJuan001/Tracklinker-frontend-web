import UserItem from "./UserItem";
import Skeleton from "../../../../globals/components/ui/Skeleton";
import Icon from "../../../../globals/components/ui/Icon";
import CreateButton from "../../../../globals/components/ui/CreateButton";

export default function UsersList({ users, loading, search, openModal }) {
  const noUsers = users.length === 0 && !loading;
  const isFirstLoad = users.length === 0 && loading;

  return (
    /* Contenedor de los usuarios */
    <section className="h-[95%] w-full pb-2 overflow-x-auto overflow-y-auto">
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
        <ul className="h-full flex flex-col gap-1">
          {users.map((user) => (
            // Usuarios
            <UserItem
              key={user.id}
              user={user}
              openModal={openModal}
              itemOnClick={(e) => {
                e.stopPropagation();
                openModal(user, "info", null, e.currentTarget);
              }}
              editButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(user, "edit", null, e.currentTarget);
              }}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
