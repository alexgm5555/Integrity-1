/* variables para consumir el servicio Sir*/
var objSir = new sir();
var urlSir = objSir.getUrlSir();
var mapSir = objSir.getmapSir();
var inputsir = objSir.getdataInputSir();
//    var objSir = new sir();
//var urlSir = objSir.getUrlSir();
//var est = "pre__est";
$(document).ready(function () {
//    fltrEst();
//    grilla();
//    document.getElementById('subtitulo').innerHTML = "Ingresa los datos<br>básicos del Reporte.";
    document.getElementById('labelTexto').innerHTML = "Bienvenido al menú de nuevo reporte. En esta primera " +
            "pantalla deberás indicar el nombre del reporte y el " +
            "capítulo de Integrity que deseas consultar.";
    llenarComboKendo();
});

function llenarComboKendo() {
    var data = [
        {text: "Fisico", value: "fisico"},
        {text: "Correo", value: "correo"}
    ];
    $("#fisico").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    });
}

function clickEnviar() {
    try {
        if ((document.getElementById("emitido").value)) {
            var obj = new cud();
            var objCud = obj.getdataInputCud();
            var urlCud = obj.getUrlCud();
            var mapRep = obj.getmapCud();
            
            objCud.dsSISolicitudcertificado["eeSISolicitudcertificado"] =
                    [
                        {
                            "picremitido": document.getElementById("emitido").value,
                            "picindicador": $("#fisico").val()
                        }
                    ]
            var jsonResp = "";
            var permitirIngreso = "";
            $.ajax({
                type: "POST",
                data: JSON.stringify(objCud),
                url: urlCud,
                dataType: "json",
                contentType: "application/json;",
                success: function (resp) {

                    var key1 = Object.keys(resp)[0];
                    permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
                    jsonResp = resp;
                },
                error: function (e) {
//                    alertDialogs("Error al consumir el servicio de CrearReporte.\n" + e.status + " - " + e.statusText);
                    var key1 = Object.keys(e.xhr.responseJSON)[0];
                    alertDialogs(e.xhr.responseJSON[key1].eeEstados["0"].Estado);
                }
            }).done(function () {
                if (permitirIngreso == '"OK"') {
                    alertDialogs("La solicitud del Certificado fue enviada.");
                } else {
                    alertDialogs("Problemas con el servicio .\n" + permitirIngreso);

                }
            });
        } else {
            alertDialogs("Por favor ingrese el nombre de la persona al la cual va dirigido el certificado.");
        }


    } catch (e) {
        alertDialogs("Function: clickEnviar Error: " + e.message);

    }
}