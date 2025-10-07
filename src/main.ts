import { PRIORIDAD, ESTADO } from "./lib/constantes";
import { Tarea } from "./class/Tarea";
import { ToDoList } from "./class/ToDoList";
import { esFechaValida, comprobarFormatoAnio, comprobarFormatoMes, comprobarFormatoDia, fechaToString } from "./lib/funciones";
import { input, close } from "./lib/input";


// Menús de opciones
function menuPrincipal(): void {
    console.log('-------- Menú de Opciones --------\n');
    console.log('[1] Mostrar tareas');
    console.log('[2] Agregar tarea');
    console.log('[3] Buscar tarea');
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

    // Fecha de hoy
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
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

                                                let esValidoElDato: boolean = false;
                                                let nuevoAnio: string;
                                                let nuevoMes: string;
                                                let nuevoDia: string;

                                                do {

                                                    do {
                                                        console.clear();
                                                        console.log("Ingrese el año de vencimiento de la nueva tarea. Año (YYYY)\n");
                                                        nuevoAnio = await input('> ');
                                                        if (!comprobarFormatoAnio(nuevoAnio)) {
                                                            console.log("\nFormato no válido. Intente nuevamente.\n");
                                                            await input('Presione Enter para continuar...');
                                                            continue;
                                                        } else {
                                                            if (parseInt(nuevoAnio) >= hoy.getFullYear()) {
                                                                esValidoElDato = true;
                                                            }
                                                            else {
                                                                console.log("\nEl año debe ser el actual o un año futuro. Intente nuevamente.\n");
                                                                await input('Presione Enter para continuar...');
                                                            }
                                                        }
                                                    } while (!esValidoElDato);

                                                    esValidoElDato = false;

                                                    do {
                                                        console.clear();
                                                        console.log("Ingrese el mes de vencimiento de la nueva tarea. Mes (MM)\n");
                                                        nuevoMes = await input('> ');
                                                        if (!comprobarFormatoMes(nuevoMes)) {
                                                            console.log("\nFormato no válido. Intente nuevamente.\n");
                                                            await input('Presione Enter para continuar...');
                                                            continue;
                                                        } else {
                                                            esValidoElDato = true;
                                                        }
                                                    } while (!esValidoElDato);

                                                    esValidoElDato = false;

                                                    do {
                                                        console.clear();
                                                        console.log("Ingrese el día de vencimiento de la nueva tarea. Día (DD)\n");
                                                        nuevoDia = await input('> ');
                                                        if (!comprobarFormatoDia(nuevoDia)) {
                                                            console.log("\nFormato no válido. Intente nuevamente.\n");
                                                            await input('Presione Enter para continuar...');
                                                            continue;
                                                        } else {
                                                            esValidoElDato = true;
                                                        }
                                                    } while (!esValidoElDato);

                                                    esValidoElDato = false;

                                                    if (!esFechaValida(parseInt(nuevoAnio), parseInt(nuevoMes), parseInt(nuevoDia))) {
                                                        console.log("\nFecha no válida. Intente nuevamente.\n");
                                                        await input('Presione Enter para continuar...');
                                                        continue;
                                                    } else {
                                                        if (new Date(fechaToString(nuevoAnio, nuevoMes, nuevoDia)).getTime() <= hoy.getTime()) {
                                                            console.log("\nLa fecha de vencimiento debe ser futura a la fecha actual. Intente nuevamente.\n");
                                                            await input('Presione Enter para continuar...');
                                                            continue;
                                                        } else {
                                                            miToDoList.getUnaTarea(idTareaAVer).setFechaVencimiento(new Date(fechaToString(nuevoAnio, nuevoMes, nuevoDia) + "T03:00:00Z")); // UTC-3
                                                            console.log("\nFecha de vencimiento editada con éxito.\n");
                                                            await input('Presione Enter para continuar...');
                                                        }
                                                    }
                                                    esValidoElDato = true;
                                                } while (!esValidoElDato);

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
                // Variables para nueva tarea
                let tituloNuevaTarea: string;
                let descripcionNuevaTarea: string;
                let prioridadNuevaTarea: number;
                let estadoNuevaTarea: number;
                let anioNuevaTarea: string;
                let mesNuevaTarea: string;
                let diaNuevaTarea: string;

                // Variable de control de bucle
                let esValidoElDato: boolean = false;


                do {
                    console.clear();
                    console.log("Ingrese el título de la nueva tarea.\n");
                    tituloNuevaTarea = await input('> ');

                    if (tituloNuevaTarea.trim() === "") {
                        console.log("\nEl título no puede estar vacío. Intente nuevamente.\n");
                        await input('Presione Enter para continuar...');
                        console.clear();
                    } else {
                        esValidoElDato = true;
                    }
                } while (!esValidoElDato);

                esValidoElDato = false;

                do {
                    console.clear();
                    console.log("Ingrese la descripción de la nueva tarea.\n");
                    descripcionNuevaTarea = await input('> ');

                    if (descripcionNuevaTarea.trim() === "") {
                        console.log("\nLa descripción no puede estar vacía. Intente nuevamente.\n");
                        await input('Presione Enter para continuar...');
                        console.clear();
                    } else {
                        esValidoElDato = true;
                    }
                } while (!esValidoElDato);

                esValidoElDato = false;

                do {
                    console.clear();
                    console.log("Ingrese la prioridad de la nueva tarea.\n");

                    console.log(`[1] - ${PRIORIDAD[0]}`);
                    console.log(`[2] - ${PRIORIDAD[1]}`);
                    console.log(`[3] - ${PRIORIDAD[2]}\n`);

                    prioridadNuevaTarea = parseInt(await input('> '));
                    if (prioridadNuevaTarea < 1 || prioridadNuevaTarea > 3 || isNaN(prioridadNuevaTarea)) {
                        console.log("\nPrioridad no válida. Intente nuevamente.\n");
                        await input('Presione Enter para continuar...');
                    } else {
                        esValidoElDato = true;
                    }
                } while (!esValidoElDato);

                esValidoElDato = false;

                do {
                    console.clear();
                    console.log("Ingrese el estado de la nueva tarea.\n");

                    console.log(`[1] - ${ESTADO[0]}`);
                    console.log(`[2] - ${ESTADO[1]}`);
                    console.log(`[3] - ${ESTADO[2]}`);
                    console.log(`[4] - ${ESTADO[3]}\n`);

                    estadoNuevaTarea = parseInt(await input('> '));
                    if (estadoNuevaTarea < 1 || estadoNuevaTarea > 4 || isNaN(estadoNuevaTarea)) {
                        console.log("\nEstado no válido. Intente nuevamente.\n");
                        await input('Presione Enter para continuar...');
                    } else {
                        esValidoElDato = true;
                    }
                } while (!esValidoElDato);

                esValidoElDato = false;

                do {

                    do {
                        console.clear();
                        console.log("Ingrese el año de vencimiento de la nueva tarea. Año (YYYY)\n");
                        anioNuevaTarea = await input('> ');
                        if (!comprobarFormatoAnio(anioNuevaTarea)) {
                            console.log("\nFormato no válido. Intente nuevamente.\n");
                            await input('Presione Enter para continuar...');
                            continue;
                        } else {
                            do {
                                console.clear();
                                console.log("Ingrese el año de vencimiento de la nueva tarea. Año (YYYY)\n");
                                anioNuevaTarea = await input('> ');
                                if (!comprobarFormatoAnio(anioNuevaTarea)) {
                                    console.log("\nFormato no válido. Intente nuevamente.\n");
                                    await input('Presione Enter para continuar...');
                                    continue;
                                } else {
                                    if (parseInt(anioNuevaTarea) >= hoy.getFullYear()) {
                                        esValidoElDato = true;
                                    }
                                    else {
                                        console.log("\nEl año debe ser el actual o un año futuro. Intente nuevamente.\n");
                                        await input('Presione Enter para continuar...');
                                    }
                                }
                            } while (!esValidoElDato);

                        }
                    } while (!esValidoElDato);

                    esValidoElDato = false;

                    do {
                        console.clear();
                        console.log("Ingrese el mes de vencimiento de la nueva tarea. Mes (MM)\n");
                        mesNuevaTarea = await input('> ');
                        if (!comprobarFormatoMes(mesNuevaTarea)) {
                            console.log("\nFormato no válido. Intente nuevamente.\n");
                            await input('Presione Enter para continuar...');
                            continue;
                        } else {
                            esValidoElDato = true;
                        }
                    } while (!esValidoElDato);

                    esValidoElDato = false;

                    do {
                        console.clear();
                        console.log("Ingrese el día de vencimiento de la nueva tarea. Día (DD)\n");
                        diaNuevaTarea = await input('> ');
                        if (!comprobarFormatoDia(diaNuevaTarea)) {
                            console.log("\nFormato no válido. Intente nuevamente.\n");
                            await input('Presione Enter para continuar...');
                            continue;
                        } else {
                            esValidoElDato = true;
                        }
                    } while (!esValidoElDato);

                    esValidoElDato = false;

                    if (!esFechaValida(parseInt(anioNuevaTarea), parseInt(mesNuevaTarea), parseInt(diaNuevaTarea))) {
                        console.log("\nFecha no válida. Intente nuevamente.\n");
                        await input('Presione Enter para continuar...');
                        continue;
                    } else {
                        if (new Date(fechaToString(anioNuevaTarea, mesNuevaTarea, diaNuevaTarea)).getTime() <= hoy.getTime()) {
                            console.log("\nLa fecha de vencimiento debe ser futura a la fecha actual. Intente nuevamente.\n");
                            await input('Presione Enter para continuar...');
                            continue;
                        }
                    }
                    esValidoElDato = true;
                } while (!esValidoElDato);

                esValidoElDato = false;

                let nuevaTarea = new Tarea(
                    tituloNuevaTarea,
                    descripcionNuevaTarea,
                    PRIORIDAD[prioridadNuevaTarea - 1],
                    ESTADO[estadoNuevaTarea - 1],
                    new Date(fechaToString(anioNuevaTarea, mesNuevaTarea, diaNuevaTarea) + "T03:00:00Z") // UTC-3
                );

                miToDoList.agregarTarea(nuevaTarea);
                console.log("\nTarea agregada con éxito.\n");
                await input('Presione Enter para continuar...');

                console.clear();
                break;
            case 3:
                // Buscar tarea

                let terminoBusqueda: string;
                let tareasEncontradas: Tarea[] = [];
                let indice: number = 0;


                console.clear();
                if (miToDoList.getTareas().length === 0) {
                    console.log("No hay tareas cargadas.\n");
                    await input('Presione Enter para continuar...');
                    console.clear();
                    break;
                }

                console.log("Por favor, ingrese el término de búsqueda.\n");
                terminoBusqueda = (await input('> ')).toLowerCase();

                for (const tarea of miToDoList.getTareas()) {
                    if (tarea.getTitulo().toLowerCase().includes(terminoBusqueda) || tarea.getDescripcion().toLowerCase().includes(terminoBusqueda)) {
                        tareasEncontradas[indice] = tarea;
                        indice++;
                    }
                }

                if (tareasEncontradas.length === 0) {
                    console.log("\nNo se encontraron tareas que coincidan con el término de búsqueda.\n");
                    await input('Presione Enter para continuar...');
                    console.clear();
                    break;
                } else {
                    console.clear();
                    console.log("Las tareas encontradas son las siguientes:\n");
                    for (let tarea of tareasEncontradas) {
                        console.log(`[${tarea.getId()}] - ${tarea.getTitulo()}`);
                    }
                }
                await input('\nPresione Enter para continuar...');

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
