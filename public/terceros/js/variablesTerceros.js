function sirCiudades() {
    
    var mapData = "eesic_ciu";
    var urlSir = ipServicios + baseParameters +"SIRsic_ciu_xpais";
    var json = {  
   "dsSIRsic_ciuxpais":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
		"eeSIRsic_ciu_xpais": [{
			"picciu_cod": "*"
			
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

function sirConsultaCliente() {
    var mapData = "eesic_ter";
    var urlSir = ipServicios + baseParameters + "SIRsic_ter";
    var json = 
           {  
   "dsSIRsic_ter":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
  "eeSIRsic_ter": [{
       "picter_nit": "*",
       "picter_raz": "",
       "piiter_est": -1
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
 * Funcion para obtener la url y el json de entrada para Régimen (contributivo)
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirRegimen() {
    var mapData = "eesic_reg";
    var urlSir = ipServicios + baseContabilidad + "SIRsic_reg";
    var json = {
                        "dssic_reg": {
                                "eeDatos": [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"),
                                            "local_ip":sessionStorage.getItem("ipPrivada"),
                                            "remote_ip":sessionStorage.getItem("ipPublica")
                                }],
                                "eeSIRsic_reg": [{
                                "picreg__cod": "*"
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
 * Funcion para obtener la url y el json de entrada para las clases de tercero
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirClaseTercero() {
    var mapData = "eesic_cla";
    var urlSir = ipServicios + baseContabilidad + "SIRsic_cla";
    var json = {
                        "dsSIRsic_cla": {
                                "eeDatos": [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"),
                                            "local_ip":sessionStorage.getItem("ipPrivada"),
                                            "remote_ip":sessionStorage.getItem("ipPublica")
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
 * Funcion para obtener la url y el json de entrada para las actividades economicas
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirActividadEconomica() {
    var mapData = "eesic_activ";
    var urlSir = ipServicios + baseContabilidad + "SIRsic_activ";
    var json = {
                        "dsSIRsic_activ": {
                                "eeDatos": [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"),
                                            "local_ip":sessionStorage.getItem("ipPrivada"),
                                            "remote_ip":sessionStorage.getItem("ipPublica")
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
 * Funcion para obtener la url y el json de entrada para Régimen Fiscal (ecuador)
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirRegimenFiscal() {
    var mapData = "eesic_trf";
    var urlSir = ipServicios + baseContabilidad + "SIRsic_trf";
    var json = {
                        "dsSIRsic_trf": {
                                "eeDatos": [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"),
                                            "local_ip":sessionStorage.getItem("ipPrivada"),
                                            "remote_ip":sessionStorage.getItem("ipPublica")
                                }],
                                "SIRsic_trf": [{
                                    "pictrf_cod": "*"
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
 * Funcion para obtener la url y el json de entrada para Paraiso Fiscal (ecuador)
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirParaisoFiscal() {
    var mapData = "eesic_para";
    var urlSir = ipServicios + baseContabilidad + "SIRsic_para";
    var json = {
                        "dsSIRsic_para": {
                                "eeDatos": [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"),
                                            "local_ip":sessionStorage.getItem("ipPrivada"),
                                            "remote_ip":sessionStorage.getItem("ipPublica")
                                }],
                                "SIRsic_para": [{
                                    "piipara_cod": "*"
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
 * Funcion para obtener la url y el json de entrada para Pago residentes (ecuador)
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirPagoResidentes() {
    var mapData = "eesic_tpa";
    var urlSir = ipServicios + baseContabilidad + "SIRsic_tpa";
    var json = {
                        "dsSIRsic_tpa": {
                                "eeDatos": [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"),
                                            "local_ip":sessionStorage.getItem("ipPrivada"),
                                            "remote_ip":sessionStorage.getItem("ipPublica")
                                }],
                                "SIRsic_tpa": [{
                                    "pictpa_cod": "*"
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

function sirTipoDocumentoIdentificacion() {
    var mapData = "eesic_cln";
    var urlSir = ipServicios + baseParameters + "SIRsic_cln";
    var json = {
                        "dsSIRsic_cln": {
                                "eeDatos": [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"),
                                            "local_ip":sessionStorage.getItem("ipPrivada"),
                                            "remote_ip":sessionStorage.getItem("ipPublica")
                                }],
                                "SIRsic_cln": [{
                                    "picter__cln": "*",
                                    "piccln__des": "*",
                                    "pictip__doc": "*"
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

function sirPais() {    
    var mapData = "eesic_pais_med";
    var urlSir = ipServicios + baseParameters + "SIRsic_pais_med";
    var json = {
                        "dsSIRsic_pais_med": {
                                "eeDatos": [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"),
                                            "local_ip":sessionStorage.getItem("ipPrivada"),
                                            "remote_ip":sessionStorage.getItem("ipPublica")
                                }],
                                "SIRsic_pais_med": [{
                                    "picciu__cod": "*",
                                    "piccod__pais": "*"
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

function SICUDTercero(){
    var mapData = "eesic_pais_med";
    var urlSir = ipServicios + baseParameters + "SICUDsic_ter";
    var json = {
	"dsSICUDsic_ter": {
		"eeDatos": [{
			"picusrcod": sessionStorage.getItem("usuario"),
                        "picfiid": sessionStorage.getItem("picfiid"),
                        "local_ip":sessionStorage.getItem("ipPrivada"),
                        "remote_ip":sessionStorage.getItem("ipPublica")
		}],
		"eesic_ter": [{
			"piindicador": 0,
			"ter__nit": "",
			"ter__cln": "",
			"ter__raz": "",
			"ter__rep": "",
			"ter__dir": "",
			"ter__tel": "",
			"cla__ter": "",
			"activ__cod": 0,
			"ter__sin": "",
			"ter__fax": "",
			"ter__ret": "",
			"ter__est": 0,
			"ciu__cod": "",
			"ter__aret": 0,
			"ter__ncto": "",
			"ter__vret": "",
			"ter__cret": "",
			"ter__reg": "",
			"empr__cod": "",
			"ter__nom1": "",
			"ter__ape1": "",
			"ter__nom2": "",
			"ter__ape2": "",
			"ter__renta": "",
			"ter__raz__amp": "",
			"bar__cod": "",
			"trf_cod": "",
			"para_cod": 0,
			"tpa_cod": "",
			"mail_ter": "",
			"mail_ter_al": "",
                        "pais_cod":""
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

}