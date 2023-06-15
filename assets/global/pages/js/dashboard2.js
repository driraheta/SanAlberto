$(function () {
    ventasxdia();
    cobranzaxdia();
    pedidosxdia();
    TopVentas();
    ventasMensuales();
    CuentasvsCobros();
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

});
// Fin documento

function ventasxdia() {
    var response = realizarLlamadaAjax('/tmp/data/ventaxdia.json', 'GET', '');
    if (response.status == 200) {
        var datos = response.responseJSON;
        var parrafo = document.getElementById("ventasxdia");
        parrafo.textContent = 'S/ ' + datos[0].TOTAL;
    }
}

function cobranzaxdia() {
    var response = realizarLlamadaAjax('/tmp/data/cobranzaxdia.json', 'GET', '');
    if (response.status == 200) {
        var datos = response.responseJSON;
        var parrafo = document.getElementById("cobranzaxdia");
        parrafo.textContent = 'S/ ' + datos[0].MONTO_A_PAGAR;
    }
}

function pedidosxdia() {
    var response = realizarLlamadaAjax('/tmp/data/pedidosxdia.json', 'GET', '');
    if (response.status == 200) {
        var datos = response.responseJSON;
        var parrafo = document.getElementById("pedidoxdia");
        parrafo.textContent = 'S/ ' + datos[0].TOTAL;
    }
}

function TopVentas() {
    var titles = new Array();
    var valores = new Array();

    var response = realizarLlamadaAjax('/tmp/data/topventas.json', 'GET', '');

    if (response.status == 200) {
        var ventas = response.responseJSON;
        for (var ind in ventas) {
            titles.push(ventas[ind].DESCRIPCION);
            valores.push(ventas[ind].TOTAL);
        }
        /////
        const config = {
            labels: titles,
            datasets: [{
                label: 'Top Productos Mas Vendidos',
                data: valores,
                backgroundColor: [
                    '#e83e8c',
                    '#43AA8B',
                    '#FFCD56'
                ],
                hoverOffset: 3
            }]
        };
        /////
        const myChart = new Chart("TopVentas", {
            type: "doughnut",
            data: config,
            options: {
            }
        });
        /////
    }
}

function ventasMensuales() {
    var montos = new Array();
    var meses = obtenerMesesHastaActual();

    var response = realizarLlamadaAjax('/tmp/data/ventasxmes.json', 'GET', '');
    if (response.status == 200) {
        var ventas = response.responseJSON;
        for (var ind in ventas) {
            montos.push(ventas[ind].TOTAL);
        }
        const config = {
            labels: meses,
            datasets: [{
                label: 'Venta Mensual',
                data: montos,
                borderColor: '#1B78EF',
                backgroundColor: '#63A2F3',
                pointStyle: 'circle',
                pointRadius: 10,
                pointHoverRadius: 15
            }]
        };
        /////
        const myChart = new Chart("VentasxMes", {
            type: "line",
            data: config,
            options: {
                scales: {
                    x: {
                        ticks: {
                            callback: function (val, index) {
                                return this.getLabelForValue(val) + '-' + obtenerAnioActual();
                            }
                        }
                    },
                    y: {
                        ticks: {
                            callback: function (val, index) {
                                //val = val.toLocaleString("en-US");
                                return this.getLabelForValue(val).toLocaleString("es-ES");
                            }
                        }
                    }
                }
            }
        });
    }
}

function CuentasvsCobros() {
    var ventas = new Array();
    var saldos = new Array();
    var meses = obtenerMesesHastaActual();

    var responseSaldos = realizarLlamadaAjax('/tmp/data/cuentasxcobrar.json', 'GET', '');
    if (responseSaldos.status == 200) {
        var datos = responseSaldos.responseJSON;
        for (var ind in datos) {
            saldos.push(datos[ind].TOTAL * 45);
        }
    }

    var responseVentas = realizarLlamadaAjax('/tmp/data/ventasxmes.json', 'GET', '');
    if (responseVentas.status == 200) {
        var datos2 = responseVentas.responseJSON;
        for (var ind in datos2) {
            ventas.push(datos2[ind].TOTAL);
        }
    }

    ////////////
    const mixedChart = new Chart('VentasvsCobro', {
        data: {
            datasets: [{
                type: 'bar',
                label: 'Ventas',
                data: ventas,
                backgroundColor: '#43AA8B'
            }, {
                type: 'bar',
                label: 'Cobranzas',
                data: saldos,
                backgroundColor: '#FFCD56'
            }],
            labels: meses
        },
            options: {
                scales: {
                    x: {
                        ticks: {
                            callback: function (val, index) {
                                return this.getLabelForValue(val) + '-' + obtenerAnioActual();
                            }
                        }
                    },
                    y: {
                        ticks: {
                            callback: function (val, index) {
                                //val = val.toLocaleString("en-US");
                                return this.getLabelForValue(val).toLocaleString("es-ES");
                            }
                        }
                    }
                }
            }
    });
        /////////////////
}


///funcion para recoger la data..
function realizarLlamadaAjax(url, metodo, datos) {
    return $.ajax({
        url: url,
        type: metodo,
        async: false,
        data: JSON.stringify(datos),
        contentType: 'application/json',
        dataType: 'json'
    });
}

//para retornar el listado de meses a usar en la grafica, tomando en cuenta que sera en orden ordinal hasta el mes en curso.
function obtenerMesesHastaActual() {
    const meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
    ];

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();

    return meses.slice(0, mesActual + 1);
}

//retorna el anio actual pero en formato corto
function obtenerAnioActual() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const anioDosDigitos = anio.toString().slice(-2);
    return anioDosDigitos;
}
