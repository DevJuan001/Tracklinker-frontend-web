export function getValueError(response) {
  const error = response.detail;

  const emailError = Array.isArray(error)
    ? error.map((error) =>
        error.msg.replace(
          /value is not a valid email address:.+/i,
          "El correo electrónico no es válido, revisa que este bien escrito e intentalo nuevamente",
        ),
      )
    : null;

  const valueError = Array.isArray(error)
    ? error.map((error) => error.msg)
    : null;

  return emailError || valueError;
}
