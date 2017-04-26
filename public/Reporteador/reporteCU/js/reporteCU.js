/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * Cambia la imagen del header, cuyo id=imgId, por una imagen que muestre un estado activo(On). 
 * @param {type} imgId 
 * @returns {undefined}
 */
function cambiarImagen(imgId) {
    var imgName = imgId.replace("img", "");
    var estado = document.getElementById(imgId).getAttribute("estado");
    apagarBotones(imgId);

    if (estado === "off") {
        document.getElementById(imgId).src = "../../../images/btn" + imgName + "On.png";
        document.getElementById(imgId).setAttribute("estado", "on");
        document.getElementById(imgId).setAttribute("onmouseover", "");
        document.getElementById(imgId).setAttribute("onmouseout", "");
        $('#' + imgId.replace("img", "")).show(300);
    }
    
}

/**
 * funcion para deshabilkitar los botones de navegacion en caso de crear reporte
 * @param {type} id
 * @returns {undefined}
 */
function desableButton(id) {
    if (sessionStorage.getItem("ope") === "create") {
        var imgMenu = $("#headerDiv").find("img");
        for (var i = 0; i < imgMenu.length; i++) {
            if (imgMenu[i].id === id) {
                for (var j = i; j < imgMenu.length; j++) {
                    document.getElementById(imgMenu[j].id).setAttribute("onmouseover", "");
                    document.getElementById(imgMenu[j].id).setAttribute("onmouseout", "");
                    document.getElementById(imgMenu[j].id).setAttribute("onclick", "");
                }
                break
            } else {
                var imgNombre = imgMenu[i].id.replace("img", "");
                document.getElementById(imgMenu[i].id).setAttribute("onmouseover", "this.src='../../../images/btn" + imgNombre + "Hov.png';");
                document.getElementById(imgMenu[i].id).setAttribute("onmouseout", "this.src='../../../images/btn" + imgNombre + "Off.png';");
                document.getElementById(imgMenu[i].id).setAttribute("onclick", "cambiarImagen('img" + imgNombre + "');clickbtn('" + imgNombre + "')");
            }
        }
        if (id === "All") {
            cambiarImagen("imgCampos");
            document.getElementById("imgCampos").src = "../../../images/btn" + "Campos" + "On.png";
            document.getElementById("imgCampos").setAttribute("estado", "on");
            document.getElementById("imgCampos").setAttribute("onmouseover", "");
            document.getElementById("imgCampos").setAttribute("onmouseout", "");
        }
    }
}

/**
 * cambia el estado de todos los botones del menu vertical de la izquierda (Trasferencias, reportes, procesos, etc ) a off 
 * excepto el del id que le pasemos, este quedara activo
 */
function apagarBotones(id) {
    var imgMenu = $("#headerDiv").find("img");
    for (var i = 0; i < imgMenu.length; i++) {
        if (imgMenu[i].id !== id && imgMenu[i].getAttribute("estado") !== "off") {
            var imgNombre = imgMenu[i].id.replace("img", "");
            document.getElementById(imgMenu[i].id).src = "../../../images/btn" + imgNombre + "Off.png";
            document.getElementById(imgMenu[i].id).setAttribute("estado", "off");
            document.getElementById(imgMenu[i].id).setAttribute("onmouseover", "this.src='../../../images/btn" + imgNombre + "Hov.png';");
            document.getElementById(imgMenu[i].id).setAttribute("onmouseout", "this.src='../../../images/btn" + imgNombre + "Off.png';");
            document.getElementById(imgMenu[i].id).setAttribute("onclick", "cambiarImagen('img"+imgNombre+"');clickbtn('"+imgNombre+"')");
            $('#' + imgMenu[i].id.replace("img", "")).hide();
        }
    }
}

/**
 * funcion event click para darle navegacion a la pagina 
 * @param {type} btnid id del boton que fue seleccionado
 * @returns {undefined}
 */
function clickbtn(btnid) {
    modClasesBootstrap(btnid);
    if (btnid === "Campos") {
        loadCampos();//funcion esta en opcCampos.js
    } else if (btnid === "Filtros") {
        loadFiltros();//funcion esta en opcFiltros.js
    } else if (btnid === "Formato") {
        loadFormato();//funcion esta en opcFormato.js
    }
}

/**
 * Funcion para cambiar las clases de bootstrap
 * @param {type} btnid id del boton que fue seleccionado
 * @returns {undefined}
 */
function modClasesBootstrap(btnid) {
    if (btnid === "Reporte") {
        $('#divMIzq').removeClass('col-sm-2').addClass('col-sm-4');
        $('#divCuerpo').removeClass('col-sm-8').addClass('col-sm-4');
        $('#divTexto').removeClass('col-sm-3').addClass('col-sm-6');
        $('#divContenido').removeClass('col-sm-9').addClass('col-sm-6');
        $('#divMDer').removeClass('col-sm-2').addClass('bcol-sm-4');
    } else {
        $('#divMIzq').removeClass('col-sm-4').addClass('col-sm-2');
        $('#divCuerpo').removeClass('col-sm-4').addClass('col-sm-8');
        $('#divTexto').removeClass('col-sm-6').addClass('col-sm-3');
        $('#divContenido').removeClass('col-sm-6').addClass('col-sm-9');
        $('#divMDer').removeClass('col-sm-4').addClass('bcol-sm-2');
    }
}

$(document).ready(function () {
    document.getElementById("titulo").innerHTML = sessionStorage.getItem("nomRepo");
    debugger
//    $('#' + "Reporte").hide();
    $('#' + "Campos").hide();
    $('#' + "Filtros").hide();
    $('#' + "Formato").hide();
    cambiarImagen("imgCampos");
    clickbtn("Campos");
});
/**
 * Funcion para mostrar el popUp 
 * @returns {undefined}
 */
function mostrarCustomPopUp() {
    if(bandAlert===0){
        bandAlert++;
        var heightDiv = parseInt($("#divContenido").height())+310; 
        $("body").append("<div id='disable' style='height:"+heightDiv+"px;'></div>");
        $("#customPopUp").fadeIn("slow");
    }
    
}
/**
 * funcion para cerrar el popup y eliminar varia variables de sesion 
 * @returns {undefined}
 */
function cerrarCustomPopUp() {
    bandAlert = 0;
    bandAlertfl = 0;
    $("#disable").fadeOut("slow");
    $("#customPopUp").fadeOut("slow");
    $("#disable").remove();
    $("#popUpFunciones").hide();
    $("#popUpFuncionesV2").hide();
    $("#popUpCond").hide();
    $("#popUpCondV2").hide();
    $("#popUpFltr").hide();
    $("#popUpFltrV2").hide();
    $("#btnCrearFltr").hide();
    $("#btnCrearCond").hide();
    
    sessionStorage.removeItem("obj");
    $('#girdCampos').data('kendoGrid').dataSource.read();
    $('#girdCampos').data('kendoGrid').refresh();
}


