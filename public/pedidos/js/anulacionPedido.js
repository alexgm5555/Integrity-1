
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
 */ function addRow(){
    var grid1 = $("#grid").data("kendoGrid");
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    
    grid1.options.editable = "popup";
    grid1.addRow();
    grid1.options.editable = "popup";
    
}
//function editar_rol(){
//    var grid1 = $("#grid").data("kendoGrid");
//    window.location = ("tareas.html");
//}




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
    var data = [
        {text: "Todos", value: "-1", clase: "po_checkCreate"},
        {text: "Creado", value: "99", clase: "po_checkCreate"},
        {text: "Activo", value: "0", clase: "po_checkAct"},
        {text: "Bloqueado", value: "1", clase: "po_checkBloq"}
        
    ];
    $("#fltrEst").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        //change: onChangeFltr,
        valueTemplate: "<span>#:data.text#</span>",
        template: "<a class='k-grid-aprobar' '><span class='k-sprite #: data.clase #'></span></a>" +
                '<span class="k-state-default"><h0>#: data.text #</h0>',
        dataSource: data,
        change: function (e) {
            var send = parseInt ($("#fltrEst").data("kendoDropDownList").value() ); 
            grilla(send);
        }        
    }); 
    
    var windowTemplate = kendo.template($("#windowTemplate").html());
    var window = $("#window1").kendoWindow({
        title: "Eliminar",
        visible: false, //the window will not appear before its .open method is called
        
    }).data("kendoWindow");
    
    function grilla(e){
        
        var  consultar = new sirAnulaPedido();
        var  datajson = consultar.getjson();
        var  urlService = consultar.getUrlSir();
        datajson.dsSIRgpd_anu.SIRgpd_anu[0].piigpd__est=e;      
        
        var  actualizar = new cudAnulaPedido();
        var  actjson = actualizar.getjson();
        var  urlactualizar = actualizar.getUrlSir();
        
        var mapCud = "eegpd_anu";
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
                        
                        actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__cod=options.anu__cod;  
                        actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__des=options.anu__des;
                        actjson.dsSICUDgpd_anu.eegpd_anu[0].gpd__est=options.gpd__est;     
                        return JSON.stringify(actjson);
                        
                        
                    }
                    if (operation === "create") {
                        actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__des=options.anu__des;
                        actjson.dsSICUDgpd_anu.eegpd_anu[0].gpd__est=99; 
                        return JSON.stringify(actjson);  
                       
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
                    id: "anu__cod",
                    fields: {
                        anu__cod:    {editable: false, nullable: false},
                        anu__des:    {editable: true, nullable: false},
                        gpd__est:    {editable: false, nullable: false},
                    }
                },
                error: function (e) {
                    alertDialogs(e.errorThrown);
                }
            }
        });
        
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
            
            //navigatable: true,
            columns: [ 
                {field: "anu__cod", title: "Código",  hidden:false, width: "100px"},  
                {field: "anu__des", title: "Descripción",  hidden:false},
                {command: [
                        {name: "check", text: "estado",click: changeEst, template: "<a class='k-grid-check'><span class='k-sprite po_editoff' ></span></a>" },
                        {name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff' ></span></a>"},
                        {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "140px"}],
            editable: "popup",
            edit: function(e) {
                if (!e.model.isNew()) {//caso en el que el popup es editar
                    if(e.model.gpd__est!= 99 ){  
                        kendo.ui.progress($('.k-edit-form-container'), true);
                        kendo.ui.progress($('.k-edit-buttons'), true);
                        e.container.find(".k-loading-image").css("background-image", "url('')");
                        
                    }else{
                        
                        
                    }
                }
                else{//caso en el que el popup es crear 
                    var buscarlabel = $("label").find("for");
                    Buscarlabel = buscarlabel.prevObject[0];
                    Buscarlabel.style.display = "none";
                }
            } ,
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
    }      
    grilla(-1);
    $("#filtro").kendoAutoComplete({ 
        dataTextField: "ter__nit",  
        dataValueField: "ter__nit",
        placeholder: "Cedula...",  
        dataSource: dataSource,                        
        filter: "startswith"                    
    });
    
    function clickEliminar(e) {
        try {
            var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
            e.preventDefault();
            var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));
            if (dataItem.gpd__est!= 99){
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
                createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.anu__des + " ---?", "400px", "200px", true, true, actions);
            }
        } catch (e) {
            alert(e);
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        }
        
    }
    
    
    
});

function changImgFunc(results , e) {
    
    for (var i = 0; i < results.length; i++) {
        if (document.getElementById("spanproceso"+results[i].anu__des+results[i].anu__cod)){
            if(results[i].gpd__est==0){                            
                document.getElementById("spanproceso"+results[i].anu__des+results[i].anu__cod).setAttribute("class", "k-sprite po_checkAct");   
                //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "disable();");
            }
            if(results[i].gpd__est==99){     
                document.getElementById("spanproceso"+results[i].anu__des+results[i].anu__cod).setAttribute("class", "k-sprite po_checkCreate");
                //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "active();");
            }
            if(results[i].gpd__est==1){     
                document.getElementById("spanproceso"+results[i].anu__des+results[i].anu__cod).setAttribute("class", "k-sprite po_checkBloq");
                
            }
        }
    }
    
} 


function changeEst(e){
    var  actualizar = new cudAnulaPedido();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
    try {
        
        
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if(seleccion.gpd__est==0){  
                actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__cod=seleccion.anu__cod;  
                actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__des=seleccion.anu__des;
                actjson.dsSICUDgpd_anu.eegpd_anu[0].gpd__est=1; 
                $.ajax({
                    
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_anu.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_anu.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
                    
                });
            }
            
            if(seleccion.gpd__est==99){  
                actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__cod=seleccion.anu__cod;  
                actjson.dsSICUDgpd_anu.eegpd_anu[0].anu__des=seleccion.anu__des;
                actjson.dsSICUDgpd_anu.eegpd_anu[0].gpd__est=0;  
                $.ajax({
                    
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_anu.eeEstados[0].Estado)=="OK")
                        {          
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();    
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_anu.eeEstados[0].Estado);  
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
        createDialog("Atención", "Esta seguro de cambiar estado de Registro ---" + seleccion.anu__des + " ---?", "400px", "200px", true, true, actions);
        
    } catch (e) {
        createDialog(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
    
}             

