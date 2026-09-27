// Precio por copia autorizada según cuántas copias se lleven de una obra.
// Vive aparte porque el servidor lo va a necesitar para armar la orden de PayPal
// (nunca hay que confiar en un precio que manda el navegador).
export const unitPrice = (copies: number) => (copies >= 20 ? 1 : copies >= 2 ? 2 : 3);

export const eur = (n: number) => "€" + n.toFixed(2).replace(".", ",");
