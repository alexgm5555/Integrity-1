/* variables para consumir el servicio Sir*/
var objSir = new sir();
var urlSir = objSir.getUrlSir();
var mapSir = objSir.getmapSir();
var inputsir = objSir.getdataInputSir();
//    var objSir = new sir();
//var urlSir = objSir.getUrlSir();
var est = "tra__est";
var clacli= "";
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
        "cam__cod": {type: 'string'},
        "cam__des": {type: 'string'},
        "por__ton": {type: 'number'},
        "por__via": {type: 'number'},
        "rut__cod": {type: 'string'},
        "rut__des": {type: 'string'},
        "ter__nit": {type: 'string'},
        "ter__raz": {type: 'string'},
        "tra__est": {type: 'number'},
        "tra__tip": {type: 'string'}
    }

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
        {field: "cam__cod", title: "Tipo de Camión", editor:cam__codList,width: "100%",hidden: true},
        {field: "cam__des", title: "Tipo de Camión",width: "100%"},
        {field: "por__ton", title: "Peso por Tonelada", width: "100%",hidden: true},
        {field: "por__via", title: "Peso por viaje", width: "100%",hidden: true},
        {field: "rut__cod", title: "Nombre de Ruta",editor:rut__codList, width: "100%",hidden: true},
        {field: "rut__des", title: "Nombre de Ruta", width: "100%"},
        {field: "ter__nit", title: "Nit del transportista", editor:ter__nitList, width: "100%"},
        {field: "ter__raz", title: "Razon social",editor:ter__razList, width: "100%"},
//        {field: "tra__emp", title: "Indicativo Empleado", width: "100%",hidden: true}, 
        //{field: "tra__est", title: "Estado de transportista ", width: "100%",hidden: true}, 
        {field: "tra__tip", title: "Tipo de Transportador", editor:tra__tipList,width: "100%",hidden: true}, //Tipo de Transportador: A=Auxiliar,   C=Conductor
        
        
        
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
                        options.tra__emp = true;
                        options.ter__nit = $("#idter__nit").val();
                        inputCud[key1][mapCud] = [options];
                        return JSON.stringify(inputCud);

                    } else {
                        if($("#idter__nit").val()){
                            options.ter__nit = $("#idter__nit").val();
                        }                        
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
                    }
                    else{grilla()}
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
        editable:  {
            mode: "popup",
            window: {
                title: "Editar",
                animation: false,
                width: 600
            }
        } ,
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
        edit: function (e) {
            
            e.container.kendoWindow("title", "Editar");
                e.container.find("label[for='rut__des']").hide();
                e.container.find("input[name=rut__des]").hide();
                e.container.find("label[for='cam__des']").hide();
                e.container.find("input[name=cam__des]").hide();
                
            if (!e.model.isNew()) {//caso en el que el popup es editar
                e.container.kendoWindow("title", "Editar");
                var kendoAutoCompleteNIT = $("#idter__nit").data("kendoAutoComplete");
                kendoAutoCompleteNIT.enable(false);
                
                var kendoAutoCompleteNIT = $("#idter__raz").data("kendoAutoComplete");
                kendoAutoCompleteNIT.enable(false);
                
                var dropDownListCamion= $("#iduni__cod").data("kendoDropDownList"); 
                dropDownListCamion.enable(false);
                
                var dropDownListRuta= $("#idRut__cod").data("kendoDropDownList"); 
                dropDownListRuta.enable(false);
                
                var dropDownList= $("#ipDivisa").data("kendoDropDownList"); 
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
            createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.ter__raz + " ---?", "400px", "200px", true, true, actions);
        } else {
            alertDialogs("El registro no puede ser eliminado.")
        }
    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}






function cam__codList(container, options) {
    
    var obj = new listacam__cod();
    var dataSource = obj.getdataSource();
    $('<input id="iduni__cod" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "cam__des",
        dataValueField: "cam__cod",
        template:'<div class="divElementDropDownList">#: data.cam__des #</div>',
        dataSource: dataSource,
        
//        change: onSelect
    });
}
//function onSelect(e){
//    clacli = e.sender.dataSource._data[e.sender.selectedIndex].cla__cli;
//}
function listacam__cod() {
    var objSirUn = new SIRdpc_cam();
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
                id: "cam__cod",
                fields: {
                    cam__des: {type: 'string'},
                    cam__cod: {type: 'string'},
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
    $('<input id="idRut__cod" data-bind="value: ' + options.field + '" />"').appendTo(container).kendoDropDownList({
        dataTextField: "rut__des",
        dataValueField: "rut__cod",
        dataSource: dataSource,
        template:'<div class="divElementDropDownList">#: data.rut__des #</div>',
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
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
        minLength: 7,
        change: onSelectNit
    });
}

function onSelectNit(e){
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
        template:'<div class="divElementDropDownList">#: data.ter__raz #</div>',
        dataSource: dataSource,
         minLength: 4,
        change: onSelectRaz
    });
}
function onSelectRaz(e){
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
        template:'<div class="divElementDropDownList">#: data.value #'+' - '+' #:data.text #</div>'
//        change: onSelect
    });
}

function listatra__tip() {
    var dataSource = [
                        { text: "Auxiliar", value: "A" },
                        { text: "Conductor", value: "C" }
                    ];;

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
            alertDialogs("Error al consumir el servicio de transportistas" + e.status + " - " + e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        } else {
            alertDialogs("Problemas con el servicio de transportistas.\n" + permitirIngreso);
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
        "dsSIRdpc_tra": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRdpc_tra": [
                {
                    "picter_nit": "*",
                    "piirut_cod": 0,
                    "piicam_cod": 0,
                    "piitra_est": $("#fltrEst").val()
                }
            ]
        }
    };
    grilla(inputsir);
}
 

