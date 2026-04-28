export function useAvatar(user) {
  const initials = [user.name, user.first_surname]
    .filter(Boolean)
    .map((s) => s[0].toUpperCase())
    .join("");

  return { initials };
}
