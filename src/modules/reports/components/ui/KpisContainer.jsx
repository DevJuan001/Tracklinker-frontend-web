import KpiCard from "./KpiCard";

export default function KpisContainer({
  firstKpiName,
  firstKpiValue,
  secondKpiName,
  secondKpiValue,
  thirdKpiName,
  thirdKpiValue,
  fourthKpiName,
  fourthKpiValue,
}) {
  return (
    <section
      className="col-span-12 row-span-1 grid grid-cols-4 grid-rows-1 gap-1.5
      md:gap-3"
    >
      <KpiCard name={firstKpiName} metricValue={firstKpiValue} />
      <KpiCard name={secondKpiName} metricValue={secondKpiValue} />
      <KpiCard name={thirdKpiName} metricValue={thirdKpiValue} />
      <KpiCard name={fourthKpiName} metricValue={fourthKpiValue} />
    </section>
  );
}
