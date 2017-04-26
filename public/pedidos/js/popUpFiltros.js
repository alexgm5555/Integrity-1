/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {    
    $("#ipfechaFin").kendoDatePicker({
//        open: function () {
//            var calendar = this.dateView.calendar;
//            calendar.wrapper.width(this.wrapper.width() - 6);
//        },
        culture: "es-CO",
        format: "yyyy/MM/dd",
        max: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"],
        footer: false
    });
    
    var estadosPedido = [
        { text: "Todos", value: "-1" },
        { text: "Creado", value: "1" },
        { text: "Aprobado", value: "2" },
        { text: "Asignado", value: "3" },
        { text: "Despachado", value: "4" },        
        { text: "Facturado", value: "5" },
        { text: "Anulado", value: "6" },
        { text: "Cerrado", value: "7" },
    ];
    
    
    $("#ipEstadoPedido").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: estadosPedido,
        index: 0,
        
    });

    $("#btBuscar").kendoButton({
        click: buscarPedidos
    });
});




function buscarPedidos() {
    var obj = new sirConsultaPedidos();
    var jsonFiltroPedidos = obj.getjson();
    var urlRepo = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    var key1 = Object.keys(jsonFiltroPedidos)[0];
    var key2 = Object.keys(jsonFiltroPedidos[key1])[1];
    jsonFiltroPedidos[key1][key2][0].pidped_fec = $("#ipfechaFin").val();
    jsonFiltroPedidos[key1][key2][0].piiped_num = $("#ipNumeroPedido").val();
    jsonFiltroPedidos[key1][key2][0].piiped_est = $("#ipEstadoPedido").val();
    jsonFiltroPedidos[key1][key2][0].pilhastapr = true;
    sessionStorage.setItem("jsonFiltroPedidos", JSON.stringify(jsonFiltroPedidos));    
    parent.grid();
    parent.closePopUpFiltros();
}