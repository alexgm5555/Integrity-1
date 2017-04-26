//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para la lista de contabilizaciones
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirconsultaMConta() {
    var mapData = "eesic_tcont";
    var urlSir = ipServicios + baseParameters + "SIRsic_tcont";
    var json = {
        "dssic_tcont": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
//                  "local_ip":sessionStorage.getItem("ipPrivada"),
//                  "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eetemp": [
                {
                    "piitcont__cod": 0,
                    "picclc__cod": "*"
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
 * Funcion para obtener la url y el json de entrada para la lista de conceptos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConcepto() {
    var mapData = "eesic_tcont";
    var urlSir = ipServicios + baseParameters + "SIRsic_tcont";
    var json = {
        "dssic_tcont": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
//                  "local_ip":sessionStorage.getItem("ipPrivada"),
//                  "remote_ip":sessionStorage.getItem("ipPublica")
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
 * Funcion para obtener la url y el json de entrada para la lista de clase Documentos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirDocumentos() {
    var mapData = "eesic_clc";
    var urlSir = ipServicios + baseParameters + "SIRsic_clc";
   var json = {
        "dssic_clc": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "fiid": sessionStorage.getItem("picfiid"),
//                    "local_ip":sessionStorage.getItem("ipPrivada"),
//                    "remote_ip":sessionStorage.getItem("ipPublica")
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
 * Funcion para obtener la url y el json de entrada para la lista de clase Documentos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SICUDsic_tcont() {
    var mapData = "eesic_tcont";
    var urlSir = ipServicios + baseParameters + "SICUDsic_tcont";
    var json = {
        "dssic_tcont": {
            "eeDatos": [{
                "picusrcod": sessionStorage.getItem("usuario"),
                "fiid": sessionStorage.getItem("picfiid")
            }],
            "eesic_tcont": [{
                "clc__cod": "",
                "form__cod": 0,
                "mnd__ext": false,
                "tcont__cod": 0,
                "tcont__des": "",
                "tcont__est": 0,
                "tcont__fac": false,
                "tcont__form": "",
                "tcon_dif": false,
                "ter__reg ": ""
            }]
        }
   }

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


