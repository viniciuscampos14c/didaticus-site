import type { NextConfig } from "next";

/*
 * O site institucional e o portal do responsável.
 *
 * Fica em repositório próprio, separado do sistema, por pedido do cliente em
 * 23/09/2026. A consequência está no README: ele não alcança os pacotes do
 * monorepo, então fala com a API v1 por HTTP e carrega os próprios tipos.
 */
const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

export default config;
