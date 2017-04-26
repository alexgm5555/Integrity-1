/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 100);                        
    $('#divPDF').height(viewportHeight - 100);
});

$(document).ready(function() {    
    saldos();
    $(window).trigger("resize"); 
    
    ///borrar//
    var apellidos = "Guiza";
			var nombres = "Malagon";
			var cedula = "1019005555";
			var ciudadexp = "Bogota";
			var fechaingreso = "2017/02/02";
			var tipocontrato = "indefinido";
			var cargo = "nn";
			var centroact = "nn"
			var clasesalario = "nn";
			var jornada = "nn";
			var sueldo = "nn";
			var ciudad = "nn";
			var fecha;
			var recursos = "nn";
			var cargorec = "nn";
			document.getElementById("Apellidos").innerHTML = apellidos;
			document.getElementById("Nombres").innerHTML = nombres;
			document.getElementById("Cedula").innerHTML = cedula;
			document.getElementById("CiudadExp").innerHTML = ciudadexp;
//			var fecha1 = new Date(fechaingreso);
//			var ds = parseInt(fecha1.format("MM")) - 1;
//			var mes = meses[ds];
//			var ano = fecha1.format("yyyy");
//			var dia = fecha1.format("dd");
//			fechaingreso = dia + " de " + mes + " del " + ano;
//			var dia2 = new Date();
//			var dia2 = dia2.getDate();
//			var mes2 = new Date();
//			mes2 = mes2.getMonth();
//			var ano2 = new Date();
//			var ano2 = ano2.getFullYear();
//			var mes = meses[mes2];
//			fecha = dia2 + " de " + mes + " del " + ano2;
			document.getElementById("FechaIngreso").innerHTML = "28 de Febrero del 2015";
			document.getElementById("ClaseContrato").innerHTML = "TERMINO INDEFINIDO";
			document.getElementById("Cargo").innerHTML = "Cargo";
			document.getElementById("NombreDepto").innerHTML = "Recursos Humanos";
			document.getElementById("NombreEmpresa").innerHTML = "QUANTUM DATA SYSTEMS SAS";
			document.getElementById("TipoSalario").innerHTML = "TERMINO INDEFINIDO";
			document.getElementById("Periodo").innerHTML = "jornada";
			document.getElementById("Sueldo").innerHTML = "30000000";
			document.getElementById("Ciudad").innerHTML = "Bogota";
			document.getElementById("FechaAct").innerHTML = "28 de Febrero del 2015";
			document.getElementById("nomemp").innerHTML = "QUANTUM DATA SYSTEMS SAS";
			document.getElementById("Recursos").innerHTML = "Recursos";
			document.getElementById("Puesto").innerHTML = "Puesto1";
			document.getElementById("nomenc").innerHTML = "nomenc";
			document.getElementById("direnc").innerHTML = "direnc";
			document.getElementById("depenc").innerHTML = "depenc";
			document.getElementById("ciuenc").innerHTML = "ciuenc";
			document.getElementById("telenc").innerHTML = "telenc";
			document.getElementById("faxenc").innerHTML = "faxenc";
                        document.getElementById("pagenc").innerHTML = "pagenc";
});

function saldos(){     
    
    var obj = new sirSaldos();    
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(json),
        url: url,
        dataType: "json",        
        contentType: "application/json;",
        success: function (e) {             
            var key1 = Object.keys(e)[0];
            if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                comprobante = e;
            } else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            }
        } 
    }).done(function(e){ 
        var key1 = Object.keys(e)[0];
        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {    
            debugger
                document.getElementById("logoEmpresaPDF").src = "data:image/png;base64," + e[key1].eeImages["0"].logocia;
                document.getElementById('lbSuscursal').innerHTML = e[key1].ttconsultasaldos["0"].Sucagencia;
                document.getElementById('lbCentroActividad').innerHTML = e[key1].ttconsultasaldos["0"].ctoactividad;
                document.getElementById('lbEmpleado').innerHTML = e[key1].ttconsultasaldos["0"].nombres;
                document.getElementById('lbCodigo').innerHTML = e[key1].ttconsultasaldos["0"].codempleado;                
                grid(e[key1].ttconsultasaldosdet);
            } else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            }        
    });
}

function getPDF(selector) {    
    var dropdownlist = $("#ipNomina").data("kendoDropDownList");
    kendo.drawing.drawDOM($(selector)).then(function(group){
        kendo.drawing.pdf.saveAs(group, "Historico vacaciones.pdf");
    });
}

function grid(data){
    debugger 
    var schema = {
        model: {
            numdoc: { type: "number" },
            fecdoc: { type: "string"},
            concepto: { type: "number" },
            descripcion: { type: "string" },
            fechavigencia: { type: "number" },
            valorcuota: { type: "number" },            
            acumulado: { type: "number" },            
            valortope: { type: "number" },
            saldo: { type: "number" },
            ultimatx: { type: "string" },
            apl: { type: "number" },
            Per: { type: "number" }
        }
    };
    
    var columns = [        
        
        { field: "numdoc", title: "Documento"},
        { field: "fecdoc", title: "Fecha"},        
        { field: "descripcion", title: "Descripción"},
        { field: "fechavigencia", title: "Vigencia"},
        { field: "valorcuota", title: "Valor<br>cuota", format:"{0:c0}"},        
        { field: "acumulado", title: "Acumulado", format:"{0:c0}"},
        { field: "valortope", title: "Valor<br>tope", format:"{0:c0}"},
        { field: "saldo", title: "Saldo", format:"{0:c0}"},
        { field: "ultimatx", title: "Última<br>transacción"},
        { field: "apl", title: "Apl."},
        { field: "Per", title: "Per."},
    ];
    var grid = $("#grid").kendoGrid({
        editable: false,
        sortable: false,
        scrollable: false,
        selectable: false,
        dataSource: {
            data: data,            
            schema: schema,            
        },
        columns: columns,
        rowTemplate: kendo.template($("#rowTemplateCmp").html()),
        altRowTemplate: kendo.template($("#altRowTemplateCmp").html())
    });
}

