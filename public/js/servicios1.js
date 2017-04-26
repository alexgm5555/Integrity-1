var ipServicios = sessionStorage.getItem("ipS");
//var ipServicios = "http://172.21.24.143:8870/";
var ipBpm = ipServicios;

var ipEmpresa = "http://35.162.169.179:8850/";
var baseEmpresa = "rest/Empresas/";        
var baseServicio = "rest/Base/BaseIntegrity/";
var baseFactura = "rest/factura/";
var baseUsrBpm = "rest/Procesos/";
var baseComercial = "rest/Comercial/";
var baseParameters = "rest/Parameters/";
var baseContabilidad = "rest/Contab/";
var baseInventarios = "rest/Inventarios/";
var baseNomina = "rest/Portalnomina/";
var baseReports = "rest/Reports/";
var baseDocAlfresco = "rest/ECM/";

////////////////////////////////////////////////////////////////////////////////
function dominio(usr) {
    try {

        var objD = {
            "dsSIRempr_param": {
                "eeDatos": [
                    {
                        "picusrcod": usr
                    }
                ]
            }
        };
        var urlD = ipEmpresa + baseEmpresa + "GetParam";
        var mapDataD = "eeempr_param";
        var key1 = Object.keys(objD)[0];

        var jsonResp = "";
        var permitirIngreso = "";
        $.ajax({
            type: "POST",
            data: JSON.stringify(objD),
            url: urlD,
            async: false,
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {
                var key1 = Object.keys(resp)[0];
                permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
                jsonResp = resp[key1][mapDataD];
                bandAlert = 0;
            },
            error: function (e) {
                alertDialogs("Error al consumir el servicio GetParam" + e.status + " - " + e.statusText);
                bandAlert = 0;
            }
        }).done(function () {
            if (permitirIngreso == '"OK"') {
                ipServicios = "http://" +jsonResp[0].empr__ip +":"+ jsonResp[0].empr__serv + "/";
//                ipServicios = "http://190.144.16.114:8810/";
                sessionStorage.setItem("ipS",ipServicios);  
                ipBpm = ipServicios;
            } else {
                
                alertDialogs("Error al consumir el servicio GetParam .\n" + permitirIngreso);
            }

        });
    } catch (e) {
        alertDialogs(e.message);
    }
}