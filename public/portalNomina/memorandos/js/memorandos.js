/* variables para consumir el servicio Sir*/
var objSir = new sir();
var urlSir = objSir.getUrlSir();
var mapSir = objSir.getmapSir();
var inputsir = objSir.getdataInputSir();
//    var objSir = new sir();
//var urlSir = objSir.getUrlSir();
//var est = "pre__est";
$(document).ready(function () {
//    fltrEst();
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
        ciu__cod: {type: 'string'},
        ciu__nom: {type: 'string'},
        ciu__area: {type: 'string'},
    }

    /*variable id es el id correspondiente a la tabla a cansultar*/
    var model = {
        id: "ciu__cod",
        fields: fieldShema
    };

    /*variables para adicionar los botones de la grilla*/
    var btnC = true;
    var btnUD = [
//        {name: "aprobar", text: " ", click: aprobarPresen, template: "<a class='k-grid-aprobar' '><span class='k-sprite po_cerrar'></span></a>"},
        {name: "memo", text: " ", click: memoRow, template: "<a class='k-grid-memo' '><span class='k-sprite po_cerrar'></span></a>"},
//        {name: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
//        {name: "Delete", click: deleteRow, template: "<a class='k-grid-Delete'><span class='k-sprite po_cerrar'></span></a>"},
    ];
    var btnDetalle = [
        {id: "play", text: " ", template: "<a class=''><span class='k-sprite re_bullet2'></span></a>"},
    ];
    //var btnDer = {command: btnDetalle, title: "&nbsp;", width: "100px" };
    var btnDer = {};
    var btnIzq = {command: btnUD, title: "&nbsp;", width: "100px"};

    /*variables para poner los campos visibles tanto en popUp como en grilla, en caso de no colocarlos no apareceran en ni en popup ni engrilla */
    /*hiden: true --- ocultar en grilla*/
    var columns = [
//		btnDer,
        {field: "ciu__cod", title: "Ciudad", width: "100%"},
        {field: "ciu__nom", title: "Nombre Ciudad", width: "100%"},
        {field: "ciu__area", title: "Codigo Area", width: "100%"},
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
//                        options[est] = 99;
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
            var key1 = Object.keys(e.xhr.responseJSON)[0];
            alertDialogs(e.xhr.responseJSON[key1].eeEstados["0"].Estado);
        },
        requestEnd: function (e) {
            if((e.type==="create")||(e.type==="update")){
                $("#grid").data("kendoGrid").destroy();
                grilla();
            }
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
        filterable: true,
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
        edit: function (e) {

            if (!e.model.isNew()) {//caso en el que el popup es editar

                e.container.kendoWindow("title", "Editar");
                var idCiu = $("#idciu__cod").data("kendoMaskedTextBox");
                idCiu.enable(false);
//                var idBanco = $("#idciu__cod").data("kendoNumericTextBox");
//                idBanco.enable(false);
                //e.container.find("input[name=ter__raz]")[0].readOnly="true"
//                if (e.model[est] != 99) {
//                    kendo.ui.progress($('.k-edit-form-container'), true);
//                    kendo.ui.progress($('.k-edit-buttons'), true);
//                    e.container.find(".k-loading-image").css("background-image", "url('')");
//                }
            } else {
                e.container.kendoWindow("title", "Crear");
                ////caso en el que el popup es crear
//                Buscarlabel = buscarlabel.prevObject[3];
//                Buscarlabel.style.display = "none";
                //e.container.find("label[name=sre__cod]")[0].display="none";
            }
        }
    });
}


$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 61);
});


////////////////////////////////////////////////////////////////////////////////

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
            alertDialogs("Error al consumir el servicio de  memorando" + e.status + " - " + e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        } else {
            alertDialogs("Problemas con el servicio de memorando.\n" + permitirIngreso);
        }

    });
}


function memoRow(e){
    try {
		var fila = $("#grid").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];
        
		item = fila.archivo;
		item = item.toString();
//		sbm.util.setValue("textField9", item);
//		sbm.util.setValue("textField8", item);
//		formWidgetHandler.saveDataSlots();
//		document.getElementById("button03").click();

                var archivo = sessionStorage.getItem("documento");
        dsfiles.dsfiles.SIRfile = new Array();
        dsfiles.dsfiles.SIRfile[0] = new Object();
        dsfiles.dsfiles.SIRfile[0].pilfilename = archivo;

        $.ajax({
            type: "POST",
            data: JSON.stringify(dsfiles),
            url: ipServicios + baseServicio + "GetDocument",
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {
                documentobase64 = JSON.stringify(resp.response.polfile);
                documentobase64 = documentobase64.replace(/"/g, "");
                sessionStorage.setItem("documentobase64", documentobase64);
            },
            error: function (e) {
                alert("Error" + JSON.stringify(e));
            }
        }).done(function () {
            var dataURI = sessionStorage.getItem("documentobase64");
            if(identBrowser()==="Chrome"){
                kendo.saveAs({
                    dataURI: dataURI,
                    fileName: sessionStorage.getItem("documento")
                });
            }else{
                alertDialogs("Para descargar el archivo es necesario utilizar el navegador Chrome.");
                window.open("./docOnline.html", "_blank");
            }
        });
	} catch (e) {
            alertDialogs(e);
	}
}

