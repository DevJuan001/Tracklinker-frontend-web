import CategoryItem from "./CategoryItem";
import CreateButton from "../../../../globals/components/ui/CreateButton";
import Icon from "../../../../globals/components/ui/Icon";
import Skeleton from "../../../../globals/components/ui/Skeleton";

export default function CategoriesList({
  categories,
  loading,
  search,
  openModal,
}) {
  const noCategories = categories.length === 0 && !loading;
  const isFirstLoad = categories.length === 0 && loading;

  return (
    /* Contenedor de categorías */
    <section className="h-[95%] w-full pb-2 overflow-x-auto overflow-y-auto">
      {noCategories && (
        <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl gap-5">
          {search !== "" ? (
            <div
              className="flex flex-col items-center justify-center gap-0.5 text-[#7E8088]
                dark:text-[#E4E2E5]"
            >
              <div
                className="flex items-center justify-center bg-[#F5F3F6] w-28 h-28 rounded-full 
                  dark:bg-[#101012]"
              >
                <Icon name={"search_off"} size={60} />
              </div>
              <span className="text-2xl font-medium text-center">
                No hay resultados para <strong>"{search}"</strong>.
              </span>
              <span className="text-lg text-center">
                Intenta con otra nombre o agrega una nueva.
              </span>
              <ul className="text-center text-sm mt-1">
                <li>• Revisa que el nombre esté bien escrito</li>
                <li>• Busca por nombre o fecha de creación</li>
                <li>• Si no existe, agrégala como nueva categoría</li>
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
                  Aún no hay categorías
                </span>
                <span className="text-lg text-center">
                  Agrega una nueva categoría y empieza a organizar tus
                  productos.
                </span>
              </div>
              <ul className="text-center text-sm mt-1">
                <li>• Asigna categorías a tus productos</li>
                <li>• Gestiona el inventario de manera eficiente</li>
                <li>• Crea categorías con un solo click</li>
              </ul>
            </div>
          )}
          <CreateButton
            text={"Crear categoría"}
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
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              openModal={openModal}
              moreInfoOnClick={(e) => {
                e.stopPropagation();
                openModal(category, "info", null, e.currentTarget);
              }}
              editButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(category, "edit", null, e.currentTarget);
              }}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
