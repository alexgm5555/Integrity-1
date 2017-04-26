
/* global kendo */

var globalCmp = {};
var globalFun = [];
var objFunDel = [];
var objFunAdd = "";
//var filtrosCampos = [];
var funciones = "";
var idIniFun = -1;
var cmp_ini = "";
var selected = 0;
var inputFun = [{
        "cmp_fin_nom": "",
        "cmp_fun_ope": "",
        "cmp_ini": "",
        "cmp_ini_nom": "",
        "piindicador": "",
        "rpt_cmp_pos": sessionStorage.getItem("idFun"),
        "rpt_fun_nom": "",
        "rpt_fun_pos": "",
        "rpt_id": sessionStorage.getItem("idRepo")
    }];
function onloadPopUpFunciones() {
    document.getElementById('tituloPopUp').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nombre de la función &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='nomFun'  style='width: 30%;'/>"
    document.getElementById('subtitulo').innerHTML = "<br>Agregar una función   " + sessionStorage.getItem("nomFun");
    $('#imgOpc').removeClass('re_compon').addClass('re_funcion');
    $("#nomFun").val(sessionStorage.getItem("nomFun"));
    $("#nomFun").kendoMaskedTextBox();
    $('#imgOpc').removeClass('re_compon').addClass('re_funcion');
    $("#popUpFunciones").show();
    var scope = angular.element(document.getElementById("customPopUp")).scope();
    scope.$apply(function () {
        scope.reloadDatas([{
                cmp_fin_nom: "",
                cmp_fun_ope: "+",
                rpt_fun_pos: "",
                id: 0
            }]);
    });
    scope.$apply(function () {
        scope.reloadDataSource();
    });
    showFunExt();

}
;

var objFunc = [{
        cmp_fin_nom: "",
        cmp_fun_ope: "+",
        rpt_fun_pos: "",
        id: 0
    }];

function showFunExt() {
    debugger
    var idFun = sessionStorage.getItem("idFun");
    var j = 0; // variable de bandera para buscar la primer ope de funcion seleccionada
    if (globalFun) {

        for (var i = 0; i < globalFun.length; i++) {
            if (idFun == globalFun[i].rpt_cmp_pos) {
                if (j === 0) {
                    var scope = angular.element(document.getElementById("customPopUp")).scope();
                    scope.$apply(function () {
                        scope.reloadDatas([{
                                cmp_fin_nom: globalFun[i].cmp_ini_nom,
                                cmp_fun_ope: globalFun[i].cmp_fun_ope,
                                rpt_fun_pos: globalFun[i].cmp_fin_nom,
                                id: 0
                            }]);
                    });
                    idIniFun = i;
                }
                j++;
            }
        }
    }
}

angular.module("KendoDemos", ["kendo.directives"])
        .controller("MyCtrl", function ($scope) {
            $scope.objRepo = getinputRestRepoGridCmp();
            $scope.url = geturlRestRepoGridCmp();
            $scope.mapData = getmapDataRestRepoGridCmp();
            $scope.mapDataFun = "eerep_rpt_fun";
            $scope.dataSourceCmp = {};
            $scope.dataSourceOpe = [
                {text: "+"},
                {text: "-"},
                {text: "*"},
                {text: "/"}
            ];

            $scope.records = objFunc;
            $scope.itemSele = 0;
            $scope.newRecord = [];
            $scope.clickItem = function (a) {
                $scope.itemSele = parseInt(a.id);
                selected = a.id;
//                alert(JSON.stringify(a));
            };
            $scope.addItem = function () {
                $scope.records.push({cmp_fin_nom: "", cmp_fun_ope: "+", rpt_fun_pos: "", id: $scope.records.length});
                $scope.itemSele = $scope.records.length - 1;
            };
            $scope.showAnd = function (id) {
                if (id !== $scope.records.length - 1) {
                    return true;
                }
            };
            $scope.enviar = function () {

            };
            $scope.reloadDataSource = function () {
                $scope.dataSourceCmp = {
                    transport: {
                        read: {
                            async: false,
                            url: $scope.url,
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: "POST",
                        },
                        parameterMap: function (options, operation) {
                            $scope.objRepo["anx_cmp_id"] = [options];
                            return JSON.stringify($scope.objRepo);
                        }
                    },
                    batch: false,
                    schema: {
                        type: "json",
                        data: function (e) {
                            var key1 = Object.keys(e)[0];
                            if (e[key1].eeEstados[0].Estado.indexOf("OK") === 0) {
                                globalCmp = e[key1][$scope.mapData];
                                globalFun = e[key1][$scope.mapDataFun];

                                globalCmp = globalCmp.filter(function (obj) {
                                    return obj.rpt_cmp_vis !== sessionStorage.getItem("nomFun");
                                });
                                globalCmp = globalCmp.filter(function (obj) {
                                    return obj.cmp_td !== "character";
                                });
                                globalCmp = globalCmp.filter(function (obj) {
                                    return obj.cmp_td !== "logical";
                                });
//                                globalCmp = globalCmp.filter(function (obj) {
//                                    return obj.cmp_td !== sessionStorage.getItem("nomFun");
//                                });
                                return globalCmp;
                            } else {
                                alertDialogs(e[key1].eeEstados[0].Estado);
                            }
                        },
                        model: {
                            id: "cmp_id",
                            fields: {
                                rpt_cmp_vis: {validation: {required: true}, type: 'string'}
                            }
                        }
                    }
                };
            };
            $scope.reloadDatas = function (objNew) {
                debugger
                $scope.records = objNew;
            };

        });


function crearComboOpe(id) {
    $("#" + id).kendoComboBox({
        dataTextField: "text",
        dataValueField: "text",
        dataSource: [
            {text: "+"},
            {text: "-"},
            {text: "*"},
            {text: "/"}
        ],
        filter: "contains",
        suggest: true,
        index: 0,
        select: selectComboOpe

    });
}
function cmpOpe() {
    $("#cmpOpe").kendoComboBox({
        dataTextField: "text",
        dataValueField: "text",
        dataSource: [
            {text: "+"},
            {text: "-"},
            {text: "*"},
            {text: "/"}
        ],
        filter: "contains",
        suggest: true,
        index: 0,
//        select: selectComboOpe

    });
}


function saveElemCUFun() {

    var inputFun1 = JSON.parse(JSON.stringify(inputFun));
    var idnew = "";
    if (($("#cmpVal1").val() !== "") && ($("#cmpVal2").val() !== "")) {
        cmpVal1 = $("#cmpVal1").val();
        cmpVal2 = $("#cmpVal2").val();
        if (sessionStorage.getItem("idFun") === "10001") {
            blokWin();
            var inputCmpFun = {
                "dsSICUDRep_rpt": {
                    "eeDatos": [
                        {
                            "picusrcod": user,
                            "picfiid": fiid
                        }
                    ],
                    "eerep_rpt_cmp": [
                        {
                            "anx_cmp_id": "",
                            "anx_cmp_lkp": false,
                            "anx_cmp_vsb": true,
                            "anx_nom": "",
                            "cmp_bloq": false,
                            "cmp_brk": false,
                            "cmp_dsc": "",
                            "cmp_id": "",
                            "cmp_inquery": "",
                            "cmp_nom": "",
                            "cmp_ssm": false,
                            "cmp_sum": false,
                            "cmp_td": "",
                            "rep_anx_cmp_idc": false,
                            "rpt_cmp_con": false,
                            "rpt_cmp_fil": true,
                            "rpt_cmp_gru": true,
                            "rpt_cmp_fun": true,
                            "rpt_cmp_pos": 1,
                            "rpt_cmp_pro": false,
                            "rpt_cmp_sum": false,
                            "rpt_cmp_vis": $("#nomFun").val(),
                            "rpt_id": idRepo,
                            "transf": ""
                        }
                    ]
                }
            };
//            inputCmpFun.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_vis = $("#nomFun").val();
//            inputCmpFun.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_fun = true;
            sendAjaxAddCmpFun(inputCmpFun.dsSICUDRep_rpt.eerep_rpt_cmp, "POST");
            inputFun1 = JSON.parse(JSON.stringify(inputFun));
            idnew = 1;
            desBlokWin();
        }

        var selected = $("#cmpVal1").data("kendoComboBox").dataSource._data[$("#cmpVal1").data("kendoComboBox").selectedIndex];
        var selected2 = $("#cmpVal2").data("kendoComboBox").dataSource._data[$("#cmpVal2").data("kendoComboBox").selectedIndex];
        if (selected) {
            inputFun1[0].cmp_ini = selected.anx_nom;
            inputFun1[0].cmp_ini_nom = selected.rpt_cmp_vis;
        } else {
            inputFun1[0].cmp_ini = "";
            inputFun1[0].cmp_ini_nom = cmpVal1;
        }
        if (selected2) {
            inputFun1[0].cmp_fin_nom = selected2.rpt_cmp_vis;
        } else {
            inputFun1[0].cmp_fin_nom = cmpVal2;
        }

        inputFun1[0].cmp_fun_ope = $("#funOpe").val();
        inputFun1[0].rpt_fun_pos = 0;
        if ((idnew === 1)) {
            sendAjaxFun(inputFun1, "POST");
        } else {
            inputFun1[0].rpt_fun_pos = selected + 1;
            sendAjaxFun(inputFun1, "PUT");
        }

    }
}



function sendAjaxFun(data, verHtml, oldId) {
    var obj = getinputRestCmpCud();
    var urlServ = geturlRestCmpCud();
    var mapData = "eerep_rpt_fun";
    obj = {
        "dsSICUDRep_rpt": {
            "eeDatos": [
                {
                    "picusrcod": user,
                    "picfiid": fiid,
                }
            ],
            "eerep_rpt_fun": data,
        }
    }
    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: verHtml,
        data: JSON.stringify(obj),
        url: urlServ,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            errorPopUp("Error al consumir el servicio de CrearFunciones" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
//            closeLoading("#operaciones");
            if (verHtml === "POST") {
                var key1 = Object.keys(jsonResp)[0];
                var id = jsonResp[key1].eerep_rpt_fun[0].rpt_fun_pos;
                if (globalFun) {
                    globalFun.push(jsonResp[key1].eerep_rpt_fun[0]);
                }
            }
            cerrarCustomPopUp();
            closeLoading("#operaciones");
        } else {
//            closeLoading("#operaciones");
            errorPopUp("Problemas con el creación de funciones .\n" + permitirIngreso);
        }
        $("#btnSaveFiltros").kendoButton({
            enable: true
        });
    });

}
function sendAjaxAddCmpFun(data, verHtml) {
    displayLoading("#operaciones");
    var obj = getinputRestCmpCud();
    var urlServ = geturlRestCmpCud();
    var mapData = "eerep_rpt_fun";
    obj = {
        "dsSICUDRep_rpt": {
            "eeDatos": [
                {
                    "picusrcod": user,
                    "picfiid": fiid,
                }
            ],
            "eerep_rpt_cmp": data,
        }
    }
    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: verHtml,
        data: JSON.stringify(obj),
        url: urlServ,
        dataType: "json",
        contentType: "application/json;",
        async: false,
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            errorPopUp("Error al consumir el servicio de CrearFunciones" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {

            var key1 = Object.keys(jsonResp)[0];
            var id = jsonResp[key1].eerep_rpt_cmp[0].rpt_cmp_pos;
            sessionStorage.setItem("idFun", id);
            inputFun[0].rpt_cmp_pos = id;
            if (globalFun) {
                idIniFun = globalFun.length;
            } else {
                idIniFun = 0;
            }

        } else {
            closeLoading("#operaciones");
            errorPopUp("Problemas con el creación de funciones .\n" + permitirIngreso);
        }

    });

}



function blokWin() {

    kendo.ui.progress($(document.body), true);
}
function desBlokWin() {
    kendo.ui.progress($(document.body), false);
}
