/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
                                            "piicla__cli" : 0,
                                            "picter__nit" : "",
                                            "picter__raz": "",
                                            "piicli__est": 0
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
