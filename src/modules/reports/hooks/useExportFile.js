import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { userStatus } from "../../users/constants/userStatus";
import { warrantyStatusConfig } from "../../warranties/constants/warrantyStatus";
import { productStatusConfig } from "../../products/constants/productStatusConfig";

export function useExportFile() {
  // Obtener encabezados y mapeo de filas según el tipo de reporte
  function getReportConfig(type, tableData) {
    if (!Array.isArray(tableData)) return { headers: [], rows: [] };

    switch (type) {
      case "users":
        return {
          headers: [
            "Nombre",
            "Correo",
            "Teléfono",
            "Fecha de creación",
            "Estado",
          ],
          rows: tableData.map((user) => [
            `${user.name || ""} ${user.surname || ""}`.trim(),
            user.email || "N/A",lo 
            user.phone || "N/A",
            user.date || "N/A",
            userStatus[user.status].text,
          ]),
        };

      case "products":
        return {
          headers: ["Modelo", "Serial", "Marca", "Fecha de entrada", "Estado"],
          rows: tableData.map((product) => [
            product.model || "N/A",
            product.serial || "N/A",
            product.brand || "N/A",
            product.input_date || "N/A",
            productStatusConfig[product.status].text,
          ]),
        };

      case "categories":
        return {
          headers: ["Nombre", "Descripción", "Fecha de creación", "Estado"],
          rows: tableData.map((category) => [
            category.name || "N/A",
            category.description || "Sin descripción",
            category.date || "N/A",
            userStatus[category.status].text,
          ]),
        };

      case "subcategories":
        return {
          headers: ["Nombre", "Categoría", "Fecha de creación", "Estado"],
          rows: tableData.map((subcategory) => [
            subcategory.name || "N/A",
            subcategory.category || "N/A",
            subcategory.date || "N/A",
            userStatus[subcategory.status].text,
          ]),
        };

      case "suppliers":
        return {
          headers: [
            "Nombre",
            "Ciudad",
            "Dirección",
            "Correo",
            "Teléfono",
            "Fecha de creación",
            "Estado",
          ],
          rows: tableData.map((supplier) => [
            supplier.name || "N/A",
            supplier.city || "N/A",
            supplier.address || "N/A",
            supplier.email || "N/A",
            supplier.phone || "N/A",
            supplier.date || "N/A",
            userStatus[supplier.status].text,
          ]),
        };

      case "warranties":
        return {
          headers: [
            "Serial",
            "Cliente",
            "Descripción",
            "Fecha de creación",
            "Estado",
          ],
          rows: tableData.map((warranty) => [
            warranty.serial || "N/A",
            warranty.customer || "N/A",
            warranty.description || "Sin descripción",
            warranty.date || "N/A",
            warrantyStatusConfig[warranty.status].text,
          ]),
        };

      case "outputs":
        return {
          headers: [
            "Seriales",
            "Marca",
            "Modelo",
            "Fecha final de garantía",
            "Fecha de creación",
            "Estado",
          ],
          rows: tableData.map((output) => [
            output.serial || "N/A",
            output.brand || "N/A",
            output.model || "N/A",
            output.warranty_time || "N/A",
            output.date || "N/A",
            userStatus[output.status].text,
          ]),
        };

      default:
        return { headers: [], rows: [] };
    }
  }

  function exportToExcel({
    reportName,
    period,
    startDate,
    endDate,
    kpis,
    tableData,
    type,
  }) {
    const wb = XLSX.utils.book_new();

    // Indicadores clave
    const summaryRows = [
      [`REPORTE DE ${reportName.toUpperCase()}`],
      [`Período de fechas: ${startDate} - ${endDate} (${period})`],
      [],
      ["INDICADORES CLAVE DE RENDIMIENTO (KPIs)"],
      ["Métrica", "Valor"],
    ];

    if (kpis && typeof kpis === "object") {
      Object.entries(kpis).forEach(([key, val]) => {
        summaryRows.push([key, val !== undefined && val !== null ? val : 0]);
      });
    }

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);

    wsSummary["!cols"] = [{ wch: 30 }, { wch: 25 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, "Resumen");

    // Registros Detallados
    const { headers, rows } = getReportConfig(type, tableData);

    if (headers.length > 0) {
      const detailRows = [headers, ...rows];
      const wsDetail = XLSX.utils.aoa_to_sheet(detailRows);

      const colWidths = headers.map((h, i) => {
        let maxLen = h.length;
        rows.forEach((r) => {
          const valStr = String(r[i] || "");
          if (valStr.length > maxLen) {
            maxLen = valStr.length;
          }
        });
        return { wch: Math.min(maxLen + 4, 40) };
      });
      wsDetail["!cols"] = colWidths;

      XLSX.utils.book_append_sheet(wb, wsDetail, "Detalles");
    }

    // Generar archivo y descargar
    const fileName = `reporte_${type}_${period}_${Date.now()}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }

  function exportToPDF({
    reportName,
    period,
    startDate,
    endDate,
    kpis,
    tableData,
    type,
  }) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Encabezado
    doc.setFillColor(9, 38, 121);
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(`REPORTE DE ${reportName.toUpperCase()}`, 15, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      `Período de fechas: ${startDate} a ${endDate} (${period})`,
      15,
      30,
    );

    // fecha de emisión
    const fechaEmision = new Date().toLocaleDateString();
    doc.text(`Emitido el: ${fechaEmision}`, pageWidth - 15, 20, {
      align: "right",
    });

    let currentY = 50;

    // Indicadores clave (KPIs)
    if (kpis && typeof kpis === "object") {
      doc.setTextColor(43, 45, 66);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("INDICADORES CLAVE (KPIs)", 15, currentY);
      currentY += 5;

      const kpiHeaders = [["Indicador", "Valor"]];
      const kpiBody = Object.entries(kpis).map(([key, val]) => [
        key,
        val !== undefined && val !== null ? String(val) : "0",
      ]);

      autoTable(doc, {
        startY: currentY,
        head: kpiHeaders,
        body: kpiBody,
        theme: "striped",
        headStyles: { fillColor: [9, 38, 121] },
        styles: { fontSize: 10, cellPadding: 2.5 },
        margin: { left: 15, right: 15 },
        tableWidth: 100,
      });

      currentY = doc.lastAutoTable.finalY + 15;
    }

    // Tabla Detallada de Registros
    const { headers, rows } = getReportConfig(type, tableData);
    if (headers.length > 0) {
      doc.setTextColor(43, 45, 66);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("REGISTROS DETALLADOS", 15, currentY);
      currentY += 5;

      autoTable(doc, {
        startY: currentY,
        head: [headers],
        body: rows,
        theme: "grid",
        headStyles: {
          fillColor: [9, 38, 121],
          fontSize: 10,
          fontStyle: "bold",
          halign: "left",
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
          overflow: "linebreak",
          halign: "left",
        },
        alternateRowStyles: {
          fillColor: [245, 246, 248],
        },
        margin: { left: 15, right: 15 },
      });
    } else {
      // Si no hay datos detallados
      doc.setFont("helvetica", "italic");
      doc.setFontSize(11);
      doc.text(
        "No se encontraron registros detallados para este reporte.",
        15,
        currentY,
      );
    }

    // Descargar el PDF
    const fileName = `reporte_${type}_${period}_${Date.now()}.pdf`;
    doc.save(fileName);
  }

  return { exportToExcel, exportToPDF };
}
