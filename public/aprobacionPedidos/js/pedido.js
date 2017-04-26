
var itemPedido;

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
   document.getElementById('lbObservaciones').innerHTML = pedido.obs__ped;   
   //sessionStorage.setItem("listaPrecioCliente", dataCliente.lis__num);
   
   gridDetallePedido();
   
});

function volverPedidos(){
    var servicio="aprobacionPedidos"    
    window.location.replace(( sessionStorage.getItem("url")+servicio+"/html/"+servicio+".html"));  
}

function gridDetallePedido(){  
    
    var dataSourcePedido = new kendo.data.DataSource({
        data : JSON.parse(sessionStorage.getItem("regPedidos")).eegpd_ped_det,
    });
    
    var grid = $("#gridDetallePedido").kendoGrid({
        dataSource: dataSourcePedido,       
        //selectable: false,
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
           ],                
    }).data("kendoGrid");
}
