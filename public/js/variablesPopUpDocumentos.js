
/**
 * Funcion para obtener la url y el json de entrada para el Cliente de pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaDocumentos() {
    
    var mapData = "eedoc_list";
    var urlSir = ipServicios + baseDocAlfresco + "SIRdoc_list";
    var json = 
            {
                "dsSIRdoc_list" : {
                    "eeDatos" : [{
                        "picusrcod": sessionStorage.getItem("usuario"),
                        "picfiid": sessionStorage.getItem("picfiid"), 
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

    this.setmapSir = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getmapSir = function () {
        return mapData;
    };

};

function sirConsultaDocumentosPorRuta() {
    
    var mapData = "eedoc_list";
    var urlSir = ipServicios + baseDocAlfresco + "SIRpath_list";
    var json = 
            {
                    "dsSIRdoc_list": {
                            "eeDatos": [{
                                    "picusrcod": sessionStorage.getItem("usuario"),
                                    "picfiid": sessionStorage.getItem("picfiid"),
                                    "local_ip": sessionStorage.getItem("ipPrivada"),
                                    "remote_ip": sessionStorage.getItem("ipPublica")
                            }],
                            "SIRpath_list": [{
                                    "picfolderpath": "ECM\/"
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

    this.setmapSir = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getmapSir = function () {
        return mapData;
    };

};

function sirDescargarDocumento() {
    
    var mapData = "edocdump";
    var urlSir = ipServicios + baseDocAlfresco + "SIRdoc_dump";
    var json = 
            {
                    "dsSIRdoc_dump": {
                            "eeDatos": [{
                                    "picusrcod": sessionStorage.getItem("usuario"),
                                    "picfiid": sessionStorage.getItem("picfiid"),
                                    "local_ip": sessionStorage.getItem("ipPrivada"),
                                    "remote_ip": sessionStorage.getItem("ipPublica")
                            }],
                            "edocdump": [{
                                    "picfolderpath": "",
                                    "picdocname": ""
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

    this.setmapSir = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getmapSir = function () {
        return mapData;
    };

};


function subirDocumentoAlfre() {
    
    var mapData = "edocdump";
    var urlSir = ipServicios + baseDocAlfresco + "SICUDdoc_load";
    var json = {
	"dsSICUDdoc_load": {
            "eeDatos": [{
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
		}],
            "ecreatedocument": [{
                    "picdocname": "",
                    "picdescription": "",
                    "picfolderpath": "",
                    "picldocbase64": "",
                    "picmimetype": ""
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

    this.setmapSir = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getmapSir = function () {
        return mapData;
    };

};