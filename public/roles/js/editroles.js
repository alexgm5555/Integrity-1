

function ir_roles(){
    
    
    window.location = ("roles.html");
    
}

$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#arbol1').height(viewportHeight - 500);
   
});

$(document).ready(function() {debugger


$('body').css('display', 'none');

$('body').fadeIn(1000);

 $("#arbol1").load("tree2.html"); 
 $("#arbol2").load("tree3.html"); 

  var rol_name = sessionStorage.getItem("Rolname");  
  var rol_cod = sessionStorage.getItem("Idrol");  
 
document.getElementById("filtro").value = rol_name;

var jSon=[];

function agregarfuncion(e) {
     
var Selement=$('#jstree2').jstree('get_selected');

   var arreglo=Selement; 
   var i=0;
   var j=0;
       
    var  servicio = new addfuciones();
var json = servicio.getjson();
var urlservice = servicio.getUrlSir();
//   var json = new Object();
//   json.dsFunciones = [];
//    json.dsFunciones.funciones=[];
   
    var array1 =[];
for(var i = 0; i < Selement.length; i++ ){
		var portafolio = Selement[i].split('P');
		var capitulo = portafolio[1].split('C');
		
 if(Selement[i].indexOf('F')!== -1){
        var array = {};
        var funcion = capitulo[capitulo.length-1].split('F');
       array.piifuncion = parseInt(funcion[0]);      
       array.piicapitulo = parseInt(capitulo[capitulo.length-2]);
       array.piiportafolio = parseInt(portafolio[0]);
       array.piirol = parseInt(rol_cod);
        array1.push(array);
 }
 else if (Selement[i].indexOf('C')!== -1){
var array = {};
	    array.piiportafolio = parseInt(portafolio[0]);	
            array.piicapitulo = parseInt(capitulo[capitulo.length-2]);
            array.piifuncion = 0;
            array.piirol = parseInt(rol_cod);
            array1.push(array);    
        }
            
 else if (Selement[i].indexOf('P')!== -1){
		var array = {};
                array.piirol =  parseInt(rol_cod);
		array.piiportafolio = parseInt(portafolio[0]);
                array.piicapitulo = 0;
                array.piifuncion = 0;
                array1.push(array);
 }
 

}
json.dsFunciones.funciones=array1;  
      

    $.ajax({
        
        type: "POST",        
        async: false,
        data: JSON.stringify(json),
        url: urlservice,
        dataType: "json",
        
        contentType: "application/json;",
        success: function (resp) {  
            
        }        
        });
        $("#arbol2").load("tree3.html");        
        $("#arbol1").load("tree2.html"); 
       
   }

    

    

           
    



function eliminarfuncion(e) {
var Selement=$('#jstree3').jstree('get_selected');

   var arreglo=Selement; 
   var i=0;
   var j=0;
       
    var  servicio = new addfuciones();
var json = servicio.getjson();
var urlservice = servicio.getUrlSir();

   
    var array1 =[];
for(var i = 0; i < Selement.length; i++ ){
		var portafolio = Selement[i].split('P');
		var capitulo = portafolio[1].split('C');
		
 if(Selement[i].indexOf('F')!== -1){
        var array = {};
        var funcion = capitulo[capitulo.length-1].split('F');
       array.piifuncion = parseInt(funcion[0]);      
       array.piicapitulo = parseInt(capitulo[capitulo.length-2]);
       array.piiportafolio = parseInt(portafolio[0]);
       array.piirol = parseInt(rol_cod);
        array1.push(array);
 }
 else if (Selement[i].indexOf('C')!== -1){
var array = {};
	    array.piiportafolio = parseInt(portafolio[0]);	
            array.piicapitulo = parseInt(capitulo[capitulo.length-2]);
            array.piifuncion = 0;
            array.piirol = parseInt(rol_cod);
            array1.push(array);    
        }
            
 else if (Selement[i].indexOf('P')!== -1){
		var array = {};
                array.piirol =  parseInt(rol_cod);
		array.piiportafolio = parseInt(portafolio[0]);
                array.piicapitulo = 0;
                array.piifuncion = 0;
                array1.push(array);
 }
 
}
json.dsFunciones.funciones=array1;  
       
displayLoading("#cargando");
    $.ajax({
        
        type: "DELETE",        
        async: false,
        data: JSON.stringify(json),
        url: urlservice,
        dataType: "json",

        contentType: "application/json;",
        success: function (resp) {  
        
        }
        }).done(function () {
      closeLoading("#cargando");
    });
         
        $("#arbol2").load("tree3.html");        
        $("#arbol1").load("tree2.html"); 

} 
 
 
$("#botonagregar").kendoButton({
                        click: agregarfuncion
                       
                        
                    });
$("#botoneliminar").kendoButton({
    click: eliminarfuncion
         });              



$('.link').click(function() {

event.preventDefault();

newLocation = this.href;

$('body').fadeOut(1000, newpage);

});

function newpage() {

window.location = newLocation;

}

});
