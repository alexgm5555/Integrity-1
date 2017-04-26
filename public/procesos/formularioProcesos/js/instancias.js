
$(document).ready(function () {
var task = sessionStorage.getItem("instacia_proceso");    
document.getElementById("task1").innerHTML = task ;
    var consultar = new sirInstancias();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eeProcessInstanceListByUserName";
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
                    datajson.dsProcessInstanceListByUserName.SIRProcessInstanceList[0].picprocname=task;
                    return JSON.stringify(datajson);
                }
            }
        },
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {debugger
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapCud1];
                } else {
                    // alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "ProcessInstanceID",
                fields: {
                    ProcessInstanceID:    {editable: false, nullable: false},
                    ProcessInstanceName:     {editable: false, nullable: false},
                  
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
        sortable:true,
        filterable:true,
        columns: [
            {field: "ProcessInstanceID", title: "Tarea",  hidden:false},      
            {field: "ProcessInstanceName", title: "Nombre de proceso",  hidden:false},
            {field: "workstepname", title: "Nombre Paso",  hidden:false},      
            {field: "performer", title: "Responsable",  hidden:false},
            {field: "workstepstatus", title: "Estado",  hidden:false}     
           
           ],                            
                    
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
                      
                             
});
        
function cerrar(){
    $("#windous").data("kendoWindow").close();
    location.reload(true);
}
                              
