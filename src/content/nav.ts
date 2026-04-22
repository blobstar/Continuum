export type NavItem = {
  key: "home" | "services" | "about" | "insights" | "contact";
  href: string;
};

export const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "insights", href: "/insights" },
  { key: "contact", href: "/contact" },
];
