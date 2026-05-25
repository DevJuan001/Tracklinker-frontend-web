import Icon from "../../../../globals/components/ui/Icon";
import { useExportFile } from "../../hooks/useExportFile";

export default function ExportReportModal({ modalData, onClose }) {
  const hasData = modalData && modalData.tableData;
  const { exportToExcel, exportToPDF } = useExportFile();

  const handleExportPDF = () => {
    if (!hasData) return;
    exportToPDF(modalData);
    onClose();
  };

  const handleExportExcel = () => {
    if (!hasData) return;
    exportToExcel(modalData);
    onClose();
  };

  return (
    <div className="w-full flex flex-col gap-1.5 p-1">
      <>
        <button
          onClick={handleExportPDF}
          className="min-h-[52px] w-full flex items-center justify-between px-5 cursor-pointer text-sm rounded-full transition-all duration-200
            bg-transparent hover:bg-[#efedf0] hover:font-medium active:scale-[0.98]
            dark:text-white dark:hover:bg-[#ffffff15]"
        >
          <span>Exportar a PDF</span>
          <Icon name={"file_save"} size={25} color={"#BB271A"} />
        </button>

        <button
          onClick={handleExportExcel}
          className="min-h-[52px] w-full flex items-center justify-between px-5 cursor-pointer text-sm rounded-full transition-all duration-200
            bg-transparent hover:bg-[#efedf0] hover:font-medium active:scale-[0.98]
            dark:text-white dark:hover:bg-[#ffffff15]"
        >
          <span>Exportar a Excel</span>
          <Icon name={"table_view"} size={24} color={"#48752C"} />
        </button>
      </>
    </div>
  );
}
