export function useAvatar(user) {
  const initials =
    typeof user === "string"
      ? user.split(" ").slice(0, 2).map((s) => s[0].toUpperCase()).join("")
      : [user.name, user.first_surname]
          .filter(Boolean)
          .map((s) => s[0].toUpperCase())
          .join("");

  return { initials };
}