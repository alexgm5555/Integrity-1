/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var idRepo = "";
/**
 * Funcion para ajustar el alto de la grilla 
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 61);
});

$(document).ready(function () {

    document.getElementById("accessDiv").style.display = "none";
    var url = sessionStorage.getItem("url");
//    createStyleSheet(url);
    grid();

});
/**
 * funcion para pintar la grilla
 * @returns {undefined}
 */
function grid() {
    var objRepo = getinputRestRepo();
    var urlRepo = geturlRestRepo();
    var mapDataRepo = getmapDataRestRepo();

    var objRepoD = getinputRestRepoCud();
    var urlRepoD = geturlRestRepoCud();
    var mapDataRepoD = getmapDataRestRepoD();

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlRepo,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: "POST"
            },
            destroy: {
                url: urlRepoD,
                type: "delete",
                dataType: "json",
                contentType: "application/json"
            },
            parameterMap: function (options, operation) {
                try {
                    opeSevice = operation;
                    if (operation === 'read') {
                        objRepo["obj"] = [options];
                        return JSON.stringify(objRepo);
                    } else if (operation === 'destroy') {

                        var key1 = Object.keys(objRepoD)[0];
                        objRepoD[key1][mapDataRepoD] = [options];
                        return JSON.stringify(objRepoD);
                    }
                } catch (e) {
                    alertDialogs("Error en el servicio " + e.message);
                }
            }
        },
        schema: {
            type: "json",
            data: function (e) {

                var key1 = Object.keys(e)[0];
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    if (opeSevice !== "read") {
                    grid();
                }
                    return e[key1][mapDataRepo];
                } else if ((e[key1].eeEstados[0].Estado === "Sin Informacion en la tabla ''                                              ")) {
                    alertDialogs("Usted no tiene Reportes Disponibles");
                } else {
                    alertDialogs("Error en el servicio " + e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "rpt_id",
                fields: {
                    rpt_id: {validation: {required: true}, type: 'string'}
                }
            }
        }
    });

    $(window).trigger("resize");
    $("#grid").kendoGrid({
        dataSource: dataSource,
        selectable: "multiple",
        filterable: {
            mode: "row"
        },
        columns: [
            {command:
                        [
                            {id: "play", text: " ", template: "<a class=''><span class='k-sprite re_bullet2on'></span></a>"}
                        ],
                title: "&nbsp;", width: "50px"},
            {field: "rpt_nom", title: "Nombre del reporte", filterable: {
                    cell: {
                        template: function (args) {
                            args.element.kendoAutoComplete({
                                dataSource: args.dataSource,
                                dataTextField: "rpt_nom",
                                dataValueField: "rpt_nom",
                                filter: "contains",
                                placeholder: "Buscar...",
                                minLength: 1,
                                valuePrimitive: true
                            });
                        },
                        showOperators: false
                    }
                }, width: "30%"},
            {field: "cap_des", title: "Capítulo", filterable: { 
                    cell: {
                        inputWidth: "40%",
                        template: function (args) {
                            args.element.kendoAutoComplete({
                                dataSource: args.dataSource,
                                dataTextField: "cap_cod",
                                filter: "contains",
                                placeholder: "Buscar...",
                                minLength: 1,
                                valuePrimitive: true
                            });
                        },
                        showOperators: false
                    }
                }, width: "70%"},
            {command:
                        [
                            {name: "comp", text: " ", click: ClickCompartir, template: "<a class='k-grid-comp'><span class='k-sprite re_compoff' title ='Compartir Repoprte'></span></a>"},
                            {name: "play", text: " ", click: ClickPlay, template: "<a class='k-grid-play'><span class='k-sprite re_playoff' title ='Desplegar Reporte'></span></a>"},
                            {name: "editar", text: " ", click: ClickEditar, template: "<a class='k-grid-editar'><span class='k-sprite re_editoff' title ='Editar Reporte'></span></a>"},
                            {name: "destroyed", click: clickEliminar, template: "<a class='k-grid-destroyed'><span class='k-sprite re_trash' title ='Eliminar Reporte'></span></a>"}
                        ],
                width: "155px"}],
        editable: "popup"
    });
}


/**
 * funcion para eliminar un registro dentro de la tabla
 * @param {type} e obj con toda la informaci´pon que tiene el registro
 * @returns {undefined}
 */
function clickEliminar(e) {
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));

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
        createDialog("Atención", "Esta seguro de eliminar el Reporte ---" + dataItem.rpt_nom + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }

}
/**
 * Eventcliclick de la imagen compartir
 * @param {obj} e objeto con la informacion de la fila seleccionada
 * @returns {undefined}
 */
function ClickCompartir(e) {
    e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
    var idRepo = this.dataItem($(e.currentTarget).closest("tr")).rpt_id;
    sessionStorage.setItem("idRepo", idRepo);
//    window.location.assign("html/reporteCU.html");


    mostrarCustomPopUp1();
    loadPopUpComparteRepo(e);
}
/**
 * 
 * @param {type} e objeto con la informacion de la fila seleccionada
 * @returns {undefined}
 */
function ClickPlay(e) {
    e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
    var idRepo = this.dataItem($(e.currentTarget).closest("tr")).rpt_id;
    var nomRepo = this.dataItem($(e.currentTarget).closest("tr")).rpt_nom;
    sessionStorage.setItem("idRepo", idRepo);
    sessionStorage.setItem("nomRepo", nomRepo);
    window.location.assign(sessionStorage.getItem("url") + "Reporteador/viewRepo/html/viewRepo.html");

}
/**
 * Eventcliclick de la imagen play
 * @param {type} e objeto con la informacion de la fila seleccionada
 * @returns {undefined}
 */
function ClickEditar(e) {
    e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
    var idRepo = this.dataItem($(e.currentTarget).closest("tr")).rpt_id;
    var idCap = this.dataItem($(e.currentTarget).closest("tr")).cap_cod;
    var nomRepo = this.dataItem($(e.currentTarget).closest("tr")).rpt_nom;
    var idPor = this.dataItem($(e.currentTarget).closest("tr")).por_cod;
    sessionStorage.setItem("idRepo", idRepo);
    sessionStorage.setItem("capCod", idCap);
    sessionStorage.setItem("porCod", idPor);

    sessionStorage.setItem("nomRepo", nomRepo);
    sessionStorage.setItem("ope", "edit");
    sessionStorage.setItem("objRepoSelec", JSON.stringify(this.dataItem($(e.currentTarget).closest("tr"))));
    window.location.assign(sessionStorage.getItem("url") + "Reporteador/reporteCU/html/reporteCU.html");
}
/**
 * Eventcliclick de la imagen mas
 * @returns {undefined}
 */
function ClickCreate() {
    sessionStorage.setItem("idRepo", "");
    sessionStorage.setItem("capCod", "");
    sessionStorage.setItem("porCod", "");
    sessionStorage.setItem("nomRepo", "");
    sessionStorage.setItem("ope", "create");
    loadReporte();
//    window.location.assign("html/reporteCU.html");
    mostrarCustomPopUp();
}


function mostrarCustomPopUp() {
    $("body").append("<div id='disable'></div>");
    $("#customPopUp").fadeIn("slow");

}
function cerrarCustomPopUp() {
    $("#disable").fadeOut("slow");
    $("#customPopUp").fadeOut("slow");
    $("#disable").remove();
//    $("#regalo").fadeOut("slow");
}
function mostrarCustomPopUp1() {
    $("body").append("<div id='disable'></div>");
    $("#customPopUp1").fadeIn("slow");

}
function cerrarCustomPopUp1() {
    $("#disable").fadeOut("slow");
    $("#customPopUp1").fadeOut("slow");
    $("#disable").remove();
//    $("#regalo").fadeOut("slow");
}

