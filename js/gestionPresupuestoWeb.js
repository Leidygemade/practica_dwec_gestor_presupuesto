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
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}