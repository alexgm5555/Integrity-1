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

$(document).ready(function () {
    hidePage();
    anoLiquidacion();
    $(window).trigger("resize");
});

function anoLiquidacion() {

    var obj = new sirConsultaAnoLiq();
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();


    $("#ipAnoLiq").kendoDropDownList({
        optionLabel: "Seleccione el año",
        dataTextField: "ano",
        dataValueField: "ano",
        template: '<div class="divElementDropDownList">#: data.ano #</div>',
        change: nomina,
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
                            return JSON.stringify(json);
                        }
                    } catch (e) {
                        alertDialogs("Error en el servicio " + e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data: function (e) {

                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs("Error en el servicio " + e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ano",
                    fields: {
                        ano: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " + xhr.xhr.status + " " + xhr.errorThrown);
            }
        }

    });
}

function nomina() {

    $("#ipNomina").removeClass();

    var obj = new sirConsultaNomina();
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();


    $("#ipNomina").kendoDropDownList({
        optionLabel: "Seleccione la nomina",
        dataTextField: "Descripcion",
        dataValueField: "nronomina",
        template: '<div class="divElementDropDownList">#: data.Descripcion #</div>',
        change: comprobante,
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
                            var key1 = Object.keys(json)[0];
                            var key2 = Object.keys(json[key1])[1];
                            json[key1][key2][0].piiyear = $("#ipAnoLiq").val();
                            return JSON.stringify(json);
                        }
                    } catch (e) {
                        alertDialogs( e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data: function (e) {

                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs( e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "nronomina",
                    fields: {
                        nronomina: {validation: {required: true}, type: 'string'},
                        Descripcion: {validation: {required: true}, type: 'string'},
                        fechaliquidacion: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " + xhr.xhr.status + " " + xhr.errorThrown);
            }
        }

    });
}

function comprobante() {

    var obj = new sirComprobante();
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();

    var key1 = Object.keys(json)[0];
    var key2 = Object.keys(json[key1])[1];

    var kendoDropDownListNomina = $("#ipNomina").data("kendoDropDownList");
    var dataItem = kendoDropDownListNomina.dataSource._data[kendoDropDownListNomina.selectedIndex - 1];

    json[key1][key2][0].piiyear = $("#ipAnoLiq").val();
    json[key1][key2][0].nronomina = $("#ipNomina").val();
    json[key1][key2][0].pidfecliq = dataItem.fechaliquidacion;

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
    }).done(function (e) {
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {

            document.getElementById("logoEmpresaPDF").src = "data:image/png;base64," + e[key1].eeImages["0"].logocia;
            document.getElementById('lbEmpleado').innerHTML = e[key1].ttconsultacomprobante["0"].nomempleado;
            document.getElementById('lbSucursal').innerHTML = e[key1].ttconsultacomprobante["0"].Sucagencia;
            document.getElementById('lbNumeroDocumento').innerHTML = e[key1].ttconsultacomprobante["0"].idempleado;
            document.getElementById('lbActividad').innerHTML = e[key1].ttconsultacomprobante["0"].ctoactividad;
            document.getElementById('lbCargo').innerHTML = e[key1].ttconsultacomprobante["0"].cargo;
            document.getElementById('lbSueldoBasico').innerHTML = kendo.toString(e[key1].ttconsultacomprobante["0"].sueldo, "c0");
            document.getElementById('lbFecha').innerHTML = e[key1].ttconsultacomprobante["0"].fechaperiodo;
            document.getElementById('lbFormaPago').innerHTML = e[key1].ttconsultacomprobante["0"].formapago + " " + e[key1].ttconsultacomprobante["0"].banco;
            document.getElementById('lbNetoDevengado').innerHTML = kendo.toString(e[key1].ttconsultacomprobante["0"].netodevengado, "c0");
            showPage();
            grid(e[key1].ttconsultacomprobantedet);
            
        } else {
            alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
        }
    });
}

function getPDF(selector) {
    var dropdownlist = $("#ipNomina").data("kendoDropDownList");
    kendo.drawing.drawDOM($(selector)).then(function (group) {
        kendo.drawing.pdf.saveAs(group, "Comprobante de pago " + dropdownlist.dataSource._data[dropdownlist.selectedIndex - 1].Descripcion + " " + $("#ipAnoLiq").val() + ".pdf");
    });
}

function grid(data) {

    var schema = {
        model: {
            codconcepto: {type: "string"},
            desconcepto: {type: "string"},
            base: {type: "number"},
            devtiempo: {type: "string"},
            devvalor: {type: "number"},
            dedtiempo: {type: "string"},
            dedvalor: {type: "number"},
            saldoacumulado: {type: "number"}
        }
    };

    var aggregate = [
        {field: "devvalor", aggregate: "sum"},
        {field: "dedvalor", aggregate: "sum"}
    ];


    var columns = [
        {field: "desconcepto", title: "Descripción", width: "100%", footerTemplate: "Totales"},
        {field: "base", title: "Base", width: 80, format: "{0:c0}"},
        {
            title: "Devengado",
            columns: [
                {field: "devtiempo", title: "Tiempo", width: "50px"},
                {field: "devvalor", title: "Valor", width: "80px", aggregates: ["sum"], footerTemplate: "#=kendo.toString(sum, 'c0')#"}
            ]
        },
        {
            title: "Deducciones",
            columns: [
                {field: "dedtiempo", title: "Tiempo", width: "50px"},
                {field: "dedvalor", title: "Valor", width: "80px", aggregates: ["sum"], footerTemplate: "#=kendo.toString(sum, 'c0')#"}
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

function hidePage() {
    document.getElementById("logoEmpresaPDF").src = "../../../images/espacio-95.png";
    $("#headerPdf").hide();
    $("#encabezado").hide();
    $("#bodyPdf").hide();
}
function showPage() {
    $("#headerPdf").show();
    $("#encabezado").show();
    $("#bodyPdf").show();
}