import Link from "next/link";
import React from "react";
export default function Home() {
  return (
    <div className="bg-red-800">
      click <Link href={"documents/123"}>go to id page</Link>
    </div>
  );
}
