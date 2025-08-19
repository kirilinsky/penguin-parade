import "./globals.css";
import "./rodal.css";
import { Provider as JotaiProvider } from "jotai";
import ClientHeaderWrapper from "@/components/ui/client-header-wrapper/client-header-wrapper.component";
import { PageWrapperStyled } from "@/components/ui/page-wrapper/page-wrapper.component.styled";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ToastContainer } from "react-toastify";
import FooterComponent from "@/components/ui/footer/footer.component";

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
            <ClientHeaderWrapper />
            <PageWrapperStyled>{children}</PageWrapperStyled>
            <FooterComponent />
            <ToastContainer theme="dark" />
          </body>
        </NextIntlClientProvider>
      </html>
    </JotaiProvider>
  );
}
