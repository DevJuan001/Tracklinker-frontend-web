import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth"

export async function subcategoriesChartData() {
    const res = await fetch(`${apiRoutes.apiUrl}${apiRoutes.dashboard}/subcategories-with-stock`, {
        method: "GET",
        headers: {
            Authorization: getToken()
        }
    })

    if (!res.ok) {
        throw new Error("Error al intentar obtener las subcategorias");
    }

    const data = await res.json()

    return data.data;
}