/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function cargarArbol(arbol) {
    try {
        $(function () {
            try {
                $('#jstree2').jstree(arbol);
                if (sessionStorage.getItem("pcfAct")) {
                    $('#jstree2').jstree(true).select_node(sessionStorage.getItem("pcfAct"));
                }
            } catch (e) {
                alert("funcion Arbol: el json que recibe no es correcto ----" + e.message);
            }
            var to = false;
            $('#inpSearch').keyup(function (e) {
                
              if(to) { clearTimeout(to); }
              to = setTimeout(function () {
                var v = $('#inpSearch').val();
                //$('#jstree2').jstree(true).search(v);
                $('#jstree2').jstree('search', v);
              }, 250);
            });
            $('#jstree2').on('dblclick', function () {
                if (sessionStorage.getItem("cabeceraLast") || (sessionStorage.getItem("cabeceraNew")) || (sessionStorage.getItem("cabeceraTitu")) || (sessionStorage.getItem("cabeceraLlaves"))) {
                    sessionStorage.removeItem('cabeceraTitu');
                    sessionStorage.removeItem('cabeceraNew');
                    sessionStorage.removeItem('cabeceraLlaves');
                    sessionStorage.removeItem('cabeceraLast');
                }
                var id = $('#jstree2').jstree(false).get_selected();
                var id = $('#jstree2').jstree(true).get_selected();
                sessionStorage.setItem("pcfAct", id);
                sessionStorage.setItem("ncf", $('#jstree2').jstree(true).get_text($('#jstree2').jstree(true).get_selected()))
                for (var i = 0; i < id.length; i++) {
                    if ($('#jstree2').jstree(true).is_open(id[i])) {
                        $('#jstree2').jstree(true).close_node(id[i]);
                    } else {
                        $('#jstree2').jstree(true).open_node(id[i]);
                    }
                    if (!$('#jstree2').jstree(true).is_parent(id[i])) {
                        var texto = id[i];
                        savePortCapFunSess();
                        parent.fijarPcf(sessionStorage.setItem("pcf", texto));
                    }
                }
            });
        });
    } catch (err) {
        alert(err);
    }
}
function savePortCapFunSess() {
    var Selement=$('#jstree2').jstree('get_selected');
    for (var i = 0; i < Selement.length; i++) {
        var portafolio = Selement[i].split('P');
        var capitulo = portafolio[1].split('C');

        if (Selement[i].indexOf('F') !== -1) {
            var array = {};
            var funcion = capitulo[capitulo.length - 1].split('F');
            array.piifuncion = parseInt(funcion[0]);
            array.piicapitulo = parseInt(capitulo[capitulo.length - 2]);
            array.piiportafolio = parseInt(portafolio[0]);
        } else if (Selement[i].indexOf('C') !== -1) {
            var array = {};
            array.piiportafolio = parseInt(portafolio[0]);
            array.piicapitulo = parseInt(capitulo[capitulo.length - 2]);
            array.piifuncion = 0;
        } else if (Selement[i].indexOf('P') !== -1) {
            var array = {};
            array.piiportafolio = parseInt(portafolio[0]);
            array.piicapitulo = 0;
            array.piifuncion = 0;
        }
    }
    sessionStorage.setItem("portafolio",array.piiportafolio);
    sessionStorage.setItem("capitulo",array.piicapitulo);
    sessionStorage.setItem("funcion",array.piifuncion);
}

