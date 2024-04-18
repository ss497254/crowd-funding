"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ClientButton } from "@/components";
import { useEthersContext } from "@/contexts/EthersContext";
import Logo from "../../../public/Logo.png";
import Searchbar from "./Searchbar";

const Topbar = () => {
  const router = useRouter();
  const drawerRef = useRef(null);
  const { signer, loading, connectWallet, disconnectWallet } =
    useEthersContext();
  const [toggleDrawer, setToggleDrawer] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target))
        setToggleDrawer(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerRef]);

  return (
    <div className="flex items-center sticky md:relative top-0 w-full py-1.5 justify-between bg-[#13131a] pb-4 md:pb-0 md:bg-transparent flex-col-reverse sm:flex-row mb-5">
      <Link href="/" className="hidden p-2 sm:block md:hidden">
        <Image src={Logo} alt="fundseed" priority width={40} height={40} />
      </Link>

      <Searchbar />

      <div>
        {signer ? (
          <ClientButton
            onClick={() => router.push("/create")}
            loading={loading}
            className="h-10 px-5 font-semibold text-white transition-all duration-200 bg-indigo-600 hover:bg-indigo-700"
          >
            Create Campaign
          </ClientButton>
        ) : (
          <ClientButton
            onClick={connectWallet}
            loading={loading}
            className="h-10 px-5 font-semibold text-white transition-all duration-200 bg-indigo-600 hover:bg-indigo-700"
          >
            Connect
          </ClientButton>
        )}
      </div>
    </div>
  );
};

export default Topbar;
