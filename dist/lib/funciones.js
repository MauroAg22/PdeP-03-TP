"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comprobarFormatoAnio = comprobarFormatoAnio;
exports.comprobarFormatoMes = comprobarFormatoMes;
exports.comprobarFormatoDia = comprobarFormatoDia;
exports.fechaToString = fechaToString;
const formatoValidoAnio = /^\d{4}$/; // Considera años de 0000 a 9999
const formatoValidoMes = /^(0[1-9]|1[0-2])$/; // Considera meses del 01 al 12
const formatoValidoDia = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/; // Considera días del 01 al 31
function comprobarFormatoAnio(anio) {
    return formatoValidoAnio.test(anio.toString());
}
function comprobarFormatoMes(mes) {
    return formatoValidoMes.test(mes.toString());
}
function comprobarFormatoDia(dia) {
    return formatoValidoDia.test(dia.toString());
}
function fechaToString(anio, mes, dia) {
    return `${anio}-${mes}-${dia}`;
}
