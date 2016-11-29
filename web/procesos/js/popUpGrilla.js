
$(document).ready(function () {
var task = sessionStorage.getItem("Proc_usuar");    
document.getElementById("task1").innerHTML = task ;
    var consultar = new sirtask_proces();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eebpm_task_proc";
    var datasourcex = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },         
            parameterMap: function (options, operation) {
                if (operation === "read") {debugger
                    datajson.dsSIRbpm_task_proc.SIRbpm_task_proc[0].picproc__name=task;
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
                    // alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "proc__name",
                fields: {
                    proc__name:    {editable: false, nullable: false},
                    task__name:     {editable: false, nullable: false},
                    type__task:       {editable: false, nullable: false},

                }
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
    var grid1 = $("#grilla").kendoGrid({
        dataSource: datasourcex,
                            

                            
        //navigatable: true,
        columns: [
                                
            {field: "proc__name", title: "Nombre de proceso",  hidden:true},
            {field: "task__name", title: "Tarea",  hidden:false},
            {field: "type__task", title: "Tipo de tarea",  hidden:true},

            {command:
                        [
                           
                           
                    {name: "usuarios", click: grilla1, template: "<a class='k-grid-usuarios' href='' style='min-width:16px;'><span class='k-sprite pro_groupoff'></span></a>"}
                ],
                width: "50px"}]    ,                            
        //editable: "popup",
                            
        cancel: function(e) {                                                                                   
            e._defaultPrevented= true;
                                                                                   
        } 
    });
                    $('#grilla').hover(function() {
            $(this).css('background-color', 'Transparent');
            $(this).contents('td').css({'border': '1px solid blue', 'border-left': 'none', 'border-right': 'none'});
            $(this).contents('td:first').css('border-left', '1px solid blue');
            $(this).contents('td:last').css('border-right', '1px solid blue');
        },
        function() {
            $(this).css('background-color', 'Transparent');
            $(this).contents('td').css('border', 'none');
        });             
                      
                             function grilla1(e){debugger
                            e.preventDefault();
                            var id = this.dataItem($(e.currentTarget).closest("tr")).task__name;
                            var des =this.dataItem($(e.currentTarget).closest("tr")).type__task;
                                 sessionStorage.setItem("Task_name",id);
                                 sessionStorage.setItem("Task_type",des);
                        $("#grilla2").empty();
                        $("#grilla2").append("<div id='windous'></div>");
                        
                            var myWindow3 = $("#windous"),undo = $("#undo");
                
  
        
      
         var UrL= sessionStorage.getItem("url");
            myWindow3.kendoWindow({
            draggable: true,
            height: "70%",
            modal: true,
            resizable: false,
            title: "Usuarios",
            width: "70%",
            content: UrL+"procesos/html/popUpUsuarios.html",
            
            actions: [
                "Close"
            ],                               
           close: function () {
            
            $("#grilla2").empty();
            this.destroy();
        }
        }).data("kendoWindow").center().open();   
                            
                      
                    }                   
                    
                        
                        
});
        
function cerrar(){debugger
    //onClosex();
    $("#windous").data("kendoWindow").close();
    
}
                              
