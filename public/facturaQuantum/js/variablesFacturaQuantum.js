
var auth = new Object();
auth.dssic_suc = new Object();
auth.dssic_suc.eeDatos = new Array();
auth.dssic_suc.eeDatos[0] = new Object();
auth.dssic_suc.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
auth.dssic_suc.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
auth.dssic_suc.eetemp = new Array();
auth.dssic_suc.eetemp[0] = new Object();
//console.log(JSON.stringify(auth));

var authfacpag = new Object();
authfacpag.dsfac_pag = new Object();
authfacpag.dsfac_pag.eeDatos = new Array();
authfacpag.dsfac_pag.eeDatos[0] = new Object();
authfacpag.dsfac_pag.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
authfacpag.dsfac_pag.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
authfacpag.dsfac_pag.eetemp = new Array();
authfacpag.dsfac_pag.eetemp[0] = new Object();
//console.log(JSON.stringify(authfacpag));

var authdssic_clc = new Object();
authdssic_clc.dssic_clc = new Object();
authdssic_clc.dssic_clc.eeDatos = new Array();
authdssic_clc.dssic_clc.eeDatos[0] = new Object();
authdssic_clc.dssic_clc.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
authdssic_clc.dssic_clc.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");

var authdssic_tcont = new Object();
authdssic_tcont.dssic_tcont = new Object();
authdssic_tcont.dssic_tcont.eeDatos = new Array();
authdssic_tcont.dssic_tcont.eeDatos[0] = new Object();
authdssic_tcont.dssic_tcont.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
authdssic_tcont.dssic_tcont.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
authdssic_tcont.dssic_tcont.eetemp = new Array();
authdssic_tcont.dssic_tcont.eetemp[0] = new Object();

//console.log(JSON.stringify(authsic_clc));

var authdssic_mnd = new Object();
authdssic_mnd.dssic_mnd = new Object();
authdssic_mnd.dssic_mnd.eeDatos = new Array();
authdssic_mnd.dssic_mnd.eeDatos[0] = new Object();
authdssic_mnd.dssic_mnd.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
authdssic_mnd.dssic_mnd.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
//console.log(JSON.stringify(authdssic_mnd));


/**
 * Funcion para obtener la url y el json de entrada para el Cliente de pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaCliente() {
    var mapData = "eegpd_cli";
    var urlSir = ipServicios + baseComercial + "SIRgpd_cli";
    var json = 
            {
                    "dsSIRgpd_cli" : {
                            "eeDatos" : [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"), 
                                            "local_ip":sessionStorage.getItem("ipPrivada"),
                                            "remote_ip":sessionStorage.getItem("ipPublica")
                                    }
                            ],
                            "SIRgpd_cli" : [{
                                            "piicla__cli" : 0,
                                            "picter__nit" : "",
                                            "picter__raz": "",
                                            "piicli__est": 0
                                    }
                            ]
                    }
            };

    this.setUrlSir = function (newname) {
        if (newname) {
            urlSir = newname;
        }
    };
    this.getUrlSir = function () {
        return urlSir;
    };

    this.setjson = function (newname) {
        if (newname) {
            json = newname;
        }
    };
    this.getjson = function () {
        return json;
    };

    this.setMapData = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getMapData = function () {
        return mapData;
    };

};

//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para la lista de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaVendedor() {
    var mapData = "eesic_ven";
    var urlSir = ipServicios + baseParameters + "SIRsic_ven";
    var json = {
            "dsSIRsic_ven": {
		"eeDatos":[
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRsic_ven": [
                {
                    "piccod_suc": "*",                    
                    "picven_cod": "*",
                    "piiven_est": -1,
                }
            ]
        }
    };

    this.setUrlSir = function (newname) {
        if (newname) {
            urlSir = newname;
        }
    };
    this.getUrlSir = function () {
        return urlSir;
    };

    this.setjson = function (newname) {
        if (newname) {
            json = newname;
        }
    };
    this.getjson = function () {
        return json;
    };

    this.setMapData = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getMapData = function () {
        return mapData;
    };

};

/**
 * Funcion para obtener la url y el json de entrada para la lista de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaClasesDeArticulos() {
    var mapData = "eeinv_cla";
    var urlSir = ipServicios + baseParameters + "SIRinv_cla";
 
    var json = {
            "dsinv_cla": {
		"eeDatos":[
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
                ],
                "eetemp": [
                    {
                        "picsuc_cod": "*"
                    }
                ]
            }
        };

    this.setUrlSir = function (newname) {
        if (newname) {
            urlSir = newname;
        }
    };
    this.getUrlSir = function () {
        return urlSir;
    };

    this.setjson = function (newname) {
        if (newname) {
            json = newname;
        }
    };
    this.getjson = function () {
        return json;
    };

    this.setMapData = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getMapData = function () {
        return mapData;
    };

};

/**
 * Funcion para obtener la url y el json de entrada para el autocomplete de articulo
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaArticulos() {
    var mapData = "eeinv_art";
    var urlSir = ipServicios + baseInventarios + "SIRinv_art";
    
    var json = {
            "dsSIRinv_art": {
		"eeDatos":[
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
                ],
                "eeSIRinv_art": [
                    {
                        "piicla_cod": "*",
                        "piilis_num": 1
                    }
                ]
            }
        };

    this.setUrlSir = function (newname) {
        if (newname) {
            urlSir = newname;
        }
    };
    this.getUrlSir = function () {
        return urlSir;
    };

    this.setjson = function (newname) {
        if (newname) {
            json = newname;
        }
    };
    this.getjson = function () {
        return json;
    };

    this.setMapData = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getMapData = function () {
        return mapData;
    };

};

var authdssic_pdif = new Object();
authdssic_pdif.dssic_pdif = new Object();
authdssic_pdif.dssic_pdif.eeDatos = new Array();
authdssic_pdif.dssic_pdif.eeDatos[0] = new Object();
authdssic_pdif.dssic_pdif.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
authdssic_pdif.dssic_pdif.eeDatos[0].fiid = sessionStorage.getItem("picfiid");