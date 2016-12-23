                   
/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 100);
                        
});
                    
                    
/**
 * FUNCION crear usuario nuevo
 * grid1 variable almacena data de grid
 *  
 *   
 *  
 *  
 */ function newrol(){debugger
    var grid1 = $("#grid").data("kendoGrid");
    var dataSource = $("#grid").data("kendoGrid").dataSource;
                            
    grid1.options.editable = "popup";
    grid1.addRow();
    grid1.options.editable = "popup";
                            
}
function editar_rol(){debugger
                	
                    
    var grid1 = $("#grid").data("kendoGrid");
                        
    //                        var row = grid1.dataItem(grid1.select());
    //                        sessionStorage.setItem("Idrol",row.car__cod);
    //                         sessionStorage.setItem("Rolname",row.car__nom);
    window.location = ("tareas.html");
}
                    

                    
                    
$(document).ready(function() {
                                            
                    
    $("#toolbar").kendoToolBar({
        items: [
                                
                                
            { template: "<label>Buscar:</label>" },
            {
                template: "<input id='filtro' style='width: auto;'/>",
                overflow: "always"
            }
                                
        ]
    });
                        
                        
});

/**
 * FUNCION CRUD
 *  VAR mapCud =  variable gestion de funcion squema 
 *  VAR key1 = variable gestion de estado de respuesta de servicio 
 *  var cclave1 y  var cclave1 almacenan valor de campos contraseña y validacion de contgraseña
 *  var  consultar obtiene funcion Sir para consultar
 *  var datajson contiene el json para enviar al servicio de consulta
 *  var urlService contiene url del servicio read 
 *  var  actualizar obtiene funcion create / update
 *  var  actjson : json para enviar al servicio de actualizar / crear
 *  var urlactualizar: url de servicio para actualizar / crear 
 *  
 */ 
$(document).ready(function () {                             
    var windowTemplate = kendo.template($("#windowTemplate").html());
    var  consultar = new sirTerritorio();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
                        
    var  actualizar = new cudTerritorio();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();

    var mapCud = "eegpd_trr";
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            update: {
                url: urlactualizar,
                dataType: "json",
                type: "PUT",
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
                if (operation === "read") {debugger
                    return JSON.stringify(datajson);
                }
                if (operation === "update") {debugger
                    var cedula = $("#cedula").data("kendoDropDownList").text();
                     var region = $("#region").data("kendoDropDownList").text();
                     var x=0;
                    if (options.sre__est===true){x=1;}
                    else{x=0;}
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__cod=region;  
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__cod=options.sre__cod; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__est=x; 
                    actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__nit=cedula; 
                    return JSON.stringify(actjson);
                                        
                                        
                }
                if (operation === "create") {debugger
                     var cedula = $("#cedula").data("kendoDropDownList").text();
                     //var region = $("#region").data("kendoDropDownList").text();
                     var x=0;
                    if (options.trr__est===true){x=1;}
                    else{x=0;}
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].rgeo__cod=parseInt(cedula);  
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__nom=options.trr__nom; 
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__est=x; 
                   
                    return JSON.stringify(actjson);          
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();                                     
                }
                if (operation === "destroy") {debugger
                    var x=0;
                    if (options.trr__est===true){x=1;}
                    else{x=0;}
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].rgeo__cod=parseInt(cedula);  
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__nom=options.trr__nom; 
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__est=x; 

                    
                    return JSON.stringify(actjson);
                                        
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();                                    
                                        
                                        
                }
                                    
            }
                                
        },
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {debugger
                var key1 = Object.keys(e)[0];
                if(e[key1].eeEstados){
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud];
                    }else
                    {
                    alertDialogs("Error"+e[key1].eeEstados[0].Estado);    
                    }
                }},
            model: {
                id: "trr__cod",
                fields: {
                    trr__cod:    {editable: false, nullable: false},
                    trr__nom:    {editable: true, nullable: false},
                    rgeo__cod:    {editable: true, nullable: false},            
                    trr__est:    {editable: true, nullable: false,type: "boolean"},         
                }
            }
        }
    });
    var window = $("#window1").kendoWindow({
        title: "Eliminar",
        visible: false, //the window will not appear before its .open method is called

    }).data("kendoWindow");
    /**
     *  FUNCION CREAR GRILLA
     * Funcion cancel se ejecuta con el evento OnClick de EDIT grid
     *  cancel: function(e) {                                              
                            e._defaultPrevented= true;
                            $('#grid').data('kendoGrid').refresh();                                             
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); `}                                                                                       
                       
     *  
     *  
     */
    var gridheigth = $("body").height();
    gridheigth = gridheigth*0.12 + gridheigth;
    var grid1 = $("#grid").kendoGrid({
        dataSource: dataSource,
                            
        height: gridheigth,
        sortable: true,
                           
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        //navigatable: true,
        columns: [
            {field: "trr__nom", title: "Territorio",  hidden:false},  
            {field: "rgeo__cod", title: "Cod Region",  hidden:false,editor: filtroestado,
                template: function (e) {debugger
                    return e.rgeo__cod;
                }},   
            {field: "trr__cod", title: "Cod Territorio",  hidden:false},
            
            {
                field: "trr__est",
                title: "Estado",
                template: '<input style="text-align:center" type="checkbox" #= trr__est ? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "80px"},
            {command: [{name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "90px"}],
        editable: "popup",
                            
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid').data('kendoGrid').refresh();                                             
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();                                                                                        
        } 
    });
               
    $("#filtro").kendoAutoComplete({ 
        dataTextField: "trr__nom",  
        dataValueField: "trr__nom",
        placeholder: "Territorio...",  
        dataSource: dataSource,                        
        filter: "startswith"                    
    });

     function clickEliminar(e) {debugger
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
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.trr__nom + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}                   
                        
 function filtroestado(container, options) {debugger

    var estados = [
        {text: "101001", valor: "1"},
        {text: "157001", valor: "2"},
    ];
    $('<input id="cedula" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "valor",
                dataSource: estados
            });
}                       

                        
 function regionCod(container, options) {

    var estados = [
        {text: "101001", valor: "1"},
        {text: "157001", valor: "2"},

    ];
    $('<input id="region" required name="' + options.field + '"/>'+options.model.rgeo__cod)
            .appendTo(container)
          
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "valor",               
                dataSource: estados
            });
               
}      
});
                    
                    

