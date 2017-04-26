$(document).ready(function () {
    
    $("#Identificacion").kendoNumericTextBox();
    $("#Cupo_De_Credito").kendoNumericTextBox();
    $("#Cupo_De_Ventas").kendoNumericTextBox();
    $("#Copias_Factura").kendoNumericTextBox();
    $("#Tope_Galones").kendoNumericTextBox();          
    $("#Hora_Pago").kendoTimePicker();
    
    
    $("#buttonCab").kendoButton();            
    
    var data = [
        {text: "Si", value: "true"},
        {text: "No", value: "false"},
    ];
    
    var dias = [
        {text: "Lunes", value: "Lunes"},
        {text: "Martes", value: "Martes"},
        {text: "Miercoles", value: "Miercoles"},
        {text: "Jueves", value: "Jueves"},
        {text: "Viernes", value: "Viernes"}
        
    ];
    var transportadoPor = [
        {text: "Si", value: "true"},
        {text: "No", value: "false"},
    ];
    
    $("#Certificado_Analisis").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",        
        dataSource: data
        
    });
    $("#Despachos_Parciales").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",        
        dataSource: data
        
    });
    $("#Cliente_Nacional").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",       
        dataSource: data
        
    });
    $("#Transporte_por").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",       
        dataSource: transportadoPor
        
    });
    $("#Precio_Establecimiento").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",        
        dataSource: data        
    });
    
    $("#Dia_Pago").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",        
        dataSource: dias        
    });
    
    nombre();
    claseCliente();
    nit();
    listaPrecio();
    formaPago();
    bodegas();
    
    if(sessionStorage.getItem("Detalle_Cliente")){
        cargar_datos();
    } 
});

function guardar(){
    var verbo ="POST"
    
    if($("#buttonCab")["0"].childNodes["0"].data==="Actualizar"){
        verbo = "PUT";
    }
    
    var  actualizar = new cudClientes();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();    
    
    var cedula = $("#nit").val();   //$("#ipSucursal").val()       
    var Clase_cliente = $("#claseCliente").val();
    var Identificacion = $("#Identificacion").val();
    var Credito =$("#Cupo_De_Credito").val();
    var ventas = $("#Cupo_De_Ventas").val(); 
    var Persona_tesoreria = $("#Persona_Contacto_Tesoreria").val(); 
    var Persona_ventas = $("#Persona_Contacto_Ventas").val(); 
    var analisis = $("#Certificado_Analisis").val();
    var despachos = $("#Despachos_Parciales").val();
    var transporte = $("#Transporte_por").val();
    var clienteNacional = $("#Cliente_Nacional").val();
    var copias_factura = $("#Copias_Factura").val();  
    var forma_pago = $("#Forma_Pago").val();
    var listaPrecio = $("#Numero_Lista").val();
    var dia_Pago = $("#Dia_Pago").val();
    var hora_Pago =$("#Hora_Pago").val();
    var email =$("#Email").val();
    var cli_estado = 99;
    var bodegas = $("#Bodega").val();
    var precio_est = $("#Precio_Establecimiento").val();
    var galones =$("#Tope_Galones").val();
    
    
    actjson.dsSICUDgpd_cli.eegpd_cli[0].ter__nit=cedula;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].cla__cli=Clase_cliente;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].cal__ide=Identificacion;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].cli__cre=Credito;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].cli__ven=ventas;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].con__tes=Persona_tesoreria;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].con__ven=Persona_ventas;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].cer__ana=analisis;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].dpc__par=despachos;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].cli__tra=transporte;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].num__cop__fac=copias_factura;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].pago__cod=forma_pago;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].ter__lis=listaPrecio;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].dia__pag=dia_Pago;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].hor__pag=hora_Pago;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].email__ter=email;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].cli__est=cli_estado;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].loc__cod=bodegas;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].ter__cret=precio_est;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].cli__gal=galones;
    actjson.dsSICUDgpd_cli.eegpd_cli[0].gfc__nal=clienteNacional;
    
    $.ajax({
        type: verbo,
        data: JSON.stringify(actjson),
        url: urlactualizar,
        dataType: "json",        
        contentType: "application/json;",
        success: function (resp) {            
            if((resp.dsSICUDgpd_cli.eeEstados[0].Estado)==="OK")
            {    
                sessionStorage.setItem("Detalle_Cliente",JSON.stringify(resp.dsSICUDgpd_cli.eegpd_cli[0]));                
            }
            else
            {
                alertDialogs("Error"+resp.dsSICUDgpd_cli.eeEstados[0].Estado);                  
            }
        } 
    }).done(function(e){                                          
        parent.cerrarClienteCabecera();
    });
    
    
    
}
function cancelar(){        
    parent.cerrar();
}

function cargar_datos (){debugger
    var datos_cliente = JSON.parse(sessionStorage.getItem("Detalle_Cliente"));
    
    var autocompleteNIT = $("#nit").data("kendoAutoComplete");
    autocompleteNIT.value(datos_cliente.ter__nit);
    autocompleteNIT.enable(false);    
    
    var autocompleteRaz = $("#nombre").data("kendoAutoComplete");
    autocompleteRaz.value(datos_cliente.ter__raz);
    autocompleteRaz.enable(false);
    
    var kendoDropDownListClaseCliente = $("#claseCliente").data("kendoDropDownList");    
    kendoDropDownListClaseCliente.value(datos_cliente.cla__cli);    
    
    $("#Email").val(datos_cliente.ter__email);
    
    var numerictextboxIdentificacion = $("#Identificacion").data("kendoNumericTextBox");    
    numerictextboxIdentificacion.value(datos_cliente.cal__ide);
    
    var numerictextboxCupoCre = $("#Cupo_De_Credito").data("kendoNumericTextBox");    
    numerictextboxCupoCre.value(datos_cliente.cli__cre);
    
    var numerictextboxCupoVen = $("#Cupo_De_Ventas").data("kendoNumericTextBox");    
    numerictextboxCupoVen.value(datos_cliente.cli__ven);
    
    $("#Persona_Contacto_Tesoreria").val(datos_cliente.con__tes); 
    
    $("#Persona_Contacto_Ventas").val(datos_cliente.con__ven);
    
    var numerictextboxFacturas= $("#Copias_Factura").data("kendoNumericTextBox");    
    numerictextboxFacturas.value(datos_cliente.num__cop__fac);
    
    var kendoDropDownListDiaPago = $("#Dia_Pago").data("kendoDropDownList");    
    kendoDropDownListDiaPago.value(datos_cliente.dia__pag);    
    
    var kendoTimePickerHora = $("#Hora_Pago").data("kendoTimePicker");    
    kendoTimePickerHora.value(datos_cliente.hor__pag);
    
    var numerictextboxGalones= $("#Tope_Galones").data("kendoNumericTextBox");    
    numerictextboxGalones.value(datos_cliente.cli__gal);
    
    var kendoDropDownListCertificado = $("#Certificado_Analisis").data("kendoDropDownList");    
    kendoDropDownListCertificado.value(datos_cliente.cer__ana);
    
    var kendoDropDownListParciales = $("#Despachos_Parciales").data("kendoDropDownList");    
    kendoDropDownListParciales.value(datos_cliente.dpc__par);
    
    var kendoDropDownListTransportado = $("#Transporte_por").data("kendoDropDownList");    
    kendoDropDownListTransportado.value(datos_cliente.cli__tra);
    
    var kendoDropDownListTransportado = $("#Precio_Establecimiento").data("kendoDropDownList");    
    kendoDropDownListTransportado.value(datos_cliente.ter__cret);
    
    var kendoDropDownListTransportado = $("#Forma_Pago").data("kendoDropDownList");    
    kendoDropDownListTransportado.value(datos_cliente.pago__cod);

    $("#buttonCab")["0"].childNodes["0"].data="Actualizar";
    
}

function nombre(container, options) {
    var obj = new sirConsultaCliente();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    $("#nombre").kendoAutoComplete({
        dataTextField: "ter__raz",
        dataValueField: "ter__nit",        
        placeholder: "Selecione un cliente...",
        minLength: 4,
        filter: "contains",
        select: function(e) {                
            $("#nit").val(e.dataItem.ter__nit);    
        },
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
        //select: setInfoCliente,
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try {
                        
                        if (operation === 'read') {
                            var key1 = Object.keys(objJson)[0];
                            var key2 = Object.keys(objJson[key1])[1];
                            objJson[key1][key2][0].picter_nit = "";
                            objJson[key1][key2][0].picter_raz = $("#nombre").val();
                            return JSON.stringify(objJson);
                        } 
                    } catch (e) {
                        alertDialogs(e.message);
                    }                                    
                }
            },
            schema: {
                data: function (e){
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        //$("#cedula").val(e.dsgfc_cli.eegfc_cli[0].ter__nit);
                        return e[key1][mapData];
                    }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !"){
                        
                    }else{
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
            change: function (e) {
                //console.log("Change client");
            },
            requestStart: function (e) {
                //console.log("Request Start servicio cliente");
            }            
        }
    });    
    
}
function nit(container, options) {
    var obj = new sirConsultaCliente();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    $("#nit").kendoAutoComplete({
        dataTextField: "ter__nit",
        dataValueField: "ter__nit",        
        placeholder: "Selecione un cliente...",
        minLength: 6,
        filter: "contains",
        select: function(e) {                
            $("#nombre").val(e.dataItem.ter__raz);    
        },
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
        //select: setInfoCliente,
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try {
                        
                        if (operation === 'read') {
                            var key1 = Object.keys(objJson)[0];
                            var key2 = Object.keys(objJson[key1])[1];
                            objJson[key1][key2][0].picter_nit = $("#nit").val();
                            objJson[key1][key2][0].picter_raz = "";
                            return JSON.stringify(objJson);
                        } 
                    } catch (e) {
                        alertDialogs(e.message);
                    }                                    
                }
            },
            schema: {
                data: function (e){   
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !"){
                        
                    }else{
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
            change: function (e) {
                //console.log("Change client");
            },
            requestStart: function (e) {
                //console.log("Request Start servicio cliente");
            }            
        }
    });
    
}                       
function claseCliente(container, options) {
    
    var consultar = new sirClaseCliente();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eegpr_cla";
    $("#claseCliente")
            .kendoDropDownList({
                dataTextField: "cla__nom",
        dataValueField: "cla__cli",
        //template:'<div class="divElementDropDownList">#: data.cla__nom #</div>',  
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
                        alertDialogs("Error Con Servicio Clase Cliente"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cla__cli",
                    fields: {
                        cla__cli: {editable: false, nullable: false},
                        cla__nom: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}        
function listaPrecio(){
    //-------------LISTA DE PRECIO
    var consultar = new sirLista();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eegpr_lis";
    $("#Numero_Lista").kendoDropDownList({
        dataTextField: "lis__des",
        dataValueField: "lis__num",
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
                        alertDialogs("Error Con Servicio Listas de precio"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "lis__num",
                    fields: {
                        lis__num: {editable: false, nullable: false},
                        lis__des: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}
function formaPago(){
    //-------FORMA DE PAGO
    var consultar = new sirFormadepago();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eefac_pag";
    $("#Forma_Pago")
    
            .kendoDropDownList({
                dataTextField: "pag__des",
        dataValueField: "fac__pag",
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
                        alertDialogs("Error Con Servicio Forma de pago "+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "fac__pag",
                    fields: {
                        fac__pag: {editable: false, nullable: false},
                        pag__des: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}
function bodegas(){
    //-------BODEGA EN COSIGNA
    var consultar = new sirBodega();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eedpc_loc";
    $("#Bodega")
            .kendoDropDownList({
                dataTextField: "loc__des",
        dataValueField: "loc__cod",
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
                        alertDialogs("Error Con Servicio de Bodegas "+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "loc__cod",
                    fields: {
                        loc__cod: {editable: false, nullable: false},
                        loc__des: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}