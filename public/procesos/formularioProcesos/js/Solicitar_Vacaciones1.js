var array1 =[];
var contador=0;
$(document).ready(function () {
    
iniciar();
jefe();
pagoAnticipado();
var x  = $("#btnCrearRepo").height();
var w = $("#banner").height();
var y  = $("#contenido").height();
var z  = parent.tamaño();
$("#contenido").height((z)-w-x-1);

$("#fileInput1").kendoUpload({  
    remove:remover,
    });
$(".k-upload-button").css("border",0);
$("#fileInput1").closest(".k-upload-button").find("span")[0].innerText="";


});
function remover(e){debugger
    
 for(var i in array1){
 
    if (array1[i].picdocname===e.files[0].name){
        delete array1[i];
    }
    
    }

}
function pdf(){
    var base64;
    var fileInput = document.getElementById('fileInput1');
    
    
        var file = fileInput.files[0];
        var reader = new FileReader();
        
        reader.onload = function(e) {            
            base64 = reader.result;
            subirArchivo(base64,file);
        };        
        reader.readAsDataURL(file);	        
    
}
function popUpSubirArchivo(){debugger
try{
    document.getElementById("fileInput1").click();
}catch(e){alert(e)}

}
function subirArchivo(base64, file){debugger
    var fecha = sessionStorage.getItem("fechaSistema");
    var año = fecha.slice(0, 4);
    var mes  = fecha.slice(5, 7);
   // base64 = base64.replace(/data:[a-z]+\/[a-z]+;base64,/g, "");  
    file.name;
    var array = {};
    array.picdocname = file.name ;
    array.picdescription = " ";
    array.picfolderpath = "ECM/"+sessionStorage.getItem("companyNIT")+"/"+sessionStorage.getItem("tarea_usuario")+"/"+año+"/"+mes+"/";
    array.picldocbase64 = base64;
    array.picmimetype= file.type;
    array1.push(array);
       
}

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
    //datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_ant_solicitud= parseInt(document.getElementById("vacaciones").innerHTML);
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_anticipados=parseInt(document.getElementById("anticipacion").innerHTML);
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].dias_disponibles=parseInt(document.getElementById("pendientes").innerHTML);
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_solictud=document.getElementById("fecha").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].fecha_ult_vac= document.getElementById("corte").innerHTML;
    datajson.dsSolicitudVacaciones.eeSolicitudVacaciones[0].estado_aprocbacion="FALSE";
    var arrayNew=[];
     for(var i in array1){//array para enviar 1
        arrayNew.push(array1[i]);
    }
        datajson.dsSolicitudVacaciones.ecreatedocument=arrayNew;
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
                  
                   parent.solicitaVacaciones();
                }
                else   
                {  
                  parent.alertDialogs(resp.dsSolicitudVacaciones.eeEstados[0].Estado);
                } 
            } ,
            error: function (e) {
              parent.alertDialogs("Error al consumir el servicio Iniciar Proceso" + e.status + " - " + e.statusText);
        }
            
        });  
   
    
    
}
catch(err) {
   parent.alertDialogs("Debe ingresar todos los valores requeridos"+err);
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
        value:"TRUE",
        dataSource: estados,
        
    });
}
function jefe(){
    
var proceso= sessionStorage.getItem("tarea_usuario");
        var consultar = new SirUsuariosReasigna();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eeusers";
        datajson.dsJefesBpm.eeSIRjefes[0].picprocname=proceso;
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
    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = mm+dd+yyyy;
    $("#inicioVacaciones").kendoDatePicker({
        format:  "MM/dd/yyyy",
        disableDates: ["sa", "su"],
        min: new Date(yyyy, mm-1, dd)
    });
    $("#diasPedir").kendoNumericTextBox({format: "0", min:0});
    $("#totaldiasvalor").kendoNumericTextBox({format: "0",min:0 });
    
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
                  document.getElementById("fecha").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].fec_sol2; 
                  document.getElementById("pendientes").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].tot_dias_hab; 
                  document.getElementById("corte").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].fec_cort2; 
                  document.getElementById("anticipacion").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].dias_antic; 
                  //document.getElementById("vacaciones").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].num_dias_vac; 
                }
                else   
                {  
                    parent.alertDialogs("Error"+resp.dsparam_proc_vac.eeEstados["0"].Estado);   
                } 
            } 
            
        });   
    
    
}  
function mostrarMensaje(e){
     var estado = document.getElementById("btnayuda").attributes[3].nodeValue;
    if (estado ==="on"){
        $("#mensaje").empty();
        $("#ayuda").empty();  
        document.getElementById("btnayuda").setAttribute("class", "k-sprite pro_helpOff");
        document.getElementById("btnayuda").setAttribute("estado", "off");
    }
    else
    {     
        $("#ayuda").append("<div id='mensaje'></div>");  
          $("#ayuda").append("<div id='asd'></div>");  
        document.getElementById("mensaje").innerHTML = "<strong>Ayuda: </strong><br>"+e;
        document.getElementById("mensaje").setAttribute("class", "sidenavIzq1");
        document.getElementById("mensaje").setAttribute("style", "padding: 0.5cm 0.5cm 0.5cm 1cm");
        document.getElementById("btnayuda").setAttribute("class", "k-sprite pro_help");
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
function historicoDocumentos(){
    parent.historicoDocs();
}