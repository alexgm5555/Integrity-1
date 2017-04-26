/* variables para consumir el servicio Sir*/
var objSir = new sir();
var urlSir = objSir.getUrlSir();
var mapSir = objSir.getmapSir();
var inputsir = objSir.getdataInputSir();
//    var objSir = new sir();
//var urlSir = objSir.getUrlSir();
var est = "pre__est";
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
        cta__cod: {type: 'string'},
        cta__nom: {type: 'string'},
        cta__grp: {type: 'string'},
        niv__cod: {type: 'string'},
        cta__mov: {type: 'string'},
        cpt__cod: {type: 'string'},
        cta__cen: {type: 'string'},
        cta__snit: {type: 'string'},
        cta__pres: {type: 'string'},
        cta__est: {type: 'string'},
        anf__cod: {type: 'number'},
        cta__tip: {type: 'number'},   
        anx__cod: {type: 'number'},
        anxtribnom: {type: 'string'},
        anxfinnom: {type: 'string'}
    }

    /*variable id es el id correspondiente a la tabla a cansultar*/
    var model = {
        id: "cta__cod",
        fields: fieldShema
    };

    /*variables para adicionar los botones de la grilla*/
    var btnC = true;
    var btnUD = [
        {name: "edit", text: {update: "Actualizar"}, template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
//        {name: "Delete", click: deleteRow, template: "<a class='k-grid-Delete'><span class='k-sprite po_cerrar'></span></a>"},
    ];
    var btnDetalle = [
        {id: "play", text: " ", template: "<a class=''><span class='k-sprite re_bullet2'></span></a>"},
    ];
    
    var btnDer = {};
    var btnIzq = {command: btnUD, title: "&nbsp;", width: "50px"};

    /*variables para poner los campos visibles tanto en popUp como en grilla, en caso de no colocarlos no apareceran en ni en popup ni engrilla */
    /*hidden: true --- ocultar en grilla*/
    var columns = [
        {field: "cta__cod", title: "P.U.C", width: "100%", editor: cuentaPUC},
        {field: "cta__nom", title: "Nombre", width: "100%", editor: nombre},
        {field: "cta__mov", title: "Movimiento", width: "100%", editor: movimiento},        
        {field: "anx__cod", title: "Anexo tributario", width: "100%", editor: anexoTributario},
        {field: "cpt__cod", title: "Concepto tributario", width: "100%", hidden: true, editor: conceptoTri},
        {field: "cta__cen", title: "Centro de costo", width: "100%", hidden: true, editor: centroCosto},
        {field: "cta__snit", title: "Maneja NIT", width: "100%", hidden: true, editor: manejaNIT},
        {field: "cta__pres", title: "Presupuesto", width: "100%", hidden: true, editor: presupuesto},        
        {field: "anf__cod", title: "Anexo financiero", width: "100%", editor: anexofinanciero},
        {field: "cta__tip", title: "Tipo cuenta", width: "100%", hidden: true, editor: tipoCuenta},
        {field: "cta__est", title: "Estado", width: "70px"},
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
                        
                        options["cta__grp"] = $("#cuentaPUC").val().substr(0,1);
                        options["niv__cod"] = nivel($("#cuentaPUC").val());
                        
                        inputCud[key1][mapCud] = [options];
                        return JSON.stringify(inputCud);

                    } else {
                        var key1 = Object.keys(inputCud)[0]
                        inputCud[key1][mapCud] = [options];
                        return JSON.stringify(inputCud);
                    }
                } catch (e) {
                    alertDialogs(e.message)
                }
            }
        },
        sortable: {
            mode: "single",
            allowUnsort: false
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
        filterable: true,
        columns: columns,
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
        edit: function (e) {
            
             e.container.find("label[for='cta__est']").hide();
             e.container.find("input[name=cta__est]").hide();

            if (!e.model.isNew()) {//caso en el que el popup es editar                                
                e.container.kendoWindow("title", "Editar");      
                
                $("#cuentaPUC").prop("disabled", true).addClass("k-state-disabled");
                $("#nombre").prop("disabled", true).addClass("k-state-disabled");
                
                
                if(e.model.cta__mov === "false"){                    
                    var dropDownListCentroCosto= $("#centroCosto").data("kendoDropDownList"); 
                    dropDownListCentroCosto.enable(false);
                    
                    var dropDownListPresupuesto= $("#presupuesto").data("kendoDropDownList"); 
                    dropDownListPresupuesto.enable(false);
                    
                    var dropDownListManejaNIT= $("#manejaNIT").data("kendoDropDownList"); 
                    dropDownListManejaNIT.enable(false);
                    
                    var dropDownListTipoCuenta= $("#tipoCuenta").data("kendoDropDownList"); 
                    dropDownListTipoCuenta.enable(false);
                    
                    var dropDownListAnexofinanciero= $("#anexofinanciero").data("kendoDropDownList"); 
                    dropDownListAnexofinanciero.enable(false);
                    
                    var dropDownListAnexoTributario= $("#anexoTributario").data("kendoDropDownList"); 
                    dropDownListAnexoTributario.enable(false);
                    
                    var dropDownListAnexoTributario= $("#conceptoTributario").data("kendoDropDownList"); 
                    dropDownListAnexoTributario.enable(false);
                }                
            } else {
                e.container.find("a.k-button.k-button-icontext.k-primary.k-grid-update")["0"].innerText = "Guardar"
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
            createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.pre__des + " ---?", "400px", "200px", true, true, actions);
        } else {
            alertDialogs("El registro no puede ser eliminado.")
        }
    } catch (e) {
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
}


///-----------------------------------------------------------------------------

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
            alertDialogs("Error al consumir el servicio de  ciudades" + e.status + " - " + e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        } else {
            alertDialogs("Problemas con elel servicio de ciudades.\n" + permitirIngreso);
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
        "dsSIRgpr_pre": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRgpr_pre": [
                {
                    "picpre__pcod": "*",
                    "picusuario": "*",
                    "piipre__est": $("#fltrEst").val()
                }
            ]
        }
    }
    grilla(inputsir);
}

function cuentaPUC(container, options) {      
    $('<input class="k-textbox" id = "cuentaPUC" required onBlur="verificarCuenta()"  name="' + options.field + '"/>')
            .appendTo(container);
}

function nombre(container, options) {      
    $('<input class="k-textbox" id = "nombre" required name="' + options.field + '"/>')
            .appendTo(container);
}

function centroCosto(container, options) {    
    var data = [
        {text: "Si", value: "true"},
        {text: "No", value: "false"},
    ];
    
    $('<input  id = "centroCosto" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data, 
        
    });
}

function movimiento(container, options) {    
    var data = [
        {text: "Si", value: "true"},
        {text: "No", value: "false"},
    ];
    
    $('<input  id = "movimiento" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({        
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data        
    });
}

function manejaNIT(container, options) {    
    var data = [
        {text: "Si", value: "true"},
        {text: "No", value: "false"},
    ];
    
    $('<input  id = "manejaNIT" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data        
    });
}

function presupuesto(container, options) {    
    var data = [
        {text: "Si", value: "true"},
        {text: "No", value: "false"},
    ];
    
    $('<input  id = "presupuesto" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({        
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data        
    });
}

function tipoCuenta(container, options) {    
    var data = [
        {text: "NO APLICA", value: 0},
        {text: "IVA", value: 1},
        {text: "Retención", value: 2},
        {text: "ReteICA", value: 3},
        {text: "ReteIVA", value: 4}
    ];
    
    $('<input  id = "tipoCuenta" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({        
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data        
    });
}

function anexofinanciero(container, options) {
    
    var consultar = new sirAnexoFinanciero();
    var datajson = consultar.getdataInputSir();
    var urlService = consultar.getUrlSir();
    var mapCud1 = consultar.getmapSir();
    
    $('<input  id = "anexofinanciero" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
        dataTextField: "anf__des",
        dataValueField: "anf__cod",
        autoClose: true,        
        template:'<div class="divElementDropDownList">#: data.anf__des #</div>',  
        change: function (e){
            if($("#anexofinanciero").val()!=="0"){
                var dropDownListAnexoTributario= $("#anexoTributario").data("kendoDropDownList");
                dropDownListAnexoTributario.value("0");  
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
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "anf__cod",
                    fields: {
                        anf__cod: {editable: false, nullable: false},
                        anf__des: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}

function anexoTributario(container, options) {
    
    var consultar = new sirAnexoTributario();
    var datajson = consultar.getdataInputSir();
    var urlService = consultar.getUrlSir();
    var mapCud1 = consultar.getmapSir();
    
    $('<input  id = "anexoTributario" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "anx__nom",
        dataValueField: "anx__cod",
        autoClose: true,
        dataBound: function (e){
            
            if($("#anexoTributario").val()==="0"){
                var dropDownListConceptoTributario= $("#conceptoTributario").data("kendoDropDownList"); 
                dropDownListConceptoTributario.value("0");
                dropDownListConceptoTributario.enable(false);
                
                var dropDownListTipoCuenta= $("#tipoCuenta").data("kendoDropDownList"); 
                dropDownListTipoCuenta.value("0");
                dropDownListTipoCuenta.enable(false);
            }
        },
        change: function (e){
            
            if($("#anexoTributario").val()==="0"){
                var dropDownListConceptoTributario= $("#conceptoTributario").data("kendoDropDownList"); 
                dropDownListConceptoTributario.value("0");
                dropDownListConceptoTributario.enable(false);
                
                var dropDownListTipoCuenta= $("#tipoCuenta").data("kendoDropDownList"); 
                dropDownListTipoCuenta.val("0");
                dropDownListTipoCuenta.enable(false);
            }else{
                var dropDownListAnexofinanciero= $("#anexofinanciero").data("kendoDropDownList");
                dropDownListAnexofinanciero.value("0");                
                
                var dropDownListConceptoTributario= $("#conceptoTributario").data("kendoDropDownList");                 
                dropDownListConceptoTributario.enable(true);
                
                var dropDownListTipoCuenta= $("#tipoCuenta").data("kendoDropDownList"); 
                dropDownListTipoCuenta.enable(true);
            }
        },
        template:'<div class="divElementDropDownList">#: data.anx__nom #</div>',  
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
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "anx__cod",
                    fields: {
                        anx__cod: {editable: false, nullable: false},
                        anx__nom: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}

function conceptoTri(container, options) {
    
    var consultar = new sirConceptoTributario();
    var datajson = consultar.getdataInputSir();
    var urlService = consultar.getUrlSir();
    var mapCud1 = consultar.getmapSir();
    
    $('<input  id = "conceptoTributario" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
        dataTextField: "cpt__nom",
        dataValueField: "cpt__cod",
        autoClose: true,
        template:'<div class="divElementDropDownList">#: data.cpt__nom #</div>',  
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
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cpt__cod",
                    fields: {
                        cpt__cod: {editable: false, nullable: false},
                        cpt__nom: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}

function nivel(cuentaPUC){ 
    
    var nivel;
    if(cuentaPUC.length===1){
        nivel = 1;
    }else if(cuentaPUC.length===2){
        nivel = 2;
    }else{
        cuentaPUC = cuentaPUC.substr(2); 
        nivel = (cuentaPUC.length/2)+2
    }
    return nivel;
}

function verificarCuenta(){
    var msj = "";
    var cuentaPUC = $("#cuentaPUC").val();
    
    if(cuentaPUC.length%2===1&&cuentaPUC.length!==1){
        alertDialogs("Cuenta contable invalida");
    }else{
        var obj = new sir();
        var objJson = obj.getdataInputSir();
        var url = obj.getUrlSir();
        var mapData = obj.getmapSir();
        
        var key1 = Object.keys(objJson)[0];
        var key2 = Object.keys(objJson[key1])[1];
        objJson[key1][key2][0].picctacod = cuentaPUC;
        
        $.ajax({
            type: "POST",
            data: JSON.stringify(objJson),
            url: url,
            dataType: "json",        
            contentType: "application/json;",
            success: function (e) {                
                    
            } 
        }).done(function(e){   
            
            var key1 = Object.keys(objJson)[0];               
            if((e[key1].eeEstados["0"].Estado)==="OK" && e[key1][mapData].length===1)
            {    
                alertDialogs("La cuenta contable ya existe");
            }else{
                validarNivelSuperior();
            }
        });
    }    
    
}

function validarNivelSuperior(){
    
    var msj = "";
    var cuentaPUC = $("#cuentaPUC").val();
    
    var obj = new validaDigitos();
    var objJson = obj.getdataInputSir();
    var url = obj.getUrlSir();
    var mapData = obj.getmapSir();
    
    var key1 = Object.keys(objJson)[0];
    var key2 = Object.keys(objJson[key1])[1];
    objJson[key1][key2][0].picctacod = cuentaPUC;
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(objJson),
        url: url,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {                
            
        } 
    }).done(function(e){
        
        var key1 = Object.keys(objJson)[0];               
        if((e[key1].eeEstados["0"].Estado)!=="OK")
        {    
            alertDialogs(e[key1].eeEstados["0"].Estado);
        }
    });
    
    
}