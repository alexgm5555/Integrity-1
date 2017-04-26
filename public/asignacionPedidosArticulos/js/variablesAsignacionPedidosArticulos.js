/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para la lista de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SIRgpd_pdet_asig() {
    var mapData = "ttinv_art_prov";
    var urlSir = ipServicios + baseComercial + "SIRgpd_pdet_asig";
    
    {
        
        var json = {
            "dsSIRgpd_pdet_asig": {
		"eeDatos":[
                    {
                        "picusrcod": sessionStorage.getItem("usuario"),
                        "picfiid": sessionStorage.getItem("picfiid"),
                        "local_ip":sessionStorage.getItem("ipPrivada"),
                        "remote_ip":sessionStorage.getItem("ipPublica")
                    }
                ],
                "eeSIRgpd_pdet_asig": [
                    {
                        "pidfecha": "*"
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
}

function SICUDgpd_pdet_asig(){
    var mapData = "ttinv_art_prov";
    var urlSir = ipServicios + baseComercial + "SICUDgpd_pdet_asig";
    
    {
        
        var json = {
            "dsSICUDgpd_pdet_asig": {
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
                        "ped__fec": "",
			"suc__cod": "",
			"clc__cod": "",
			"cla__cod": 0,
			"art__cod": "",
			"ped__num": 0,
			"lis__num": 0,
			"ped__aasi": 0
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
}