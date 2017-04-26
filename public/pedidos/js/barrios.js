
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
        var  consultar = new sirBarrios();
        var  datajson = consultar.getjson();
        var  urlService = consultar.getUrlSir();
        datajson.dsSIRgpd_bar.SIRgpd_bar[0].picbar__est=e;               
        var  actualizar = new  cudBarrios();
        var  actjson = actualizar.getjson();
        var  urlactualizar = actualizar.getUrlSir();
        
        var mapCud = "eegpd_bar";
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
                        var ciudad_cod = $("#ciudades").data("kendoComboBox")._old;
                        var ciudad_nom = $("#ciudades").data("kendoComboBox")._prev;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].ciu__cod=ciudad_cod;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].ciu__nom=ciudad_nom;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__cod=options.bar__cod;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__dsc=options.bar__dsc;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__str=options.bar__str;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__est=options.bar__est;   
                        return JSON.stringify(actjson);
                        
                        
                    }
                    if (operation === "create") {
                        var ciudad_cod = $("#ciudades").data("kendoComboBox")._old;
                        var ciudad_nom = $("#ciudades").data("kendoComboBox")._prev;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].ciu__cod=ciudad_cod;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].ciu__nom=ciudad_nom;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__cod=options.bar__cod;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__dsc=options.bar__dsc;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__str=options.bar__str;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__est=99;
                        return JSON.stringify(actjson);          
                        $('#grid').data('kendoGrid').refresh();
                        $('#grid').data('kendoGrid').dataSource.read();
                        $('#grid').data('kendoGrid').refresh();                                     
                    }
                    if (operation === "destroy") {
                        
                        actjson.dsSICUgpd_bar.eegpd_bar[0].ciu__cod=options.ciu__cod;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].ciu__nom=options.ciu__nom;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__cod=options.bar__cod;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__dsc=options.bar__dsc;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__str=options.bar__str;
                        actjson.dsSICUgpd_bar.eegpd_bar[0].bar__est=options.bar__est;
                        
                        
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
                    id: "bar__cod",
                    fields: {
                        ciu__cod:    {editable: true, nullable: false},
                        bar__cod:    {editable: true, nullable: false},  
                        bar__dsc:    {editable: true, nullable: false},   
                        bar__str:    {editable: true, nullable: false},   
                        bar__est:    {editable: true, nullable: false},
                        ciu__nom:    {editable: true, nullable: false},
                    },
                    
                }
            },error: function (e) {
                        alertDialogs(e.errorThrown);
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
            columns: [ 
                {field: "ciu__nom", title: "Ciudad",  hidden:false,editor:ciudades,
                    template: function (e) {
                        return e.ciu__nom;
                    }},     
                {field: "bar__cod", title: "Codigo",  hidden:true}, 
                {field: "bar__dsc", title: "Descripcion Barrio",  hidden:false},
                {field: "bar__str", title: "Estrato de Barrio",  hidden:false},
                {command: [
                        {name: "check", text: "estado", click: changeEst,template: "<a class='k-grid-check'><span class='k-sprite po_editoff' ></span></a>" },
                        {name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff' ></span></a>"},
                        {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "140px"}],
            
            editable: "popup",
            edit: function(e) {
                if (!e.model.isNew()) {//caso en el que el popup es editar
                    if(e.model.bar__est!= 99 ){
                        
                        
                        kendo.ui.progress($('.k-edit-form-container'), true);
                        kendo.ui.progress($('.k-edit-buttons'), true);
                        e.container.find(".k-loading-image").css("background-image", "url('')");
                        
                    }else{
                        
                    }
                }
                else{//caso en el que el popup es crear 
                    
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
        dataTextField: "bar__dsc",  
        dataValueField: "bar__dsc",
        placeholder: "Barrio...",  
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
function ciudades(container, options) {
    
    var consultar = new sirCiudades();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eesic_ciu";
    $('<input  id = "ciudades" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
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
                        alertDialogs("Error Con Servicio Cuidades"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__nom: {editable: false, nullable: false},
                        ciu__cod: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}

function changImgFunc(results) {
    
    for (var i = 0; i < results.length; i++) {
        if (document.getElementById("spanproceso"+results[i].bar__cod+results[i].bar__dsc)){
            if(results[i].bar__est==0){                            
                document.getElementById("spanproceso"+results[i].bar__cod+results[i].bar__dsc).setAttribute("class", "k-sprite po_checkAct");   
                //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "disable();");
            }
            if(results[i].bar__est==99){     
                document.getElementById("spanproceso"+results[i].bar__cod+results[i].bar__dsc).setAttribute("class", "k-sprite po_checkCreate");
                //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "active();");
            }
            if(results[i].bar__est==1){     
                document.getElementById("spanproceso"+results[i].bar__cod+results[i].bar__dsc).setAttribute("class", "k-sprite po_checkBloq");
                
            }
        }
    }
    
}


function changeEst(e){
    var  actualizar = new cudBarrios();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
    try {
        
        
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if(seleccion.bar__est==0){  
                actjson.dsSICUgpd_bar.eegpd_bar[0].ciu__cod=seleccion.ciu__cod;
                actjson.dsSICUgpd_bar.eegpd_bar[0].ciu__nom=seleccion.ciu__nom;
                actjson.dsSICUgpd_bar.eegpd_bar[0].bar__cod=seleccion.bar__cod;
                actjson.dsSICUgpd_bar.eegpd_bar[0].bar__dsc=seleccion.bar__dsc;
                actjson.dsSICUgpd_bar.eegpd_bar[0].bar__str=seleccion.bar__str;
                actjson.dsSICUgpd_bar.eegpd_bar[0].bar__est=1;
                $.ajax({
                    
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUgpd_bar.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUgpd_bar.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
                    
                });
            }
            
            if(seleccion.bar__est==99){  
                actjson.dsSICUgpd_bar.eegpd_bar[0].ciu__cod=seleccion.ciu__cod;
                actjson.dsSICUgpd_bar.eegpd_bar[0].ciu__nom=seleccion.ciu__nom;
                actjson.dsSICUgpd_bar.eegpd_bar[0].bar__cod=seleccion.bar__cod;
                actjson.dsSICUgpd_bar.eegpd_bar[0].bar__dsc=seleccion.bar__dsc;
                actjson.dsSICUgpd_bar.eegpd_bar[0].bar__str=seleccion.bar__str;
                actjson.dsSICUgpd_bar.eegpd_bar[0].bar__est=0;  
                $.ajax({
                    
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUgpd_bar.eeEstados[0].Estado)=="OK")
                        {          
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();    
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUgpd_bar.eeEstados[0].Estado);  
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
        createDialog("Atención", "Esta seguro de cambiar estado de Registro ---" + seleccion.bar__dsc + " ---?", "400px", "200px", true, true, actions);
        
    } catch (e) {
        createDialog(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
    
}             
