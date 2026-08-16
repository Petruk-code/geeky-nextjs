import Link from "next/link";
import { FaDownload } from "react-icons/fa";

const Download = ({ href, title, size, type = "primary", align = "left", children }) => {
  const btnClass =
    type === "outline"
      ? "btn btn-outline-primary"
      : type === "dark"
        ? "btn rounded-full border-0 bg-text-dark px-6 py-2 text-white hover:bg-primary dark:bg-darkmode-text-light dark:text-darkmode-body"
        : "btn btn-primary text-white";

  return (
    <div
      className={`my-5 flex items-center justify-between rounded-lg border border-border bg-light p-4 dark:border-darkmode-border dark:bg-darkmode-dark ${
        align === "center" ? "mx-auto max-w-xl" : ""
      }`}
    >
      <div className="flex min-w-0 items-center">
        <span className="mr-3 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <FaDownload className="text-lg" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold text-text-dark dark:text-darkmode-text-light">
            {title || children || "Download File"}
          </p>
          {size && (
            <p className="text-xs text-text-light dark:text-darkmode-text">
              {size}
            </p>
          )}
        </div>
      </div>
      <Link
        href={href}
        download
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={`${btnClass} ml-4 shrink-0 px-4 py-2 text-sm`}
      >
        Download
      </Link>
    </div>
  );
};

export default Download;
