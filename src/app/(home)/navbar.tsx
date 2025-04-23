import React from "react";
import Link from "next/link";
import Image from "next/image";

import SearchInput from "./search-input";

import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className=" flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <div className="hidden md:block">
          <Link href={"/"}>
            <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          </Link>
        </div>
        <h3 className="text-xl pl-5 md:pl-0"> Docs</h3>
      </div>
      <SearchInput />
      <div className="flex items-center gap-3 pl-6">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
}
