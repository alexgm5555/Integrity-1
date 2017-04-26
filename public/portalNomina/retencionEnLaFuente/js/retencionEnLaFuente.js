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
    retencionFuente();
    $(window).trigger("resize"); 
});


function retencionFuente(){     
    
    var obj = new sirRetencionFuente();    
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
                
            } else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            }
        } 
    }).done(function(e){         
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {            
                document.getElementById("logoEmpresaPDF").src = "data:image/png;base64," + e[key1].eeImages["0"].logocia;
                document.getElementById('lbEmpleado').innerHTML = e[key1].ttconsultaretefte["0"].nombres;
                document.getElementById('lbSucursal').innerHTML = e[key1].ttconsultaretefte["0"].sucagencia;
                document.getElementById('lbNumeroDocumento').innerHTML = e[key1].ttconsultaretefte["0"].codempleado;
                document.getElementById('lbSueldoBasico').innerHTML = kendo.toString(e[key1].ttconsultaretefte["0"].sueldo,"c0");
                document.getElementById('lbFechaIngreso').innerHTML = e[key1].ttconsultaretefte["0"].fecingreso;                
                document.getElementById('lbDedudcible').innerHTML = e[key1].ttconsultaretefte["0"].deducibleretencion;                
                document.getElementById('lbTipoRetención').innerHTML = e[key1].ttconsultaretefte["0"].tiporetencion
                document.getElementById('factorPrestacional').innerHTML = e[key1].ttconsultaretefte["0"].porcentaje + "%";
//                grid(e[key1].ttconsultareteftedet);
            } else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            }        
    });
}

function getPDF(selector) {    
    var dropdownlist = $("#ipNomina").data("kendoDropDownList");
    kendo.drawing.drawDOM($(selector)).then(function(group){
        kendo.drawing.pdf.saveAs(group, "Comprobante de pago "+dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].Descripcion+" "+$("#ipAnoLiq").val()+".pdf");
    });
}

function grid(data){
     
    var schema = {
        model: {
            codconcepto: { type: "string" },
            desconcepto: { type: "string"},
            base: { type: "number" },
            devtiempo: { type: "string" },
            devvalor: { type: "number" },            
            dedtiempo: { type: "string" },
            dedvalor: { type: "number" },
            saldoacumulado: { type: "number" }
        }
    };
    
    var aggregate = [
        { field: "devvalor", aggregate: "sum" },
        { field: "dedvalor", aggregate: "sum" }
    ];

    
    var columns = [        
        { field: "desconcepto", title: "Descripción", width: "100%", footerTemplate: "Totales" },
        { field: "base", title: "Base", width: 80, format:"{0:c0}"},
        { 
            title: "Devengado",
            columns: [
                { field: "devtiempo", title: "Tiempo", width: "50px"},
                { field: "devvalor", title: "Valor", width: "80px", aggregates: ["sum"], footerTemplate: "#=kendo.toString(sum, 'c0')#" }
            ]
        },
        {
            title: "Deducciones",
            columns: [
                { field: "dedtiempo", title: "Tiempo", width: "50px" },
                { field: "dedvalor", title: "Valor", width: "80px", aggregates: ["sum"], footerTemplate: "#=kendo.toString(sum, 'c0')#" }
            ]
        },
//        { field: "saldoacumulado", title: "Saldo<br>acumulado", width: "50px" }
    ];
    var grid = $("#grid").kendoGrid({
        editable: false,
        sortable: false,
        scrollable: false,
        selectable: false,
        dataSource: {
            data: data,            
            schema: schema,
            aggregate: aggregate,
        },
        columns: columns,
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html())
    });
}

