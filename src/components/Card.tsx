"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Logo from "../../public/Logo.png";
import getDaysLeft from "@/utils/getDaysLeft";
import { useEthersContext } from "@/contexts/EthersContext";
import { AlertModal, ClientButton, WithdrawModal } from ".";

const Card = ({ campaign, user = undefined }) => {
  const router = useRouter();
  const { setSelectedCampaign } = useEthersContext();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleClickCard = () => {
    if (isAlertOpen || isWithdrawOpen) return;

    setSelectedCampaign(campaign);
    const title = campaign.title.replace(/\s/g, "-").toLowerCase();
    return router.push(`/campaigns/${title}`);
  };

  const handleClickButton = (e, type) => {
    e.stopPropagation();

    if (type === "withdraw") setIsWithdrawOpen(true);
    else setIsAlertOpen(true);
  };

  return (
    <div
      onClick={handleClickCard}
      className="w-full bg-white border shadow cursor-pointer"
    >
      <Image
        className="w-full h-[210px] md:h-[200px] xl:h-[264px]"
        loading="lazy"
        src={campaign.imageUrl}
        alt={campaign.title}
        width={500}
        height={250}
      />
      <div className="p-2 sm:p-4">
        <h5 className="py-1 text-xl truncate">{campaign.title}</h5>
        <p className="pb-4 truncate text-zinc-700">{campaign.description}</p>
        <div className="flex justify-between gap-4 pb-4">
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-zinc-800">
              {campaign.collectedAmount}
            </span>
            <span className="truncate text-zinc-700">
              Raised of {campaign.target}
            </span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-zinc-800">
              {getDaysLeft(campaign.deadline) > 0
                ? getDaysLeft(campaign.deadline)
                : "Ended"}
            </span>
            <span className="text-zinc-700">
              {getDaysLeft(campaign.deadline) > 0 ? "Days Left" : "Campaign"}
            </span>
          </div>
        </div>
        {user === campaign.owner && getDaysLeft(campaign.deadline) > 0 ? (
          <div className="flex gap-3 mt-2 font-semibold sm:mt-4">
            <ClientButton
              onClick={(e) => handleClickButton(e, "withdraw")}
              className="w-full p-2 transition-all duration-200 bg-indigo-500 border-2 border-indigo-500 hover:bg-indigo-600 hover:border-indigo-600"
            >
              Withdraw
            </ClientButton>
            <ClientButton
              onClick={(e) => handleClickButton(e, "end")}
              className="w-full p-2 text-indigo-500 transition-all duration-200 bg-transparent border-2 border-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 hover:text-zinc-200"
            >
              End
            </ClientButton>
          </div>
        ) : (
          <div className="flex items-center">
            <Image
              className="p-2 mr-2 border rounded-full bg-zinc-100"
              src={Logo}
              alt="logo"
              width={36}
              height={36}
            />
            <p className="text-sm truncate">
              <span className="mr-1 text-zinc-700">by</span> {campaign.owner}
            </p>
          </div>
        )}
        {isAlertOpen && (
          <AlertModal setIsOpen={setIsAlertOpen} campaignId={campaign.id} />
        )}
        {isWithdrawOpen && (
          <WithdrawModal
            setIsOpen={setIsWithdrawOpen}
            campaignId={campaign.id}
            totalCollected={campaign.collectedAmount}
            totalWithdrawn={campaign.withdrawedAmount}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
