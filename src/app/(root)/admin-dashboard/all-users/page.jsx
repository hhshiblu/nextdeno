import { getUsers, getUsersGrowth } from "@/action/user";
import AllUsersPage from "@/components/user/allUser";
import React from "react";

async function page() {
  const users = await getUsers();
  const growthusers = await getUsersGrowth();

  return (
    <div>
      <AllUsersPage users={users} userGrowthData={growthusers} />
    </div>
  );
}

export default page;
