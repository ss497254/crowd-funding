"use client";

import { ClientButton, Navlink } from "@/components";
import { useEthersContext } from "@/contexts/EthersContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "/public/Logo.png";

import { BsGrid } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { HiUserCircle } from "react-icons/hi";
import { MdCampaign } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbZoomMoney } from "react-icons/tb";

const navLinks = [
  {
    icon: <BsGrid />,
    href: "/campaigns",
  },
  {
    icon: <MdCampaign className="text-4xl" />,
    href: "/campaigns?sort=newest",
  },
  {
    icon: <RiMoneyDollarCircleLine />,
    href: "/campaigns?sort=most_funded",
  },
  {
    icon: <TbZoomMoney />,
    href: "/search",
  },
  {
    icon: <HiUserCircle />,
    href: "/account",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const { signer, disconnectWallet } = useEthersContext();

  const handleDisconnect = () => {
    disconnectWallet();
    router.push("/");
  };

  return (
    <aside className="fixed inset-y-0 flex flex-col p-1 bg-primary-1 md:border-r border-zinc-300">
      <Link href="/" className="flex items-center justify-center p-2 mb-8">
        <Image src={Logo} alt="fundseed" priority width={40} height={40} />
      </Link>
      <div className="flex flex-col gap-3">
        {navLinks.map((link, idx) =>
          signer || idx < navLinks.length - 1 ? (
            <Navlink key={idx} setToggleDrawer={() => {}} {...link} />
          ) : null
        )}
      </div>
      {signer && (
        <div className="mt-auto">
          <ClientButton
            onClick={handleDisconnect}
            className="flex items-center justify-center p-2 transition-all duration-200 text-primary-8 hover:bg-zinc-300"
          >
            <FiLogOut className="text-4xl" />
          </ClientButton>
        </div>
      )}
    </aside>
  );
}
