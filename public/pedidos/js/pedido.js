
var itemPedido;
var btnGrid;

$(document).ready(function () {
   var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
   
   document.getElementById('idNumeroPedido').innerHTML = 'Nº '+pedido.ped__num;
   document.getElementById('lbSucursal').innerHTML = pedido.suc__nom;
   document.getElementById('lbNITCliente').innerHTML = pedido.ter__nit;
   document.getElementById('lbCliente').innerHTML = pedido.ter__raz;
   document.getElementById('lbCdePago').innerHTML = pedido.pago__nom;
   document.getElementById('lbDivisa').innerHTML = pedido.mnd__nom;
   document.getElementById('lbVendedor').innerHTML = pedido.ven__nom;
   document.getElementById('lbSolicitante').innerHTML = pedido.ped__pqs;
   document.getElementById('lbFecha').innerHTML = pedido.ped__fec;
   document.getElementById('lbFechaEntrega').innerHTML = pedido.ped__fec__ent;
   document.getElementById('lbEstablecimiento').innerHTML = pedido.com__con;
   document.getElementById('lbDireccion').innerHTML = pedido.ter__dir;
   document.getElementById('lbTelefono').innerHTML = pedido.ter__tel;   
   document.getElementById('lbCiudad').innerHTML = pedido.ciu__nom;
   document.getElementById('lbTipTasa').innerHTML = pedido.tip__tdes;      
   document.getElementById('lbFechaTasa').innerHTML = pedido.fec__tasa;
   document.getElementById('lbNumOrden').innerHTML = pedido.ord__nump;
   document.getElementById('lbPrioridad').innerHTML = pedido.pri__des;
   document.getElementById('lbObservaciones').innerHTML = pedido.obs__ped;
   sessionStorage.setItem("listaPrecioCliente", pedido.lis__num);
   
    if(pedido.gpd__est !==99){
        document.getElementById("btnGuardar").remove();
        document.getElementById("tdFinalizar").remove();
        document.getElementById("tdAgregarItem").remove();
   } 
//   else{
//        actions[0] = new Object();
//        actions[0].name = "Ver online";            
//        actions[0].click = gridDetallePedido.editarItem;
//        actions[0].template = "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>";
//   }  
   gridDetallePedido();
   
});

function popUpPedidoCU() {
    var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (80 / 100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (60 / 100);

    $("body").append("<div id='windowPedidoCabecera'></div>");
    var myWindow = $("#windowPedidoCabecera");
    var undo = $("#undo");

    function onCloseWindowCabPedido() {
        document.getElementById("windowPedidoCabecera").remove();
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: widthPopUp,
        height: heightPopUp,
        title: "Editar",
        content: sessionStorage.getItem("url") + "/pedidos/html/pedidoCabecera.html",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: onCloseWindowCabPedido
    }).data("kendoWindow").center().open();
}

function closePopUpCabecera(){    
    $("#windowPedidoCabecera").data("kendoWindow").close();
    location.reload();
}

function nuevoPedido(){
    sessionStorage.removeItem("regPedidos");    
    popUpPedidoCU();
}

function volverPedidos(){
    sessionStorage.removeItem("regPedidos");    
    var servicio="pedidos"    
    window.location.replace(( sessionStorage.getItem("url")+servicio+"/html/"+servicio+".html"));  
}

function gridDetallePedido(){    
    if(JSON.parse(sessionStorage.getItem("regPedidos")).gpd__est ===99){
        
        var actions = new Array();
        actions[0] = new Object();
        actions[0].name = "editar";            
        actions[0].click = editarItem;
        actions[0].template = "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>";
        actions[1] = new Object();
        actions[1].name = "eliminar";            
        actions[1].click = eliminarItem;
        actions[1].template = "<a class='k-grid-eliminar'><span class='k-sprite po_cerrar'></span></a>";
        
        var btnGrid = {command: actions, title: "&nbsp;", width: "100px"};
    } 
    
    var dataSourcePedido = new kendo.data.DataSource({
        data : JSON.parse(sessionStorage.getItem("regPedidos")).eegpd_ped_det,
    });
    
    var grid = $("#gridDetallePedido").kendoGrid({
        dataSource: dataSourcePedido,       
        selectable: true,
        height: 500,        
        columns: [   
            {
                field: "cla__des",
                title: "Clase de articulo"
            },
            {
                field: "art__des",
                title: "Articulo"
            },                       
            {
                field: "pre__pcod",
                title: "Presentación"
            },
            {
                field: "lpd__pre",
                title: "Valor unitario",
                format: "{0:c}"
            },
            {
                field: "ped__can",
                title: "Cantidad",
                format: "{0:n}"
            },
            {
                field: "ped__dct",
                title: "Descuento",
                format: "{0:n}"
            },
            {
                field: "ped__iva",
                title: "IVA",
                format: "{0:n}"
            },
            btnGrid
            ],
        editable: {
            mode: "popup",
            window: {
                title: "Editar",
                animation: false,
                width: "700px"
            }            
        },
        cancel: function (e) {              
            e._defaultPrevented = true;
            $('#gridDetallePedido').data('kendoGrid').refresh();
        },        
    }).data("kendoGrid");
    
    function eliminarItem(e){         
        e.preventDefault();
        
        var grid = $("#gridDetallePedido").data("kendoGrid");
        itemPedido = grid.dataItem(grid.select());
        var ItemEliminado;
        
        var objDetalePed = new SICUDDetallePedido();
        var jsonDetalePed = objDetalePed.getjson();
        var urlDetalePed = objDetalePed.getUrlSir();
        var mapDataDetalePed = objDetalePed.getMapData();
        
        var key1 = Object.keys(jsonDetalePed)[0];
        var key2 = Object.keys(jsonDetalePed[key1])[1];
        jsonDetalePed[key1][key2][0].suc__cod = itemPedido.suc__cod;
        jsonDetalePed[key1][key2][0].clc__cod = itemPedido.clc__cod;
        jsonDetalePed[key1][key2][0].ped__fec = itemPedido.ped__fec;//lista del cliente        
        jsonDetalePed[key1][key2][0].ped__num = itemPedido.ped__num;
        jsonDetalePed[key1][key2][0].lis__num = itemPedido.lis__num;
        jsonDetalePed[key1][key2][0].cla__cod = itemPedido.cla__cod;//lista del cliente        
        jsonDetalePed[key1][key2][0].art__cod = itemPedido.art__cod;    
        jsonDetalePed[key1][key2][0].pre__pcod = itemPedido.pre__pcod;
        jsonDetalePed[key1][key2][0].ped__can = itemPedido.ped__can;
        jsonDetalePed[key1][key2][0].lpd__pre = itemPedido.lpd__pre;
        jsonDetalePed[key1][key2][0].ped__dct = itemPedido.ped__dct;   
        jsonDetalePed[key1][key2][0].ped__iva = itemPedido.ped__iva;
        
        $.ajax({
            type: "DELETE",
            data: JSON.stringify(jsonDetalePed),
            url: urlDetalePed,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) {
                ItemEliminado = e[key1].eeEstados[0].Estado;;                
            },
            error: function (e) {                
                alertDialogs("Error consumiendo el servicio de guardar\n"+ e.status +" - "+ e.statusText);
            }
        }).done(function(){
            if(ItemEliminado==="OK"){
                var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
                
                var objFiltroPedidos = new sirConsultaPedidos();
                var jsonFiltroPedidos = objFiltroPedidos.getjson();
                var urlFiltroPedidos = objFiltroPedidos.getUrlSir();
                var mapDataFiltroPedidos = objFiltroPedidos.getMapData();
                
                var key1 = Object.keys(jsonFiltroPedidos)[0];
                var key2 = Object.keys(jsonFiltroPedidos[key1])[1];
                jsonFiltroPedidos[key1][key2][0].pidped_fec = pedido.ped__fec;
                jsonFiltroPedidos[key1][key2][0].piiped_num = pedido.ped__num;
                jsonFiltroPedidos[key1][key2][0].picsuc_cod = pedido.suc__cod;
                
                try{                
                    $.ajax({
                        type: "POST",
                        data: JSON.stringify(jsonFiltroPedidos),
                        url: urlFiltroPedidos,
                        dataType : "json",
                        contentType: "application/json;",
                        success: function (e) {                        
                            if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                                return e[key1][mapDataFiltroPedidos];
                            } else {
                                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                            }
                        },
                        error: function (e) {
                            alertDialogs(" Error al consumir el servicio 733"+ e.status +" - "+ e.statusText);                
                        }
                    }).done(function(e){            
                        var pedido = e[key1][mapDataFiltroPedidos][0];
                        sessionStorage.setItem("regPedidos", JSON.stringify(pedido));
                        gridDetallePedido();
                    });
                }catch (e) {
                    alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
                }
            }else{                    
                alertDialogs("Pedido con errores  \n"+ItemEliminado);                         
            }
        });
    }
    
    function editarItem(e){        
        e.preventDefault();
        
        var grid = $("#gridDetallePedido").data("kendoGrid");
        itemPedido = grid.dataItem(grid.select());
        
        var widthPopUp = $("body").width();
        widthPopUp = widthPopUp * (60/100);
        var heightPopUp = $("body").height();
        heightPopUp = heightPopUp * (50/100);
        
        $("body").append("<div id='windowItemPedido'></div>");
        var myWindow = $("#windowItemPedido");        
        var undo = $("#undo");
        
        function onCloseWindowItemFacEdit() {
            
            document.getElementById("windowItemPedido").remove(); 
            itemPedido = null
            undo.fadeIn();  
        }
        
        myWindow.kendoWindow({
            width: widthPopUp,
            height: heightPopUp,
            title: "Editar",
            content: sessionStorage.getItem("url") + "/pedidos/html/popupItemPedido.html",
            visible: false,
            modal: true,
            actions: [            
                "Close"
            ],
            close: onCloseWindowItemFacEdit
        }).data("kendoWindow").center().open();
    }
}

function agregarItemDetalle(e){    
    
    var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (60/100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (40/100);
    
    $("body").append("<div id='windowItemPedido'></div>");
    var myWindow = $("#windowItemPedido");
    var undo = $("#undo");
    
    function onCloseWindowItemPedido() {
        document.getElementById("windowItemPedido").remove();            
        undo.fadeIn();  
    }
    
    myWindow.kendoWindow({
        width: widthPopUp,
        height: heightPopUp,
        title: "Agregar",
        content: sessionStorage.getItem("url")+ "/pedidos/html/popupItemPedido.html",
        visible: false,
        modal: true,
        actions: [            
            "Close"
        ],
        close: onCloseWindowItemPedido
    }).data("kendoWindow").center().open();
    //    }
}

function closePopUp(){    
    $("#windowItemPedido").data("kendoWindow").close();    
    var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
    
    var objFiltroPedidos = new sirConsultaPedidos();
    var jsonFiltroPedidos = objFiltroPedidos.getjson();
    var urlFiltroPedidos = objFiltroPedidos.getUrlSir();
    var mapDataFiltroPedidos = objFiltroPedidos.getMapData();
    
    var key1 = Object.keys(jsonFiltroPedidos)[0];
    var key2 = Object.keys(jsonFiltroPedidos[key1])[1];
    jsonFiltroPedidos[key1][key2][0].pidped_fec = pedido.ped__fec;
    jsonFiltroPedidos[key1][key2][0].piiped_num = pedido.ped__num;
    jsonFiltroPedidos[key1][key2][0].picsuc_cod = pedido.suc__cod;
    
    try{                
        $.ajax({
            type: "POST",
            data: JSON.stringify(jsonFiltroPedidos),
            url: urlFiltroPedidos,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) {                        
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    return e[key1][mapDataFiltroPedidos];
                } else {
                    alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            error: function (e) {
                alertDialogs(" Error al consumir el servicio 733"+ e.status +" - "+ e.statusText);                
            }
        }).done(function(e){            
            var pedido = e[key1][mapDataFiltroPedidos][0];
            sessionStorage.setItem("regPedidos", JSON.stringify(pedido));
            gridDetallePedido();
        });
    }catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: 740 " + e.message);
    }
}

function confirmarFinalizarPedido(){
    var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = finalizarPedido;
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            
        };
        createDialog("Atención", "Esta seguro que desea finalizar el pedido", "400px", "200px", true, true, actions);
}

function finalizarPedido(){
    
    var verbo="PUT";
    var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
    var obj = new SICUDPedido();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    var key1 = Object.keys(objJson)[0];
    var key2 = Object.keys(objJson[key1])[1];      
    var key3 = Object.keys(objJson[key1])[2];   
    
    objJson[key1][key2][0].gpd__est = pedido.gpd__est;
    objJson[key1][key2][0].suc__cod = pedido.suc__cod;
    objJson[key1][key2][0].ter__nit = pedido.ter__nit;
    objJson[key1][key2][0].pago__cod = pedido.pago__cod;
    objJson[key1][key2][0].mnd__cla = pedido.mnd__cla;
    objJson[key1][key2][0].ven__cod = pedido.ven__cod;
    objJson[key1][key2][0].ped__fec = pedido.ped__fec;
    objJson[key1][key2][0].ped__fec__ent = pedido.ped__fec__ent;
    objJson[key1][key2][0].com__con = pedido.com__con;
    objJson[key1][key2][0].ter__dir = pedido.ter__dir;
    objJson[key1][key2][0].ter__tel = pedido.ter__tel;
    objJson[key1][key2][0].ciu__cod = pedido.ciu__cod;
    objJson[key1][key2][0].ped__pqs = pedido.ped__pqs;
    objJson[key1][key2][0].obs__ped = pedido.obs__ped;
    objJson[key1][key2][0].ped__num = pedido.ped__num;
    objJson[key1][key2][0].clc__cod = pedido.clc__cod;
    objJson[key1][key2][0].tip__tasa = pedido.tip__tasa;
    objJson[key1][key2][0].fec__tasa = pedido.fec__tasa;
    objJson[key1][key2][0].pri__cod = pedido.pri__cod;
    objJson[key1][key2][0].ord__nump = pedido.ord__nump;
    objJson[key1][key3][0].pltermina =true;
    
    try{
        $.ajax({
            type: verbo,
            data: JSON.stringify(objJson),
            url: url,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) {                 
                var key1 = Object.keys(e)[0];
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    return e[key1][mapData];
                } else {
                    alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            error: function (e) {
                alertDialogs(" Error al consumir el servicio "+ e.status +" - "+ e.statusText);                
            }
        }).done(function(e){            
            var key1 = Object.keys(objJson)[0];
            var key2 = Object.keys(objJson[key1])[1]; 
            var pedido = e[key1][key2][0]; 
            
            var objFiltroPedidos = new sirConsultaPedidos();
            var jsonFiltroPedidos = objFiltroPedidos.getjson();
            var urlFiltroPedidos = objFiltroPedidos.getUrlSir();
            var mapDataFiltroPedidos = objFiltroPedidos.getMapData();
            
            var key1 = Object.keys(jsonFiltroPedidos)[0];
            var key2 = Object.keys(jsonFiltroPedidos[key1])[1];
            jsonFiltroPedidos[key1][key2][0].pidped_fec = pedido.ped__fec;
            jsonFiltroPedidos[key1][key2][0].piiped_num = pedido.ped__num;
            jsonFiltroPedidos[key1][key2][0].picsuc_cod = pedido.suc__cod;
            console.log(JSON.stringify(jsonFiltroPedidos));
            try{                
                $.ajax({
                    type: "POST",
                    data: JSON.stringify(jsonFiltroPedidos),
                    url: urlFiltroPedidos,
                    dataType : "json",
                    contentType: "application/json;",
                    success: function (e) {                        
                        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                            return e[key1][mapDataFiltroPedidos];
                        } else {
                            alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                        }
                    },
                    error: function (e) {
                        alertDialogs(" Error al consumir el servicio 733"+ e.status +" - "+ e.statusText);                
                    }
                }).done(function(e){
                    volverPedidos();
                });
            }catch (e) {
                alertDialogs("Function: consumeServAjaxSIR Error: 740 " + e.message);
            }
        });
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
}