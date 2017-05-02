/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var hoy = new Date(sessionStorage.getItem("fechaSistema"));
hoy.setHours(0,0,0,0);
var tasaDeCambio = "";
var dataGridDetalle=[];
var dataSource={};
ip=sessionStorage.getItem("ip");
puerto=sessionStorage.getItem("puerto");
var itemID = null; 
var dataCliente = null;

$(document).ready(function() {   
    
    sessionStorage.setItem("cabeceraValida","false");    
    iniDropDownList();
    
    iniAutocomplete();
    
    $("#ipFecha").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(hoy),
        disableDates: ["sa", "su"]
    });    
    $("#ipFechaVencimiento").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy/MM/dd",        
        value: new Date(hoy),
        disableDates: ["sa", "su"]
    });
    
    $("#ipFechaTasa").kendoDatePicker({
        format: "yyyy/MM/dd",        
        //value: new Date(hoy),
        disableDates: ["sa", "su"]
    });    
    
    $("#ipTasa").kendoNumericTextBox({
        format: "c",
        decimals: 2
    });
    
    $("#ipFletes").kendoNumericTextBox({
        format: "c",
        decimals: 2
    });
    
    $("#ipDescuento").kendoNumericTextBox({
        format: "p0",
        min: 0,
        max: 0.1,
        step: 0.01
    });
    
    var datepickerFechaTasa= $("#ipFechaTasa").data("kendoDatePicker");
    datepickerFechaTasa.readonly();
        
    
    var staticNotification = $("#staticNotification").kendoNotification({
        appendTo: "#appendto"
    }).data("kendoNotification");
    
    var kendoDropDownListVendedor = $("#ipVendedor").data("kendoDropDownList");
    kendoDropDownListVendedor.enable(false); 
        
    if(sessionStorage.getItem("regFactura")){        
        verificarArchivos();
        cargarFactura();    
    }else{
        gridDetalle();
    }    
});

/** 
 * Se encarga de cargar la información de los combobox de la cabecera de la factura
 * @returns {undefined}
 */
function iniDropDownList(){    
        
    //carga el combo de sucursales
    $("#ipSucursal").kendoDropDownList({
        optionLabel: "Seleccione la sucursal",
        dataTextField: "suc__nom",
        dataValueField: "suc__cod",
        template:'<div class="divElementDropDownList">#: data.suc__nom #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: ipServicios+"rest/Parameters/SIRSucursalagencia",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            auth.dssic_suc.eetemp[0].piccia_nit = sessionStorage.getItem("companyNIT");                            
                            //console.log(JSON.stringify(auth));
                            auth["eesic_suc"] = [options];
                            return JSON.stringify(auth);
                        }	
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_suc.eeEstados[0].Estado==="OK"){
                        return e.dssic_suc.eesic_suc;
                    }else{
                        alertDialogs(e.dssic_suc.eeEstados[0].Estado);
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
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
    
    
    $("#ipCdePago").kendoDropDownList({
        optionLabel: "Seleccione la forma de pago",
        dataTextField: "pag__des",
        dataValueField: "fac__pag"
    });   
    
    
    //carga las clases de documentos
    
    $("#ipCDocumento").kendoDropDownList({
        optionLabel: "Seleccione el tipo de documento",
        dataTextField: "clc__nom",
        dataValueField: "clc__cod",      
        template:'<div class="divElementDropDownList">#: data.clc__nom #</div>',
        dataSource: {
            transport: {
                read: {
                    url: ipServicios+baseParameters+"SIRsic_clc",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {                    
                    try {                         
                        if (operation === 'read') {
                            authdssic_clc.dssic_clc.eeSIRsic_clc = new Array();
                            authdssic_clc.dssic_clc.eeSIRsic_clc[0] = new Object();
                            authdssic_clc.dssic_clc.eeSIRsic_clc[0].piiclc_cod = "";
                            authdssic_clc.dssic_clc.eeSIRsic_clc[0].piipor_cod_aso = sessionStorage.getItem("portafolio");
//                            authdssic_clc["eesic_tcont"] = [options];                            
                            return JSON.stringify(authdssic_clc);
                        }	
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_clc.eeEstados[0].Estado==="OK"){
                        return e.dssic_clc.eesic_clc;
                    }else{
                        alertDialogs(e.dssic_clc.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "clc__cod",
                    fields: {
                        clc__cod: {validation: {required: true}, type: 'number'},
                        clc__nom: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }        
    });
    
    // divisa
    
    function onSelectDivisa(e){
       
        var dataItemDivisa = e.sender.dataSource._data[e.sender.selectedIndex-1];
        tasaDeCambio = dataItemDivisa.mnd__tas__act;        
        var tasaNumeric = $("#ipTasa").data("kendoNumericTextBox");
        tasaNumeric.value(tasaDeCambio);        
        
        var fechaTasaTex = dataItemDivisa.mnd__fec__vig;
        fechaTasaTex = fechaTasaTex.replace(/-/g, "/");  
        var fechaTasa = new Date(fechaTasaTex);
        fechaTasa.setHours(0,0,0,0);
        
        if(fechaTasa.getTime()===hoy.getTime()){
             $("#ipActualizarTasa")[0].disabled=true;
        }else{
             $("#ipActualizarTasa")[0].disabled=false;
        }
        
        $("#ipFechaTasa").kendoDatePicker({        
            format: "yyyy/MM/dd",
            disableDates: ["sa", "su"],
            value: new Date(fechaTasa)
        });
        
        
    };
    
    $("#ipDivisa").kendoDropDownList({
        optionLabel: "Seleccione la moneda",
        dataTextField: "mnd__des ",
        dataValueField: "mnd__cla",
        template:'<div class="divElementDropDownList">#: data.mnd__des #</div>',
        change: onSelectDivisa,       
        dataSource: {
            transport: {
                read: {
                    url: ipServicios+"rest/Parameters/SIRsic_mnd",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            authdssic_mnd["eesic_mnd"] = [options];                            
                            return JSON.stringify(authdssic_mnd);
                        }	
                    } catch (e) {                        
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_mnd.eeEstados[0].Estado==="OK"){
                        return e.dssic_mnd.eesic_mnd;
                    }else{
                        alertDialogs("Problemas con el servicio: "+e.dssic_mnd.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "mnd__cla",
                    fields: {
                        mnd__cla: {validation: {required: true}, type: 'string'},
                        mnd__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
    
    $("#ipVendedor").kendoDropDownList({
        dataTextField: "ter__raz",        
        dataValueField: "ven__cod", 
        optionLabel: "Selecione un vendedor...",                
        
    });
}

/**
 * Metodo que inicia los el autocomplete del cliente (NIT - razón social)
 * 
 * @returns {undefined}
 */
function iniAutocomplete(){
    
    var obj = new sirConsultaCliente();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    $("#ipNITCliente").kendoAutoComplete({
        dataTextField: "ter__nit",
        dataValueField: "ter__nit",        
        placeholder: "Selecione un cliente...",
        minLength: 6,
        filter: "contains",
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
        select: setInfoCliente,
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
                            objJson[key1][key2][0].picter__nit = $("#ipNITCliente").val();
                            objJson[key1][key2][0].picter__raz = "";
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
                    }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !!!"){
                        
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
    
    $("#ipCliente").kendoAutoComplete({
        dataTextField: "ter__raz",
        dataValueField: "ter__nit",        
        placeholder: "Selecione un cliente...",
        minLength: 4,
        filter: "contains",
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
        select: setInfoCliente,
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
                            objJson[key1][key2][0].picter__nit = "";
                            objJson[key1][key2][0].picter__raz = $("#ipCliente").val();
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
                    }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !!!"){
                        
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

function gridDetalle(){    
    var grid = $("#grid").kendoGrid({
        dataSource: dataGridDetalle,       
        selectable: true,
        height: 400,
        dataBound: borrarBotonesGrilla,
        columns: [
            {
                field: "ConceptoDet",
                title: "Concepto",
            },
            {
                field: "ClaseArticulo",
                title: "Clase de articulo"
            },
            {
                field: "Articulo",
                title: "Articulo"
            },           
            {
                field: "Descripcion",
                title: "Descripción"
            },
            {
                field: "Cantidad",
                title: "Cantidad"
            },
            {
                field: "Descuento",
                title: "Descuento"
            },
            {
                field: "IVA",
                title: "IVA"
            },
            {
                field: "ValorUnitario",
                title: "Valor unitario",
                format: "{0:c}"
            },
            {
                field: "ValorTotal",
                title: "Valor total",
                template: '#= kendo.toString(ValorTotal, "{0:c}" ) #'
            },
            {
                field: "codAmortizacion",
                title: "Código de amortizacion",
                hidden:true
            },
            {
                field: "DiasAmortizacion",
                title: "Días de amortización",                
                hidden:true
                
            },
            {
                field: "FechaAmortizacion",
                title: "Fecha de amortización",
                hidden:true,
                template: '#= kendo.toString(FechaAmortizacion, "yyyy/MM/dd" ) #'
            },
            { command: [
                    {name: "editar", click: editarItem, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "eliminar", click: eliminarItem, template: "<a class='k-grid-eliminar'><span class='k-sprite po_cerrar'></span></a>"}
                ] 
                }],
        rowTemplate: kendo.template($("#rowTemplateItem").html()),
        altRowTemplate: kendo.template($("#altRowTemplateItem").html()),
        editable: {
            mode: "popup",
            window: {
                title: "Editar",
                animation: false,
                width: "700px"
            }            
        },
        cancel: function (e) {            
            e._defaultPrevented = true;
            $('#grid').data('kendoGrid').refresh();
        },        
    }).data("kendoGrid");
    
    function eliminarItem(e){ 
        
        e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
        
        var grid = $("#grid").data("kendoGrid");
        var itemID = grid.dataItem(grid.select());
        var itemGuardado;
        
        var authdsSIRgfc_fac = new Object();
        authdsSIRgfc_fac.dsSIRgfc_fac = new Object();
        authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos = new Array();
        authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0] = new Object();
        authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
        authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].fiid = sessionStorage.getItem("picfiid");
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms = new Array();
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0] = new Object();
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].tcon__cod = itemID.CodConceptoDet;
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].clc__cod = $("#ipCDocumento").val();
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].fac__nro = sessionStorage.getItem("facturaNumero");
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].fac__fec = $("#ipFecha").val();
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].suc__cod = $("#ipSucursal").val();
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].art__cod = itemID.ArticuloId;
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].cla__cod = itemID.CodClaseArticulo;        
        console.log(JSON.stringify(authdsSIRgfc_fac));
        
        $.ajax({
            type: "DELETE",
            data: JSON.stringify(authdsSIRgfc_fac),
            url: ipServicios+baseComercial+"SICUDgfc_itms",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {                
                itemGuardado = resp.dsSIRgfc_fac.eeEstados[0].Estado;                
            },
            error: function (e) {
                alertDialogs(e.status +" - "+ e.statusText);
            }
        }).done(function(){
            if(itemGuardado=="OK"){
                cargarDatosGrilla();
            }else{                    
                alertDialogs(itemGuardado);                
            }
        });
        
        
    }
    
    function editarItem(e){
        
        e.preventDefault();
        
        var grid = $("#grid").data("kendoGrid");
        itemID = grid.dataItem(grid.select());
        
        var widthPopUp = $("body").width();
        widthPopUp = widthPopUp * (60/100);
        var heightPopUp = $("body").height();
        heightPopUp = heightPopUp * (80/100);
        
        $("body").append("<div id='windowItemFac'></div>");
        var myWindow = $("#windowItemFac");        
        var undo = $("#undo");
        
        function onCloseWindowItemFacEdit() {
            
            document.getElementById("windowItemFac").remove();            
            undo.fadeIn();  
        }
        
        myWindow.kendoWindow({
            width: widthPopUp,
            height: heightPopUp,
            title: "Editar",
            content: sessionStorage.getItem("url")+ "/facturaQuantum/html/popupItemFactura.html",
            visible: false,
            modal: true,
            actions: [            
                "Close"
            ],
            close: onCloseWindowItemFacEdit
        }).data("kendoWindow").center().open();
    }
    
}
function validaCabecera(){
   
    var usuario = sessionStorage.getItem("usuario");
    var fiid = sessionStorage.getItem("picfiid");
    var sucursal = $("#ipSucursal").val();
    var claDocumento = $("#ipCDocumento").val();    
    var condiPagos = $("#ipCdePago").val();
    var fecha = $("#ipFecha").val();
    var fechaVencimeinto = $("#ipFechaVencimiento").val();    
    var divisa = $("#ipDivisa").val();
    var tasa = $("#ipTasa").val();
    var fletes = $("#ipFletes").val();
    var observaciones = $("#txtAObservaciones").val();
    var cabeceraValida = "";    
    var fechaTasa = $("#ipFechaTasa").val();
    var listaPrecios = sessionStorage.getItem("listaPrecioCliente");
    var actualizarTasa = $("#ipActualizarTasa")["0"].checked;
        
    var jSonData = new Object();
    jSonData.dsSIRgfc_fac = new Object();
    jSonData.dsSIRgfc_fac.eeDatos = new Array();
    jSonData.dsSIRgfc_fac.eeDatos[0] = new Object();
    jSonData.dsSIRgfc_fac.eeDatos[0].picusrcod = usuario;
    jSonData.dsSIRgfc_fac.eeDatos[0].picfiid = fiid;
    jSonData.dsSIRgfc_fac.eegfc_fac = new Array();
    jSonData.dsSIRgfc_fac.eegfc_fac[0] = new Object();    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].tcon__cod = claDocumento;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].dpc__fec = fechaVencimeinto;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__est = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__fec = fecha;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].obs__fac = observaciones;    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].lis__num = listaPrecios;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].loc__cod = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__cla = divisa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__fec = fechaTasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__val = tasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__act = actualizarTasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].pago__cod = condiPagos;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].suc__cod = sucursal;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ter__nit = sessionStorage.getItem("nitCliente");
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ven__cod = sessionStorage.getItem("codVendedor");
    console.log("jSonData \n"+JSON.stringify(jSonData));
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(jSonData),
        url: ipServicios+"rest/Comercial/Valida_gfc_fac", //ipServicios + baseFactura +"ValidaCabecera",
        dataType : "json",
        contentType: "application/json;",
        success: function (resp) {
            console.log(JSON.stringify(resp));                
            cabeceraValida = JSON.stringify(resp.dsSIRgfc_fac.eeEstados[0].Estado);            
        },
        error: function (e) {
            alertDialogs(e.status +" - "+ e.statusText);
        }
    }).done(function(){
        if(cabeceraValida=='"OK"'){
            sessionStorage.setItem("cabeceraValida","true");
            agregarItemDetalle();            
            console.log("Cabecera valida \n" + cabeceraValida);                     
        }else{
            sessionStorage.setItem("cabeceraValida","false");
            alertDialogs("Cabecera invalida"+cabeceraValida);
            console.log("Datos  \n" + cabeceraValida);                
        }
    });
}

function calcularFechaVencimiento(diasCredito){    
    
    var fechaTex = $("#ipFecha").val();
    var fechaIni = new Date(fechaTex); //fecha = new Date().toString('yyyy/M/d');
    var yyyy = fechaIni.getDate();
    var fechaVencimiento="";
    fechaVencimiento = sumarDias(fechaIni, diasCredito);
    
    $("#ipFechaVencimiento").kendoDatePicker({        
	format: "yyyy/MM/dd",
	disableDates: ["sa", "su"],
	value: new Date(fechaVencimiento)        
    }); 
}

function sumarDias(fechax, dias){
    fechax.setDate(fechax.getDate() + dias);
    return fechax;
}

function onBlurTasaDeCambio(){
    
    if(tasaDeCambio != $("#ipTasa").val()){
        
        $("#ipFechaTasa").kendoDatePicker({        
            format: "yyyy/MM/dd",
            disableDates: ["sa", "su"],
            value: hoy        
        });  
        $("#ipActualizarTasa")[0].disabled=false;
    }
}

function setInfoCliente(e){
    
    if(e){
        dataCliente = this.dataItem(e.item.index());         
    }
    
    if($("#ipNITCliente").val()===""||$("#ipNITCliente").val()!==dataCliente.ter__nit){
        $("#ipNITCliente").val(dataCliente.ter__nit);
    }
    
    if($("#ipCliente").val()===""||$("#ipCliente").val()!==dataCliente.ter__raz){
        $("#ipCliente").val(dataCliente.ter__raz);
    }
        
    var clienteNacional = dataCliente.gfc__nal;    
    sessionStorage.setItem("nitCliente", dataCliente.ter__nit); // sessionStorage.setItem("
    sessionStorage.setItem("listaPrecioCliente", dataCliente.lis__num);
    sessionStorage.setItem("codVendedor", dataCliente.ven__cod);    
    sessionStorage.setItem("opciondepago", dataCliente.pago__cod);
    
    var kendoDropDownListVendedor = $("#ipVendedor").data("kendoDropDownList");
    kendoDropDownListVendedor.enable(true); 
    
    $("#ipCdePago").kendoDropDownList({
        optionLabel: "Seleccione la forma de pago",
        dataTextField: "pag__des",
        dataValueField: "fac__pag",
        dataBound:onDataBoundOpcPago,
        change: onChangetfacpag,
        dataSource: {
            transport: {
                read: {
                    url: ipServicios+ baseParameters+ "SIRfac_pag",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {                        
                        authfacpag.dsfac_pag.eetemp[0].piifac_pag = sessionStorage.getItem("opciondepago");
                        
                        if (operation === 'read') {                            
                            authfacpag["eefac_pag"] = [options];
                            return JSON.stringify(authfacpag);
                        }	
                    } catch (e) {
                        alertDialogs(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsfac_pag.eeEstados[0].Estado==="OK"){
                        return e.dsfac_pag.eefac_pag;
                    }else{
                        alertDialogs(e.dsfac_pag.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "fac__pag",
                    fields: {
                        fac__pag: {validation: {required: true}, type: 'number'},
                        pag__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
    
    var obj = new sirConsultaVendedor();
    var jsonVendedor = obj.getjson();
    var urlVendedor = obj.getUrlSir();
    var mapDataVendedor = obj.getMapData();
    
    $("#ipVendedor").kendoDropDownList({
        dataTextField: "ter__raz",        
        dataValueField: "ven__cod", 
        placeholder: "Selecione un vendedor...",        
        dataBound:onDataBoundVendedor,
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: urlVendedor,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try{                        
                        if (operation === 'read') {                            
                            var key1 = Object.keys(jsonVendedor)[0];
                            var key2 = Object.keys(jsonVendedor[key1])[1];                            
                            jsonVendedor[key1][key2][0].picven_cod = sessionStorage.getItem("codVendedor");
                            jsonVendedor[key1][key2][0].piiven_est = 0;
                            
                            return JSON.stringify(jsonVendedor);
                        }                         
                    } catch (e) {
                        alertDialogs(e.message)
                    }                
                    
                }
            },
            schema: {
                data: function (e) {                
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {                        
                        return e[key1][mapDataVendedor];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }                
                },
                model: {
                    id: "ven__cod",
                    fields: {
                        ven__cod: {validation: {required: true}, type: 'string'},
                        ter__raz: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
            change: function (e) {
                //console.log("Change vandedor");
            },
            requestStart: function (e) {
                //                console.log("Request Start servicio vendedor");
            }            
        }
    });
        
    var comboboxDivisa= $("#ipDivisa").data("kendoDropDownList");    
    
    var numericTextBoxTasa= $("#ipTasa").data("kendoNumericTextBox");
    numericTextBoxTasa.enable(!clienteNacional);
    
    var datepickerFechaTasa= $("#ipFechaTasa").data("kendoDatePicker");
    datepickerFechaTasa.enable(!clienteNacional);
    
    $("#ipActualizarTasa")[0].disabled = clienteNacional;
    
    if(sessionStorage.getItem("regFactura")){
        var factura = JSON.parse(sessionStorage.getItem("regFactura"))
        comboboxDivisa.value(factura.mnd__cla);
        comboboxDivisa.readonly(true);
        numericTextBoxTasa.value(factura.mnd__val);
        datepickerFechaTasa.value(factura.mnd__fec);
    }else if(!clienteNacional){
        comboboxDivisa.value(dataCliente.mnd__cla);
        numericTextBoxTasa.value(dataCliente.mnd__val);
        datepickerFechaTasa.value(dataCliente.mnd__fec);
    }else{
        comboboxDivisa.value(sessionStorage.getItem("monedaCompañia"));
        comboboxDivisa.readonly(true);
    }
}

function codigoVendedor(e){
    var dataItem = this.dataItem(e.item.index()); 
    sessionStorage.setItem("codVendedor", dataItem.ven__cod);    
}

function guardarFactura(){
    
    var usuario = sessionStorage.getItem("usuario");
    var fiid = sessionStorage.getItem("picfiid");
    var sucursal = $("#ipSucursal").val();
    var claDocumento = $("#ipCDocumento").val();    
    var condiPagos = $("#ipCdePago").val();
    var fecha = $("#ipFecha").val();
    var fechaVencimeinto = $("#ipFechaVencimiento").val();    
    var divisa = $("#ipDivisa").val();
    var tasa = $("#ipTasa").val();
    var fletes = $("#ipFletes").val();
    var observaciones = $("#txtAObservaciones").val();
    var facturaGuardada = "";    
    var fechaTasa = $("#ipFechaTasa").val();
    var listaPrecios = sessionStorage.getItem("listaPrecioCliente");
    var actualizarTasa = $("#ipActualizarTasa")["0"].checked;
    var numFactura = "";
    var msn = "";    
    var verboHTML="POST";
    
    
    var jSonData = new Object();
    jSonData.dsSIRgfc_fac = new Object();
    jSonData.dsSIRgfc_fac.eeDatos = new Array();
    jSonData.dsSIRgfc_fac.eeDatos[0] = new Object();
    jSonData.dsSIRgfc_fac.eeDatos[0].picusrcod = usuario;
    jSonData.dsSIRgfc_fac.eeDatos[0].fiid = fiid;
    jSonData.dsSIRgfc_fac.eegfc_fac = new Array();
    jSonData.dsSIRgfc_fac.eegfc_fac[0] = new Object();        
    jSonData.dsSIRgfc_fac.eegfc_fac[0].clc__cod = claDocumento;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__fec = fecha;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__fec__venc = fechaVencimeinto;    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].obs__fac = observaciones;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].lis__num = listaPrecios;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__cla = divisa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__fec = fechaTasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__val = tasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__act = actualizarTasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].pago__cod = condiPagos;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].suc__cod = sucursal;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ter__nit = sessionStorage.getItem("nitCliente");
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ven__cod = sessionStorage.getItem("codVendedor"); 
    
    if(sessionStorage.getItem("regFactura")){    
        var factura = JSON.parse(sessionStorage.getItem("regFactura"));
        verboHTML="PUT";
        jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__nro = factura.fac__nro;
    }else{
        var factura  = new Object();
        factura.clc__cod = claDocumento;
        factura.suc__cod = sucursal;
        factura.fac__fec = fecha;
    }
    
    $.ajax({
        type: verboHTML,
        data: JSON.stringify(jSonData),
        url: ipServicios + baseComercial + "SICUDgfc_fac",
        dataType : "json",
        contentType: "application/json;",
        success: function (resp) {
            facturaGuardada = JSON.stringify(resp.dsSIRgfc_fac.eeEstados[0].Estado); 
            if(facturaGuardada=='"OK"'){
                msn = resp.dsSIRgfc_fac.eeSgfc_fac["0"].desmsg;
                numFactura = resp.dsSIRgfc_fac.eeSgfc_fac["0"].facnro;                
            }
        },
        error: function (e) {
            alertDialogs(e.status +" - "+ e.statusText);
        }
    }).done(function(){
        if(facturaGuardada=='"OK"'){            
            factura.fac__nro = numFactura;
            sessionStorage.setItem("regFactura", JSON.stringify(factura));
              
            var letf = ($("body").width()/2)-100;
            document.getElementById('idNumerofactura').innerHTML = 'Nº '+numFactura;
            var centered = $("#centeredNotification").kendoNotification({
                position: {                
                    top: 10,
                    left: letf,
                }
            }).data("kendoNotification");
            centered.show("El número de la factura es: "+numFactura, "success");
            
            $("#btnAgregarItem")["0"].firstChild.className = "k-sprite po_mas";          
            
            cargarDatosGrilla();
                             
        }else{                    
            alertDialogs(facturaGuardada);            
        }
    });
}

function agregarItemDetalle(e){
    
    if(!sessionStorage.getItem("regFactura")){
        alert("no puede agregar otems porque no existe la factura");
        return;
    }
    itemID=null;
    
    var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (60/100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (80/100);
    
    $("body").append("<div id='windowItemFac'></div>");
    var myWindow = $("#windowItemFac");
    var undo = $("#undo");
    
    function onCloseWindowItemFac() {
        document.getElementById("windowItemFac").remove();            
        undo.fadeIn();  
    }
    
    myWindow.kendoWindow({
        width: widthPopUp,
        height: heightPopUp,
        title: "Agregar",
        content: sessionStorage.getItem("url")+ "/facturaQuantum/html/popupItemFactura.html",
        visible: false,
        modal: true,
        actions: [            
            "Close"
        ],
        close: onCloseWindowItemFac
    }).data("kendoWindow").center().open();
    //    }
}

function closePopUp(){    
    $("#windowItemFac").data("kendoWindow").close();
}

function closePopUpEditar(){    
    $("#windowItemFac").data("kendoWindow").close();
}

function onDataBoundOpcPago(e){
    var dropdownlist = $("#ipCdePago").data("kendoDropDownList");
    dropdownlist.value(sessionStorage.getItem("opciondepago"));    
    calcularFechaVencimiento (dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].fac__num);    
}
function onDataBoundVendedor(e){
    
    var dropdownlist = $("#ipVendedor").data("kendoDropDownList");
    dropdownlist.value(sessionStorage.getItem("codVendedor")); 
    dropdownlist.readonly(true);
    debugger
    var dropdownlistSuc = $("#ipSucursal").data("kendoDropDownList");
    dropdownlistSuc.value(dropdownlist.dataSource._data[dropdownlist.selectedIndex].suc__cod);
    dropdownlistSuc.readonly(true);
}

function onChangetfacpag(e){    
    var dataItemfacpag = this.dataItem(e.item.index());        
    var diasCredito = dataItemfacpag.fac__num;
    calcularFechaVencimiento (diasCredito);    
};

function nuevaFactura(e){ 
    var dialog = $('#dialog');
    dialog.fadeIn();    
    location.reload();
}

function imprimirFac(){
    var dialog = $('#dialog');
    dialog.fadeIn();
    alertDialogs("Próximamente");
    nuevaFactura();
}

function cargarFactura(){
    
    var factura   = JSON.parse(sessionStorage.getItem("regFactura"))
    var estado;
    document.getElementById('idNumerofactura').innerHTML = 'Nº '+factura.fac__nro;
    
    
    try{
        var dsSIRgfc_fac = new Object();
        dsSIRgfc_fac.dsSIRgfc_fac = new Object();
        dsSIRgfc_fac.dsSIRgfc_fac.eeDatos = new Array();
        dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0] = new Object();
        dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
        dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].fiid = sessionStorage.getItem("picfiid");        
        dsSIRgfc_fac.dsSIRgfc_fac.eetemp = new Array();
        dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0] = new Object();
        
        dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picsuc_cod = factura.suc__cod;
        dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picclc_cod = factura.clc__cod;
        dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].pidfac_fec = factura.fac__fec;
        dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro = factura.fac__nro;
                
        $.ajax({
            type: "POST",
            data: JSON.stringify(dsSIRgfc_fac),
            url: ipServicios + baseComercial + "SIRgfc_fac_act",            
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {                  
                estado = JSON.stringify(resp.dsSIRgfc_fac.eeEstados[0].Estado);                                
                factura = resp; 
            },
            error: function (e) {
                alertDialogs(e.status +" - "+ e.statusText);                
            }
        }).done(function(){
            if(estado=='"OK"'){                
                if(factura.dsSIRgfc_fac.eeSIRgfc_fac["0"].fac__est===1||factura.dsSIRgfc_fac.eeSIRgfc_fac["0"].fac__est===9){
                    document.getElementById("btnGuardar").remove();            
                    document.getElementById("btnAgregarItem").remove();
                    deshabilitarCampos();                    
                }                
                sessionStorage.setItem("facturaEstado", factura.dsSIRgfc_fac.eeSIRgfc_fac["0"].fac__est);
                sessionStorage.setItem("regFactura", JSON.stringify(factura.dsSIRgfc_fac.eeSIRgfc_fac["0"]));
                
                var kendoDropDownListSucursal = $("#ipSucursal").data("kendoDropDownList");
                kendoDropDownListSucursal.value(factura.dsSIRgfc_fac.eeSIRgfc_fac["0"].suc__cod);
                kendoDropDownListSucursal.readonly(true)
                
                var kendoDropDownListClaseDoc = $("#ipCDocumento").data("kendoDropDownList");
                kendoDropDownListClaseDoc.value(factura.dsSIRgfc_fac.eeSIRgfc_fac["0"].clc__cod);
                kendoDropDownListClaseDoc.readonly(true);
                
                var fecha = new Date((factura.dsSIRgfc_fac.eeSIRgfc_fac["0"].fac__fec).replace(/-/g, "/"));
                fecha.setHours(0,0,0,0);
            
                var datepicker = $("#ipFecha").data("kendoDatePicker");
                datepicker.value(fecha);
                datepicker.readonly(true);
                
                
                var fechaVencimiento = new Date((factura.dsSIRgfc_fac.eeSIRgfc_fac["0"].fac__fec__venc).replace(/-/g, "/"));
                //fechaVencimiento.setHours(0,0,0,0);                    
                
                 $("#txtAObservaciones").val(factura.dsSIRgfc_fac.eeSIRgfc_fac["0"].obs__fac);
                
                 var datepicker = $("#ipFecha").data("kendoDatePicker");
                 datepicker.value(fecha);
                 datepicker.readonly(true);
                
                $("#ipFechaVencimiento").kendoDatePicker({        
                    format: "yyyy/MM/dd",
                    disableDates: ["sa", "su"],
                    value: fechaVencimiento
                });
                
                var objCli = new sirConsultaCliente();
                var objJsonCli = objCli.getjson();
                var urlCli = objCli.getUrlSir();
                var mapDataCli = objCli.getMapData();

                var key1 = Object.keys(objJsonCli)[0];
                var key2 = Object.keys(objJsonCli[key1])[1];
                objJsonCli[key1][key2][0].picter__nit = factura.dsSIRgfc_fac.eeSIRgfc_fac["0"].ter__nit;
                objJsonCli[key1][key2][0].picter__raz = "";
                
                
                $.ajax({
                    type: "POST",
                    data: JSON.stringify(objJsonCli),
                    url: urlCli,
                    dataType : "json",
                    contentType: "application/json;",
                    success: function (e) {  
                        var key1 = Object.keys(e)[0];                                            
                        if(e[key1].eeEstados[0].Estado==="OK"){                            
                            dataCliente = e[key1][mapDataCli]["0"];
                            $("#ipCliente").val(dataCliente.ter__raz);
                        }                        
                    },
                    error: function (e) {
                        alertDialogs( e.status +" - "+ e.statusText);                        
                    }
                }).done(function(){
                    setInfoCliente();
                });                
                cargarDatosGrilla();
            }else{
                alertDialogs(estado)
            }
        });
        
    } catch (e) {
        alertDialogs(e.message);
    }
//    sessionStorage.removeItem("factura");    
}

function cargarDatosGrilla(){
    dataGridDetalle=[];
    try{        
        if(sessionStorage.getItem("regFactura")){
            var factura = JSON.parse(sessionStorage.getItem("regFactura"));
            var estado;
            
            var dsSIRgfc_fac = new Object();
            dsSIRgfc_fac.dsSIRgfc_fac = new Object();
            dsSIRgfc_fac.dsSIRgfc_fac.eeDatos = new Array();
            dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0] = new Object();
            dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
            dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].fiid = sessionStorage.getItem("picfiid");        
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp = new Array();
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0] = new Object();            
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picsuc_cod = factura.suc__cod;
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picclc_cod = factura.clc__cod;
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].pidfac_fec = factura.fac__fec;
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro = factura.fac__nro;
            
            $.ajax({
                type: "POST",
                data: JSON.stringify(dsSIRgfc_fac),
                url: ipServicios + baseComercial + "SIRgfc_fac_act",            
                dataType : "json",
                contentType: "application/json;",
                success: function (resp) { 
                    estado = JSON.stringify(resp.dsSIRgfc_fac.eeEstados[0].Estado);                
                    factura = resp; 
                },
                error: function (e) {
                    alertDialogs(e.status +" - "+ e.statusText);                
                }
            }).done(function(){
                if(estado=='"OK"'){
                    if(factura.dsSIRgfc_fac.eeSIRgfc_itms){
                        var dataItemsFac = factura.dsSIRgfc_fac.eeSIRgfc_itms;

                        for(var i=0; i<dataItemsFac.length ;i++){
                            
                            var valor = dataItemsFac[i].itms__val__u;                        
                            valor = (valor * (parseFloat(1)-parseFloat(dataItemsFac[i].itms__pdt/100)));
                            var total = parseFloat(dataItemsFac[i].itms__can) * (parseFloat(valor) * (parseFloat(1)+parseFloat(dataItemsFac[i].itms__piv/100)));                    
                            var obj = {                       

                                ID: i+1,
                                CodConceptoDet:dataItemsFac[i].tcon__cod,
                                ConceptoDet: dataItemsFac[i].tcon__des,
                                CodClaseArticulo: dataItemsFac[i].cla__cod,
                                ClaseArticulo: dataItemsFac[i].cla__des,
                                Articulo: dataItemsFac[i].art__des,
                                ArticuloId: dataItemsFac[i].art__cod,
                                Descripcion: dataItemsFac[i].itms__des["0"], 
                                Cantidad: parseInt(dataItemsFac[i].itms__can),                    
                                Descuento: dataItemsFac[i].itms__pdt/100,
                                IVA: dataItemsFac[i].itms__piv/100,
                                ValorUnitario: dataItemsFac[i].itms__val__u,
                                ValorTotal: total,
                                CodAmortizacion: dataItemsFac[i].pdif__cla,
                                DiasAmortizacion: dataItemsFac[i].ddif__dias,
                                FechaAmortizacion: dataItemsFac[i].doc__fec__ini           
                            };
                            dataGridDetalle.push(obj);
                        }
                    }else{
                        gridDetalle();
                    }                   
                }else{
                    alertDialogs(estado)
                }
                gridDetalle();
            });                        
        }        
    } catch (e) {
        alertDialogs(e.message);
    }
}

function volverFacturacion(){    
    var servicio = "facturacion";
    sessionStorage.setItem("servicio",servicio);
    limpiarDatosFacturación();
    window.location.replace(( sessionStorage.getItem("url")+servicio+"/html/"+servicio+".html")); 
}

function deshabilitarCampos(){
    
    var inputs = $("div").find("input");        
    var kendoData;
    var id;
    var element;
    
    for(var i=0; i<inputs.length; i++){
          
        kendoData ="";
        id = inputs[i].id;
        
        if(id === ""){
            continue;
        }else if(id === "ipActualizarTasa"){
            $("#ipActualizarTasa")[0].disabled = true;
            continue;
        }
        
        if(inputs[i].dataset.role==="dropdownlist"){
            kendoData = "kendoDropDownList";
        }else if(inputs[i].dataset.role==="autocomplete"){
            kendoData = "kendoAutoComplete";
        }else if(inputs[i].dataset.role==="datepicker"){
            kendoData = "kendoDatePicker";
        }else if(inputs[i].dataset.role==="numerictextbox"){
            kendoData = "kendoNumericTextBox";
        }else{
            console.log("No se encontro kendoData");
            continue
        }
        
        element = $("#"+id).data(kendoData);
        element.readonly(true);
    }
}

function finalizarFactura(){    
    if(!sessionStorage.getItem("facturaNumero")){
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "Si";            
        actions[0].action = volverFacturacion;
        actions[1] = new Object();
        actions[1].text = "No";
        actions[1].primary = "true";
        actions[1].action = volverFacturaQuantum;        
        createDialog("", "Esta a punto de abandonar la pagina sin guardar los cambios ¿Desea continuar?", "400px", "auto", true, true, actions);           
    }else{
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "Crear nueva factura"; 
        actions[0].primary = "true";
        actions[0].action = crearNuevaFactura;
        actions[1] = new Object();
        actions[1].text = "Volver a facturación";        
        actions[1].action = volverFacturacion;
        createDialog("", "A finalizado la edición de la factura ¿Que desea hacer?", "400px", "auto", true, true, actions);           
    }
}

function volverFacturaQuantum(){
    return;
}

function crearNuevaFactura (){
    limpiarDatosFacturación();
    location.href=location.href
}

function limpiarDatosFacturación(){
    
    sessionStorage.removeItem("regFactura");
    sessionStorage.removeItem("facturaEstado");
    sessionStorage.removeItem("listaPrecioCliente");
    sessionStorage.removeItem("cabeceraValida");
    sessionStorage.removeItem("codVendedor");   
    sessionStorage.removeItem("opciondepago");
    sessionStorage.removeItem("nitCliente");
    
}

function borrarBotonesGrilla(){    
    if(sessionStorage.getItem("facturaEstado")==="1"||sessionStorage.getItem("facturaEstado")==="9"){
        var buttons = $("body").find("a.k-grid-editar");
        
        for(var i=0; i<buttons.length; i++){
            id = buttons[i].id;
            document.getElementById(id).remove();
        }
        
        var buttons = $("body").find("a.k-grid-eliminar");
        
        for(var i=0; i<buttons.length; i++){
            id = buttons[i].id;
            document.getElementById(id).remove();
        }
    }
}

/**
 * Metodo para dar valor a las variables globales desde cada una de las "funciones" donde se coloque la opcion de subir archivos
 * @param {type} idCustomPopUp
 * @returns {undefined}
 */
function abrirCustomPopUpDocumentosInstacia(idCustomPopUp) {
        
    var factura = JSON.parse(sessionStorage.getItem("regFactura"));
    var fecha = new Date(factura.fac__fec);
    
    year = fecha.getFullYear();
    mes = fecha.getMonth()+1; // el mes debe corresponder asi enero = 1, febrero=2 hasta diciembre = 12 por eso se le suma 1
    instacia = factura.fac__nro;
    
    abrirCustomPopUpDocumentos(idCustomPopUp);
 
}

function verificarArchivos(){
    
    
    var factura = JSON.parse(sessionStorage.getItem("regFactura"));
    var fecha = new Date(factura.fac__fec);
    
    year = fecha.getFullYear();
    mes = fecha.getMonth()+1; // el mes debe corresponder asi enero = 1, febrero=2 hasta diciembre = 12 por eso se le suma 1
    instacia = factura.fac__nro;
    
    try{
        var objData = new sirConsultaDocumentosPorRuta();    
        var jsonSIRData = objData.getjson();
        var urlData = objData.getUrlSir();
        var mapData = objData.getmapSir()
        
        var key1 = Object.keys(jsonSIRData)[0];
        var key2 = Object.keys(jsonSIRData[key1])[1];  
        
        jsonSIRData[key1][key2][0].picfolderpath = "ECM\/"+sessionStorage.getItem("companyNIT")+"\/"+sessionStorage.getItem("portafolio")+"\/"+year+"\/"+mes+"\/"+instacia;               
        
        $.ajax({
            async: false, 
            type: "POST",
            data: JSON.stringify(jsonSIRData),
            url: urlData,
            dataType: "json",        
            contentType: "application/json;",
            success: function (e) {  
                
            } 
        }).done(function(e){         
            var key1 = Object.keys(e)[0];
            if ((e[key1].eeEstados[0].Estado === "OK")) {                         
                $("#imgArchivos")["0"].className = "k-icon po_upfolder_sup";
            } 
        });    
    }catch (e) {
        alertDialogs(e.message);
    }
}

