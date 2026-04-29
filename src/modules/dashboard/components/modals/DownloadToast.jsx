export default function DownloadToast({ showDownloadToast, onClose }) {
  if (showDownloadToast === true) {
    setTimeout(() => {
      onClose();
    }, 3500);
  }

  return (
    <section
      className="fixed inset-0 z-10 flex items-start justify-center gap-5 pr-5 pb-5 pt-5 animate-toastIn
    dark:text-white pointer-events-none"
    >
      <div
        className="relative border bg-green-200 rounded-full shadow-[0px_0px_20px_-5px_#86efac] py-3 px-4 animate-toastIn
      dark:bg-green-800 dark:border-[#ffffff26] dark:shadow-[0px_0px_20px_-1px_#16a34a]"
      >
        <span className="font-medium text-center text-green-600 dark:text-white">
          Descarga exitosa
        </span>
      </div>
    </section>
  );
}
