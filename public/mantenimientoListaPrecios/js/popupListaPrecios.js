/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var art_cod;
var pre_pcod;
var est = "lis__est";
$(document).ready(function () {
    $("#btAgregar").kendoButton();
    $("#btCancelar").kendoButton();
    if (JSON.parse(sessionStorage.getItem("listaPrecios"))[est] !== 99) {
        kendo.ui.progress($('table'), true);
        $('table').find(".k-loading-image").css("background-image", "url('')");
    }
    var authdsinv_cla = new Object();
    authdsinv_cla.dsinv_cla = new Object();
    authdsinv_cla.dsinv_cla.eeDatos = new Array();
    authdsinv_cla.dsinv_cla.eeDatos[0] = new Object();
    authdsinv_cla.dsinv_cla.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    authdsinv_cla.dsinv_cla.eeDatos[0].fiid = sessionStorage.getItem("picfiid");
    authdsinv_cla.dsinv_cla.eetemp = new Array();
    authdsinv_cla.dsinv_cla.eetemp[0] = new Object();

    $("#idClaseArticulo").kendoDropDownList({
        dataTextField: 'cla__des',
        dataValueField: 'cla__cod',
        optionLabel: "Seleccionar clase de articulo...",
        
        change: onChangeClase,
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: ipServicios + baseParameters + "SIRinv_cla",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        authdsinv_cla.dsinv_cla.eetemp[0].picsuc_cod = "00101";
                        if (operation === 'read') {
                            authdsinv_cla["eeinv_cla"] = [options];
                            return JSON.stringify(authdsinv_cla);
                        }
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data: function (e) {
                    if (e.dsinv_cla.eeEstados[0].Estado === "OK") {
                        return e.dsinv_cla.eeinv_cla;
                    } else {
                        alertDialogs(e.dsinv_cla.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cla__cod",
                    fields: {
                        cla__cod: {validation: {required: true}, type: 'number'},
                        cla__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " + xhr.xhr.status + " " + xhr.errorThrown);
            }
        }
    });

    var obj = new SIRinv_art();
    var objArt = obj.getjson();
    var urlSir = obj.getUrlSir();
    var mapData = obj.getMapData();

    $("#idArticulo").kendoAutoComplete({
        dataTextField: 'art__des',
        optionLabel: "Seleccionar articulo...",
        minLength: 3,
        filter: "contains",
        select: onSelectArt,
        dataBound: onDataBoundArticulo,
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: urlSir,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {

                    var key1 = Object.keys(objArt)[0];
                    var key2 = Object.keys(objArt[key1])[1];
                    objArt[key1][key2][0].piicla_cod = $("#idClaseArticulo").val();
                    objArt[key1][key2][0].picart_des = $("#idArticulo").val();
                    try {
                        if (operation === 'read') {
                            return JSON.stringify(objArt);
                        }
                    } catch (e) {
                        alertDialogs("Error" + e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapData];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "art__des",
                    fields: {
                        art__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " + xhr.xhr.status + " " + xhr.errorThrown);
            }
        }
    });

    var objP = new SIRgpr_pre();
    var objArtP = objP.getjson();
    var urlSirP = objP.getUrlSir();
    var mapDataP = objP.getMapData();
    
    $("#idPresentacion").kendoDropDownList({
        dataTextField: 'pre__des',
        dataValueField: "pre__pcod",
        optionLabel: "Seleccionar Presentación...",
        select: onSelectPres,
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: urlSirP,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            var key1 = Object.keys(objArtP)[0];
                            var key2 = Object.keys(objArtP[key1])[1];
                            objArtP[key1][key2][0].piipre__est = 0
                            return JSON.stringify(objArtP);
                        }
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapDataP];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "pre__pcod",
                    fields: {
                        pre__pcod: {validation: {required: true}, type: 'string'},
                        pre__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " + xhr.xhr.status + " " + xhr.errorThrown);
            }
        }
    });
    
    var objDivisa = new SIRsic_mnd();
    var jsonDivisa = objDivisa.getjson();
    var urlSirDivisa = objDivisa.getUrlSir();
    var mapDataDivisa = objDivisa.getMapData();
    
    $("#idDivisa").kendoDropDownList({
        dataTextField: 'mnd__des',
        dataValueField: "mnd__cla",
        optionLabel: "Seleccionar Moneda...",
        select: onSelectPres,
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: urlSirDivisa,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            return JSON.stringify(jsonDivisa);
                        }
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapDataDivisa];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "mnd__cla",
                    fields: {
                        mnd__des: {validation: {required: true}, type: 'string'},
                        mnd__cla: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " + xhr.xhr.status + " " + xhr.errorThrown);
            }
        }
    });
    
    

    if (sessionStorage.getItem("objEditDet")) {
        obj = JSON.parse(sessionStorage.getItem("objEditDet"));

        $("#idClaseArticulo").data("kendoDropDownList").value(obj.cla__cod);
        $("#idArticulo").data("kendoAutoComplete").value(obj.art__des);
        art_cod = obj.art__cod;
        $("#idPrecio").val(parseInt(obj.lpd__pre));
        pre_pcod = obj.pre__pcod;
        $("#idPresentacion").data("kendoDropDownList").value(obj.pre__pcod);
        $("#idDivisa").data("kendoDropDownList").value(obj.mnd__cla);
        $("#idDescuentoMax").val(parseInt((obj.top__dct)*100));
    }
    $("#idDescuentoMax").kendoNumericTextBox({
        format: "# \\%",
        min: 0
    });
    $("#idPrecio").kendoNumericTextBox({
        format: "c0",
        min: 0
    });
});
function onChangeClase(e) {
    $("#idArticulo").parent().removeClass(".k-input");
    $("#idArticulo").data("kendoAutoComplete").value('');
}

function onDataBoundArticulo() {
    $("#idArticulo").data("kendoAutoComplete");
}

function onSelectArt(e) {
    art_cod = e.dataItem.art__cod;

}

function onSelectPres(e) {    
    pre_pcod = e.dataItem.pre__pcod;
}
function btnCancelar() {
    parent.closePopUp();
}

function agregarPrecio() {
    var obj = [
        {
            "lis__num": JSON.parse(sessionStorage.getItem("listaPrecios")).lis__num,
            "cla__cod": $("#idClaseArticulo").data("kendoDropDownList").value(), //clase Articulo servicio 
            "cla__des": $("#idClaseArticulo").data("kendoDropDownList").text(), //desdcripocion
            "art__cod": art_cod, //cod servicio Articulo
            "art__des": $("#idArticulo").data("kendoAutoComplete").value(), //des
            "lpd__pre": $("#idPrecio").val(), //precio
            "lpd__esd": "1",
            "top__dct": $("#idDescuentoMax").val()/100,
            "lpd__esh": "9999999",
            "mnd__cla": $("#idDivisa").data("kendoDropDownList").value(),
            "pre__pcod": pre_pcod,
            "pre__des": $("#idPresentacion").data("kendoDropDownList").text(), //servicio presentacion
        }
    ];    
    parent.CUGrilla(obj, sessionStorage.getItem("operaDEtalle"));

    parent.closePopUp();

}

