import Aside from "./aside/Aside";

export default function Layout({ avatarOnClick, helpOnClick, children }) {
  return (
    // Container
    <div
      className="w-screen h-screen flex flex-col
        md:grid md:grid-cols-[110px_1fr] md:grid-rows-1
        xl:grid-cols-[260px_1fr] xl:grid-rows-1
        "
    >
      <Aside avatarOnClick={avatarOnClick} helpOnClick={helpOnClick} />
      <main
        className="w-full h-full pl-1.5 pr-2 py-2 dark:bg-black overflow-y-auto order-1
        md:order-2 md:py-4 md:max-h-full md:overflow-hidden
        xl:order-2 xl:pb-3 xl:max-h-full"
      >
        {children}
      </main>
    </div>
  );
}
