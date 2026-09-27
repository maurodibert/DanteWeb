// =============================================================================
// dante.ts — CONTENIDO DE LA PÁGINA "DANTE" Y LAS OBRAS DESTACADAS DE LA HOME
// =============================================================================

import type { Lang } from "./texts";

export const BIO={es:["Nació en Argentina en 1949 y vive en España desde 1981.",
 "Fundó el Grupo Vocal Gregor, especializado en música antigua española y colonial iberoamericana, y con él dio conciertos y grabó discos en más de treinta países de Europa y América.",
 "Ha dirigido coros en España, Francia, Argentina, Venezuela, Colombia, México y Cuba. Es profesor invitado de la Camerata Barroca de Caracas, de la Universidad de Guanajuato y de la Universidad de Córdoba.",
 "Compone sobre poesía de García Lorca, Alberti, Machado, San Juan de la Cruz y Pedro García Cabrera. Coros de España, Cuba, México, Colombia, Ecuador, Francia y Canadá le encargaron y estrenaron obra."],
 en:["Born in Argentina in 1949, he has lived in Spain since 1981.",
 "He founded the Gregor Vocal Group, specialised in early Spanish and colonial Latin American music, and toured and recorded with it in more than thirty countries.",
 "He has conducted choirs in Spain, France, Argentina, Venezuela, Colombia, Mexico and Cuba, and is a visiting professor at the Baroque Camerata of Caracas, the University of Guanajuato and the University of Córdoba.",
 "He composes on poetry by García Lorca, Alberti, Machado, San Juan de la Cruz and Pedro García Cabrera. Choirs across Europe and the Americas have commissioned and premiered his work."]};
export const TL={es:[["1949","Nace en Argentina"],["1981","Se instala en España"],
 ["1988","Primer premio de composición, Villa de Rota"],
 ["2001","Premio del Gobierno de Canarias"],
 ["2012","Estreno de la Cantata de Navidad en Colombia"],
 ["2022","Última obra del catálogo"]],
 en:[["1949","Born in Argentina"],["1981","Settles in Spain"],
 ["1988","First composition prize, Villa de Rota"],
 ["2001","Canary Islands Government prize"],
 ["2012","Christmas Cantata premiered in Colombia"],
 ["2022","Latest work in the catalogue"]]};
export const CHOIRS=[
 ["Camerata Lacunensis","Francisco José Herrero","Islas Canarias"],
 ["Vocalia Taldea","Basilio Astulez","Bilbao"],
 ["Leioa Kantika Korala","Basilio Astulez","Leioa"],
 ["Canta Cantemos Coroa","Javier Busto","País Vasco"],
 ["Coro de Cámara de Tenerife","Carmen Cruz","Tenerife"],
 ["Coro Joven de la Confederación Coral Española","Enrique Azurza","España"],
 ["El León de Oro","","Luanco, Asturias"],
 ["Orfeón de Santiago de Cuba","Electo Silva","Cuba"],
 ["Coro Nacional de Niños de Cuba","Digna Guerra","Cuba"],
 ["Coral Universitaria de Guayaquil","","Ecuador"],
 ["Estudio Coral Meridies","","Santa Fe, Argentina"],
 ["Camerata Barroca de Caracas","","Venezuela"],
 ["Le Madrigal de Lille","Michel Pirson","Francia"],
 ["Choral of Toronto University","Doreen Rao","Canadá"]];
export const PRIZES=[["1988","Cantos de la Tierra","Villa de Rota · Federico García Lorca"],
 ["2001","Dejadme a ras del mar","Gobierno de Canarias · Pedro García Cabrera"],
 ["2003","Cántico Espiritual","Tomás Luis de Victoria, Ávila · San Juan de la Cruz"],
 ["2011","Retablo Extremeño","Amadeus"]];


// Las cuatro obras de "Cuatro para empezar", con la foto de su primera página.
export const PICKS: { slug: string; sheet: string; prize: Record<Lang, string> | null }[] = [
  { slug: "dejadme-a-ras-del-mar", sheet: "/img/sh-dejadme-a-ras-del-mar-1.jpg", prize: { es: "Premio Canarias 2001", en: "Canarias Prize 2001" } },
  { slug: "amor-de-mis-entranas", sheet: "/img/sh-amor-de-mis-entranas-1.jpg", prize: null },
  { slug: "el-mar-la-mar", sheet: "/img/sh-el-mar-la-mar-1.jpg", prize: null },
  { slug: "retablo-extremeno", sheet: "/img/sh-retablo-extremeno-1.jpg", prize: { es: "Premio Amadeus 2011", en: "Amadeus Prize 2011" } },
];
