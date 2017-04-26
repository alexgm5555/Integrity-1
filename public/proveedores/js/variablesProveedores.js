//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirProveedores() {
   var urlSir = ipServicios + baseContabilidad + "SIRcon_prvBYnitandraz";
    var json = {  
   "dsSIRcon_prv":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
		"SIRcon_prv": [{
			"picter__nit": "",
			"picter__raz": ""
			
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
////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////
function sirProveedor() {
    var urlSir = ipServicios + baseContabilidad +"SIRcon_prv";
    var json = {
 "dsSIRcon_prv": {
  "eeDatos": [{
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
  }],
   "eeSIRcon_prv": [{
   "piibco_cod1": 0,
   "picdpto_cod": "*",
   "picter_nit": "*",
   "picter_raz": "*",
   "piiprv_est": -1
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
////////////////////////////////////////////////////////////////////////
function sirFormapago() {
    var urlSir = ipServicios + baseContabilidad +"SIRsic_fpag";
    var json = {
 "dsSIRsic_fpag": {
  "eeDatos": [{
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
  }],
  "SIRsic_fpag": [{
   "piipag__cod":0
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
function sirConsultaTercero() {
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
//////////////////////////////////////////////////////////////////////////////////////
function sirBancos() {
    var mapData = "eesic_ter";
    var urlSir = ipServicios + baseParameters + "SIRsic_bco";
    var json = 
           {
	"dsSIRsic_bco": {
		"eeDatos": [{
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
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
//////////////////////////////////////////////////////////////////////////////////////
function cudProveedores() {

    var urlSir = ipServicios + baseContabilidad + "SICUDcon_prv";
    var json = 
           {  
   "dsSICUDcon_prv":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
     "eecon_prv": [
      {
        "ter__nit": "",
        "ter__raz": "",
        "ter__rep": "",
        "bco__cod1": 0,
        "bco__cta": "",
        "doc__pref": "",
        "doc__rfec": "",
        "dpto__cod": "",
        "dpto__cod1": "",
        "ciu__cod": "",
        "ciu__cod1": "",
        "fin__dir": "",
        "pag__cod": 0,
        "prv__age": 0,
        "prv__ben": "",
        "prv__cgo": "",
        "prv__cta": true,
        "prv__dir": "",
        "prv__dpfax": "",
        "prv__est": 99,
        "prv__ind__ciu": 0,
        "prv__max": 9999999999,
        "prv__nofax": "",
        "prv__nrfax": 0,
        "prv__pos": 0,
        "prv__tel": 0,
        "ter__mail": "",
        "piindicador": 0,
        "eecon_prtra": [
          {
            "bco__cod": 0,
            "prtra__est": true,
            "ter__nit": "",
            "piindicador": 0
          }
        ]
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
////////////////////////////////////////////////////////////////////////
function sirPaises() {
    var urlSir = ipServicios + baseParameters +"SIRsic_ciu_xfiltro";
    var json = {
 "dsSIRsic_ciuxfiltro": {
  "eeDatos": [{
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
  }],
   "eeSIRsic_ciu_xfiltro": [{
   "picciu_cod": "*",
   "piiciu_pos": 2
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
////////////////////////////////////////////////////////////////////////
function sirBancoDetalle() {
    var urlSir = ipServicios + baseContabilidad +"SIRsic_tra";
    var json = {
 "dsSIRsic_tra": {
  "eeDatos": [{
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
  }],
   "eeSIRsic_tra": [{
   "piibco__cod": 0
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
////////////////////////////////////////////////////////////////////////
function sirSucursalBanco() {
    var urlSir = ipServicios + baseContabilidad +"SIRsic_sbco";
    var json = {
	"dsSIRsic_sbco": {
		"eeDatos": [{
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
		}],
		"SIRsic_sbco": [{
			"piibco__cod": 0,
			"piisbco__cod": 0,
			"picusuario": "*"
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
