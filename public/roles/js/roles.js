
/*  FUNCION RESIZE WINDOW 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 100);

});


/**
 * FUNCION crear usuario nuevo
 * grid1 variable almacena data de grid
 *  
 *   
 *  
 *  
 */ function newrol() {
    var grid1 = $("#grid").data("kendoGrid");
    var dataSource = $("#grid").data("kendoGrid").dataSource;

    grid1.options.editable = "popup";
    grid1.addRow();
    grid1.options.editable = "inline";

}
function editar_rol() {


    var grid1 = $("#grid").data("kendoGrid");

    var row = grid1.dataItem(grid1.select());
    sessionStorage.setItem("Idrol", row.car__cod);
    sessionStorage.setItem("Rolname", row.car__nom);
    window.location = ("editroles.html");
}




$(document).ready(function () {


    $("#toolbar").kendoToolBar({
        items: [
            {template: "<label>Buscar:</label>"},
            {
                template: "<input id='filtro' style='width: auto;'/>",
                overflow: "always"
            }

        ]
    });


});




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
 *  
 */
$(document).ready(function () {
    var consultar = new sirconsulta();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();

    var actualizar = new crearol();
    var actjson = actualizar.getjson();
    var urlactualizar = actualizar.getUrlSir();


    //var crudServiceBaseUrl = "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SirUsuarios";
    var mapCud = "ee_user3";
    var mapCud1 = "ee_user3";
    dataSource = new kendo.data.DataSource({
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
                if (operation === "update") {
                    $('#grid').data('kendoGrid').refresh();
                    return JSON.stringify(actjson);

                }
                if (operation === "create") {
                    actjson.dssic_car.eesic_car[0].car__nom = options.car__nom;
                    return JSON.stringify(actjson);

                    $('#grid').data('kendoGrid').refresh();
                    $('#grid').data('kendoGrid').dataSource.read();
                    $('#grid').data('kendoGrid').refresh();


                }
            }

        },
        batch: false,
        severFiltering: true,
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados) {
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud];
                    }
                } else if (e[key1].dssic_car.dssic_car.eeEstados[0].Estado === "OK") {
                    return e[key1].dssic_car.dssic_car["eesic_car"];
                } else {
                    alert(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "car__cod",
                fields: {
                    car__cod: {editable: false, nullable: false},
                    car__nom: {editable: true, nullable: false},
                }
            }
        }
    });
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
    var grid1 = $("#grid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        selectable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        //navigatable: true,
        columns: [
            {field: "car__nom", title: "ROL", hidden: false},
            {command: [{name: "edit", click: editar_rol, text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"}], width: "60px"}],
        cancel: function (e) {
            e._defaultPrevented = true;
            $('#grid').data('kendoGrid').refresh();
            $('#grid').data('kendoGrid').dataSource.read();
            $('#grid').data('kendoGrid').refresh();
        }
    });



    $("#filtro").kendoAutoComplete({
        dataTextField: "car__nom",
        dataValueField: "car__nom",
        placeholder: "Rol...",
        dataSource: dataSource,
        filter: "startswith"
    });









});


$(document).ready(function () {

    $("body").css("display", "none");

    $("body").fadeIn(2000);

    $("a.transition").click(function (event) {
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(1000, redirectPage);
    });

    function redirectPage() {
        window.location = linkLocation;
    }

});
