import { NAV_LINKS } from "@constants"
import Image from "next/image"
import Link from "next/link"
import ThemeToggle from "@components/ThemeToggle"

export const Navbar = () => {
  return (
    <nav className="flex flexBetween w-full  relative z-30 py-5 px-5">
      <Link href="/">
        <Image src="/" alt="logo" width={74} height={29} />
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

      <ThemeToggle/>

    </nav>
  );
};

export default Navbar;
