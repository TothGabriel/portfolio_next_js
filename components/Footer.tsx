import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-10 mb-5 flex justify-center">
      <div className="flex w-full flex-col gap-8 container">
        <div className="flex flex-col items-start justify-center md:flex-row px-4">
          <div className="h-full flex-1 flex items-center justify-center">
            <Link href="/" className="flex justify-center items-center">
              <Image src="hilink-logo.svg" alt="logo" width={74} height={29} />
            </Link>
          </div>

          {FOOTER_LINKS.map((columns) => (
            <FooterColumn title={columns.title}>
              <ul className="regular-14 flex flex-col gap-4 text-gray-30">
                {columns.links.map((link) => (
                  <Link href="/" key={link}>
                    {link}
                  </Link>
                ))}
              </ul>
            </FooterColumn>
          ))}

          <FooterColumn title={FOOTER_CONTACT_INFO.title}>
            {FOOTER_CONTACT_INFO.links.map((link) => (
              <Link
                href="/"
                key={link.label}
                className="flex gap-4 md:flex-col lg:flex-row"
              >
                <p className="whitespace-nowrap">{link.label}:</p>
                <p className="medium-14 whitespace-nowrap text-blue-70">
                  {link.value}
                </p>
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title={SOCIALS.title}>
            <ul className="regular-14 flex gap-4 text-gray-30">
              {SOCIALS.links.map((link) => (
                <Link href="/" key={link}>
                  <Image src={link} alt="logo" width={24} height={24} />
                </Link>
              ))}
            </ul>
          </FooterColumn>
        </div>

        <div className="border bg-gray-20" />
        <p className="regular-14 w-full text-center text-gray-30">
          2023 TOTH GABRIEL | All rights reserved
        </p>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex-1">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
