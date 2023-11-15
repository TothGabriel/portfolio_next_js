"use client";

import { NAV_LINKS } from "@constants";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@components/ThemeToggle";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex justify-between w-full  relative z-30 py-5 px-5 shadow-md">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">TOTH GABRIEL</p>
      </Link>

      <ul className="hidden h-full gap-12 sm:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="dark:text-white light:text-black"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="flex">
        {session?.user ? (
          <>
            <button type="button" onClick={signOut} className="btn btn-1 me-3">
              Se déconnecter
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full me-3"
                alt="profile"
              />
            </Link>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="btn btn-1 me-3"
                >
                  Se connecter
                </button>
              ))}
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
