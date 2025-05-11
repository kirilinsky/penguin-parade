import "./globals.css";
import { Provider as JotaiProvider } from "jotai";
import ClientHeaderWrapper from "@/components/client-header-wrapper/client-header-wrapper.component";
import FooterComponent from "@/components/footer/footer.component";
import { PageWrapperStyled } from "@/components/page-wrapper/page-wrapper.component.styled";

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
    <JotaiProvider>
      <html suppressHydrationWarning lang="en">
        {/* TODO: fix suppressHydrationWarning */}
        <body suppressHydrationWarning>
          <ClientHeaderWrapper />
          <PageWrapperStyled>{children}</PageWrapperStyled>
          <FooterComponent />
        </body>
      </html>
    </JotaiProvider>
  );
}
