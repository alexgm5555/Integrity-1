
//-------------------------------------------------------------------------
function sirusuariobpm() {
    var urlSir =  ipServicios + baseUsrBpm + "SIRbpm_proc_own_task";
    var json ={  
   "dsSIRbpm_proc":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRbpm_proc":[  
         {  
            "piccia__nit":"*",
            "picproc__name":"*",
            "picusuario":"*"
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
//-----------------------------------------

//-------------------------------------------------------------------------
function usrtask() {
    var urlSir =  ipServicios + baseUsrBpm + "SIRbpm_task";
    var json = {  
   "dsSIRbpm_task":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid")
         }
      ],    
        "SIRbpm_task": [
         {
        "picusr__bmp": sessionStorage.getItem("usuario")+"_"+sessionStorage.getItem("companyNIT"),
        "pictask__name": "*",
        "picproc__name": "*"
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
//-----------------------------------------
function sirtask_proces() {
    var urlSir =  ipServicios + baseUsrBpm + "SIRbpm_task_proc";
    var json = {  
   "dsSIRbpm_task_proc":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid")
         }
      ],    
        "SIRbpm_task_proc": [
          {
        "picproc__name": "*",
        "picusuario": sessionStorage.getItem("usuario"),
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
//-----------------------------------------------------------------------
 function sirconsulta() {
    var urlSir = ipServicios + baseUsrBpm +"SIRbpm_userFromPortal";
    var json = {  
   "dsUserBPM":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SirUserBPM":[  
         {  
            "picia__nit": sessionStorage.getItem("companyNIT"),
            "picproc__name":"*",
            "pictask__name":"*"
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
//---------------------------------------------------------------------------
function serviRoles() {
    var urlSir = ipServicios + baseServicio +"SirCargos2";
    var json = {  
   "SIResic_car":{  
      "eeDatos":[  
         {  
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
////------------------------------------
function siractores() {
   var urlSir = ipServicios + baseActores +"SIRsic_actor";
    var json = {  
   "dssic_actor":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRsic_actor":[  
         {  
            "picactor__cod":"*"
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
//--------------------------------------------------------------
function cudTareasXusr() {
    var urlSir = ipServicios + baseUsrBpm +"SICUDbpm_own_task";
    var json = {  
   "dsbpm_own_task":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "TTparam":[  
         {  
            "piccia_nit": sessionStorage.getItem("companyNIT"),
            "picproc_name":"*"
         }
      ],
      
      "eebpm_own_task":[  
         {  

         
         },
         
                  {  
            "cia__nit":"*",
            "proc__name":"*",
            "task__name":"*",
            "task__type":"*",
            "usr__cod":"*"
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

//--------------------------------------------------------------
function sirtask() {
    var urlSir = ipServicios + baseUsrBpm +"SIRbpm_task";
    var json = {  
   "dsSIRbpm_task":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRbpm_task":[  
         {  
            "pictask__name":"*",
            "picproc__name":"*",
            "piccia__nit": sessionStorage.getItem("companyNIT")
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
//-------------------------------------------------------
function sistartaplication() {
    var urlSir = ipServicios + baseUsrBpm +"SIStartAplication";
    var json = {  
   "dsAplication":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRapp":[  
         {  
         	"picproc__name":"*",
         	"picusr__cod": sessionStorage.getItem("usuario"),
                "piccia__nit": sessionStorage.getItem("companyNIT")
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
//---------------------------------------------------------------------------
function serviRoles() {
    var urlSir = ipServicios + baseServicio +"SirCargos2";
    var json = {  
   "SIResic_car":{  
      "eeDatos":[  
         {  
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
//------------------------------------------------------------------------------
function serviTime() {
    var urlSir = ipServicios + baseServicio +"GetDateTime";
    var json = {  
   "dstime":{  
      "eeDatos":[  
         {  
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
//---------------------------------------------------------------------------
function IniciaVacaciones() {
    var urlSir = ipServicios + baseUsrBpm +"SIRSolicitaVacaciones";
    var json =  {  
   "dsparam_proc_vac":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
    "SIRparam":[  
         {  
            "piccedula":sessionStorage.getItem("clienteNIT")
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
//-------------------------------------------------------------------------
function sirJefes() {
    var urlSir =  ipServicios + baseServicio + "SirJefes";
    var json ={  
   "dsJefes":{  
      "eeDatos":[  
         {  
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
//---------------------------------------------------------------------------
function guardarVacaciones() {
    var urlSir = ipServicios + baseUsrBpm +"SIInicioSolicitudVacaciones";
    var json = {  
   "dsSolicitudVacaciones":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
     ],
       "eeParametros":[  
         {  
            "picproc_name":"",
            "usertoassign":"",
         }
     ],
   "eeSolicitudVacaciones":[  
         {  
   "Id_empleado":sessionStorage.getItem("usuario"),
   "email_empleado":"",
   "fecha_ult_vac":"",
   "Pago_anticipado":"",
   "dias_ant_solicitud":0,
   "estado_aprocbacion":"",
   "dias_tiempo":0,
   "fecha_ini_vacaciones":"",
   "dias_dinero":0,
   "jefe_inmediato":"",
   "dias_disponibles":0,
   "dias_anticipados":0,
   "fecha_solictud":"",
   "tiempo_rta_solicitud":0,
   "observaciones_empleado":""
         }
     ],
    "ecreatedocument":[  
         {  
            "picdocname":"",
            "picdescription":"",
            "picfolderpath":"",
            "picldocbase64":"",
            "picmimetype":""
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
//---------------------------------------------------------------------------
function infoAyuda() {
    var urlSir = ipServicios + baseUsrBpm +"SIRgetWorkstepInstructionLong";
    var json = {  
   "dsgetWorkstepInstruction":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "getWorkstepInstruction":[  
         {  
         
          "picprocname":"",
            "pictaskname":"",
            "picusuario":sessionStorage.getItem("usuario"),
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
//---------------------------------------------------------------------------
function sirInstancias() {
    var urlSir = ipServicios + baseUsrBpm +"getUserCreatedProcessInstanceListByUserName";
    var json = {  
   "dsProcessInstanceListByUserName":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],  
     "SIRProcessInstanceList":[  
         {  
            "picprocname":""
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
//---------------------------------------------------------------------------
function SirUsuariosReasigna() {
    var urlSir = ipServicios + baseUsrBpm +"SIRjefesBPM";
    var json = {  
   "dsJefesBpm":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
     ],
       "eeSIRjefes":[  
         {  
            "picprocname":""
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
//---------------------------------------------------------------------------
function cudReasignaTarea() {
    var urlSir = ipServicios + baseUsrBpm +"reassignvarioustasks";
    var json = {  
   "dsreassignvarioustasks":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "reassignto":[  
         {  
            "picuserreassign":""
         }
      ],
          "eetask":[  
         {  
            "taskname":"",
            "procname":""
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
//---------------------------------------------------------------------------
function SirApruevaVacaciones() {
    var urlSir = ipServicios + baseUsrBpm +"ConsultaDataslotsVacaciones";
    var json = {  
   "dsSolicitudVacaciones":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
    "SIRSolicitudVacaciones":[  
         {  
            "picprocid":"",
            "pictaskname":""
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
//---------------------------------------------------------------------------
function CudApruevaVacaciones() {
    var urlSir = ipServicios + baseUsrBpm +"ActualizaCompletaVacaciones";
    var json = {  
   "dsSolicitudVacaciones":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
    "SIRSolicitudVacaciones":[  
         {  
            "picprocid":"",
            "pictaskname":""
         }
      ],
	"eeSolicitudVacaciones": [
		{
		"Id_empleado": "jsandrea_800001541",
		"email_empleado": "email@mail.com",
		"fecha_ult_vac": "2014-09-22",
		"fecha_Ingreso": null,
		"Pago_anticipado": true,
		"observaciones_jefe": "",
		"dias_ant_solicitud": 0,
		"estado_aprocbacion": true,
		"dias_tiempo": 4,
		"fecha_ini_vacaciones": "2017-02-02",
		"dias_dinero": 4,
		"jefe_inmediato": "aduarte_800001541",
		"dias_disponibles": 30,
		"dias_anticipados": 20,
		"fecha_solictud": "2017-01-10",
		"tiempo_rta_solicitud": 0,
		"Jefe_Reasignado": "",
		"observaciones_empleado": "asdasdasd",
		"tarea_reasignada": false,
		"tiempo_espera_segundos": 0,
		"tiempo_reasignar_segundos": 0
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
//---------------------------------------------------------------------------
function SirConsultaDocumentos() {
    var urlSir = ipServicios + baseDocAlfresco +"SIRdoc_list";
    var json = {  
   "dsSIRdoc_list":{  
      "eeDatos":[  
         {  
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
//---------------------------------------------------------------------------
function CudTareaReasignarFlujo() {
    var urlSir = ipServicios + baseUsrBpm +"SIcompleteandreassignVacaciones";
    var json = {  
   "dsSolicitudVacaciones":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRSolicitudVacaciones":[  
         {  
            "picprocid":"",
            "pictaskname":"",
            "usertoreassign":""
         }
      ],
      "eeSolicitudVacaciones":[  
         { 
            "Jefe_Reasignado":"",
            "tarea_reasignada":true
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
//---------------------------------------------------------------------------
function sirDocumentosInstancia() {
    var urlSir = ipServicios + baseUsrBpm +"ConsultaDataslotsVacaciones";
    var json = {  
   "dsSolicitudVacaciones":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRSolicitudVacaciones":[  
         {  
            "picprocid":"",
            "pictaskname":"",
            "picyear":"",
            "picmonth":""
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
//---------------------------------------------------------------------------
function descargaDocumentosInstancia() {
    var urlSir = ipServicios + baseServicio +"GetDocument";
    var json = {  
   "dsfiles":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRfile":[  
         {  
            "pilfilename":"",
            "piitipo":0,
            "picfilepath":""
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
//---------------------------------------------------------------------------
function consultaHistoricoVacaciones() {
    var urlSir = ipServicios + baseNomina +"SIRHistoricoVacaciones";
    var json = {  
   "dshistoricovacas":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "eeParam":[  
         {  
            "piccedula":sessionStorage.getItem("clienteNIT"),
            
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