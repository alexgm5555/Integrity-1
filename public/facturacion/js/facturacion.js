/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dsfiles = new Object();
dsfiles.dsfiles = new Object();
dsfiles.dsfiles.eeDatos = new Array();
dsfiles.dsfiles.eeDatos[0] = new Object();
dsfiles.dsfiles.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
dsfiles.dsfiles.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
dsfiles.dsfiles.eeDatos[0].local_ip = sessionStorage.getItem("ipPrivada");
dsfiles.dsfiles.eeDatos[0].remote_ip = sessionStorage.getItem("ipPublica");

var dsSIRgfc_fac = new Object();
dsSIRgfc_fac.dsSIRgfc_fac = new Object();
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos = new Array();
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0] = new Object();
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].fiid = sessionStorage.getItem("picfiid");        
dsSIRgfc_fac.dsSIRgfc_fac.eetemp = new Array();
dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0] = new Object();

$(document).ready(function() {   
    var fechaFin = new Date(sessionStorage.getItem("fechaSistema"));
    fechaFin.setHours(0,0,0,0);
    var fechaIni= new Date(sessionStorage.getItem("fechaSistema"));
    fechaIni.setDate(fechaFin.getDate() - 90);    
    
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_ini = fechaIni;
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_fin = fechaFin;
//    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_ini = "2016/11/01";
//    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_fin = "2016/12/01";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_ini = "";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_fin = "";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_est = "*";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picter_nit = "*";

    gridFacturas();
});

function gridFacturas(){
    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read:  {
                type: "POST",
                url: ipServicios+baseComercial+"SIRgfc_fac",
                contentType: "application/json; charset=utf-8",
                dataType: 'json'             
            },
            parameterMap: function (options, operation) {                
                try{
                    if (operation === 'read') {                                
                        return JSON.stringify(dsSIRgfc_fac);
                    }                  
                } catch (e) {
                    alertDialogs (e.message);
                }
            }
        },                 
        schema: {
            data:"dsSIRgfc_fac.eeSIRgfc_fac",
            model: {
                id: "fac__nro",         
                fields: {
                    fac__nro: { type: "number" },
                    ter__nit: { type: "string" },
                    cdm__nom: { type: "string" },  
                    fac__fec: { type: "string" },    
                    fac__fec__venc: { type: "string" }, 
                    fac__edo: { type: "string" }
                                    
                }
            }
        }
    });   
    
    var gridheigth = $("body").height()-$("#divSubtitulo").height()-4;
    
    $("#grid").kendoGrid({
        dataSource: dataSource,
        height: gridheigth,
        sortable: true,
        selectable: false,
        columns: [
            {
                field: "fac__nro",
                title: "Número de factura",
            
            },
            {
                field: "ter__nit",
                title: "NIT",
            
            },
            {
                field: "cdm__nom",
                title: "Cliente",
            
            },
            {
                field: "fac__fec",
                title: "Fecha"               
            },
            {
                field: "fac__fec__venc",
                title: "Fecha vencimiento"               
            },
            {
                field: "fac__edo",
                title: "Estado"               
            },
            {
                command: [
                    {name: "detalle", text: " ", click: imprimirFact, template: "<a class='k-grid-detalle'><span class='k-sprite po_print'></span></a>"},
                    {name: "editar", text: " ", click: editarFactura, template: "<a class='k-grid-editar'><span class='k-sprite po_editon'></span></a>"},
                    {name: "anular", text: " ", click: anularFactura, template: "<a class='k-grid-anular'><span class='k-sprite po_cerrar'></span></a>"}
                ], 
                width: "150px"
            }
        ],
        rowTemplate: kendo.template($("#rowTemplateFac").html()),
        altRowTemplate: kendo.template($("#altRowTemplateFac").html()),
        dataBound: function () {
            var facturas = dataSource.data();
            changImgFunc(facturas);
        },
    });
    
    function editarFactura(e){
        
        e.preventDefault();        
        var factura = this.dataItem($(e.currentTarget).closest("tr"));
                
        var servicio = "facturaQuantum";
        sessionStorage.setItem("servicio",servicio);
//        sessionStorage.setItem("actualizarFactura", "true");
        sessionStorage.setItem("regFactura", JSON.stringify(factura));
        
//        sessionStorage.setItem("facturaNumero", factura.fac__nro);
//        sessionStorage.setItem("facturasucursal", factura.suc__cod);
//        sessionStorage.setItem("facturaClaseDoc", factura.clc__cod);
//        sessionStorage.setItem("facturaFecha", factura.fac__fec);        
        window.location.replace(( sessionStorage.getItem("url")+servicio+"/html/"+servicio+".html"));   
    }
    
    function imprimirFact(e){
        
        e.preventDefault();        
        var archivo
        var factura = this.dataItem($(e.currentTarget).closest("tr"));
        
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
                url: ipServicios+baseComercial+"SIRpdf",            
                dataType : "json",
                contentType: "application/json;",
                success: function (resp) {                    
                    estado = JSON.stringify(resp.response.pocestado);   
                    archivo = resp.response.pocarchivo;
                    archivo = archivo.split("\\")[2];
                    sessionStorage.setItem("documento",archivo+".pdf");
                    
                },
                error: function (e) {
                    kendo.alert(" Error al consumir el servicio.\n"+ e.status +" - "+ e.statusText);                
                }
            }).done(function(){
                if(estado==='"OK"'){
                    
                    var actions = new Array();
                    actions[0] = new Object();
                    actions[0].text = "Ver online";            
                    actions[0].action = showFile;
                    actions[1] = new Object();
                    actions[1].text = "Original";
                    actions[1].primary = "true";
                    actions[1].action = getFile;                    
                    createDialog("", "Archivo creado exitosamente "+sessionStorage.getItem("documento")+" que desea hacer ", "400px", "auto", true, true, actions);   
                    
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();
                }else{
                    alertDialogs("Error generando el PDF de la factura.\n"+estado);
                }
            });
            
        } catch (e) {
            alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
        }
    }
    
    function anularFactura(e){        
        e.preventDefault();   
        
        var factura = this.dataItem($(e.currentTarget).closest("tr"));
        
        var fechaSistema = new Date(sessionStorage.getItem("fechaSistema"));
        var mesSistema = fechaSistema.getMonth();
        
        var fechaFactura = new Date((factura.fac__fec).replace(/-/g, "/"));
        var mesFactura = fechaFactura.getMonth();
        
        if(mesSistema!==mesFactura){
            return
        }
        
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
                type: "PUT",
                data: JSON.stringify(dsSIRgfc_fac),
                url: ipServicios+baseComercial+"SICUDgfc_fac_Anu",            
                dataType : "json",
                contentType: "application/json;",
                success: function (resp) {                    
                    estado = JSON.stringify(resp.dsSIRgfc_fac.eeEstados["0"].Estado);                                    
                },
                error: function (e) {
                    kendo.alert(" Error al consumir el servicio.\n"+ e.status +" - "+ e.statusText);                
                }
            }).done(function(){
                if(estado==='"OK"'){                    
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();
                }else{
                    alertDialogs("Error anulando la factura.\n"+estado);
                }
            });
            
        } catch (e) {
            alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
        }
        
    }
}

function crearFactura(){
    var servicio = "facturaQuantum";
    sessionStorage.setItem("servicio",servicio);
    sessionStorage.removeItem("regFactura");
    sessionStorage.removeItem("facEstado");
    window.location.replace(( sessionStorage.getItem("url")+servicio+"/html/"+servicio+".html"));   
}

function popUpFiltros(){
    $("body").append("<div id='windowFiltros'></div>");
        var myWindow = $("#windowFiltros");
        var undo = $("#undo");
        
        function onCloseFiltros() {
            document.getElementById("windowFiltros").remove();            
            undo.fadeIn();  
        }
        
        myWindow.kendoWindow({
            width: "600px",
            height: "300px",
            title: "Busqueda",
            content: sessionStorage.getItem("url")+ "/facturacion/html/popUpFiltros.html",
            visible: false,
            modal: true,
            resizable: false,
            actions: [            
                "Close"
            ],
            close: onCloseFiltros
        }).data("kendoWindow").center().open();
}

function closePopUpFiltros(){    
    $("#windowFiltros").data("kendoWindow").close();
}

function changImgFunc(facturas) {   
    
    var fechaSistema = new Date(sessionStorage.getItem("fechaSistema"));
    var mesSistema = fechaSistema.getMonth();
    
    var fechaFactura;
    var mesFactura;
    
    for (var i = 0; i < facturas.length; i++) {
        var id = facturas[i].fac__nro;
        if(facturas[i].fac__edo==="No Contabilizado"){
            document.getElementById("imprimir"+id).setAttribute("class", "k-sprite po_print");
            document.getElementById("editar"+id).setAttribute("class", "k-sprite po_editon");
        }else if(facturas[i].fac__edo==="Contabilizado"){
            document.getElementById("imprimir"+id).setAttribute("class", "k-sprite po_print_disabled");
            document.getElementById("editar"+id).setAttribute("class", "k-sprite po_edit_disabled");
        }else if(facturas[i].fac__edo==="Anulado"){
            document.getElementById("imprimir"+id).setAttribute("class", "k-sprite po_print");
            document.getElementById("editar"+id).setAttribute("class", "k-sprite po_edit_disabled");
        }
        
        fechaFactura =  new Date((facturas[i].fac__fec).replace(/-/g, "/"));
        mesFactura = fechaFactura.getMonth();
        
        if(mesSistema===mesFactura && facturas[i].fac__edo!=="Anulado"){
            document.getElementById("anular"+id).setAttribute("class", "k-sprite po_cerrar");
        }
    }
}

/**
 * Permite ver en el navegador el archivo
 * @param {type} e
 * @returns {undefined}
 */

function showFile(e){
    try{        
        var archivo = sessionStorage.getItem("documento");
        dsfiles.dsfiles.SIRfile = new Array();
        dsfiles.dsfiles.SIRfile[0] = new Object();
        dsfiles.dsfiles.SIRfile[0].pilfilename = archivo;
       //console.log("dsfiles\n"+JSON.stringify(dsfiles));
        $.ajax({
            type: "POST",
            data: JSON.stringify(dsfiles),
            url: ipServicios+baseServicio+"GetDocument",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {                
                documentobase64 = JSON.stringify(resp.response.polfile);
                documentobase64 = documentobase64.replace(/"/g, "");                 
                sessionStorage.setItem("documentobase64",documentobase64);                
            },
            error: function (e) {
                kendo.alert("Error" + JSON.stringify(e));
            }
        }).done(function(){
            var tipoArchivo = sessionStorage.getItem("documento").split(".")[sessionStorage.getItem("documento").split(".").length-1];            
            if (tipoArchivo==="pdf"){
                var dataURI = "data:application/pdf;base64,"+ sessionStorage.getItem("documentobase64");                
            }else if(tipoArchivo==="gif"||tipoArchivo==="jpeg"||tipoArchivo==="png"||tipoArchivo==="pjpeg"||tipoArchivo==="tiff"){
                var dataURI = "data:image/"+tipoArchivo+";base64,"+ sessionStorage.getItem("documentobase64");
            }
            else {
                var dataURI = "data:text/plain;base64,"+ sessionStorage.getItem("documentobase64");
            }            
            var a = document.createElement("a");
            a.target = "_blank";
            a.href = dataURI;
            a.click();
        });
    }catch(e){
        kendo.alert(e.message);
    }
}

/**
 * Descarga el archivo en su formato original
 * @param {type} e
 * @returns {undefined}
 */
function getFile(e){    
    try{
        var archivo = sessionStorage.getItem("documento");
        dsfiles.dsfiles.SIRfile = new Array();
        dsfiles.dsfiles.SIRfile[0] = new Object();
        dsfiles.dsfiles.SIRfile[0].pilfilename = archivo;
        
        $.ajax({
            type: "POST",
            data: JSON.stringify(dsfiles),
            url: ipServicios+baseServicio+"GetDocument",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {                
                documentobase64 = JSON.stringify(resp.response.polfile);
                documentobase64 = documentobase64.replace(/"/g, "");                 
                sessionStorage.setItem("documentobase64",documentobase64);                
            },
            error: function (e) {
                alert("Error" + JSON.stringify(e));
            }
        }).done(function(){            
            var dataURI = "data:text/plain;base64,"+ sessionStorage.getItem("documentobase64");            
            kendo.saveAs({
                dataURI: dataURI,
                fileName: sessionStorage.getItem("documento")
            });

        });
    }catch(e){
        kendo.alert(e.message);
    }   
}