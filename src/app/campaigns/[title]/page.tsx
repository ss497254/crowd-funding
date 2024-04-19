"use client";

import Image from "next/image";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEthereum } from "react-icons/fa";

import getDaysLeft from "@/utils/getDaysLeft";
import Logo from "../../../../public/Logo.png";
import { ClientButton, FormInput } from "@/components";
import { useEthersContext } from "@/contexts/EthersContext";

const CampaignDetails = () => {
  const router = useRouter();
  const { selectedCampaign: campaign, contract } = useEthersContext();
  const [amount, setAmount] = useState(0);
  const [topDonations, setTopDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaign === null) return router.back();

    campaign.donations.sort((a, b) => b.amount - a.amount);
    const tops = campaign.donations.slice(0, 10);
    setTopDonations(tops);
  }, [campaign, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount === 0) return toast.error("Please enter an amount");
    if (getDaysLeft(campaign.deadline) <= 0)
      return toast.error("Campaign has ended");

    setLoading(true);

    try {
      await contract.donate(campaign.id, {
        value: ethers.parseEther(amount.toString()),
        gasLimit: 1000000,
      });

      toast.success("Donation Successful!");
    } catch (error) {
      toast.error("Donation Failed!");
    }

    setAmount(0);
    setLoading(false);
  };

  return (
    <main>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full h-full max-h-[300px] md:max-h-none md:h-[400px] xl:h-[500px]">
          <Image
            className="w-full object-cover h-full max-h-[300px] md:max-h-none"
            src={campaign?.imageUrl}
            alt={campaign?.title}
            width={1400}
            height={800}
          />
        </div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row md:flex-col">
          <div className="bg-white border border-primary-5 min-w-[124px] w-full">
            <p className="p-4 text-2xl text-center">
              {getDaysLeft(campaign?.deadline) > 0
                ? getDaysLeft(campaign?.deadline)
                : "Ended"}
            </p>
            <p className="w-full p-2 text-sm font-medium text-center bg-primary-4 text-zinc-800">
              {getDaysLeft(campaign?.deadline) > 0 ? "Days Left" : "Status"}
            </p>
          </div>
          <div className="bg-white border border-primary-5 min-w-[124px] w-full">
            <p className="p-4 text-2xl text-center">
              {campaign?.collectedAmount ?? 0}
            </p>
            <p className="w-full p-2 text-sm font-medium text-center bg-primary-4 text-zinc-800">
              Raised of {campaign?.target}
            </p>
          </div>
          <div className="bg-white border border-primary-5 min-w-[124px] w-full">
            <p className="p-4 text-2xl text-center">
              {campaign?.donations?.length ?? 0}
            </p>
            <p className="w-full p-2 text-sm font-medium text-center bg-primary-4 text-zinc-800">
              Donations
            </p>
          </div>
        </div>
      </div>
      <div
        className={`grid gap-4 mb-20 ${
          getDaysLeft(campaign?.deadline) > 0
            ? "grid-cols-1 md:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        <div className="col-span-4 md:col-span-3">
          <div className="mt-8">
            <h4 className="mb-2 text-xl font-semibold uppercase">Creator</h4>
            <div className="flex items-center gap-2">
              <Image
                className="p-3 bg-white border rounded-full border-primary-5"
                src={Logo}
                alt={campaign?.owner}
                width={48}
                height={48}
              />
              <p className="font-medium truncate text-zinc-800">
                {campaign?.owner}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <h4 className="mb-2 text-xl font-semibold uppercase">Story</h4>
            <p className="font-medium text-zinc-800">{campaign?.description}</p>
          </div>
          <div className="mt-8">
            <h4 className="mb-2 text-xl font-semibold uppercase">
              Top Donations
            </h4>
            <div className="flex flex-col gap-4">
              {topDonations?.length > 0 ? (
                topDonations.map((donation, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white border border-primary-5"
                  >
                    <p className="flex items-center gap-2 font-medium text-zinc-800">
                      <FaEthereum className="text-2xl text-indigo-500" />{" "}
                      <b>
                        {donation.amount}{" "}
                        <span className="hidden md:inline">Eth</span>
                      </b>{" "}
                      from <span className="truncate">{donation.donator}</span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-medium text-zinc-800">No donations yet.</p>
              )}
            </div>
          </div>
        </div>
        {getDaysLeft(campaign?.deadline) > 0 && (
          <div className="col-span-4 mt-8 space-y-3 md:col-span-1">
            <h4 className="text-xl font-semibold uppercase">Fund</h4>
            <form
              onSubmit={handleSubmit}
              className="p-4 border bg-primary-1 border-primary-5"
            >
              <FormInput
                label={"Amount"}
                placeholder={"ETH 0.1"}
                type={"number"}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="p-2 my-4 text-sm bg-zinc-200">
                <p>Back it because you believe in it.</p>
                <p className="mt-2 text-sm ">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>
              <ClientButton
                type="submit"
                onClick={handleSubmit}
                className="w-full p-2 font-semibold text-white transition-all bg-indigo-500 hover:bg-indigo-600 duration-200F"
                loading={loading}
              >
                Fund Campaign
              </ClientButton>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default CampaignDetails;
