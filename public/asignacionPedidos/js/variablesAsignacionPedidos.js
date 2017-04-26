/**
 * Funcion para obtener la url y el json de entrada para la lista de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaAsignarPedidos() {
    var mapData = "eegpd_ped_det";
    var urlSir = ipServicios + baseComercial + "SIRgpd_pdet_prov";
    var json = {
                        "dsSIRgpd_pdet_prov": {
                                "eeDatos": [{
                                        "picusrcod": sessionStorage.getItem("usuario"),
                                        "picfiid": sessionStorage.getItem("picfiid"),
                                        "local_ip": sessionStorage.getItem("ipPrivada"),
                                        "remote_ip": sessionStorage.getItem("ipPublica")

                                }],
                                "eeSIRgpd_pdet_prov": [{
                                        "piitipo": 0,
                                        "pidfecha": ""
                                }]
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
 * Funcion para obtener la url y el json de entrada para la Actualizacion de los registros
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SICUDAsignarPedidos() {    
    var mapData = "eegpd_ped_det";
    var urlSir = ipServicios + baseComercial + "SICUDgpd_pdet_asig";
    
    var json = {
                        "dsSICUDgpd_pdet_asig": {
                                "eeDatos": [{
                                        "picusrcod": sessionStorage.getItem("usuario"),
                                        "picfiid": sessionStorage.getItem("picfiid"),
                                        "local_ip": sessionStorage.getItem("ipPrivada"),
                                        "remote_ip": sessionStorage.getItem("ipPublica")

                                }],
                                "eegpd_ped_det": [{
                                                    "ped__fec": "?",
                                                    "suc__cod": "*",
                                                    "clc__cod": "*",
                                                    "cla__cod": 0,
                                                    "art__cod": "*",
                                                    "ped__num": 0,
                                                    "lis__num": 0,
                                                    "ped__aasi": 0
                                }]
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