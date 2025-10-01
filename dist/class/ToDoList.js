"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoList = void 0;
class ToDoList {
    constructor() {
        this.tareas = [];
    }
    getTareas() {
        return this.tareas;
    }
    setTareas(tareas) {
        this.tareas = tareas;
    }
    agregarTarea(tarea) {
        this.tareas[this.tareas.length] = tarea;
    }
    comprobarSiSePuedeBorrarTarea(id) {
        return id >= 0 && id < this.tareas.length;
    }
    eliminarTarea(idTarea) {
        let arregloAuxiliar = [];
        let idAuxiliar = 0;
        for (let i = 0; i < this.tareas.length; i++) {
            if (this.tareas[i] !== this.tareas[idTarea]) {
                arregloAuxiliar[idAuxiliar] = this.tareas[i];
                idAuxiliar++;
            }
        }
        this.tareas = arregloAuxiliar;
    }
    listarTareas() {
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
exports.ToDoList = ToDoList;
