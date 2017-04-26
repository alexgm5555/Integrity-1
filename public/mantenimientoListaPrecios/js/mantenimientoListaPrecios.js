/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var dsSIRgfc_fac = new Object();
dsSIRgfc_fac.dsSIRgfc_fac = new Object();
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos = new Array();
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0] = new Object();
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].fiid = sessionStorage.getItem("picfiid");
dsSIRgfc_fac.dsSIRgfc_fac.eetemp = new Array();
dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0] = new Object();
var est = "lis__est";

$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 30);
    $('.k-grid-content').height(viewportHeight - 100);
});

$(document).ready(function () {
    var fechaFin = new Date(sessionStorage.getItem("fechaSistema"));
    fechaFin.setHours(0, 0, 0, 0);
    var fechaIni = new Date(sessionStorage.getItem("fechaSistema"));
    fechaIni.setDate(fechaFin.getDate() - 90);

    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_ini = fechaIni;
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_fin = fechaFin;
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_ini = "3160";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_fin = "3170";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_est = "99";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picter_nit = "*";

    gridListaDePrecios();
    var data = [
        {text: "Todos", value: "-1", clase: ""},
        {text: "Creado", value: "99", clase: "po_checkCreate"},
        {text: "Activo", value: "0", clase: "po_checkAct"},
        {text: "Bloqueado", value: "1", clase: "po_checkBloq"}
    ];
    $("#fltrFIn").kendoDatePicker({
        open: function () {
            var calendar = this.dateView.calendar;
            calendar.wrapper.width(this.wrapper.width() - 6);
        },
        change: onChangeFltr,
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"]
    });
    $("#fltrFIn").val(sessionStorage.getItem("fechaSistema"));
    $("#fltrEst").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        change: onChangeFltr,
        valueTemplate: "<span>#:data.text#</span>",
        template: "<a class='k-grid-aprobar' '><span class='k-sprite #: data.clase #'></span></a>" +
                '<span class="k-state-default"><h0>#: data.text #</h0>',
        dataSource: data,
        width: 400
    });
});

function onChangeFltr() {
    var json = {
        "dsSIRgpr_lis": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRgpr_lis": [
                {
                    "picart_cod": "*",
                    "piicla_cod": 0,
                    "piilis_num": 0,
                    "picmnd_cla": "*",
                    "piilis_est": $("#fltrEst").val(),
                    "pidfecha": $("#fltrFIn").val(),
                }
            ]
        }
    }
    var obj = new SIRgpr_lis();
    obj.setjson(json);
    var objLPrecios = obj.getjson();
    gridListaDePrecios(json);
}

function gridListaDePrecios(jsonSir) {
    var obj = new SIRgpr_lis();
    var objLPrecios = obj.getjson();
    var urlSir = obj.getUrlSir();
    var mapData = obj.getMapData();

    var objCU = new SICUDgpr_lis();
    var objD = objCU.getjson();
    var urlD = objCU.getUrlSir();
    var mapDataD = objCU.getMapData();
    if (jsonSir) {
        objLPrecios = jsonSir;
    }

    dataSourceLPrecios = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSir,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: "POST"
            },
            destroy: {
                url: urlD,
                type: "delete",
                dataType: "json",
                contentType: "application/json"
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
//                        objLPrecios["obj"] = [options];
                        return JSON.stringify(objLPrecios);
                    } else if (operation === 'destroy') {
                        var key1 = Object.keys(objD)[0];
                        objD[key1][mapDataD] = [options];
                        return JSON.stringify(objD);
                    }
                } catch (e) {
                    alertDialogs("Error en el servicio" + e.message);
                }
            }
        },
        schema: {
            type: "json",
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    return e[key1][mapData];
                } else {
                    alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "lis__num",
                fields: {
                    lis__des: {validation: {required: true}, type: 'string'},
                    lis__fin: {validation: {required: true}, type: 'string'},
                    lis__ffi: {validation: {required: true}, type: 'string'},                    
                }
            }
        }
    });
    $(window).trigger("resize");
    $("#grid").kendoGrid({
        dataSource: dataSourceLPrecios,
        dataBound: function () {
            var listasPrecio = dataSourceLPrecios.data();
            changImgFunc(listasPrecio);
        },
        selectable: false,
        columns: [
            {field: "lis__cod", title: "Código Lista",width: "170px"},
            {field: "lis__des", title: "Descripción Lista"},
            {field: "lis__fin", title: "Fecha Inicial"},
            {field: "lis__ffi", title: "Fecha Vencimiento"},            
            {command:
                        [
                            {name: "aprobar", text: " ", click: aprobarListaPrecios, template: "<a class='k-grid-aprobar' '><span class='k-sprite po_cerrar'></span></a>"},
                            {name: "editar", text: " ", click: editarListaPrecios, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                            {name: "copy", click: clickCopiar, template: "<a class='k-grid-copy' href='' style='min-width:16px;'><span class='k-sprite po_copy'></span></a>"},
                            {name: "destroyed", click: clickEliminar, template: "<a class='k-grid-destroyed' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"}
                        ],
                width: "170px"}],
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplateListaPrecios").html()),
        altRowTemplate: kendo.template($("#altRowTemplateListaPrecios").html()),
    });


}

function aprobarListaPrecios(e) {
    try {
        var fila = $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];
        e.preventDefault();
        var dataItem = fila;


        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if (fila.lis__est !== 1) {
                if (fila.lis__est === 99) {
                    fila.lis__est = 0;
                } else {
                    fila.lis__est = fila.lis__est + 1;
                }
            }
            sendAjaxLpre("PUT", [fila]);
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de modificar el estado del registro ---" + fila.lis__des + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}


function editarListaPrecios(e) {
    e.preventDefault();
    var listaPrecios = this.dataItem($(e.currentTarget).closest("tr"));

    sessionStorage.removeItem("opeListPre");
    sessionStorage.setItem("opeListPre", "edit");
    var servicio = "listaPrecios";
    sessionStorage.setItem("servicio", servicio);
    sessionStorage.setItem("listaPrecios", JSON.stringify(listaPrecios));
    window.location.replace((sessionStorage.getItem("url") + "mantenimientoListaPrecios/html/" + servicio + ".html"));
}

function clickEliminar(e) {
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));

        if (dataItem[est] == 99) {
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            dataSource.remove(dataItem);
            dataSource.sync();
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.lis__des + " ---?", "400px", "200px", true, true, actions);
        }else{
            alertDialogs("El registro no puede ser eliminado.")
        }
    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}

function clickCopiar(e){
    var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
    e.preventDefault();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));
    sendAjaxAddCmpCon("POST",dataItem);
}

function crearListaPrecios() {

    sessionStorage.removeItem("opeListPre");
    sessionStorage.setItem("listaPrecios", "{'lis__num':'0'}");
    sessionStorage.setItem("opeListPre", "create");
    var servicio = "listaPreciosCabecera";
    sessionStorage.setItem("servicio", servicio);

    $("body").append("<div id='windowCab'></div>");
    var myWindow = $("#windowCab");
    var undo = $("#undo");

    function onCloseCabecera() {
        document.getElementById("windowCab").remove();
        undo.fadeIn();
    }
   $("body").append("<div id='disable'></div>");
    
    mostrarCustomPopUp();
//    window.location.replace((sessionStorage.getItem("url") + "mantenimientoListaPrecios/html/" + servicio + ".html"));
}





function closePopUpFiltros() {
    $("#windowFiltros").data("kendoWindow").close();
}

function changImgFunc(listasPrecio) {

    for (var i = 0; i < listasPrecio.length; i++) {
        var id = listasPrecio[i].lis__num;        
        if (listasPrecio[i].lis__est === 0) {
            $("#aprobar" + id + "")["0"].className = "k-sprite po_checkAct";
        } else if (listasPrecio[i].lis__est === 1) {
            $("#aprobar" + id + "")["0"].className = "k-sprite po_checkBloq";
        } else if (listasPrecio[i].lis__est === 99) {
            $("#aprobar" + id + "")["0"].className = "k-sprite po_checkCreate";
        }
    }
}



function cabGuard(jsonResp) {


    sessionStorage.removeItem("opeListPre");
    sessionStorage.setItem("opeListPre", "edit");
    var servicio = "listaPrecios";
    sessionStorage.setItem("servicio", servicio);
    sessionStorage.setItem("listaPrecios", jsonResp);
    window.location.replace((sessionStorage.getItem("url") + "mantenimientoListaPrecios/html/" + servicio + ".html"));

    var myWindow = $("#windowCab");
    myWindow.data("kendoWindow").close();
}

function sendAjaxLpre(verHtml, obj) {
    var objCU = new SICUDgpr_lis();
    var objD = objCU.getjson();
    var urlD = objCU.getUrlSir();
    var mapDataD = objCU.getMapData();
    var key1 = Object.keys(objD)[0];
    objD[key1][mapDataD] = obj;

    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: verHtml,
        data: JSON.stringify(objD),
        url: urlD,
        async: false,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
            bandAlert = 0;
        },
        error: function (e) {
            alertDialogs("Error al consumir el servicio de crear lista de precios" + e.status + " - " + e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        } else {
            alertDialogs("Problemas con el creación de crear lista de precios .\n" + permitirIngreso);
        }

    });
}

function sendAjaxAddCmpCon(verHtml,obj) {
    var objCU = new SICUDgpr_lis();
    var objD = objCU.getjson();
    var urlD = objCU.getUrlSir();
    var mapDataD = objCU.getMapData();
    var key1 = Object.keys(objD)[0];
    objD[key1][mapDataD][0] = obj;

    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: verHtml,
        data: JSON.stringify(objD),
        url: urlD,
        async: false,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            alertDialogs("Error al consumir el servicio de crear lista de precios" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            var key1 = Object.keys(jsonResp)[0];
            cabGuard(JSON.stringify(jsonResp[key1][mapDataD][0]));
        } else {
            alertDialogs("Problemas con el creación de crear lista de precios .\n" + permitirIngreso);
        }

    });
}

function mostrarCustomPopUp() {
    $("#customPopUp").fadeIn("slow");
    onloadPopUpCabecera();

}
function cerrarCustomPopUp() {
    $("#disable").fadeOut("slow");
    $("#customPopUp").fadeOut("slow");
    $( "#disable" ).remove();
//    $("#regalo").fadeOut("slow");
}