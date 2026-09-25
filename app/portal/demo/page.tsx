import { notFound } from "next/navigation";
import Painel from "../painel/page";

export const metadata = { title: "Demonstração do portal", robots: { index: false, follow: false } };

export default function Demonstracao() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <Painel demo />;
}
