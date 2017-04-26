/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function  loadFormato() {
    document.getElementById('subtitulo').innerHTML = "Agregar los filtros";
    document.getElementById('labelTexto').innerHTML = "El primer paso para la generación de un reporte" +
            "se debe definir su nombre y el portafolio y el" +
            "capítulo del cual se consultará la información.El2" +
            "primer paso para la generación de un reporte" +
            "se debe definir su nombre y el portafolio y el" +
            "capítulo del cual se consultará la información.";
    gridFormato();
}
/**
 * Funcion que pinta la grilla kendo
 * @param {type} urlGrid url del servicio rest
 * @param {type} dataserv parametros para ubicar la posiscion en el objeto de respuesta del servicio
 * @returns {undefined}
 */
function gridFormato(urlGrid, dataserv) {
    var objRepo = getinputRestRepoGridFomat();
    var urlGrid = geturlRestRepoGridFomat();
    var mapData = getmapDataRestRepoGridFomat();

    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlGrid,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: "POST",
            },
            destroy: {
                url: urlGrid,
                type: "delete",
                dataType: "json",
                contentType: "application/json"
            },
            create: {
                url: urlGrid,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'destroy' || operation === 'create' || operation === 'update') {
                        var obj = {}
                        obj["dsSICUDRep_rpt"] = {};
                        obj.dsSICUDRep_rpt["eeDatos"] = objRepo.dsSIRRep_rpt_det.eeDatos
                        obj.dsSICUDRep_rpt["eerep_rpt"] = [JSON.parse(sessionStorage.getItem("objRepoSelec"))];
                        obj.dsSICUDRep_rpt["eerep_rpt_cmp"] = [options];
                        return kendo.stringify(obj);

                    }
                    if (operation === 'read') {
                        objRepo["anx_cmp_id"] = [options];
                        return JSON.stringify(objRepo);
                    }
                } catch (e) {
                    alertDialogs("Error al consumir el servicio gridFormato Error" + e.message);
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
                    alertDialogs("Error" + e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "anx_cmp_id",
                fields: {
                    anx_cmp_id: {validation: {required: true}, type: 'string'},
                    cmp_nom_visual: {validation: {required: true}, type: 'string'},
                }
            }
        }
    });
//    $(window).trigger("resize");
    $("#girdFormato").kendoGrid({
        dataSource: dataSource,
        columns: [
            {field: "cmp_nom_visual", title: "Descripción", width: "100%"},
            {command:
                        [
                            {name: "lista", text: " ", click: listClick, template: "<a class='k-grid-lista'><span class='k-sprite re_listaoff'></span></a>"},
                            {name: "visible", text: " ", click: visiClick, template: "<a class='k-grid-visible'><span class='k-sprite re_visibleon'></span></a>"}
                        ],
                width: "100px"}],
        rowTemplate: kendo.template($("#rowTemplateFormat").html()),
        altRowTemplate: kendo.template($("#altRowTemplateFormat").html()),
        dataBinding: llenFormatGrilla,
        dataBound: function () {
            var results = dataSource.data();
            llenFormatGrilla(results);
        },
    });
}
/**
 * funcion para cambial las imagenes en la grilla en caso de que este tenga una condicion especio 
 * @param {type} results
 * @returns {undefined}
 */
function llenFormatGrilla(results) {
    for (var i = 0; i < results.length; i++) {
        var id = results[i].rpt_cmp_pos;
        var div = "";
        var spanL = "";
        var spanVisi = "";
        if (i % 2 === 0) {
            div = "divRowFormato" + id;
//            spanList   = "spanList" + id;
            spanVisi = "spanVisi" + id;
        } else {
            div = "altDivRowFormato" + id;
//            spanList   = "altSpanList" + id;
            spanVisi = "altSpanVisi" + id;
        }
        if ((results[i].cmp_ssm === true)) {
            campoSuma(id, i, div, results);
        }
        if (!results[i].anx_cmp_vsb) {
            $('#' + spanVisi).removeClass('re_visibleon').addClass('re_visibleoff');
        }
    }
}
/**
 * coloca sumarizar, contabilizar y promediar 
 * @param {type} id de la fila
 * @param {type} i 
 * @param {type} div div donde esta contenida la imagen
 * @param {type} results obj con toda la inpformación de la grilla
 * @returns {undefined}
 */
function campoSuma(id, i, div, results) {
    crearImg(div, "bulletSum" + i);
    crearSpan(div, "Sumarizar");
    crearImg(div, "bulletProm" + i);
    crearSpan(div, "Promediar");
    crearImg(div, "bulletCount" + i);
    crearSpan(div, "Contar");
    if (results[i].rpt_cmp_sum === false) {
        $('#' + "bulletSum" + i).removeClass('re_bullet1').addClass('re_bullet1off');
    }
    if (results[i].rpt_cmp_pro === false) {
        $('#' + "bulletProm" + i).removeClass('re_bullet1').addClass('re_bullet1off');
    }
    if (results[i].rpt_cmp_conunt === false) {
        $('#' + "bulletCount" + i).removeClass('re_bullet1').addClass('re_bullet1off');
    }
    crearBr(div);
}
function crearImg(div, id) {
    var ope = /(Sum|Prom|Count)/i.exec(id);
    ope = ope[0];
    var x = document.createElement("IMG");
    x.setAttribute("src", "/Reporteador/images/espacio-95.png");
    x.setAttribute("class", "re_bullet1");
    x.setAttribute("id", id);
    x.setAttribute("onclick", ope + "Click(\'" + id + "\')");
    document.getElementById(div).appendChild(x);
}
/**
 * Funcion para atrapar el evento del clic en el icono de lista
 * @param {type} id el id de la fila seleccionada
 * @returns {undefined}
 */
function listClick(id) {
    alert("listClick___" + id);
}
/**
 * Funcion para atrapar el evento del clic en el icono del ojo
 * @param {type} e el id de la fila seleccionada
 * @returns {undefined}
 */
function visiClick(e) {
    var row =($(e.currentTarget).closest("tr")["0"].sectionRowIndex);
    changObjRep(row,"anx_cmp_vsb");
 }
/**
 * Funcion para atrapar el evento del clic en el icono del bulletSum
 * @param {type} id el id de la fila seleccionada
 * @returns {undefined}
 */
function SumClick(id) {
    id = /((\d+))/i.exec(id);
    id = id[0];
    changObjRep(id,"rpt_cmp_sum");
}
/**
 * Funcion para atrapar el evento del clic en el icono del bulletSum
 * @param {type} id el id de la fila seleccionada
 * @returns {undefined}
 */
function PromClick(id) {
    id = /((\d+))/i.exec(id);
    id = id[0];
    changObjRep(id,"rpt_cmp_pro");
}
/**
 * Funcion para atrapar el evento del clic en el icono del bulletSum
 * @param {type} id el id de la fila seleccionada
 * @returns {undefined}
 */
function CountClick(id) {
    id = /((\d+))/i.exec(id);
    id = id[0];
    alert("CountClick___" + id);
}
/**
 * envia los datos de guardar eliminar o adicionar filtros al servicio correspondiente
 * @param {type} data obj con los campos que requieren ser modificados
 * @param {type} verHtml verbo html (POST6.DELETE Y PUT)
 * @returns {undefined}
 */
function sendAjax(data, verHtml) {
    displayLoading("#girdFormato");
    var obj = getinputRestCmpCud();
    var urlServ = geturlRestCmpCud();
    var mapData = "eerep_rpt_cmp";
    obj = {
        "dsSICUDRep_rpt": {
            "eeDatos": [
                {
                    "picusrcod": user,
                    "picfiid": fiid
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
            bandAlertfl = 0;
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            bandAlertfl = 0;
            parent.errorPopUp("Error al consumir el servicio de CrearFiltro" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            gridFormato();
            closeLoading("#girdFormato");
//            $('#girdFormato').data('kendoGrid').dataSource.read();
//            $('#girdFormato').data('kendoGrid').refresh();
        } else {
//            parent.errorPopUp("Problemas con el creación de campos .\n" + permitirIngreso);
        }
        $("#btnSaveFiltros").kendoButton({
            enable: true
        });
    });

}

function changObjRep(row,cmp){
    bandAlertfl++;
    if (bandAlertfl === 1) {
        var obj = $("#girdFormato").data("kendoGrid")._data[row];
        if (obj[cmp]) {
            obj[cmp] = false;
        } else {
            obj[cmp] = true;
        }
        sendAjax([obj], "PUT");
    }
}


