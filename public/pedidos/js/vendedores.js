/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 100);
                        
});
                    
$(document).ready(function() {
    
    if(sessionStorage.getItem("Detalle_Vendedor")!==null){
        var datos_vendedor = JSON.parse(sessionStorage.getItem("Detalle_Vendedor"));
        
        document.getElementById('Nit_vendedor').innerHTML = datos_vendedor.ter__nit;
        document.getElementById('Nombre_vendedor').innerHTML = datos_vendedor.ter__raz;
        document.getElementById('Cod_vendedor').innerHTML = datos_vendedor.vdd__cod;
        document.getElementById('Clase_cliente').innerHTML = datos_vendedor.cla__nom;
        if (datos_vendedor.vdd__est==1){
            $("#btnAgregarItem")[0].hidden="true";       
            $("#btnGuardar1")[0].hidden="true";
        }    
        gridDetalleVendedor();
    }else{
        $("#toolbar").kendoToolBar({
            items: [  
                { template: "<label>Buscar:</label>" },
                {
                    template: "<input id='filtro' style='width: auto;'/>",
                    overflow: "always"
                }                                
            ]
        });
    }
    
    nombre();
    claseCliente();
    ipNit();     
});

function detalle(e){
    e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
    var id = this.dataItem($(e.currentTarget).closest("tr"));
                        
    sessionStorage.setItem("Detalle_Vendedor",JSON.stringify(id));
    window.location = ("vendedorDetalle.html");
}
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
        var  consultar = new sirVendedores();
        var  datajson = consultar.getjson();
        var  urlService = consultar.getUrlSir();
        datajson.dsSIRgpd_vdd.eeSIRgpd_vdd[0].piivdd__est = e;                
        var  actualizar = new CudVendedores();
        var  actjson = actualizar.getjson();
        var  urlactualizar = actualizar.getUrlSir();

        var mapCud = "eegpd_vdd";
        dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlService,
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
                    }if (operation === "destroy") { 
                        actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__cod=options.vdd__cod;
                        actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__nit=options.ter__nit;
                        actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__raz=options.ter__raz;
                        actjson.dsSICUDgpd_vdd.eegpd_vdd[0].trr__cod=options.trr__cod;
                        actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__cli=options.cla__cli;
                        actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__nom=options.cla__nom;
                        actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__est=options.vdd__est;
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
                        ter__nit:    {editable: true, nullable: false},
                        ter__raz:    {editable: true, nullable: false},  
                        trr__nom:    {editable: true, nullable: false},  
                        cla__nom:    {editable: true, nullable: false}, 
                        vdd__ter:    {editable: true, nullable: false},
                        vdd__est:    {editable: true, nullable: false},
                        cla__cli:    {editable: true, nullable: false},
                        trr__cod:    {editable: true, nullable: false},

                    }
                },
            
            }, error: function (e) {
                alertDialogs(e.errorThrown);
            }
        });
        var grid1 = $("#grid").kendoGrid({
            dataSource: dataSource,

            columns: [
                {field: "vdd__cod", title: "Cod Vendedor ",  hidden:false},
                {field: "ter__nit", title: "Nit",  hidden:false, editor: ipNit,
                    template: function (e) {
                        return e.ter__nit;
                    }},    
                {field: "ter__raz", title: "Nombre",  hidden:false,editor: nombre,
                    template: function (e) {
                        return e.ter__raz;
                    }},    
            
                {field: "cla__nom", title: "Clase Cliente",  hidden:false, editor: claseCliente,
                    template: function (e) {
                        return e.cla__nom;
                    }},
            
                {command: [
                        {name: "check", text: "estado",click: changeEst, template: "<a class='k-grid-check'><span class='k-sprite po_editoff' ></span></a>" },
                        {name: "editar", text: "editar", click: detalle,template: "<a class='k-grid-editar'><span class='k-sprite po_editoff' ></span></a>"},
                        {name: "deletae", text: "destoy", template: "<a class='k-grid-deletae'><span class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "140px"}],
            editable: "popup",
            edit: function(e) { 
                if (!e.model.isNew()) {//caso en el que el popup es editar
                    if(e.model.vdd__est!= 99 ){
                        var multiselect = $("#territorios").data("kendoMultiSelect");
                        var value = multiselect.value();
                        multiselect.value(e.model.trr__cod );
                        kendo.ui.progress($('.k-edit-form-container'), true);
                        kendo.ui.progress($('.k-edit-buttons'), true);
                        e.container.find(".k-loading-image").css("background-image", "url('')");

                    }else{
                        var multiselect = $("#territorios").data("kendoMultiSelect");
                        var value = multiselect.value();
                        multiselect.value(e.model.trr__cod );
           
                    }
                }
                else{//caso en el que el popup es crear 
                    var buscarlabel = $("label").find("for");
                    Buscarlabel = buscarlabel.prevObject[0];
                    Buscarlabel.style.display = "none";
                    e.container.find("input[name='vdd__cod']")[0].hidden="true";
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
    }
    grilla(-1);
    $("#filtro").kendoAutoComplete({ 
        dataTextField: "ter__raz",  
        dataValueField: "ter__raz",
        placeholder: "Nombre...",  
        dataSource: dataSource,                        
        filter: "startswith"                    
    });
  
    function clickEliminar(e) {
        try {
            var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
            e.preventDefault();
            var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));
            if (dataItem.vdd__est!= 99){
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
                createDialog("Atención", "Esta seguro de eliminar el Vendedor ---" + dataItem.ter__raz + " ---?", "400px", "200px", true, true, actions);
            }
        } catch (e) {
            alert(e);
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        }
       
    }
         
//            
    
    function changImgFunc(results , e) {
     
        for (var i = 0; i < results.length; i++) {
            if (document.getElementById("spanproceso"+results[i].vdd__cod+results[i].ter__nit+results[i].cla__nom)){
                if(results[i].vdd__est==0){                            
                    document.getElementById("spanproceso"+results[i].vdd__cod+results[i].ter__nit+results[i].cla__nom).setAttribute("class", "k-sprite po_checkAct");   
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "disable();");
                }
                if(results[i].vdd__est==99){     
                    document.getElementById("spanproceso"+results[i].vdd__cod+results[i].ter__nit+results[i].cla__nom).setAttribute("class", "k-sprite po_checkCreate");
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "active();");
                }
                if(results[i].vdd__est==1){     
                    document.getElementById("spanproceso"+results[i].vdd__cod+results[i].ter__nit+results[i].cla__nom).setAttribute("class", "k-sprite po_checkBloq");

                }
            }
        }
    } 
});
                    
function changeEst(e){ 
    var  actualizar = new CudVendedores();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    var seleccion =  $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];  
    try {
           
            
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if(seleccion.vdd__est==0){  
                actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__cod=seleccion.vdd__cod;  
                actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__nit=seleccion.ter__nit;  
                actjson.dsSICUDgpd_vdd.eegpd_vdd[0].trr__cod=seleccion.trr__cod;  
                actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__cli=seleccion.cla__cli;  
                actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__est=1;  
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_vdd.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs(resp.dsSICUDgpd_vdd.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
        
                });
            }

            if(seleccion.vdd__est==99){  
                actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__cod=seleccion.vdd__cod;  
                actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__nit=seleccion.ter__nit;  
                actjson.dsSICUDgpd_vdd.eegpd_vdd[0].trr__cod=seleccion.trr__cod;  
                actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__cli=seleccion.cla__cli;  
                actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__est=0;   
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_vdd.eeEstados[0].Estado)=="OK")
                        {          
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();    
                        }
                        else
                        {
                            alertDialogs(resp.dsSICUDgpd_vdd.eeEstados[0].Estado);  
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
        createDialog("Atención", "Esta seguro de cambiar estado de Registro ---" + seleccion.ter__raz + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        createDialog(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
 
}             
                   
                
function cerrar(){
    //onClosex();
    $("#windowform").data("kendoWindow").close();
  
    
}  
                
function cerrar1(){
    //onClosex();
    
    $("#windowform").data("kendoWindow").close();
    window.location = ("vendedorDetalle.html"); 
    
}  

function mostrarCustomPopUpCabecera(idcustomPopUp) {    
    $("#"+idcustomPopUp).fadeIn("slow");
}

function cerrarCustomPopUpCabecera(idCustomPopUp) {
    $("#disable").fadeOut("slow");
    $("#"+idCustomPopUp).fadeOut("slow");
    $("#disable").remove();   
}

function abrirCustomPopCabecera(idCustomPopUp) {
    
    $("body").append("<div id='windowCab'></div>");
    var myWindow = $("#windowCab");
    var undo = $("#undo");
    
    function onCloseCabecera() {
        document.getElementById("windowCab").remove();
        undo.fadeIn();
    }
    $("body").append("<div id='disable'></div>");
        
    mostrarCustomPopUpCabecera(idCustomPopUp); 
    
}


function nombre(container, options) {    
    var consultar = new sirConsultaCliente();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eesic_ter";
    
    $("#nombre").kendoAutoComplete({
        dataTextField: "ter__raz",
        dataValueField: "ter__nit",        
        minLength: 4,
        placeholder: "Nombre...",
        filter: "contains",
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',  
        select: function(e) {                
            $("#nit").val(e.dataItem.ter__nit);    
        },        
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
                        var key1 = Object.keys(datajson)[0];
                        var key2 = Object.keys(datajson[key1])[1];
                        datajson[key1][key2][0].picter_nit = "";
                        datajson[key1][key2][0].picter_raz = $("#nombre").val();
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
                    id: "ter__nit",
                    fields: {
                        ter__raz: {editable: false, nullable: false},
                        ter__nit: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}
function ipNit(container, options) {    
    var consultar = new sirConsultaCliente();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eesic_ter";
    $("#nit").kendoAutoComplete({
        dataTextField: "ter__nit",
        dataValueField: "ter__nit",           
        minLength: 6,
        placeholder: "NIT...",
        filter: "contains",
        select: function(e) {                
            $("#nombre").val(e.dataItem.ter__raz);    
        },
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',  
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
                        
                        var key1 = Object.keys(datajson)[0];
                        var key2 = Object.keys(datajson[key1])[1];
                        datajson[key1][key2][0].picter_nit = $("#nit").val();
                        datajson[key1][key2][0].picter_raz = "";
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
                    id: "ter__nit",
                    fields: {
                        ter__raz: {editable: false, nullable: false},
                        ter__nit: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
    
}                       
function claseCliente(container, options) {
    
    var consultar = new sirClaseCliente();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eegpr_cla";
    
    $("#claseCliente").kendoDropDownList({
        dataTextField: "cla__nom",
        dataValueField: "cla__nom",
        template:'<div class="divElementDropDownList">#: data.cla__nom #</div>',  
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
                    id: "cla__nom",
                    fields: {
                        cla__cli: {editable: false, nullable: false},
                        cla__nom: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}        

function guardarVendedor(){
    
     var verbo = "POST"
    
    if($("#buttonCab")["0"].childNodes["0"].data=== "Actualizar"){
        verbo = "PUT"
    }  
    
    
    var  actualizar = new CudVendedores();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    
    var cedula = $("#nit")[0].value;
    var nombre = $("#nombre")[0].value;
    var cliente = $("#claseCliente").data("kendoDropDownList");
    
    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__nit=cedula;
    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__raz=nombre;
    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].trr__cod=0;
    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__cli=$("#claseCliente").data("kendoDropDownList").dataSource._data[cliente.selectedIndex].cla__cli;
    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__nom=$("#claseCliente").data("kendoDropDownList").dataSource._data[cliente.selectedIndex].cla__nom;
    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__est=99;
          
    
    $.ajax({
        async: false, 
        type: verbo,
        data: JSON.stringify(actjson),
        url: urlactualizar,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){  
        debugger
        var key1 = Object.keys(e)[0];
        var key2 = Object.keys(e[key1])[0];
        if ((e[key1].eeEstados[0].Estado === "OK")) {                        
            cerrarCustomPopUpCabecera('popUpCrearVendedor');
            $("#buttonCab")["0"].childNodes["0"].data=== "Guardar"        
            item = e[key1][key2]["0"];
            
            sessionStorage.setItem("Detalle_Vendedor",JSON.stringify(item));
            window.location = ("vendedorDetalle.html");
            
        } else {
            alertDialogs(e[key1].eeEstados[0].Estado);
        }
    });   
}

function editarCabecera(idCustomPopUp) {
    $("#buttonCab")["0"].childNodes["0"].data = "Actualizar"  
    var datos_vendedor = JSON.parse(sessionStorage.getItem("Detalle_Vendedor"));
    
    $("#nombre").val(datos_vendedor.ter__raz);
    $("#nit").val(datos_vendedor.ter__nit);
    var kendoDropDownListCliente = $("#claseCliente").data("kendoDropDownList");    
    kendoDropDownListCliente.value(datos_vendedor.cla__cod);
    
    abrirCustomPopCabecera(idCustomPopUp);    
}