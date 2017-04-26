/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function onloadPopUpFltrV2(){
    debugger
    document.getElementById('tituloPopUp').innerHTML = "Filtro al campo Valor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sessionStorage.getItem("cmpNom");
    $('#imgOpc').removeClass().addClass('k-sprite');
    $('#imgOpc').addClass('re_filtroon');
    $("#popUpFltr").hide();
//    $('#popUpFltrV2').css("height",$('#customPopUp').context.children["0"].clientHeight-230 + "px");
    $("#popUpFltrV2").show();
    $("#btnCrearFltrV2").show();
    sessionStorage.setItem("opcFl","Fil");
    document.getElementById("titulo").innerHTML = sessionStorage.getItem("cmpNom");
    document.getElementById('subtitulo').innerHTML = "<br>Filtros - " + sessionStorage.getItem("cmpNom");
    
   $("#CamposFltrV2").empty();
    crearBr("CamposFltrV2");
    crearLabel("labelV2" , "Filtro", "CamposFltrV2");
    crearBr("CamposFltrV2");
    crearBr("CamposFltrV2");
    crearInput("filtrosV2", "CamposFltrV2");
//    document.getElementById('filtrosV2').style.length = 100 + 'px';
    document.getElementById('filtrosV2').setAttribute("style", "width: 400px");
//    element.;
    multiSelectCompar(); 
//    $("li .k-button").removeClass(".k-button").addClass("k-button1");
//    $("li .k-button").removeClass();
}

function multiSelectCompar() {
    $("#filtrosV2").removeClass();
    $("#filtrosV2").kendoMultiSelect({
        dataTextField: "ContactName",
                        dataValueField: "CustomerID",
                        dataSource: {
                            transport: {
                                read: {
                                    dataType: "jsonp",
                                    url: "https://demos.telerik.com/kendo-ui/service/Customers",
                                }
                            }
                        },
                        height: 400
    });
}
/**
 * funcion que es llamada por el click en el boton guardar salva los cambios del filtro
 * @returns {undefined}
 */
function clicBtnSaveFiltrosV2() {
    try {
        var objAdd = []
        $("#CamposFltr").find('.col-sm-12').each(function (e, element) {
            var numberPattern = /\d+/g;
            var idfltr = element.id.match(numberPattern)[0];
            var FiltrCmpDe = document.getElementById("filtrosde" + idfltr).value;
            var FiltrCmpHasta = document.getElementById("filtrosHasta" + idfltr).value;
            if ((sessionStorage.getItem("filtros") !== "undefined") && (filtrosCampos.length > 0)) {
                if ((idfltr > filtrosCampos.length) && (function (idfltr) {
                    for (var i = 0; i < filtrosCampos.length; i++) {
                        var bool = true;
                        if (filtrosCampos[i]["rpt_fil_pos"] == idfltr) {
                            bool = false;
                            break
                        }
                    }
                    return bool;

                })) {
                    
                    var inputFltr1 = JSON.parse(JSON.stringify(inputFltr));
                    inputFltr1[0].rpt_fil_pos = 0;
                    inputFltr1[0].rpt_cmp_pos = idCmpidFltr;
                    inputFltr1[0].rpt_cmp_vis = sessionStorage.getItem("cmpNom");
                    inputFltr1[0].rpt_fil_des = $("#filtrosde" + idfltr).val();
                    inputFltr1[0].rpt_fil_Has = $("#filtrosHasta" + idfltr).val();
                    if (($("#filtrosde" + idfltr).val()) || ($("#filtrosHasta" + idfltr).val())) {
                        objAdd.push(inputFltr1[0]);
                    }
                }
            } else {
                
                var inputFltr1 = JSON.parse(JSON.stringify(inputFltr));
                inputFltr1[0].rpt_fil_pos = 0;
                inputFltr1[0].rpt_cmp_pos = idCmpidFltr;
                inputFltr1[0].rpt_cmp_vis = sessionStorage.getItem("cmpNom");
                inputFltr1[0].rpt_fil_des = $("#filtrosde" + idfltr).val();
                inputFltr1[0].rpt_fil_Has = $("#filtrosHasta" + idfltr).val();
                if (($("#filtrosde" + idfltr).val()) || ($("#filtrosHasta" + idfltr).val())) {
                    objAdd.push(inputFltr1[0]);
                }
            }

        });
        sendAjaxFltr(objAdd, "POST");//funccion esta en la primera version de filtros
    } catch (e) {
        alertDialogs("Function: clickCrearRepo Error: " + e.message);
    }
}

