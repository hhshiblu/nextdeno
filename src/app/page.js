import Link from "next/link";
import React from "react";

async function page() {
  return (
    <div>
      <Link href="/admin-dashboard">Go dashboard</Link>
    </div>
  );
}

export default page;
