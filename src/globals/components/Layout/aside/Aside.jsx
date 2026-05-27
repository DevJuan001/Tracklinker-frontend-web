import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export default function Aside({ avatarOnClick, helpOnClick }) {
  const { user, hasRole } = useCurrentUser();

  return (
    <aside
      className="sticky bottom-0 flex order-2 h-[80px] py-1 z-10
      md:static md:h-full md:flex-col md:order-1 md:px-5 md:pt-5
      xl:h-full xl:flex-col xl:row-span-2 xl:px-3 xl:pt-5 xl:order-1
      dark:bg-black"
    >
      <DesktopNav
        user={user}
        hasRole={hasRole}
        avatarOnClick={avatarOnClick}
        helpOnClick={helpOnClick}
      />
      
      <MobileNav
        hasRole={hasRole}
        avatarOnClick={avatarOnClick}
        helpOnClick={helpOnClick}
      />
    </aside>
  );
}
