import { userStatus } from "../../../users/constants/userStatus";

export default function MoreInfoOutputOrderModal({ selectedOutputOrder }) {
  return (
    <address className="flex flex-col justify-center items-center not-italic gap-2">
      <div className="self-start flex flex-col mt-2">
          <span className="text-sm text-[#7e777ed0] dark:text-[#b4aab4]">
            Descripción
          </span>
          <span className="flex items-center font-medium">
            {selectedOutputOrder.description}
          </span>
        </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Modelo</strong>
        </span>
        <p>{selectedOutputOrder.product_detail_model}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Descripción</strong>
        </span>
        <p>{selectedOutputOrder.product_detail_description}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Serial</strong>
        </span>
        <p>{selectedOutputOrder.product_serial}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Fecha de finazalización de la garantía</strong>
        </span>
        <p>{selectedOutputOrder.out_product_garanty}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Estado</strong>
        </span>
        <p>{userStatus[selectedOutputOrder.out_order_status]?.text}</p>
      </div>
    </address>
  );
}
