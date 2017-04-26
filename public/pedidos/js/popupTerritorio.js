   $(document).ready(function () {
       
    $("#btAgregar").kendoButton({
        click: guardar
    });
    $("#btCancelar").kendoButton({
        click: cancelar
    });
       
       function guardar(){
           var  actualizar = new CudVendedores();
           var  actjson = actualizar.getjson();
           var  urlactualizar = actualizar.getUrlSir();    
           var cedula = $("#nit")[0].value;
           var nombre = $("#nombre")[0].value;
           var cliente = $("#claseCliente").data("kendoDropDownList");
           var select = cliente.selectedIndex;
           cliente = cliente.dataSource._data[select].cla__cli;
           var cliente_nom = $("#claseCliente").data("kendoDropDownList").dataSource._data[select].cla__nom;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__nit=cedula;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__raz=nombre;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].trr__cod=0;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__cli=cliente;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__nom=cliente_nom;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__est=99; 
           
           
                           $.ajax({
        
                    type: "POST",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_vdd.eeEstados[0].Estado)=="OK")
                        {    
                           sessionStorage.setItem("Detalle_Vendedor",JSON.stringify(resp.dsSICUDgpd_vdd.eegpd_vdd[0]));
                           
                            
                            parent.cerrar1();
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_vdd.eeEstados[0].Estado);  
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); 
                        }
                    } 
        
                });
           
           
           
       }
       function cancelar(){
           
           parent.cerrar();
       }
       

       
      function nombre(container, options) {
        var consultar = new SirSicVen();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eesic_ven";
         $("#nombre")
                .kendoAutoComplete({
            dataTextField: "ter__raz",
            dataValueField: "ter__raz",
            autoClose: true,
            minLength: 4,
            placeholder: "Nombre..",
             filter: "contains",
            select: function(e) {                
            $("#nit").val(e.dataItem.ter__nit);    
            },
            template:'<div class="divElementDropDownList">#: data.ter__raz #</div>',  
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
                            alertDialogs("Error Con Servicio sucursales"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "ter__nit",
                        fields: {
                            ter__raz: {editable: false, nullable: false},
                            ter__nit: {editable: false, nullable: false}
                        }
                    }
                }
            }

        });
      }
    function filtroestado(container, options) {
    var consultar = new SirSicVen();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eesic_ven";
        $("#nit")
                .kendoAutoComplete({
            dataTextField: "ter__nit",
            dataValueField: "ter__nit",           
            minLength: 6,
            placeholder: "Nit..",
            filter: "contains",
            select: function(e) {                
            $("#nombre").val(e.dataItem.ter__nit);    
            },
            template:'<div class="divElementDropDownList">#: data.ter__nit #</div>',  
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
                            alertDialogs("Error Con Servicio sucursales"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "ter__nit",
                        fields: {
                            ter__raz: {editable: false, nullable: false},
                            ter__nit: {editable: false, nullable: false}
                        }
                    }
                },error: function (e) {
            alertDialogs(e.errorThrown);
        }
            }

        });

    }                       
function claseCliente(container, options) {
        
        var consultar = new sirClaseCliente();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpr_cla";
        $("#claseCliente")
                .kendoComboBox({
            dataTextField: "cla__nom",
            dataValueField: "cla__nom",
            //template:'<div class="divElementDropDownList">#: data.cla__nom #</div>',  
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
                            alertDialogs("Error Con Servicio Clase Cliente"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "cla__nom",
                        fields: {
                            cla__cli: {editable: false, nullable: false},
                            cla__nom: {editable: false, nullable: false}
                        }
                    }
                }
            }

        });
    }        
    
    nombre();
    claseCliente();
    filtroestado();
    
});