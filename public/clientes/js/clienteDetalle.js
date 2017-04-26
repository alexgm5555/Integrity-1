

$(document).ready(function () {
    
    var datos_cliente = JSON.parse(sessionStorage.getItem("Detalle_Cliente"));
    
    document.getElementById('Nit_cliente').innerHTML = datos_cliente.ter__nit;
    document.getElementById('Nombre_cliente').innerHTML = datos_cliente.ter__raz;
    document.getElementById('Clase_Cliente').innerHTML = datos_cliente.cla__nom;
    document.getElementById('Email').innerHTML = datos_cliente.ter__email;
    document.getElementById('Identificacion_Calificacion').innerHTML = datos_cliente.cal__ide;
    document.getElementById('Cupo_Credito').innerHTML = datos_cliente.cli__cre;
    document.getElementById('Cupo_De_Ventas').innerHTML = datos_cliente.cli__ven;
    document.getElementById('Persona_Contacto_Tesoreria').innerHTML = datos_cliente.con__tes;
    document.getElementById('Persona_Contacto_Ventas').innerHTML = datos_cliente.con__ven;    
    
    if(datos_cliente.cer__ana==true){var ana = "Si"}else{var ana = "No"}
    document.getElementById('Certificado_Analisis').innerHTML = ana;
    if(datos_cliente.dpc__par==true){var despachos = "Si"}else{var despachos = "No"}
    document.getElementById('Despachos_Parciales').innerHTML = despachos;
    if(datos_cliente.cli__tra==true){var transporte = "Si"}else{var transporte = "No"}
    document.getElementById('Despachos_Parciales').innerHTML = despachos;
    if(datos_cliente.cli__tra==true){var transporte = "Si"}else{var transporte = "No"}
    if(datos_cliente.gfc__nal==true){var ClienteNacional = "Si"}else{var ClienteNacional = "No"}
    document.getElementById('Cliente_Nacional').innerHTML = ClienteNacional;
    
    document.getElementById('Transporte').innerHTML =transporte;
    document.getElementById('Numero_de_Copias_Factura').innerHTML = datos_cliente.num__cop__fac;
    document.getElementById('Forma_de_Pago').innerHTML = datos_cliente.pago__cod;
    document.getElementById('Numero_de_Lista').innerHTML = datos_cliente.lis__num;
    document.getElementById('Dia_de_Pago').innerHTML = datos_cliente.dia__pag;
    document.getElementById('Hora_de_Pago').innerHTML = datos_cliente.hor__pag;
    document.getElementById('Bodega_en_Consignacion').innerHTML = datos_cliente.loc__des;
    if(datos_cliente.ter__cret==true){var Establecimiento = "Si"}else{var Establecimiento = "No"}
    document.getElementById('Precio_por_Establecimiento').innerHTML = Establecimiento;
    document.getElementById('Tope_Maximo_Galones').innerHTML = datos_cliente.cli__gal;
    
    //document.getElementById('Nit_cliente').innerHTML = datos_cliente.ter__nit;
    
    if (datos_cliente.cli__est==1){
        $("#btnAgregarItem")[0].hidden="true";        
        $("#btnGuardar1")[0].hidden="true";
    }
    
    gridEstablecimientos();
    
});

function gridEstablecimientos(){
    var datos_vendedor = JSON.parse(sessionStorage.getItem("Detalle_Cliente"));
    var  consultar = new SirSucursales();
    var  datajson = consultar.getjson();
    var  urlService = consultar.getUrlSir();
    datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].picter__nit = datos_vendedor.ter__nit;                
    var  actualizar = new CudSucursales();
    var  actjson = actualizar.getjson();
    var  urlactualizar = actualizar.getUrlSir();
    
    var mapCud = "eegpd_cli_suc";
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            
            create: { 
                url: urlactualizar,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            destroy: {
                url: urlactualizar,
                dataType: "json",
                type: "DELETE",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (options, operation) {
                if (operation === "read") {
                    return JSON.stringify(datajson);
                }
                if (operation === "create") {
                    var datos_vendedor = JSON.parse(sessionStorage.getItem("Detalle_Cliente"));
                    var vendedor = $("#cedula")[0].value;           
                    var territorio = $("#territorios").data("kendoDropDownList")._old;                   
                    var region = $("#region").data("kendoDropDownList");
                    var select = region.selectedIndex;
                    region = region.dataSource._data[select].rgeo__cod;
                    var ciudades = $("#ciudades").data("kendoComboBox")._old;
                    var barrios = $("#barrios").data("kendoComboBox")._old;
                    var lista_precio = $("#lista_precio").data("kendoDropDownList")._old;
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].ter__nit=datos_vendedor.ter__nit;
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].com__con=options.com__con;
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].com__nom=options.com__nom;
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].ter__dir=options.ter__dir;
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].ter__tel=options.ter__tel;
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].ter__fax=options.ter__tel;
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].email__ter=datos_vendedor.ter__email;                   
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].vdd__cod=parseInt(vendedor);//
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].trr__cod=territorio;//
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].rgeo__cod=region;//
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].ciu__cod=ciudades;//
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].bar__cod=parseInt(barrios);//
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].ter__lis=parseInt(lista_precio);//                   
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].cupo__cre=(datos_vendedor.cli__cre).toString();
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].cupo__ven=(datos_vendedor.cli__ven).toString();
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].con__stes=datos_vendedor.con__tes;
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].con__sven=datos_vendedor.con__ven;
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].loc__cod=parseInt(datos_vendedor.loc__cod);
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].cli__con__sloc=options.cli__con__sloc;
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].cli__crg__con__sloc=options.cli__crg__con__sloc;                    
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].est__des=options.est__des;
                    actjson.dsSICUDgpd_cli_suc.eegpd_cli_suc[0].cli__suc__pie__fac=(parseInt(options.cli__suc__pie__fac))/100;
                    
                    
                    return JSON.stringify(actjson);          
                    
                    
                }
                if (operation === "destroy") { 
                    
                    var key1 = Object.keys(actjson)[0];
                    actjson[key1][mapCud] = [options];
                    return JSON.stringify(actjson);
                    //return JSON.stringify(actjson);               
                }
                
            }
            
        },
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if(e[key1].eeEstados){
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        
                        return e[key1][mapCud];
                    }else
                    {
                        alertDialogs("Error"+e[key1].eeEstados[0].Estado);   
                    }
                }},
            model: {
                id: "com__con",
                fields: {
                    ter__nit:    {editable: true, nullable: false},
                    com__con:    {editable: true, nullable: false},
                    com__nom:    {editable: true, nullable: false},  
                    ter__dir:    {editable: true, nullable: false},
                    ter__tel:    {editable: true, nullable: false},
                    ter__fax:    {editable: true, nullable: false},
                    ter__email:    {editable: true, nullable: false},
                    vdd__cod:    {editable: true, nullable: false},
                    trr__cod:    {editable: true, nullable: false},
                    rgeo__cod:    {editable: true, nullable: false},
                    ciu__cod:    {editable: true, nullable: false},
                    bar__cod:    {editable: true, nullable: false},
                    ter__lis:    {editable: true, nullable: false},
                    cupo__cre:    {editable: true, nullable: false},
                    cupo__ven:    {editable: true, nullable: false},
                    con__stes:    {editable: true, nullable: false},
                    con__sven:    {editable: true, nullable: false},
                    loc__cod:    {editable: true, nullable: false},
                    cli__con__sloc:    {editable: true, nullable: false},
                    cli__crg__con__sloc:    {editable: true, nullable: false},
                    cli__suc__pie__fac:    {editable: true, nullable: false},
                    ven__cod:    {editable: true, nullable: false},
                    ter__raz:    {editable: true, nullable: false},
                    trr__nom:    {editable: true, nullable: false},
                    ciu__nom:    {editable: true, nullable: false},
                    cli__com__est:    {editable: true, nullable: false}
                    
                    
                }
            }
            ,
            error: function (e) {
                alertDialogs(e.errorThrown);
            }
        }
    });
    var grid1 = $("#gridEstablecimientos").kendoGrid({
        dataSource: dataSource,
        
        columns: [
            {field: "com__con", title: "Establecimiento",  hidden:false},
            {field: "com__nom", title: "Nombre Establecimiento",  hidden:false},
            {field: "ter__dir", title: "Direccion",  hidden:false},
            
            {field: "ter__tel", title: "Telefono",  hidden:false},
            
            {field: "ter__fax", title: "Fax",  hidden:true},
            {field: "vdd__cod", title: "Cod Vendedor",  hidden:true, editor: cedula,
                template: function (e) {
                    return e.vdd__cod;
                }}, 
            {field: "vdd__cod1", title: "Nombre Vendedor",  hidden:true, editor: nombre,
                template: function (e) {
                    return e.vdd__cod;
                }},          
            {field: "rgeo__cod", title: "Region",  hidden:true,editor:regionCod,
                template: function (e) {
                    return e.rgeo__cod;
                }},    
            {field: "trr__cod", title: "Territorio",  hidden:true,editor:territorio,
                template: function (e) {
                    return e.trr__cod;
                }}, 
            {field: "ciu__cod", title: "Ciudad",  hidden:true,editor:ciudades,
                template: function (e) {
                    return e.ciu__cod;
                }}, 
            {field: "bar__cod", title: "Barrio",  hidden:true,editor:barrios,
                template: function (e) {
                    return e.bar__cod;
                }}, 
            {field: "ter__lis", title: "Lista de precios",  hidden:true,editor:listaPrecio,
                template: function (e) {
                    return e.ter__lis;
                }}, 
            {field: "cli__con__sloc", title: "Responsable Bodega",  hidden:true},
            {field: "cli__crg__con__sloc", title: "Cargo de responsable de bodega",  hidden:true},
            {field: "est__des", title: "Codigo Obsevaciones",  hidden:true},
            {field: "cli__suc__pie__fac", title: "Descuento Comercial",  hidden:true},
            {command: [
                    {name: "deletae", text: "destoy", template: "<a id='borrar' class='k-grid-deletae'><span id='borrar' class='k-sprite po_cerrar'></span></a>", click: clickEliminar } ], width: "70px"}],
        
        editable: "popup", 
        edit: function(e) {
            if (!e.model.isNew()) {//caso en el que el popup es editar
                
                //editarCampos();
                
            }
            else{//caso en el que el popup es crear 
                e.container.find("input[name=cli__suc__pie__fac]").removeClass();
                e.container.find("input[name=cli__suc__pie__fac]").kendoNumericTextBox({format: "# \\%"});
                
                
            }
        } ,
        dataBound: function (e) {
            var datos_vendedor = JSON.parse(sessionStorage.getItem("Detalle_Cliente"));
            if (datos_vendedor.cli__est===1){
                var tamaño=document.getElementsByClassName("k-sprite po_cerrar").length;
                for (var i = 0; i < tamaño; i++) {
                    document.getElementsByClassName("k-sprite po_cerrar")[i].hidden="true";
                }
            }
            else
            {}
        },                    
    });
    
}
function editarCampos(campo,tipodecampo){
    
}
function listaPrecio(container, options){
    //-------------LISTA DE PRECIO
    var consultar = new sirLista();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eegpr_lis";
    $('<input  id = "lista_precio" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "lis__des",
        dataValueField: "lis__num",
        template:'<div class="divElementDropDownList">#: data.lis__des # Cod:#: data.lis__num # </div>', 
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
                        alertDialogs("Error Con Servicio Listas de precio"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "lis__num",
                    fields: {
                        lis__num: {editable: false, nullable: false},
                        lis__des: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}
function barrios(container, options) {
    
    var consultar = new sirBarrios();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eegpd_bar";
    $('<input  id = "barrios" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                dataTextField: "bar__dsc",
        dataValueField: "bar__cod",
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
                        alertDialogs("Error Con Servicio Cuidades"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "bar__cod",
                    fields: {
                        bar__cod: {editable: false, nullable: false},
                        bar__dsc: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}
function ciudades(container, options) {
    
    var consultar = new sirCiudades();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eesic_ciu";
    $('<input  id = "ciudades" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
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
                        alertDialogs("Error Con Servicio Cuidades"+e[key1].eeEstados[0].Estado);
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
function regionCod(container, options) {
    
    var consultar = new sirRegionGeografica();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eegpr_rgeo";
    $('<input  id = "region" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "rgeo__nom",
        dataValueField: "rgeo__nom",
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
                        alertDialogs("Error Con Servicio Regiones"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "rgeo__nom",
                    fields: {
                        rgeo__cod: {editable: false, nullable: false},
                        rgeo__nom: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}
function nombre(container, options) {
    var consultar = new sirVendedores();
    var datajson = consultar.getjson();
    datajson.dsSIRgpd_vdd.eeSIRgpd_vdd[0].piivdd__est=0;
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eegpd_vdd";
    $('<input  id = "nombre" />')
            .appendTo(container)
            .kendoAutoComplete({
                dataTextField: "ter__raz",
        dataValueField: "ter__nit",
        autoClose: true,
        minLength: 4,
        placeholder: "Nombre..",
        filter: "contains",
        select: function(e) {                
            $("#cedula").val(e.dataItem.vdd__cod);    
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
                        alertDialogs("Error Con Servicio Clientes"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ter__nit",
                    fields: {
                        ter__raz: {editable: false, nullable: false},
                        vdd__cod: {editable: false, nullable: false},
                        ter__nit: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}
function cedula(container, options) {
    var consultar = new sirVendedores();
    
    var datajson = consultar.getjson();
    datajson.dsSIRgpd_vdd.eeSIRgpd_vdd[0].piivdd__est=0;
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eegpd_vdd";
    $('<input  id = "cedula" />')
            .appendTo(container)
            .kendoAutoComplete({
                dataTextField: "ter__nit",
        dataValueField: "vdd__cod",
        autoClose: true,
        minLength: 4,
        placeholder: "Cod..",
        filter: "contains",
        select: function(e) {                
            $("#nombre").val(e.dataItem.ter__raz);    
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
                        alertDialogs("Error Con Servicio Vendedores"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ter__nit",
                    fields: {
                        ter__raz: {editable: false, nullable: false},
                        vdd__cod: {editable: false, nullable: false},
                        ter__nit: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}

function volverPedidos(){
    window.location = ("clientes.html");
}


function agregarItemDetalle(){
    var grid1 = $("#gridEstablecimientos").data("kendoGrid");
    grid1.addRow();
}
function territorio(container, options) {
    var consultar = new sirTerritorio();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eegpd_trr";
    $('<input  id = "territorios" />')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "trr__nom",
        dataValueField: "trr__cod",
        autoClose: true,
        placeholder: "Territorios..",
        template:'<div class="divElementDropDownList">#: data.trr__nom #</div>',  
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
                    id: "trr__cod",
                    fields: {
                        trr__cod: {editable: false, nullable: false},
                        trr__nom: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
}        


function clickEliminar(e) {
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#gridEstablecimientos").data("kendoGrid").dataItem($(e.target).closest("tr"));
        
        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            
            
            var dataSource = $("#gridEstablecimientos").data("kendoGrid").dataSource;
            dataSource.remove(dataItem);
            dataSource.sync();
            bandAlert = 0; 
            
            
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de eliminar el Establecimiento ---" + dataItem.com__con + " ---?", "400px", "200px", true, true, actions);
        
    } catch (e) {
        alert(e);
        $('#grid').data('kendoGrid').dataSource.read();
        $('#grid').data('kendoGrid').refresh();
    }
    
}
function cerrar(){
    //onClosex();
    $("#windowform").data("kendoWindow").close();
    
}  
function cerrar1(){
    //onClosex();
    $("#windowform").data("kendoWindow").close();
    window.location.reload();  
}  

function popupNuevoCliente(){
    
    $("body").append("<div id='windowClienteCabecera'></div>");
    var myWindow = $("#windowClienteCabecera");
    var undo = $("#undo");
    
    function onCloseWindowCabCliente() {
        document.getElementById("windowClienteCabecera").remove();
        undo.fadeIn();
    }
    
    myWindow.kendoWindow({
        width: "80%",
        height: 500,
        title: "Editar",
        content: sessionStorage.getItem("url") + "clientes/html/popupCabeceracliente.html",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: onCloseWindowCabCliente
    }).data("kendoWindow").center().open();
}