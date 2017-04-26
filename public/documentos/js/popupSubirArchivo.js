
$(document).ready(function() {
    
    $("#fileInput").kendoUpload({        
    });
     
    var base64;
    var fileInput = document.getElementById('fileInput');
    
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        
        reader.onload = function(e) {            
            base64 = reader.result;
            subirArchivo(base64,file);
        }        
        reader.readAsDataURL(file);	        
    });
});

function subirArchivo(base64, file){
    
    base64 = base64.replace(/data:[a-z]+\/[a-z]+;base64,/g, "");
    
    var obj = new subirArchivos();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    //var mapData = obj.getMapData(); 
    
    var key1 = Object.keys(json)[0];
    var key2 = Object.keys(json[key1])[1];                            
    json[key1][key2][0].pirfile = base64;
    json[key1][key2][0].picfilename = file.name;
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(json),
        url: url,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {             
            
        } 
    }).done(function(e){        
        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {            
            parent.closePopUpSubirArchivo("Archivo subido correctamente");
        } else {
            alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
        }       
    });
}
