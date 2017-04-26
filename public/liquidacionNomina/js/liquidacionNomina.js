/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var hoy = new Date();
var codigoEmpleado = 0;

sessionStorage.setItem("ip", "190.144.16.114");
sessionStorage.setItem("puerto", "8810");

ip=sessionStorage.getItem("ip");
puerto=sessionStorage.getItem("puerto");


$(document).ready(function() {
    codigoEmpleado = 0;
    
    iniDropdownList();
    
    iniAutocompletar();
    
    $("#ipFecha").kendoDatePicker({
        format: "yyyy-MM-dd",
        value: new Date(hoy),
        disableDates: ["sa", "su"],        
    });
    
    $("#btLiquidar").kendoButton({
    });
    
    $("#btCancelar").kendoButton({
    });
    
    var datepicker = $("#ipFecha").data("kendoDatePicker");
    datepicker.readonly();
    

});

function iniDropdownList(){    
    $("#ipSucursal").kendoDropDownList({
        optionLabel: "Seleccionar sucursal...",
        dataTextField: "suc__nom",
        dataValueField: "suc__cod",        
        dataSource: {
            transport: {
                read: {
                    url: "http://"+ip+":"+puerto+"/rest/Parameters/SIRSucursalagencia",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        auth.dssic_suc.eetemp[0].piccia_nit = sessionStorage.getItem("companyNIT");
                        if (operation === 'read') {//                         
                            return JSON.stringify(auth);
                        }	
                    } catch (e) {
                        alert(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){                    
                    if(e.dssic_suc.eeEstados[0].Estado==="OK"){
                        return e.dssic_suc.eesic_suc;
                    }else{
                        alert(e.dssic_suc.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "suc__cod",
                    fields: {
                        suc__cod: {validation: {required: true}, type: 'string'},
                        suc__nom: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
    });
    
    $("#ipJornada").kendoDropDownList({
        optionLabel: "Seleccionar jornada",
        dataTextField: "jor__des",
        dataValueField: "jor__nro",
        change: onChangeJornada,
        dataSource: {
            transport: {
                read: {
                    url: "http://"+ip+":"+puerto+"/rest/Parameters/SIRnom_jor",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            authdsnom_jor["eenom_jor"] = [options];
                            return JSON.stringify(authdsnom_jor);
                        }	
                    } catch (e) {
                        alert(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsnom_jor.eeEstados[0].Estado==="OK"){
                        return e.dsnom_jor.eenom_jor;
                    }else{
                        alert(e.dsnom_jor.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "suc__cod",
                    fields: {
                        jor__nro: {validation: {required: true}, type: 'number'},
                        jor__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
    });
    
    $("#ipCalendario").kendoDropDownList({
        optionLabel: "Seleccionar calendario",
        dataTextField: "cal__des",
        dataValueField: "cal__nro"        
    });
}

function iniAutocompletar(e){    
    $("#ipEmpleado").kendoAutoComplete({
        dataTextField: "emp__apenom",
        dataValueField: "emp__cod", 
        placeholder: "Selecione un empleado...",
        filter: "contains",
        minLength: 3,
        select: OnSelectEmpleado,
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: "http://"+ip+":"+puerto+"/rest/Parameters/SIRnom_emp",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST",
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try{
                        if($("#ipSucursal").val()=="" || $("#ipJornada").val()==""){
                            alert("Debe seleccionar primero la sucursal y la jornada");                       
                        }else{                            
                            authdsnom_emp.dsnom_emp.eetemp[0].piijor_nro = $("#ipJornada").val();
                            authdsnom_emp.dsnom_emp.eetemp[0].picsuc_cod = $("#ipSucursal").val();
                            authdsnom_emp.dsnom_emp.eetemp[0].picemp_nom = $("#ipEmpleado").val();
                            if (operation === 'read') {
                                authdsnom_emp["eenom_emp"] = [options];
                                return JSON.stringify(authdsnom_emp);
                            } 
                        }                        
                    } catch (e) {
                        alert(e.message)
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    if(e.dsnom_emp.eeEstados[0].Estado==="OK"){
                        return e.dsnom_emp.eenom_emp;
                    }else{
                        alert(e.dsnom_emp.eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
            change: function (e) {
                //console.log("Change vandedor");
            },
            requestStart: function (e) {
                //                console.log("Request Start servicio vendedor");
            }            
        }
    });
}

function onChangeCalendario(e){
    var fechaVencimiento = new Date()
    fechaVencimiento = new Date(e.sender.dataSource._data [e.sender.selectedIndex-1].cal__fin__per);
    fechaVencimiento.setDate(fechaVencimiento.getDate()+1);
    $("#ipFecha").kendoDatePicker({        
	format: "yyyy-MM-dd",
	disableDates: ["sa", "su"],
	value: new Date(fechaVencimiento)        
    }); 
}

function  onChangeJornada(e){
    $("#ipCalendario").kendoDropDownList({
        optionLabel: "Seleccionar calendario",
        dataTextField: "cal__des",
        dataValueField: "cal__nro",
        change: onChangeCalendario,
        dataSource: {
            transport: {
                read: {
                    url: "http://"+ip+":"+puerto+"/rest/Parameters/SIRnom_cal",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            authdsnom_cal.dsnom_cal.eetemp[0].piijor_nro = $("#ipJornada").val();
                            return JSON.stringify(authdsnom_cal);
                        }	
                    } catch (e) {
                        alert(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsnom_cal.eeEstados[0].Estado==="OK"){
                        return e.dsnom_cal.eenom_cal;
                    }else{
                        alert(e.dsnom_cal.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cal__nro",
                    fields: {
                        cal__nro: {validation: {required: true}, type: 'string'},
                        cal__des: {validation: {required: true}, type: 'string'},
                        cal__fin__per : {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
    });
}

function OnSelectEmpleado(e){
    document.getElementById("rbDefinitivoSi").disabled = true;
    document.getElementById("rbDefinitivoNo").disabled = true;
    document.getElementById("rbDefinitivoSi").checked = "";
    document.getElementById("rbDefinitivoNo").checked = "checked";
    
    var dataItem = this.dataItem(e.item.index()); 
    codigoEmpleado = dataItem.emp__cod;    
}

function liquidarNomina(){   
     
    var usuario = sessionStorage.getItem("usuario");
    var fiid = sessionStorage.getItem("picfiid");
    var sucursal = $("#ipSucursal").val();    
    var fecha = $("#ipFecha").val();
    var jornada = $("#ipJornada").val();
    fecha = new Date(fecha);
    var anno = fecha.getFullYear();
    var calendario = $("#ipCalendario").val();
    var definitivo = $('input:radio[name=rbDefinitivo]:checked').val();
    
    var liquidacionHecha = "";
    
    var jSonData = new Object();
    jSonData.dsnom_his = new Object();
    jSonData.dsnom_his.eeDatos = new Array();
    jSonData.dsnom_his.eeDatos[0] = new Object();
    jSonData.dsnom_his.eeDatos[0].picusrcod = usuario;
    jSonData.dsnom_his.eeDatos[0].fiid = fiid;
    jSonData.dsnom_his.eetemp = new Array();
    jSonData.dsnom_his.eetemp[0] = new Object();
    jSonData.dsnom_his.eetemp[0].piianno = anno;
    jSonData.dsnom_his.eetemp[0].piijor_nro = jornada;
    jSonData.dsnom_his.eetemp[0].picsuc_cod = sucursal;
    if($("#ipEmpleado").val()===""){
        jSonData.dsnom_his.eetemp[0].picemp_cod = "";
    }else{
        jSonData.dsnom_his.eetemp[0].picemp_cod = codigoEmpleado;    
    }    
    jSonData.dsnom_his.eetemp[0].piical_nro = calendario;
    jSonData.dsnom_his.eetemp[0].pilhis_def = definitivo;
    
    console.log("jSonData "+JSON.stringify(jSonData));
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(jSonData),
        url: "http://"+ip+":"+puerto+"/rest/Nomina/SICUDliquidanomina",
        dataType : "json",
        contentType: "application/json;",
        success: function (resp) {
            console.log(JSON.stringify(resp));                
            liquidacionHecha = JSON.stringify(resp.dsnom_his.eeEstados[0].Estado);            
        },
        error: function (e) {
            console.log(JSON.stringify(e));
            alert("Error consumiendo el servicio de liquidar\n"+ e.status +" - "+ e.statusText);
        }
    }).done(function(){
        if(liquidacionHecha=='"OK"'){
            msnError("Liquidación realizada con exito");
            console.log("Liquidación hecha \n" + liquidacionHecha);                     
        }else{
            msnError("No se pudo realizar la liquidación .\n" + liquidacionHecha);
            console.log("Error  \n" + liquidacionHecha);                
        }
    });
}
