$(document).ready(function () {
//    
//    funcion para crear elementos del pop up, se crea el primer for para crear 
//    todos los elementos del servicio, segundo for deja habilidatos los roles que
//    estan asigandos a ese usuario.
//    
    var usr_name = sessionStorage.getItem("Userid_bpm"); 
    
    document.getElementById("demo1").innerHTML = usr_name;
    var Bpm_grp =sessionStorage.getItem("Bpm_grp");  
    var Bpm_id =sessionStorage.getItem("Bpm_id"); 
    var cbh = document.getElementById('roles'); 
        
        var consultarusr = new sirRoles();
        var datajson = consultarusr.getjson();
        var urlServiceusr = consultarusr.getUrlSir();
        

        datajson.dsSIRbpm_rol.SIRbpm_rol[0].picproc__name = Bpm_id;
          datajson.dsSIRbpm_rol.SIRbpm_rol[0].picgrp__name = Bpm_grp;
        
        
        var Jsonbpm1;
                                     
            $.ajax({       
            type: "POST",        
            async: false,
            data: JSON.stringify(datajson),
            url: urlServiceusr,
            dataType: "json",        
            contentType: "application/json;",
            complete: function(resp){
                var Jsonbpm1  = JSON.parse(resp.responseText);
                 var Json_usr = JSON.stringify(Jsonbpm1); 
                        sessionStorage.setItem("Json_Usrbpm2",Json_usr); 
            }        
        });
        
        var json2 = sessionStorage.getItem("Json_Usrbpm2");
        json2 = JSON.parse(json2);
        var Roles = json2.dsSIRbpm_rol.eebpm_rol;
        var i = 0;
        var j=1;
        for (i  in Roles ){
        crearDiv("divFiltr" + i, "K"+j+"-Container");
        crearImg("divFiltr" + i,Roles[i].rol__name+Roles[i].piiregrol );
        crearSpan("divFiltr" + i, Roles[i].rol__name);
        if (j == 3) {
            j = 1;
        } else {
            j++;
        }
    } 
    
    
    
    var Roles1 = sessionStorage.getItem("Json_Usrbpm1"); 
    var Roles1 = JSON.parse(Roles1);
    var Roles1 = Roles1.eebpm_rol;
    for (i  in Roles1){
        if(Roles1[i].grp__name === Bpm_grp){
            if(Roles1[i].proc__name === Bpm_id){
                $("#"+Roles1[i].rol__name+Roles1[i].piiregrol)
                        .removeClass('k-sprite re_bullet1off').addClass('k-sprite po_bullet1');
            }
        }            
    }
    function  crearLabel(id, titulo, div, fuente, color, tipo) {
        var newlabel = document.createElement("Label");
        newlabel.id = id;
        newlabel.setAttribute("for", "text" + id);
        newlabel.style.textAlign = "bottom";   
        newlabel.style.font = fuente;
        newlabel.innerHTML = titulo;
        document.getElementById(div).appendChild(newlabel);
    }
        $("#btnSave").kendoButton({
        click: borrar,
        
    });
    
    function borrar(){
        parent.errorPopUp1();
        
    }
    
    
    
});
function crearImg(div, id) {
    var x = document.createElement("SPAN");
    x.setAttribute("class", " k-sprite re_bullet1off");
    x.setAttribute("id", id);
    x.setAttribute("estado", "off");
    x.setAttribute("onclick", "Click(\'" + id + "\')");
    document.getElementById(div).appendChild(x);
}
function crearSpan(div, titulo) {
    var x = document.createElement("SPAN");
    var t = document.createTextNode(titulo);
    x.appendChild(t);
    document.getElementById(div).appendChild(x);
}
function crearDiv(id, div, clase, align, style) {
    var newDiv = document.createElement("DIV");
    newDiv.setAttribute("align", align);
    newDiv.setAttribute("class", clase);
    newDiv.setAttribute("style", style);
    newDiv.id = id;
    document.getElementById(div).appendChild(newDiv);
}
function Click(e){
    var estado = document.getElementById(e).getAttribute("estado");
    if(estado === "off"){
        $("#"+e).removeClass('k-sprite re_bullet1off').addClass('k-sprite po_bullet1');
        document.getElementById(e).setAttribute("estado", "on");
        var usr_name = sessionStorage.getItem("Userid_bpm"); 
        var NIT = sessionStorage.getItem("companyNIT");
        var Bpm_grp =sessionStorage.getItem("Bpm_grp");  
        var Bpm_id =sessionStorage.getItem("Bpm_id"); 
        var consultarUsr = new cudUsrBpm();
        var datajsonusr = consultarUsr.getjson();
        var urlServiceusr = consultarUsr.getUrlSir();
        var rol_name = e.replace(/[0-9]/g ,"");
        datajsonusr.dsSICUDbpm_user.eebpm_user[0].usr__cod = usr_name + "_" + NIT;
        datajsonusr.dsSICUDbpm_user.eebpm_user[0].grp__name = Bpm_grp;  
        datajsonusr.dsSICUDbpm_user.eebpm_user[0].proc__name = Bpm_id ; 
        datajsonusr.dsSICUDbpm_user.eebpm_user[0].rol__name = rol_name; 
        $.ajax({       
            type: "POST",        
            async: false,
            data: JSON.stringify(datajsonusr),
            url: urlServiceusr,
            dataType: "json",        
            contentType: "application/json;",
            complete: function(resp){
                var Jsonbpm1  = JSON.parse(resp.responseText);
                alert(Jsonbpm1.dsSICUDbpm_user.eeEstados[0].Estado);
            }        
        });
    }else{
        $("#"+e).removeClass(' k-sprite po_bullet1').addClass('k-sprite re_bullet1off');
        document.getElementById(e).setAttribute("estado", "off");
    }
}