"use client";

import { toast } from "react-toastify";
import React, { useEffect, useRef } from "react";
import { BiSolidErrorCircle } from "react-icons/bi";

import { ClientButton } from "..";

const AlertModal = ({ setIsOpen, campaignId }) => {
  const modalRef = useRef(null);

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

  const handleClick = async (answer) => {
    if (answer === "yes") {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns/${campaignId}`,
        { method: "PUT" }
      );

      if (res.ok) toast.success(res.statusText);
      else toast.error(res.statusText);
    }

    setIsOpen(false);
  };

  return (
    <main className="bg-[rgba(0,0,0,.7)] h-[100vh] flex items-center justify-center w-full fixed z-50 top-0 left-0 p-4">
      <div
        ref={modalRef}
        className="flex flex-col items-center justify-center w-full h-full p-4 rounded-lg bg-neutral-800 sm:flex-row sm:justify-start sm:h-auto md:w-2/3 lg:w-1/2 xl:w-1/3"
      >
        <div className="pr-4">
          <BiSolidErrorCircle className="mb-8 sm:mb-0 text-[148px] md:text-[164px] text-indigo-500" />
        </div>
        <div className="flex flex-col items-center gap-4 sm:block sm:gap-0">
          <h3 className="text-2xl font-semibold">Are you sure?</h3>
          <p className="text-center sm:text-start">
            Are you sure you want to end this campaign?
          </p>
          <div className="flex justify-center gap-4 mt-4 font-semibold md:justify-end">
            <ClientButton
              onClick={() => handleClick("yes")}
              className="px-4 py-2 transition-all duration-200 bg-indigo-500 border-2 border-indigo-500 rounded-lg hover:border-indigo-600 hover:bg-indigo-600"
            >
              Yes, end it.
            </ClientButton>
            <ClientButton
              onClick={() => handleClick("no")}
              className="px-4 py-2 text-indigo-500 transition-all duration-200 border-2 border-indigo-500 rounded-lg hover:border-indigo-600 hover:bg-indigo-600 hover:text-neutral-200"
            >
              No
            </ClientButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AlertModal;
