import React from "react";

import { Card } from "@/components";
import { getCampaigns } from "@/utils/getCampaigns";

const findCampaigns = async (query: string) => {
  if (!query) return null;

  const words = query.split(" ");
  const { campaigns } = await getCampaigns();

  const priorityCampaigns = campaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(query.toLowerCase()) ||
      campaign.description.toLowerCase().includes(query.toLowerCase())
  );

  const otherCampaigns = campaigns.filter((campaign) => {
    for (const word of words) {
      if (
        (campaign.title.toLowerCase().includes(word.toLowerCase()) ||
          campaign.description.toLowerCase().includes(word.toLowerCase())) &&
        !priorityCampaigns.includes(campaign)
      )
        return true;
    }
  });

  return [...priorityCampaigns, ...otherCampaigns];
};

const SearchPage = async ({ searchParams }) => {
  const campaigns = await findCampaigns(searchParams.q);

  if (campaigns === null)
    return (
      <div>
        <p className="text-lg font-medium">
          Please search for the campaigns you want in the search box above.
        </p>
      </div>
    );

  return (
    <div>
      <h1 className="mb-4 text-xl"> Campaigns Found ({campaigns.length})</h1>
      {campaigns?.length === 0 ? (
        <div className="flex flex-col justify-center gap-4 mt-10">
          <h1 className="text-4xl font-semibold">No Campaigns Found</h1>
          <p className="text-lg text-neutral-400">
            It looks like there are no campaigns found. Try searching for
            another term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {campaigns?.map((campaign) => (
            <Card campaign={campaign} key={campaign.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
