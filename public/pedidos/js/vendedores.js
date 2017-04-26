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
 */ function newrol(e){
 
        //var adm = this.dataItem($(e.currentTarget).closest("tr")).adm;
        $("#textarea").append("<div id='windowform'></div>");
        var myWindow1 = $("#windowform"),undo = $("#undo");
                
        function onClose() {
            undo.fadeIn();
            $("#windowform").empty();
        
        }
        var UrL= sessionStorage.getItem("url");  
        myWindow1.kendoWindow({
            draggable: true,
            height: "300px",
            modal: true,
            resizable: true,
            title: "Crear",
            width: "400px",
            content: UrL+"pedidos/html/popupTerritorio.html",
            actions: [
                "Close"
            ],                               
           close: function () {
            
            $("#textarea").empty();
            this.destroy();}
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
    //    var gridheigth = $("body").height();
    //    gridheigth = gridheigth*0.008 + gridheigth;
    
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
                    


                }
                if (operation === "create") {
                    var cedula = $("#nit")[0].value;
                    var nombre = $("#nombre")[0].value;
                    var cliente = $("#claseCliente").data("kendoDropDownList");
                    var select = cliente.selectedIndex;
                    cliente = cliente.dataSource._data[select].cla__cli;
                    var cliente_nom = $("#claseCliente").data("kendoDropDownList").dataSource._data[select].cla__nom;
                    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__nit=cedula;
                    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__raz=nombre;
                    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].trr__cod=0;
                    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__cli=cliente;
                    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__nom=cliente_nom;
                    actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__est=99;
                    return JSON.stringify(actjson);          
                                                        
                }
                if (operation === "destroy") { 
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
                        alertDialogs("Error"+e[key1].eeEstados[0].Estado);   
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
            {field: "ter__nit", title: "Nit",  hidden:false, editor: filtroestado,
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
        createDialog("Atención", "Esta seguro de eliminar el Vendedor ---" + dataItem.vdd__cod + " ---?", "400px", "200px", true, true, actions);
         }
    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
       
}
         
    
      function nombre(container, options) {
        var consultar = new SirSicVen();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eesic_ven";
        $('<input  id = "nombre" />')
                .appendTo(container)
                .kendoAutoComplete({
            dataTextField: "ter__raz",
            dataValueField: "ter__raz",
            autoClose: true,
            minLength: 4,
            placeholder: "Nit..",
             filter: "contains",
            select: function(e) {                
            $("#nit").val(e.dataItem.ter__nit);    
            },
            template:'<div class="divElementDropDownList">#: data.ter__raz #</div>',  
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
                            alertDialogs("Error Con Servicio sucursales"+e[key1].eeEstados[0].Estado);
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
    function filtroestado(container, options) {
    var consultar = new SirSicVen();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eesic_ven";
        $('<input  id = "nit" />')
                .appendTo(container)
                .kendoAutoComplete({
            dataTextField: "ter__nit",
            dataValueField: "ter__nit",           
            minLength: 6,
            placeholder: "Nit..",
            filter: "contains",
            select: function(e) {                
            $("#nombre").val(e.dataItem.ter__nit);    
            },
            template:'<div class="divElementDropDownList">#: data.ter__nit #</div>',  
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
                            alertDialogs("Error Con Servicio sucursales"+e[key1].eeEstados[0].Estado);
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
        $('<input  id = "claseCliente" required name="' + options.field + '" />')
                .appendTo(container)
                .kendoDropDownList({
            dataTextField: "cla__nom",
            dataValueField: "cla__nom",
            //template:'<div class="divElementDropDownList">#: data.cla__nom #</div>',  
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
                            alertDialogs("Error Con Servicio Clase Cliente"+e[key1].eeEstados[0].Estado);
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
    function territorio(container, options) {
        var consultar = new sirTerritorio();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpd_trr";
        $('<input  id = "territorios" />')
                .appendTo(container)
                .kendoMultiSelect({
            dataTextField: "trr__nom",
            dataValueField: "trr__cod",
            autoClose: true,
            placeholder: "Territorios..",
            template:'<div class="divElementDropDownList">#: data.trr__nom #</div>',  
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
                            alertDialogs("Error Con Servicio sucursales"+e[key1].eeEstados[0].Estado);
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
                            alertDialogs("Error"+resp.dsSICUDgpd_vdd.eeEstados[0].Estado); 
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
                            alertDialogs("Error"+resp.dsSICUDgpd_vdd.eeEstados[0].Estado);  
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
        createDialog("Atención", "Esta seguro de cambiar estado de Registro ---" + seleccion.vdd__cod + " ---?", "400px", "200px", true, true, actions);

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
