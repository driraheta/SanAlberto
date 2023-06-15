function cargarProductosyServicios() {
    get('/ws/productos.aspx/ConsultarProdServicio', JSON.stringify({ id: 0 }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                $(res.Info).each(function () {
                    $("#nomp").append('<option codigo="" value="' + this.id + '">' + this.pro + '</option>');
                });
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de productos y servicios<br />" + error, "ERROR!");
        });
}

// actualizado
function RepComprasProdServ(id = 0, cod = "", edo = 0) {
    if ($("#bfecd").val() !== "") {
        var desde = $("#bfecd").val().split("/");
        df = new Date(desde[2], desde[1] - 1, desde[0]);
    }
    if ($("#bfeca").val() !== "") {
        var hasta = $("#bfeca").val().split("/");
        hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    }

    get('/ws/RepComprasProdServ.aspx/Listar', JSON.stringify({ idprodser: id, cod: cod, edo: edo, fechaIni: df, fechaFin: hf }))
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
                    tableHTML += "<tr>";
                    tableHTML += "<td>";
                    tableHTML += this.FECHA.slice(0, 10);
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.SERIE;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.NUMERO;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.RUC;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.RAZON_SOCIAL;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.DESCRIPCION;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.UNIDAD_MEDIDA;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.MONEDA;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.ESTADO;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.CANTIDAD;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.PRECIO;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.TOTAL;
                    tableHTML += "</td>";
                    tableHTML += "</tr>";

                });

                $('#txtRegistros').attr("cantRegistros", res.length);
                if (res.length <= 0) {
                    $('#txtRegistros').html("No existen registros para los filtros aplicados");
                    Alerta("No existen registros para el filtro aplicado.</br>" +
                        "<b>Fecha Inicio: </b>" + $("#bfecd").val() + "</br>" +
                        "<b>Fecha Fin:</b> " + $("#bfeca").val() + "</br>" +
                        "<b>Producto/Servicio: </b>" + $('#nomp option:selected').text() + "</br>" +
                        "<b>Estado:</b>" + $('#edo option:selected').text(), "AVISO");

                } else {
                    $('#txtRegistros').html(res.length + " registros");
                }
                $('#tblRepCompras table tbody').html(tableHTML);
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function ExportarExcel(id = 0, cod = "", edo = 0) {
    var df = null;
    var hf = null;
    if ($("#bfecd").val() !== "") {
        var desde = $("#bfecd").val().split("/");
        df = new Date(desde[2], desde[1] - 1, desde[0]);
    }
    if ($("#bfeca").val() !== "") {
        var hasta = $("#bfeca").val().split("/");
        hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    }
    get('/ws/RepComprasProdServ.aspx/ExportarExcelRepcompProdServ', JSON.stringify({ idprodser: id, cod: cod, edo: edo, fechaIni: df, fechaFin: hf }))
        .then(function (res) {
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
            Alerta("No fue posible cargar el archivo<br />" + error, "ERROR!");
        });
}

function GeneraPDF(id = 0, cod = "", edo = 0) {
    var df = null;
    var hf = null;
    if ($("#bfecd").val() !== "") {
        var desde = $("#bfecd").val().split("/");
        df = new Date(desde[2], desde[1] - 1, desde[0]);
    }
    if ($("#bfeca").val() !== "") {
        var hasta = $("#bfeca").val().split("/");
        hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    }
    get('/ws/RepComprasProdServ.aspx/GeneraRepPdf', JSON.stringify({ idprodser: id, cod: cod, edo: edo, fechaIni: df, fechaFin: hf }))
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
}

$(document).ready(function () {
    cargarProductosyServicios();
    $('#bfecd').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#bfeca').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });

    let fecha = new Date();
    $("#bfeca").datepicker().value(fecha);
    fecha = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    $("#bfecd").datepicker().value(fecha);


    $(".gj-icon").each(function () {
        $(this).css({ "margin-top": "0" });
    });
    $('#btnFiltro').on('click', function myfunction() {
        if ($("#bfecd").val() !== "") {
            if ($("#bfeca").val() !== "") {
                var id = $("#nomp option:selected").val();
                var cod = $("#nomp option:selected").attr("codigo");
                var edo = $("#edo").val();

                RepComprasProdServ(id, cod, edo);
            } else {
                Alerta("NDebe de Ingresar la fecha hasta", "ERROR!");
            }
        } else {
            Alerta("NDebe de Ingresar la fecha desde", "ERROR!");
        }
    });
    $('#btnExportarExcel').on('click', function myfunction() {
        if ($("#bfecd").val() !== "") {
            if ($("#bfeca").val() !== "") {
                var id = $("#nomp option:selected").val();
                var cod = $("#nomp option:selected").attr("codigo");
                var edo = $("#edo").val();

                ExportarExcel(id, cod, edo);
            } else {
                Alerta("NDebe de Ingresar la fecha hasta", "ERROR!");
            }
        } else {
            Alerta("NDebe de Ingresar la fecha desde", "ERROR!");
        }
    });

    $('#btnPDF').on('click', function myfunction() {
        if ($("#bfecd").val() !== "") {
            if ($("#bfeca").val() !== "") {
                var id = $("#nomp option:selected").val();
                var cod = $("#nomp option:selected").attr("codigo");
                var edo = $("#edo").val();

                GeneraPDF(id, cod, edo);
            } else {
                Alerta("NDebe de Ingresar la fecha hasta", "ERROR!");
            }
        } else {
            Alerta("NDebe de Ingresar la fecha desde", "ERROR!");
        }
    });

    $('.select2').each(function () {
        $(this).select2({
            width: '100%'
        });
    });
    /*CAMBIO DE BUSQUEDA DE SELECT 2--EXPRESIONES REGULARES*/
    $("#nomp").select2({
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

