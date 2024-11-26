import { getSellers, getSellersGrowth } from "@/action/seller";
import AllSellers from "@/components/seller/allSeller";

async function page() {
  const sellers = await getSellers();
  const growthusers = await getSellersGrowth();

  return (
    <div>
      <AllSellers users={sellers} userGrowthData={growthusers} />
    </div>
  );
}

export default page;
