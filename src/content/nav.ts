export type NavItem = {
  key: "home" | "services" | "about" | "pricing" | "contact";
  href: string;
};

export const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "pricing", href: "/pricing" },
  { key: "contact", href: "/contact" },
];
