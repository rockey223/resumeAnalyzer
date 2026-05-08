import GlobalProvider from "@/utils/GlobalProvider";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Resume Analyzer",
  description: "Upload your resume and get instant feedback on how to improve it. Powered by AI for free.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ✅ ONLY AdSense loader script */}
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9810065319228675"
          crossOrigin="anonymous"
        />

        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}