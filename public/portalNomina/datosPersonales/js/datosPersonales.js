
function cargarDatos(e){debugger
    
document.getElementById('apellidos').value=e[0].apellidos;
document.getElementById('nombres').value=e[0].nombres;
document.getElementById('idempleado').value=e[0].idempleado;
document.getElementById('clase').value=e[0].clase;
document.getElementById('codempleado').value=e[0].codempleado;
document.getElementById('ciudadexp').value=e[0].ciudadexp;
document.getElementById('fecnacimiento').value=e[0].fecnacimiento;
document.getElementById('Lugarnacimiento').value=e[0].Lugarnacimiento;
document.getElementById('genero').value=e[0].genero;
document.getElementById('libretamilitar').value=e[0].libretamilitar;
document.getElementById('estadocivil').value=e[0].estadocivil;
document.getElementById('personacargo').value=e[0].personacargo;
document.getElementById('direccion').value=e[0].direccion;
document.getElementById('telefono').value=e[0].telefono;
document.getElementById('ciudad').value=e[0].ciudad;
document.getElementById('jornada').value=e[0].jornada;
document.getElementById('sucagencia').value=e[0].sucagencia;
document.getElementById('ctoactividad').value=e[0].ctoactividad;
document.getElementById('cargo').value=e[0].cargo;
document.getElementById('clasecontrato').value=e[0].clasecontrato;
document.getElementById('etapaaprendiz').value=e[0].etapaaprendiz;
document.getElementById('fechaingreso').value=e[0].fechaingreso;
document.getElementById('fincontrato').value=e[0].fincontrato;
document.getElementById('indicadoregimen').value=e[0].indicadoregimen;
document.getElementById('clasesalario').value=e[0].clasesalario;
document.getElementById('sueldo').value=e[0].sueldo;
document.getElementById('vigenciasalario').value=e[0].vigenciasalario;
document.getElementById('causalretiro').value=e[0].causalretiro;
document.getElementById('descripcion').value=e[0].descripcion;
document.getElementById('cajacompensacion').value=e[0].cajacompensacion;
document.getElementById('fondosalud').value=e[0].fondosalud;
document.getElementById('fechafondosalud').value=e[0].fechafondosalud;
document.getElementById('Fondopensiones').value=e[0].Fondopensiones;
document.getElementById('fechapensiones').value=e[0].fechapensiones;
$("body").find( "input" ).prop('readonly', true);
    
}

function cargarSir(){
    
    try {
  var consultar = new sirDatosPersonales();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();   
    $.ajax({
        
                    type: "POST",        
                    async: false,
                    data: JSON.stringify(datajson),
                    url: urlService,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {debugger
                        if((resp.dsConsultadatospersonales.eeEstados[0].Estado)=="OK")
                        {     
                           
                          cargarDatos(resp.dsConsultadatospersonales.ttconsultadatospersonales);
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsConsultadatospersonales.eeEstados[0].Estado); 
                                                     
                        }
                    } 
        
                }); 
    
}
catch(err) {
    alertDialogs("Error"+err);  
}
    

            
}

$(document).ready(function () {

cargarSir();
});
