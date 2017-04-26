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
    vacaciones();
    $(window).trigger("resize"); 
});

function vacaciones(){     
    
    var obj = new sirVacaciones();    
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
                document.getElementById('lbSuscursal').innerHTML = e[key1].ttconsutavacaiones["0"].Sucagencia;
                document.getElementById('lbCentroActividad').innerHTML = e[key1].ttconsutavacaiones["0"].ctoactividad;
                document.getElementById('lbEmpleado').innerHTML = e[key1].ttconsutavacaiones["0"].nombres;
                document.getElementById('lbCodigo').innerHTML = e[key1].ttconsutavacaiones["0"].codempleado;
                document.getElementById('lbFechaIngreso').innerHTML = e[key1].ttconsutavacaiones["0"].fechaingreso;
                document.getElementById('lbSalario').innerHTML = kendo.toString(e[key1].ttconsutavacaiones["0"].salactual,"c0");
                document.getElementById('lbVigenciaSueldo').innerHTML = e[key1].ttconsutavacaiones["0"].fechavigencia;
                grid(e[key1].ttconsutavacaionesdet);
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
            fechainicio: { type: "string" },
            fechafin: { type: "string"},
            diasdisfrutados: { type: "number" },
            diastomados: { type: "number" },
            diasdinero: { type: "number" },
            valorpagado: { type: "number" },            
            numeronomina: { type: "number" },            
            fechainiperiodo: { type: "string" },
            fechafinperiodo: { type: "string" },
            periodoscumplidos: { type: "number" },
            anticipos: { type: "number" }
        }
    };
    
    var columns = [        
        { 
            title: "Vacaciones",
            columns: [
                { field: "fechainicio", title: "Inicio"},
                { field: "fechafin", title: "Fin"}
            ]
        },
        { field: "diasdisfrutados", title: "Días<br>disfrutados"},
        { field: "diastomados", title: "Días<br>tomados"},        
        { field: "diasdinero", title: "Días<br>dinero", format:"{0:c0}"},
        { field: "valorpagado", title: "Valor<br>pagado", format:"{0:c0}"},
        { field: "numeronomina", title: "Nomina"},
        {
            title: "Periodo",
            columns: [
                { field: "fechainiperiodo", title: "Inicio"},
                { field: "fechafinperiodo", title: "Fin"}
            ]
        },
        { field: "periodoscumplidos", title: "periodos<br>cumplidos",},
        { field: "anticipos", title: "Anticipos"},
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

