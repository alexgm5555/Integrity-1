/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dataCliente = null;
$(document).ready(function() {   
    
    $("#ipFecha").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"]
    });
    
    var datepicker = $("#ipFecha").data("kendoDatePicker");
    datepicker.enable(false);
    var fechaEntrega = new Date(sessionStorage.getItem("fechaSistema"));
    fechaEntrega.setHours(0,0,0,0);
    fechaEntrega.setDate(fechaEntrega.getDate() + 1);
    
    $("#ipFechaEntrega").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(fechaEntrega),
        disableDates: ["sa", "su"]
    });
    
    $("#ipFechaTasa").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"]
    });
    
    $("#buttonCab").kendoButton();
    
    iniDropDownList();
    
    iniAutocomplete();
    
    if(sessionStorage.getItem("regPedidos")){
        setInfoCabeceraPedido();
    }else if(sessionStorage.getItem("actor")==="cliente" ){
        $("#ipNITCliente").val(sessionStorage.getItem("clienteNIT"));
        var autocompleteNIT = $("#ipNITCliente").data("kendoAutoComplete");
        autocompleteNIT.enable(false);
        var autocompleteCliente = $("#ipCliente").data("kendoAutoComplete");
        autocompleteCliente.enable(false);
        
        var objCli = new sirConsultaCliente();
        var objJsonCli = objCli.getjson();
        var urlCli = objCli.getUrlSir();
        var mapDataCli = objCli.getMapData();
        
        var key1 = Object.keys(objJsonCli)[0];
        var key2 = Object.keys(objJsonCli[key1])[1];
        objJsonCli[key1][key2][0].picter__nit = sessionStorage.getItem("clienteNIT");
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
                }else{
                    alertDialogs(" Error al consumir el servicio: " + e[key1].eeEstados[0].Estado);                    
                }                        
            },
            error: function (e) {
                alertDialogs(" Error al consumir el servicio: cargarFactura/SIRgfc_cli \n"+ e.status +" - "+ e.statusText);                        
            }
        }).done(function(){
            if(dataCliente!==null){
                setInfoCliente();
            }else{
                
            }
        });
    }
    
    
    
});
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
                            objJson[key1][key2][0].picter__nit = $("#ipNITCliente").val();
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
/**
 * inicia los DropDownList que no dependen de otros campos
 * 
 * @returns {undefined}
 */
function iniDropDownList(){  
    
    var obj = new sirConsultaSucursal();    
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    //carga el combo de sucursales
    $("#ipSucursal").kendoDropDownList({
        optionLabel: "Seleccione la sucursal",
        dataTextField: "suc__nom",
        dataValueField: "suc__cod",
        template:'<div class="divElementDropDownList">#: data.suc__nom #</div>',
        dataBound: function (e){
          var dropdownlist = $("#ipSucursal").data("kendoDropDownList");
          dropdownlist.readonly();  
          dropdownlist.enable(false);  
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
                            var key1 = Object.keys(objJson)[0];
                            var key2 = Object.keys(objJson[key1])[1];
                            objJson[key1][key2][0].piccia_nit = sessionStorage.getItem("companyNIT");                            
                            
                            return JSON.stringify(objJson);
                        }	
                    } catch (e) {
                        alertDialogs("Error en el servicio"+ e.message);
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
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
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
    
    // divisa
    
    var objDivisa = new sirConsultaDivisa();
    var objJsonDivisa = objDivisa.getjson();
    var urlDivisa = objDivisa.getUrlSir();
    var mapDataDivisa = objDivisa.getMapData();
    
    $("#ipDivisa").kendoDropDownList({
        optionLabel: "Seleccione la moneda",
        dataTextField: "mnd__des ",
        dataValueField: "mnd__cla",
        template:'<div class="divElementDropDownList">#: data.mnd__des #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: urlDivisa,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            return JSON.stringify(objJsonDivisa);
                        }	
                    } catch (e) {                        
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        
                        return e[key1][mapDataDivisa];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
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
    
    var tipoTasa = [
        { text: "Día del pedido", value: 1 },
        { text: "Fecha acordada", value: 2 },
        { text: "Día despacho", value: 3 },
        { text: "Día factura", value: 4 }
    ];
    
    
    $("#ipTipTasa").kendoDropDownList({
        placeholder : "Seleccione el tipo de tasa",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: tipoTasa,        
        change: function (e){            
            if(e.sender.dataSource._data[e.sender.selectedIndex]){
                var datepicker = $("#ipFechaTasa").data("kendoDatePicker");
                if(e.sender.dataSource._data[e.sender.selectedIndex].value===2){                                     
                    datepicker.enable(true);
                    datepicker.value(sessionStorage.getItem("fechaSistema"));                    
                }else{
                    datepicker.value("");
                    datepicker.enable(false);
                }        
            }
        },
        dataBound: function (e){            
            if(e.sender.dataSource._data[e.sender.selectedIndex]){
                var datepicker = $("#ipFechaTasa").data("kendoDatePicker");
                if(e.sender.dataSource._data[e.sender.selectedIndex].value===2){                                     
                    datepicker.enable(true);
                    datepicker.value(sessionStorage.getItem("fechaSistema"));                    
                }else{
                    datepicker.value("");
                    datepicker.enable(false);
                }        
            }
        }
    });
    
    $("#ipVendedor").kendoDropDownList({
        dataTextField: "ter__raz",        
        dataValueField: "ven__cod", 
        optionLabel: "Selecione un vendedor...",                
        
    });
    
    $("#ipEstablecimiento").kendoDropDownList({
        dataTextField: "com__nom",        
        dataValueField: "com__con", 
        placeholder: "Selecione un establecimiento...",
    });
    
    var objCiudad = new sirConsultaCiudad();    
    var objJsonCiudad = objCiudad.getjson();
    var urlCiudad = objCiudad.getUrlSir();
    var mapDataCiudad = objCiudad.getMapData();
    
    //carga el combo de ciudad
    $("#ipCiudad").kendoDropDownList({
        optionLabel: "Seleccione la ciudad",
        dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        template:'<div class="divElementDropDownList">#: data.ciu__nom #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: urlCiudad,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {                            
                            return JSON.stringify(objJsonCiudad);
                        }	
                    } catch (e) {
                        alertDialogs("Error en el servicio"+ e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapDataCiudad];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
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
    
    var objPrio = new sirPrioridades();    
    var objJsonPrio = objPrio.getjson();
    var urlPrio = objPrio.getUrlSir();
    var mapDataPrio = objPrio.getMapData();
    
    //carga el combo de sucursales
    $("#ipPrioridad").kendoDropDownList({
        optionLabel: "Seleccione la prioridad",
        dataTextField: "pri__des",
        dataValueField: "pri__cod",
        template:'<div class="divElementDropDownList">#: data.pri__des #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: urlPrio,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            var key1 = Object.keys(objJsonPrio)[0];
                            var key2 = Object.keys(objJsonPrio[key1])[1];                                                       
                            
                            return JSON.stringify(objJsonPrio);
                        }	
                    } catch (e) {
                        alertDialogs("Error en el servicio"+ e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapDataPrio];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "pri__cod",
                    fields: {
                        pri__cod:    {editable: false, nullable: false},
                        pri__des:    {editable: true, nullable: false},          
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        },
        change: function (e) {

        }        
    });

}
/**
 * Metodo que coloca la información del cliente en los campos que de algua forma dependen de el.
 * @param {type} e
 * @returns {undefined}
 */
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
    
    var comboboxDivisa= $("#ipDivisa").data("kendoDropDownList"); 
    if(sessionStorage.getItem("regPedidos")){
        var pedido = JSON.parse(sessionStorage.getItem("regPedidos"))
        comboboxDivisa.value(pedido.mnd__cla);
        comboboxDivisa.readonly(true);        
        comboboxDivisa.enable(false); 
    }else if(!clienteNacional){
        comboboxDivisa.value(dataCliente.mnd__cla);        
    }else{
        comboboxDivisa.value(sessionStorage.getItem("monedaCompañia"));
        comboboxDivisa.readonly(true);
        comboboxDivisa.enable(false); 
    }
        
    sessionStorage.setItem("nitCliente", dataCliente.ter__nit); // sessionStorage.setItem("
    sessionStorage.setItem("listaPrecioCliente", dataCliente.lis__num);
//    sessionStorage.setItem("codVendedor", dataCliente.ven__cod);    
    sessionStorage.setItem("opciondepago", dataCliente.pago__cod);
    
    var obj = new sirConsultaCondicionesDePago();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    $("#ipCdePago").kendoDropDownList({
        optionLabel: "Seleccione la forma de pago",
        dataTextField: "pag__des",
        dataValueField: "fac__pag",        
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
                            var key1 = Object.keys(objJson)[0];
                            var key2 = Object.keys(objJson[key1])[1];
                            objJson[key1][key2][0].piifac_pag = sessionStorage.getItem("opciondepago");                            
                            return JSON.stringify(objJson);                            
                        }	
                    } catch (e) {
                        alertDialogs(e.message)
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
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
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
    
    var dropdownlist = $("#ipCdePago").data("kendoDropDownList");
    dropdownlist.value(sessionStorage.getItem("opciondepago")); 
    dropdownlist.enable(false);
    
    var objEstablecimiento = new sirConsultaEstablecimiento();
    var objJsonEstablecimiento = objEstablecimiento.getjson();
    var urlEstablecimiento = objEstablecimiento.getUrlSir();
    var mapDataEstablecimiento = objEstablecimiento.getMapData();
    
    $("#ipEstablecimiento").kendoDropDownList({
        dataTextField: "com__nom",        
        dataValueField: "com__con", 
        placeholder: "Selecione un establecimiento...",
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: urlEstablecimiento,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try{
                        
                        if (operation === 'read') {
                            var key1 = Object.keys(objJsonEstablecimiento)[0];
                            var key2 = Object.keys(objJsonEstablecimiento[key1])[1];
                            objJsonEstablecimiento[key1][key2][0].picter__nit = dataCliente.ter__nit;
                            return JSON.stringify(objJsonEstablecimiento);
                        } 

                    } catch (e) {
                        alertDialogs(e.message)
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapDataEstablecimiento];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        },
        dataBound: function (e) {            
            if(e.sender.dataSource._data.length===1){                   
               var dropdownlistEstablecimiento = $("#ipEstablecimiento").data("kendoDropDownList");
                dropdownlistEstablecimiento.enable(false)
                var dataItemEstablicimiento = e.sender.dataSource._data["0"]; 
                $("#ipDireccion").val(dataItemEstablicimiento.ter__dir);
                $("#ipDireccion").prop('disabled', true).addClass("k-state-disabled");
                $("#ipTelefono").val(dataItemEstablicimiento.ter__tel);
                $("#ipTelefono").prop('disabled', true).addClass("k-state-disabled");
                sessionStorage.setItem("codVendedor", dataItemEstablicimiento.ven__cod);
                var dropdownlist = $("#ipCiudad").data("kendoDropDownList");
                dropdownlist.value(dataItemEstablicimiento.ciu__cod); 
                dropdownlist.enable(false)
                
                var dropdownlist = $("#ipSucursal").data("kendoDropDownList");
                dropdownlist.value(dataItemEstablicimiento.suc__cod); 
                
                dropDownListVendedor(dataItemEstablicimiento.suc__cod);
            }
        },
        change: function (e) {            
            if(e.sender.selectedIndex){
                var dataItemEstablicimiento = e.sender.dataSource._data[e.sender.selectedIndex-1];
                $("#ipDireccion").val(dataItemEstablicimiento.ter__dir);
                $("#ipDireccion").prop('disabled', true);
                $("#ipTelefono").val(dataItemEstablicimiento.ter__tel);
                $("#ipTelefono").prop('disabled', true);
                sessionStorage.setItem("codVendedor", dataItemEstablicimiento.ven__cod);
                
                var dropdownlist = $("#ipCiudad").data("kendoDropDownList");
                dropdownlist.value(dataItemEstablicimiento.ciu__cod);
                dropdownlist.enable(false)
                
                var dropdownlist = $("#ipSucursal").data("kendoDropDownList");
                dropdownlist.value(dataItemEstablicimiento.suc__cod); 
                
                s(dataItemEstablicimiento.suc__cod);
            }
        }
    });
}

function dropDownListVendedor(susursal){
    
    var objVendedor = new sirConsultaVendedor();
    var objJsonVendedor = objVendedor.getjson();
    var urlVendedor = objVendedor.getUrlSir();
    var mapDataVendedor = objVendedor.getMapData();
    
    $("#ipVendedor").kendoDropDownList({
        dataTextField: "ter__raz",        
        dataValueField: "ven__cod", 
        placeholder: "Selecione un vendedor...",
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
                                var key1 = Object.keys(objJsonVendedor)[0];
                                var key2 = Object.keys(objJsonVendedor[key1])[1];                                                               
                                objJsonVendedor[key1][key2][0].piccod_suc = susursal;
                                objJsonVendedor[key1][key2][0].picven_cod = sessionStorage.getItem("codVendedor");
                                objJsonVendedor[key1][key2][0].piiven_est = 0;
                                return JSON.stringify(objJsonVendedor);
                            } 
                       // }                        
                    } catch (e) {
                        alertDialogs(e.message)
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapDataVendedor];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
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
        },
        dataBound: function(e){
            var dropdownlist = $("#ipVendedor").data("kendoDropDownList");
            dropdownlist.value(sessionStorage.getItem("codVendedor"));
            dropdownlist.enable(false);
        }
    });
} 

/**
 * 
 * @returns {undefined}
 */
function setInfoCabeceraPedido(){
    
    var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
    
    var kendoDropDownListSucursal = $("#ipSucursal").data("kendoDropDownList");    
    kendoDropDownListSucursal.value(pedido.suc__cod);
    kendoDropDownListSucursal.readonly(true);
    
    var kendoDropDownListPrioridad = $("#ipPrioridad").data("kendoDropDownList"); 
    kendoDropDownListPrioridad.value(pedido.pri__cod);
    kendoDropDownListPrioridad.readonly(true);
    
    var kendoDropDownListTipTasa = $("#ipTipTasa").data("kendoDropDownList"); 
    kendoDropDownListTipTasa.value(pedido.tip__tasa);
    kendoDropDownListTipTasa.readonly(true);
    
    document.getElementById('idNumeroPedido').innerHTML = 'Nº '+pedido.ped__num;
    $("#buttonCab")["0"].childNodes["0"].data="Actualizar";//
    
    var obj = new sirConsultaCliente();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();    
    
    var key1 = Object.keys(objJson)[0];
    var key2 = Object.keys(objJson[key1])[1];                                
    objJson[key1][key2][0].picter_nit = pedido.ter__nit;
    
    var fecha = new Date(pedido.ped__fec.replace(/-/g, "/"));
    fecha.setHours(0,0,0,0);
    
    var datepicker = $("#ipFecha").data("kendoDatePicker");
    datepicker.value(fecha);
    datepicker.readonly(true);
    
    
    var fechaEnt = new Date(pedido.ped__fec__ent.replace(/-/g, "/"));
    fechaEnt.setHours(0,0,0,0);
    
    var datepicker = $("#ipFechaEntrega").data("kendoDatePicker");
    datepicker.value(fechaEnt);
    datepicker.readonly(true);
    
    if(pedido.fec__tasa!==null){
        
        var fechaTasa = new Date(pedido.fec__tasa.replace(/-/g, "/"));
        fechaTasa.setHours(0,0,0,0);
        var datepicker = $("#ipFechaTasa").data("kendoDatePicker");
        datepicker.value(fechaTasa);
        datepicker.readonly(true);
    }
    
    
    
    
    $("#ipNumOrden").val(pedido.ord__nump);
    
    $("#ipSolicitante").val(pedido.ped__pqs);
    
    $("#txtAObservacionePedido").val(pedido.obs__ped);
    
    $("#ipTelefono").val(pedido.ter__tel)
    
    var key1 = Object.keys(objJson)[0];
    var key2 = Object.keys(objJson[key1])[1];                                
    objJson[key1][key2][0].picter__nit = pedido.ter__nit;   
    
    try{
        $.ajax({
            type: "POST",
            data: JSON.stringify(objJson),
            url: url,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) { 
                
                var key1 = Object.keys(e)[0];
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    dataCliente = e[key1][mapData][0];
                    return e[key1][mapData];
                } else {
                    alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            error: function (e) {
                alertDialogs(" Error al consumir el servicio "+ e.status +" - "+ e.statusText);                
            }
        }).done(function(){            
            setInfoCliente();
        });
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
}
/**
 * Guarda la cabecera del pedido 
 * @returns {undefined}
 */
function guardarCabecera(){
    
    var verbo="POST";
    var numPedido="";
    var clcCod="";
    var estado = "99"
    if($("#buttonCab")["0"].childNodes["0"].data==="Actualizar"){
        verbo="PUT";
        numPedido = JSON.parse(sessionStorage.getItem("regPedidos")).ped__num;        
        
        estado =  JSON.parse(sessionStorage.getItem("regPedidos")).gpd__est;
        clcCod  = JSON.parse(sessionStorage.getItem("regPedidos")).clc__cod;
    }    
    var obj = new SICUDPedido();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    var key1 = Object.keys(objJson)[0];
    var key2 = Object.keys(objJson[key1])[1];                                
    objJson[key1][key2][0].gpd__est = estado;
    objJson[key1][key2][0].suc__cod = $("#ipSucursal").val();
    objJson[key1][key2][0].ter__nit = $("#ipNITCliente").val();
    objJson[key1][key2][0].pago__cod = $("#ipCdePago").val();
    objJson[key1][key2][0].mnd__cla = $("#ipDivisa").val();    
    objJson[key1][key2][0].ven__cod = $("#ipVendedor").val();
    objJson[key1][key2][0].ped__fec = $("#ipFecha").val();
    objJson[key1][key2][0].ped__fec__ent = $("#ipFechaEntrega").val();
    objJson[key1][key2][0].com__con = $("#ipEstablecimiento").val();
    objJson[key1][key2][0].ter__dir = $("#ipDireccion").val();
    objJson[key1][key2][0].ter__tel = $("#ipTelefono").val();
    objJson[key1][key2][0].ciu__cod = $("#ipCiudad").val();
    objJson[key1][key2][0].ped__pqs = $("#ipSolicitante").val();
    objJson[key1][key2][0].obs__ped = $("#txtAObservacionePedido").val();
    objJson[key1][key2][0].ped__num = numPedido;
    objJson[key1][key2][0].clc__cod = clcCod;
    objJson[key1][key2][0].tip__tasa = $("#ipTipTasa").val();
    objJson[key1][key2][0].fec__tasa = $("#ipFechaTasa").val();
    objJson[key1][key2][0].pri__cod = $("#ipPrioridad").val();    
    objJson[key1][key2][0].ord__num = $("#ipNumOrden").val();
    
    try{
        $.ajax({
            type: verbo,
            data: JSON.stringify(objJson),
            url: url,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) {                 
                var key1 = Object.keys(e)[0];
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    return e[key1][mapData];
                } else {
                    alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            error: function (e) {
                alertDialogs(" Error al consumir el servicio "+ e.status +" - "+ e.statusText);                
            }
        }).done(function(e){            
            var key1 = Object.keys(objJson)[0];
            var key2 = Object.keys(objJson[key1])[1]; 
            var pedido = e[key1][key2][0]; 
            
            var objFiltroPedidos = new sirConsultaPedidos();
            var jsonFiltroPedidos = objFiltroPedidos.getjson();
            var urlFiltroPedidos = objFiltroPedidos.getUrlSir();
            var mapDataFiltroPedidos = objFiltroPedidos.getMapData();
            
            var key1 = Object.keys(jsonFiltroPedidos)[0];
            var key2 = Object.keys(jsonFiltroPedidos[key1])[1];
            jsonFiltroPedidos[key1][key2][0].pidped_fec = pedido.ped__fec;
            jsonFiltroPedidos[key1][key2][0].piiped_num = pedido.ped__num;
            jsonFiltroPedidos[key1][key2][0].picsuc_cod = pedido.suc__cod;
            console.log(JSON.stringify(jsonFiltroPedidos));
            try{                
                $.ajax({
                    type: "POST",
                    data: JSON.stringify(jsonFiltroPedidos),
                    url: urlFiltroPedidos,
                    dataType : "json",
                    contentType: "application/json;",
                    success: function (e) {                        
                        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                            return e[key1][mapDataFiltroPedidos];
                        } else {
                            alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                        }
                    },
                    error: function (e) {
                        alertDialogs(" Error al consumir el servicio 733"+ e.status +" - "+ e.statusText);                
                    }
                }).done(function(e){
                    var pedido = e[key1][mapDataFiltroPedidos][0];
                    sessionStorage.setItem("regPedidos", JSON.stringify(pedido));                                         
                    parent.closePopUpCabecera();
                });
            }catch (e) {
                alertDialogs("Function: consumeServAjaxSIR Error: 740 " + e.message);
            }
        });
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
}
