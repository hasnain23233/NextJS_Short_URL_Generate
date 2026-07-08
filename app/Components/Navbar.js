"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ClerkAuth from "../ClerkAuth/page";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shorten", label: "Generate" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0E0E13]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo styled like a shortened URL path */}
        <Link href="/" className="group flex items-center gap-0.5">
          <span className="font-mono text-xl font-medium text-white">short</span>
          <span className="font-mono text-xl font-medium text-[#FFB100]">/url</span>
          <span className="ml-0.5 h-5 w-[2px] animate-pulse bg-[#FFB100] group-hover:bg-white transition-colors" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#FFB100] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </li>
            );
          })}
        </ul>

        {/* Right side actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="#"
            className="text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            GitHub
          </Link>
          <Link
            href="/shorten"
            className="group flex items-center gap-1 rounded-full bg-[#FFB100] px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            Try now
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <ClerkAuth />
        </div>

        {/* Mobile toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-[#0E0E13] px-4 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block text-base font-medium ${
                    pathname === link.href ? "text-white" : "text-white/60"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="#" className="block text-base font-medium text-white/60">
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href="/shorten"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FFB100] px-4 py-2 text-sm font-semibold text-black"
              >
                Try now <ArrowUpRight size={15} />
              </Link>
            </li>
            <li className="pt-2">
              <ClerkAuth />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;