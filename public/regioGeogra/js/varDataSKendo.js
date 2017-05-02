/* 
	* To change this license header, choose License Headers in Project Properties.
	* To change this template file, choose Tools | Templates
	* and open the template in the editor.
*/


//////////////////////////////////////////////////////////////////////////////////////
function sir () {
    var url = ipServicios+baseComercial+"SIRgpr_rgeo";
    var mapSir = "eegpr_rgeo";
    var dataInputSir = {
        "dsSIRgpr_rgeo":{  
            "eeDatos":[  
                {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRgpr_rgeo":[  
                {  
                    "piirgeo__cod": 0,
                    "piirgeo__est": -1,
                    "picusuario": "*"
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
};

///////////////////////////////////////////////////////////////////////////////////////
function cud () {
    var url = ipServicios+baseComercial+"SICUDgpr_rgeo";
    var mapCud = "eegpr_rgeo";
    var dataInputCud = {
		"dsSICUDgpr_rgeo":{  
			"eeDatos":[  
				{  
					"picusrcod":sessionStorage.getItem("usuario"),
					"picfiid":sessionStorage.getItem("picfiid"),
					"local_ip":sessionStorage.getItem("ipPrivada"),
					"remote_ip":sessionStorage.getItem("ipPublica")
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
};

function SIRgpr_ageo () {
    var url = ipServicios+baseComercial+"SIRgpr_ageo";
    var mapSir = "eegpr_ageo";
    var dataInputSir = {
        "dsSIRgpr_ageo": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRgpr_ageo": [
                {
                    "piiageo__cod": 0,
                    "picusuario": "*",
                    "piiageo__est": 0
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
};

function SIRsic_ciu_pais () {
    var url = ipServicios+baseParameters+"SIRsic_ciu_pais";
    var mapSir = "eesic_ciu";
    var dataInputSir = {
        "dsSIRsic_ciu_pais": {
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
};


