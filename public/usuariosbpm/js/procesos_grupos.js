function ir_usuarios(){
    window.location = ("usuariosbpm.html");    
}
$(document).ready(function()  {
    $('body').css('display', 'none');
    $('body').fadeIn(1000);
    $('.link').click(function() {
        event.preventDefault();
        newLocation = this.href;
        $('body').fadeOut(1000, newpage);
    });
    $("#grupos").kendoComboBox();
    
    

    
    $("#btnAddCmp").kendoButton({
        click: CrearCampo
    });
        $("#btnSave").kendoButton({
        click: onClose
    });

  var myWindow = $("#window"),
        undo = $("#undo");
        function onClose() {
            undo.fadeIn();
            $('#gridproceso').data('kendoGrid').refresh();
            $('#gridproceso').data('kendoGrid').dataSource.read();
            $('#gridproceso').data('kendoGrid').refresh();
        }
    
    function newpage() {
        window.location = newLocation;
    }
    var usr_name = sessionStorage.getItem("Userid_bpm");  
    document.getElementById("demo").innerHTML = usr_name;
    var consultar = new sirproceso();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud = "eebpm_proc";
    var datasource = new kendo.data.DataSource({
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
                if (e[key1].eeEstados[0].Estado === "OK") {
                    return e[key1][mapCud];
                } else {
                   // alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "proc__name",
                fields: {
                    proc__name:    {editable: false, nullable: false},
                    proc__des:     {editable: false, nullable: false},
                    piidreg:       {editable: false, nullable: false}
                }
            }
        }
    });
    //----------------------
    $("#procesos").kendoComboBox({
        dataTextField: "proc__name",
        dataValueField: "piidreg",
        placeholder: "Proceso...",
        dataSource: datasource,
        change: grupos
    });
    var consultarusr = new sirusuariobpm();
    var datajsonusr = consultarusr.getjson();
    var urlServiceusr = consultarusr.getUrlSir();
    var NIT = sessionStorage.getItem("companyNIT");
    datajsonusr.dsSIRbpm_user.SIRbpm_user[0].piccia__nit = NIT;
    datajsonusr.dsSIRbpm_user.SIRbpm_user[0].picusr__bmp = usr_name;
    var mapCud = "eebpm_proc";
    var datasourcex = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlServiceusr,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (options, operation) {
                if (operation === "read") {
                    return JSON.stringify(datajsonusr);
                }
            }
        },
        batch: false,
        severFiltering: true,                            
        schema: {
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if (e[key1].eeEstados[0].Estado === "OK") {
                    var Json_usr = JSON.stringify(e[key1]); 
                                                       
                    return e[key1][mapCud];
                } else {
                    //alertDialogs(e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "proc__name",
                fields: {
                    proc__name:    {editable: false, nullable: false},
                    proc__des:     {editable: false, nullable: false},
                    piidreg:       {editable: false, nullable: false}
                }
            }
        }
    });   
    /**
     * Funcion llamada para crear en el dropdown de procesos.
     */   
    function grupos(){
        var dropdownlist = $("#procesos").data("kendoComboBox");
       
        $("#grupos").data("kendoComboBox").text('');
        var x = dropdownlist.value();
        var y = dropdownlist.text();
        var consultar = new sirgrupos();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        datajson.dsSIRbpm_grp.SIRbpm_grp[0].piidreg = x;
        datajson.dsSIRbpm_grp.SIRbpm_grp[0].picproc__name = y;
        var mapCud = "eebpm_grp";
        var datasource1 = new kendo.data.DataSource({
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
                    if (e[key1].eeEstados[0].Estado === "OK") {
  
                        return e[key1][mapCud];
                    } else {
                        //createDialog("Que desea hacer"+e[key1].eeEstados[0].Estado);
                        //alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "proc__name",
                    fields: {
                        eebpm_grp:    {editable: false, nullable: false},
                        grp__name:     {editable: false, nullable: false},
                        piireggrp:     {editable: false, nullable: false}
                    }
                }
            }
        });
        $("#grupos").kendoComboBox({
            dataTextField: "grp__name",
            dataValueField: "piireggrp",
            placeholder: "Grupos...",
            dataSource: datasource1,
            change: roles
        });
        
       function roles()
       {
           
        var dropdownlist = $("#procesos").data("kendoComboBox");
        var dropdownlist1 = $("#grupos").data("kendoComboBox");
        
        var x = dropdownlist.value();
        var y = dropdownlist.text();
        var x1 = dropdownlist1.value();
        var y1 = dropdownlist1.text();
        
        var consultar = new sirRoles();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        datajson.dsSIRbpm_rol.SIRbpm_rol[0].piireg = x;
        datajson.dsSIRbpm_rol.SIRbpm_rol[0].picproc__name = y;
         datajson.dsSIRbpm_rol.SIRbpm_rol[0].piireggrp = x1;
          datajson.dsSIRbpm_rol.SIRbpm_rol[0].picgrp__name = y1;
        
        var mapCud = "eebpm_rol";
        var datasourcerol = new kendo.data.DataSource({
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
            //asdasdasd
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        var Json_usr = JSON.stringify(e[key1]); 
                        sessionStorage.setItem("Json_Usrbpm",Json_usr); 
                        return e[key1][mapCud];
                    } else {
                        //createDialog("Que desea hacer"+e[key1].eeEstados[0].Estado);
                        //alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "proc__name",
                    fields: {
                        proc__name:    {editable: false, nullable: false},
                        grp__name:     {editable: false, nullable: false},                       
                        piiregrol:     {editable: false, nullable: false}
                    }
                }
            }
        });
           
        $("#roles1").kendoComboBox({
        dataTextField: "rol__name",
        dataValueField: "piiregrol",
        Isvisible: false,
        dataSource: datasourcerol
      
    }); 
           
      var combox = $("#roles1").data("kendoComboBox");
    combox.wrapper.hide();     
           
           
       }
    }
    var grid1 = $("#gridproceso").kendoGrid({
        dataSource: datasourcex,
        selectable: true,
        pageSize: 10,
        scrollable: true,
        sortable: true,
        detailInit: detailInit,
        dataBound: function() {
                            this.expandRow(this.tbody.find("tr.k-master-row"));
                        },
        detailTemplate: kendo.template($("#template").html()),
        columns: [
            { field: "proc__name", title:"ID" }
        ]
    });
    /**
     * Crea el primer detalle de la grilla.
     * @param {type} NIT : Dato enviado para consumir el servicio
     * @param {type} usr_name: Dato enviado para consumir el servicio
     */
    function detailInit(e) {
        var detailRow = e.detailRow;                    
        var consultarusr = new sirusuariobpm();
        var datajsonusr = consultarusr.getjson();
        var urlServiceusr = consultarusr.getUrlSir();
        var mapCud = "eebpm_grp";
        var NIT = sessionStorage.getItem("companyNIT");
        datajsonusr.dsSIRbpm_user.SIRbpm_user[0].piccia__nit = NIT;
        datajsonusr.dsSIRbpm_user.SIRbpm_user[0].picusr__bmp = usr_name;                           
        var datasourcey = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlServiceusr,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },             
                parameterMap: function (options, operation) {
                    if (operation === "read") {

                        return JSON.stringify(datajsonusr);
                    }                  
                }                               
            },
            severFiltering: true,
            serverPaging: true,
            serverSorting: true,
            filter: { field: "piireg", operator: "eq", value: e.data.piidreg },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        var Json_usr = JSON.stringify(e[key1]); 
                        sessionStorage.setItem("Json_Usrbpm1",Json_usr); 
                        return e[key1][mapCud];
                    } else {
                        //alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "proc__name",
                    fields: {
                        proc__name:    {editable: false, nullable: false},
                        grp__name:     {editable: false, nullable: false},
                        piireggrp:       {editable: false, nullable: false}
                    }
                }
            }
        });                                                             
        var grillad = detailRow.find(".orders").kendoGrid({
            scrollable: false,
            dataSource:  datasourcey,                                            
            detailInit: detailInit1,
            dataBound: function() {
                            this.expandRow(this.tbody.find("tr.k-master-row"));
                        },
            detailTemplate: kendo.template($("#template1").html()),
            columns: [
                {field: "grp__name"},
                            
                {command: [{name: "detalle", text: " ", click: editar_usr, template: "<a class='k-grid-detalle'><span class='k-sprite po_detalle'></span></a>"},
                    ],width: "60px"}
            ]
        });       
    }  
    /**
     * Crea el POP Up Para editar usuario desde la grilla
     * @param {type} e para buscar row selecionado
     */
    function editar_usr(e){
        e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
        var id = this.dataItem($(e.currentTarget).closest("tr"));
        var grp=id.grp__name;
        var id=id.id;
        
        sessionStorage.setItem("Bpm_grp",grp);  
        sessionStorage.setItem("Bpm_id",id);  
        var myWindow = $("#window"),
        undo = $("#undo");
        function onClose() {
            undo.fadeIn();
            $('#gridproceso').data('kendoGrid').refresh();
            $('#gridproceso').data('kendoGrid').dataSource.read();
            $('#gridproceso').data('kendoGrid').refresh();
        }
        var UrL= sessionStorage.getItem("url");  
        myWindow.kendoWindow({
            draggable: true,
            height: "70%",
            modal: true,
            resizable: false,
            title: "Roles",
            width: "60%",
            content: UrL+"usuariosbpm/html/popUpEditar.html",
            actions: [
                "Close"
            ],                                
            close: onClose
        }).data("kendoWindow").center().open();            
    }               
    /**
     * Crear segundo detalle para visualizar roles
     * @param {type} e captura datos del row desplegado
     */
    function detailInit1(e) {
        e.preventDefault();
        var id = e.data;
        var grp=id.grp__name;
        var id=id.id;       
        var Jsonbpm=[];
        Jsonbpm = sessionStorage.getItem("Json_Usrbpm1");                                           
        var Jsonbpm1  = JSON.parse(Jsonbpm);
        var Roles = Jsonbpm1.eebpm_rol;
        var i = 0;
        var j=1;
        for (i  in Roles){
            if(Roles[i].grp__name === grp){
                if(Roles[i].proc__name === id){
                    crearDiv("divFiltr"+Roles[i].piireg + "&" + Roles[i].piireggrp + "&" + i, Roles[i].piireg + "&" + Roles[i].piireggrp + "-" + "K"+j+"-Container");
                    crearImg("divFiltr"+Roles[i].piireg + "&" + Roles[i].piireggrp + "&" + i ,Roles[i].rol__name+Roles[i].piiregrol );
                    crearSpan("divFiltr"+Roles[i].piireg + "&" + Roles[i].piireggrp + "&" + i, Roles[i].rol__name);
                    if (j === 3) {
                        j = 1;
                    } else {
                        j++;
                    } 
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
        function crearImg(div, id) {   
            var x = document.createElement("SPAN");
            x.setAttribute("class", "k-sprite po_bulleto1");
            x.setAttribute("id", id);
            x.setAttribute("estado", "off");    
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
    }
});// Fin document ready
/**
 * Crear un elemento label dentro de un div
 * @param {type} id id del nuevo label
 * @param {type} titulo valor del label
 * @param {type} div div al cual sele asigna el nuevo elemento
 * @param {type} fuente tipo de fuente del label
 * @param {type} color si quiere un color especifico
 * @param {type} tipo en caso de ser Editor cambia ya que necesita un tam especifico
 * @returns {undefined}
 */
function  crearLabel(id, titulo, div, fuente, color, tipo) {
    var newlabel = document.createElement("Label");
    newlabel.id = id;
    newlabel.setAttribute("for", "text" + id);
    if (tipo == 'editor') {//en caso de que sea un label para editor le coloca este estilo para mostrarlo en la parte superior
        newlabel.style.verticalAlign = '220%';
    }
    newlabel.style.font = fuente;
    newlabel.innerHTML = titulo;
    document.getElementById(div).appendChild(newlabel);
}
    function CrearCampo(){
    var dropdownlist = $("#procesos").data("kendoComboBox");     
    var proceso = dropdownlist._prev;
    var dropdownlist1 = $("#grupos").data("kendoComboBox"); 
    if(proceso=="" || dropdownlist1== undefined || dropdownlist1._prev== undefined || dropdownlist1._prev== "" ){            
        alertDialogs("Debe Ingresar almenos Un proceso y un grupo para poder agregar") ;   
    }else{
        var grupo = dropdownlist1._prev;    
        sessionStorage.setItem("Grupo",grupo);  
        sessionStorage.setItem("Proceso",proceso);  
        var myWindow1 = $("#textarea"),
                undo = $("#undo");
        function onClose() {
            undo.fadeIn();
            $('#gridproceso').data('kendoGrid').refresh();
            $('#gridproceso').data('kendoGrid').dataSource.read();
            $('#gridproceso').data('kendoGrid').refresh();
        }
        var UrL= sessionStorage.getItem("url");  
         $("#textarea").empty();
            myWindow1.kendoWindow({
            draggable: true,
            height: "70%",
            modal: true,
            resizable: false,
            title: "Roles",
            width: "65%",
            content: UrL+"usuariosbpm/html/popUpAgregar.html",
            actions: [
                "Close"
            ],                               
            close: onClose
        }).data("kendoWindow").center().open();                 
    }
}      
            function reloadGrid() {
                
    $("#textarea").data("kendoWindow").close();
   
    }
             function reloadGrid1() {
                
   
    $("#window").data("kendoWindow").close();
    }
            
         function errorPopUp(){
    alertDialogs("Su solicitud sera procesada");
    reloadGrid();
    
    }
         function errorPopUp1(){
    alertDialogs("Su solicitud sera procesada");
    reloadGrid1();
    
    }
