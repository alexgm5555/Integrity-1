
$(document).ready(function () {
    
iniciar();
jefe();
pagoAnticipado();
});
function guardar(){debugger
    try {
   var consultar = new guardarVacaciones();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var fecha_inicio = $("#inicioVacaciones")[0].value;
    var dias_pedir = $("#diasPedir")[0].value;
    var dias_pago = $("#totaldiasvalor")[0].value;
    
    var anticipado = $("#anticipado").data("kendoComboBox");   
    var select = anticipado.selectedIndex;
    var anticipado = anticipado.dataSource._data[select].valor;
    
    var jefe = $("#jefe").data("kendoDropDownList");   
    var select = jefe.selectedIndex;
    var jefe = jefe.dataSource._data[select].usrcod;
    
    datajson.dsSolicitudVacaciones.eeParametros[0].usertoassign=jefe;
    datajson.dsSolicitudVacaciones.eeParametros[0].picproc_name= sessionStorage.getItem("tarea_usuario");
    
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].Pago_anticipado=anticipado;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_tiempo=parseInt(dias_pedir);
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_ini_vacaciones=fecha_inicio;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_dinero=parseInt(dias_pago);
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].jefe_inmediato=jefe;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].observaciones_empleado=document.getElementById("Observaciones").value ;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_ant_solicitud= parseInt(document.getElementById("vacaciones").innerHTML);
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_anticipados=parseInt(document.getElementById("anticipacion").innerHTML);
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_disponibles=parseInt(document.getElementById("pendientes").innerHTML);
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_solictud=document.getElementById("fecha").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_ult_vac= document.getElementById("corte").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].estado_aprocbacion="FALSE";
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
                  
                  parent.cerrar();
                }
                else   
                {  
                     
                } 
            } ,
            error: function (e) {
             parent.alertDialogs("Error al consumir el servicio de CrearConciones" + e.status + " - " + e.statusText);
        }
            
        });  
   
    
    
}
catch(err) {
   parent.alertDialogs("Debe ingresar todos los valores requeridos");
}
    
    
}
function pagoAnticipado(){
    
     var estados = [
        {text: "Si", valor: "TRUE"},
        {text: "No", valor: "FALSE"},

    ];

    $("#anticipado").kendoComboBox({
        dataTextField: "text",
        dataValueField: "valor",
        placeholder: "...",
        dataSource: estados,
        
    });
}
function jefe(){
    

        var consultar = new sirJefes();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eeusers";
        
               $("#jefe")
                .kendoDropDownList({
            dataTextField: "username",
            dataValueField: "usrcod",
            placeholder: "....",
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
                            alertDialogs("Error Con Servicio Jefes"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "usrcod",
                        fields: {
                            username: {editable: false, nullable: false},
                            usrcod: {editable: false, nullable: false}
                        }
                    }
                }
            }

        });
    
    
}
function iniciar(){
    $("#inicioVacaciones").kendoDatePicker({format:  "yyyy/MM/dd "});
    $("#diasPedir").kendoNumericTextBox({format: "0"});
    $("#totaldiasvalor").kendoNumericTextBox({format: "0"});
    
   var consultarUsr = new IniciaVacaciones();
   var data = consultarUsr.getjson();
   var urlservicio = consultarUsr.getUrlSir();
    $.ajax({
            
            type: "POST",        
            async: false,
            data: JSON.stringify(data),
            url: urlservicio,
            dataType: "json",        
            contentType: "application/json;",
            success: function (resp) { 
                if((resp.dsparam_proc_vac.eeEstados[0].Estado)=="OK")
                {
                  document.getElementById("fecha").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].fec_sol; 
                  document.getElementById("pendientes").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].tot_dias_hab; 
                  document.getElementById("corte").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].fec_cort; 
                  document.getElementById("anticipacion").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].dias_antic; 
                  document.getElementById("vacaciones").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].num_dias_vac; 
                }
                else   
                {  
                    alert("Error"+resp.dsparam_proc_vac.eeEstados["0"].Estado);   
                } 
            } 
            
        });   
    
    
}  
function mostrarMensaje(e){
     var estado = document.getElementById("btnayuda").attributes[3].nodeValue;
    if (estado ==="on"){
        $("#mensaje").empty();
         $("#ayuda").empty();  
        document.getElementById("btnayuda").setAttribute("class", "k-sprite pro_infout");
        document.getElementById("btnayuda").setAttribute("estado", "off");
    }
    else
    {     
        $("#ayuda").append("<div id='mensaje'></div>");  
          $("#ayuda").append("<div id='asd'></div>");  
        document.getElementById("mensaje").innerHTML = "<strong>Ayuda: </strong><br>"+e;
        document.getElementById("mensaje").setAttribute("class", "sidenavIzq1");
        document.getElementById("mensaje").setAttribute("style", "padding: 0.5cm 0.5cm 0.5cm 1cm");
        document.getElementById("btnayuda").setAttribute("class", "k-sprite pro_infoin");
        document.getElementById("btnayuda").setAttribute("estado", "on");
    }
    
}
function ayuda(){
    var consultarUsr = new infoAyuda();
   var data = consultarUsr.getjson();
   var urlservicio = consultarUsr.getUrlSir();
   data.dsgetWorkstepInstruction.getWorkstepInstruction[0].picprocname=sessionStorage.getItem("tarea_usuario");
   data.dsgetWorkstepInstruction.getWorkstepInstruction[0].pictaskname=sessionStorage.getItem("proceso_usuario");
    $.ajax({
            
            type: "POST",        
            async: false,
            data: JSON.stringify(data),
            url: urlservicio,
            dataType: "json",        
            contentType: "application/json;",
            success: function (resp) { debugger
                if((resp.dsgetWorkstepInstruction.eeEstados["0"].Estado)=="OK")
                {
                   var mensaje1 = resp.dsgetWorkstepInstruction.getWorkstepInstructionReturn["0"].InstructionReturn; 
                   mostrarMensaje(mensaje1);
                }
                else   
                {  
                    alert("Error"+resp.dsgetWorkstepInstruction.eeEstados["0"].Estado);   
                } 
            } 
            
        });   
    
   

}
