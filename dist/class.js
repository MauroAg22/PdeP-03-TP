"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
class Tarea {
    constructor(titulo, descripcion, prioridad, estado, fechaVencimiento) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.estado = estado;
        this.fechaCreacion = new Date();
        this.fechaVencimiento = fechaVencimiento;
    }
    // ----------------------------------------- Setters -----------------------------------------
    setTitulo(titulo) { this.titulo = titulo; }
    setDescripcion(descripcion) { this.descripcion = descripcion; }
    setPrioridad(prioridad) { this.prioridad = prioridad; }
    setEstado(estado) { this.estado = estado; }
    setFechaVencimiento(fechaVencimiento) { this.fechaVencimiento = fechaVencimiento; }
    // ----------------------------------------- Getters -----------------------------------------
    getTitulo() { return this.titulo; }
    getDescripcion() { return this.descripcion; }
    getPrioridad() { return this.prioridad; }
    getEstado() { return this.estado; }
    getFechaCreacion() { return this.fechaCreacion; }
    getFechaVencimiento() { return this.fechaVencimiento; }
}
exports.Tarea = Tarea;
