
$(document).ready(function() {debugger
     var datos= sessionStorage.getItem("Aprueba_Proceso");
    var datos1 = JSON.parse(datos);
                        var  consultar = new sirDocumentosInstancia();
                        var  datajson = consultar.getjson();
                        var  urlService = consultar.getUrlSir();
                        datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].picprocid=datos1.inst__name
                        datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].pictaskname=datos1.task__name
                        var año= datos1.task__tst;
                        var year=año.slice(0, 4);                      
                        var month=año.slice(5, 7);
                        datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].picyear=year;
                        datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].picmonth=month;
                               
                        
                        //var crudServiceBaseUrl = "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SirUsuarios";
                        var mapCud = "ttfiles";
                        var mapCud1 = "ttfiles";
                        dataSource = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: urlService,
                                    dataType: "json",
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8"
                                },
                              
                                parameterMap: function (options, operation) {
                                    if (operation === "read") {
                                        return JSON.stringify(datajson);
                                    }
                                   
                                    
                                }
                                
                            },
                            batch: false,
                            severFiltering: true,                            
                            schema: {
                                data: function (e) {
                                    var key1 = Object.keys(e)[0];
                                    if(e[key1].eeEstados){
                                    if (e[key1].eeEstados[0].Estado === "OK") {
                                        return e[key1][mapCud];
                                    }
                                } else {
                                        parent.alertdialogs(e[key1].eeEstados[0].Estado);
                                    }
                                },
                                model: {
                                    id: "nomfile",
                                    fields: {
                                        nomfile:    {editable: true, nullable: false},
                                        tipo:    {editable: true, nullable: false},
                                       
                                        
                                    }
                                }
                            }
                        });
                       
                        /**
                         *  FUNCION CREAR GRILLA
                         * Funcion cancel se ejecuta con el evento OnClick de EDIT grid
                         *  cancel: function(e) {                                              
                            e._defaultPrevented= true;
                            $('#grid').data('kendoGrid').refresh();                                             
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); `}                                                                                       
                       
                         *  
                         *  
                         */     
                        var grid1 = $("#grillaDocs").kendoGrid({
                            dataSource: dataSource,
                            selectable: true,
                            columns: [
                                {field: "nomfile", title: "",  hidden:false},
                                {command: [
                                        {name: "descargar", text: "descargar", template: "<a class='k-grid-descargar'><span class='k-sprite pro_downflecha'></span></a>",  click:descargar},            
                                ], width: "90px"}],
                                
                            
                           
                        });
      $("#grillaDocs .k-grid-header").css('display', 'none');
    
    function descargar(e){
         debugger
    e.preventDefault();
    var divGrilla = e.delegateTarget.id;
    var grilla = $("#grillaDocs").data("kendoGrid");
    var item = grilla.dataItem(grilla.select());
    
     try{
        
          var  consultar = new descargaDocumentosInstancia();
          var  datajson = consultar.getjson();
          var  urlService = consultar.getUrlSir();
          datajson.dsfiles.SIRfile[0].pilfilename=item.nomfile;
          datajson.dsfiles.SIRfile[0].piitipo=item.tipo;
          datajson.dsfiles.SIRfile[0].picfilepath=item.ruta;
        
        $.ajax({
            async: false, 
            type: "POST",
            data: JSON.stringify(datajson),
            url: urlService,
            dataType: "json",        
            contentType: "application/json;",
            success: function (e) {  
                
            } 
        }).done(function(e){     debugger    
            var key1 = Object.keys(e)[0];
            if ((e[key1].dsfiles.dsfiles.eeEstados[0].Estado === "OK")) { debugger           
                kendo.saveAs({
                    dataURI: e.response.polfile,
                    
                });
            } else {
                parent.alertDialogs(e[key1].eeEstados[0].Estado);
            } 
        });     
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
    }
    
});

