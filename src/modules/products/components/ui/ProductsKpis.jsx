import Kpi from "../../../../globals/components/ui/Kpi";
import Skeleton from "../../../../globals/components/ui/Skeleton";
import { useProductsByStatus } from "../../hooks/useProductsByStatus";

export default function ProductsKpis() {
  const { data, loading } = useProductsByStatus();

  return (
    <section
      className="h-[30%] mb-3 p-1
      md:h-[10%] md:p-0"
    >
      {loading ? (
        <div
          className="h-full flex flex-wrap items-center gap-1
          md:flex-nowrap md:gap-4"
        >
          <Skeleton
            count={4}
            width="460px"
            height={"92px"}
            borderRadius={"20px"}
            backgroundColor={"#F3EEF5"}
            darkModeBackgroundColor={"#101012"}
            shineColor="#C5C1C7"
            darkModeShineColor="#1e1e1e"
          />
        </div>
      ) : (
        <div
          className="h-full flex flex-wrap items-center gap-1
          md:flex-nowrap md:gap-4"
        >
          <Kpi
            title={"Creados recientemente"}
            value={data?.[0]?.recent_products}
          />

          <Kpi title={"Vendidos"} value={data?.[0]?.sold_products} />

          <Kpi title={"En garantía"} value={data?.[0]?.warranties_products} />

          <Kpi title={"Total"} value={data?.[0]?.total_products} />
        </div>
      )}
    </section>
  );
}
