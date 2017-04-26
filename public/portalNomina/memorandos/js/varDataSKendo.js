/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//////////////////////////////////////////////////////////////////////////////////////
function sir() {
    var url = "http://190.144.16.114:8810/rest/Portalnomina/SISolicitudcertificado";
    ;
    var mapSir = "eesic_ciu";
    var dataInputSir = 
        {  
   "dsSISolicitudcertificado":{  
      "eeDatos":[  
         {  
            "picusrcod":"jsandrea_800001",
            "picfiid":"405924036884581034980",
            "local_ip":"172.21.24.109",
            "remote_ip":"190.144.16.114"
         }
      ],
      "eeSISolicitudcertificado":[  
         {  
            "picremitido":"Luis Alexander",
            "picindicador":"Fisico"
         }
      ]
   }
};
    this.setUrlSir = function (newname) {
        if (newname) {
            url = newname;
        }
    };
    this.getUrlSir = function () {
        return url;
    };
    this.setmapSir = function (newname) {
        if (newname) {
            mapSir = newname;
        }
    };
    this.getmapSir = function () {
        return mapSir;
    };
    this.setdataInputSir = function (newname) {
        if (newname) {
            dataInputSir = newname;
        }
    };
    this.getdataInputSir = function () {
        return dataInputSir;
    };
}
;

///////////////////////////////////////////////////////////////////////////////////////
function cud() {
    var url = ipServicios + baseContabilidad + "SICUDsic_ciu";
    var mapCud = "eesic_ciu";
    var dataInputCud = {
        "dssic_ciu": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ]
        }};
    this.setUrlCud = function (newname) {
        if (newname) {
            url = newname;
        }
    };
    this.getUrlCud = function () {
        return url;
    };
    this.setmapCud = function (newname) {
        if (newname) {
            mapCud = newname;
        }
    };
    this.getmapCud = function () {
        return mapCud;
    };
    this.setdataInputCud = function (newname) {
        if (newname) {
            dataInputCud = newname;
        }
    };
    this.getdataInputCud = function () {
        return dataInputCud;
    };
}
;
