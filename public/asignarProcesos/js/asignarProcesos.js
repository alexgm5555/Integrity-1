/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
     
    var dataSource = new kendo.data.DataSource({
        data: [
            { ciacod: 1, cianit: "800001541", ciaraz: "  **** Base de datos Desarroll"},
            { ciacod: 2, cianit: "800001542", ciaraz: "ABC"}
        ],
        schema: {            
            model: {
                id: "ciacod",
                fields: {
                    ciacod: { type: "number" },
                    ciaraz: { type: "string" },
                    cianit: { type: "string" }                    
                }
            }
        }
    });   
    
    var gridheigth = $("body").height()-$("#divSubtitulo").height()-4;
    
    $("#grid").kendoGrid({
        dataSource: dataSource,
        height: gridheigth,
        sortable: true,
        pageable: true,
//        filterable: {
//            mode: "row"            
//        },
        columns: [
            {
                field: "ciaraz",
                title: "Compañia",
//                filterable: {
//                    cell: {
//                        showOperators: false,
//                        operator: "contains"
//                    }
//                }                 
            },
            {
                command: [
                    {name: "detalle", text: " ", click: agregarProcesos, template: "<a class='k-grid-detalle'><span class='k-sprite admin_proff'></span></a>"}
                ], 
                width: "100px"
            }
        ]
    });    
});

function agregarProcesos(e){
    
    e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
    var nombreEmpresa = this.dataItem($(e.currentTarget).closest("tr")).ciaraz;
    var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (70/100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (80/100);
    
    $("body").append("<div id='windowProcess'></div>");
    var myWindow = $("#windowProcess");
    
    function onClose() {
        document.getElementById("windowProcess").remove();
    }
    
    myWindow.kendoWindow({
        width: widthPopUp,
        height: heightPopUp,
        title: nombreEmpresa,
        content: "popupAsignarProcesos.html",
        visible: false,
        modal: true,
        actions: [            
            "Close"
        ],
        close: onClose
    }).data("kendoWindow").center().open();
}

