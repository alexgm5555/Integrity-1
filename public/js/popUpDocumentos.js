/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dataGridDetalle=[];
var year;
var mes;
var instacia;

$(document).ready(function() {   
 
    
});


function mostrarCustomPopUpDocumentos(idcustomPopUp) {    
    $("#"+idcustomPopUp).fadeIn("slow");
}

function cerrarCustomPopUp(idCustomPopUp) {
    $("#disable").fadeOut("slow");
    $("#"+idCustomPopUp).fadeOut("slow");
    $("#disable" ).remove();
    year = undefined;     
    mes = undefined;     
    instacia = undefined;     
}

function abrirCustomPopUpDocumentos(idCustomPopUp) {
    
    $("body").append("<div id='windowCab'></div>");
    var myWindow = $("#windowCab");
    var undo = $("#undo");
    
    function onCloseCabecera() {
        document.getElementById("windowCab").remove();
        undo.fadeIn();
    }
    $("body").append("<div id='disable'></div>");
        
    mostrarCustomPopUpDocumentos(idCustomPopUp);
    cargaListaDocumentos();
    gridDocumentos();
 
}

function gridDocumentos(){    
    var grid = $("#gridDocumentoAd").kendoGrid({
        dataSource: dataGridDetalle,       
        selectable: true,   
        scrollable: "auto",
        columns: [
            {
                field: "doc_name",
                title: "Documentos",
            },
            { command: [                    
                    {name: "descargar", click: descargarArchivo, template: "<a class='k-grid-descargar'><span class='k-sprite po_downflecha'></span></a>"}
                ],
                width: "50px" 
            }],        
        editable: false        
    }).data("kendoGrid");
}

function cargaListaDocumentos(){
    dataGridDetalle=[];
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
                dataGridDetalle = e[key1][mapData];
            } else {
                alertDialogs(e[key1].eeEstados[0].Estado);
            } 
        });    

        
                
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
} 
 
 function descargarArchivo(e) {
     
    e.preventDefault();
    var divGrilla = e.delegateTarget.id;
    var grilla = $("#"+divGrilla).data("kendoGrid");
    var item = grilla.dataItem(grilla.select());
    
     try{
        
        var objData = new sirDescargarDocumento();    
        var jsonSIRData = objData.getjson();
        var urlData = objData.getUrlSir();
        var mapData = objData.getmapSir()
        
        var key1 = Object.keys(jsonSIRData)[0];
        var key2 = Object.keys(jsonSIRData[key1])[1];  
        
         jsonSIRData[key1][key2][0].picfolderpath = item.doc_path;
         jsonSIRData[key1][key2][0].picdocname =  item.doc_name;
       
        
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
                kendo.saveAs({
                    dataURI: e[key1][mapData][0].polfile,
                    fileName: e[key1][mapData][0].picdocname
                });
            } else {
                alertDialogs(e[key1].eeEstados[0].Estado);
            } 
        });     
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
}

function popUpSubirArchivo(){
    try{
        $("#popUpDocumentos").append("<div id='progresoCarga' hidden='hidden'></div>");
        $("#progresoCarga").fadeIn("slow");
        $("#progresoCarga").display="block";
        displayLoading("#progresoCarga");
        document.getElementById("ipFile").click();
        
    }catch(e){alert(e)}    
}

function cargarArchivo(){
    var base64;
    var ipFile = document.getElementById('ipFile');    
    
    var file = ipFile.files[0];
    var reader = new FileReader();
    
    reader.onloadend  = function(e) {            
        var div = document.getElementById("progresoCarga"); 
        div.parentNode.removeChild(div);
    };
    
    reader.onload = function(e) {            
        base64 = reader.result;
        subirArchivo(base64,file);
    };        
    reader.readAsDataURL(file);	        
    
}

function subirArchivo(base64, file){
    
    var obj = new subirDocumentoAlfre();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    
    var key1 = Object.keys(json)[0];
    var key2 = Object.keys(json[key1])[1];                            
    
    json[key1][key2][0].picdocname = file.name;
    json[key1][key2][0].picdescription = "";
    json[key1][key2][0].picfolderpath = "ECM\/"+sessionStorage.getItem("companyNIT")+"\/"+sessionStorage.getItem("portafolio")+"\/"+year+"\/"+mes+"\/"+instacia;   
    json[key1][key2][0].picldocbase64 = base64;
    json[key1][key2][0].picmimetype = file.type;
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(json),
        url: url,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {             
            
        } 
    }).done(function(e){        
        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {            
            $("#imgArchivos")["0"].className = "k-icon po_upfolder_sup";
            $("#gridDocumentoAd").empty();
            cargaListaDocumentos();
            gridDocumentos();
        } else {
            alertDialogs(e[key1].eeEstados[0].Estado);
        }       
    });
}