                   
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
    var  consultar = new sirSupArea();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
    datajson.dsSIRgpd_sar.SIRgpd_sar[0].piisar__est=e;      
    var  actualizar = new cudSupArea();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();

    var mapCud = "eegpd_sar";
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
                    var cedula = $("#cedula")[0].value;
                    var nombre = $("#nombre")[0].value;
                    var pais = $("#pais").data("kendoDropDownList");
                    var area = $("#area").data("kendoDropDownList");
                    var select = pais.selectedIndex;
                    pais = pais.dataSource._data[select].ciu__cod;
                    var select = area.selectedIndex;
                    area = area.dataSource._data[select].ageo__cod;
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=options.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=pais;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ciu__nom=options.ciu__nom;
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=cedula;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=nombre; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=options.sar__est;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=area; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__nom=options.ageo__nom; 
                    return JSON.stringify(actjson);          
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();   
                    
                }
                if (operation === "create") {
                    var cedula = $("#cedula")[0].value;
                    var nombre = $("#nombre")[0].value;
                     var pais = $("#pais").data("kendoDropDownList");
                     var area = $("#area").data("kendoDropDownList");
                     var select = pais.selectedIndex;
                    pais = pais.dataSource._data[select].ciu__cod;
                    var select = area.selectedIndex;
                    area = area.dataSource._data[select].ageo__cod;
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=parseInt(pais);  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=cedula;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=99;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=area; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__nom=options.ageo__nom;
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ciu__nom=options.ciu__nom; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=nombre;  
                    
                    return JSON.stringify(actjson);          
                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();                                     
                }
                if (operation === "destroy") {
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=options.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=options.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=options.ter__nit;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=options.sar__est;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=options.ageo__cod; 
                    
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
                id: "sar__cod",
                fields: {
                    sar__cod:    {editable: false, nullable: false},
                    ter__nit:    {editable: true, nullable: false},
                    ageo__cod:    {editable: true, nullable: false},
                    ageo__nom:    {editable: true, nullable: false},
                    pai__cod:    {editable: true, nullable: false},
                    ter__raz:    {editable: true, nullable: false},
                    sar__est:    {editable: true, nullable: false}, 
                    ciu__nom:    {editable: true, nullable: false}, 
                }
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
    var gridheigth = $("body").height();
    gridheigth = gridheigth*0.12 + gridheigth;
    var grid1 = $("#grid").kendoGrid({
        dataSource: dataSource,
        columns: [
            {field: "sar__cod", title: "Codigo Supervisor",  hidden:false},
            {field: "ciu__nom", title: " Pais",editor: paisCod,
                template: function (e) {
                    return e.ciu__nom;
                }},    
             {field: "ageo__nom", title: "Area ",  hidden:false, editor: areaCod,
                template: function (e) {
                    return e.ageo__cod;
                }}, 
            {field: "ter__nit", title: "Cedula",  hidden:false,editor: filtroestado,
                template: function (e) {
                    return e.ter__nit;
                }},   
             {field: "ter__raz", title: "Nombre",   hidden:false, editor: nombre,
                template: function (e) {
                    return e.ter__raz;
                }}, 
           
            
           
            {command: [
                    {name: "check", text: "edit",click:  changeEst, template: "<a class='k-grid-check'><span class='k-sprite po_checkCreate'></span></a>"},
                    {name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "140px"}],
        editable: "popup",
         edit: function(e) {
            if (!e.model.isNew()) {//caso en el que el popup es editar
                if(e.model.sar__est!= 99 ){
                    
                    
                   kendo.ui.progress($('.k-edit-form-container'), true);
                   kendo.ui.progress($('.k-edit-buttons'), true);
                   e.container.find(".k-loading-image").css("background-image", "url('')");

            }else{
            $("#area").data("kendoDropDownList").enable(false);
            $("#pais").data("kendoDropDownList").enable(false);
            
            //e.container.find("span")[1].attr('disabled','disabled');
            //e.container.find("span[for='rgeo__nom']");
            
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
        placeholder: "Nit...",  
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
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.sar__cod + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }

}    
    function nombre(container, options) {
        var obj = new sirConsultaCliente();
        var objJson = obj.getjson();
        var url = obj.getUrlSir();
        var mapData = obj.getMapData();
        $('<input id="nombre" required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoAutoComplete({
            dataTextField: "ter__raz",
            dataValueField: "ter__nit",        
            placeholder: "Selecione un cliente...",
            minLength: 4,
            filter: "contains",
            select: function(e) {                
            $("#cedula").val(e.dataItem.ter__nit);    
            },
            template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
            //select: setInfoCliente,
            dataSource: {
                type: "json",
                serverFiltering: true,
                transport: {
                    read:{
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                        try {
                                          
                            if (operation === 'read') {
                                var key1 = Object.keys(objJson)[0];
                                var key2 = Object.keys(objJson[key1])[1];
                                objJson[key1][key2][0].picter_nit = "";
                                objJson[key1][key2][0].picter_raz = $("#nombre").val();
                                return JSON.stringify(objJson);
                            } 
                        } catch (e) {
                            alertDialogs(e.message);
                        }                                    
                    }
                },
                schema: {
                    data: function (e){
                        var key1 = Object.keys(e)[0];
                        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                            //$("#cedula").val(e.dsgfc_cli.eegfc_cli[0].ter__nit);
                            return e[key1][mapData];
                        }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !"){
                        
                        }else{
                            alertDialogs(e[key1].eeEstados[0].Estado);
                        }
                    },
                    model:{}
                },
                error: function (xhr, error) {
                    alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                },
                change: function (e) {
                    //console.log("Change client");
                },
                requestStart: function (e) {
                    //console.log("Request Start servicio cliente");
                }            
            }
        });    
          
      }
                 
    function filtroestado(container, options) {


        var obj = new sirConsultaCliente();
        var objJson = obj.getjson();
        var url = obj.getUrlSir();
        var mapData = obj.getMapData();
        $('<input id="cedula" required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoAutoComplete({
            dataTextField: "ter__nit",
            dataValueField: "ter__nit",        
            placeholder: "Selecione un cliente...",
            minLength: 6,
            filter: "contains",
            select: function(e) {                
            $("#nombre").val(e.dataItem.ter__raz);    
            },
            template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
            //select: setInfoCliente,
            dataSource: {
                type: "json",
                serverFiltering: true,
                transport: {
                    read:{
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                        try {
                                          
                            if (operation === 'read') {
                                var key1 = Object.keys(objJson)[0];
                                var key2 = Object.keys(objJson[key1])[1];
                                objJson[key1][key2][0].picter_nit = $("#cedula").val();
                                objJson[key1][key2][0].picter_raz = "";
                                return JSON.stringify(objJson);
                            } 
                        } catch (e) {
                            alertDialogs(e.message);
                        }                                    
                    }
                },
                schema: {
                    data: function (e){                    
                        var key1 = Object.keys(e)[0];
                        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                            return e[key1][mapData];
                        }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !!!"){
                        
                        }else{
                            alertDialogs(e[key1].eeEstados[0].Estado);
                        }
                    },
                    model:{}
                },
                error: function (xhr, error) {
                    alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                },
                change: function (e) {
                    //console.log("Change client");
                },
                requestStart: function (e) {
                    //console.log("Request Start servicio cliente");
                }            
            }
        });
            
    }                       
  function areaCod(container, options) {
        
        var consultar = new sirAreaGeo();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpr_ageo";
        $('<input  id = "area" required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
            dataTextField: "ageo__nom",
            dataValueField: "ageo__nom",
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
                            alertDialogs("Error Con Servicio Regiones"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "ageo__cod",
                        fields: {
                            ageo__cod: {editable: true, nullable: false},
                            ageo__nom: {editable: true, nullable: false}
                            
                        }
                    }
                }
            }

        });
    }
    function paisCod(container, options) {
        
        var consultar = new sirPaises();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eesic_ciu";
        $('<input  id = "pais" required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
            dataTextField: "ciu__nom",
            dataValueField: "ciu__nom",
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
                            alertDialogs("Error Con Servicio Regiones"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "ciu__cod",
                        fields: {
                            ciu__cod: {editable: true, nullable: false},
                            ciu__nom: {editable: true, nullable: false}
                            
                        }
                    }
                }
            }

        });
    }
                        
 
});
                    
                              

   function changImgFunc(results , e) {
     
        for (var i = 0; i < results.length; i++) {
            if (document.getElementById("spanproceso"+results[i].sar__cod+results[i].ter__nit+results[i].ageo__cod)){
                if(results[i].sar__est==0){                            
                    document.getElementById("spanproceso"+results[i].sar__cod+results[i].ter__nit+results[i].ageo__cod).setAttribute("class", "k-sprite po_checkAct");   
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "disable();");
                }
                if(results[i].sar__est==99){     
                    document.getElementById("spanproceso"+results[i].sar__cod+results[i].ter__nit+results[i].ageo__cod).setAttribute("class", "k-sprite po_checkCreate");
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "active();");
                }
                if(results[i].sar__est==1){     
                    document.getElementById("spanproceso"+results[i].sar__cod+results[i].ter__nit+results[i].ageo__cod).setAttribute("class", "k-sprite po_checkBloq");

                }
            }
        }

    } 

function changeEst(e){
    var  actualizar = new cudSupArea();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
    try {
   
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if(seleccion.sar__est==0){  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=seleccion.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=seleccion.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=seleccion.ter__nit;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=1;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=seleccion.ageo__cod; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=seleccion.ter__raz;
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_sar.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_sar.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
        
                });
            }

            if(seleccion.sar__est==99){  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__cod=seleccion.sar__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].pai__cod=seleccion.pai__cod;  
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__nit=seleccion.ter__nit;                     
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].sar__est=0;   
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ageo__cod=seleccion.ageo__cod; 
                    actjson.dsSICUDgpd_sar.eegpd_sar[0].ter__raz=seleccion.ter__raz;
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_sar.eeEstados[0].Estado)=="OK")
                        {          
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();    
                        }
                        else
                        {
                            alert("Error"+resp.dsSICUDgpd_sar.eeEstados[0].Estado);  
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
        createDialog("Atención", "Esta seguro de cambiar el estado de Registro ---" + seleccion.sar__cod + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        createDialog(e);

        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
 
} 
