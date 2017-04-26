/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var asigGuardada;

//$(window).resize(function () {
//    var viewportHeight = $(window).height();
//    $('#outerWrapper').height(viewportHeight - 30);
//    $('.k-grid-content').height(viewportHeight - 100);
//});
function resizeGrid() {debugger
    var viewportHeight = $(window).height();
    var gridElement = $("#gridFacturacionDespachos");
    var dataArea = gridElement.find(".k-grid-content");
    var newHeight = gridElement.parent().innerHeight() - 2;
    var diff = gridElement.innerHeight() - dataArea.innerHeight();
    gridElement.height(viewportHeight-75);
    dataArea.height(newHeight);
}

$(window).resize(function(){
    resizeGrid();
}); 
$(document).ready(function() {   
    
    var obj = new dssic_clc();    
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    //carga el combo de sucursales
    $("#ipClaseDoc").kendoDropDownList({
        optionLabel: "Seleccione.....",
        dataTextField: "clc__nom",
        dataValueField: "clc__cod",
        template:'<div class="divElementDropDownList">#: data.clc__nom #</div>',
        dataBound: function (e){
          var dropdownlist = $("#ipSucursal").data("kendoDropDownList");
          dropdownlist.readonly();  
          dropdownlist.enable(false);  
        },
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            var key1 = Object.keys(objJson)[0];
                            var key2 = Object.keys(objJson[key1])[1];
                            objJson[key1][key2][0].piipor_cod_aso = sessionStorage.getItem("portafolio");                            
                            
                            return JSON.stringify(objJson);
                        }	
                    } catch (e) {
                        alertDialogs("Error en el servicio"+ e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "clc__cod",
                    fields: {
                        clc__cod: {validation: {required: true}, type: 'string'},
                        clc__nom: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }        
    });
    
    grisFacDespachos();
});

function grisFacDespachos(){
   
    var obj = new SIRdpc_cab();
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
        var dataSourceAsignarPedidos = new kendo.data.DataSource({
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST"                
                },
                parameterMap: function (options, operation) {
                    
                    var fecha= new Date(sessionStorage.getItem("fechaSistema"));
                    fecha.setHours(0,0,0,0);
                    var fechaIni= new Date(sessionStorage.getItem("fechaSistema"));
                    fechaIni.setDate(fecha.getDate() - 90);
    
                    try {
                        if (operation === 'read') {
                            return JSON.stringify(json);                        
                        }
                    } catch (e) {
                        alertDialogs("Error en el servicio" + e.message);
                    }
                }
            },
            schema: {           
                data: function (e) {                
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {                    
                        return e[key1][mapData];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }                
                },
                model: {
                    id: "dpc__num",
                    fields: {
                        dpc__num: {type: 'number', editable: false},
                        dpc__fec: {type: 'string', editable: false},
                        ter__nit: {type: 'string', editable: false},
                        con__nom: {type: 'string', editable: false},
                        pla__cod: {type: 'string', editable: false},                        
                        dpc__car: {type: 'string', editable: false},                        
                    }
                }
            },            
        });
    $(window).trigger("resize");    
    
    $("#gridFacturacionDespachos").kendoGrid({
        dataSource: dataSourceAsignarPedidos,
        selectable: false,                  
        columns: [                        
            {field: "dpc__num", title: "Número despacho"},
            {field: "dpc__fec", title: "Fecha"},
            {field: "ter__nit", title: "NIT"},
            {field: "con__nom", title: "Transportista"},            
            {field: "pla__cod", title: "Camión"},           
            {field: "dpc__car", title: "Orden"},
//            {field: "art__cant", title: "Cantidad en inventario"},
            {command:[
                    {name: "editar", click: mostrarCustomPopUp, template: "<a class='k-grid-editar'><span class='k-sprite po_checkCreate'></span></a>"},
                    {name: "ver",  click: clickVer, template: "<a class='k-grid-ver'><span class='k-sprite po_preview'></span></a>"},
                ],
                width: "100px"
            }
        ],
        editable:  {
            mode: "popup",
            window: {
                title: "Editar",
                animation: false,
                width: 600
            }
        }
    });
}

function facturarDespacho(e){
    var cla_cod = $("#ipClaseDoc").val();
    
    cerrarCustomPopUp()
    
    var objFacDespacho = new SICUDgfc_fac_dpc();
    var jsonjFacDespacho = objFacDespacho.getjson();
    var urlFacDespacho = objFacDespacho.getUrlSir();
    var mapFacDespacho = objFacDespacho.getMapData();
    
    var key1 = Object.keys(jsonjFacDespacho)[0];
    var key2 = Object.keys(jsonjFacDespacho[key1])[1];  
    
    var grid = $("#gridFacturacionDespachos").data("kendoGrid");
    var despachos; 
    var facturas;
    
    if(e){
        despachos = 1;
        e.preventDefault();
    }else{
        despachos = grid.dataSource._data.length;
    }
    for(var i= 0; i<despachos; i++){
        if (e){
            itemID = grid.dataItem(grid.select());
        }else{
            itemID = grid.dataSource._data[i];
        }
        
        jsonjFacDespacho[key1][key2][i] = new Object();
        jsonjFacDespacho[key1][key2][i].piindicador = itemID.piindicador;
        jsonjFacDespacho[key1][key2][i].clc__cod__fac = cla_cod;
        jsonjFacDespacho[key1][key2][i].act__cod = itemID.act__cod;
        jsonjFacDespacho[key1][key2][i].cab__obs = itemID.cab__obs;
        jsonjFacDespacho[key1][key2][i].cam__cod = itemID.cam__cod;
        jsonjFacDespacho[key1][key2][i].car__fec = itemID.car__fec;
        jsonjFacDespacho[key1][key2][i].car__kgs = itemID.car__kgs;
        jsonjFacDespacho[key1][key2][i].car__num = itemID.car__num;
        jsonjFacDespacho[key1][key2][i].car__val = itemID.car__val;
        jsonjFacDespacho[key1][key2][i].cial__cod = itemID.cial__cod;
        jsonjFacDespacho[key1][key2][i].ciu__cod = itemID.ciu__cod;
        jsonjFacDespacho[key1][key2][i].clc__cod = itemID.clc__cod;
        jsonjFacDespacho[key1][key2][i].com__con = itemID.com__con;
        jsonjFacDespacho[key1][key2][i].con__cc = itemID.con__cc;
        jsonjFacDespacho[key1][key2][i].con__nom = itemID.con__nom;
        jsonjFacDespacho[key1][key2][i].cpto__cod = itemID.cpto__cod;
        jsonjFacDespacho[key1][key2][i].cto__cod = itemID.cto__cod;
        jsonjFacDespacho[key1][key2][i].dpc__anu = itemID.dpc__anu;
        jsonjFacDespacho[key1][key2][i].dpc__car = itemID.dpc__car;
        jsonjFacDespacho[key1][key2][i].dpc__cor = itemID.dpc__cor;
        jsonjFacDespacho[key1][key2][i].dpc__est = itemID.dpc__est;
        jsonjFacDespacho[key1][key2][i].dpc__fec = itemID.dpc__fec;
        jsonjFacDespacho[key1][key2][i].dpc__fle = itemID.dpc__fle;
        jsonjFacDespacho[key1][key2][i].dpc__num = itemID.dpc__num;
        jsonjFacDespacho[key1][key2][i].dpc__rec = itemID.dpc__rec;
        jsonjFacDespacho[key1][key2][i].dpc__val = itemID.dpc__val;
        jsonjFacDespacho[key1][key2][i].fec__ant = itemID.fec__ant;
        jsonjFacDespacho[key1][key2][i].fec__cor = itemID.fec__cor;
        jsonjFacDespacho[key1][key2][i].fec__rec = itemID.fec__rec;
        jsonjFacDespacho[key1][key2][i].hor__ent = itemID.hor__ent;
        jsonjFacDespacho[key1][key2][i].pla__cod = itemID.pla__cod;
        jsonjFacDespacho[key1][key2][i].rec__cons = itemID.rec__cons;
        jsonjFacDespacho[key1][key2][i].rut__cod = itemID.rut__cod;
        jsonjFacDespacho[key1][key2][i].suc__cod = itemID.suc__cod;
        jsonjFacDespacho[key1][key2][i].ter__aret = itemID.ter__aret;
        jsonjFacDespacho[key1][key2][i].ter__cret = itemID.ter__cret;
        jsonjFacDespacho[key1][key2][i].ter__nit = itemID.ter__nit;
        jsonjFacDespacho[key1][key2][i].ter__ret = itemID.ter__ret;
        jsonjFacDespacho[key1][key2][i].ter__vret = itemID.ter__vret;
        jsonjFacDespacho[key1][key2][i].usr__cod = itemID.usr__cod;
        jsonjFacDespacho[key1][key2][i].usr__cod__r = itemID.usr__cod__r;
        jsonjFacDespacho[key1][key2][i].ven__cod = itemID.ven__cod;
    }
     
    $.ajax({
        type: "POST",
        data: JSON.stringify(jsonjFacDespacho),
        url: urlFacDespacho,
        dataType : "json",
        contentType: "application/json;",
        success: function (e) {
            var key1 = Object.keys(e)[0];
            if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
               facturas = e.dsSICUDfac_fac_dpc.eeSICUDfac_fac_dpc;                
            }
            
        },
        error: function (e) {            
            alertDialogs("Error consumiendo el servicio \n"+ e.status +" - "+ e.statusText);
        }
    }).done(function(){
        var mensaje = "Se generarón las facturas Nº: ";
        
        if (facturas.length===1){
            mensaje = "Se genero la factura Nº: ";
        }
        
        for (var i=0; i<facturas.length; i++){            
            if(i===facturas.length-1){
                mensaje = mensaje + facturas[i].fac__nro + ". Para imprimir vaya a 'Facturacion'.";
            }else{
                mensaje = mensaje + facturas[i].fac__nro + ", ";
            }
        }
        
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "Salir";            
        actions[0].action = salirDialog;     
        createDialog("Atención", mensaje, "400px", "auto", true, true, actions);
        
    });
}

function salirDialog(){
    location.reload()
}

function clickVer(e) {
    e = this.dataItem($(e.currentTarget).closest("tr"));    
    var servicio="despacho"
    sessionStorage.setItem("servicio",servicio);
    sessionStorage.setItem("regDespacho", JSON.stringify(e));
    window.location.replace(( sessionStorage.getItem("url")+"facruracionDespacho/html/"+servicio+".html"));   
}

function mostrarCustomPopUp() {
    $("body").append("<div id='disable'></div>");
    $("#customPopUp").fadeIn("slow");

}
function cerrarCustomPopUp() {
    $("#disable").fadeOut("slow");
    $("#customPopUp").fadeOut("slow");
    $( "#disable" ).remove();
//    $("#regalo").fadeOut("slow");
}