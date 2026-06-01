import NavbarClient from "./NavbarClient";

import { getNavbarData } from "@/lib/actions/navbar/get-navbar";

export default async function Navbar() {
  const categories =
    await getNavbarData();

  return (
    <NavbarClient
      categories={categories}
    />
  );
}