            
/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 30);
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
 function cerrarPopup(){
        $("#windowg").data("kendoWindow").close();   
     alertDialogs ("Se ha actualizado la informacion");
    $('#grid').data('kendoGrid').refresh();                                             
    $('#grid').data('kendoGrid').dataSource.read();
    $('#grid').data('kendoGrid').refresh(); 
 }                   
 function detalle(e){
       e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
                        var id = this.dataItem($(e.currentTarget).closest("tr")).ter__nit;
//                      
                        sessionStorage.setItem("Nit_Tercero",(id));
                        //window.location = ("proveedores.html");
       $("#grillapopUp").append("<div id='windowg'></div>");                       
        var myWindow2 = $("#windowg"),undo = $("#undo");                
        function onClose1() {
            undo.fadeIn();
            $("#grillapopUp").empty();
        }       
        var UrL= sessionStorage.getItem("url");
        myWindow2.kendoWindow({
            draggable: true,
            height: "90%",
            modal: true,
            resizable: false,
            title: "Proveedores",
            width: "90%",
            content: UrL+"proveedores/html/proveedores.html",
            deactivate: function() {
                this.destroy();                                           
            },
            actions: [
                "Close"
            ],                               
            close: onClose1
        }).data("kendoWindow").center().open();   
    }
   
                        
                        
                        
                        
                        
   
             function detalle1(e){
    
                        sessionStorage.setItem("Nit_Tercero","Nuevo");
//                        window.location = ("proveedores.html");
                  //window.location = ("proveedores.html");
       $("#grillapopUp").append("<div id='windowg'></div>");                       
        var myWindow2 = $("#windowg"),undo = $("#undo");                
        function onClose1() {
            undo.fadeIn();
            $("#grillapopUp").empty();
        }       
        var UrL= sessionStorage.getItem("url");
        myWindow2.kendoWindow({
            draggable: true,
            height: "90%",
            modal: true,
            resizable: false,
            title: "Proveedores",
            width: "90%",
            content: UrL+"proveedores/html/proveedores.html",
            deactivate: function() {
                this.destroy();                                           
            },
            actions: [
                "Close"
            ],                               
            close: onClose1
        }).data("kendoWindow").center().open();   
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
 function cerrarPopup1(){
        $("#windowg").data("kendoWindow").close();   


 } 
 function popup(){
        $("#grillapopUp").append("<div id='windowg'></div>");                       
        var myWindow2 = $("#windowg"),undo = $("#undo");                
        function onClose1() {
            undo.fadeIn();
            $("#grillapopUp").empty();
        }       
        var UrL= sessionStorage.getItem("url");
        myWindow2.kendoWindow({
            draggable: true,
            width: "600px",
            height: "250px",
            title: "Busqueda",
            modal: true,
            resizable: false,
            content: UrL+"proveedores/html/popUpFiltroProveedores.html",
            deactivate: function() {
                this.destroy();                                           
            },
            actions: [
                "Close"
            ],                               
            close: onClose1
        }).data("kendoWindow").center().open();   
        
        
    } 
    function grilla(nit,razon){
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
         grilla(send,nit,razon);
         }
         

    }); 
    
    var windowTemplate = kendo.template($("#windowTemplate").html());
        var window = $("#window1").kendoWindow({
        title: "Eliminar",
        visible: false, //the window will not appear before its .open method is called

    }).data("kendoWindow");
    
        function grilla(e,nit,razon){
        var  consultar = new sirProveedor();
        var  datajson = consultar.getjson();
        var  urlService = consultar.getUrlSir();
        if (nit===""){nit="*"}
        if (razon===""){razon="*"}
        datajson.dsSIRcon_prv.eeSIRcon_prv[0].picter_nit=nit;    
        datajson.dsSIRcon_prv.eeSIRcon_prv[0].picter_raz=razon;    
        
       datajson.dsSIRcon_prv.eeSIRcon_prv[0].piiprv_est=e;           
        var  actualizar = new sirProveedor();
        var  actjson = actualizar.getjson();
        var  urlactualizar = actualizar.getUrlSir();

        var mapCud = "eecon_prv";

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
                       actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__cod=options.pri__cod;
                       actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__des=options.pri__des;
                       actjson.dsSICUDgpd_pri.eegpd_pri[0].ctr__est=options.ctr__est;                       
                        return JSON.stringify(actjson);


                    }
                    if (operation === "create") {

                       actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__des=options.pri__des; 
                        actjson.dsSICUDgpd_pri.eegpd_pri[0].piictr__est=99; 
                        return JSON.stringify(actjson);          
//                        $('#grid').data('kendoGrid').refresh();
//                        $('#grid').data('kendoGrid').dataSource.read();
//                        $('#grid').data('kendoGrid').refresh();                                     
                    }
                    if (operation === "destroy") {

                       actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__cod=options.pri__cod;
                       actjson.dsSICUDgpd_pri.eegpd_pri[0].pri__des=options.pri__des;  

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
                    }else{
                        alertDialogs("Error "+e._errors["0"]._errorMsg)
                    }
                },
                model: {
                    id: "ter__nit",
                    fields: {
                        ter__nit:    {editable: false, nullable: false},
                        ter__raz:    {editable: true, nullable: false},          
                    }
                }
            },
            error: function (e) {
                   
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
    //    var gridheigth = $("body").height();
    //    gridheigth = gridheigth*0.12 + gridheigth;
        var grid1 = $("#grid").kendoGrid({
            dataSource: dataSource, 
            sortable: true,
            filterable: true,
            columns: [
                {field: "ter__nit", title: "Nit",  hidden:false,  width: "150px"},  
                {field: "ter__raz", title: "Razon Social",  hidden:false},
                {command: [
                        {name: "check", text: "estado",click: changeEst, template: "<a class='k-grid-check'><span class='k-sprite po_editoff' ></span></a>" },
                        {name: "editar", text: "edit", click: detalle, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff' ></span></a>"},
                      
                    ], 
                    width: "100px"}
                ],
            editable: "popup",
            edit: function(e) {
                if (!e.model.isNew()) {//caso en el que el popup es editar
                        if(e.model.ctr__est!= 99 ){
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
        $(window).trigger("resize"); 
    }
    grilla(-1,nit,razon);
    $("#filtro").kendoAutoComplete({ 
        dataTextField: "pri__des",  
        dataValueField: "pri__des",
        placeholder: "Prioridad...",  
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
            createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.pri__des + " ---?", "400px", "200px", true, true, actions);

        } catch (e) {
            alert(e);
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        }
    }
    }
$(document).ready(function () {  
   popup();
    //grilla();
});
 
function changImgFunc(results) {

        for (var i = 0; i < results.length; i++) {
            if (document.getElementById("spanproceso"+results[i].ter__nit+results[i].ter__raz)){
                if(results[i].prv__est==0){                            
                    document.getElementById("spanproceso"+results[i].ter__nit+results[i].ter__raz).setAttribute("class", "k-sprite po_checkAct");   
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "disable();");
                }
                if(results[i].prv__est==99){     
                    document.getElementById("spanproceso"+results[i].ter__nit+results[i].ter__raz).setAttribute("class", "k-sprite po_checkCreate");
                    //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "active();");
                }
                if(results[i].prv__est==1){     
                    document.getElementById("spanproceso"+results[i].ter__nit+results[i].ter__raz).setAttribute("class", "k-sprite po_checkBloq");

                }
            }
        }
 }
                    

function changeEst(e){
    var datos= $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"))
    var consultar = new cudProveedores();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    
    
    datajson.dsSICUDcon_prv.eecon_prv[0].ter__nit=datos.ter__nit;
    datajson.dsSICUDcon_prv.eecon_prv[0].eecon_prtra[0].ter__nit=datos.ter__nit;
    datajson.dsSICUDcon_prv.eecon_prv[0].ter__rep=datos.ter__rep;
    datajson.dsSICUDcon_prv.eecon_prv[0].bco__cod1=datos.bco__cod1;
    datajson.dsSICUDcon_prv.eecon_prv[0].bco__cta=datos.bco__cta;
    datajson.dsSICUDcon_prv.eecon_prv[0].doc__pref=datos.doc__pref;
    datajson.dsSICUDcon_prv.eecon_prv[0].doc__rfec=null;
    datajson.dsSICUDcon_prv.eecon_prv[0].dpto__cod=datos.dpto__cod;
    datajson.dsSICUDcon_prv.eecon_prv[0].dpto__cod1=datos.dpto__cod1;
    datajson.dsSICUDcon_prv.eecon_prv[0].ciu__cod=datos.ciu__cod;
    datajson.dsSICUDcon_prv.eecon_prv[0].ciu__cod1=datos.ciu__cod1;
    datajson.dsSICUDcon_prv.eecon_prv[0].fin__dir=datos.fin__dir;
    datajson.dsSICUDcon_prv.eecon_prv[0].pag__cod=datos.pag__cod;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__age=datos.prv__age;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__ben=datos.prv__ben;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__cgo=datos.prv__cgo;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__cta=datos.prv__cta;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__dir=datos.prv__dir;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__dpfax=datos.prv__dpfax;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__ind__ciu=datos.prv__ind__ciu;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__max=datos.prv__max;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__nrfax=datos.prv__nrfax;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__pos=datos.prv__pos;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__tel =datos.prv__tel;
    datajson.dsSICUDcon_prv.eecon_prv[0].ter__mail=datos.ter__mail;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__nit=datos.prv__nit;
    
    datajson.dsSICUDcon_prv.eecon_prv[0].eecon_prtra[0].bco__cod=datos.eecon_prtra[0].bco__cod;
   if(datos.prv__est===99){
       datajson.dsSICUDcon_prv.eecon_prv[0].prv__est=0;
   }
   if(datos.prv__est===0){
       datajson.dsSICUDcon_prv.eecon_prv[0].prv__est=1;
   }
    if(datos.prv__est===1){
       datajson.dsSICUDcon_prv.eecon_prv[0].prv__est=0;
   }
       try {
           
            
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
           
               
                $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(datajson),
                    url: urlService,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDcon_prv.eeEstados[0].Estado)=="OK")
                        {     
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDcon_prv.eeEstados[0].Estado); 
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();                             
                        }
                    } 
        
                });
                      
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de cambiar estado de Registro ---" + datos.ter__raz + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        createDialog(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
 
}             