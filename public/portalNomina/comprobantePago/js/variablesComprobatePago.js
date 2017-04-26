/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * Funcion para obtener la url y el json de entrada para los años
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaAnoLiq() {
    var mapData = "ttconsultaanoliq";    
    var urlSir = ipServicios + basePortalnomina + "SIConsultaanoliq";
    var json = {
                        "dsConsultaanoliq": {
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

function sirConsultaNomina() {
    
    var mapData = "ttconsultanomina";
    var urlSir = ipServicios + basePortalnomina +"SIConsultanomina";
    var json = {  
        "dsconsultanomina":{  
            "eeDatos":[  
                {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "SIRconsultanomina": [{
                    "piiyear": "*"
                    
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

function sirComprobante() {
    
    var mapData = "ttconsultacomprobante";
    var urlSir = ipServicios + basePortalnomina +"SIRcomprobante";
    var json = {  
        "dscomprobante":{  
            "eeDatos":[  
                {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "SIRcomprobante": [{
                    "piiyear": "*",
                    "nronomina": "*",
                    "pidfecliq": "*",
                    
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