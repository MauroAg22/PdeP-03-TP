import { prioridad, estado } from "./types";

const PRIORIDAD: prioridad[] = [
    "+--",
    "++-",
    "+++"
];

const ESTADO: estado[] = [
    "pendiente",
    "en progreso",
    "completada",
    "cancelada"
];

export { PRIORIDAD, ESTADO };