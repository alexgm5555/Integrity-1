//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
/////////////////////////////////////////////////////////////////////
function sirClaseCliente() {
    var urlSir = ipServicios + baseComercial +"SIRgpr_cla";
    var json = { 
        "dsSIRgpr_cla":{ 
            "eeDatos":[ 
                { 
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                    
                }
            ], 
            "eeSIRgpr_cla": [
                {
                    "picclacli": 0,
                    "picusuario":"*",
                    "piiclaest": -1
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
    
};
///////////////////////////////////////////////////////////////
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
       "picter_nit": "",
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
///////////////////////////////////////////////////////////////
function sirLista() {
    var mapData = "eegpr_lis";
    var urlSir = ipServicios + baseComercial + "SIRgpr_lis";
    var json = 
           {  
   "dsSIRgpr_lis":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "eeSIRgpr_lis":[  
         {  
            "picart_cod":"*",
            "piicla_cod":0,
            "piilis_num":0,
            "picmnd_cla":"*",
            "piilis_est":0,
            "pidfecha":sessionStorage.getItem("fechaSistema")
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
/////////////////////////////////////////////////////////////////////
function sirPaises() {
    var urlSir = ipServicios + baseParameters +"SIRsic_ciu_pais";
    var json = { 
        "dsSIRsic_ciu":{ 
            "eeDatos":[ 
                { 
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                    
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
    
};
/////////////////////////////////////////////////////////////////////
function sirCiudades() {
    var urlSir = ipServicios + baseContabilidad +"SIRsic_ciu";
    var json = {  
   "dsSIRsic_ciu":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
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
    
};
/////////////////////////////////////////////////////////////////////
function sirAreaGeo() {
    var urlSir = ipServicios + baseComercial +"SIRgpr_ageo";
    var json = { 
        "dsSIRgpr_ageo":{ 
            "eeDatos":[ 
                { 
                     "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                    
                }
            ], 
            "eeSIRgpr_ageo": [
                {
                    "piiageo__cod": 0,
                    "picusuario": "*"
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
    
};
/////////////////////////////////////////////////////////////////////
function sirpedidos() {
    var urlSir = ipServicios + baseComercial +"SIRgpd_est";
    var json = {  
        "dsSIRgpd_est":{  
            "eeDatos":[  
                {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "SIRgpd_est":[  
                {  
                    "picgpd__des":"*",
                    "piigpd__est":0
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
    
};
//------------------------------------------------------------
function CreaEstadoPedido() {
    var urlSir = ipServicios + baseComercial +"SICUDgpd_est";
    var json = {  
        "dsSICUDgpd_est":{  
            "eeDatos":[  
                {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eegpd_est":[  
                {  
                    "gpd__des":"",
                    "gpd__est":0
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
    
};

///////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
function sirCliente() {
    var urlSir = ipServicios + baseComercial +"SIRgpd_cli_est";
    var json = {  
        "dsSIRgpd_cli_est":{  
            "eeDatos":[  
                {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "SIRgpd_cli_est":[  
                {  
                    "picgpd__cli__des":"*",
                    "piigpd__cli__est":0
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
    
};

////////////////////////////////////////////////////////////////////////////////
function cudCliente() {
    var urlSir = ipServicios + baseComercial +"SICUDgpd_cli_est";
    var json = {  
        "dsSICUDgpd_cli_est":{  
            "eeDatos":[  
                {  
                    "picusrcod":"reita_800001541",
                    "picfiid":"46563924305606215",
                    "local_ip":"172.21.24.105",
                    "remote_ip":"190.144.16.114"
                }
            ],
            "eegpd_cli_est":[  
                {  
                    "gpd__cli__est":0,
                    "gpd__cli__des":"",
                    
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
    
};
////////////////////////////////////////////////////////////////////////////////
function sirPresupuesto() {
    var urlSir = ipServicios + baseComercial +"SIRgpd_pre_est";
    var json = {  
        "dsSIRgpd_pre_est":{  
            "eeDatos":[  
                {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "SIRgpd_pre_est":[  
                {  
                    "picgpd__pre__des":"*",
                    "piigpd__pre__est":0
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
    
};
//////////////////////////////////////////////////////////////
function cudPresupuesto() {
    var urlSir = ipServicios + baseComercial +"SICUDgpd_pre_est";
    var json = {  
        "dsSICUDgpd_pre_est":{  
            "eeDatos":[  
                {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eegpd_pre_est":[  
                {  
                    "gpd__pre__est":0,
                    "gpd__pre__des":""
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
    
};
///////////////////////////////////////////////////////////////
function sirSuperregion() {
    var urlSir = ipServicios + baseComercial +"SIRgpd_sre";
    var json = {  
   "dsSIRgpd_sre":{  
      "eeDatos":[  
         {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRgpd_sre":[  
         {  
          "piirgeo__cod":0,
          "piisre__cod":0,
          "picter__nit":"0",
          "picsre__est": -1
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
    
};
///////////////////////////////////////////////////////////////
function cudSuperregion() {
    var urlSir = ipServicios + baseComercial +"SICUDgpd_sre";
    var json = {  
   "dsSICUDgpd_sre":{  
      "eeDatos":[  
         {  
                     "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "eegpd_sre":[  
         {  
          "sre__cod":0,
          "ter__nit":"",
          "rgeo__cod":0,
          "sre__est":99
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
    
};

///////////////////////////////////////////////////////////////
function cudTerritorios() {
    var urlSir = ipServicios + baseComercial +"SICUDgpd_str";
    var json = {  
   "dsSICUDgpd_str":{  
      "eeDatos":[  
         {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "eegpd_str":[  
         {  
          "str__cod":0,
          "ter__nit":"0",
          "str__est":99,
          "str__rec":true,
          "str__vta":true,
          "trr__cod":1
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
    
};

///////////////////////////////////////////////////////////////
function sirTerritorio() {
    var urlSir = ipServicios + baseComercial +"SIRgpd_trr";
    var json = {  
   "dsSIRgpd_trr":{  
      "eeDatos":[  
         {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRgpd_trr":[  
         {  
          "piitrr__cod":0,
          "piirgeo__cod":0,
          "pictrr__nom":"*",
          "piitrr__est": -1
         }
      ]      
   }
}
    ;
    
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
    
};
///////////////////////////////////////////////////////////////
function cudTerritorio() {
    var urlSir = ipServicios + baseComercial +"SICUDgpd_trr";
    var json = {  
   "dsSICUDgpd_trr":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "eegpd_trr":[  
         {  
          "trr__cod":0,
          "trr__nom":"",
          "rgeo__cod":0,
          "trr__est":0
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
    
};
////////////////////////////////////////////////////////////
function sirRegionGeografica() {
    var urlSir = ipServicios + baseComercial +"SIRgpr_rgeo";
    var json =
            { 
                "dsSIRgpr_rgeo":{ 
                    "eeDatos":[ 
                { 
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                    
                }
            ], 
            "eeSIRgpr_rgeo": [
                {
                    "piirgeo__cod": 0,
                    "picusuario": "*"
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
    
};
///////////////////////////////////////////////////////////////
function cudRegionGeografica() {
    var urlSir = ipServicios + baseComercial +"SIRgpr_rgeo";
    var json =
            { 
                "dsSIRgpr_rgeo":{ 
                    "eeDatos":[ 
                { 
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                    
                }
            ], 
            "eeSIRgpr_rgeo": [
                {
                    "piirgeo__cod": 0,
                    "picusuario": "*"
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
    
};
///////////////////////////////////////////////////////////////
function sirBarrios() {
    var urlSir = ipServicios + baseComercial +"SIRgpd_bar";
    var json ={  
   "dsSIRgpd_bar":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRgpd_bar":[  
         {  
          "picciu__cod":"*",
          "piibar__cod":0,
          "picbar__dsc":"*",
          "picbar__est": -1
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
    
};
///////////////////////////////////////////////////////////////
function cudBarrios() {
    var urlSir = ipServicios + baseComercial +"SICUDgpd_bar";
    var json ={  
   "dsSICUgpd_bar":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "eegpd_bar":[  
         {  
          "ciu__cod":"",
          "bar__cod":0,
          "bar__dsc":"",
          "bar__str":0,
          "bar__est":0
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
    
};
///////////////////////////////////////////////////////////////
function sirTransportistas() {
    var urlSir = ipServicios + baseComercial +"SIRdpc_rut";
    var json ={  
   "dsSIRdpc_rut":{  
      "eeDatos":[  
         {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
		"eeSIRdpc_rut": [{
			"piibar_cod1": 0,
			"piibar_cod2": 0,
			"picciu_cod1": "*",
			"picciu_cod2": "*",
			"piirut_cod": 0 
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
    
};
///////////////////////////////////////////////////////////////
function sirVendedores() {
    var urlSir = ipServicios + baseComercial +"SIRgpd_vdd";
    var json ={  
   "dsSIRgpd_vdd":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "eeSIRgpd_vdd":[  
         { 
         
          "piitrr__cod":0,
          "piivdd__cod":0,
          "picter__nit":"*",
          "piicla__cli":0,
          "piivdd__est":-1
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
    
};
///////////////////////////////////////////////////////////////
function sirVendedoresDetalle() {
    var urlSir = ipServicios + baseComercial +"SIRgpd_vtr";
    var json ={  
   "dsSIRgpd_vtr":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRgpd_vtr":[  
         {  
          "piivdd__cod":0,
          "piitrr__cod":0
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
    
};
///////////////////////////////////////////////////////////////
function CudDetalleVendedor() {
    var urlSir = ipServicios + baseComercial +"SICUDgpd_vtr";
    var json ={  
   "dsSICUDgpd_vtr":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "eegpd_vtr":[  
         {  
          "trr__cod":0,
          "vdd__cod":0
         	
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
    
};
///////////////////////////////////////////////////////////////
function SirSicVen() {
    var urlSir = ipServicios + baseParameters +"SIRsic_ven";
    var json ={  
   "dsSIRsic_ven":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
  "eeSIRsic_ven": [{
       "piccod_suc": "0",
       "picven_cod": "*",
       "piiven_est": -1
       
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
    
};
///////////////////////////////////////////////////////////////
function CudVendedores() {
    var urlSir = ipServicios + baseComercial +"SICUDgpd_vdd";
    var json ={  
   "dsSICUDgpd_vdd":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "eegpd_vdd":[  
         {  
          "vdd__cod":0,
          "ter__nit":"0",
          "trr__cod":0,
          "cla__cli":0,
          "vdd__est":0
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
    
};
///////////////////////////////////////////////////////////////
function sirClientes() {
    var urlSir = ipServicios + baseComercial +"SIRgpd_cli";
    var json ={  
   "dsSIRgpd_cli":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRgpd_cli":[  
         {  
          "piicla__cli":0,
          "picter__nit":"*",
          "picter__raz":"*",
          "piipago__cod":0,
          "piicli__est":-1
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
    
};
///////////////////////////////////////////////////////////////
function sirFormadepago() {
    var urlSir = ipServicios + baseParameters +"SIRfac_pag";
    var json ={  
   "dsfac_pag":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
   "eetemp": [
      {
        "piicla_cli": 0,
        "piifac_pag": 0,
        "piifac_est": -1
        
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
    
};
///////////////////////////////////////////////////////////////
function sirBodega() {
    var urlSir = ipServicios + baseComercial +"SIRdpc_loc";
    var json ={
        "dsSIRdpc_loc": {
            "eeDatos": [{
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }],
            "eeSIRdpc_loc": [{
                    "piiloc_cod": 0,
                    "picter_nit": 0,
                    "piicom_con": "*",
                    "piiloc_est": -1
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
    
};
///////////////////////////////////////////////////////////////
function cudClientes() {
    var urlSir = ipServicios + baseComercial +"SICUDgpd_cli";
    var json ={  
   "dsSICUDgpd_cli":{  
      "eeDatos":[  
         {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "eegpd_cli":[  
        	 {      "ter__nit":"",
                        "cla__cli":0,
                        "cal__ide":1,
                        "cli__cre":0,
                        "cli__ven":0,
                        "con__tes":"",
                        "con__ven":"",
                        "cer__ana":true,
                        "dpc__par":false,
                        "cli__tra":false,
                        "num__cop__fac":0,
                        "pago__cod":0,
                        "ter__lis":0,
                        "dia__pag":"",
                        "hor__pag":"",
                        "email__ter":"",
                        "cli__est":0,
                        "loc__cod":0,
                        "ter__cret":true,
                        "cli__gal":10    
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
    
};
///////////////////////////////////////////////////////////////
function SirSucursales() {
    var urlSir = ipServicios + baseComercial +"SIRgpd_cli_suc";
    var json ={  
   "dsSIRgpd_cli_suc":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRgpd_cli_suc":[  
         {  
          "picter__nit":"*",
          "piccom__con":"*",
          "piicli__com__est":-1,
          "piirgeo__cod":0,
          "picciu__cod":"*"
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
    
};
///////////////////////////////////////////////////////////////
function CudSucursales() {
    var urlSir = ipServicios + baseComercial +"SICUDgpd_cli_suc";
    var json ={  
   "dsSICUDgpd_cli_suc":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "eegpd_cli_suc":[  
         {
         	"ter__nit":"", 
                "com__con":"",
                "com__nom":"",
                "ter__dir":"",
                "ter__tel":"",
                "ter__fax":"",
                "email__ter":"",
                "vdd__cod":"",
                "trr__cod":"",
                "rgeo__cod":1,
                "ciu__cod":"",
                "bar__cod":1,
                "ter__lis":1,
                "cupo__cre":0,
                "cupo__ven":0,
                "con__stes":"",
                "con__sven":"",
                "loc__cod":1,
                "cli__con__sloc":"",
                "cli__crg__con__sloc":"",
                "est__des":"",
                "cli__suc__pie__fac":0
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
    
};

