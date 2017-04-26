/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(window).resize(function () {
    var viewportHeight = $(window).height();    
    $('#outerWrapper').height(viewportHeight - 100);     
});


$(document).ready(function() { 
  
    var objData = new sirData();    
    var jsonSIRData = objData.getjson();
    var urlData = objData.getUrlSir();
    var mapData = objData.getmapSir()
    
    $.ajax({
        async: false, 
        type: "POST",
        data: JSON.stringify(jsonSIRData),
        url: urlData,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){         
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK")) {            
            datosGrilla = e[key1][mapData];
        } else {
            alertDialogs(e[key1].eeEstados[0].Estado);
        } 
    });    


    var obj = new dsSIRinitial();    
    var jsonSIR = obj.getjson();
    var url = obj.getUrlSir();
    
    $.ajax({
        async: false, 
        type: "POST",
        data: JSON.stringify(jsonSIR),
        url: url,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){                 
        var key1 = Object.keys(e)[0];      
        if ((e[key1].eeEstados[0].Estado === "OK")) {            
            sessionStorage.setItem("dsSIRinitial", JSON.stringify(e))
            for(var i=0; i< e[key1].eesic_forms.length; i++){
                if(e[key1].eesic_forms[i].forms_nom === "grilla"){  
                    document.getElementById('lbfuncion').innerHTML =  e[key1].eesic_forms[i].titulo;
                    grid(e[key1].eesic_forms[i], datosGrilla, e[key1].eesic_forms[i].forms_nom); 
                    if(e[key1].eesic_forms[i+1].forms_nom === "grillaDetalle"){  
                        sessionStorage.setItem("esCabeceraDetalle", true);
                    }else{
                        sessionStorage.setItem("esCabeceraDetalle", false);
                    }
                }                
            }
        } else {
            alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
        } 
    });    
});

function crearElemento(){
    
    var verbo = "POST"
    
    if($("#buttonCab")["0"].childNodes["0"].data=== "Actualizar"){
        verbo = "PUT"
    }  
    
    var objData = new SICUDForms();    
    var jsonSIRData = objData.getjson();
    var urlData = objData.getUrlSir();
    var mapData = objData.getmapSir();
       
    var key1 = Object.keys(jsonSIRData)[0];
    var key2 = Object.keys(jsonSIRData[key1])[1];
    
    jsonSIRData[key1][key2][0].cap_cod = $("#popUpCabecera").find("#cap_cod").val();
    jsonSIRData[key1][key2][0].forms_editable = $("#popUpCabecera").find("#forms_editable").val();
    jsonSIRData[key1][key2][0].forms_filterable = $("#popUpCabecera").find("#forms_filterable").val();
    jsonSIRData[key1][key2][0].forms_nom = $("#popUpCabecera").find("#forms_nom").val();
    jsonSIRData[key1][key2][0].forms_num = $("#popUpCabecera").find("#forms_num").val();
    jsonSIRData[key1][key2][0].forms_scrollable = $("#popUpCabecera").find("#forms_scrollable").val();
    jsonSIRData[key1][key2][0].forms_selectable = $("#popUpCabecera").find("#forms_selectable").val();
    jsonSIRData[key1][key2][0].forms_sorteable = $("#popUpCabecera").find("#forms_sorteable").val();
    jsonSIRData[key1][key2][0].fun_cod = $("#popUpCabecera").find("#fun_cod").val();
    jsonSIRData[key1][key2][0].por_cod = $("#popUpCabecera").find("#por_cod").val();
    jsonSIRData[key1][key2][0].titulo = $("#popUpCabecera").find("#titulo").val();
    
    $.ajax({
        async: false, 
        type: verbo,
        data: JSON.stringify(jsonSIRData),
        url: urlData,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){         
        var key1 = Object.keys(e)[0];
        var key2 = Object.keys(jsonSIRData[key1])[1];
        if ((e[key1].eeEstados[0].Estado === "OK")) {                        
            cerrarCustomPopUp('popUpCabecera');
            $("#buttonCab")["0"].childNodes["0"].data=== "Guardar"        
            item = e[key1][key2]["0"];
            if(verbo === "PUT"){
               //item = e[key1][key2]["0"];
               cargarDatos(item, "label");
            }else{                
                if(sessionStorage.getItem("esCabeceraDetalle")){
                    editarElemento(); 
                }
            }
        } else {
            alertDialogs(e[key1].eeEstados[0].Estado);
        }
    });    
}

function editarElemento(e){     
    
    if(e){
        e.preventDefault();
        var divGrilla = e.delegateTarget.id
        var grilla = $("#"+divGrilla).data("kendoGrid");
        item = grilla.dataItem(grilla.select());        
    }    
    
    var esCabeceraDetalle = sessionStorage.getItem("esCabeceraDetalle");
    if(esCabeceraDetalle==="true"){        
        document.getElementById('divGrillaPrincipal').style.display = 'none';
        document.getElementById('divCabeceraDetalle').style.display = 'block';       
        crearTabla("popUpCabecera", "divCabecera", "label");
        cargarDatos(item, "label");
        var jsondsSIRinitial= JSON.parse(sessionStorage.getItem("dsSIRinitial"))
        for(var i=0; i< jsondsSIRinitial.dsSIRinitial.eesic_forms.length; i++){
            if(jsondsSIRinitial.dsSIRinitial.eesic_forms[i].forms_nom === "grillaDetalle"){
                
                var objData = new sirDataDetalle();    
                var jsonSIRDataDetalle = objData.getjson();
                var urlDataDetalle = objData.getUrlSir();
                var mapDataDetalle = objData.getmapSir();
                
                var key1 = Object.keys(jsonSIRDataDetalle)[0];
                var key2 = Object.keys(jsonSIRDataDetalle[key1])[1];

                jsonSIRDataDetalle[key1][key2][0].cap__cod = item.cap_cod;
                jsonSIRDataDetalle[key1][key2][0].fun__cod = item.fun_cod;
                jsonSIRDataDetalle[key1][key2][0].por__cod = item.por_cod;
                jsonSIRDataDetalle[key1][key2][0].forms__num = item.forms_num;
        
                $.ajax({
                    async: false, 
                    type: "POST",
                    data: JSON.stringify(jsonSIRDataDetalle),
                    url: urlDataDetalle,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (e) {  
                        
                    } 
                }).done(function(e){     
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK")) {            
                        datosGrillaDetalle = e[key1][mapDataDetalle];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    } 
                });
                grid(jsondsSIRinitial.dsSIRinitial.eesic_forms[i], datosGrillaDetalle , "gridDetalle"); 
            }
        }        
    }else{
        document.getElementById('lbAccion').innerHTML = "Editar";
        abrirCustomPopUp("popUpCabecera", "popUpCabecera", "input");        
        $("#buttonCab")["0"].childNodes["0"].data= "Actualizar";
        cargarDatos(item, "input");
    }    
}

function borrarElemento(e){    
    e.preventDefault();
    var divGrilla = e.delegateTarget.id
    var grilla = $("#"+divGrilla).data("kendoGrid");
    var item = grilla.dataItem(grilla.select());
    
    var objData = new SICUDForms();    
    var jsonSIRData = objData.getjson();
    var urlData = objData.getUrlSir();
    var mapData = objData.getmapSir();
       
    var key1 = Object.keys(jsonSIRData)[0];
    var key2 = Object.keys(jsonSIRData[key1])[1];
    
    jsonSIRData[key1][key2][0].cap_cod = item.cap_cod;
    jsonSIRData[key1][key2][0].forms_editable = item.forms_editable;
    jsonSIRData[key1][key2][0].forms_filterable = item.forms_filterable;
    jsonSIRData[key1][key2][0].forms_nom = item.forms_nom;
    jsonSIRData[key1][key2][0].forms_num = item.forms_num;
    jsonSIRData[key1][key2][0].forms_scrollable = item.forms_scrollable;
    jsonSIRData[key1][key2][0].forms_selectable = item.forms_selectable;
    jsonSIRData[key1][key2][0].forms_sorteable = item.forms_sorteable;
    jsonSIRData[key1][key2][0].fun_cod = item.fun_cod;
    jsonSIRData[key1][key2][0].por_cod = item.por_cod;
    jsonSIRData[key1][key2][0].titulo = item.titulo;
    
    $.ajax({
        async: false, 
        type: "DELETE",
        data: JSON.stringify(jsonSIRData),
        url: urlData,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){         
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK")) {                        
            location.reload();
        } else {
            alertDialogs(e[key1].eeEstados[0].Estado);
        }
    });
}

function borrarElementoDet(e){
    
    e.preventDefault();
    var divGrilla = e.delegateTarget.id
    var grilla = $("#"+divGrilla).data("kendoGrid");
    var item = grilla.dataItem(grilla.select());
    
    var objData = new SICUDFormsCol();    
    var jsonSIRData = objData.getjson();
    var urlData = objData.getUrlSir();
    var mapData = objData.getmapSir();
       
    var key1 = Object.keys(jsonSIRData)[0];
    var key2 = Object.keys(jsonSIRData[key1])[1];

    jsonSIRData[key1][key2][0].cap_cod = item.cap_cod;
    jsonSIRData[key1][key2][0].fun_cod = item.fun_cod;
    jsonSIRData[key1][key2][0].por_cod = item.por_cod;
    jsonSIRData[key1][key2][0].forms_num = item.forms_num;
    jsonSIRData[key1][key2][0].cmp_dsc = item.cmp_dsc;
    jsonSIRData[key1][key2][0].cmp_edi = item.cmp_edi;
    jsonSIRData[key1][key2][0].cmp_lec = item.cmp_lec;
    jsonSIRData[key1][key2][0].cmp_nom = item.cmp_nom;
    jsonSIRData[key1][key2][0].cmp_nom2 = item.cmp_nom2;
    jsonSIRData[key1][key2][0].cmp_req = item.cmp_req;
    jsonSIRData[key1][key2][0].cmp_tip = item.cmp_tip;
    jsonSIRData[key1][key2][0].cmp_vis = item.cmp_vis;
    jsonSIRData[key1][key2][0].idinterno = item.idinterno;     
    
    $.ajax({
        async: false, 
        type: "DELETE",
        data: JSON.stringify(jsonSIRData),
        url: urlData,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){    
        
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK")) {                        
            recargarGrillaDetalle(divGrilla)           
        } else {
            alertDialogs(e[key1].eeEstados[0].Estado);
        }
    });    
}

function editarElementoDet(e){    
    e.preventDefault();
    var divGrilla = e.delegateTarget.id
    var grilla = $("#"+divGrilla).data("kendoGrid");
    var item = grilla.dataItem(grilla.select());
    
    document.getElementById('lbAccion').innerHTML = "Editar";
    abrirCustomPopUp("popUpDetalle", "popUpDetalle", "input");        
    $("#buttonCrearDet")["0"].childNodes["0"].data= "Actualizar";
    cargarDatos(item, "input");
}

function cambiarEstado(e){
    alertDialogs("cambiarEstado");
}

function buscarElementos(){
    
    $("#grilla")["0"].clientHeight=0;
    $("#grilla").empty();
    
    
    var objData = new sirData();    
    var jsonSIRData = objData.getjson();
    var urlData = objData.getUrlSir();
    var mapData = objData.getmapSir();
       
    var key1 = Object.keys(jsonSIRData)[0];
    var key2 = Object.keys(jsonSIRData[key1])[1];
    
    jsonSIRData[key1][key2][0].cap__cod = $("#popUpBusqueda").find("#cap_cod").val();
    jsonSIRData[key1][key2][0].fun__cod = $("#popUpBusqueda").find("#fun_cod").val();
    jsonSIRData[key1][key2][0].por__cod = $("#popUpBusqueda").find("#por_cod").val();
    
    $.ajax({
        async: false, 
        type: "POST",
        data: JSON.stringify(jsonSIRData),
        url: urlData,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){         
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK")) {            
            datosGrilla = e[key1][mapData];
            var jsondsSIRinitial= JSON.parse(sessionStorage.getItem("dsSIRinitial"))
            for(var i=0; i< jsondsSIRinitial.dsSIRinitial.eesic_forms.length; i++){        
                if(jsondsSIRinitial.dsSIRinitial.eesic_forms[i].forms_nom === "grilla"){  
                    grid(jsondsSIRinitial.dsSIRinitial.eesic_forms[i], datosGrilla, jsondsSIRinitial.dsSIRinitial.eesic_forms[i].forms_nom);                     
                }                
            }
            cerrarCustomPopUp('popUpBusqueda');
        } else {
            alertDialogs(e[key1].eeEstados[0].Estado);
        }
    });    
}

function crearElementoDet(e){ 
    
    var verbo = "POST"
    
    if($("#buttonCrearDet")["0"].childNodes["0"].data=== "Actualizar"){
        verbo = "PUT"
    }  
    
    var objData = new SICUDFormsCol();    
    var jsonSIRData = objData.getjson();
    var urlData = objData.getUrlSir();
    var mapData = objData.getmapSir();
       
    var key1 = Object.keys(jsonSIRData)[0];
    var key2 = Object.keys(jsonSIRData[key1])[1];
    debugger
    jsonSIRData[key1][key2][0].cap_cod = $("#popUpDetalle").find("#cap_cod").val();
    jsonSIRData[key1][key2][0].fun_cod = $("#popUpDetalle").find("#fun_cod").val();
    jsonSIRData[key1][key2][0].por_cod = $("#popUpDetalle").find("#por_cod").val();
    jsonSIRData[key1][key2][0].forms_num = $("#popUpDetalle").find("#forms_num").val();    
    jsonSIRData[key1][key2][0].cmp_dsc = $("#popUpDetalle").find("#cmp_dsc").val();
    jsonSIRData[key1][key2][0].cmp_edi = $("#popUpDetalle").find("#cmp_edi").val();
    jsonSIRData[key1][key2][0].cmp_lec = $("#popUpDetalle").find("#cmp_lec").val();
    jsonSIRData[key1][key2][0].cmp_nom = $("#popUpDetalle").find("#cmp_nom").val();
    jsonSIRData[key1][key2][0].cmp_nom2 = $("#popUpDetalle").find("#cmp_nom2").val();
    jsonSIRData[key1][key2][0].cmp_req = $("#popUpDetalle").find("#cmp_req").val();
    jsonSIRData[key1][key2][0].cmp_tip = $("#popUpDetalle").find("#cmp_tip").val();
    jsonSIRData[key1][key2][0].cmp_vis = $("#popUpDetalle").find("#cmp_vis").val();
    jsonSIRData[key1][key2][0].idinterno = $("#popUpDetalle").find("#idinterno").val();    
    
    $.ajax({
        async: false, 
        type: verbo,
        data: JSON.stringify(jsonSIRData),
        url: urlData,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {  
            
        } 
    }).done(function(e){         
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK")) {                        
            cerrarCustomPopUp('popUpDetalle');
            $("#buttonCrearDet")["0"].childNodes["0"].data=== "Guardar"
            recargarGrillaDetalle("grillaDetalle")
        } else {
            alertDialogs(e[key1].eeEstados[0].Estado);
        }
    });
}

function recargarGrillaDetalle(divGrilla){
    
   $("#"+divGrilla).empty();
   
    var jsondsSIRinitial= JSON.parse(sessionStorage.getItem("dsSIRinitial"))
        for(var i=0; i< jsondsSIRinitial.dsSIRinitial.eesic_forms.length; i++){
            if(jsondsSIRinitial.dsSIRinitial.eesic_forms[i].forms_nom === "grillaDetalle"){
                
                var objData = new sirDataDetalle();    
                var jsonSIRDataDetalle = objData.getjson();
                var urlDataDetalle = objData.getUrlSir();
                var mapDataDetalle = objData.getmapSir();
                
                var key1 = Object.keys(jsonSIRDataDetalle)[0];
                var key2 = Object.keys(jsonSIRDataDetalle[key1])[1];

                jsonSIRDataDetalle[key1][key2][0].cap__cod = item.cap_cod;
                jsonSIRDataDetalle[key1][key2][0].fun__cod = item.fun_cod;
                jsonSIRDataDetalle[key1][key2][0].por__cod = item.por_cod;
                jsonSIRDataDetalle[key1][key2][0].forms__num = item.forms_num;
        
                $.ajax({
                    async: false, 
                    type: "POST",
                    data: JSON.stringify(jsonSIRDataDetalle),
                    url: urlDataDetalle,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (e) {  
                        
                    } 
                }).done(function(e){     
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK")) {            
                        datosGrillaDetalle = e[key1][mapDataDetalle];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    } 
                });
                grid(jsondsSIRinitial.dsSIRinitial.eesic_forms[i], datosGrillaDetalle , "gridDetalle"); 
            }
        }
}