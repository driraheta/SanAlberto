let cuotasFacturaList = [];
let cuotaFactura = {};

$(document).ready(function () {
    restablecerCampos();
    cargarTipoDocumentoFE();
    cargarClientesFE();
    cargaVentas();
    cargarSunatTransaccion();
    cargarIGV();
    cargarMonedasFE();
    cargarTiposComprobante();
    cargarProductosPackingList();
    cargarTipoNotaCredito();
    cargarTipoNotaDebito();
    BuscarEnable();
    $("#valCuota").on("keypress", function (evt) {
        return numerosDecimales(evt, this);
    });

    $('#txtClienteFiltro').on("keyup", function () {
        let filtro = $('#txtClienteFiltro').val();
        let validador = 0;
        let contador = 0;

        $('#txtCliente option').each(function () {
            //filtro cliente
            let denominacionCliente = $(this).text().toUpperCase();
            let numeroDocumentoCliente = $(this).attr("numerodocumento");

            if (denominacionCliente.indexOf(filtro.toUpperCase()) !== -1 || numeroDocumentoCliente.indexOf(filtro) !== -1) {
                $(this).show();
                if (validador === 0) {
                    $(this).attr("selected", true);
                    $('#txtCliente ').val($(this).val());
                    $('#txtClienteDireccion').val($(this).attr("direccion"));
                    seleccionarTipoDocumentoCliente($(this).attr("tipodocumento"));

                    validador++;
                } else {
                    $(this).attr("selected", false);
                }
            } else {
                $(this).attr("selected", false);
                $(this).hide();
                contador++;
                if ($(this).attr("style") == "display: none;" && contador == $('#txtCliente option').length) {
                    $('#txtCliente ').val('');
                }
            }
            if (filtro == '') {
                //SELECCIONAR EL PRIMERO
                $(this).show();
                $('#txtCliente option:first-child').attr("selected", true);
                seleccionarTipoDocumentoCliente($('#txtCliente option:first-child').attr("tipodocumento"));
                $('#txtClienteDireccion ').val($('#txtCliente option:first-child').attr("direccion"));
            }
        });
    });

    $('#txtDescuentoGlobal').on("keyup", function () {
        aplicarDescuentoGlobal();
    });

    $('#txtDescuentoGlobal').on("change", function () {
        aplicarDescuentoGlobal();
    });

    $('#btnEmitirFactura').on("click", function () {
        emitirFacturaShow();

    });

    $('#btnEmitirBoleta').on("click", function () {
        $("#npro").hide();

        let documentoClienteTabla = '';
        let monedaTabla = '';
        let idVentaTR;
        let ventas = new Array();
        let observacion = 'Guia de Remisión';

        let gratuita = 0;

        if (existeMarcadoChkTblInfoDOM()) {
            documentoClienteTabla = $($($($($('.case:checked')[0]).parent()[0]).parent()[0]).children()[6]).attr("documento");
            monedaTabla = $($($($($('.case:checked')[0]).parent()[0]).parent()[0]).children()[8]).text();

            seleccionarCliente(documentoClienteTabla);
            seleccionarMonedaPorNombre(monedaTabla);
            gratuita = $($($($($('.case:checked')[0]).parent()[0]).parent()[0]).children()[15]).text();


            $('.case:checked').each(function () {
                idVentaTR = $($($(this).parent()[0]).parent()[0]).attr("id");
                idVentaTR = idVentaTR.substr(2);
                ventas.push(idVentaTR);
                observacion += ' ' + $($($($($(this)[0]).parent()[0]).parent()[0]).children()[0]).text() + $($($($($(this)[0]).parent()[0]).parent()[0]).children()[1]).text();

            });
            ventas.forEach(function (idVentas) {
                cargarProductosDesdeIdVenta(idVentas);
            })

            $('#modalEmisionDocumentoElectronicos').show();
            $('#modalDocumentosVentas').hide();
            $('#encabezadoPrincipal').hide();
            $('#busqueda').hide();

            $('#txtCliente').prop("disabled", true);

            $('#txtMoneda').prop("disabled", true);

        } else {
            restablecerCampos();
        }
        $('#txtSerie').prop("readonly", true);
        $('#txtClienteTipoDocumento').prop("disabled", true);

        $('#txtTipoComprobante').prop("disabled", true);
        $('#txtTipoComprobante').val(2);
        $('#txtSerie').val("BBB1");
        $('#txtSunatTransaction').val(1);
        $('#txtObservaciones').val(observacion);
        $('#txtgratuita').val(gratuita);

    });

    $('#btnEmitirNC').on("click", function () {
        cargarDocElec();

        $('#txtSeriec').val('FFF1');

        $('#modalEmisionNotas').show();
        $('#modalEmisionDocumentoElectronicos').hide();
        $('#modalDocumentosVentas').hide();
        $('#encabezadoPrincipal').hide();
        $('#busqueda').hide();
        $('#txtTipoComprobantenc').val(3);
        $('#txtTipoComprobantenc').prop("disabled", true);
        $($($('#txtClienteFiltronc').parent()[0]).parent()[0]).hide();
        $('#divtipond').hide();
        $('#divtiponc').show();
        $('#divtitlend').hide();
        $('#divtitlenc').show();
    });

    $('#btnEmitirND').on("click", function () {
        cargarDocElec();

        $('#txtSeriec').val('FFF1');

        $('#modalEmisionNotas').show();
        $('#modalEmisionDocumentoElectronicos').hide();
        $('#modalDocumentosVentas').hide();
        $('#encabezadoPrincipal').hide();
        $('#busqueda').hide();
        $('#txtTipoComprobantenc').prop("disabled", true);
        $('#txtTipoComprobantenc').val(4);
        $($($('#txtClienteFiltronc').parent()[0]).parent()[0]).hide();
        $('#divtiponc').hide();
        $('#divtipond').show();
        $('#divtitlend').show();
        $('#divtitlenc').hide();
    });

    $('#btnCancelar').on("click", function () {
        restablecerCampos();
        $('#modalEmisionDocumentoElectronicos').hide();
        $('#modalDocumentosVentas').show();
        $('#encabezadoPrincipal').show();
        $('#busqueda').show();

    });

    $('#btnCancelarn').on("click", function () {
        restablecerCamposNotas()
        $('#modalEmisionNotas').hide();
        $('#modalDocumentosVentas').show();
        $('#encabezadoPrincipal').show();
        $('#busqueda').show();

    });

    $('.datepicker').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    });

    $('#btnEmitirDocumentoElectronico').on("click", function () {
        let cabeceraFactura = cargarCabeceraDocumentoElectronico();
        let detalleFactura = cargarDetalleDocumentoElectronico();
        let detallePagos = cargarDetallePagos();
        let cabeceraFacturaJSON = JSON.stringify(cabeceraFactura);
        let detalleFacturaJSON = JSON.stringify(detalleFactura);
        let detallePagosJSON = JSON.stringify(detallePagos);

        Swal.fire({
            title: 'Necesitamos de tu Confirmación',
            html: 'Se creará el documento con los siguientes datos:</br>' +
                '<div class="row">' +
                '<div class= "col-12 border-bottom pt-3 text-center" >' +
                '<label class="font-weight-bold">RESUMEN</label>' +
                '</div>' +
                '</div >' +
                '<div class="row">' +
                '<div class="col-6 border-bottom  pt-2">' +
                '   <label>Sub Total</label>' +
                '</div>' +
                '<div class="col-6 border-bottom text-right  pt-2">' +
                '   <label>' + (cabeceraFactura.total + cabeceraFactura.descuento_global - cabeceraFactura.total_igv) + '</label>' +
                '</div>' +
                '<div class="col-6 border-bottom  pt-2">' +
                '   <label >IGV (18%)</label>' +
                '</div>' +
                '<div class="col-6 border-bottom text-right  pt-2">' +
                '   <label>' + cabeceraFactura.total_igv + '</label>' +
                '</div>' +
                '<div class="col-6 border-bottom  pt-2">' +
                '   <label><span class="text-danger">(-)</span> Descuento Total</label>' +
                '</div>' +
                '<div class="col-6 border-bottom text-right  pt-2">' +
                '   <label>' + cabeceraFactura.descuento_global + '</label>' +
                '</div>' +
                '<div class="col-6 border-bottom  pt-2">' +
                '   <label>Total</label>' +
                '</div>' +
                '<div class="col-6 border-bottom text-right  pt-2">' +
                '   <label>' + cabeceraFactura.total + '</label>' +
                '</div>' +
                '</div>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                let urlServicio = '';
                //SE VALIDA LA URL DEL SERVICIO
                switch (cabeceraFactura.tipo_de_comprobante) {
                    case 1: urlServicio = '/ws/DocumentosElectronicos.aspx/EmitirFactura';
                        break;
                    case 2: urlServicio = '/ws/DocumentosElectronicos.aspx/EmitirBoleta'; //SERVICIO EmitirBoleta
                        break;
                    case 3: urlServicio = '';//SERVICIO Nota de Credito
                        break;
                    case 4: urlServicio = '';//SERVICIO Nota de Debito
                        break;

                    default: urlServicio = '';
                }

                return get(urlServicio, JSON.stringify({ cabeceraFactura: cabeceraFacturaJSON, detalleFactura: detalleFacturaJSON, detalleCuotas: detallePagosJSON }))
                    .then(function (res) {
                        var r = JSON.stringify(res);
                        if (r.startsWith('[{"Error":', 0)) {
                            var err = "";
                            $(res).each(function () {
                                err += this.Error;
                            });
                            Alerta(err, "ERROR!");
                        } else {

                        }
                    })
                    .catch(function (error) {
                        Alerta(error, "ERROR!");
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {

            if (result.value) {
                restablecerCampos();
                //CERRRA MODAL
                cargaVentas();
                $('#modalDocumentosVentas').show();
                $('#encabezadoPrincipal').show();
                $('#busqueda').show();
                $('#modalEmisionDocumentoElectronicos').hide();

                Alerta("SE GUARDO SATISFACTORIAMENTE", "OK");
            }
        });


    });

    $('#btnAgregaCuota').on("click", function () {
        cuotaFactura = {};
        cargaCuotaCredito(cuotaFactura);

    });

    $('#agrc').on("click", function () {
        CargarTablaCredito();
        $("#modalDatosCredito").modal("toggle");
    });

    $('#canc').on("click", function () {
        $("#modalDatosCredito").modal("toggle");
    });

    $('#agrpd').on("click", function () {
        //cuotaFactura = {};
        let num = cuotasFacturaList.length + 1;
        cuotaFactura.Fecha = $('#fecCuota').val();
        cuotaFactura.Monto = $('#valCuota').val();
        if (ValidarCuota()) {
            if (cuotaFactura.Numero === 0) {
                cuotaFactura.Numero = num;
                cuotasFacturaList.push(cuotaFactura);
            }
            else {
                var indice = cuotasFacturaList.findIndex(obj => obj.Numero == cuotaFactura.Numero);
                cuotasFacturaList[indice].Fecha = cuotaFactura.Fecha;
                cuotasFacturaList[indice].Monto = cuotaFactura.Monto;
            }
            ActualizarCuotasCredito();
            $("#modalDetalleCredito").modal("toggle");
        }
        //else {
        //    Alerta("Por favor verifique los datos ingresados", "AVISO");
        //}

    });

    $('#canpd').on("click", function () {
        $("#modalDetalleCredito").modal("toggle");
    });

    $("#selectall").on("click", function () {
        if (todosMarcadosChkTblInfoDOM()) {
            $("#selectall").prop("checked", false);
            $("#selectall").attr("disabled", true);
            $(".case").prop("checked", false);
            $(".case").show();
        } else {
            marcarMismoClienteCheckTblInfoDOM();
        }
    });
    //Para obtener datos del documento a seleccionar
    $('#docamodificar').change(function () {
        seleccionarClienteNotas($('#docamodificar option:selected').attr("documento"));
        $('#tipodocmodif').val($('#docamodificar option:selected').attr("tipo"));
        cargarProductosDesdeIdVentaNotas($('#docamodificar').val());
        seleccionarMonedaNotas($('#docamodificar option:selected').attr("moneda"));
    });
    //Para generar el documento elecrtronico
    $('#btnEmitirDocElec').on("click", function () {
        $('#modalEmisionDocumentoElectronicos').show();
        $('#modalDocumentosVentas').hide();
        $('#encabezadoPrincipal').hide();
        $('#busqueda').hide();

        $('#txtSerie').prop("readonly", false);
        $('#txtClienteTipoDocumento').prop("disabled", false);

        $('#txtTipoComprobante').val(1);
        $('#txtSunatTransaction').val(1);
        $("#npro").show();


    });

    $("#npro").on("click", function () {
        $("#tabla").val("info");
        $("#prods").modal({ backdrop: 'static', keyboard: false });
        limpiaControles('prods');
        $("#ivg").prop("selectedIndex", 0);

        //if ($("#ivg option").length === 2) {
        //    $("#ivg").prop("selectedIndex", 1);
        //}
    });

    $("#canp").on("click", function () {
        $("#prods").modal("toggle");
        limpiaControles('prods');
        $("#imps tbody").empty();
        $("#nompValidar").hide();
        $("#nomp").removeClass("has-error");
        $("#nomp option").each(function () {
            $(this).show();
        });
    });

    $('#nomp').change(function () {
        nomp = $('#nomp option:selected').text().trim();
        cargaProductos($('#nomp').val());
        cargaUnidadesMedida();
        cargaUnidadesMedidaProdConv($('#nomp').val());

    });

    $("#prep").on("change", function () {
        importeProducto();
    });

    $("#cantp").on("change", function () {
        importeProducto();
    });

    $("#agrp").on("click", function () {
        if ($("#nomp").val() === undefined || $("#nomp").val() === "" || $("#nomp").val() === null) {
            $("#nompValidar").show();
            $("#nomp").addClass("has-error");
        } else {
            $("#nompValidar").hide();
            $("#nomp").removeClass("has-error");
        }
        if (valForm("prods")) {
            let id;
            let pre = "forma";
            let fila;
            id = $("#tblProductos tbody tr").length + 1;
            fila = '<tr class="text-center" id="f' + pre + id + '">' +
                '<td style="display: none" idVenta= 0>' + $("#idp").val() + '</td>' +
                '<td>' + $("#nomp option:selected").attr("codigo") + '</td>' +
                '<td id="n' + pre + id + '">' + $('#nomp option:selected').text().trim() + '</td>' +
                '<td class="text-center" um="' + $("#ump").val() + '">' + $("#ump option:selected").text() + '</td>' +
                '<td cantidad="' + $("#cantp").val() + '">' + $("#cantp").val() + '</td>' +
                '<td valorUnitario="' + $("#prep").val() + '">' + $("#prep").val() + '</td>' +
                '<td subTotal="' + $("#subp").val() + '">' + $("#subp").val() + '</td>' +
                '<td>' + 0 + '</td>' +
                '<td total="' + $("#impp").val() + '">' + $("#impp").val() + '</td>' +
                '<td><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

            $("#tblProductos tbody").append(fila);
            fila = $("#tblProductos tr:last");

            $(fila).css({ "cursor": "pointer" });
            $("#e" + pre + id).on("click", function () {

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
                        $("#f" + pre + id).remove();
                        calculaTotales();
                    }
                });

            });

            $("#prods").modal("toggle");

            $("#ump").val("");
            $("#cantp").val("");
            $("#prep").val("");
            $("#subp").val("");
            $("#codp").val("");

            calculaTotales();
        }
    });

    $('#filtroProductoPL').on("keyup", function () {
        let filtro = $('#filtroProductoPL').val();
        let _this = this;
        let validador = 0;
        let contador = 0;
        $('#nomp option').each(function () {
            let nombreProducto = $(this).text().toUpperCase();
            let codigoProducto = $(this).attr("codigo");

            if (nombreProducto.indexOf(filtro.toUpperCase()) !== -1 || codigoProducto.indexOf(filtro) !== -1) {

                $(this).show();
                if (validador === 0) {
                    $(this).attr("selected", true);
                    $('#nomp').val($(this).val());
                    cargaProductos($('#nomp').val());
                    cargaUnidadesMedida();
                    cargaUnidadesMedidaProdConv($('#nomp').val());
                    nomp = $('#nomp option:selected').text().trim();

                    validador++;
                } else {
                    $(this).attr("selected", false);
                }
            } else {
                $(this).attr("selected", false);
                $(this).hide();
                contador++;
                if ($(this).attr("style") == "display: none;" && contador == $('#nomp option').length) {
                    $('#nomp').val('');
                }
            }

            if (filtro == '') {
                //SELECCIONAR EL PRIMERO
                $(this).show();
                $('#nomp option:first-child').attr("selected", true);
            }



        });

    });
    //Guarda las notas
    $('#btnEmitirDocumentoElectronicon').on("click", function () {
        let cabeceraFactura = cargarCabeceraDocumentoElectronicoNotas();
        let detalleFactura = cargarDetalleDocumentoElectronicoNotas();

        let cabeceraFacturaJSON = JSON.stringify(cabeceraFactura);
        let detalleFacturaJSON = JSON.stringify(detalleFactura);



        Swal.fire({
            title: 'Necesitamos de tu Confirmación',
            html: 'Se creará el documento con los siguientes datos:</br>' +
                '<div class="row">' +
                '<div class= "col-12 border-bottom pt-3 text-center" >' +
                '<label class="font-weight-bold">RESUMEN</label>' +
                '</div>' +
                '</div >' +
                '<div class="row">' +
                '<div class="col-6 border-bottom  pt-2">' +
                '   <label>Sub Total</label>' +
                '</div>' +
                '<div class="col-6 border-bottom text-right  pt-2">' +
                '   <label>' + (cabeceraFactura.total + cabeceraFactura.descuento_global - cabeceraFactura.total_igv) + '</label>' +
                '</div>' +
                '<div class="col-6 border-bottom  pt-2">' +
                '   <label >IGV (18%)</label>' +
                '</div>' +
                '<div class="col-6 border-bottom text-right  pt-2">' +
                '   <label>' + cabeceraFactura.total_igv + '</label>' +
                '</div>' +
                '<div class="col-6 border-bottom  pt-2">' +
                '   <label><span class="text-danger">(-)</span> Descuento Total</label>' +
                '</div>' +
                '<div class="col-6 border-bottom text-right  pt-2">' +
                '   <label>' + cabeceraFactura.descuento_global + '</label>' +
                '</div>' +
                '<div class="col-6 border-bottom  pt-2">' +
                '   <label>Total</label>' +
                '</div>' +
                '<div class="col-6 border-bottom text-right  pt-2">' +
                '   <label>' + cabeceraFactura.total + '</label>' +
                '</div>' +
                '</div>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                let urlServicio = '';
                //SE VALIDA LA URL DEL SERVICIO
                switch (cabeceraFactura.tipo_de_comprobante) {
                    case 1: urlServicio = '';
                        break;
                    case 2: urlServicio = ''; //SERVICIO EmitirBoleta
                        break;
                    case 3: urlServicio = '/ws/DocumentosElectronicos.aspx/EmitirNota';//SERVICIO Nota de Credito
                        break;
                    case 4: urlServicio = '/ws/DocumentosElectronicos.aspx/EmitirNota';//SERVICIO Nota de Debito
                        break;

                    default: urlServicio = '';
                }

                return get(urlServicio, JSON.stringify({ cabeceraFactura: cabeceraFacturaJSON, detalleFactura: detalleFacturaJSON }))
                    .then(function (res) {
                        var r = JSON.stringify(res);
                        if (r.startsWith('[{"Error":', 0)) {
                            var err = "";
                            $(res).each(function () {
                                err += this.Error;
                            });
                            Alerta(err, "ERROR!");
                        } else {

                        }
                    })
                    .catch(function (error) {
                        Alerta(error, "ERROR!");
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {

            if (result.value) {
                restablecerCamposNotas();
                //CERRRA MODAL
                cargaVentas();
                $('#modalDocumentosVentas').show();
                $('#encabezadoPrincipal').show();
                $('#busqueda').show();
                $('#modalEmisionNotas').hide();

                Alerta("SE GUARDO SATISFACTORIAMENTE", "OK");
            }
        });


    });

    $('#txtCondPago').on("change", function () {
        let tipoCondicion = $('#txtCondPago').val();
        if (tipoCondicion == '4') {
            cargaDatosCredito();
        }
    });

});

function restablecerFiltros() {
    $("#feci").val('');
    $("#fecf").val('');
    $("#RucCli").val('');
    $("#NomCli").val('');
    $("#NomCon").val('');
    $("#selestado").val('0');
    cargaVentas();
}

function cargaVentas(fil = "") {
    $("#tinfobody").html("");
    var fini = $("#feci").val();
    var ffin = $("#fecf").val();
    var ruc = $("#RucCli").val();
    var nomcli = $("#NomCli").val();
    var nomcon = $("#NomCon").val();
    var estado = $("#selestado").val();

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

    let json = {
        fini: filtroFIniFormat,
        fecf: filtroFFinFormat,
        ruc: ruc,
        nomcli: nomcli,
        nomcon: nomcon,
        estado: estado
    }

    get('/ws/DocumentosElectronicos.aspx/ListarVentasFacturacion', JSON.stringify(json))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let fila = "";
                let f = 1;
                let fechaVencimiento;
                $(res).each(function () {
                    let color = '';

                    fechaVencimiento = new Date(this.FECHAEMISION);
                    fechaVencimiento.setDate(fechaVencimiento.getDate() + parseInt(0));
                    let fechaVencimientoFormateada = formatoFecha(fechaVencimiento, 1);

                    var fechaEmision = formatoFecha(this.FECHAEMISION, 1);
                    var edo = this.STATUS;
                    var checkHTML = "";
                    switch (this.STATUS) {
                        case 1:
                            edo = "Pendiente";
                            checkHTML = '<input type="checkbox" class="case" name="case[]" value="' + f + '">';
                            //color = 'style="color:red;"';
                            color = "style = 'color:white !important; background-color:#FFC000'"
                            break;
                        case 2:
                            edo = "Cancelado";
                            checkHTML = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            //color = 'style="color:green;"';
                            color = "style = 'color:white !important; background-color:#A9D08E'"
                            break;
                        case 3:
                            edo = "Anulado";
                            checkHTML = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            break;
                        case 4:
                            edo = "ACEPTADO POR SUNAT";
                            checkHTML = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            break;
                        case 5:
                            edo = "FACTURA PENDIENTE SUNAT";
                            checkHTML = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            break;
                    }
                    let colorPDF = "d-none";

                    if (this.ENLACE.toString().length > 0) {
                        colorPDF = "text-danger";
                    }

                    fila += '<tr id="tr' + this.ID_VENTAS + '" ' + color + '>' +
                        '<td class="text-right tdp">' + this.SERIE + '</td>' +
                        '<td  class="text-right tdp">' + this.NUMERO + '</td>' +
                        '<td  style="display: none;">' + 0 + '</td>' +
                        '<td  class="text-right tdp" >' + fechaEmision + '</td>' +
                        '<td  class="text-right tdp" >' + this.FORMAPAGO + '</td>' +
                        '<td  class="text-right tdp" >' + this.NUMERO_DOCUMENTO + '</td>' +
                        '<td  class="text-right tdp" documento="' + this.NUMERO_DOCUMENTO + '" idCliente="' + this.ID_CLIENTE + '" >' + this.NOMBRE_CLIENTE + '</td>' +
                        '<td  class="text-center tdp">' + formatoMoneda(this.TOTAL, 2, true) + '</td>' +
                        '<td  class="text-center tdp">' + this.MONEDA + '</td>' +
                        '<td  class="text-right tdp" >' + fechaVencimientoFormateada + '</td>' +
                        '<td  class="text-center tdp" ' + color + '>' + edo + '</td>' +
                        '<td >' + checkHTML + '</td>' +
                        '<td class="text-center tdp">' +
                        '<a href="' + this.ENLACE.toString() + '.pdf" target="_blank" onclick=)">' +
                        '<i class="fas fa-file-pdf ' + colorPDF + '"></i>' +
                        '</a></td> ' +
                        '<td style="display:none;">' + this.SUBTOTAL + '</td>' +
                        '<td style="display:none;">' + this.IGV + '</td>' +
                        '<td style="display:none;">' + this.GRATUITA + '</td>' +
                        '<td style="display:none;">' + this.SERIE + '-' + this.NUMERO + '</td>' +
                        '</tr> ';
                });


                $("#tinfobody").html(fila);

                $("#tinfobody tr").each(function () {
                    let chkTblInfoDOM;
                    let chkIsChecked = false;

                    chkTblInfoDOM = $($(this).children()[11]).children()[0];
                    chkIsChecked = $(chkTblInfoDOM).prop('checked');

                    $(chkTblInfoDOM).on("change", function () {
                        let esteDocumento = $($($($(this).parent()).parent()[0]).children()[6]).attr("documento"); //obtenerDocumentoDesdeChkDOM(this);
                        let chkTblInfoDOM2;
                        let documentoClienteEach;

                        if ($(this).prop('checked') == true) {
                            console.log(esteDocumento);
                            //marcado
                            $("#tinfobody tr").each(function () {
                                chkTblInfoDOM2 = $($(this).children()[11]).children()[0];
                                documentoClienteEach = $($(this).children()[6]).attr("documento");

                                if (esteDocumento == documentoClienteEach) {
                                    $(chkTblInfoDOM2).show();


                                } else {
                                    $(chkTblInfoDOM2).hide();
                                }
                                if (todosMarcadosChkTblInfoDOM()) {
                                    $("#selectall").prop("checked", true);
                                }
                                $("#selectall").attr("disabled", false);

                            });
                        } else {
                            $("#selectall").prop("checked", false);
                            //desmarcado
                            if (!existeMarcadoChkTblInfoDOM()) {
                                $("#tinfobody tr").each(function () {
                                    chkTblInfoDOM = $($(this).children()[11]).children()[0];
                                    $(chkTblInfoDOM).show();
                                    $("#selectall").attr("disabled", true);
                                });
                            }
                        }
                    });
                    //function obtenerDocumentoDesdeChkDOM(chkDOM) {
                    //    let documento = '';
                    //    documento = $($($($(chkDOM).parent()).parent()[0]).children()[4]).attr("documento");
                    //    return documento;
                    //}

                });
                f++;
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function ExportarExcel() {
    let df = null;
    let hf = null;
    if ($("#feci").val() !== "") {
        var desde = $("#feci").val().split("/");
        df = new Date(desde[2], desde[1] - 1, desde[0]);
    } else {
        df = new Date('0000', '00', '00')
    }


    if ($("#fecf").val() !== "") {
        var hasta = $("#fecf").val().split("/");
        hf = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    } else {
        hf = new Date()
    }


    get('/ws/DocumentosElectronicos.aspx/ExportarExcel', JSON.stringify({ fini: df, fecf: hf }))
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

function existeMarcadoChkTblInfoDOM() {
    let existeChkMarcado = false;
    let chkTblInfoDOM;
    let chkIsChecked = false;
    $("#tinfobody tr").each(function () {
        chkTblInfoDOM = $($(this).children()[11]).children()[0];
        chkIsChecked = $(chkTblInfoDOM).prop('checked');

        if (chkIsChecked) {
            existeChkMarcado = true;
        }
    });
    return existeChkMarcado;
}

function esUnicoElChkTblInfoDOM() {
    let esUnico = false;
    let contador = 0;
    $(".case").each(function () {
        if ($(this).css("display") != "none") {
            contador++;

            if (contador == 1) {
                esUnico = true;
            } else {
                esUnico = false;
            }
        }
    });

    return esUnico;
}

function todosMarcadosChkTblInfoDOM() {
    let todosMarcados = false;
    let contadorChkDOM = 0;
    let contadorChecked = 0;
    $(".case").each(function () {
        if ($(this).css("display") != "none") {
            contadorChkDOM++;
            if ($(this).prop("checked")) {
                contadorChecked++;
            }

            if (contadorChkDOM == contadorChecked) {
                todosMarcados = true;
            } else {
                todosMarcados = false;
            }
        }
    });

    return todosMarcados;
}

function guardaRegistro() {
    let vent = new Array();

    var from1 = $("#fec").val().split("/");
    var f = new Date(from1[2], from1[1] - 1, from1[0]);
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

        det.idvent = result[0];
        det.tipoc = $("#tc").val();
        det.fechafv = f;
        det.mon = $("#mon").val();
        det.seriefv = $("#ser").val();
        det.numfv = $("#num").val();
        det.docident = $("#ruc").val();
        det.razsoc = $("#raz").val();
        det.subtotal = $("#subtotal").val();
        det.igv = $("#igv").val();
        det.tot = $("#ttal").val();
        vent.push(det);
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
            return fetch(`/ws/RegVtas.aspx/InsertarF`, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(vent) }), headers: { 'Content-Type': 'application/json' }
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
                $("#datos").hide();
                limpiaControles('datos');
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });
}

function getdata() {
    let detalle = new Array();
    let j = 1;
    var fila = "";
    let totaldeu = 0;
    let subtotal = 0;
    let igv = 0;
    var currentTime = new Date();

    var currentDate = currentTime.toLocaleDateString();
    var currentTimeString = currentDate.toString("dd/mm/yyyy");
    $("#fecp").val(currentTimeString).attr("fecha", new Date());

    // para cada checkbox "chequeado"
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

        ++j;

        totaldeu += Number(result[6]);
        subtotal += Number(result[9]);
        igv += Number(result[10]);

        $("#ruc").val(result[8]);

    });
    $("#subtotal").val(subtotal);
    $("#igv").val(igv);

    $("#total").val(totaldeu);
}

//PRUEBA API
function myfunction() {
    get('/ws/RegVtas.aspx/ListarVentasEF', JSON.stringify({ info: JSON.stringify(info) }))
}

function restablecerCampos() {
    $('#txtTipoComprobante').val('');
    $('#txtSerie').val('');
    $('#txtSunatTransaction').val('');
    $('#txtClienteTipoDocumento').val('');
    $('#txtCliente').val('');
    $('#txtClienteFiltro').val('');
    $('#txtClienteDireccion').val('');
    $('#txtMoneda').val('');
    $('#txtDescuentoGlobal').val('');
    $('#txtObservaciones').val('');
    $($($('#txtClienteFiltro').parent()[0]).parent()[0]).show();

    $('#txtCliente').prop("disabled", false);
    $('#txtMoneda').prop("disabled", false);
    $('#txtTipoComprobante').prop("disabled", false);

    $('#lblSubTotal').attr('subTotal', 0);
    $('#lblSubTotal').text("");
    $('#lblIGVTotal').attr('igvTotal', 0);
    $('#lblIGVTotal').text('');
    $('#lblDescuentoGlobal').attr('descuentoglobal', 0);
    $('#lblDescuentoGlobal').text('');
    $('#lblTotal').attr('total', 0);
    $('#lblTotal').text('');
    $('#tblProductos tbody').html("");
    $('.case').prop("checked", false);
    $('#selectall').prop("checked", false);

    $('#txtCondPago').val('');
    $('#lblMontoCredito').text('');
    $("#tblCuotas tbody").empty();

    $("#dtCuotas tbody").empty();
    $('#montoCredito').val('');

    $('#fecCuota').val('');
    $('#valCuota').val('');

    cuotaFactura = {};
    cuotasFacturaList.length = 0;
}

function cargarClientesFE() {
    get('/ws/DocumentosElectronicos.aspx/ListarClientes')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let html = '';
                let direccion = '';


                $(res).each(function () {
                    if (this.DIRCOMERCIAL == null || this.DIRCOMERCIAL == undefined) {
                        if (this.DIRFISCAL == null || this.DIRFISCAL == undefined) {
                            direccion = 'No existe informacion';
                        } else {
                            direccion = this.DIRFISCAL;
                        }
                    } else {
                        direccion = this.DIRCOMERCIAL;
                    }

                    html += '<option tipoDocumento="' + this.TIPO_DOCUMENTO + '" numeroDocumento="' + this.NUMERO_DOCUMENTO + '" direccion="' + direccion + '" value="' + this.ID_CLIENTE + '">' +
                        this.NOMBRE_CLIENTE + '</option>';
                });

                $("#txtCliente").html(html);
                $("#txtClientenc").html(html);
                cargarInputDireccion($("#txtCliente option:selected").attr("direccion"));

                //CARGAR DIRECCIONES DEL CLIENTE SELECCIONADO
                $("#txtCliente").on("change", function (index) {
                    let direccion = $("#txtCliente option:selected").attr("direccion");
                    let idTipoDocumentoCliente = $("#txtCliente option:selected").attr("tipodocumento");

                    cargarInputDireccion(direccion);
                    seleccionarTipoDocumentoCliente(idTipoDocumentoCliente);
                });
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargarTipoDocumentoFE() {
    get('/ws/DocumentosElectronicos.aspx/ListarClientesTipoDocumento')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let html = '';

                $(res).each(function () {
                    html += '<option tipoDocumento="' + this.ID_TIPODOCUMENTO + '" value="' + this.ID_CLIENTETIPODOCUMENTO + '">' +
                        this.CLIENTETIPODOCUMENTO + '</option>';
                });
                $("#txtClienteTipoDocumento").html(html);
                seleccionarTipoDocumentoCliente($($("#txtClienteTipoDocumento option")[0]).attr('tipodocumento'));
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargarIGV() {
    get('/ws/DocumentosElectronicos.aspx/ListarIGV')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let igv = 0.0;

                $(res).each(function () {
                    igv = this.PORCENTAJE_DE_IGV;
                });
                $("#lblIGV").attr("igv", igv);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargarMonedasFE() {
    get('/ws/DocumentosElectronicos.aspx/ListarMonedas')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let html = '';

                $(res).each(function () {
                    html += '<option idMonedaFE="' + this.ID_MONEDA_FE + '" value="' + this.ID_MONEDA + '">' +
                        this.MONEDA + '</option>';
                });
                $("#txtMoneda").html(html);
                $("#txtMonedanc").html(html);

            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function seleccionarTipoDocumentoCliente(idTipoDocumentoCliente) {
    $("#txtClienteTipoDocumento option").each(function () {
        let tipoDocumentoClienteSelect = $(this).attr('tipodocumento');
        $(this).attr('selected', false);

        if (idTipoDocumentoCliente == tipoDocumentoClienteSelect) {
            $(this).attr('selected', true);
        } else {
            $(this).attr('selected', false);
        }
    });
    $("#txtClienteTipoDocumento").trigger('change');
}

function seleccionarCliente(numeroDocumentoCliente) {
    $("#txtCliente option").each(function () {
        let numeroDocumentoClienteSelect = $(this).attr('numerodocumento');
        $(this).attr('selected', false);

        if (numeroDocumentoCliente == numeroDocumentoClienteSelect) {
            $(this).attr('selected', true);
            seleccionarTipoDocumentoCliente($(this).attr('tipodocumento'));
            cargarInputDireccion($(this).attr('direccion'));
        } else {
            $(this).attr('selected', false);
        }
    });
}

function cargarInputDireccion(direccion) {
    $("#txtClienteDireccion").val(direccion);
}

function cargarTiposComprobante() {
    get('/ws/DocumentosElectronicos.aspx/ListarTipoComprobante')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let html = '';

                $(res).each(function () {

                    html += '<option operacion="' + this.OPERACION + '" value="' + this.ID_TIPOCOMPROBANTE + '">' +
                        this.TIPOCOMPROBANTE + '</option>';
                });

                $("#txtTipoComprobante").html(html);
                $("#tipodocmodif").html(html);
                $("#txtTipoComprobantenc").html(html);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargarTipoNotaCredito() {
    get('/ws/DocumentosElectronicos.aspx/ListarTipoNotaCredito')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let html = '';
                html += '<option value="">--Seleccionar--</option>';

                $(res).each(function () {

                    html += '<option value="' + this.ID_NOTADECREDITOTIPO + '">' +
                        this.NOTADECREDITOTIPO + '</option>';
                });

                $("#tiponotac").html(html);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargarTipoNotaDebito() {
    get('/ws/DocumentosElectronicos.aspx/ListarTipoNotaDebito')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let html = '';

                $(res).each(function () {
                    html += '<option value="">--Seleccionar--</option>';

                    html += '<option value="' + this.ID_NOTADEDEBITOTIPO + '">' +
                        this.NOTADEDEBITOTIPO + '</option>';
                });

                $("#tiponotad").html(html);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargarSunatTransaccion() {
    get('/ws/DocumentosElectronicos.aspx/ListarSunatTransaccion')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let html = '';

                $(res).each(function () {

                    html += '<option value="' + this.ID_TIPOTRANSACCION + '">' +
                        this.TIPOTRANSACCION + '</option>';
                });

                $("#txtSunatTransaction").html(html);

                $($("#txtSunatTransaction option")[0]).attr("selected", true);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function marcarMismoClienteCheckTblInfoDOM() {
    let todosMarcados = false;
    let contadorChkDOM = 0;
    let contadorChecked = 0;
    $(".case").each(function () {
        if ($(this).css("display") != "none") {
            $(this).prop("checked", true);
        }
    });

    return todosMarcados;
}

function cargarProductosDesdeIdVenta(idVenta) {
    get('/ws/DocumentosElectronicos.aspx/TraerProductosPorIdVenta', JSON.stringify({ idVenta: idVenta }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let html = '';
                let total = 0.0;
                let igvTotal = 0.0;
                let id = 0;
                let pre = "forma";
                id = $("#tblProductos tbody tr").length;
                $(res).each(function () {

                    if (this.IVG != undefined) {
                        igvTotal = igvTotal + this.IVG;
                    }
                    total = total + parseFloat(this.TOTAL);
                    id += 1;
                    html = '<tr class="text-center" id="f' + pre + id + '">' +
                        '<td style="display:none" idVenta="' + idVenta + '">' + this.ID_PRODUCTO + '</td>' +
                        '<td>' + this.CODIGO_PRODUCTO + '</td>' +
                        '<td>' + this.PRODUCTO + '</td>' +
                        '<td>' + this.UNIDAD_MEDIDA + '</td>' +
                        '<td cantidad="' + this.CANTIDAD + '">' + this.CANTIDAD + '</td>' +
                        '<td valorUnitario="' + this.PRECIO + '">' + this.PRECIO + '</td>' +
                        '<td subTotal="' + this.SUBTOTAL + '">' + this.SUB_TOTAL + '</td>' +
                        '<td>' + this.IVG + '</td > ' +
                        '<td total="' + this.TOTAL + '">' + this.TOTAL + '</td>' +
                        '<td><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';
                    '</tr > '
                    $("#tblProductos tbody").append(html);
                    fila = $("#tblProductos tr:last");

                    $(fila).css({ "cursor": "pointer" });

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
                                $("#f" + pre + id).remove();
                                calculaTotales();
                            }
                        });

                    });
                });

                llenarResumen(total, igvTotal);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function llenarResumen(total, igvTotal) {

    total = parseFloat(total) + parseFloat($("#lblTotal").attr("total"));
    $("#lblTotal").attr("total", total);
    $("#lblSubTotal").attr("subTotal", total);
    $("#lblSubTotal").html(total);
    total = igvTotal + total;

    $("#lblDescuentoGlobal").html("0");


    $("#lblTotal").html(total);

    $("#lblIGVTotal").attr("igvTotal", igvTotal);
    $("#lblIGVTotal").html(igvTotal);

}

function seleccionarMonedaPorNombre(nombreMoneda) {
    $('#txtMoneda option').each(function myfunction() {
        if ($(this).text().toUpperCase() == nombreMoneda.toUpperCase()) {
            $('#txtMoneda').val($(this).val());
            $("#txtMoneda").trigger('change');

        }
    });
}

function aplicarDescuentoGlobal() {
    let totalSinIGV = parseFloat($("#lblTotal").attr("total"));
    let descuentoGlobal = totalSinIGV * parseFloat($('#txtDescuentoGlobal').val()) / 100;
    let nuevoTotal = 0.0;
    if (descuentoGlobal >= 0 && descuentoGlobal <= 100) {

    } else {
        descuentoGlobal = 0;
    }
    nuevoTotal = (parseFloat($("#lblTotal").attr("total")) + parseFloat($("#lblIGVTotal").attr("igvTotal")) - parseFloat(descuentoGlobal));
    nuevoTotal = nuevoTotal.toFixed(2);
    $('#lblDescuentoGlobal').text(descuentoGlobal);
    $('#lblDescuentoGlobal').attr("descuentoglobal", descuentoGlobal);
    $("#lblTotal").html(nuevoTotal);

}

function cargarCabeceraDocumentoElectronico() {

    let operacion = $('#txtTipoComprobante option:selected').attr("operacion");
    let tipo_de_comprobante = parseInt($('#txtTipoComprobante option:selected').val());
    let serie = $('#txtSerie').val().toUpperCase();
    let numero = 0;
    let sunat_transaction = $('#txtSunatTransaction option:selected').val();
    let cliente_tipo_de_documento = $('#txtClienteTipoDocumento option:selected').val();
    let cliente_numero_de_documento = $('#txtCliente option:selected').attr("numeroDocumento").toString();
    let cliente_denominacion = $('#txtCliente option:selected').text().toString();
    let cliente_direccion = $('#txtCliente option:selected').attr("direccion").toString();
    let fecha_de_emision = new Date();
    let ordencompra = $('#txtOrdenCompra').val();
    let moneda = parseInt($('#txtMoneda option:selected').attr("idMonedaFE"));
    let porcentaje_de_igv = 0.0;
    let descuento_global = parseFloat($('#lblDescuentoGlobal').attr("descuentoGlobal"));
    let total = parseFloat($('#lblTotal').text());
    let observaciones = $('#txtObservaciones').val().toUpperCase();
    let total_gravada = 0;
    let total_inafecta = $('#txtgratuita').val() == 0 ? total : "";
    let total_igv = parseFloat($('#lblIGVTotal').attr("igvtotal"));
    let total_gratuita = $('#txtgratuita').val() == 0 ? "" : total;
    let forma_pago = $('#txtCondPago').val();
    let tipo_bien = $('#txtTipoBien').val();
    let cabeceraFactura = {
        operacion: operacion,
        tipo_de_comprobante: tipo_de_comprobante,
        serie: serie,
        numero: numero,
        sunat_transaction: sunat_transaction,
        cliente_tipo_de_documento: cliente_tipo_de_documento,
        cliente_numero_de_documento: cliente_numero_de_documento,
        cliente_denominacion: cliente_denominacion,
        cliente_direccion: cliente_direccion,
        fecha_de_emision: fecha_de_emision,
        numerooc: ordencompra,
        moneda: moneda,
        porcentaje_de_igv: porcentaje_de_igv,
        descuento_global: descuento_global,
        total: total,
        observaciones: observaciones,
        total_gravada: total_gravada,
        total_inafecta: total_inafecta,
        total_igv: total_igv,
        tipo_de_nota_de_credito: 0,
        tipo_de_nota_de_debito: 0,
        idfavvent: 0,
        total_gratuita: total_gratuita,
        formapago: forma_pago,
        tipobien: tipo_bien
    }

    return cabeceraFactura;
}

function cargarDetalleDocumentoElectronico() {

    let items = new Array();


    //POR CADA LINEA EN LA TABLA SE CREA UN OBJETO ANONIMO que se agrega al arreglo items
    $('#tblProductos tbody tr').each(function () {

        let unidad_de_medida = "NIU";
        let codigo = $($(this).children()[1]).text().toString();
        let descripcion = $($(this).children()[2]).text().toString();
        let cantidad = parseFloat($($(this).children()[4]).attr("cantidad"));
        let valor_unitario = parseFloat($($(this).children()[5]).attr("valorUnitario"));
        let descuento = 0.0;
        let subtotal = valor_unitario * cantidad;
        let tipo_de_igv = $('#txtgratuita').val() == 0 ? 9 : 17;
        //let tipo_de_igv = 101;
        let igv = 0.0;
        let precio_unitario = igv != 0 ? (valor_unitario + (valor_unitario * parseFloat($('#lblIGV').attr("IGV") / 100))) : valor_unitario;
        let total = precio_unitario * cantidad;
        let anticipo_regularizacion = false;
        let idVenta = parseInt($($(this).children()[0]).attr("idVenta"));
        if (idVenta == null || isNaN(idVenta)) idVenta = 0;

        let idProducto = parseInt($($(this).children()[0]).text());

        items.push({
            unidad_de_medida: unidad_de_medida,
            codigo: codigo,
            descripcion: descripcion,
            cantidad: cantidad,
            valor_unitario: valor_unitario,
            precio_unitario: precio_unitario,
            descuento: descuento,
            subtotal: subtotal,
            tipo_de_igv: tipo_de_igv,
            igv: igv,
            total: total,
            anticipo_regularizacion: anticipo_regularizacion,
            id_ventas: idVenta,
            id_producto: idProducto
        });


    });
    return items;
}

function cargarDetallePagos() {
    let items = new Array();

    for (var i = 0; i < cuotasFacturaList.length; i++) {
        var itemcuota = cuotasFacturaList[i];
        items.push({
            cuota: itemcuota.Numero,
            fecha: convierteFechaValida(itemcuota.Fecha, '/', 1),
            monto: parseFloat(itemcuota.Monto)
        });

    }

    return items;
}

function cargaCuotaCredito(cuota) {
    let fechaCuota = $("#fecCuota");
    let valorCuota = $("#valCuota");
    if ($.isEmptyObject(cuota)) {
        fechaCuota.val("");
        valorCuota.val("")
        cuota.Numero = 0;
    }
    else {
        fechaCuota.val(cuota.Fecha);
        valorCuota.val(cuota.Monto);
    }
    $("#modalDetalleCredito").modal({ backdrop: 'static', keyboard: false });

}

function ValidarCuota() {
    let montoSubTotal = parseFloat($("#lblSubTotal").html());
    let fechaFactura = formatoFecha(new Date(), 1) //De momento con hoy
    let valorCuota = 0;
    let totalCuotas = 0;
    let sumaCuotas = 0;

    let vCuotaValor = $("#valCuota");
    let vFechaCuota = $("#fecCuota");

    if ((vCuotaValor.val().trim()) === '') {
        Alerta("No ha ingresado el valor de la cuota", "AVISO");
        return false;
    }

    if (vFechaCuota.val() === '') {
        Alerta("No ha ingresado la fecha de la cuota", "AVISO");
        return false;
    }

    if (cuotasFacturaList.length > 0) {
        for (var i = 0; i < cuotasFacturaList.length; i++) {
            let numcuota = cuotaFactura.Numero;
            let item = cuotasFacturaList[i];
            if (item.Numero != numcuota) {
                sumaCuotas = sumaCuotas + parseFloat(item.Monto);
            }
        }
    }

    valorCuota = parseFloat(vCuotaValor.val());
    totalCuotas = sumaCuotas + valorCuota;

    if (convierteFechaValida(vFechaCuota.val(), '/', 1) < convierteFechaValida(fechaFactura, '/', 1)) {
        Alerta("La fecha de la cuota es menor a la fecha de emision de la factura", "AVISO");
        return false;
    }

    if (totalCuotas > montoSubTotal) {
        Alerta("El valor de la cuota excede el saldo del subtotal, por favor verificar", "AVISO");
        return false;
    }

    return true;
}

function EliminaCuotaCredito(numcuota) {
    var indice = cuotasFacturaList.findIndex(obj => obj.Numero == numcuota);
    if (indice != null) {
        cuotasFacturaList.splice(indice, 1);
        for (var i = 0; i < cuotasFacturaList.length; i++) {
            var item = cuotasFacturaList[i];
            item.Numero = i + 1;
        }
        ActualizarCuotasCredito();
    }
}

function ActualizarCuotasCredito() {
    //Borrar las filas de la tabla
    $("#dtCuotas tbody").empty();
    //recorre las cuotas del credito y dibuja la tabla 
    if (cuotasFacturaList.length > 0) {
        for (var i = 0; i < cuotasFacturaList.length; i++) {
            let currentCuota = cuotasFacturaList[i];
            fila = '<tr id="f' + currentCuota.Numero + '">' +
                '<td class="text-center"><i id="e' + currentCuota.Numero + '" class="fa fa-edit" title="Edita Cuota"></i></td>' +
                '<td class="text-center"><i id="b' + currentCuota.Numero + '" class="fa fa-trash text-danger" title="Elimina Cuota"></i></td>' +
                '<td class="text-center">' + currentCuota.Numero + '</td>' +
                '<td class="text-center" > ' + currentCuota.Fecha + '</td > ' +
                '<td class="text-right">' + formatoMoneda(currentCuota.Monto.replace(/,/g, ''), 2, true) + '</td>' +
                '</tr>';
            $("#dtCuotas tbody").append(fila);
            $("#e" + currentCuota.Numero).on("click", function () {
                $("#modalDetalleCredito").modal({ backdrop: 'static', keyboard: false });
                var result = [];
                var indice = 0
                $(this).closest('td').siblings().each(function () {
                    // obtenemos el texto del td 
                    result[indice] = $(this).text();
                    ++indice;
                });
                cuotaFactura = {};
                cuotaFactura.Numero = result[1];
                cuotaFactura.Fecha = result[2];
                cuotaFactura.Monto = result[3];
                cargaCuotaCredito(cuotaFactura);
            });

            $("#b" + currentCuota.Numero).on("click", function () {
                Swal.fire({
                    title: 'Confirmación',
                    html: '¿Confirma que desea eliminar la cuota?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#1cc88a',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Si, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        $("#f" + currentCuota.Numero).remove();
                        EliminaCuotaCredito(currentCuota.Numero);
                    }
                });
            });

        }
    }
}

function CargarTablaCredito() {
    //Borrar las filas de la tabla
    $("#tblCuotas tbody").empty();
    //recorre las cuotas del credito y dibuja la tabla 
    if (cuotasFacturaList.length > 0) {
        for (var i = 0; i < cuotasFacturaList.length; i++) {
            let currentCuota = cuotasFacturaList[i];
            fila = '<tr id="f' + currentCuota.Numero + '">' +
                '<td class="text-center">' + currentCuota.Numero + '</td>' +
                '<td class="text-center" > ' + currentCuota.Fecha + '</td > ' +
                '<td class="text-right">' + formatoMoneda(currentCuota.Monto.replace(/,/g, ''), 2, true) + '</td>' +
                '</tr>';
            $("#tblCuotas tbody").append(fila);
        }
    }
}

function cargarProductosPackingList() {
    $("#nomp").empty();

    //get('/ws/productos.aspx/ListarTodosLosProductosCodigo')
    get('/ws/productos.aspx/ListarTodosLosProductosPorConversion', JSON.stringify({ tipoConversion: 2 }))
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
                    $("#nomp").append('<option codigo="' + this.CODIGO_PRODUCTO + '" value="' + this.ID_PRODUCTO + '">' + this.CODIGO_PRODUCTO + ' ' + this.PRODUCTO + '</option>');
                });
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
        });
}

function cargaProductos(id) {
    //$("#codp").val($("#nomp option:selected").attr("codigo"));
    $("#idp").val($("#nomp option:selected").val());
}

function cargaUnidadesMedida() {
    $("#ump").empty().append('<option value=""></option>');

    get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        if (this.um.toUpperCase() === 'CAJA') {
                            $("#ump").append('<option value="' + this.id + '">' + this.um + '</option>');
                        }
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
}

function cargaUnidadesMedidaProdConv(id) {
    if (id === null) return;
    get('/ws/productos.aspx/ConsultarConvP', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        if (this.UNIDAD_MEDIDA.toUpperCase() !== 'CAJA') {
                            $("#ump").append('<option value="' + this.ID_UNIDAD_MEDIDA + '">' + this.UNIDAD_MEDIDA + '</option>');
                        }
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
    var i = 0;
    $("#ump option").each(function () {
        if ($(this).text().toUpperCase() === "CAJA") {
            $("#ump").prop("selectedIndex", i);
        }
        i++;
    });
}

function importeProducto() {
    let ivg;
    let sub;
    let cant;
    let precio;

    ivg = $("#ivg").val();
    cant = $("#cantp").val().trim().replace(/,/g, '');
    precio = $("#prep").val().trim().replace(/,/g, '');


    if (ivg === "")
        ivg = 0;
    else
        ivg = parseFloat(ivg);

    if (cant === "")
        cant = 0;
    else
        cant = parseFloat(cant);

    if (precio === "")
        precio = 0;
    else
        precio = parseFloat(precio);

    sub = cant * precio;

    $("#subp").val(formatoMoneda(sub, 2, true));
    if (ivg > 0)
        $("#impp").val(formatoMoneda(sub * (1 + (ivg / 100)), 2, true));
    else
        $("#impp").val(formatoMoneda(sub, 2, true));

}

function calculaTotales() {
    let imp;
    let sub;
    imp = 0;
    sub = 0;

    $("#tblProductos tbody tr").each(function () {
        imp += parseFloat(this.cells[8].innerText.replace(/,/g, ''));
        sub += parseFloat(this.cells[6].innerText.replace(/,/g, ''));
    });

    $("#lblTotal").attr("total", imp);
    $("#lblSubTotal").attr("subTotal", sub);
    $("#lblSubTotal").html(sub);

    $("#lblDescuentoGlobal").html("0");


    $("#lblTotal").html(imp);

    $("#lblIGVTotal").attr("igvTotal", 0);
    $("#lblIGVTotal").html(0);


}
//Para nota de credito y debito
function cargarDocElec() {
    $("#docamodificar").empty();
    get('/ws/DocumentosElectronicos.aspx/ListarDocElec')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let html = '';
                html += '<option ser="" num="" tipo=""  value="">--Seleccionar Documento--</option>';
                $(res).each(function () {

                    html += '<option ser="' + this.SERIE_FV + '" num="' + this.NUMERO_FV + '" tipo="' + this.TIPOC + '"  documento="' + this.DOC_IDENT + '"  moneda="' + this.ID_MONEDA + '" value="' + this.ID_FACVENT + '">' +
                        this.NUMERO + '</option>';
                });

                $("#docamodificar").html(html);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargarProductosDesdeIdVentaNotas(idVenta) {
    let html = '';
    let total = 0.0;
    let igvTotal = 0.0;
    get('/ws/DocumentosElectronicos.aspx/TraerProductosPorIdVentaFac', JSON.stringify({ idVentaFac: idVenta }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {

                $("#tblProductosnc tbody").html('');
                $(res).each(function () {

                    if (this.TOTALDEIGV != undefined) {
                        igvTotal = igvTotal + this.TOTALDEIGV;
                    }
                    total = total + parseFloat(this.TOTAL);

                    html += '<tr class="text-center">' +
                        '<td style="display:none" >' + this.ID_PRODUCTO + '</td>' +
                        '<td>' + this.CODIGO_PRODUCTO + '</td>' +
                        '<td>' + this.PRODUCTO + '</td>' +
                        '<td>' + this.UNIDAD_MEDIDA + '</td>' +
                        '<td cantidad="' + this.CANTIDAD + '">' + this.CANTIDAD + '</td>' +
                        '<td valorUnitario="' + this.VALORUNITARIO + '">' + this.VALORUNITARIO + '</td>' +
                        '<td subTotal="' + this.SUBTOTAL + '">' + this.SUBTOTAL + '</td>' +
                        '<td>' +
                        this.TOTALDEIGV +
                        '</td > ' +
                        '<td total="' + this.TOTAL + '">' + this.TOTAL + '</td>' +
                        '<td></td>' +
                        '</tr > '
                });

                $("#tblProductosnc tbody").append(html);
                llenarResumenNotas(total, igvTotal);
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function llenarResumenNotas(total, igvTotal) {

    //total = parseFloat(total) + parseFloat($("#lblTotalnc").attr("total"));

    $("#lblSubTotalnc").attr("subTotal", total);
    $("#lblSubTotalnc").html(total);
    total = igvTotal + total;

    $("#lblDescuentoGlobalnc").html("0");

    $("#lblTotalnc").attr("total", total);
    $("#lblTotalnc").html(total);

    $("#lblIGVTotalnc").attr("igvTotal", igvTotal);
    $("#lblIGVTotalnc").html(igvTotal);

}

function seleccionarClienteNotas(numeroDocumentoCliente) {
    $("#txtClientenc option").each(function () {
        let numeroDocumentoClienteSelect = $(this).attr('numerodocumento');
        $(this).attr('selected', false);

        if (numeroDocumentoCliente == numeroDocumentoClienteSelect) {
            $(this).attr('selected', true);
            seleccionarTipoDocumentoClienteNotas($(this).attr('tipodocumento'));
            cargarInputDireccionNotas($(this).attr('direccion'));
        } else {
            $(this).attr('selected', false);
        }
    });
}

function seleccionarTipoDocumentoClienteNotas(idTipoDocumentoCliente) {
    $("#txtClienteTipoDocumentonc option").each(function () {
        let tipoDocumentoClienteSelect = $(this).attr('tipodocumento');
        $(this).attr('selected', false);

        if (idTipoDocumentoCliente == tipoDocumentoClienteSelect) {
            $(this).attr('selected', true);
        } else {
            $(this).attr('selected', false);
        }
    });
}

function cargarInputDireccionNotas(direccion) {
    $("#txtClienteDireccionnc").val(direccion);
}

function cargarCabeceraDocumentoElectronicoNotas() {

    let operacion = $('#txtTipoComprobantenc option:selected').attr("operacion");
    let tipo_de_comprobante = parseInt($('#txtTipoComprobantenc option:selected').val());
    let serie = $('#txtSeriec').val().toUpperCase();
    let numero = 0;
    let sunat_transaction = $('#txtSunatTransactionnc option:selected').val();
    let cliente_tipo_de_documento = $('#txtClienteTipoDocumentonc option:selected').val();
    let cliente_numero_de_documento = $('#txtCliente option:selected').attr("numeroDocumento").toString();
    let cliente_denominacion = $('#txtClientenc option:selected').text().toString();
    let cliente_direccion = $('#txtClientenc option:selected').attr("direccion").toString();
    let fecha_de_emision = new Date();
    let moneda = parseInt($('#txtMonedanc option:selected').attr("idMonedaFE"));
    //SOLUCIONAR
    let porcentaje_de_igv = 0.0;
    //SOLUCIONAR
    let descuento_global = parseFloat($('#lblDescuentoGlobalnc').attr("descuentoGlobal"));
    let total = parseFloat($('#lblTotalnc').text());
    let observaciones = $('#txtObservacionesnc').val().toUpperCase();
    //SOLUCIONAR
    let total_gravada = 0;
    let total_inafecta = total;
    let total_igv = parseFloat($('#lblIGVTotalnc').attr("igvtotal"));
    //SOLUCIONAR
    console.log(parseInt($('#tipodocmodif option:selected').val()));
    let documento_que_se_modifica_tipo = parseInt($('#tipodocmodif option:selected').val());
    let documento_que_se_modifica_serie = $('#docamodificar option:selected').attr("ser");
    let documento_que_se_modifica_numero = $('#docamodificar option:selected').attr("num");
    let tipo_de_nota_de_credito = $('#tiponotac').val() == "" ? 0 : $('#tiponotac').val();
    let tipo_de_nota_de_debito = $('#tiponotad').val() == "" ? 0 : $('#tiponotad').val();
    let idfavvent = $('#docamodificar').val();

    let cabeceraFactura = {
        operacion: operacion,
        tipo_de_comprobante: tipo_de_comprobante,
        serie: serie,
        numero: numero,
        sunat_transaction: sunat_transaction,
        cliente_tipo_de_documento: cliente_tipo_de_documento,
        cliente_numero_de_documento: cliente_numero_de_documento,
        cliente_denominacion: cliente_denominacion,
        cliente_direccion: cliente_direccion,
        fecha_de_emision: fecha_de_emision,
        moneda: moneda,
        porcentaje_de_igv: porcentaje_de_igv,
        descuento_global: descuento_global,
        total: total,
        observaciones: observaciones,
        total_gravada: total_gravada,
        total_inafecta: total_inafecta,
        total_igv: total_igv,
        documento_que_se_modifica_tipo: documento_que_se_modifica_tipo,
        documento_que_se_modifica_serie: documento_que_se_modifica_serie,
        documento_que_se_modifica_numero: documento_que_se_modifica_numero,
        tipo_de_nota_de_credito: tipo_de_nota_de_credito,
        tipo_de_nota_de_debito: tipo_de_nota_de_debito,
        idfavvent: idfavvent
    }

    return cabeceraFactura;
}

function cargarDetalleDocumentoElectronicoNotas() {

    let items = new Array();

    //POR CADA LINEA EN LA TABLA SE CREA UN OBJETO ANONIMO que se agrega al arreglo items
    $('#tblProductosnc tbody tr').each(function () {

        let unidad_de_medida = "NIU";
        let codigo = $($(this).children()[1]).text().toString();
        let descripcion = $($(this).children()[2]).text().toString();
        let cantidad = parseFloat($($(this).children()[4]).attr("cantidad"));
        let valor_unitario = parseFloat($($(this).children()[5]).attr("valorUnitario"));
        let descuento = 0.0;
        let subtotal = valor_unitario * cantidad;
        let tipo_de_igv = 9;
        let igv = 0.0;
        let precio_unitario = igv != 0 ? (valor_unitario + (valor_unitario * parseFloat($('#lblIGVnc').attr("IGV") / 100))) : valor_unitario;
        let total = precio_unitario * cantidad;
        let anticipo_regularizacion = false;
        let idProducto = parseInt($($(this).children()[0]).text());

        items.push({
            unidad_de_medida: unidad_de_medida,
            codigo: codigo,
            descripcion: descripcion,
            cantidad: cantidad,
            valor_unitario: valor_unitario,
            precio_unitario: precio_unitario,
            descuento: descuento,
            subtotal: subtotal,
            tipo_de_igv: tipo_de_igv,
            igv: igv,
            total: total,
            anticipo_regularizacion: anticipo_regularizacion,
            id_ventas: 0,
            id_producto: idProducto
        });


    });
    return items;
}

function restablecerCamposNotas() {
    $('#docamodificar').val('');
    $('#tipodocmodif').val('');
    $('#tiponotac').val('');
    $('#tiponotad').val('');

    $('#txtTipoComprobantenc').val('');
    $('#txtSeriec').val('');
    $('#txtSunatTransactionnc').val('');
    $('#txtClienteTipoDocumentonc').val('');
    $('#txtClientenc').val('');
    $('#txtClienteFiltronc').val('');
    $('#txtClienteDireccionnc').val('');
    $('#txtMonedanc').val('');
    $('#txtDescuentoGlobalnc').val('');
    $('#txtObservacionesnc').val('');
    $($($('#txtClienteFiltronc').parent()[0]).parent()[0]).show();

    $('#txtClientenc').prop("disabled", false);
    $('#txtMonedanc').prop("disabled", false);
    $('#txtTipoComprobantenc').prop("disabled", false);

    $('#lblSubTotalnc').attr('subTotal', 0);
    $('#lblSubTotalnc').text("");
    $('#lblIGVTotalnc').attr('igvTotal', 0);
    $('#lblIGVTotalnc').text('');
    $('#lblDescuentoGlobalnc').attr('descuentoglobal', 0);
    $('#lblDescuentoGlobalnc').text('');
    $('#lblTotalnc').attr('total', 0);
    $('#lblTotalnc').text('');
    $('#tblProductosnc tbody').html("");
    $('.case').prop("checked", false);
    $('#selectall').prop("checked", false);
}

function seleccionarMonedaNotas(idmon) {
    $('#txtMonedanc option').each(function myfunction() {
        if ($(this).attr("idMonedaFE") == idmon) {
            $('#txtMonedanc').val($(this).val());
        }
    });
}

function cargaDatosCredito() {
    let montoPagar = $("#lblSubTotal").html();
    $("#montoCredito").val(montoPagar);
    $("#modalDatosCredito").modal({ backdrop: 'static', keyboard: false });
}

function emitirFacturaShow() {
    $('#txtTipoComprobante').val(1);
    $('#txtSerie').val('FFF1');
    //$("#npro").hide();

    let documentoClienteTabla = '';
    let monedaTabla = '';
    let idVentaTR;
    let ventas = new Array();
    let guiaRemisionRemitente = '';
    let condPagoRemitente = '';
    let gratuita = 0;

    if (existeMarcadoChkTblInfoDOM()) {
        documentoClienteTabla = $($($($($('.case:checked')[0]).parent()[0]).parent()[0]).children()[6]).attr("documento");
        monedaTabla = $($($($($('.case:checked')[0]).parent()[0]).parent()[0]).children()[8]).text();

        seleccionarCliente(documentoClienteTabla);
        seleccionarMonedaPorNombre(monedaTabla);
        gratuita = $($($($($('.case:checked')[0]).parent()[0]).parent()[0]).children()[15]).text();

        $('.case:checked').each(function () {
            idVentaTR = $($($(this).parent()[0]).parent()[0]).attr("id");
            idVentaTR = idVentaTR.substr(2);
            ventas.push(idVentaTR);
            guiaRemisionRemitente += $($($($($(this)[0]).parent()[0]).parent()[0]).children()[0]).text() + '-' + $($($($($(this)[0]).parent()[0]).parent()[0]).children()[1]).text();
            condPagoRemitente += $($($($($(this)[0]).parent()[0]).parent()[0]).children()[4]).text()
        });
        ventas.forEach(function (idVentas) {
            cargarProductosDesdeIdVenta(idVentas);
        })
        $('#modalEmisionDocumentoElectronicos').show();
        $('#modalDocumentosVentas').hide();
        $('#encabezadoPrincipal').hide();
        $('#busqueda').hide();

        $($($('#txtClienteFiltro').parent()[0]).parent()[0]).hide();
        $('#txtCliente').prop("disabled", true);

        $('#txtMoneda').prop("disabled", true);


    } else {
        restablecerCampos();
    }
    $('#txtSerie').prop("readonly", true);
    $('#txtClienteTipoDocumento').prop("disabled", true);

    $('#txtTipoComprobante').prop("disabled", true);
    $('#txtTipoComprobante').val(1);
    $('#txtSerie').val("FFF1");
    $('#txtSunatTransaction').val(1);
    //$('#txtObservaciones').val(observacion);
    $('#txtObservaciones').val("");
    $('#txtGuia').val(guiaRemisionRemitente);
    $('#txtCondPagoVenta').val(condPagoRemitente);

    $('#txtgratuita').val(gratuita);
}

function verificaCliente() {

}

function BuscarEnable() {
    $("#guiaValor").keyup(function () {
        var rex = new RegExp($(this).val(), 'i');
        $(".buscar tr").hide();
        $(".buscar tr").filter(function () {
            return rex.test($(this).text());
        }).show();
    });
}




















$("#btExportar").on("click", function () {
    if (tipoReporte == "pdf") exportarPDFResumen();
});


function genpdfs() {
    tipoReporte = "pdf";
    $("#ModalDetParams").modal("toggle");

    $("#fi").val("")
    $("#ff").val("")
}

function genpdfres(fi, ff) {

    let json = {
        fecini: fi,
        fecfin: ff
    }

    get('/ws/DocumentosElectronicos.aspx/GenerarPDFDocElectronico', JSON.stringify(json))
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

function exportarPDFResumen() {

    const fechainicio = document.querySelector('#fi').value
    const fechafin = document.querySelector('#ff').value
    let f
    let ff

    if (fechainicio !== "" && fechafin !== "") {
        let arrayFecInicio = fechainicio.split("/");
        let arrayFecFin = fechafin.split("/");

        f = new Date(arrayFecInicio[2], arrayFecInicio[1] - 1, arrayFecInicio[0]);
        ff = new Date(arrayFecFin[2], arrayFecFin[1] - 1, arrayFecFin[0]);
    } else {
        f = new Date("0000", "00", "00");
        ff = new Date();
    }

    tipoReporte = "";
    genpdfres(f, ff)

    $("#ModalDetParams").modal("toggle")
}