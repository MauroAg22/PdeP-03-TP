"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constantes_1 = require("./constantes");
const class_1 = require("./class");
let tareas = [];
// Punto de entrada imperativo
function main() {
    let tarea1 = new class_1.Tarea("Comprar alimentos", "Comprar frutas y verduras para la semana", constantes_1.PRIORIDAD[1], constantes_1.ESTADO[0], new Date("2024-10-01"));
    let tarea2 = new class_1.Tarea("Preparar presentación", "Crear diapositivas para la reunión del lunes", constantes_1.PRIORIDAD[0], constantes_1.ESTADO[1], new Date("2024-09-30"));
    let tarea3 = new class_1.Tarea("Hacer ejercicio", "Ir al gimnasio por la tarde", constantes_1.PRIORIDAD[2], constantes_1.ESTADO[0], new Date("2024-10-02"));
    tareas[tareas.length] = tarea1;
    tareas[tareas.length] = tarea2;
    tareas[tareas.length] = tarea3;
    console.log('--------------------------------------------------------------------');
    console.log('                         Lista de Tareas');
    console.log('--------------------------------------------------------------------');
    for (let tarea of tareas) {
        console.log(`\nTítulo: ${tarea.getTitulo()}`);
        console.log(`Descripción: ${tarea.getDescripcion()}`);
        console.log(`Prioridad: ${tarea.getPrioridad()}`);
        console.log(`Estado: ${tarea.getEstado()}`);
        console.log(`Fecha de Creación: ${tarea.getFechaCreacion().toLocaleDateString()}`);
        console.log(`Fecha de Vencimiento: ${tarea.getFechaVencimiento().toLocaleDateString()}`);
        console.log('\n--------------------------------------------------------------------');
    }
}
main();
