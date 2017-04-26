/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function metodEventClickNoticacion(metodo){
    eval(metodo)();
}

function goLinkProcesos(){
    document.getElementById("imgProcesos").click();
}

function goLinkNotificaciones(){
    document.getElementById("imgNotificaciones").click();
}

function blinkNotificaciones(){
    $("#imgNotificaciones").addClass("parpadea text");
}