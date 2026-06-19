import Kpi from "../../../../globals/components/ui/Kpi";
import Skeleton from "../../../../globals/components/ui/Skeleton";
import { useWarrantiesByStatus } from "../../hooks/useWarrantiesByStatus";

export default function WarrantiesKpis() {
  const { data, loading } = useWarrantiesByStatus();

  return (
    <section
      className="h-[15%] mb-3
      md:h-[10%]"
    >
      {loading ? (
        <div
          className="flex items-center gap-2
          md:gap-4"
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
          className="h-full flex items-center gap-2
          md:gap-4"
        >
          <Kpi title={"Total"} value={data?.[0]?.total_warranties} />

          <Kpi
            title={"Sin Completar"}
            value={data?.[0]?.without_make_warranties}
          />

          <Kpi title={"En Proceso"} value={data?.[0]?.inprocess_warranties} />

          <Kpi title={"Completadas"} value={data?.[0]?.complete_warranties} />
        </div>
      )}
    </section>
  );
}
