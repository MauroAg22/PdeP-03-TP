import { PRIORIDAD, ESTADO } from "../lib/constantes";

export class Tarea {
    private id: number = 0;
    private titulo: string;
    private descripcion: string;
    private prioridad: typeof PRIORIDAD[0|1|2];
    private estado: typeof ESTADO[0|1|2|3];
    private fechaCreacion: Date;
    private fechaVencimiento: Date;

    // ----------------------------------------- Constructor -----------------------------------------

    constructor(titulo: string, descripcion: string, prioridad: typeof PRIORIDAD[number], estado: typeof ESTADO[number], fechaVencimiento: Date) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.estado = estado;
        this.fechaCreacion = new Date();
        this.fechaVencimiento = fechaVencimiento;
    }


    // ----------------------------------------- Setters -----------------------------------------

    setId(id: number): void { this.id = id; }
    setTitulo(titulo: string): void { this.titulo = titulo; }
    setDescripcion(descripcion: string): void { this.descripcion = descripcion; }
    setPrioridad(prioridad: typeof PRIORIDAD[number]): void { this.prioridad = prioridad; }
    setEstado(estado: typeof ESTADO[number]): void { this.estado = estado; }
    setFechaVencimiento(fechaVencimiento: Date): void { this.fechaVencimiento = fechaVencimiento; }


    // ----------------------------------------- Getters -----------------------------------------

    getId(): number { return this.id; }
    getTitulo(): string { return this.titulo; }
    getDescripcion(): string { return this.descripcion; }
    getPrioridad(): typeof PRIORIDAD[number] { return this.prioridad; }
    getEstado(): typeof ESTADO[number] { return this.estado; }
    getFechaCreacion(): Date { return this.fechaCreacion; }
    getFechaVencimiento(): Date { return this.fechaVencimiento; }

}

