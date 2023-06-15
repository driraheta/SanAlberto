var aplica = true;

$(document).ready(function () {
    $("#id").val("");
    //cargaMoneda();
    cargaDiasPago();
    cargaBanco();
    cargaModalidadPago();
    //cargaCambio();
    $('.datepicker').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    });

    $(".numeros").on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $("#selectall").on("click", function () {
        $(".case").prop("checked", this.checked);
    });
    $(".case").on("click", function () {
        if ($(".case").length === $(".case:checked").length) {
            $("#selectall").prop("checked", true);
        } else {
            $("#selectall").prop("checked", false);
        }
    });
    $("#regpago").on("click", function () {
        validaruc();
        if (aplica) {
            $("#totapagarFormated").val("");
            $("#totapagar").val("");
            $("#MALCO-tbodydatoshistpag tbody").html("<tr><td colspan='6' class='text-center' style='line-height:0.5'>Sin registros que mostrar</td></tr>");
            getdatacxp();

            $("#regpagoModal").modal({ backdrop: 'static', keyboard: false });
        } else {
            Alerta("Uno de los Registros seleccionados no tiene el mismo RUC", "ERROR!");
        }
    });
    $('#fecp').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var mesini = (primerDia.getMonth() + 1) < 10 ? "0" + (primerDia.getMonth() + 1) : (primerDia.getMonth() + 1);
    var diaini = primerDia.getDate() < 10 ? "0" + primerDia.getDate() : primerDia.getDate();
    var fechaini = primerDia.getFullYear() + "-" + mesini + "-" + diaini;
    var mesfin = (ultimoDia.getMonth() + 1) < 10 ? "0" + (ultimoDia.getMonth() + 1) : (ultimoDia.getMonth() + 1);
    var diafin = ultimoDia.getDate() < 10 ? "0" + ultimoDia.getDate() : ultimoDia.getDate();
    var fechafin = ultimoDia.getFullYear() + "-" + mesfin + "-" + diafin;

    //$('#feci').val(fechaini);
    //$('#fecf').val(fechafin);
    cargaCXP();
    //Evento para  calcular el monto total a pagar
    $("#tinforpbody").on('input', '.montoap', function () {
        var monto = 0;
        //suma los importes de cada concepto
        $("#tinforpbody .montoap").each(function () {
            monto += Number($(this).val());
        });
        $("#totapagar").val(monto);
        $("#totapagarFormated").val(Number(monto).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    });
    $("#agrp").on("click", function () {
        guardaRegistro();
    });


});

function cargaCXP(e) {
    var fini = $("#feci").val();
    var ffin = $("#fecf").val();
    if (e != undefined) {
        var tipof = $("#seltpo").val();
    } else {
        var tipof = "Pendiente";
    }
    var ruc = $("#RucProv").val();
    var nomprv = $("#NomProv").val();
    var diasPago = $("#selDiasPago option:selected").text();
    var diasPagoVal = $("#selDiasPago").val();
    var modalidad = $("#selmodalidad").val();

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    let filtroFFinFormat = d.getFullYear() + "-"
        + (month < 10 ? '0' : '') + month + '-'
        + (day < 10 ? '0' : '') + day;

    let filtroFIniFormat = d.getFullYear() - 10 + "-"
        + (month < 10 ? '0' : '') + month + '-'
        + (day < 10 ? '0' : '') + day;
    if (fini != '') filtroFIniFormat = fini.substr(6, 4) + "-" + fini.substr(3, 2) + "-" + fini.substr(0, 2);
    if (ffin != '') filtroFFinFormat = ffin.substr(6, 4) + "-" + ffin.substr(3, 2) + "-" + ffin.substr(0, 2);
    if (diasPago == null || diasPagoVal == -1 || diasPagoVal == null) diasPago = '-1';
    var json = {
        fini: filtroFIniFormat,
        fecf: filtroFFinFormat,
        ruc: ruc,
        nomprv: nomprv,
        diasPago: diasPago,
        modalidad: modalidad,
        estatus: tipof
    };
    $("#tinfobody").html("");
    get('/ws/cxp.aspx/Consultar', JSON.stringify(json))
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
                var fila = "";
                var f = 1;

                $(res).each(function () {
                    let color = '';
                    let estado = '';
                    var tpo = "CL" + this.ID_COMPRA;
                    if (this.Modalidad === "O/C") {
                        tpo = "OC" + this.ID_COMPRA;
                    }
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
                    var mod = this.Modalidad;
                    var b = "";
                    if (mod !== "Compra local") {
                        b = '<label class="btn btn-info btn-sm" onclick="facturas(' + this.ID_COMPRA + ');"><span class="fa fa-search"></span></label>';
                    }
                    var moda = "'" + this.Modalidad + "'";

                    var td = "";
                    switch (this.Estado) {
                        case "Pendiente":
                            td = '<input type="checkbox" class="case" name="case[]" value="' + f + '">';
                            color = 'style="color:red;"';
                            estado = "<td data-camp='' class='text-center'  style='color: white!important; background-color:#FFC000'>" + this.Estado + "</td>";

                            break;
                        case "Cancelado": case "Pagada":
                            td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            color = 'style="color:green;"';
                            estado = "<td data-camp='' class='text-center'  style='color: white!important; background-color:#A9D08E'>" + this.Estado + "</td>";
                            break;
                        case "Anulado":
                            td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            estado = "<td data-camp='' class='text-center' style='color: white!important; background-color:#FF0000'>" + this.Estado + "</td>";
                            break;
                    }
                    switch (this.Modalidad) {
                        case "1":
                            mod = "Importación Directa";
                            break;
                        case "2":
                            mod = "Importación Indirecta";
                            break;
                        case "3":
                            mod = "Exportación Indirecta";
                            break;
                        case "4":
                            mod = "Exportación Directa";
                            break;
                    }
                    if (tipof === "0" || tipof === this.Estado) {
                        fila += '<tr id="tr' + tpo + '" ' + color + '><td style="display:none;" data-camp="id">' + this.ID_COMPRA + '</td>' +
                            '<td data-camp="txttpo">' + mod + '</td>' +
                            '<td data-camp="txtRucProv" class="text-center">' + this.RUC + '</td>' +
                            '<td data-camp="txtRazonSocial" class="text-center">' + this.RAZON_SOCIAL + '</td>' +
                            '<td data-camp="txtSerie" class="text-centert">' + this.SERIE + '</td>' +
                            '<td data-camp="txtNroF" class="text-center">' + this.Numero + '</td>' +
                            '<td data-camp="" class="text-center">' + this.CP + '</td>' +
                            '<td data-camp="" class="text-center">' + this.NODIAS_CONPAGO + '</td>' +
                            '<td data-camp="txtFEmi" class="text-center" >' + formatoFecha(this.FECHA, 1) + '</td>' +
                            '<td data-camp="txtMoneda" class="text-center" >' + this.MONEDA + '</td>' +
                            '<td data-camp="txtIVG"  class="text-right">' + Number(this.TOTAL).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>' +
                            estado +
                            '<td data-camp="" style="display:none;">' + this.DESCRIPCION + '</td>' +
                            //'<td data-camp=""><label class="btn btn-info btn-sm" onclick="abonar(\'tr' + tpo + '\');"><span class="fa fa-pen"></span></label></td>' +
                            '<td data-camp="">' + td + '</td>' +
                            '<td data-camp="">' + b + '</td>' +
                            '<td data-camp="" class="text-center"><label class="btn btn-info btn-sm" onclick="GetPagos(' + this.ID_COMPRA + ',' + moda + ');"><span class="fa fa-dollar-sign"></span></label></td>' +
                            '<td data-camp="" style="display:none;">' + this.RAZON_SOCIAL + '</td>' +
                            '</tr> ';
                    }
                });
                $("#tinfobody").html(fila);
                $("#report").show();
                f++;
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function restablecerFiltros() {
    $("#feci").val("");
    $("#fecf").val("");
    $("#seltpo").val("0");
    $("#RucProv").val("");
    $("#NomProv").val("");
    $("#selDiasPago").val(-1);
    $("#selmodalidad").val("");
}


function cargaMoneda() {
    $("#tinfobody").html("");
    get('/ws/monedas.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            var opt = "<option value='0'>Selecciona...</option>";
            $(res.Info).each(function () {
                opt += '<option value="' + this.id + '">' + this.mon + '</option>';
            });
            $("#selMoneda").html(opt);
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargaBanco() {
    get('/ws/cxp.aspx/consultaBancos', "")
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var opt = "<option value='0'>Selecciona...</option>";
                $(res).each(function () {
                    opt += "<option value='" + this.idBanco + "'>" + this.Banco + "</option>";
                });
                $("#selBanco").html(opt);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargaDiasPago() {
    $("#tinfobody").html("");
    get('/ws/condicionespago.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            var opt = "<option value='-1'>Todos</option>";
            opt += "<option value='0'>0</option>";
            $(res.Info).each(function () {
                opt += '<option value="' + this.id + '">' + this.nodias + '</option>';
            });
            $("#selDiasPago").html(opt);
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

var modalidadPago = null;

function cargaModalidadPago() {
    if (modalidadPago != null) {
        var opt = "<option value='0'>Selecciona...</option>";
        $(modalidadPago).each(function () {
            opt += "<option value='" + this.ID_FORMAPAGO + "'>" + this.FORMAPAGO + "</option>";
        });
        $(".modalidadpago").html(opt);
    } else {
        get('/ws/cxp.aspx/consultaModalidadPago', "")
            .then(function (res) {
                var r = JSON.stringify(res);
                if (r.startsWith('[{"Error":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {
                    var opt = "<option value='0'>Selecciona...</option>";
                    modalidadPago = res;
                    $(res).each(function () {
                        opt += "<option value='" + this.ID_FORMAPAGO + "'>" + this.FORMAPAGO + "</option>";
                    });

                    $(".modalidadpago").html(opt);
                }
            })
            .catch(function (error) {
                Alerta(error, "ERROR!");
            });
    }
}

function cargaCambio() {
    get('/ws/cxp.aspx/ConsultarCambio', "")
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var opt = "<option value='0'>Selecciona...</option>";
                $(res).each(function () {
                    opt += "<option value='" + this.TipoCambio + "'>" + this.TipoCambio + "</option>";
                });
                $("#selTpoCam").html(opt);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function abonar(id) {
    $("#" + id).children("td").each(function (ind) {
        if ($(this).attr("data-camp") !== "") {
            $("#" + $(this).attr("data-camp")).val($(this).html());
        }
    });
    $("#pagoModal").modal();
}

function crearAbono() {
    if ($("#id").val() !== "") {
        if ($("#selBanco").val() !== "0" && $("#selBanco").val() !== null) {
            // if ($("#selMoneda").val() !== "0" && $("#selMoneda").val() !== null) {
            //if ($("#selTpoCam").val() !== "0" && $("#selTpoCam").val() !== null) {
            if ($("#txtmonto").val() !== "") {
                var json = {
                    IdOcPac: $("#id").val(),
                    idBanco: $("#selBanco").val(),
                    // idMoneda: $("#selMoneda").val(),
                    idMoneda: 1,
                    TpoCambio: $("#selTpoCam").val(),
                    Monto: $("#txtmonto").val(),
                    NroOperacion: $("#txtoper").val(),
                    FechaPago: $("#txtfecpago").val(),
                    Observaciones: $("#txtobs").val(),
                    Tipo: $("#txttpo").val()
                };
                Swal.fire({
                    title: 'Confirmación',
                    html: '¿Guardar Abono?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#1cc88a',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Guardar',
                    cancelButtonText: 'Cancelar',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        return fetch(`/ws/cxp.aspx/crearAbono`, {
                            method: 'POST', body: JSON.stringify({ json: JSON.stringify(json) }), headers: { 'Content-Type': 'application/json' }
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(response.statusText)
                                }
                                return response.json()
                            })
                            .catch(error => {
                                Swal.showValidationMessage(
                                    `Request failed: ${error}`
                                )
                            })
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    var resp = "";
                    $(result.value).each(function () {
                        resp = this.d;
                    });

                    if (resp === '"OK"') {
                        clean();
                        Alerta("Abono creado correctamente");
                    } else {
                        Alerta(resp, "Error!", typIconoAlerta.error);
                    }
                });
            } else {
                Alerta("Tienes que capturar el monto", "Error!", typIconoAlerta.error);
            }
            //    } else {
            //        Alerta("Tienes que seleccionar el tipo de cambio", "Error!", typIconoAlerta.error);
            //    }
            //} else {
            //    Alerta("Tienes que seleccionar la moneda", "Error!", typIconoAlerta.error);
            //}
        } else {
            Alerta("Tienes que seleccionar el banco", "Error!", typIconoAlerta.error);
        }
    } else {
        Alerta("No se pudo determinar el id del registro", "Error!", typIconoAlerta.error);
    }
}

function clean() {
    $("#id").val("");
    $("#txtmonto").val("0");
    $("#txtoper").val("");
    $("#txtobs").val("");
    $("#txttpo").val("");
}

function facturas(idc) {
    cargaFac(idc);
    $("#mfacturas").modal({ backdrop: 'static', keyboard: false });

}

function cargaFac(idreg) {
    let fil = new Object();
    fil.idreg = idreg;
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Tipo', class: 'text-center thp', ordenable: false, columna: '', filtro: false },
            { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'SERIEF', filtro: false },
            { leyenda: 'Nro. de Factura', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'NUMEROF', filtro: false },
            { leyenda: 'Fecha Emisión', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'FECHAF', filtro: false },
            { leyenda: 'Moneda', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
            { leyenda: 'Importe', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
        ],
        modelo: [
            {
                propiedad: 'TIPOCOSTO', class: 'text-center px-2 tdp', style: "white-space:nowrap", formato: function (tr, obj, valor) {
                    if (valor === 1)
                        return "Flete Marino";
                    if (valor === 2)
                        return "Gastos de Operador";
                    if (valor === 3)
                        return "Otros";
                    if (valor === 4)
                        return "Por Producto";
                }
            },
            { propiedad: 'SERIEF', class: 'text-center tdp', ordenable: true },
            { propiedad: 'NUMEROF', class: 'text-center tdp', ordenable: true },
            {
                propiedad: 'FECHAF', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                    if (valor !== null)
                        return formatoFecha(valor, 1);
                }
            },
            { propiedad: 'MONEDA', class: 'text-center tdp', ordenable: true },
            {
                propiedad: 'TOTAL', style: 'white-space:nowrap', class: 'text-center tdp', formato: function (tr, obj, value) {

                    if (value === 0)
                        return obj.IMPORTEFAC;
                    else
                        return obj.TOTAL;
                }
            }
        ],
        url: '/ws/registros.aspx/ListarDoc',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        ordenable: true,
        limite: [20, 25, 50],
        columna: 'FECHAF',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#infofac").MALCO(data);
}

function cargaFC(idc) {

    var json = {
        id: idc
    };
    $("#tinfoFCbody").html("");
    get('/ws/cxp.aspx/ConsultarFC', JSON.stringify(json))
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
                        '<td data-camp="txtIVG">' + this.TOTAL + '</td>' +
                        '</tr> ';
                });
                $("#tinfoFCbody").html(fila);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
/*REgistro de pago*/
function cargaBancop(id) {
    get('/ws/bancos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#selBanco" + id).append('<option value="0">Seleccionar</option>');
                    $.each(res.Info, function () {
                        $("#selBanco" + id).append('<option value="' + this.id + '">' + this.banc + '</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        })
}

function cargaMonedap(id) {
    get('/ws/monedas.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#selMoneda" + id).append('<option value="0">Seleccionar</option>');
                    $.each(res.Info, function () {
                        $("#selMoneda" + id).append('<option value="' + this.id + '">' + this.mon + '</option>');
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

function cargaTipoCambio() {
    var opt = "<option value='0'>Selecciona...</option>";
    opt += '<option value="1">Compra</option>';
    opt += '<option value="2">Venta</option>';
    $(".tpocamb").html(opt);
}

function cargaCambioTpoValor(tpo, id) {
    get('/ws/cxp.aspx/ConsultarCambioTpo', JSON.stringify({ tpo: tpo }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                $(res).each(function () {
                    $("#tipocambioinp" + id).val(this.IMPORTE);//.append('<option value="' + this.id + '">' + this.mon + '</option>');
                });

            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function validaruc() {
    var j = 0;
    var ruci = "";
    aplica = true;

    // para cada checkbox "chequeado"
    $("input[type=checkbox]:checked").each(function () {
        var resultv = [];
        var i = 0;

        // buscamos el td más cercano en el DOM hacia "arriba"
        // luego encontramos los td adyacentes a este
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td 
            resultv[i] = $(this).text();

            if (j == 0) {
                if (i == 2) {
                    ruci = resultv[i];
                }
            }
            else {
                if (i == 2) {
                    if (ruci != resultv[i]) {
                        aplica = false;
                        return false;
                    }
                }
            }
            ++i;
        });
        j++;
    });
}

function getdatacxp() {
    let detalle = new Array();
    let j = 1;
    var fila = "";
    let totaldeu = 0;
    var currentTime = new Date();
    var prov = "";
    var currentDate = currentTime.toLocaleDateString();
    var currentTimeString = currentDate.toString("dd/mm/yyyy");
    //$("#fecp").val(currentTimeString).attr("fecha", new Date());
    // para cada checkbox "chequeado"
    var paramsHistoPago = [];
    cargaModalidadPago();
    $("input[type=checkbox]:checked").each(function () {
        var result = [];
        var i = 0;
        let det = new Object();

        // buscamos el td más cercano en el DOM hacia "arriba"
        // luego encontramos los td adyacentes a este
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td 
            result[i] = $(this).text();
            ++i;
        });
        var desc = result[12];
        var idr = result[0];
        var cp = "cp" + j;
        var selBanco = "selBanco" + j;
        var selModPago = "selModPago" + j;
        var selMoneda = "selMoneda" + j;
        var seltpo = "seltpo" + j;

        var importe = 0;
        var bfec = "bfec" + j;
        //var imp = result[8] - result[12];
        var imptpo = "tipocambioinp" + j;

        paramsHistoPago.push({ tpo: (result[3] == "O/C" ? "IMP" : "CL"), idc: result[0] });

        if (desc.toUpperCase() === "REGISTRO") { //Si es importacion obtiene las facturas de ese registro
            getDocsimp(idr);

        } else if (desc.toUpperCase() === "ORDEN DE COMPRA") { //Si es orden de compra obtiene las facturas de la orden de compra
            getDocsoc(idr);

        } else {
            fila += '<tr id="tr' + this.ID_VENTAS + '"><td style="display:none;" data-camp="id">' + result[0] + '</td>' +
                '<td data-camp="" class="text-center tdp">' + result[4] + '</td>' + //serie
                '<td data-camp="" class="text-right tdp">' + result[5] + '</td>' + //numero
                '<td data-camp="" class="text-right tdp">' + result[2] + '</td>' + //RUC
                '<td data-camp="" class="text-right tdp">' + result[8] + '</td>' + //Fecha
                '<td data-camp="" class="text-right tdp">' + result[3] + '</td>' + //Razon social
                '<td data-camp="" class="text-right tdp">' + result[10] + '</td>' + // importe
                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 montoap"></td>' +
                '<td data-camp="" class="text-right tdp" ><select class="form-control form-control-sm mb-2 mr-sm-2 banco" id="' + selBanco + '"></td>' +
                '<td data-camp="" class="text-right tdp" ><select class="form-control form-control-sm mb-2 mr-sm-2 modalidadpago" id="' + selModPago + '"></td>' +
                '<td data-camp="" class="text-right tdp" ><select class="form-control form-control-sm mb-2 mr-sm-2 moneda" id="' + selMoneda + '"></td>' +
                '<td data-camp="" class="text-right tdp" ><select class="form-control form-control-sm mb-2 mr-sm-2 tpocamb" id="' + seltpo + '"></td>' +
                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm numeros tipocamb" id="' + imptpo + '"></td>' +
                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 noop"></td>' +
                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ob"></td>' +
                '<td style="display:none;" data-camp="" class="text-right tdp">' + result[0] + '</td>' +
                '<td style="display:none;" data-camp="" class="text-right tdp">CL</td>' +
                '</tr> ';

            cargaBancop(j);
            cargaMonedap(j);
            cargaCambioTpoValor(0, j);
            //importe += result[9];
            importe += result[10].replace(",", "");
        }
        ++j;

        totaldeu = Number(totaldeu) + Number(importe);
        prov = result[2];
    });

    cargaModalidadPago();
    cargaTipoCambio();
    cargaHistorialPagos(paramsHistoPago);

    $("#tinforpbody").html(fila);
    $("#txtRucProvf").val(prov);
    $("#totdeuda").val(totaldeu);
    $("#totdeudaFormated").val(Number(totaldeu).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    cargaModalidadPago();
    cargaTipoCambio();

}

function guardaRegistro() {
    let detalle = new Array();

    var from1 = $("#fecp").val().split("/");
    var f = new Date(from1[2], from1[1] - 1, from1[0]);
    //Valida que haya registros
    var noreg = $("#datosregpag tbody tr").length;
    if (noreg > 0) {
        var vsave = true;
        $.each($("#datosregpag tbody tr"), function () {
            if ($(this).find('input.montoap').val() != "") {
                let det = new Object();

                det.idoc = this.cells[0].innerText;
                det.idbanc = $(this).find('select.banco').val();
                det.idformapago = $(this).find('select.modalidadpago').val();
                det.idmon = $(this).find('select.moneda').val();
                det.nooper = $(this).find('input.noop').val();
                det.fecpag = f;
                det.obs = $(this).find('input.ob').val();
                det.tpocamb = $(this).find('input.tipocamb').val() == "" ? 0 : $(this).find('input.tipocamb').val();
                det.monto = $(this).find('input.montoap').val();
                det.tpo = this.cells[16].innerText;
                det.idfac = this.cells[15].innerText;
                console.log(this.cells);
                if (det.idbanc == "0") {
                    Alerta("No ha seleccionado un banco", "ERROR");
                    vsave = false;
                    return;
                }
                else if (det.idformapago == "0") {
                    Alerta("No ha seleccionado una forma de pago", "ERROR");
                    vsave = false;
                    return;
                }
                else if (det.idmon == "0") {
                    Alerta("No ha seleccionado una moneda", "ERROR");
                    vsave = false;
                    return;
                }
                else detalle.push(det);
            }
        });
        if ($("#totapagar").val() === '0' || $("#totapagar").val() === '') {
            Alerta("No se ha registrado valores a pagar", "AVISO");
        }
        else if (vsave) {
            console.log(detalle);
            Swal.fire({
                title: 'Confirmación',
                html: '¿Confirma que desea agregar el abono?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return fetch(`/ws/cxp.aspx/InsertarP`, {
                        method: 'POST', body: JSON.stringify({ info: JSON.stringify(detalle) }), headers: { 'Content-Type': 'application/json' }
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
                var resp = "";
                $(result.value).each(function () {
                    resp = this.d;
                });

                if (resp === '"OK"') {
                    clean();
                    Alerta("Abono creado correctamente");
                    $("#regpagoModal").modal("toggle");
                    $("#totapagarFormated").val("");
                    $("#totapagar").val("");

                } else {
                    Alerta(resp, "Error!", typIconoAlerta.error);
                }
            });
        }

    } else {
        Alerta("No se puede guardar, no hay datos del pago!", "ERROR");
    }
}

function getDocsoc(id) {
    var j = 1;
    let totaldeu = 0;
    var importe = 0;
    var fila = "";

    get('/ws/compras.aspx/ListarDocC', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $(res.Info).each(function () {
                    var cp = "cp" + j;
                    var selBanco = "selBanco" + j;
                    var selMoneda = "selMoneda" + j;
                    var seltpo = "seltpo" + j;
                    var bfec = "bfec" + j;
                    var imptpo = "tipocambioinp" + j;

                    var imp = this.tot - this.montpag;
                    fila += '<tr id="tr' + this.idreg + '"><td style="display:none;" data-camp="id">' + this.idreg + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + this.ser + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.num + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.RUC + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + formatoFecha(this.fec, 1) + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + imp + '</td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 montoap"></td>' +
                        '<td data-camp="" class="text-right tdp" ><select class="form-control form-control-sm mb-2 mr-sm-2 banco" id="' + selBanco + '"></td>' +
                        '<td data-camp="" class="text-right tdp" ><select class="form-control form-control-sm mb-2 mr-sm-2 moneda" id="' + selMoneda + '"></td>' +
                        '<td data-camp="" class="text-right tdp" ><select class="form-control form-control-sm mb-2 mr-sm-2 tpocamb" id="' + seltpo + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 numeros tipocamb" id="' + imptpo + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 noop"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ob"></td>' +
                        '<td style="display:none;" data-camp="" class="text-right tdp">' + this.id + '</td>' +
                        '<td style="display:none;" data-camp="" class="text-right tdp">OC</td>' +
                        '</tr> ';

                    cargaBancop(j);
                    cargaMonedap(j);
                    cargaCambioTpoValor(1, j);
                    ++j;
                    importe += this.tot;

                });
                totaldeu = Number(totaldeu) + Number(importe);

                $("#tinforpbody").html(fila);
                $("#totdeuda").val(totaldeu);
                cargaModalidadPago();
                cargaTipoCambio();
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });


}

function getDocsimp(id) {
    var j = 1;
    let totaldeu = 0;
    var importe = 0;
    var fila = "";
    cargaModalidadPago();

    get('/ws/registros.aspx/ListarDocReg', JSON.stringify({ id: id }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                $(res).each(function () {
                    var cp = "cp" + j;
                    var selBanco = "selBanco" + j;
                    var selMoneda = "selMoneda" + j;
                    var selModPago = "selModPago" + j;
                    var bfec = "bfec" + j;
                    var seltpo = "seltpo" + j;
                    var imptpo = "tipocambioinp" + j;

                    var imp = this.TOTAL - this.DOCREGMONTOPAGADO;
                    fila += '<tr id="tr' + this.ID_REGISTRO + '"><td style="display:none;" data-camp="id">' + this.ID_REGISTRO + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + this.SERIEF + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.NUMEROF + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.RUC + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + formatoFecha(this.FECHAF, 1) + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.RAZON_SOCIAL + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + imp + '</td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 montoap"></td>' +
                        '<td data-camp="" class="text-right tdp" ><select class="form-control form-control-sm mb-2 mr-sm-2 banco" id="' + selBanco + '"></td>' +
                        '<td data-camp="" class="text-right tdp" ><select class="form-control form-control-sm mb-2 mr-sm-2 modalidadpago" id="' + selModPago + '"></td>' +
                        '<td data-camp="" class="text-right tdp" ><select class="form-control form-control-sm mb-2 mr-sm-2 moneda" id="' + selMoneda + '"></td>' +
                        '<td data-camp="" class="text-right tdp" ><select class="form-control form-control-sm mb-2 mr-sm-2 tpocamb" id="' + seltpo + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm numeros tipocamb" id="' + imptpo + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 noop"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ob"></td>' +
                        '<td style="display:none;" data-camp="" class="text-right tdp">' + this.ID_FACTURA + '</td>' +
                        '<td style="display:none;" data-camp="" class="text-right tdp">IMP</td>' +
                        '</tr> ';

                    cargaBancop(j);
                    cargaMonedap(j);
                    cargaTipoCambio(j);
                    cargaCambioTpoValor(0, j);
                    ++j;
                    importe += imp;

                });
                totaldeu = Number(totaldeu) + Number(importe);

                $("#tinforpbody").html(fila);
                $("#totdeuda").val(totaldeu);
                $("#totdeudaFormated").val(Number(totaldeu).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                cargaModalidadPago();
                cargaTipoCambio();
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });

}

function GetPagos(idc, tpo) {
    var tpom = "";
    if (tpo === "REGISTRO" || tpo === "1") {
        tpom = "IMP";
    } else if (tpo === "ORDEN DE COMPRA") {
        tpom = "OC";
    } else {
        tpom = "CL";
    }
    let fil = new Object();
    fil.idoc = idc;
    fil.tpo = tpom;
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Nro. Operación', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'NroOperacion', filtro: false },
            { leyenda: 'Importe', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'Monto', filtro: false },
            { leyenda: 'Moneda', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'MONEDA', filtro: false },
            { leyenda: 'Fecha Pago', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'FechaPago', filtro: false },
            { leyenda: 'Banco', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'Banco', filtro: false }
        ],
        modelo: [
            { propiedad: 'NroOperacion', class: 'text-center tdp', ordenable: true },
            {
                propiedad: 'Monto', class: 'text-center tdp', ordenable: true,
                formato: function (tr, obj, valor) {
                    if (!isNaN(valor)) {
                        return Number(valor).toFixed(2);
                    } else {
                        return valor;
                    }
                }
            },
            { propiedad: 'MONEDA', class: 'text-center tdp', ordenable: true },
            {
                propiedad: 'FechaPago', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                    if (valor !== null)
                        return formatoFecha(valor, 1);
                }
            },
            { propiedad: 'Banco', class: 'text-center tdp', ordenable: true }
        ],
        url: '/ws/cxp.aspx/ConsultarPagos',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        ordenable: true,
        limite: [20, 25, 50],
        columna: 'FechaPago',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#infodetpago").MALCO(data);
    $("#mdetpagos").modal({ backdrop: 'static', keyboard: false });

}

function cargaHistorialPagos(params) {
    let param = new Object();
    var fils = [];
    var idcs = [];

    if (!(params.length > 0)) {
        return;
    }
    for (var i = 0; i < params.length; i++) {
        var tpom = "";
        if (params[i].tpo === "REGISTRO" || params[i].tpo === "IMP") {
            tpom = "IMP";
        } else if (params[i].tpo === "ORDEN DE COMPRA") {
            tpom = "OC";
        } else {
            tpom = "CL";
        }
        let fil = new Object();
        fil.idoc = params[i].idc;
        fil.tpo = tpom;

        fils.push(fil);
        idcs.push(params[i].idc + "-" + tpom);
    }


    //param.where = fils;
    param.where = { 'idcs': idcs };
    var data = {
        class: 'table table-sm table-hover table-responsive',
        columnas: [
            { leyenda: 'Fecha Pago', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'FechaPago', filtro: false },
            {
                leyenda: 'Importe', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'Monto', filtro: false
            },
            { leyenda: 'Moneda', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'MONEDA', filtro: false },
            { leyenda: 'Nro. Operación', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'NroOperacion', filtro: false },
            { leyenda: 'Modalidad Pago', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'FormaPago', filtro: false },
            { leyenda: 'Banco', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'Banco', filtro: false }
        ],
        modelo: [
            {
                propiedad: 'FechaPago', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                    if (valor !== null)
                        return formatoFecha(valor, 1);
                }
            },
            {
                propiedad: 'Monto', class: 'text-center tdp', ordenable: true, formato: function (tr, obj, valor) {
                    if (!isNaN(valor)) {
                        return Number(valor).toFixed(2);
                    } else {
                        return valor;
                    }
                }
            },
            { propiedad: 'MONEDA', class: 'text-center tdp', ordenable: true },
            { propiedad: 'NroOperacion', class: 'text-center tdp', ordenable: true },
            { propiedad: 'FORMAPAGO', class: 'text-center tdp', ordenable: true },
            { propiedad: 'Banco', class: 'text-center tdp', ordenable: true }
        ],
        url: '/ws/cxp.aspx/ConsultarHistorialPagos',
        parametros: idcs,
        paginable: true,
        filtrable: false,
        ordenable: true,
        limite: [20, 25, 50],
        columna: 'FechaPago',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#tbodydatoshistpag").MALCO(data);
    //$("#mdetpagos").modal({ backdrop: 'static', keyboard: false });

}