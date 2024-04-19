"use client";

import { ethers } from "ethers";
import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { ClientButton, RangeInput } from "..";
import { useEthersContext } from "@/contexts/EthersContext";

const WithdrawModal = ({
  setIsOpen,
  campaignId,
  totalCollected,
  totalWithdrawn,
}) => {
  const modalRef = useRef(null);
  const { contract } = useEthersContext();

  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target))
        setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, setIsOpen]);

  const handleClick = async (type) => {
    setLoading(true);
    if (type === "withdraw") {
      if (amount <= 0) return toast.error("Please enter a valid amount");

      try {
        await contract.withdraw(
          campaignId,
          ethers.parseEther(amount.toString()),
          {
            gasLimit: 1000000,
          }
        );

        toast.success("Withdraw Successful!");
      } catch (error) {
        toast.error("Withdraw Failed!");
      }
    }

    setLoading(false);
    setIsOpen(false);
  };

  return (
    <main className="bg-[rgba(0,0,0,.7)] h-[100vh] flex items-center justify-center w-full fixed z-50 top-0 left-0 p-4">
      <div
        ref={modalRef}
        className="flex flex-col items-center justify-center w-full h-full p-4 rounded-lg bg-neutral-800 sm:block sm:justify-normal sm:p-8 sm:h-auto md:w-2/3 lg:w-1/2 xl:w-1/3"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-col items-center w-full">
            <p className="text-xl">Total Collected</p>
            <p className="text-xl font-semibold text-indigo-500">
              {totalCollected ?? 0} Eth
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="text-xl">Total Withdrawn</p>
            <p className="text-xl font-semibold text-indigo-500">
              {totalWithdrawn ?? 0} Eth
            </p>
          </div>
        </div>
        <div className="flex flex-col py-8">
          <p className="text-start text-neutral-500">
            * You can withdraw only{" "}
            {((totalCollected ?? 0) - (totalWithdrawn ?? 0)).toFixed(2)} Eth. *
          </p>
          <RangeInput
            max={(totalCollected ?? 0) - (totalWithdrawn ?? 0)}
            min={0}
            step={0.0001}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-4 mt-4 font-semibold">
          <ClientButton
            loading={loading}
            onClick={() => handleClick("withdraw")}
            className="px-4 py-2 transition-all duration-200 bg-indigo-500 border-2 border-indigo-500 rounded-lg hover:border-indigo-600 hover:bg-indigo-600"
          >
            Withdraw
          </ClientButton>
          <ClientButton
            loading={loading}
            onClick={() => handleClick("cancel")}
            className="px-4 py-2 text-indigo-500 transition-all duration-200 border-2 border-indigo-500 rounded-lg hover:border-indigo-600 hover:bg-indigo-600 hover:text-neutral-200"
          >
            Cancel
          </ClientButton>
        </div>
      </div>
    </main>
  );
};

export default WithdrawModal;
