/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(window).resize(function () {
    var viewportHeight = $(window).height();    
    $('#outerWrapper').height(viewportHeight - 100);     
});

$(document).ready(function() { 
    
    var objData = new sirData();    
    var jsonSIRData = objData.getjson();
    var urlData = objData.getUrlSir();
    var mapData = objData.getmapSir()
    
    $.ajax({
        async: false, 
        type: "POST",
        data: JSON.stringify(jsonSIRData),
        url: urlData,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){         
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK")) {            
            datosGrilla = e[key1][mapData];
        } else {
            alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
        } 
    });    

    var obj = new dsSIRinitial();    
    var jsonSIR = obj.getjson();
    var url = obj.getUrlSir();
    
    $.ajax({
        async: false, 
        type: "POST",
        data: JSON.stringify(jsonSIR),
        url: url,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){                 
        var key1 = Object.keys(e)[0];      
        if ((e[key1].eeEstados[0].Estado === "OK")) {            
            sessionStorage.setItem("dsSIRinitial", JSON.stringify(e))
            for(var i=0; i< e[key1].eesic_forms.length; i++){
                if(e[key1].eesic_forms[i].forms_nom === "grilla"){  
                    document.getElementById('lbfuncion').innerHTML =  e[key1].eesic_forms[i].titulo;                    
                    grid(e[key1].eesic_forms[i], datosGrilla, e[key1].eesic_forms[i].forms_nom); 
                    if(e[key1].eesic_forms[i+1].forms_nom === "grillaDetalle"){  
                        sessionStorage.setItem("esCabeceraDetalle", true);
                    }else{
                        sessionStorage.setItem("esCabeceraDetalle", false);
                    }
                }                
            }
        } else {
            alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
        } 
    });    
});


/**
 * Permite editar un elemento de la grilla, si es cabecera detalle visualiza el div correspondiente de lo contrario abre un popUp 
 * @param {type} e
 * @returns {undefined}
 */
function editarElemento(e){     
    e.preventDefault();
    var divGrilla = e.delegateTarget.id;
    var grilla = $("#"+divGrilla).data("kendoGrid");
    item = grilla.dataItem(grilla.select());
    
    var esCabeceraDetalle = sessionStorage.getItem("esCabeceraDetalle");
    if(esCabeceraDetalle==="true"){        
        document.getElementById('divGrillaPrincipal').style.display = 'none';
        document.getElementById('divCabeceraDetalle').style.display = 'block';       
        crearTabla("popUpCabecera", "divCabecera", "label");
        cargarDatos(item, "label");
        var jsondsSIRinitial= JSON.parse(sessionStorage.getItem("dsSIRinitial"))
        for(var i=0; i< jsondsSIRinitial.dsSIRinitial.eesic_forms.length; i++){
            if(jsondsSIRinitial.dsSIRinitial.eesic_forms[i].forms_nom === "grillaDetalle"){
                document.getElementById('lbDetalle').innerHTML = jsondsSIRinitial.dsSIRinitial.eesic_forms[i].titulo; 
                
                var objData = new sirDataDetalle();    
                var jsonSIRDataDetalle = objData.getjson();
                var urlDataDetalle = objData.getUrlSir();
                var mapDataDetalle = objData.getmapSir();
                /**
                 * si el servicio tiene un nodo donde se envie información adicional se debe ingresar en esta parte
                 * var key1 = Object.keys(jsonSIRDataDetalle)[0];                
                 * var key2 = Object.keys(jsonSIRDataDetalle[key1])[1];
                 * jsonSIRDataDetalle[key1][key2][0].picsuc_cod = item.suc__cod;
                 * jsonSIRDataDetalle[key1][key2][0].pidped_fec = item.ped__fec;
                 * jsonSIRDataDetalle[key1][key2][0].piiped_num = item.ped__num;
                 */

                $.ajax({
                    async: false, 
                    type: "POST",
                    data: JSON.stringify(jsonSIRDataDetalle),
                    url: urlDataDetalle,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (e) {  
                        
                    } 
                }).done(function(e){         
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK")) {            
                        datosGrillaDetalle = e[key1][mapDataDetalle]["0"].eegpd_ped_det;
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    } 
                });
                grid(jsondsSIRinitial.dsSIRinitial.eesic_forms[i], datosGrillaDetalle , "gridDetalle"); 
            }
        }        
    }else{
        document.getElementById('lbAccion').innerHTML = "Editar";
        abrirCustomPopUp("popUpCabecera", "popUpCabecera", "input");        
        $("#buttonCab")["0"].childNodes["0"].data= "Actualizar";
        cargarDatos(item, "input");
    }    
}

/**
 * identifica cual es el item que se quiere editar y llama al metodo que abre el popUp
 * @param {type} e
 * @returns {undefined}
 */
function editarElementoDet(e){
    e.preventDefault();
    var divGrilla = e.delegateTarget.id
    var grilla = $("#"+divGrilla).data("kendoGrid");
    itemDetalle = grilla.dataItem(grilla.select());
    
    document.getElementById('lbAccionDet').innerHTML = "Crear";
    abrirCustomPopUp("popUpDetalle", "popUpDetalle", "input");        
    $("#buttonCrearDet")["0"].childNodes["0"].data= "Crear";
    cargarDatos(itemDetalle, "input");
}

/**
 * Hace una busqueda del lado del servidor.
 * @returns {undefined}
 */
function buscarElementos(){
    alertDialogs("buscarElementos");
}
/**
 * Crea/actualiza un elemento de la grilla principal
 * @returns {undefined}
 */
function crearElemento(){
    alertDialogs("crearElemento");
}
/**
 * Crea/actualiza un elemento de la grilla detalle
 * @returns {undefined}
 */
function crearElementoDet(){
    alertDialogs("crearElementoDet");
}
/**
 * Borra un elemento de la grilla principal
 * @param {type} e
 * @returns {undefined}
 */
function borrarElemento(e){
    alertDialogs("borrarElemento");
}
/**
 * Borra un elemento de la grilla detalle
 * @param {type} e
 * @returns {undefined}
 */
function borrarElementoDet(e){
    alertDialogs("borrarElementoDet");
}
/**
 * Cambia el estado un elemento de la grilla principal
 * @param {type} e
 * @returns {undefined}
 */
function cambiarEstado(e){
    alertDialogs("cambiarEstado");
}
/**
 * Cambia el estado un elemento de la grilla detalle
 * @param {type} e
 * @returns {undefined}
 */
function cambiarEstadoDet(e){
    alertDialogs("cambiarEstadoDet");
}



