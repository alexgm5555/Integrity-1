/* variables para consumir el servicio Sir*/
var objSir = new sir();
var urlSir = objSir.getUrlSir();
var mapSir = objSir.getmapSir();
var inputsir = objSir.getdataInputSir();
//    var objSir = new sir();
//var urlSir = objSir.getUrlSir();
var est = "rut__est";
var clacli = "";
$(document).ready(function () {
    fltrEst();
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
        "bar__cod1": {type: 'number'},
        "bar__cod2": {type: 'number'},
        "ciu__cod1": {type: 'number'},
        "ciu__cod2": {type: 'number'},
        "rut__cod": {type: 'string'},
        "rut__des": {type: 'string'},
        "bar__dsc1": {type: 'string'},
        "bar__dsc2": {type: 'string'},
        "ciu__nom1": {type: 'string'},
        "ciu__nom2": {type: 'string'},
        "rut__est": {type: 'number'}
    };

    /*variable id es el id correspondiente a la tabla a cansultar*/
    var model = {
        id: "idpre",
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
//		btnDer,
//        {field: "bar__cod1", title:"e", width:"100%"}, 
//        {field: "bar__cod2", title:"e", width:"100%"}, 
//        {field: "ciu__cod1", title:"e", width:"100%"}, 
//        {field: "ciu__cod2", title:"e", width:"100%"}, 
        {field: "rut__cod", title: "Código Ruta", width: "100%"},
        {field: "rut__des", title: "Descripción", width: "100%"},
        {field: "ciu__cod1", title: "Ciudad Origen", editor: ciu__nom1List, width: "100%"},
        {field: "bar__cod1", title: "Barrio Origen", editor: bar__dsc1List, width: "100%"},
        {field: "ciu__cod2", title: "Ciudad Destino", editor: ciu__nom2List, width: "100%"},
        {field: "bar__cod2", title: "Barrio Destino", editor: bar__dsc2List, width: "100%"},
        //{field: "cla__nom", title: "Clase de Cliente", editor:cla__cliList,width: "100%"},
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
                        var key1 = Object.keys(inputCud)[0]
                        options[est] = 99;
                        inputCud[key1][mapCud] = [options];
                        return JSON.stringify(inputCud);

                    } else {
//                        options.ter__nit = $("#idter__nit").val();
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
                            e[key1][mapSir][i].idpre = i
                        }
                    } else {
                        grilla()
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
            e.container.find("label[for='rut__cod']").hide();
            e.container.find("input[name=rut__cod]").hide();
            if (!e.model.isNew()) {//caso en el que el popup es editar
                
                e.container.kendoWindow("title", "Editar");
                e.model.bar__dsc1 = e.model.bar__cod1
                e.model.ciu__nom1 = e.model.ciu__cod1
                e.model.bar__dsc2 = e.model.bar__cod2
                e.model.ciu__nom2 = e.model.ciu__cod2

                var json = changeInputSIRgpd_bar(e.model.ciu__nom1);
                var obj = new listabar__dsc(json);
                var dataSource = obj.getdataSource();
                $("#idbar__dsc1").data("kendoDropDownList").setDataSource(dataSource);
                $("#idbar__dsc1").data("kendoDropDownList").enable(true);
                $("#idbar__dsc1").data("kendoDropDownList").value(e.model.bar__dsc1);
                
                var json = changeInputSIRgpd_bar(e.model.ciu__nom2);
                var obj = new listabar__dsc(json);
                var dataSource = obj.getdataSource();
                $("#idbar__dsc2").data("kendoDropDownList").setDataSource(dataSource);
                $("#idbar__dsc2").data("kendoDropDownList").enable(true);
                $("#idbar__dsc2").data("kendoDropDownList").value(e.model.bar__dsc2);

                //e.container.find("input[name=ter__raz]")[0].readOnly="true"
                if (e.model[est] != 99) {

                    kendo.ui.progress($('.k-edit-form-container'), true);
                    kendo.ui.progress($('.k-edit-buttons'), true);
                    e.container.find(".k-loading-image").css("background-image", "url('')");
                }
            } else {
                e.container.kendoWindow("title", "Crear");
            }
        },
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
            createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.rut__des + " ---?", "400px", "200px", true, true, actions);
        } else {
            alertDialogs("El registro no puede ser eliminado.")
        }
    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}






function ciu__nom1List(container, options) {
    var obj = new listaciu__nom();
    var dataSource = obj.getdataSource();
    $('<input id="idciu__nom1" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        template: '<div class="divElementDropDownList">#: data.ciu__nom #</div>',
        dataSource: dataSource,
        change: onSelectciu__nom1
    });
}
function onSelectciu__nom1(e) {
    var json = changeInputSIRgpd_bar(e.sender.listView._dataItems[0].ciu__cod);
    var obj = new listabar__dsc(json);
    var dataSource = obj.getdataSource();
    $("#idbar__dsc1").data("kendoDropDownList").setDataSource(dataSource);
    $("#idbar__dsc1").data("kendoDropDownList").enable(true);
}

function ciu__nom2List(container, options) {
    var obj = new listaciu__nom();
    var dataSource = obj.getdataSource();
    $('<input id="idciu__nom2" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        template: '<div class="divElementDropDownList">#: data.ciu__nom #</div>',
        dataSource: dataSource,
        change: onSelectciu__nom6666
    });
}
function onSelectciu__nom6666(e) {
    var json = changeInputSIRgpd_bar(e.sender.listView._dataItems[0].ciu__cod);
    var obj = new listabar__dsc(json);
    var dataSource = obj.getdataSource();
    $("#idbar__dsc2").data("kendoDropDownList").setDataSource(dataSource);
    $("#idbar__dsc2").data("kendoDropDownList").enable(true);
}
function listaciu__nom() {
    var objSirUn = new SIRsic_ciu();
    var urlSirUn = objSirUn.getUrlSir();
    var mapSirUn = objSirUn.getmapSir();
    var inputsirUn = objSirUn.getdataInputSir();
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSirUn,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        return JSON.stringify(inputsirUn);
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
                    if (e[key1][mapSirUn]) {
                        for (var i = 0; i < e[key1][mapSirUn].length; i++) {
                            e[key1][mapSirUn][i].id = i;
                        }
                    } else {
                        grilla();
                    }

                    return e[key1][mapSirUn];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "ciu__cod",
                fields: {
                    ciu__nom: {type: 'string'},
                    ciu__cod: {type: 'string'},
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

function bar__dsc1List(container, options) {
    var obj = new listabar__dsc();
    var dataSource = obj.getdataSource();
    $('<input id="idbar__dsc1" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
//        cascadeFrom: "idciu__nom1",
        dataTextField: "bar__dsc",
        dataValueField: "bar__cod",
        template: '<div class="divElementDropDownList">#: data.bar__dsc #</div>',
        dataSource: {},
        change: onSelectciu__nom1
    });

}
function onSelectbar__dsc1(e) {
//    clacli = e.sender.dataSource._data[e.sender.selectedIndex].cla__cli;
}

function bar__dsc2List(container, options) {
    var obj = new listabar__dsc();
    var dataSource = obj.getdataSource();
    $('<input id="idbar__dsc2" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "bar__dsc",
        dataValueField: "bar__cod",
        template: '<div class="divElementDropDownList">#: data.bar__dsc #</div>',
        dataSource: {},
//        change: onSelectciu__nom2
    });
}
function onSelectciu__nom2(e) {
//    clacli = e.sender.dataSource._data[e.sender.selectedIndex].cla__cli;
}
function listabar__dsc(obj) {
    var objSirUn = new SIRgpd_bar();
    var urlSirUn = objSirUn.getUrlSir();
    var mapSirUn = objSirUn.getmapSir();
    var inputsirUn = objSirUn.getdataInputSir();
    if (obj) {
        inputsirUn = obj;
    }
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSirUn,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        
                        return JSON.stringify(inputsirUn);
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
                    if (e[key1][mapSirUn]) {
                        for (var i = 0; i < e[key1][mapSirUn].length; i++) {
                            e[key1][mapSirUn][i].id = i;
                        }
                    } else {
                        grilla();
                    }

                    return e[key1][mapSirUn];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "bar__cod",
                fields: {
                    bar__dsc: {type: 'string'},
                    bar__cod: {type: 'string'},
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


function rut__codList(container, options) {
    
    var obj = new listarut__cod();
    var dataSource = obj.getdataSource();
    $('<input id="iduni__cod" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "rut__des",
        dataValueField: "rut__cod",
        dataSource: dataSource,
        template: '<div class="divElementDropDownList">#: data.rut__des #</div>',
//        change: onSelect
    });
}

function listarut__cod() {
    var objSirUn = new SIRdpc_rut();
    var urlSirUn = objSirUn.getUrlSir();
    var mapSirUn = objSirUn.getmapSir();
    var inputsirUn = objSirUn.getdataInputSir();
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSirUn,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        return JSON.stringify(inputsirUn);
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
                    if (e[key1][mapSirUn]) {
                        for (var i = 0; i < e[key1][mapSirUn].length; i++) {
                            e[key1][mapSirUn][i].id = i;
                        }
                    } else {
                        grilla();
                    }

                    return e[key1][mapSirUn];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "rut__cod",
                fields: {
                    rut__des: {type: 'string'},
                    rut__cod: {type: 'string'}
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

function ter__nitList(container, options) {
    
    var obj = new listater__nit();
    var dataSource = obj.getdataSource();
    $('<input id="idter__nit" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoAutoComplete({
        dataTextField: "ter__nit",
        dataValueField: "ter__nit",
        dataSource: dataSource,
        template: '<div class="divElementDropDownList">#: data.ter__nit #' + ' - ' + ' #:data.ter__raz #</div>',
        minLength: 7,
        change: onSelectNit
    });
}

function onSelectNit(e) {
    $("#idter__raz").val(e.sender.listView._dataItems[0].ter__raz);
}
function listater__nit() {
    var objSirUn = new SIRsic_ter();
    var urlSirUn = objSirUn.getUrlSir();
    var mapSirUn = objSirUn.getmapSir();
    var inputsirUn = objSirUn.getdataInputSir();
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSirUn,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        var key1 = Object.keys(inputsirUn)[0];
                        inputsirUn[key1].eeSIRsic_ter[0].picter_nit = $("#idter__nit").val();
                        return JSON.stringify(inputsirUn);
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
                    if (e[key1][mapSirUn]) {
                        for (var i = 0; i < e[key1][mapSirUn].length; i++) {
                            e[key1][mapSirUn][i].id = i;
                        }
                    } else {
                        grilla();
                    }

                    return e[key1][mapSirUn];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "ter__nit",
                fields: {
                    ter__raz: {type: 'string'},
                    ter__nit: {type: 'string'}
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
function ter__razList(container, options) {
    
    var obj = new listater__raz();
    var dataSource = obj.getdataSource();
    $('<input id="idter__raz" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoAutoComplete({
        dataTextField: "ter__raz",
        dataValueField: "ter__raz",
        template: '<div class="divElementDropDownList">#: data.ter__raz #</div>',
        dataSource: dataSource,
        minLength: 4,
        change: onSelectRaz
    });
}
function onSelectRaz(e) {
    $("#idter__nit").val(e.sender.listView._dataItems[0].ter__nit);
}
function listater__raz() {
    var objSirUn = new SIRsic_ter();
    var urlSirUn = objSirUn.getUrlSir();
    var mapSirUn = objSirUn.getmapSir();
    var inputsirUn = objSirUn.getdataInputSir();
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSirUn,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
                        var key1 = Object.keys(inputsirUn)[0];
                        inputsirUn[key1].eeSIRsic_ter[0].picter_raz = $("#idter__raz").val();
                        return JSON.stringify(inputsirUn);
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
                    if (e[key1][mapSirUn]) {
                        for (var i = 0; i < e[key1][mapSirUn].length; i++) {
                            e[key1][mapSirUn][i].id = i;
                        }
                    } else {
                        grilla();
                    }

                    return e[key1][mapSirUn];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "ter__nit",
                fields: {
                    ter__raz: {type: 'string'},
                    ter__nit: {type: 'string'}
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

function tra__tipList(container, options) {
    
    var obj = new listatra__tip();
    var dataSource = obj.getdataSource();
    $('<input id="idutra__tip" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSource,
        placeholder: "Seleccione Tipo de ",
        template: '<div class="divElementDropDownList">#: data.value #' + ' - ' + ' #:data.text #</div>'
//        change: onSelect
    });
}

function listatra__tip() {
    var dataSource = [
        {text: "Auxiliar", value: "A"},
        {text: "Conductor", value: "C"}
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

function changeInputSIRgpd_bar(city) {
    var objSircom__nom = new SIRgpd_bar();
    var json = objSircom__nom.getdataInputSir();
    json = {
        "dsSIRgpd_bar": {
            "eeDatos": [{
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }],
            "SIRgpd_bar": [{
                    "picciu__cod": city,
                    "piibar__cod": 0,
                    "picbar__dsc": "*",
                    "picbar__est": 0
                }]
        }
    };
    return json;
}
///-----------------------------------------------------------------------------


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
            sendAjaxAClase("PUT", [fila]);
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de modificar el estado del registro ---" + fila[est] + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
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
            alertDialogs("Error al consumir el servicio de regiones geograficas" + e.status + " - " + e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        } else {
            alertDialogs("Problemas con  el servicio de regiones geograficas .\n" + permitirIngreso);
        }

    });
}
function fltrEst() {
    var data = [
        {text: "Todos", value: "-1", },
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
        "dsSIRdpc_rut": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRdpc_rut": [{
                    "piibar_cod1": 0,
                    "piibar_cod2": 0,
                    "picciu_cod1": "*",
                    "picciu_cod2": "*",
                    "piirut_est": $("#fltrEst").val()
                }]

        }
    };
    grilla(inputsir);
}


