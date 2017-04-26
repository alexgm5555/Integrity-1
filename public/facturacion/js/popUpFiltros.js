/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var hoy = new Date(sessionStorage.getItem("fechaSistema"));
hoy.setHours(0,0,0,0);
var objCliente = null;

//var authdsgfc_cli = new Object();
//authdsgfc_cli.dsgfc_cli = new Object();
//authdsgfc_cli.dsgfc_cli.eeDatos = new Array();
//authdsgfc_cli.dsgfc_cli.eeDatos[0] = new Object();
//authdsgfc_cli.dsgfc_cli.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
//authdsgfc_cli.dsgfc_cli.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
//authdsgfc_cli.dsgfc_cli.eetemp = new Array();
//authdsgfc_cli.dsgfc_cli.eetemp[0] = new Object();

$(document).ready(function(){
    $("#ipfechaInicio").kendoDatePicker({
        open: function() {
            var calendar = this.dateView.calendar;            
            calendar.wrapper.width(this.wrapper.width() - 6);
        },
        culture: "es-CO",
        format: "yyyy/MM/dd",
        max: new Date(hoy),
        disableDates: ["sa", "su"],
        footer: false
    });    
    $("#ipfechaFin").kendoDatePicker({
        open: function() {
            var calendar = this.dateView.calendar;            
            calendar.wrapper.width(this.wrapper.width() - 6);
        },
        culture: "es-CO",
        format: "yyyy/MM/dd",        
//        value: new Date(hoy),
        max: new Date(hoy),
        disableDates: ["sa", "su"],
        footer: false
    }); 
    
    var obj = new sirConsultaCliente();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    $("#ipCliente").kendoAutoComplete({
        dataTextField: "ter__raz",
        dataValueField: "ter__nit",        
        placeholder: "Selecione un cliente...",
        minLength: 4,
        filter: "contains",
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',       
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
    
    var estados = [
        { text: "Todos", value: "99" },
        { text: "No contabilizado", value: "0" },
        { text: "Contabilizado", value: "1" },
        { text: "Anulado", value: "9" }
    ];
    
    
    $("#ipEstado").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: estados,
        index: 0,
        
    });
    
    $("#btBuscar").kendoButton({
    });
});

function client(e){    
    var dataItem = this.dataItem(e.item.index()); 
    objCliente = dataItem;
}


function buscarFacturas(){  
    parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_ini = $("#ipfechaInicio").val();
    parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_fin = $("#ipfechaFin").val();
    parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_ini = $("#ipNumeroInicio").val();
    parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_fin = $("#ipNumeroFin").val();
    parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_est = $("#ipEstado").val();
    if($("#ipCliente").val()!=="" && objCliente !==null){        
        parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picter_nit = objCliente.ter__nit;
    }else{
        parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picter_nit = "*";
    }
    parent.gridFacturas();
    parent.closePopUpFiltros();
}