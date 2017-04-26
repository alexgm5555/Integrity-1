$(document).ready(function() {    
    $.getJSON( "../json/vacaciones.json", function( json ) {        
        document.getElementById("tooltips").style="background: url('../images/"+json.nombre+".jpeg') no-repeat 0 0; width:"+json.width+"; height:"+json.height        
        
        for(var i=0; i<json.tooltips.length; i++){
            var tooltip = "<a id='"+json.tooltips[i].id+"' href='#' title='"+json.tooltips[i].title+"' style='top: "+json.tooltips[i].top+"; left: "+json.tooltips[i].left+"; width: "+json.tooltips[i].width+"; height: "+json.tooltips[i].height+"; border-radius: "+json.tooltips[i].borderRadios+";'></a>"; 
            $("#tooltips").append(tooltip);
        }
    });
    
    var tooltip = $("#tooltips").kendoTooltip({
        filter: "a",
        width: 200,
        position: "top"
    }).data("kendoTooltip");
    
    $("#tooltips").find("a").click(false);
});