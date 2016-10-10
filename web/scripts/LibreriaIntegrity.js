/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Funcion para mostrar un mensaje en un popUp de kendo
 * @param {type} mensaje string que contiene el mensaje
 * @returns {undefined}
 */
function  msnError(mensaje) { //pasar a carpeta scrips
    var midiv = document.createElement("div");
    midiv.setAttribute("id", "divPopUp");
    midiv.setAttribute("vertical-align", "middle");
    document.body.appendChild(midiv);

    midiv = document.createElement("div");
    midiv.setAttribute("id", "labelMensaje");
    midiv.setAttribute("align", "center");
    document.getElementById("divPopUp").appendChild(midiv);

    midiv = document.createElement("div");
    midiv.setAttribute("id", "labelPopUp");
    midiv.setAttribute("align", "right");
    midiv.setAttribute("style", "vertical-align: middle;margin-right: 80px;margin-left: 60px");
    document.getElementById("divPopUp").appendChild(midiv);

    midiv = document.createElement("div");
    midiv.setAttribute("id", "botones");
    midiv.setAttribute("align", "right");
    midiv.setAttribute("style", "vertical-align: middle; border-top: 1px solid #E0E0E0;position: static;right: 30px;overflow: hidden;");
    document.getElementById("divPopUp").appendChild(midiv);

    crearButton("ButtonCancel", "Aceptar", "botones", "k-button");
    //$("#ButtonCancel").kendoButton();
    document.getElementById("ButtonCancel").addEventListener("click", cerrarWindow);

    crearEspacio_salto("jumpLine", 1, "labelMensaje");
    crearLabel("labelmenBD", mensaje, "labelMensaje", "15px Verdana");
    crearEspacio_salto("jumpLine", 2, "labelmenBD");
    msnpopUpPeque("Aceptar", "tipo");
    var elem = document.getElementById("ButtonCancel");
    elem.value = "Aceptar";
}
function cerrarWindow() {
    $("#divPopUp").data("kendoWindow").close();
    document.getElementById("divPopUp").remove();
}

/**
 * Crea una ventana pequeña la cual hace de popUp para hacer la edicion o creacion de un registro
 * @titulo el nombre que lleva en la parte superior 
 * @tipo originalmente se creo para determinar si era edicion o creacion pero esa propiedad ya se logro definir con otra propiedad
 * */
function msnpopUpPeque(titulo, tipo) {


    var popUp = $("#divPopUp").kendoWindow({
        draggable: true,
        maxHeight: "600px",
        minWidth: "400px",
        modal: true,
        resizable: false,
        title: titulo,
    }).data("kendoWindow").center();
    document.getElementById("divPopUp_wnd_title").innerHTML = titulo;
    document.getElementById("divPopUp_wnd_title").textContent = titulo;
    popUp.open();
}
/**
 * 
 * crea un elemento html tipo Editor
 * @param {type} id id del nuevo elemento
 * @param {type} div div al que se le asigna el nuevo elemento
 * @returns {undefined}
 */
function  crearTextArea(id, div) {
    var newInput = document.createElement("textarea");
    newInput.id = id;
    newInput.name = "text";
    newInput.setAttribute("data-bind", "value: textareaValue");
    newInput.setAttribute("class", "k-textbox");//le pone un clase kendo
    newInput.setAttribute("style", "height: 100px; width: 200px;");//le pone un estilo kendo
    document.getElementById(div).appendChild(newInput);
}/**
 * 
 * Modifivca un input para ponerlo como una lista tipo Kendo
 * @param {type} elemento id que se quiere modificar
 * @param {type} lista arreglo que se le asignara al elemento kendo
 * @returns {undefined}
 * @returns {undefined}
 */
function comboBoxKendo(elemento, lista) {
    var fecha = new Date();
    var ano = fecha.getFullYear();
    elemento = $("#" + elemento);//DECLARO EL ELEMENTO COMO UN OBJ JQUERY
    //var lista = [];//LISTA DE DATOS QUE VA A TENE EL ELEMENTO DE KENDO
    if (!lista) {
        lista.push(" ");
    }
    //elemento.data("kendoComboBox").value(null);//LIMPIO TODO EL ELEMENTO KENDO 
    elemento = elemento.kendoComboBox({//CREO EL ELEMENTO DE NUEVO Y PONGO SUS NUEVOS VALORES
        dataSource: lista,
        filter: "contains",
        suggest: true,
        index: 0
    });
}
/**
 * Crear un elemento label dentro de un div
 * @param {type} id id del nuevo label
 * @param {type} titulo valor del label
 * @param {type} div div al cual sele asigna el nuevo elemento
 * @param {type} fuente tipo de fuente del label
 * @param {type} color si quiere un color especifico
 * @param {type} tipo en caso de ser Editor cambia ya que necesita un tam especifico
 * @returns {undefined}
 */
function  crearLabel(id, titulo, div, fuente, color, tipo) {
    var newlabel = document.createElement("Label");
    newlabel.id = id;
    newlabel.setAttribute("for", "text" + id);
    if (tipo == 'editor') {//en caso de que sea un label para editor le coloca este estilo para mostrarlo en la parte superior
        newlabel.style.verticalAlign = '220%';
    }
    newlabel.style.font = fuente;
    newlabel.innerHTML = titulo;
    document.getElementById(div).appendChild(newlabel);
}
/**
 * Al igual que el label  este crea un font 
 * @param {type} titulo valor del font
 * @param {type} div div al que se le asigna el nuevo elemento 
 * @param {type} tam tamaño de font
 * @param {type} color si el usuario quiere un color especifico
 * @returns {undefined}
 */
function  crearFont(titulo, div, tam, color) {
    var font = document.createElement('font');
    font.setAttribute('color', color);
    font.setAttribute('size', tam);
    font.innerHTML = titulo;
    document.getElementById(div).appendChild(font);
}
/**
 * Crea un elemento input 
 * @param {type} id id del nuevo elemeto
 * @param {type} div div el cual se le asignara el nuevo elemento
 * @returns {undefined}
 */
function  crearInput(id, div) {
    var newInput = document.createElement("INPUT");
    newInput.id = id;
    newInput.name = "text";
    document.getElementById(div).appendChild(newInput);
}
/**
 * en caso de tener un input con un eventochange o casacada
 * @param {type} id id del elemento
 * @param {type} div div al cual va  a ser asignado el nuevo elemento
 * @param {type} funcion funcion que se le asigna en caso de modificacio 
 * @param {type} idCmpDpd id del campo que cambiara
 * @param {type} evento
 * @returns {undefined}
 */
function  crearInputCmpDpd(id, div, funcion, idCmpDpd, evento) {
    funcion = funcion + '( \"' + idCmpDpd + '\",\"' + id + '\")';
    crearInputEvento(id, div, funcion, evento);
}

function  crearInputEvento(id, div, funcion, Event) {
    var newInput = document.createElement("INPUT");
    newInput.id = id;
    newInput.name = "text";
    newInput.setAttribute(Event, funcion);
    document.getElementById(div).appendChild(newInput);
}
/**
 * Crea un Input con lupa 
 * @param {type} id id del nuevo elemento
 * @param {type} div donde va a crear el nuevo elemento
 * @param {type} busqueda url de la pagina donde va a ir a buscar
 * @returns {undefined}
 */
function  crearInputBE(id, div, busqueda) {
    var span = document.createElement("span");
    span.setAttribute('class', "k-textbox k-button k-space-right");
    var newInput = document.createElement("INPUT");
    newInput.id = id;
    var elem = document.createElement("img");
    var link = document.createElement('a');
    elem.id = id + "img";
    busqueda = 'busquedaExtendida( \"' + busqueda + ',' + id + '\")';
    link.setAttribute('href', '#');
    link.setAttribute('onClick', busqueda);
    link.setAttribute("class", "k-icon k-i-search");
    span.appendChild(newInput);
    span.appendChild(link);
//	try{}catch(e){}
    document.getElementById(div).appendChild(span);
}
/**
 * En caso de tener label es necesario montar un espacio o un salto del linea 
 * @param {type} tipo varia en salto de linea o solo un espacio
 * @param {type} longiel nuemero de espacios o saltos 
 * @param {type} div div al que le le va a signar el espacio o salto
 * @param {type} ExtTamPoUp
 * @returns {undefined}
 */
function  crearEspacio_salto(tipo, longi, div, ExtTamPoUp) {
    var newlabel = document.createElement("Label");
    var longitud = "";
    if (tipo == "jumpLine") {
        tipo = "<br>";
    } else {
        tipo = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    for (var i = 0; i < longi; i++) {
        longitud = longitud + tipo;
    }
    newlabel.innerHTML = longitud;
    if (ExtTamPoUp) {
        var tam = 'margin-left:' + ExtTamPoUp;
        newlabel.setAttribute('style', tam);
    }
    document.getElementById(div).appendChild(newlabel);
}
/**
 * Crea un nuevo elemento buttton
 * @param {type} id id del nuevo elemtento button
 * @param {type} titulo 
 * @param {type} div donde se va a crear el nuevo elemento 
 * @param {type} clase stilo css que contiene el button
 * @returns {undefined}
 */
function  crearButton(id, titulo, div, clase) {
    var boton = document.createElement("button");
    boton.type = "button";
    boton.id = id;
    boton.setAttribute("class", clase);
    var texto = document.createTextNode(titulo);
    boton.appendChild(texto);
    document.getElementById(div).appendChild(boton);
}
/**
 * identifica en que navegador se esta ejecutando la aplicacion 
 * @returns {navigator.appVersion|String} el navegador en el cual se esta ejecutando
 */
function identBrowser() {
    var browser = navigator.appVersion;
    if (/\w*Edge\//g.exec(browser)) {
        browser = "Edge";
    } else if (/\w*Chrome\//g.exec(browser)) {
        browser = "Chrome";
    } else {
        browser = "Mozilla";
    }
    return  browser;
}

/**
 * Crea un ventana tipo "dialog" de kendo para mostrar mensajes de al usuario
 * 
 * @param {string} titulo  texto que aparece en la parte superior de la ventana
 * @param {string} contenido texto que aparece en el centro de la ventana 
 * @param {string} ancho indica el ancho de la ventana, puede ser "auto" o un numero en pixeles "300px"
 * @param {string} alto indica el ato de la ventana, puede ser "auto" o un numero en pixeles "300px"
 * @param {boolean} modal indica el tipo de foco que tiene la ventana respecto a la aplicaciòn
 * @param {boolean} cerrar indica si la ventana se puede cerrar sin llamar a una de las acciones
 * @param {array} actions objeto tipo arreglo el cual contiene las diferentes opciones que el usuario puede elegir, solo puede haber un boton principal ejem:
 *                        var actions = new Array();
 *                        actions[0] = new Object();
 *                        actions[0].text = "Intentar de nuevo";
 *                        actions[0].primary = "true";
 *                        actions[0].action = "IntentarNuevamente"; (función que se invoca)
 *                        actions[1] = new Object();    
 *                        actions[1].text = "Salir";                
 *                        actions[1].action = "salir"; función que se invoca)
 * @returns {undefined}
 */
function createDialog(titulo, contenido, ancho, alto, modal, cerrar, actions){
    
    $("body").append("<div id='dialog'></div>");
    var dialog = $('#dialog');
    dialog.kendoDialog({
        width: ancho,
        heigh: alto,
        title: titulo,
        closable: cerrar,
        modal: modal,
        content: "<p>"+contenido+"</p><br>",
        actions: actions        
    });
    
}

