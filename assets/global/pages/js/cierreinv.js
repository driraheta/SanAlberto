$(document).ready(function () {
    $("#id").val("");
    $('#dec').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#hasc').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#fdesde').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#fhasta').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });

    let fecha = new Date();
    $("#hasc").datepicker().value(fecha);
    $("#fhasta").datepicker().value(fecha);
    fecha = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    $("#dec").datepicker().value(fecha);
    $("#fdesde").datepicker().value(fecha);

    cargaCinv("");
    cargaAlmacenes();

    $(".gj-icon").css({ "margin-top": "-4px" });

    //validar escribir solo numeros en los inputs con clase numeros
    $(".numeros").on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $("#bsearch").on("click", () => cargaCinv(""));

    $("#genc").on("click", function () {
        if ($("#dec").val() != "" && $("#hasc").val() != "") {
            Guardar();
        }
        else {
            Alerta("Debe seleccionar un rango de fechas", "AVISO!");
        }
    })
    $("#can").on("click", function () {
        window.location.href = "/pages/ginv/principal.aspx";

    });

    $("#canc").on("click", function () {
        window.location.href = "/pages/ginv/principal.aspx";

    });

    //Ajuste inventario
    $("#tcierreinv tbody ").on("click", "i", function () {
        var idprod = $(this).attr("pid");
        var stockac = $(this).attr("stockact");
        var idalm = $(this).attr("idalm");
        creaAjuste(idprod, stockac, idalm);

    });

    //Ajuste inventario en consulta
    $("#tCcierreinv tbody ").on("click", "i", function () {
        var idprod = $(this).attr("pid");
        var stockac = $(this).attr("stockact");
        var idalm = $(this).attr("idalm");
        creaAjuste(idprod, stockac, idalm);

    });

    $('#cinvfec').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });

    $('#cinvtpooper').change(function () {
        if ($(this).val() === "1") {
            $("#cinvocpac").prop("disabled", false);
            $("#cinvprodocpac").prop("disabled", false);
            $("#filtroProductoA").prop("disabled", false);
            $("#cinvocpac").val("");
            $("#cinvprodocpac").val("");
            $("#filtroProductoA").val("");
        }
        else if ($(this).val() === "2") {
            $("#cinvocpac").prop("disabled", false);
            $("#cinvprodocpac").prop("disabled", false);
            $("#filtroProductoA").prop("disabled", false);
            $("#cinvocpac").val("");
            $("#cinvprodocpac").val("");
            $("#filtroProductoA").val("");
            //$("#cinvocpac").prop("disabled", true);
            //$("#cinvprodocpac").prop("disabled", true);
            //$("#filtroProductoA").prop("disabled", true);
            //$("#filtroProductoA").val("");

            $("#cinvocpac").val("");
            $("#cinvprodocpac").val("");
        } else if ($(this).val() === "3") {
            $("#cinvocpac").prop("disabled", false);
            $("#cinvprodocpac").prop("disabled", false);
            $("#filtroProductoA").prop("disabled", false);

        }
    });
    $("#cinvcantajus").change(function () {
        let sact = $("#cinvstockact").val().trim().replace(/,/g, '');
        let cant = $("#cinvcantajus").val().trim().replace(/,/g, '');
        if ($('#cinvtpooper').val() === "1") {
            $("#cinvstockfin").val(parseFloat(sact) + parseFloat(cant));

        } else if ($('#cinvtpooper').val() === "2") {
            $("#cinvstockfin").val(parseFloat(sact) - parseFloat(cant));
        } if ($('#cinvtpooper').val() === "3") {
            $("#cinvstockfin").val(parseFloat(sact) - parseFloat(cant));
        }
    });
    $("#cinvcantajus").blur(function () {
        let sact = $("#cinvstockact").val().trim().replace(/,/g, '');
        let cant = $("#cinvcantajus").val().trim().replace(/,/g, '');
        if ($('#cinvtpooper').val() === "1") {
            $("#cinvstockfin").val(parseFloat(sact) + parseFloat(cant));

        } else if ($('#cinvtpooper').val() === "2") {
            $("#cinvstockfin").val(parseFloat(sact) - parseFloat(cant));
        } if ($('#cinvtpooper').val() === "3") {
            $("#cinvstockfin").val(parseFloat(sact) - parseFloat(cant));
        }
    });
    $("#canajuste").on("click", function () {
        limpiaControles("cierreinvModal");
        $("#cierreinvModal").modal("toggle");
    });
});

function cargaCinv(fil = "") {
    let param = new Object();

    //if (fil == "") {

    //}
    //else param.where = fil;

    param.fdesde = $("#fdesde").val();
    param.fhasta = $("#fhasta").val();

    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Registro', class: 'text-center', ordenable: false, columna: 'CONDICION_PAGO', filtro: true },
            { leyenda: 'Desde', class: 'text-center', ordenable: false, columna: 'CONDICION_PAGO', filtro: true },
            { leyenda: 'Hasta', class: 'text-center', ordenable: false, columna: 'CONDICION_PAGO', filtro: true },
            { leyenda: 'Usuario', class: 'text-center', ordenable: false, columna: 'CONDICION_PAGO', filtro: true },
            { leyenda: 'Fecha y Hora de Registro', class: 'text-center', ordenable: false, columna: 'CONDICION_PAGO', filtro: true },
            { leyenda: 'Detalle', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
            { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [

            { propiedad: 'ID_CIERREINV', class: 'text-center' },
            {
                propiedad: 'DESDE_CIERREINV', class: ' tdp', formato: function (tr, obj, value) {
                    if (value !== null)
                        return formatoFecha(value, 1);
                }
            },
            {
                propiedad: 'HASTA_CIERREINV', class: ' tdp', formato: function (tr, obj, value) {
                    if (value !== null)
                        return formatoFecha(value, 1);
                }
            },
            { propiedad: 'USUARIO', class: 'text-center' },
            {
                propiedad: 'FECHAREG', class: ' tdp', formato: function (tr, obj, value) {
                    if (value !== null)
                        return moment(value).format('DD/MM/YYYY, h:mm:ss a');
                }
            },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-search").prop("title", "Editar").on("click", function () {
                        Consultar(obj.ID_CIERREINV);
                    });
                    container.appendChild(edita);

                    return container;
                }
            },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    exportpdf = document.createElement("i");

                    $(exportpdf).addClass("fa fa-file-pdf").prop("title", "PDF").on("click", function () {
                        consultaInvCierre2(obj.ID_CIERREINV, 1);
                    });
                    container.appendChild(exportpdf);
                    return container;
                }
            }

        ],
        url: '/ws/CierreInventario.aspx/Listar',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [5, 10, 25, 50],
        columna: 'ID_CIERREINV',
        loader: "pre0",
        columna_orden: 'ASC'
    };

    $("#cierreinv").MALCO(data);
}

function Guardar() {
    let info = new Object();

    var from = $("#dec").val().split("/");
    var f = new Date(from[2], from[1] - 1, from[0]);
    var from2 = $("#hasc").val().split("/");
    var f2 = new Date(from2[2], from2[1] - 1, from2[0]);

    info.desde = f;
    info.hasta = f2;
    info.idus = Cookies.get('idu');

    get('/ws/CierreInventario.aspx/InsertarCI', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#id").val(res.Info.id);
                cargaInvCierre(res.Info.id);
                $("#cierreModal").modal({ backdrop: 'static', keyboard: false });

            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })
}

function cargaAlmacenes() {
    let iduser = Cookies.get('idu');
    get('/ws/almacenes.aspx/ConsultarXUsuario', JSON.stringify({ idu: iduser }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    var html = "";
                    $("#cinvalm").html("");
                    html += '';
                    var flag = true;
                    $(res.Info).each(function () {
                        if (flag === true) {
                            html += '<option value="' + this.ID_ALMACEN + '" selected>' + this.ALMACEN + '</option>';
                            flag = false;
                        } else {
                            html += '<option value="' + this.ID_ALMACEN + '">' + this.ALMACEN + '</option>';
                        }
                    });
                    $("#cinvalm").html(html);
                }

            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
        })
}

//Cierre Inventario
function cargaInvCierre(id) {
    var opt = "#tcierreinvbody";

    get('/ws/CierreInventario.aspx/listarInvCierre', JSON.stringify({ idcierre: id }))
        .then(function (res) {
            var r = JSON.stringify(res);
            $("#tcierreinv tbody").html("");
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var html = "";
                var html2 = "";

                $(opt).html("");
                var i = 1;

                $(res).each(function () {
                    html += "<tr id='trinv' ptd='" + i + "' idprod = '" + this.ID_PRODUCTO + "'>";
                    html += "<td style='display: none'>" + this.ID_PRODUCTO + "</td>";
                    html += "<td>" + this.CODIGO_PRODUCTO + "</td>";
                    html += "<td>" + this.PRODUCTO + "</td>";
                    html += "<td>" + this.UM + "</td>";
                    html += "<td>" + this.StockInicial + "</td>";
                    html += "<td>" + this.nodoc + "</td>";
                    if (this.fecemi != "") {
                        var newDt = moment(this.fecemi, 'DD/MM/YYYY');
                        var validDate = newDt._isValid;
                        if (!validDate) {
                            newDt = moment(this.fecemi, 'MM/DD/YYYY');
                        }
                        html += "<td>" + moment(newDt).format("DD/MM/YYYY") + "</td>";
                    } else {
                        html += "<td></td>";

                    }
                    html += "<td>" + this.Ingresos + "</td>";
                    html += "<td>" + this.Salidas + "</td>";
                    html += "<td>" + this.Ajuste + "</td>";
                    html += "<td>" + this.stockfinal + "</td>";
                    html += "<td>" + this.fechareg + "</td>";
                    if (this.CODIGO_PRODUCTO != "") {
                        html += '<td>' + '<i pid="' + this.ID_PRODUCTO + '" stockact="' + this.StockInicial + '" idalm ="' + this.ID_ALMACEN + '"title="Ajuste (+/-)" style="cursor: pointer"><button type="button" class="btn-primary">Ajuste (+/-)</button></i>' + '</td>';
                    } else {
                        html += "<td></td>";
                    }
                    html += "</tr>";
                    i++;
                    if (this.CODIGO_PRODUCTO != "") {

                        html2 += "<option codigo ='" + this.CODIGO_PRODUCTO + "' value='" + this.ID_PRODUCTO + "'>" + this.PRODUCTO + "</option>";
                    }

                });

                $(opt).html(html);
                $("#cinvprod").html(html2);
                $("#cinvprodocpac").html(html2);

            }

        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado <br />" + error, "ERROR!");
        });

}

function cargaInvCierreU(id) {
    var opt = "#tCcierreinvbody";

    get('/ws/CierreInventario.aspx/listarInvCierre', JSON.stringify({ idcierre: id }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var html = "";
                var html2 = "";

                $(opt).html("");
                var i = 1;

                $(res).each(function () {
                    html += "<tr id='trinv' ptd='" + i + "' idprod = '" + this.ID_PRODUCTO + "'>";
                    html += "<td style='display: none'>" + this.ID_PRODUCTO + "</td>";
                    html += "<td>" + this.CODIGO_PRODUCTO + "</td>";
                    html += "<td>" + this.PRODUCTO + "</td>";
                    html += "<td>" + this.UM + "</td>";
                    html += "<td>" + this.StockInicial + "</td>";
                    html += "<td>" + this.nodoc + "</td>";
                    if (this.fecemi != "") {
                        var newDt = moment(this.fecemi, 'DD/MM/YYYY');
                        var validDate = newDt._isValid;
                        if (!validDate) {
                            newDt = moment(this.fecemi, 'DD/MM/YYYY');
                        }
                        html += "<td>" + moment(newDt).format("DD/MM/YYYY") + "</td>";
                    } else {
                        html += "<td></td>";
                    }
                    html += "<td>" + this.Ingresos + "</td>";
                    html += "<td>" + this.Salidas + "</td>";
                    html += "<td>" + this.Ajuste + "</td>";
                    html += "<td>" + this.stockfinal + "</td>";
                    if (this.fechareg != "") {
                        var newDt = moment(this.fechareg, 'DD/MM/YYYY');
                        var validDate = newDt._isValid;
                        if (!validDate) {
                            newDt = moment(this.fechareg, 'DD/MM/YYYY');
                        }
                        html += "<td>" + moment(newDt).format("DD/MM/YYYY") + "</td>";
                    } else {
                        html += "<td></td>";
                    }
                    if (this.CODIGO_PRODUCTO != "") {
                        html += '<td>' + '<i pid="' + this.ID_PRODUCTO + '" stockact="' + this.StockInicial + '" idalm ="' + this.ID_ALMACEN + '"title="Ajuste (+/-)" style="cursor: pointer"><button type="button" class="btn-primary">Ajuste (+/-)</button></i>' + '</td>';
                    } else {
                        html += "<td></td>";
                    }
                    html += "</tr>";
                    i++;
                    if (this.CODIGO_PRODUCTO != "") {

                        html2 += "<option codigo ='" + this.CODIGO_PRODUCTO + "' value='" + this.ID_PRODUCTO + "'>" + this.PRODUCTO + "</option>";
                    }

                });

                $(opt).html(html);
                $("#cinvprod").html(html2);
                $("#cinvprodocpac").html(html2);

            }

        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado <br />" + error, "ERROR!");
        });

}

function cargaOCPAC(id) {
    get('/ws/CierreInventario.aspx/GETOCPAC', JSON.stringify({ idprod: id }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var html2 = "";
                html2 = "<option codigo ='0' value='0'>Selecciona..</option>";

                $(res).each(function () {


                    html2 += "<option tpo ='" + this.TPOOCPAC + "' value='" + this.idocpac + "'>" + this.NUMERO + "</option>";

                });

                $("#cinvocpac").html(html2);

            }

        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado <br />" + error, "ERROR!");
        });

}

function creaAjuste(idprod, stockac, idalm) {
    cargaOCPAC(idprod);
    $("#cierreinvModal").modal({ backdrop: 'static', keyboard: false });
    limpiaControles('cierreinvModal');
    $("#cinvalm").val(idalm);
    $("#cinvalm").trigger('change');
    $("#cinvprod").val(idprod);
    $("#cinvprod").trigger('change');
    $("#cinvstockact").val(stockac);
    $("#filtroProductoA").prop("disabled", true);
    $("#cinvfec").val(formatoFecha(new Date(), 1));
    $("#cinvocpac").prop("disabled", true);
    $("#cinvprodocpac").prop("disabled", true);

}

function consultaInvCierre(id) {
    var opt = "#tcierreinvbody";

    get('/ws/CierreInventario.aspx/ClistarInvCierre', JSON.stringify({ idcierre: id }))
        .then(function (res) {
            var r = JSON.stringify(res);
            $("#tcierreinv tbody").html("");
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var html = "";
                var html2 = "";

                $(opt).html("");
                var i = 1;

                $(res).each(function () {
                    html += "<tr id='trinv' ptd='" + i + "' idprod = '" + this.ID_PRODUCTO + "'>";
                    html += "<td style='display: none'>" + this.ID_PRODUCTO + "</td>";
                    html += "<td>" + this.CODIGO_PRODUCTO + "</td>";
                    html += "<td>" + this.PRODUCTO + "</td>";
                    html += "<td>" + this.UM + "</td>";
                    html += "<td>" + this.StockInicial + "</td>";
                    html += "<td>" + this.nodoc + "</td>";
                    if (this.fecemi != "") {
                        var newDt = moment(this.fecemi, 'DD/MM/YYYY')
                        html += "<td>" + moment(newDt).format("DD/MM/YYYY") + "</td>";
                    } else {
                        html += "<td></td>";

                    }
                    html += "<td>" + this.Ingresos + "</td>";
                    html += "<td>" + this.Salidas + "</td>";
                    html += "<td>" + this.Ajuste + "</td>";
                    html += "<td>" + this.stockfinal + "</td>";
                    if (this.fechareg != "") {
                        var newDta = moment(this.fechareg, 'DD/MM/YYYY');
                        html += "<td>" + moment(newDta).format("DD/MM/YYYY") + "</td>";
                    } else {
                        html += "<td></td>";
                    }
                    if (this.CODIGO_PRODUCTO != "") {
                        html += '<td>' + '<i pid="' + this.ID_PRODUCTO + '" stockact="' + this.StockInicial + '" idalm ="' + this.ID_ALMACEN + '"title="Ajuste (+/-)" style="cursor: pointer"><button type="button" class="btn-primary">Ajuste (+/-)</button></i>' + '</td>';
                    } else {
                        html += "<td></td>";
                    }
                    html += "</tr>";
                    i++;
                    if (this.CODIGO_PRODUCTO != "") {

                        html2 += "<option codigo ='" + this.CODIGO_PRODUCTO + "' value='" + this.ID_PRODUCTO + "'>" + this.PRODUCTO + "</option>";
                    }

                });

                $(opt).html(html);
                $("#cinvprod").html(html2);
                $("#cinvprodocpac").html(html2);

            }

        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado <br />" + error, "ERROR!");
        });

}

function consultaInvCierre2(id, genPDF = 0) {
    var opt = "#tCcierreinvbody";
    $(opt).html("");
    get('/ws/CierreInventario.aspx/ClistarInvCierre', JSON.stringify({ idcierre: id }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var html = "";
                var html2 = "";

                $(opt).html("");
                var i = 1;

                $(res).each(function () {
                    html += "<tr id='trinv' ptd='" + i + "' idprod = '" + this.ID_PRODUCTO + "'>";
                    html += "<td style='display: none'>" + this.ID_PRODUCTO + "</td>";
                    html += "<td>" + this.CODIGO_PRODUCTO + "</td>";
                    html += "<td>" + this.PRODUCTO + "</td>";
                    html += "<td>" + this.UM + "</td>";
                    html += "<td>" + this.StockInicial + "</td>";
                    html += "<td>" + this.nodoc + "</td>";
                    if (this.fecemi != "") {
                        var newDt = moment(this.fecemi, 'DD/MM/YYYY');
                        var validDate = newDt._isValid;
                        if (!validDate) {
                            newDt = moment(this.fecemi, 'MM/DD/YYYY');
                        }
                        html += "<td>" + moment(newDt).format("DD/MM/YYYY") + "</td>";
                    } else {
                        html += "<td>" + moment(newDt).format("DD/MM/YYYY") + "</td>";

                    }
                    html += "<td>" + this.Ingresos + "</td>";
                    html += "<td>" + this.Salidas + "</td>";
                    html += "<td>" + this.Ajuste + "</td>";
                    html += "<td>" + this.stockfinal + "</td>";
                    if (this.fechareg != "") {
                        var newDta = moment(this.fechareg, 'DD/MM/YYYY');
                        html += "<td>" + moment(newDta).format("DD/MM/YYYY") + "</td>";
                    } else {
                        html += "<td></td>";
                    }
                    if (this.CODIGO_PRODUCTO != "") {
                        html += '<td>' + '<i pid="' + this.ID_PRODUCTO + '" stockact="' + this.StockInicial + '" idalm ="' + this.ID_ALMACEN + '"title="Ajuste (+/-)" style="cursor: pointer"><button type="button" class="btn-primary">Ajuste (+/-)</button></i>' + '</td>';
                    } else {
                        html += "<td></td>";
                    }
                    html += "</tr>";
                    i++;
                    if (this.CODIGO_PRODUCTO != "") {

                        html2 += "<option codigo ='" + this.CODIGO_PRODUCTO + "' value='" + this.ID_PRODUCTO + "'>" + this.PRODUCTO + "</option>";
                    }
                });

                $(opt).html(html);
                $("#cinvprod").html(html2);
                $("#cinvprodocpac").html(html2);
                if (genPDF == 1) GENPDF();
                else $("#CcierreModal").modal({ backdrop: 'static', keyboard: false });
            }

        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado <br />" + error, "ERROR!");
        });

}

function GuardarAjuste() {
    if ($("#cinvfec").val() != "") {
        if ($("#cinvtpooper").val() != null) {
            let info = new Object();
            var from = $("#cinvfec").val().split("/");
            var f = new Date(from[2], from[1] - 1, from[0]);

            info.idcierreinv = $("#id").val();
            info.idprodinv = $("#cinvprod").val();
            info.idalm = $("#cinvalm").val();
            info.tipooper = $("#cinvtpooper").val();
            info.fec = f;
            info.stockact = $("#cinvstockact").val();
            info.cantajus = $("#cinvcantajus").val();
            info.stockfin = $("#cinvstockfin").val();
            info.idocpac = $("#cinvocpac").val();
            //******unificar el producto del inventario y no el de la orden de compra
            //info.idprodocpac = $("#cinvprodocpac").val();
            info.idprodocpac = $("#cinvprod").val();
            //********************************************************
            info.obs = $("#cinvobs").val();
            info.tipoocpac = $("#cinvocpac option:selected").attr("tpo");

            Swal.fire({
                title: 'Confirmación',
                html: '¿Confirma que desea agregar el registro de  Ajuste de Inventario',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return fetch(`/ws/CierreInventario.aspx/InsertarAjuste`, {
                        method: 'POST', body: JSON.stringify({ info: JSON.stringify(info) }), headers: { 'Content-Type': 'application/json' }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            return response.json();
                        })
                        .catch(error => {
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            );
                        });
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.value) {
                    let res = JSON.parse(result.value.d);
                    if (res.Respuesta === 1) {
                        Alerta("El registro se insertó correctamente");
                        limpiaControles("cierreinvModal");
                        consultaInvCierre($("#id").val());
                        $("#cierreinvModal").modal("toggle");

                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                }
            });
        } else {
            Alerta("Debe seleccionar el tipo de operación", "Error!", typIconoAlerta.error);
        }
    } else {
        Alerta("Debe seleccionar la fecha del ajuste", "Error!", typIconoAlerta.error);
    }
}

function Consultar(id) {
    $("#id").val(id);
    $("#tCcierreinvbody").html("");
    consultaInvCierre2(id);
    console.log("consultar");


}
//Regenerar el cierre de inventario
function regenerar() {
    let info = new Object();

    info.id = $("#id").val();
    info.idus = Cookies.get('idu');
    get('/ws/CierreInventario.aspx/UpdateCI', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                cargaInvCierreU(info.id);
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        })
}

function exportar() {
    var jsondet = [];
    var i = 1;
    $("#tCcierreinv tbody").children("tr").each(function (index) {
        var Cod = "", Prod, um, stockini, fecemi, nodoc, ing, sal, ajus, stockfin, fechareg;
        $(this).children("td").each(function (ind) {
            switch (ind) {
                case 1:
                    Cod = $(this).html();
                    break;
                case 2:
                    Prod = $(this).html();
                    break;
                case 3:
                    um = $(this).html();
                    break;
                case 4:
                    stockini = $(this).html();
                    break;
                case 5:
                    nodoc = $(this).html();
                    break;
                case 6:
                    fecemi = $(this).html();
                    break;
                case 7:
                    ing = $(this).html();
                    break;
                case 8:
                    sal = $(this).html();
                    break;
                case 9:
                    ajus = $(this).html();
                    break;
                case 10:
                    stockfin = $(this).html();
                    break;
                case 11:
                    fechareg = $(this).html();
                    break;
            }
        });
        var fila = {
            Codigo: Cod,
            Producto: Prod,
            UM: um,
            StockIni: stockini,
            NoDoc: nodoc,
            FecEmi: fecemi,
            Ing: ing,
            Sal: sal,
            Ajus: ajus,
            StockFin: stockfin,
            FecReg: fechareg
        };
        jsondet.push(fila);
    });
    if (jsondet.length > 0) {
        var json = {
            json: JSON.stringify(jsondet),
            user: Cookies.get('nom')
        };
        get('/ws/CierreInventario.aspx/Export', JSON.stringify(json))
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
                Alerta("No fue posible cargar el listado <br />" + error, "ERROR!");
            });
    } else {
        Alerta("No hay nada que exportar", "Error!", typIconoAlerta.aviso);
    }
}

function GENPDF(tipo) {
    var jsondet = [];
    var i = 1;
    $("#tCcierreinv tbody").children("tr").each(function (index) {
        var Cod = "", Prod, um, stockini, nodoc, fecemi, ing, sal, ajus, stockfin, fechareg;
        $(this).children("td").each(function (ind) {
            switch (ind) {
                case 1:
                    Cod = $(this).html();
                    break;
                case 2:
                    Prod = $(this).html();
                    break;
                case 3:
                    um = $(this).html();
                    break;
                case 4:
                    stockini = $(this).html();
                    break;
                case 5:
                    nodoc = $(this).html();
                    break;
                case 6:
                    fecemi = $(this).html();
                    break;
                case 7:
                    ing = $(this).html();
                    break;
                case 8:
                    sal = $(this).html();
                    break;
                case 9:
                    ajus = $(this).html();
                    break;
                case 10:
                    stockfin = $(this).html();
                    break;
                case 11:
                    fechareg = $(this).html();
                    break;
            }
        });
        var fila = {
            Codigo: Cod,
            Producto: Prod,
            UM: um,
            StockIni: stockini,
            NoDoc: nodoc,
            FecEmi: fecemi,
            Ing: ing,
            Sal: sal,
            Ajus: ajus,
            StockFin: stockfin,
            FecReg: fechareg
        };
        jsondet.push(fila);
    });
    if (jsondet.length > 0) {
        var json = {
            json: JSON.stringify(jsondet),
            user: Cookies.get('nom')
        };
        get('/ws/CierreInventario.aspx/PDF', JSON.stringify(json))
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
