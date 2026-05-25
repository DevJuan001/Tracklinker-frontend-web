import Icon from "../../../../../../globals/components/ui/Icon";
import { userStatus } from "../../../../../users/constants/userStatus";
import { useOutputsTableData } from "../../../../hooks/outputs/useOutputsTableData";

export default function OutputsTable() {
  const { outputs } = useOutputsTableData();

  return (
    <table className="w-full h-full pt-2">
      <thead className="h-[30px]">
        <tr className="border-b pb-1 text-sm dark:border-[#94909028]">
          <th className="font-normal text-start pl-4">Seriales</th>
          <th className="hidden md:table-cell font-normal text-start pl-4">Marca</th>
          <th className="hidden md:table-cell font-normal text-start pl-4">Modelo</th>
          <th className="hidden md:table-cell font-normal text-start pl-4">
            Fecha final de garantía
          </th>
          <th className="font-normal text-start pl-4">Fecha de creación</th>
          <th className="font-normal text-start pl-4">Estado</th>
        </tr>
      </thead>

      <tbody>
        {outputs.map((output, index) => (
          <tr
            key={index}
            className="pb-1 text-sm border-b dark:border-[#94909028]"
          >
            <th className="font-normal text-start pl-4">{output.serial}</th>
            <th className="hidden md:table-cell font-normal text-start pl-4">{output.brand}</th>
            <th className="hidden md:table-cell font-normal text-start pl-4">{output.model}</th>
            <th className="hidden md:table-cell font-normal text-start pl-4">
              {output.warranty_time}
            </th>
            <th className="font-normal text-start pl-4">{output.date}</th>
            <th className="font-normal text-start pl-4">
              <div
                className={`w-fit flex items-center px-2 py-1 gap-1 rounded-md ${userStatus[output.status]?.styles}`}
              >
                <Icon
                  name={userStatus[output.status]?.icon}
                  fill={userStatus[output.status]?.fill}
                  size={14}
                />
                <span>{userStatus[output.status]?.text}</span>
              </div>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
