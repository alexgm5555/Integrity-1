/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 100);                        
    $('#divPDF').height(viewportHeight - 100);
});

$(document).ready(function() {    
    saldos();
    $(window).trigger("resize"); 
});

function saldos(){     
    
    var obj = new sirSaldos();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(json),
        url: url,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {             
            var key1 = Object.keys(e)[0];
            if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                comprobante = e;
            } else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            }
        } 
    }).done(function(e){ 
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {    
            
                document.getElementById("logoEmpresaPDF").src = "data:image/png;base64," + e[key1].eeImages["0"].logocia;
                document.getElementById('lbSuscursal').innerHTML = e[key1].ttconsultasaldos["0"].Sucagencia;
                document.getElementById('lbCentroActividad').innerHTML = e[key1].ttconsultasaldos["0"].ctoactividad;
                document.getElementById('lbEmpleado').innerHTML = e[key1].ttconsultasaldos["0"].nombres;
                document.getElementById('lbCodigo').innerHTML = e[key1].ttconsultasaldos["0"].codempleado;                
                grid(e[key1].ttconsultasaldosdet);
            } else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            }        
    });
}

function getPDF(selector) {    
    var dropdownlist = $("#ipNomina").data("kendoDropDownList");
    kendo.drawing.drawDOM($(selector)).then(function(group){
        kendo.drawing.pdf.saveAs(group, "Historico vacaciones.pdf");
    });
}

function grid(data){
     
    var schema = {
        model: {
            numdoc: { type: "number" },
            fecdoc: { type: "string"},
            concepto: { type: "number" },
            descripcion: { type: "string" },
            fechavigencia: { type: "number" },
            valorcuota: { type: "number" },            
            acumulado: { type: "number" },            
            valortope: { type: "number" },
            saldo: { type: "number" },
            ultimatx: { type: "string" },
            apl: { type: "number" },
            Per: { type: "number" }
        }
    };
    
    var columns = [        
        
        { field: "numdoc", title: "Documento"},
        { field: "fecdoc", title: "Fecha"},        
        { field: "descripcion", title: "Descripción"},
        { field: "fechavigencia", title: "Vigencia"},
        { field: "valorcuota", title: "Valor<br>cuota", format:"{0:c0}"},        
        { field: "acumulado", title: "Acumulado", format:"{0:c0}"},
        { field: "valortope", title: "Valor<br>tope", format:"{0:c0}"},
        { field: "saldo", title: "Saldo", format:"{0:c0}"},
        { field: "ultimatx", title: "Última<br>transacción"},
        { field: "apl", title: "Apl."},
        { field: "Per", title: "Per."},
    ];
    var grid = $("#grid").kendoGrid({
        editable: false,
        sortable: false,
        scrollable: false,
        selectable: false,
        dataSource: {
            data: data,            
            schema: schema,            
        },
        columns: columns,
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html())
    });
}

