/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/**
 * Funcion para ajustar el alto de la grilla 
 */
var dataSourcePedidos = {};
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 60);
    $('.k-grid-content').height(viewportHeight - 100);
});

$(document).ready(function () {
    grid();
});

/**
 * funcion para pintar la grilla
 * @returns {undefined}
 */
function grid() {
    var obj = new sirConsultaPedidos();
    var jsonFiltroPedidos = obj.getjson();
    var urlRepo = obj.getUrlSir();
    var mapData = obj.getMapData();

    var objCU = new SICUDPedido();
    var objRepoD = objCU.getjson();
    var urlRepoD = objCU.getUrlSir();
    var mapDataRepoD = objCU.getMapData();

    dataSourcePedidos = new kendo.data.DataSource({
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
                         if(sessionStorage.getItem("jsonFiltroPedidos")){                             
                             jsonFiltroPedidos = JSON.parse(sessionStorage.getItem("jsonFiltroPedidos"));                             
                         }else{
                            var key1 = Object.keys(jsonFiltroPedidos)[0];
                            var key2 = Object.keys(jsonFiltroPedidos[key1])[1];
                            jsonFiltroPedidos[key1][key2][0].pidped_fec = sessionStorage.getItem("fechaSistema");
                            jsonFiltroPedidos[key1][key2][0].pilhastapr = true
                            sessionStorage.setItem("jsonFiltroPedidos", JSON.stringify(jsonFiltroPedidos))
                        }                        
                        return JSON.stringify(jsonFiltroPedidos);
                    } else if (operation === 'destroy') {
                        var key1 = Object.keys(objRepoD)[0];
                        objRepoD[key1][mapDataRepoD] = [options];
                        return JSON.stringify(objRepoD);
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
                id: "ped__num",
                fields: {
                    ped__num: {validation: {required: true}, type: 'string'},
                    ped__fec: {validation: {required: true}, type: 'string'},
//                    ter__nit: {validation: {required: true}, type: 'string'},
                    ter__raz: {validation: {required: true}, type: 'string'},
                    ped__fec__ent: {validation: {required: true}, type: 'string'},
                    est__nom : {validation: {required: true}, type: 'string'},
                }
            }
        }
    });
    $(window).trigger("resize");    
    $("#gridPedidos").kendoGrid({
        dataSource: dataSourcePedidos,        
        selectable: false,
        columns: [
            {field: "ped__fec", title: "Fecha de Pedido"},
            {field: "ped__num", title: "Número de Pedido"},            
//            {field: "ter__nit", title: "NIT"},
            {field: "ter__raz", title: "Razón social"},
            {field: "ped__fec__ent", title: "Fecha entrega"},
            {field: "est__nom", title: "Estado"},
            {command:
                        [                            
                            {name: "editar",  click: clickEditar, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                            {name: "destroyed", click: clickEliminar, template: "<a class='k-grid-destroyed' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"}
                        ],
                width: "100px"}],
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
    });
    
       
    function clickEliminar(e) {
    try {
        
        e.preventDefault();
        var dataItem = $("#gridPedidos").data("kendoGrid").dataItem($(e.target).closest("tr"));
        sessionStorage.setItem("regPedidos", JSON.stringify(dataItem));
        
        var widthPopUp = $("body").width();
        widthPopUp = widthPopUp * (30 / 100);
        var heightPopUp = 300;
//        var heightPopUp = $("body").height();
//        heightPopUp = heightPopUp * (30 / 100);
        
        $("body").append("<div id='windowAnularPedido'></div>");
        var myWindow = $("#windowAnularPedido");
        var undo = $("#undo");
        
        function onCloseWindowCabPedido() {
            document.getElementById("windowAnularPedido").remove();
            undo.fadeIn();
        }
        
        myWindow.kendoWindow({
            width: widthPopUp,
            height: heightPopUp,
            title: "Anular",
            content: sessionStorage.getItem("url") + "/pedidos/html/popupAnular.html",
            visible: false,
            modal: true,
            actions: [
                "Close"
            ],
            close: onCloseWindowCabPedido
        }).data("kendoWindow").center().open();


    } catch (e) {
       
    }
}
}

function btnFltrPedido() {
    $("body").append("<div id='windowFiltros'></div>");
    var myWindow = $("#windowFiltros");
    var undo = $("#undo");

    function onCloseFiltros() {
        document.getElementById("windowFiltros").remove();
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: "600px",
        height: "300px",
        title: "Busqueda",
        content: sessionStorage.getItem("url") + "/pedidos/html/popUpFiltros.html",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: onCloseFiltros
    }).data("kendoWindow").center().open();
}

function closePopUpFiltros() {
    $("#windowFiltros").data("kendoWindow").close();
}
function crearPedido() {
    popUpPedidoCU();
}
function clickAprob(e) {
    e = this.dataItem($(e.currentTarget).closest("tr"));    
}
function clickEditar(e) {
    e = this.dataItem($(e.currentTarget).closest("tr"));    
    var servicio="pedido"
    sessionStorage.setItem("servicio",servicio);
    sessionStorage.setItem("regPedidos", JSON.stringify(e));
    window.location.replace(( sessionStorage.getItem("url")+"pedidos/html/"+servicio+".html"));   

}

function popUpPedidoCU() {
    
    sessionStorage.removeItem("regPedidos");
    
    var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (80 / 100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (60 / 100);

    $("body").append("<div id='windowPedidoCabecera'></div>");
    var myWindow = $("#windowPedidoCabecera");
    var undo = $("#undo");

    function onCloseWindowCabPedido() {
        document.getElementById("windowPedidoCabecera").remove();
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: widthPopUp,
        height: heightPopUp,
        title: "Crear",
        content: sessionStorage.getItem("url") + "/pedidos/html/pedidoCabecera.html",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: onCloseWindowCabPedido
    }).data("kendoWindow").center().open();
}

function closePopUpCabecera(){       
    $("#windowPedidoCabecera").data("kendoWindow").close();
    window.location.replace(( sessionStorage.getItem("url")+"pedidos/html/pedido"+".html"));  
}

function popUpAprobacionPedido() {
    
    sessionStorage.removeItem("regPedidos");
    
    var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (30 / 100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (30 / 100);

    $("body").append("<div id='windowPedidoAproba'></div>");
    var myWindow = $("#windowPedidoAproba");
    var undo = $("#undo");

    function onClosePopUpAprobacionPedido() {
        document.getElementById("windowPedidoAproba").remove();
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: widthPopUp,
        height: heightPopUp,
        title: "Cartera",
        content: sessionStorage.getItem("url") + "/pedidos/html/popUpAprobacionPedido.html",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: onClosePopUpAprobacionPedido
    }).data("kendoWindow").center().open();
}

function closePopUpAprobacionPedido(){       
    $("#windowPedidoAproba").data("kendoWindow").close();
    location.reload();
}

function closePopUpAnularPedido(){       
    $("#windowAnularPedido").data("kendoWindow").close();
    location.reload();
}