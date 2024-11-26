import { getUserById } from "@/action/user";
import UserPreviewPage from "@/components/user/details";
import React from "react";

async function page({ params }) {
  const user = await getUserById(params.id);
  return (
    <div>
      <UserPreviewPage user={user} />
    </div>
  );
}

export default page;
