var objSir = new sir();
    var urlSir = objSir.getUrlSir();
    var mapSir = objSir.getmapSir();
    var inputsir = objSir.getdataInputSir();
    var est = "uni__est";
$(document).ready(function () {
    fltrEst();
    /* variables para consumir el servicio Sir*/
    grilla();

});

function grilla(obj) {
    

    /* variables para consumir el servicio SiCud*/
    var objCud = new cud();
    var urlCud = objCud.getUrlCud();
    var mapCud = objCud.getmapCud();
    var inputCud = objCud.getdataInputCud();

    if (obj) {
        inputsir = obj;
    }

    /*variable para adicionar los campos requeridos y el tipo de dato*/
    /*editable: false --- ocultar en grilla*/
    var fieldShema = {
        uni__cod: {type: 'string'},
        uni__des: {type: 'string'},
        uni__can: {defaultValue: {value: true, text: "si"}},
        uni__est: {type: 'number'},
        uni__pes: {defaultValue: {value: true, text: "si"}},
    }

    /*variable id es el id correspondiente a la tabla a cansultar*/
    var model = {
        id: "uni__cod",
        fields: fieldShema
    };

    /*variables para adicionar los botones de la grilla*/
    var btnC = true;
    var btnUD = [
        {name: "aprobar", text: " ", click: aprobar, template: "<a class='k-grid-aprobar' '><span class='k-sprite po_cerrar'></span></a>"},
        {name: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
        {name: "Delete", click: deleteRow, template: "<a class='k-grid-Delete'><span class='k-sprite po_cerrar'></span></a>"},
    ];
    var btnDetalle = [
        {id: "play", text: " ", template: "<a class=''><span class='k-sprite re_bullet2'></span></a>"},
    ];
    //var btnDer = {command: btnDetalle, title: "&nbsp;", width: "100px" };
    var btnDer = {};
    var btnIzq = {command: btnUD, title: "&nbsp;", width: "150px"};

    /*variables para poner los campos visibles tanto en popUp como en grilla, en caso de no colocarlos no apareceran en ni en popup ni engrilla */
    /*hiden: true --- ocultar en grilla*/
    var columns = [
//        btnDer,
        {field: "uni__cod", title: "Cod. Und.Med", width: "100%"},
        {field: "uni__des", title: "Descripción", width: "100%"},
        {field: "uni__can", title: "Unidad de Cantidad", editor: uni__canList, template: "#=uni__can.text#", width: "100%"},
//        {field: "uni__est", title: "Estado", width: "100%"},
        {field: "uni__pes", title: "Unidad de Peso", editor: uni__pesList, template: "#=uni__pes.text#", width: "100%"},
        btnIzq
    ];

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSir,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            destroy: {
                url: urlCud,
                type: "DELETE",
                dataType: "json",
                contentType: "application/json"
            },
            update: {
                url: urlCud,
                type: "PUT",
                dataType: "json",
                contentType: "application/json"
            },
            create: {
                url: urlCud,
                type: "POST",
                dataType: "json",
                contentType: "application/json"
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        return JSON.stringify(inputsir);
                    } else if (operation === 'create') {
                        var key1 = Object.keys(inputCud)[0];
                        options = logicalrev(options, "uni__pes");
                        options = logicalrev(options, "uni__can");
                        options[est] = 99;
                        inputCud[key1][mapCud] = [options];
                        return JSON.stringify(inputCud);

                    } else {
                        
                        var key1 = Object.keys(inputCud)[0];
                        options = logicalrev(options, "uni__pes");
                        options = logicalrev(options, "uni__can");
                        inputCud[key1][mapCud] = [options];
                        return JSON.stringify(inputCud);
                    }
                } catch (e) {
                    alertDialogs(e.message)
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
                            e[key1][mapSir][i] = logical(e[key1][mapSir][i], "uni__pes");
                            e[key1][mapSir][i] = logical(e[key1][mapSir][i], "uni__can");
                            e[key1][mapSir][i].idpre = i;
                        }
                    }
                    return e[key1][mapSir];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: model
        },
        error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });
    if (!btnC) {
        document.getElementById("btnCrear").style.display = "none";
    }
    $(window).trigger("resize");
    $("#grid").kendoGrid({
        pageable: false,
        dataSource: dataSource,
        sortable: true,
        selectable: false,
        columns: columns,
        editable: "popup",
        dataBound: changImgFunc,
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
        edit: function (e) {
            if (!e.model.isNew()) {
                if (e.model[est] != 99) {
                    kendo.ui.progress($('.k-edit-form-container'), true);
                    kendo.ui.progress($('.k-edit-buttons'), true);
                    e.container.find(".k-loading-image").css("background-image", "url('')");
                }
                e.container.kendoWindow("title", "Editar");
            } else {
                e.container.kendoWindow("title", "Crear");
            }
        }
    });
}
function addRow() {
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
}
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 61);
});

function deleteRow(e) {
    try {

        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));

        if (dataItem[est] == 99) {
            var actions = new Array();
            actions[0] = new Object();
            actions[0].text = "OK";
            actions[0].action = function () {
                var dataSource = $("#grid").data("kendoGrid").dataSource;
                dataSource.remove(dataItem);
                dataSource.sync();
                bandAlert = 0;
            };
            actions[1] = new Object();
            actions[1].text = "Cancelar";
            actions[1].action = function () {
                bandAlert = 0;
            };
            createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.uni__des + " ---?", "400px", "200px", true, true, actions);
        } else {
            alertDialogs("El registro no puede ser eliminado.")
        }
    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}

function uni__codList(container, options) {
    var obj = new listauni__cod();
    var dataSource = obj.getdataSource();
    $('<input id="iduni__cod" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        index: 0,
    });
}

function uni__codList(container, options) {
    var obj = new listauni__cod();
    var dataSource = obj.getdataSource();
    $('<input id="iduni__cod" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        index: 0,
    });
}
function listauni__cod() {


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


function uni__desList(container, options) {
    var obj = new listauni__des();
    var dataSource = obj.getdataSource();
    $('<input id="iduni__des" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        index: 0,
    });
}

function listauni__des() {


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


function uni__canList(container, options) {
    var obj = new listauni__can();
    var dataSource = obj.getdataSource();
    $('<input id="iduni__can" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        index: 0,
    });
}

function listauni__can() {

    var dataSource = [{
            text: "si",
            value: "true"
        },
        {
            text: "no",
            value: "false"
        }
    ];
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


function uni__estList(container, options) {
    var obj = new listauni__est();
    var dataSource = obj.getdataSource();
    $('<input id="iduni__est" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        index: 0,
    });
}

function listauni__est() {


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


function uni__pesList(container, options) {
    var obj = new listauni__pes();
    var dataSource = obj.getdataSource();
    $('<input id="iduni__pes" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        index: 0,
    });
}

function listauni__pes() {
    var dataSource = [{
            text: "si",
            value: "true"
        },
        {
            text: "no",
            value: "false"
        }
    ];

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

/*******************************************************************************/
function changImgFunc(e) {
    var objClase = e.sender._data;
    for (var i = 0; i < objClase.length; i++) {
        var id = objClase[i].uni__cod;
        if (objClase[i][est] === 0) {
            $("#aprobar" + id + "")["0"].className = "k-sprite po_checkAct";
        } else if (objClase[i][est] === 1) {
            $("#aprobar" + id + "")["0"].className = "k-sprite po_checkBloq";
        } else if (objClase[i][est] === 99) {
            $("#aprobar" + id + "")["0"].className = "k-sprite po_checkCreate";
        }
    }

}
function aprobar(e) {
    try {
        var fila = $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];
        e.preventDefault();
        var dataItem = fila;


        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            if (fila[est] !== 1) {
                if (fila[est] === 99) {
                    fila[est] = 0;
                } else {
                    fila[est] = fila[est] + 1;
                }
            }
            sendAjax("PUT", [fila]);
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de modificar el estado del registro ---" + fila.uni__des + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}
function sendAjax(verHtml, obj) {
    var objCU = new cud();
    var objD = objCU.getdataInputCud();
    var urlD = objCU.getUrlCud();
    var mapDataD = objCU.getmapCud();
    var key1 = Object.keys(objD)[0];

    obj[0] = logicalrev(obj[0], "uni__pes");
    obj[0] = logicalrev(obj[0], "uni__can");
    objD[key1][mapDataD] = obj;

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
            bandAlert = 0;
        },
        error: function (e) {
            alertDialogs("Error al consumir el servicio de crear lista de precios" + e.status + " - " + e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        } else {
            alertDialogs("Problemas con el creación de crear lista de precios .\n" + permitirIngreso);
        }

    });
}
function fltrEst() {
    var data = [
        {text: "Creado", value: "99", clase: "po_checkCreate"},
        {text: "Activo", value: "0", clase: "po_checkAct"},
        {text: "Bloqueado", value: "1", clase: "po_checkBloq"}
    ];
    $("#fltrEst").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        change: onChangeFltr,
        valueTemplate: "<span>#:data.text#</span>",
        template: "<a class='k-grid-aprobar' '><span class='k-sprite #: data.clase #'></span></a>" +
                '<span class="k-state-default"><h0>#: data.text #</h0>',
        dataSource: data,
        width: 400
    });
}

function onChangeFltr() {
    var json = {
        "dsSIRgpr_lis": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRgpr_lis": [
                {
                    "picart_cod": "*",
                    "piicla_cod": 0,
                    "piilis_num": 0,
                    "picmnd_cla": "*",
                    "piilis_est": $("#fltrEst").val(),
                    "pidfecha": sessionStorage.getItem("fechaSistema"),
                }
            ]
        }
    }
    var obj = new SIRgpr_lis();
    obj.setjson(json);
    var objLPrecios = obj.getjson();
    gridListaDePrecios(json);
    urlSir = json;
}

function logical(obj, nodo) {
    if (obj[nodo]) {
        delete  obj[nodo];
        obj[nodo] = {
            text: "si",
            value: true
        };
    } else {
        delete  obj[nodo];
        obj[nodo] = {
            text: "no",
            value: false
        };
    }
    return obj;
}
function logicalrev(obj, nodo) {
    
    if (obj[nodo].value === true) {
        delete  obj[nodo];
        obj[nodo] = true;
    } else {
        delete  obj[nodo];
        obj[nodo] = false;
    }
    return obj;
}

function fltrEst() {
    var data = [
        {text: "Todos", value: "-1", clase: ""},
        {text: "Creado", value: "99", clase: "po_checkCreate"},
        {text: "Activo", value: "0", clase: "po_checkAct"},
        {text: "Bloqueado", value: "1", clase: "po_checkBloq"}
    ];
    $("#fltrEst").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        change: onChangeFltr,
        valueTemplate: "<span>#:data.text#</span>",
        template: "<a class='k-grid-aprobar' '><span class='k-sprite #: data.clase #'></span></a>" +
                '<span class="k-state-default"><h0>#: data.text #</h0>',
        dataSource: data,
        width: 400
    });
}

function onChangeFltr() {
    inputsir = {
        "dsSIRinv_uni": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRinv_uni": [
                {
                    "picuni__cod ": "*",
                    "picuni__des": "*",
                    "picuni__est": $("#fltrEst").val(),
                    "picusuario": 0
                }
            ]
        }
    }
    grilla(inputsir);
}
