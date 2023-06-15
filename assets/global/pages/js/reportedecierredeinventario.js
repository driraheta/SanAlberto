
get('/ws/CierreInventario.aspx/ConsultarUsuario')
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
                $('#nomp').append("<option value='" + this.ID + "'>" + this.NOMUSUARIO + "</option>");
            });
        }
    }).catch(function (error) {
        Alerta(error, "ERROR!");
    });


get('/ws/CierreInventario.aspx/consultarAlmacen')
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
                $('#edo').append("<option value='" + this.ID + "'>" + this.NOMALMACEN + "</option>");
            });
        }
    }).catch(function (error) {
        Alerta(error, "ERROR!");
    });

function RepCierreInv(id = 0, almac = 0) {
    if ($("#bfecd").val() !== "") {
        var desde = $("#bfecd").val().split("/");
        df = new Date(desde[2], desde[1] - 1, desde[0]);
    }
    if ($("#bfeca").val() !== "") {
        var hasta = $("#bfeca").val().split("/");
        hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    }

    get('/ws/RepCierreInventario.aspx/Listar', JSON.stringify({ usua: id, almac: almac, fechaIni: df, fechaFin: hf }))
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
                    tableHTML += this.CODIGO;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.DESCRIPCION;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.UNIDAD_MEDIDA;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.STOCKINICIAL;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.INGRESOS;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.SALIDAS;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.CANTAJUSTE;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.STOCKFINAL;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.FECHA_AJUSTEINV.slice(0, 10);
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.HORA;
                    tableHTML += "</td>";
                    tableHTML += "</tr>";

                });

                $('#txtRegistros').attr("cantRegistros", res.length);
                if (res.length <= 0) {
                    $('#txtRegistros').html("No existen registros para los filtros aplicados");
                    Alerta("No existen registros para el filtro aplicado.</br>" +
                        "<b>Fecha Inicio: </b>" + $("#bfecd").val() + "</br>" +
                        "<b>Fecha Fin:</b> " + $("#bfeca").val() + "</br>" +
                        "<b>Usuario: </b>" + $('#nomp option:selected').text() + "</br>" +
                        "<b>Almacen:</b>" + $('#edo option:selected').text(), "AVISO");

                } else {
                    $('#txtRegistros').html(res.length + " registros");
                }
                $('#tblRepCierreInv table tbody').html(tableHTML);
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function ExportarExcel(id = 0, almac = 0) {
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
    get('/ws/RepCierreinventario.aspx/ExportarExcelRepCierreInv', JSON.stringify({ usua: id, almac: almac, fechaIni: df, fechaFin: hf }))
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

function GeneraPDF(id = 0, almac = 0) {
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
    get('/ws/RepCierreinventario.aspx/GeneraRepPdf', JSON.stringify({ usua: id, almac: almac, fechaIni: df, fechaFin: hf }))
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
    $('#bfecd').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
    $('#bfeca').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es", defaultDate: new Date, value: formatoFecha(new Date(), 1) });


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
                var almac = $("#edo option:selected").val();

                RepCierreInv(id, almac);
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
                var edo = $("#edo").val();

                ExportarExcel(id, edo);
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
                var edo = $("#edo").val();

                GeneraPDF(id, edo);
            } else {
                Alerta("NDebe de Ingresar la fecha hasta", "ERROR!");
            }
        } else {
            Alerta("NDebe de Ingresar la fecha desde", "ERROR!");
        }
    });

    $('#txtUsuario').on('keyup', function () {
        let txtUsuario = $('#txtUsuario').val().toUpperCase();
        let _this = this;
        $('#nomp option').each(function () {
            let nombre = $(this).text().toUpperCase();

            if (nombre.indexOf($(_this).val().toUpperCase()) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
            if (txtUsuario == '') {
                $(this).show();
            }
        });
    });


    $('#txtAlmacen').on('keyup', function () {
        let txtAlmacen = $('#txtAlmacen').val().toUpperCase();
        let _this = this;
        $('#edo option').each(function () {
            let nombre = $(this).text().toUpperCase();

            if (nombre.indexOf($(_this).val().toUpperCase()) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
            if (txtAlmacen == '') {
                $(this).show();
            }
        });
    });
});


