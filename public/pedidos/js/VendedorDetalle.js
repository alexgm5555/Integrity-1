

function gridDetalleVendedor(){
    
    var datos_vendedor = JSON.parse(sessionStorage.getItem("Detalle_Vendedor"));
    
    var  consultar = new sirVendedoresDetalle();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
    
    
    var  actualizar = new CudDetalleVendedor();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    
    var mapCud = "eegpd_vtr";
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },            
            create: { 
                url: urlactualizar,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            destroy: {
                url: urlactualizar,
                dataType: "json",
                type: "DELETE",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (options, operation) {
                if (operation === "read") {
                    datajson.dsSIRgpd_vtr.SIRgpd_vtr[0].piivdd__cod = datos_vendedor.vdd__cod;                
                    return JSON.stringify(datajson);
                }
                if (operation === "create") {                    
                    var region = $("#territorios").data("kendoDropDownList");
                    var select = region.selectedIndex;
                    region = region.dataSource._data[select].trr__cod;
                    var nom_region = $("#territorios").data("kendoDropDownList").dataSource._data[select].trr__nom;
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].trr__nom=nom_region;  
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].trr__cod=region;                    
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].vdd__cod=datos_vendedor.vdd__cod;
                    return JSON.stringify(actjson);          
                    
                }
                if (operation === "destroy") { 
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].ter__raz=options.ter__raz;  
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].trr__cod=options.trr__cod;                    
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].trr__nom=options.trr__nom;
                    actjson.dsSICUDgpd_vtr.eegpd_vtr[0].vdd__cod=options.vdd__cod;                   
                    return JSON.stringify(actjson);               
                }
                
            }
            
        },
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if(e[key1].eeEstados){
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        
                        return e[key1][mapCud];
                    }else
                    {
                        alertDialogs(e[key1].eeEstados[0].Estado);   
                    }
                }},
            model: {
                id: "vdd__cod",
                fields: {
                    vdd__cod:    {editable: true, nullable: false},
                    trr__cod:    {editable: true, nullable: false},
                    trr__nom:    {editable: true, nullable: false},  
                    ter__raz:    {editable: true, nullable: false}
                    
                    
                }
                
            }
        },error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });
    var grid1 = $("#gridDetalleVendedor").kendoGrid({
        dataSource: dataSource,
        
        columns: [
            {field: "trr__nom", title: "Territorios",  hidden:false, editor: territorio,
                template: function (e) {
                    return e.trr__nom;
                }},
            
            {command: [
                    {name: "deletae", text: "destroy", template: "<a id='borrar' class='k-grid-deletae'><span id='borrar' class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "70px"}],
        
        editable: "popup",              
        dataBound: function (e) {
            var datos_vendedor = JSON.parse(sessionStorage.getItem("Detalle_Vendedor"));
            if (datos_vendedor.vdd__est==1){
                var tamaño=document.getElementsByClassName("k-sprite po_cerrar").length;
                for (var i = 0; i < tamaño; i++) {
                    document.getElementsByClassName("k-sprite po_cerrar")[i].hidden="true";
                }
            }
            else
            {}
        },                    
    });
    
}
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
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.sre__cod + " ---?", "400px", "200px", true, true, actions);
        
    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
}
function volverVendedores(){
    sessionStorage.removeItem("Detalle_Vendedor");
    window.location = ("vendedores.html");
}


function agregarItemDetalle(){
    var grid1 = $("#gridDetalleVendedor").data("kendoGrid");
    grid1.addRow();
}
function territorio(container, options) {debugger
    var consultar = new sirTerritorio();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eegpd_trr";
    $('<input  id = "territorios" />')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "trr__nom",
        dataValueField: "trr__cod",
        autoClose: true,
        placeholder: "Territorios..",
        template:'<div class="divElementDropDownList">#: data.trr__nom #</div>',  
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "trr__cod",
                    fields: {
                        trr__cod: {editable: false, nullable: false},
                        trr__nom: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}        


function clickEliminar(e) {
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#gridDetalleVendedor").data("kendoGrid").dataItem($(e.target).closest("tr"));
        
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            
            
            var dataSource = $("#gridDetalleVendedor").data("kendoGrid").dataSource;
            dataSource.remove(dataItem);
            dataSource.sync();
            bandAlert = 0; 
            
            
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.trr__nom + " ---?", "400px", "200px", true, true, actions);
        
    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
}
function cerrar(){
    //onClosex();
    $("#windowform").data("kendoWindow").close();
    
    
}  