/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * funcion que carga todos los elementos en el divReporte  entre estos el mensaje y llena los combos Portafolio y campos
 * @returns {undefined}
 */
var capituloId = "";
function loadReporte() {

//    createStyleSheet();
//    if (!(document.getElementById("nomRepo").value) && !(document.getElementById("capi").value)) {
//        desableButton("imgReporte");
//    }

    document.getElementById('subtitulo').innerHTML = "Ingresa los datos<br>básicos del Reporte.";
    document.getElementById('labelTexto').innerHTML = "Bienvenido al menú de nuevo reporte. En esta primera " +
            "pantalla deberás indicar el nombre del reporte y el " +
            "capítulo de Integrity que deseas consultar.";
    llenarComboKendoRepo("porta", "nombreprestador");
    $("#btnCrearRepo").kendoButton({
        text: "Item N"
    });
    if (sessionStorage.getItem("ope") === "edit") {
        $("#btnCrearRepo").hide();
        $("#capi").data("kendoComboBox").enable(false);
        document.getElementById("nomRepo").disabled = true;
    } else {
        $("#btnCrearRepo").html('Crear');
    }
}
/**
 * llena los comobos portafolio y capitulo
 * @param {type} urlServ url del servicio
 * @param {type} idCmp id del combbox
 * @param {type} field campo que quiero coger si tubiera muchos campos en el servicio
 * @returns {undefined}
 */
function llenarComboKendoRepo(urlServ, idCmp, field) {

    var objCap = getinputRestCap();
    var urlCap = geturlRestCap();
    var mapData = getmapDataRestCap();
    var capitulo = $("#capi").kendoComboBox({
        autoBind: true,
        filter: "startswith",
        placeholder: "Seleccione el Capitulo",
        dataTextField: "cap__des",
        dataValueField: "cap__cod",
        change: onChange,
        dataSource: {
            transport: {
                read: {
                    url: urlCap,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST",
                },
                parameterMap: function (options, operation) {
                    objCap["ttsic_cap"] = [options];
                    return JSON.stringify(objCap);
                }
            },
            batch: true,
            schema: {
                type: "json",
                data: mapData,
                model: {
                    id: "cap__cod",
                    fields: {
                        cap__des: {validation: {required: true}, type: 'string'}
                    }
                }
            }
        }
    }).data("kendoComboBox");
    capitulo.value(sessionStorage.getItem("capCod"));
    $("#nomRepo").val(sessionStorage.getItem("nomRepo"))
}
function onChange(e) {
    var cap = this.dataItem(e.item);

    sessionStorage.setItem("idRepo", $("#nomRepo").val());
    sessionStorage.setItem("capCod", cap.cap__cod);
    sessionStorage.setItem("porCod", cap.por__cod);
    var inputRestAnx = {"dsSIRcar_anx": {
            "eeDatos": [
                {
                    "picusuario": user,
                    "picfiid": fiid,
                    "local_ip": "",
                    "remote_ip": ""
                }
            ],
            "eeSIRcar_anx": [
                {
                    "piicarcod": cargo,
                    "picusuario": user,
                    "piiporcod": cap.por__cod,
                    "piicapcod": cap.cap__cod
                }
            ]
        }};
    setinputRestAnx(inputRestAnx);
}
function clickCrearRepo() {


    try {
        if ((document.getElementById("nomRepo").value) && (document.getElementById("capi").value)) {
            var objRep = getinputRestRepoCud();
            var urlRep = geturlRestRepoCud();
            var mapRep = getmapDataRestRepoC();
            var mapResponse = "eerep_rpt_num";
            var cap = $("#capi").data("kendoComboBox");
            cap = cap.dataSource._data[cap.selectedIndex];
            objRep.dsSICUDRep_rpt.eerep_rpt[0].cap_cod = cap.cap__cod;
            objRep.dsSICUDRep_rpt.eerep_rpt[0].por_cod = cap.por__cod;
            objRep.dsSICUDRep_rpt.eerep_rpt[0].usr_cod = sessionStorage.getItem("usuario");
            objRep.dsSICUDRep_rpt.eerep_rpt[0].rpt_nom = document.getElementById("nomRepo").value;
            var jsonResp = "";
            var permitirIngreso = "";
            $.ajax({
                type: "POST",
                data: JSON.stringify(objRep),
                url: urlRep,
                dataType: "json",
                contentType: "application/json;",
                success: function (resp) {
                    
                    var key1 = Object.keys(resp)[0];
                    permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
                    jsonResp = resp;
                },
                error: function (e) {
                    alertDialogs("Error al consumir el servicio de CrearReporte.\n" + e.status + " - " + e.statusText);

                }
            }).done(function () {
                if (permitirIngreso == '"OK"') {
                    
                    var key1 = Object.keys(jsonResp)[0]
                    var idRepo = jsonResp[key1][mapResponse][0].rpt_id;
                    var capCod = jsonResp[key1]["eerep_rpt"][0].cap_cod;
                    var porCod = jsonResp[key1]["eerep_rpt"][0].por_cod;
                    sessionStorage.setItem("idRepo", idRepo);
                    sessionStorage.setItem("capCod", capCod);
                    sessionStorage.setItem("porCod", porCod);
                    setcapCod(capCod);
                    setporCod(porCod);

                    var objGridCmp = getinputRestRepoGridCmp();
                    objGridCmp.dsSIRRep_rpt_det.eeSIRrep_rpt_det[0].piirpt_id = idRepo;
                    setinputRestRepoGridCmp(objGridCmp);

                    var objGridFltr = getinputRestRepoGridFltr();
                    objGridFltr.dsSIRRep_rpt_det.eeSIRrep_rpt_det[0].piirpt_id = idRepo;
                    setinputRestRepoGridFltr(objGridFltr);

                    var objGridFomat = getinputRestRepoGridFomat();
                    objGridFomat.dsSIRRep_rpt_det.eeSIRrep_rpt_det[0].piirpt_id = idRepo;
                    setinputRestRepoGridFomat(objGridFomat);



                    sessionStorage.setItem("idRepo", idRepo);
                    sessionStorage.setItem("capCod", $("#capi").data("kendoComboBox").value());
                    sessionStorage.setItem("nomRepo", $("#nomRepo").val());
                    sessionStorage.setItem("ope", "create");

//                    cambiarImagen('imgCampos');
//                    $("#btnCrearRepo").hide();
//                    $("#capi").data("kendoComboBox").enable(false);
//                    document.getElementById("nomRepo").disabled = true;
//                    clickbtn('Campos');
                    window.location.assign(sessionStorage.getItem("url") + "Reporteador/reporteCU/html/reporteCU.html");
                } else {
                    alertDialogs("Problemas con el inicio sesión .\n" + permitirIngreso);

                }
            });
        } else {
            alertDialogs("Por favor ingrese el nombre del reporte y capitulo.");
        }


    } catch (e) {
        alertDialogs("Function: clickCrearRepo Error: " + e.message);

    }

}


