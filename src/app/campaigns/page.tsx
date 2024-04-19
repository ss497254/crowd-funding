import { Card } from "@/components";
import { getCampaigns } from "@/utils/getCampaigns";

const filterCampaigns = async (sort: string) => {
  const { campaigns } = await getCampaigns();
  if (sort === undefined || sort === null) return campaigns;
  else if (sort === "newest") return campaigns.slice(-9).reverse();

  campaigns.sort((a, b) => b.collectedAmount - a.collectedAmount);
  const tops = campaigns.slice(0, 9);
  return tops as any[];
};

const Campaigns = async ({ searchParams }) => {
  const campaigns = await filterCampaigns(searchParams.sort);

  return (
    <div>
      <h1 className="my-4 text-xl font-medium">
        {!searchParams.sort
          ? `All Campaigns (${campaigns?.length ?? 0})`
          : searchParams.sort === "newest"
          ? `Newest Campaigns (${campaigns?.length ?? 0})`
          : `Top Campaigns (${campaigns?.length ?? 0})`}
      </h1>
      {campaigns?.length === 0 ? (
        <div className="flex flex-col justify-center gap-4 mt-10">
          <h1 className="text-4xl font-semibold">No Campaigns Found</h1>
          <p className="text-lg text-neutral-400">
            It looks like there are no campaigns created yet.
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

export default Campaigns;
