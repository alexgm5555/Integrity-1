/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * Funcion para obtener la url y el json de entrada para los despacho pendientes de facturar
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SIRdpc_cab() {
    var mapData = "eedpc_cab";
    var urlSir = ipServicios + baseComercial + "SIRdpc_cab";
    var json = 
            {  
                "dsSIRdpc_cab":{  
                    "eeDatos":[  
                {  
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRdpc_cab":[  
                {  
                    "picsuc_cod": "*",
                    "piddpc_fec": "?",
                    "piidpc_num" : 0,
                    "picclc_cod":"*",
                    "piidpc_est":"99",
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
 * Funcion para obtener la url y el json de entrada para facturar el despacho
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SICUDgfc_fac_dpc() {
    var mapData = "eeSICUDfac_fac_dpc";
    var urlSir = ipServicios + baseComercial + "SICUDgfc_fac_dpc";
    var json = 
            {  
                "dsSICUDfac_fac_dpc":{  
                    "eeDatos":[  
                {  
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eedpc_cab":[  
                {  
                    "piindicador": 0,
                    "act__cod": "",
                    "cab__obs": "",
                    "cam__cod": 0,
                    "car__fec": "",
                    "car__kgs": 0,
                    "car__num": "",
                    "car__val": 0,
                    "cial__cod": "",
                    "ciu__cod": "",
                    "clc__cod": "",
                    "com__con": "",
                    "con__cc": "",
                    "con__nom": "",
                    "cpto__cod": 0,
                    "cto__cod": "",
                    "dpc__anu": false,
                    "dpc__car": "",
                    "dpc__cor": false,
                    "dpc__est": 0,
                    "dpc__fec": "",
                    "dpc__fle": true,
                    "dpc__num": 0,
                    "dpc__rec": false,
                    "dpc__val": 0,
                    "fec__ant": null,
                    "fec__cor": null,
                    "fec__rec": null,
                    "hor__ent": "",
                    "pla__cod": "",
                    "rec__cons": 0,
                    "rut__cod": 0,
                    "suc__cod": "",
                    "ter__aret": false,
                    "ter__cret": false,
                    "ter__nit": "",
                    "ter__ret": false,
                    "ter__vret": false,
                    "usr__cod": "",
                    "usr__cod__r": "",
                    "ven__cod": 0
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
 * Funcion para obtener la url y el json de entrada para facturar el despacho
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function dsSIRdpc_det() {
    var mapData = "eedpc_det";
    var urlSir = ipServicios + baseComercial + "SIRdpc_det";
    var json = 
            {  
            "dsSIRdpc_det":{  
                "eeDatos":[  
                {  
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRdpc_det":[  
                {  
                    "picsuc-cod": "*",
                    "piddpc-fec": "?",
                    "piidpc-num": 0,
                    "picclc-cod": "*",
                    "piiped-num": 0,
                    "pidped-fec": "?",
                    "picclc-cod-ped": "*",
                    "piicla-cod": 0,
                    "picart-cod ": "*",
                    "picter-nit1": "*",
                    "picciu-cod ": "*",
                    "picpre-pcod": "*",
                    "piilis-num": 0,
                    "piiped-ano": 0,
                    "pidfec-ent": "?",
                    "picexi-lot ": "*"
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
 * Funcion para obtener la url y el json de entrada para facturar el despacho
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 *  
 *    "eeSIRsic_clc": [{
   "piiclc_cod": "*",
   "Piipor_cod_aso": "03"
 */
function dssic_clc() {
    var mapData = "eesic_clc";
    var urlSir = ipServicios + baseParameters + "SIRsic_clc";
    var json = 
            {  
            "dssic_clc":{  
                "eeDatos":[  
                {  
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRsic_clc":[  
                {  
                    "piiclc_cod": "*",
                    "piipor_cod_aso": "?"                    
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