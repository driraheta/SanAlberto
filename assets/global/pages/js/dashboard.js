(function ($) {

    var mesActual = new Date();
    var colores15 = ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF', '#40E0D0', '#6495ED', '#CCCCFF', '#EF9A9A', '#F0F4C3', '#CFD8DC', '#AED581', '#A1887F', '#29B6F6', '#43A047'];
    var meses = new Array();
    meses[0] = "Ene";
    meses[1] = "Feb";
    meses[2] = "Mar";
    meses[3] = "Abr";
    meses[4] = "May";
    meses[5] = "Jun";
    meses[6] = "Jul";
    meses[7] = "Ago";
    meses[8] = "Set";
    meses[9] = "Oct";
    meses[10] = "Nov";
    meses[11] = "Dec";

    //SELECCIONANDO LOS MESES ACTUALES
    $("#chart04SelectMeses option[value=" + (mesActual.getMonth() + 1) + "]").attr("selected", true);
    $("#chart03SelectMeses option[value=" + (mesActual.getMonth() + 1) + "]").attr("selected", true);

    var dataChart01 = new Object;
    dataChart01.data = new Array;
    dataChart01.labels = new Array;

    var dataChart02 = new Object;
    dataChart02.data = new Array;
    dataChart02.labels = new Array;

    var dataChart03 = new Object;
    dataChart03.data = new Array;
    dataChart03.labels = new Array;
    dataChart03.fechas = new Array;

    var dataChart04 = new Object;
    dataChart04.dataFacturado = new Array;
    dataChart04.dataPendiente = new Array;
    dataChart04.labels = new Array;
    dataChart04.fechas = new Array;

    var dataChart06 = new Object;
    dataChart06.data = new Array;
    dataChart06.labels = new Array;

    setTimeout(function () {
        sortTable(2, "int", "MALCO-myChart05", "desc");
        console.log("POSICION 01");
        let idEspecie = 0;
        idEspecie = $('select#chart02SelectEspecies').val();
        console.log(idEspecie);
        //DEBO VOLVER
        setTimeout(function () {
            //diraheta////ActualizarChart02(idEspecie); //REVISAR AQUI OTRO
        }, 1200);



        console.log('--CHART01--');
        dataChart01.labelDatasets = '# Pedidos';
        console.log(dataChart01.data);
        console.log(dataChart01.labels);
        console.log(dataChart01.labelDatasets);

        console.log('CHART02');
        console.log(dataChart02.data);
        console.log(dataChart02.labels);
        console.log(dataChart02.labelDatasets);

        llenarTablaChart02()

        console.log('--CHART03--');
        console.log(dataChart03.data);
        console.log(dataChart03.labels);
        console.log(dataChart03.labelDatasets);

        console.log('--CHART04--');
        console.log(dataChart04.dataFacturado);
        console.log(dataChart04.dataPendiente);
        console.log(dataChart04.labels);
        console.log(dataChart04.labelDatasets);


        console.log('--CHART06--');
        dataChart06.labelDatasets = 'Importe por pagar';
        console.log(dataChart06.labels);
        console.log(dataChart06.data);


        //PASAR INFORMACION A LA CONFIGURACION
        var configChart01 = {
            type: 'bar',
            data: {
                datasets: [{
                    data: dataChart01.data.slice(),
                    backgroundColor: 'rgba(255,128,0,0.5)',
                    label: dataChart01.labelDatasets.slice(),
                    fillColor: 'rgba(151,249,190,0.5)',
                    strokeColor: 'rgba(255,255,255,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff'
                }
                ],
                labels: dataChart01.labels.slice()
            },
            options: {
                legend: {
                    labels: {
                        boxWidth: 12
                    }
                },
                plugins: {
                    datalabels: {
                        display: false,
                        formatter: (value) => {

                            return value !== null && value !== undefined && !isNaN(value) ? Math.round(value * 100) + '%' : null;;
                        }
                    }
                }
                ,
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function (value, index, values) {
                                return value;
                            }
                        }
                    }]
                }
            }
        };

        var configChart02 = {
            type: 'pie',
            data: {
                datasets: [{
                    data: dataChart02.data.slice(0),
                    backgroundColor: colores15,
                    label: dataChart02.labels.slice(0),
                }],
                labels: dataChart02.labels.slice(0)
            },
            options: {
                tooltips: {
                    bodyFontSize: 10,
                    mode: 'label',
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.datasets[0].data[tooltipItem.index];
                            label += ' : ';
                            label += data.labels[tooltipItem.index];

                            console.log(data);
                            return label;
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                    display: false,
                    labels: {
                        boxWidth: 12
                    }
                },
                plugins: {
                    datalabels: {
                        display: false,
                        font: {
                            size: '10'
                        }
                    }
                },
                maintainAspectRatio: false,
                responsive: true
            }
        };

        var configChart03 = {
            type: 'bar',
            data: {
                labels: [$('select#chart03SelectMeses option:selected').text()],
                datasets: [
                    {
                        data: dataChart03.data.slice(($('select#chart03SelectMeses option:selected').val() * 3) - 3),
                        backgroundColor: colores15[2],
                        label: dataChart03.labels[($('select#chart03SelectMeses option:selected').val() * 3) - 3]
                    }, {
                        data: dataChart03.data.slice(($('select#chart03SelectMeses option:selected').val() * 3) - 2),
                        backgroundColor: colores15[1],
                        label: dataChart03.labels[($('select#chart03SelectMeses option:selected').val() * 3) - 2]
                    }, {
                        data: dataChart03.data.slice(($('select#chart03SelectMeses option:selected').val() * 3) - 1),
                        backgroundColor: colores15[0],
                        label: dataChart03.labels[($('select#chart03SelectMeses option:selected').val() * 3) - 1]
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    bodyFontSize: 12,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = tooltipItem.yLabel || '';

                            if (label) {
                                label += ': ';
                            }
                            label += data.datasets[tooltipItem.datasetIndex].label;
                            return label;
                        }
                    },
                    mode: 'label'
                },
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function (value, index, values) {

                                return value;
                            },
                            stepSize: 2000
                        }
                    }],
                    xAxes: [{
                        display: false
                    }]
                },
                plugins: {
                    datalabels: {
                        display: false,
                        font: {
                            size: '10'
                        }
                    }
                }
            }
        };

        var configChart04 = {
            type: 'bar',
            data: {
                labels: [$('select#chart04SelectMeses option:selected').text()],
                datasets: [
                    {
                        data: dataChart04.dataFacturado.slice($('select#chart04SelectMeses option:selected').val(), ($('select#chart04SelectMeses option:selected').val() + 1)),
                        backgroundColor: colores15[5],
                        label: ["Facturado"]
                    }, {
                        data: dataChart04.dataPendiente.slice($('select#chart04SelectMeses option:selected').val(), ($('select#chart04SelectMeses option:selected').val() + 1)),
                        backgroundColor: colores15[6],
                        label: ["Pendiente"]
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    bodyFontSize: 12,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': S/ ';
                            }
                            label += tooltipItem.yLabel;
                            return label;
                        }
                    },
                    mode: 'label'
                },
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function (value, index, values) {

                                return 'S/ ' + value;
                            },
                            stepSize: 2000
                        }
                    }],
                    xAxes: [{
                        display: false
                    }]
                },
                plugins: {
                    datalabels: {
                        display: false,
                        font: {
                            size: '10'
                        }
                    }
                }
            }
        };

        var configChart06 = {
            type: 'bar',
            data: {
                datasets: [{
                    data: dataChart06.data.slice(),
                    backgroundColor: 'rgba(255,128,0,0.5)',
                    label: dataChart06.labelDatasets.slice(),
                    fillColor: 'rgba(151,249,190,0.5)',
                    strokeColor: 'rgba(255,255,255,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff'
                }
                ],
                labels: dataChart06.labels.slice()
            },
            options: {
                legend: {
                    labels: {
                        boxWidth: 12
                    }
                },
                plugins: {
                    datalabels: {
                        display: false,
                        formatter: (value) => {

                            return value !== null && value !== undefined && !isNaN(value) ? Math.round(value * 100) + '%' : null;;
                        }
                    }
                }
                ,
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function (value, index, values) {

                                return 'S/ ' + value;
                            },
                            stepSize: 2000
                        }
                    }]
                }
            }
        };

        $("#iconChart04Facturado").css('color', colores15[5])
        $("#iconChart04Pendiente").css('color', colores15[6])



        //DIBUJAR GRAFICAS
        var ctxChart01 = document.getElementById('myChart01').getContext('2d');
        var myChart01 = new Chart(ctxChart01, configChart01);
        var myChart02;
        var ctxChart03 = document.getElementById('myChart03').getContext('2d');
        var myChart03 = new Chart(ctxChart03, configChart03);
        var ctxChart04 = document.getElementById('myChart04').getContext('2d');
        var myChart04 = new Chart(ctxChart04, configChart04);
        var ctxChart06 = document.getElementById('myChart06').getContext('2d');
        var myChart06 = new Chart(ctxChart06, configChart06);

























        //Creacion de variables para dibujar el grafico, fecha: 14/10/2022, version: v1.0
        let mesFecha
        let total

        let chartVentasXMes

        //Funcion creada para crear el grafico que recibe como parametro el contexto, fecha: 14/10/2022, version: v1.0
        function chartConfiguration(context) {
            //Esto es para darle colores al grafico
            var gradientStroke1 = context.createLinearGradient(0, 230, 0, 50);

            gradientStroke1.addColorStop(1, "rgba(94, 114, 228, 0.2)");
            gradientStroke1.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
            gradientStroke1.addColorStop(0, "rgba(94, 114, 228, 0)");

            chartVentasXMes = new Chart(context, {
                type: "line",
                data: {
                    //Data eje X
                    labels: mesFecha,
                    datasets: [
                        {
                            label: "Ventas por dia",
                            tension: 0.3,
                            borderWidth: 0,
                            pointRadius: 0,
                            borderColor: "#5e72e4",
                            backgroundColor: gradientStroke1,
                            borderWidth: 3,
                            fill: true,

                            //Data eje Y
                            data: total,
                            maxBarThickness: 6,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    interaction: {
                        intersect: false,
                        mode: "index",
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                            },
                            ticks: {
                                display: true,
                                padding: 10,
                                color: "#fbfbfb",
                                font: {
                                    size: 11,
                                    family: "Open Sans",
                                    style: "normal",
                                    lineHeight: 2,
                                },
                            },
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: false,
                                drawTicks: false,
                                borderDash: [5, 5],
                            },
                            ticks: {
                                display: true,
                                color: "#ccc",
                                padding: 10,
                                font: {
                                    size: 11,
                                    family: "Open Sans",
                                    style: "normal",
                                    lineHeight: 2,
                                },
                            },
                        },
                    },
                },
            });
        }

        //Funcion que recibe como parametro el nombre del chart, fecha: 14/10/2022, version: v1.0
        const renderChart = chartName => {
            const ctx = document.getElementById(chartName).getContext("2d")

            //Codigo para rellenar con un mensaje si es que no hay datos
            // if (mesFecha.length == 0) {
            //     ctx.font = "30px Helvetica";
            //     ctx.fillText("No hay datos", 60, 130);
            // } else {
            //     chartConfiguration(ctx);
            // }

            chartConfiguration(ctx)
        }

        //Funcion que trae los datos desde la BD que recibe como parametro el mes, fecha: 14/10/2022, version: v1.0
        const traerDatosVentasXMes = (idMes, idEspecie) => {
            get("/ws/dashboard.aspx/ventasXMes", JSON.stringify({ mes: idMes, especie: idEspecie }))
                .then((res) => {
                    var r = JSON.stringify(res);
                    if (r.startsWith('[{"ERROR":', 0)) {
                        var err = "";

                        $(res).each(() => (err += this.Error));

                        Alerta(err, "ERROR!");
                    } else {

                        const arrayFecha = res.map(x =>
                            new Intl.DateTimeFormat("es-MX", {
                                month: "long",
                                day: "numeric",
                            }).format(new Date(x.FECHAEMISION))
                        );

                        const t = res.map(x => x.TOTAL)

                        mesFecha = arrayFecha
                        total = t

                        renderChart("chartVentasXMes")
                    }
                })
                .catch((error) => Alerta(error, "ERROR!"));
        }

        //Funcion que cambia el grafico de acuerdo a la seleccion del SELECT:SelectVentasXMes, fecha: 14/10/2022, version:v1.0
        function onChangeSelectVentasXMes() {
            let mesSelect = document.getElementById('selectVentasXMes')
            let especieSelect = document.getElementById('selectEspecies')

            //Se le envia valor de 1 a la funcion para evitar el error NULL
            traerDatosVentasXMes(1, idEspecie)

            function cambia(x) {
                x.addEventListener("change", () => {
                    chartVentasXMes.destroy()
                    traerDatosVentasXMes(mesSelect.value, especieSelect.value)
                })
            }

            cambia(mesSelect)
            cambia(especieSelect)
        }

        //Se invoca a la funcion Onchange del SELECT:SelectVentasXMes
        onChangeSelectVentasXMes()
        LlenarSelectEspecies('#selectEspecies')



























        setTimeout(function () {
            console.log("POSICION FINAL");
            var ctxChart02 = document.getElementById('myChart02').getContext('2d');
            myChart02 = new Chart(ctxChart02, configChart02);
        }, 2500);


        function updateDataChart02(labels, data, numChart) {

            let divChart02 = $('#divMyChart' + numChart);
            divChart02.html("");
            divChart02.html('<canvas id="myChart' + numChart + '" style="max-height: 190px; width: 500px;"></canvas>');

            ctxChart02 = document.getElementById('myChart' + numChart).getContext('2d');
            configChart02.data.datasets[0].data = data.slice();
            configChart02.data.labels = labels.slice();
            console.log("DENTRO DE UPDATECHART");

        }
        function updateDataChart03(labels, data, numChart, idMes) {
            let divChart = $('#divMyChart' + numChart);
            divChart.html("");
            divChart.html('<canvas id="myChart' + numChart + '" style="max-height: 170px; width: 500px;"></canvas>');

            ctxChart03 = document.getElementById('myChart' + numChart).getContext('2d');
            configChart03.data.datasets = crearDataChart(idMes).slice();

            function crearDataChart(idMes) {
                let dataTmp = new Array;

                if ((dataChart03.data[((idMes * 3) - 3)] !== '') && (!isNaN(dataChart03.data[((idMes * 3) - 3)]))) {
                    dataTmp[0] = {
                        data: dataChart03.data.slice(((idMes * 3) - 3), ((idMes * 3) - 2)),
                        backgroundColor: colores15[2],
                        label: dataChart03.labels[((idMes * 3) - 3)]
                    };

                } else {
                    dataTmp[0] = {
                        data: [0],
                        backgroundColor: colores15[2],
                        label: [""]
                    };
                }

                if ((dataChart03.data[((idMes * 3) - 2)] !== '') && (!isNaN(dataChart03.data[((idMes * 3) - 2)]))) {
                    dataTmp[1] = {
                        data: dataChart03.data.slice(((idMes * 3) - 2), ((idMes * 3) - 1)),
                        backgroundColor: colores15[1],
                        label: dataChart03.labels[((idMes * 3) - 2)]
                    };
                } else {
                    dataTmp[1] = {
                        data: [0],
                        backgroundColor: colores15[1],
                        label: [""]
                    };
                }

                if ((dataChart03.data[((idMes * 3) - 2)] !== '') && (!isNaN(dataChart03.data[((idMes * 3) - 2)]))) {
                    dataTmp[2] = {
                        data: dataChart03.data.slice(((idMes * 3) - 1), ((idMes * 3))),
                        backgroundColor: colores15[0],
                        label: dataChart03.labels[((idMes * 3) - 1)]
                    };
                } else {
                    dataTmp[2] = {
                        data: [0],
                        backgroundColor: colores15[0],
                        label: [""]
                    };
                }
                return dataTmp;
            }
        }

        function updateDataChart04(labels, data, numChart, idMes) {
            let divChart = $('#divMyChart' + numChart);
            divChart.html("");
            divChart.html('<canvas id="myChart' + numChart + '" style="max-height: 170px; width: 500px;"></canvas>');

            ctxChart04 = document.getElementById('myChart' + numChart).getContext('2d');
            configChart04.data.datasets = crearDataChart(idMes).slice();

            function crearDataChart(idMes) {
                let dataTmp = new Array;

                if (dataChart04.dataFacturado[idMes] !== '' && (!isNaN(dataChart04.dataFacturado[idMes]))) {
                    dataTmp[0] = {
                        data: dataChart04.dataFacturado.slice(idMes, (parseInt(idMes) + 1)),
                        backgroundColor: colores15[5],
                        label: ["Facturado"]
                    };
                } else {
                    dataTmp[0] = {
                        data: [0],
                        backgroundColor: colores15[5],
                        label: ["Facturado"]
                    };
                }
                if ((dataChart04.dataPendiente[idMes] !== '') && (!isNaN(dataChart04.dataPendiente[idMes]))) {
                    dataTmp[1] = {
                        data: dataChart04.dataPendiente.slice(idMes, (parseInt(idMes) + 1)),
                        backgroundColor: colores15[6],
                        label: ["Pendiente"]
                    };
                } else {
                    dataTmp[1] = {
                        data: [0],
                        backgroundColor: colores15[6],
                        label: ["Pendiente"]
                    };
                }

                return dataTmp;
            }

            console.log("DENTRO DE UPDATECHART");

        }

        //AUXILIARES LISTENERS

        setTimeout(function () {
            console.log("POSICION ON CHANGE CARGADO");
            $('select#chart02SelectEspecies').on('change', function () {

                var idEspecie = $(this).val();
                //diraheta////ActualizarChart02(idEspecie);
                setTimeout(function () {
                    console.log('CHART02 EN ONCHANGE');
                    dataChart02.labelDatasets = '# OTRO';


                    llenarTablaChart02();
                    myChart02.destroy();
                    //ACTUALIZAR CHART02
                    updateDataChart02(dataChart02.labels, dataChart02.data, '02');


                    myChart02 = new Chart(ctxChart02, configChart02);

                }, 500);
            });

            $('select#chart03SelectMeses').on('change', function () {

                var idMes = $(this).val();
                var mes = $('select#chart03SelectMeses option:selected').text();
                // ACTUALIZAR CHART03


                setTimeout(function () {
                    console.log('CHART03 EN ONCHANGE');

                    myChart03.destroy();
                    //ACTUALIZAR CHART03
                    updateDataChart03(dataChart03.labels, dataChart03.data, '03', idMes);
                    configChart03.data.labels[0] = mes;

                    myChart03 = new Chart(ctxChart03, configChart03);

                }, 350);
            });

            $('select#chart04SelectMeses').on('change', function () {

                var idMes = $(this).val();
                var mes = $('select#chart04SelectMeses option:selected').text();
                // ACTUALIZAR CHART04


                setTimeout(function () {
                    console.log('CHART04 EN ONCHANGE');

                    myChart04.destroy();
                    //ACTUALIZAR CHART04
                    updateDataChart04(dataChart04.labels, dataChart04.data, '04', idMes);
                    configChart04.data.labels[0] = mes;

                    myChart04 = new Chart(ctxChart04, configChart04);

                }, 350);
            });
        }, 750);





    }, 950);

    //TRAER DATOS PARA CHART01
    get('/ws/dashboard.aspx/GenerarReporteVentasQuincenal')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let tmpD = new Array;
                let tmpL = new Array;
                let i = 0;
                $(res).each(function () {
                    let fecha = new Date(this.FECHAEMISION);
                    if (i < res.length - 1) {
                        tmpD.push(parseInt(this.CANTIDAD));
                        tmpL.push(meses[fecha.getMonth()] + '-' + (fecha.getDate()).toString());
                    }
                    else {
                        tmpD.push(parseInt(this.CANTIDAD));
                        tmpL.push(meses[fecha.getMonth()] + '-' + (fecha.getDate()).toString());
                    }
                    i++;
                });
                dataChart01.data = tmpD.slice(0);
                dataChart01.labels = tmpL.slice(0);
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });

    //TRAER DATOS PARA CHART02
    function ActualizarChart02(idEspecie) {
        get('/ws/dashboard.aspx/GenerarReporteProductosMasVendidoPorEspecie', JSON.stringify({ id: idEspecie }))
            .then(function (res) {
                var r = JSON.stringify(res);
                //diraheta
                console.log(res);
                if (r.startsWith('[{"ERROR":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {
                    let tmpD = new Array();
                    let tmpP = new Array();
                    console.log("POSICION ACTUALZIAR: " + idEspecie);
                    $(res).each(function () {
                        tmpD.push(parseInt(this.CANTIDADVENDIDA));
                        tmpP.push(this.PRODUCTO);

                    });
                    dataChart02.data = tmpD.slice();
                    dataChart02.labels = tmpP.slice();
                }
            }).catch(function (error) {
                //diraheta
                console.log(error);
                Alerta(error, "ERROR!");
            });
    }

    setTimeout(function () {
        let idEspecieListSelected = $("#chart02SelectEspecies").val();
        console.log("POR AQUI DE NUEVO_: " + idEspecieListSelected);
        //diraheta////ActualizarChart02(idEspecieListSelected); //REVISAR AQUI
    }, 700);

    function LlenarSelectEspecies(select) {
        get('/ws/especies.aspx/ListarTodasLasEspecies')
            .then(function (res) {
                var r = JSON.stringify(res);
                if (r.startsWith('[{"ERROR":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {

                    let especies = res.map(x => `<option value="${x.ID_ESPECIE}">${x.ESPECIE}</option>`).join('')
                    document.querySelector(select).innerHTML = especies

                    //Codigo modificado por el de arriba, fecha: 27/10/2022
                    // let selectHTML = '';
                    // $(res).each(function (index) {
                    //     if (index == 0) {
                    //         selectHTML += '<option value="' + this.ID_ESPECIE + '" selected>' + this.ESPECIE + '</option>'
                    //     } else {
                    //         selectHTML += '<option value="' + this.ID_ESPECIE + '">' + this.ESPECIE + '</option>'
                    //     }
                    // });
                    //$("#chart02SelectEspecies").html(selectHTML);

                    // $(select).html(selectHTML);

                }
            }).catch(function (error) {
                Alerta(error, "ERROR!");
            });

    }

    //Traer datos CHART 03
    get('/ws/dashboard.aspx/GenerarRankingProductosMes')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let tmpD = new Array();
                let tmpL = new Array();
                let tmpP = new Array();
                $(res).each(function () {
                    let fecha = 0;
                    let tmp1 = 0;
                    let tmp2 = 0;
                    let tmp3 = 0;
                    let tmpDate = new Date(this.FECHA)
                    fecha = parseInt(tmpDate.getMonth() + 2);

                    tmp1 = (parseInt(fecha * 3) - 3);
                    tmp2 = (parseInt(fecha * 3) - 2);
                    tmp3 = (parseInt(fecha * 3) - 1);


                    if ((tmpD[tmp1] !== '') && (isNaN(tmpD[tmp1]))) {
                        tmpD[(fecha * 3) - 3] = (parseInt(this.CANTIDAD));
                        tmpP[(fecha * 3) - 3] = this.PRODUCTO;

                    } else if ((tmpD[tmp2] !== '') && (isNaN(tmpD[tmp2]))) {
                        tmpD[(fecha * 3) - 2] = (parseInt(this.CANTIDAD));
                        tmpP[(fecha * 3) - 2] = this.PRODUCTO;
                    } else if ((tmpD[tmp3] !== '') && (isNaN(tmpD[tmp3]))) {
                        tmpD[(fecha * 3) - 1] = (parseInt(this.CANTIDAD));
                        tmpP[(fecha * 3) - 1] = this.PRODUCTO;
                    }

                });
                dataChart03.data = tmpD.slice();
                dataChart03.labels = tmpP.slice();
                dataChart03.fechas = tmpL.slice();
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });

    //Traer DATOS CHART04
    get('/ws/dashboard.aspx/ComparacionFacturacionVsGeneradosMensual')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {

                $(res).each(function () {
                    let fecha = 0;

                    fecha = this.FECHA;

                    if (this.STATUS == 1) {
                        dataChart04.dataPendiente[fecha] = this.MONTO;
                    } else if (this.STATUS == 2) {
                        dataChart04.dataFacturado[fecha] = this.MONTO;
                    }

                });

            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });

    //TRAER DATOS CHART 5 
    function cargaOrdenes(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'stickyTable table-bordered table-sm table-striped table-hover',
            columnas: [

                { leyenda: 'Producto', ordenable: false, columna: 'DESCRIPCION', filtro: true },
                //{ leyenda: 'Precio Venta', class: 'text-center thp',  ordenable: false, columna: '', filtro: true },
                { leyenda: 'Stock', ordenable: false, columna: 'STOCK', filtro: true },
                { leyenda: 'Días Stock', ordenable: false, columna: 'DIASSTOCK', filtro: true },
            ],
            modelo: [

                { propiedad: 'DESCRIPCION', class: 'text-center ' },
                // { propiedad: '' },
                { propiedad: 'STOCK', class: 'text-center' },
                { propiedad: 'DIASSTOCK', class: 'text-center' }

            ],
            url: '/ws/registros.aspx/listarVtasP',
            parametros: JSON.stringify(param),
            paginable: false,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'id',
            loader: "pre0",
            columna_orden: 'ASC'
        };

        $("#myChart05").MALCO(data);

        //$("#myChart05 div").css("max-width", 430);
        $("#myChart05 div").css("max-height", 300);



    }

    //TRAER DATOS CHART 6
    get('/ws/dashboard.aspx/GenerarRankingFacturasPendientesPorPagar')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                console.log("CHART 06----");
                let tmpF = new Array();
                let tmpI = new Array();

                $(res).each(function () {
                    let fecha;
                    let importe = 0.0;
                    let tmpDate = new Date(this.FECHA)
                    fecha = meses[parseInt(tmpDate.getMonth())] + "-" + tmpDate.getDate();
                    importe = parseFloat(this.IMPORTE).toFixed(2);
                    console.log(importe);
                    console.log(fecha);
                    tmpF.push(fecha);
                    tmpI.push(importe);
                });
                console.log();
                dataChart06.data = tmpI.slice(0);
                dataChart06.labels = tmpF.slice(0);
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });

    //INDICADOR 01
    get('/ws/dashboard.aspx/GenerarCantidadPedidosVentaHoy')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                console.log("INDICADOR 01----");
                let tmpT = 0;
                let meta = 500;
                let texto = '';

                $(res).each(function () {
                    console.log(this.CANTIDAD)
                    if (this.CANTIDAD > 0) {
                        tmpT = this.CANTIDAD;
                    } else {
                    }
                });

                if (parseInt(tmpT) >= meta) {
                    $("#indicadorIcon01").attr('Style', 'color:#35df39');
                }
                texto = '' + tmpT;
                maquinaEscribir(texto, $("#indicador01 div"));
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });

    //INDICADOR 02
    get('/ws/dashboard.aspx/GenerarImporteVentaHoy')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                console.log("INDICADOR 02----");
                let tmpT = '0.00';
                let meta = 5000;

                $(res).each(function () {
                    console.log(this.IMPORTE)
                    if (this.IMPORTE > 0) {
                        tmpT = '' + parseFloat(this.IMPORTE).toFixed(2);
                    } else {
                    }
                });

                if (parseInt(tmpT) >= meta) {
                    $("#indicadorIcon02").attr('Style', 'color:#35df39');
                }
                maquinaEscribir("S/ " + tmpT, $("#indicador02 div"));
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });

    //INDICADOR 03
    get('/ws/dashboard.aspx/GenerarReportePendientePorPagarAcumulado')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                console.log("INDICADOR 03----");
                let tmpT = '0.00';
                let meta = 0;

                $(res).each(function () {
                    console.log(this.IMPORTE)
                    if (this.IMPORTE > 0) {
                        tmpT = '' + parseFloat(this.IMPORTE).toFixed(2);
                    } else {
                    }
                });

                if (parseInt(tmpT) == meta) {
                    $("#indicadorIcon03").attr('Style', 'color:#35df39');
                }
                maquinaEscribir("S/ " + tmpT, $("#indicador03 div"));
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });

    //INDICADOR 04
    get('/ws/dashboard.aspx/generarImporteFacturasPendientesHoy')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let tmpT = '0.00';
                let meta = 0;

                $(res).each(function () {
                    console.log(this.IMPORTE)
                    tmpT = '' + parseFloat(this.IMPORTE).toFixed(2);
                });

                if (parseInt(tmpT) >= meta) {
                    $("#indicadorIcon04").attr('Style', 'color:#35df39');
                }
                maquinaEscribir("S/ " + tmpT, $("#indicador04 div"));
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });

    //COMODIN PARA TRAER EL INVENTARIO AISLADO
    //get('/ws/inventarios.aspx/listarInv', JSON.stringify({ idAlmacen: 3 }))
    //    .then(function (res) {
    //    })
    //    .catch(function (error) {
    //        Alerta("No fue posible cargar el inventario<br />" + error, "ERROR!");
    //    });

    //COMODIN PARA Regenerar los saldos
    //get('/ws/inventarios.aspx/RegeneraCostos', JSON.stringify({ idAlmacen: 3 }))
    //    .then(function (res) {
    //    })
    //    .catch(function (error) {
    //        Alerta("No fue posible cargar el inventario<br />" + error, "ERROR!");
    //    });

    /*
    var configChart02 = {
        type: 'bar',
        data: {
            datasets: [{
                data: dataChart02,
                backgroundColor: ['#583d72', '#9f5f80', '#e08f62', '#ff8e71'],
                label: 'Dataset 1'
            }],
            labels: [
                'Red',
                'Orange',
                'Yellow',
                'Green'
            ]
        },
        options: {
            legend: {
                labels: {
                    boxWidth: 12
                }
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            plugins: {
                datalabels: {
                    color: '#fff',
                    font: {
                        size: '10'
                    }
                }
            }
        }
    };
    */
    /*
    let colores03 = ['#FB3640', '#EFCA08', '#43AA8B', '#253D5B'];
    
    
    var configChart03 = {
        type: 'pie',
        data: {
            datasets: [{
                data: dataChart03,
                backgroundColor: colores15,
                label: 'Dataset 1'
            }],
            labels: labelsChart03
        },
        options: {
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    boxWidth: 12
                }
            },
            plugins: {
                datalabels: {
                    color: '#fff',
                    anchor: 'end',
                    align: 'start',
                    offset: 4,
                    font: {
                        size: '10'
                    },
                    formatter: (value) => {
                        return value + '%';
                    }
                }
            },
            maintainAspectRatio: false,
            responsive: true
        }
    };
    */
    /*
    var configChart04 = {
        type: 'pie',
        data: {
            datasets: [{
                data: dataChart04,
                backgroundColor: ['#61b15a', '#adce74', '#9dab86', '#ffce89', '#cc7351'],
                label: 'Dataset 1'
            }],
            labels: labelsChart04
        },
        options: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12
                }
            },
            plugins: {
                datalabels: {
                    color: '#fff',
                    anchor: 'end',
                    align: 'start',
                    offset: 4,
                    font: {
                        size: '10'
                    },
                    formatter: (value) => {
                        return value + '%';
                    }
                }
            },
            maintainAspectRatio: false,
            responsive: true
        }
    };
    */

    //FUNCIONES AUXILIARES

    function llenarTablaChart02() {
        let chart02TablaHTML = '';
        let sum = 0;
        let porcentaje = 0.0;

        dataChart02.data.forEach(function myfunction(item, index) {
            sum = sum + parseInt(item);
        });
        console.log("POR AQUI OTRA VEZ: " + dataChart02.data.length);
        if (dataChart02.data.length <= 0) {
            $("#chart02Table tbody").html('<tr><td></td><td> SIN REGISTROS</td></tr>');
        } else {
            dataChart02.data.forEach(function (item, index) {

                porcentaje = (parseInt(item) * 100) / sum;

                chart02TablaHTML += '<tr>' +
                    '<td style="background-color:' + colores15[index] + ';color:black;">' + porcentaje.toFixed(1) + '</td>' +
                    '<td>' + dataChart02.labels[index] + '</td>' +
                    '</tr>';
                $("#chart02Table tbody").html(chart02TablaHTML);
            })
        }

    }

    function maquinaEscribir(texto, ubicacion) {
        let arrFromStr = texto.split('');
        let i = 0;
        ubicacion.html('');
        let printStr = setInterval(function () {
            ubicacion.html(ubicacion.html() + arrFromStr[i]);
            i++;
            if (i === arrFromStr.length) {
                clearInterval(printStr);
            }
        }, 70);
    }

    $(document).ready(function () {
        console.log("CARGA ORDENES");
        cargaOrdenes();

        LlenarSelectEspecies("#chart02SelectEspecies");
    });

    /*
    var ctxChart05 = document.getElementById('myChart05').getContext('2d');
    var myChart05 = new Chart(ctxChart05, configChart05);
    */
    function hoy() {
        let hoy = new Date();
        let fechaHoy = '';
        let ano = '';
        let mes = '';
        let dia = '';
        ano = hoy.getFullYear();

        if (hoy.getDate() < 10) {
            dia = '0' + hoy.getDate();
        } else {
            dia = hoy.getDate();
        }

        if ((hoy.getMonth() + 1) < 10) {
            mes = '0' + (parseInt(hoy.getMonth()) + 1);
        } else {
            mes = '' + (parseInt(hoy.getMonth()) + 1);
        }

        fechaHoy = dia + '/' + mes + '/' + ano;
        return fechaHoy;
    }

    $("#hoy").html("ACTUALIZADO AL: " + hoy());

})(jQuery);