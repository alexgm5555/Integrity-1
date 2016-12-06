/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var idItem=0;
var objArticulo= new Object();

$(document).ready(function() {
    $("#btAgregar").kendoButton({
    });
    
    $("#btCancelar").kendoButton({
    });
    
    $("#ipConceptoDet").kendoDropDownList({
        optionLabel: "Seleccione el concepto",
        dataTextField: "tcont__des",
        dataValueField: "tcont__cod",      
        template:'<div class="divElementDropDownList">#: data.tcont__des #</div>',
        dataSource: {
            transport: {
                read: {
                    url: ipServicios+baseParameters+"SIRsic_tcont",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {                    
                    try {                         
                        if (operation === 'read') {                            
                            authdssic_tcont.dssic_tcont.eetemp[0].piitcont__cod = 0;
                            authdssic_tcont.dssic_tcont.eetemp[0].picclc__cod = parent.$("#ipCDocumento").val();
                            authdssic_tcont["eesic_tcont"] = [options];                            
                            return JSON.stringify(authdssic_tcont);
                        }	
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_tcont.eeEstados[0].Estado==="OK"){
                       
                        return e.dssic_tcont.eesic_tcont;
                    }else{
                        alertDialogs(e.dssic_tcont.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "tcont__cod",
                    fields: {
                        tcont__cod: {validation: {required: true}, type: 'number'},
                        tcont__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }        
    });
    
    $("#idClaseArticulo").kendoDropDownList({
        dataTextField: 'cla__des',
        dataValueField: 'cla__cod',
        optionLabel: "Seleccionar clase de articulo...",
        template:'<div class="divElementDropDownList">#: data.cla__des #</div>',                  
        change: onChangeClase,
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: ipServicios+"rest/Parameters/SIRinv_cla",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        authdsinv_cla.dsinv_cla.eetemp[0].picsuc_cod = parent.$("#ipSucursal").val();                        
                        if (operation === 'read') {
                            authdsinv_cla["eeinv_cla"] = [options];
                            return JSON.stringify(authdsinv_cla);
                        }	
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsinv_cla.eeEstados[0].Estado==="OK"){                            
                        return e.dsinv_cla.eeinv_cla;
                    }else{
                        alertDialogs(e.dsinv_cla.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cla__cod",
                    fields: {
                        cla__cod: {validation: {required: true}, type: 'number'},
                        cla__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }			
    });
    
    $("#idArticulo").kendoAutoComplete({
        dataTextField: 'art__des',
        optionLabel: "Seleccionar articulo...",
        minLength: 3,
        filter: "contains",
        template:'<div class="divElementDropDownList">#: data.art__des #</div>',
        select: onChangeArticulo,
        dataBound: onDataBoundArticulo,
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: ipServicios+"rest/Parameters/SIRinv_art",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    authdsinv_art.dsinv_art.eetemp[0].piicla_cod = $("#idClaseArticulo").val();
                    authdsinv_art.dsinv_art.eetemp[0].piilis_num = sessionStorage.getItem("listaPrecioCliente");//lista del cliente        
                    authdsinv_art.dsinv_art.eetemp[0].picart_des = $("#idArticulo").val();
                    console.log("authdsinv_art"+JSON.stringify(authdsinv_art));
                    try {
                        if (operation === 'read') {
                            authdsinv_art["eeinv_art"] = [options];                                  
                            return JSON.stringify(authdsinv_art);                                
                        }	
                    } catch (e) {
                        alertDialogs("Error" +e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){                         
                    if(e.dsinv_art.eeEstados[0].Estado==="OK"){
                        //                            console.log("authdsinv_art "+JSON.stringify(authdsinv_art));
                        return e.dsinv_art.eeinv_art;
                    }else{
                        alertDialogs("Error: " +e.dsinv_art.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "art__cod",
                    fields: {
                        art__cod: {validation: {required: true}, type: 'string'},
                        art__des: {validation: {required: true}, type: 'string'},
                        art__iva: {type: 'number'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }   
        }
    });
    
    $("#ipCantidad").kendoNumericTextBox({                
        format: "n0",            
        min: 1,
        value: 1,
        change: setValorTotal,        
        spin: setValorTotal
        
    });
    
    $("#idDescuento").kendoNumericTextBox({
        format: "p0",
        step: 0.01,
        min:0,
        value: 0,
        change: setValorTotal,        
        spin: setValorTotal
    });
    
    $("#idIVA").kendoNumericTextBox({
        format: "p0",
        step: 0.01,
        change: setValorTotal,        
        spin: setValorTotal
    });
    
    $("#idValorUnitario").kendoNumericTextBox({        
        format: "c2",
        change: setValorTotal,
        spin: setValorTotal
    });
    
    $("#idValorTotal").kendoNumericTextBox({
        format: "c2"                
    });
    
    $("#idCodigoAmortizacion").kendoDropDownList({
        dataTextField: 'pdif__des',
        dataValueField: 'pdif__cla',
        optionLabel: "Seleccionar codigo de amortización...",  
        template:'<div class="divElementDropDownList">#: data.pdif__des #</div>',
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: ipServicios+"rest/Parameters/SIRsic_pdif",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {                            
                        if (operation === 'read') {
                            authdssic_pdif["eesic_pdif"] = [options];
                            return JSON.stringify(authdssic_pdif);
                        }	
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_pdif.eeEstados[0].Estado==="OK"){                            
                        return e.dssic_pdif.eesic_pdif;
                    }else{
                        alertDialogs(e.dssic_pdif.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "pdif__cla",
                    fields: {
                        pdif__cla: {validation: {required: true}, type: 'number'},
                        pdif__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }			
    });
        
    $("#ipDiasAmortizacion").kendoNumericTextBox({        
        format: "n0",            
        min: 0
    });
    
    $("#ipFechaAmortizacion").kendoDatePicker({
        format: "{0:yyyy/MM/dd}",
        value: new Date(parent.hoy)
    });
    
    function onChangeConceptoDet(e){
        
        var codAmortizacion= e.sender.dataSource._data[e.sender.selectedIndex-1].pdif__cla;
        var dropdownlist = $("#idCodigoAmortizacion").data("kendoDropDownList");
        var numericTextBoxTasa= $("#ipDiasAmortizacion").data("kendoNumericTextBox");
        var datepickerFechaTasa= $("#ipFechaAmortizacion").data("kendoDatePicker");
        
        if(codAmortizacion===0){
            dropdownlist.enable(false);
            numericTextBoxTasa.enable(false);            
            datepickerFechaTasa.enable(false);
        }else{
            dropdownlist.enable(true);
            numericTextBoxTasa.enable(true);            
            datepickerFechaTasa.enable(true);
            dropdownlist.value(codAmortizacion);
            dropdownlist.readonly();   
        }        
    }
    
    function onChangeClase(e){
        $("#idArticulo").parent().removeClass(".k-input");    
        $("#idArticulo").data("kendoAutoComplete").value('');
    }
    
    function onChangeArticulo(e){
        var item= e.dataItem;
        objArticulo = item;
        setIVA(item);
        setValorArticulo(item);       
    }
    
    function setIVA(item){        
        var iva= item.art__iva;
        var numerictextbox = $("#idIVA").data("kendoNumericTextBox");    
        numerictextbox.value(iva/100);    
        numerictextbox.readonly();
        
    }
    
    function setValorArticulo(item){
        
        var valor = 0;    
        valor = item.art__val;        
        var numerictextbox = $("#idValorUnitario").data("kendoNumericTextBox");
        numerictextbox.value(valor);
        setValorTotal();
    }
    
    function setValorTotal(){
        var iva = $("#idIVA").val();
        if(iva>=1){
           iva=iva/100;
           var numerictextbox = $("#idIVA").data("kendoNumericTextBox");    
           numerictextbox.value(iva);          
        }
        var descuento = $("#idDescuento").val();
        if(descuento>=1){            
            descuento=descuento/100;
            var numerictextbox = $("#idDescuento").data("kendoNumericTextBox");    
            numerictextbox.value(descuento);            
        }
        var cantidad = $("#ipCantidad").val();
        var valor = $("#idValorUnitario").val();        
        valor = (valor * (parseFloat(1)-parseFloat(descuento)));
        var total = parseFloat(cantidad) * (parseFloat(valor) * (parseFloat(1)+parseFloat(iva))); //idValorTotal
        
        var numerictextbox = $("#idValorTotal").data("kendoNumericTextBox");
        numerictextbox.value(total);
    }
    
    if(parent.itemID !== null){        
        console.log("Cargando edicón item: "+parent.itemID.ID);
        $("#btAgregar")["0"].attributes[2].nodeValue = "agregarItem()";
        $("#btAgregar")["0"].textContent= "Actualizar";                
        $("#btCancelar")["0"].attributes[2].nodeValue = "btnCancelarEditar()";
        setInformacionItem();
    }
});



function agregarItem(){
    
    var dropdownlist = $("#ipConceptoDet").data("kendoDropDownList");
    var codConceptoDet = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].tcont__cod;
    var conceptoDet = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].tcont__des;
    
    var dropdownlist = $("#idClaseArticulo").data("kendoDropDownList");    
    var codClaseArticulo = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cla__cod;
    var claseArticulo = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cla__des;
    
    
    var codArticulo = objArticulo.art__cod;
    var nombreArticulo = objArticulo.art__des;
    var descripcion = $("#idDescripcion").val();
    var cantidad = $("#ipCantidad").val();
    var descuento = $("#idDescuento").val()*100;
    var iva = $("#idIVA").val()*100;
    var valorUnitario = $("#idValorUnitario").val();
    var valorTotal = $("#idValorTotal").val();
    var codAmortizacion = $("#idCodigoAmortizacion").val();
    var diasAmortizacion = $("#ipDiasAmortizacion").val();
    var fechaAmortizacion = $("#ipFechaAmortizacion").val();
    
    var itemGuardado;
    
    var verboHTML= "POST";
    
    if(parent.itemID !== null){
       verboHTML="PUT" ;
    }
    
    var authdsSIRgfc_fac = new Object();
    authdsSIRgfc_fac.dsSIRgfc_fac = new Object();
    authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos = new Array();
    authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0] = new Object();
    authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].fiid = sessionStorage.getItem("picfiid");
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms = new Array();
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0] = new Object();
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].tcon__cod = codConceptoDet;
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].clc__cod = parent.$("#ipCDocumento").val();
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].fac__nro = sessionStorage.getItem("facturaNumero");
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].fac__fec = parent.$("#ipFecha").val();
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].suc__cod = parent.$("#ipSucursal").val();
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].art__cod = codArticulo;
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].cla__cod = codClaseArticulo;
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].itms__can = cantidad;
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].des__itms = descripcion;
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].itms__pdt = descuento;
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].itms__val__u = valorUnitario;
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].lis__num = sessionStorage.getItem("listaPrecioCliente");    
    authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].itms__piv = iva;
    if(codAmortizacion!==""){
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].pdif__cla = codAmortizacion;
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].ddif__dias = diasAmortizacion;
        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].doc__fec__ini = fechaAmortizacion;
    }
    console.log(JSON.stringify(authdsSIRgfc_fac));
    
    $.ajax({
        type: verboHTML,
        data: JSON.stringify(authdsSIRgfc_fac),
        url: ipServicios+baseComercial+"SICUDgfc_itms",
        dataType : "json",
        contentType: "application/json;",
        success: function (resp) {            
            itemGuardado = resp.dsSIRgfc_fac.eeEstados[0].Estado;                        
        },
        error: function (e) {
            console.log(JSON.stringify(e));
            alertDialogs("Error consumiendo el servicio de guardar\n"+ e.status +" - "+ e.statusText);
        }
    }).done(function(){
        if(itemGuardado=="OK"){
            parent.cargarDatosGrilla();
            parent.closePopUp();
        }else{                    
            alertDialogs("factura con errores  \n"+itemGuardado);
            console.log("Datos  \n" + itemGuardado);                
        }
    });
    
}

function setInformacionItem(){
    
    var kendoDropDownListConcepto = $("#ipConceptoDet").data("kendoDropDownList");    
    kendoDropDownListConcepto.value(parent.itemID.CodConceptoDet);
        
    var kendoDropDownListClaseArticulo = $("#idClaseArticulo").data("kendoDropDownList");    
    kendoDropDownListClaseArticulo.value(parent.itemID.CodClaseArticulo);
    
    $("#idArticulo").parent().removeClass(".k-input");
    $("#idArticulo").val(parent.itemID.Articulo);
    
    $("#idDescripcion").val(parent.itemID.Descripcion);

    var numerictextboxCantidad = $("#ipCantidad").data("kendoNumericTextBox");    
    numerictextboxCantidad.value(parent.itemID.Cantidad);
    
    var numerictextboxDescuento = $("#idDescuento").data("kendoNumericTextBox");    
    numerictextboxDescuento.value(parent.itemID.Descuento);
    
    var numerictextboxIVA = $("#idIVA").data("kendoNumericTextBox");    
    numerictextboxIVA.value(parent.itemID.IVA);
    
    var numerictextboxValorUnitario = $("#idValorUnitario").data("kendoNumericTextBox");    
    numerictextboxValorUnitario.value(parent.itemID.ValorUnitario);
    
    var numerictextboxValorTotal = $("#idValorTotal").data("kendoNumericTextBox");    
    numerictextboxValorTotal.value(parent.itemID.ValorTotal);
    
    var kendoDropDownListClaseArticulo = $("#idCodigoAmortizacion").data("kendoDropDownList");    
    kendoDropDownListClaseArticulo.value(parent.itemID.CodAmortizacion);
    
    var numerictextboxValorTotal = $("#ipDiasAmortizacion").data("kendoNumericTextBox");    
    numerictextboxValorTotal.value(parent.itemID.DiasAmortizacion);
    
    $("#ipFechaVencimiento").kendoDatePicker({        
	format: "yyyy/MM/dd",
	disableDates: ["sa", "su"],
	value: new Date(parent.itemID.FechaAmortizacion)        
    }); 
    
    idItem = parent.itemID.ID;
    objArticulo.art__cod = parent.itemID.ArticuloId;
    objArticulo.art__des = parent.itemID.Articulo;    
    //parent.itemID=null;
}

function btnCancelar(){
    parent.closePopUp();
}

function btnCancelarEditar(){
    parent.closePopUpEditar();
}

function onDataBoundArticulo(){    
    $("#idArticulo").data("kendoAutoComplete");
}