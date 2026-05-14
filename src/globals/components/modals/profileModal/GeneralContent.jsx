// Hooks
import { useNavigate } from "react-router-dom";
// Services
import { logout } from "../../../../modules/login/services/authService";
// Componentes
import Icon from "../../ui/Icon";
// Icons
import { asideIcons } from "../../../../assets/icons/asideIcons";

export default function GeneralContent({ user, onEditClick, onPasswordClick }) {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col gap-7 animate-blurUp dark:text-white">
      {/* Información general del usuario */}
      <section className="flex flex-col">
        <span className="font-medium text-sm pl-1">Perfil</span>
        <section className="flex gap-4 items-center mt-4">
          <img src={asideIcons.avatarIcon} alt="" className="h-14 w-14" />
          <article className="flex flex-col justify-center">
            <span className="font-medium">
              {user.name} {user.first_surname}
            </span>
            <span className="font-light text-sm">{user.email}</span>
          </article>
        </section>
      </section>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <span className="font-medium text-sm">Cuenta</span>
          <span className="text-xs font-light">
            Gestiona la informacion de tu cuenta
          </span>
        </div>

        <button
          onClick={onEditClick}
          className="flex items-center gap-1.5 px-4 py-3 rounded-lg bg-black text-white
          dark:bg-[#20202296] dark:hover:text-gray-300"
        >
          <Icon
            name={"app_registration"}
            color={"#fff"}
            size={21}
          />

          <span className="text-sm font-medium">Editar</span>
        </button>
      </div>

      <div className="flex justify-between">
        <section className="flex flex-col gap-1">
          <span className="font-medium text-sm">Contraseña</span>
          <span className="text-xs font-light">Cambiar tu Contraseña</span>
        </section>
        <button
          onClick={onPasswordClick}
          className="flex items-center gap-1.5 px-4 py-3 rounded-lg bg-black text-sm bg-blacktransition text-white
          dark:bg-[#20202296] dark:text-white dark:hover:text-gray-300"
        >
          <Icon
            name={"edit_square"}
            color={"#fff"}
            size={20}
          />

          <span className="font-medium">Cambiar</span>
        </button>
      </div>

      <section className="flex justify-between">
        <section className="flex flex-col gap-1">
          <span className="font-medium text-sm">Cerrar Sesion</span>
          <span className="text-xs font-light">
            Cerrar sesion en este dispositivo
          </span>
        </section>
        <button
          onClick={() => logout(navigate)}
          className="flex items-center gap-1.5 px-4 py-3 rounded-lg bg-black text-sm bg-blacktransition text-white
          dark:bg-[#20202296] dark:text-white dark:hover:text-gray-300"
        >
          <Icon
            name="logout"
            size={22}
            color={"#fff"}
          />
          <span className="font-medium">Cerrar Sesion</span>
        </button>
      </section>
    </div>
  );
}
