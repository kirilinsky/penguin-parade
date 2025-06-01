import "./globals.css";
import "./rodal.css";
import { Provider as JotaiProvider } from "jotai";
import ClientHeaderWrapper from "@/components/client-header-wrapper/client-header-wrapper.component";
import FooterComponent from "@/components/footer/footer.component";
import { PageWrapperStyled } from "@/components/page-wrapper/page-wrapper.component.styled";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata = {
  title: "Penguin Parade",
  description: "Collect and trade rare penguins",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <JotaiProvider>
      <html suppressHydrationWarning lang={locale}>
        {/* TODO: fix suppressHydrationWarning */}
        <NextIntlClientProvider>
          <body suppressHydrationWarning>
            <PageWrapperStyled>{children}</PageWrapperStyled>
            <FooterComponent />
          </body>
        </NextIntlClientProvider>
      </html>
    </JotaiProvider>
  );
}
