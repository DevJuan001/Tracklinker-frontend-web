import HomePage from "../../modules/home/HomePage";
import DashBoardPage from "../../modules/dashboard/DashboardPage";
import UsersPage from "../../modules/users/UsersPage";
import ProductsPage from "../../modules/products/ProductsPage";
import CategoriesPage from "../../modules/categories/CategoriesPage";
import SubcategoriesPage from "../../modules/subcategories/SubcategoriesPage";
import ReportsPage from "../../modules/reports/ReportsPage";
import WarrantiesPage from "../../modules/warranties/WarrantiesPage";
import SuppliersPage from "../../modules/suppliers/SuppliersPage";
import OutputOrdersPage from "../../modules/output-orders/OutputOrdersPage";

export const routesConfig = [
  {
    path: "/home",
    component: HomePage,
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    path: "/dashboard",
    component: DashBoardPage,
    roles: ["Admin"],
  },
  {
    path: "/users",
    component: UsersPage,
    roles: ["Admin"],
  },
  {
    path: "/products",
    component: ProductsPage,
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    path: "/categories",
    component: CategoriesPage,
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    path: "/subcategories",
    component: SubcategoriesPage,
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    path: "/reports",
    component: ReportsPage,
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    path: "/warranties",
    component: WarrantiesPage,
    roles: ["Admin", "Técnico"],
  },
  {
    path: "/suppliers",
    component: SuppliersPage,
    roles: ["Admin"],
  },
  {
    path: "/output-orders",
    component: OutputOrdersPage,
    roles: ["Admin", "Almacén", "Técnico"],
  },
];
