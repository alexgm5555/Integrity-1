/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    
    
   var despacho = JSON.parse(sessionStorage.getItem("regDespacho"));
   
   document.getElementById('idNumeroDespacho').innerHTML = 'Nº '+despacho.dpc__num;
   document.getElementById('lbTransportista').innerHTML = despacho.con__nom;
   document.getElementById('lbFecha').innerHTML = despacho.dpc__fec;
   document.getElementById('lbCamion').innerHTML = despacho.pla__cod;
   document.getElementById('lbPeso').innerHTML = despacho.car__kgs;   
   document.getElementById('lbObservaciones').innerHTML = despacho.cab__obs;

   gridDetDespacho();
   
});

function gridDetDespacho(){
   
    var obj = new dsSIRdpc_det();
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
                    try {
                        if (operation === 'read') {
                            var key1 = Object.keys(json)[0];
                            var key2 = Object.keys(json[key1])[1];
                            json[key1][key2][0].dpc__num = JSON.parse(sessionStorage.getItem("regDespacho")).dpc__num;
                            json[key1][key2][0].dpc__fec = JSON.parse(sessionStorage.getItem("regDespacho")).dpc__fec;
                            json[key1][key2][0].suc__cod = JSON.parse(sessionStorage.getItem("regDespacho")).suc__cod;
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
                    id: "ped__num",
                    fields: {
                        ped__num: {type: 'number', editable: false},
                        ped__fec: {type: 'string', editable: false},
                        ter__nit: {type: 'string', editable: false},
//                        con__nom: {type: 'string', editable: false},
//                        pla__cod: {type: 'string', editable: false},                        
//                        dpc__car: {type: 'string', editable: false},                        
                    }
                }
            },            
        });
    $(window).trigger("resize");    
    
    $("#gridDetalleDespacho").kendoGrid({
        dataSource: dataSourceAsignarPedidos,
        selectable: true,                  
        columns: [                        
            {field: "ped__num", title: "Número pedido"},
            {field: "dpc__fec", title: "Fecha"},
            {field: "ter__nit", title: "NIT"},
//            {field: "con__nom", title: "Transportista"},            
//            {field: "pla__cod", title: "Camión"},           
//            {field: "dpc__car", title: "Orden"},
//            {field: "art__cant", title: "Cantidad en inventario"},
//            {command:[
//                    {name: "editar", click: facturarDespacho, template: "<a class='k-grid-editar'><span class='k-sprite po_checkCreate'></span></a>"},
//                    {name: "ver",  click: clickVer, template: "<a class='k-grid-ver'><span class='k-sprite po_preview'></span></a>"},
//                ],
//                width: "100px"
//            }
        ],        
    });
}

function volverDespachos(){
    var servicio="facruracionDespacho"    
    window.location.replace(( sessionStorage.getItem("url")+servicio+"/html/"+servicio+".html"));  
}

$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#gridDetalleDespacho').height(viewportHeight - 61);
});