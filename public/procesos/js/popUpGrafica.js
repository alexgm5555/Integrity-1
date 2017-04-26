/**
 * funcion para crear elementos del pop up, se crea el primer for para crear
 * todos los elementos del servicio, segundo for deja habilidatos los roles que
 * estan asigandos a ese usuario.
 * @param {type} param
 */
$(document).ready(function () {
                    $("#chart").kendoChart({
                        title: {
                            text: "Evolucion de tareas para " ,
                        },
                        legend: {
                            visible: false
                        },
                        seriesDefaults: {
                            type: "bar"
                        },
                        series: [{
                                name: "Total Visits",
                                data: [56000, 63000, 74000, 91000, 117000, 138000]
                            }, {
                                name: "Unique visitors",
                                data: [52000, 34000, 23000, 48000, 67000, 83000]
                            }],
                        valueAxis: {
                            max: 140000,
                            line: {
                                visible: false
                            },
                            minorGridLines: {
                                visible: true
                            },
                            labels: {
                                rotation: "auto"
                            }
                        },
                        categoryAxis: {
                            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                            majorGridLines: {
                                visible: false
                            }
                        },
                        tooltip: {
                            visible: true,
                            template: "#= series.name #: #= value #"
                        }
                    });
});