var idEspecie = 0;
var idProducto = 0;
var fechaIni = '';
var fechaFin = '';

$(document).ready(function () {
    $('.datepicker').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    });
});

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

//Listamos en el select los productos
//get('/ws/productos.aspx/ListarTodosLosProductos')
//get('/ws/productos.aspx/ListarTodosLosProductos1')
//    .then(function (res) {
//        var r = JSON.stringify(res);
//        if (r.startsWith('[{"ERROR":', 0)) {
//            var err = "";
//            $(res).each(function () {
//                err += this.Error;
//            });
//            Alerta(err, "ERROR!");
//        } else {
//            let selectHtml = "<option value='0'>Seleccione Producto</option>";
//            $(res).each(function () {
//                selectHtml += "<option value='" + this.ID + "'>" + this.NOMPRODUCTO + "</option>";
//                /*$('#productosSelect').append("<option value='" + this.ID + "'>" + this.NOMPRODUCTO + "</option>");*/
//            });
//            $("#productosSelect").html(selectHtml);
//        }
//    }).catch(function (error) {
//        Alerta(error, "ERROR!");
//    });

get('/ws/productos.aspx/ListarTodosLosProductos1')
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
                $('#productosSelect').append("<option value='" + this.ID + "'>" + this.NOMPRODUCTO + "</option>");
            });
        }
    }).catch(function (error) {
        Alerta(error, "ERROR!");
    });

//Listamos en el select las especies
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


            $(res).each(function () {
                $('#especiesSelect').append("<option value='" + this.ID_ESPECIE + "'>" + this.ESPECIE + "</option>");
            });
        }
    }).catch(function (error) {
        Alerta(error, "ERROR!");
    });




function TbodyVentaPorProducto() {
    let param = new Object();
    var from = $("#fechaIni").val().split("/");
    var fechaIni = new Date(from[2], from[1] - 1, from[0]);
    var hasta = $("#fechaFin").val().split("/");
    var fechaFin = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    var especie = $("#especiesSelect").val();
    var producto = $("#productosSelect").val();
    $("#tblRepVtas tbody").empty();
    get('/ws/RepVtas.aspx/ListarRepVenta', JSON.stringify({ idEspecie: idEspecie, idProducto: idProducto, fechaIni: fechaIni, fechaFin: fechaFin }))
        .then(function (res) {
            var r = JSON.stringify(res);
            $("#lproent tbody").html("");
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                $(res).each(function () {
                    id = $("#tblRepVtas tbody tr").length;
                    let fila = "";
                    let idvent = this.id;
                    fila = '<tr>' +
                        '<td class="tdp">' + this.ESPECIE + '</td>' +
                        '<td class="tdp">' + this.PRODUCTO + '</td>' +
                        '<td class="tdp">' + this.PEDIDO_VENTA + '</td>' +
                        '<td class="tdp">' + this.ESTADO + '</td>' +
                        '<td class="tdp">' + this.FECHAEMISION.slice(0, 10) + '</td>' +
                        '<td class="tdp">' + this.CANTIDAD + '</td>' +
                        '<td class="tdp">' + this.UNIDAD_MEDIDA + '</td>' +
                        '<td class="tdp">' + this.PRECIO + '</td>' +
                        '<td class="tdp">' + this.TOTAL + '</td>' +
                        '</tr>';
                    $("#tblRepVtas tbody").append(fila);
                });
            }


        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
        });

}

function exportar(tipo) {
    var jsondet = [];
    var i = 1;

    $("#tblRepVtas tbody").children("tr").each(function (index) {
        var especie, producto, pedido, estatus, fechaemi, cant, um, precio, total;
        $(this).children("td").each(function (ind1) {
            switch (ind1) {
                case 0:
                    especie = $(this).html();
                    break;
                case 1:
                    producto = $(this).html();
                    break;
                case 2:
                    pedido = $(this).html();
                    break;
                case 3:
                    estatus = $(this).html();
                    break;
                case 4:
                    fechaemi = $(this).html();
                    break;
                case 5:
                    cant = $(this).html();
                    break;
                case 6:
                    um = $(this).html();
                    break;
                case 7:
                    precio = $(this).html();
                    break;
                case 8:
                    total = $(this).html();
                    break;

            }
        });
        var fila = {
            ESPECIE: especie,
            PRODUCTO: producto,
            PEDIDO_VENTA: pedido,
            ESTADO: estatus,
            FECHAEMISION: fechaemi,
            CANTIDAD: cant,
            UNIDAD_MEDIDA: um,
            PRECIO: precio,
            TOTAL: total
        };
        jsondet.push(fila);


    });
    if (jsondet.length > 0) {
        var json = {
            json: JSON.stringify(jsondet),
        };
        get('/ws/RepVtas.aspx/ExportarReporte', JSON.stringify(json))
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

    $("#tblRepVtas tbody").children("tr").each(function (index) {
        var especie, producto, pedido, estatus, fechaemi, cant, um, precio, total;
        $(this).children("td").each(function (ind1) {
            switch (ind1) {
                case 0:
                    especie = $(this).html();
                    break;
                case 1:
                    producto = $(this).html();
                    break;
                case 2:
                    pedido = $(this).html();
                    break;
                case 3:
                    estatus = $(this).html();
                    break;
                case 4:
                    fechaemi = $(this).html();
                    break;
                case 5:
                    cant = $(this).html();
                    break;
                case 6:
                    um = $(this).html();
                    break;
                case 7:
                    precio = $(this).html();
                    break;
                case 8:
                    total = $(this).html();
                    break;
            }
        });
        var fila = {

            ESPECIE: especie,
            PRODUCTO: producto,
            PEDIDO_VENTA: pedido,
            ESTADO: estatus,
            FECHAEMISION: fechaemi,
            CANTIDAD: cant,
            UNIDAD_MEDIDA: um,
            PRECIO: precio,
            TOTAL: total
        };
        jsondet.push(fila);


    });
    if (jsondet.length > 0) {
        var desde = $("#fechaIni").val().split("/");
        var d = new Date(desde[2], desde[1] - 1, desde[0]);
        var hasta = $("#fechaFin").val().split("/");
        var h = new Date(hasta[2], hasta[1] - 1, hasta[0]);

        var json = {
            json: JSON.stringify(jsondet),
            rangoFecha: JSON.stringify({
                desde: d,
                hasta: h
            })
        };
        get('/ws/RepVtas.aspx/GeneraPdfRepVet', JSON.stringify(json))
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


//filtrar select especies
$('#txtEspecie').on('keyup', function () {
    let txtEspecie = $('#txtEspecie').val().toUpperCase();
    let _this = this;
    $('#especiesSelect option').each(function () {
        let nombre = $(this).text().toUpperCase();

        if (nombre.indexOf($(_this).val().toUpperCase()) !== -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
        if (txtEspecie == '') {
            $(this).show();
        }
    });
});


$('#txtProducto').on('keyup', function () {
    let txtProducto = $('#txtProducto').val().toUpperCase();
    let _this = this;
    $('#productosSelect option').each(function () {
        let nombre = $(this).text().toUpperCase();

        if (nombre.indexOf($(_this).val().toUpperCase()) !== -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
        if (txtProducto == '') {
            $(this).show();
        }
    });
});




$('#btnFiltro').on('click', function myfunction() {
    if (validarIntervaloFechas()) {
        idEspecie = $('#especiesSelect option:selected').val();
        idProducto = $('#productosSelect option:selected').val();
        TbodyVentaPorProducto(idEspecie, idProducto, fechaIni, fechaFin, true)
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
    fechaIni = $("#fechaIni").val();
    fechaFin = $("#fechaFin").val();
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

$("#fechaIni").val(hoy());
$("#fechaFin").val(hoy());

TbodyVentaPorProducto(0, 0, hoy(), hoy());
//Asignamos fechas de input date


