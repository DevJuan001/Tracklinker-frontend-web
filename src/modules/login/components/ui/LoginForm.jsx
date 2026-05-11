// Hooks
import { useLogin } from "../../hooks/useLogin";
// Iconos
import { loginIcons } from "../../../../assets/icons/loginIcons";
// Components
import FormButtons from "./FormButtons";
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import Icon from "../../../../globals/components/ui/Icon";

export default function LoginForm({ openModal }) {
  const {
    form,
    loading,
    fieldError,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
  } = useLogin(openModal);

  return (
    <section className="w-full h-full flex items-center justify-center">
      {/* Container del formulario */}
      <div className="min-w-full flex flex-col items-center px-4 py-8">
        {/* Icono de Tracklinker */}
        <img
          src={loginIcons.tracklinkerIcon}
          alt=""
          className="w-[150px] h-[150px] dark:invert dark:brightness-0"
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-[370px] flex flex-col gap-1.5 dark:text-white"
        >
          {/* Campo del correo */}
          <div>
            <span className="pl-1 text-sm font-medium">Correo</span>
            <FormField
              id={"email"}
              name={"email"}
              value={form.email}
              autoComplete="email"
              placeholder={"Correo"}
              onChange={handleChange}
              className={fieldError("email")}
            />
          </div>

          {/* Campo de la contraseña */}
          <div>
            <span className="pl-1 text-sm font-medium">Contraseña</span>
            <FormField
              id={"password"}
              name={"password"}
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder={"Contraseña"}
              className={fieldError("password")}
            >
              <button
                className="flex items-center pr-1"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Icon name={showPassword ? "visibility" : "visibility_off"} />
              </button>
            </FormField>
          </div>

          {/* Botones de Ingresar y recuperar contraseña */}
          <FormButtons
            getIntoButtonText={loading ? <Loader /> : "Ingresar"}
            getIntoButtonOnclick={(e) => handleSubmit(e)}
            recoverButtonOnclick={(e) =>
              openModal(null, "rememberPassword", null, e.currentTarget)
            }
          />
        </form>
      </div>
    </section>
  );
}
