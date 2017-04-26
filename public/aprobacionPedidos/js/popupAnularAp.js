
$(document).ready(function () {
    
    $("#btAnular").kendoButton({
        
    });
    
    $("#btCancelar").kendoButton({
        
    });
       
    var obj = new sirgpd_anu();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    $("#ipAnular").kendoDropDownList({
        optionLabel: "Seleccione la condición de anulación",
        dataTextField: "anu__des ",
        dataValueField: "anu__cod",
        template:'<div class="divElementDropDownList">#: data.anu__des #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            return JSON.stringify(objJson);
                        }	
                    } catch (e) {                        
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        
                        return e[key1][mapData];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "mnd__cla",
                    fields: {
                        mnd__cla: {validation: {required: true}, type: 'string'},
                        mnd__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
});

function anularPedido(){
    
    var verbo="PUT";
    var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
     
    var obj = new SICUDPedido();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    var key1 = Object.keys(objJson)[0];
    var key2 = Object.keys(objJson[key1])[1];
    
    objJson[key1][key2][0].ciu__cod = pedido.ciu__cod;
    objJson[key1][key2][0].com__con = pedido.com__con;
    objJson[key1][key2][0].dpc__par = pedido.dpc__par;
    objJson[key1][key2][0].clc__cod = pedido.clc__cod;    
    objJson[key1][key2][0].mnd__cla = pedido.mnd__cla;
    objJson[key1][key2][0].pago__cod = pedido.pago__cod;
    objJson[key1][key2][0].ped__fec = pedido.ped__fec;
    objJson[key1][key2][0].ped__fec__ent = pedido.ped__fec__ent;
    objJson[key1][key2][0].ped__num = pedido.ped__num;
    objJson[key1][key2][0].obs__ped = pedido.obs__ped;
    objJson[key1][key2][0].ped__pqs = pedido.ped__pqs;
    objJson[key1][key2][0].suc__cod = pedido.suc__cod;
    objJson[key1][key2][0].ter__dir = pedido.ter__dir;
    objJson[key1][key2][0].ter__nit = pedido.ter__nit;
    objJson[key1][key2][0].ter__tel = pedido.ter__tel;
    objJson[key1][key2][0].ven__cod = pedido.ven__cod;
    objJson[key1][key2][0].ciu__cod = pedido.ciu__cod;
    objJson[key1][key2][0].tip__tasa = pedido.tip__tasa;
    objJson[key1][key2][0].fec__tasa = pedido.fec__tasa;
    objJson[key1][key2][0].pri__cod = pedido.pri__cod;    
    objJson[key1][key2][0].obs__apr = pedido.obs__apr;
    objJson[key1][key2][0].anu__cod = $("#ipAnular").val();
    objJson[key1][key2][0].obs__anu = $("#idObservaciones").val();
      
    
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
            parent.closePopUpAnularPedido();
        });
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
}

function btnCancelar(){
    parent.closePopUpAnularPedido();
}