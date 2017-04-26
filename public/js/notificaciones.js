function notificaciones(){               
    $("#notificaciones").removeClass();
    var consultar = new sirNotificaciones();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud = "eesic_alt";
    var datasource = new kendo.data.DataSource({
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
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapCud];
                } else {
                    alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "alt__id",
                fields: {
                    alt__cad:    {editable: false, nullable: false},
                    alt__dat:     {editable: false, nullable: false},
                    alt__ini:       {editable: false, nullable: false},
                    alt__msj:    {editable: false, nullable: false},
                    func__name:     {editable: false, nullable: false},
                    usr__cod__g:       {editable: false, nullable: false},
                    alt__tit:    {editable: false, nullable: false},
                    alt__url:     {editable: false, nullable: false},
                    alt__tip:       {editable: false, nullable: false},
                    
                }
            }
        }, error: function (e) {
            alertDialogs(e.errorThrown);
        }
    });
    
    $("#gridNotificaciones").kendoGrid({
        dataSource: datasource,
        scrollable: false,  
        selectable: true,
        change: onChangeNotificaciones,
        //navigatable: true,
        columns: [
            //                            { template: "<a class='k-grid-play'><span class='k-sprite pro_bullet1'></span></a>", width: "50px"} ,    
            {name: "imgNoti", text: " ",  template: "<a class='imgNoti'><img id='imgTransacciones' src='../images/transaccionesOff.png' /></a>", width: "50px"},
            
            
            { field: "alt__msj", title: "",  hidden:false},
        ],                            
        
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html()),
        dataBound: function () {
            var results = datasource.data();
            changImgFunc(results);
            //cambiarEstado(results);
        },
        
    });
    $("#gridNotificaciones .k-grid-header").css('display', 'none');
    $(".k-grid").css("font-weight","bold");
    $(".k-grid").css("font-size","14px");
    
    function cambiarEstado(results){debugger
        
     for (var i = 0; i < results.length; i++) {
         
         if (results[i].alt__est===1)
         {
             results[i].alt__est=2;
         }        
         
     }
var datos =results;
    
    var consultar = new cudNotificaciones();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    datajson.dsSICUDsic_alt.eesic_alt=datos;
     $.ajax({
                type: "PUT",
                async: false, 
                data: JSON.stringify(datajson),
                url: urlService,
                dataType : "json",  
                contentType: "application/json;",
                success: function (resp) {             
                    if((resp.dsSICUDsic_alt.eeEstados["0"].Estado)=="OK")
                    {
                                              
                    }
                    else
                    {
                        alertDialogs("Error"+resp.dsSICUDsic_alt.eeEstados["0"].Estado);
                    }
                },
                error: function (e) {   
                      alertDialogs("Error"+e);
                }
            });
    }
    function changImgFunc(results) {debugger
        
        for (var i = 0; i < results.length; i++) {
            //var nombre="spanplay"+results[i].alt__tip;
            switch (results[i].alt__tip) {
                case "procesos":
                    document.getElementById("imgNoti"+results[i].alt__id).attributes[4].nodeValue="../images/../images/procesosOn.png";
                    //                                 document.getElementById("imgNoti"+results[i].alt__id).setAttribute("estado", "on");
                    break;
                case "reportes":
                    document.getElementById("imgNoti"+results[i].alt__id).attributes[4].nodeValue="../images/../images/reportesOn.png";
                    break;
                case "portafolio":
                    document.getElementById("imgNoti"+results[i].alt__id).attributes[4].nodeValue="../images/../images/portafolioOn.png";
                    break;
                case "transaciones":
                    document.getElementById("imgNoti"+results[i].alt__id).attributes[4].nodeValue="../images/../images/transaccionesOn.png";
                    break;
            }              
        }                    
        
        
        for (var i = 0; i < results.length; i++) {
            //var nombre="spanplay"+results[i].alt__tip;
            switch (results[i].alt__est) {
                case 3:
                    $("#rowNoti"+results[i].alt__id).css("opacity", "0.4"); 
                    break;
                case 2:
                    //$("#rowNoti"+results[i].alt__id).css("opacity", "0.4"); 
                    break;
                
            }                    
            
        }
        
        
        
    }
}             

function onChangeNotificaciones(arg) {debugger
    
    var consultar = new cudNotificaciones();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    
    
    var x=arg.sender._data;       
    var grid = $('#gridNotificaciones').data('kendoGrid');
    var datos = grid.select($("#rowSelection_active_cell").closest("tr"))["0"].id;
    var citrus = datos.slice(7,datos.lenght);
    var i=0;
    for (var i = 0; i < x.length; i++) {
        
        if( x[i].alt__id===parseInt(citrus) ){
            var dataClick=x[i];
            datajson.dsSICUDsic_alt.eesic_alt[0].alt__cad=dataClick.alt__cad;
            datajson.dsSICUDsic_alt.eesic_alt[0].alt__dat=dataClick.alt__dat;
            datajson.dsSICUDsic_alt.eesic_alt[0].alt__est=3;
            datajson.dsSICUDsic_alt.eesic_alt[0].alt__id=dataClick.alt__id;
            datajson.dsSICUDsic_alt.eesic_alt[0].alt__ini=dataClick.alt__ini;
            datajson.dsSICUDsic_alt.eesic_alt[0].alt__msj=dataClick.alt__msj;
            datajson.dsSICUDsic_alt.eesic_alt[0].func__name=dataClick.func__name;
            datajson.dsSICUDsic_alt.eesic_alt[0].usr__cod=dataClick.usr__cod;
            datajson.dsSICUDsic_alt.eesic_alt[0].usr__cod__g=dataClick.usr__cod__g;
            datajson.dsSICUDsic_alt.eesic_alt[0].alt__tit=dataClick.alt__tit;
            datajson.dsSICUDsic_alt.eesic_alt[0].alt__url=dataClick.alt__url;
            datajson.dsSICUDsic_alt.eesic_alt[0].alt__tip=dataClick.alt__tip;
            datajson.dsSICUDsic_alt.eesic_alt[0].alt__datehour=dataClick.alt__datehour;
            $.ajax({
                type: "PUT",
                async: false, 
                data: JSON.stringify(datajson),
                url: urlService,
                dataType : "json",  
                contentType: "application/json;",
                success: function (resp) {             
                    if((resp.dsSICUDsic_alt.eeEstados["0"].Estado)=="OK")
                    {
                        
                        $('#gridNotificaciones').data('kendoGrid').refresh();                                             
                        $('#gridNotificaciones').data('kendoGrid').dataSource.read();
                        $('#gridNotificaciones').data('kendoGrid').refresh(); 
                    }
                    else
                    {
                        
                    }
                },
                error: function (e) {              
                }
            });
            
        }
        
        
    }
}      
