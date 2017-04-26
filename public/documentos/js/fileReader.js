/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Descarga el archivo en su formato original
 * @param {type} e
 * @returns {undefined}
 */
function getFile(e) {
    try {
        bandAlert = 0;
        onClose()
        var archivo = sessionStorage.getItem("documento");
        dsfiles.dsfiles.SIRfile = new Array();
        dsfiles.dsfiles.SIRfile[0] = new Object();
        dsfiles.dsfiles.SIRfile[0].pilfilename = archivo;

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
                alert("Error" + JSON.stringify(e));
            }
        }).done(function () {
            var dataURI = "data:text/plain;base64," + sessionStorage.getItem("documentobase64");
            kendo.saveAs({
                dataURI: dataURI,
                fileName: sessionStorage.getItem("documento")
            });

        });
    } catch (e) {
        kendo.alert(e.message);
    }
}

function getFileAsPDF(e) {
    try {
        bandAlert = 0;
        onClose()
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
            var dataURI = "data:text/plain;base64," + sessionStorage.getItem("documentobase64");
            archivo = archivo.replace(/\.[a-z]+/g, ".pdf");
            kendo.saveAs({
                dataURI: dataURI,
                fileName: archivo
            });
        });
    } catch (e) {
        kendo.alert(e.message);
    }
}

function showFile(e) {
    try {
        bandAlert = 0;
        onClose()
        var archivo = sessionStorage.getItem("documento");
        dsfiles.dsfiles.SIRfile = new Array();
        dsfiles.dsfiles.SIRfile[0] = new Object();
        dsfiles.dsfiles.SIRfile[0].pilfilename = archivo;
        //console.log("dsfiles\n"+JSON.stringify(dsfiles));
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
            var a = document.createElement("a");
            a.target = "_blank";
            a.href = dataURI;
            a.click();
        });
    } catch (e) {
        kendo.alert(e.message);
    }
}

