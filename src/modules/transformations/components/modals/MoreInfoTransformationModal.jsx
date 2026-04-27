import { userStatus } from "../../../users/constants/userStatus";

export default function MoreInfoTransformationModal({
  selectedTransformation,
}) {
  return (
    <address className="flex flex-col justify-center items-center not-italic gap-2">
      <div className="flex flex-col items-center">
        <span>
          <strong>Marca</strong>
        </span>
        <p>{selectedTransformation.product_brand_name}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Modelo</strong>
        </span>
        <p>{selectedTransformation.product_detail_model}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Descripción</strong>
        </span>
        <p>{selectedTransformation.product_detail_description}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Serial</strong>
        </span>
        <p>{selectedTransformation.product_serial}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Transformación</strong>
        </span>
        <p>{selectedTransformation.product_transformation}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Fecha de finazalización de la garantía</strong>
        </span>
        <p>{selectedTransformation.out_product_garanty}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Estado</strong>
        </span>
        <p>{userStatus[selectedTransformation.out_order_status]?.text}</p>
      </div>
    </address>
  );
}
