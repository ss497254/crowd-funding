"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Navlink = ({ href, icon, setToggleDrawer }) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  return (
    <Link
      onClick={() => setToggleDrawer(false)}
      href={href}
      className={[
        "h-14 w-14 c transition-all text-3xl duration-200 rounded",
        (sort ? path + `?sort=${sort}` === href : path === href)
          ? "text-indigo-600 hover:bg-indigo-600 hover:text-white"
          : "text-primary-8 hover:bg-zinc-300",
      ].join(" ")}
    >
      {icon}
    </Link>
  );
};

export default Navlink;
