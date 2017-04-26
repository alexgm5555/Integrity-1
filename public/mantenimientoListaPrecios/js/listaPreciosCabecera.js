/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var lis__est = 99;
var lis__num = 0;
function onloadPopUpCabecera(){
    $("#ipFechaInicio").val("");
        $("#ipFechaFin").val("");
        $("#ipDescripcion").val("");
    var authdsinv_cla = new Object();
    authdsinv_cla.dsinv_cla = new Object();
    authdsinv_cla.dsinv_cla.eeDatos = new Array();
    authdsinv_cla.dsinv_cla.eeDatos[0] = new Object();
    authdsinv_cla.dsinv_cla.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    authdsinv_cla.dsinv_cla.eeDatos[0].fiid = sessionStorage.getItem("picfiid");
    authdsinv_cla.dsinv_cla.eetemp = new Array();
    authdsinv_cla.dsinv_cla.eetemp[0] = new Object();


    $("#ipFechaInicio").kendoDatePicker({
        open: function () {
            var calendar = this.dateView.calendar;
            calendar.wrapper.width(this.wrapper.width() - 6);
        },
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"]
    });
    $("#ipFechaFin").kendoDatePicker({
        open: function () {
            var calendar = this.dateView.calendar;
            calendar.wrapper.width(this.wrapper.width() - 6);
        },
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"]
    });

    var authdssic_mnd = new Object();
    authdssic_mnd.dssic_mnd = new Object();
    authdssic_mnd.dssic_mnd.eeDatos = new Array();
    authdssic_mnd.dssic_mnd.eeDatos[0] = new Object();
    authdssic_mnd.dssic_mnd.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    authdssic_mnd.dssic_mnd.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");

    
    var ope = sessionStorage.getItem("opeListPre");
    if (ope === "edit") {
        var obj = JSON.parse(sessionStorage.getItem("listaPrecios"));
        lis__est = obj.lis__est;
        lis__num = obj.lis__num;
        $("#ipFechaInicio").val(obj.lis__fin);
        $("#ipFechaFin").val(obj.lis__ffi);
        $("#ipDescripcion").val(obj.lis__des);
        
    }
    $("#buttonCab").kendoButton();
}
function clickBtnCabecera() {
    var ope = sessionStorage.getItem("opeListPre");
    if (ope === "edit") {
        sendAjaxAddCmpCon("PUT");
    }else{
        sendAjaxAddCmpCon("POST");
    }
}

function sendAjaxAddCmpCon(verHtml) {
    var objCU = new SICUDgpr_lis();
    var objD = objCU.getjson();
    var urlD = objCU.getUrlSir();
    var mapDataD = objCU.getMapData();
    var key1 = Object.keys(objD)[0];
    objD[key1][mapDataD][0] =
            {
                "lis__des": $("#ipDescripcion").val(),
                "lis__est": lis__est,
                "lis__ffi": $("#ipFechaFin").val(),
                "lis__fin": $("#ipFechaInicio").val(),
                "lis__num": lis__num,                
            };

    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: verHtml,
        data: JSON.stringify(objD),
        url: urlD,
        async: false,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            alertDialogs("Error al consumir el servicio de crear lista de precios" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            var key1 = Object.keys(jsonResp)[0];
            cabGuard(JSON.stringify(jsonResp[key1][mapDataD][0]));
        } else {
            alertDialogs("Problemas con el creación de crear lista de precios .\n" + permitirIngreso);
        }

    });
}