const SoftwareInfo = ({ developer, version, size, os, license, update }) => {
  const rows = [
    { label: "Pengembang", value: developer },
    { label: "Versi", value: version },
    { label: "Ukuran", value: size },
    { label: "Sistem Operasi", value: os },
    { label: "Lisensi", value: license },
    { label: "Update Terakhir", value: update },
  ].filter((r) => r.value);

  return (
    <div className="my-5 overflow-hidden rounded-lg border border-border dark:border-darkmode-border">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`flex items-center justify-between gap-4 px-4 py-2.5 ${
            i % 2 === 0
              ? "bg-light dark:bg-darkmode-dark"
              : "bg-white dark:bg-darkmode-body"
          }`}
        >
          <span className="text-sm font-bold text-text-dark dark:text-darkmode-text-light">
            {r.label}
          </span>
          <span className="text-right text-sm text-text-light dark:text-darkmode-text">
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SoftwareInfo;
