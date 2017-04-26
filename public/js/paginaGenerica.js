/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var datosGrilla;
var datosGrillaDetalle;
var item = null;
var itemDetalle = null;

/**
 * 
 * @param {type} json
 * @param {type} datosGrilla
 * @param {type} divGrilla
 * @returns {undefined}
 */
function grid(json, datosGrilla, divGrilla){
    
    var editable = false;
    if(json.forms_editable===true){
        editable = "popup";
    }
    
    var schema = new Object();
    schema.model = new Object();
    
    var columns = new Array();
    var align = "";
    var template = "";
    
    var btnUD = new Array();
    var tamañoColumnaBotones = 0;
    var posicion;
    
    for(var i = 0; i<json.eesic_forms_but.length; i++){
        posicion = parseInt(json.eesic_forms_but[i].idinterno);
        btnUD[posicion] = new Object();
        btnUD[posicion].name = json.eesic_forms_but[i].nombre;                
        btnUD[posicion].click = eval(json.eesic_forms_but[i].funcion);
        btnUD[posicion].template ="<a class='k-grid-"+json.eesic_forms_but[i].nombre+"'><span class='k-sprite "+json.eesic_forms_but[i].icono+"' title=\""+json.eesic_forms_but[i].titulo+"\"></span></a>"         
        tamañoColumnaBotones = tamañoColumnaBotones+44;        
    }
    
    var btnIzq = {command: btnUD, title: "&nbsp;", width: tamañoColumnaBotones+"px"};
    
    for(var i = 0; i<json.eesic_forms_col.length; i++){
        posicion = parseInt(json.eesic_forms_col[i].idinterno);
        schema.model[json.eesic_forms_col[i].cmp_nom2] = new Object();
        schema.model[json.eesic_forms_col[i].cmp_nom2].type = json.eesic_forms_col[i].cmp_tip;
        schema.model[json.eesic_forms_col[i].cmp_nom2].editable = json.eesic_forms_col[i].cmp_edi;
        if(json.eesic_forms_col[i].cmp_tip==="integer"){
            align = "rightAling";
            template = "<div class='"+align+"'>#= kendo.toString( "+ json.eesic_forms_col[i].cmp_nom2+",\"n0\")#</div>";            
        }else{
            align = "";
            template = "<div class='"+align+"'>#=" + json.eesic_forms_col[i].cmp_nom2+ "#</div>";
        }
        columns[posicion] = new Object();
        columns[posicion].field = json.eesic_forms_col[i].cmp_nom2;        
        columns[posicion].title = json.eesic_forms_col[i].cmp_dsc;
        columns[posicion].hidden = false;//json.eesic_forms_col[i].cmp_vis;
        columns[posicion].template = template;
    }
    columns[json.eesic_forms_col.length] = btnIzq;
    if ($("#"+divGrilla)["0"].clientHeight===0){
        var altoGrilla = $("body").height() - $("#"+divGrilla)["0"].parentNode.clientHeight;
        var anchoGrilla = $("body").width(); 
    }else{
        var altoGrilla = $("#"+divGrilla)["0"].clientHeight;
        var anchoGrilla = $("body").width(); 
    }
    
        
    var grid = $("#"+divGrilla).kendoGrid({
        height : altoGrilla,
        width : anchoGrilla,
        editable: editable,
        sortable: json.forms_sorteable,
        scrollable: json.forms_scrollable,
        selectable: json.forms_selectable,
        filterable: json.forms_filterable,
        resizable: true,
        dataSource: {
            data: datosGrilla,            
            schema: schema,            
        },
        columns: columns,
    });
}

function mostrarCustomPopUp(idcustomPopUp) {    
    $("#"+idcustomPopUp).fadeIn("slow");
}

function cerrarCustomPopUp(idCustomPopUp) {
    $("#disable").fadeOut("slow");
    $("#"+idCustomPopUp).fadeOut("slow", function(){
        var tabla = document.getElementById("tablaPopUp"+idCustomPopUp); 
        tabla.parentNode.removeChild(tabla);
        if(document.getElementById('lbAccion')){
            document.getElementById('lbAccion').innerHTML = "Crear";
        }
        
        $("#buttonCrearDet")["0"].childNodes["0"].data= "Guardar";
        $("#buttonCab")["0"].childNodes["0"].data= "Guardar";
    });
    $("#disable" ).remove();
}

function abrirCustomPopUp(idCustomPopUp) {
    
    $("body").append("<div id='windowCab'></div>");
    var myWindow = $("#windowCab");
    var undo = $("#undo");
    
    function onCloseCabecera() {
        document.getElementById("windowCab").remove();
        undo.fadeIn();
    }
    $("body").append("<div id='disable'></div>");
        
    mostrarCustomPopUp(idCustomPopUp);
    crearTabla(idCustomPopUp, idCustomPopUp, "input");   
}

/**
 * 
 * @param {type} idCustomPopUp
 * @param {type} divBody
 * @param {type} elementoHtml
 * @returns {undefined}
 */
function crearTabla(idCustomPopUp, divBody, elementoHtml) { 
        
    var json = JSON.parse(sessionStorage.getItem("dsSIRinitial"));    
    var campos;
    var numcolumnas = 0; /*Cada columna es una pareja de label e input*/
    var numfilas=0;
    var tamColLabel = 0;
    var tamColInput = 0;
    var fontWeight= "font-weight:bold;";
    
    for(var i=0; i< json.dsSIRinitial.eesic_forms.length; i++){
        if(json.dsSIRinitial.eesic_forms[i].forms_nom ===  idCustomPopUp){             
            campos = json.dsSIRinitial.eesic_forms[i]; 
            if(campos.eesic_forms_col.length>10){
                numcolumnas=2;
                numfilas = parseInt(campos.eesic_forms_col.length/2) + campos.eesic_forms_col.length%2
                tamColLabel = 15;
                tamColInput = 35;
            }else{
                numcolumnas=1;               
                numfilas = campos.eesic_forms_col.length;
                if(elementoHtml === "label"){
                    tamColLabel = 20;
                    tamColInput = 80;
                }else{
                    tamColLabel = 30;
                    tamColInput = 70;
                }                
            }
        }
    }
    
    var body;    

    if(idCustomPopUp==="popUpCabecera" && divBody ==="popUpCabecera"){
        body = document.getElementById("popupCampos");        
        document.getElementById('tituloPopUp').innerHTML = campos.titulo;
        $("#buttonCab")["0"].childNodes["0"].data= campos.eesic_forms_but[0].titulo;
        $("#buttonCab").kendoButton({
            click: eval(campos.eesic_forms_but[0].funcion)
        });         
    }else if(idCustomPopUp==="popUpBusqueda" && divBody ==="popUpBusqueda"){
        body = document.getElementById("popupCamposBusqueda");
        $("#btBuscar").kendoButton({
            click: eval(campos.eesic_forms_but[0].funcion)
        });
    }else if(idCustomPopUp==="popUpDetalle" && divBody ==="popUpDetalle"){
        body = document.getElementById("popupCamposDetalle");
        document.getElementById('tituloPopUpDet').innerHTML = campos.titulo;
        $("#buttonCrearDet").kendoButton({
            click: eval(campos.eesic_forms_but[0].funcion)
        });
    }else{
        body = document.getElementById(divBody);        
        document.getElementById('lbCabecera').innerHTML = campos.titulo;
    }
    
    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    tabla.setAttribute("id", "tablaPopUp"+divBody);
    tabla.setAttribute("style", "width: 100%;");
    var tblBody = document.createElement("tbody");
    var muncampo = 0;
    var textAlingLabel;
    
    if(elementoHtml === "label"){
        textAlingLabel = "left";  
        fontWeight= "font-weight:bold;";
    }else{
        textAlingLabel = "right";
        fontWeight ="";
    }
    
    // Crea las celdas
    for (var i = 0; i < numfilas; i++) {
        // Crea las hileras de la tabla        
        var hilera = document.createElement("tr");
        
        for (var j = 0; j < numcolumnas; j++) {            
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            celda.setAttribute("style", "text-align: "+textAlingLabel+"; width:"+tamColLabel+"%;");
            var label = document.createElement("label"); 
            label.setAttribute("class", "letraParrafo");
            label.setAttribute("id", "lb"+campos.eesic_forms_col[muncampo].cmp_nom2); 
            label.setAttribute("style", fontWeight);
            label.innerHTML = campos.eesic_forms_col[muncampo].cmp_dsc;
            celda.appendChild(label);
            hilera.appendChild(celda);
            
            var celdaInput = document.createElement("td");
            celdaInput.setAttribute("style", "text-align: left; width:"+tamColInput+"%");            
            var input = document.createElement(elementoHtml);
            if(elementoHtml === "input"){
                input.setAttribute("class", "k-textbox");   
            }else if(elementoHtml === "label"){
                
            }            
            input.setAttribute("id", campos.eesic_forms_col[muncampo].cmp_nom2);
            input.setAttribute("style", "width: 90%");
            input.setAttribute("name", elementoHtml+"TD");
            celdaInput.appendChild(input);
            hilera.appendChild(celdaInput);
            muncampo = muncampo+1;
            if(muncampo === campos.eesic_forms_col.length){
                j=numcolumnas;
            }
        }
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }    
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";    
    
    var childrens = $("#"+idCustomPopUp)["0"].children;
    var tamañoDiv = 0;
    for(var i=0; i<childrens.length; i++){
        if(childrens[i].id==="divTituloCustomPopUp"){
            tamañoDiv = -childrens[i].clientHeight;
            break;
        }
    }    
//    tamañoDiv = tamañoDiv+ $("#"+idCustomPopUp)["0"].clientHeight - $("footer")["0"].clientHeight - 15;
//    document.getElementById("popupCamposDetalle").style.height = tamañoDiv+"px";
    tamañoDiv = tamañoDiv+ $("#"+idCustomPopUp)["0"].clientHeight - 55;
    body.height = tamañoDiv+"px";
    
    if(item!==null ){
        document.getElementById('lbAccion').innerHTML = "Editar";        
        $("#buttonCab")["0"].childNodes["0"].data= "Actualizar";        
        cargarDatos(item, "input");
    }
    
}

function cargarDatos(item, etiquetahtml){    
    var inputs = document.getElementsByName(etiquetahtml+"TD");       
    
    if(etiquetahtml==="input"){
        for(var i=0; i< inputs.length ; i++){
            $("body").find(etiquetahtml+"#"+inputs[i].id).val(item[inputs[i].id])
//            $("#"+inputs[i].id).val(item[inputs[i].id]);
        }    
    }else if (etiquetahtml==="label"){
        for(var i=0; i< inputs.length ; i++){
            document.getElementById(inputs[i].id).innerHTML = item[inputs[i].id];
        }        
    }
    
}

function volver(){
    document.getElementById('divGrillaPrincipal').style.display = 'block';
    document.getElementById('divCabeceraDetalle').style.display = 'none'; 
    document.getElementById('divCabecera').innerHTML = ""; 
    document.getElementById('gridDetalle').innerHTML = ""; 
    item = null;
    itemDetalle = null;
    $("#gridDetalle").empty();
}

