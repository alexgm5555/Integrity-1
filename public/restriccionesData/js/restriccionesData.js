

var objSirC = new sirCampos();
var urlSirC = objSirC.getUrlSir();
var mapSirC = objSirC.getmapSir();
var inputsirC = objSirC.getdataInputSir();

var objSirD = new sirDatos();
var urlSirD = objSirD.getUrlSir();
var mapSirD = objSirD.getmapSir();
var inputsirD = objSirD.getdataInputSir();
var verboHtmlD = "";
var selectedArbol = '';
$(document).ready(function () {
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
    arbolJefe();


    llenarComboKendoCampos("ventanaCampos");
    llenarComboKendoCampos("ventanaDatos");

});

/*
 * reestructura el json que esta en menuJsonIni y lo trasnforma de tal forma que sea util para enviarlo a la pag tree2.html la cual muestra una arbol
 */
function arbolJefe() {
    try {
        var objSirA = new SIRJefeCargos();
        var urlSirA = objSirA.getUrlSir();
        var mapSirA = objSirA.getmapSir();
        var inputsirA = objSirA.getdataInputSir();

        var jsonResp = "";
        var permitirIngreso;
        $.ajax({
            type: "POST",
            data: JSON.stringify(inputsirA),
            url: urlSirA,
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {

                var key1 = Object.keys(resp)[0];
                permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
                jsonResp = resp;
            },
            error: function (e) {
                alertDialogs("Error" + JSON.stringify(e));
            }
        }).done(function () {

            if (permitirIngreso === '"OK"') {
                var key1 = Object.keys(jsonResp)[0];
                var dataarbol = JSON.stringify(jsonResp[key1][mapSirA]);
                if (dataarbol) {
                    dataarbol = dataarbol.replace(/usr__codjef/g, "parent");
                    dataarbol = dataarbol.replace(/usr__cod/g, "id");

                    dataarbol = dataarbol.replace(/usrnom/g, "text");
                    dataarbol = dataarbol.replace(/\"usr__jef\":true/g, "\"icon\":\"../../css/images/usuario-01.png\"");
                    dataarbol = dataarbol.replace(/\"usr__jef\":false/g, "\"icon\":\"../../css/images/usuario-02.png\"");
                    txtJson = "{ \"plugins\" : [\"search\"],\"core\" : { \"data\" : " + dataarbol + "},\"search\": {\"case_insensitive\": true,\"show_only_matches\" : true}}";
//                 
                    var usuario = jsonResp[key1].ttxsic_usr["0"]
                    var arbol = JSON.parse(txtJson);

                    arbol.core.data.push({
                        "pindicador": 0,
                        "id": usuario.usr__cod,
                        "text": sessionStorage.getItem("usrnom"),
                        "icon": "../../css/images/usuario-01.png",
                        "parent": "#",
                        "car__cod": 0,
                        "car__nom": ""
                    });
                    showArbol(arbol);
                }
            } else {
                alertDialogs(permitirIngreso);
            }
        });


    } catch (e) {
        alertDialogs(e.message);
    }
}

function grillaCampos(obj) {

    /* variables para consumir el servicio SiCud*/
    var objCud = new cudCampos();
    var urlCudC = objCud.getUrlCud();
    var mapCudC = objCud.getmapCud();
    var inputCudC = objCud.getdataInputCud();

    if (obj) {
        inputsirC = obj;
    }

    /*variable para adicionar los campos requeridos y el tipo de dato*/
    /*editable: false --- ocultar en grilla*/
    var fieldShema = {
        cmp_desc: {type: 'string'},
    }

    /*variable id es el id correspondiente a la tabla a cansultar*/
    var model = {
        id: "id",
        fields: fieldShema
    };

    /*variables para adicionar los botones de la grilla*/
    var btnC = true;
    var btnUD = [
        {name: "Delete", click: deleteRowCampos, template: "<a class='k-grid-Delete'><span class='k-sprite po_cerrar'></span></a>"},
    ];
    var btnDetalle = [
        {id: "play", text: " ", template: "<a class=''><span class='k-sprite re_bullet2'></span></a>"},
    ];
    var btnDer = {};

    var btnIzq = {command: btnUD, title: "&nbsp;", width: "50px"};

    var columns = [
        {field: "cmp_desc", title: "Campo", width: "100%"},
        btnIzq
    ];

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSirC,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            },
            destroy: {
                async: false,
                url: urlCudC,
                type: "DELETE",
                dataType: "json",
                contentType: "application/json"
            },
            parameterMap: function (options, operation) {
                try {
                    verboHtmlD = operation;
                    if (operation === 'read') {
                        return JSON.stringify(inputsirC);
                    } else {
                        var key1 = Object.keys(inputCudC)[0];
                        inputCudC[key1][mapCudC] = [options];

                        return JSON.stringify(inputCudC);
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
                    if (e[key1][mapSirC]) {
                        for (var i = 0; i < e[key1][mapSirC].length; i++) {
                            e[key1][mapSirC][i].id = i;
                        }
                    } else {
                        if (verboHtmlD !== "read") {
                            clickArbol(selectedArbol);
                        }
                    }
                    return e[key1][mapSirC];
                } else {
//                    clickArbol(sele  ctedArbol);
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: model
        },
        error: function (e) {
            var key1 = Object.keys(e.xhr.responseJSON)[0];

            if (verboHtmlD !== "read") {
                clickArbol(selectedArbol);
            }
            alertDialogs("Grilla Campos: " + e.xhr.responseJSON[key1].eeEstados[0].Estado);
        }
    });
    if (!btnC) {
        document.getElementById("btnCrear").style.display = "none";
    }
    $(window).trigger("resize");
    $("#gridCampos").kendoGrid({
        pageable: false,
        dataSource: dataSource,
        sortable: true,
        selectable: false,
        columns: columns,
        editable: "popup"
    });
}
function grillaDatos(obj) {

    var objSirD = new sirDatos();
    var urlSirD = objSirD.getUrlSir();
    var mapSirD = objSirD.getmapSir();
    var inputsirD = objSirD.getdataInputSir();

    /* variables para consumir el servicio SiCud*/
    var objCud = new cudCampos();
    var urlCudD = objCud.getUrlCud();
    var mapCudD = objCud.getmapCud();
    var inputCudD = objCud.getdataInputCud();

    /* variables para consumir el servicio SiCud*/
    if (obj) {
        inputsirD = obj;
    }

    /*variable para adicionar los campos requeridos y el tipo de dato*/
    /*editable: false --- ocultar en grilla*/
    var fieldShema = {
        cmp_desc: {type: 'string'},
        seg_val: {type: 'string'},
    }

    /*variable id es el id correspondiente a la tabla a cansultar*/
    var model = {
        id: "id",
        fields: fieldShema
    };

    /*variables para adicionar los botones de la grilla*/
    var btnC = true;
    var btnUD = [
        {name: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
        {name: "Delete", click: deleteRowDatos, template: "<a class='k-grid-Delete'><span class='k-sprite po_cerrar'></span></a>"},
    ];
    var btnDetalle = [
        {id: "play", text: " ", template: "<a class=''><span class='k-sprite re_bullet2'></span></a>"},
    ];
    var btnDer = {};
    var btnIzq = {command: btnUD, title: "&nbsp;", width: "100px"};

    var columns = [
        {field: "cmp_desc", title: "Campo", width: "100%"},
        {field: "seg_val", title: "&nbsp;", width: "100%"},
        btnIzq
    ];

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSirD,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: 'json'
            },
            destroy: {
                async: false,
                url: urlCudD,
                type: "DELETE",
                dataType: "json",
                contentType: "application/json"
            },
            update: {
                async: false,
                url: urlCudD,
                type: "PUT",
                dataType: "json",
                contentType: "application/json"
            },
            create: {
                async: false,
                url: urlCudD,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                success: function () {
                    alert("hola")
                }
            },
            parameterMap: function (options, operation) {
                try {
                    verboHtmlD = operation;
                    if (operation === 'read') {
                        return JSON.stringify(inputsirD);
                    }else if(operation === 'destroy'){
                        debugger
                        var key1 = Object.keys(inputCudD)[0];
                        inputCudD[key1][mapCudD] = [options];
                        return JSON.stringify(inputCudD);
                    } else {
                        var key1 = Object.keys(inputCudD)[0];
                        var cmp = options.restrDato;
                        options.cmp_nom = cmp;
                        options.usr__cod = selectedArbol;
                        options.seg_tip = true;
                        delete options["restrDato"];
                        inputCudD[key1][mapCudD] = [options];

                        return JSON.stringify(inputCudD);

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
                    if (e[key1][mapSirD]) {
                        for (var i = 0; i < e[key1][mapSirD].length; i++) {
                            e[key1][mapSirD][i].id = i;
                        }
                    } else {
                        if (verboHtmlD !== "read") {
                            clickArbol(selectedArbol);
                        }
                    }
                    return e[key1][mapSirD];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: model
        },
        error: function (e) {
            var key1 = Object.keys(e.xhr.responseJSON)[0];
            if (verboHtmlD !== "read") {
                clickArbol(selectedArbol);
            }
            alertDialogs("Grilla Datos: " + e.xhr.responseJSON[key1].eeEstados[0].Estado);
        },
    });
    if (!btnC) {
        document.getElementById("btnCrear").style.display = "none";
    }
    $(window).trigger("resize");
    $("#restDatos").kendoGrid({
        pageable: false,
        dataSource: dataSource,
        sortable: true,
        selectable: false,
        columns: columns,
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplateDatos").html()),
        altRowTemplate: kendo.template($("#altRowTemplateDatos").html()),
        edit: function (e) {
            try {
                if (!e.model.isNew()) {//caso en el que el popup es editar

                    e.container.kendoWindow("title", "Editar");
                    e.container.find("label")[1].innerHTML = 'Dato Retringido';
                    e.sender._data["0"].restrDato = e.sender._data["0"].cmp_nom;
//                Buscarlabel.style
                    e.container.find("input[name=cmp_desc]")[0].style.display = "none";
                    e.container.find(".k-button.k-grid-update")[0].innerText = "Guardar";
                    //e.container.find("input[name=ter__raz]")[0].readOnly="true"
//                if (e.model[est] != 99) {
//                    kendo.ui.progress($('.k-edit-form-container'), true);
//                    kendo.ui.progress($('.k-edit-buttons'), true);
//                    e.container.find(".k-loading-image").css("background-image", "url('')");
//                }
                } else {
                    e.container.kendoWindow("title", "Crear");
                    e.container.find("label")[1].innerHTML = 'Dato Retringido';
                    e.sender._data["0"].restrDato = $('#campoventanaDatos').data('kendoDropDownList').value();
                    e.sender._data["0"].cmp_desc = $('#campoventanaDatos').data('kendoDropDownList').text();
                    e.container.find("input[name=cmp_desc]")[0].style.display = "none";
                    e.container.find(".k-button.k-grid-update")[0].innerText = "Enviar";
                    ////caso en el que el popup es crear
//                Buscarlabel = buscarlabel.prevObject[3];
//                Buscarlabel.style.display = "none";
                    //e.container.find("label[name=sre__cod]")[0].display="none";
                }
            } catch (f) {
                alertDialogs(f);
            }

        }
    });

}

function addRow() {
    var grid = $("#restDatos").data("kendoGrid");
    grid.addRow();
    //clickArbol(selectedArbol);
}
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 350);
    $('#outerWrapper2').height(viewportHeight - 350);

});

function deleteRowCampos(e) {
    try {

        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#gridCampos").data("kendoGrid").dataItem($(e.target).closest("tr"));

        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            var dataSource = $("#gridCampos").data("kendoGrid").dataSource;
            dataSource.remove(dataItem);
            dataSource.sync();
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.cmp_nom + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        $("#gridCampos").data('kendoGrid').dataSource.read();
        $("#gridCampos").data('kendoGrid').refresh();
    }
}
function deleteRowDatos(e) {
    try {

        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#restDatos").data("kendoGrid").dataItem($(e.target).closest("tr"));

        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            var dataSource = $("#restDatos").data("kendoGrid").dataSource;
            dataSource.remove(dataItem);
            dataSource.sync();
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.cmp_nom + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        $("#restDatos").data('kendoGrid').dataSource.read();
        $("#restDatos").data('kendoGrid').refresh();
    }
}

/**
 * llena los campos anexo y campo 
 * @param {type} urlServ url del servicio
 * @param {type} idCmp id del combbox
 * @param {type} field campo que quiero coger si tubiera muchos campos en el servicio
 * @returns {undefined}
 */
function llenarComboKendoCampos(tab) {
    var objSirAnx = new SIRrep_anx();
    var urlSirAnx = objSirAnx.getUrlSir();
    var mapSirAnx = objSirAnx.getmapSir();
    var inputsirAnx = objSirAnx.getdataInputSir();

//        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
    var anexo = $("#" + "anexo" + tab).kendoAutoComplete({
        placeholder: "Seleccione Uno",
        dataTextField: "anx_des",
        dataValueField: "anx_des",
        minLength: 3,
        select: eval("onSelectAnex" + tab),
        dataSource: {
            transport: {
                read: {
                    url: urlSirAnx,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST",
                },
                parameterMap: function (options, operation) {
                    if (operation === 'read') {
                        var key1 = Object.keys(inputsirAnx)[0];
                        inputsirAnx[key1].SIRrep_anx[0].picanx_des = $("#" + "anexo" + tab).val();
                        return JSON.stringify(inputsirAnx);
                    }
                }
            },
            batch: false,
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado.indexOf("OK") === 0) {
                        return e[key1][mapSirAnx];
                    } else {
//                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "anx_nom",
                    fields: {
                        anx_des: {validation: {required: true}, type: 'string'}
                    }
                }
            }
        },
    }).data("kendoAutoComplete");


}

/**
 * funcion que captura el anexo seleccionado y cambia el elemento #campo en la vista opc campos
 * @param {type} e
 * @returns {onSelectAnexventanaCampos}
 */
function onSelectAnexventanaCampos(e) {
    onSelectAnexo("campoventanaCampos", e, this);
}

/**
 * funcion que captura el anexo seleccionado y cambia el elemento #campo en la vista opc campos
 * @returns 
 */
function onSelectAnexventanaDatos(e) {
    onSelectAnexo("campoventanaDatos", e, this);
}

function onSelectAnexo(idElement, e, anexo) {
    $("#" + idElement).removeClass();
    $("#" + idElement).prop('disabled', false);
    var dataItem = anexo.dataItem(e.item.index());
    var anxNom = dataItem.id;
    var objSirAnxCmp = new SIRrep_anx_cmp();
    var urlSirAnxCmp = objSirAnxCmp.getUrlSir();
    var mapSirAnxCmp = objSirAnxCmp.getmapSir();
    var inputsirAnxCmp = objSirAnxCmp.getdataInputSir();

    var obj = {
        "dsSIRrep_anx_cmp": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRrep_anx_cmp": [
                {
                    "picanxnom": anxNom,
                    "picusuario": sessionStorage.getItem("usuario"),
                }
            ]
        }
    };
//    $("#campoventanaCampos").data("kendoDropDownList").value("");
    $("#" + idElement).kendoDropDownList({
        autoBind: false,
        optionLabel: "Seleccionar Campo...",
        dataTextField: "cmp_dsc",
        dataValueField: "cmp_nom",
        dataSource: {
            transport: {
                read: {
                    url: urlSirAnxCmp,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST",
                },
                parameterMap: function (options, operation) {
                    if (operation === 'read') {
                        return JSON.stringify(obj);
                    }
                }
            },
            batch: false,
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado.indexOf("OK") === 0) {
                        return e[key1][mapSirAnxCmp];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cmp_id",
                    fields: {
                        cmp_dsc: {validation: {required: true}, type: 'string'}
                    }
                }
            }
        }
    }).data("kendoDropDownList");
}

function ajaxCamposDatos(url, objC, map) {
    try {


        var permitirIngreso = '';
        var jsonResp = '';
        $.ajax({
            async: false,
            type: "POST",
            data: JSON.stringify(objC),
            url: url,
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {

                var key1 = Object.keys(resp)[0];
                permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
//                jsonResp = resp;
            },
            error: function (e) {
                clickArbol(selectedArbol);
                alertDialogs("Error al consumir el servicio de CrearCampos" + e.status + " - " + e.statusText);
            }
        }).done(function () {
            if (permitirIngreso === '"OK"') {
                clickArbol(selectedArbol);
            } else {
                alertDialogs("Error al consumir el servicio " + permitirIngreso);
            }
        });
    } catch (e) {
        alertDialogs("Function: clickCrearCampo Error" + e.message);
    }
}





function clickArbol(txt) {
    try {
        var objSirCa = new sirCampos();
        var inputsirCa = objSirCa.getdataInputSir();
        inputsirCa.dsSIRsic_seg.eeSIRsic_seg["0"].pilsegtip = false;
        inputsirCa.dsSIRsic_seg.eeSIRsic_seg["0"].picusrcod = txt;
        var objSirDa = new sirDatos();
        var inputsirDa = objSirDa.getdataInputSir();
        inputsirDa.dsSIRsic_seg.eeSIRsic_seg["0"].pilsegtip = true;
        inputsirDa.dsSIRsic_seg.eeSIRsic_seg["0"].picusrcod = txt;

        grillaCampos(inputsirCa);
        grillaDatos(inputsirDa);
        $('#btnAddCampos').show();
        $('#btnAddDatos').show();
    } catch (e) {
        alert(e.message + " clickArbol");
    }
}

function showArbol(json) {
    $('#jstree').jstree(json);

    $('#jstree').on('click', function () {
        var id = $('#jstree').jstree(true).get_selected();
        for (var i = 0; i < id.length; i++) {
            if ($('#jstree').jstree(true).is_open(id[i])) {
                $('#jstree').jstree(true).close_node(id[i]);
            } else {
                $('#jstree').jstree(true).open_node(id[i]);

            }
            if (!$('#jstree').jstree(true).is_parent(id[i])) {
                selectedArbol = id[i];
                clickArbol(id[i]);
            }
        }
    });
}

function clickCrearCampos() {
    if ($('#campoventanaCampos').val() !== "") {
        var campo = $('#campoventanaCampos').data('kendoDropDownList').value();
        var campoTexto = $('#campoventanaCampos').data('kendoDropDownList').text();
        var objCudCampos = new cudCampos();
        var urlCud = objCudCampos.getUrlCud();
        var mapCud = objCudCampos.getmapCud();
//    var inputCud = objCudCampos.getdataInputSir();

        var obj = {
            "dsSICUDsic_seg": {
                "eeDatos": [{
                        "picusrcod": sessionStorage.getItem("usuario"),
                        "picfiid": sessionStorage.getItem("picfiid"),
                        "local_ip": sessionStorage.getItem("ipPrivada"),
                        "remote_ip": sessionStorage.getItem("ipPublica")
                    }],
                "eesic_seg": [{
                        "usr__cod": selectedArbol,
                        "seg_tip": false,
                        "cmp_nom": campo,
                        "seg_val": "",
                        "cmp_desc": campoTexto
                    }]
            }
        };
        ajaxCamposDatos(urlCud, obj, mapCud);
//    clickArbol(selectedArbol);
    }
}

function clickCrearDatos() {
    if ($('#campoventanaDatos').val() !== "") {
        addRow();
    }

}

