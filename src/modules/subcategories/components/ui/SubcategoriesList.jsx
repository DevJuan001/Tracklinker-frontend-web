import SubcategoriesItem from "./SubcategoriesItem";
import Icon from "../../../../globals/components/ui/Icon";
import CreateButton from "../../../../globals/components/ui/CreateButton";
import Skeleton from "../../../../globals/components/ui/Skeleton";

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

              <span className="text-2xl font-medium">
                No hay resultados para <strong>"{search}"</strong>
              </span>

              <span className="text-center">
                Intenta con otro nombre o crea una nueva.
              </span>

              <ul className="text-center text-sm mt-1">
                <li>• Revisa que el nombre esté bien escrito</li>
                <li>• Busca por categoría o fecha de creación</li>
                <li>• Si no existe, crea una nueva subcategoría</li>
              </ul>
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

                <ul className="text-center text-sm mt-1">
                  <li>• Crea subcategorías para organizar tus productos</li>
                  <li>• Gestiona tu inventario de manera eficiente</li>
                  <li>• Crea y edita subcategorías fácilmente</li>
                </ul>
              </div>
            </div>
          )}
          <CreateButton
            text={"Crear subcategoria"}
            onClick={(e) => openModal(null, "add", null, e.currentTarget)}
          />
        </div>
      )}
      {isFirstLoad ? (
        <Skeleton
          height="80px"
          count={11}
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
          borderRadius={12}
          marginBottom={2}
        />
      ) : (
        <ul className="flex flex-col gap-1">
          {subcategories.map((subcategory) => (
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
          ))}
        </ul>
      )}
    </section>
  );
}
