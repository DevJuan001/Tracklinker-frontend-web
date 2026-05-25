// Hooks
import { useState } from "react";
import { useModal } from "../../globals/hooks/useModal";
// Constantes
import { sections } from "./constants/reportSections";
// Componentes
import Layout from "../../globals/components/Layout/Layout";
import TopSection from "../../globals/components/ui/TopSection";
import SectionsContainer from "./components/ui/SectionsContainer";
import UsersReport from "./components/ui/reports/users/UsersReport";
import OutputsReport from "./components/ui/reports/outputs/OutputsReport";
import ProductsReport from "./components/ui/reports/products/ProductsReport";
import SuppliersReport from "./components/ui/reports/suppliers/SuppliersReport";
import CategoriesReport from "./components/ui/reports/categories/CategoriesReport";
import WarrantiesReport from "./components/ui/reports/warranties/WarrantiesReport";
import SubcategoriesReport from "./components/ui/reports/subcategories/SubcategoriesReport";
import TransformationsReport from "./components/ui/reports/transformations/TransformationsReport";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import ExportReportModal from "./components/modals/ExportReportModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function ReportsPage() {
  const [topSectionVisiblity, setTopSectionVisiblity] = useState(true);
  const [report, setReport] = useState("home");
  const { modalType, modalData, isOpen, triggerRef, openModal, closeModal } = useModal();

  return (
    <Layout
      avatarOnClick={(e) => openModal(null, "user", null, e.currentTarget)}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <TopSection
        filterButton={false}
        sectionName={"Informes"}
        createButtonVisibility={false}
        sectionVisible={topSectionVisiblity}
      />

      {report === "home" && (
        <SectionsContainer
          sections={sections}
          setReport={setReport}
          setTopSectionVisiblity={setTopSectionVisiblity}
        />
      )}

      {/* Contenido principal dinamico */}
      {report === "users" && <UsersReport setReport={setReport} openModal={openModal} />}

      {report === "products" && <ProductsReport setReport={setReport} openModal={openModal} />}

      {report === "categories" && <CategoriesReport setReport={setReport} openModal={openModal} />}

      {report === "subcategories" && (
        <SubcategoriesReport setReport={setReport} />
      )}

      {report === "warranties" && <WarrantiesReport setReport={setReport} openModal={openModal} />}

      {report === "suppliers" && <SuppliersReport setReport={setReport} openModal={openModal} />}

      {report === "outputs" && <OutputsReport setReport={setReport} openModal={openModal} />}

      {report === "transformations" && (
        <TransformationsReport setReport={setReport} openModal={openModal} />
      )}

      {/* Modales */}
      {modalType && (
        <Modal
          triggerRef={triggerRef}
          title={
            modalType === "user"
              ? "Configuración"
              : modalType === "editStatus"
              ? ""
              : "Ayuda"
          }
          type={modalType}
          isOpen={isOpen}
          onClose={() => closeModal()}
        >
          {modalType === "user" && <ProfileModal />}

          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}

          {modalType === "editStatus" && (
            <ExportReportModal modalData={modalData} onClose={() => closeModal()} />
          )}
        </Modal>
      )}
    </Layout>
  );
}
