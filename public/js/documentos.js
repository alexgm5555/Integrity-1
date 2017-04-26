/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//////////////////////////////////////////////////////////////////////////
var dsfiles = new Object();
dsfiles.dsfiles = new Object();
dsfiles.dsfiles.eeDatos = new Array();
dsfiles.dsfiles.eeDatos[0] = new Object();
dsfiles.dsfiles.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
dsfiles.dsfiles.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
dsfiles.dsfiles.eeDatos[0].local_ip = sessionStorage.getItem("ipPrivada");
dsfiles.dsfiles.eeDatos[0].remote_ip = sessionStorage.getItem("ipPublica");
var grid = "";

function documentos() {
    $('#divDocumentos').removeAttr('style');
    $('#buscarDoc').keyup(function (e) {
        var value = this.value;
        if (value) {
            grid.data("kendoGrid").dataSource.filter({field: "nomfile", operator: "contains", value: value});
        } else {
            grid.data("kendoGrid").dataSource.filter({});
        }
    });
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
//                url: "http://35.162.169.179:8810/rest/Base/BaseIntegrity/DocumentList",
                url: ipServicios + baseServicio + "DocumentList",
                contentType: "application/json; charset=utf-8",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        return JSON.stringify(dsfiles);
                    }
                } catch (e) {
                    kendo.alert(e.message);
                }
            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            data: "dsfiles.ttfiles",
            model: {
                fields: {
                    nomfile: {type: "string"},
                    tamfile: {type: "integer"},
                    fecfile: {type: "date:MM-dd-yyyy"}
                }
            }
        }
    });

    grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        change: onChange,
        selectable: "row",
        scrollable: false,
        //height: 100%,        
        columns: [
            {
                field: "nomfile",
            }
        ]
    });
    //para ocultar el header de la grilla
    $("#grid .k-grid-header").css('display', 'none');

}


function onChange(e) {
    bandAlert = 0;
     e.preventDefault();
//    var divGrilla = e.delegateTarget.id;
    var grilla = $("#grid").data("kendoGrid");
    var item = grilla.dataItem(grilla.select());
    var selected = $.map(this.select(), function (item) {
        return $(item).text();
    });
    sessionStorage.setItem("documento", JSON.stringify(item));
    var tipoArchivo = sessionStorage.getItem("documento").split(".")[sessionStorage.getItem("documento").split(".").length - 1];

    var actions = new Array();
    actions[0] = new Object();
    actions[0].text = "Ver online";
    actions[0].action = showFile;
    actions[1] = new Object();
    actions[1].text = "Original";
    actions[1].primary = "true";
    actions[1].action = getFile;
    if (tipoArchivo !== "pdf") {
        actions[2] = new Object();
        actions[2].text = "Como pdf";
        actions[2].action = getFileAsPDF;
    }
    createDialog("Documentos", "El archivo seleccinado es " + selected + " que desea hacer ", "400px", "auto", true, true, actions);

}
/**
 * Descarga el archivo en su formato original
 * @param {type} e
 * @returns {undefined}
 */
function getFile(e) {
    try {
        debugger
        var archivo = JSON.parse(sessionStorage.getItem("documento"));
        dsfiles.dsfiles.SIRfile = new Array();
        dsfiles.dsfiles.SIRfile[0] = new Object();
        
        dsfiles.dsfiles.SIRfile[0].pilfilename = archivo.nomfile;
        dsfiles.dsfiles.SIRfile[0].piitipo = archivo.tipo;
        dsfiles.dsfiles.SIRfile[0].picfilepath = archivo.ruta;

        $.ajax({
            type: "POST",
            data: JSON.stringify(dsfiles),
            url: ipServicios + baseServicio + "GetDocument",
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {
                debugger
                documentobase64 = JSON.stringify(resp.response.polfile);
                documentobase64 = documentobase64.replace(/"/g, "");
                sessionStorage.setItem("documentobase64", documentobase64);
            },
            error: function (e) {
                alert("Error" + JSON.stringify(e));
            }
        }).done(function () {
            var dataURI = sessionStorage.getItem("documentobase64");
            if(identBrowser()==="Chrome"){
                kendo.saveAs({
                    dataURI: dataURI,
                    fileName: sessionStorage.getItem("documento")
                });
            }else{
                alertDialogs("Para descargar el archivo es necesario utilizar el navegador Chrome.");
                window.open("./docOnline.html", "_blank");
            }
        });
    } catch (e) {
        kendo.alert(e.message);
    }
}

function getFileAsPDF(e) {
    debugger
    try {
        var archivo = sessionStorage.getItem("documento");
        dsfiles.dsfiles.SIRfile = new Array();
        dsfiles.dsfiles.SIRfile[0] = new Object();
        dsfiles.dsfiles.SIRfile[0].pilfilename = archivo;

        $.ajax({
            type: "POST",
            data: JSON.stringify(dsfiles),
            url: ipServicios + baseServicio + "DocumentAsPdf",
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {
                documentobase64 = JSON.stringify(resp.response.polfile);
                documentobase64 = documentobase64.replace(/"/g, "");
                sessionStorage.setItem("documentobase64", documentobase64);
            },
            error: function (e) {
                alert("Error" + JSON.stringify(e));
            }
        }).done(function () {
            var dataURI = sessionStorage.getItem("documentobase64");
            archivo = archivo.replace(/\.[a-z]+/g, ".pdf");
            
            if(identBrowser()==="Chrome"){
                kendo.saveAs({
                    dataURI: dataURI,
                    fileName: archivo
                });
            }else{
                alertDialogs("Para descargar el archivo es necesario utilizar el navegador Chome.");
                window.open("./docOnline.html", "_blank");
            }
        });
    } catch (e) {
        kendo.alert(e.message);
    }
}

function showFile(e) {
    debugger
    try {
        var archivo = JSON.parse(sessionStorage.getItem("documento"));
        dsfiles.dsfiles.SIRfile = new Array();
        dsfiles.dsfiles.SIRfile[0] = new Object();
        dsfiles.dsfiles.SIRfile[0].pilfilename = archivo.nomfile;
        dsfiles.dsfiles.SIRfile[0].piitipo = archivo.tipo;
        dsfiles.dsfiles.SIRfile[0].picfilepath = archivo.ruta;
        $.ajax({
            type: "POST",
            data: JSON.stringify(dsfiles),
            url: ipServicios + baseServicio + "GetDocument",
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {
                documentobase64 = JSON.stringify(resp.response.polfile);
                documentobase64 = documentobase64.replace(/"/g, "");
                sessionStorage.setItem("documentobase64", documentobase64);
            },
            error: function (e) {
                kendo.alert("Error" + JSON.stringify(e));
            }
        }).done(function () {
            var tipoArchivo = sessionStorage.getItem("documento").split(".")[sessionStorage.getItem("documento").split(".").length - 1];
            if (tipoArchivo === "pdf") {
                var dataURI = "data:application/pdf;base64," + sessionStorage.getItem("documentobase64");
            } else if (tipoArchivo === "gif" || tipoArchivo === "jpeg" || tipoArchivo === "png" || tipoArchivo === "pjpeg" || tipoArchivo === "tiff") {
                var dataURI = "data:image/" + tipoArchivo + ";base64," + sessionStorage.getItem("documentobase64");
            } else {
                var dataURI = "data:text/plain;base64," + sessionStorage.getItem("documentobase64");
            }
            window.open("./docOnline.html", "_blank");
            
        });
    } catch (e) {
        kendo.alert(e.message);
    }
}
/**
 * funcion para filtrar los elementos de la grilla al oprimir una tecla dentro del input buscarDoc
 * @param {type} param
 */



