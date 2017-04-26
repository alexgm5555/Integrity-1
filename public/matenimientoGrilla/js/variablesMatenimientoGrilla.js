/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function dsSIRinitial() {      
    
    var urlSir = ipServicios + baseServicio +"SIRinitial";
    var json = {  
        "dsSIRinitial":{  
            "eeDatos":[  
                {  
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eesic_rol_fun":[  
                {  
                    "cap__cod":137,
                    "fun__cod":3,
                    "por__cod":10
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
};


//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para los datos de la grilla principal
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirDataDetalle() {
    
    var mapData = "eesic_forms_col";
    var urlSir = ipServicios + baseServicio + "SIRsic_forms_col";
    var json = {
        "dssic_forms_col": {
            "eeDatos": [{
                    "picusrcod":sessionStorage.getItem("usuario"),
                    "picfiid":sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }],
            "eesic_rol_fun": [{
                    "cap__cod": 0,
                    "fun__cod": 0,
                    "por__cod": 0,
                    "rol__cod": 0
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

//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para los datos de la grilla principal
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirData() {
    var mapData = "eesic_forms";
    var urlSir = ipServicios + baseServicio + "SIRsic_forms";
    var json = {
        "dsSIRinitial": {
            "eeDatos": [{
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }],
            "eesic_rol_fun": [{
                    "cap__cod": 0,
                    "fun__cod": 0,
                    "por__cod": 0, 
                    "rol__cod": 0
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


//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para los datos de la grilla principal
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SICUDForms() {
    var mapData = "eesic_forms";
    var urlSir = ipServicios + baseServicio + "SICUDsic_forms";
    var json = {  
        "dsSIRinitial":{  
            "eeDatos":[  
                {  
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eesic_forms": [
                {
                    "cap_cod":"",
                    "forms_editable":"",
                    "forms_filterable":"",
                    "forms_nom":"",
                    "forms_num":"",
                    "forms_scrollable":"",
                    "forms_selectable":"",
                    "forms_sorteable":"",
                    "fun_cod":"",
                    "por_cod":"",
                    "titulo":"",
                    "piindicador":""
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

//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para los datos de la grilla principal
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SICUDFormsCol() {
    var mapData = "eesic_forms";
    var urlSir = ipServicios + baseServicio + "SICUDsic_forms_col";
    var json = {  
        "dsSIRinitial":{  
            "eeDatos":[  
                {  
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eesic_forms_col": [
                {
                    "forms_num":"",
                    "cap_cod":"",
                    "fun_cod":"",
                    "por_cod":"",
                    "cmp_dsc": "",
                    "cmp_edi": "",
                    "cmp_lec": "",
                    "cmp_nom": "",
                    "cmp_nom2": "",
                    "cmp_req": "",
                    "cmp_tip": "",
                    "cmp_vis": "",
                    "idinterno": 0, 
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
