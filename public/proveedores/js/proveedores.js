var bandAlert=0;
var dataProveedor;
$(document).ready(function () {   
    $('#contenido').css("height",$('#windowg').context.children["0"].clientHeight-100 + "px");

    var nit1 = sessionStorage.getItem("Nit_Tercero");
    if(nit1==="Nuevo"){
        cargarDatos1();
   
        var itm = document.getElementById("fechaAutorizacionHidden");
        var cln = itm.cloneNode(true);
        document.getElementById("columna2").append(cln);
        //document.getElementById("fechaAutorizacionHidden").hidden="true"; 
        $("body").find('[id=fechaAutorizacion1]')[1].id="fechaAutorizacion";
        $("#columna2").append("<div id='copia1'></div>");
        $("#fechaAutorizacion").kendoDatePicker({
            format: "dd/MM/yyyy"
        });
        document.getElementById("fechaAutorizacion1").hidden="true"; 
    }else{
        $("body").find('[id=fechaAutorizacion1]')[0].id="fechaAutorizacion";
        $("#fechaAutorizacion").kendoDatePicker({
            format: "dd/MM/yyyy"
        });
        cargarDatos();
        
    }


} );
function volverProveedores(){

    window.location = ("proveedoresCabecera.html");
}
               
function mostrarCustomPopUp() {
    if(bandAlert===0){
        bandAlert++;
        $("body").append("<div id='disable'></div>");
        $("#customPopUp").fadeIn("slow");
    }
    
}
function mostrarCustomPopUp1() {
    mostrarPopUp2();
    

   
}

function mostrarPopUp2() {
    if(bandAlert===0){
        bandAlert++;
        $("body").append("<div id='disable'></div>");
        $("#customPopUp1").fadeIn("slow");
    }
    
}

function crearProveedor() {
    
    var consultar = new cudProveedores();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    
    var nit1 = sessionStorage.getItem("Nit_Tercero");
    if(nit1==="Nuevo"){
        var Type="POST";
        datajson.dsSICUDcon_prv.eecon_prv[0].ter__nit=$("#NiT").val();  
        datajson.dsSICUDcon_prv.eecon_prv[0].eecon_prtra[0].ter__nit=$("#NiT").val(); 
    }else{
        var Type="PUT";
        datajson.dsSICUDcon_prv.eecon_prv[0].ter__nit=document.getElementById('raz').innerHTML; 
        datajson.dsSICUDcon_prv.eecon_prv[0].eecon_prtra[0].ter__nit=document.getElementById('raz').innerHTML; 
    }
     
    datajson.dsSICUDcon_prv.eecon_prv[0].ter__rep=document.getElementById('responsable').value;
    datajson.dsSICUDcon_prv.eecon_prv[0].bco__cod1=parseInt($("#Banco").data("kendoDropDownList")._old);
    datajson.dsSICUDcon_prv.eecon_prv[0].bco__cta=document.getElementById('cuenta').value;
    datajson.dsSICUDcon_prv.eecon_prv[0].doc__pref=document.getElementById('fechaAutorizacion').value;
    datajson.dsSICUDcon_prv.eecon_prv[0].doc__rfec=null;
    datajson.dsSICUDcon_prv.eecon_prv[0].dpto__cod=$("#departamento").data("kendoDropDownList")._old;
    datajson.dsSICUDcon_prv.eecon_prv[0].dpto__cod1=$("#departamentoBanco").data("kendoDropDownList")._old;
    datajson.dsSICUDcon_prv.eecon_prv[0].ciu__cod=$("#ciudad").data("kendoDropDownList")._old;
    datajson.dsSICUDcon_prv.eecon_prv[0].ciu__cod1=$("#ciudadBanco").data("kendoDropDownList")._old;
    datajson.dsSICUDcon_prv.eecon_prv[0].fin__dir=document.getElementById('direccionBanco').value;
    datajson.dsSICUDcon_prv.eecon_prv[0].pag__cod=parseInt($("#formaPago").data("kendoDropDownList")._old);
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__age=parseInt($("#agencia").data("kendoDropDownList")._old);
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__ben=document.getElementById('informarBeneficiario').value;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__cgo=document.getElementById('cargoResponsable').value;
    if ($("#tipoCuenta").data("kendoDropDownList")._old==="true"){var tipo=true;}else{tipo=false;}
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__cta=tipo;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__dir=document.getElementById('direccion').value;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__dpfax="";
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__ind__ciu=document.getElementById('indicativo').value;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__max=document.getElementById('maximoPago').value;
    //    datajson.dsSICUDcon_prv.eecon_prv[0].prv__nofax
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__nrfax=document.getElementById('fax').value;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__pos=document.getElementById('postal').value;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__tel =parseInt(document.getElementById('telefono').value);
    datajson.dsSICUDcon_prv.eecon_prv[0].ter__mail=document.getElementById('correo').value;
    datajson.dsSICUDcon_prv.eecon_prv[0].prv__nit=document.getElementById('correo').value;
    //datajson.dsSICUDcon_prv.eecon_prv[0].bco__nom=
    //datajson.dsSICUDcon_prv.eecon_prv[0].pag__nom=
    //datajson.dsSICUDcon_prv.eecon_prv[0].dpto__nom=
    //datajson.dsSICUDcon_prv.eecon_prv[0].dpto__nom1=
    //    datajson.dsSICUDcon_prv.eecon_prv[0].ciu__nom=
    //    datajson.dsSICUDcon_prv.eecon_prv[0].ciu__nom1=
    datajson.dsSICUDcon_prv.eecon_prv[0].eecon_prtra[0].bco__cod=parseInt($("#bancoTrans").data("kendoDropDownList")._old);
   
    $.ajax({
        
        type: Type,        
        async: false,
        data: JSON.stringify(datajson),
        url: urlService,
        dataType: "json",        
        contentType: "application/json;",
        success: function (resp) {
            if((resp.dsSICUDcon_prv.eeEstados[0].Estado)=="OK")
            {     
                           
                //alert("OK");
                parent.cerrarPopup();
            }
            else
            {
                alertDialogs("Error"+resp.dsSICUDcon_prv.eeEstados[0].Estado); 
                                                     
            }
        } 
        
    }); 
    
            
}
function cerrarCustomPopUp1() {
    bandAlert = 0;
    $("#disable").fadeOut("slow");
    $("#customPopUp1").fadeOut("slow");
    $("#disable").remove();

}
function cerrarCustomPopUp() {
    bandAlert = 0;
    $("#disable").fadeOut("slow");
    $("#customPopUp").fadeOut("slow");
    $("#disable").remove();
 
}
function cargarProveedor(e){
    
    document.getElementById('contenido').hidden=false;
    document.getElementById('raz').innerHTML=e.dsSIRcon_prv.eecon_prv[0].ter__nit;
    document.getElementById('nit').innerHTML=e.dsSIRcon_prv.eecon_prv[0].ter__raz+"-";
    document.getElementById('telefono').value=e.dsSIRcon_prv.eecon_prv[0].prv__tel;
    document.getElementById('correo').value=e.dsSIRcon_prv.eecon_prv[0].ter__mail;
    document.getElementById('fax').value=e.dsSIRcon_prv.eecon_prv[0].prv__nrfax;
    document.getElementById('direccion').value=e.dsSIRcon_prv.eecon_prv[0].prv__dir;
    
    document.getElementById('autorizacion').value=e.dsSIRcon_prv.eecon_prv[0].doc__pref;
    //document.getElementById('departamento').value=e.dsSIRcon_prv.eecon_prv[0].dpto__cod1;
    document.getElementById('indicativo').value=e.dsSIRcon_prv.eecon_prv[0].prv__ind__ciu;
    document.getElementById('postal').value=e.dsSIRcon_prv.eecon_prv[0].prv__pos;
    document.getElementById('informarBeneficiario').value=e.dsSIRcon_prv.eecon_prv[0].prv__ben;
    document.getElementById('fechaAutorizacion').value=e.dsSIRcon_prv.eecon_prv[0].doc__pref;
    //document.getElementById('estado').value=e.dsSIRcon_prv.eecon_prv[0].prv__est;
    //Detalle 
    
    document.getElementById('cuenta').value=e.dsSIRcon_prv.eecon_prv[0].bco__cta;
    document.getElementById('maximoPago').value=e.dsSIRcon_prv.eecon_prv[0].prv__max;
    document.getElementById('direccionBanco').value=e.dsSIRcon_prv.eecon_prv[0].fin__dir;
    //document.getElementById('departamentoBanco').value=e.dsSIRcon_prv.eecon_prv[0].dpto__cod;
    document.getElementById('responsable').value=e.dsSIRcon_prv.eecon_prv[0].ter__rep;
    document.getElementById('cargoResponsable').value=e.dsSIRcon_prv.eecon_prv[0].prv__cgo;
    // $("#agencia").data("kendoNumericTextBox").value(e.dsSIRcon_prv.eecon_prv[0].prv__age);
    
    document.getElementById('tipoCuenta').value=e.dsSIRcon_prv.eecon_prv[0].prv__cta;
    //document.getElementById('terceroBancario').value=e.dsSIRcon_prv.eecon_prv[0].prv__nit;
    var dropdownlist = $("#terceroBancario").data("kendoAutoComplete");
    //dropdownlist.value(e.dsSIRcon_prv.eecon_prv[0].prv__nit);
    var estados = [
        {text: "Corriente", valor: true},
        {text: "Ahorro", valor: false}
    ];

    $("#tipoCuenta").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "valor",
         
        dataSource: estados,
        dataBound: function() {         
            var dropdownlist = $("#tipoCuenta").data("kendoDropDownList");
            dropdownlist.value(dataProveedor.dsSIRcon_prv.eecon_prv[0].prv__cta);
        
        }
       
    });
    var obj = new sirConsultaTercero();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    $("#terceroBancario")
                
            .kendoAutoComplete({
                dataTextField: "ter__raz",
        dataValueField: "ter__raz",        
        placeholder: "Selecione un tercero...",
        minLength: 6,
        filter: "contains",
        select: function(e) {                
             
        },
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
        //select: setInfoCliente,
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try {
                                          
                        if (operation === 'read') {
                            var key1 = Object.keys(objJson)[0];
                            var key2 = Object.keys(objJson[key1])[1];
                            objJson[key1][key2][0].picter_nit = "";
                            objJson[key1][key2][0].picter_raz = $("#terceroBancario").val();;
                            return JSON.stringify(objJson);
                        } 
                    } catch (e) {
                        alertDialogs(e.message);
                    }                                    
                }
            },
            schema: {
                data: function (e){   
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !"){
                        
                    }else{
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
            change: function (e) {
                //console.log("Change client");
            },
            requestStart: function (e) {
                //console.log("Request Start servicio cliente");
            }            
        }
    });
    var consultar = new sirFormapago();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud2 = "eesic_fpag";
    $("#formaPago")
            .kendoDropDownList({
                dataTextField: "fpag__des",
        dataValueField: "pag__cod",
        dataBound: function() {         
            var dropdownlist = $("#formaPago").data("kendoDropDownList");
            dropdownlist.value(dataProveedor.dsSIRcon_prv.eecon_prv[0].pag__cod);
        },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud2];
                    } else {
                        alertDialogs("Error Con Servicio Forma de pago"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "pag__cod",
                    fields: {
                        pag__cod: {editable: false, nullable: false},
                        fpag__des: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
    
   

    paises(e);
    paisesBanco(e);
    bancotrans();
    bancos();
}
function sucursales(e){
    var consultar = new sirSucursalBanco();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud3 = "eesic_sbco";
    //datajson.dsSIRsic_sbco.SIRsic_sbco[0].piibco__cod=e;
    $("#agencia")
            .kendoDropDownList({
                
                dataTextField: "bco__nom",
        dataValueField: "bco__cod",
        dataBound: function() {          
            var dropdownlist = $("#agencia").data("kendoDropDownList");
            dropdownlist.value(e);

        },
           
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud3];
                    } else {
                        alertDialogs("Error Con Servicio Sucursales"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "bco__cod",
                    fields: {
                        bco__nom: {editable: true, nullable: false},
                        bco__cod: {editable: true, nullable: false},
                        
                    }
                }
            }
        }
        
    });
}
function bancos(){
    var consultar = new sirBancos();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud3 = "eesic_bco";
    
    $("#Banco")
            .kendoDropDownList({
                
                dataTextField: "bco__nom",
        dataValueField: "bco__cod",
        dataBound: function() {          
            var dropdownlist = $("#Banco").data("kendoDropDownList");
            dropdownlist.value(dataProveedor.dsSIRcon_prv.eecon_prv[0].bco__cod1);
            sucursales(dataProveedor.dsSIRcon_prv.eecon_prv[0].prv__age);
        },
        change: function(){
            sucursales(dataProveedor.dsSIRcon_prv.eecon_prv[0].prv__age);
        },   
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud3];
                    } else {
                        alertDialogs("Error Con Servicio Bancos"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "bco__cod",
                    fields: {
                        bco__nom: {editable: true, nullable: false},
                        bco__cod: {editable: true, nullable: false},
                        
                    }
                }
            }
        }
        
    });
}
function bancoNuevo(){
    var consultar = new sirBancos();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud3 = "eesic_bco";
    
    $("#Banco")
            .kendoDropDownList({
                
                dataTextField: "bco__nom",
        dataValueField: "bco__cod",
        dataBound: function() {          
        
       
            sucursales("");
        },
        change: function(){
            var dropdownlist = $("#Banco").data("kendoDropDownList");
            sucursales(parseInt(dropdownlist._old));
           
        },   
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud3];
                    } else {
                        alertDialogs("Error Con Servicio Bancos"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "bco__cod",
                    fields: {
                        bco__nom: {editable: true, nullable: false},
                        bco__cod: {editable: true, nullable: false},
                        
                    }
                }
            }
        }
        
    });
}
function bancotrans(){
    document.getElementById("bancoTrans").removeAttribute("class");
    var consultar = new sirBancoDetalle();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud3 = "eesic_tra";
    
    $("#bancoTrans")
            .kendoDropDownList({
                
                dataTextField: "bco__nom",
        dataValueField: "bco__cod",
        dataBound: function() {          
            var dropdownlist = $("#bancoTrans").data("kendoDropDownList");
            dropdownlist.value(dataProveedor.dsSIRcon_prv.eecon_prv[0].eecon_prtra[0].bco__cod);
        },
           
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud3];
                    } else {
                        alertDialogs("Error Con Servicio Bancos"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "bco__cod",
                    fields: {
                        bco__nom: {editable: true, nullable: false},
                        bco__cod: {editable: true, nullable: false}
                        
                    }
                }
            }
        }
        
    });
    
}
function paises(e){
    var consultar = new sirPaises();
    var datajson = consultar.getjson();
    //    var ciudad=e.dsSIRcon_prv.eecon_prv[0].ciu__cod;
    //    var ciudad=ciudad.slice(0, 2);
    //    datajson.dsSIRsic_ciuxfiltro.eeSIRsic_ciu_xfiltro[0].picciu_cod=ciudad;
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eesic_ciu";
    var paises = $("#pais")
            .kendoDropDownList({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        select: function(e) {          
            departamentos(e.dataItem.ciu__cod);
            var dropdownlist = $("#ciudad").data("kendoDropDownList");
            dropdownlist.value("");
        },
        //            dataBound: function(e) {         
        //            var dropdownlist = $("#pais").data("kendoDropDownList");
        //            dropdownlist.value();
        //        
        //            },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Paises"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__nom: {editable: false, nullable: false},
                        ciu__cod: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
    if(e){
        var dropdownlist = $("#pais").data("kendoDropDownList");
        dropdownlist.value(e.dsSIRcon_prv.eecon_prv[0].ciu__cod.slice(0,2));
        departamentos(e.dsSIRcon_prv.eecon_prv[0].ciu__cod);
    }
}
function departamentos(e){
    document.getElementById("departamento").removeAttribute("class");
    var departamento = e.slice(0,2);
    var consultar = new sirPaises();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    datajson.dsSIRsic_ciuxfiltro.eeSIRsic_ciu_xfiltro[0].picciu_cod = departamento;
    datajson.dsSIRsic_ciuxfiltro.eeSIRsic_ciu_xfiltro[0].piiciu_pos=4;
    
    var mapCud1 = "eesic_ciu";
    var paises = $("#departamento")
            .kendoDropDownList({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        select: function(e) {          
            ciudades(e.dataItem.ciu__cod);
        },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Paises"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__nom: {editable: false, nullable: false},
                        ciu__cod: {editable: false, nullable: false}
                    }
                }
            }
        }
        
        
    });
    
    
    if(e){
        var dropdownlist = $("#departamento").data("kendoDropDownList");
        dropdownlist.value(e.slice(0,4));
        ciudades(e);
    }
}

function ciudades(e){
    document.getElementById("ciudad").removeAttribute("class");
    var consultar = new sirPaises();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    datajson.dsSIRsic_ciuxfiltro.eeSIRsic_ciu_xfiltro[0].picciu_cod=e;
    datajson.dsSIRsic_ciuxfiltro.eeSIRsic_ciu_xfiltro[0].piiciu_pos=7;
    
    var mapCud1 = "eesic_ciu";
    var paises = $("#ciudad")
            .kendoDropDownList({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        select: function(e) {          
            //ciudades(e.dataItem.ciu__cod);
        },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Paises"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__nom: {editable: false, nullable: false},
                        ciu__cod: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
    
    
    
}
///-----------------------------------------------------------------------------
function paisesBanco(e){
    var consultar = new sirPaises();
    var datajson = consultar.getjson();

    var urlService = consultar.getUrlSir();
    var mapCud1 = "eesic_ciu";
    var paises = $("#paisBanco")
            .kendoDropDownList({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        dataBound: function(e) {          
            //departamentosBanco(e.dataItem.ciu__cod);
            //            var dropdownlist = $("#paisBanco").data("kendoDropDownList");
            //            dropdownlist.value("");
        },
        select: function(e) {
            
            departamentosBanco(e.dataItem.ciu__cod);            
            var dropdownlist = $("#ciudadBanco").data("kendoDropDownList");
            dropdownlist.value("");
        },
        //            dataBound: function(e) {         
        //            var dropdownlist = $("#pais").data("kendoDropDownList");
        //            dropdownlist.value();
        //        
        //            },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Paises"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__nom: {editable: false, nullable: false},
                        ciu__cod: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
    if(e){
        var dropdownlist = $("#paisBanco").data("kendoDropDownList");
        dropdownlist.value(e.dsSIRcon_prv.eecon_prv[0].ciu__cod1.slice(0,2));
        departamentosBanco(e.dsSIRcon_prv.eecon_prv[0].ciu__cod1);
    }
}
function departamentosBanco(e){
    document.getElementById("departamentoBanco").removeAttribute("class");
    var departamento = e.slice(0,2);
    var consultar = new sirPaises();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    datajson.dsSIRsic_ciuxfiltro.eeSIRsic_ciu_xfiltro[0].picciu_cod = departamento;
    datajson.dsSIRsic_ciuxfiltro.eeSIRsic_ciu_xfiltro[0].piiciu_pos=4;
    
    var mapCud1 = "eesic_ciu";
    $("#departamentoBanco")
            .kendoDropDownList({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        select: function(e) {          
            ciudadesBanco(e.dataItem.ciu__cod);
            var dropdownlist = $("#ciudadBanco").data("kendoDropDownList");
            dropdownlist.value("");
        },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Paises"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__nom: {editable: false, nullable: false},
                        ciu__cod: {editable: false, nullable: false}
                    }
                }
            }
        }
        
        
    });
    
    
    if(e){
        var dropdownlist = $("#departamentoBanco").data("kendoDropDownList");
        dropdownlist.value(e.slice(0,4));
        ciudadesBanco(e);
    }
}

function ciudadesBanco(e){
    document.getElementById("ciudadBanco").removeAttribute("class");
    var consultar = new sirPaises();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    datajson.dsSIRsic_ciuxfiltro.eeSIRsic_ciu_xfiltro[0].picciu_cod=e;
    datajson.dsSIRsic_ciuxfiltro.eeSIRsic_ciu_xfiltro[0].piiciu_pos=7;
    
    var mapCud1 = "eesic_ciu";
    $("#ciudadBanco")
            .kendoDropDownList({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        select: function(e) {          
            //ciudades(e.dataItem.ciu__cod);
        },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Paises"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__nom: {editable: false, nullable: false},
                        ciu__cod: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
    
    
    
}
function banco(){
    var consultar = new sirBancos();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud3 = "eesic_bco";
    
    $("#Banco").kendoDropDownList({
                
        dataTextField: "bco__nom",
        dataValueField: "bco__cod",
        placeholder: "Banco...",
           
   
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud3];
                    } else {
                        alertDialogs("Error Con Servicio Bancos"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "bco__cod",
                    fields: {
                        bco__nom: {editable: true, nullable: false},
                        bco__cod: {editable: true, nullable: false},
                        
                    }
                }
            }
        }
        
    });
}
function cargarDatos(e){
    try {
        //    var tercero = $("#terceroNit").data("kendoAutoComplete")._old;
        //    var fields = tercero.split(';');
        //    var name = fields[0];
        //    var nit1 = fields[1];
        //    var nit = nit1.replace(/\s+/g, '');
        var nit1 = sessionStorage.getItem("Nit_Tercero");
        var  actualizar = new sirProveedor();
        var  actjson = actualizar.getjson();
        //     var nit = nit1.replace("", '');
        actjson.dsSIRcon_prv.eeSIRcon_prv[0].picter_nit=nit1;    
        var  urlactualizar = actualizar.getUrlSir();
        $.ajax({
        
            type: "POST",        
            async: false,
            data: JSON.stringify(actjson),
            url: urlactualizar,
            dataType: "json",        
            contentType: "application/json;",
            success: function (resp) {
                if((resp.dsSIRcon_prv.eeEstados[0].Estado)=="OK")
                {     
                    dataProveedor = resp;
                    cerrarCustomPopUp();   
                    cargarProveedor(dataProveedor);
                }
                else
                {
                    alertDialogs("Error"+resp.dsSIRcon_prv.eeEstados[0].Estado); 
                                                     
                }
            } 
        
        }); 
    
    }catch(err) {
        alertDialogs("Error :" + err.message);
    }
 
}
function onloadPopUpCond(){
    
    var consultar = new sirProveedores();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eeconprv";
    
    $("#terceroNit")
            .kendoAutoComplete({
                
                dataTextField: "nit__raz",
        dataValueField: "ter__nit",
        placeholder: "Selecione un tercero...",
        minLength: 3,
        filter: "contains",
        select: function(e) {                
           
        },
        template:'<div class="divElementDropDownList">#: data.nit__raz #</div>',
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Terceros"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ter__nit",
                    fields: {
                        nit__raz: {editable: true, nullable: false},
                        ter__nit: {editable: true, nullable: false},
                        
                    }
                }
            }
        }
        
    });
}
function cargarDatos1(e){
    try {
        bancotrans();
        var consultar = new sirPaises();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud5 = "eesic_ciu";
        var paises = $("#pais")
                .kendoDropDownList({
                    dataTextField: "ciu__nom",
            dataValueField: "ciu__cod",
            select: function(e) {          
                departamentos(e.dataItem.ciu__cod);
                var dropdownlist = $("#ciudad").data("kendoDropDownList");
                dropdownlist.value("");
            },
            dataSource: {
                transport: {
                    read: {
                        url: urlService,
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8"
                    },
                    parameterMap: function (options, operation) {
                        if (operation === "read") {
                            return JSON.stringify(datajson);
                        }
                    }
                },
                schema: {
                    data: function (e) {
                        var key1 = Object.keys(e)[0];
                        if (e[key1].eeEstados[0].Estado === "OK") {
                            return e[key1][mapCud5];
                        } else {
                            alertDialogs("Error Con Servicio Paises"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "ciu__cod",
                        fields: {
                            ciu__nom: {editable: false, nullable: false},
                            ciu__cod: {editable: false, nullable: false}
                        }
                    }
                }
            }
        
        });
        var consultar = new sirPaises();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud5 = "eesic_ciu";
        var paises = $("#paisBanco")
                .kendoDropDownList({
                    dataTextField: "ciu__nom",
            dataValueField: "ciu__cod",
            select: function(e) {          
                departamentosBanco(e.dataItem.ciu__cod);
                var dropdownlist = $("#ciudadBanco").data("kendoDropDownList");
                dropdownlist.value("");
            },
            dataSource: {
                transport: {
                    read: {
                        url: urlService,
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8"
                    },
                    parameterMap: function (options, operation) {
                        if (operation === "read") {
                            return JSON.stringify(datajson);
                        }
                    }
                },
                schema: {
                    data: function (e) {
                        var key1 = Object.keys(e)[0];
                        if (e[key1].eeEstados[0].Estado === "OK") {
                            return e[key1][mapCud5];
                        } else {
                            alertDialogs("Error Con Servicio Paises"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "ciu__cod",
                        fields: {
                            ciu__nom: {editable: false, nullable: false},
                            ciu__cod: {editable: false, nullable: false}
                        }
                    }
                }
            }
        
        });
    
        bancoNuevo();
        var obj = new sirConsultaTercero();
        var objJson = obj.getjson();
        var url = obj.getUrlSir();
        var mapData = obj.getMapData();
        $("#NiT").kendoAutoComplete({
            dataTextField: "ter__nit",
            dataValueField: "ter__nit",        
            placeholder: "Selecione un tercero...",
            minLength: 4,
            filter: "contains",
            select: function(e) {                
                $("#razonSocial").val(e.dataItem.ter__raz);  
                document.getElementById('fax').value=e.dataItem.ter__fax;
                document.getElementById('telefono').value=e.dataItem.ter__tel;
                document.getElementById('correo').value=e.dataItem.ter__fax;
                document.getElementById('direccion').value=e.dataItem.ter__dir;
            
                var dropdownlist = $("#pais").data("kendoDropDownList");
                dropdownlist.value(e.dataItem.ciu__cod.slice(0, 2));
                ciudades(e.dataItem.ciu__cod);
                departamentos(e.dataItem.ciu__cod);
            },
            template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
            //select: setInfoCliente,
            dataSource: {
                type: "json",
                serverFiltering: true,
                transport: {
                    read:{
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                        try {
                                          
                            if (operation === 'read') {
                                var key1 = Object.keys(objJson)[0];
                                var key2 = Object.keys(objJson[key1])[1];
                                objJson[key1][key2][0].picter_nit = $("#NiT").val();
                                objJson[key1][key2][0].picter_raz = "";
                                return JSON.stringify(objJson);
                            } 
                        } catch (e) {
                            alertDialogs(e.message);
                        }                                    
                    }
                },
                schema: {
                    data: function (e){
                        var key1 = Object.keys(e)[0];
                        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                            //$("#cedula").val(e.dsgfc_cli.eegfc_cli[0].ter__nit);
                            return e[key1][mapData];
                        }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !"){
                        
                        }else{
                            alertDialogs(e[key1].eeEstados[0].Estado);
                        }
                    },
                    model:{}
                },
                error: function (xhr, error) {
                    alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                },
                change: function (e) {
                    //console.log("Change client");
                },
                requestStart: function (e) {
                    //console.log("Request Start servicio cliente");
                }            
            }
        });    
        var obj = new sirConsultaTercero();
        var objJson = obj.getjson();
        var url = obj.getUrlSir();
        var mapData = obj.getMapData();
        $("#razonSocial")
                
                .kendoAutoComplete({
                    dataTextField: "ter__raz",
            dataValueField: "ter__nit",        
            placeholder: "Selecione un tercero...",
            minLength: 6,
            filter: "contains",
            select: function(e) {                  
                $("#NiT").val(e.dataItem.ter__nit);   
                document.getElementById('fax').value=e.dataItem.ter__fax;
                document.getElementById('telefono').value=e.dataItem.ter__tel;
                document.getElementById('correo').value=e.dataItem.ter__fax;
                document.getElementById('direccion').value=e.dataItem.ter__dir;
                var dropdownlist = $("#pais").data("kendoDropDownList");
                dropdownlist.value(e.dataItem.ciu__cod.slice(0, 2));
                ciudades(e.dataItem.ciu__cod);
                departamentos(e.dataItem.ciu__cod);
            },
            template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
            //select: setInfoCliente,
            dataSource: {
                type: "json",
                serverFiltering: true,
                transport: {
                    read:{
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                        try {
                                          
                            if (operation === 'read') {
                                var key1 = Object.keys(objJson)[0];
                                var key2 = Object.keys(objJson[key1])[1];
                                objJson[key1][key2][0].picter_nit = "";
                                objJson[key1][key2][0].picter_raz = $("#razonSocial").val();;
                                return JSON.stringify(objJson);
                            } 
                        } catch (e) {
                            alertDialogs(e.message);
                        }                                    
                    }
                },
                schema: {
                    data: function (e){   
                        var key1 = Object.keys(e)[0];
                        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                            return e[key1][mapData];
                        }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !"){
                        
                        }else{
                            alertDialogs(e[key1].eeEstados[0].Estado);
                        }
                    },
                    model:{}
                },
                error: function (xhr, error) {
                    alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                },
                change: function (e) {
                    //console.log("Change client");
                },
                requestStart: function (e) {
                    //console.log("Request Start servicio cliente");
                }            
            }
        });
        var obj = new sirConsultaTercero();
        var objJson = obj.getjson();
        var url = obj.getUrlSir();
        var mapData = obj.getMapData();
        $("#terceroBancario")
                
                .kendoAutoComplete({
                    dataTextField: "ter__raz",
            dataValueField: "ter__raz",        
            placeholder: "Selecione un tercero...",
            minLength: 6,
            filter: "contains",
            select: function(e) {                
             
            },
            template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
            //select: setInfoCliente,
            dataSource: {
                type: "json",
                serverFiltering: true,
                transport: {
                    read:{
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                        try {
                                          
                            if (operation === 'read') {
                                var key1 = Object.keys(objJson)[0];
                                var key2 = Object.keys(objJson[key1])[1];
                                objJson[key1][key2][0].picter_nit = "";
                                objJson[key1][key2][0].picter_raz = $("#terceroBancario").val();;
                                return JSON.stringify(objJson);
                            } 
                        } catch (e) {
                            alertDialogs(e.message);
                        }                                    
                    }
                },
                schema: {
                    data: function (e){   
                        var key1 = Object.keys(e)[0];
                        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                            return e[key1][mapData];
                        }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !"){
                        
                        }else{
                            alertDialogs(e[key1].eeEstados[0].Estado);
                        }
                    },
                    model:{}
                },
                error: function (xhr, error) {
                    alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                },
                change: function (e) {
                    //console.log("Change client");
                },
                requestStart: function (e) {
                    //console.log("Request Start servicio cliente");
                }            
            }
        });
        var estados = [
            {text: "Corriente", valor: true},
            {text: "Ahorro", valor: false}
        ];
        document.getElementById('contenido').hidden=false;
        document.getElementById('nitNuevo').hidden=false;
        document.getElementById('razon').hidden=false;
        $("#tipoCuenta").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "valor",
         
            dataSource: estados,
            dataBound: function() {        
                var dropdownlist = $("#tipoCuenta").data("kendoDropDownList");
       
        
            }
       
        });

        var consultar = new sirFormapago();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud2 = "eesic_fpag";
        $("#formaPago")
                .kendoDropDownList({
                    dataTextField: "fpag__des",
            dataValueField: "pag__cod",
            dataBound: function() {         
   
            },
            dataSource: {
                transport: {
                    read: {
                        url: urlService,
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8"
                    },
                    parameterMap: function (options, operation) {
                        if (operation === "read") {
                            return JSON.stringify(datajson);
                        }
                    }
                },
                schema: {
                    data: function (e) {
                        var key1 = Object.keys(e)[0];
                        if (e[key1].eeEstados[0].Estado === "OK") {
                            return e[key1][mapCud2];
                        } else {
                            alertDialogs("Error Con Servicio Forma de pago"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "pag__cod",
                        fields: {
                            pag__cod: {editable: false, nullable: false},
                            fpag__des: {editable: false, nullable: false}
                        }
                    }
                }
            }
        
        });
    
    }catch(err) {
        alertDialogs("Error :" + err.message);
    }
}
