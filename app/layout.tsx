import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Didaticus, aulas particulares em Brasília",
    template: "%s · Didaticus",
  },
  description:
    "Aula particular em casa ou online, em Brasília. Cada aula com relato do " +
    "professor, e a família acompanhando pelo portal.",
  /*
   * O ícone é a versão simplificada da marca, e não o símbolo completo: abaixo
   * de uns 32px a página, a lombada e a capa viram mancha. Ele ainda não existe
   * como arquivo, e por isso a linha está comentada em vez de apontar para o
   * nada. Ver docs/MARCA.md.
   */
};

export default function Raiz({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href={
            "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800" +
            "&family=Instrument+Sans:wght@400;500;600&display=swap"
          }
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
