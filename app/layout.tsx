import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Didaticus, aulas particulares em Brasília",
    template: "%s · Didaticus",
  },
  description:
    "Aulas particulares feitas sob medida para o ensino fundamental e médio, em casa " +
    "ou online, em Brasília. O professor vai até você.",
};

export default function Raiz({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/*
         * Poppins, a fonte da landing que a escola já publica. Os pesos são os que
         * a home usa de fato: 800 no título em caixa alta, que é a voz da marca,
         * e 400 a 600 no resto.
         */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
