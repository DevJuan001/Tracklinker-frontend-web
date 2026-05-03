import SupplierItem from "./SupplierItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { userStatus } from "../../../users/constants/userStatus";
import Icon from "../../../../globals/components/ui/Icon";

export default function SuppliersList({ suppliers, loading, openModal }) {
  const noSuppliers = suppliers.length === 0 && !loading;
  const isFirstLoad = suppliers.length === 0 && loading;

  return (
    <section className="h-[95%] w-full flex flex-col gap-1 overflow-x-auto overflow-y-auto">
      {noSuppliers && (
        <div
          className="w-full h-full flex flex-col items-center justify-center rounded-3xl gap-2 bg-[#F5F3F6] text-[#7E8088]
            dark:bg-[#17171a]"
        >
          <Icon name={"mist"} size={70} />
          <span className="text-2xl font-medium">
            No se encontraron proveedores
          </span>
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
          suppliers.map((supplier) => (
            <SupplierItem
              key={supplier.id}
              supplier={supplier}
              moreInfoOnClick={(e) => {
                e.stopPropagation();
                openModal(supplier, "info", null, e.currentTarget);
              }}
              editButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(supplier, "edit", null, e.currentTarget);
              }}
              deleteButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(
                  supplier,
                  userStatus[supplier.status]?.modalType,
                  null,
                  e.currentTarget,
                );
              }}
            />
          ))
        )}
      </ul>
    </section>
  );
}
