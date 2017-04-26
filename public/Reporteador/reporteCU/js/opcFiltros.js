/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var filtrosOpc = "";
var bandAlertfl = 0;
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#girdFiltros').height(viewportHeight - 281);
});
/**
 * Funcion para ajustar el alto de la grilla 
 */
//$(window).resize(function () {
//    var viewportHeight = $(window)resizeheight();
//    $('#outerWrapper').height(viewportHeight - 500);
//    //$('.k-grid-content').height(viewportHeight - 300);
//});
/**
 * funcion inicial del archivo opcFiltros
 * @returns {undefined}
 */
function loadFiltros() {

    document.getElementById('subtitulo').innerHTML = "Escoge los campos que quieres filtrar y define sus rangos";
    document.getElementById('labelTexto').innerHTML = "Haciendo clic en el ícono \"lupa\" accedes al menú de filtro" +
            "donde podrás definir los rangos específicos de los datos" +
            "que quieres consultar en ese determinado campo.";
    gridFiltros();
    //llenFltrGrilla();
}


/**
 * Funcion que pinta la grilla kendo
 * @param {type} urlGrid url del servicio rest
 * @param {type} dataserv parametros para ubicar la posiscion en el objeto de respuesta del servicio
 * @returns {undefined}
 */
function gridFiltros(urlGrid, dataserv) {
    var objRepo = getinputRestRepoGridFltr();
    var urlGrid = geturlRestRepoGridFltr();
    var mapData = getmapDataRestRepoGridFltr();

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlGrid,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: "POST"
            },
            destroy: {
                url: urlGrid,
                type: "delete",
                dataType: "json",
                contentType: "application/json"
            },
            create: {
                url: urlGrid,
                type: "POST",
                dataType: "json",
                contentType: "application/json"
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'destroy' || operation === 'create' || operation === 'update') {
                        var obj = {}
                        obj["dsSICUDRep_rpt"] = {};
                        obj.dsSICUDRep_rpt["eeDatos"] = objRepo.dsSIRRep_rpt_det.eeDatos
                        obj.dsSICUDRep_rpt["eerep_rpt"] = [JSON.parse(sessionStorage.getItem("objRepoSelec"))];
                        obj.dsSICUDRep_rpt["eerep_rpt_cmp"] = [options];
                        return kendo.stringify(obj);

                    }
                    if (operation === 'read') {
                        objRepo["anx_cmp_id"] = [options];
                        return JSON.stringify(objRepo);
                    }
                } catch (e) {
                    alertDialogs("Function: gridFiltros Error" + e.message);

                }
            }
        },
        schema: {
            type: "json",
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    filtrosOpc = e[key1].eerep_rpt_fil;
                    var filtrosGrid = e[key1][mapData];
                    filtrosGrid = filtrosGrid.filter(function (obj) {
                            return obj.rpt_cmp_fil === true;
                        });
                    return filtrosGrid;
                } else {
                    alertDialogs("Error al consumir el serviocio gridFiltros" + e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "cmp_id",
                fields: {
                    cmp_id: {validation: {required: true}, type: 'string'},
                    rpt_cmp_vis: {validation: {required: true}, type: 'string'}
                }
            }
        }
    });
    $(window).trigger("resize");
    $("#girdFiltros").kendoGrid({
        dataSource: dataSource,
        columns: [
            {field: "rpt_cmp_vis", title: "Descripcion", width: "100%"},
            {command:
                        [
                            {name: "filtro", text: " ", click: PopUpFiltro, template: "<a class='k-grid-filtro'><span class='k-sprite re_filtrooff'></span></a>"},
//                            {name: "condicion", text: " ", click: PopUpCondicion, template: "<a class='k-grid-condicion'><span class='k-sprite re_filtrooff'></span></a>"},
                            
                        ],
                width: "60px"}],
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),
        editable: "popup",
        dataBinding: llenFltrGrilla,
        dataBound: function () {
            var results = dataSource.data();
            llenFltrGrilla(results);
        }
    });
    $(window).trigger("resize");

}
/**
 * funcion que pinta unna ventana popUp para deplegar el archico popUpFiltyros html 
 * @param {type} e toda la informacion de la fila seleccionada
 * @returns {undefined}
 */
function PopUpFiltro(e) {
    bandAlertfl++;
    if (bandAlertfl === 1) {
        
    var obj = $("#girdFiltros").data("kendoGrid")._data[($(e.currentTarget).closest("tr")["0"].sectionRowIndex)];
    
    var tDato = obj.cmp_td;
    var idDato = obj.rpt_cmp_pos;
    var idCmpidFltr = obj.rpt_cmp_pos;
    sessionStorage.setItem("tDato", JSON.stringify(tDato));
    sessionStorage.setItem("idDato", JSON.stringify(tDato));
    sessionStorage.setItem("cmpNom", obj.rpt_cmp_vis);
    sessionStorage.setItem("idCmpidFltr", JSON.stringify(idCmpidFltr));
    if (obj.rpt_cmp_fil === true) {
            sessionStorage.setItem("filtros", JSON.stringify(filtrosOpc));
        
         
        var ip = sessionStorage.getItem("ip");
        var puerto = sessionStorage.getItem("puerto");
        $("body").append("<div id='windowFil'></div>");
        var myWindow = $("#windowFil"),
                undo = $("#undo");

        function onClose() {
            bandAlertfl = 0;
            document.getElementById("windowFil").remove();    
            undo.fadeIn();
        }
        mostrarCustomPopUp();
        if(obj.cmp_td ==="character" ){
            onloadPopUpFltrV2();
        }else{
            onloadPopUpFltr();
        }
        
//        myWindow.kendoWindow({
//            draggable: true,
//            height: "70%",
//            modal: true,
//            resizable: false,
//            title: "Filtros",
//            width: "60%",
//            content: "http://" + ip + ":" + puerto + "/Reporteador/html/popUpFiltros.html",
//            close: onClose
//        }).data("kendoWindow").center().open();

    } else {
        alertDialogs("Function: PopUp Error" + "el campo no es filtrable");
    }
}
}

/**
 * funcion para hacer la condicion y pintar en la grilla el filtro o la ondicion activos
 * @param {type} results obj con todos los datos de l,a grilla
 * @returns {undefined}
 */
function llenFltrGrilla(results) {
    for (var i = 0; i < results.length; i++) {
        var id = results[i].rpt_cmp_pos;
        var div = "";
        var spanL = "";
        var spanBl = "";
        if (i % 2 === 0) {
            div = "divRowFiltro" + id;
            spanL = "spanLupa" + id;
//            spanBl = "spanCond" + id;
        } else {
            div = "altDivRowFiltro" + id;
            spanL = "altSpanLupa" + id;
//            spanBl = "spanCond" + id;
        }
        if (results[i].rpt_cmp_fil) {
            if (filtrosOpc) {
                for (var j = 0; j < filtrosOpc.length; j++) {
                    if (filtrosOpc[j].rpt_cmp_pos == results[i].rpt_cmp_pos) {
                        if ((filtrosOpc[j].rpt_fil_des !== "") || (filtrosOpc[j].rpt_fil_Has !== "")) {
                            if (filtrosOpc[j].rpt_fil_des !== "") {
                                crearImg1(div);
                                crearLabel("label" + id, "Desde:&nbsp;", div);
                                crearSpan(div, filtrosOpc[j].rpt_fil_des);
                            }
                            if (filtrosOpc[j].rpt_fil_Has !== "") {
                                crearImg1(div);
                                crearLabel("label" + id, "Hasta:&nbsp;", div);
                                crearSpan(div, filtrosOpc[j].rpt_fil_Has);
                            }
                            crearBr(div);
                            //document.getElementById(spanBl).setAttribute("style", "display:");
                            document.getElementById(spanL).setAttribute("class", "k-sprite re_filtroon");
                        }
                    }
                }
            }
        }
//        if (results[i].rpt_cmp_con){
//            document.getElementById(spanBl).setAttribute("class", "k-sprite re_conon");
//        }

    }
}



function  crearLabel(id, titulo, div, fuente, color, tipo) {
    var newlabel = document.createElement("Label");
    newlabel.id = id;
    newlabel.setAttribute("for", "text" + id);
    if (tipo === 'editor') {//en caso de que sea un label para editor le coloca este estilo para mostrarlo en la parte superior
        newlabel.style.verticalAlign = '220%';
    }
    newlabel.style.font = fuente;
    newlabel.innerHTML = titulo;
    document.getElementById(div).appendChild(newlabel);
}
function crearImg1(div) {
    var x = document.createElement("IMG");
    x.setAttribute("src", "../../../images/espacio-95.png");
    x.setAttribute("class", "re_bullet1");
    document.getElementById(div).appendChild(x);
}
function crearSpan(div, titulo) {
    var x = document.createElement("SPAN");
    var t = document.createTextNode(titulo);
    x.appendChild(t);
    document.getElementById(div).appendChild(x);
}
function crearBr(div) {
    var mybr = document.createElement('br');
    document.getElementById(div).appendChild(mybr);
}
function blockClick(e) {
    if ($('#' + e.id + ".k-icon.re_desbloff").length > 0) {
        $('#' + e.id).removeClass('k-icon re_desbloff').addClass('k-sprite re_blon');
    } else {
        $('#' + e.id).removeClass('k-icon re_blon').addClass('k-sprite re_desbloff');
    }
}
/**
 * funcion ivocada desde cualquiera de los popUp para cerrar la ventana y actializar la grilla
 */
function reloadGridFltr() {
    var div = sessionStorage.getItem("opcFl");
    bandAlertfl = 0; 
//    $("#window"+div).data("kendoWindow").close();
    
    sessionStorage.removeItem("opcFl");
    cerrarCustomPopUp();
    gridFiltros();
}

/**
 * funcion llamada desde los popUp en caso de que se genere un error al consumir cualquiere servicio
 * @param {type} message
 * @returns {undefined}
 */
function errorPopUp(message){
    alertDialogs(message);
    reloadGridFltr();
    
}