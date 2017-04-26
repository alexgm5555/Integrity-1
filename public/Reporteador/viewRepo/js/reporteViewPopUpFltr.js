/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#campos').height(viewportHeight - 5000);
//    $('#girdCampos').height(viewportHeight - 9000);
});
var filtros = "";
var tDato = JSON.parse((sessionStorage.getItem("tDato")));
var idCmpidFltr = JSON.parse((sessionStorage.getItem("idCmpidFltr")));
var objFltrDel = [];
var objFltrAdd = "";
var filtrosCampos = [];
var globalCmp = {};
var inputFltr = [{
        "rpt_cmp_pos": sessionStorage.getItem("idCmpidFltr"),
        "rpt_fil_des": "",
        "rpt_fil_dir": "",
        "rpt_fil_Has": "",
        "rpt_fil_pos": "",
        "rpt_fil_rel": true,
        "rpt_fil_uni": "",
        "rpt_id": sessionStorage.getItem("idRepo"),
        "piindicador": 0
    }];

$(document).ready(function () {
    debugger
    cmp("POST");
    document.getElementById("titulo").innerHTML = "Filtros";
    $("#popUpFltr").show();
    $("#btnCrearFltr").show();
//    createStyleSheet();

    for (var i = 0; i < filtros.length; i++) {
        filtrosCampos.push([filtros[i]]);
        var objCmp = cmpLabelfltr("POST", filtros[i].rpt_cmp_pos, filtros[i].rpt_id);
        filtros[i].rpt_cmp_vis = objCmp.nomCmp;
        filtros[i].cmp_td = objCmp.cmp_td;
        creaFiltro(filtros[i].rpt_cmp_pos.toString() + filtros[i].rpt_fil_pos.toString(), i, "", filtros[i].rpt_cmp_vis, filtros[i].cmp_td);
        objFltrAdd = JSON.parse(JSON.stringify(filtros));
    }
//    crearLabel("", "", "botones");
//    crearBr("botones");
//    crearButton("btnSaveFiltros", "Desplegar", "botones", "k-primary");
//    $("#btnSaveFiltros").kendoButton({
//        click: clicBtnSaveFiltros
//    });

});

function crearBr(div) {
    var mybr = document.createElement('br');
    document.getElementById(div).appendChild(mybr);
}

/**
 * funcion que crea toda la estructura html para el nuevo filtro
 * @param {type} i id de la fila 
 * @param {type} imas i de iteracion 
 * @param {type} iadd en caso de que se el filtro por defecto
 * @returns {undefined}
 */
function creaFiltro(i, imas, iadd, nomCmp, tDatoFltr) {

    $("#Campos").append("<div id=" + "divFiltr" + i + " class = 'col-sm-12' ></div>");
    crearBr("divFiltr" + i);
    $("#divFiltr" + i).append("<div id=" + "divFiltrCmpEsp" + i + " class = 'col-sm-3'></div>");
    $("#divFiltr" + i).append("<div id=" + "divFiltrCmpDe" + i + " class = 'col-sm-4' ></div>");
    $("#divFiltr" + i).append("<div id=" + "divFiltrCmpHasta" + i + " class = 'col-sm-4' ></div>");
//    $("#divFiltr" + i).append("<div id=" + "divFiltrCmpEsp" + i + " class = 'col-sm-4'align='center'></div>");
    $("#divFiltr" + i).append("<div id=" + "divFiltrImg" + i + " class = 'col-sm-1' ></div>");
//    crearBr("divFiltrCmpEsp" + i);

    crearLabel("cmpLabel" + i, nomCmp, "divFiltrCmpEsp" + i);
    crearLabel("", "", "divFiltrImg" + i);
    crearBr("divFiltrImg" + i);
//    crearImg("divFiltrImg" + i, i);
    crearLabel("", "", "divFiltrCmpDe" + i);
    crearLabel("deLabel" + i, "Desde:", "divFiltrCmpDe" + i);
    crearInput("filtrosde" + i, "divFiltrCmpDe" + i);
    //crearComboCmp("filtrosde" + i);


    //crearLabel("", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "divFiltrCmpHasta" + i);
    crearLabel("filtrosHastalabel" + i, "Hasta:", "divFiltrCmpHasta" + i);
    crearInput("filtrosHasta" + i, "divFiltrCmpHasta" + i);
    //crearComboCmp("filtrosHasta" + i);

    crearBr("divFiltr" + i);
    crearBr("divFiltr" + i);
    crearBr("divFiltr" + i);


    if ((filtros[imas])) {
        if(tDatoFltr=="date"){
                filtros[imas].rpt_fil_des = filtros[imas].rpt_fil_des.split("'")[1];
                filtros[imas].rpt_fil_Has = filtros[imas].rpt_fil_Has.split("'")[1];
            }
        if (filtros[imas].rpt_fil_des !== "") {
            document.getElementById("filtrosde" + i).value = filtros[imas].rpt_fil_des;
        }
        if (filtros[imas].rpt_fil_Has !== "") {
            document.getElementById("filtrosHasta" + i).value = filtros[imas].rpt_fil_Has;
        }
    }
    modTextboxPopupFl("filtrosde" + i, tDatoFltr);
    modTextboxPopupFl("filtrosHasta" + i, tDatoFltr);

}

/**
 * funcion que es llamada por el click en el boton guardar salva los cambios del filtro
 * @returns {undefined}
 */
function clicBtnSaveFiltros() {
    try {
        $("#btnSaveFiltros").kendoButton({
            enable: false
        });
        var objAdd = []
        $("#Campos").find('.col-sm-12').each(function (e, element) {
            var numberPattern = /\d+/g;
            var idfltr = element.id.match(numberPattern)[0];
            var regex = /\d\d\d\d-\d\d-\d\d/g;
            if((regex.test($("#filtrosHasta" + idfltr).val()))||(regex.test($("#filtrosde" + idfltr).val()))){
                $("#filtrosde" + idfltr).val("\'"+$("#filtrosde" + idfltr).val()+"\'");
                $("#filtrosHasta" + idfltr).val( "\'"+$("#filtrosHasta" + idfltr).val()+"\'");
            }
            
            var FiltrCmpDe = document.getElementById("filtrosde" + idfltr).value;
            var FiltrCmpHasta = document.getElementById("filtrosHasta" + idfltr).value;



            var inputFltr1 = JSON.parse(JSON.stringify(inputFltr));
            inputFltr1[0].rpt_cmp_pos = filtrosCampos[e][0].rpt_cmp_pos;
            inputFltr1[0].rpt_cmp_vis = filtrosCampos[e][0].rpt_cmp_vis;
            inputFltr1[0].rpt_fil_dir = filtrosCampos[e][0].rpt_fil_dir;
            inputFltr1[0].rpt_fil_rel = filtrosCampos[e][0].rpt_fil_rel;
            inputFltr1[0].rpt_fil_uni = filtrosCampos[e][0].rpt_fil_uni;

            inputFltr1[0].rpt_fil_pos = filtrosCampos[e][0].rpt_fil_pos;
            inputFltr1[0].rpt_cmp_pos = filtrosCampos[e][0].rpt_cmp_pos;
            inputFltr1[0].rpt_fil_des = $("#filtrosde" + idfltr).val();
            inputFltr1[0].rpt_fil_Has = $("#filtrosHasta" + idfltr).val();
            if (($("#filtrosde" + idfltr).val()) || ($("#filtrosHasta" + idfltr).val())) {
                objAdd.push(inputFltr1[0]);
            }


        });
        sendAjax(objAdd, "PUT");
    } catch (e) {
        alertDialogs("Function: clickCrearRepo Error: " + e.message);
    }
}
/**
 * envia los datos de guardar eliminar o adicionar filtros al servicio correspondiente
 * @param {type} data obj con los campos que requieren ser modificados
 * @param {type} verHtml verbo html (POST6.DELETE Y PUT)
 * @returns {undefined}
 */
function sendAjax(data, verHtml) {
    displayLoading("#Campos");
    var obj = getinputRestCmpCud();
    var urlServ = geturlRestCmpCud();
    var mapData = "eerep_rpt_fil";
    obj = {
        "dsSICUDRep_rpt": {
            "eeDatos": [
                {
                    "picusrcod": user,
                    "picfiid": fiid
                }
            ],
            "eerep_rpt_fil": data,
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
            parent.errorPopUp("Error al consumir el servicio de CrearFiltro" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        closeLoading("#campos");
        if (permitirIngreso == '"OK"') {
            parent.cerrarWindow();
        } else {
            parent.errorPopUp("Problemas con el creación de campos .\n" + permitirIngreso);
        }
        $("#btnSaveFiltros").kendoButton({
            enable: true
        });
    });

}
/**
 * optiene todos los filtros y campos de un reporte
 * @param {type} data obj con los campos que requieren ser modificados
 * @param {type} verHtml verbo html (POST.DELETE Y PUT)
 * @returns {undefined}
 */
function cmp(verHtml) {
    var objCmp = getinputRestRepoGridCmp();
    var urlServCmp = geturlRestRepoGridCmp();
    var mapData = getmapDataRestRepoGridCmp();

    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        async: false,
        type: verHtml,
        data: JSON.stringify(objCmp),
        url: urlServCmp,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            if (resp[key1].eerep_rpt_fil) {
                filtros = resp[key1].eerep_rpt_fil;
                campos = resp[key1].eerep_rpt_cmp;
//                
            } else {
                permitirIngreso = "Sin Filtros"
            }
            jsonResp = resp;
        },
        error: function (e) {
            parent.errorPopUp("Error al consumir el servicio de CrearFiltro" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {

        } else if (permitirIngreso === "Sin Filtros") {
            parent.cerrarWindow();
        } else {
            parent.errorPopUp("Problemas con el creación de campos .\n" + permitirIngreso);
        }
        $("#btnSaveFiltros").kendoButton({
            enable: true
        });
    });
}

/**
 * optiene todos los filtros y campos de un reporte
 * @param {type} data obj con los campos que requieren ser modificados
 * @param {type} verHtml verbo html (POST.DELETE Y PUT)
 * @returns {undefined}
 */
function cmpLabelfltr(verHtml, rptPos, rptId) {
//    var nomCmp = ""; 
    var cmp = {}
    var objCmp = getinputRestRepoCmp();
    var urlServCmp = geturlRestRepoCmp();
    var mapData = getmapDataRestRepoCmp();
    objCmp.dsSIRRep_rpt_cmp.eeSIRrep_rpt_cmp = [
        {
            "piirpt_id": rptId,
            "piirpt_pos": rptPos
        }
    ];

    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        async: false,
        type: verHtml,
        data: JSON.stringify(objCmp),
        url: urlServCmp,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            if (resp[key1].eerep_rpt_cmp) {
//                nomCmp = resp[key1].eerep_rpt_cmp[0].rpt_cmp_vis;
                cmp = {
                    nomCmp: resp[key1].eerep_rpt_cmp[0].rpt_cmp_vis,
                    cmp_td: resp[key1].eerep_rpt_cmp[0].cmp_td
                };
            } else {
                permitirIngreso = "No coincide el campo"
            }
            jsonResp = resp;
        },
        error: function (e) {
            parent.errorPopUp("Error al consumir el servicio de " + geturlRestRepoCmp() + "--" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {

        } else if (permitirIngreso === "No coincide el campo") {
            parent.cerrarWindow();
        } else {
            parent.errorPopUp("Problemas con el creación de campos .\n" + permitirIngreso);
        }
        $("#btnSaveFiltros").kendoButton({
            enable: true
        });
    });
    return cmp;
}