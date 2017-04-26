/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Funcion para ajustar el alto de la grilla 
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 50);
    $('.k-grid-content').height(viewportHeight - 100);
});

$(document).ready(function () {

//    document.getElementById("accessDiv").style.display = "none";
//    var url = sessionStorage.getItem("url");
//    createStyleSheet(url);
    grid();
});

/**
 * funcion para pintar la grilla
 * @returns {undefined}
 */
function grid() {
    var obj = new sirconsultaMConta();
    var objRepo = obj.getjson();
    var urlRepo = obj.getUrlSir();
    var mapData = obj.getMapData();

    var objCU = new SICUDsic_tcont();
    var objRepoD = objCU.getjson();
    var urlRepoD = objCU.getUrlSir();
    var mapDataRepoD = objCU.getMapData();
    
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
                    if (operation === 'read') {
                        objRepo["obj"] = [options];
                        return JSON.stringify(objRepo);
                    }else if (operation === 'destroy') {
                        var key1 = Object.keys(objRepoD)[0];
                        objRepoD[key1][mapDataRepoD] = [options];
                        return JSON.stringify(objRepoD);
                    }
                } catch (e) {
                    alertDialog("Error en el servicio"+ e.message);
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
                    alertDialog("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "tcont__cod",
                fields: {
                    tcont__des: {validation: {required: true}, type: 'string'}
                }
            }
        }
    });
    $(window).trigger("resize");
    $("#girdConta").kendoGrid({
        dataSource: dataSource,
        selectable: false,
        columns: [
            
            {field: "tcont__des", title: "&nbsp;", width: "100%"},
            
            {command:
                        [
                            {name: "editar", text: " ", click: ClickEditar, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                            {name: "destroyed", click: clickEliminar,template: "<a class='k-grid-destroyed' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"}
                        ],
                width: "90px"}],
        editable: "popup"
    });
$("#girdConta .k-grid-header").css('display', 'none');
}

function ClickEditar(e){
    e = this.dataItem($(e.currentTarget).closest("tr"));
    sessionStorage.setItem("contaRow", JSON.stringify(e));
    window.location.assign("../html/mantenContabilizaCU.html");
}

function clickEliminar(e){
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#girdConta").data("kendoGrid").dataItem($(e.target).closest("tr"));

        
            var actions = new Array();
            actions[0] = new Object();
            actions[0].text = "OK";
            actions[0].action = function () {
                var dataSource = $("#girdConta").data("kendoGrid").dataSource;
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
        $('#girdConta').data('kendoGrid').dataSource.read();
        $('#girdConta').data('kendoGrid').refresh();
    }
}

function ClickCrear(){
    sessionStorage.removeItem("contaRow");
    window.location.assign("../html/mantenContabilizaCU.html");
}