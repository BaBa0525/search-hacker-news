import Head from "next/head";
import type { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Cooby Search</title>
        <meta name="description" content="Cooby Search" />
        <link
          rel="icon"
          href="https://uploads-ssl.webflow.com/62396affb4902ba54e57a971/624fe64213c4ef7b277f9858_Website_Cooby_Favicon.png"
        />
      </Head>
      <main className="h-screen">{children}</main>
    </>
  );
};
