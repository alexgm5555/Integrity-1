/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var urlRestCap = ipServicios+"rest/Reports/Capitulos";
var urlRestAnx = ipServicios+"rest/Reports/SIRcar_anx";
var urlRestCmp = ipServicios+"rest/Reports/SIRrep_anx_cmp";
var urlRestRepo = ipServicios+"rest/Reports/SIRrep_rpt";
var urlRestRepoGridCmp = ipServicios+"rest/Reports/SIRrep_rpt_det";
var urlRestRepoGridFltr = ipServicios+"rest/Reports/SIRrep_rpt_det";
var urlRestRepoGridFomat = ipServicios+"rest/Reports/SIRrep_rpt_det";
var urlRestRepoView = ipServicios+"rest/Reports/SIRejecutareportes";
var urlRestRepoCmp = ipServicios+"rest/Reports/SIRrep_rpt_cmp";

var urlRestRepoCud = ipServicios+"rest/Reports/SICUDRrep_rpt";
var urlRestCmpCud = ipServicios+"rest/Reports/SICUDRrep_rpt";

var repoSelec = JSON.parse(sessionStorage.getItem("objRepoSelec"));
var user = sessionStorage.getItem("usuario");
var fiid = sessionStorage.getItem("sesion");
var cargo = sessionStorage.getItem("poccargo");
var idRepo = sessionStorage.getItem("idRepo");
var anxNom = sessionStorage.getItem("anxNom");

var porCod = sessionStorage.getItem("porCod");
var capCod = sessionStorage.getItem("capCod");

var ipPubli = sessionStorage.getItem("ipPublica");
var ipPriva = sessionStorage.getItem("ipPrivada");

var inputRestCap = {
  "dssic_cap": {
    "eeDatos": [
      {
        "picusrcod": user,
        "picfiid": fiid
      }
    ]
  }
};
var inputRestAnx = {"dsSIRcar_anx": {
  "eeDatos": [
    {
      "picusuario": user,
      "picfiid": fiid,
      "local_ip": ipPriva,
      "remote_ip": ipPubli
    }
],  
   "eeSIRcar_anx": [
    {
      "piicarcod": cargo,
      "picusuario": user,
      "piiporcod": porCod,
      "piicapcod": capCod
    }
]
}}
;
var inputRestCmp = {"dsSIRrep_anx_cmp": {
  "eeDatos": [
    {
      "picusuario": user,
      "picfiid": fiid,
      "local_ip": ipPriva,
      "remote_ip": ipPubli
    }
],  
   "eeSIRrep_anx_cmp": [
    {
      "picanxnom": anxNom,
      "picusuario": user,
    }
]
}};

var inputRestRepo = {"dsSIRrep_rpt": {
        "eeDatos": [
            {
                "picusuario": user,
                "picfiid": fiid,
                "local_ip": ipPriva,
                "remote_ip": ipPubli
            }
        ],
        "eeSIRrep_rpt": [
            {
                "picrpt_nom": "*",
                "picrpt_id": 0,
                "picusuario": user
            }
        ]
    }
};

var inputRestRepoGridCmp = {  
   "dsSIRRep_rpt_det":{  
      "eeDatos":[  
         {  
            "picusrcod":user,
            "picfiid":fiid
         }
      ],    
      "eeSIRrep_rpt_det": [
          {
            "piirpt_id": idRepo
          }
        ]
   }
};
var inputRestRepoGridFltr = {  
   "dsSIRRep_rpt_det":{  
      "eeDatos":[  
         {  
            "picusrcod":user,
            "picfiid":fiid
         }
      ],    
      "eeSIRrep_rpt_det": [
          {
            "piirpt_id": idRepo
          }
        ]
   }
};
var inputRestRepoGridFomat = {  
   "dsSIRRep_rpt_det":{  
      "eeDatos":[  
         {  
            "picusrcod":user,
            "picfiid":fiid
         }
      ],    
      "eeSIRrep_rpt_det": [
          {
            "piirpt_id": idRepo
          }
        ]
   }
};


var inputRestRepoView = {  
   "dsSIRRep_rpt":{  
      "eeDatos":[  
         {  
            "picusrcod":user,
            "picfiid":fiid
         }
      ],    
 "eeSIRrep_rpt": [
      {
        "picrpt_nom": "*",
     "piirpt_id":  idRepo,
     "picusuario": user
      }
 ]
   }
};
var inputRestRepoCud = {  
   "dsSICUDRep_rpt":{  
      "eeDatos":[  
         {  
            "picusrcod":user,
            "picfiid":fiid
         }
      ],    
      "eerep_rpt": [
          {
            "cap_cod": "",
            "por_cod": "",
            "rpt_id": 0,
            "rpt_nom": "",
            "rpt_select": "",
            "rpt_str": "test",
            "usr_cod": user
          }
        ]
   }        
};
var inputRestCmpCud = {  
   "dsSICUDRep_rpt":{  
      "eeDatos":[  
         {  
            "picusrcod":user,
            "picfiid":fiid
         } 
      ],    
        "eerep_rpt_cmp": [
          {
            "anx_cmp_id": "",
            "anx_cmp_lkp": false,
            "anx_cmp_vsb": true,
            "anx_nom": "",
            "cmp_bloq": false,
            "cmp_brk": false,
            "cmp_dsc": "",
            "cmp_id": "",
            "cmp_inquery": "",
            "cmp_nom": "",
            "cmp_ssm": false,
            "cmp_sum": false,
            "cmp_td": "",
            "rep_anx_cmp_idc": false,
            "rpt_cmp_con": false,
            "rpt_cmp_fil": true,
            "rpt_cmp_gru": true,
            "rpt_cmp_fun": false,
            "rpt_cmp_pos": 1,
            "rpt_cmp_pro": false,
            "rpt_cmp_sum": false,
            "rpt_cmp_vis": "",
            "rpt_id": idRepo,
            "transf": ""
          }
        ]
   }
};
var inputRestFltrCud = {  
   "dsSICUDRep_rpt":{  
      "eeDatos":[  
         {  
            "picusrcod":user,
            "picfiid":fiid
         } 
      ],    
        "eerep_rpt_fil": [
          {
            "rpt_cmp_pos": "",
            "rpt_fil_des": "",
            "rpt_fil_dir": "",
            "rpt_fil_Has": "",
            "rpt_fil_pos": "",
            "rpt_fil_rel": true,
            "rpt_fil_uni": "",
            "rpt_id": "",
            "piindicador": 0
          }
        ]
    }   
};
var inputRestRepoRepo = {  
   "dsSIRRep_rpt_cmp":{  
      "eeDatos":[  
         {  
            "picusrcod":user,
            "picfiid":fiid
         }
      ],    
      "eeSIRrep_rpt_cmp": [
          {
            "piirpt_id": 0,
            "piirpt_pos": 0
          }
        ]
   }
}

/*la estructuara como llega el json de respuesta para mapearla bien en el transpor de kendo*/
var mapDataRestCap = "dssic_cap.eesic_cap";
var mapDataRestAnx = "dsSIRcar_anx.eecar_anx_nom";
var mapDataRestCmp = "eerep_anx_cmp";
var mapDataRestRepo = "eerep_rpt";
var mapDataRestRepoGridCmp = "eerep_rpt_cmp";
var mapDataRestRepoGridFltr = "eerep_rpt_cmp";
var mapDataRestRepoGridFomat = "eerep_rpt_cmp";
var mapDataRestRepoView = "eerep_rpt_con";
var mapDataRestRepoCud = "eerep_rpt_num";
var mapDataRestRepoD = "eerep_rpt";
var mapDataRestRepoC = "eerep_rpt";
var mapDataRestCmpCud = "eerep_rpt_cmp";
var mapDataRestRepoCmp = "eerep_rpt_cmp";


function getidRepo() {
    return idRepo;
}
function setidRepo(e) {
    idRepo = e;
}
function getporCod() {
    return porCod;
}
function setporCod(e) {
    porCod = e;
}
function getcapCod() {
    return capCod;
}
function setcapCod(e) {
    capCod = e;
}
//////////////////////////

function geturlRestCap() {
    return urlRestCap;
}
function geturlRestAnx() {
    return urlRestAnx;
}
function geturlRestCmp() {
    return urlRestCmp;
}
function geturlRestRepo() {
    return  urlRestRepo;
}
function geturlRestRepoGridCmp() {
    return  urlRestRepoGridCmp;
}
function geturlRestRepoGridFltr() {
    return  urlRestRepoGridFltr;
}
function geturlRestRepoGridFomat() {
    return  urlRestRepoGridFomat;
}
function geturlRestRepoView() {
    return  urlRestRepoView;
}

function geturlRestRepoCud() {
    return  urlRestRepoCud;
}
function geturlRestCmpCud() {
    return  urlRestCmpCud;
}
function geturlRestRepoCmp() {
    return  urlRestRepoCmp;
}

////////////////

function getinputRestCap() {
    return inputRestCap;
}
function getinputRestAnx() {
    return inputRestAnx;
}
function getinputRestCmp() {
    return inputRestCmp;
}
function getinputRestRepo() {
    return  inputRestRepo;
}
function getinputRestRepoGridCmp() {
    return  inputRestRepoGridCmp;
}
function getinputRestRepoGridFltr() {
    return  inputRestRepoGridFltr;
}
function getinputRestRepoGridFomat() {
    return  inputRestRepoGridFomat;
}
function getinputRestRepoView() {
    return  inputRestRepoView;
}
function getinputRestRepoCud() {
    return  inputRestRepoCud;
}
function getinputRestCmpCud() {
    return  inputRestCmpCud;
}
function getinputRestRepoCmp() {
    return  inputRestRepoRepo;
}
/////////////////////

function getmapDataRestCap() {
    return mapDataRestCap;
}
function getmapDataRestAnx() {
    return mapDataRestAnx;
}
function getmapDataRestCmp() {
    return mapDataRestCmp;
}
function getmapDataRestRepo() {
    return  mapDataRestRepo;
}
function getmapDataRestRepoGridCmp() {
    return  mapDataRestRepoGridCmp;
}
function getmapDataRestRepoGridFltr() {
    return  mapDataRestRepoGridFltr;
}
function getmapDataRestRepoGridFomat() {
    return  mapDataRestRepoGridFomat;
}
function getmapDataRestRepoView() {
    return  mapDataRestRepoView;
}
function getmapDataRestRepoCud() {
    return  mapDataRestRepoCud;
}
function getmapDataRestRepoD() {
    return  mapDataRestRepoD;
}
function getmapDataRestRepoC() {
    return  mapDataRestRepoC;
}
function getmapDataRestCmpCud() {
    return  mapDataRestCmpCud;
}
function getmapDataRestRepoCmp() {
    return  mapDataRestRepoCmp;
}

///////////////////

function seturlRestCap(e) {

}
function seturlRestAnx(e) {

}
function seturlRestCmp(e) {

}
function seturlRestRepo(e) {

}
function seturlRestRepoGridCmp(e) {

}
function seturlRestRepoGridFltr(e) {

}
function seturlRestRepoGridFomat(e) {

}
//////////////////////////////////////////

function setinputRestCap(e) {

}
function setinputRestAnx(e) {
    inputRestAnx = e; 
}
function setinputRestCmp(e) {
    inputRestCmp = e;
}
function setinputRestRepo(e) {

}
function setinputRestRepoGridCmp(e) {
    inputRestRepoGridCmp = e;
}
function setinputRestRepoGridFltr(e) {
    inputRestRepoGridFltr = e;
}
function setinputRestRepoGridFomat(e) {
    inputRestRepoGridFltr = e;
}
/////////////////////////////

function setmapDataRestCap(e) {

}
function setmapDataRestAnx(e) {

}
function setmapDataRestCmp(e) {

}
function setmapDataRestRepo(e) {

}
function setmapDataRestRepoGridCmp(e) {

}
function setmapDataRestRepoGridFltr(e) {

}
function setmapDataRestRepoGridFomat(e) {

}
///////////////////////////////

function SirUsuariosxRol() {
    var urlSir =  ipServicios + baseServicio + "SirUsuariosxRol";
    var json ={  
   "dsee_user2":{  
      "eeDatos":[  
         {  
//             "picusrcod":"alex",
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
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
    
};