import { apiRoutes } from "../config/apiRoutes";

let isRefreshing = false;
let refreshPromise = null;

export async function fetchWithAuth(url, options = {}) {
  let response = await fetch(url, { ...options, credentials: "include" });

  if (response.status === 401) {
    if (isRefreshing) {
      try {
        await refreshPromise;
      } catch {
        window.location.href = "/login";
        return;
      }
    } else {
      isRefreshing = true;

      refreshPromise = fetch(
        `${apiRoutes.apiUrl}${apiRoutes.auth}/refresh`,
        {
          method: "POST",
          credentials: "include",
        },
      )
        .then((res) => {
          isRefreshing = false;
          if (!res.ok) {
            refreshPromise = null;
            console.error(
              `[Tracklinker] Token refresh failed (${res.status} ${res.statusText}). ` +
                "The refresh_token cookie was not accepted by the API. " +
                "Check that the backend sets it with HttpOnly; Secure; SameSite=None; Path=/. " +
                "See the `auth` skill for the full diagnosis.",
            );
            window.location.href = "/login";
            throw new Error("Refresh token expirado o cookie no enviado");
          }
          refreshPromise = null;
          return res;
        })
        .catch((err) => {
          isRefreshing = false;
          refreshPromise = null;
          throw err;
        });

      try {
        await refreshPromise;
      } catch {
        return;
      }
    }

    response = await fetch(url, { ...options, credentials: "include" });
  }

  return response;
}
