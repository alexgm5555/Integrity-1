                    
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
function tamaño(){debugger
    var x = $("#windowform1").height();
    return(x);
}
function tamañoRevisar(){debugger
    var x = $("#windowform1").height();
    return(x);
}
$(document).ready(function () {                             
                        
    var consultar = new sirusuariobpm();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud = "eeeebpm_proc";
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },         
            parameterMap: function (options, operation) {
                if (operation === "read") {
                    datajson.dsSIRbpm_proc.SIRbpm_proc[0].piccia__nit=sessionStorage.getItem("companyNIT");
                    datajson.dsSIRbpm_proc.SIRbpm_proc[0].picusuario=sessionStorage.getItem("usuario");
                    return JSON.stringify(datajson);
                }
            }
        },
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapCud];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "proc__name",
                fields: {
                    proc__name:    {editable: false, nullable: false},
                    proc__des:     {editable: false, nullable: false},
                    piidreg:       {editable: false, nullable: false}
                }
            }
        }, error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });
    var name = sessionStorage.getItem("usuario");
    document.getElementById("demo").innerHTML = "Mis Tareas" ;
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
        $("#grid").kendoGrid({
        dataSource: datasource,
                            
        //navigatable: true,
        columns: [
            //                            { template: "<a class='k-grid-play'><span class='k-sprite pro_bullet1'></span></a>", width: "50px"} ,    
            {name: "play", text: " ",  template: "<a class='k-grid-bullet'><span class='k-sprite pro_bullet'></span></a>",width: "50px"},
                           
            { field: "proc__name", title: "Procesos",  hidden:false},
            {command:
                        [
                    {name: "proceso", text: " ", click: vistaProceso, template: "<a class='k-grid-proceso'><span  title='comenzar' class='k-sprite pro_prooff'></span></a>"},
                    {name: "admin", text: " ", click: grilla_Administar, template: "<a class='k-grid-admin'><span  title='comenzar' class='k-sprite pro_groupoff'></span></a>"},
                    {name: "editar", text: " ",  click: grafica, template: "<a class='k-grid-editar'><span class='k-sprite pro_graphoff '></span></a>"},
                    {name: "info", text: " ", click: instancias, template: "<a class='k-grid-info'><span class='k-sprite pro_infooff'></span></a>"},
                    {name: "play", text: " ", click: iniciarProceso, template: "<a class='k-grid-play'><span class='k-sprite pro_playoff '></span></a>"},
                           
                ],
                width: "220px"}],                            
        editable: "popup",
                            
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function () {
            var results = datasource.data();
            changImgFunc(results);
        },
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid').data('kendoGrid').refresh();                                             
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();                                                                                        
        } 
    });

                        
    var consultar = new sirtask();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eebpm_task";
    var datasourcex = new kendo.data.DataSource({
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
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapCud1];
                } else {
                    alertDialogs("El usuario no tiene tareas asiganadas");
                }
            },
            model: {
                id: "task__id",
                fields: {
                    task__name:    {editable: false, nullable: false},
                    inst__name:     {editable: false, nullable: false},
                    task__usr:       {editable: false, nullable: false},
                    task__ddt:       {editable: false, nullable: false,type: "date"},
                    task__id:       {editable: false, nullable: false},
                    task__dpr:       {editable: false, nullable: false},
                    task__tst:       {editable: false, nullable: false, type: "date"},
                    task__des:       {editable: false, nullable: false},
                    task__type:       {editable: false, nullable: false}
                }
            }
        } ,error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });
    /**
     *  FUNCION CREAR GRILLA DE TAREAS
     * Funcion cancel se ejecuta con el evento OnClick de EDIT grid
     *  cancel: function(e) {                                              
                            e._defaultPrevented= true;
                            $('#grid').data('kendoGrid').refresh();                                             
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); `}                                                                                       
     *  
     *  
     */     
    var grid1 = $("#grid1").kendoGrid({
        dataSource: datasourcex,
        selectable:"multiple, row",
        sortable: true,
        filterable: {
            mode: "row",
            operators: {
                string: {
                    startswith: "Incia Con",
                    contains: "Contiene",
                    eq: "Es igual a",
                    neq: "No es igual a"
                }
            }
        },
        columns: [
            {field: "inst__name", title: "Proceso",  hidden:false},
            {field: "task__name", title: "Tareas",  hidden:false},
            {field: "task__des", title: "Descripcion",  hidden:false},               
            {field: "task__tst", title: "Fecha de Inicio",  hidden:false},           
            {field: "task__ddt", title: "Fecha de entrega",  hidden:false},
            {field: "task__dpr", title: "Admin de proceso",  hidden:false},
            {field: "task__type", title: "Tipo",  hidden:false},             
            {command:
                        [
                    {name: "iniciar",text: " ",  click: iniciarTarea2, template: "<a class='k-grid-iniciar'  style='min-width:16px;'><span class='k-sprite pro_playoff'></span></a>"}
                ],
                width: "50px"}], 
        rowTemplate: kendo.template($("#rowTemplateCmp1").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp1").html()),
        dataBound: function () {
            var results1 = datasourcex.data();
            changImgFunc1(results1);
        },
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
            $('#grid1').data('kendoGrid').refresh();                                             
            $('#grid1').data('kendoGrid').dataSource.read();
            $('#grid1').data('kendoGrid').refresh();                                                                                        
        } 
    });

                  
                    
                        
                        
});
function grilla_Administar(e){debugger
    e.preventDefault();
    var id = this.dataItem($(e.currentTarget).closest("tr")).proc__name;
    var adm = this.dataItem($(e.currentTarget).closest("tr")).adm;  
    if (adm=== true ){
        sessionStorage.setItem("Proc_usuar",id);                                           
        $("#grillapopUp").append("<div id='windowg'></div>");                       
        var myWindow2 = $("#windowg"),undo = $("#undo");                
        function onClose1() {
            undo.fadeIn();
            $("#windowg").remove();
        }       
        var UrL= sessionStorage.getItem("url");
        myWindow2.kendoWindow({
            draggable: true,
            height: "90%",
            modal: true,
            resizable: false,
            title: "Tareas",
            width: "90%",
            content: UrL+"procesos/html/popUpGrilla.html",
            deactivate: function() {
                this.destroy();                                           
            },
            actions: [
                "Close"
            ],                               
            close: onClose1
        }).data("kendoWindow").center().open();   
    }
    else
    {}
                      
}      


function instancias(e){debugger  
    var instacia_proceso = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).proc__name;
    sessionStorage.setItem("instacia_proceso",instacia_proceso);  
    $("#formvacations").append("<div id='windowform'></div>");
    var myWindow1 = $("#windowform"),undo = $("#undo");
                
    function onClose() {
        undo.fadeIn();
        $("#windowform").remove();
    }
        
    var UrL= sessionStorage.getItem("url");  
    myWindow1.kendoWindow({
        draggable: true,
        height: "80%",
        modal: true,
        resizable: false,
        title: "Instancias",
        width: "70%",
        content: UrL+"procesos/formularioProcesos/html/instancias.html",
        actions: [
            "Close"
        ],                               
        close: onClose
    }).data("kendoWindow").center().open();    
    
}
function iniciarTarea2(e){debugger  
    //     var x = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).id;
    //     var y = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).task__name;
    var nombreTarea = $("#grid1").data("kendoGrid").dataItem($(e.target).closest("tr"));
    sessionStorage.setItem("Aprueba_Proceso",JSON.stringify(nombreTarea));  
    var nombreTarea = $("#grid1").data("kendoGrid").dataItem($(e.target).closest("tr")).screen__name;
    
   if(nombreTarea==="ReasignacionMasiva")
   {
       reasignar1();
       sessionStorage.setItem("Flujo_Tarea","true"); 
       
   }
   else
   {
      function onClose() {
        undo.fadeIn();
        $("#windowform1").remove();
    }
    $("#formvacations").append("<div id='windowform1'></div>");
    var myWindow1 = $("#windowform1"),undo = $("#undo");    
    var UrL= sessionStorage.getItem("url");  
    myWindow1.kendoWindow({
        draggable: true,
        height: "80%",
        modal: true,
        resizable: false,
        title: "Solicitud De Vacaciones",
        width: "50%",
        content: UrL+"procesos/formularioProcesos/html/"+nombreTarea+".html",
        actions: [
            "Close"
        ],                               
        close: onClose
    }).data("kendoWindow").center().open();    
                  
                
   }
    
}
//funcion que incia el proceso de acuerdo a los parametros diseñados

function iniciarProceso(e){debugger
    var x = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).id;
    var y = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).task__name;
    var nombreFormulario = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr")).screen__name;
    sessionStorage.setItem("tarea_usuario",x); 
    sessionStorage.setItem("proceso_usuario",y);  
    
    $("#formvacations").append("<div id='windowform1'></div>");
    var myWindow1 = $("#windowform1"),undo = $("#undo");
                
    function onClose() {debugger
        //undo.fadeIn();
        $("#windowform1").remove();
    }
        
    var UrL= sessionStorage.getItem("url");  
    myWindow1.kendoWindow({
        draggable: true,
        height: "80%",
        modal: true,
        resizable: false,
        title: "Solicitud De Vacaciones",
        width: "50%",
        content: UrL+"procesos/formularioProcesos/html/"+nombreFormulario+".html",
        actions: [
            "Close"
        ],                               
        close: onClose
    }).data("kendoWindow").center().open();    
    
}
function vistaProceso(e){debugger
    var adm = this.dataItem($(e.currentTarget).closest("tr")).adm;

    $("#textarea").append("<div id='windowform1'></div>");
    var myWindow1 = $("#windowform1"),undo = $("#undo");
                
    function onClose() {debugger
        //undo.fadeIn();
        $("#windowform1").remove();
    }
        var UrL= sessionStorage.getItem("url");  
        myWindow1.kendoWindow({
            draggable: true,
            scrollable: true,
            height: "70%",
            modal: true,
            resizable: true,
            title: "Grafica",
            width: "95%",
            content: UrL+"vistaProceso/html/vistaProceso.html",
            actions: [
                "Close"
            ],                               
            close: onClose
        }).data("kendoWindow").center().open();    
    
    
}
function vistaProceso1(e){
        
      $("#grillapopUp1").append("<div id='windowg'></div>");                       
        var myWindow2 = $("#windowg"),undo = $("#undo");                
        function onClose1() {
            undo.fadeIn();
            $("#windowg").remove();
        }       
        var UrL= sessionStorage.getItem("url");
        myWindow2.kendoWindow({
            
            height: "20%",
            modal: true,
            resizable: true,
            title: "Cargar Archivos",
            width: "30%",
            content: UrL+"procesos/formularioProcesos/html/popupSubirArchivo.html",
            deactivate: function() {
                this.remove();                                           
            },
            actions: [
                "Close"
            ],                               
            close: onClose1
        }).data("kendoWindow").center().open();   
   
}
//funcion para crear grafica 
function grafica(e){
    var adm = this.dataItem($(e.currentTarget).closest("tr")).adm;
    if (adm=== true ){               
         $("#textarea").append("<div id='windowg2'></div>"); 
        var myWindow1 = $("#windowg2"),undo = $("#undo");
                
        function onClose() {
            undo.fadeIn();
            $("#windowg2").remove();
        
        }
        var UrL= sessionStorage.getItem("url");  
        myWindow1.kendoWindow({
            draggable: true,
            height: "70%",
            modal: true,
            resizable: false,
            title: "Grafica",
            width: "70%",
            content: UrL+"procesos/html/popUpGrafica.html",
            actions: [
                "Close"
            ],                               
            close: onClose
        }).data("kendoWindow").center().open();    
    }
    else{}
}
//    
//Funcion para crear la grilla de tareas por poceseo 
//Se crea un html llamado popupgrilla                    

function disable(){
    
}
function reasignar1(){debugger
    try{                             
        var grid = $('#grid1').data('kendoGrid');
        var datos = grid.select($("#rowSelection_active_cell").closest("tr"));
        var i=0;        
        var datanew=[];  
        for (i = 0; i < datos.length; i++){
            var objeto={};
            objeto.text=datos[i].childNodes[3].innerText;
            objeto.proceso=datos[i].childNodes[1].innerText;
            objeto.descripcion=datos[i].childNodes[5].innerText;
            objeto.value=i;
            datanew.push(objeto);
        }
        var texto = datanew[0].text;
        var contador = 0;
        for (i = 0; i < datanew.length; i++){
            if (datanew[i].text===texto)
            {
                contador++;
            }
            else
            {
                alertDialogs("Recuerde que solo podra reasignar tareas del mismo tipo");   
            }
            
        }
        if (contador === datanew.length )
        {
    
            sessionStorage.setItem("listado_tareas",JSON.stringify(datanew)); 
            sessionStorage.setItem("Flujo_Tarea","false"); 
            
            $("#formvacations").append("<div id='windowform1'></div>");
            var myWindow1 = $("#windowform1"),undo = $("#undo");
                
            function onClose() {
                undo.fadeIn();
                $("#windowform1").remove();
            } 
//            mostrarCustomPopUp();
//            onloadPopUpCond ();
                    var UrL= sessionStorage.getItem("url");  
                    myWindow1.kendoWindow({
                        draggable: true,
                        height: "60%",
                        modal: true,
                        resizable: false,
                        title: "Reasignar Tareas",
                        width: "50%",
                        content: UrL+"procesos/html/ReasignacionMasiva.html",
                        actions: [
                            "Close"
                        ],                               
                        close: onClose
                    }).data("kendoWindow").center().open();    
                
        }
        else{}

    }


    catch(err) {
        alertDialogs("Debe Selecionar al menos un registro para reasignar");
    }


 
        
}
function changImgFunc1(results) {
    var results =  $('#grid1').data('kendoGrid')._data;
    var consultar = new serviTime();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    
    $.ajax({
        type: "POST",
        async: false, 
        data: JSON.stringify(datajson),
        url: urlService,
        dataType : "json",  
        contentType: "application/json;",
        success: function (resp) {             
            sessionStorage.setItem("Fecha_Hora",resp.dstime.eetime["0"].systime);
                               
        },
        error: function (e) {              
        }
    });
    var s =   sessionStorage.getItem("Fecha_Hora");
    var x = s.replace("T", " ");
    var fechaSistema =  new Date(x);
    var mesSistema = fechaSistema.getMonth()+1;
    var diaSistema = fechaSistema.getDate();
    var AñoSistema = fechaSistema.getUTCFullYear();
    var horaSistema = fechaSistema.getHours();
    var minSistema = fechaSistema.getMinutes();
    for (var i = 0; i < results.length; i++) {
        var fecha1 = new Date(results[i].task__tst);
        var mesSistema1 = fecha1.getMonth()+1;
        var diaSistema1 = fecha1.getDate();
        var AñoSistema1 = fecha1.getUTCFullYear();
        var horaSitema1 = fecha1.getHours();
        var minSistema1 = fecha1.getMinutes();
    
        var fecha2 = new Date(results[i].task__ddt);
        var mesSistema2 = fecha2.getMonth()+1;
        var diaSistema2 = fecha2.getDate();
        var AñoSistema2 = fecha2.getUTCFullYear();
        var horaSitema2 = fecha2.getHours();
        var minSistema2 = fecha2.getMinutes();
    
        document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__tst).innerHTML  = diaSistema1+"/"+mesSistema1+"/"+AñoSistema1 + " "+horaSitema1+":"+minSistema1; 
        document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__ddt).innerHTML  = diaSistema2+"/"+mesSistema2+"/"+AñoSistema2 + " "+horaSitema2+":"+minSistema1; 
    }
    
    for (var i = 0; i < results.length; i++) {
     
        var fecha2 = new Date(results[i].task__ddt);
        var mesServicio = fecha2.getMonth()+1;
        var diaServicio = fecha2.getDate();
        var AñoServicio = fecha2.getUTCFullYear();
        var horaServicio = fecha2.getHours();
        var minServicio = fecha2.getMinutes();
    
        var fechaSistema = AñoSistema+diaSistema+mesSistema;
        if ((mesServicio<mesSistema || diaServicio<diaSistema || AñoServicio<AñoSistema)){
            
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].inst__name).style.color = 'red';  
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__name).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__des).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__tst).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__ddt).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__dpr).style.color = 'red'; 
            document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__type).style.color = 'red';       
        }
        else{
            if(diaServicio===diaSistema ){
                if (horaSistema > horaServicio  ){
                    document.getElementById(results[i].inst__name+results[i].task__name+results[i].inst__name).style.color = 'red';  
                    document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__name).style.color = 'red'; 
                    document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__des).style.color = 'red'; 
                    document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__tst).style.color = 'red'; 
                    document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__ddt).style.color = 'red'; 
                    document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__dpr).style.color = 'red'; 
                    document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__type).style.color = 'red'; 
                }else{
                    if (horaServicio == horaSistema &&   minSistema >= minServicio ){
                        document.getElementById(results[i].inst__name+results[i].task__name+results[i].inst__name).style.color = 'red';  
                        document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__name).style.color = 'red'; 
                        document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__des).style.color = 'red'; 
                        document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__tst).style.color = 'red'; 
                        document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__ddt).style.color = 'red'; 
                        document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__dpr).style.color = 'red'; 
                        document.getElementById(results[i].inst__name+results[i].task__name+results[i].task__type).style.color = 'red'; 
                    }
                }                       
            }
        }
    
    }  
}
function terminarVacaciones(){debugger
    
    $("#windowform1").data("kendoWindow").close();   
    alertDialogs("Se ha terminado el proceso");
    $('#grid1').data('kendoGrid').refresh();                                             
    $('#grid1').data('kendoGrid').dataSource.read();
    $('#grid1').data('kendoGrid').refresh(); 
}
function cerrarReasignacion(){debugger
    
    $("#windowform1").data("kendoWindow").close();   
    alertDialogs("Reasignacion Completa");
    $('#grid1').data('kendoGrid').refresh();                                             
    $('#grid1').data('kendoGrid').dataSource.read();
    $('#grid1').data('kendoGrid').refresh(); 
    
}
function solicitaVacaciones(){debugger
    $("#windowform1").data("kendoWindow").close();   
    alertDialogs("Se ha iniciado el proceso correctamente");
 
}
function changImgFunc(results) {debugger

    for (var i = 0; i < results.length; i++) {
        if(results[i].can__start===true){                            
            document.getElementById("spanplay"+results[i].proc__name).setAttribute("class", "k-sprite pro_playon");
            document.getElementById("spanplay"+results[i].proc__name).setAttribute("estado", "on");
        }else
        {}}
  
    for (var i = 0; i < results.length; i++) {        
        if(results[i].adm===true){
        }else
        {
            var x = document.createElement("SPAN");
            x.setAttribute("class", "k-sprite transparente");
            x.setAttribute("id","x"+results[i].proc__name );             
            $("#spantarea"+results[i].proc__name).onclick = "";
            $("#spanedit"+results[i].proc__name).onclick = "";
            document.getElementById("spantarea"+results[i].proc__name).remove();           
            document.getElementById("spanedit"+results[i].proc__name).remove();
        }
    }
}
function mostrarCustomPopUp() {
    if(bandAlert===0){
        bandAlert++;
        $("body").append("<div id='disable'></div>");
        $("#customPopUp").fadeIn("slow");
    }
    
}
function cerrarCustomPopUp() {
    bandAlert = 0;
    $("#disable").fadeOut("slow");
    $("#customPopUp").fadeOut("slow");
    $("#disable").remove();

}
                        
                        
function revisarDocumentosP(){
    $("#documentos").append("<div id='docs'></div>");
    var myWindow1 = $("#docs"),undo = $("#undo");
                
    function onClose() {
        undo.fadeIn();
        $("#docs").remove();
    }
        
    var UrL= sessionStorage.getItem("url");  
    myWindow1.kendoWindow({
        draggable: true,
        height: "40%",
        modal: true,
        resizable: false,
        title: "Historico Documentos",
        width: "30%",
        content: UrL+"procesos/formularioProcesos/html/popupSubirArchivo.html",
        actions: [
            "Close"
        ],                               
        close: onClose
    }).data("kendoWindow").center().open();    
}
function historicoDocs(){
    $("#documentos").append("<div id='docs'></div>");
    var myWindow1 = $("#docs"),undo = $("#undo");
                
    function onClose() {
        undo.fadeIn();
        $("#docs").remove();
    }
        
    var UrL= sessionStorage.getItem("url");  
    myWindow1.kendoWindow({
        draggable: true,
        height: "40%",
        modal: true,
        resizable: false,
        title: "Historico Vacaciones",   
        width: "70%",
        content: UrL+"procesos/formularioProcesos/html/popupHistoricoVacaciones.html",
        actions: [
            "Close"
        ],                                 
        close: onClose 
    }).data("kendoWindow").center().open();    
}