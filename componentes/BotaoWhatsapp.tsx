import { LINK_WHATSAPP } from "@/dados/escola";
import css from "./BotaoWhatsapp.module.css";

/*
 * O botão flutuante de WhatsApp.
 *
 * É o canal de venda da escola: a landing inteira converge para ele, e o
 * primeiro passo de "como contratar" é justamente "entre em contato pelo
 * WhatsApp". Ele fica visível a página toda porque a decisão do pai pode
 * acontecer em qualquer seção, e não só no fim.
 */
export function BotaoWhatsapp() {
  return (
    <a
      className={css.botao}
      href={LINK_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Didaticus pelo WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.84 9.84 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.32-1.95 1.37-.5.05-.97.23-3.27-.68-2.77-1.09-4.51-3.92-4.65-4.1-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.28.25-.27.54-.34.72-.34h.52c.17 0 .39-.06.61.47.24.55.8 1.9.87 2.04.07.14.12.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.7 1.16 1.51 1.88 1.04.93 1.92 1.21 2.19 1.35.27.14.43.12.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.3Z" />
      </svg>
    </a>
  );
}
