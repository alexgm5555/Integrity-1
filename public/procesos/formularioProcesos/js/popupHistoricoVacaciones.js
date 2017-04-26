
$(document).ready(function() {debugger
    //var datos= sessionStorage.getItem("Aprueba_Proceso");
    //var datos1 = JSON.parse(datos);
                        var  consultar = new consultaHistoricoVacaciones();
                        var  datajson = consultar.getjson();
                        var  urlService = consultar.getUrlSir();
                        
//                        var año= datos1.task__tst;
//                        var year=año.slice(0, 4);                      
//                        var month=año.slice(5, 7);
//                        datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].picyear=year;
//                        datajson.dsSolicitudVacaciones.SIRSolicitudVacaciones[0].picmonth=month;
//                               
                        
                        //var crudServiceBaseUrl = "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SirUsuarios";
                        var mapCud = "eeenom_dva";
                        var mapCud1 = "eeenom_dva";
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
                                    id: "emp__cod",
                                    fields: {
                                        emp__cod:    {editable: true, nullable: false},
                                        dva__cal:    {editable: true, nullable: false},
                                        dva__hab:    {editable: true, nullable: false},
                                        dva__pag:    {editable: true, nullable: false},
                                        dva__rei:    {editable: true, nullable: false},
                                        dva__fin:    {editable: true, nullable: false},
                                        dva__ini:    {editable: true, nullable: false},
                                        dva__est:    {editable: true, nullable: false},
                                        dva__iper:    {editable: true, nullable: false},
                                        dva__fper:    {editable: true, nullable: false},
                                        
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
                        var grid1 = $("#grillaHistorico").kendoGrid({
                            dataSource: dataSource,
                            selectable: true,
                            columns: [
                                {field: "dva__ini", title: "Fecha de inicio",  hidden:false},
                                {field: "dva__fin", title: "Fecha Fin",  hidden:false},
                                {field: "dva__rei", title: "Fecha Reintegro",  hidden:false},
                                {field: "dva__cal", title: "Dias disfrutados",  hidden:false},
                                {field: "dva__hab", title: "Dias tomados",  hidden:false},
                                {field: "dva__din", title: "Dias dinero",  hidden:false},
                                {field: "dva__pag", title: "Valor pagado",  hidden:false},
                                {field: "dva__iper", title: "Inicio periodo",  hidden:false},
                                {field: "dva__fper", title: "Fin periodo",  hidden:false},
                                ],
                                
                            
                           
                        });
     // $("#grillaDocs .k-grid-header").css('display', 'none');
    
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

