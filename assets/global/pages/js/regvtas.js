    function cargaImpuestos() {
        $("#ivg").empty().append('<option value="0">0%</option>');
        get('/ws/impuestos.aspx/Consultar', JSON.stringify({ imp: 0.0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#ivg").append('<option value="' + this.imp + '">' + this.imp + '%</option>');
                        });
                    }
                    $("#limps").val(res.Info);
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de impuestos<br />" + error, "ERROR!");
            });
    }
    function cargaCondicionesPago() {
        $("#fp").empty().append('<option value=""></option>');
        get('/ws/condicionespago.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#fp").append('<option value="' + this.id + '">' + this.con + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
            });
    }
    function cargaClientes(id) {
        $("#cli").empty().append('<option value=""></option>');
        get('/ws/Clientes.aspx/ConsultarC', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#cli").append('<option value="' + this.id + '">' + this.nom + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
            });
    }
    function cargaCliente(id) {
        get('/ws/Clientes.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#cruc").val(this.numdoc);
                            $("#lincre").val(formatoMoneda(this.lincre, 2, true));

                            cargaDireccionLlegada(id);
                            cargaClienteDat($("#contac").val(), id);
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar lainformacion<br/>" + error, "ERROR");
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
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
            });
    }
    function cargaDireccionPartida() {
        get('/ws/DireccionPartida.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info.direccionList !== null) {
                        $.each(res.Info.direccionList, function () {
                            $("#dpar").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
            });
    }
    function cargaTransportista() {
        $("#tranp").empty().append('<option value=""></option>');
        get('/ws/Transportistas.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#tranp").append('<option value="' + this.id + '">' + this.nom + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
            });
    }
    function cargaUbigeos() {
        get('/ws/ubigeos.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#ubi").append('<option value="' + this.id + '">' + this.ubi + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de ubigeos<br />" + error, "ERROR!");
            });
    }
    function cargaProducto() {
        get('/ws/productos.aspx/ConsultarA', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#nomp").append('<option value="' + this.id + '">' + this.pro + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
            });
    }
    function cargaProductos(id) {
        get('/ws/productos.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#codp").val(this.copro);
                            $("#idp").val(this.id);
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
            });
    }
    function cargaProductosc(cod) {
        get('/ws/productos.aspx/ConsultarC', JSON.stringify({ cod: cod }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#nomp").val(this.id);
                            cargaUnidadesMedida();
                            cargaUnidadesMedidaProdConv(this.id);

                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
            });

    }
    function cargaUnidadesMedidaProdConv(id) {
        get('/ws/productos.aspx/ConsultarConvP', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#ump").append('<option value="' + this.ID_UNIDAD_MEDIDA + '">' + this.UNIDAD_MEDIDA  + '</option>');
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

    function cargaClienteDat(idc, idcli) {
        get('/ws/RegVtas.aspx/VentasCli', JSON.stringify({ idc: idc,idcli:idcli }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#penpag").val(formatoMoneda(this.PENDIENTE, 2, true));
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar la informacion<br/>" + error, "ERROR");
            });
        cargaClienteUltPago(idc, idcli);
    }
    function cargaClienteUltPago(idc, idcli) {
        get('/ws/cuentasporcobrar.aspx/UltPago', JSON.stringify({ idc: idc, idcli: idcli }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#ultpag").val(formatoMoneda(this.TOTAL_A_PAGAR, 2, true));
                            $("#ultdiapag").val(formatoFecha(this.FECHA_PAGO, 1)).attr("fecha", new Date());
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar la informacion<br/>" + error, "ERROR");
            });
        cargaClienteVPP(idc, idcli);
    }
    function cargaClienteVPP(idc, idcli) {
        let info = new Object();
        info.cli = idcli;
        info.contacto = idc;

        let param = new Object();

        param.where = info;

        var data = {
            class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
            columnas: [
                { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'SERIE', filtro: false },
                { leyenda: 'Numero', class: 'text-center thp', ordenable: false, columna: 'NUMERO', filtro: false },
                { leyenda: 'Cliente', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'NOMBRE_CLIENTE', filtro: false },
                { leyenda: 'Importe', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'TOTAL', filtro: false },
                { leyenda: 'Días Pend', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
                { leyenda: 'Estado', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false }
            ],
            modelo: [
                { propiedad: 'SERIE', class: 'text-center tdp' },
                { propiedad: 'NUMERO', class: 'text-center tdp' },
                { propiedad: 'NOMBRE_CLIENTE', class: 'text-center tdp' },
                {
                    propiedad: 'TOTAL', class: 'text-right tdp', formato(tr, obj, value) {
                        return formatoMoneda(value, 2, true);
                    }
                },
                {
                    propiedad: 'FECHAEMISION', style: 'white-space:nowrap', class: 'text-center tdp', formato: function (tr, obj, value) {
                        var currentTime = new Date();
                        var currentDate = currentTime.toLocaleDateString();
                        var currentTimeString = currentDate.toString("dd/mm/yyyy");
                        var fecha1 = formatoFecha(value, 1);
                        var aFecha1 = fecha1.split('/');
                        var aFecha2 = currentTimeString.split('/');
                        var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
                        var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
                        var dif = fFecha2 - fFecha1;
                        var dias = Math.floor(dif / (1000 * 60 * 60 * 24));

                        return dias;
                    }
                },
                {
                    propiedad: 'STATUS', style: 'white-space:nowrap', class: 'text-center tdp', formato: function (tr, obj, value) {
                       
                        if (value === 1)
                            return "Pendiente";
                        if (value === 2)
                            return 'Cancelado';
                    }
                }
            ],
            url: '/ws/RegVtas.aspx/ListarVPP',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'Días Pend',
            loader: "pre0",
            columna_orden: 'asc'
        };

        $("#listp").MALCO(data);
    }
    function cargaAlmacenes() {
        get('/ws/almacenes.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#alm").append('<option value="' + this.id + '">' + this.alm + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
            });
    }

    function guardaCliente() {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el cliente <b>' + $("#nomc").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let reg = new Object();
                let detalle = new Array();
                let registro = new Object();

                reg.nom = $("#nomc").val();
                reg.lincre = 0;
                reg.tipodoc = $("#td").val();
                reg.numdoc = $("#numdoc").val();
                reg.cont = $("#contcli").val();
                reg.email = $("#email").val();
                reg.tel = $("#tel").val();
                reg.cel = $("#cel").val();
                reg.ubigeo = $("#ubi").val();

                let i = 1;
                $.each($("#dirllegada tbody tr"), function () {
                    let det = new Object();
                    det.desc = this.cells[0].innerText;
                    det.pues = this.cells[1].innerText;

                    detalle.push(det);
                });

                registro.reg = reg;
                registro.det = detalle;
                get("/ws/Clientes.aspx/Insertar", JSON.stringify({ info: JSON.stringify(registro) }))
                    .then(function (res) {
                        if (res.Respuesta === 1) {
                            $('#cli option').remove();
                            $("#cli").append('<option value=""></option>');
                            var id = $("#contac").val() === "" ? 0 : $("#contac").val();
                            cargaClientes(id);
                            Alerta("El cliente se agregó correctamente");
                            limpiaControles('mcliente');
                            $("#mcliente").modal("toggle");
                        }
                        else {
                            Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                        }
                    })
                    .catch(function (res) {
                        Alerta("No fue posible insertar el cliente<br />" + res, "Error!", typIconoAlerta.error);
                    });
            }
        });
    }
    function guardaRegistro() {
        let reg = new Object();
        let detalle = new Array();
        let registro = new Object();
        var from = $("#fem").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);
        reg.ser = $("#ser").val();
        reg.num = $("#num").val();
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
        $.each($("#productos tbody tr"), function () {
            let det = new Object();
            det.idprod = this.cells[0].innerText;
            det.cod = this.cells[1].innerText;
            det.desc = this.cells[2].innerText;
            det.um = $(this.cells[3]).attr("um");
            det.cant = this.cells[4].innerText.replace(/,/g, '');
            det.idreg = this.cells[5].innerText;
            det.pre = this.cells[7].innerText.replace(/,/g, '');
            det.subtotal = this.cells[8].innerText.replace(/,/g, '');
            det.ivg = this.cells[9].innerText.replace("%", "");
            det.total = this.cells[10].innerText.replace(/,/g, '');
            det.com = this.cells[11].innerText;
            det.idalm = $(this.cells[12]).attr("almc");

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
                    $("#num").val(res.Info.reg.num);
                    $("#pdf").prop("disabled", false);
                    $("#idr").val(res.Info.reg.id);
                    $("#gua").prop("disabled", true);
                    cargaVentas(0);
                    cargaOrdenes();
                    $("#listaoc").show();
                    $("#forma").hide();
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function limpiaPantalla() {
        limpiaControles("forma");
        $("#productos tbody").empty();
        var currentTime = new Date();

        var currentDate = currentTime.toLocaleDateString();
        var currentTimeString = currentDate.toString("dd/mm/yyyy");
        $("#fem").val(currentTimeString).attr("fecha", new Date());

    }
    function getCorrelativo() {
        let reg = new Object();

        let registro = new Object();
        reg.fecemi = new Date($("#fem").attr("fecha"));
        registro.reg = reg;
        //funcion para obtener el correlativo
        get('/ws/RegVtas.aspx/obtcorrelativo', JSON.stringify({ info: JSON.stringify(registro) }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    var d = new Date();

                    $("#num").val(res.Mensaje);
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }

            })
            .catch(function (error) {
                Alerta("No fue posible cargar el correlativo<br/>" + error, "ERROR");
            });
    }
    function cargaSerie(id) {
        get('/ws/TipoComprobante.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#ser").val(this.ser);
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
            });
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
    function cargaContactos() {
        get('/ws/Contactos.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#contac").append('<option value="' + this.id + '">' + this.nom + '</option>');
                            $("#contcli").append('<option value="' + this.id + '">' + this.nom + '</option>');

                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de contactos<br />" + error, "ERROR!");
            });
    }
    function cargaDireccionLlegada(id) {
        get('/ws/Clientes.aspx/ConsultarDir', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#dlleg").append('<option value="' + this.id + '">' + this.desc + '</option>');

                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de direcciones<br />" + error, "ERROR!");
            });
    }

    function cargaOrdenes(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
            columnas: [
                { leyenda: '# Importacion/ Compra L.', class: 'text-center thp', ordenable: false, columna: 'NUMERO', filtro: true },
                { leyenda: 'Producto', class: 'text-center thp', ordenable: false, columna: 'DESCRIPCION', filtro: true },
                { leyenda: 'Cantidad', class: 'text-center thp', ordenable: false, columna: 'CANTIDAD', filtro: true },
                //{ leyenda: 'Precio Venta', class: 'text-center thp',  ordenable: false, columna: '', filtro: true },
                { leyenda: 'Stock Actual', class: 'text-center thp', ordenable: false, columna: 'STOCK', filtro: true },
                { leyenda: 'Días en Stock', class: 'text-center thp', ordenable: false, columna: 'DIASSTOCK', filtro: true },
            ],
            modelo: [
                { propiedad: 'NUMERO', class: 'text-center tdp' },
                { propiedad: 'DESCRIPCION', class: 'text-center tdp' },
                { propiedad: 'CANTIDAD', class: 'text-center px-3 tdp' },
               // { propiedad: '' },
                { propiedad: 'STOCK', class: 'text-center tdp' },
                { propiedad: 'DIASSTOCK', class: 'text-center tdp' }
                
            ],
            url: '/ws/registros.aspx/listarVtasP',
            parametros: JSON.stringify(param),
            paginable: false,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'id',
            loader: "pre0",
            columna_orden: 'ASC'
        };

        $("#infov").MALCO(data);
    }
    function cargaVentas(id,fecha) {
        $("#infoven tbody").empty();
        get('/ws/RegVtas.aspx/Listar', JSON.stringify({ id: id,tipo:"GR" }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        let fila = "";

                        fila = '<tr>' +
                            '<td class="tdp">' + this.ser + '-' + this.num + '</td>' +
                            '<td class="tdp">' + this.tot + '</td>' +

                            '</tr>';


                        $("#infoven tbody").append(fila);

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
    function guardaDireccionPartida() {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar la dirección de partida <b>' + $("#descdp").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let dp = new Object();

                dp.desc = $("#descdp").val();

                get("/ws/DireccionPartida.aspx/Insertar", JSON.stringify({ info: JSON.stringify(dp) }))
                    .then(function (res) {
                        if (res.Respuesta === 1) {
                            $('#dpar option').remove();
                            $("#dpar").append('<option value=""></option>');

                            cargaDireccionPartida();
                            Alerta("La Dirección de Partida se agregó correctamente");
                            limpiaControles('mdirpar');
                            $("#mdirpar").modal("toggle");
                        }
                        else {
                            Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                        }
                    })
                    .catch(function (res) {
                        Alerta("No fue posible insertar la dirección de partida<br />" + res, "Error!", typIconoAlerta.error);
                    });
            }
        });
    }
    function cargaImportaciones(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
            columnas: [
                { leyenda: ' Importacion', class: 'text-center ', style:'display: none', ordenable: false, columna: 'ID_REGISTRO', filtro: true },
                { leyenda: '#', class: 'text-center', ordenable: false, columna: 'NUMERO', filtro: true },
                { leyenda: 'Producto', class: 'text-center', ordenable: false, columna: 'DESCRIPCION', filtro: true },
                { leyenda: 'Stock', class: 'text-center', ordenable: false, columna: 'STOCK', filtro: true },
                { leyenda: '', class: 'text-center', style: 'color:#fff; width:75px"', ordenable: false, filtro: false, columna: '' }
            ],
            modelo: [

                { propiedad: 'ID_REGISTRO', class: 'text-center', style: 'display: none' },
                { propiedad: 'NUMERO', class: 'text-center' },
                { propiedad: 'DESCRIPCION', class: 'text-center' },
                { propiedad: 'STOCK', class: 'text-center' },
                {
                    propiedad: '', class: 'text-center', formato(tr, obj) {
                        container = document.createElement("div");
                        selecciona = document.createElement("i");

                        $(selecciona).addClass("fa fa-check").prop("title", "Seleccionar").on("click", function () {
                            SeleccionaRegistro(obj.ID_REGISTRO,obj.NUMERO);
                        });
                        container.appendChild(selecciona);

                        return container;
                    }
                }
             
            ],
            url: '/ws/registros.aspx/listarImpV',
            parametros: JSON.stringify(param),
            paginable: false,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'ID_REGISTRO',
            loader: "pre0",
            columna_orden: 'ASC'
        };

        $("#infoimp").MALCO(data);
    }
    function SeleccionaRegistro(id,num) {
        $("#imp").val(num);
        $("#idimp").val(id);

        $("#mimportacion").modal("toggle");

    }
    function setdate() {
        var currentTime = new Date();

        var currentDate = currentTime.toLocaleDateString();
        var currentTimeString = currentDate.toString("dd/mm/yyyy");
        // Update the time display
        document.getElementById("fecpg").firstChild.nodeValue = currentTimeString;

    }
    function GeneraPDF(idc, idcli) {
        get('/ws/RegVtas.aspx/GeneraPdfRV', JSON.stringify({ idc: idc, idcli: idcli }))
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
    function exportarRV() {
        var idc = $("#contac").val();
        var idcli = $('#cli').val();
        get('/ws/RegVtas.aspx/ExportarExcel', JSON.stringify({ idc: idc, idcli: idcli }))
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
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        });
}
//funciones para el registro de pagos
function cargaCXC2(fil = "") {
    $("#tinfobody").html("");
    let info = new Object();

    info = fil;

    get('/ws/cuentasporcobrar.aspx/ListarCXCo', JSON.stringify({ info: JSON.stringify(info) }))
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
                    var currentTime = new Date();
                    var currentDate = currentTime.toLocaleDateString();
                    var currentTimeString = currentDate.toString("dd/mm/yyyy");
                    var fecha1 = formatoFecha(this.FECHAEMISION, 1);
                    var aFecha1 = fecha1.split('/');
                    var aFecha2 = currentTimeString.split('/');
                    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
                    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
                    var dif = fFecha2 - fFecha1;
                    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));

                    var mod = "GUIA DE REMISION";

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
                        '<td data-camp="" class="text-right tdp">' + this.CONDICION_PAGO + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + fecha1 + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + this.NOMBRE_CLIENTE + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + this.NOMBRE + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + dias + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + this.TOTAL + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + edo + '</td>' +
                        '<td data-camp="">' + td + '</td>' +
                        '<td style="display:none;">' + this.ID_CLIENTE + '</td>' +
                        '<td style="display:none;">' + this.ID_VENDEDOR + '</td>' +
                        '<td style="display:none;">' + this.MONTOPAGADO + '</td>' +
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
function cargaCondicionesPagoRP(cid) {
    $("#cp" + cid).append('<option value="0">Seleccionar</option>');
    $("#cp" + cid).append('<option value="1">Contado</option>');
    $("#cp" + cid).append('<option value="2">Deposito</option>');
    $("#cp" + cid).append('<option value="3">Transferencia</option>');
}
function cargaBanco(id) {
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
function cargaClienteRP(id) {
    get('/ws/Clientes.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#lincred").val(this.lincre);
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar lainformacion<br/>" + error, "ERROR");
        });
}
function cargaClientesRP(id) {
    $("#exp").empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarC', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#exp").append('<option value="' + this.id + '">' + this.nom + '</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });
}
function guardaRegistroRP() {
    let detalle = new Array();
    let vent = new Array();
    let cli = new Object();

    let i = 1;
    var from1 = $("#fecp").val().split("/");
    var f = new Date(from1[2], from1[1] - 1, from1[0]);

    $.each($("#datosregpag tbody tr"), function () {
        let det = new Object();
        let v = new Object();
        //var f = new Date($(this).find('input[type="date"]').val());
        var from = this.cells[3].innerText.split("/");
        var f2 = new Date(from[2], from[1] - 1, from[0]);

        det.ord = i;
        det.idv = this.cells[0].innerText;
        det.ser = this.cells[1].innerText;
        det.num = this.cells[2].innerText;
        det.fecemi = f2;
        det.tot = this.cells[5].innerText;
        det.cond = $(this).find('select.mod').val();
        det.idbanc = $(this).find('select.banco').val();
        det.nooper = $(this).find('input.noop').val();
        det.fepago = f;
        det.obs = $(this).find('input.ob').val();
        det.idexp = $("#exp").val();
        det.lincre = $("#lincred").val();
        det.totaldeu = $("#totdeuda").val();
        det.montoapag = $(this).find('input.montoap').val();
        det.diasp = this.cells[4].innerText;
        det.totalapag = $("#totapagar").val();
        detalle.push(det);

        v.id = this.cells[0].innerText;
        let tp = parseFloat($(this).find('input.montoap').val().trim().replace(/,/g, ''));
        let ta = parseFloat(this.cells[5].innerText.trim().replace(/,/g, ''));
        if (tp < ta) {
            v.status = 1;
        } else {
            v.status = 2;
        }
        v.montpag = parseFloat(this.cells[11].innerText) + parseFloat($(this).find('input.montoap').val());
        vent.push(v);
    });

    cli.id = $("#idcli").val();
    cli.lincre = parseFloat($("#lincred").val().trim().replace(/,/g, '')) - parseFloat($("#totapagar").val().trim().replace(/,/g, ''));

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
            return fetch(`/ws/cuentasporcobrar.aspx/Insertar`, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(detalle), infocli: JSON.stringify(cli), infov: JSON.stringify(vent) }), headers: { 'Content-Type': 'application/json' }
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
                $("#mregpagos").modal("toggle");
                cargaCXC2();
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

        var cp = "cp" + j;
        var selBanco = "selBanco" + j;
        var bfec = "bfec" + j;
        var imp = result[8] - result[12];
        fila += '<tr id="tr' + this.ID_VENTAS + '"><td style="display:none;" data-camp="id">' + result[0] + '</td>' +
            '<td data-camp="" class="text-center tdp">' + result[1] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[2] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[4] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[7] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + imp + '</td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 montoap"></td>' +
            '<td data-camp="" class="text-right tdp" ><select class="form-control mod" id="' + cp + '" ><option value="0">Seleccionar</option><option value="1">Contado</option><option value="2">Deposito</option><option value="3">Transferencia</option></select></td>' +
            '<td data-camp="" class="text-right tdp" ><select class="form-control banco" id="' + selBanco + '"></td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 noop"></td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ob"></td>' +
            '<td data-camp="" class="text-right tdp" style="display:none;">' + result[12] + '</td>' +
            '</tr> ';

        cargaBanco(j);
        //cargaCondicionesPago(j);

        ++j;

        totaldeu = Number(totaldeu) + Number(result[8]);
        $("#exp").val(result[10]);
        $("#idcli").val(result[10]);
        cargaClienteRP(result[10]);
    });
    $("#tinforpbody").html(fila);

    $("#totdeuda").val(totaldeu);
}
function calculaTotales() {
    let imp;
    $("#totall").val("0.00");

    imp = 0;

    $("#productos tbody tr").each(function () {
        imp += parseFloat(this.cells[10].innerText.replace(/,/g, ''));
    });

    $("#totall").val(formatoMoneda(imp, 2, true));
    var penpag = $("#penpag").val();
    var saldo = Number(imp) - Number(penpag.replace(",", ""));
    $("#sallincre").val(formatoMoneda(saldo, 2, true));
}


    $(document).ready(function () {
        setdate();
        cargaOrdenes();
        cargaVentas(0, $("#fecpg").val());
        cargaCondicionesPago();
        cargaVendedores();
        cargaTransportista();
        cargaUbigeos();
        cargaProducto();
        cargaContactos();
        cargaImportaciones();
        cargaImpuestos();
        cargaAlmacenes();
        cargaPuntosEntraga();
        $("#accordionSidebar").addClass("toggled");        

        $('#fem').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date()});
        $('.fecha').each(function () {
            $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy"});
        });

        $(".gj-icon").each(function () {
            if ($(this).parent().parent().parent()[0].id === "busqueda") {
                $(this).css({ "margin-left": "-2px", "margin-top": "-5px" }).parent().height("17px").css({ "margin-left": "-7px", "margin-right": "10px" }).hide();
            }
            else {
                $(this).css({ "margin-top": "0" });
            }
        });
        $("#nue").on("click", function () {
            limpiaPantalla();
            getCorrelativo();
            cargaSerie(6);
            cargaDireccionPartida();

            $("#listaoc").hide();
            $("#forma").show();
            $("#gua").prop("disabled", false);
            var i = 0;
            $("#fp option").each(function () {
                if ($(this).text().toUpperCase().trim() === "7 DÍAS") {
                    $("#fp").prop("selectedIndex", i);
                }
                i++;
            });
        });
        $("#gua").on("click", function () {
            if (valForm('forma')) {
                if ($("#productos tbody tr").length > 0) {
                    guardaRegistro();
                }
                else {
                    Alerta("Debe especificar al menos un producto", "AVISO!");
                }
            }
        });
        $("#bimp").on("click", function () {
            $("#mimportacion").modal({ backdrop: 'static', keyboard: false });
        });
        $("#bcod").on("click", function () {
            cargaProductosc($("#codp").val());
            
        });
        $("#ncli").on("click", function () {
            $("#mcliente").modal({ backdrop: 'static', keyboard: false });
            limpiaControles('mcliente');
        });
        $("#ndp").on("click", function () {
            $("#mdirpar").modal({ backdrop: 'static', keyboard: false });
            limpiaControles('mdirpar');
        });
        $("#ndirlleg").on("click", function () {
            $("#mdirlleg").modal({ backdrop: 'static', keyboard: false });
            limpiaControles('mdirlleg');
        });
        $("#guacli").on("click", function () {
            if (valForm("mcliente")) {
                guardaCliente();
            }
        });
        $("#can").on("click", function () {
            $("#listaoc").show();
            $("#forma").hide();
        });
        $("#cancli").on("click", function () {
            $("#mcliente").modal("toggle");
        });
        $("#candlleg").on("click", function () {
            $("#mdirlleg").modal("toggle");
        });
        $("#guadp").on("click", function () {
            if (valForm("mdirpar")) {
                guardaDireccionPartida();
            }
        });
        $("#candp").on("click", function () {
            $("#mdirpar").modal("toggle");
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
        });
        $("#agrp").on("click", function () {
            if (valForm("prods")) {
                let id;
                let pre;
                let fila;


                id = $("#productos tbody tr").length;
                pre = "info";
                

                fila = '<tr id="f' + pre + id + '">' + '<td class="text-right" style="display: none">' + $("#idp").val() + '</td>' +
                    '<td class="text-right">' + $("#codp").val() + '</td>' +
                    '<td id="n' + pre + id + '">' + $('#nomp option:selected').text().trim() + '</td>' +
                    '<td class="text-center" um="' + $("#ump").val() + '">' + $("#ump option:selected").text() + '</td>' +
                    '<td class="text-right">' + formatoMoneda($("#cantp").val().replace(/,/g, ''), 2, true) + '</td>' +
                    '<td class="text-right" style="display: none">' + $("#idimp").val() + '</td>' +
                    '<td class="text-right">' + $("#imp").val() + '</td>' +
                    '<td class="text-right">' + formatoMoneda($("#prep").val().replace(/,/g, ''), 2, true) + '</td>' +
                    '<td class="text-right">' + $("#subp").val() + '</td>' +
                    '<td class="text-right">' + $("#ivg option:selected").text() + '</td>' +
                    '<td class="text-right">' + $("#impp").val() + '</td>' +
                    '<td class="text-right">' + $("#coment").val() + '</td>' +
                    '<td class="text-center" almc="' + $("#alm").val() + '">' + $("#alm option:selected").text() + '</td>' +
                    '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

                    $("#productos tbody").append(fila);
                    fila = $("#productos tr:last");

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
                        }
                    });
                });


                $("#prods").modal("toggle");

                $("#ump").val("");
                $("#cantp").val("");
                $("#prep").val("");
                $("#subp").val("");
                $("#impp").val("");
                $("#coment").val("");
                $("#codp").val("");
                calculaTotales();

            }
        });
        $("#agrdirlleg").on("click", function () {
            if (valForm("mdirlleg")) {
                let id;
                let pre;
                let fila;


                id = $("#dirllegada tbody tr").length;
                pre = "info";


                fila = '<tr id="f' + pre + id + '">' + 
                    '<td class="text-right">' + $("#descdlleg").val() + '</td>' +
                    '<td class="text-right">' + $("#puestodlleg").val() + '</td>' +

                    '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

                $("#dirllegada tbody").append(fila);
                fila = $("#dirllegada tr:last");

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
                        }
                    });
                });



                $("#descdlleg").val("");
                $("#puestodlleg").val("");

            }
        });
        $("#prep").on("change", function () {
            importeProducto();
        });
        $("#cantp").on("change", function () {
            importeProducto();
        });
        $("#prep").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#cantp").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $('#nomp').change(function () {
            cargaProductos($('#nomp').val());
            cargaUnidadesMedida();
            cargaUnidadesMedidaProdConv($('#nomp').val());
            
        });
        $('#cli').change(function () {
            cargaCliente($('#cli').val());
        });
       
        $('#contac').change(function () {
            cargaClientes($("#contac").val());
        });
        $('#ivg').change(function () {
            importeProducto();
        });
        $("#reppdf").on("click", function () {
            GeneraPDF($("#contac").val(), $('#cli').val());
        });

        //rEGISTRO DE PAGO
        $('#bfecd').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        $('#bfeca').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        $('#fecp').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date() });

        $("#regpag").on("click", function () {
            cargaCXC2();
            cargaClientesRP(0);
            $("#ModalRegPago").modal({ backdrop: 'static', keyboard: false });
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

        $("#opc").on("change", function () {
            $("#bfecd").hide();
            $("#bfeca").hide();
            $("#bval").hide();
            $(".gj-icon").parent().hide();

            if ($(this).val() === "4") {
                $("#bfecd").show();
                $("#bfeca").show();

                $(".gj-icon").parent().show();
            }
            else if ($(this).val() === "5") {
                $("#bedo").show();
            } else if ($(this).val() === "1") {
                $("#bval").show();
            } else if ($(this).val() === "2") {
                $("#bval").show();
            } else if ($(this).val() === "3") {
                $("#bval").show();
            }
            else if ($(this).val() === "0") {
                $("#bfecd").hide();
                $("#bfeca").hide();
                $("#bval").hide();
                $(".gj-icon").parent().hide();

            }
        });
        $("#bus").on("click", function () {
            let param = new Object();

            if ($("#opc").val() === "") {
                cargaCXC2();
            }
            else {
                if ($("#opc").val() === "4") {
                    if ($("#bfecd").val() !== "" && $("#bfeca").val() !== "") {

                        param.feci = $("#bfecd").datepicker().fecha();
                        param.fecf = $("#bfeca").datepicker().fecha();

                    }
                    else {
                        Alerta("Debe especificar una fecha", "AVISO!");
                    }
                }
                else if ($("#opc").val() !== "") {
                    //param.num = $("#bval").val().trim();

                    if ($("#opc").val() === "1")
                        param.nom = $("#bval").val().trim();

                    if ($("#opc").val() === "2")
                        param.cont = $("#bval").val().trim();

                    if ($("#opc").val() === "3")
                        param.ruc = $("#bval").val().trim();
                }

                cargaCXC2(param);
            }
        });
        $("#regpago").on("click", function () {
            $("#mregpagos").modal({ backdrop: 'static', keyboard: false });

            getdata();
        });
        $("#canprp").on("click", function () {
            $("#mregpagos").modal("toggle");
        });
        $("#agrprp").on("click", function () {
            guardaRegistroRP();

        });
        //Evento para  calcular el monto total a pagar
        $("#tinforpbody").on('input', '.montoap', function () {
            var monto = 0;
            //suma los importes de cada concepto
            $("#tinforpbody .montoap").each(function () {
                monto += Number($(this).val());
            });
            $("#totapagar").val(monto);
        });

        //evento cuando cambia el metodo de pago
        $("#tinforpbody").on('input', '.mod', function () {
            $trBanco = $(this).parent().next().children();
            $trNoOper = $(this).parent().next().next().children();
            //si el metodo de pago es Deposito o Transefencia
            if ($(this).find('option:selected').text() === "Deposito" || $(this).find('option:selected').text() === "Transferencia") {
                $trBanco.prop("disabled", false);
                $trNoOper.prop("readonly", false);

            } else {
                $trBanco.prop("selectedIndex", 0);
                $trBanco.prop("disabled", true);
                $trNoOper.prop("readonly", true);
            }
        });

    });

