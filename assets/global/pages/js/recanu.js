$(document).ready(function () {
    cargaVentas();
    cargaFact(); 
    cargaTipocomprobantesf();
    cargaCondicionesPago();
    cargaDireccionPartida();
    cargaVendedores();
    cargaContactos();
    cargaTransportista();
    cargaPuntosEntraga();
    Moneda.Consultar("#mon");
    $('#fec').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
    $('.fecha').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy" });
    });
    $('.datepicker').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    });

    $("#filtrarBtn").on("click", function () {
        let contactoValor = $("#filtroContacto").val();
        let rucValor = $("#filtroRUC").val();
        let clienteValor = $("#clienteValor").val();
        let filtroFechaInicio = $("#filtroFechaInicio").val();
        let filtroFechaFin = $("#filtroFechaFin").val();
        let cantidadRegistros = 0;

        fill = new Object();

        if (filtroFechaInicio != '' && filtroFechaFin != '') {
            let filtroFIniFormat = filtroFechaInicio.substr(6, 4) + "-" + filtroFechaInicio.substr(3, 2) + "-" + filtroFechaInicio.substr(0, 2);
            let filtroFFinFormat = filtroFechaFin.substr(6, 4) + "-" + filtroFechaFin.substr(3, 2) + "-" + filtroFechaFin.substr(0, 2);
            fill.feci = filtroFIniFormat;
            fill.fecf = filtroFFinFormat;
        }
        if (contactoValor != "") fill.cont = contactoValor;
        if (rucValor != "") fill.ruc = rucValor;
        if (clienteValor != "") fill.nom = clienteValor;

        cargaVentas(fill);

    });

    $("#restablecerFiltros").on("click", function () {
        cargaVentas();
        $("#filtroContacto").val("");
        $("#filtroRUC").val("");
        $("#clienteValor").val("");
        $("#pedidoValor").val("");
        $("#filtroFechaInicio").val("");
        $("#filtroFechaFin").val("");
    });

    $("#filtrarBtnf").on("click", function () {
        let contactoValor = $("#filtroContactof").val();
        let rucValor = $("#filtroRUCf").val();
        let clienteValor = $("#clienteValorf").val();
        let filtroFechaInicio = $("#filtroFechaIniciof").val();
        let filtroFechaFin = $("#filtroFechaFinf").val();
        let cantidadRegistros = 0;

        fill = new Object();

        if (filtroFechaInicio != '' && filtroFechaFin != '') {
            let filtroFIniFormat = filtroFechaInicio.substr(6, 4) + "-" + filtroFechaInicio.substr(3, 2) + "-" + filtroFechaInicio.substr(0, 2);
            let filtroFFinFormat = filtroFechaFin.substr(6, 4) + "-" + filtroFechaFin.substr(3, 2) + "-" + filtroFechaFin.substr(0, 2);
            fill.feci = filtroFIniFormat;
            fill.fecf = filtroFFinFormat;
        }
        if (contactoValor != "") fill.cont = contactoValor;
        if (rucValor != "") fill.ruc = rucValor;
        if (clienteValor != "") fill.nom = clienteValor;

        cargaFact(fill);

    });

    $("#restablecerFiltrosf").on("click", function () {
        cargaFact();
        $("#filtroContactof").val("");
        $("#filtroRUCf").val("");
        $("#clienteValorf").val("");
        $("#pedidoValorf").val("");
        $("#filtroFechaIniciof").val("");
        $("#filtroFechaFinf").val("");
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
    $("#selectallf").on("click", function () {
        $(".casef").prop("checked", this.checked);
    });
    $(".casef").on("click", function () {
        if ($(".casef").length === $(".casef:checked").length) {
            $("#selectallf").prop("checked", true);
        } else {
            $("#selectallf").prop("checked", false);
        }
    });
    $("#genf").on("click", function () {
        let j = 0;
        // para cada checkbox "chequeado"
        $("#infof").find("input[type=checkbox]:checked").each(function () {
            ++j;
        });
        if (j >0) {
            if (j === 1) {
                cargaDetfac();
                $("#mnuefacturas").modal({ backdrop: 'static', keyboard: false });
            } else {
                Alerta("Unicamente debe seleccionar un registro", "Error!", typIconoAlerta.error);
            }
        } else {
            Alerta("Debe seleccionar un registro", "Error!", typIconoAlerta.error);
        }
    });
    $("#gen").on("click", function () {
        let j = 0;
        // para cada checkbox "chequeado"
        $("#info").find("input[type=checkbox]:checked").each(function () {
            ++j;
        });
        if (j > 0) {

        if (j === 1) {
            cargaDetvent();
            $("#mguiarem").modal({ backdrop: 'static', keyboard: false });
        } else {
            Alerta("Unicamente debe seleccionar un registro", "Error!", typIconoAlerta.error);
            }
        } else {
            Alerta("Debe seleccionar un registro", "Error!", typIconoAlerta.error);
        }
    });
    $("#bruc").on("click", function () {
        if ($("#ruc").val() !== "") {
            buscaProveedor();
        }
        else {
            Alerta("Debe especificar un RUC a buscar", "AVISO!");
        }
    });
    $("#anug").on("click", function () {
        EditaVent();
    });
    $("#anu").on("click", function () {
        guardaRegistro();
    });
    $("#gua").on("click", function () {
        guardaRegistroV();
    });
    $("#can").on("click", function () {
        $("#mnuefacturas").modal("toggle");
        limpiaControles("mnuefacturas");
    });
    $("#canng").on("click", function () {
        $("#mguiarem").modal("toggle");
        limpiaControles("mguiarem");
    });
    $("#cang").on("click", function () {
        $("#mguiarem").modal("toggle");
        limpiaControles("mguiarem");
    });
    //Evento para  calcular el monto total a pagar
    $("#tproductosbody").on('input', '.pre', function () {
        var can = $(this).parent().prev().children().val();
        var ivg = $(this).parent().next().next().children().val().replace("%", "");
        $trSub = $(this).parent().next().children();
        $trTot = $(this).parent().next().next().next().children();
        $trSub.val(Number($(this).val()) * Number(can));
        var tot = 0;
        if (ivg > 0) {
            tot = ((Number($(this).val()) * Number(can)) * Number(ivg)) / 100;
        } else {
            tot = Number($(this).val()) * Number(can);
        }
        $trTot.val(tot);
    });
    //evento cuando cambia ela cantidad
    $("#tproductosbody").on('input', '.can', function () {
        var pre = $(this).parent().next().children().val();
        var ivg = $(this).parent().next().next().next().children().val().replace("%", "");
        $trSub = $(this).parent().next().next().children();
        $trTot = $(this).parent().next().next().next().next().children();
        $trSub.val(Number($(this).val()) * Number(pre));
        var tot = 0;
        if (ivg > 0) {
            tot = ((Number($(this).val()) * Number(pre)) * Number(ivg)) / 100;
        } else {
            tot = Number($(this).val()) * Number(pre);
        }
        $trTot.val(tot);
    });

    $("#tproductosngbody").on('input', '.pre', function () {
        var can = $(this).parent().prev().children().val();
        var ivg = $(this).parent().next().next().children().val().replace("%", "");
        $trSub = $(this).parent().next().children();
        $trTot = $(this).parent().next().next().next().children();
        $trSub.val(Number($(this).val()) * Number(can));
        var tot = 0;
        if (ivg > 0) {
            tot = ((Number($(this).val()) * Number(can)) * Number(ivg)) / 100;
        } else {
            tot = Number($(this).val()) * Number(can);
        }
        $trTot.val(tot);
    });
    //evento cuando cambia ela cantidad
    $("#tproductosngbody").on('input', '.can', function () {
        var pre = $(this).parent().next().children().val();
        var ivg = $(this).parent().next().next().next().children().val().replace("%", "");
        $trSub = $(this).parent().next().next().children();
        $trTot = $(this).parent().next().next().next().next().children();
        $trSub.val(Number($(this).val()) * Number(pre));
        var tot = 0;
        if (ivg > 0) {
            tot = ((Number($(this).val()) * Number(pre)) * Number(ivg)) / 100;
        } else {
            tot = Number($(this).val()) * Number(pre);
        }
        $trTot.val(tot);
    });

    $('#contac').change(function () {
        if ($("#contac").val() !== "" && $("#contac").val() !== null) {
            cargaClientesCont($("#contac").val());
            cargaContLincre($("#contac").val());
        }
    });  
});


function cargaVentas(fil = "") {
    $("#tinfobody").html("");
    let info = new Object();

    info = fil;

    get('/ws/RegVtas.aspx/ListarVentasPendientes', JSON.stringify({ info: JSON.stringify(info) }))
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
                var f = 1;
                $(res).each(function () {
                    var fecha1 = formatoFecha(this.FECHAEMISION, 1);
                    var edo = this.STATUS;
                    var td = "";
                    switch (this.STATUS) {
                        case 1:
                            edo = "Pendiente";
                            td = '<input type="checkbox" class="case" name="case[]" value="' + f + '">';
                            break;
                        case 2:
                            edo = "Cancelado";
                            td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            break;
                        case 3:
                            edo = "Anulado";
                            td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            break;
                    }

                    fila += '<tr id="tr' + this.ID_VENTAS + '"><td style="display:none;" data-camp="id">' + this.ID_VENTAS + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.SERIE + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.NUMERO + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + fecha1 + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + this.NOMBRE_CLIENTE + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + this.TOTAL + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + edo + '</td>' +
                        '<td data-camp="">' + td + '</td>' +
                        '</tr> ';
                });

                $("#tinfobody").html(fila);
                f++;
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function cargaFact(fil = "") {
    $("#tinfobodyf").html("");
    let info = new Object();

    info = fil;

    get('/ws/RegVtas.aspx/ListarFacturasVentas', JSON.stringify({ info: JSON.stringify(info) }))
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
                var f = 1;
                $(res).each(function () {
                    var fecha1 = formatoFecha(this.FECHAFV, 1);
                    var td = '<input type="checkbox" class="casef" name="casef[]" value="' + f + '">';

                    fila += '<tr id="tr' + this.ID_FACVENT + '"><td style="display:none;" data-camp="id">' + this.ID_FACVENT + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.SERIE_FV + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.NUMERO_FV + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + fecha1 + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + this.RAZONSOCIAL + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + this.TOTAL + '</td>' +
                        '<td data-camp="">' + td + '</td>' +
                        '<td style="display:none;" data-camp="id">' + this.ID_FACVENT + '</td>' +
                        '</tr> ';
                });

                $("#tinfobodyf").html(fila);
                f++;
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
/*Ventas*/
function cargaDetvent() {
    let detalle = new Array();

    let j = 1;
    // para cada checkbox "chequeado"
    $("#info").find("input[type=checkbox]:checked").each(function () {
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
        det.id = result[0];
        detalle.push(det);
        $("#serg").val(result[1]);
        $("#numg").val(result[2]);
    });

    $("#productos tbody").empty();
    get('/ws/RegVtas.aspx/GetDetF', JSON.stringify({ info: JSON.stringify(detalle) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $(res.Info).each(function () {
                    let fila = "";
                    var selum = "selum" + j;

                    let id;
                    let pre;
                    pre = "info";

                    id = $("#productos tbody tr").length;

                    fila += '<tr id="tr' + this.idprod + '"><td style="display:none;" data-camp="id">' + this.idprod + '</td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + this.cod + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 des" value="' + this.desc + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><select class="form-control unm" id="' + selum + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 can" value="' + this.cant + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre" value="' + this.pre + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub" value="' + this.subtotal + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tot" value="' + this.total + '"></td>' +
                        '<td style="display:none;" data-camp="">' + this.idreg + '</td>' +
                        '<td style="display:none;" data-camp="">' + this.com + '</td>' +
                        '<td style="display:none;" data-camp="">' + this.idalm + '</td>' +
                        '<td class="text-center"><i id="e' + pre + id + '" class="fa fa-edit" title="Edita producto"></i></td >' +
                        '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td>';
                    '</tr> ';


                    $("#productos tbody").append(fila);
                    cargaUnidadesMedidaf(j, this.um);
                    fila = $("#productos tr:last");
                    $(fila).css({ "cursor": "pointer" });
                    $("#e" + pre + id).on("click", function () {
                        let fila2 = "";
                        let k =  $("#productosng tbody tr").length;

                        var selum = "selum" + k;

                        var resultt = [];
                        var i = 0;
                        $(this).closest('td').siblings().each(function () {
                            // obtenemos el texto del td 
                            if (i === 3) {
                                resultt[i] = $(this).find('select.unm').val();
                            } else if (i === 0 || i === 9 || i === 10 || i === 11) {
                                resultt[i] = $(this).text();
                            } else {
                                resultt[i] = $(this).find('input').val();
                            }
                            ++i;
                        });

                        fila2 += '<tr id="tr' + resultt[0] + '"><td style="display:none;" data-camp="id">' + resultt[0] + '</td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + resultt[1] + '"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 des" value="' + resultt[2] + '"></td>' +
                            '<td data-camp="" class="text-center tdp"><select class="form-control unm" id="' + selum + '"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 can" value="' + resultt[4] + '"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre" value="' + resultt[5] + '"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub" value="' + resultt[6] + '"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + resultt[7] + '"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tot" value="' + resultt[8] + '"></td>' +
                            '<td style="display:none;" data-camp="">' + resultt[9] + '</td>' +
                            '<td style="display:none;" data-camp="">' + resultt[10] + '</td>' +
                            '<td style="display:none;" data-camp="">' + resultt[11] + '</td>' +
                            '</tr> ';
                        $("#productosng tbody").append(fila2);

                        cargaUnidadesMedidaf(k, resultt[3]);


                    });
                    $("#b" + pre + id).on("click", function () {
                        Swal.fire({
                            title: 'Confirmación',
                            html: '¿Confirma que desea eliminar el producto <b>' + $("#n" + pre + id).text() + '</b>?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#1cc88a',
                            cancelButtonColor: '#6c757d',
                            confirmButtonText: 'Si, eliminar',
                            cancelButtonText: 'Cancelar'
                        }).then((result) => {
                            if (result.value) {
                                let fila2 = "";
                                let k =  $("#productosng tbody tr").length;

                                var selum = "selum" + k;
                                var resultt = [];
                                var i = 0;
                                $(this).closest('td').siblings().each(function () {
                                    // obtenemos el texto del td 
                                    if (i === 3) {
                                        resultt[i] = $(this).find('select.unm').val();
                                    } else if (i === 0 || i === 9 || i === 10 || i === 11 ) {
                                        resultt[i] = $(this).text();
                                    }else {
                                        resultt[i] = $(this).find('input').val();
                                    }
                                    ++i;
                                });

                                fila2 += '<tr id="tr' + this.idprod + '"><td style="display:none;" data-camp="id">' + resultt[0] + '</td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + resultt[1] + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 des" value="' + resultt[2] + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><select class="form-control unm" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 can" value="' + resultt[4] + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre" value="' + resultt[5] + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub" value="' + resultt[6] + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + resultt[7] + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tot" value="' + resultt[8] + '"></td>' +
                                    '<td style="display:none;" data-camp="id">' + resultt[9] + '</td>' +
                                    '<td style="display:none;" data-camp="id">' + resultt[10] + '</td>' +
                                    '<td style="display:none;" data-camp="id">' + resultt[11] + '</td>' +
                                    '</tr> ';
                                $("#productosng tbody").append(fila2);

                                cargaUnidadesMedidaf(k, resultt[3]);
                                $("#tr" + resultt[0]).remove();

                                
                            }
                        });
                    });
                    ++j;
                });
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function EditaVent() {
    let vent = new Array();
    // para cada checkbox "chequeado"
    $("#info").find("input[type=checkbox]:checked").each(function () {
        var result = [];
        var i = 0;
        let v = new Object();

        // buscamos el td más cercano en el DOM hacia "arriba"
        // luego encontramos los td adyacentes a este
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td 
            result[i] = $(this).text();
            ++i;
        });
        v.id = result[0];
        v.motivo = $("#motag").val();
        v.obs = $("#obsg").val();
        v.status = 3;
        vent.push(v);

    });

    if (vent.length > 0) {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea anular los registros seleccionados?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/RegVtas.aspx/AnularReg`, {
                    method: 'POST', body: JSON.stringify({ infov: JSON.stringify(vent) }), headers: { 'Content-Type': 'application/json' }
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
                    Alerta("Los Registros de anularon correctamente");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    } else {
        Alerta("Debe seleccionar un registro", "Error!", typIconoAlerta.error);
    }
}
function guardaRegistroV() {
    let reg = new Object();
    let detalle = new Array();
    let registro = new Object();
    var from = $("#fem").val().split("/");
    var f = new Date(from[2], from[1] - 1, from[0]);
    reg.ser = $("#serng").val();
    reg.num = $("#numng").val();
    reg.fecemi = f;
    reg.cli = $("#cli").val();
    reg.vend = $("#ven").val();
    reg.cond = $("#fp").val();
    reg.dirpar = $("#dpar").val();
    reg.numdoc = $("#cruc").val();
    reg.dirlleg = $("#dlleg").val();
    reg.transp = $("#tranp").val();
    reg.contacto = $("#contac").val();
    reg.status = 1;
    reg.montpag = 0;
    reg.pun = $("#pun").val();
    reg.tipo = "GR";

    let i = 1;
    $.each($("#productosng tbody tr"), function () {
        let det = new Object();
        det.idprod = this.cells[0].innerText;
        det.cod = $(this).find('input.codp').val();
        det.desc = $(this).find('input.des').val();
        det.um = $(this).find('select.unm').val();
        det.cant = $(this).find('input.can').val();
        det.idreg = this.cells[9].innerText;
        det.pre = $(this).find('input.pre').val();
        det.subtotal = $(this).find('input.sub').val();
        det.ivg = $(this).find('input.ivg').val();
        det.total = $(this).find('input.tot').val();
        det.com = this.cells[10].innerText;
        det.idalm = this.cells[11].innerText;

        detalle.push(det);
    });

    registro.reg = reg;
    registro.det = detalle;

    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar la venta',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/RegVtas.aspx/Insertar`, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(registro) }), headers: { 'Content-Type': 'application/json' }
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
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });
}

/*Facturas*/
function cargaUnidadesMedidaf(id, um) {
    get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {

                    $("#selum" + id).append('<option value="0">Seleccionar</option>');
                    $.each(res.Info, function () {
                        $("#selum" + id).append('<option value="' + this.id + '">' + this.um + '</option>');
                    });
                    $("#selum" + id).val(um);
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
}
function cargaTipocomprobantesf() {
    get('/ws/TipoComprobante.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        if (this.desc.toUpperCase() === "NOTA DE CREDITO") {
                            $("#tcf").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        }
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de tipo de comprobantes<br />" + error, "ERROR!");
        });
}
function cargaDetfac() {
    let detalle = new Array();

    let j = 1;
    // para cada checkbox "chequeado"
    $("#infof").find("input[type=checkbox]:checked").each(function () {
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
        console.log(result[6]);
        det.id = result[6];
        detalle.push(det);
    });
    $("#productosf tbody").empty();
    get('/ws/RegVtas.aspx/GetDetF', JSON.stringify({ info: JSON.stringify(detalle) }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $(res.Info).each(function () {
                    let fila = "";
                    var selum = "selum" + j;

                    fila += '<tr id="tr' + this.idprod + '"><td style="display:none;" data-camp="id">' + this.idprod + '</td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + this.cod + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 des" value="' + this.desc + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><select class="form-control unm" id="' + selum + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 can" value="' + this.cant + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre" value="' + this.pre + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub" value="' + this.subtotal + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                        '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tot" value="' + this.total + '"></td>' +
                        '</tr> ';


                    $("#productosf tbody").append(fila);
                    cargaUnidadesMedidaf(j, this.um);
                    ++j;
                });
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function buscaProveedor() {
    $("#idp").val("0");
    $("#raz").val("");
    $("#proveedores tbody tr").empty();

    get('/ws/exportadores.aspx/consultaFiltro', JSON.stringify({ info: $("#ruc").val() }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    if (res.Info.length === 1) {
                        $("#raz").val(res.Info[0].razs).trigger("change");
                        $("#idp").val(res.Info[0].id);
                        $("#ruc").val(res.Info[0].ruc);
                        $("#dir").val(res.Info[0].dirf);
                        $("#ubi").val(res.Info[0].idubi);
                    }
                    else if (res.Info.length > 0) {
                        $(res.Info).each(function () {
                            let fila;
                            fila = '<tr><td>' + this.razs + '</td><td>' + this.ruc + '</td></tr>';
                            $("#proveedores").append(fila);
                            let ruc = this.ruc;
                            let nom = this.razs;
                            let id = this.id;
                            $($("#proveedores tr:last")).css("cursor", "pointer").on("dblclick", function () {
                                $("#ruc").val(ruc);
                                $("#raz").val(nom).trigger("change");
                                $("#idp").val(id);

                                $("#provs").modal("toggle");
                            });
                        });

                        $("#provs").modal("show");
                    }
                    else {
                        Alerta("No se encontraron proveedores con el criterio especificado", "AVISO!");
                    }
                }
                else {
                    Alerta("No se encontró información del proveedor especificado", "AVISO!");
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("no fue posible cargar el listado de Proveedores<br />" + error);
        });
}
function guardaRegistro() {
    let ventas = new Array();

    var from1 = $("#fec").val().split("/");
    var f = new Date(from1[2], from1[1] - 1, from1[0]);
    $("#infof").find("input[type=checkbox]:checked").each(function () {
        var result = [];
        var i = 0;
        let reg = new Object();
        let det = new Object();
        let detalle = new Array();
        // buscamos el td más cercano en el DOM hacia "arriba"
        // luego encontramos los td adyacentes a este
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td 
            result[i] = $(this).text();
            ++i;
        });

        det.idvent = result[6];
        det.tipoc = $("#tcf").val();
        det.fechafv = f;
        det.mon = $("#mon").val();
        det.seriefv = $("#ser").val();
        det.numfv = $("#num").val();
        det.docident = $("#ruc").val();
        det.razsoc = $("#raz").val();
        det.mot = $("#mota").val();
        det.obs = $("#obs").val();
        let sub = 0;
        let ivg = 0;
        let tot = 0;
        $.each($("#productosf tbody tr"), function () {
            let det = new Object();
            det.idprod = this.cells[0].innerText;
            det.codp = $(this).find('input.codp').val();
            det.des = $(this).find('input.des').val();
            det.um = $(this).find('select.unm').val();
            det.can = $(this).find('input.can').val();
            det.pre = $(this).find('input.pre').val();
            det.sub = $(this).find('input.sub').val();
            det.ivg = $(this).find('input.ivg').val();
            det.tot = $(this).find('input.tot').val();

            detalle.push(det);
            sub += Number($(this).find('input.sub').val());
            ivg += Number($(this).find('input.ivg').val());
            tot += Number($(this).find('input.tot').val());
        });

        det.subtotal =sub;
        det.igv = ivg;
        det.tot = tot;

        reg.reg = det;
        reg.det = detalle;
        ventas.push(reg);
    });


    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/RegVtas.aspx/InsertarFall`, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(ventas) }), headers: { 'Content-Type': 'application/json' }
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
                $("#mnuefacturas").modal("toggle");
                limpiaControles("mnuefacturas");
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });
}

function cargaCondicionesPago() {
    $("#fp").empty().append('<option value=""></option>');
    get('/ws/FormaPago.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        var desc = this.fp + "-" + this.nrodias;
                        $("#fp").append('<option value="' + this.id + '">' + desc + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de formas de pago<br/>" + error, "ERROR");
        });
}

function cargaDireccionPartida() {
    $("#dpar").empty().append('<option value=""></option>');
    get('/ws/DireccionPartida.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info.direccionList !== null) {
                    $.each(res.Info.direccionList, function () {
                        $("#dpar").append('<option value="' + this.id + '">' + this.desc + '</option>');
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

function cargaVendedores() {
    $("#ven").empty().append('<option value=""></option>');
    get('/ws/Vendedores.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#ven").append('<option value="' + this.id + '">' + this.nom + '</option>');
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

function cargaContactos() {
    get('/ws/Contactos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {

                if (res.Info !== null) {
                    $("#contac").empty().append('<option value=""></option>');

                    $(res.Info).each(function () {
                        $("#contac").append('<option value="' + this.id + '">' + this.nom + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de contactos<br />" + error, "ERROR!");
        });
}

function cargaClientesCont(id) {
    $("#cli").empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarCont', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#cli").append('<option value="' + this.ID_CLIENTE + '">' + this.NUMERO_DOCUMENTO + ' ' + this.NOMBRE_CLIENTE + '</option>');
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

function cargaTransportista() {
    $("#tranp").empty().append('<option value=""></option>');
    get('/ws/Transportistas.aspx/ConsultarT', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#tranp").append('<option value="' + this.ID_TRANSPORTISTA + '">' + this.NOMBRE + " " + this.MARCANOMBRE + " " + this.NUMERO_DOCUMENTO + " " + this.TRANSPORTISTA + '</option>');
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

function cargaDireccionLlegada(id) {
    $("#dlleg").empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarDir', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#dlleg").append('<option value="' + this.id + '">' + this.desc + "-" + this.pues + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de direcciones<br />" + error, "ERROR!");
        });
}

function cargaPuntosEntraga() {
    $("#pun").empty().append('<option value=""></option>');
    get('/ws/puntosentrega.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#pun").append('<option value="' + this.id + '">' + this.nom + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
}
