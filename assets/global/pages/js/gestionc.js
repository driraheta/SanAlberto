$(document).ready(function () {
    let fecha = new Date();
    $('#desde').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#hasta').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $(".gj-icon").each(function () {
        $(this).css({ "margin-left": "-2px", "margin-top": "-5px" }).parent().height("17px").css({ "margin-left": "-7px", "margin-right": "10px" });
    });

    $("#hasta").datepicker().value(fecha);
    fecha = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    $("#desde").datepicker().value(fecha);
    //$("#desde").trigger("change");
    $("#con").on("click", function () {
        if (valForm("filtro")) {
            buscarOrdenes();
        }
        else {
            Alerta("Debe seleccionar un rango de fechas", "AVISO!");
        }

    });
    $("#can").on("click", function () {
        if (valForm("filtro")) {
            let fecha = new Date();
            $("#hasta").datepicker().value(fecha);
            fecha = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
            $("#desde").datepicker().value(fecha);
            $("#import").val("");
            $("#ruc").val("");
            $("#rsocial").val("");
            buscarOrdenes();
        }
        else {
            Alerta("Debe seleccionar un rango de fechas", "AVISO!");
        }

    });
    $("#ruc").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/ws/AutoComplete.aspx/RutAutoComplete",
                data: "{'value':'" + document.getElementById('ruc').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("No Match");
                }
            });
        },
        select: function (e, i) {
            BuscarRazonSocial(i.item.value);
        }
    });
   
    $("#rsocial").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/ws/AutoComplete.aspx/RazonSocialAutoComplete",
                data: "{'value':'" + document.getElementById('rsocial').value + "'}",
                dataType: "json",
                success: function (data) {
                    response(data.d);
                },
                error: function (result) {
                    alert("No Match");
                }
            });
        },
        select: function (e, i) {
            BuscarRUC(i.item.value);
        }
    });
});

function BuscarRazonSocial(value) {
    get("/ws/exportadores.aspx/consultaFiltro", JSON.stringify({ info: value }))
        .then(function (res) {
            if (res.Respuesta === 1) 
                if (res.Info !== null)
                    $(res.Info).each(function () {
                        $('#rsocial').val(this.razs);
                    });

        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function BuscarRUC(value) {
    get("/ws/exportadores.aspx/consultaRazs", JSON.stringify({ info: value }))
        .then(function (res) {
            if (res.Respuesta === 1)
                if (res.Info !== null)
                    $(res.Info).each(function () {
                        $('#ruc').val(this.ruc);
                    });

        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function buscarOrdenes() {
    let info = new Object();
    let reg = new Object();
    reg.fini = $("#desde").datepicker().fecha();
    reg.ffin = $("#hasta").datepicker().fecha();
    reg.imp = $("#import").val();
    reg.ruc = $("#ruc").val();
    reg.rsocial = $("#rsocial").val();
    console.log("desde:" + $("#desde").datepicker().fecha());
    console.log("hasta:" + $("#hasta").datepicker().fecha());
    info.info = JSON.stringify(reg);
    $("#registros tbody").empty();

    get("/ws/registros.aspx/consultaCostos", JSON.stringify(info))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        let fila;

                        fila = '<tr id="r' + this.id + '">' +
                            '<td class="text-center py-0" style="white-space:nowrap;font-size:90%">' + this.oc + '</td>' +
                            '<td class="text-center d-none" style="white-space:nowrap;font-size:90%">' + this.imp + '</td>' +
                            '<td class="text-center py-0" style="white-space:nowrap;font-size:90%">' + this.con + '</td>' +
                            '<td class="text-right py-0" style="white-space:nowrap;font-size:90%">' + formatoMoneda(this.impe, 2, true) + '</td>' +
                            '<td class="text-right py-0" style="white-space:nowrap;font-size:90%">' + formatoMoneda(this.impr, 2, true) + '</td>' +
                            '<td class="text-right py-0" style="white-space:nowrap;font-size:90%">' + formatoMoneda(this.trae, 2, true) + '</td>' +
                            '<td class="text-right py-0" style="white-space:nowrap;font-size:90%">' + formatoMoneda(this.trar, 2, true) + '</td>' +
                            '<td class="text-right py-0" style="white-space:nowrap;font-size:90%">' + formatoMoneda(this.repe, 2, true) + '</td>' +
                            '<td class="text-right py-0" style="white-space:nowrap;font-size:90%">' + formatoMoneda(this.repr, 2, true) + '</td>' +
                            '<td class="text-right py-0" style="white-space:nowrap";font-size:90%>' + formatoMoneda(this.almae, 2, true) + '</td>' +
                            '<td class="text-right py-0" style="white-space:nowrap;font-size:90%">' + formatoMoneda(this.almar, 2, true) + '</td>' +
                            '</tr>';

                        $("#registros tbody").append(fila);

                        let id = this.id;
                        let tipo = this.tipo;
                        $("#r" + this.id).on("click", function () {
                            detalleCostos(id, tipo);
                        })
                            .css("cursor", "pointer");
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }

        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function detalleCostos(id, tipo) {
    $("#detalle tbody").empty();
    get('/ws/registros.aspx/consultaDetalleCostos', JSON.stringify({ id: id, tipo: tipo }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#detalle tbody").append('<tr class="bg-primary  font-weight-bold text-white"><td class="py-1 text-left" style="white-space:nowrap">Costos de Importación / Compra Local</td><td class="py-1 text-center">Cajas</td><td class="py-1 text-center">Tarifa</td><td class="py-1 text-center">Importe</td><td class="py-1 text-center">Cajas</td><td class="py-1 text-center">Tarifa</td><td class="py-1 text-center">Importe</td><td class="py-1 text-center">Estado de Pago </td><td class="py-1 text-center">Ver Adj.</td></tr><tr>');
                $(res.Aux).each(function () {
                    $("#detalle tbody").append('<tr><td class="py-1 text-left" colspan="9">' + this.tipo + '</td></tr><tr>');
                    let tipo = "'" + this.tipo + "'";
                    $(this.det).each(function () {
                        let fila;
                        fila = '<tr>' +
                            '<td class="py-1 text-right">' + this.item + '</td>' +
                            '<td class="py-1 text-right">' + this.cantidade + '</td>' +
                            '<td class="py-1 text-right">' + this.tarifae + '</td>' +
                            '<td class="py-1 text-right">' + formatoMoneda(this.precioe, 2, true) + '</td>' +
                            '<td class="py-1 text-right">' + this.cantidadr + '</td>' +
                            '<td class="py-1 text-right">' + this.tarifar + '</td>' +
                            '<td class="py-1 text-right">' + formatoMoneda(this.precior, 2, true) + '</td>' +
                            '<td class="py-1 text-center text-danger">' + this.estado + '</td>' +
                            '<td class="py-1 text-center"><label class="btn btn-sm" onclick="facturas(' + id + ',' + tipo + ');"><span class="fa fa-plus"></span></label></td>' +
                            '</tr>';
                        $("#detalle tbody").append(fila);

                    });
                });
                $("#detalle tbody").append('<tr class="bg-primary  font-weight-bold text-white"><td class="py-1 text-left" style="white-space:nowrap">Costos de Transporte</td><td class="py-1 text-center">Cajas</td><td class="py-1 text-center">Tarifa</td><td class="py-1 text-center">Importe</td><td class="py-1 text-center">Cajas</td><td class="py-1 text-center">Tarifa</td><td class="py-1 text-center">Importe</td><td class="py-1 text-center">Estado de Pago </td><td class="py-1 text-center">Ver Adj.</td></tr><tr>');
                $(res.Info.trans).each(function () {
                    $("#detalle tbody").append('<tr><td class="py-1 text-left" colspan="9">' + this.tipo + '</td></tr><tr>');
                    let tipo2 = "'" + this.tipo + "'";

                    $(this.det).each(function () {
                        let fila;

                        fila = '<tr>' +
                            '<td class="py-1 text-right">' + this.item + '</td>' +
                            '<td class="py-1 text-right">' + this.cantidade + '</td>' +
                            '<td class="py-1 text-right">' + this.tarifae + '</td>' +
                            '<td class="py-1 text-right">' + formatoMoneda(this.precioe, 2, true) + '</td>' +
                            '<td class="py-1 text-right">' + this.cantidadr + '</td>' +
                            '<td class="py-1 text-right">' + this.tarifar + '</td>' +
                            '<td class="py-1 text-right">' + formatoMoneda(this.precior, 2, true) + '</td>' +
                            '<td class="py-1 text-center text-danger">' + this.estado + '</td>' +
                            '<td class="py-1 text-center"><label class="btn btn-sm" onclick="facturas2(' + id + ',' + tipo2 + ');"><span class="fa fa-plus"></span></label></td>' +
                            '</tr>';
                        $("#detalle tbody").append(fila);

                    });
                });

                $("#detalle tbody").append('<tr class="bg-primary  font-weight-bold text-white"><td class="py-1 text-left" style="white-space:nowrap">Costos de Reparto Punto de Entrega</td><td class="py-1 text-center">Cajas</td><td class="py-1 text-center">Tarifa</td><td class="py-1 text-center">Importe</td><td class="py-1 text-center">Cajas</td><td class="py-1 text-center">Tarifa</td><td class="py-1 text-center">Importe</td><td class="py-1 text-center">Estado de Pago </td><td class="py-1 text-center">Ver Adj.</td></tr><tr>');
                $(res.Info.repa).each(function () {
                    $("#detalle tbody").append('<tr><td class="py-1 text-left" colspan="11">' + this.tipo + '</td></tr><tr>');
                    let tipo3 = "'" + this.tipo + "'";

                    $(this.det).each(function () {
                        let fila;

                        fila = '<tr>' +
                            '<td class="py-1 text-right">' + this.item + '</td>' +
                            '<td class="py-1 text-right">' + this.cantidade + '</td>' +
                            '<td class="py-1 text-right">' + this.tarifae + '</td>' +
                            '<td class="py-1 text-right">' + formatoMoneda(this.precioe, 2, true) + '</td>' +
                            '<td class="py-1 text-right">' + this.cantidadr + '</td>' +
                            '<td class="py-1 text-right">' + this.tarifar + '</td>' +
                            '<td class="py-1 text-right">' + formatoMoneda(this.precior, 2, true) + '</td>' +
                            '<td class="py-1 text-center text-danger">' + this.estado + '</td>' +
                            '<td class="py-1 text-center"><label class="btn btn-sm" onclick="facturas2(' + id + ',' + tipo3 + ');"><span class="fa fa-plus"></span></label></td>' +
                            '</tr>';
                        $("#detalle tbody").append(fila);

                    });
                });
                $("#detalle tbody").append('<tr class="bg-primary  font-weight-bold text-white"><td class="py-1 text-left" style="white-space:nowrap">Costos de Almacenaje</td><td class="py-1 text-center">Cajas</td><td class="py-1 text-center">Tarifa</td><td class="py-1 text-center">Importe</td><td class="py-1 text-center">Cajas</td><td class="py-1 text-center">Tarifa</td><td class="py-1 text-center">Importe</td><td class="py-1 text-center">Estado de Pago </td><td class="py-1 text-center">Ver Adj.</td></tr><tr>');
                $(res.Info.alm).each(function () {
                    $("#detalle tbody").append('<tr><td class="py-1 text-left" colspan="11">' + this.tipo + '</td></tr><tr>');
                    let tipo4 = "'" + this.tipo + "'";

                    $(this.det).each(function () {
                        let fila;

                        fila = '<tr>' +
                            '<td class="py-1 text-right">' + this.item + '</td>' +
                            '<td class="py-1 text-right">' + this.cantidade + '</td>' +
                            '<td class="py-1 text-right">' + this.tarifae + '</td>' +
                            '<td class="py-1 text-right">' + formatoMoneda(this.precioe, 2, true) + '</td>' +
                            '<td class="py-1 text-right">' + this.cantidadr + '</td>' +
                            '<td class="py-1 text-right">' + this.tarifar + '</td>' +
                            '<td class="py-1 text-right">' + formatoMoneda(this.precior, 2, true) + '</td>' +
                            '<td class="py-1 text-center text-danger">' + this.estado + '</td>' +
                            '<td class="py-1 text-center"><label class="btn btn-sm" onclick="facturas2(' + id + ',' + tipo4 + ');"><span class="fa fa-plus"></span></label></td>' +
                            '</tr>';
                        $("#detalle tbody").append(fila);

                    });
                });

                $("#detalle tbody").append('<tr class="bg-primary  font-weight-bold text-white"><td class="py-1 text-left" style="white-space:nowrap">Costos de Embalaje</td><td class="py-1 text-center">Cajas</td><td class="py-1 text-center">Tarifa</td><td class="py-1 text-center">Importe</td><td class="py-1 text-center">Cajas</td><td class="py-1 text-center">Tarifa</td><td class="py-1 text-center">Importe</td><td class="py-1 text-center">Estado de Pago </td><td class="py-1 text-center">Ver Adj.</td></tr><tr>');
                $(res.Info.emb).each(function () {
                    $("#detalle tbody").append('<tr><td class="py-1 text-left" colspan="11">' + this.tipo + '</td></tr><tr>');
                    let tipo4 = "'" + this.tipo + "'";

                    $(this.det).each(function () {
                        let fila;

                        fila = '<tr>' +
                            '<td class="py-1 text-right">' + this.item + '</td>' +
                            '<td class="py-1 text-right">' + this.cantidade + '</td>' +
                            '<td class="py-1 text-right">' + this.tarifae + '</td>' +
                            '<td class="py-1 text-right">' + formatoMoneda(this.precioe, 2, true) + '</td>' +
                            '<td class="py-1 text-right">' + this.cantidadr + '</td>' +
                            '<td class="py-1 text-right">' + this.tarifar + '</td>' +
                            '<td class="py-1 text-right">' + formatoMoneda(this.precior, 2, true) + '</td>' +
                            '<td class="py-1 text-center text-danger">' + this.estado + '</td>' +
                            '<td class="py-1 text-center"><label class="btn btn-sm" onclick="facturas2(' + id + ',' + tipo4 + ');"><span class="fa fa-plus"></span></label></td>' +
                            '</tr>';
                        $("#detalle tbody").append(fila);

                    });
                });
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el detalle del registro solicitado<br/>" + error, "ERROR!");
        });
}
function facturas(id, tipope) {
    cargaFC(id, tipope);
    $("#mfacturas").modal({ backdrop: 'static', keyboard: false });

}
function facturas2(id, tipope) {
    cargaFC2(id, tipope);
    $("#mfacturas").modal({ backdrop: 'static', keyboard: false });

}
function cargaFC(idc, tipope) {
    var json = {
        id: idc,
        tipope: tipope
    };
    $("#tinfoFCbody").html("");
    get('/ws/registros.aspx/ConsultarFC', JSON.stringify(json))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var fila = "";
                $(res).each(function () {
                    var d = new Date(this.FECHA);
                    var yy = d.getFullYear();
                    var mm = d.getMonth();
                    var MM = parseInt(mm);
                    MM = MM + 1;
                    mm = MM.toString();
                    if (MM < 10) {
                        mm = "0" + mm;
                    }
                    var dd = d.getDate();
                    var DD = parseInt(dd);
                    if (DD < 10) {
                        dd = "0" + dd;
                    }
                    fila += '<tr>' +
                        '<td data-camp="txttpo">' + this.TIPO + '</td>' +
                        '<td data-camp="txtSerie" class="text-right">' + this.SERIE + '</td>' +
                        '<td data-camp="txtNroF" class="text-right">' + this.NUMER + '</td>' +
                        '<td data-camp="txtFEmi" class="text-right" >' + dd + "-" + mm + "-" + yy + '</td>' +
                        '<td data-camp="txtIVG">' + formatoMoneda(this.TOTAL, 2, true) + '</td>' +
                        '</tr> ';
                });
                $("#tinfoFCbody").html(fila);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function cargaFC2(idc, tipope) {
    var json = {
        id: idc,
        tipope: tipope
    };
    $("#tinfoFCbody").html("");
    get('/ws/registros.aspx/ConsultarFC2', JSON.stringify(json))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var fila = "";
                $(res).each(function () {
                    var d = new Date(this.FECHA);
                    var yy = d.getFullYear();
                    var mm = d.getMonth();
                    var MM = parseInt(mm);
                    MM = MM + 1;
                    mm = MM.toString();
                    if (MM < 10) {
                        mm = "0" + mm;
                    }
                    var dd = d.getDate();
                    var DD = parseInt(dd);
                    if (DD < 10) {
                        dd = "0" + dd;
                    }
                    fila += '<tr>' +
                        '<td data-camp="txttpo">' + this.TIPO + '</td>' +
                        '<td data-camp="txtSerie" class="text-right">' + this.SERIE + '</td>' +
                        '<td data-camp="txtNroF" class="text-right">' + this.NUMERO + '</td>' +
                        '<td data-camp="txtFEmi" class="text-right" >' + dd + "-" + mm + "-" + yy + '</td>' +
                        '<td data-camp="txtIVG">' + formatoMoneda(this.TOTAL, 2, true) + '</td>' +
                        '</tr> ';
                });
                $("#tinfoFCbody").html(fila);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

