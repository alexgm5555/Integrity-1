/**
 * Funcion para ajustar el alto de la grilla 
 */

$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 60);
    $('.k-grid-content').height(viewportHeight - 100);
});

$(document).ready(function () {
    btnFltrTercero();
});

/**
 * funcion para pintar la grilla
 * @returns {undefined}
 */
function grid(ternit, terraz) {
    
    var obj = new sirConsultaCliente();
    var json = obj.getjson();
    var urlRead = obj.getUrlSir();
    var mapData = obj.getMapData();

    var dataSourceTerceros = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlRead,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: "POST"
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {                        
                        if(sessionStorage.getItem("jsonFiltroTercero") && ternit==="" && terraz===""){
                            json = JSON.parse(sessionStorage.getItem("jsonFiltroTercero"))
                        }else{
                            var key1 = Object.keys(json)[0];
                            var key2 = Object.keys(json[key1])[1];
                            json[key1][key2][0].picter_nit = ternit;
                            json[key1][key2][0].picter_raz = terraz;
                            sessionStorage.setItem("jsonFiltroTercero",JSON.stringify(json));
                        }
                        
                        return JSON.stringify(json);
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
                    alertDialogs("Error en el servicio " + e[key1].eeEstados[0].Estado);
                }                
            },
            model: {
                id: "ter__nit",
                fields: {
                    ter__nit: {type: 'string'},
                    ter__raz: {type: 'string'},
                    ter__dir: {type: 'string'},
                    ter__tel: {type: 'string'},                    
                    mail_ter: {type: 'string'}                    
                }
            }
        }
    });
    $(window).trigger("resize");    
    $("#gridTerceros").kendoGrid({
        dataSource: dataSourceTerceros,        
        selectable: false,
        sortable: true,
        filterable: true,
        columns: [
            {field: "ter__nit", title: "RUC"},
            {field: "ter__raz", title: "Razón social"},
            {field: "ter__dir", title: "Dirección"},
            {field: "ter__tel", title: "Teléfono"},
            {field: "mail_ter", title: "Email principal"},
            {command:
                        [   
                            {name: "aprobar", text: " ", click: changeEst, template: "<a class='k-grid-aprobar' '><span class='k-sprite po_cerrar'></span></a>"},                            
                            {name: "editar",  click: clickEditar, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},                            
                        ],
                width: "100px"}],
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
    });
}

function btnFltrTercero() {
    $("body").append("<div id='windowFiltros'></div>");
    var myWindow = $("#windowFiltros");
    var undo = $("#undo");

    function onCloseFiltros() {
        bandAlert = 0
        document.getElementById("windowFiltros").remove();
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: "600px",
        height: "250px",
        title: "Busqueda",
        content: sessionStorage.getItem("url") + "/terceros/html/popupFiltroTerceros.html",
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
    bandAlert = 0
    $("#windowFiltros").data("kendoWindow").close();
}
function crearTercero() {
    sessionStorage.removeItem("regTercero");
    popUpTerceroCU("Crear");
}
function clickEditar(e) {    
    e = this.dataItem($(e.currentTarget).closest("tr"));        
    sessionStorage.setItem("regTercero", JSON.stringify(e));
    popUpTerceroCU("Editar");

}

function popUpTerceroCU(titulo) { 
    
    if (bandAlert === 0){
        bandAlert = bandAlert + 1;
        
        $("body").append("<div id='windowTercero'></div>");
        var myWindow = $("#windowTercero");
        var undo = $("#undo");
        
        function onCloseWindowCabPedido() {
            bandAlert = 0
            document.getElementById("windowTercero").remove();
            undo.fadeIn();
        }
        
        myWindow.kendoWindow({
            width: "90%",
            height: 500,
            title: titulo,
            content: sessionStorage.getItem("url") + "/terceros/html/popupTercero.html",
            visible: false,
            modal: true,
            actions: [
                "Close"
            ],
            close: onCloseWindowCabPedido
        }).data("kendoWindow").center().open();
    }
}

function closePopUpCabecera(ternit, terraz){
    bandAlert = 0
    $("#windowTercero").data("kendoWindow").close();
    grid(ternit, terraz);
}

function changeEst(e){
    var tercero = $("#gridTerceros").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)]    
    delete tercero["ter__mail"];
    
    var  actualizar = new SICUDTercero();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var  mapData = actualizar.getMapData();
    
    var key1 = Object.keys(actjson)[0];
    var key2 = Object.keys(actjson[key1])[1];
    actjson[key1][key2][0] = tercero;
    
    var filtroBusqueda = tercero.ter__raz;
    filtroBusqueda =  filtroBusqueda.slice(0,5)
    
    try {   
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if(tercero.ter__est==0){
                actjson[key1][key2][0].ter__est = 1;                
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {     
                                                                    
                    }         
                }).done(function(resp){                    
                       if((resp.dsSICUDsic_ter.eeEstados["0"].Estado)==="OK"){
                            grid("", filtroBusqueda);
                        }else{
                            bandAlert = 0;
                            alertDialogs("Error "+(resp.dsSICUDsic_ter.eeEstados["0"].Estado));
                        }            
                });
            }else if(tercero.ter__est==99){
                actjson[key1][key2][0].ter__est = 0;  
                $.ajax({        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {                        
                        if((resp.dsSICUDsic_ter.eeEstados["0"].Estado)=="OK"){
                            grid("", filtroBusqueda);
                        }else{
                            bandAlert = 0;
                            alertDialogs("Error "+(resp.dsSICUDsic_ter.eeEstados["0"].Estado));
                        } 
                    } 
        
            });
            }
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };        
        createDialog("Atención", "Esta seguro de cambiar estado de Registro ---" + tercero.ter__raz + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        createDialog(e);
        $('#gridTerceros').data('kendoGrid').dataSource.read();
        $('#gridTerceros').data('kendoGrid').refresh();
    }
}


