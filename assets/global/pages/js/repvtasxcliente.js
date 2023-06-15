var idCliente = "0";
var idContacto = "0";

var fechaIni = '';
var fechaFin = '';
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

    fechaHoy = ano + '-' + mes + '-' + dia;
    return fechaHoy;
}

$(document).ready(function () {

    $('.datepicker').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });

    });
    cargaSerie(1);
    $("#serieVal").change(function () {
        cargaSerieNumero($(this).val());
    });

    $('.select2').each(function () {
        $(this).select2({
            width: '100%'
        });
    });
});

//Listamos en el select los clientes
//get('/ws/Clientes.aspx/ListarTodos')
//    .then(function (res) {
//        var r = JSON.stringify(res);
//        if (r.startsWith('[{"ERROR":', 0)) {
//            var err = "";
//            $(res).each(function () {
//                err += this.Error;
//            });
//            Alerta(err, "ERROR!");
//        } else {
//            $('#clientesSelect').append("<option ruc='0' value='0'>Todos</option>");
//            $(res).each(function () {
//                $('#clientesSelect').append("<option ruc='" + this.RUC + "' value=" + this.ID + ">" + this.NOMBRE + "</option>");
//            });
//        }
//    }).catch(function (error) {
//        Alerta(error, "ERROR!");
//    });

get('/ws/Contactos.aspx/Consultar', JSON.stringify({ id: 0 }))
    .then(function (res) {
        if (res.Respuesta === 1) {
            if (res.Info !== null) {
                $('#contSelect').append("<option ruc='0' value='0'>Todos</option>");

                $(res.Info).each(function () {
                    $("#contSelect").append('<option ruc="' + this.nom + '" value="' + this.id + '">' + this.nom + '</option>');
                });
            }
        } else {
            Alerta(res.Mensaje, "ERROR!");
        }
    })
    .catch(function (error) {
        Alerta("No fue posible cargar el listado de contactos<br />" + error, "ERROR!");
    });

function cargaClientes(id) {
    $("#clientesSelect").empty();

    get('/ws/Clientes.aspx/ConsultarCont', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $('#clientesSelect').append("<option ruc='0' value='0'>Todos</option>");
                    $.each(res.Info, function () {
                        $("#clientesSelect").append('<option ruc="' + this.NUMERO_DOCUMENTO + '" value="' + this.ID_CLIENTE + '">' + this.NOMBRE_CLIENTE + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });
}


/*COMBOS PARA SERIE Y NUMERO*/
function cargaSerie(id) {
    $("#serieVal").empty();

    get('/ws/RepVtasXCliente.aspx/obtenerSerieVentas', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $('#serieVal').append("<option value='0'>Seleccionar</option>");
                    $.each(res.Info, function () {
                        $("#serieVal").append('<option  value="' + this.serie + '">' + this.serie + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de series <br/>" + error, "ERROR");
        });
}


function cargaSerieNumero(id) {
    $("#numeroVal").empty();

    get('/ws/RepVtasXCliente.aspx/obtenerNumeroxSerieVentas', JSON.stringify({ serie: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $('#numeroVal').append("<option value='0'>Seleccionar</option>");
                    $.each(res.Info, function () {
                        $("#numeroVal").append('<option  value="' + this.numero + '">' + this.numero + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de números <br/>" + error, "ERROR");
        });
}
/*FIN COMBOS PARA SERIE Y NUMERO*/

//Creamos el Tbody de Venta Por cliente
function TbodyVentaPorCliente(idCliente = 0, presionado = false, idContacto = 0) {
    $('#tblRepVtas').attr('cliente', $('#especiesSelect option:selected').text());
    let from = $("#fechaIni").val().split("/");
    let fechaIni = new Date(from[2], from[1] - 1, from[0]);
    let hasta = $("#fechaFin").val().split("/");
    let fechaFin = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    let vserie = $("#serieVal").val();
    let vnumero = $("#numeroVal").val();

    get('/ws/RepVtasXCliente.aspx/ListarVentaPorCliente', JSON.stringify({ idCliente: idCliente, fechaIni: fechaIni, fechaFin: fechaFin, idContacto: idContacto, serie: vserie, numero: vnumero }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let tableHTML = '';
                $(res).each(function () {
                    if (this.SERIE != undefined) {
                        tableHTML += "<tr>";
                        tableHTML += "<td>";
                        if (this.TIPO_VENTA == "PE") {
                            tableHTML += "Venta Anticipada";
                        } else if (this.TIPO_VENTA == "GR") {
                            tableHTML += "Venta Final";
                        } else if (this.TIPO_VENTA == "TP") {
                            tableHTML += "Venta Temporal";
                        }
                        tableHTML += "</td>";
                        tableHTML += "<td>";
                        tableHTML += this.SERIE;
                        tableHTML += "</td>";
                        tableHTML += "<td>";
                        tableHTML += this.NUMERO;
                        tableHTML += "</td>";
                        tableHTML += "<td>";
                        tableHTML += this.CLIENTE;
                        tableHTML += "</td>";
                        tableHTML += "<td>";
                        //if (this.TIPOCOL == "dat") {
                        //    tableHTML += formatoFecha(this.FECHAEMISION.slice(0, 10), 1);
                        //}
                        tableHTML += this.FECHAEMISION;
                        tableHTML += "</td>";
                        tableHTML += "<td>";
                        tableHTML += this.MEDIDA;
                        tableHTML += "</td>";
                        tableHTML += "<td>";
                        tableHTML += this.CANTIDAD;
                        tableHTML += "</td>";
                        tableHTML += "<td>";
                        if (this.TIPOCOL == "dat") {
                            tableHTML += "S/." + this.TOTAL;
                        }
                        tableHTML += "</td>";
                        tableHTML += "</tr>";
                    }
                });

                $('#txtRegistros').attr("cantRegistros", res.length);
                if (res.length <= 0) {
                    $('#txtRegistros').html("No existen registros para los filtros aplicados");
                    if (presionado) {
                        Alerta("No existen registros para el filtro aplicado." 
                           // "<b>Fecha Inicio: </b>" + fechaIni + "</br>" +
                            //"<b>Fecha Fin:</b> " + fechaFin + "</br>" +
                            //"<b>Cliente: </b>" + $('#clientesSelect option:selected').text()
                            , "AVISO");
                    }
                } else {
                    $('#txtRegistros').html(res.length + " registros");
                }
                $('#tblRepVtas table tbody').html(tableHTML);
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });
}


//Exportamos a Excel la tabla html

function ExportarExcelVentaPorCliente(tipo) {
    var jsondet = [];
    var tpon = "";
    $("#tblRepVtas table tbody").children("tr").each(function (index) {
        var flag = false;
        if (tipo === "All") {
            tpon = "vista_total";
            flag = true;
        } else {
            tpon = "vista_parcial";
            if ($(this).is(':visible')) {
                flag = true;
            }
        }
        if (flag === true) {
            var Tipo, Serie, Numero, Cliente, Fecha, UndMed, Cant, Total;
            $(this).children("td").each(function (ind) {
                switch (ind) {
                    case 0:
                        Tipo = $(this).html();
                        break;
                    case 1:
                        Serie = $(this).html();
                        break;
                    case 2:
                        Numero = $(this).html();
                        break;
                    case 3:
                        Cliente = $(this).html();
                        break;
                    case 4:
                        Fecha = $(this).html();
                        break;
                    case 5:
                        UndMed = $(this).html();
                        break;
                    case 6:
                        Cant = $(this).html();
                        break;
                    case 7:
                        Total = $(this).html();
                        break;
                }
            });
            if (Serie !== "") {
                var fila = {
                    Tipo: Tipo,
                    Serie: Serie,
                    Numero: Numero,
                    Cliente: Cliente,
                    FechaEmision: Fecha,
                    Medida: UndMed,
                    Cantidad: Cant,
                    Total: Total,
                };
                jsondet.push(fila);
            }
        }
    });

    if (jsondet.length > 0) {
        var json = {
            json: JSON.stringify(jsondet),
            vista: tpon
        };

        get('/ws/RepVtasXCliente.aspx/ReporteVtaXClienteExportarExcel', JSON.stringify(json))
            .then(function (res) {
                var r = JSON.stringify(res);
                r = r.replace("\"", "");
                r = r.replace("\"", "");
                if (r.startsWith('[{"ERROR":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {
                    window.location.replace("/assets/" + r);
                }
            }).catch(function (error) {
                Alerta(error, "ERROR!");
            });
    }
}

$('#clientesSelect').on('change', function () {
    /*//DESCOMENTAR SI SE DESEA CARGAR LOS PRODUCTOS EN CADA CAMBIO DEL SELECT CLIENTES
    idCliente = $('#clientesSelect option:selected').val();
    fechaIni = $("#fechaIni").val();
    fechaFin = $("#fechaFin").val();
    TbodyVentaPorCliente(idCliente, fechaIni, fechaFin)
    */
});
$('#contSelect').change(function () {
    if ($("#contSelect").val() !== "") {
        cargaClientes($("#contSelect").val());
    }
});
$('#txtNombreRuc').on('keyup', function () {
    let filtro = $('#txtNombreRuc').val();
    let _this = this;
    $('#clientesSelect option').each(function () {
        let nombre = $(this).text().toUpperCase();
        let ruc = $(this).attr('ruc');
        let validador = 0;
        let contador = 0;

        if (nombre.indexOf(filtro.toUpperCase()) !== -1 || ruc.indexOf(filtro) !== -1) {
            $(this).show();
            if (validador === 0) {
                $(this).attr("selected", true);
                $('#clientesSelect').val($(this).val());

                validador++;
            } else {
                $(this).attr("selected", false);
            }
        } else {
            $(this).attr("selected", false);
            $(this).hide();
            contador++;
            if ($(this).attr("style") == "display: none;" && contador == $('#clientesSelect option').length) {
                $('#clientesSelect').val('');
            }
        }
        if (filtro == '') {
            $(this).show();
            $('#clientesSelect option:first-child').attr("selected", true);
        }
    });
});

$('#txtNombreCONT').on('keyup', function () {
    let filtro = $('#txtNombreCONT').val();
    let _this = this;
    $('#contSelect option').each(function () {
        let nombre = $(this).text().toUpperCase();
        let validador = 0;
        let contador = 0;

        if (nombre.indexOf(filtro.toUpperCase()) !== -1) {
            $(this).show();
            if (validador === 0) {
                $(this).attr("selected", true);
                $('#contSelect').val($(this).val());
                if ($("#contSelect").val() !== "") {
                    cargaClientes($(this).val());
                }
                validador++;
            } else {
                $(this).attr("selected", false);
            }
        } else {
            $(this).attr("selected", false);
            $(this).hide();
            contador++;
            if ($(this).attr("style") == "display: none;" && contador == $('#contSelect option').length) {
                $('#contSelect').val('');
            }
        }
        if (filtro == '') {
            $(this).show();
            $('#contSelect option:first-child').attr("selected", true);
        }
    });
});

$('#btnFiltro').on('click', function myfunction() {
    if (validarIntervaloFechas()) {
        idCliente = $('#clientesSelect option:selected').val();
        idContacto = $('#contSelect option:selected').val();

        TbodyVentaPorCliente(idCliente, true, idContacto);
    }
});

$('#btnExportarExcel').on('click', function myfunction() {
    if (validarRegistrosTabla()) {
        ExportarExcelVentaPorCliente("All");
    }
});

function validarRegistrosTabla() {
    let existenRegistros = false;
    if ($('#txtRegistros').attr("cantRegistros") != undefined && $('#txtRegistros').attr("cantRegistros") > 0) {
        existenRegistros = true;
    } else {
        Alerta("NO EXISTEN REGISTROS EN LA TABLA<br> Aplicar otro filtro para cargar registros en la tabla.", "AVISO");
    }
    return existenRegistros;
}

function validarIntervaloFechas() {
    fechaIni = convierteFechaValida($("#fechaIni").val(), "/", 1);
    fechaFin = convierteFechaValida($("#fechaFin").val(), "/", 1);
    let valido = false;

    if (fechaIni !== undefined || fechaFin !== undefined) {
        if (fechaIni <= fechaFin) {

            valido = true;
        } else {
            Alerta("INTERVALO DE FECHAS NO PERMITIDO<br>Fecha Inicio es mayor a Fecha Final", "ERROR!");
        }
    } else {
        Alerta("INTERVALO DE FECHAS NO DEFINIDO", "ERROR!");
    }

    return valido;
}

//Cargamos los registros por defecto a la tabla sin generar alerta
TbodyVentaPorCliente(0);

//Asignamos fechas de input date
$("#fechaIni").val(hoy());
$("#fechaFin").val(hoy());