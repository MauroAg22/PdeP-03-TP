import { PRIORIDAD, ESTADO } from "./lib/constantes";
import { Tarea } from "./class/Tarea";

let tareas: Tarea[] = [];

// Punto de entrada imperativo
function main(): void {

    let tarea1 = new Tarea(
        "Comprar alimentos",
        "Comprar frutas y verduras para la semana",
        PRIORIDAD[1],
        ESTADO[0],
        new Date("2024-10-01")
    );

    let tarea2 = new Tarea(
        "Preparar presentación",
        "Crear diapositivas para la reunión del lunes",
        PRIORIDAD[0],
        ESTADO[1],
        new Date("2024-09-30")
    );

    let tarea3 = new Tarea(
        "Hacer ejercicio",
        "Ir al gimnasio por la tarde",
        PRIORIDAD[2],
        ESTADO[0],
        new Date("2024-10-02")
    );

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
