 function getPDF(selector) {
      $("#pag").removeClass("fondo");
        kendo.drawing.drawDOM($(selector),{ forcePageBreak: ".page-break" }).then(function(group){
          kendo.drawing.pdf.saveAs(group, "Quantum.pdf");
        });
//        $("#principal").addClass("jorge");
      }
     function clonar(e){
//     switch (e.dscertret.certret[0].certretdet.length) {
//    case 0:
//        $("#pdfContainer").append('<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />');
//        break;
//    case 1:
//        $("#pdfContainer").append('<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />');
//        break;
//    case 2:
//        $("#pdfContainer").append('<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />');
//        break;
//    case 3:
//      $("#pdfContainer").append('<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />');
//        break;
//    case 4:
//      $("#pdfContainer").append('<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />');
//        break;
//   
//}    
   
    $("#pdfContainer").append("<div id='Container2'></div>");
    
    var itm = document.getElementById("pdfContainer");
    var cln = itm.cloneNode(true);
    document.getElementById("Container2").append(cln);
    
    }
    function llenar(e){
    var i,j=0;
    var nombre =e.dscertret.certret[0].ter_raz;
    var nit =e.dscertret.certret[0].tnit;
    var direccion =e.dscertret.certret[0].ter_dir;
    var telefono =e.dscertret.certret[0].ter_tel;
    var fecha_emision =e.dscertret.certret[0].d_fecha;
    var tipo_comprobante =e.dscertret.certret[0].tclc_cod;
    var Num_comprobante =e.dscertret.certret[0].tserie;
    var ejericio_fisical =e.dscertret.certret[0].v_fecha;
    document.getElementById("parrafo1").innerHTML="<strong>Sr.(es): </strong>"+nombre+"<br>"+"<br>"+"<strong>CI/RUC:</strong> "+nit+"<br>"+"<br>"+"<strong>Direccion: </strong>"+direccion+"<br>"+"<br>"+"<strong>Teléfonos: </strong>"+telefono; 
    document.getElementById("parrafo2").innerHTML="<strong>Fecha de Emision:</strong>"+fecha_emision+"<br>"+"<br>"+"<strong>Tipo de Comprobante de venta: </strong>"+tipo_comprobante+"<br>"+"<br>"+"<strong>N° de Comprobande de venta: </strong>"+Num_comprobante+"<br>"+"<br>"+"<strong>Ejercicio Fis: </strong>"+ejericio_fisical;
    document.getElementById("retencion").innerHTML="";
    document.getElementById("codigo").innerHTML="";
    document.getElementById("base").innerHTML="";
    document.getElementById("porcentaje").innerHTML="";
    document.getElementById("valor").innerHTML="";
    for (i = 0; i< e.dscertret.certret[0].certretdet.length; i++){
    
    var Tip_Retencion = e.dscertret.certret[0].certretdet[i].v_nom;
    var Codigo = e.dscertret.certret[0].certretdet[i].timp;
    var Base = e.dscertret.certret[0].certretdet[i].v_valor1;
    var Porc_retencion = e.dscertret.certret[0].certretdet[i].v_cpt;
    var V_Retenido = e.dscertret.certret[0].certretdet[i].v_valor;
    
    document.getElementById("retencion").innerHTML+=Tip_Retencion+"<br>";
    document.getElementById("codigo").innerHTML+=Codigo+"<br>"
    document.getElementById("base").innerHTML+=Base+"<br>";
    document.getElementById("porcentaje").innerHTML+=Porc_retencion+"<br>";
    document.getElementById("valor").innerHTML+=V_Retenido+"<br>";
    
            }
            var total = e.dscertret.certret[0].certretdet[(e.dscertret.certret[0].certretdet.length)-1].t_suma1;
    document.getElementById("total").innerHTML=total;
//            switch (e.dscertret.certret[0].certretdet.length) {
//    case 0:
//        document.getElementById("total").innerHTML="<br>"+"<br>"+"<br>"+"<br>"+"<br>"+"<br>"+total;
//        break;
//    case 1:
//         document.getElementById("total").innerHTML="<br>"+"<br>"+"<br>"+"<br>"+"<br>"+"<br>"+total;
//        break;
//    case 2:
//      document.getElementById("total").innerHTML="<br>"+"<br>"+"<br>"+"<br>"+"<br>"+"<br>"+total;
//        break;
//    case 3:
//        document.getElementById("total").innerHTML="<br>"+"<br>"+"<br>"+"<br>"+"<br>"+total;
//        break;
//    case 4:
//        document.getElementById("total").innerHTML="<br>"+"<br>"+"<br>"+"<br>"+total;
//        break;
//    case 5:
//        document.getElementById("total").innerHTML="<br>"+"<br>"+"<br>"+total;
//        break;
//    case 6:
//        document.getElementById("total").innerHTML="<br>"+"<br>"+total;
//        break;
//     }
    

    clonar(e);

   
}
   function evaluar(e){
   var pos=0;
   if (e.dscertret.certret.length>1){
   
   llenar(e);
   var i=0,j=0;
    for (i = 0; i < e.dscertret.certret.length-1; i++){
        j=i+1;
   $("#principal").append("<div class='responsive-message page-break'></div><p></p>"); 
   $("#principal").append("<div id ="+"Pag" +j+ "  class='pdf-page size-a4 fondo' ></div> '");
            
           }
   
   
    for (i = 0; i< e.dscertret.certret.length-1; i++){
        var clone = $('#pdfContainer').clone();
                var nombre =e.dscertret.certret[i+1].ter_raz;
                var nit =e.dscertret.certret[i+1].tnit;
                var direccion =e.dscertret.certret[i+1].ter_dir;
                var telefono =e.dscertret.certret[i+1].ter_tel;
                var fecha_emision =e.dscertret.certret[i+1].d_fecha;
                var tipo_comprobante =e.dscertret.certret[i+1].tclc_cod;
                var Num_comprobante =e.dscertret.certret[i+1].tserie;
                var ejericio_fisical =e.dscertret.certret[i+1].v_fecha;
                var total = e.dscertret.certret[i+1].certretdet[e.dscertret.certret[i+1].certretdet.length-1].t_suma1;
                clone.find('[id=parrafo1]')[0].innerHTML="<strong>Sr.(es): </strong>"+nombre+"<br>"+"<br>"+"<strong>CI/RUC: </strong>"+nit+"<br>"+"<br>"+"<strong>Direccion:</strong> "+direccion+"<br>"+"<br>"+"<strong>Teléfonos: </strong>"+telefono; ;
                clone.find('[id=parrafo2]')[0].innerHTML="<strong>Fecha de Emision:</strong>"+fecha_emision+"<br>"+"<br>"+"<strong>Tipo de Comprobante de venta: </strong>"+tipo_comprobante+"<br>"+"<br>"+"<strong>N° de Comprobande de venta:</strong>"+Num_comprobante+"<br>"+"<br>"+"<strong>Ejercicio Fis: </strong>"+ejericio_fisical;
                clone.find('[id=parrafo1]')[1].innerHTML="<strong>Sr.(es): </strong>"+nombre+"<br>"+"<br>"+"<strong>CI/RUC: </strong>"+nit+"<br>"+"<br>"+"<strong>Direccion:</strong> "+direccion+"<br>"+"<br>"+"<strong>Teléfonos: </strong>"+telefono; ;
                clone.find('[id=parrafo2]')[1].innerHTML="<strong>Fecha de Emision:</strong>"+fecha_emision+"<br>"+"<br>"+"<strong>Tipo de Comprobante de venta: </strong>"+tipo_comprobante+"<br>"+"<br>"+"<strong>N° de Comprobande de venta:</strong>"+Num_comprobante+"<br>"+"<br>"+"<strong>Ejercicio Fis: </strong>"+ejericio_fisical;
               clone.find('[id=total]')[0].innerHTML=total;
        clone.find('[id=total]')[1].innerHTML=total;
        
//               switch (e.dscertret.certret[0].certretdet.length) {
//    case 0:
//        clone.find('[id=total]')[0].innerHTML="<br>"+"<br>"+"<br>"+"<br>"+"<br>"+"<br>"+total;
//        clone.find('[id=total]')[1].innerHTML="<br>"+"<br>"+"<br>"+"<br>"+"<br>"+"<br>"+total;
//        break;
//    case 1:
//         clone.find('[id=total]')[0].innerHTML="<br>"+"<br>"+"<br>"+"<br>"+"<br>"+"<br>"+total;
//         clone.find('[id=total]')[1].innerHTML="<br>"+"<br>"+"<br>"+"<br>"+"<br>"+"<br>"+total;
//        break;
//    case 2:
//      clone.find('[id=total]')[0].innerHTML="<br>"+"<br>"+"<br>"+"<br>"+"<br>"+total;
//      clone.find('[id=total]')[1].innerHTML="<br>"+"<br>"+"<br>"+"<br>"+"<br>"+total;
//        break;
//    case 3:
//        clone.find('[id=total]')[0].innerHTML="<br>"+"<br>"+"<br>"+"<br>"+total;
//        clone.find('[id=total]')[1].innerHTML="<br>"+"<br>"+"<br>"+"<br>"+total;
//        break;
//    case 4:
//        clone.find('[id=total]')[0].innerHTML="<br>"+"<br>"+"<br>"+total;
//        clone.find('[id=total]')[1].innerHTML="<br>"+"<br>"+"<br>"+total;
//        break;
//    case 5:
//        clone.find('[id=total]')[0].innerHTML="<br>"+"<br>"+total;
//        clone.find('[id=total]')[1].innerHTML="<br>"+"<br>"+total;
//        break;
//    case 6:
//        clone.find('[id=total]')[0].innerHTML="<br>"+total;
//        clone.find('[id=total]')[1].innerHTML="<br>"+total;
//        break;
//        
//   
//}
                clone.find('[id=retencion]')[0].innerHTML="";
                clone.find('[id=codigo]')[0].innerHTML="";
                clone.find('[id=base]')[0].innerHTML="";
                clone.find('[id=porcentaje]')[0].innerHTML="";
                clone.find('[id=valor]')[0].innerHTML="";

                clone.find('[id=retencion]')[1].innerHTML="";
                clone.find('[id=codigo]')[1].innerHTML="";
                clone.find('[id=base]')[1].innerHTML="";
                clone.find('[id=porcentaje]')[1].innerHTML="";
                clone.find('[id=valor]')[1].innerHTML="";
                for (j = 0; j< e.dscertret.certret[i].certretdet.length; j++){
    
                var Tip_Retencion = e.dscertret.certret[i+1].certretdet[j].v_nom;
                var Codigo = e.dscertret.certret[i+1].certretdet[j].timp;
                var Base = e.dscertret.certret[i+1].certretdet[j].v_valor1;
                var Porc_retencion = e.dscertret.certret[i+1].certretdet[j].v_cpt;
                var V_Retenido = e.dscertret.certret[i+1].certretdet[j].v_valor;

                
                clone.find('[id=retencion]')[0].innerHTML+=Tip_Retencion+"<br>";
                clone.find('[id=codigo]')[0].innerHTML+=Codigo+"<br>";
                clone.find('[id=base]')[0].innerHTML+=Base+"<br>";
                clone.find('[id=porcentaje]')[0].innerHTML+=Porc_retencion+"<br>";
                clone.find('[id=valor]')[0].innerHTML+=V_Retenido+"<br>";

                clone.find('[id=retencion]')[1].innerHTML+=Tip_Retencion+"<br>";
                clone.find('[id=codigo]')[1].innerHTML+=Codigo+"<br>";
                clone.find('[id=base]')[1].innerHTML+=Base+"<br>";
                clone.find('[id=porcentaje]')[1].innerHTML+=Porc_retencion+"<br>";
                clone.find('[id=valor]')[1].innerHTML+=V_Retenido+"<br>";
               
                
            }

                     clone.find('[id]');
//                    clone.find('[id=tdsuperior1]').remove();
//                    clone.find('[id=tdsuperior3]').empty();
//                    clone.find('[id=tdsuperior5]').empty();
                var x=i+1;
                $("#Pag"+x).append(clone);
                
               
            }
}
else{
    llenar(e);
}

}
    

function servicio(){
    var parametros = sessionStorage.getItem("Parametros_Pdf");
    
    var consultarUsr = new sirImpresion();
    var urlservicio = consultarUsr.getUrlSir();
    if(parametros)
    {
    $.ajax({
             
            type: "POST",        
            async: false,
            data: parametros,
            url: urlservicio,
            dataType: "json",        
            contentType: "application/json;",
            success: function (resp) {
                if((resp.dscertret.eeEstados[0].Estado)=="OK")
                {
                 var i=0;
                    for (i = 0; i< resp.dscertret.certret.length; i++){
                        
                         var nombre = resp.dscertret.certret[i].ter_raz;
                         var direccion = resp.dscertret.certret[i].ter_dir;
                         var direccion1=direccion.replace("\u008d\u0081", "ñ").replace("æ","Ñ").replace("Ã‘","Ñ").replace("Ã‘","Ñ") ;
                         var rest=nombre.replace("\u008d\u0081", "ñ").replace("æ","Ñ").replace("Ã‘","Ñ").replace("Ã‘","Ñ") ;                        
                         resp.dscertret.certret[i].ter_raz=rest;
                         resp.dscertret.certret[i].ter_dir=direccion1;
                         
                    }
                    
                 
                  
                  evaluar(resp);
                 
                }
                else   
                {  
                    alert("Error"+resp.dsparam_proc_vac.eeEstados["0"].Estado);   
                } 
            } 
            
        });       
    }else
    {
        
    }
 
    
}
    function buscar(){
   
   
   var consultarUsr = new sirImpresion();
   var data = consultarUsr.getjson();
  
   
   data.dscertret.Sircertret[0].piiretdesde= $("#desde")[0].value;
   data.dscertret.Sircertret[0].piirethasta= $("#hasta")[0].value;
   data.dscertret.Sircertret[0].pidfecimpr= $("#fecha")[0].value;
   sessionStorage.setItem("Parametros_Pdf",JSON.stringify(data));
   location.reload();       
    servicio();
}
    $(document).ready(function() {
       document.body.style.zoom="100%";
       var scale = 'scale(1)';
document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
 document.body.style.msTransform =   scale;       // IE 9
 document.body.style.transform = scale;  
        
        $("#fecha").kendoDatePicker({
             format: "yyyy/MM/dd"
        });
        $("#paper").kendoDropDownList({
          change: function() {
            $(".pdf-page")
              .removeClass("size-a4")
              .removeClass("size-letter")
              .removeClass("size-executive")
              .addClass(this.value());
          }
        });
    servicio();       
    });