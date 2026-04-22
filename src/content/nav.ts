export type NavItem = {
  key: "home" | "services" | "about" | "pricing" | "contact";
  href: string;
};

export const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/en-ZA/services" },
  { key: "about", href: "/en-ZA/about" },
  { key: "pricing", href: "/en-ZA/pricing" },
  { key: "contact", href: "/en-ZA/contact" },
];
