/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#campos').height(viewportHeight - 5000);
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

function onloadPopUpFltr() {
    $("#CamposFltr").empty();
    filtros = "";
    tDato = JSON.parse((sessionStorage.getItem("tDato")));
    idCmpidFltr = JSON.parse((sessionStorage.getItem("idCmpidFltr")));
    objFltrDel = [];
    objFltrAdd = "";
    filtrosCampos = [];
    globalCmp = {};
    inputFltr = [{
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
    document.getElementById('tituloPopUp').innerHTML = "Filtro al campo Valor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sessionStorage.getItem("cmpNom");
    $('#imgOpc').removeClass().addClass('k-sprite');
    $('#imgOpc').addClass('re_filtroon');
//    $('#popUpFltr').css("height",$('#customPopUp').context.children["0"].clientHeight-90 + "px"); 
    $("#popUpFltr").show();
    $("#btnCrearFltr").show();
    sessionStorage.setItem("opcFl", "Fil");
    document.getElementById("titulo").innerHTML = sessionStorage.getItem("cmpNom");
    document.getElementById('subtitulo').innerHTML = "<br>Filtros - " + sessionStorage.getItem("cmpNom");
    document.getElementById('labelTexto').innerHTML = "información que quieres consultar del campo “nombre del " +
            "campo”  Para agregar un filtro haz click en el botón " +
            "“mas”. Con el botón “candado” podrás fijar el filtro en " +
            "futuras consultas con este reporte.";
    if (sessionStorage.getItem("filtros") !== "undefined") {
        filtros = JSON.parse((sessionStorage.getItem("filtros")));
        objFltrAdd = JSON.parse(JSON.stringify(filtros));
    }

    for (var i = 0; i < filtros.length; i++) {
        if (idCmpidFltr == filtros[i].rpt_cmp_pos) {
            filtrosCampos.push([filtros[i]]);
            creaFiltro(filtros[i].rpt_fil_pos, i);
            objFltrAdd = JSON.parse(JSON.stringify(filtros));
        }
    }
//    crearLabel("", "", "botones");
//    crearBr("botones");
//    crearButton("btnSaveFiltros", "Guardar", "botones", "k-primary");
//    $("#btnSaveFiltros").kendoButton({
//        click: clicBtnSaveFiltros
//    });

}
/**
 * crea las imagen del candado y la imagen y la x de eliminar filtro
 * @param {type} div div donde se va crear el nuevo elemento 
 * @param {type} id del nuevo elemento
 * @param {type} onclick si tiene un evento onclick
 * @returns {undefined}
 */
function crearImgFltr(div, id, onclick) {
    var x = document.createElement("IMG");
    x.setAttribute("src", "../../../images/espacio-95.png");
//    x.setAttribute("class", "re_desbloff");
    x.setAttribute("id", id + "debloff");
//    x.setAttribute("onclick", "bloqFiltro(" + parseInt(id) + ")");
    document.getElementById(div).appendChild(x);
    
    var x = document.createElement("IMG");
    x.setAttribute("src", "../../../images/espacio-95.png");
    x.setAttribute("class", "re_cerrar");
    x.setAttribute("id", id);
    x.setAttribute("onclick", "delFiltro(" + parseInt(id) + ")");
    document.getElementById(div).appendChild(x);
}
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
function creaFiltro(i, imas, iadd) {

    $("#CamposFltr").append("<div id=" + "divFiltr" + i + " class = 'col-sm-12 flexEnd' ></div>");
    crearBr("divFiltr" + i);
    $("#divFiltr" + i).append("<div id=" + "divFiltrCmpEsp" + i + " class = 'col-sm-1'></div>");
    $("#divFiltr" + i).append("<div id=" + "divFiltrCmpDe" + i + " class = 'col-sm-4' ></div>");
    $("#divFiltr" + i).append("<div id=" + "divFiltrCmpHasta" + i + " class = 'col-sm-4' ></div>");
//    $("#divFiltr" + i).append("<div id=" + "divFiltrCmpEsp" + i + " class = 'col-sm-4'align='center'></div>");
    $("#divFiltr" + i).append("<div id=" + "divFiltrImg" + i + " class = 'col-sm-3 ' ></div>");
    
    crearLabel("", "", "divFiltrImg" + i);
//    crearBr("divFiltrImg" + i);
    crearImgFltr("divFiltrImg" + i, i);
    crearLabel("", "", "divFiltrCmpDe" + i);
    crearLabel("deLabel" + i, "Desde:", "divFiltrCmpDe" + i);
    crearInput("filtrosde" + i, "divFiltrCmpDe" + i);
    //crearComboCmp("filtrosde" + i);
    //crearLabel("", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "divFiltrCmpHasta" + i);
    crearLabel("filtrosHastalabel" + i, "Hasta:", "divFiltrCmpHasta" + i);
    crearInput("filtrosHasta" + i, "divFiltrCmpHasta" + i);
    //crearComboCmp("filtrosHasta" + i);
    if (sessionStorage.getItem("filtros") !== "undefined") {
        if ((filtros[imas])) {
            if (tDato == "date") {
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
    }
    modTextboxPopupFl("filtrosde" + i, tDato);
    modTextboxPopupFl("filtrosHasta" + i, tDato);
    crearBr("divFiltr" + i);
    crearBr("divFiltr" + i);
    crearBr("divFiltr" + i);


}

function llenarDataourceCmp() {

}
/**
 * funcion que crea un combo box con todos los campos disponibles en el reporte
 * @param {type} id del input donde quiero poner el comobox
 * @returns {undefined}
 */
function crearComboCmp(id) {
    var objRepo = getinputRestRepoGridCmp();
    var url = geturlRestRepoGridCmp();
    var mapData = getmapDataRestRepoGridCmp();
    var mapDataFun = "eerep_rpt_fun";

    var datasourceCmp = {
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
                    globalCmp = globalCmp.filter(function (obj) {
                        return obj.rpt_cmp_vis !== sessionStorage.getItem("nomFun");
                    });
                    globalCmp = globalCmp.filter(function (obj) {
                        return obj.rpt_cmp_fun !== true;
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
        }
    };
    $("#" + id).kendoComboBox({
        placeholder: "Seleccione Uno",
        dataTextField: "rpt_cmp_vis",
        dataValueField: "rpt_cmp_vis",
        dataSource: datasourceCmp,
        filter: "contains"
    });
}
/**
 * funcionn que se activa con el click del botoln en elclick de la x  y elimina el filtro 
 * @param {type} e id o pos del la x 
 * @returns {undefined}
 */
function delFiltro(e) {

    var lengthDel = objFltrDel.length;
    var inputFltr1 = JSON.parse(JSON.stringify(inputFltr));
    inputFltr1[0].rpt_fil_pos = e;
    inputFltr1[0].rpt_fil_des = $("#filtrosde" + e).val();
    inputFltr1[0].rpt_fil_Has = $("#filtrosHasta" + e).val();
    if (($("#filtrosde" + e).val()) || ($("#filtrosHasta" + e).val())) {
        sendAjaxFltr([inputFltr1[0]], "DELETE");
    }
    document.getElementById("divFiltr" + e).remove();

}
/**
 * funcion que es activada por ewl click del boton addocionar filtro o el mas que aparece en la parte superio de la pantalla
 * @returns {undefined}
 */
function addFiltro() {
    var length = $("#CamposFltr").find('.col-sm-12').length;
    var e = length + 1;
    var inputFltr1 = JSON.parse(JSON.stringify(inputFltr));
    creaFiltro(e);
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
        var objAdd = [];
        var objEdit = [];
        $("#CamposFltr").find('.col-sm-12').each(function (e, element) {
            var numberPattern = /\d+/g;
            var idfltr = element.id.match(numberPattern)[0];
            var FiltrCmpDe = document.getElementById("filtrosde" + idfltr).value;
            var FiltrCmpHasta = document.getElementById("filtrosHasta" + idfltr).value;
            
            if((filtrosCampos.length!==0)&&(filtrosCampos[e]!== undefined)){
            if ((filtrosCampos[e]["0"].rpt_fil_des !== FiltrCmpDe) || (filtrosCampos[e]["0"].rpt_fil_Has !== FiltrCmpHasta)) {
                if ((filtrosCampos[e]["0"].rpt_fil_pos == idfltr) && (FiltrCmpDe !== "undefine") && (FiltrCmpHasta !== "undefine")) {
                    var regex = /\d\d\d\d-\d\d-\d\d/g;
                    if ((regex.test($("#filtrosHasta" + idfltr).val())) || (regex.test($("#filtrosde" + idfltr).val()))) {
                        $("#filtrosde" + idfltr).val("\'" + $("#filtrosde" + idfltr).val() + "\'");
                        $("#filtrosHasta" + idfltr).val("\'" + $("#filtrosHasta" + idfltr).val() + "\'");
                    }
                    var inputFltr1 = JSON.parse(JSON.stringify(inputFltr));
                    inputFltr1[0].rpt_fil_pos = filtrosCampos[e]["0"].rpt_fil_pos;
                    inputFltr1[0].rpt_cmp_pos = idCmpidFltr;
                    inputFltr1[0].rpt_cmp_vis = sessionStorage.getItem("cmpNom");
                    inputFltr1[0].rpt_fil_des = $("#filtrosde" + idfltr).val();
                    inputFltr1[0].rpt_fil_Has = $("#filtrosHasta" + idfltr).val();
                    if (($("#filtrosde" + idfltr).val()) || ($("#filtrosHasta" + idfltr).val())) {
                        objEdit.push(inputFltr1[0]);
                    }
                    sendAjaxFltr(objEdit, "PUT");
                } else {
                    alertDialogs("Por favor verifique los campos de filtros.");
                }

            }
        }else{
           if ((sessionStorage.getItem("filtros") !== "undefined") && (filtrosCampos.length > 0)) {

                if ((idfltr > filtrosCampos[0].length) && (function (idfltr) {
                    for (var i = 0; i < filtrosCampos[0].length; i++) {
                        var bool = true;
                        if (filtrosCampos[0][i]["rpt_fil_pos"] == idfltr) {
                            bool = false;
                            break
                        }
                    }
                    return bool;

                })) {
                    var regex = /\d\d\d\d-\d\d-\d\d/g;
                    if ((regex.test($("#filtrosHasta" + idfltr).val())) || (regex.test($("#filtrosde" + idfltr).val()))) {
                        $("#filtrosde" + idfltr).val("\'" + $("#filtrosde" + idfltr).val() + "\'");
                        $("#filtrosHasta" + idfltr).val("\'" + $("#filtrosHasta" + idfltr).val() + "\'");
                    }
                    var inputFltr1 = JSON.parse(JSON.stringify(inputFltr));
                    inputFltr1[0].rpt_fil_pos = 0;
                    inputFltr1[0].rpt_cmp_pos = idCmpidFltr;
                    inputFltr1[0].rpt_cmp_vis = sessionStorage.getItem("cmpNom");
                    inputFltr1[0].rpt_fil_des = $("#filtrosde" + idfltr).val();
                    inputFltr1[0].rpt_fil_Has = $("#filtrosHasta" + idfltr).val();
                    if (($("#filtrosde" + idfltr).val()) || ($("#filtrosHasta" + idfltr).val())) {
                        objAdd.push(inputFltr1[0]);
                        sendAjaxFltr([inputFltr1[0]], "POST");
                    }
                }
            } else {
                var regex = /\d\d\d\d-\d\d-\d\d/g;
                if ((regex.test($("#filtrosHasta" + idfltr).val())) || (regex.test($("#filtrosde" + idfltr).val()))) {
                    $("#filtrosde" + idfltr).val("\'" + $("#filtrosde" + idfltr).val() + "\'");
                    $("#filtrosHasta" + idfltr).val("\'" + $("#filtrosHasta" + idfltr).val() + "\'");
                }
                var inputFltr1 = JSON.parse(JSON.stringify(inputFltr));
                inputFltr1[0].rpt_fil_pos = 0;
                inputFltr1[0].rpt_cmp_pos = idCmpidFltr;
                inputFltr1[0].rpt_cmp_vis = sessionStorage.getItem("cmpNom");
                inputFltr1[0].rpt_fil_des = $("#filtrosde" + idfltr).val();
                inputFltr1[0].rpt_fil_Has = $("#filtrosHasta" + idfltr).val();
                if (($("#filtrosde" + idfltr).val()) || ($("#filtrosHasta" + idfltr).val())) {
                    objAdd.push(inputFltr1[0]);
                    sendAjaxFltr([inputFltr1[0]], "POST");
                }
            } 
        }
        });
        
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
function sendAjaxFltr(data, verHtml) {
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
            errorPopUp("Error al consumir el servicio de CrearFiltro" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            closeLoading("#Campos");
            reloadGridFltr();

        } else {
            closeLoading("#Campos");
            errorPopUp("Problemas con el creación de campos .\n" + permitirIngreso);
        }
        $("#btnSaveFiltros").kendoButton({
            enable: true
        });
    });

}