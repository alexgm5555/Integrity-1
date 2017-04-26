/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dpcamion;
var dptransportista
var dpruta;

var objPopup = [];
$(window).resize(
        function () {
            var viewportHeight = $(window).height();
            $('#outerWrapper').height(viewportHeight - 100);
        });
$(document).ready(
        function () {
            localStorage["grid_data"] = "";
            $("#btnDespachar").kendoButton({
                click: despachar
            });
            var windowTemplate = kendo.template($("#windowTemplate").html());
            var window = $("#window1").kendoWindow({
                title: "Eliminar",
                visible: false, //the window will not appear before its .open method is called
            }).data("kendoWindow");
            addRow();
            //ruta();
            fleteList();
        });


function addRow() {
    $("#textarea").append("<div id='windowform'></div>");
    var myWindow1 = $("#windowform"), undo = $("#undo");

    function onClose() {
        undo.fadeIn();
        $("#windowform").empty();
    }
    var UrL = sessionStorage.getItem("url");
    myWindow1.kendoWindow({
        draggable: true,
        height: 300,
        modal: true,
        resizable: true,
        title: "Nuevo",
        width: 600,
        content: UrL + "despachos/html/popupFiltros.html",
        actions: [
            "Close"
        ],
        close: function () {
            $("#textarea").empty();
            this.destroy();
        }
    }).data("kendoWindow").center().open();
}

function editar_rol() {
    var grid1 = $("#grid").data("kendoGrid");
    window.location = ("tareas.html");
}

function filtrar(obj) {
    grilla(obj);
    cerrar();
}


function camion() {
    var consultar = new sirCamiones();
    var datajson = consultar.getjson();
    datajson.dsSIRdpc_cam.eeSIRdpc_cam[0].pidcam_cap = parseInt(document.getElementById('pesoTotal').innerHTML);
    //datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].picciu__cod= $("#Ciudad").data("kendoComboBox")._old;
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eedpc_cam";
    $("#Camion").removeClass();
    dpcamion = $("#Camion").kendoDropDownList({
        optionLabel: "Seleccione el camión",
        dataTextField: "cam__des",
        dataValueField: "cam__cod",
        template: '<div class="divElementDropDownList">#: data.cam__des #' + ' - ' + ' #:data.cam__vers #</div>',        
        select: function (e) {            
            if($("#Ruta").val()!==""){
                transportista(e);
            }            
        },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    bandAlert = 0;
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Camiones" + e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cam__cod",
                    fields: {
                        cam__cod: {editable: false, nullable: false},
                        cam__des: {editable: false, nullable: false},
                        cam__vers: {editable: false, nullable: false},
                        cam__pla: {editable: false, nullable: false}
                    }
                }
            }
        }
    }).data("kendoDropDownList");
}

function ruta() {
    var consultar = new sirRuta();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eedpc_rut";
    $("#Ruta").removeClass();
    dpruta = $("#Ruta").kendoDropDownList({
                optionLabel: "Seleccione la ruta",
                dataTextField: "rut__des",
                dataValueField: "rut__cod",
                template: '<div class="divElementDropDownList">Desde:#: data.bar__dsc1 #' + ' Hasta: ' + ' #:data.bar__dsc2 #</div>',                
                select: function (e) {                    
                    if($("#Camion").val()!==""){
                        transportista(e);
                    }            
                },
                dataSource: {
                    transport: {
                        read: {
                            url: urlService,
                            dataType: "json",
                            type: "POST",
                            contentType: "application/json; charset=utf-8"
                        },
                        parameterMap: function (options, operation) {
                            if (operation === "read") {
                                return JSON.stringify(datajson);
                            }
                        }
                    },
                    schema: {
                        data: function (e) {
                            var key1 = Object.keys(e)[0];
                            if (e[key1].eeEstados[0].Estado === "OK") {
                                return e[key1][mapCud1];
                            } else {
                                alertDialogs("Error Con Servicio Rutas" + e[key1].eeEstados[0].Estado);
                            }
                        },
                        model: {
                            id: "rut__cod",
                            fields: {
                                rut__cod: {editable: false, nullable: false},
                                rut__des: {editable: false, nullable: false},
                                bar__dsc1: {editable: false, nullable: false},
                                bar__dsc2: {editable: false, nullable: false},
                            }
                        }
                    }
                }
            }).data("kendoDropDownList");
}

function transportista(e) {
    $("#Transportista").removeClass();
    var consultar = new sirTransportista();
    var datajson = consultar.getjson();
    datajson.dsSIRdpc_tra.eeSIRdpc_tra[0].piicam_cod = $("#Camion").val();
    datajson.dsSIRdpc_tra.eeSIRdpc_tra[0].piirut_cod = $("#Ruta").val();
    //datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].picciu__cod= $("#Ciudad").data("kendoComboBox")._old;
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eedpc_tra";
    dptransportista = $("#Transportista").kendoDropDownList({
                optionLabel: "Seleccione el transportista",
                dataTextField: "ter__raz",
                dataValueField: "ter__nit",
                template: '<div class="divElementDropDownList">#: data.ter__raz #' + ' - ' + ' #:data.cam__des #</div>',                
                select:
                        function (e) {
                        },
                dataSource: {
                    transport: {
                        read: {
                            url: urlService,
                            dataType: "json",
                            type: "POST",
                            contentType: "application/json; charset=utf-8"
                        },
                        parameterMap:
                                function (options, operation) {
                                    if (operation === "read") {
                                        return JSON.stringify(datajson);
                                    }
                                }
                    },
                    schema: {
                        data:
                                function (e) {
                                    var key1 = Object.keys(e)[0];
                                    if (e[key1].eeEstados[0].Estado === "OK") {
                                        return e[key1][mapCud1];
                                    } else {
                                        alertDialogs("Error Con Servicio Transportista" + e[key1].eeEstados[0].Estado);
                                    }
                                },
                        model: {
                            id: "ter__nit",
                            fields: {
                                ter__nit: {editable: false, nullable: false},
                                ter__raz: {editable: false, nullable: false},
                                rut__des: {editable: false, nullable: false},
                                cam__des: {editable: false, nullable: false},
                            }
                        }
                    }
                }
            }).data("kendoDropDownList");
}
function fleteList() {
    var obj = new listaflete();
    var dataSource = obj.getdataSource();
    $("#flete").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        placeholder: "Seleccione Tipo de ",
        template: '<div class="divElementDropDownList">#: data.text #</div>'
//        change: onSelect
    });
}

function listaflete() {//(G-Granel/L-Lonas)
    var dataSource = [
        {text: "Tonelada", value: true},
        {text: "Viaje", value: false}
    ];
    ;

    this.setdataSource = function (newname) {
        if (newname) {
            dataSource = newname;
        }
    };
    this.getdataSource = function () {
        return dataSource;
    };
}
;

function grilla(obj, dataSource1) {
    var consultar = new Sirdespacho();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    //datajson.dsSIRgpd_sre.SIRgpd_sre[0].picsre__est = e;                
    var actualizar = new sirDespacho();
    var actjson = actualizar.getjson();
    var urlactualizar = actualizar.getUrlSir();
    var mapCud = "eegpd_ped_det";
    if (obj) {
        var key1 = Object.keys(datajson)[0];
        
        datajson[key1].eeSIRgpd_pdet_dpc = [{
                "ciu_cod": obj.ciudad,
                "com_con": obj.establecimiento,
                "rgeo_cod": obj.region,
                "ter_nit": obj.cliente,
            }];
        objPopup = datajson[key1].eeSIRgpd_pdet_dpc[0];
    }
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            update:
                    function (options) {
                        var localData = JSON.parse(localStorage["grid_data"]);
                        for (var i = 0; i < localData.length; i++) {
                            if (localData[i].ID == options.data.ID) {
                                localData[i].Value = options.data.Value;
                            }
                        }
                        localStorage["grid_data"] = JSON.stringify(localData);
                        options.success(options.data);
                    },
            destroy:
                    function (options) {
                        var localData = JSON.parse(localStorage["grid_data"]);
                        for (var i = 0; i < localData.length; i++) {
                            if (localData[i].ID === options.data.ID) {
                                localData.splice(i, 1);
                                break;
                            }
                        }
                        localStorage["grid_data"] = JSON.stringify(localData);
                        options.success(localData);
                    },
            parameterMap:
                    function (options, operation) {
                        if (operation === "read") {
                            return JSON.stringify(datajson);
                        }
                        if (operation === "update") {
                            var cedula = $("#cedula")[0].value;
                            var nombre = $("#nombre")[0].value;
                            var region = $("#region").data("kendoDropDownList");
                            var select = region.selectedIndex;
                            region = region.dataSource._data[select].rgeo__cod;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__cod = region;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__cod = options.sre__cod;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].sre__est = options.sre__est;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__nit = cedula;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].rgeo__nom = options.rgeo__nom;
                            actjson.dsSICUDgpd_sre.eegpd_sre[0].ter__raz = nombre;
                            return JSON.stringify(actjson);
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();
                        }
                    }
        },
        batch: false,
        severFiltering: true,
        schema: {
            data:
                    function (e) {
                        if ((localStorage["grid_data"] === "") || (!localStorage["grid_data"])) {
                            var key1 = Object.keys(e)[0];
                            if (e[key1].eeEstados && e[key1][mapCud]) {
                                if (e[key1].eeEstados[0].Estado === "OK") {
                                    if ((localStorage["grid_data"] === "") || (!localStorage["grid_data"])) {
                                        for (var i = 0; i < e[key1]["eegpd_ped_det"].length; i++) {
                                            e[key1]["eegpd_ped_det"][i].ID = i;
                                            e[key1]["eegpd_ped_det"][i].checkIn = false;
                                        }
                                        localStorage["grid_data"] = JSON.stringify(e[key1][mapCud]);
                                        return e[key1][mapCud];
                                    } else {
                                        return JSON.parse(localStorage["grid_data"]);
                                    }
                                } else
                                {
                                    alertDialogs("Error" + e[key1].eeEstados[0].Estado);
                                }
                            }
                        } else {
                            return JSON.parse(localStorage["grid_data"]);
                        }
                    },
            model: {
                id: "ped__num",
                fields: {
                    ped__fec: {editable: true, nullable: false},
                    suc__cod: {editable: true, nullable: false},
                    clc__cod: {editable: false, nullable: false},
                    cla__cod: {editable: true, nullable: false},
                    art__cod: {editable: true, nullable: false},
                    ped__can__k: {editable: false, nullable: false},
                    art__des: {editable: true, nullable: false},
                    ped__pend: {editable: true, nullable: false},
                    ped__num: {editable: true, nullable: false},
                }
            }
        },
        error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });
    if (dataSource1) {
        dataSource = dataSource1;
    }
    $(window).trigger("resize");
    var grid1 = $("#grid").kendoGrid({
        dataSource: dataSource,
        columns: [
            {field: "ped__num", title: "# Pedido", hidden: false},
            {field: "art__des", title: "Producto", hidden: false},
            {field: "ped__pend", title: "Cantidad", hidden: false},
            {field: "ped__can__k", title: "Peso", hidden: false},
            {command: [
                    {name: "check", text: "estado", template: "<a class='k-grid-check'><span class='k-sprite po_editoff' ></span></a>"},
                ], width: "60px"}],
        editable: "popup",
//         
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        cancel: function (e) {
            e._defaultPrevented = true;
            $('#grid').data('kendoGrid').refresh();
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        }
    });
}

function clickEliminar(e) {
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));
        if (dataItem.sre__est != 99) {
            alertDialogs("No se puede eliminar por el estado ");
        } else {
            var actions = new Array();
            actions[0] = new Object();
            actions[0].text = "OK";
            actions[0].action =
                    function () {
                        var dataSource = $("#grid").data("kendoGrid").dataSource;
                        dataSource.remove(dataItem);
                        dataSource.sync();
                        bandAlert = 0;
                    };
            actions[1] = new Object();
            actions[1].text = "Cancelar";
            actions[1].action =
                    function () {
                        bandAlert = 0;
                    };
            createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.sre__cod + " ---?", "400px", "200px", true, true, actions);
        }
    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}

function changImgFunc(results, e) {
    for (var i = 0; i < results.length; i++) {
        if (document.getElementById("spanproceso" + results[i].rgeo__cod + results[i].ter__nit + results[i].sre__cod)) {
            if (results[i].sre__est == 0) {
                document.getElementById("spanproceso" + results[i].rgeo__cod + results[i].ter__nit + results[i].sre__cod).setAttribute("class", "k-sprite po_checkAct");
                //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "disable();");
            }
            if (results[i].sre__est == 99) {
                document.getElementById("spanproceso" + results[i].rgeo__cod + results[i].ter__nit + results[i].sre__cod).setAttribute("class", "k-sprite po_checkCreate");
                //document.getElementById("spanproceso"+results[i].rgeo__cod+results[i].ter__nit+results[i].sre__cod).setAttribute("onclick", "active();");
            }
            if (results[i].sre__est == 1) {
                document.getElementById("spanproceso" + results[i].rgeo__cod + results[i].ter__nit + results[i].sre__cod).setAttribute("class", "k-sprite po_checkBloq");
            }
        }
    }
}

function changeEst(e) {
    var idGrid = e;
    var localData = JSON.parse(localStorage["grid_data"]);
    for (var i = 0; i < localData.length; i++) {
        if (localData[i].ID == e) {
            if (localData[i].checkIn) {
                localData[i].checkIn = false;
            } else {
                localData[i].checkIn = true;
            }
        }
    }
//    $('#grid').data('kendoGrid')
    var newDataSource = new kendo.data.DataSource({
        data: localData
    });
    $("#grid").data("kendoGrid").setDataSource(newDataSource);
    localStorage["grid_data"] = JSON.stringify(localData);
    conditionalSum();
    grilla("", newDataSource);
}

function cerrar() {
    //onClosex();
    $("#windowform").data("kendoWindow").close();
}

function conditionalSum() {
    if (bandAlert === 0) {
        bandAlert = bandAlert + 1;
        var data = JSON.parse(localStorage["grid_data"]);
        var item, sum = 0;
        for (var idx = 0; idx < data.length; idx++) {
            item = data[idx];
            if (item.checkIn) {
                sum += item.ped__can__k;
            }
        }
        document.getElementById('pesoTotal').innerHTML = sum;
        camion();
        ruta();
        return "";
    }
}

function despachar() {
    var sucursal = "";
    var ciudad = "";
    var establecimiento = "";
    var peso = document.getElementById('pesoTotal').textContent;
    if (peso > 0) {
        var camion = $("#Camion").val();
        var transportista = $("#Transportista").val();
        var ruta = $("#Ruta").val();
        var orden = $("#Orden").val();
        var flete = $("#flete").val();



        if (objPopup) {
            ciudad = objPopup.ciu_cod;
            establecimiento = objPopup.com_con;
        }
        var local = JSON.parse(localStorage["grid_data"]);
        var grilla = [];
        for (var i = 0; i < local.length; i++) {
            sucursal = local[i].suc__cod;
            if (local[i].checkIn) {
                var dpc__can  = local[i].ped__pend;
                var clc__cod__ped = local[i].clc__cod;
                var dpc__kgs = local[i].ped__can__k;
                var suc__cod = local[i].suc__cod;    
                var art__cod = local[i].art__cod;    
                var ped__num = local[i].ped__num;    
                var lis__num = local[i].lis__num;    
                var ped__fec = local[i].ped__fec;
                var cla__cod = local[i].cla__cod;
//                var com__con = local[i].com__con;
                var objjson = {
                    "dpc__can": dpc__can,
                    "clc__cod__ped": clc__cod__ped,
                    "dpc__kgs":dpc__kgs,
                    "suc__cod": suc__cod,
                    "art__cod": art__cod,
                    "ped__num": ped__num,
                    "lis__num": lis__num,
                    "ped__fec": ped__fec,
                    "cla__cod": cla__cod,
//                    "com_con": com_con
                };
                local[i] = objjson;
                grilla.push(local[i]);
            }
        }

        var objJson = {
            "dsSICUDdpc_cab": {
                "eeDatos": [
                    {
                        "picusrcod": sessionStorage.getItem("usuario"),
                        "picfiid": sessionStorage.getItem("picfiid"),
                        "local_ip": sessionStorage.getItem("ipPrivada"),
                        "remote_ip": sessionStorage.getItem("ipPublica")
                    }
                ],
                "eedpc_cab": [{
                        "cam__cod": camion,
                        "ciu__cod": ciudad,
                        "com__con": establecimiento,
                        "ter__nit": transportista,
                        "suc__cod": sucursal,
                        "car__kgs": peso,
                        "rut__cod": ruta,
                        "dpc__car": orden,
                        "dpc__fle": flete

                    }],
                "eedpc_det": grilla
            }
        };
        cudDespachos(objJson);
    }else{
        alertDialogs("No se ha seleccionado ningun item para depachar.");
    }

}

function cudDespachos(obj) {
    var objCud = new cud();
    var urlCud = objCud.getUrlCud();
    var mapCud = objCud.getmapCud();
    var inputCud = obj;

    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: "POST",
        data: JSON.stringify(inputCud),
        url: urlCud,
        async: false,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp[key1];
            bandAlert = 0;
        },
        error: function (e) {
            alertDialogs("Error al consumir el servicio cud Despachos" + e.status + " - " + e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            localStorage["grid_data"] = "";
            location.reload();
        } else {
            alertDialogs("Error al consumir el servicio cud Despachos " + permitirIngreso);
        }
    });

}

function selectAll() {
    $("#imgChekAll").removeClass();
    $("#imgChekAll").addClass("k-sprite po_checkCreate");
    $("#imgChekAll").attr("onClick", "unSelectAll()");
    $("#imgChekAll").attr("title", "Quitar Selección");
    allCheck(true);
}
function unSelectAll() {
    $("#imgChekAll").removeClass();
    $("#imgChekAll").addClass("k-sprite po_checkAct");
    $("#imgChekAll").attr("onClick", "selectAll()");
    $("#imgChekAll").attr("title", "Seleccionar Todos");
    allCheck(false);
}
function allCheck(bool) {
    var localData = JSON.parse(localStorage["grid_data"]);
    for (var i = 0; i < localData.length; i++) {
        localData[i].checkIn = bool;
    }
    var newDataSource = new kendo.data.DataSource({
        data: localData
    });
    $("#grid").data("kendoGrid").setDataSource(newDataSource);
    localStorage["grid_data"] = JSON.stringify(localData);
    conditionalSum();
    grilla("", newDataSource);
}
