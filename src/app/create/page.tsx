"use client";

import { ethers } from "ethers";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEthereum } from "react-icons/fa";

import { ClientButton, FormInput } from "@/components";
import { useEthersContext } from "@/contexts/EthersContext";
import { toast } from "react-toastify";

const Create = () => {
  const router = useRouter();
  const { signer, contract, connectWallet } = useEthersContext();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    imageUrl: "",
    target: "",
    deadline: "",
  });

  const handleFormInputChange = (field, event) => {
    setFormValues({ ...formValues, [field]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formValues.title ||
      !formValues.description ||
      !formValues.imageUrl ||
      !formValues.target ||
      !formValues.deadline
    )
      return toast.error("Please fill all the fields");

    if (!signer) return connectWallet();

    try {
      setLoading(true);

      const { title, description, imageUrl } = formValues;
      const target = ethers.parseUnits(formValues.target, 18).toString();
      const deadline = new Date(formValues.deadline).getTime();

      await contract.createCampaign(
        title,
        description,
        imageUrl,
        target,
        deadline,
        { gasLimit: 1000000 }
      );

      toast.success("Campaign created successfully.");
      handleReset();

      setTimeout(() => {
        return router.push("/account");
      }, 2000);
    } catch (error) {
      toast.error("Campaign couldn't be created.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormValues({
      title: "",
      description: "",
      imageUrl: "",
      target: "",
      deadline: "",
    });
  };

  return (
    <main className="w-full bg-white border border-zinc-300 shadow min-h-[calc(100vh-96px)]">
      <div className="flex items-center justify-center p-4 m-auto w-content">
        <h1 className="px-8 py-4 mx-auto text-xl font-semibold text-center bg-zinc-200 w-content">
          Start a Campaign
        </h1>
      </div>
      <form
        className="p-4 flex flex-col gap-4 min-h-[calc(100vh-192px)]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <FormInput
            label={"Campaign Title"}
            placeholder={"Write a title..."}
            type={"text"}
            value={formValues.title}
            onChange={(e) => handleFormInputChange("title", e)}
          />
          <FormInput
            label={"Image URL"}
            placeholder={"Paste campaign image URL here..."}
            type={"text"}
            value={formValues.imageUrl}
            onChange={(e) => handleFormInputChange("imageUrl", e)}
          />
        </div>
        <FormInput
          label={"Story"}
          placeholder={"Write why you need this money..."}
          type={"textarea"}
          value={formValues.description}
          onChange={(e) => handleFormInputChange("description", e)}
        />
        <div className="flex items-center justify-around gap-4 p-4 text-indigo-300 bg-indigo-500 md:p-8">
          <FaEthereum className="text-5xl" />
          <span className="text-lg font-semibold sm:text-xl md:text-2xl">
            You will get 99% of the raised amount
          </span>
          <FaEthereum className="text-5xl" />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <FormInput
            label={"Goal (ETH)"}
            placeholder={"Write your goal amount..."}
            type={"number"}
            value={formValues.target}
            onChange={(e) => handleFormInputChange("target", e)}
          />
          <FormInput
            label={"Deadline"}
            placeholder={"Pick a deadline..."}
            type={"date"}
            value={formValues.deadline}
            onChange={(e) => handleFormInputChange("deadline", e)}
          />
        </div>
        <div className="flex justify-end gap-4 mt-auto">
          <ClientButton
            className="w-32 p-3 font-semibold text-indigo-500 transition-all duration-200 bg-transparent border-2 border-indigo-500 hover:text-white hover:border-indigo-600 hover:bg-indigo-600"
            onClick={handleReset}
          >
            Reset
          </ClientButton>
          <ClientButton
            loading={loading}
            className="w-32 p-3 font-semibold text-white transition-all duration-200 bg-indigo-500 border-2 border-indigo-500 hover:border-indigo-600 hover:bg-indigo-600"
            onClick={handleSubmit}
            type="submit"
          >
            Create
          </ClientButton>
        </div>
      </form>
    </main>
  );
};

export default Create;
