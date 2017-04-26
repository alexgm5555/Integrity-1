$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#divPDF').height(viewportHeight - 50);
});

function getPDF(selector) {
    kendo.drawing.drawDOM($(selector)).then(function (group) {
        kendo.drawing.pdf.saveAs(group, "Certificado_Retencion.pdf");
    });

//        $("#principal").addClass("jorge");
}
function mostrarDatos(e) {
    var i = 0;
    document.getElementById('numCasilla4').innerHTML = "1";
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "5";
    });
    var valorcasilla = numcasilla[0].valorcasilla;
    for (i = 1; i <= valorcasilla.length; i++) {
        document.getElementById('numCasilla5P' + i).innerHTML = valorcasilla[valorcasilla.length - i];
    }
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "6";
    });
    document.getElementById('numCasilla6').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "11";
    });
    document.getElementById('numCasilla11').innerHTML = numcasilla[0].valorcasilla;

    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "24";
    });
    document.getElementById('numCasilla24').innerHTML = numcasilla[0].valorcasilla;

    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "25";
    });
    var valorcasilla = numcasilla[0].valorcasilla;
    for (i = 1; i <= valorcasilla.length; i++) {
        document.getElementById('numCasilla25P' + i).innerHTML = valorcasilla[valorcasilla.length - i];
    }



    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "26";
    });
    document.getElementById('numCasilla26').innerHTML = numcasilla[0].valorcasilla;

    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "27";
    });
    document.getElementById('numCasilla27').innerHTML = numcasilla[0].valorcasilla;

    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "28";
    });
    document.getElementById('numCasilla28').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "29";
    });
    document.getElementById('numCasilla29').innerHTML = numcasilla[0].valorcasilla;

    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "30";
    });
    var x = numcasilla[0].valorcasilla.length;
    document.getElementById('numCasilla30P1').innerHTML = numcasilla[0].valorcasilla.slice(0, 4);
    document.getElementById('numCasilla30P2').innerHTML = numcasilla[0].valorcasilla.slice(5, 7);
    document.getElementById('numCasilla30P3').innerHTML = numcasilla[0].valorcasilla.slice(7, x);
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "31";
    });
    var x = numcasilla[0].valorcasilla.length;
    document.getElementById('numCasilla31P1').innerHTML = numcasilla[0].valorcasilla.slice(0, 4);
    document.getElementById('numCasilla31P2').innerHTML = numcasilla[0].valorcasilla.slice(5, 7);
    document.getElementById('numCasilla31P3').innerHTML = numcasilla[0].valorcasilla.slice(7, x);
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "32";
    });
    var x = numcasilla[0].valorcasilla.length;
    document.getElementById('numCasilla32P1').innerHTML = numcasilla[0].valorcasilla.slice(0, 4);
    document.getElementById('numCasilla32P2').innerHTML = numcasilla[0].valorcasilla.slice(5, 7);
    document.getElementById('numCasilla32P3').innerHTML = numcasilla[0].valorcasilla.slice(7, x);
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "33";
    });
    document.getElementById('numCasilla33').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "34";
    });
    document.getElementById('numCasilla34P1').innerHTML = numcasilla[0].valorcasilla.slice(0, 1);
    document.getElementById('numCasilla34P2').innerHTML = numcasilla[0].valorcasilla.slice(2, 3);
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "35";
    });
    document.getElementById('numCasilla35P1').innerHTML = numcasilla[0].valorcasilla.slice(0, 1);
    document.getElementById('numCasilla35P2').innerHTML = numcasilla[0].valorcasilla.slice(2, 3);
    document.getElementById('numCasilla35P3').innerHTML = numcasilla[0].valorcasilla.slice(3, 5);
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "36";
    });
    document.getElementById('numCasilla36').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "37";
    });
    document.getElementById('numCasilla37').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "38";
    });
    document.getElementById('numCasilla38').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "39";
    });
    document.getElementById('numCasilla39').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "40";
    });
    document.getElementById('numCasilla40').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "41";
    });
    document.getElementById('numCasilla41').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "42";
    });
    document.getElementById('numCasilla42').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "43";
    });
    document.getElementById('numCasilla43').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "44";
    });
    document.getElementById('numCasilla44').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "45";
    });
    document.getElementById('numCasilla45').innerHTML = numcasilla[0].valorcasilla;
    var numcasilla = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "46";
    });
    document.getElementById('numCasilla46').innerHTML = numcasilla[0].valorcasilla;

    var numcasilla461 = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "461";
    });
    var numcasilla462 = e.dsCertificadoingret.ttcertificadoingret.filter(function (obj) {
        return obj.numcasilla === "462";
    });
    document.getElementById('numCasillaPagador').innerHTML = numcasilla461[0].valorcasilla + " - " + numcasilla462[0].valorcasilla;
    //document.body.style.zoom="50%";
    //-webkit-transform: scale(0.5);
    $("#principal").removeClass("dosmildieciseis").addClass("dosmilquince");

}
function consultar() {
    try {
        var año = document.getElementById('añoGrabable').value;
        if (año === "2015") {
            $("#principal").removeClass("dosmildieciseis").addClass("dosmilquince");
            //$("#principal").addClass("dosmilquince");
        }
        if (año === "2016") {

            $("#principal").removeClass("dosmilquince").addClass("dosmildieciseis");
        }
        var consultar = new sirRetencion();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        datajson.dsCertificadoingret.SIRCertificadoingret[0].piiano = parseInt(año);
        $.ajax({
            type: "POST",
            async: false,
            data: JSON.stringify(datajson),
            url: urlService,
            dataType: "json",
            contentType: "application/json;",
            success: function (resp) {
                if ((resp.dsCertificadoingret.eeEstados[0].Estado) == "OK")
                {

                    mostrarDatos(resp);
                    //parent.cerrarPopup();
                } else
                {
                    alertDialogs("Error" + resp.dsCertificadoingret.eeEstados[0].Estado);

                }
            },
            error: function (e) {
                alertDialogs("función consultar "+e)
            }

        });
    } catch (err) {
        alertDialogs(err);
    }


}



$(document).ready(function () {
    $("#btnConsultar").kendoButton({
        click: consultar
    });
    //document.body.style.zoom="100%";
    $(window).trigger("resize");

    //getPDF('.page-container')     
});