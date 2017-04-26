/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//////////////////////////////////////////////////////////////////////////////////////
function sir() {
    var url = ipServicios + baseComercial + "SIRdpc_tra";
    ;
    var mapSir = "eedpc_tra";
    var dataInputSir = {
        "dsSIRdpc_tra": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRdpc_tra": [
                {
                    "picter_nit": "*",
                    "piirut_cod": 0,
                    "piicam_cod": 0,
                    "piitra_est": -1
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
    var url = ipServicios + baseComercial + "SICUDdpc_tra";
    var mapCud = "eedpc_tra";
    var dataInputCud = {
        "dsSICUDdpc_tra": {
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

function SIRdpc_cam() {
    var url = ipServicios + baseComercial + "SIRdpc_cam";
    var mapSir = "eedpc_cam";
    var dataInputSir = {
        "dsSIRdpc_cam": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRdpc_cam": [
                {
                    "piicam_cod": 0,
                    "piccam_pla": "*",
                    "piirut__est": 0,
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


function SIRdpc_rut() {
    var url = ipServicios + baseComercial + "SIRdpc_rut";
    var mapSir = "eedpc_rut";
    var dataInputSir = {
        "dsSIRdpc_rut": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRdpc_rut": [
                {
                    "piibar_cod1": 0,
                    "piibar_cod2": 0,
                    "picciu_cod1": "*",
                    "picciu_cod2": "*",
                    "piirut_cod": 0,
                    "piirut_est": 0
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

function SIRdpc_rut() {
    var url = ipServicios + baseComercial + "SIRdpc_rut";
    var mapSir = "eedpc_rut";
    var dataInputSir = {
        "dsSIRdpc_rut": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRdpc_rut": [
                {
                    "piibar_cod1": 0,
                    "piibar_cod2": 0,
                    "picciu_cod1": "*",
                    "picciu_cod2": "*",
                    "piirut_cod": 0,
                    "piirut_est": 0
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

function SIRsic_ter() {
    var url = ipServicios + baseParameters + "SIRsic_ter";
    var mapSir = "eesic_ter";
    var dataInputSir = {
        "dsSIRsic_ter": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRsic_ter": [
                {
                    "picter_nit": "",
                    "picter_raz": "",
                    "piiter_est": -1
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