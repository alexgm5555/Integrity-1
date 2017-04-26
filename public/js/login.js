
var usuario;
var password;

function onLoad() {
    //sessionStorage.clear();
    errorHtml();
    var url = document.URL;
    sessionStorage.setItem("url", url);
    var y = document.URL.split("/");
    var ipPuerto = document.URL.split("/")[2];
    var puerto = y[2].split(":");
    sessionStorage.setItem("ip", puerto[0]);
    sessionStorage.setItem("puerto", puerto[1]);

    $("#btnLogin").kendoButton({
    });
    $( "#logoIntegrity" ).click(function() {
//        window.location = window.location.href+'?eraseCache=true';
        location.reload(true);
      });
    presionaEnter();
}

/*
 * Metodo que consume el servicio de para el Login
 * 
 */
function login() {

    usuario = $("#usuario").val();
    password = $("#password").val();
    
    var buttonObject = $("#btnLogin").kendoButton().data("kendoButton")
    buttonObject.enable(false);
    dominio($("#usuario").val());
    try {
        var jSonData = new Object();
        jSonData.dslogin = new Object();
        jSonData.dslogin.ttdatauser = new Array();
        jSonData.dslogin.ttdatauser[0] = new Object();
        jSonData.dslogin.ttdatauser[0].picusrcod = usuario;
        jSonData.dslogin.ttdatauser[0].picusrpass = password;
        jSonData.dslogin.ttdatauser[0].local_ip = sessionStorage.getItem("ipPrivada");
        jSonData.dslogin.ttdatauser[0].remote_ip = sessionStorage.getItem("ipPublica");
        var jsonResp = "";
        var permitirIngreso;
		var token = "";			   
        $.ajax({
            type: "POST",
            data: JSON.stringify(jSonData),
            url: ipServicios + baseServicio + "Login",
            dataType: "json",
            contentType: "application/json;",
            success: function (resp, textStatus, response) {
				token = response.getResponseHeader('Pragma');permitirIngreso = JSON.stringify(resp.dslogin.eeEstados[0].Estado);
                jsonResp = resp;
            },
            error: function (e) {
                kendo.alert("Error al consumir el servicio de login.\n" + e.status + " - " + e.statusText);
                var buttonObject = $("#btnLogin").kendoButton().data("kendoButton");
                buttonObject.enable(true);
            }
        }).done(function(){            
            if(permitirIngreso==='"OK"'){  
                
                var fechaSistema=jsonResp.dslogin.eesiccia[0].fecsis;
                fechaSistema = fechaSistema.replace(/-/g, "/");    
                sessionStorage.setItem("usrnom",jsonResp.dslogin.eesicusuarios[0].usrnom);
                sessionStorage.setItem("actor",jsonResp.dslogin.eesicusuarios[0].actrcod);
                sessionStorage.setItem("clienteNIT",jsonResp.dslogin.eesicusuarios[0].usrcarp);
                sessionStorage.setItem("usuario",usuario.split("@")[0]+ "_"+jsonResp.dslogin.eesiccia[0].cianit);
                sessionStorage.setItem("usrmail",jsonResp.dslogin.eesicusuarios[0].usrmail);
                sessionStorage.setItem("picfiid",jsonResp.dslogin.ttdatauser[0].picfiid);                    
                sessionStorage.setItem("poccargo",jsonResp.dslogin.ttdatauser[0].poccargo);
                sessionStorage.setItem("img",jsonResp.dslogin.eesiccia[0].cialog);
                sessionStorage.setItem("companyNIT",jsonResp.dslogin.eesiccia[0].cianit);
                sessionStorage.setItem("monedaCompañia",jsonResp.dslogin.eesiccia[0].moneda);
                sessionStorage.setItem("razonSocial",jsonResp.dslogin.eesiccia[0].ciaraz);
                sessionStorage.setItem("fechaSistema",fechaSistema);
                sessionStorage.setItem("contra",jsonResp.dslogin.eesicusuarios[0].clavprov);                    
                sessionStorage.setItem('sesion', sessionStorage.getItem("picfiid"));
                sessionStorage.setItem("loginintegrity", "valido");
                sessionStorage.setItem("hibrido", jsonResp.dslogin.eesiccia[0].ciaserv);
                sessionStorage.setItem("linux", jsonResp.dslogin.eesiccia[0].ciapuerto);                
                sessionStorage.setItem("opcionesCompañia",JSON.stringify(jsonResp.dslogin.eeciaoptions));

                //window.location.assign("html/index.html");
		sessionStorage.setItem("idWeb",token);
                window.location = "/Integrity?idWeb="+token;											
//                if(jsonResp.dslogin.eesiccia[0].version !== getCookie("version")){
//                    document.cookie = "version=" + jsonResp.dslogin.eesiccia[0].version;
//                    location.reload(true);
//                }
            } else {
                var actions = new Array();
                actions[0] = new Object();
                actions[0].text = "Intentar de nuevo";
                actions[0].primary = "true";
                actions[0].action = "IntentarNuevamente";

//                createDialog("Problemas con el inicio sesión", permitirIngreso, "400px", "auto", true, false, actions);
                alertDialogs("Problemas con el inicio sesión\n"+ permitirIngreso);
                var buttonObject = $("#btnLogin").kendoButton().data("kendoButton");
                buttonObject.enable(true);
            }
        });

    } catch (e) {
        kendo.alert("Function: consumeServAjaxSIR Error: " + e.message);
        window.location.assign(sessionStorage.getItem("url"));
    }
}

/**
 * función que se encarga de cerrar el dialog
 * @returns {undefined}
 */
function IntentarNuevamente() {
    var dialog = $('#dialog');
    dialog.fadeOut();
    $("#book").fadeIn("slow", function () {
        // Animation complete
    });
    $(".dialog").remove();
}

/*
 *  Permite que los datos del fomulario sean enviando cuando el usuario oprime la tecla "Enter"
 */
function presionaEnter() {
    document.addEventListener('keyup', function (e) {
        e = e || window.event;
        var target = e.keyCode;
        if (target == 13) {
            if(bandAlert<1){
               document.getElementById("btnLogin").click(); 
            }
        }
    }, false);
}
/**
 * funcion que coloca una notificacion en caso de error 
 * @returns {undefined}
 */
function errorHtml() {
    if ((sessionStorage.getItem("errorHtml")) && ((sessionStorage.getItem("errorHtml") !== ""))) {
        var centered = $("#centeredNotification").kendoNotification({
            position: {
                pinned: true,
                top: 30,
                right: 30
            },
            autoHideAfter: 3000,
            stacking: "down",
            templates: [{
                    type: "error",
                    template: $("#errorTemplate").html()
                }]

        }).data("kendoNotification");
        centered.show({title: "", message: "Ocurrió un error en el servidor tipo: " + sessionStorage.getItem("errorHtml")}, "error");
        sessionStorage.removeItem("errorHtml");
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


