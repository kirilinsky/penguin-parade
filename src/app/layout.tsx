import type { Metadata } from "next";
import "./globals.css";
import HeaderComponent from "@/components/header/header.component";
import { Provider as JotaiProvider } from "jotai";

export const metadata = {
  title: "Penguin Parade",
  description: "Collect and trade rare penguins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JotaiProvider>
          <HeaderComponent />
          {children}
        </JotaiProvider>
        {process.env.NEXT_PUBLIC_APP_VERSION ?? "nv"}
      </body>
    </html>
  );
}
