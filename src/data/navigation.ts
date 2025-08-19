type NavItem = {
  labelKey: string;
  href: string | ((userId: string) => string);
  isLogout?: boolean;
};

export const navItems: NavItem[] = [
  { labelKey: "about", href: "/about" },
  { labelKey: "craft", href: "/countdown" },
  { labelKey: "games", href: "/games" },
  { labelKey: "myPenguins", href: (id) => `/library/${id}` },
  { labelKey: "updates", href: "/updates" },
  { labelKey: "friends", href: "/friends" },

  { labelKey: "auction", href: "/market" },
];
