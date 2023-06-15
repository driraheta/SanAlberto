
////get('/ws/productos.aspx/ConsultarProductos', JSON.stringify({ id: 0 }))
////    .then(function (res) {
////        var r = JSON.stringify(res);
////        if (r.startsWith('[{"ERROR":', 0)) {
////            var err = "";
////            $(res).each(function () {
////                err += this.Error;
////            });
////            Alerta(err, "ERROR!");
////        }
////        else {
////            let selectHtml = "<option value='0'>Seleccione Usuario</option>";
////            $(res).each(function () {
////                selectHtml += "<option value='" + this.id + "'>" + this.NOMPRODUCTO + "</option>";
////            });
////            $("#nomp").html(selectHtml);
////        }
////    }).catch(function (error) {
////        Alerta(error, "ERROR!");
////    });

get('/ws/productos.aspx/ConsultarProductos')
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
                $('#nomp').append("<option value='" + this.ID + "'>" + this.NOMPRODUCTO + "</option>");
            });
        }
    }).catch(function (error) {
        Alerta(error, "ERROR!");
    });


//get('/ws/exportadores.aspx/Consultarproveedores', JSON.stringify({ id: 0 }))
//    .then(function (res) {
//        var r = JSON.stringify(res);
//        if (r.startsWith('[{"ERROR":', 0)) {
//            var err = "";
//            $(res).each(function () {
//                err += this.Error;
//            });
//            Alerta(err, "ERROR!");
//        }
//        else {
//            let selectHtml = "<option value='0'>Seleccione Usuario</option>";
//            $(res).each(function () {
//                selectHtml += "<option value='" + this.ID + "'>" + this.NOMPROVEEDOR + "</option>";
//            });
//            $("#raz").html(selectHtml);
//        }
//    }).catch(function (error) {
//        Alerta(error, "ERROR!");
//    });

get('/ws/exportadores.aspx/Consultarproveedores')
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
                $('#raz').append("<option value='" + this.ID + "'>" + this.NOMPROVEEDOR + "</option>");
            });
        }
    }).catch(function (error) {
        Alerta(error, "ERROR!");
    });


function RepImport(id = 0, pro = 0) {
    if ($("#bfecd").val() !== "") {
        var desde = $("#bfecd").val().split("/");
        df = new Date(desde[2], desde[1] - 1, desde[0]);
    }
    if ($("#bfeca").val() !== "") {
        var hasta = $("#bfeca").val().split("/");
        hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    }

    get('/ws/RepImport.aspx/Listar', JSON.stringify({ razon: id, pro: pro, fechaIni: df, fechaFin: hf }))
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
                    tableHTML += this.NUMERO;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.TIPO;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.FECHA_ZARPE.slice(0, 10);
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.FECHA_LLEGADA.slice(0, 10);
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.FECHA_CAMARA.slice(0, 10);
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.RAZON_SOCIAL;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.CODIGO_PRODUCTO;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.PRODUCTO;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.CANTIDAD;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.UNIDAD_MEDIDA;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.MONEDA;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.PRECIO;
                    tableHTML += "</td>";
                    tableHTML += "<td>";
                    tableHTML += this.SUB_TOTAL;
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
                        "<b>Raz Social/RUC: </b>" + $('#raz option:selected').text() + "</br>" +
                        "<b>Producto:</b>" + $('#nomp option:selected').text(), "AVISO");

                } else {
                    $('#txtRegistros').html(res.length + " registros");
                }
                $('#RepImport table tbody').html(tableHTML);
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });
}


function ExportarExcel(id = 0, pro = 0) {
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
    get('/ws/RepImport.aspx/ExportarExcelRepImport', JSON.stringify({ razon: id, pro: pro, fechaIni: df, fechaFin: hf }))
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

function GeneraPDF(id = 0, pro = 0) {
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
    get('/ws/RepImport.aspx/GeneraRepPdf', JSON.stringify({ razon: id, pro: pro, fechaIni: df, fechaFin: hf }))
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

    $('#filtrarBtn').on('click', function myfunction() {
        if ($("#bfecd").val() !== "") {
            if ($("#bfeca").val() !== "") {
                var id = $("#raz option:selected").val();
                var pro = $("#nomp option:selected").val();

                RepImport(id, pro);
            } else {
                Alerta("Debe de Ingresar la fecha hasta", "ERROR!");
            }
        } else {
            Alerta("Debe de Ingresar la fecha desde", "ERROR!");
        }
    });

    $('#btnExportarExcel').on('click', function myfunction() {
        if ($("#bfecd").val() !== "") {
            if ($("#bfeca").val() !== "") {
                var pro = $("#nomp option:selected").val();
                var id = $("#raz").val();

                ExportarExcel(id, pro);
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
                var pro = $("#nomp option:selected").val();
                var id = $("#raz").val();

                GeneraPDF(id, pro);
            } else {
                Alerta("NDebe de Ingresar la fecha hasta", "ERROR!");
            }
        } else {
            Alerta("NDebe de Ingresar la fecha desde", "ERROR!");
        }
    });

    $('#txtProducto').on('keyup', function () {
        let txtProducto = $('#txtProducto').val().toUpperCase();
        let _this = this;
        $('#nomp option').each(function () {
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


    $('#txtProveedor').on('keyup', function () {
        let txtProveedor = $('#txtProveedor').val().toUpperCase();
        let _this = this;
        $('#raz option').each(function () {
            let nombre = $(this).text().toUpperCase();

            if (nombre.indexOf($(_this).val().toUpperCase()) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
            if (txtProveedor == '') {
                $(this).show();
            }
        });
    });

});