/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para la lista de Precios
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function POST_SIRlogged() {
    var mapData = "eeLogged";
    var urlSir = ipServicios + baseServicio + "POST_SIRlogged";
    var json = {
        "dsLogged": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeLogged": [
                {
                    "piccianit": sessionStorage.getItem("companyNIT")
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

}
;
function GetProfileImage() {
    var mapData = "profileImg";
    var urlSir = ipServicios + baseServicio + "GetProfileImage";
    var json = {
        "dsProfileImage": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
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

}
;

function Getbirthdays() {
    var fecha = new Date();
    var mapData = "othersbirthdays";
    var urlSir = ipServicios + baseServicio + "Getbirthdays";
    var json = {
        "dsbirthdays": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "sirbirthday": [
                {
                    "piiday": JSON.stringify(fecha.getDate()),
                    "piimonth": JSON.stringify(fecha.getMonth()+1)

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
//------------------------------
function sirNotificaciones() {
    var urlSir = ipServicios + baseParameters +"SIRsic_alt";
    var json = {
 "dsSIRsic_alt": {
  "eeDatos": [{
             "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
  }],
   "eeSIRsic_alt": [{
   "picusr__cod": sessionStorage.getItem("usuario"),
   "piialt__est": "-1",
   "picalt__id": "*"
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
///------------------------------------------------------
//------------------------------
function cudNotificaciones() {
    var urlSir = ipServicios + baseParameters +"SICUDsic_alt";
    var json = {  
   "dsSICUDsic_alt":{  
      "eeDatos":[  
         {  
        "picusrcod":sessionStorage.getItem("usuario"),
        "picfiid":sessionStorage.getItem("picfiid"),
        "local_ip":sessionStorage.getItem("ipPrivada"),
        "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
     "eesic_alt": [
      {
        "alt__cad": "2017-03-24T00:00:00.000",
        "alt__dat": "2017-03-24T00:00:00.000",
        "alt__est": 1,
        "alt__id": 2,
        "alt__ini": "2017-03-24T00:00:00.000",
        "alt__msj": "Hola Mundo triste NOOO",
        "func__name": "Solitud de vacaciones",
        "usr__cod": "aduarte_800001541",
        "usr__cod__g": "aduarte_800001541",
        "alt__tit": "Titulo",
        "alt__url": "",
        "alt__tip": "procesos",
        "alt__datehour": "24 Mar 17 00:00"
        },
      
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

