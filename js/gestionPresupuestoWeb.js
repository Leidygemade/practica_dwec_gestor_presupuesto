import * as gesPres from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    let id = document.getElementById(idElemento);
    id.innerHTML= valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let id = document.getElementById(idElemento);

    let divPadre = document.createElement('div');
    divPadre.className = 'gasto';

    let div1 = document.createElement('div');
    div1.className = 'gasto-descripcion';
    div1.innerHTML = gasto.descripcion;

    let div2 = document.createElement('div');
    div2.className = 'gasto-fecha';
    div2.innerHTML = gasto.fecha;

    let div3 = document.createElement('div');
    div3.className = 'gasto-valor';
    div3.innerHTML = gasto.valor;
    
    let div4 = document.createElement('div');
    div4.className = 'gasto-etiquetas';

    if (gasto.etiquetas) {
    for (let etiqueta of gasto.etiquetas) {
        let span = document.createElement('span');
        span.className ='gasto-etiquetas-etiqueta';
        span.innerHTML = etiqueta;
        div4.append(span);
    }
    }
    
    divPadre.append(div1);
    divPadre.append(div2);
    divPadre.append(div3);
    divPadre.append(div4);
    id.append(divPadre);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let id = document.getElementById(idElemento);

    let divPadre = document.createElement('div');
    divPadre.className = 'agrupacion';

    let titulo = document.createElement('h1');
    titulo.innerHTML = 'Gastos agrupados por '+periodo;
    divPadre.append(titulo);

    for(let key in agrup) {
        let divAgrup = document.createElement('div');
        divAgrup.className = 'agrupacion-dato';
        
        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.innerHTML = key;
        divAgrup.append(spanClave);

        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.innerHTML = agrup[key];
        divAgrup.append(spanValor);

        divPadre.append(divAgrup);
    }
    
    id.append(divPadre);
}

function repintar() {
    mostrarDatoEnId('presupuesto', gesPres.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gesPres.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gesPres.calcularBalance());

    let id = document.getElementById('listado-gastos-completo');
    id.innerHTML = "";

    let listaCompleta = gesPres.listarGastos();
    for (let elemento of listaCompleta) {
    mostrarGastoWeb('listado-gastos-completo', elemento);
    }
}

//función para el evento click del botón actualizarpresupuesto
function actualizarPresupuestoWeb() {
    let introducir = prompt("Introduce un nuevo presupuesto");
    let convertir = parseFloat(introducir);
    gesPres.actualizarPresupuesto(convertir);
    repintar();
}

//evento click que hace funcionar el botón actualizarpresupuesto
document.getElementById('actualizarpresupuesto').addEventListener('click', actualizarPresupuestoWeb);

//función para el evento click del botón anyadir gasto
function nuevoGastoWeb() {
    let descripcion = prompt("Añade la descripción del gasto");
    let valor = prompt("Introduce el valor");
    let fecha = prompt("Introduce la fecha");
    let etiquetas = prompt("Introduce las etiquetas");

    //convertir valores
    let convertirValor = parseFloat(valor);
    let etiquetasArray = etiquetas.split(',');

    //crear el gasto
    let gastoNuevo = new gesPres.CrearGasto(descripcion, convertirValor, fecha, etiquetasArray);

    //añadir el gasto
    gesPres.anyadirGasto(gastoNuevo);
    repintar();
}

//evento click que hace funcionar el botón anyadirgasto
document.getElementById('anyadirgasto').addEventListener('clic', nuevoGastoWeb);

//función constructora
function EditarHandle() {
    this.handleEvent = function(evento) {
        let descripcion = prompt("Introduce una descripción");
        let valor = prompt("Introduce un valor");
        let fecha = prompt("Introduce una fecha");
        let etiquetas = prompt("Introduce las etiquetas");

        let convertirValor = parseFloat(valor);
        let etiquetasArray = etiquetas.split(',');

        this.gasto.gesPres.actualizarValor(convertirValor);
        this.gasto.gesPres.actualizarDescripcion(descripcion);
        this.gasto.gesPres.actualizarFecha(fecha);
        this.gasto.gesPres.anyadirEtiquetas(etiquetasArray);

        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function(evento) {
        gesPres.borrarGasto(this.gasto.id);
        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}