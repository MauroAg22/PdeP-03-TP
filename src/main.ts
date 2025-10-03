import { PRIORIDAD, ESTADO } from "./lib/constantes";
import { Tarea } from "./class/Tarea";
import { ToDoList } from "./class/ToDoList";
import { fechaToString } from "./lib/funciones";


let tareas: Tarea[] = [];

function menuPrincipal(): void {
    console.log('-------- Menú de Opciones --------\n');
    console.log('[1] Mostrar tareas');
    console.log('[2] Agregar tarea');
    console.log('[3] Modificar tarea');
    console.log('[4] Eliminar tarea');
    console.log('[5] Listar tareas\n');
    console.log('[0] Salir\n');
    console.log('----------------------------------\n');
    console.log('Ingrese una opción.\n');
}

function tareasAVer(): void {
    console.log("---- ¿Qué tareas deseas ver? -----\n");
    console.log("[1] Todas");
    console.log("[2] Pendientes");
    console.log("[3] En progreso");
    console.log("[4] Completadas");
    console.log("[5] Canceladas\n");
    console.log("[0] Volver al menú principal");
    console.log('----------------------------------\n');
    console.log('Ingrese una opción.\n');
}

function menuModificar(): void {
    console.log("------- ¿Qué desea modificar? ------\n");
    console.log("[1] Título");
    console.log("[2] Descripción");
    console.log("[3] Prioridad");
    console.log("[4] Estado");
    console.log("[5] Fecha de vencimiento\n");
    console.log("[0] Volver al menú principal");
    console.log('----------------------------------\n');
    console.log('Ingrese una opción.\n');
}

// Punto de entrada imperativo
function main(): void {

    let tarea1 = new Tarea(
        "Comprar alimentos",
        "Comprar frutas y verduras para la semana",
        PRIORIDAD[1],
        ESTADO[0],
        new Date(fechaToString("2025", "11", "15") + "T03:00:00Z") // UTC-3
    );

    let tarea2 = new Tarea(
        "Preparar presentación",
        "Crear diapositivas para la reunión del lunes",
        PRIORIDAD[0],
        ESTADO[1],
        new Date(fechaToString("2024", "10", "30") + "T03:00:00Z") // UTC-3
    );

    let tarea3 = new Tarea(
        "Hacer ejercicio",
        "Ir al gimnasio por la tarde",
        PRIORIDAD[2],
        ESTADO[2],
        new Date(fechaToString("2024", "06", "20") + "T03:00:00Z") // UTC-3
    );

    let tarea4 = new Tarea(
        "Leer un libro",
        "Terminar de leer 'El Principito'",
        PRIORIDAD[3],
        ESTADO[1],
        new Date(fechaToString("2026", "01", "05") + "T03:00:00Z") // UTC-3
    );



    let miToDoList = new ToDoList();
    let salirDelMenu: boolean = false;

    miToDoList.agregarTarea(tarea1);
    miToDoList.agregarTarea(tarea2);
    miToDoList.agregarTarea(tarea3);
    miToDoList.agregarTarea(tarea4);

    console.clear();

    let opcionMenu: number;

    do {
        console.clear();
        menuPrincipal();
        opcionMenu = 1; // Aquí se debería obtener la opción del usuario, por ahora está fijo

        console.log(`> ${opcionMenu}`); // Simula la entrada del usuario, se debe quitar cuando se implemente la entrada real

        switch (opcionMenu) {
            case 1:
                // Mostrar tareas
                let opcionTareasAVer: number;
                let arregloTareasFiltradas: Tarea[] = [];

                let variableDePrueba: number = 0;

                do {
                    tareasAVer();
                    opcionTareasAVer = 1; // Aquí se debería obtener la opción del usuario, por ahora está fijo.

                    if (opcionTareasAVer >= 1 && opcionTareasAVer <= 5) {
                        console.clear();
                        arregloTareasFiltradas = miToDoList.arrayFiltrarPorEstado(opcionTareasAVer);

                        let idTareaAVer: number;
                        let idDisponibleParaBorrar: number[] = [];

                        do {
                            console.log('---------- Tus tareas pendientes son las siguientes ----------------\n');
                            for (let tarea of arregloTareasFiltradas) {
                                console.log(`[${tarea.getId()}] - ${tarea.getTitulo()}`);
                                idDisponibleParaBorrar[idDisponibleParaBorrar.length] = tarea.getId();
                            }
                            console.log('\n--------------------------------------------------------------------\n');

                            console.log(idDisponibleParaBorrar);

                            console.log('Ingrese el ID de la tarea que desea ver en detalle.\n\n> ');
                            idTareaAVer = 2; // Aquí se debería obtener el ID del usuario, por ahora está fijo

                            let sePuedeVerLaTarea: boolean = false;

                            for (let id of idDisponibleParaBorrar) {
                                if (id === idTareaAVer) {
                                    sePuedeVerLaTarea = true;
                                }
                            }

                            if (sePuedeVerLaTarea) {
                                console.clear();
                                miToDoList.mostrarDetallesDeTarea(idTareaAVer);
                            } else {
                                console.clear();
                                console.log("ID de tarea no válido. Intente nuevamente.");
                            }


                        } while (false);



                    } else if (opcionTareasAVer === 0) {
                        console.clear();
                        break;
                    }

                    variableDePrueba++;
                } while (opcionTareasAVer < 1 || opcionTareasAVer > 5 || variableDePrueba === 5);


                salirDelMenu = true;
                // console.clear();
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
                        salirDelCase = true; // Se debe quitar cuando se implemente la entrada del usuario
                    }
                } while (!salirDelCase);
                salirDelMenu = true; // Se debe quitar cuando se implemente la entrada del usuario y el menú vuelva a mostrarse
                // console.clear();
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

}

main();
