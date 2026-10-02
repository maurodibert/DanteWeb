// =============================================================================
// dante.ts — CONTENIDO DE LA PÁGINA "DANTE" Y LAS OBRAS DESTACADAS DE LA HOME
// =============================================================================

import type { Lang } from "./texts";

export const BIO={es:["Nació en Argentina en 1949 y vive en España desde 1981.",
 "Fundó el Grupo Vocal Gregor, especializado en música antigua española y colonial iberoamericana, con el que dio conciertos y grabó discos en más de treinta países de Europa y América.",
 "Ha dirigido coros en España, Francia, Bélgica, Argentina, Perú, Venezuela, Colombia, México y Cuba. Es profesor invitado de la Camerata Barroca de Caracas, de la Universidad de Guanajuato y de la Universidad de Córdoba (Argentina).",
 "Compone sobre poesía de Cervantes, Lope de Vega, San Juan de la Cruz, García Lorca, Alberti, Machado, Miguel Hernández, Borges, Pedro García Cabrera, etc. Coros de España, Cuba, México, Colombia, Ecuador, Francia y Canadá le encargaron y estrenaron obras."],
 en:["Born in Argentina in 1949, he has lived in Spain since 1981.",
 "He founded the Gregor Vocal Group, specialised in early Spanish and colonial Latin American music, with which he gave concerts and made recordings in more than thirty countries in Europe and the Americas.",
 "He has conducted choirs in Spain, France, Belgium, Argentina, Peru, Venezuela, Colombia, Mexico and Cuba, and is a visiting professor at the Baroque Camerata of Caracas, the University of Guanajuato and the University of Córdoba (Argentina).",
 "He composes on poetry by Cervantes, Lope de Vega, San Juan de la Cruz, García Lorca, Alberti, Machado, Miguel Hernández, Borges, Pedro García Cabrera and others. Choirs in Spain, Cuba, Mexico, Colombia, Ecuador, France and Canada have commissioned and premiered his works."]};
export const TL={es:[["1976","Música colonial · México"],
 ["1981","Compositor y director · España"],
 ["1997","Docente · Canarias"],
 ["2005","Estreno de «Crucifixus»"],
 ["2016","Dos CD: profano y religioso"],
 ["2026","Socio de Honor de AEDCORO"],
 ["2026","Homenaje en Argentina por sus 50 años de trayectoria"]],
 en:[["1976","Colonial music · Mexico"],
 ["1981","Composer and conductor · Spain"],
 ["1997","Teacher · Canary Islands"],
 ["2005","Premiere of «Crucifixus»"],
 ["2016","Two CDs: secular and sacred"],
 ["2026","Honorary Member of AEDCORO"],
 ["2026","Tribute in Argentina for his 50-year career"]]};
export const CHOIRS=[
 ["Camerata Lacunensis","José Herrero","Islas Canarias"],
 ["Le Madrigal de Lille","Michel Pirson","Francia"],
 ["Stellenbosch University Choir","André van der Merwe","Sudáfrica"],
 ["Coral Universitaria de Guayaquil","Fernando Gil Estrada","Ecuador"],
 ["Coro Nacional de Niños de Cuba","Digna Guerra","Cuba"],
 ["Coral Nacional Simón Bolívar","Lourdes Sánchez","Venezuela"],
 ["Coro Nacional de Niños del Perú","Oswaldo Kuan","Perú"],
 ["Vocalia Taldea","Basilio Astulez","Euskadi"],
 ["Damenchor Chursüd","Martina Hug","Alemania"],
 ["Cork Chamber Choir","Tom Crowley","Irlanda"],
 ["Tokyo Ladies Singers","Fuseo Maeda","Japón"],
 ["Estudio Coral Meridies","Virginia Bono","Argentina"],
 ["Choral of Toronto University","Doreen Rao","Canadá"],
 ["Coro Nacional Dominicano","Elioenai Medina","República Dominicana"],
 ["The American Boychoir","Fernando Malvar","EE.UU. de América"],
 ["Coro de Cámara de Córdoba","Juan Manuel Brarda","Argentina"]];
export const PRIZES=[["1988","Cantos de la Tierra","Villa de Rota · Federico García Lorca"],
 ["2001","Dejadme a ras del mar","Gobierno de Canarias · Pedro García Cabrera"],
 ["2003","Cántico Espiritual","Tomás Luis de Victoria, Ávila · San Juan de la Cruz"],
 ["2011","Retablo Extremeño","Amadeus"],
 ["2022","¡Qué descansada vida!","Universidad de Salamanca · Fray Luis de León"]];

// Las cuatro obras de "Cuatro para empezar", con la foto de su primera página.
export const PICKS: { slug: string; sheet: string; prize: Record<Lang, string> | null }[] = [
  { slug: "dejadme-a-ras-del-mar", sheet: "/img/sh-dejadme-a-ras-del-mar-1.jpg", prize: { es: "Premio Canarias 2001", en: "Canarias Prize 2001" } },
  { slug: "amor-de-mis-entranas", sheet: "/img/sh-amor-de-mis-entranas-1.jpg", prize: null },
  { slug: "el-mar-la-mar", sheet: "/img/sh-el-mar-la-mar-1.jpg", prize: null },
  { slug: "retablo-extremeno", sheet: "/img/sh-retablo-extremeno-1.jpg", prize: { es: "Premio Amadeus 2011", en: "Amadeus Prize 2011" } },
];
