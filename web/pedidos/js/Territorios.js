                   
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
 */ function newrol(){
    var grid1 = $("#grid").data("kendoGrid");
    var dataSource = $("#grid").data("kendoGrid").dataSource;
                            
    grid1.options.editable = "popup";
    grid1.addRow();
    grid1.options.editable = "popup";
                            
}
function editar_rol(){
                	
                    
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
 *  var cclave1 y  var cclave1 almacenan valor de campos contraseÃ±a y validacion de contgraseÃ±a
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
                if (operation === "read") {
                    return JSON.stringify(datajson);
                }
                if (operation === "update") {
                    var cedula = $("#cedula").data("kendoDropDownList").text();  
                     actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__cod=options.trr__cod;
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].rgeo__cod=parseInt(cedula);  
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__nom=options.trr__nom;
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].rgeo__nom=options.rgeo__nom;
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__est=options.trr__est; 
                    return JSON.stringify(actjson);
                                        
                                        
                }
                if (operation === "create") {
                     var cedula = $("#cedula").data("kendoDropDownList").text();
                    
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].rgeo__cod=parseInt(cedula);  
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__nom=options.trr__nom;
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].rgeo__nom=options.rgeo__nom;
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__est=options.trr__est; 
                   
                    return JSON.stringify(actjson);          
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();                                     
                }
                if (operation === "destroy") {
                    //var cedula = $("#cedula").data("kendoDropDownList").text();
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__cod=options.trr__cod;
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].rgeo__cod=options.rgeo__cod;  
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__nom=options.trr__nom; 
                    actjson.dsSICUDgpd_trr.eegpd_trr[0].trr__est=options.trr__est; 
                   

                    
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
            data: function (e) {
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
                    rgeo__cod:   {editable: true, nullable: false},  
                    rgeo__nom:   {editable: true, nullable: false},  
                    trr__est:    {editable: true, nullable: false},         
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
   
    var grid1 = $("#grid").kendoGrid({
        dataSource: dataSource,
                            
        
        sortable: true,
                           
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        //navigatable: true,
        columns: [
            {field: "trr__cod", title: "Codigo Terrotorio ",  hidden:false},  
            {field: "trr__nom", title: "Territorio ",  hidden:false},   
            {field: "rgeo__cod", title: "Cod Region",  hidden:false,editor: region,
                template: function (e) {
                    return e.rgeo__cod;
                }},
             {field: "rgeo__nom", title: "Region",  hidden:false},
            
            {command: [
                    {name: "check", text: "estado",click: changeEst, template: "<a class='k-grid-check'><span class='k-sprite po_editoff' ></span></a>" },
                    {name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "140px"}],
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function () {
            var results = dataSource.data();
            changImgFunc(results);
        },                      
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
        createDialog("AtenciÃ³n", "Esta seguro de eliminar el Registro ---" + dataItem.trr__nom + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}                   
                        
 function region(container, options) {

    var estados = [
        {text: "101001", valor: "1"},
        {text: "157001", valor: "2"},
    ];
    $('<input id="cedula" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "text",
                dataSource: estados
            });
}                       
function region(container, options) {

    var estados = [
        {text: "101001", valor: "1"},
        {text: "157001", valor: "2"},
    ];
    $('<input id="cedula" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "text",
                dataSource: estados
            });
}                       
                        
 function filtroestado(container, options) {

    var estados = [
        {text: "101001", valor: "1"},
        {text: "157001", valor: "2"},

    ];
    $('<input id="region" required name="' + options.field + '"/>'+options.model.rgeo__cod)
            .appendTo(container)
          
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "text",               
                dataSource: estados
            });
               
}      
});
                    
 function changImgFunc(results) {
    for (var i = 0; i < results.length; i++) {
            if (document.getElementById("spanproceso"+results[i].trr__cod+results[i].trr__nom+results[i].rgeo__cod)){
                if(results[i].trr__est==0){                            
                    document.getElementById("spanproceso"+results[i].trr__cod+results[i].trr__nom+results[i].rgeo__cod).setAttribute("class", "k-sprite po_checkAct");   
                }
                if(results[i].trr__est==99){     
                    document.getElementById("spanproceso"+results[i].trr__cod+results[i].trr__nom+results[i].rgeo__cod).setAttribute("class", "k-sprite po_checkCreate");
                }
                if(results[i].trr__est==1){     
                    document.getElementById("spanproceso"+results[i].trr__cod+results[i].trr__nom+results[i].rgeo__cod).setAttribute("class", "k-sprite po_checkBloq");
                }
            }
        }
 }

function changeEst(e){debugger
//    var  actualizar = new cudCliente();
//    var  actjson = actualizar.getjson();
//    var  urlactualizar = actualizar.getUrlSir();
//    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
//    try {
//           
//            
//        var actions = new Array();
//        actions[0] = new Object();
//        actions[0].text = "OK";
//        actions[0].action = function () {debugger
//            if(seleccion.ctr__est==0){  
//                actjson.dsSICUDgpd_cli_est.eegpd_cli_est[0].gpd__cli__est=seleccion.gpd__cli__est;                      
//                actjson.dsSICUDgpd_cli_est.eegpd_cli_est[0].gpd__cli__des=seleccion.gpd__cli__des; 
//                actjson.dsSICUDgpd_cli_est.eegpd_cli_est[0].ctr__est=1; 
//                $.ajax({
//        
//                    type: "PUT",        
//                    async: false,
//                    data: JSON.stringify(actjson),
//                    url: urlactualizar,
//                    dataType: "json",        
//                    contentType: "application/json;",
//                    success: function (resp) {debugger
//                        if((resp.dsSICUDgpd_cli_est.eeEstados[0].Estado)=="OK")
//                        {     
//                            $('#grid').data('kendoGrid').refresh();
//                            $('#grid').data('kendoGrid').dataSource.read();
//                            $('#grid').data('kendoGrid').refresh();                             
//                        }
//                        else
//                        {
//                            alertDialogs("Error"+resp.dsSICUDgpd_cli_est.eeEstados[0].Estado); 
//                            $('#grid').data('kendoGrid').refresh();
//                            $('#grid').data('kendoGrid').dataSource.read();
//                            $('#grid').data('kendoGrid').refresh();                             
//                        }
//                    } 
//        
//                });
//            }
//
//            if(seleccion.ctr__est==99){  
//                actjson.dsSICUDgpd_cli_est.eegpd_cli_est[0].gpd__cli__est=seleccion.gpd__cli__est;                      
//                actjson.dsSICUDgpd_cli_est.eegpd_cli_est[0].gpd__cli__des=seleccion.gpd__cli__des; 
//                actjson.dsSICUDgpd_cli_est.eegpd_cli_est[0].ctr__est=0;  
//                $.ajax({
//        
//                    type: "PUT",        
//                    async: false,
//                    data: JSON.stringify(actjson),
//                    url: urlactualizar,
//                    dataType: "json",        
//                    contentType: "application/json;",
//                    success: function (resp) {debugger
//                        if((resp.dsSICUDgpd_cli_est.eeEstados[0].Estado)=="OK")
//                        {          
//                            $('#grid').data('kendoGrid').refresh();
//                            $('#grid').data('kendoGrid').dataSource.read();
//                            $('#grid').data('kendoGrid').refresh();    
//                        }
//                        else
//                        {
//                            alertDialogs("Error"+resp.dsSICUDgpd_cli_est.eeEstados[0].Estado);  
//                            $('#grid').data('kendoGrid').refresh();
//                            $('#grid').data('kendoGrid').dataSource.read();
//                            $('#grid').data('kendoGrid').refresh(); 
//                        }
//                    }        
//                });
//            }
//            bandAlert = 0;
//        };
//        actions[1] = new Object();
//        actions[1].text = "Cancelar";
//        actions[1].action = function () {debugger
//            bandAlert = 0;
//        };
//        createDialog("Atención", "Esta seguro de cambiar estado de Registro ---" + seleccion.gpd__cli__des + " ---?", "400px", "200px", true, true, actions);
//
//    } catch (e) {debugger
//        createDialog(e);
//        $('#grid').data('kendoGrid').dataSource.read();
//        $('#grid').data('kendoGrid').refresh();
//    }
//    
 
}    
