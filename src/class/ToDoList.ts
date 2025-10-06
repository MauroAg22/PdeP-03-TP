import { Tarea } from "./Tarea";
import { PRIORIDAD, ESTADO } from "../lib/constantes";
import { fechaToString, comprobarFormatoAnio, comprobarFormatoMes, comprobarFormatoDia } from "../lib/funciones";

export class ToDoList {
    private tareas: Tarea[];

    constructor() {
        this.tareas = [];
    }

    getTareas(): Tarea[] { return this.tareas; }
    setTareas(tareas: Tarea[]): void { this.tareas = tareas; }
    getUnaTarea(id: number): Tarea { return this.tareas[id]; }

    agregarTarea(tarea: Tarea): void {
        this.tareas[this.tareas.length] = tarea;
        this.tareas[this.tareas.length - 1].setId(this.tareas.length - 1);
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

    arrayFiltrarPorEstado(idEstado: number): Tarea[] {
        let arregloAuxiliar: Tarea[] = [];
        for (let tarea of this.tareas) {
            if (tarea.getEstado() === ESTADO[idEstado]) {
                arregloAuxiliar[arregloAuxiliar.length] = tarea;
            }
        }
        return arregloAuxiliar;
    }

    mostrarDetallesDeTarea(idTarea: number): void {
        console.log('--------------------------------------------------------------------');
        console.log('                         Detalles de la Tarea');
        console.log('--------------------------------------------------------------------');
        console.log(`\nTítulo: ${this.tareas[idTarea].getTitulo()}`);
        console.log(`Descripción: ${this.tareas[idTarea].getDescripcion()}`);
        console.log(`Prioridad: ${this.tareas[idTarea].getPrioridad()}`);
        console.log(`Estado: ${this.tareas[idTarea].getEstado()}`);
        console.log(`Fecha de Creación: ${this.tareas[idTarea].getFechaCreacion().toLocaleDateString()}`);
        console.log(`Fecha de Vencimiento: ${this.tareas[idTarea].getFechaVencimiento().toLocaleDateString()}`);
        console.log('\n--------------------------------------------------------------------\n');
    }
}
