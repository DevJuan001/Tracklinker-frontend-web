// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Components
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import EditUserInfoModal from "./EditUserInfoModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";
import Avatar from "../../../../globals/components/ui/Avatar";
import Icon from "../../../../globals/components/ui/Icon";
import { userStatus } from "../../constants/userStatus";

export default function MoreInfoUser({ user, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();

  return (
    <section className="flex flex-col items-center">
      <div className="w-full self-start flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar user={user} size={50} />
            <span className="font-semibold text-2xl dark:text-white">
              {user.name} {user.first_surname} {user.second_surname}
            </span>
          </div>
          <div
            className={`flex items-center px-2 py-1 gap-1 rounded-full border text-xs
            ${userStatus[user.status]?.styles}
            `}
          >
            <Icon
              size={14}
              name={userStatus[user.status]?.icon}
              fill={userStatus[user.status]?.fill}
            />
            <span>{userStatus[user.status]?.text}</span>
          </div>
        </div>

        <div className="flex flex-col mt-2">
          <span className="text-[#75777E] text-sm">Rol</span>
          <span className="dark:text-white">{user.rol_name}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[#75777E] text-sm">Teléfono</span>
          <span className="dark:text-white">{user.phone}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[#75777E] text-sm">Correo electrónico</span>
          <span className="dark:text-white">{user.email}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[#75777E] text-sm">Ciudad</span>
          <span className="dark:text-white">{user.city_name}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[#75777E] text-sm">Dirección</span>
          <span className="dark:text-white">{user.address}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[#75777E] text-sm">Fecha de creación</span>
          <span className="dark:text-white">{user.date}</span>
        </div>
      </div>

      <ConfirmCancelButtons
        confirmText="Editar"
        confirmButtonOnClick={(e) => openInnerModal("edit", e)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "edit" && (
        <AddInnerModal
          isOpen={true}
          triggerRef={innerTrigger}
          onClose={() => openInnerModal(null)}
          title={"Editar usuario"}
        >
          <EditUserInfoModal user={user} />
        </AddInnerModal>
      )}
    </section>
  );
}
