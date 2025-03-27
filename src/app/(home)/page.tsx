import Link from "next/link";
import React from "react";
import Navbar from "./navbar";

export default function page() {
  return (
    <div className=" min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        Click
        <Link href={"/documents/123"}>
          <span className="text-blue-500 underline">Dab manu</span>
        </Link>{" "}
        go to document id
      </div>
    </div>
  );
}
