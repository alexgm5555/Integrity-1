/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//////////////////////////////////////////////////////////////////////////////////////
function sir() {
    var url = ipServicios + baseInventarios + "SIRinv_uni";
    var mapSir = "eeinv_uni";
    var dataInputSir = {
        "dsSIRinv_uni": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRinv_uni": [
                {
                    "picuni__cod": "*",
                    "picuni__des": "*",
                    "picuni__est": -1,
//                    "picusuario": 0
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
    var url = ipServicios + baseInventarios + "SICUDinv_uni";
    var mapCud = "eeinv_uni";
    var dataInputCud = {
        "dsSICUDinv_uni": {
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


