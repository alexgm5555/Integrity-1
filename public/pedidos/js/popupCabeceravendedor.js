   $(document).ready(function () {
       
    $("#btAgregar").kendoButton({
        click: guardar
    });
    $("#btCancelar").kendoButton({
        click: cancelar
    });
       function cargarDatos(){
        var datos_vendedor = JSON.parse(sessionStorage.getItem("Detalle_Vendedor"));         
        document.getElementById('codigo_vendedor').innerHTML = datos_vendedor.vdd__cod;
           
           $("#nit").val(datos_vendedor.ter__nit); 
           $("#nombre").val(datos_vendedor.ter__raz); 
           //$("#claseCliente").index(parseInt(datos_vendedor.cla__cli)); 
           
       }
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
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__cod=parseInt(document.getElementById('codigo_vendedor').innerHTML);
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__nit=cedula;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__raz=nombre; 
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__cli=cliente;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__nom=cliente_nom;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__est=99; 
           
           
                   $.ajax({
        
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_vdd.eeEstados[0].Estado)=="OK")
                        {    
                          parent.cerrar();
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_vdd.eeEstados[0].Estado);  
                             
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
                }
            }

        });

    }                       
function claseCliente(container, options) {
        
        var consultar = new sirClaseCliente();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpr_cla";
        var datos_vendedor = JSON.parse(sessionStorage.getItem("Detalle_Vendedor"));   
        $("#claseCliente")
                .kendoDropDownList({
            dataTextField: "cla__nom",
            dataValueField: "cla__cli",
            index:parseInt(datos_vendedor.cla__cli),
            open: function(){
            $("#claseCliente").data("kendoDropDownList").focus();;
            },
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
    cargarDatos();
});