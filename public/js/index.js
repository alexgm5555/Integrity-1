
var puerto = sessionStorage.getItem("puerto");
var ip = sessionStorage.getItem("ip");

var urlIFrame = "http://" + ip + ":" + puerto + "/sbm/BizSolo/";

var arreglo_funCod = new Array();
var arreglo_funDes = new Array();
var arreglo_funIco = new Array();
var arreglo_funUrl = new Array();
var arreglo_funProg = new Array();
var arreglo_funVideo = new Array();
var arreglo_funRepor = new Array();
estadoIfra = "PagInicio";
var timer = {};
var timerOut = 0;


$(document).ready(function () {
    sessionStorage.setItem("VideoAyuda", "http://comunicacion349.wix.com/integrity#!reportes-tutoriales/w865s");//cambiar urlVideo con url link apenas este listo el video de ayuda   

    if (sessionStorage.getItem("loginintegrity") === "valido") {

        $(window).trigger("resize");

        $("#btnCambiarClave").kendoButton({
        });
        $("#btnGuardarClave").kendoButton({
        });
        habilitarOpciones();
        menufunciones();
        cargaDocumentos();
        tamanoPagIni();
        correLinuxBackTimmer(9000);
        setInterval(scrollFull, 10);
        if(sessionStorage.getItem("poccargo")!=="9999"){
            $("#imgCongiguracion").hide();
        }
        document.getElementById("lbNombre").innerHTML = sessionStorage.getItem("usrnom");
        document.getElementById("lbEMail").innerHTML = sessionStorage.getItem("usrmail");
//        document.getElementById("imgUsuario").src = "../images/equipo/" + sessionStorage.getItem("usuario") + ".png";
        
        document.getElementById("imgUsuario").src = "data:image/png;base64," + consultaImgUsr();
        document.getElementById("logoEmpresa").src = "data:image/png;base64," + sessionStorage.getItem("img");
        document.getElementById("idFrame").src = "fondo.html";
//        document.getElementById("idFrame").src = "http://190.144.16.114:18800/PruebaHRD";
        ////////////////////////////////////////////////////////////////////////////
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAtX6CvwydAo1yAnIYy-dy0rF8zmdvihrY",
            authDomain: "jaime-503d7.firebaseapp.com",
            databaseURL: "https://jaime-503d7.firebaseio.com",
            storageBucket: "jaime-503d7.appspot.com",
            messagingSenderId: "291636831353"
        };
        firebase.initializeApp(config);

        //var dbRef = firebase.database().ref().child('/texto');

        var dbRef = firebase.database().ref().child(sessionStorage.getItem("usuario"));
        //dbRef.on('value', snap => bigOne.innerText = snap.val());

        dbRef.on('value', snap => notifyMe(snap.val()));
        ////////////////////////////////////////////////////////////////////////////
    } else {
        window.location.assign(sessionStorage.getItem("url"));
    }
    $("#k-icon.k-i-arrow-s").className = "k-icon   k-i-hbars";
    $("#logoEmpresa").click(function () {
//        window.location = window.location.href+'?eraseCache=true';
        location.reload(true);
    });
});

function habilitarOpciones() {
    var opciones = JSON.parse(sessionStorage.getItem("opcionesCompañia"));
    for (var i = 0; i < opciones.length; i++) {
        if (!opciones[i].opt_activa) {
            document.getElementById("tr" + opciones[i].cia_det_opcion).remove();
        }
    }
}
/**
 * funciona para ejecutar la funcion correlinux cada t milisegundos
 * @returns {undefined}
 */
function correLinuxBackTimmer(t) {
    var ip = (((sessionStorage.getItem("url").split("/"))[2]).split(":"))[0];
    var linux = sessionStorage.getItem("linux");
    document.getElementById("includeTerm").src = linux
            + "?u="
            + sessionStorage.getItem("usuario")
            + "&p="
            + sessionStorage.getItem("contra");
    timer = setInterval(correLinuxBack, t); //empezar el timer

}

$(window).resize(function () {
    var viewportHeight = $(window).height();
    var viewportWidth = $(window).width();
    $('#outerWrapper').height(viewportHeight - 55);

    if (estadoIfra === "PagShell") {
        tamanoShell(viewportWidth);
    } else if (estadoIfra === "PagFunciones") {
        tamanoFunciones(viewportWidth);
    } else {
        tamanoPagIni();
    }
});
/**
 * Cambia la imagen del menu izquierdo, cuyo id=imgId, por una imagen que muestre un estado activo(On) y cambia la URL del iframe. 
 * @param {type} imgId 
 * @param {type} estiloTd
 * @returns {undefined}
 */
function cambiarImagen(imgId, estiloTd) {
    ocultarArbol();
    tamanoFunciones();
    var imgName = imgId.replace("img", "").toLowerCase();
    var estado = document.getElementById(imgId).getAttribute("estado");
    apagarBotones(imgId);

    if (estado == "off") {
        var servicio = document.getElementById(imgId).getAttribute("servicio");
        document.getElementById(imgId).src = "../images/" + imgName + "On.png";
        document.getElementById(imgId).setAttribute("estado", "on");
        document.getElementById(imgId).setAttribute("onmouseover", "");
        document.getElementById(imgId).setAttribute("onmouseout", "");
        //document.getElementById(imgId).getAttribute("servicio");
        if (servicio === "Reporteador") {
            $('#divDerecho').width($(window).width());
            document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0; z-index:-1";
            var urlFrameNew = "http://" + ip + ":" + puerto + "/" + servicio;
            sessionStorage.setItem("menuToViewRepo", "true");
//            document.getElementById("idFrame").src = urlFrameNew;
//            document.getElementById("idFrame").src = sessionStorage.getItem("url") + servicio + "/indexRepo/html/indexRepo.html";
            document.getElementById("tdPerfil").style = "display:none";
        } else if (servicio === "Reportes") {
            $('#divDerecho').width($(window).width());
            document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0; z-index:-1";
//            document.getElementById("idFrame").src = urlFrameNew;
            sessionStorage.removeItem("menuToViewRepo");
            document.getElementById("idFrame").src = sessionStorage.getItem("url") + "Reporteador" + "/indexRepo/html/indexRepo.html";
            document.getElementById("tdPerfil").style = "display:none";
        } else if (servicio === "procesos") {
            $('#divDerecho').width($(window).width());
            document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0; z-index:-1";
            document.getElementById("idFrame").src = sessionStorage.getItem("url") + servicio + "/html/" + servicio + ".html";
            document.getElementById("tdPerfil").style = "display:none";
        } 
//        else if (servicio !== "") {
//            $('#divDerecho').width($(window).width());
//            document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0; z-index:-1";
//            document.getElementById("idFrame").src = urlIFrame + servicio + "/Start.jsp";
//            document.getElementById("tdPerfil").style = "display:none";
//        }

        cambiarFondoTD(estiloTd);
    }
}

/**
 * Cambia el fondo del todos los td que tengan el atributo name="imgLogoIntegrity"
 */
function cambiarFondoTD(nombreClase) {
    if (nombreClase == "") {
        document.getElementById("imgLogoIntegrity").src = "../images/Login Inicio-07.png";
    } else {
        document.getElementById("imgLogoIntegrity").src = "../images/logo-08.png";
    }
    var listaTdSuperior = document.getElementsByName("tdSuperior");
    for (var i = 0; i < listaTdSuperior.length; i++) {
        listaTdSuperior[i].className = nombreClase;
    }
}
/**
 * cambia el estado de todos los botones del menu vertical de la izquierda (Trasferencias, reportes, procesos, etc ) a off 
 * excepto el del id que le pasemos, este quedara activo
 */
function apagarBotones(id) {
    var imgMenu = document.getElementsByName("imgMenu");
    for (var i = 0; i < imgMenu.length; i++) {
        if (imgMenu[i].id != id && imgMenu[i].getAttribute("estado") != "off") {
            var imgNombre = imgMenu[i].id.replace("img", "").toLowerCase();
            document.getElementById(imgMenu[i].id).src = "../images/" + imgNombre + "Off.png";
            document.getElementById(imgMenu[i].id).setAttribute("estado", "off");
            if (imgNombre == "imgTransacciones") {
                document.getElementById(imgMenu[i].id).setAttribute("onmouseover", "this.src='../images/" + imgNombre + "RO.png'; mostrarArbol();");
            } else {
                document.getElementById(imgMenu[i].id).setAttribute("onmouseover", "this.src='../images/" + imgNombre + "RO.png';");
            }
            document.getElementById(imgMenu[i].id).setAttribute("onmouseout", "this.src='../images/" + imgNombre + "Off.png';");
        }
    }
}
/**
 * Abre la pagina de ayuda que esta almacenda como una variable de sesion, la pagina que despiegla por el momento esta en http://comunicacion349.wix.com/integrity#!reportes-tutoriales/w865sS
 */
function ayuda() {
    var video = sessionStorage.getItem("VideoAyuda");
    if (video) {
        windowPopUp(video, "Ayuda");
    } else {
        var htmlText = '<html><head><title>Soporte</title></head><body><p align="center">' +
                '<img src="images/ayuda-52.png" alt="Soporte" width="200" height="45"><br></br></p>' +
                '<p align="center" style="font-family:Tahoma;font-size:10pt;">Visite nuestro ' +
                'canal de tutoriales <b>Integrity</b> y conozca todas las posibilidades de nuestro sistema.' +
                '<br></br></p><p align="center"><img src="images/video.png" alt="Soporte" width="500" height="307"></p></body></html>';
        alertDialogs(htmlText)
        $("#dialog1").kendoButton().data("kendoButton")
    }
}
/**
 * 
 * @param {type} detalle 
 * @param {type} titulo
 * @returns {undefined}
 */
function  windowPopUp(detalle, titulo) {

    try {

        //        $("#window").kendoWindow({
        //            draggable: true,
        //            height: "90%",
        //            modal: true,
        //            resizable: false,
        //            title: "hola",
        //            width: "1300px",
        //            content: "http://comunicacion349.wixsite.com/integrity/reportes-tutoriales",
        //            close: onClose
        //        }).data("kendoWindow").open();


        var myWindow = $("#window"),
                undo = $("#undo");

        undo.click(function () {
            myWindow.data("kendoWindow").open();
            undo.fadeOut();
        });



        function onClose() {
            undo.fadeIn();
        }

        myWindow.kendoWindow({
            draggable: true,
            height: "70%",
            modal: true,
            resizable: false,
            width: "60%",
            content: "http://comunicacion349.wixsite.com/integrity/reportes-tutoriales",
            close: onClose
        }).data("kendoWindow").center().open();

    } catch (e) {
        alertDialogs("Function: windowPopUp Error: " + e.message);
    }
}

//function onClose() {
//    alertDialogs("cerrando");
//    $("#window").fadeIn();
//}

function cambiarClave() {
    reemplazarDiv("divBtCambiarClave", "cambiarClave");
}

function guardarClave() {

    try {
        if (document.getElementById("IpClave").value == document.getElementById("IpRClave").value) {
            var cambioExitoso;
            var jSonData = new Object();
            jSonData.dslogin = new Object();
            jSonData.dslogin.ttdatauser = new Array();
            jSonData.dslogin.ttdatauser[0] = new Object();
            jSonData.dslogin.ttdatauser[0].picusrcod = sessionStorage.getItem("usuario");
            jSonData.dslogin.ttdatauser[0].picusrpass = "";
            jSonData.dslogin.ttdatauser[0].picfiid = sessionStorage.getItem("picfiid");
            jSonData.dslogin.ee_userPAS = new Array();
            jSonData.dslogin.ee_userPAS[0] = new Object();
            jSonData.dslogin.ee_userPAS[0].euserid = sessionStorage.getItem("usuario");
            jSonData.dslogin.ee_userPAS[0].epassword = document.getElementById("IpClave").value;
            jSonData.dslogin.ee_userPAS[0].usrmail = sessionStorage.getItem("usrmail");


            $.ajax({
                type: "POST",
                data: JSON.stringify(jSonData),
                url: ipServicios + baseServicio + "cambiopass",
                dataType: "json",
                contentType: "application/json;",
                success: function (resp) {
                    cambioExitoso = JSON.stringify(resp.dslogin.eeEstados[0].Estado);
                },
                error: function (e) {
                    alertDialogs("Error al consumir el servicio de login.\n" + e.status + " - " + e.statusText);
                }
            }).done(function () {
                if (cambioExitoso === '"OK"') {
                    alertDialogs("cambio existoso, sera redirigido al login");
                    cerrarSesion();
                } else {
                    alertDialogs(cambioExitoso);
                }

            });
            reemplazarDiv("cambiarClave", "divBtCambiarClave");
        } else {
            alertDialogs("Datos incompletos");
        }
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
}
/*
 * Funcion reemplaza un div por otro, oculta el divOcultar y muestra el divMostrar con un leve efecto.
 */
function reemplazarDiv(divOcultar, divMostrar) {
    document.getElementById(divOcultar).style.display = 'none';
    $("#" + divMostrar).fadeIn("slow");
}

function mostrarArbol() {
    $("#divArbol").fadeIn("slow");
}
function ocultarArbol() {
    $("#divArbol").fadeOut("slow");
}
/*
 * Funcion que se encarga de limpiar todas las variables de sesion y retornar a la pagina de login.
 */
function cerrarSesion() {
    window.location.assign(sessionStorage.getItem("url"));
    sessionStorage.clear();
}
/*
 * reestructura el json que esta en menuJsonIni y lo trasnforma de tal forma que sea util para enviarlo a la pag tree2.html la cual muestra una arbol
 */
function menufunciones() {
    try {
        var jSonData = new Object();
        jSonData.dslogin = new Object();
        jSonData.dslogin.ttdatauser = new Array();
        jSonData.dslogin.ttdatauser[0] = new Object();
        jSonData.dslogin.ttdatauser[0].picusrcod = sessionStorage.getItem("usuario");
        jSonData.dslogin.ttdatauser[0].picfiid = sessionStorage.getItem("picfiid");

        var jsonResp = "";
        var permitirIngreso;
        $.ajax({
            type: "POST",
            data: JSON.stringify(jSonData),
            url: ipServicios + baseServicio + "arbol",
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {
//                menuUsuario = JSON.stringify(resp.dslogin.ttmenuxusuario);
//                sessionStorage.setItem("menuJsonIni", menuUsuario);
                permitirIngreso = JSON.stringify(resp.dslogin.eeEstados[0].Estado);
                jsonResp = resp.dslogin.ttmenuxusuario;
                
            },
            error: function (e) {
                alertDialogs("Error" + JSON.stringify(e));
            }
        }).done(function () {
            var dataarbol = JSON.stringify(jsonResp);
            if (permitirIngreso === '"OK"') {
                if (dataarbol) {
                    dataarbol = dataarbol.replace(/Codigo/g, "id");
                    dataarbol = dataarbol.replace(/Depende/g, "parent");
                    dataarbol = dataarbol.replace(/Nombre/g, "text");
                    dataarbol = dataarbol.replace(/thumbail/g, "icon");
                    dataarbol = dataarbol.replace(/CON IMAGEN/g, "../css/images/leaf.gif");
                    dataarbol = dataarbol.replace(/SIN IMAGEN/g, "");
                    dataarbol = dataarbol.replace(/Servicio/g, "columna5");
                    txtJson = "{ \"plugins\" : [\"search\"],\"core\" : { \"data\" : " + dataarbol + "},\"search\": {\"case_insensitive\": true,\"show_only_matches\" : true}}";
                    sessionStorage.setItem("txtJson2", txtJson);
                    cargarArbol(JSON.parse(txtJson));

                }
            } else {
                alertDialogs(permitirIngreso);
            }
        });


    } catch (e) {
        alertDialogs(e.message);
    }
}


function inicio() {
    window.location.assign("index.html");
}

function abreFuncion(servicio) {
    tamanoFunciones();
    limpiarfiltros();
    document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0; z-index:-1";
    $("#tdPerfil").fadeOut("slow");
    $('#divDerecho').width($(window).width());
    var regex = /\/\w+\/html\/\w+.html/g;//ejemplo-------/pedidos/html/rutaTransportistas.html
    apagarBotones();
    cambiarFondoTD("tdVerde");
    if (servicio.slice(0, 5) === "html&") {
        var servicio = servicio.replace(/html&/g, "");
        sessionStorage.setItem("servicio", servicio);
        document.getElementById("idFrame").src = sessionStorage.getItem("url") + servicio + "/html/" + servicio + ".html";
    } else if (servicio.slice(0, 8) == "caracter") {
        var contra = sessionStorage.getItem("contra");//sbm.util.getValue("textField1");
        var servicio = servicio.replace(/caracter/g, "");
        sessionStorage.setItem("servicio", servicio);
        sessionStorage.setItem("sesion", sessionStorage.getItem("picfiid"));
        servLinuxSOption(servicio);
        //document.getElementById("idFrame").src = urlIFrame + "IntegrityViejo/Start.jsp";        
    } else if (servicio === "ReporteConsulta") {
//        $('#divDerecho').width($(window).width());
//        document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0; z-index:-1";
//            var urlFrameNew = "http://" + ip + ":" + puerto + "/" + servicio;
//            document.getElementById("idFrame").src = urlFrameNew;
        var arbol = $('#jstree2').jstree(true);
        sessionStorage.setItem("idRepo", arbol._model.data[arbol.get_selected()].original.Parametro);
        sessionStorage.setItem("nomRepo", arbol._model.data[arbol.get_selected()].original.text);
        document.getElementById("idFrame").src = sessionStorage.getItem("url") + "Reporteador/viewRepo/html/viewRepo.html";
        document.getElementById("tdPerfil").style = "display:none";
//    } else if (regex.test(servicio)) {
//        sessionStorage.setItem("servicio", servicio);
//        document.getElementById("idFrame").src = sessionStorage.getItem("url") + servicio;
    } else {
//        document.getElementById("idFrame").src = urlIFrame + servicio + "/Start.jsp";
        sessionStorage.setItem("servicio", servicio);
        document.getElementById("idFrame").src = sessionStorage.getItem("url") + servicio;
    }

}

function fijarPcf() {//apenas el usuario da click en alguna funcion del arbol tree2.html regresa a esta funcion con el nombre de la funcion y el id 
    try {
        var dataarbol = txtJson;
        var datas = JSON.parse(dataarbol);
        for (var i = 0; i < datas.core.data.length; i++) {//for para montar los datos en unas variables que van a ser utilizadas para identificar la fun seleccionada
            var funCod = datas.core.data[i].id;
            var funDes = datas.core.data[i].text;
            var funIco = datas.core.data[i].icon;
            var funUrl = datas.core.data[i].columna5;
            var funProg = datas.core.data[i].Programa;
            var funVideo = datas.core.data[i].Tablas;
            var funRepor = datas.core.data[i].Parametro;
            //var funUrl = "TiposContabilizacion/Start.jsp";
            arreglo_funCod[i] = funCod;
            arreglo_funDes[i] = funDes;
            arreglo_funIco[i] = funIco;
            arreglo_funUrl[i] = funUrl;
            arreglo_funProg[i] = funProg;
            arreglo_funVideo[i] = funVideo;
            arreglo_funRepor[i] = funRepor;
        }
        var idFSelect = sessionStorage.getItem("pcf");
        var textFSelec = arreglo_funDes[arreglo_funCod.indexOf(idFSelect)];
        var urlFSelec = arreglo_funUrl[arreglo_funCod.indexOf(idFSelect)];
        var urlVideo = arreglo_funVideo[arreglo_funCod.indexOf(idFSelect)];
        var urlRepor = arreglo_funRepor[arreglo_funCod.indexOf(idFSelect)];
        sessionStorage.setItem("pcf", "");
        if ((!urlFSelec) && (arreglo_funProg[arreglo_funCod.indexOf(idFSelect)])) {
            urlFSelec = "caracter" + arreglo_funProg[arreglo_funCod.indexOf(idFSelect)];
        } else if (urlRepor != "") {
            sessionStorage.setItem("idrepcon", urlRepor);
        }
        abreFuncion(urlFSelec);
        ocultarArbol();

    } catch (e) {
        alertDialogs(e.message + " fijarPcf()");
    }
}

function correLinuxBack() {//corre las funciones del shell in a box

    if (timerOut < 10) {

        var obj = new POST_SIRlogged();
        var objLogged = obj.getjson();
        var urlServ = obj.getUrlSir();
        var mapData = obj.getMapData();

        var jsonResp = "";
        var permitirIngreso = "";
        var verHtml = "POST";
        $.ajax({
            type: verHtml,
            data: JSON.stringify(objLogged),
            url: urlServ,
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {
                var key1 = Object.keys(resp)[0];
                permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
                jsonResp = resp;
            },
            error: function (e) {
                alertDialogs("Error al consumir el servicio de POST_SIRlogged" + e.status + " - " + e.statusText);
            }
        }).done(function () {
            if (permitirIngreso === '"OK"') {
                if (verHtml === "POST") {
                    var key1 = Object.keys(jsonResp)[0];
                    var loggIn = jsonResp[key1][mapData][0].isLogged;
                    if (loggIn) {
                        clearInterval(timer)//limpiar el timer
                    } else {
                        try {

                            var ip = (((sessionStorage.getItem("url").split("/"))[2]).split(":"))[0];
                            var linux = sessionStorage.getItem("linux");
                            document.getElementById("includeTerm").src = linux
                                    + "?u="
                                    + sessionStorage.getItem("usuario")
                                    + "&p="
                                    + sessionStorage.getItem("contra");
                        } catch (e) {
                            alertDialogs(e.message + " corre");
                        }
                    }

                }

            } else {
                //            closeLoading("#operaciones");
                alertDialogs("Problemas con el el ingreso del usuario en la plataforma Linux .\n" + permitirIngreso);
            }

        });
        timerOut++;
    } else {
        alertDialogs("No fue posible conectarse a la terminal de Integrity.");
        clearInterval(timer)//limpiar el timer

    }
}
function corre() {//esta funcion se ejecuta por que la app IntegrityViejo la llama y su funcion es determinar si le muestra al usuario la plataforma linux Envevida o una cosola de wind   
    var hibrido = sessionStorage.getItem("hibrido");
    tamanoShell();
    if (hibrido == "LinuxWeb") {
        document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0;";
        document.getElementById("labelConsole").innerHTML = sessionStorage.getItem("ncf");
    } else {
        document.location.href = "localexplorer:W:/SrcDesarrollo/Programas/Shell/integrity3.bat";
    }
}
function servLinuxSOption(programa) {
    var jSonData = {
        "dsOpcion": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeParametros": [
                {
                    "picprograma": programa,
                    "piccianit": sessionStorage.getItem("companyNIT")
                }
            ]
        }
    };
    var jsonResp = "";
    var permitirIngreso;
    $.ajax({
        "async": false,
        type: "POST",
        data: JSON.stringify(jSonData),
        url: ipServicios + baseServicio + "SOpcion",
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            msnError("Error al consumir el servicio de login.\n" + e.status + " - " + e.statusText);
            var buttonObject = $("#btnLogin").kendoButton().data("kendoButton")
            buttonObject.enable(true);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            corre();
        } else {
            $("body").append("<div id='dialogs'></div>");
            var dialog = $('#dialogs');
            dialog.kendoDialog({
                width: "400px",
                title: "Problemas con el inicio sesión en plataforma Caracter",
                closable: false,
                modal: true,
                content: "<p>" + permitirIngreso + "</p><br>",
                actions: [
                    {text: 'Intentar de nuevo', primary: true, action: IntentarNuevamente}
                ]
            });
            var buttonObject = $("#btnLogin").kendoButton().data("kendoButton")
            buttonObject.enable(true);
        }
    });
}
function IntentarNuevamente() {
    var dialog = $('#dialog');
    dialog.fadeIn('slow', function () {
        $(".dialog").remove();
    });
}
function tamanoShell(e) {
    estadoIfra = "PagShell";
    if (e) {
        div_ancho = e;
        $("#divDerecho").width(div_ancho);
    }
    var div_ancho = $("#divDerecho").width();
    var div_alto = $("#divDerecho").height();

//    $("#divIFrame").width(div_ancho - 500);
//    $("#divIFrame").height(div_alto);
    $("#divFrameInc").height(div_alto - 51);
    $("#idFrame").height(div_alto);
    $("#idFrame").width(div_ancho - 35 - 20);

    $("#includeTerm").height(div_alto - 51);
    $("#includeTerm").width(div_ancho - 51);
    $("#includeArbol").height(div_alto - 10);
}

function tamanoPagIni(width) {
    estadoIfra = "PagInicio";
    var div_ancho = $("#divDerecho").width();
    var div_alto = $("#divDerecho").height();

    $("#includeTerm").height(div_alto - 51);
    $("#includeTerm").width(div_ancho - 51);
//    $("#divIFrame").width(div_ancho - 500);
    $("#divFrameInc").height(div_alto - 51);
//    $("#divIFrame").height(div_alto);
    $("#idFrame").width(div_ancho - 35 - 253 - 20);
    $("#includeArbol").height(div_alto - 10);
}

function tamanoFunciones(e) {

    estadoIfra = "PagFunciones";
    if (e) {
        div_ancho = e;
        $("#divDerecho").width(div_ancho);
    }
    var div_ancho = $("#divDerecho").width();
    var div_alto = $("#divDerecho").height();

//    $( "#includeTerm" ).height( div_alto - 44);
//    $( "#includeTerm" ).width( div_ancho - 35-20);
//    
    $("#includeTerm").width(div_ancho - 51);
//    $("#divIFrame").width(div_ancho - 500);
//    $("#divIFrame").height(div_alto);
    $("#divFrameInc").height(div_alto - 51);

    $("#idFrame").height(div_alto);
    $("#idFrame").width(div_ancho - 35 - 20);
    $("#includeArbol").height(div_alto - 10);
}
function mostrarConfig(){
    apagarBotones();
    cambiarFondoTD("tdVerde");
    document.getElementById("divFrameInc").style = "position: absolute; left: 0; top: 0; z-index:-1";
    document.getElementById("idFrame").src = sessionStorage.getItem("url")+"restriccionesData/html/restriccionesData.html";
}

function mostrarDocumentos() {
    $('#grid').data('kendoGrid').dataSource.read();
    $('#grid').data('kendoGrid').refresh();
    $("#divNotificaciones").fadeOut("slow");
    $("#divCenteredNotification").hide();
    $("#divDocumentos").fadeIn("slow");
}
function mostrarNotificaciones() {
    $("#divDocumentos").fadeOut("slow");
    $("#imgNotificaciones").removeClass();
    $("#divCenteredNotification").hide();
    $("#divNotificaciones").fadeIn("slow");
    notificaciones();
}
function ocultarNotificaciones() {
    $("#divNotificaciones").fadeOut("slow");
}
function ocultarDocumentos() {
    $("#divDocumentos").fadeOut("slow");
}
function closeFrame() {
    var friends = document.getElementById("idFrame");
    friends.style.display = "none";
}

function cargaDocumentos() {
    var tamañoContenedor = $("#outerWrapper").width();
    var d = document.getElementById('divDocumentos');
    d.style.left = (tamañoContenedor - 300) + 'px';
    //la funcion documento esta en la documentos.js
    documentos();
}
function consultaImgUsr() {
    var objSir = new GetProfileImage();
    var urlSir = objSir.getUrlSir();
    var mapSir = objSir.getMapData();
    var inputsir = objSir.getjson();

    var img = "";
    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: "POST",
        data: JSON.stringify(inputsir),
        url: urlSir,
        async: false,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp[key1];
            bandAlert = 0;
        },
        error: function (e) {
            alertDialogs("Error al consumir el servicio GetProfileImage" + e.status + " - " + e.statusText);
            bandAlert = 0;
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            img = jsonResp.eeProfileImage[0][mapSir]
        }

    });

    return img;
}




function mostrarCumple() {
    document.getElementById("idFrame").src = "birthdays.html";
}
function mostrarNotiCumple() {

    $("#regalo").fadeIn("slow");
    var centered = $("#centeredNotification").kendoNotification({
        position: {
            pinned: true,
            top: 58,
            right: 0
        },
        autoHideAfter: 5000,
        stacking: "down",
        templates: [{
                type: "upload-success",
                template: $("#msnTemplate").html()
            }]

    }).data("kendoNotification");
    centered.show({title: "", message: "Alguien en tu equipo está cumpliendo años."}, "upload-success");
}

function mostrarListaCumple() {
    $("#divDocumentosd").fadeIn("slow");

}
function cerrarListaCumple() {
    $("#divDocumentosd").fadeOut("slow");
    $("#regalo").fadeOut("slow");
}

var app = angular.module("firstApp", []);
app.controller("firstControler", ["$scope", "$http", function ($scope, $http) {
        $scope.objSir = new Getbirthdays();
        $scope.urlSir = $scope.objSir.getUrlSir();
        $scope.mapSir = $scope.objSir.getMapData();
        $scope.inputsir = $scope.objSir.getjson();

        $scope.items = [];
        $scope.permitirIngreso = "";
        $scope.jsonResp = [];
        $scope.key1 = [];

        $http.post(ipServicios + baseServicio + "Getbirthdays", $scope.inputsir
                ).success(function (resp, status, headers, config) {

            $scope.key1 = Object.keys(resp)[0];
            $scope.permitirIngreso = JSON.stringify(resp[$scope.key1].eeEstados[0].Estado);
            $scope.jsonResp = resp[$scope.key1];
            if ($scope.permitirIngreso == '"OK"') {
                if ($scope.jsonResp.ownbirthday[0].mybirthday) {
                    mostrarCumple();
                } else if ($scope.jsonResp[$scope.mapSir]) {
                    mostrarNotiCumple();
                    $scope.items = $scope.jsonResp[$scope.mapSir];
                    document.getElementById("idFrame").src = "fondo.html";
                }
            } else {
                document.getElementById("idFrame").src = "fondo.html";
                alertDialogs("Error al consumir el servicio Getbirthdays .\n" + $scope.permitirIngreso);
            }
        }).error(function (error, status, headers, config) {
            document.getElementById("idFrame").src = "fondo.html";
            console.log(error);
        });

    }]);


function limpiarfiltros() {
    sessionStorage.removeItem("jsonFiltroPedidos");
    sessionStorage.removeItem("regPedidos");
}

function popUpSubirArchivo() {
    $("body").append("<div id='windowSubirArchivo'></div>");
    var myWindow = $("#windowSubirArchivo");
    var undo = $("#undo");

    function onCloseWindowCabPedido() {
        document.getElementById("windowSubirArchivo").remove();
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: 300,
        height: 200,
        title: "Adjuntar archivo",
        content: sessionStorage.getItem("url") + "/documentos/html/popupSubirArchivo.html",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: onCloseWindowCabPedido
    }).data("kendoWindow").center().open();
}

function closePopUpSubirArchivo(msj) {
    alertDialogs(msj);
    $("#windowSubirArchivo").data("kendoWindow").close();
}
function scrollFull() {
    if ($("body").scrollTop() !== 0) {
        $("body").scrollTop(0);
    }
    ;
}
document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
});

function notifyMe(mensaje) {
    if ((mensaje.texto !== 'null') && ((mensaje.texto !== ''))) {

        var myAudio = document.getElementById("myAudioNoty");

        //$("#mensaje").fadeIn("slow");
        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.');
            return;
        }

        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            if (mensaje.onLoad) {
                metodEventClickNoticacion(mensaje.onLoad);///metodos ubicados en metodEventClickNoticacion.js 
            }
            myAudio.play();
            var notification = new Notification(mensaje.titulo, {
                icon: '../images/Login%20Inicio-07.png',
                body: mensaje.texto,
            });
            notification.onclick = function () {
                //window.open("http://stackoverflow.com/a/13328397/1269037"); 
                myAudio.pause();
                myAudio.currentTime = 0;
                if (mensaje.onClick) {
                    metodEventClickNoticacion(mensaje.onClick);///metodos ubicados en metodEventClickNoticacion.js 
                }
                notification.close();
            };
            notification.onclose = function () {
                myAudio.pause();
                myAudio.currentTime = 0;
                if (mensaje.onClose) {
                    metodEventClickNoticacion(mensaje.onClose);///metodos ubicados en metodEventClickNoticacion.js 
                }
            };

        }
    }
}


