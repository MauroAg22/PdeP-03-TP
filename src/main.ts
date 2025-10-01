import { PRIORIDAD, ESTADO } from "./lib/constantes";
import { Tarea } from "./class/Tarea";
import { ToDoList } from "./class/ToDoList";

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



    let miToDoList = new ToDoList();
    let salirDelMenu: boolean = false;
    miToDoList.agregarTarea(tarea1);
    miToDoList.agregarTarea(tarea2);
    miToDoList.agregarTarea(tarea3);

    console.clear();

    console.log(miToDoList.getTareas());
    console.log("----------------------------------------------------------------");

    do {
        let opcionMenu = 4; // Aquí se debería obtener la opción del usuario, por ahora está fijo

        switch (opcionMenu) {
            case 1:
                // Mostrar tareas
                console.clear();
                break;
            case 2:
                // Agregar tarea
                console.clear();
                break;
            case 3:
                // Modificar tarea
                console.clear();
                break;
            case 4:

                let salirDelCase: boolean = false;
                let idTareaAEliminar: number = 6; // Aquí se debería obtener el ID del usuario, por ahora está fijo

                do {
                    if (miToDoList.comprobarSiSePuedeBorrarTarea(idTareaAEliminar)) {
                        miToDoList.eliminarTarea(idTareaAEliminar);
                        console.log("Tarea eliminada con éxito.");
                        salirDelCase = true;
                    } else {
                        console.log("ID de tarea no válido. Intente nuevamente.");
                    }
                } while (!salirDelCase);
                salirDelMenu = true;
                console.clear();
                break;
            case 5:
                // Listar tareas
                console.clear();
                break;
            case 0:
                // Salir
                salirDelMenu = true;
                console.clear();
                break;
            default:
                // Opción no válida
                console.clear();
                break;
        }

    } while (!salirDelMenu);

    console.log(miToDoList.getTareas());




    // console.log('--------------------------------------------------------------------');
    // console.log('                         Lista de Tareas');
    // console.log('--------------------------------------------------------------------');
    // for (let tarea of tareas) {
    //     console.log(`\nTítulo: ${tarea.getTitulo()}`);
    //     console.log(`Descripción: ${tarea.getDescripcion()}`);
    //     console.log(`Prioridad: ${tarea.getPrioridad()}`);
    //     console.log(`Estado: ${tarea.getEstado()}`);
    //     console.log(`Fecha de Creación: ${tarea.getFechaCreacion().toLocaleDateString()}`);
    //     console.log(`Fecha de Vencimiento: ${tarea.getFechaVencimiento().toLocaleDateString()}`);
    //     console.log('\n--------------------------------------------------------------------');
    // }
}

main();
