"use client";

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import SvgLogo from "../UI/SvgLogo";

export default function Navbar() {
  return(
    <nav className="flex relative  top-0 z-50 flex-row items-center justify-between w-full bg-black py-2 px-4 md:px-8">
      {/* Logo */}
      <Link href="/">
        <SvgLogo className="h-16  md:h-24 transition-all duration-300" />
      </Link>

      {/* Right side with cart */}
      <div className="flex items-center gap-4">
        {/* Cart button */}
        <Link href="/cart" className="p-1.5 sm:p-2 bg-white rounded-full hover:bg-blue-100 transition-colors">
          <ShoppingCart  className="text-black " size={28}  />
        </Link>
      </div>
    </nav>
  );
}