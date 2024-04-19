"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Card } from "@/components";
import Logo from "/public/Logo.png";
import { useEthersContext } from "@/contexts/EthersContext";

export default function Account() {
  const { signer } = useEthersContext();
  const [campaigns, setCampaigns] = useState(null);
  const [totalCollected, setTotalCollected] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await fetch(`/api/campaigns?owner=${signer?.address}`);
      const data = await res.json();
      var campaigns = data.campaigns;

      if (!campaigns) campaigns = [];

      const totalCollected = campaigns.reduce(
        (acc, campaign) => acc + Number(campaign.collectedAmount),
        0
      );
      const totalWithdrawn = campaigns.reduce(
        (acc, campaign) => acc + Number(campaign.withdrawedAmount),
        0
      );

      setCampaigns(campaigns);
      setTotalCollected(totalCollected);
      setTotalWithdrawn(totalWithdrawn);
    };

    signer?.address && fetchCampaigns();
  }, [signer?.address]);

  if (!signer?.address || campaigns === null)
    return (
      <div className="w-full h-[90%] flex justify-center items-center z-10">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <Image src={Logo} alt="fundseed" width={112} height={112} />
          <p className="mt-2 text-2xl font-bold text-center text-indigo-500">
            Loading..
          </p>
        </div>
      </div>
    );

  return (
    <main>
      <div className="w-full p-4 bg-white border shadow">
        <h1 className="text-2xl font-semibold">Account</h1>
        <div className="flex flex-col my-4">
          <span className="font-medium text-zinc-900">Address:</span>
          <span className="truncate text-zinc-700">{signer?.address}</span>
        </div>
        <div className="grid items-center justify-between grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-900">
              Number of Campaigns:
            </span>
            <span className="text-zinc-700">{campaigns?.length ?? 0}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-900">Total Collected:</span>
            <span className="text-zinc-700">{totalCollected}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-900">Total Withdrawn:</span>
            <span className="text-zinc-700">{totalWithdrawn}</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {campaigns?.length === 0 ? (
          <div className="flex flex-col justify-center gap-4 mt-10">
            <h1 className="text-xl">No Campaigns Found</h1>
            <p className="text-lg font-medium text-zinc-900">
              Newly created campaigns may not appear immediately.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 mb-4">
              <h1 className="text-xl">
                Your Campaigns ({campaigns?.length ?? 0})
              </h1>
              <p className="text-lg font-medium text-zinc-900">
                Newly created campaigns may not appear immediately.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {campaigns?.map((campaign) => (
                <Card
                  campaign={campaign}
                  key={campaign.id}
                  user={signer?.address}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
