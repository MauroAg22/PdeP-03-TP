const formatoValidoAnio = /^\d{4}$/; // Considera años de 0000 a 9999
const formatoValidoMes = /^(0[1-9]|1[0-2])$/; // Considera meses del 01 al 12
const formatoValidoDia = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/; // Considera días del 01 al 31


function comprobarFormatoAnio(anio: string): boolean {
    return formatoValidoAnio.test(anio.toString());
}

function comprobarFormatoMes(mes: string): boolean {
    return formatoValidoMes.test(mes.toString());
}

function comprobarFormatoDia(dia: string): boolean {
    return formatoValidoDia.test(dia.toString());
}

function fechaToString(anio: string, mes: string, dia: string): string {
    return `${anio}-${mes}-${dia}`;
}

function esFechaValida(anio: number, mes: number, dia: number): boolean {
    let date = new Date(anio, mes - 1, dia);

    if (date.getFullYear() == anio &&
        (date.getMonth() + 1) == mes &&
        date.getDate() == dia) {
        return true;
    } else {
        return false;
    }
}

export { esFechaValida, comprobarFormatoAnio, comprobarFormatoMes, comprobarFormatoDia, fechaToString };
