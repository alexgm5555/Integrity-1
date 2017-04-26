/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#girdCampos').height(viewportHeight - 361);
});

/**
 * Carga todos los elementos del div campos 
 * @returns {undefined}
 */

var camposGloibal = "";//capturo los todos los campos relacionados al reporte 
var funcionesGlobales = "";
/**
 * esta funcion es como el main de opcCampos, ya que es llamada desde opcReportes con el click del boton crear repotes o con el click de el paso campos
 * @returns {undefined}
 */
function loadCampos() {
    //elimino la grilla para no crear conflictos con la informacion existente al momento de cambiar la posicion de algun elemento
    $("#girdCampos").remove();
    var midiv = document.createElement("div");
    midiv.setAttribute("id", "girdCampos");
    document.getElementById("outerWrapper1").appendChild(midiv);
    if (!(document.getElementById("nomRepo").value) && !(document.getElementById("capi").value)) {
        desableButton("imgRCampos");
    }
    var urlAnex = geturlRestAnx();
    var url = sessionStorage.getItem("url");
    document.getElementById('subtitulo').innerHTML = "Agrega los campos<br>de tu reporte";
    document.getElementById('labelTexto').innerHTML = "En esta pantalla podrás escoger los campos que " +
            "quieres consultar en tu reporte seleccionado. Primero el anexo al " +
            "que pertenecen <br><br>"+
            "<a  class='k-grid'  ><span class='k-sprite re_funcion'></span></a>"+
            "Agrega campos de tipo función.<br><br>"+
            "<a  class='k-grid'  ><span class='k-sprite re_conon'></span></a>"+
            "Aplica una condición a un campo y limita los datos que te deja ver.";
    llenarComboKendoCampos(urlAnex, "porta", "nombreprestador");
    gridCampos("urlGrid", "dsttnomjor.ttnomjor");
    $("#btnAddCmp").kendoButton();
    cerrarCustomPopUp();
}
/**
 * llena los campos anexo y campo 
 * @param {type} urlServ url del servicio
 * @param {type} idCmp id del combbox
 * @param {type} field campo que quiero coger si tubiera muchos campos en el servicio
 * @returns {undefined}
 */
function llenarComboKendoCampos(urlServ, idCmp, field) {
    var objAnx = getinputRestAnx();
    objAnx.dsSIRcar_anx.eeSIRcar_anx["0"].piicapcod = sessionStorage.getItem("capCod");
//    objAnx.dsSIRcar_anx.eeSIRcar_anx["0"].piicarcod = sessionStorage.getItem(""); 
    objAnx.dsSIRcar_anx.eeSIRcar_anx["0"].piiporcod = sessionStorage.getItem("porCod");
    var urlServAnx = geturlRestAnx();
    var mapDataAnx = getmapDataRestAnx();
    var objCmp = getinputRestCmp();
    var urlServCmp = geturlRestCmp();
    var mapDataCmp = getmapDataRestCmp();
    var anexo = $("#anexo").kendoComboBox({
        filter: "contains",
        placeholder: "Seleccione Uno",
        dataTextField: "anx_des",
        dataValueField: "anx_des",
        select: onSelectAnex,
        dataSource: {
            transport: {
                read: {
                    url: urlServAnx,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST",
                },
                parameterMap: function (options, operation) {
                    objAnx["eerep_anx_cmp"] = [options];
                    return JSON.stringify(objAnx);
                }
            },
            batch: false,
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado.indexOf("OK") === 0) {
                        return e[key1].eecar_anx_nom;
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
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
    }).data("kendoComboBox");
    var campo = $("#campo").kendoDropDownList({
        autoBind: false,
        placeholder: "Seleccione el Campo",
        dataTextField: "cmp_dsc",
        dataValueField: "cmp_dsc",
        dataSource: {
            transport: {
                read: {
                    url: "",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST",
                },
                parameterMap: function (options, operation) {
                    objCmp = getinputRestCmp();
                    objCmp["eerep_anx_cmp"] = [options];
                    return JSON.stringify(objCmp);
                }
            },
            batch: false,
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    
                    if (e[key1].eeEstados[0].Estado.indexOf("OK")) {
                        return e[key1][mapDataCmp];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "rpt_cmp_pos",
                    fields: {
                        cmp_dsc: {validation: {required: true}, type: 'string'}
                    }
                }
            }
        },
    }).data("kendoDropDownList");
}
/**
 * funcion que captura el anexo seleccionado y cambia el elemento #campo en la vista opc campos
 * @returns 
 */
function onSelectAnex(e) {
    var dataItem = this.dataItem(e.item.index());
    var anxNom = dataItem.id;
    var obj = {"dsSIRrep_anx_cmp": {
            "eeDatos": [
                {
                    "picusuario": user,
                    "picfiid": fiid,
                    "local_ip": "",
                    "remote_ip": ""
                }
            ],
            "eeSIRrep_anx_cmp": [
                {
                    "picanxnom": anxNom,
                    "picusuario": user
                }
            ]
        }}
    setidRepo(sessionStorage.getItem("idRepo"));
    setinputRestCmp(obj);
    comboCampos(obj);
    $("#campo").data("kendoDropDownList").value("");
}
/**
 * Funcion para refrescar ñel combo con la nueva informacion en el comobo campos esto se hace para hacer el efecto de cascada
 * @returns {undefined}
 */
function comboCampos(objCmp) {
    var urlServCmp = geturlRestCmp();
    var mapDataCmp = getmapDataRestCmp();
    var campo = $("#campo").kendoDropDownList({
        autoBind: false,
        optionLabel: "Seleccionar Campo...",
        dataTextField: "cmp_dsc",
        dataValueField: "cmp_dsc",
        dataSource: {
            transport: {
                read: {
                    url: urlServCmp,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST",
                },
                parameterMap: function (options, operation) {
                    objCmp["eerep_anx_cmp"] = [options];
                    return JSON.stringify(objCmp);
                }
            },
            batch: false,
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado.indexOf("OK") === 0) {
                        return e[key1][mapDataCmp];
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
        },
    }).data("kendoComboBox");
}
/**
 * Funcion para ajustar el alto de la grilla 
 */
//$(window).resize(function () {
//    var viewportHeight = $(window).height();
//    $('#outerWrapper').height(viewportHeight - 500);
//    $('.k-grid-content').height(viewportHeight - 500);
//});
/**
 * Funcion que pinta la grilla kendo
 * @param {type} urlGrid url del servicio rest
 * @param {type} dataserv parametros para ubicar la posiscion en el objeto de respuesta del servicio
 * @returns {undefined}
 */
function gridCampos(urlGrid, dataserv) {
    var objRepo = getinputRestRepoGridCmp();
    var urlGrid = geturlRestRepoGridCmp();
    var mapData = getmapDataRestRepoGridCmp();
    var objRepoUD = getinputRestCmpCud();
    var urlGridUD = geturlRestCmpCud();
    var mapDataD = getmapDataRestCmpCud();
    var mapDataU = getmapDataRestCmpCud();
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlGrid,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: "POST",
            },
            destroy: {
                url: urlGridUD,
                type: "DELETE",
                dataType: "json",
                contentType: "application/json"
            },
            update: {
                url: urlGridUD,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'destroy') {
                        var key1 = Object.keys(objRepoUD)[0]
                        objRepoUD[key1][mapDataD] = [options];
                        return kendo.stringify(objRepoUD);
                    } else if (operation === 'read') {
                        return JSON.stringify(objRepo);
                    } else if (operation === 'update') {
                        var key1 = Object.keys(objRepoUD)[0]
                        objRepoUD[key1][mapDataU] = [options];
                        return kendo.stringify(objRepoUD);
                    }
                } catch (e) {
                    alertDialogs();
                    alertDialogs(e.message)
                }
            }
        },
        schema: {
            type: "json",
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    camposGloibal = e[key1][mapData];
                    return e[key1][mapData];

                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "cmp_id",
                fields: {
                    cmp_id: {validation: {required: true}, type: 'string'},
                    rpt_cmp_vis: {validation: {required: true}, type: 'string'},
                }
            }
        }
    });
    $(window).trigger("resize");
    var grid = $("#girdCampos").kendoGrid({
        dataSource: dataSource,
        dataBound: ondataBound,
        columns: [
            {command: [{name: "darRow", text: " ", template: "<a class='k-grid-darRow><span class='k-sprite img_drawDropGrid'></span></a>"}, ], title: "&nbsp;", width: "10px"},
            {command: [{id: "edit", text: " ", click: click, template: "<a class='k-grid-edit'><span class='k-sprite re_editoff'></span></a>"}, ], title: "&nbsp;", width: "50px"},
            {field: "rpt_cmp_vis", title: "Descripcion", width: "auto"},
            {command:
                        [
                            {name: "visible", text: ";&nbsp;", click: visiClick2, template: "<a class='k-grid-visible'><span class='k-sprite re_checkAct'></span></a>"},
                            {name: "condicion", text: ";&nbsp;", click: PopUpCondicion2, template: "<a class='k-grid-condicion'><span class='k-sprite re_filtrooff'></span></a>"},
                            {name: "destroyed", click: clickEliminar, template: "<a class='k-grid-destroyed'><span class='k-sprite re_trash'></span></a>"}
                        ],
                width: "140px"}],
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function () {
            var results = dataSource.data();
            changImgFunc(results);
        }
    }).data("kendoGrid");
    /*
     * con el codigo siguiiente monto la funcionalidad para que el usuario 
     * pueda manipular la posicion de las filas en la grilla
     */
    try{
    grid.table.kendoSortable({
        filter: ">tbody >tr",
        hint: function (element) { //customize the hint
            var table = $('<table style="width: 45%;" class="k-grid k-widget"></table>'),
                    hint;
            table.append(element.clone()); //append the dragged element
            table.css("opacity", 0.7);
            return table; //return the hint element
        },
        cursor: "move",
        placeholder: function (element) {
            try{
            return $('<tr colspan="4" class="placeholder"></tr>');}catch (e){
        alert(e);
    }
        },
        change: function (e) {
            try{
            var skip = grid.dataSource.skip(),
//var skip =0;
                    oldIndex = e.oldIndex,
                    newIndex = e.newIndex,
                    data = grid.dataSource.data(),
                    dataItem = grid.dataSource._data[e.oldIndex];
//                    dataItem = grid.dataSource.getByUid(e.item.data("uid"));
            grid.dataSource.remove(dataItem);
            grid.dataSource.insert(newIndex, dataItem);
            
            saveOrden(data);
        }catch (e){
            alertDialogs("Ocurrió un error en al mover el campo!");
        $('#girdCampos').data('kendoGrid').dataSource.read();
        $('#girdCampos').data('kendoGrid').refresh();
    }
            /*Aqui va el codigo que cambia el valor del json para cambiar la posicion*/
        }
    });
    }
    catch (e){
        alert(e)
    }
}
/**
 * funcion para desabilitar las opciones filtros y formato del proceso
 * @param {type} grid
 * @returns {undefined}
 */
function ondataBound(grid) {
//    var grid = $('#girdCampos').data('kendoGrid').dataSource.data();
    if (grid.length <= 0) {
        desableButton("imgCampos");
    } else {
        desableButton("All");
    }
}

function click(e) {
    alertDialogs("edito");
}
/**
 * Funcion para eliminar el campo
 * @param {type} e el detalle del campo a eliminar
 * @returns {clickEliminar}
 */
function clickEliminar(e) {
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#girdCampos").data("kendoGrid").dataItem($(e.target).closest("tr"));

            var actions = new Array();
            actions[0] = new Object();
            actions[0].text = "OK";
            actions[0].action = function () {
                var dataSource = $("#girdCampos").data("kendoGrid").dataSource;
                dataSource.remove(dataItem);
                dataSource.sync();
                bandAlert = 0;
            };
            actions[1] = new Object();
            actions[1].text = "Cancelar";
            actions[1].action = function () {
                bandAlert = 0;
            };
            createDialog("Atención", "Esta seguro de eliminar el campo ---" + dataItem.rpt_cmp_vis + " ---?", "400px", "200px", true, true, actions);
        
    } catch (e) {
        $('#girdCampos').data('kendoGrid').dataSource.read();
        $('#girdCampos').data('kendoGrid').refresh();
    }

}
/**
 *  funcion para ordenar dependiendo el draw and drop
 * @returns {undefined}
 */
function saveOrden() {
    var grid = $('#girdCampos').data('kendoGrid').dataSource.data();
    for (var i = 0; i < grid.length; i++) {
        grid[i].rpt_cmp_col = i + 1;
    }
    //cree var objRep por que cambiaba el dato es una variable global y lo cambia apenas le asigna la grilla
    var objRep1 = {
        "dsSICUDRep_rpt": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("sesion")
                }
            ],
            "eerep_rpt_cmp": []
        }
    };
    var urlRep = geturlRestCmpCud();
    var mapRep = getmapDataRestCmpCud();
    
    var key1 = Object.keys(objRep1)[0];
    objRep1[key1].eerep_rpt_cmp = grid;
    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: "PUT",
        data: JSON.stringify(objRep1),
        url: urlRep,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            alertDialogs("Error al consumir el servicio" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            $('#girdCampos').data('kendoGrid').dataSource.read();
            $('#girdCampos').data('kendoGrid').refresh();
        } else {
            alertDialogs("Error al consumir el servicio" + permitirIngreso);
        }
    });
}
/**
 * funcion sirve para ordenar la posicion que pide el usuario, ya que el servicio me envia
 *  una posicion entonces lo reepazo co el item asociado en kendo para ordenar las filas en la grilla
 * @returns {undefined}
 */
function orderPos() {
    
    var grid = $("#girdCampos").data("kendoGrid");
    if (bandcmp === 0) {
        bandcmp++
        for (var i = 0; i < grid.dataSource._data.length; i++) {
            var item = grid.dataSource._data[i].rpt_cmp_pos;
            var uid = grid.dataSource._data[i].uid;
            reOrderGrid(uid, i, item);
        }
        bandcmp = 0;
    }
//    var item = grid.dataSource._data[0];
//    var uid = grid.dataSource._data[0].uid;
//    var i = 0;
//    reOrderGrid(uid, i, item);
}
/**
 * complemento de la funcion anterior, la separe para poderla utilizar en otro metodo
 * @param {type} uid id de kendo
 * @param {type} i posicion en el arreglo
 * @param {type} item posicion enviada desde el servicio
 * @returns {undefined}
 */
function reOrderGrid(uid, i, item) {
    var grid = $("#girdCampos").data("kendoGrid");
    var skip = grid.dataSource.skip(),
            oldIndex = i,
            newIndex = item,
            data = grid.dataSource.data(),
            dataItem = grid.dataSource.getByUid(uid);
    grid.dataSource.remove(dataItem);
    grid.dataSource.insert(newIndex, dataItem);
}
/**
 * funcion llamada po el click en el boton agregar 
 * @returns {undefined}
 */
function clickCrearCampo() {
    try {
        var numberPattern = /\s$/g;
        var objCampo = $("#campo").data("kendoDropDownList");
        var select = objCampo.selectedIndex - 1;
        var objSelect = objCampo.dataSource._data[select];
        var strObjSelect = JSON.stringify(objCampo.dataSource._data[select]);
        var objRep = getinputRestCmpCud();
        var urlRep = geturlRestCmpCud();
        var mapRep = getmapDataRestCmpCud();
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].anx_cmp_id = objSelect.anx_cmp_id;
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].anx_cmp_lkp = objSelect.anx_cmp_lkp;
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].anx_cmp_vsb = objSelect.anx_cmp_vsb;
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].anx_nom = objSelect.anx_nom;
        //objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_bloq = objSelect.
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_brk = objSelect.cmp_brk;
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_dsc = objSelect.cmp_dsc;
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_id = objSelect.cmp_id;
        //objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_inquery = objSelect.
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_nom = objSelect.cmp_nom;
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_ssm = objSelect.cmp_ssm;
        //objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_sum = objSelect.
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].cmp_td = objSelect.cmp_td;
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].rep_anx_cmp_idc = objSelect.rep_anx_cmp_idc;
        //objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_con = objSelect.
        //objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_fil = objSelect.
        //objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_gru = objSelect.
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_pos = 2;
        //objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_pro = objSelect.
        //objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_sum = objSelect.
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_vis = objSelect.cmp_dsc.replace(numberPattern, "");
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_cmp_fun = false;
        objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].rpt_id = sessionStorage.getItem("idRepo");
        //objRep.dsSICUDRep_rpt.eerep_rpt_cmp[0].transf = objSelect.
        var jsonResp = "";
        var permitirIngreso = "";
        $.ajax({
            type: "POST",
            data: JSON.stringify(objRep),
            url: urlRep,
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {
                
                var key1 = Object.keys(resp)[0];
                permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
                jsonResp = resp;
            },
            error: function (e) {
                alertDialogs("Error al consumir el servicio de CrearCampos" + e.status + " - " + e.statusText);
            }
        }).done(function () {
            if (permitirIngreso == '"OK"') {
                $('#girdCampos').data('kendoGrid').dataSource.read();
                $('#girdCampos').data('kendoGrid').refresh();
                desableButton("All");
            } else {
                alertDialogs("Error al consumir el servicio " + permitirIngreso);
            }
        });
    } catch (e) {
        alertDialogs("Function: clickCrearRepo Error" + e.message);
    }
}
/**
 * funcion para hacer la condicion en caso de quie sea una funcion o un campo
 * @param {type} results erl obj que contiene la grilla para pintar en este obj está el item de comparacion eneste caso es  rpt_cmp_fun
 * si muestra fque es true entonces cambia la imagen editar en un fx
 * @returns {undefined}
 */
function changImgFunc(results) {
    for (var i = 0; i < results.length; i++) {
        var id = results[i].rpt_cmp_pos;
        var spanE = "";
        var aEdit = "";
        var spanBl = "";
        var spanVisi = "";
        if (i % 2 === 0) {
            spanE = "spanEdit" + id;
            aEdit = "aEdit" + id;
            spanBl = "spanCondi" + id;
            spanVisi = "spanVisib" + id;
        } else {
            spanE = "altSpanEdit" + id;
            aEdit = "aEdit" + id;
            spanBl = "spanCondi" + id;
            spanVisi = "spanVisib" + id;
        } 
        if ((results[i].rpt_cmp_fun)) {
            document.getElementById(spanE).setAttribute("class", "k-sprite re_funcion");
            document.getElementById(aEdit).setAttribute("class", "");
            document.getElementById(spanE).setAttribute("onClick", "popUpFunciones(" + id + ",\'" + results[i].rpt_cmp_vis + "\')");
        }
        if (results[i].rpt_cmp_con){
            document.getElementById(spanBl).setAttribute("class", "k-sprite re_conon");
        }
        if (!results[i].anx_cmp_vsb) {
            $('#' + spanVisi).removeClass('re_checkAct').addClass('re_checkCreate');
        }
    }
}
/**
 * funcion llamada en la opcion del click en la imagen fx, qué sirve para pintar el popUp
 * @param {type} id
 * @param {type} nomFun
 * @returns {undefined}
 */
function popUpFunciones(id, nomFun) {

    sessionStorage.setItem("idFun", id);
    sessionStorage.setItem("nomFun", nomFun);
    if (true === true) {
        var ip = sessionStorage.getItem("ip");
        var puerto = sessionStorage.getItem("puerto");
//        $("body").append("<div id='windowFun'></div>");
        var myWindow = $("#window"),
                undo = $("#undo");

        function onClose() {
//            document.getElementById("windowFun").remove();
            $('#girdCampos').data('kendoGrid').dataSource.read();
            $('#girdCampos').data('kendoGrid').refresh();
                    undo.fadeIn();
                }
        mostrarCustomPopUp();
        onloadPopUpFunciones ();
//
//        myWindow.kendoWindow({
//            draggable: true,
//            height: "70%",
//            modal: true,
//            resizable: false,
//            title: "Funciones",
//            width: "60%",
//            content: "http://" + ip + ":" + puerto + "/Reporteador/html/popUpFunciones.html",
//            close: onCloseFun
//        }).data("kendoWindow").center().open();

    } else {
        alertDialogs("Function: PopUp Error" + "el campo no es filtrable");
    }
}
/**
 * funcion llamada en la imagen de crear funcion 
 * @returns {undefined}
 */
function addFun(){
    popUpFunciones(10001, "");
}
/**
 * funcion llamada desde el js popUpFunciones para actualizar la grilla
 * @returns {undefined}
 */
function onCloseFun(){
   gridCampos();
}
/**
 * funcion llamada desde el archivo popupFunciones  para cerra la vbentana y para actualizar la grilla campos
 * @returns {undefined}
 */
function cerrarWindow(){
    $("#window").data("kendoWindow").close();
    $('#girdCampos').data('kendoGrid').dataSource.read();
    $('#girdCampos').data('kendoGrid').refresh();
}
/**
 * funcion que pinta unna ventana popUp para deplegar el archico popUpCondiciones html 
 * @param {type} e
 * @returns {undefined}
 */
function PopUpCondicion2(e) {
    e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
//    var obj = this.dataItem($(e.currentTarget).closest("tr"));
    var obj = $("#girdCampos").data("kendoGrid").dataItem($(e.target).closest("tr"));
    sessionStorage.setItem("cmpNom", obj.cmp_dsc);
    sessionStorage.setItem("obj", JSON.stringify(obj));
    sessionStorage.setItem("idDato",obj.rpt_cmp_pos);
//    sessionStorage.setItem("filtros", JSON.stringify(filtros));
    var ip = sessionStorage.getItem("ip");
    var puerto = sessionStorage.getItem("puerto");
//    $("#window").append("<div id='windowVfltr1'></div>");
//    $("#windowVfltr1").append("<div id='windowVfltr'></div>");
//    var myWindow = $("#windowVfltr");
//            undo = $("#undo");
    function onClose() {
        document.getElementById("windowVfltr1").remove();
//            undo.fadeIn();
        mostrarGrid();
    }
    ;
    mostrarCustomPopUp();
    onloadPopUpCond ();
//
//
//    myWindow.kendoWindow({
//        draggable: true,
//        height: "50%",
//        modal: true,
//        resizable: false,
//        title: "",
//        width: "50%",
//        content: "http://" + ip + ":" + puerto + "/Reporteador/html/reporteViewPopUpFltr.html",
//        close: onClose
//    }).data("kendoWindow").center().open();

}

/**
 * Funcion para atrapar el evento del clic en el icono del ojo
 * @param {type} e el id de la fila seleccionada
 * @returns {undefined}
 */
function visiClick2(e) {
    debugger
    var row =($(e.currentTarget).closest("tr")["0"].sectionRowIndex);
    changObjRep2(row,"anx_cmp_vsb");
 }
 
 function changObjRep2(row,cmp){
    bandAlertfl++;
    if (bandAlertfl === 1) {
        var obj = $("#girdCampos").data("kendoGrid")._data[row];
        if (obj[cmp]) {
            obj[cmp] = false;
        } else {
            obj[cmp] = true;
        }
        sendAjax2([obj], "PUT");
    }
}
/**
 * envia los datos de guardar eliminar o adicionar filtros al servicio correspondiente
 * @param {type} data obj con los campos que requieren ser modificados
 * @param {type} verHtml verbo html (POST6.DELETE Y PUT)
 * @returns {undefined}
 */
function sendAjax2(data, verHtml) {
    displayLoading("#girdCampos");
    var obj = getinputRestCmpCud();
    var urlServ = geturlRestCmpCud();
    var mapData = "eerep_rpt_cmp";
    obj = {
        "dsSICUDRep_rpt": {
            "eeDatos": [
                {
                    "picusrcod": user,
                    "picfiid": fiid
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
        success: function (resp) {
            bandAlertfl = 0;
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            bandAlertfl = 0;
            parent.errorPopUp("Error al consumir el servicio cudReportes" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            gridCampos();
            closeLoading("#girdCampos");
//            $('#girdFormato').data('kendoGrid').dataSource.read();
//            $('#girdFormato').data('kendoGrid').refresh();
        } else {
//            parent.errorPopUp("Problemas con el creación de campos .\n" + permitirIngreso);
        }
        $("#btnSaveFiltros").kendoButton({
            enable: true
        });
    });

}
