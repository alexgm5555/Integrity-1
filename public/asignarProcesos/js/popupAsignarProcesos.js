/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    
    var dsSIRbpm_mpr = new Object();
    dsSIRbpm_mpr.dsSIRbpm_mpr = new Object();
    dsSIRbpm_mpr.dsSIRbpm_mpr.eeDatos = new Array();
    dsSIRbpm_mpr.dsSIRbpm_mpr.eeDatos[0] = new Object();
    dsSIRbpm_mpr.dsSIRbpm_mpr.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    dsSIRbpm_mpr.dsSIRbpm_mpr.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");        
    dsSIRbpm_mpr.dsSIRbpm_mpr.SIRbpm_mpr = new Array();
    dsSIRbpm_mpr.dsSIRbpm_mpr.SIRbpm_mpr[0] = new Object();
    dsSIRbpm_mpr.dsSIRbpm_mpr.SIRbpm_mpr[0].picproc__nam = "*";
    
    
    $("#ipProcesos").kendoDropDownList({
        optionLabel: "Seleccione el proceso",
        dataTextField: "mpr__nam",
        dataValueField: "mpr__nam",
        template:'<div class="divElementDropDownList">#: data.mpr__nam #</div>',            
        dataSource: {
            transport: {
                read: {
                    url: "http://172.21.24.146:8810/rest/Procesos/SIRbpm_mpr", 
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {                    
                    try {                         
                        if (operation === 'read') {                                
                            return JSON.stringify(dsSIRbpm_mpr);
                        }	
                    } catch (e) {
                        alertDialogs (e.message)
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsSIRbpm_mpr.eeEstados[0].Estado==="OK"){
                        return e.dsSIRbpm_mpr.eebpm_mpr;
                    }else{
                        alertDialogs (e.dsSIRbpm_mpr.eeEstados[0].Estado);
                    }
                },
                model: {                       
                    fields: {                            
                        mpr__nam: {validation: {required: true}, type: 'string'}                            
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs ("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
    });
    
    
    
    var dsSIRbpm_proc = new Object();
    dsSIRbpm_proc.dsSIRbpm_proc = new Object();
    dsSIRbpm_proc.dsSIRbpm_proc.eeDatos = new Array();
    dsSIRbpm_proc.dsSIRbpm_proc.eeDatos[0] = new Object();
    dsSIRbpm_proc.dsSIRbpm_proc.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    dsSIRbpm_proc.dsSIRbpm_proc.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");        
    dsSIRbpm_proc.dsSIRbpm_proc.SIRbpm_proc = new Array();
    dsSIRbpm_proc.dsSIRbpm_proc.SIRbpm_proc[0] = new Object();
    dsSIRbpm_proc.dsSIRbpm_proc.SIRbpm_proc[0].piccia__nit = "800001541";
    dsSIRbpm_proc.dsSIRbpm_proc.SIRbpm_proc[0].picproc__name = "*";
    
    var dataSourceProcesos = new kendo.data.DataSource({
        transport: {
            read:  {
                type: "POST",
                url: "http://172.21.24.146:8810/rest/Procesos/SIRbpm_proc",
                contentType: "application/json; charset=utf-8",
                dataType: 'json'             
            },
            parameterMap: function (options, operation) {                
                try{
                    if (operation === 'read') {                                
                        return JSON.stringify(dsSIRbpm_proc);
                    }                  
                } catch (e) {
                    alertDialogs (e.message);
                }
            }
        },         
        pageSize: 20,
        schema: {
            data:"dsSIRbpm_proc.eebpm_proc",
            model: {
                fields: {
                    proc__name: { type: "string" }                    
                }
            }
        }
    });
    
    var gridheigth = $("#windowProcess").height()-$("#divSubtituloProcesos").height()-25;
    
    $("#gridProcesos").kendoGrid({
        dataSource: dataSourceProcesos,
        height: gridheigth,
        sortable: true,
        pageable: true,
        batch: false,
//        filterable: {
//            mode: "row"            
//        },
        columns: [
            {
                field: "proc__name",
                title: "Proceso",
//                filterable: {
//                    cell: {
//                        showOperators: false,
//                        operator: "contains"
//                    }
//                }
            },            
            {command: [
                    {name: "eliminar", click: eliminarProceso, template: "<a class='k-grid-eliminar' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"}
                ],
                width: "50px"
            }
            
        ],
        editable: "inline"
    });
    
    function eliminarProceso(e){
        
        e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
        var proceso = this.dataItem($(e.currentTarget).closest("tr")).proc__name;
        
         
        try{
            $("#gridProcesos")
            var dsSICUDbpm_proc = new Object();
            dsSICUDbpm_proc.dsSICUDbpm_proc = new Object();
            dsSICUDbpm_proc.dsSICUDbpm_proc.eeDatos = new Array();
            dsSICUDbpm_proc.dsSICUDbpm_proc.eeDatos[0] = new Object();
            dsSICUDbpm_proc.dsSICUDbpm_proc.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
            dsSICUDbpm_proc.dsSICUDbpm_proc.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");        
            dsSICUDbpm_proc.dsSICUDbpm_proc.eebpm_proc = new Array();
            dsSICUDbpm_proc.dsSICUDbpm_proc.eebpm_proc[0] = new Object();
            dsSICUDbpm_proc.dsSICUDbpm_proc.eebpm_proc[0].cia__nit = "800001541";
            dsSICUDbpm_proc.dsSICUDbpm_proc.eebpm_proc[0].proc__name = proceso;
            console.log(JSON.stringify(dsSICUDbpm_proc))
           
            
            $.ajax({
                type: "DELETE",
                data: JSON.stringify(dsSICUDbpm_proc),
                url: "http://172.21.24.146:8810/rest/Procesos/SICUDbpm_proc",
                dataType : "json",
                contentType: "application/json;",
                success: function (resp) {                     
                    permitirIngreso = JSON.stringify(resp.dsSICUDbpm_proc.eeEstados[0].Estado);                    
                    jsonResp = resp; 
                },
                error: function (e) {
                    alertDialogs ("Error al consumir el servicio de login.\n"+ e.status +" - "+ e.statusText);                
                }
            }).done(function(){
                if(permitirIngreso=='"OK"'){  
                    $('#gridProcesos').data('kendoGrid').dataSource.read();
                    $('#gridProcesos').data('kendoGrid').refresh();
                }else{
                    alertDialogs (permitirIngreso);
                }
            });
        }catch (e) {
            alertDialogs ("Function: consumeServAjaxSIR Error: " + e.message);        
        }
    }
    
});

function agregarProceso(e){
    try{
        var dsSICUDbpm_proc = new Object();
        dsSICUDbpm_proc.dsSICUDbpm_proc = new Object();
        dsSICUDbpm_proc.dsSICUDbpm_proc.eeDatos = new Array();
        dsSICUDbpm_proc.dsSICUDbpm_proc.eeDatos[0] = new Object();
        dsSICUDbpm_proc.dsSICUDbpm_proc.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
        dsSICUDbpm_proc.dsSICUDbpm_proc.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");        
        dsSICUDbpm_proc.dsSICUDbpm_proc.eebpm_proc = new Array();
        dsSICUDbpm_proc.dsSICUDbpm_proc.eebpm_proc[0] = new Object();
        dsSICUDbpm_proc.dsSICUDbpm_proc.eebpm_proc[0].cia__nit = "800001541";
        dsSICUDbpm_proc.dsSICUDbpm_proc.eebpm_proc[0].proc__name = $("#ipProcesos").val();        
        
        $.ajax({
            type: "POST",
            data: JSON.stringify(dsSICUDbpm_proc),
            url: "http://172.21.24.146:8810/rest/Procesos/SICUDbpm_proc",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {                 
                permitirIngreso = JSON.stringify(resp.dsSICUDbpm_proc.eeEstados[0].Estado);                
                jsonResp = resp; 
            },
            error: function (e) {
                alertDialogs ("Error al consumir el servicio de login.\n"+ e.status +" - "+ e.statusText);                
            }
        }).done(function(){
            if(permitirIngreso==='"OK"'){  
                $('#gridProcesos').data('kendoGrid').dataSource.read();
                $('#gridProcesos').data('kendoGrid').refresh();
            }else{
                alertDialogs (permitirIngreso);
            }
        });
    }catch (e) {
        alertDialogs ("Function: consumeServAjaxSIR Error: " + e.message);        
    }
}
