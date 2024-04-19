import { ethers } from "ethers";
import connectBlockchain from "./connectBlockchain";

export async function getCampaigns() {
  const { contract } = connectBlockchain();
  let allCampaigns: any[] = await contract.getCampaigns();

  const campaigns = allCampaigns.map((campaign, i) => ({
    id: i,
    owner: campaign.owner,
    title: campaign.title,
    description: campaign.description,
    imageUrl: campaign.imageUrl,
    target: ethers.formatEther(campaign.target.toString()),
    deadline: Number(campaign.deadline),
    collectedAmount: parseFloat(
      ethers.formatEther(campaign.collectedAmount.toString())
    ),
    withdrawedAmount: ethers.formatEther(campaign.withdrawedAmount.toString()),
    donations: campaign.donations.map((donation) => ({
      donator: donation.donator,
      amount: ethers.formatEther(donation.amount.toString()),
    })),
  }));

  campaigns.sort((a, b) => b.collectedAmount - a.collectedAmount);

  const tops = campaigns.slice(0, 9);
  const donationCount = campaigns.reduce(
    (total, campaign) => total + campaign.donations.length,
    0
  );

  return { campaigns: tops, donationCount, campaignCount: campaigns.length };
}
