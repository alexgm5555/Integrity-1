/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var asigGuardada;
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 30);
    $('.k-grid-content').height(viewportHeight - 100);
});

$(document).ready(function() {   
    gridAsignacionPedidos();
});

function gridAsignacionPedidos(){
   
    var obj = new SIRgpd_pdet_asig();
    var jsonAsignarPedidos = obj.getjson();
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
                            var key1 = Object.keys(jsonAsignarPedidos)[0];
                            var key2 = Object.keys(jsonAsignarPedidos[key1])[1];
                            jsonAsignarPedidos[key1][key2][0].pidfecha = sessionStorage.getItem("fechaSistema");
                            return JSON.stringify(jsonAsignarPedidos);                        
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
                        ped__num: {type: 'string', editable: false},
                        cla__cod: {type: 'string', editable: false},
                        cla__des: {type: 'string', editable: false},
                        art__cod: {type: 'string', editable: false},
                        art__des: {type: 'string', editable: false},
                        ped__can: {type: 'string', editable: false},
                        ped__pend: {type: 'string', editable: false},
                        ped__aasi: {type: 'number', editable: true},
                        ped__fec: {type: 'string', editable: false}
                    }
                }
            },            
        });
    $("#gridAsignacionPedidos").kendoGrid({
        dataSource: dataSourceAsignarPedidos,
        selectable: false,  
        detailInit: detailInit,
        dataBound: function() {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [                        
            {field: "cla__des", title: "Clase articulo"},
            {field: "art__des", title: "Articulo"},           
            {field: "cla__apl__inv", title: "Maneja inventario"},
            {field: "art__cant", title: "Cantidad en inventario"},
            {command:[
                    {name: "editar", click: asignarTodoPedidos, template: "<a class='k-grid-editar'><span class='k-sprite po_checkCreate'></span></a>"},
                ],
                width: "50px"
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
    $(window).trigger("resize");  
    
    function asignarTodoPedidos(e){
        
        e.preventDefault();
        
        var grid = $("#gridAsignacionPedidos").data("kendoGrid");
        itemID = grid.dataItem(grid.select());
        
        var objUpdateReg = new SICUDgpd_pdet_asig();
        var jsonUpdateReg = objUpdateReg.getjson();
        var urlUpdateReg = objUpdateReg.getUrlSir();
        var mapDataUpdateReg = objUpdateReg.getMapData();
        
        var key1 = Object.keys(jsonUpdateReg)[0];
        var key2 = Object.keys(jsonUpdateReg[key1])[1];  
        
        for(var i= 0; i<itemID.eegpd_ped_det.length; i++){    
            
            if(!itemID.cla__apl__inv || itemID.eegpd_ped_det[i].ped__pend<=itemID.art__cant){
                jsonUpdateReg[key1][key2][i] = new Object();
                jsonUpdateReg[key1][key2][i].ped__fec = itemID.eegpd_ped_det[i].ped__fec;
                jsonUpdateReg[key1][key2][i].suc__cod = itemID.eegpd_ped_det[i].suc__cod;
                jsonUpdateReg[key1][key2][i].clc__cod = itemID.eegpd_ped_det[i].clc__cod;
                jsonUpdateReg[key1][key2][i].cla__cod = itemID.eegpd_ped_det[i].cla__cod;
                jsonUpdateReg[key1][key2][i].art__cod = itemID.eegpd_ped_det[i].art__cod;
                jsonUpdateReg[key1][key2][i].ped__num = itemID.eegpd_ped_det[i].ped__num;
                jsonUpdateReg[key1][key2][i].lis__num = itemID.eegpd_ped_det[i].lis__num;
                jsonUpdateReg[key1][key2][i].ped__aasi = itemID.eegpd_ped_det[i].ped__pend;
                if(itemID.cla__apl__inv){
                    itemID.art__cant = itemID.art__cant - itemID.eegpd_ped_det[i].ped__pend;
                }
            }
        }
        
        $.ajax({
            type: "PUT",
            data: JSON.stringify(jsonUpdateReg),
            url: urlUpdateReg,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) {
                var key1 = Object.keys(e)[0];
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    asigGuardada = e[key1].eeEstados[0].Estado;
                }
                
            },
            error: function (e) {
                console.log(JSON.stringify(e));
                alertDialogs("Error consumiendo el servicio de guardar\n"+ e.status +" - "+ e.statusText);
            }
        }).done(function(){
            if(asigGuardada==="OK"){
               location.reload();
            }
        });
        
        
        
    }
    
    
    
    function detailInit(e) {
        var dataSource = e.data.eegpd_ped_det    
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: dataSource,
            scrollable: false,
            columns: [
                {field: "ped__num", title: "Número de Pedido", hidden: true },
                {field: "cla__des", title: "Clase articulo"},
                {field: "art__des", title: "Articulo"},
                {field: "ped__can", title: "Cantidad solicitada"},
                {field: "ped__pend", title: "Pendiente", footerTemplate:  conditionalSum },
                {field: "ped__aasi", title: "Asignados", hidden: true},
                {field: "ped__fec", title: "fecha"},
            ]
        });
        
        function conditionalSum() { 
            var item, sum = 0;
            for (var idx = 0; idx < dataSource.length; idx++) {
                item = dataSource[idx];
                
                sum += item.ped__pend;
                          
            }
            return "Total pendientes: " + kendo.toString(sum, "n0");
        }
    }
}



