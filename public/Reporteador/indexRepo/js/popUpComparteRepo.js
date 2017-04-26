/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var item = "";
function loadPopUpComparteRepo(e) {
    item = $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];
    $("#inputSelect").empty();
    crearInput("usuario","inputSelect");
    
    multiSelectCompar();
    
    
}

function clicBtnSaveCompartRepo() {
        var multiSelect = $("#usuario").data("kendoMultiSelect");
        for (var i = 0; i < multiSelect.value().length; i++) {
            var usuarios = multiSelect.value();
            usuarios = usuarios[i];
            item.usr_cod = usuarios+"_"+sessionStorage.getItem("companyNIT");
            var obj = getinputRestRepoCud();
            obj.dsSICUDRep_rpt = {
                "eerep_rpt": [
                    item
                ]
            };
            sendAjaxcomparteRepo();
        }

    }


function multiSelectCompar() {
    var obj = new SirUsuariosxRol();
    var inputsir = obj.getjson();
    var urlSir = obj.getUrlSir();
    var mapSir = "ee_user2";

    $("#usuario").removeClass();
    $("#usuario").kendoMultiSelect({
        dataTextField: "euser__Name",
        dataValueField: "euserid",
        dataSource: {
            transport: {
                read: {
                    url: urlSir,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json'
                },
                batch: false,
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            return JSON.stringify(inputsir);
                        }
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        if (e[key1][mapSir]) {
                            for (var i = 0; i < e[key1][mapSir].length; i++) {
                                e[key1][mapSir][i].id = i;
                            }
                        } else {
                            grilla();
                        }

                        return e[key1][mapSir];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "euserid",
                    fields: {
                        euserid: {validation: {required: true}, type: 'string'},
                        euser__Name: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (e) {
                alertDialogs(e.errorThrown);
            }
        },
        height: 400
    });
}




function sendAjaxcomparteRepo(obj) {


    try {
//        if ((document.getElementById("nomRepo").value) && (document.getElementById("capi").value)) {
            var objRep = getinputRestRepoCud();
            var urlRep = geturlRestRepoCud();
            var mapRep = getmapDataRestRepoC();
            var mapResponse = "eerep_rpt_num";
            if (obj) {
                objRep = obj;
            }
//            var cap = $("#capi").data("kendoComboBox");
//            cap = cap.dataSource._data[cap.selectedIndex];
//            objRep.dsSICUDRep_rpt.eerep_rpt[0].cap_cod = cap.cap__cod;
//            objRep.dsSICUDRep_rpt.eerep_rpt[0].por_cod = cap.por__cod;
//            objRep.dsSICUDRep_rpt.eerep_rpt[0].usr_cod = sessionStorage.getItem("usuario");
//            objRep.dsSICUDRep_rpt.eerep_rpt[0].rpt_nom = document.getElementById("nomRepo").value;
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
                        cerrarCustomPopUp1();
//                    var key1 = Object.keys(jsonResp)[0]
//                    var idRepo = jsonResp[key1][mapResponse][0].rpt_id;
//                    var capCod = jsonResp[key1]["eerep_rpt"][0].cap_cod;
//                    var porCod = jsonResp[key1]["eerep_rpt"][0].por_cod;
//                    sessionStorage.setItem("idRepo", idRepo);
//                    sessionStorage.setItem("capCod", capCod);
//                    sessionStorage.setItem("porCod", porCod);
//                    setcapCod(capCod);
//                    setporCod(porCod);
//
//                    var objGridCmp = getinputRestRepoGridCmp();
//                    objGridCmp.dsSIRRep_rpt_det.eeSIRrep_rpt_det[0].piirpt_id = idRepo;
//                    setinputRestRepoGridCmp(objGridCmp);
//
//                    var objGridFltr = getinputRestRepoGridFltr();
//                    objGridFltr.dsSIRRep_rpt_det.eeSIRrep_rpt_det[0].piirpt_id = idRepo;
//                    setinputRestRepoGridFltr(objGridFltr);
//
//                    var objGridFomat = getinputRestRepoGridFomat();
//                    objGridFomat.dsSIRRep_rpt_det.eeSIRrep_rpt_det[0].piirpt_id = idRepo;
//                    setinputRestRepoGridFomat(objGridFomat);
//
//
//
//                    sessionStorage.setItem("idRepo", idRepo);
//                    sessionStorage.setItem("capCod", $("#capi").data("kendoComboBox").value());
//                    sessionStorage.setItem("nomRepo", $("#nomRepo").val());
//                    sessionStorage.setItem("ope", "create");

//                    cambiarImagen('imgCampos');
//                    $("#btnCrearRepo").hide();
//                    $("#capi").data("kendoComboBox").enable(false);
//                    document.getElementById("nomRepo").disabled = true;
//                    clickbtn('Campos');
//                    window.location.assign(sessionStorage.getItem("url") + "Reporteador/reporteCU/html/reporteCU.html");
                } else {
                    alertDialogs("Problemas con el inicio sesión .\n" + permitirIngreso);

                }
            });
//        } else {
//            alertDialogs("Por favor ingrese el nombre del reporte y capitulo.");
//        }


    } catch (e) {
        alertDialogs("Function: clickCrearRepo Error: " + e.message);

    }

}