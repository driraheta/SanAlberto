$(document).ready(function () {
    cargaAlmacenes();
    cargaVentas(0);
    cargaContactos();
    $('.datepicker').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    });

    $('#alm').change(function () {
        if ($("#alm").val() !== "") {
            cargaVentas($("#alm").val());
        }
    });

    $('#guiarem').change(function () {
        if ($("#guiarem").val() !== "") {
            GetDataVent($("#guiarem").val());
        }
    });

    //evento cuando cambia ela cantidad
    $("#tpbody").on('input', '.cantt', function () {
        var stockact = $(this).parent().next().next().next().next().next().next().next().next().next().children().val();
        $trnewstock = $(this).parent().next().next().next().next().next().next().next().next().next().next().children();

        $trnewstock.val(Number(stockact) - Number($(this).val()));

    });

    $("#btnguarda").on("click", function () {
        guardar();
    });

    $("#btncancela").on("click", function () {
        location.href = "/pages/ginv/principal.aspx";
    });

});

function cargaAlmacenes() {
    let iduser = Cookies.get('idu');
    get('/ws/almacenes.aspx/ConsultarXUsuario', JSON.stringify({ idu: iduser }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    var html = "";
                    $("#alm").html("");
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
                    $("#alm").html('<option selected value="0">Todos</option>' + html);

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

function cargaVentas(idalm) {
    $("#guiarem").empty().append('<option value=""></option>');
    get('/ws/RegVtas.aspx/ListarVentasDev', JSON.stringify({ idalm: idalm }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        var desc = this.FOLIO + " " + formatoFecha(this.FECHAEMISION, 1);
                        $("#guiarem").append('<option value="' + this.ID_VENTAS + '">' + desc + '</option>');
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

function cargaContactos() {
    get('/ws/Contactos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
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
function cargaClientese(id, idd) {
    $("#cli").empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarCont', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#cli").append('<option value="' + this.ID_CLIENTE + '">' + this.NOMBRE_CLIENTE + '</option>');
                        $("#cli").val(idd);

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

function cargaUnidadesMedida2() {
    $("#ump").empty().append('<option value=""></option>');

    get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#ump").append('<option value="' + this.id + '">' + this.um + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
}


function GetDataVent(id) {
    cargaUnidadesMedida2();

    get('/ws/RegVtas.aspx/Editar', JSON.stringify({ id: id }))
        .then(function (res) {
            let id;
            let pre;

            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    cargaClientese(res.Info.vent.contacto, res.Info.vent.cli);

                    $("#fecemi").val(formatoFecha(res.Info.vent.fecemi, 1));

                    $("#contac").val(res.Info.vent.contacto);

                    $("#productose tbody").empty();

                    pre = "info";
                    $.each(res.Info.det, function () {
                        $("#ump").val(this.um);

                        id = $("#productose tbody tr").length;
                        fila = '<tr id="f' + pre + id + '">' +
                            '<td id="n' + pre + id + '"class="text-right" style="display: none"> ' + this.idprod + '</td > ' +
                            '<td class="text-right">' + this.cod + '</td>' +
                            '<td class="text-right">' + this.desc + '</td>' +
                            '<td class="text-center" um="' + this.um + '">' + $("#ump option:selected").text() + '</td>' +
                            '<td class="text-right"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 cantt" value=' + formatoMoneda(this.cant, 2, true) + '></td>' +
                            '<td class="text-right" style="display: none">' + this.idreg + '</td>' +
                            '<td class="text-right" style="display: none">' + this.tporeg + '</td>' +
                            '<td class="text-right"> ' + formatoMoneda(this.pre, 2, true) + '</td>' +
                            '<td class="text-right" style="display: none"> ' + formatoMoneda(this.subtotal, 2, true) + '</td>' +
                            '<td class="text-right" style="display: none"> ' + this.ivg + '</td>' +
                            '<td class="text-right" style="display: none"> ' + formatoMoneda(this.total, 2, true) + '</td>' +
                            '<td class="text-right" style="display: none">' + this.com + '</td>' +
                            '<td class="text-right" style="display: none" almc="' + this.idalm + '">' + this.idalm + '</td>' +
                            '<td class="text-right"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 stockactual" readonly="readonly" value=' + formatoMoneda(this.cant, 2, true) + '></td>' +
                            '<td class="text-right"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 stocknew" readonly="readonly" value=' + 0 + '></tr > ';

                        $("#productose tbody").append(fila);

                        fila = $("#productose tr:last");
                        $(fila).css({ "cursor": "pointer" });
                        $("#e" + pre + id).on("click", function () {

                        });
                        $("#b" + pre + id).on("click", function () {
                            Swal.fire({
                                title: 'Confirmación',
                                html: '¿Confirma que desea eliminar el producto <b>' + $("#n" + id).text() + '</b>?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#1cc88a',
                                cancelButtonColor: '#6c757d',
                                confirmButtonText: 'Si, eliminar',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.value) {
                                    $("#f" + pre + id).remove();
                                }
                            });
                        });
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible editar el registro<br />" + error, "ERROR!");
        });
}

function guardar() {
    let inventario = new Object();
    let detalleinv = new Array();
    var from = $("#fecemi").val().split("/");
    var f = new Date(from[2], from[1] - 1, from[0]);

    let i = 1;

    $.each($("#productose tbody tr"), function () {
        let detinv = new Object();

        if ($(this).find('input.cantt').val() != "") {
            detinv.ID_PRODUCTO = this.cells[0].innerText;
            detinv.CantidadIngres = $(this).find('input.cantt').val();
            detinv.Precio = this.cells[7].innerText.replace(/,/g, '');
            detinv.SubTotal = this.cells[8].innerText.replace(/,/g, '');
            detinv.IVG = this.cells[9].innerText.replace("%", "");
            detinv.Total = this.cells[10].innerText.replace(/,/g, '');
            detinv.UM = this.cells[3].innerText;
            detinv.ID_ALMACEN = $("#alm").val().trim() === "" ? 0 : $("#alm").val();
            detinv.tipo = "DEV";

            detalleinv.push(detinv);
        }
    });

    inventario.idalm = $("#alm").val().trim() === "" ? 0 : $("#alm").val();
    inventario.obs = $("#txtobs").val();
    inventario.Tipo = "DEV";
    inventario.Fecha = f;
    inventario.idocpac = $("#guiarem").val();

    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea guardar los datos?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/DevProducto.aspx/Insertar`, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(inventario), detinv: JSON.stringify(detalleinv) }), headers: { 'Content-Type': 'application/json' }
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
                Alerta("Se guardo correctamente");
                cargaVentas(0);
                $("#productose tbody").empty();
                $("#contac").val("");
                $("#cli").val("");
                $("#fecemi").val("");
                $("#txtobs").val("");

            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });
}
