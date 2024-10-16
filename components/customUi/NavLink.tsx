"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  activeClassName?: string;
  nonActiveClassName?: string;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  activeClassName,
  nonActiveClassName,
  className = "",
  ...rest
}) => {
  const pathname = usePathname();
  const isActive =
    pathname.endsWith(href) || (href.includes(pathname) && pathname !== "/");
  const newClassName = `${
    isActive ? activeClassName ?? "" : nonActiveClassName ?? ""
  } ${className}`;

  return (
    <Link href={href} className={newClassName} {...rest}>
      {children}
    </Link>
  );
};

export default NavLink;
