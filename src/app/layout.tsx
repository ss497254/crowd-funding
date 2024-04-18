import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";
import { Layout } from "@/components";
import { EthersProvider } from "@/contexts/EthersContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Charity Platform",
  description:
    "Charity Platform is your one-stop destination for bringing your boldest ideas to life. Our platform is designed to make crowdfunding seamless, engaging, and successful for creators and backers alike. Join the community and start sowing the seeds of innovation today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="/Logo.png"></link>
      <body className={inter.className}>
        <EthersProvider>
          <Layout>{children}</Layout>
        </EthersProvider>
      </body>
    </html>
  );
}
