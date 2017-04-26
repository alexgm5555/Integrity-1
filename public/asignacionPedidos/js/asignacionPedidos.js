/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(window).resize(function () {
    
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 30);
    $('.k-grid-content').height(viewportHeight - 100);
});

$(document).ready(function() {   
    gridAsignacionPedidos();
});

function gridAsignacionPedidos(){
   
    var obj = new sirConsultaAsignarPedidos();
    var jsonAsignarPedidos = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    var objUpdateReg = new SICUDAsignarPedidos();
    var jsonUpdateReg = objUpdateReg.getjson();
    var urlUpdateReg = objUpdateReg.getUrlSir();
    var mapDataUpdateReg = objUpdateReg.getMapData();

    var dataSourceAsignarPedidos = new kendo.data.DataSource({
        transport: {
            read: {
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: "POST"                
            },
            update: {
                url: urlUpdateReg,
                dataType: "json",
                type: "PUT",
                contentType: "application/json"
            },
            parameterMap: function (options, operation) {
                
                var fecha= new Date(sessionStorage.getItem("fechaSistema"));
                fecha.setHours(0,0,0,0);
                var fechaIni= new Date(sessionStorage.getItem("fechaSistema"));
                fechaIni.setDate(fecha.getDate() - 90);

                try {
                    if (operation === 'read') {
                        var key1 = Object.keys(jsonAsignarPedidos)[0];
                        var key2 = Object.keys(jsonAsignarPedidos[key1])[1];
                        jsonAsignarPedidos[key1][key2][0].pidfecha = fechaIni;//sessionStorage.getItem("fechaSistema");
                        return JSON.stringify(jsonAsignarPedidos);                        
                    }
                    if (operation === "update") {
                        var key1 = Object.keys(jsonUpdateReg)[0];
                        var key2 = Object.keys(jsonUpdateReg[key1])[1];                        
                        jsonUpdateReg[key1][key2][0].ped__fec = options.ped__fec;
                        jsonUpdateReg[key1][key2][0].suc__cod = options.suc__cod;
                        jsonUpdateReg[key1][key2][0].clc__cod = options.clc__cod;
                        jsonUpdateReg[key1][key2][0].cla__cod = options.cla__cod;
                        jsonUpdateReg[key1][key2][0].art__cod = options.art__cod;
                        jsonUpdateReg[key1][key2][0].ped__num = options.ped__num;
                        jsonUpdateReg[key1][key2][0].lis__num = options.lis__num;
                        jsonUpdateReg[key1][key2][0].ped__aasi = options.ped__aasi;
                        return JSON.stringify(jsonUpdateReg);
                    }
                } catch (e) {
                    alertDialogs("Error en el servicio" + e.message);
                }
            }
        },
        requestEnd: function(e) {
            
            var response = e.response;
            var type = e.type;
            if(type==="update"){
                location.reload();
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
                    ped__num: {type: 'string', editable: false},
                    cla__cod: {type: 'string', editable: false},
                    cla__des: {type: 'string', editable: false},
                    art__cod: {type: 'string', editable: false},
                    art__des: {type: 'string', editable: false},
                    ped__can: {type: 'string', editable: false},
                    ped__pend: {type: 'number', editable: false},
                    ped__aasi: {type: 'number', editable: true},
                    ped__fec: {type: 'string', editable: false}
                }
            }
        },
        group: { field: "ped__num"}
    });       
    $("#gridAsignacionPedidos").kendoGrid({
        dataSource: dataSourceAsignarPedidos,        
        batch: false,
        selectable: false,
        columns: [            
            {field: "ped__num", title: "Número de Pedido", hidden: true },
            {field: "cla__des", title: "Clase articulo"},
            {field: "art__des", title: "Articulo"},
            {field: "ped__can", title: "Cantidad solicitada"},
            {field: "ped__pend", title: "Pendiente"},
            {field: "ped__aasi", title: "Asignados", hidden: true, },
            {field: "ped__fec", title: "fecha"},
            {command:[
                    {id: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},                    
                ],
                width: "50px"}
        ],
        editable:  {
            mode: "popup",
            window: {
                title: "Editar",
                animation: false,
                width: 600
            }
        } ,
        edit: function(e) {
            if (!e.model.isNew()) {
               
                e.container.find("input[name=ped__aasi]").removeClass();
                e.container.find("input[name=ped__aasi]").kendoNumericTextBox({format: "n0", decimals: 0, max: e.model.ped__pend, min:0});//editarCampos();
                
            }           
        } ,
    });
    $(window).trigger("resize"); 
}



