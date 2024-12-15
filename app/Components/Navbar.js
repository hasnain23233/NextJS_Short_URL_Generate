import Link from "next/link";
import React from "react";
import ClerkAuth from "../ClerkAuth/page";

const Navbar = () => {
  return (
    <div>
      <nav className="items-center h-16 bg-purple-500 text-white flex justify-between px-4">
        <div className="font-bold text-3xl">ShorturlCreater</div>
        <ul className="flex items-center gap-7">
          <Link href={"/"}>
            <li>Home</li>
          </Link>
          <Link href={"/shorten"}>
            <li>Generate</li>
          </Link>
          <li className="flex items-center gap-7">
            <Link className="bg-purple-200 p-3 rounded-md text-black" href={'/shorten'}>Try Now</Link>
            <Link className="bg-purple-200 p-3 rounded-md text-black" href={'#'}>GitHub</Link>
            <ClerkAuth/>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
