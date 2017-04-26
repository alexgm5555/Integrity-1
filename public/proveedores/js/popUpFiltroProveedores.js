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
        parent.grilla($("#ipRUC").val(),"");
        parent.cerrarPopup1();
    }else if(terraz!==""){
        parent.grilla("", $("#ipRazonSocial").val());
        parent.cerrarPopup1();
    }else{
        alertDialogs("Debe ingresar algún criterio de búsqueda");
        return
    }
}