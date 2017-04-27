function CudTareaNormal(){
    var lista = sessionStorage.getItem("listado_tareas"); 
    var lista = JSON.parse(lista);   
    var usuario = $("#reasiganar").data("kendoComboBox");   
    var select = usuario.selectedIndex;
    var usuario = usuario.dataSource._data[select].usrcod;
    
    var consultar = new cudReasignaTarea();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    datajson.dsreassignvarioustasks.reassignto[0].picuserreassign=usuario;
    var i=0;
    var array1 =[];
    for(var i = 0; i < lista.length; i++ ){
        var array = {};
        array.taskname =lista[i].text;
        array.procname =lista[i].proceso;
        array1.push(array);
    }
    datajson.dsreassignvarioustasks.eetask=array1;  
    
        $.ajax({
                
                type: "POST",        
                async: false,
                data: JSON.stringify(datajson),
                url: urlService,
                dataType: "json",        
                contentType: "application/json;",
                success: function (resp) { debugger
                    if((resp.dsreassignvarioustasks.eeEstados[0].Estado)=="OK")
                    {
                      
                         parent.cerrarReasignacion();
                    }
                    else   
                    {  
                     parent.alertDialogs("Error "+resp.dsreassignvarioustasks.eeEstados[0].Estado);    
                    } 
                } ,
                error: function (e) {
                  parent.alertDialogs("Error" + e.status + " - " + e.statusText);
            }
                
            }); 
}
function cudTareaFlujo(){debugger
    
   var lista = sessionStorage.getItem("listado_tareas"); 
    var lista = JSON.parse(lista);   
    var usuario = $("#reasiganar").data("kendoComboBox");   
    var select = usuario.selectedIndex;
    var usuario = usuario.dataSource._data[select].usrcod;
    
    var consultar = new CudTareaReasignarFlujo();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].picprocid=lista[0].proceso;
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].pictaskname=lista[0].text;
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].usertoreassign=usuario;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].Jefe_Reasignado=usuario;
    
    
  
        $.ajax({
                
                type: "POST",        
                async: false,
                data: JSON.stringify(datajson),
                url: urlService,
                dataType: "json",        
                contentType: "application/json;",
                success: function (resp) { debugger
                    if((resp.dsSolicitudVacaciones.eeEstados[0].Estado)=="OK")
                    {
                      
                        parent.cerrarReasignacion();

                    }
                    else   
                    {  
                      parent.alertDialogs("Error "+resp.dsreassignvarioustasks.eeEstados[0].Estado);     
                    } 
                } ,
                error: function (e) {
                  parent.alertDialogs("Error" + e.status + " - " + e.statusText);
            }
                
            });  
    

}

function reasignarTarea(e){debugger
var tarea = sessionStorage.getItem("Flujo_Tarea"); 
   if (tarea==="true"){cudTareaFlujo(); }else{CudTareaNormal();}
}
$(document).ready(function (){
   
   var tarea = sessionStorage.getItem("Flujo_Tarea"); 
   if (tarea==="true"){reasignarFlujo(); }else{reasignarNormal();}
});

function reasignarFlujo() {debugger
    
    var lista = sessionStorage.getItem("listado_tareas"); 
    var lista = JSON.parse(lista);
    
    document.getElementById("subtitulo2").innerHTML  = "Reasignacion de  "+lista.length +" tareas : "+lista[0].text; 
    var consultar = new SirUsuariosReasigna();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eeusers";
    var proceso = lista[0].proceso;
    var picProceso1 = proceso.indexOf("#")
    var picProceso = proceso.slice(0, picProceso1);
    datajson.dsJefesBpm.eeSIRjefes[0].picprocname=picProceso;
    $("#reasiganar")
            .kendoComboBox({
                
        dataTextField: "username",
        dataValueField: "usr__cod",
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
                data: function (e) {debugger
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Usuarios"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "username",
                    fields: {
                        username: {editable: true, nullable: false},
                        usr__cod: {editable: true, nullable: false},
                        
                    }
                }
            }
        }
        
    });
}
function reasignarNormal() {debugger
    
    var lista = sessionStorage.getItem("listado_tareas"); 
    var lista = JSON.parse(lista);
    
    document.getElementById("subtitulo2").innerHTML  = "Reasignacion de  "+lista.length +" tareas : "+lista[0].text; 
    var consultar = new SirUsuariosReasigna();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eeusers";
    var proceso = lista[0].proceso;
    var picProceso1 = proceso.indexOf("#")
    var picProceso = proceso.slice(0, picProceso1);
    datajson.dsJefesBpm.eeSIRjefes[0].picprocname=picProceso;
    $("#reasiganar")
            .kendoComboBox({
                
                dataTextField: "username",
        dataValueField: "usr__cod",
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
                data: function (e) {debugger
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Usuarios"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "username",
                    fields: {
                        username: {editable: true, nullable: false},
                        usr__cod: {editable: true, nullable: false},
                        
                    }
                }
            }
        }
        
    });
}
