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
          className="w-[400px] flex flex-col gap-2 dark:text-white"
        >
          {/* Campo del correo */}
          <FormField
            id={"email"}
            name={"email"}
            labelText={"Correo"}
            value={form.email}
            autoComplete="email"
            placeholder={"Correo"}
            onChange={handleChange}
            className={fieldError("email")}
          />

          {/* Campo de la contraseña */}
          <FormField
            id={"password"}
            name={"password"}
            labelText={"Contraseña"}
            type={showPassword ? "text" : "password"}
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
              <Icon name={showPassword ? "visibility_off" : "visibility"} />
            </button>
          </FormField>

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
