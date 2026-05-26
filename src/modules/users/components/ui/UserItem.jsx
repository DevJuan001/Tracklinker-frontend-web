import { userStatus } from "../../constants/userStatus";
import Icon from "../../../../globals/components/ui/Icon";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function UserItem({
  user,
  openModal,
  itemOnClick,
  editButtonOnClick,
}) {
  return (
    <li
      key={user.id}
      onClick={itemOnClick}
      className="flex items-center justify-between p-5 bg-[#F5F3F6] rounded-lg transition duration-300 cursor-pointer
      hover:bg-[#9692923b]
      dark:bg-[#0f0f11] dark:hover:bg-[#212125]"
    >
      {/* Datos del Usuario */}
      <article>
        <address className="flex items-center gap-3 not-italic font-medium dark:text-white">
          <span className="text-base sm:text-xl md:text-xl lg:text-xl xl:text-xl">
            {user.name} {user.first_surname} {user.second_surname}
          </span>

          <div className="hidden sm:flex md:flex lg:flex xl:flex items-center">
            <Icon name={"phone"} size={22} />

            <span>{user.phone}</span>
          </div>

          <div className="hidden sm:flex md:flex lg:flex xl:flex items-center">
            <Icon name={"person"} size={22} />

            <span>{user.role_name}</span>
          </div>

          <div
            className={`flex items-center px-2 py-1 gap-1 rounded-full border text-xs ${userStatus[user.status]?.styles}`}
          >
            <Icon
              name={userStatus[user.status]?.icon}
              fill={userStatus[user.status]?.fill}
              size={14}
            />

            <span>{userStatus[user.status]?.text}</span>
          </div>
        </address>
      </article>

      <ActionButtons
        editButtonId={`edit-user-${user.id}-button`}
        deleteButtonId={`${userStatus[user.status]?.modalType}-user-${user.id}-button`}
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={(e) => {
          e.stopPropagation();
          openModal(
            user,
            userStatus[user.status]?.modalType,
            null,
            e.currentTarget,
          );
        }}
        visibilityIcon={userStatus[user.status]?.visibilityIcon}
        moreInfoButtonOnClick={itemOnClick}
      />
    </li>
  );
}
