/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {  
    
    $("#buttonGuardar").kendoButton({
        //click: buscarPedidos
    });
    
    $("#ipNumeroDoc").prop("disabled", true).addClass("k-state-disabled");    
        
    var data = [
        {text: "Si", value: "true"},
        {text: "No", value: "false"}
    ];
    
    var dataFacturacion = [
        {text: "Electrónica", value: "Electronica"},
        {text: "Manual", value: "Manual"}
    ];
    
    $("#ipRetencion").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",        
        dataSource: data
        
    });
    
    $("#ipReteIVA").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",        
        dataSource: data
        
    });
    
    $("#ipReteICA").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",        
        dataSource: data
        
    });
    
    $("#ipAutoretenedor").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value", 
        value: "false",
        dataSource: data
        
    });
    
    $("#ipFacturacion").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",        
        dataSource: dataFacturacion
        
    });
    
    $("#ipFecha").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"]
    });
    //ciudad();
    claseTercero();
    regimen();
    actividadEconomica();
    regimenFiscal();
    paraisoFiscal();
    pagoResidentes();
    tipoDocumentoIdentificacion();
    pais();
    
    if(sessionStorage.getItem("regTercero")){
        setTercero();        
    }
});

function setTercero(){    
    var tercero = JSON.parse(sessionStorage.getItem("regTercero"));
    
    $("#buttonGuardar")["0"].childNodes["0"].data="Actualizar";    
    
    var kendoDropDownListtipoDocumento = $("#tipoDocumento").data("kendoDropDownList");    
    kendoDropDownListtipoDocumento.value(tercero.ter__cln);
    kendoDropDownListtipoDocumento.enable(false);
    
    $("#ipNumeroDoc").val(tercero.ter__nit);
    $("#ipNumeroDoc").prop("disabled", true).addClass("k-state-disabled");
    
    $("#ipTercero").val(tercero.ter__raz);
    
    $("#ipRepresentante").val(tercero.ter__rep);
    
    $("#ipRepresentante").val(tercero.ter__rep);
    
    var kendoDropDownListPais = $("#ipPais").data("kendoDropDownList");    
    kendoDropDownListPais.value(tercero.pais_cod);
    ciudad();

    $("#ipDireccion").val(tercero.ter__dir);
    
    $("#ipTelefono").val(tercero.ter__tel);
    
    $("#ipCelular").val(tercero.ter__fax);
    
    $("#ipEmailPrincipal").val(tercero.mail_ter);
    
    $("#ipEmailAlterno").val(tercero.mail_ter_al);
    
    var fecha = new Date(tercero.ter__ncto.replace(/-/g, "/"));
    fecha.setHours(0,0,0,0);    
    var datepicker = $("#ipFecha").data("kendoDatePicker");
    datepicker.value(fecha);
    
    var kendoDropDownListClaseTercero = $("#ipClaseTer").data("kendoDropDownList");    
    kendoDropDownListClaseTercero.value(tercero.cla__ter);
    
    var kendoDropDownListActividadEconomica = $("#ipActividadEconomica").data("kendoDropDownList");    
    kendoDropDownListActividadEconomica.value(tercero.activ__cod);
    
    var kendoDropDownListRegimen = $("#ipRegimen").data("kendoDropDownList");    
    kendoDropDownListRegimen.value(tercero.ter__reg);
    
    var kendoDropDownListRetencion = $("#ipRetencion").data("kendoDropDownList");    
    kendoDropDownListRetencion.value(tercero.ter__ret);
    
    var kendoDropDownListRetencion = $("#ipRetencion").data("kendoDropDownList");    
    kendoDropDownListRetencion.value(tercero.ter__ret);
    
    var kendoDropDownListReteIVA = $("#ipReteIVA").data("kendoDropDownList");    
    kendoDropDownListReteIVA.value(tercero.ter__vret);
    
    var kendoDropDownListReteICA = $("#ipReteICA").data("kendoDropDownList");    
    kendoDropDownListReteICA.value(tercero.ter__cret);
    
    var kendoDropDownListAutoretenedor = $("#ipAutoretenedor").data("kendoDropDownList");    
    kendoDropDownListAutoretenedor.value(tercero.ter__aret);
    
    var kendoDropDownListRegimenFiscal = $("#ipRegimenFiscal").data("kendoDropDownList");    
    kendoDropDownListRegimenFiscal.value(tercero.trf_cod);
    
    var kendoDropDownListParaisoFiscales = $("#ipParaisoFiscales").data("kendoDropDownList");    
    kendoDropDownListParaisoFiscales.value(tercero.para_cod);
    
    var kendoDropDownListPagoResidentes = $("#ipPagoResidentes").data("kendoDropDownList");    
    kendoDropDownListPagoResidentes.value(tercero.tpa_cod);
    
    
    
}

function ciudad(){  
    $("#ipCiudad").removeClass();
    
    var obj = new sirCiudades();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    
    $("#ipCiudad").kendoDropDownList({
        optionLabel: "Seleccione la ciudad",
        dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        template:'<div class="divElementDropDownList">#: data.ciu__nom #</div>',
        dataBound: function (){
            if(sessionStorage.getItem("regTercero")){
                var kendoDropDownListCiudad = $("#ipCiudad").data("kendoDropDownList");    
                kendoDropDownListCiudad.value(JSON.parse(sessionStorage.getItem("regTercero")).ciu__cod);
            }  
        },
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            var key1 = Object.keys(json)[0];
                            var key2 = Object.keys(json[key1])[1];                            
                            json[key1][key2][0].picciu_cod = $("#ipPais").val();
                            return JSON.stringify(json);
                        }	
                    } catch (e) {
                        alertDialogs( e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__cod: {validation: {required: true}, type: 'string'},
                        ciu__nom: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function claseTercero(){
    
    var obj = new sirClaseTercero();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    
    $("#ipClaseTer").kendoDropDownList({
        optionLabel: "Seleccione la clase de tercero",
        dataTextField: "cla__nom",
        dataValueField: "cla__ter",
        template:'<div class="divElementDropDownList">#: data.cla__nom #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {                            
                            return JSON.stringify(json);
                        }	
                    } catch (e) {
                        alertDialogs( e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cla__ter",
                    fields: {
                        cla__ter: {validation: {required: true}, type: 'string'},
                        cla__nom: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function regimen(){
    
    var obj = new sirRegimen();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    
    $("#ipRegimen").kendoDropDownList({
        optionLabel: "Seleccione el régimen",
        dataTextField: "reg__des",
        dataValueField: "reg__cod",
        template:'<div class="divElementDropDownList">#: data.reg__des #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {                            
                            return JSON.stringify(json);
                        }	
                    } catch (e) {
                        alertDialogs( e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "reg__cod",
                    fields: {
                        reg__cod: {validation: {required: true}, type: 'string'},
                        reg__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function actividadEconomica(){
    
    var obj = new sirActividadEconomica();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    
    $("#ipActividadEconomica").kendoDropDownList({
        optionLabel: "Seleccione la actividad",
        dataTextField: "activ__des",
        dataValueField: "activ__cod",
        template:'<div class="divElementDropDownList">#: data.activ__des #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {                            
                            return JSON.stringify(json);
                        }	
                    } catch (e) {
                        alertDialogs( e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "activ__cod",
                    fields: {
                        activ__cod: {validation: {required: true}, type: 'string'},
                        activ__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function regimenFiscal(){
    
    var obj = new sirRegimenFiscal();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    
    $("#ipRegimenFiscal").kendoDropDownList({
        optionLabel: "Seleccione el regimen fiscal",
        dataTextField: "trf_des",
        dataValueField: "trf_cod",
        template:'<div class="divElementDropDownList">#: data.trf_des #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {                            
                            return JSON.stringify(json);
                        }	
                    } catch (e) {
                        alertDialogs( e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "trf_cod",
                    fields: {
                        trf_cod: {validation: {required: true}, type: 'string'},
                        trf_des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function paraisoFiscal(){
    
    var obj = new sirParaisoFiscal();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    
    $("#ipParaisoFiscales").kendoDropDownList({
        optionLabel: "Seleccione el paraiso fiscal",
        dataTextField: "para_des",
        dataValueField: "para_cod",
        template:'<div class="divElementDropDownList">#: data.para_des #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {                            
                            return JSON.stringify(json);
                        }	
                    } catch (e) {
                        alertDialogs( e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "para_cod",
                    fields: {
                        para_cod: {validation: {required: true}, type: 'string'},
                        para_des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function pagoResidentes(){
    
    var obj = new sirPagoResidentes();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    
    $("#ipPagoResidentes").kendoDropDownList({
        optionLabel: "Seleccione el tipo de pago de residentes",
        dataTextField: "tpa_des",
        dataValueField: "tpa_cod",
        template:'<div class="divElementDropDownList">#: data.tpa_des #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {                            
                            return JSON.stringify(json);
                        }	
                    } catch (e) {
                        alertDialogs( e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "tpa_cod",
                    fields: {
                        tpa_cod: {validation: {required: true}, type: 'string'},
                        tpa_des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function tipoDocumentoIdentificacion(){
    
    var obj = new sirTipoDocumentoIdentificacion();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    $("#tipoDocumento").kendoDropDownList({
        optionLabel: "Seleccione el tipo de documento",
        dataTextField: "cln__des",
        dataValueField: "ter__cln",
        template:'<div class="divElementDropDownList">#: data.cln__des #</div>', 
        change: function(e){
            $("#ipNumeroDoc").val(""); 
            $("#ipNumeroDoc").prop("disabled", false).removeClass("k-state-disabled");
        },
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {                            
                            return JSON.stringify(json);
                        }	
                    } catch (e) {
                        alertDialogs( e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ter__cln",
                    fields: {
                        ter__cln: {validation: {required: true}, type: 'string'},
                        cln__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function pais(){
    
    var obj = new sirPais();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    $("#ipPais").kendoDropDownList({
        optionLabel: "Seleccione el país",
        dataTextField: "des__pais",
        dataValueField: "ciu__cod",
        template:'<div class="divElementDropDownList">#: data.des__pais #</div>',   
        change: ciudad,
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {                            
                            return JSON.stringify(json);
                        }	
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__cod: {validation: {required: true}, type: 'string'},
                        des__pais: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function guardarTercero(){
    
    var verbo = "POST";
    var estado = 99;
    
    if($("#buttonGuardar")["0"].childNodes["0"].data==="Actualizar"){
        verbo = "PUT";
        estado = JSON.parse(sessionStorage.getItem("regTercero")).ter__est;
    }
    
    var obj = new SICUDTercero();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    var key1 = Object.keys(json)[0];
    var key2 = Object.keys(json[key1])[1];
    json[key1][key2][0].ter__nit = $("#ipNumeroDoc").val();
    json[key1][key2][0].ter__cln = $("#tipoDocumento").val();
    json[key1][key2][0].ter__raz = $("#ipTercero").val();
    json[key1][key2][0].ter__rep = $("#ipRepresentante").val();
    json[key1][key2][0].ter__dir = $("#ipDireccion").val();
    json[key1][key2][0].ter__tel = $("#ipTelefono").val();
    json[key1][key2][0].cla__ter = $("#ipClaseTer").val();
    json[key1][key2][0].activ__cod = $("#ipActividadEconomica").val();
    json[key1][key2][0].ter__sin = $("#ip").val();
    json[key1][key2][0].ter__fax = $("#ipCelular").val();
    json[key1][key2][0].ter__ret = $("#ipRetencion").val();
    json[key1][key2][0].ter__vret = $("#ipReteIVA").val();
    json[key1][key2][0].ter__cret = $("#ipReteICA").val();
    json[key1][key2][0].ter__aret = $("#ipAutoretenedor").val();
    json[key1][key2][0].ter__renta = "false";
    json[key1][key2][0].ter__est = estado;
    json[key1][key2][0].ciu__cod = $("#ipCiudad").val();    
    json[key1][key2][0].ter__ncto = $("#ipFecha").val();    
    json[key1][key2][0].ter__reg = $("#ipRegimen").val();
    json[key1][key2][0].empr__cod = $("#ipFacturacion").val();    
    json[key1][key2][0].ter__raz__amp = $("#ipTercero").val();    
    json[key1][key2][0].trf_cod = $("#ipRegimenFiscal").val();
    json[key1][key2][0].para_cod = $("#ipParaisoFiscales").val();
    json[key1][key2][0].tpa_cod = $("#ipPagoResidentes").val();
    json[key1][key2][0].mail_ter = $("#ipEmailPrincipal").val();
    json[key1][key2][0].mail_ter_al = $("#ipEmailAlterno").val();
    json[key1][key2][0].pais_cod = $("#ipPais").val();
    
    $.ajax({
        type: verbo,
        data: JSON.stringify(json),
        url: url,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {             
            var key1 = Object.keys(e)[0];
            if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                return e[key1][mapData];
            } else {
                alertDialogs(e[key1].eeEstados[0].Estado);
            }
        } 
    }).done(function(e){
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {            
            parent.closePopUpCabecera("", "");
        } else {
            alertDialogs(e[key1].eeEstados[0].Estado);
        }
    });
        
}

function cuentaDigitos(){
    var ter__cln = $("#tipoDocumento").val();
    var ter__nit = $("#ipNumeroDoc").val();    
    ter__nit = ter__nit.replace(/^\s+|\s+$/g, "");
    
    if(ter__cln==="C" && ter__nit.length!==10){
        alertDialogs("La cédula debe tener exactamente 10 dígitos")
    }else if (ter__cln==="R" && ter__nit.length!==13){
        alertDialogs("El número de RUC debe tener exactamente 13 dígitos")
    }
    
}