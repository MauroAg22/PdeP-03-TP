import { Tarea } from "./Tarea";
import { PRIORIDAD, ESTADO } from "../lib/constantes";
import { fechaToString, comprobarFormatoAnio, comprobarFormatoMes, comprobarFormatoDia } from "../lib/funciones";

export class ToDoList {
    private tareas: Tarea[];

    constructor() {
        this.tareas = [];
    }

    getTareas(): Tarea[] {
        return this.tareas;
    }

    setTareas(tareas: Tarea[]): void {
        this.tareas = tareas;
    }

    agregarTarea(tarea: Tarea): void {
        this.tareas[this.tareas.length] = tarea;
    }

    comprobarSiSePuedeBorrarTarea(id: number): boolean {
        return id >= 0 && id < this.tareas.length;
    }

    eliminarTarea(idTarea: number): void {

        let arregloAuxiliar: Tarea[] = [];
        let idAuxiliar: number = 0;

        for (let i = 0; i < this.tareas.length; i++) {
            if (this.tareas[i] !== this.tareas[idTarea]) {
                arregloAuxiliar[idAuxiliar] = this.tareas[i];
                idAuxiliar++;
            }
        }

        this.tareas = arregloAuxiliar;
    }



    listarTareas(): void {
        console.log('--------------------------------------------------------------------');
        console.log('                         Lista de Tareas');
        console.log('--------------------------------------------------------------------');
        for (let tarea of this.tareas) {
            console.log(`\nTítulo: ${tarea.getTitulo()}`);
            console.log(`Descripción: ${tarea.getDescripcion()}`);
            console.log(`Prioridad: ${tarea.getPrioridad()}`);
            console.log(`Estado: ${tarea.getEstado()}`);
            console.log(`Fecha de Creación: ${tarea.getFechaCreacion().toLocaleDateString()}`);
            console.log(`Fecha de Vencimiento: ${tarea.getFechaVencimiento().toLocaleDateString()}`);
            console.log('\n--------------------------------------------------------------------');
        }
    }
}
