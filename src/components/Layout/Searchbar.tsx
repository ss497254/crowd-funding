"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length === 0) return;

    router.push(`/search?q=${search}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:max-w-[400px] sm:max-w-[280px] w-full flex items-center font-semibold bg-white"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="w-full px-3 py-2 font-normal bg-white border outline-none placeholder:text-zinc-600 border-zinc-400"
        placeholder="Search for campaign..."
      />
      <button
        onClick={handleSubmit}
        type="submit"
        className="box-content w-12 h-10 text-white transition-all duration-200 bg-indigo-600 border border-indigo-600 c hover:bg-indigo-700"
      >
        <FaSearch className="text-xl" />
      </button>
    </form>
  );
};

export default Searchbar;
