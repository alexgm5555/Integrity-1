/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {        
    $("#btBuscar").kendoButton({        
    });
});
function buscarPedidos() {
    var ternit = $("#ipRUC").val();
    ternit = ternit.replace(/^\s+|\s+$/g, "");
    
    var terraz = $("#ipRazonSocial").val();
    terraz = terraz.replace(/^\s+|\s+$/g, "");
    
    if(ternit!==""){        
        parent.grid($("#ipRUC").val(),"");
        parent.closePopUpFiltros();
    }else if(terraz!==""){
        parent.grid("", $("#ipRazonSocial").val());
        parent.closePopUpFiltros();
    }else{
        alertDialogs("Debe ingresar algún criterio de búsqueda");
        return
    }
}