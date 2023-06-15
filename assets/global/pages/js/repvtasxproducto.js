var idEspecie = 0;
var idProducto = 0;
var fechaIni = '';
var fechaFin = '';

$(document).ready(function () {
    $('.datepicker').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    });

    //convertir el combo en select2
    $('.select2').each(function () {
        $(this).select2({
            width: '100%'
        });
    });
    /*CAMBIO DE BUSQUEDA DE SELECT 2--EXPRESIONES REGULARES*/
    $("#productosSelect").select2({
        width: '100%',
        placeholder: "Selecciona",
        allowClear: true,
        matcher: function (params, data) {
            // If there are no search terms, return all of the data
            if ($.trim(params.term) === '') {
                return data;
            }
            var palabra = params.term;
            var filtro = ".*" + palabra.replace(/\s+/g, ".*") + ".*";
            /*
            rex = new RegExp(filtro, 'i');
              Do not display the item if there is no 'text' property
              if (typeof data.text === 'undefined') {
                  return data;
              }
              */
            // `params.term` should be the term that is used for searching
            // `data.text` is the text that is displayed for the data object
            //console.log(data.text);

            if (data.text.toUpperCase().search(filtro.toUpperCase()) > -1) {
                var modifiedData = $.extend({}, data, true);
                modifiedData.text += '';
                // You can return modified objects from here
                // This includes matching the `children` how you want in nested data sets
                return modifiedData;
            }

            // Return `null` if the term should not be displayed
            return null;
        }

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
//get('/ws/productos.aspx/ListarTodosLosProductosPorConversion', JSON.stringify({ tipoConversion: 2 }))
//    .then(function (res) {
//        var r = JSON.stringify(res);
//        if (r.startsWith('[{"ERROR":', 0)) {
//            var err = "";
//            $(res).each(function () {
//                err += this.Error;
//            });
//            Alerta(err, "ERROR!");
//        } else {

//            $(res).each(function () {

//                $('#productosSelect').append("<option especie='" + this.ID_ESPECIE + "' value='" + this.ID_PRODUCTO + "'>" + this.PRODUCTO + "</option>");
//            });
//        }
//    }).catch(function (error) {
//        Alerta(error, "ERROR!");
//    });

// para el combo de producto
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



//Creamos el Tbody de Venta Por producto
function TbodyVentaPorProducto() {

    /*(idEspecie = 0, idProducto = 0, fechaIni = hoy(), fechaFin = hoy(), presionado = false) {*/
    //    //asignamos los nombres como atributo de la tabla reporte ventas
    //    $('#tblRepVtas').attr('especie', $('#especiesSelect option:selected').text());
    //    $('#tblRepVtas').attr('producto', $('#productosSelect option:selected').text());
    let param = new Object();
    let from = $("#fechaIni").val().split("/");
    let fechaIni = new Date(from[2], from[1] - 1, from[0]);
    let hasta = $("#fechaFin").val().split("/");
    let fechaFin = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    let especie = $("#especiesSelect").val();
    let producto = $("#productosSelect").val();
    let vserie = $("#serieVal").val();
    let vnumero = $("#numeroVal").val();
    $("#tblRepVtas tbody").empty();

    get('/ws/RepVtasXProducto.aspx/ListarVentaPorProductoConEspecie', JSON.stringify({ idEspecie: idEspecie, idProducto: idProducto, fechaIni: fechaIni, fechaFin: fechaFin,serie: vserie, numero: vnumero }))
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
                        '<td class="tdp">' + this.SERIE + '</td>' +
                        '<td class="tdp">' + this.NUMERO + '</td>' +
                        '<td class="tdp">' + this.PRODUCTO + '</td>' +
                        '<td class="tdp">' + this.FECHAEMISION.slice(0, 10) + '</td>' +
                        '<td class="tdp">' + this.MEDIDA + '</td>' +
                        '<td class="tdp">' + this.CANTIDAD + '</td>' +
                        '<td class="tdp">' + this.TOTAL + '</td>' +
                        '</tr>';
                    $("#tblRepVtas tbody").append(fila);
                });
            }


        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de ventas<br />" + error, "ERROR!");
        });
}


//Exportamos a Excel la tabla html

//function ExportarExcelVentaPorProducto(tipo) {
//    let especieTabla = $('#tblRepVtas').attr('especie');
//    let productoTabla = $('#tblRepVtas').attr('producto');

//    var jsondet = [];
//    var tpon = "";

//    $("#tblRepVtas table tbody").children("tr").each(function (index) {
//        var flag = false;
//        if (tipo === "All") {
//            tpon = "vista_total";
//            flag = true;
//        } else {
//            tpon = "vista_parcial";
//            if ($(this).is(':visible')) {
//                flag = true;
//            }
//        }
//        if (flag === true) {
//            var Serie, Num, Prod, Fecha, UndMed, Cant, Total;
//            $(this).children("td").each(function (ind) {
//                switch (ind) {
//                    case 0:
//                        Serie = $(this).html();
//                        break;
//                    case 1:
//                        Num = $(this).html();
//                        break;
//                    case 2:
//                        Prod = $(this).html();
//                        break;
//                    case 3:
//                        Fecha = $(this).html();
//                        break;
//                    case 4:
//                        UndMed = $(this).html();
//                        break;
//                    case 5:
//                        Cant = $(this).html();
//                        break;
//                    case 6:
//                        Total = $(this).html();
//                        break;
//                }
//            });
//            if (Serie !== "") {
//                var fila = {
//                    Serie: Serie,
//                    Numero: Num,
//                    Producto: Prod,
//                    FechaEmision: Fecha,
//                    Medida: UndMed,
//                    Cantidad: Cant,
//                    Total: Total,
//                };
//                jsondet.push(fila);
//            }
//        }
//    });

//    if (jsondet.length > 0) {
//        var json = {
//            json: JSON.stringify(jsondet),
//            vista: tpon,
//            especie: especieTabla,
//            producto: productoTabla
//        };


//        get('/ws/RepVtasXProducto.aspx/ReporteVtaXProductoExportarExcel', JSON.stringify(json))
//            .then(function (res) {
//                var r = JSON.stringify(res);
//                r = r.replace("\"", "");
//                r = r.replace("\"", "");

//                if (r.startsWith('[{"ERROR":', 0)) {
//                    var err = "";
//                    $(res).each(function () {
//                        err += this.Error;
//                    });
//                    Alerta(err, "ERROR!");
//                } else {
//                    window.location.replace("/assets/" + r);

//                }
//            }).catch(function (error) {
//                Alerta(error, "ERROR!");
//            });
//    }
//}

function ExportarExcel(es = 0, pro = 0) {
    var df = null;
    var hf = null;
    if ($("#fechaIni").val() !== "") {
        var desde = $("#fechaIni").val().split("/");
        df = new Date(desde[2], desde[1] - 1, desde[0]);
    }
    if ($("#fechaFin").val() !== "") {
        var hasta = $("#fechaFin").val().split("/");
        hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    }
    let vserie = $("#serieVal").val();
    let vnumero = $("#numero").val();

    get('/ws/RepVtasXProducto.aspx/ExportarExcelRepVentxProd', JSON.stringify({ idEspecie: es, idProducto: pro, fechaIni: df, fechaFin: hf, serie: vserie, numero:vnumero }))
        .then(function (res) {
            var resp = JSON.stringify(res);
            resp = resp.replace("\"", "");
            resp = resp.replace("\"", "");
            if (resp.startsWith("Error:")) {
                Alerta(resp, "ERROR!");
            } else {
                window.location.replace("/assets/" + resp);
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el archivo<br />" + error, "ERROR!");
        });
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

//$('#btnExportarExcel').on('click', function myfunction() {
//    if (validarRegistrosTabla()) {
//        ExportarExcelVentaPorProducto("All");
//    }
//});

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

$('#btnExportarExcel').on('click', function myfunction() {
    if ($("#fechaIni").val() !== "") {
        if ($("#fechaFin").val() !== "") {
            var pro = $("#productosSelect option:selected").val();
            var es = $("#especiesSelect").val();

            ExportarExcel(es, pro);
        } else {
            Alerta("NDebe de Ingresar la fecha hasta", "ERROR!");
        }
    } else {
        Alerta("NDebe de Ingresar la fecha desde", "ERROR!");
    }
});
$("#fechaIni").val(hoy());
$("#fechaFin").val(hoy());

TbodyVentaPorProducto(0, 0, hoy(), hoy());
//Asignamos fechas de input date


