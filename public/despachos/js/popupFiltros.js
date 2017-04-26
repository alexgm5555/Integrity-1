

$(document).ready(function () {

    document.getElementById("Establecimiento").readOnly = true;
    $("#btAgregar").kendoButton({
        click: guardar
    });
    $("#btCancelar").kendoButton({
        click: cancelar
    });
    
    iniAutocomplete();

    function guardar(e) {

        var ciudad = $("#Ciudad").val();        
        var establecimiento = $("#Establecimiento").val();        
        var region = $("#Region").val();
        var cliente = $("#ipNITCliente").val();
        
        obj = {
            "ciudad": ciudad,
            "region": region,
            "establecimiento": establecimiento,
            "cliente": cliente
        }
        parent.filtrar(obj);
    }

    function cancelar() {

        parent.cerrar();
    }   

    function regionCod(container, options) {


        var consultar = new sirRegionGeografica();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpr_rgeo";
        $("#Region").kendoDropDownList({
                    dataTextField: "rgeo__nom",
                    dataValueField: "rgeo__cod",
                    placeholder: "select your option",
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
                                    alertDialogs("Error Con Servicio Regiones" + e[key1].eeEstados[0].Estado);
                                }
                            },
                            model: {
                                id: "rgeo__nom",
                                fields: {
                                    rgeo__cod: {editable: false, nullable: false},
                                    rgeo__nom: {editable: false, nullable: false}
                                }
                            }
                        }
                    }

                });
    }
    function ciudades(container, options) {


        var consultar = new sirCiudades();
        var datajson = consultar.getjson();
        // datajson.dsSIRsic_ciu.eeSIRsic_ciu[0].picciu_cod=$("#Region").data("kendoDropDownList")._old;
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eesic_ciu";
        $("#Ciudad").kendoDropDownList({
                    dataTextField: "ciu__nom",
                    dataValueField: "ciu__cod",
//                    select: function (e) {
//                        sucursal(e);
//                    },
                    height: 100,
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
                                    alertDialogs("Error Con Servicio Cuidades" + e[key1].eeEstados[0].Estado);
                                }
                            },
                            model: {
                                id: "ciu__cod",
                                fields: {
                                    ciu__nom: {editable: false, nullable: false},
                                    ciu__cod: {editable: false, nullable: false}
                                }
                            }
                        }
                    }

                });
    }


    regionCod();
    ciudades();
    //filtroestado();

});

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

function setInfoCliente(e){
    
    if(e){
        
        var dataCliente = this.dataItem(e.item.index());         
        
        if($("#ipNITCliente").val()===""||$("#ipNITCliente").val()!==dataCliente.ter__nit){
            $("#ipNITCliente").val(dataCliente.ter__nit);
        }
        
        if($("#ipCliente").val()===""||$("#ipCliente").val()!==dataCliente.ter__raz){
            $("#ipCliente").val(dataCliente.ter__raz);
        }
        document.getElementById("Establecimiento").readOnly = false;
        sucursal();
    }
    
}

function sucursal() {

        var consultar = new sirSucursales();
        var datajson = consultar.getjson();
        datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].piirgeo__cod = parseInt($("#Region").val());
        datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].picciu__cod = parseInt($("#Ciudad").val());
        datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].picter__nit = parseInt($("#ipNITCliente").val());
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpd_cli_suc";
        document.getElementById("Establecimiento").readOnly = false;
        $("#Establecimiento").removeClass();
        $("#Establecimiento").kendoDropDownList({
            dataTextField: "com__con",
            dataValueField: "com__con",            
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
                            alertDialogs("Error Con Servicio Sucursal" + e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "com__con",
                        fields: {
                            com__con: {editable: false, nullable: false},
                        }
                    }
                }
            }

        });
    }