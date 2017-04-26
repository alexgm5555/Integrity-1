/* global kendo */

var globalCmp = {};//guarda todos los campos disponibles en el reporte 
var globalCon = {};//guarda todos las condiciones disponibles en el reporte 
var globalCmpSelect = {};//guarda el campo que selecciono para la condicion 
var objConDel = [];
var objConAdd = [];
var objConEdit = [];
//var filtrosCampos = [];
var conciones = "";
var idIniCon = -1;
var cmp_ini = "";
var inputCon = [{
        "cmp_con_ono": "",
        "cmp_con_ope": "",
        "cmp_fin_nom": "",
        "cmp_ini": "",
        "cmp_ini_nom": "",
        "rpt_cmp_pos": sessionStorage.getItem("idDato"),
        "rpt_con_pos": "",
        "rpt_id": sessionStorage.getItem("idRepo")
    }];
function onloadPopUpCond() {
    globalCmp = {};//guarda todos los campos disponibles en el reporte 
    globalCon = {};//guarda todos las condiciones disponibles en el reporte 
    objConDel = [];
    objConAdd = [];
    objConEdit = [];
    //var filtrosCampos = [];
    conciones = "";
    idIniCon = -1;
    cmp_ini = "";
    $("cmpValoCond1").val();
    $("conOpeCond1").val();
    $("cmpValCond1").val();
//    $('#popUpCond').css("height",$('#customPopUp').context.children["0"].clientHeight-230 + "px");
    sessionStorage.setItem("opcFl", "Con");
    document.getElementById('tituloPopUp').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sessionStorage.getItem("cmpNom");
    $('#imgOpc').removeClass('re_compon').addClass('re_conon');
    $("#popUpCond").show();
    $("#btnCrearCond").show();
    llenarComboCmp();//lleno el primer combo pero tambien miro si tiene condiciones y creo los respectyivos campos

}
/**
 * funcion invocada por el boton ok
 * @returns {undefined}
 */
function clicBtnCerrar() {
    parent.reloadGrid();
}
/**
 * funcion que modifica un input en un combobox con ptodos los campos disponibles en el reporte
 * @returns {undefined}
 */
function llenarComboCmp() {
    var objRepo = getinputRestRepoGridCmp();
    var url = geturlRestRepoGridCmp();
    var mapData = getmapDataRestRepoGridCmp();
    var mapDataCon = "eerep_rpt_con";

    var campo = $("#cmpValoCond1").kendoComboBox({
        filter: "contains",
        placeholder: "Seleccione Uno",
        dataTextField: "rpt_cmp_vis",
        dataValueField: "rpt_cmp_vis",
        select: select,
        dataBound: showConExt,
        dataSource: {
            transport: {
                read: {
                    async: false,
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST",
                },
                parameterMap: function (options, operation) {
                    objRepo["anx_cmp_id"] = [options];
                    return JSON.stringify(objRepo);
                }
            },
            batch: false,
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado.indexOf("OK") === 0) {
                        globalCmp = e[key1][mapData];
                        globalCon = e[key1][mapDataCon];
                        globalCmp = globalCmp.filter(function (obj) {
                            return obj.rpt_cmp_vis !== sessionStorage.getItem("cmpNom");
                        });
                        return globalCmp;
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cmp_id",
                    fields: {
                        rpt_cmp_vis: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (e) {
                alertDialogs(e.errorThrown);
            }
        }
    }).data("kendoComboBox");

}
/**
 * funcion para mnostrar las condiciones que ya vienen guardadas en el servicio
 * @param {type} e 
 * @returns {undefined}
 */
function showConExt(e) {
    $("#operaciones").empty();
    var obj = JSON.parse(sessionStorage.getItem("obj"));
    var idCon = obj.rpt_cmp_pos;
    var comboCmpIni = $("#" + "cmpValoCond1").data("kendoComboBox");
    var j = 0; // variable de bandera para buscar la primer ope de concion seleccionada
    if (globalCon) {
        for (var i = 0; i < globalCon.length; i++) {
            if (idCon == globalCon[i].rpt_cmp_pos) {
                if (j === 0) {
                    comboCmpIni.value(globalCon[i].cmp_ini_nom);
                    cmp_ini = globalCon[i].cmp_ini;
                    idIniCon = i;
                    crearComboOpe("conOpeCond1");
                    crearComboCmp("cmpValCond1");
                    var conOpe0 = $("#" + "conOpeCond1").data("kendoComboBox");
                    var cmpVal0 = $("#" + "cmpValCond1").data("kendoComboBox");
                    conOpe0.value(globalCon[i].cmp_con_ope);
                    cmpVal0.value(globalCon[i].cmp_fin_nom);
                } else {
                    creaConcion(globalCon[i].rpt_con_pos, i);
                }
                j++;
            }
            /**
             * condicion en caso de que sea una condicion nueva y en base de datos ya tenga varias conbdiciones
             */

        }
        if (j === 0) {
            $("#operaciones").empty();
            crearComboOpe("conOpeCond1");
            crearComboCmp("cmpValCond1");
            objConAdd.push("1");
            var cmpValo0 = $("#" + "cmpValoCond1").data("kendoComboBox");
            var conOpe0 = $("#" + "conOpeCond1").data("kendoComboBox");
            var cmpVal0 = $("#" + "cmpValCond1").data("kendoComboBox");
            cmpValo0.value("");
            conOpe0.value(">");
            cmpVal0.value("");
        }
    } else {
        $("#operaciones").empty();
        crearComboOpe("conOpeCond1");
        crearComboCmp("cmpValCond1");
        objConAdd.push("1");
        var cmpValo0 = $("#" + "cmpValoCond1").data("kendoComboBox");
        var conOpe0 = $("#" + "conOpeCond1").data("kendoComboBox");
        var cmpVal0 = $("#" + "cmpValCond1").data("kendoComboBox");
        cmpValo0.value("");
        conOpe0.value(">");
        cmpVal0.value("");
    }
    creaCmpDefecto();
}

function crearImgCond(div, id, onclick) {
    var x = document.createElement("IMG");
    x.setAttribute("src", "../../../images/espacio-95.png");
    x.setAttribute("class", "re_cerrar");
    x.setAttribute("id", id);
    x.setAttribute("onclick", "delCon(" + ("\"" + id + "\"") + ")");
    document.getElementById(div).appendChild(x);
}
/**
 * crea toda la estructura html para montar el input de operaciones y el input de campo o valores
 * @param {type} i
 * @param {type} imas
 * @returns {undefined}
 */
function creaConcion(i, imas) {
    $("#operaciones").append("<div  class = 'col-sm-1 ' ></div>");
    $("#operaciones").append("<div id=" + "divCon" + i + " class = 'col-sm-11  ' ></div>");
    $("#operaciones").append("<div  class = 'row' ></div>");
    crearBr("divCon" + i);

    $("#divCon" + i).append("<div id=" + "divConEsp" + i + " class = 'col-sm-4' ></div>");
    $("#divCon" + i).append("<div id=" + "divConOpe" + i + " class = 'col-sm-3' ></div>");
    $("#divCon" + i).append("<div id=" + "divConCmpVal" + i + " class = 'col-sm-5' ></div>");

//    $("#divFiltr" + i).append("<div id=" + "divFiltrImg" + i + " class = 'col-sm-3' ></div>");

    crearLabel("cmpValLabel" + i, "Campo o valor:", "divConEsp" + i);
    crearBr("divConEsp" + i);
    crearInput("cmpValoCond" + i, "divConEsp" + i);
    document.getElementById("cmpValoCond" + i).style = "width: 100%";
    crearComboCmp("cmpValoCond" + i);
    
    crearLabel("opeLabel" + i, "Operación:", "divConOpe" + i);
    crearBr("divConOpe" + i);
    crearInput("conOpeCond" + i, "divConOpe" + i);
    document.getElementById("conOpeCond" + i).style = "width: 80%";
    crearComboOpe("conOpeCond" + i);

    crearLabel("cmpValLabel" + i, "Campo o valor:", "divConCmpVal" + i);
    crearBr("divConCmpVal" + i);
    crearInput("cmpValCond" + i, "divConCmpVal" + i);
    document.getElementById("cmpValCond" + i).style = "width: 70%";
    crearComboCmp("cmpValCond" + i);

    crearLabel("", "", "divConEsp" + i);
    crearBr("divConEsp" + i);
    crearImgCond("divConCmpVal" + i, i);

    crearBr("divCon" + i);
    if (globalCon) {
        if ((globalCon[imas])) {
            if (globalCon[imas].cmp_con_ope !== "") {
                var comboOpe = $("#" + "conOpeCond" + i).data("kendoComboBox");
                if (globalCon[imas].cmp_con_ope == "__") {
                    globalCon[imas].cmp_con_ope = "-";
                }
                comboOpe.value(globalCon[imas].cmp_con_ope);
            }
            if (globalCon[imas].cmp_fin_nom !== "") {
                var comboCmp = $("#" + "cmpValCond" + i).data("kendoComboBox");
                comboCmp.value(globalCon[imas].cmp_fin_nom);
            }
            if (globalCon[imas].cmp_ini !== "") {
                var comboCmp = $("#" + "cmpValoCond" + i).data("kendoComboBox");
                comboCmp.value(globalCon[imas].cmp_ini);
            }
        }
    }

}
/**
 * modifica un input y lo conbierte en un combobox con la lista de los campos disponiblers en el reporte seleccionado
 * @param {type} id
 * @returns {undefined}
 */
function crearComboOpe(id) {
    $("#" + id).kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            {text: "Mayor", value: ">"},
            {text: "Menor", value: "<"},
            {text: "Igual", value: "="},
            {text: "Mayor Igual", value: ">="},
            {text: "Menor Igual", value: "<="}
        ],
        filter: "contains",
        suggest: true,
        index: 0,
        select: select

    });
}

function select(e) {
    var id = "";
    var numberPattern = /\d+/g;
    id = e.sender.element.context.id;
    id = id.match(numberPattern)[0];
    var inputCon1 = JSON.parse(JSON.stringify(inputCon));
    if ((e.sender.element[0].id.indexOf("new") === -1) && (objConAdd.indexOf(id) === -1) && (objConEdit.indexOf(id) === -1)) {
        objConEdit.push(id);
    }
}

function addConc() {
    var length = $("#operaciones").find('.col-sm-11 ').length + 1;
    var numberPattern = /\d+/g;
    var id = objConAdd[objConAdd.length - 1];
    if (objConAdd.length !== 0) {
        length = parseInt(id.match(numberPattern)[0]) + 1;
    }
    objConAdd.push("new" + length);
    var e = "new" + length;
    $("#divCon1000000").remove();
    creaConcion(e, e);
    creaCmpDefecto();
}

function creaCmpDefecto() {
    if (!document.getElementById("divCon1000000")) {
        creaConcion(1000000, 1000000);
        $("#cmpValCond1000000").data("kendoComboBox").enable(false);
        $("#conOpeCond1000000").data("kendoComboBox").enable(false);
        $("#cmpValoCond1000000").data("kendoComboBox").enable(false);
        $('#1000000').unbind('click');
        document.getElementById("divCon1000000").classList.add("divNewFun");
//        crearBr("1000000");
        crearBr("divCon1000000");
    }
}


function crearComboCmp(id) {
    $("#" + id).kendoComboBox({
        placeholder: "Seleccione Uno",
        dataTextField: "rpt_cmp_vis",
        dataValueField: "rpt_cmp_vis",
        dataSource: globalCmp,
//        close: saveElemCU,
        filter: "contains",
        select: select

    });
}

function saveElemCUCond() {

    if (($("#cmpValoCond1").val() !== "") && ($("#cmpValdef2").val() !== "")) {
        var cmpVal = $("#cmpValoCond1").data("kendoComboBox").dataSource._data[$("#cmpValoCond1").data("kendoComboBox").selectedIndex];
        var inputCon1 = [];
        if (objConDel.length > 0) {
            for (var i = 0; i < objConDel.length; i++) {
//                if((i === 0)&&(i < objConDel.length)&&(1 === 1)){}
//                var id = objConDel[i];
                var pos = objConDel[i];
//                if (id.split("new")[0] === "1") {
//                    pos = id;
//                } else {
//                    pos = id.split("new")[1];
//                }
                var id = objConDel[i];
                inputCon1.push({
                    "cmp_con_ono": "",
                    "cmp_con_ope": "",
                    "cmp_fin_nom": "",
                    "cmp_ini": cmpVal.anx_nom,
                    "cmp_ini_nom": cmpVal.cmp_dsc,
                    "rpt_cmp_pos": sessionStorage.getItem("idDato"),
                    "rpt_con_pos": pos,
                    "rpt_id": sessionStorage.getItem("idRepo")
                });
//                            sendAjax(inputCon1, "POST");
            }
            sendAjaxCond(inputCon1, "DELETE");
        }


        if (objConAdd.length > 0) {
            inputCon1 = [];
            for (var i = 0; i < objConAdd.length; i++) {
                var cmp_ini = "";
                var id = objConAdd[i];
                var pos = "";
                if (id.split("new")[0] === "1") {
                    pos = id;
                } else {
                    pos = id.split("new")[1];
                }
                if ((pos === "1") && (i === 0)) {
                    cmp_ini = cmpVal.anx_nom;
                    var obj = JSON.parse(sessionStorage.getItem("obj"));
                    obj["rpt_cmp_con"] = true;
                    sendAjax2([obj], "PUT");//paso el nodo codiciones del campo seleccionado a true
                }
                if ($("#cmpValCond" + id).val()) {
                    inputCon1.push({
                        "cmp_con_ono": "",
                        "cmp_con_ope": $("#conOpeCond" + id).data("kendoComboBox").value(),
                        "cmp_fin_nom": $("#cmpValCond" + id).val(),
                        "cmp_ini": $("#cmpValoCond" + id).data("kendoComboBox").value(),
                        "cmp_ini_nom": $("#cmpValoCond" + id).data("kendoComboBox").text(),
                        "rpt_cmp_pos": sessionStorage.getItem("idDato"),
                        "rpt_con_pos": pos,
                        "rpt_id": sessionStorage.getItem("idRepo")
                    });
                }


            }
            ;
            sendAjaxCond(inputCon1, "POST");
        }
        if (objConEdit.length > 0) {
            inputCon1 = [];
            for (var i = 0; i < objConEdit.length; i++) {
                var id = objConEdit[i];
                var cmp_ini = "";
                var pos = "";
                if ((id.split("new")[0] === "1")||(isNumber(id))) {
                    pos = id;
                } else {
                    pos = id.split("new")[1];
                }
                if ((pos === 1) && (i === 0)) {
                    cmp_ini = cmpVal.anx_nom;
                    i++;
                }
                var id = objConEdit[i];
                if ($("#cmpValCond" + id).val()) {
                    inputCon1.push({
                    "cmp_con_ono": "",
                    "cmp_con_ope": $("#conOpeCond" + id).data("kendoComboBox").value(),
                    "cmp_fin_nom": $("#cmpValCond" + id).val(),
                    "cmp_ini": $("#cmpValoCond" + id).data("kendoComboBox").value(),
                    "cmp_ini_nom": $("#cmpValoCond" + id).data("kendoComboBox").text(),
                    "rpt_cmp_pos": sessionStorage.getItem("idDato"),
                    "rpt_con_pos": pos,
                    "rpt_id": sessionStorage.getItem("idRepo")
                });
                            sendAjaxCond(inputCon1, "PUT");
                }
                
            }
        }

    }

}

function delCon(e) {

    var id = e;
    var numberPattern = /\d+/g;
    var idNum = id.match(numberPattern)[0];
    if (idNum !== "1000000") {
        if (objConAdd.indexOf("new" + idNum) !== -1) {
            objConAdd.splice(objConAdd.indexOf("new" + idNum), 1);
        } else {
            objConDel.push(id);
        }
        document.getElementById("divCon" + e).remove();
    }

}

function crearBr(div) {
    var mybr = document.createElement('br');
    document.getElementById(div).appendChild(mybr);
}

function sendAjaxCond(data, verHtml, oldId) {
    if (data[0].cmp_con_ope === "Mayor") {
        data[0].cmp_con_ope = ">";
    } else if (data[0].cmp_con_ope === "Menor") {
        data[0].cmp_con_ope = "<";
    } else if (data[0].cmp_con_ope === "Igual") {
        data[0].cmp_con_ope = "=";
    } else if (data[0].cmp_con_ope === "Mayor Igual") {
        data[0].cmp_con_ope = ">=";
    } else if (data[0].cmp_con_ope === "Menor Igual") {
        data[0].cmp_con_ope = "<=";
    }
//    displayLoading("#operaciones");
    var obj = getinputRestCmpCud();
    var urlServ = geturlRestCmpCud();
    var mapData = "eerep_rpt_con";
    obj = {
        "dsSICUDRep_rpt": {
            "eeDatos": [
                {
                    "picusrcod": user,
                    "picfiid": fiid,
                }
            ],
            "eerep_rpt_con": data,
        }
    }
    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: verHtml,
        data: JSON.stringify(obj),
        url: urlServ,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            bandAlert = 0;
            alertDialogs("Error al consumir el servicio de Crear Condiciones" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
                cerrarCustomPopUp();

        } else {
            bandAlert = 0;
//            closeLoading("#operaciones");
            alertDialogs("Problemas con el creación de conciones .\n" + permitirIngreso);
        }

    });

}
function sendAjaxAddCmpCon(data, verHtml) {
    if (verHtml !== "POST") {


        var obj = getinputRestCmpCud();
        var urlServ = geturlRestCmpCud();
        obj = {
            "dsSICUDRep_rpt": {
                "eeDatos": [
                    {
                        "picusrcod": user,
                        "picfiid": fiid,
                    }
                ],
                "eerep_rpt_cmp": data,
            }
        }
        var jsonResp = "";
        var permitirIngreso = "";
        $.ajax({
            type: verHtml,
            data: JSON.stringify(obj),
            url: urlServ,
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {
                var key1 = Object.keys(resp)[0];
                permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
                jsonResp = resp;
            },
            error: function (e) {
                parent.errorPopUp("Error al consumir el servicio de CrearConciones" + e.status + " - " + e.statusText);
            }
        }).done(function () {
            if (permitirIngreso == '"OK"') {
                closeLoading("#operaciones");
            } else {
                closeLoading("#operaciones");
                parent.errorPopUp("Problemas con el creación de conciones .\n" + permitirIngreso);
            }

        });
//    displayLoading("#operaciones");
    }

}
function replaceIdEle(idOld, idNew) {

    document.getElementById("divCon" + idOld).id = "divCon" + idNew;
    document.getElementById("divConOpe" + idOld).id = "divConOpe" + idNew;
    document.getElementById("opeLabel" + idOld).id = "opeLabel" + idNew;
    document.getElementById("conOpe" + idOld).id = "conOpe" + idNew;
    document.getElementById("divConCmpVal" + idOld).id = "divConCmpVal" + idNew;
    document.getElementById("cmpValLabel" + idOld).id = "cmpValLabel" + idNew;
    document.getElementById("cmpVal" + idOld).id = "cmpVal" + idNew;
    document.getElementById("divConEsp" + idOld).id = "divConEsp" + idNew;
    document.getElementById(idOld).setAttribute('onclick', "delCon(" + ("\"" + idNew + "\"") + ")");
    document.getElementById(idOld).id = idNew;
}




