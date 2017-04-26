
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
        var  consultar = new sirSupTerritorio();
        var  datajson = consultar.getjson();
        var  urlService = consultar.getUrlSir();
        datajson.dsSIRgpd_str.SIRgpd_str[0].piistr__est=e;                     
        var  actualizar = new cudTerritorios();
        var  actjson = actualizar.getjson();
        var  urlactualizar = actualizar.getUrlSir();
        
        var mapCud = "eegpd_str";
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
                        debugger
                        var cedula = $("#cedula").val();
                        var nombre = $("#nombre").val();
                        var recaudo = $("#Recaudo").val();
                        var ventas = $("#stventas").val();
                        var territorio = $("#territorio").val();                        
                        var dropdownlist = $("#territorio").data("kendoDropDownList");                        
                        var territorio_nom  = dropdownlist.dataSource._data[dropdownlist.selectedIndex].trr__nom;      
                        actjson.dsSICUDgpd_str.eegpd_str[0].str__cod=options.str__cod;
                        actjson.dsSICUDgpd_str.eegpd_str[0].ter__nit=cedula;
                        actjson.dsSICUDgpd_str.eegpd_str[0].ter__raz=nombre; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].str__est=options.str__est; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].str__rec=recaudo; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].str__vta=ventas; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].trr__cod=territorio; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].trr__nom=territorio_nom; 
                        
                        return JSON.stringify(actjson);
                        
                        $('#grid').data('kendoGrid').refresh();
                        $('#grid').data('kendoGrid').dataSource.read();
                        $('#grid').data('kendoGrid').refresh();
                        
                        
                    }
                    if (operation === "create") {
                        var cedula = $("#cedula").val();
                        var nombre = $("#nombre").val();
                        var recaudo = $("#Recaudo").val();
                        var ventas = $("#stventas").val();
                        var territorio = $("#territorio").val();   
                        var dropdownlist = $("#territorio").data("kendoDropDownList");                        
                        var territorio_nom  = dropdownlist.dataSource._data[dropdownlist.selectedIndex].trr__nom;                        
                        actjson.dsSICUDgpd_str.eegpd_str[0].ter__nit=cedula;
                        actjson.dsSICUDgpd_str.eegpd_str[0].ter__raz=nombre; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].str__est=99; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].str__rec=recaudo; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].str__vta=ventas; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].trr__cod=territorio; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].trr__nom=territorio_nom; 
                        return JSON.stringify(actjson);          
                        $('#grid').data('kendoGrid').refresh();
                        $('#grid').data('kendoGrid').dataSource.read();
                        $('#grid').data('kendoGrid').refresh();                                     
                    }
                    if (operation === "destroy") {
                        actjson.dsSICUDgpd_str.eegpd_str[0].str__cod=options.str__cod;     
                        actjson.dsSICUDgpd_str.eegpd_str[0].ter__nit=options.ter__nit;
                        actjson.dsSICUDgpd_str.eegpd_str[0].ter__raz=options.ter__raz; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].str__est=options.str__est; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].str__rec=options.str__rec; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].str__vta=options.str__vta; 
                        actjson.dsSICUDgpd_str.eegpd_str[0].trr__cod=options.trr__cod; 
                        
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
                    id: "str__cod",
                    fields: {
                        ter__nit:    {editable: true, nullable: false},
                        ter__raz:    {editable: true, nullable: false},
                        str__est:    {editable: true, nullable: false}, 
                        str__cod:    {editable: false, nullable: false}, 
                        trr__nom:    {editable: true, nullable: false}, 
                        str__rec:    {editable: true, nullable: false,type: "boolean"},  
                        str__vta:    {editable: true, nullable: false,type: "boolean"},   
                        trr__cod:    {editable: true, nullable: false}, 
                    }
                },
                
            }, error: function (e) {
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
            
            
            //navigatable: true,
            columns: [ 
                {field: "str__cod", title: "Código",  hidden:false},
                {field: "ter__nit", title: "Cédula",  hidden:false,editor: cedula,
                    template: function (e) {
                        return e.ter__nit;
                    }},   
                {field: "ter__raz", title: "Nombre",  hidden:false,editor:nombre,
                    template: function (e) {
                        return e.ter__raz;
                    }},  
                
                {field: "trr__cod", title: "Territorio",  hidden:false,  editor:territorios,
//                    template: function (e) {
//                        debugger
//                        return e.trr__cod;
//                    }
                },   
                {field: "str__vta", title: "Ventas",  hidden:false, editor:estadoVentas,
                    template: function (e) {
                        return e.str__vta;
                    }},  
                {field: "str__rec", title: "Recaudo",  hidden:false, editor:estadoRecaudo,
                    template: function (e) {
                        return e.str__rec;
                    }},  
                {command: [
                        {name: "check", text: "edit",click: changeEst, template: "<a class='k-grid-check'><span class='k-sprite po_checkCreate'></span></a>"},
                        {name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
                        {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "140px"}],
            editable: "popup",
            edit: function(e) {
                
                if (!e.model.isNew()) {//caso en el que el popup es editar
                    if(e.model.str__est!= 99 ){
                        kendo.ui.progress($('.k-edit-form-container'), true);
                        kendo.ui.progress($('.k-edit-buttons'), true);
                        e.container.find(".k-loading-image").css("background-image", "url('')");                        
                    }else{
//                        e.container.find("input[name=str__cod]")[0].readOnly="true";
                    }
                    var kendoAutoCompleteNIT = $("#nombre").data("kendoAutoComplete");
                    kendoAutoCompleteNIT.enable(false);
                    
                    var kendoAutoCompleteNIT = $("#cedula").data("kendoAutoComplete");
                    kendoAutoCompleteNIT.enable(false);
                    
                    var dropDownListRuta= $("#territorio").data("kendoDropDownList"); 
                    dropDownListRuta.enable(false);
                }
                else{//caso en el que el popup es crear
                    var buscarlabel = $("label").find("for");
                    Buscarlabel = buscarlabel.prevObject[0];
                    Buscarlabel.style.display = "none";
                    e.container.find("input[name=str__cod]")[0].hidden="true";
                    
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
            if (dataItem.str__est!= 99){
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
                createDialog("Atención", "Esta seguro de eliminar el supervisor para el territorio ---" + dataItem.trr__nom + " ---?", "400px", "200px", true, true, actions);
            }
        } catch (e) {
            alert(e);
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        }
        
    }
    
    function estadoVentas(container, options) {
        
        var estados = [
            {text: "Si", valor: "true"},
            {text: "No", valor: "false"}
        ];
        
        $('<input id="stventas" required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataTextField: "text",
            dataValueField: "valor",
            dataSource: estados
        });
    }                       
    function estadoRecaudo(container, options) {
        
        var estados = [
            {text: "Si", valor: "true"},
            {text: "No", valor: "false"},
            
        ];
        $('<input id="Recaudo" required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataTextField: "text",
            dataValueField: "valor",
            dataSource: estados
        });
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
    function territorios(container, options) {
        
        var  consultar = new sirTerritorio();
        var  datajson = consultar.getjson();
        var  urlService = consultar.getUrlSir();
        var mapCud1 = "eegpd_trr";
        $('<input  id = "territorio" required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
            dataTextField: "trr__nom",
            dataValueField: "trr__cod",
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
                            debugger
                            return e[key1][mapCud1];
                        } else {
                            alertDialogs("Error Con Servicio Regiones"+e[key1].eeEstados[0].Estado);
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
    
    function cedula(container, options) {
        
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
    
    
});


function changImgFunc(results , e) {
    //for para colorear los chek de estado
    for (var i = 0; i < results.length; i++) {
        if (document.getElementById("spanproceso"+results[i].str__cod+results[i].ter__nit+results[i].trr__cod)){
            if(results[i].str__est===0){                            
                document.getElementById("spanproceso"+results[i].str__cod+results[i].ter__nit+results[i].trr__cod).setAttribute("class", "k-sprite po_checkAct");   
                //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "disable();");
            }
            if(results[i].str__est===99){     
                document.getElementById("spanproceso"+results[i].str__cod+results[i].ter__nit+results[i].trr__cod).setAttribute("class", "k-sprite po_checkCreate");
                //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "active();");
            }
            if(results[i].str__est===1){     
                document.getElementById("spanproceso"+results[i].str__cod+results[i].ter__nit+results[i].trr__cod).setAttribute("class", "k-sprite po_checkBloq");
                
            }
        }
    }
    
} 
function changeEst(e){
    var  actualizar = new cudTerritorios();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
    try {
        
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if(seleccion.str__est==0){  
                
                actjson.dsSICUDgpd_str.eegpd_str[0].str__cod=seleccion.str__cod;
                actjson.dsSICUDgpd_str.eegpd_str[0].ter__nit=seleccion.ter__nit;
                actjson.dsSICUDgpd_str.eegpd_str[0].ter__raz=seleccion.ter__raz; 
                actjson.dsSICUDgpd_str.eegpd_str[0].str__est=1; 
                actjson.dsSICUDgpd_str.eegpd_str[0].str__rec=seleccion.str__rec; 
                actjson.dsSICUDgpd_str.eegpd_str[0].str__vta=seleccion.str__rec; 
                actjson.dsSICUDgpd_str.eegpd_str[0].trr__cod=seleccion.trr__cod; 
                $.ajax({
                    
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_str.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_str.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
                    
                });
            }
            
            if(seleccion.str__est==99){  
                actjson.dsSICUDgpd_str.eegpd_str[0].str__cod=seleccion.str__cod;
                actjson.dsSICUDgpd_str.eegpd_str[0].ter__nit=seleccion.ter__nit;
                actjson.dsSICUDgpd_str.eegpd_str[0].ter__raz=seleccion.ter__raz; 
                actjson.dsSICUDgpd_str.eegpd_str[0].str__est=0; 
                actjson.dsSICUDgpd_str.eegpd_str[0].str__rec=seleccion.str__rec; 
                actjson.dsSICUDgpd_str.eegpd_str[0].str__vta=seleccion.str__rec; 
                actjson.dsSICUDgpd_str.eegpd_str[0].trr__cod=seleccion.trr__cod; 
                $.ajax({
                    
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_str.eeEstados[0].Estado)=="OK")
                        {          
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();    
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_str.eeEstados[0].Estado);  
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
        createDialog("Atención", "Esta seguro de cambiar el estado del supervisor para el territorio ---" + seleccion.trr__nom + " ---?", "400px", "200px", true, true, actions);
        
    } catch (e) {
        createDialog(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
} 
