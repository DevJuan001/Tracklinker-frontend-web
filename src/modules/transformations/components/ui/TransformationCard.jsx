export default function TranformationCard({
  transformationId,
  transformationRequirement,
  transformationCreateDate,
  transformationStatusIcon,
  transformationStatus,
  onClick,
}) {
  return (
    <section className="max-w-80 h-50 max-h-56 p-4 flex flex-col gap-2 rounded-xl shadow-gray-400 shadow-sm border">
      <span className="text-lg font-semibold dark:text-white">
        ID: {transformationId}
      </span>
      <span className="text-lg font-medium">{transformationRequirement}</span>
      <div className="flex gap-2 text-gray-600">
        <span>Fecha de creación: </span>
        <span>{transformationCreateDate}</span>
      </div>
      <section className="flex flex-col">
        <span>Estado:</span>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img
              src={transformationStatusIcon}
              alt=""
              className="w-[20px] h-[20px]"
            />
            <span>{transformationStatus}</span>
          </div>
          <button
            onClick={onClick}
            className="py-2 px-5 text-sm bg-blue-950 text-white rounded-2xl outline-none"
          >
            Ver Más &gt;
          </button>
        </div>
      </section>
    </section>
  );
}
