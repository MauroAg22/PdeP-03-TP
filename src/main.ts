import { PRIORIDAD, ESTADO } from "./lib/constantes";
import { Tarea } from "./class/Tarea";
import { ToDoList } from "./class/ToDoList";
import { fechaToString } from "./lib/funciones";
import { input, close } from "./lib/input";


// Menús de opciones
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
async function main(): Promise<void> {

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
        PRIORIDAD[2],
        ESTADO[3],
        new Date(fechaToString("2026", "01", "05") + "T03:00:00Z") // UTC-3
    );



    let miToDoList = new ToDoList();
    let salirDelMenu: boolean = false;

    miToDoList.agregarTarea(tarea1);
    miToDoList.agregarTarea(tarea2);
    miToDoList.agregarTarea(tarea3);
    miToDoList.agregarTarea(tarea4);

    let opcionMenu: number;

    do {
        console.clear();
        menuPrincipal();

        opcionMenu = parseInt(await input('> '), 10);

        switch (opcionMenu) {
            case 1:
                // Mostrar tareas
                console.clear();
                let opcionTareasAVer: number;
                let arregloTareasFiltradas: Tarea[] = [];
                let idTareaAVer: number;
                let idVerMasDetalles: number[] = [];
                let sePuedeVerLaTarea: boolean;
                let opcionQuiereEditar: number;
                let quiereEditar: boolean;
                let opcionCampoAEditar: number;
                let cancelarEdicion: boolean = false;

                // Variables para edición de tarea
                let nuevoTitulo: string;
                let nuevaDescripcion: string;
                let nuevaPrioridad: number;
                let nuevoEstado: number;
                let nuevoAnio: string;
                let nuevoMes: string;
                let nuevoDia: string;

                if (miToDoList.getTareas().length === 0) {
                    console.log("No hay tareas cargadas.\n");
                    await input('Presione Enter para continuar...');
                    console.clear();
                    break;
                }

                do {
                    tareasAVer();
                    opcionTareasAVer = parseInt(await input('> '), 10);
                    if (opcionTareasAVer >= 0 && opcionTareasAVer <= 5) {
                        console.clear();
                        if (opcionTareasAVer !== 0) {
                            arregloTareasFiltradas = miToDoList.arrayFiltrarPorEstado(opcionTareasAVer - 2);
                        }
                        do {
                            if (opcionTareasAVer - 1 === 0) {
                                console.log('--------------- Tus tareas son las siguientes ----------------------\n');
                                for (let tarea of miToDoList.getTareas()) {
                                    console.log(`[${tarea.getId()}] - ${tarea.getTitulo()}`);
                                    idVerMasDetalles[idVerMasDetalles.length] = tarea.getId();
                                }
                                console.log('\n--------------------------------------------------------------------\n');
                            } else {

                                if (arregloTareasFiltradas.length === 0) {
                                    console.log("No hay tareas con ese estado.\n");
                                    await input('Presione Enter para continuar...');
                                    console.clear();
                                    break;
                                }

                                console.log('---------- Tus tareas pendientes son las siguientes ----------------\n');
                                for (let tarea of arregloTareasFiltradas) {
                                    console.log(`[${tarea.getId()}] - ${tarea.getTitulo()}`);
                                    idVerMasDetalles[idVerMasDetalles.length] = tarea.getId();
                                }
                                console.log('\n--------------------------------------------------------------------\n');
                            }
                            console.log('Ingrese el ID de la tarea que desea ver en detalle.\n\n');
                            idTareaAVer = parseInt(await input('> '), 10);
                            sePuedeVerLaTarea = false;
                            for (let id of idVerMasDetalles) {
                                if (id === idTareaAVer) {
                                    sePuedeVerLaTarea = true;
                                }
                            }
                            if (sePuedeVerLaTarea) {
                                console.clear();
                                miToDoList.mostrarDetallesDeTarea(idTareaAVer);

                                console.log("¿Desea editar esta tarea?\n");
                                console.log("[1] Sí");
                                console.log("[2] No\n");

                                opcionQuiereEditar = parseInt(await input('> '), 10);
                                quiereEditar = false;

                                if (opcionQuiereEditar === 1) {
                                    quiereEditar = true;
                                }

                                if (quiereEditar) {

                                    do {

                                        console.clear();
                                        console.log(`Estás editando la tarea: ${miToDoList.getUnaTarea(idTareaAVer).getTitulo()}\n`);
                                        console.log(`[1] Título: ${miToDoList.getUnaTarea(idTareaAVer).getTitulo()}`);
                                        console.log(`[2] Descripción: ${miToDoList.getUnaTarea(idTareaAVer).getDescripcion()}`);
                                        console.log(`[3] Prioridad: ${miToDoList.getUnaTarea(idTareaAVer).getPrioridad()}`);
                                        console.log(`[4] Estado: ${miToDoList.getUnaTarea(idTareaAVer).getEstado()}`);
                                        console.log(`[5] Fecha de vencimiento: ${miToDoList.getUnaTarea(idTareaAVer).getFechaVencimiento().toLocaleDateString()}\n`);

                                        console.log("[0] Volver al menú principal\n");

                                        console.log("Ingrese el número del campo que desea editar.\n");
                                        opcionCampoAEditar = parseInt(await input('> '), 10);

                                        switch (opcionCampoAEditar) {
                                            case 1:
                                                // Editar título
                                                nuevoTitulo = await input('Ingrese el nuevo título: ');
                                                miToDoList.getUnaTarea(idTareaAVer).setTitulo(nuevoTitulo);
                                                console.log("\nTítulo editado con éxito.\n");
                                                await input('Presione Enter para continuar...');
                                                break;
                                            case 2:
                                                // Editar descripción
                                                nuevaDescripcion = await input('Ingrese la nueva descripción: ');
                                                miToDoList.getUnaTarea(idTareaAVer).setDescripcion(nuevaDescripcion);
                                                console.log("\nDescripción editada con éxito.\n");
                                                await input('Presione Enter para continuar...');
                                                break;
                                            case 3:
                                                // Editar prioridad
                                                do {
                                                    console.clear();
                                                    console.log("\nSeleccione la nueva prioridad:\n");
                                                    console.log(`[1] - ${PRIORIDAD[0]}`);
                                                    console.log(`[2] - ${PRIORIDAD[1]}`);
                                                    console.log(`[3] - ${PRIORIDAD[2]}\n`);
                                                    nuevaPrioridad = parseInt(await input('> '), 10);

                                                    if (nuevaPrioridad >= 1 && nuevaPrioridad <= 3) {
                                                        miToDoList.getUnaTarea(idTareaAVer).setPrioridad(PRIORIDAD[nuevaPrioridad - 1]);
                                                        console.log("\nPrioridad editada con éxito.\n");
                                                        await input('Presione Enter para continuar...');
                                                    } else {
                                                        console.log("\nPrioridad no válida. Por favor, seleccione una prioridad válida.\n");
                                                        await input('Presione Enter para continuar...');
                                                    }
                                                } while (nuevaPrioridad < 1 || nuevaPrioridad > 3);
                                                break;
                                            case 4:
                                                // Editar estado
                                                do {
                                                    console.clear();
                                                    console.log("\nSeleccione el nuevo estado:\n");
                                                    console.log(`[1] - ${ESTADO[0]}`);
                                                    console.log(`[2] - ${ESTADO[1]}`);
                                                    console.log(`[3] - ${ESTADO[2]}`);
                                                    console.log(`[4] - ${ESTADO[3]}\n`);
                                                    nuevoEstado = parseInt(await input('> '), 10);
                                                    if (nuevoEstado >= 1 && nuevoEstado <= 4) {
                                                        miToDoList.getUnaTarea(idTareaAVer).setEstado(ESTADO[nuevoEstado - 1]);
                                                        console.log("\nEstado editado con éxito.\n");
                                                        await input('Presione Enter para continuar...');
                                                    } else {
                                                        console.log("\nEstado no válido. Por favor, seleccione un estado válido.\n");
                                                        await input('Presione Enter para continuar...');
                                                    }
                                                } while (nuevoEstado < 1 || nuevoEstado > 4);
                                                break;
                                            case 5:
                                                // Editar fecha de vencimiento
                                                console.clear();
                                                await input('Esta opción aún no está disponible. Presione Enter para continuar...');
                                                break;
                                            case 0:
                                                // Volver al menú principal
                                                quiereEditar = false;
                                                cancelarEdicion = true;
                                                break;
                                            default:
                                                // Opción no válida
                                                console.log("\nOpción no válida\n");
                                                await input('Presione Enter para continuar...');
                                                break;
                                        }

                                        // await input('Pausa de prueba.');
                                    } while (opcionCampoAEditar < 0 || opcionCampoAEditar > 5 || !cancelarEdicion);

                                } else {
                                    console.log("No se editará la tarea.");
                                }

                            } else {
                                console.log("\nID de tarea no válido. Intente nuevamente.\n");
                                await input('Presione Enter para continuar...');
                                console.clear();
                            }
                        } while (!sePuedeVerLaTarea);

                    } else if (opcionTareasAVer === 0) {
                        console.clear();
                        break;
                    } else {
                        console.log("\nOpción no válida. Intente nuevamente.\n");
                        await input('Presione Enter para continuar...');
                    }
                } while (opcionTareasAVer < 0 || opcionTareasAVer > 5);
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

    close();
}

main();
