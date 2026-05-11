import SubcategoriesItem from "./SubcategoriesItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Icon from "../../../../globals/components/ui/Icon";
import CreateButton from "../../../../globals/components/ui/CreateButton";

export default function SubcategoriesList({
  subcategories,
  search,
  loading,
  openModal,
}) {
  const noSubcategories = subcategories.length === 0 && !loading;
  const isFirstLoad = subcategories.length === 0 && loading;

  return (
    /* Contenedor de las subcategorías */
    <section className="h-[95%] w-full pb-2 overflow-auto">
      {noSubcategories && (
        <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl gap-5">
          {search !== "" ? (
            <div
              className="flex flex-col items-center justify-center gap-2 text-[#7E8088]
              dark:text-[#E4E2E5]"
            >
              <div
                className="flex items-center justify-center bg-[#F5F3F6] w-24 h-24 rounded-full 
                dark:bg-[#101012]"
              >
                <Icon name={"search_off"} size={60} />
              </div>
              <span className="text-xl font-medium text-center">
                No hay resultados para <strong>"{search}"</strong>. Intenta con
                otro nombre o crea una nueva.
              </span>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-2 text-[#7E8088] 
              dark:text-[#E4E2E5]"
            >
              <div
                className="flex items-center justify-center bg-[#F5F3F6] w-28 h-28 rounded-full
                dark:bg-[#101012]"
              >
                <Icon name={"folder_copy"} size={60} fill />
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-2xl">
                  Aún no hay subcategorías
                </span>
                <span className="text-lg text-center">
                  Crea tu primera subcategoría para empezar a organizar tus
                  productos.
                </span>
              </div>
            </div>
          )}
          <CreateButton
            text={"Crear subcategoria"}
            onClick={(e) => openModal(null, "add", null, e.currentTarget)}
          />
        </div>
      )}
      <ul className="flex flex-col gap-1">
        {isFirstLoad ? (
          <SkeletonTheme baseColor="#f3eef5" highlightColor="#c5c1c7">
            <li>
              <Skeleton height={"68px"} count={13} borderRadius={"8px"} />
            </li>
          </SkeletonTheme>
        ) : (
          subcategories.map((subcategory) => (
            // Subcategorías
            <SubcategoriesItem
              key={subcategory.subcategory_id}
              subcategory={subcategory}
              openModal={openModal}
              moreInfoOnClick={(e) => {
                e.stopPropagation();
                openModal(subcategory, "info", null, e.currentTarget);
              }}
              editButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(subcategory, "edit", null, e.currentTarget);
              }}
            />
          ))
        )}
      </ul>
    </section>
  );
}
