/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Funcion para ajustar el alto de la grilla 
 */
var inputs = [{
        id: "inputDescripcion",
        tipo: "string",
        read: "",
        nameServ: "tcont__des"
    }, {
        id: "inputManejaDiferidos",
        tipo: "logical",
        read: "",
        nameServ: "tcon_dif"
    }, {
        id: "inputConcepto",
        tipo: "servicio",
        read: "",
        nameServ: "tcont__cod"
    }, {
        id: "inputMonedaExtranjera",
        tipo: "logical",
        read: "",
        nameServ: "mnd__ext"
    }, {
        id: "inputTipoRegimen",
        tipo: "servicio",
        read: "",
        nameServ: "ter__reg"
    }, {
        id: "inputManejaPedido",
        tipo: "logical",
        read: "",
        nameServ: ""
    }, {
        id: "inputClaseDocumento",
        tipo: "servicio",
        read: "",
        nameServ: "clc__cod"
    }, {
        id: "inputFacturacion",
        tipo: "logical",
        read: "",
        nameServ: "tcont__fac"
    }];


$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 30);
    $('.k-grid-content').height(viewportHeight - 100);
});

$(document).ready(function () {

    formatoInputs(inputs, sessionStorage.getItem("contaRow"));
    comboConcepto("inputConcepto");
    comboDocumento("inputClaseDocumento");
});

/**
 *  Funcion para darle formato kendo a los input dependiendo del tipo de formato
 * @param {type} inputs json con los inputs en el html
 * @param {type} serv fila que obtiene de la paginma anterior 
 * @returns {undefined}
 */
function formatoInputs(inputs, serv) {
    for (var i = 0; i < inputs.length; i++) {
        if (serv) {
            var contaU = JSON.parse(serv);
            var stringCmp = contaU[inputs[i].nameServ];
            if (inputs[i].tipo === "logical") {
                if (contaU[inputs[i].nameServ] === true) {
                    stringCmp = "si";
                } else {
                    stringCmp = "no";
                }
            }
            $("#" + inputs[i].id).val(stringCmp);
        }
        if (inputs[i].tipo !== "servicio") {
            modTextboxPopupFl(inputs[i].id, inputs[i].tipo, inputs[i].read);
        }
    }
}

/**
 * funcion que crea un combo box con todos los campos disponibles en el reporte
 * @param {type} id del input donde quiero poner el comobox
 * @returns {undefined}
 */
function comboConcepto(id) {

    var optionSelect = $("#" + id).val();

    var obj = new sirConcepto();
    var objInput = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    var combo = $("#" + id).kendoComboBox({
        autoBind: true,
        filter: "startswith",
        placeholder: "Seleccione el Capitulo",
        dataTextField: "tcont__des",
        dataValueField: "tcont__cod",
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST",
                },
                parameterMap: function (options, operation) {
                    objInput["ttsic_cap"] = [options];
                    return JSON.stringify(objInput);
                }
            },
            batch: true,
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado.indexOf("OK") === 0) {
                        return e[key1][mapData];
                    } else {
                        alertDialog(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "tcont__des",
                    fields: {
                        cap__des: {validation: {required: true}, type: 'string'}
                    }
                }
            }
        }
    }).data("kendoComboBox");
    combo.value(optionSelect);
}

function comboDocumento(id) {

    var optionSelect = $("#" + id).val();

    var obj = new sirDocumentos();
    var objInput = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    var combo = $("#" + id).kendoComboBox({
        autoBind: true,
        filter: "startswith",
        placeholder: "Seleccione Clase Documento",
        dataTextField: "clc__nom",
        dataValueField: "clc__cod",
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST",
                },
                parameterMap: function (options, operation) {
                    return JSON.stringify(objInput);
                }
            },
            batch: true,
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado.indexOf("OK") === 0) {
                        return e[key1][mapData];
                    } else {
                        alertDialog(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "clc__cod",
                    fields: {
                        clc__nom: {validation: {required: true}, type: 'string'}
                    }
                }
            }
        }

    }).data("kendoComboBox");
    combo.value(optionSelect);
}
function clickGuadarCabecera() {

    var obj = {
        "dssic_tcont": {
            "eeDatos": [{
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "fiid": sessionStorage.getItem("picfiid")
                }],
            "eesic_tcont": [{
                    "tcont__fac": changeValBool($("#inputFacturacion").val()),
                    "tcont__form": "",
                    "tcon_dif": changeValBool($("#inputManejaDiferidos").val()),
                    "ter__reg": $("#inputTipoRegimen").val(),
                    "clc__cod": $("#inputClaseDocumento").val(),
                    "form__cod": "",
                    "mnd__ext": changeValBool($("#inputMonedaExtranjera").val()),
                    "tcont__cod": $("#inputConcepto").val(),
                    "tcont__des": $("#inputDescripcion").val(),
                    "tcont__est": 0,
                }]
        }
    };
    if (sessionStorage.getItem("contaRow")) {
        sendServCU("PUT", obj);
    } else {
        sendServCU("POST", obj);
    }
}

function sendServCU(verHtml, objJson) {
    var obj = new SICUDsic_tcont();
    var objInput = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    displayLoading("#content");
    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: verHtml,
        data: JSON.stringify(objJson),
        url: url,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {

            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            alertDialogs("Error al consumir el servicio de SICUDsic_tcont" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            alertDialogs("hola");
            closeLoading("#content");
        } else {
            closeLoading("#content");
            alertDialogs("Problemas con el creación de la cabecera de Contabilización .\n" + permitirIngreso);
        }
        $("#btnSaveFiltros").kendoButton({
            enable: true
        });
    });
}

function changeValBool(text) {
    if (text === "si") {
        return "true";
    } else {
        return "false";
    }
}