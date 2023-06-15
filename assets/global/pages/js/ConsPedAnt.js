$(document).ready(function () {
    cargaGuias();
    cargaClientes();
    $("#accordionSidebar").addClass("toggled");

    $('#fini').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
    $('#ffin').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });

    $(".gj-icon").each(function () {
        if ($(this).parent().parent().parent().parent()[0].id === "busqueda") {
            $(this).css({ "margin-left": "-2px", "margin-top": "-5px" }).parent().height("17px").css({ "margin-left": "-7px", "margin-right": "10px" }).hide();
        }
        else {
            $(this).css({ "margin-top": "0" });
        }
    });
    $('.select2').each(function () {
        $(this).select2({
            width: '100%'
        });
    });
    $("#bbus").on("click", function () {
        cargaVentas();
    });

    $("#regvent").on("click", function () {
        window.location.href = "/pages/vtas/Ventas.aspx";

    });

});

function cargaVentas2(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
        columnas: [
            { leyenda: '#Viaje', class: 'text-center thp', ordenable: false, columna: 'NoViaje', filtro: true },
            { leyenda: 'Empresa', class: 'text-center thp', ordenable: false, columna: 'NOMBRE1', filtro: false },
            { leyenda: 'Marca', class: 'text-center thp', ordenable: false, columna: 'MARCANOMBRE', filtro: true },
            { leyenda: 'Placa', class: 'text-center thp', ordenable: false, columna: 'PLACA', filtro: false },
            { leyenda: 'Conductor', class: 'text-center thp', ordenable: false, columna: 'TRANSPORTISTA', filtro: true },
            { leyenda: 'Producto', class: 'text-center thp', ordenable: false, columna: 'DESCRIPCION', filtro: true },
            { leyenda: 'Unidad Medida', class: 'text-center thp', ordenable: false, columna: 'UNIDAD_MEDIDA', filtro: true },
            { leyenda: 'Cantidad', class: 'text-center thp', ordenable: false, columna: 'CANTIDAD', filtro: true },
        ],
        modelo: [
            { propiedad: 'NoViaje', class: 'text-center tdp' },
            { propiedad: 'NOMBRE1', class: 'text-center tdp' },
            { propiedad: 'MARCANOMBRE', class: 'text-center tdp' },
            { propiedad: 'PLACA', class: 'text-center tdp' },
            { propiedad: 'TRANSPORTISTA', class: 'text-center tdp' },
            { propiedad: 'DESCRIPCION', class: 'text-center tdp' },
            { propiedad: 'UNIDAD_MEDIDA', class: 'text-center tdp' },
            { propiedad: 'CANTIDAD', class: 'text-center tdp' },

        ],
        url: '/ws/RegVtas.aspx/ListarVentTrans',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [20, 25, 50],
        columna: 'NOMBRE',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#PedTrans").MALCO(data);
}
function cargaGuias() {
    $("#guia").empty().append('<option value="0">Seleccionar</option>');

    get('/ws/RegVtas.aspx/ConsultarT', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#guia").append('<option value="' + this.ID_VENTAS + '">' + this.SERIE + '-' + this.NUMERO +'</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de guias<br/>" + error, "ERROR");
        });
}
function cargaClientes() {
    $("#cli").empty().append('<option value="0">Seleccionar</option>');
    get('/ws/Clientes.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#cli").append('<option value="' + this.id + '">' + this.numdoc+ '-' + this.nom +'</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de clientes<br/>" + error, "ERROR");
        });
}

function cargaVentas() {
    let param = new Object();
    var from = $("#fini").val().split("/");
    var f = new Date(from[2], from[1] - 1, from[0]);
    var hasta = $("#ffin").val().split("/");
    var h = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    var vguia = $("#guia").val();
    var cli = $("#cli").val();

    $("#infoven tbody").empty();
    get('/ws/RegVtas.aspx/ListarVentAnts', JSON.stringify({ desde: f, hasta: h, guia: vguia, cliente: cli}))
        .then(function (res) {
            var r = JSON.stringify(res);
            $("#infoven tbody").html("");
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                $(res).each(function () {
                    id = $("#infoven tbody tr").length;
                    let fila = "";
                    //let idvent = this.id;
                    //fila = '<tr id="f' + id + '">' +
                    fila = '<tr>' +
                        '<td class="tdp">' + this.SERIE + '</td>' +
                        '<td class="tdp">' + this.NUMERO + '</td>' +
                        '<td class="tdp">' + this.FECHAEMISION + '</td>' +
                        '<td class="tdp">' + this.RUC + '</td>' +
                        '<td class="tdp">' + this.RAZONSOCIAL + '</td>' +
                        '<td class="tdp">' + this.VENDEDOR + '</td>' +
                        '<td class="tdp">' + this.CONDPAGO + '</td>' +
                        '<td class="tdp">' + this.ESTADO + '</td>' +
                        '<td class="tdp">' + this.PRODUCTO + '</td>' +
                        '<td class="tdp">' + this.MEDIDA + '</td>' +
                        '<td class="tdp">' + this.CANTIDAD + '</td>' +
                        '<td class="tdp">' + this.PRECIO + '</td>' +
                        '<td class="tdp">' + this.TOTAL + '</td>' +
                        '</tr>';
                    $("#infoven tbody").append(fila);
                });
                if (res.length <= 0) {
                    Alerta("No existen registros para el filtro aplicado.</br>" +
                        "<b>Desde: </b>" + $("#fini").val() + "</br>" +
                        "<b>Hasta:</b> " + $("#ffin").val() + "</br>" +
                        "<b>Guia: </b>" + $('#guia option:selected').text() + "</br>" +
                        "<b>Cliente:</b>" + $('#cli option:selected').text(), "AVISO");
                }
            }


        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
        });

}


//REportes e pdf y excel
function exportar(tipo) {
    var jsondet = [];
    var i = 1;

    $("#infoven tbody").children("tr").each(function (index) {
        var viaje, empresa, marca, placa, conductor, producto, um, cant;
        $(this).children("td").each(function (ind1) {
            switch (ind1) {
                case 0:
                    viaje = $(this).html();
                    break;
                case 1:
                    empresa = $(this).html();
                    break;
                case 2:
                    marca = $(this).html();
                    break;
                case 3:
                    placa = $(this).html();
                    break;
                case 4:
                    conductor = $(this).html();
                    break;
                case 5:
                    producto = $(this).html();
                    break;
                case 6:
                    um = $(this).html();
                    break;
                case 7:
                    cant = $(this).html();
                    break;

            }
        });
        var fila = {
            Viaje: viaje,
            Empresa: empresa,
            Marca: marca,
            Placa: placa,
            Conductor: conductor,
            Producto: producto,
            UM: um,
            Cant: cant
        };
        jsondet.push(fila);


    });
    if (jsondet.length > 0) {
        var json = {
            json: JSON.stringify(jsondet),
        };
        get('/ws/RegVtas.aspx/ExportarPedidosT', JSON.stringify(json))
            .then(function (res) {
                //var r = JSON.stringify(res);
                var resp = JSON.stringify(res);
                resp = resp.replace("\"", "");
                resp = resp.replace("\"", "");
                if (resp.startsWith("Error:")) {
                    Alerta(Resp, "ERROR!");
                } else {
                    window.location.replace("/assets/" + resp);
                }
            })
            .catch(function (error) {
                Alerta("No fue posible generar el archivo<br />" + error, "ERROR!");
            });
    } else {
        Alerta("No hay nada que exportar", "Error!", typIconoAlerta.aviso);
    }
}

function genpdf() {
    var jsondet = [];
    var i = 1;

    $("#infoven tbody").children("tr").each(function (index) {
        var viaje, empresa, marca, placa, conductor, producto, um, cant, cod, cat, fecemi;
        $(this).children("td").each(function (ind1) {
            switch (ind1) {
                case 0:
                    viaje = $(this).html();
                    break;
                case 1:
                    empresa = $(this).html();
                    break;
                case 2:
                    marca = $(this).html();
                    break;
                case 3:
                    placa = $(this).html();
                    break;
                case 4:
                    conductor = $(this).html();
                    break;
                case 5:
                    producto = $(this).html();
                    break;
                case 6:
                    um = $(this).html();
                    break;
                case 7:
                    cant = $(this).html();
                    break;
                case 8:
                    cat = $(this).html();
                    break;
                case 9:
                    cod = $(this).html();
                    break;
                case 10:
                    fecemi = $(this).html();
                    break;
            }
        });
        var fila = {
            Viaje: viaje,
            Empresa: empresa,
            Marca: marca,
            Placa: placa,
            Conductor: conductor,
            Producto: producto,
            UM: um,
            Cant: cant,
            Codigo: cod,
            Categoria: cat,
            FechaEmision: fecemi
        };
        jsondet.push(fila);


    });
    if (jsondet.length > 0) {
        var desde = $("#bfec").val().split("/");
        var d = new Date(desde[2], desde[1] - 1, desde[0]);
        var hasta = $("#bfech").val().split("/");
        var h = new Date(hasta[2], hasta[1] - 1, hasta[0]);
        var guia = $("#guia").val();
        var cliente = $("#cli").val();
        var json = {
            json: JSON.stringify(jsondet),
            rangoFecha: JSON.stringify({
                desde: d,
                hasta: h
            })
        };
        get('/ws/RegVtas.aspx/GeneraPdfPedidosT', JSON.stringify(json))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Mensaje === "Existe") {
                        if (res.Mensaje !== "ErrorArchivo") {
                            $("#ContentReporte").empty();
                            var height = $(window).height();
                            $obj = $('<object>');
                            $obj.attr("data", '/' + res.Info);
                            $obj.attr("height", "100%");
                            $obj.attr("width", "100%");
                            $obj.attr("align", "middle");
                            $obj.attr("type", "application/pdf");
                            $("#Reportelabel").text($("#mod option:selected").text());
                            $("#ContentReporte").height(height);
                            $("#ContentReporte").html($obj);
                            $('#ModalReporte').modal();
                        }
                    }
                    else {
                        Alerta("Error No es posible generar el PDF");
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible generar el PDF<br />" + error);
            });
    } else {
        Alerta("No hay nada que exportar", "Error!", typIconoAlerta.aviso);
    }
}
