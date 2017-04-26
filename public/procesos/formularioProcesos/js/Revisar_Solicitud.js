$(document).ready(function () {
    
    llenar();
var x  = $("#buttonEnviar").height();    
var w = $("#banner").height();
var y  = $("#contenido").height();
var z  = parent.tamañoRevisar();

$("#contenido").height((z)-w-x);

});
function aprovarVacaciones(){
    
    var datos= sessionStorage.getItem("Aprueba_Proceso");
    var datos1 = JSON.parse(datos);
    
    var consultar = new CudApruevaVacaciones();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].picprocid=datos1.inst__name;
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].pictaskname=datos1.task__name;
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].pictaskname=datos1.task__name;
    
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].Id_empleado=document.getElementById("usuario").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].email_empleado=document.getElementById("email").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_ult_vac= document.getElementById("fechaCorte").innerHTML;
    if (document.getElementById("pagoAnticipado").innerHTML==="Si"){
         datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].Pago_anticipado=true;
    }else{
        datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].Pago_anticipado=false;
    }
    
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_tiempo=document.getElementById("diasPedir").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_ini_vacaciones=  document.getElementById("corte").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_dinero=document.getElementById("diasValor").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].jefe_inmediato=document.getElementById("jefe").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_disponibles=document.getElementById("pendientes").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_anticipados=document.getElementById("anticipacion").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_solictud= document.getElementById("fecha").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].observaciones_empleado = document.getElementById("observaciones").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].observaciones_jefe= document.getElementById("ObservacionesJefe").value; 
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].estado_aprocbacion=true;        
    $.ajax({
        
        type: "POST",        
        async: false,
        data: JSON.stringify(datajson),
        url: urlService,
        dataType: "json",        
        contentType: "application/json;",
        success: function (resp) { 
            if((resp.dsSolicitudVacaciones.eeEstados[0].Estado)=="OK")
            {
           parent.terminarVacaciones(); 
           
           
            }
            else   
            {  
              parent.alertDialogs("Error "+resp.dsSolicitudVacaciones.eeEstados[0].Estado);
            } 
        } ,
        error: function (e) {
            parent.alertDialogs("Error al enviar la peticion" + e.status + " - " + e.statusText);
        }
        
    });  
  
}
function revisarDocumentos(){
    
  parent.revisarDocumentosP();
    
}
function rechazarVacaciones(){
    var obs = document.getElementById("ObservacionesJefe").value;
  var obs = obs.trim();
    if(obs===""){
         parent.alertDialogs("Debe especificar observaciones de rechazo");
    }
    else
    {
    var datos= sessionStorage.getItem("Aprueba_Proceso");
    var datos1 = JSON.parse(datos);
    
    var consultar = new CudApruevaVacaciones();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].picprocid=datos1.inst__name;
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].pictaskname=datos1.task__name;
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].pictaskname=datos1.task__name;
    
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].Id_empleado=document.getElementById("usuario").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].email_empleado=document.getElementById("email").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_ult_vac= document.getElementById("fechaCorte").innerHTML;
    if (document.getElementById("pagoAnticipado").innerHTML==="Si"){
         datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].Pago_anticipado=true;
    }else{
        datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].Pago_anticipado=false;
    }
    
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_tiempo=document.getElementById("diasPedir").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_ini_vacaciones=  document.getElementById("corte").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_dinero=document.getElementById("diasValor").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].jefe_inmediato=document.getElementById("jefe").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_disponibles=document.getElementById("pendientes").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_anticipados=document.getElementById("anticipacion").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_solictud= document.getElementById("fecha").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].observaciones_empleado = document.getElementById("observaciones").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].observaciones_jefe= document.getElementById("ObservacionesJefe").value; 
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].estado_aprocbacion=false;        
    $.ajax({
        
        type: "POST",        
        async: false,
        data: JSON.stringify(datajson),
        url: urlService,
        dataType: "json",        
        contentType: "application/json;",
        success: function (resp) { 
            if((resp.dsSolicitudVacaciones.eeEstados[0].Estado)=="OK")
            {
               parent.terminarVacaciones(); 
            }
            else   
            {  
                parent.alertDialogs("Error "+resp.dsSolicitudVacaciones.eeEstados[0].Estado);
            } 
        } ,
        error: function (e) {
            parent.alertDialogs("Error al enviar la peticion" + e.status + " - " + e.statusText);
        }
        
    });  
    }
    

}

function llenar(){
    
    
    var datos= sessionStorage.getItem("Aprueba_Proceso");
    var datos1 = JSON.parse(datos);
    
    var consultar = new sirDocumentosInstancia();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].picprocid=datos1.inst__name;
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].pictaskname=datos1.task__name;
    var año= datos1.task__tst;
    var year=año.slice(0, 4);                      
    var month=año.slice(5, 7);
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].picyear=year;
    datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].picmonth=month;
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
                document.getElementById("usuario").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].nombreempleado; 
                document.getElementById("email").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].email_empleado; 
                document.getElementById("fecha").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_solictud; 
                document.getElementById("pendientes").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_disponibles; 
                document.getElementById("corte").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_ini_vacaciones; 
                document.getElementById("diasPedir").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_tiempo; 
                document.getElementById("diasValor").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_dinero; 
                document.getElementById("anticipacion").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_anticipados; 
                document.getElementById("vacaciones").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_tiempo; 
                document.getElementById("fechaCorte").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_ult_vac; 
                document.getElementById("jefe").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].nombrejefe; 
                
                if (resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].Pago_anticipado===true){
                    document.getElementById("pagoAnticipado").innerHTML="Si";
                }else{
                    document.getElementById("pagoAnticipado").innerHTML="No";
                }
               
                if (resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].maneja_doc===true){
                    document.getElementById("verArchivos").setAttribute("class", "k-sprite pro_upfolder_sup_on");
                    //document.getElementById("verArchivos").setAttribute("class", "k-sprite pro_upfolder_sup");
                }else{
                     document.getElementById("verArchivos").setAttribute("class", "k-sprite pro_upfolder_sup");
                     //document.getElementById("verArchivos").setAttribute("class", "k-sprite pro_upfolder_sup_on");
                }
                document.getElementById("observaciones").innerHTML=resp.dsSolicitudVacaciones.eeSolicitudVacaciones[0].observaciones_empleado; 
                
                
            }
            else   
            {  
                parent.alertDialogs("Error " + resp.dsSolicitudVacaciones.eeEstados[0].Estado);
            } 
        } ,
        error: function (e) {
            parent.alertDialogs("Error al consumir el servicio de consulta" + e.status + " - " + e.statusText);
        }
        
    });  
    
    //document.getElementById("fecha").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].fec_sol;   
    
    
}