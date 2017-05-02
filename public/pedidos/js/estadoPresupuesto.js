                   
/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {    
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 60);
    $('.k-grid-content').height(viewportHeight - 100);
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
    var  consultar = new sirPresupuesto();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
                        
    var  actualizar = new cudPresupuesto();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();

    var mapCud = "eegpd_pre_est";
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
                    actjson.dsSICUDgpd_pre_est.eegpd_pre_est[0].gpd__pre__des=options.gpd__pre__des;  
                    actjson.dsSICUDgpd_pre_est.eegpd_pre_est[0].gpd__pre__est=options.gpd__pre__est;   
                    return JSON.stringify(actjson);
                    $('#grid').data('kendoGrid').refresh();                                             
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();                    
                                        
                }
                if (operation === "create") {
                    options.ctr__est=99;
                    actjson.dsSICUDgpd_pre_est.eegpd_pre_est[0]=options;              
                    
                    return JSON.stringify(actjson);
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();      
                    // window.location.reload();                                  
                }
                if (operation === "destroy") {
                    actjson.dsSICUDgpd_pre_est.eegpd_pre_est[0].gpd__pre__des=options.gpd__pre__des;  
                    actjson.dsSICUDgpd_pre_est.eegpd_pre_est[0].gpd__pre__est=options.gpd__pre__est;  
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
                id: "gpd__pre__est",
                fields: {
                    gpd__pre__des:    {editable: true, nullable: false},
                    gpd__pre__est:    {editable: true, nullable: false},
                    ctr__est:    {editable: true, nullable: false}                   
                                        
                },
             
            }
        },error: function (e) {
            alertDialogs(e.errorThrown);
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
    $(window).trigger("resize");  
    var grid1 = $("#grid").kendoGrid({
        dataSource: dataSource,        
        sortable: true,
        pageable: false,
        columns: [
            {field: "gpd__pre__des", title: "Estado De Presupuesto",  hidden:false},
                                 	
            {command: [
                    {name: "check", text: "estado",click: changeEst, template: "<a class='k-grid-check'><span class='k-sprite po_checkCreate' ></span></a>" },
                    {name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "140px"}],
        editable: "popup",
        edit: function(e) {
            if (!e.model.isNew()) {//caso en el que el popup es editar
                if(e.model.ctr__est!= 99 ){
                    kendo.ui.progress($('.k-edit-form-container'), true);
                    kendo.ui.progress($('.k-edit-buttons'), true);
                    e.container.find(".k-loading-image").css("background-image", "url('')");

                }
            }
            else{//caso en el que el popup es crear

            }
        } ,
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function (e) {
            var results = dataSource.data();
            changImgFunc(results,e);
        },                     
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid').data('kendoGrid').refresh();                                             
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();                                                                                        
        } 
    });
               
    $("#filtro").kendoAutoComplete({ 
        dataTextField: "gpd__pre__des",  
        dataValueField: "gpd__pre__des",
        placeholder: "Presupuesto...",  
        dataSource: dataSource,                        
        filter: "startswith"                    
    });

    function clickEliminar(e) {
        try {
            var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
            e.preventDefault();
            var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));
            if (dataItem.ctr__est!= 99){
                alertDialogs("No se puede eliminar por el estado ");  
            }else{
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
                createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.gpd__pre__des + " ---?", "400px", "200px", true, true, actions);
            }
        } catch (e) {
            alert(e);
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        }
    }                   
    function changImgFunc(results , e) {
     
        for (var i = 0; i < results.length; i++) {
            if (document.getElementById("spanproceso"+results[i].gpd__pre__des)){
                if(results[i].ctr__est==0){                            
                    document.getElementById("spanproceso"+results[i].gpd__pre__des).setAttribute("class", "k-sprite po_checkAct");   
                }
                if(results[i].ctr__est==99){     
                    document.getElementById("spanproceso"+results[i].gpd__pre__des).setAttribute("class", "k-sprite po_checkCreate");
                }
                if(results[i].ctr__est==1){     
                    document.getElementById("spanproceso"+results[i].gpd__pre__des).setAttribute("class", "k-sprite po_checkBloq");

                }
            }
        }

    }                    
                        
                        
});
                    
function changeEst(e){
    var  actualizar = new cudPresupuesto();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
    try {
           
            
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if(seleccion.ctr__est==0){  
                actjson.dsSICUDgpd_pre_est.eegpd_pre_est[0].gpd__pre__est=seleccion.gpd__pre__est;                      
                actjson.dsSICUDgpd_pre_est.eegpd_pre_est[0].gpd__pre__des=seleccion.gpd__pre__des; 
                actjson.dsSICUDgpd_pre_est.eegpd_pre_est[0].ctr__est=1; 
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_pre_est.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_cli_est.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
        
                });
            }

            if(seleccion.ctr__est==99){  
                actjson.dsSICUDgpd_pre_est.eegpd_pre_est[0].gpd__pre__est=seleccion.gpd__pre__est;                      
                actjson.dsSICUDgpd_pre_est.eegpd_pre_est[0].gpd__pre__des=seleccion.gpd__pre__des; 
                actjson.dsSICUDgpd_pre_est.eegpd_pre_est[0].ctr__est=0;  
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_pre_est.eeEstados[0].Estado)=="OK")
                        {          
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();    
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_pre_est.eeEstados[0].Estado);  
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); 
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
        createDialog("Atención", "Esta seguro de cambiar estado de Registro ---" + seleccion.gpd__pre__des + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        createDialog(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
 
}             
                   
                

