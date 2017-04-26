/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dataGridDocumentos=[];


$(document).ready(function() {   
 
    cargaListaDocumentosPagina();
    gridDocumentosPagina();
    
});



function cargaListaDocumentosPagina(){
    dataGridDocumentos=[];
    try{
        
        var objData = new sirConsultaDocumentos();    
        var jsonSIRData = objData.getjson();
        var urlData = objData.getUrlSir();
        var mapData = objData.getmapSir()
        
        
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
                dataGridDocumentos = e[key1][mapData];
            } else {
                alertDialogs(e[key1].eeEstados[0].Estado);
            } 
        });            
                
    } catch (e) {
        alertDialogs(e.message);
    }
}

function gridDocumentosPagina(){ 
    var gridheigth = $("body").height()-$("#divSubtitulo").height()-4;
    
    var grid = $("#gridDocumentosPaginas").kendoGrid({
        dataSource: dataGridDocumentos,   
        height: gridheigth,
        selectable: true,   
        scrollable: "auto",
        filterable:true,
        columns: [
            {
                field: "doc_name",
                title: "Documentos",
            },
            {
                field: "doc_mod_date",
                title: "Última modificación",
            },
            { command: [                    
                    {name: "descargar", click: descargarArchivo, template: "<a class='k-grid-descargar'><span class='k-sprite po_downflecha'></span></a>"},
                    {name: "preview", click: detallesArchivo, template: "<a class='k-grid-preview'><span class='k-sprite po_preview'></span></a>"}
                ],
                width: "100px" 
            }],        
        editable: false        
    }).data("kendoGrid");
    
    
    function detallesArchivo(e){ 
        
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
            
            document.getElementById('lbTitulo').innerHTML = item.doc_name;
            
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
                    abrirCustomPopUpPreview("popUpPreview")                     
                    document.getElementById("ifPreview").src = "https://docs.google.com/gview?url="+e.dsSIRdoc_dump.edocdump["0"].polfile+"&embedded=true" 
                    document.getElementById('lbNombreArchivo').innerHTML = e.dsSIRdoc_dump.eeSIRdoc_det["0"].pocdoc_name;                    
                    document.getElementById('lbTipoArchivo').innerHTML = e.dsSIRdoc_dump.eeSIRdoc_det["0"].pocdoc_name.split(".")[e.dsSIRdoc_dump.eeSIRdoc_det["0"].pocdoc_name.split(".").length - 1];//e.dsSIRdoc_dump.eeSIRdoc_det["0"].pocMimeType;
                    document.getElementById('lbAutorArchivo').innerHTML = e.dsSIRdoc_dump.eeSIRdoc_det["0"].pocauthor;
                    document.getElementById('lbCreadorArchivo').innerHTML = e.dsSIRdoc_dump.eeSIRdoc_det["0"].poccreatedBy;
                    document.getElementById('lbFecCreadoArchivo').innerHTML = e.dsSIRdoc_dump.eeSIRdoc_det["0"].poccreationDate;
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                } 
            });     
        } catch (e) {
            alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
        }
    }
}

function mostrarCustomPopUpPreview(idcustomPopUp) {    
    $("#"+idcustomPopUp).fadeIn("slow");
}

function cerrarCustomPopUpPreview(idCustomPopUp) {
    $("#disable").fadeOut("slow");
    $("#"+idCustomPopUp).fadeOut("slow");
    $("#disable").remove();   
}

function abrirCustomPopUpPreview(idCustomPopUp) {
    
    $("body").append("<div id='windowCab'></div>");
    var myWindow = $("#windowCab");
    var undo = $("#undo");
    
    function onCloseCabecera() {
        document.getElementById("windowCab").remove();
        undo.fadeIn();
    }
    $("body").append("<div id='disable'></div>");
        
    mostrarCustomPopUpPreview(idCustomPopUp); 
}


