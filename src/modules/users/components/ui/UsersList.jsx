import UserItem from "./UserItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Icon from "../../../../globals/components/ui/Icon";

export default function UsersList({ users, loading, openModal }) {
  const noUsers = users.length === 0 && !loading;
  const isFirstLoad = users.length === 0 && loading;

  return (
    /* Contenedor de los usuarios */
    <section className="h-[95%] w-full pb-4 overflow-x-auto overflow-y-auto">
      {noUsers && (
        <div
          className="w-full h-full flex flex-col items-center justify-center rounded-3xl gap-2 bg-[#F5F3F6] text-[#7E8088]
          dark:bg-[#17171a]"
        >
          <Icon name={"mist"} size={70} />
          <span className="text-2xl font-medium">
            No se encontraron usuarios
          </span>
        </div>
      )}
      <ul className="flex flex-col gap-1">
        {isFirstLoad ? (
          <SkeletonTheme baseColor="#f3eef5" highlightColor="#c5c1c7">
            <li>
              <Skeleton height={"68px"} count={13} borderRadius={"8px"} />
            </li>
          </SkeletonTheme>
        ) : (
          users.map((user) => (
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
          ))
        )}
      </ul>
    </section>
  );
}
