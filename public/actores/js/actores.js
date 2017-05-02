                    
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
    var  consultar = new siractores();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
                        
    var  actualizar = new creaActor();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
                        
                        
    //var crudServiceBaseUrl = "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SirUsuarios";
    var mapCud = "eesic_actor";
    var mapCud1 = "ee_user3";
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
                    actjson.dssic_actor.eesic_actor[0].actor__cod = options.actor__cod;
                    actjson.dssic_actor.eesic_actor[0].actor__des = options.actor__des;
                    return JSON.stringify(actjson);
                                        
                                        
                }
                if (operation === "create") {
                    options;
                    actjson.dssic_actor.eesic_actor[0].actor__cod = options.actor__cod;
                    actjson.dssic_actor.eesic_actor[0].actor__des = options.actor__des;
                    return JSON.stringify(actjson);
                                        
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();                                     
                }
                if (operation === "destroy") {
                                        
                    actjson.dssic_actor.eesic_actor[0].actor__cod = options.actor__cod;
                    actjson.dssic_actor.eesic_actor[0].actor__des = options.actor__des;
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
                    }
                }else if(e[key1].dssic_car.dssic_car.eeEstados[0].Estado === "OK"){
                    return e[key1].dssic_car.dssic_car["eebpm_proc"];
                } else {
                    alert(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "actor__cod",
                fields: {
                    actor__cod:    {editable: true, nullable: false},
                    actor__des:    {editable: true, nullable: false},
                                       
                                        
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
        selectable: true,
        pageable: false,
        //navigatable: true,
        columns: [
            {field: "actor__cod", title: "Actor",  hidden:false},
            {field: "actor__des", title: "Descripción",  hidden:false},	
                                 	
            {command: [{name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: function(e){  //add a click event listener on the delete button
                            e.preventDefault(); //prevent page scroll reset
                            var tr = $(e.target).closest("tr"); //get the row for deletion
                            var data = this.dataItem(tr); //get the row data so it can be referred later
                            window.content(windowTemplate(data)); //send the row data object to the template and render it
                            window.center().open();

                            $("#yesButton").click(function(){
                                var dataSource = $("#grid").data("kendoGrid").dataSource;
                                dataSource.remove(data);  //prepare a "destroy" request
                                dataSource.sync();  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
                                window.close();
                            });
                            $("#noButton").click(function(){
                                window.close();
                            });
                        } } ], width: "90px"}],
        editable: "popup",
                            
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid').data('kendoGrid').refresh();                                             
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();                                                                                        
        } 
    });
                        
                        
                        
    $("#filtro").kendoAutoComplete({ 
        dataTextField: "actor__des",
        dataValueField: "actor__des",
        placeholder: "Proceso...",  
        dataSource: dataSource,                        
        filter: "startswith"                    
    });       
});
                    
//                    
//$(document).ready(function() {
//                        
//    $("body").css("display", "none");
//                        
//    $("body").fadeIn(2000);
//                        
//    $("a.transition").click(function(event){
//        event.preventDefault();
//        linkLocation = this.href;
//        $("body").fadeOut(1000, redirectPage);		
//    });
//                        
//    function redirectPage() {
//        window.location = linkLocation;
//    }
//                        
//});
