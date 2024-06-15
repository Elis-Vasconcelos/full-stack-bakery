import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Cabecalho from "../../components/cabecalho/header";
import Rodape from "../../components/rodape/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "La Padarie",
  description: "Uma padaria sensacional",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">

<body className={inter.className}>

  <div className="elementos">
    <header>
      <Cabecalho/>
    </header>

    <div className='container'>{children}</div>

    <footer>
      <Rodape/>
    </footer>

  </div>

</body>
      
    </html>
  );
}
