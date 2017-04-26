/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para la lista de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaPedidos() {
    var mapData = "eegpd_ped";
    var urlSir = ipServicios + baseComercial + "SIRgpd_ped";
    var json = {
            "dsSIRgpd_ped": {
		"eeDatos":[
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRgpd_ped": [
                {
                    "picsuc_cod": "*",                    
                    "pidped_fec": "?",
                    "piiped_num": 0,
                    "piiped_est": -1,
                    "pilhastapr": false
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
 * Funcion para obtener la url y el json de entrada para Editar Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function consultaCabeceraPedido() {
    var mapData = "eegpd_ped";
    var urlSir = ipServicios + baseComercial + "SIRgpd_ped";    

    var json = {
        "dsgpd_ped": {
            "eeDatos": [{
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }],
            "eetemp": [{
                    "picsuc__cod": "*",
                    "picclc__cod": "*",
                    "pidped__fec": "?",
                    "piiped__num": 0,
                    "picusuario": "*"
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

/**
 * Funcion para obtener la url y el json de entrada para la surcursal de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaSucursal() {
    
    var mapData = "eesic_suc";
    var urlSir = ipServicios + baseParameters + "SIRSucursalagencia";
    var json = 
            {  
                "dssic_suc":{  
                    "eeDatos":[  
                {  
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),                    
                }],
            "eetemp": [
                {
                    "piccia_nit": ""
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
 * Funcion para obtener la url y el json de entrada para la Divisa de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaDivisa() {
    var mapData = "eesic_mnd";
    var urlSir = ipServicios + baseParameters + "SIRsic_mnd";
    var json = 
            {  
                "dssic_mnd":{  
                   "eeDatos":[  
                      {  
                         "picusrcod": sessionStorage.getItem("usuario"),
                         "picfiid": sessionStorage.getItem("picfiid"), 
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
 * Funcion para obtener la url y el json de entrada para el Condiciones de pago de pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaCondicionesDePago() {
    var mapData = "eefac_pag";
    var urlSir = ipServicios + baseParameters + "SIRfac_pag";
    var json = 
            {
                    "dsfac_pag" : {
                            "eeDatos" : [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"), 
                                    }
                            ],
                            "eetemp" : [{                                            
                                            "piifac_pag" : ""
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
                                            "piicla__cli" : "",
                                            "picter__nit" : "",
                                            "picter__raz":"",
                                            "piipago__cod":0,
                                            "piicli__est":0,
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
 * Funcion para obtener la url y el json de entrada para el Vendedor de pedidos
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
 * Funcion para obtener la url y el json de entrada para el Vendedor de pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SICUDPedido() {
    var mapData = "eegpd_ped";
    var urlSir = ipServicios + baseComercial + "SICUDgpd_ped";
    var json = 
            {
                    "dsSICUDgpd_ped": {
                            "eeDatos": [{
                                    "picusrcod": sessionStorage.getItem("usuario"),
                                    "picfiid": sessionStorage.getItem("picfiid"),
                                    "local_ip":sessionStorage.getItem("ipPrivada"),
                                    "remote_ip":sessionStorage.getItem("ipPublica")
                            }],
                            "eegpd_ped": [{ 
                                    "gpd__est":0,
                                    "ciu__cod": "",
                                    "com__con": "",
                                    "dpc__par": "false",
                                    "clc__cod": "",
                                    "mnd__cla": "",
                                    "pago__cod": "",
                                    "ped__fec": "",
                                    "ped__fec__ent": "",
                                    "ped__num": "",
                                    "obs__ped": "",
                                    "ped__pqs": "",
                                    "suc__cod": "",
                                    "ter__dir": "",
                                    "ter__nit": "",
                                    "ter__tel": "",
                                    "ven__cod": "",  
                                    "anu__cod": 0,
                                    "obs__anu": "",
                                    "obs__apr": "",
                            }],
                            "eeSICUDgpd_ped": [{
                                    "pltermina":false,
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
 * Funcion para obtener la url y el json de entrada para los establecimientos asociados a un cliente
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaEstablecimiento() {
    var mapData = "eegpd_cli_suc";
    var urlSir = ipServicios + baseComercial + "SIRgpd_cli_suc";
    var json = 
            {
                    "dsSIRgpd_cli_suc" : {
                            "eeDatos" : [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"),
                                            "local_ip":sessionStorage.getItem("ipPrivada"),
                                            "remote_ip":sessionStorage.getItem("ipPublica")
                                    }
                            ],
                            "SIRgpd_cli_suc" : [{                                            
                                            "piccom__con" : "*",
                                            "picter__nit" : "*",
                                            "piicli__com__est": 0,
                                            "picciu__cod": "*"
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
function sirConsultaCiudad() {
    var mapData = "eesic_ciu";
    var urlSir = ipServicios + baseContabilidad + "SIRsic_ciu";
    var json = {
                        "dsSIRsic_ciu": {
                                "eeDatos": [{
                                            "picusrcod": sessionStorage.getItem("usuario"),
                                            "picfiid": sessionStorage.getItem("picfiid"),
                                            "local_ip":sessionStorage.getItem("ipPrivada"),
                                            "remote_ip":sessionStorage.getItem("ipPublica")
                                }],
                                "eeSIRsic_ciu": [{
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
                    "fiid": sessionStorage.getItem("picfiid"),
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


/**
 * Funcion para obtener la url y el json de entrada guardar el detalle del pedido
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SICUDDetallePedido() {
    var mapData = "eegpd_ped_det";
    var urlSir = ipServicios + baseComercial + "SICUDgpd_ped_det";
    
    var json = {
            "dsSICUDgpd_ped_det": {
		"eeDatos":[
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
                ],
                "eegpd_ped_det": [
                {
                    "suc__cod": "*",
                    "clc__cod": "*",
                    "ped__fec": "*",
                    "ped__num": 0,
                    "lis__num": 0,
                    "cla__cod": 0,
                    "art__cod": "*",
                    "pre__pcod": "*",
                    "ped__can": 0,
                    "lpd__pre": 0,
                    "ped__dct": 0,
                    "ped__iva": 0
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

function sirPrioridades() {
    var mapData = "eegpd_pri";
    var urlSir = ipServicios + baseComercial +"SIRgpd_pri";
    var json = {  
        "dsSIRgpd_pri":{  
            "eeDatos":[  
                {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "SIRgpd_pri":[  
                {  
                    "piipri__cod":0,
                    "picpri__des":"*",
                    "piictr__est" : 0
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
 * Funcion para obtener la url y el json de entrada para llos conceptos de anulación de pedido
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirgpd_anu() {
    var mapData = "eegpd_anu";
    var urlSir = ipServicios + baseComercial + "SIRgpd_anu";
    var json = 
            {  
                "dsSIRgpd_anu":{  
                   "eeDatos":[  
                      {  
                        "picusrcod": sessionStorage.getItem("usuario"),
                        "picfiid": sessionStorage.getItem("picfiid"),
                        "local_ip":sessionStorage.getItem("ipPrivada"),
                        "remote_ip":sessionStorage.getItem("ipPublica")
                      }
                   ],
                   "SIRgpd_anu":[  
                        {  
                            "picusuario": sessionStorage.getItem("usuario"),
                            "piianu__cod": 0,
                            "piigpd__est" : 0,
                            "picanu__des":"*",
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
