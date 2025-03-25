import Image from "next/image";
import Link from "next/link";

import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Link href={"/"}>
          <Image src="/logo.svg" alt="Logo" width={36} height={36}></Image>
        </Link>
        <div className="flex flex-col">
          {/* Document Input */}
          {/* MenuBar */}
        </div>
      </div>
    </nav>
  );
}
