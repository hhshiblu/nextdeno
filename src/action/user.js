"use server";

import TrustData from "@/components/database/collection";
const db = new TrustData();
export const check = async () => {
  const name = { name: "SSH", target: "Imo" };
  await db.updateUser(name);
  const hellos = db.getAuthUsername();

  return hellos;
};
