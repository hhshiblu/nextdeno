import { check } from "@/action/user";
import Link from "next/link";
import React from "react";

async function page() {
  const hello = await check();
  console.log(hello);

  return (
    <div>
      <Link href="/admin-dashboard">Go dashboard</Link>
    </div>
  );
}

export default page;
