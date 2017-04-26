



/**
 * FUNCION crear usuario nuevo
 * grid1 variable almacena data de grid
 *  
 *   
 *  
 *  
 */
function creausuario() {
    var grid1 = $("#grid").data("kendoGrid");
    grid1.addRow();
}

/**
 * FUNCION CRUD
 *  VAR mapCud =  variable gestion de funcion squema 
 *  VAR key1 = variable gestion de estado de respuesta de servicio 
 *  var cclave1 y  var cclave1 almacenan valor de campos contraseña y validacion de contgraseña
 *  var  consultar obtiene funcion Sir para consultar
 *  var datajson contiene el json para enviar al servicio de consulta
 *  var urlService contiene url del servicio read 
 *  var  actualizar obtiene funcion create / update
 *  var  actjson : json para enviar al servicio de actualizar / crear
 *  var urlactualizar: url de servicio para actualizar / crear 
 *  var mapCud1: direccion de json para el esquema
 */
$(document).ready(function () {
    var consultar = new sirconsulta();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();

    var actualizar = new cudcreate();
    var actjson = actualizar.getjson();
    var urlactualizar = actualizar.getUrlCud();
    var mapCud = "ee_user2";
    var mapCud1 = "ee_user3";
    try {
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            update: {
                url: urlactualizar,
                dataType: "json",
                type: "PUT",
                contentType: "application/json; charset=utf-8"
            },
            create: {
                url: urlactualizar,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (options, operation) {
                if (operation === "read") {
                    return JSON.stringify(datajson);
                }
                if ((operation === "update") ){
                    var dropdownlist = $("#rol").data("kendoDropDownList");

                    var select = dropdownlist.selectedIndex;
                    options.models[0].car__cod = dropdownlist.dataSource._data[select].car__cod;
                    options.models[0].car__nom = dropdownlist.text();

                    var cclave1 = document.getElementById("clave1").value;
                    var cclave2 = document.getElementById("clave2").value;
                    if (cclave1 == "**********") {//EVULUAR CONTRASEÑA                       
                        actjson.dsee_user2.ee_user2[0] = options.models[0];
                        return JSON.stringify(actjson);
                        $('#grid').data('kendoGrid').refresh();
                        $('#grid').data('kendoGrid').dataSource.read(); 
                        $('#grid').data('kendoGrid').refresh();
                    } else
                    {
                        if (cclave1 === cclave2) {
                            actjson.dsee_user2.ee_user2[0] = options.models[0];
                            return JSON.stringify(actjson);
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();
                        } else
                        {
                            alertDialogs("Las contraseñas no coinciden");
                            

                        }
                    }

                    }
                    if ((operation === "create") ){
                    var dropdownlist = $("#rol").data("kendoDropDownList");
                    var nit = sessionStorage.getItem("companyNIT");
                    var select = dropdownlist.selectedIndex;
                    
                    options.models[0].car__cod = dropdownlist.dataSource._data[select].car__cod;
                    options.models[0].car__nom = dropdownlist.text();
                    
                    var cclave1 = document.getElementById("clave1").value;
                    var cclave2 = document.getElementById("clave2").value;
                    if (cclave1 == "**********") {//EVULUAR CONTRASEÑA                       
                        actjson.dsee_user2.ee_user2[0] = options.models[0];
                        actjson.dsee_user2.ee_user2[0].cia__nit=nit;                       
                        return JSON.stringify(actjson);
                        $('#grid').data('kendoGrid').refresh();
                        $('#grid').data('kendoGrid').dataSource.read(); 
                        $('#grid').data('kendoGrid').refresh();
                    } else
                    {
                        if (cclave1 === cclave2) {
                            actjson.dsee_user2.ee_user2[0] = options.models[0];
                            actjson.dsee_user2.ee_user2[0].cia__nit=nit;
                            actjson.dsee_user2.ee_user2[0].epassword=cclave1;
                            actjson.dsee_user2.ee_user2[0].epassword1=cclave2   ;
                            
                            return JSON.stringify(actjson);
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();
                        } else
                        {
                            alertDialogs("Las contraseñas no coinciden");
                            

                        }
                    }

                }
            }
        },
        batch: true,
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapCud];
            $('#grid').data('kendoGrid').refresh();
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
                } else {
                    alertDialogs("Error"+e[key1].eeEstados[0].Estado);                              
                }
            },
            model: {
                id: "usr__est",
                fields: {
                    euserid: {editable: true, nullable: false, validation: {required: true}},
                    euser__Name: {editable: true, nullable: true, validation: {required: true}},
                    epassword: {editable: true, nullable: false},
                    usr__mail: {editable: true, nullable: false},
                    usr__carp: {editable: true, nullable: false},
                    usr__est: {editable: true, nullable: false},
                    car__cod: {editable: false, nullable: false},
                    car__nom: {editable: true, nullable: false},
                    actor__cod: {editable: true, nullable: false},
                    usr__jef: {editable: true, nullable: false, type: "boolean"},
                    usr__codjef: {editable: true, nullable: false}
                }
            },
             error: function (e) {
            alertDialogs(e.errorThrown);
        }
        }
    })
;
    /**
     *  FUNCION CREAR GRILLA
     * Funcion cancel se ejecuta con el evento OnClick de EDIT grid
     *  cancel: function(e) {                                              
     e._defaultPrevented= true;
     $('#grid').data('kendoGrid').refresh();                                             
     $('#grid').data('kendoGrid').dataSource.read();
     $('#grid').data('kendoGrid').refresh(); `}                                                                                       
     
     *  
     *  
     */
    $(window).trigger("resize");
    var grid1 = $("#grid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        columns: [           
            {field: "euserid", title: "Usuario", hidden: false},
            {field: "euser__Name", title: "Nombre", hidden: false},
            {field: "usr__mail", title: "Correo", hidden: true},
            {field: "usr__carp", title: "Cedula", hidden: true},
            {field: "car__nom", title: "Rol", hidden: false, editor: filtroRol,
                template: function (e) {
                    return e.car__nom;
                }},
            {field: "actor__cod", title: "Elija un actor", hidden: true, editor: filtroActor,
                template: function (e) {
                    return e.actor__cod;
                }},
            {field: "usr__codjef", title: "Elija un Jefe", hidden: true, editor: filtroJefe,
                template: function (e) {
                    return e.usr__codjef;
                }},
            {field: "usr__jef", title: "Jefe de Area ", hidden: true},
            {field: "usr__est", title: "Estado", hidden: true, editor: filtroestado,
                template: function (e) {
                    return e.usr__est;
                }},
            {field: "epassword", title: "Clave", width: "50px", hidden: true, editor: passEditorPopup},
            {field: "epassword1", title: "Repita clave", width: "50px", hidden: true, editor: onkeypass},
            {command: [{name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"}], width: "60px"}],
        editable: "popup",
        edit: function(e) {debugger
            if (!e.model.isNew()) {//caso en el que el popup es editar
//                var buscarlabel = $("label").find("for");
//                Buscarlabel = buscarlabel.prevObject[0];
//                Buscarlabel.style.display = "none";
                e.container.find("input[name='euserid']")[0].disabled=true;
            }
            else{//caso en el que el popup es crear 
              
            }
        } ,
        cancel: function (e) {
            e._defaultPrevented = true;
            $('#grid').data('kendoGrid').refresh();
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        }
    });
    }catch(e){
         $('#grid').data('kendoGrid').dataSource.read();
         $('#grid').data('kendoGrid').refresh();
       
        alertDialogs("Error en la consulta de"+e);
       
                           
    }
    /**
     * FUNCION AUTOCOMPLETADO NOMBRE TOOLBAR
     * VAR VALUE = VALOR DE SELECCION DE FILTRO
     *  #filtro = ID del autocomplete
     *  consulta sobre campo : usr__est
     *  
     *  
     */
    $("#filtro").kendoAutoComplete({
        dataTextField: "euser__Name",
        dataValueField: "euserid",
        dataSource: dataSource,
        filter: "contains",
        placeholder: "Nombre...",
    });
    /**
     *FUNCION FILTRO ROL TOOLBAR
     * VAR VALUE = VALOR DE SELECCION DE FILTRO
     *  #filtro1 = ID del combobox
     *  consulta sobre campo : usr__est
     *  
     *  
     */
    var consultar1 = new serviRoles();
    var datajson1 = consultar1.getjson();
    var urlService1 = consultar1.getUrlSir();

    var datasource1 = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlService1,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (options, operation) {
                if (operation === "read") {
                    return JSON.stringify(datajson1);
                }


            }
        },
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapCud1];
                } else {
                }
            },
            model: {
                id: "car__cod",
                field: {
                    car__nom: {editable: false, nullable: false}

                }
            }
        }

    });
    $("#filtro1").kendoComboBox({
        dataTextField: "car__nom",
        dataValueField: "car__cod",
        placeholder: "Rol...",
        dataSource: datasource1,
        change: function () {
            var value = this.value();
            if (value) {
                grid1.data("kendoGrid").dataSource.filter({field: "car__cod", operator: "eq", value: value});
            } else {
                grid1.data("kendoGrid").dataSource.filter({});
            }
        },
    });


    /**
     *FUNCION FILTRO ESTADO TOOLBAR
     * VAR VALUE = VALOR DE SELECCION DE FILTRO
     *  #filtro2 = ID del combobox
     *  consulta sobre campo : usr__est
     *  
     *  
     */
    var estados = [
        {text: "Activo", valor: "1"},
        {text: "Inactivo", valor: "0"},
        {text: "Ingreso 1 vez", valor: "2"},
        {text: "Retirado", valor: "3"},
        {text: "Inactivo Manualmente", valor: "4"},
        {text: "Deshabilitado", valor: "5"},
        {text: "Inactivado Cambio De Clave", valor: "6"},
    ];

    $("#filtro2").kendoComboBox({
        dataTextField: "text",
        dataValueField: "valor",
        autoBind: false,
        placeholder: "Estado..",
        dataSource: estados,
        change: function () {
            var value1 = this.value();
            var value1 = parseInt(value1);
            if (value1 >= 0) {
                grid1.data("kendoGrid").dataSource.filter({field: "usr__est", value: value1});
            } else {
                grid1.data("kendoGrid").dataSource.filter({});
            }
        }
    });


    /**
     * FUNCION FILTRO ROL EDIT POPUP SE EJECUTA CON EL EVENTO DE COMBOBOX
     *  cONSULTA CAMPO  car__nom
     *  var  consultar obtiene funcion Sir para consultar
     *  var datajson contiene el json para enviar al servicio de consulta
     *  var urlService contiene url del servicio read 
     *  
     */

    function filtroRol(container, options) {
        var consultar = new serviRoles();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "ee_user3";
        $('<input  id = "rol" required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataTextField: "car__nom",
            dataValueField: "car__nom",
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
                        }
                    },
                    model: {
                        id: "car__cod",
                        fields: {
                            car__nom: {editable: false, nullable: false},
                        }
                    }
                }
            }

        });

    }
    /**
     * FUNCION FILTRO ACTOR EDIT POPUP SE EJECUTA CON EL EVENTO DE COMBOBOX
     *  cONSULTA CAMPO  actor__cod
     *  var  consultar obtiene funcion Sir para consultar
     *  var datajson contiene el json para enviar al servicio de consulta
     *  var urlService contiene url del servicio read 
     *  
     */

    function filtroActor(container, options) {
        var consultar = new siractores();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eesic_actor";
        $('<input  id = "rol" required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataTextField: "actor__cod",
            dataValueField: "actor__cod",
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
                        }
                    },
                    model: {
                        id: "actor__cod",
                        fields: {
                            actor__cod: {editable: false, nullable: false},
                        }
                    }
                }
            }

        });

    }


    /**
     *  Funcion filtroJefe PARA EDIT POPUP SE EJECUTA CON EL EVENTO DE COMBOBOX
     *  cONSULTA CAMPO  usr__codjef
     *  var  consultar obtiene funcion Sir para consultar
     *  var datajson contiene el json para enviar al servicio de consulta
     *  var urlService contiene url del servicio read  
     *  var arrayoriginal y array sin duplicados filtran datos de dropdown
     */


    function filtroJefe(container, options) {
//        var consultar = new sirconsulta();
//        var datajson = consultar.getjson();
//        var urlService = consultar.getUrlSir();
//
//
//        var data1 = grid1.data("kendoGrid").dataSource._pristineData;
//
//
//        var arrayOriginal = [];
//        var arraySinDuplicados = [];
//        var i = 0;
//        for (i  in data1) {
//            if(data1[i] !== undefined){
//                arrayOriginal[i] = data1[i].usr__codjef;
//            }
//            
//        }
//
//        var arraySinDuplicados = arrayOriginal.filter(function (elem, pos) {
//            return arrayOriginal.indexOf(elem) == pos;
//        });
//
//        $('<input/>')
//                .appendTo(container)
//                .kendoDropDownList({
//                    dataSource: arraySinDuplicados
//
//        });


        var consultar = new sirJefes();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eeusers";
        $('<input  id = "jefe"  name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataTextField: "username",
            dataValueField: "usrcod",
            template:'<div class="divElementDropDownList">#: data.usrcodsin #'+' - '+' #:data.username #</div>',
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
                            
                        }
                    },
                    model: {
                        id: "usrcod",
                        fields: {
                            usrcod: {editable: false, nullable: false},
                            username: {editable: false, nullable: false}
                        }
                    }
                }
            }

        });





    }



});
/**
 *  Funcion Filtro Estado PARA EDIT POPUP SE EJECUTA CON EL EVENTO DE COMBOBOX
 *  cONSULTA CAMPO  usr__est
 *  var  consultar obtiene funcion Sir para consultar
 *  var datajson contiene el json para enviar al servicio de consulta
 *  var urlService contiene url del servicio read 
 *  
 */
function filtroestado(container, options) {
    var consultar = new sirconsulta();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var estados = [
        {text: "Activo", valor: "1"},
        {text: "Inactivo", valor: "0"},
        {text: "Ingreso 1 vez", valor: "2"},
        {text: "Retirado", valor: "3"},
        {text: "Inactivo Manualmente", valor: "4"},
        {text: "Deshabilitado", valor: "5"},
        {text: "Inactivado Cambio De Clave", valor: "6"},
    ];
    $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "text",
        dataValueField: "valor",
        dataSource: estados
    });
}
/**
 * Funcion passEditorPopup se ejecuta en el evento onkeyup
 *  Id clave 1 primer campo de clave 
 *  
 *  
 *  
 *  
 */        					function passEditorPopup(container, options) {
    $('<input id ="clave1" type = \"password\"  onkeyup = \"mostrarcampo(event)\" required name="' + options.field + '" />')
            .appendTo(container)
            .kendoMaskedTextBox({
            });
}

/**
 * Funcion onkeypass para ocultar campo de clave
 *  
 *  var buscarlabel = busca el label de kendo edit.
 *  Buscarlabel.style.display= oculta el campo
 *  id clave2 campo para validar contraseña 
 *  
 */
function onkeypass(container, options) {
    $('<input id ="clave2" type = \"password\"" name="' + options.field + '" />')
            .appendTo(container)
            .kendoMaskedTextBox({
            });
    var buscarlabel = $("label").find("for");//BUSCAR TODOS LOS ELEMENTOS LABEL--<<  
    Buscarlabel = buscarlabel.prevObject[10];
    Buscarlabel.style.display = "none";
    document.getElementById("clave2").style.display = "none";
}
/**
 * Funcion ocultarcampo para mostrar campo de clave
 *  
 *  var buscarlabel = busca el label de kendo edit.
 *  Buscarlabel.style.display=  muestra el campo
 *  
 *  
 */
function mostrarcampo(e) {
    var Tecla= e.which;
   
    if (Tecla == 13)
    {}
    else
    {
        document.getElementById("clave2").style.display = "";
        var buscarlabel = $("label").find("for");
        Buscarlabel = buscarlabel.prevObject[10];
        Buscarlabel.style.display = "";}    
}

/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 60);
});
