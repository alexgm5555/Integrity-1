                  
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

     
        var myWindow = $("#window1"),
        undo = $("#undo");
        function onClose() {
            undo.fadeIn();
            $('#gridproceso').data('kendoGrid').refresh();
            $('#gridproceso').data('kendoGrid').dataSource.read();
            $('#gridproceso').data('kendoGrid').refresh();
        }
        var UrL= sessionStorage.getItem("url");  
        myWindow.kendoWindow({
            draggable: true,
            height: "70%",
            modal: true,
            resizable: false,
            title: "Rutas",
            width: "60%",
            content: UrL+"pedidos/html/popupCrearuta.html",
            actions: [
                "Close"
            ],                                
            close: onClose
        }).data("kendoWindow").center().open();            
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
    var  consultar = new sirTransportistas();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
                        
    var  actualizar = new cudAnulaPedido();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();

    var mapCud = "eedpc_rut";
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
                    
                   //actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__cod=options.anu__cod;  
                   //actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__des=options.anu__des;
                   //actjson.dsSICUDgpd_anu.eegpd_anu[0].gpd__est=options.gpd__est;     
                    return JSON.stringify(actjson);
                                        
                                        
                }
                if (operation === "create") {
                   actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__des=options.anu__des;
                   actjson.dsSICUDgpd_anu.eegpd_anu[0].gpd__est=options.gpd__est; 
                    return JSON.stringify(actjson);          
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();                                     
                }
                if (operation === "destroy") {
                         
                   actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__cod=options.anu__cod;  
                   actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__des=options.anu__des;
                   actjson.dsSICUDgpd_anu.eegpd_anu[0].gpd__est=options.gpd__est;  
                    
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
                id: "rut__cod",
            fields: {
                    bar__cod1:    {editable: true, nullable: false},
                    bar__cod2:    {editable: true, nullable: false},  
                    ciu__cod1:    {editable: true, nullable: false},   
                    ciu__cod2:    {editable: true, nullable: false},   
                    rut__cod:     {editable: true, nullable: false},  
                    rut__des:     {editable: true, nullable: false},  
                    bar__dsc1:    {editable: true, nullable: false},   
                    bar__dsc2:    {editable: true, nullable: false},  
                    ciu__nom1:    {editable: true, nullable: false},
                    ciu__nom2:    {editable: true, nullable: false}
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
            {field: "rut__cod", title: "Cod Ruta",  hidden:false},  
            {field: "rut__des", title: "Descripcion",  hidden:false},
            {field: "ciu__nom1", title: "Ciudad Origen",  hidden:false},
            {field: "bar__dsc1", title: "Barrio Origen",  hidden:false},
            {field: "ciu__nom2", title: "Ciudad Destino",  hidden:false},  
            {field: "bar__dsc2", title: "Barrio destino",  hidden:false},

            {command: [
                    {name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
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
        dataTextField: "rut__cod",  
        dataValueField: "rut__cod",
        placeholder: "ruta...",  
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
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.bar__dsc + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}                   
                        
   
});
 

                    

