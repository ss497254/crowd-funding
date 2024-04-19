import { ethers } from "ethers";
import Image from "next/image";
import { Suspense } from "react";

import { Card } from "@/components";
import connectBlockchain from "@/utils/connectBlockchain";
import Logo from "../../public/Logo.png";
import { getCampaigns } from "@/utils/getCampaigns";

const getTotalCollected = async () => {
  const { contract } = connectBlockchain();

  const total = await contract.totalCollected();

  return ethers.formatEther(total.toString());
};

export default async function Home() {
  const totalCollected = await getTotalCollected();
  const { campaigns, campaignCount, donationCount } = await getCampaigns();

  return (
    <div>
      <div className="w-full p-4 mb-8 bg-white border shadow-md md:p-8">
        <div className="flex">
          <div>
            <div className="flex items-end gap-4">
              <Image
                className="hidden md:block"
                src={Logo}
                alt="fundseed"
                width={50}
                height={50}
              />
              <h1 className="text-2xl font-semibold md:text-4xl">
                Welcome to Crowd Funding
              </h1>
            </div>
            <p className="mt-4 mb-8 text-sm md:text-lg">
              Crowd Funding is a decentralized crowdfunding platform built on
              Ethereum. It allows anyone to create a campaign and raise funds.
              What we have achieved so far:
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full p-4 bg-zinc-200">
            <h5 className="mb-2 text-center">All Campaigns</h5>
            <p className="text-2xl font-semibold text-center">
              {campaignCount}
            </p>
          </div>
          <div className="w-full p-4 bg-zinc-200">
            <h5 className="mb-2 text-center">Total Donations</h5>
            <p className="text-2xl font-semibold text-center">
              {donationCount}
            </p>
          </div>
          <div className="w-full p-4 bg-zinc-200">
            <h5 className="mb-2 text-center">Collected Eth</h5>
            <p className="text-2xl font-semibold text-center">
              {totalCollected}
            </p>
          </div>
        </div>
      </div>
      <h1 className="mb-4 text-xl">Most Popular Campaigns</h1>
      {campaigns?.length === 0 ? (
        <div className="flex flex-col justify-center gap-4 mt-10">
          <h1 className="text-4xl font-semibold">No Campaigns Found</h1>
          <p className="text-lg text-neutral-400">
            It looks like there are no campaigns created yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Suspense fallback={<p>Loading...</p>}>
            {campaigns?.map((campaign) => (
              <Card campaign={campaign} key={campaign.id} />
            ))}
          </Suspense>
        </div>
      )}
    </div>
  );
}
