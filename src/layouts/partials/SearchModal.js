"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const SearchModal = ({ searchModal, setSearchModal }) => {
  const router = useRouter();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (searchModal) {
      document.getElementById("searchModal").focus();
      document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          router.push(`/search?key=${encodeURIComponent(input)}`);
          setSearchModal(false);
        }
        if (e.key === "Escape") {
          setSearchModal(false);
        }
      });
    }
  });
  return (
    <div className={`search-modal ${searchModal ? "open" : ""}`}>
      <button onClick={() => setSearchModal(false)} className="search-close">
        <IoCloseCircleOutline />
      </button>
      <input
        type="text"
        className="form-input bg-body placeholder:text-base! dark:bg-darkmode-body! border-none!"
        id="searchModal"
        placeholder="Ketik lalu tekan enter..."
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchModal;
