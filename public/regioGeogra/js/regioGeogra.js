/* variables para consumir el servicio Sir*/
var objSir = new sir();
var urlSir = objSir.getUrlSir();
var mapSir = objSir.getmapSir();
var inputsir = objSir.getdataInputSir();
var est = "rgeo__est";

$(document).ready(function () {
    
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
    grilla();
});

function onChangeFltr() {

    objSir = new sir();
    urlSir = objSir.getUrlSir();
    mapSir = objSir.getmapSir();
    inputsir = objSir.getdataInputSir();

    var key1 = Object.keys(inputsir)[0];
    var key2 = Object.keys(inputsir[key1])[1];
    inputsir[key1][key2][0].piirgeo__est = $("#fltrEst").val();

    grilla();
}

function grilla() {
    /* variables para consumir el servicio SiCud*/
    var objCud = new cud();
    var urlCud = objCud.getUrlCud();
    var mapCud = objCud.getmapCud();
    var inputCud = objCud.getdataInputCud();

    /*variable para adicionar los campos requeridos y el tipo de dato*/
    /*editable: false --- ocultar en grilla*/
    var fieldShema = {
        rgeo__cod: {type: 'number'},
        rgeo__nom: {type: 'string'},
        ageo__cod: {type: 'string'},
        picpais: {type: 'string'},
    }

    /*variable id es el id correspondiente a la tabla a cansultar*/
    var model = {
        id: "id",
        fields: fieldShema
    };

    /*variables para adicionar los botones de la grilla*/
    var btnC = true;
    var btnUD = [
        {name: "aprobar", click: aprobarRegionGeo, template: "<a class='k-grid-aprobar' href='' style='min-width:16px;'><span class='k-sprite po_check'></span></a>"},
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
        //btnDer,
        //		{field: "rgeo__cod", title: "Codigo Region Geografica",width: "100%"},
        {field: "rgeo__nom", title: "Nombre Region Geo.", width: "100%"},
        {field: "ageo__cod", title: "Area Geográfica", editor: ageo__codList, template: "#=uni__can.text#", width: "100%", hidden: true},
        {field: "picpais", title: "País", width: "100%", editor: picpaisList, template: "#=uni__can.text#", hidden: true},
//        hidden: true 
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
                    }else if (operation === 'create') {
                        var key1 = Object.keys(inputCud)[0]
                        options[est] = 99;
                        inputCud[key1][mapCud] = [options];
                        return JSON.stringify(inputCud);
                        
                    }else {
                        var key1 = Object.keys(inputCud)[0]
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
                            e[key1][mapSir][i].id = i
                        }
                    }else{
                        grilla();
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
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
        edit: function (e) {
            if (!e.model.isNew()) {
                if (e.model[est] != 99) {                    
                    kendo.ui.progress($('.k-edit-form-container'), true);
                    kendo.ui.progress($('.k-edit-buttons'), true);
                    e.container.find(".k-loading-image").css("background-image", "url('')");
                    debugger
                    var rgeo= $("#idrgeo__cod").data("kendoDropDownList"); 
                    rgeo.value(e.model.idrgeo__cod);                   
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
            createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.rgeo__nom + " ---?", "400px", "200px", true, true, actions);
        } else {
            alertDialogs("El registro no puede ser eliminado.")
        }
    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}

function ageo__codList(container, options) {
    var obj = new listarageo__cod();
    var dataSource = obj.getdataSource();
    $('<input id="idrgeo__cod" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "ageo__nom",
        dataValueField: "ageo__cod",
        dataSource: dataSource,
        index: 0,
    });
}

function listarageo__cod() {
    /* variables para consumir el servicio Sir*/
    var objSir = new SIRgpr_ageo();
    var urlSir = objSir.getUrlSir();
    var mapSir = objSir.getmapSir();
    var inputsir = objSir.getdataInputSir();
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSir,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        return JSON.stringify(inputsir);
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
                id: "ageo__cod",
                fields: {
                    ageo__cod: {type: 'string'},
                    ageo__nom: {type: 'string'},
                }
            }
        },
        error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });
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


function picpaisList(container, options) {
    var obj = new listarpicpais();
    var dataSource = obj.getdataSource();
    $('<input id="idrgeo__nom" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        dataSource: dataSource,
        filter: "startswith",
        index: 0,
    });
}

function listarpicpais() {
    var objSir = new SIRsic_ciu_pais();
    var urlSir = objSir.getUrlSir();
    var mapSir = objSir.getmapSir();
    var inputsir = objSir.getdataInputSir();
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSir,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        return JSON.stringify(inputsir);
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
                id: "ageo__cod",
                fields: {
                    ciu__cod: {type: 'string'},
                    ciu__nom: {type: 'string'},
                }
            }
        },
        error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });

    this.setdataSource = function (newname) {
        if (newname) {
            dataSource = newname;
        }
    };
    this.getdataSource = function () {
        return dataSource;
    };
}

function aprobarRegionGeo(e) {
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
        createDialog("Atención", "Esta seguro de modificar el estado del registro ---" + fila.rgeo__nom + " ---?", "400px", "200px", true, true, actions);

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
            alertDialogs(e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        } else {
            alertDialogs(permitirIngreso);
        }

    });
}

function sendAjaxAClase(verHtml, obj) {
    var objCU = new cud();
    var objD = objCU.getdataInputCud();
    var urlD = objCU.getUrlCud();
    var mapDataD = objCU.getmapCud();
    var key1 = Object.keys(objD)[0];
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
            alertDialogs(e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        } else {
            alertDialogs(permitirIngreso);
        }

    });
}

