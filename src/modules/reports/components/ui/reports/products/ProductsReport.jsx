// Hooks
import { useState } from "react";
import { useProductsData } from "../../../../hooks/products/useProductsData";
import { useProductsTableData } from "../../../../hooks/products/useProductsTableData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import ProductsTable from "./ProductsTable";
import ProductsPieChart from "./ProductsPieChart";
import ProductsAreaChart from "./ProductsAreaChart";

export default function ProductsReport({ setReport, openModal }) {
  const { productsData } = useProductsData();
  const { productsData: tableData } = useProductsTableData();
  const [period, setPeriod] = useState("1a");
  const { startDate, endDate } = getDateRange(period);

  return (
    <>
      {productsData.map((item) => (
        <ReportsContainer
          key={"product-reports-container"}
          reportsName={"Productos"}
          reportsDate={`${startDate} - ${endDate}`}
          setReport={setReport}
          setPeriod={setPeriod}
          periods={["7d", "30d", "6m", "1a"]}
          currentPeriod={period}
          openModal={openModal}
          exportData={{
            reportName: "Productos",
            period,
            startDate,
            endDate,
            kpis: {
              "Total productos": item.total_products,
              "Recientes": item.recent_products,
              "En garantía": item.warranties_products,
              "Vendidos": item.sold_products,
            },
            tableData,
            type: "products",
          }}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Total productos"}
            firstKpiValue={item.total_products}
            secondKpiName={"Recientes"}
            secondKpiValue={item.recent_products}
            thirdKpiName={"En garantía"}
            thirdKpiValue={item.warranties_products}
            fourthKpiName={"Vendidos"}
            fourthKpiValue={item.sold_products}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <ProductsAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}>
            <ProductsPieChart period={period} />
          </ReportCard>

          <TableCard tableTitle={"Productos recientes"}>
            <ProductsTable data={tableData} />
          </TableCard>
        </ReportsContainer>
      ))}
    </>
  );
}
