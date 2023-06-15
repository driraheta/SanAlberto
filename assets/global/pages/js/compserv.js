(function ($) {
    function cargaUbigeos() {
        get('/ws/ubigeos.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#ubi").append('<option value="' + this.id + '">' + this.ubi + '</option>');
                            $("#ubip").append('<option value="' + this.id + '">' + this.ubi + '</option>');
                            $("#ubiv").append('<option value="' + this.id + '">' + this.ubi + '</option>');
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
    function cargaTipocomprobantes() {
        get('/ws/TipoComprobante.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            let opciones = [
                                'FACTURA',
                                'BOLETA',
                                'OTRO DOCUMENTO',
                                'RECIBO DE HONORARIO',
                                'RH',
                                'NOTA DE CREDITO',
                                'ND',
                                'BL',
                                'CN',
                                'NOTA DEBITO',
                            ]
                            if (opciones.indexOf(this.desc.toUpperCase()) !== -1) {
                                $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                                $("#tcv").append('<option value="' + this.id + '">' + this.desc + '</option>');
                            }

                        //    if (this.desc.toUpperCase() === "FACTURA") {
                        //        $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //    } else if (this.desc.toUpperCase() === "BOLETA") {
                        //        $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //    } else if (this.desc.toUpperCase() === "OTRO DOCUMENTO") {
                        //        $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //    } else if (this.desc.toUpperCase() === "RECIBO DE HONORARIO") {
                        //        $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //    } else if (this.desc.toUpperCase() === "RH") {
                        //        $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //    } else if (this.desc.toUpperCase() === "NOTA DE CREDITO") {
                        //        $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //    } else if (this.desc.toUpperCase() === "ND") {
                        //        $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //    } else if (this.desc.toUpperCase() === "BL") {
                        //        $("#tc").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //    }
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
    function cargaTipocomprobante(id) {
        if (id == "") id = 0;
        get('/ws/TipoComprobante.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            if ($("#tc option:selected").text().toUpperCase() !== "FACTURA" && $("#tc option:selected").text().toUpperCase() !== "BOLETA") {

                                $("#ser").val(this.ser);
                                $("#num").val(this.corr);
                            }
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el tipo de comprobantes<br />" + error, "ERROR!");
            });
    }
    function nuevaCompra(id) {
        $("#dtitle").hide();
        $("#lista").hide();
        $("#info").show();
        cargaClientes();
        $("#idc").val(id);
        $("#ventas tbody").empty();
        $("#productos tbody").empty();
        limpiaControles('info');

        var currentdate = new Date();
        // $("#fec").val(formatoFecha(new Date(), 1)).attr("fecha", new Date());
        $("#accordionSidebar").addClass("toggled");
    }
    function calculaTotales() {
        let imp;
        let ivgt;
        let desc;
        let mon;
        let gra;
        $("#gram").text("0.00");
        $("#ivgm").text("0.00");
        $("#desm").text("0.00");
        $("#tot").text("0.00");
        if ($("#mon").val() !== "") {
            //if ($("#mon").val() === "1")
            //    mon = "USD ";
            //else
            //    mon = "S/. ";

            if ($("#gra").val() !== "")
                gra = parseFloat($("#gra").val());
            else
                gra = 0;

            ivgt = 0;
            desc = $("#des").val().trim() === "" ? 0 : parseFloat($("#des").val());

            imp = 0;

            $("#productos tbody tr").each(function () {
                ivg = parseFloat(this.cells[7].innerText.replace(/,/g, '')) / 100;
                imp += parseFloat(this.cells[8].innerText.replace(/,/g, ''));
                ivgt += parseFloat(this.cells[6].innerText.replace(/,/g, '') * (ivg));
            });


            $("#ivgm").text(formatoMoneda(ivgt, 2, true));
            $("#gram").text(formatoMoneda(gra, 2, true));
            $("#desm").text(formatoMoneda((imp + gra) * (desc / 100), 2, true));
            $("#tot").text(formatoMoneda((imp + gra) - ((imp + gra) * (desc / 100)), 2, true));
            /*agregado monto asignado*/
            let asig = 0;
            let total = 0;

            $("#StableImp tbody tr").each(function () {
                asig = parseInt(this.cells[3].innerText);

                total = (((imp + gra) - ((imp + gra) * (desc / 100))) / 100) * asig;
                if (total == NaN) {
                    this.cells[4].innerText = formatoMoneda(0, 2, true);
                } else {
                    this.cells[4].innerText = formatoMoneda(total, 2, true);
                }

            });
        }
    }
    function cargaImpuestos() {
        $("#ivg").empty().append('<option value="0">0%</option>');
        $("#ivge").empty().append('<option value="0">0%</option>');
        get('/ws/impuestos.aspx/Consultar', JSON.stringify({ imp: 0.0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#ivg").append('<option value="' + this.imp + '">' + this.imp + '%</option>');
                            $("#ivge").append('<option value="' + this.imp + '">' + this.imp + '%</option>');
                            $("#ivgv").append('<option value="' + this.imp + '">' + this.imp + '%</option>');
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
    function cargaAlmacenes() {
        ddAlmacen = "#alm";
        ddAlmacene = "#almv";
        cargaAlmacenesXUsuario();
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
    function cargaUnidadesMedida() {
        $("#um").empty().append('<option value=""></option>');
        $("#ump").empty().append('<option value=""></option>');
        $("#umpe").empty().append('<option value=""></option>');
        $("#umv").empty().append('<option value=""></option>');
        get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            if (this.id === 9) {
                                $("#ump").append('<option value="' + this.id + '">' + this.um + '</option>');
                            }
                            $("#umpe").append('<option value="' + this.id + '">' + this.um + '</option>');
                            $("#um").append('<option value="' + this.id + '">' + this.um + '</option>');

                            $("#umv").append('<option value="' + this.id + '">' + this.um + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            });
    }
    function cargaOrdenes(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-hover table-responsive',
            columnas: [
                { leyenda: 'Año', class: 'text-center thp', ordenable: false, columna: 'FECHACS', filtro: true },
                /*{ leyenda: 'Tipo de Oper.', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'TIPOCS', filtro: true },*/
                { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'SerieCS', filtro: true },
                { leyenda: 'Nro. Documento', class: 'text-center thp', ordenable: false, columna: 'NUMEROCS', filtro: true },
                { leyenda: 'Proveedor', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Fecha', class: 'text-center thp', ordenable: false, columna: 'FECHACS', filtro: true },
                { leyenda: 'Monto', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Moneda', class: 'text-center thp', ordenable: false, columna: 'MONEDA1', filtro: true },
                { leyenda: 'Estado', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: '', class: 'text-center thp', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
            ],
            modelo: [
                {
                    propiedad: 'FECHACS', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        tr[0].style.cursor = 'pointer';
                        return new Date(valor).getFullYear();
                    }
                },
                /*{
                    propiedad: 'TIPOCS', class: 'text-center px-2 tdp', style: "white-space:nowrap", formato: function (tr, obj, valor) {
                        return "Compra Local";
                    }
                },*/
                { propiedad: 'SERIECS', class: 'text-center tdp' },
                { propiedad: 'NUMEROCS', class: 'text-center tdp' },
                {
                    propiedad: '', class: 'tdp', style: 'white-space:nowrap', formato: function (tr, obj) {
                        return obj.RAZON_SOCIAL;
                    }
                },
                {
                    propiedad: 'FECHACS', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        tr[0].style.cursor = 'pointer';
                        return new Date(valor).toLocaleDateString();
                    }
                },
                { propiedad: '', style: ';display:none', class: 'tdp' },
                {
                    propiedad: 'TOTALCS', class: 'text-right tdp', style: 'vertical-align:middle', formato(tr, obj, value) {
                        return formatoMoneda(value, 2, true);
                    }
                },
                { propiedad: 'MONEDA', class: 'text-center tdp' },
                {
                    propiedad: 'STATUSCS', style: 'white-space:nowrap; vertical-algn:middle', class: 'text-center tdp', formato: function (tr, obj, value) {
                        if (value === 1)
                            return "Nuevo";
                        if (value === 2)
                            return 'Anulado';
                        if (value === 3)
                            return 'Facturado';
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");
                        consulta = document.createElement("i");
                        $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                            editaRegistro(obj.ID_COMPRASERVICIO);
                        });
                        $(consulta).addClass("fa fa-search").prop("title", "Editar").on("click", function () {
                            cargaTipocomprobantes(1);
                             cargaImp("%");
                             consultaRegistro(obj.ID_COMPRASERVICIO);
                        });
                        if (obj.STATUSCS === 1)
                            container.appendChild(edita);
                        else
                            container.appendChild(consulta);
                        return container;
                    }
                }
            ],
            url: '/ws/ComprasServ.aspx/Listar',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'id',
            loader: "pre0",
            columna_orden: 'ASC'
        };

        $("#ordenes").MALCO(data);
    }
    function validaestado(opc) {
        Swal.fire({
            title: 'La compra esta Pendiente o Cancelada?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Pendiente',
            denyButtonText: 'Cancelado',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                guardaComprobante(opc, 1);
            } else if (result.isDenied) {
                let importe2 = 0;
                let importeAsignado = 0;
                let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",", "");
                $("#StableImp tbody").children("tr").each(function () {
                    let asig = $($(this).children("td")[3]).text();
                    let monto = $($(this).children("td")[4]).text().replace("USD", "").replace("S/.", "").replace(",", "");
                    importe2 += Number(asig);
                    importeAsignado += Number(monto);
                    console.log("aa" + asig);
                });
                if (importe2 < 100) {
                    Alerta("Las importaciones seleccionadas deben cumplir con el 100% de asignación." + "</br><strong>Monto total asignado:</strong> " +
                        formatoMoneda(parseFloat(importeAsignado), 2, true) + "</br> <strong>Monto Pendiente: </strong>" + formatoMoneda(parseFloat(t) - importeAsignado, 2, true), "AVISO!");

                } else {

                    guardaComprobante(opc, 3);
                }
            }
        });
    }
    function guardaComprobante(opc, edo) {
        let doc;
        let com = new Object();
        let compra = new Object();
        let detalle = new Array();
        let proveedor = new Object();
        let ventas = new Array();
        /*agregado para detalle registros compras*/
        let detalleRegistro = new Array();
        var from = $("#fec").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);
        // var tipo = $('input:radio[name=tipo]:checked').val();
        var from2 = $("#fecvig").val().split("/");
        var f2 = new Date(from2[2], from2[1] - 1, from2[0]);

        compra.tipcs = opc;
        compra.sercs = $("#ser").val().trim();
        compra.numcs = $("#num").val().trim();
        compra.feccs = f;
        compra.moncs = $("#mon").val();
        compra.doccs = $("#raz option:selected").attr("tipoDoc");
        compra.idpcs = $("#raz option:selected").attr("idProveedor");
        compra.dircs = $("#dir").val().trim();
        compra.iducs = $("#ubi").val();
        compra.dess = $("#des").val().trim() === "" ? 0 : $("#des").val().trim();
        compra.idacs = $("#alm").val();
        compra.obscs = $("#obs").val().trim();
        compra.gracs = $("#gra").val() === "" ? 0 : $("#gra").val();
        compra.gramcs = $("#gram").text().replace("USD", "").replace("S/.", "");
        compra.ivgcs = $("#ivgm").text().replace("USD", "").replace("S/.", "");
        compra.desmcs = $("#desm").text().replace("USD", "").replace("S/.", "");
        compra.totcs = $("#tot").text().replace("USD", "").replace("S/.", "");
        compra.idccs = 0;

        console.log($("#tcimp").val());
        compra.tcimp = $("#tcimp").val() === null ? 0 : $("#tcimp").val() === "" ? 0 : $("#tcimp").val();
        compra.tctrans = $("#tctrans").val() === null ? 0 : $("#tctrans").val() === "" ? 0 : $("#tctrans").val();
        compra.tcpent = $("#tcptoe").val() === null ? 0 : $("#tcptoe").val() === "" ? 0 : $("#tcptoe").val();
        compra.tcalm = $("#tcalm").val() === null ? 0 : $("#tcalm").val() === "" ? 0 : $("#tcalm").val();



        compra.statuscs = edo;
        compra.fecvigcs = f2;

        compra.tipidoc = $("#timp").val() === "" ? null : $("#timp").val() === null ? null : $("#timp option:selected").attr("tiporeg");

        //proveedor.id = $("#idp").val();
        //proveedor.ruc = $("#raz option:selected").attr("ruc");
        //proveedor.razs = $("#raz option:selected").val();
        //proveedor.razc = $("#raz").val();
        //proveedor.dirf = $("#dir").val();
        //proveedor.dirc = $("#dir").val();
        //proveedor.con = "";
        //proveedor.tel = "";
        //proveedor.cor = "";
        //proveedor.est = 1;

        let i = 1;

        $.each($("#productos tbody tr"), function () {
            let det = new Object();

            det.ordcs = i;
            det.idprodcs = this.cells[0].innerText;
            det.codpcs = this.cells[1].innerText;
            det.descs = this.cells[2].innerText;
            det.umcs = $(this.cells[3]).attr("um");
            det.cancs = this.cells[4].innerText.replace(/,/g, '');
            det.precs = this.cells[5].innerText.replace(/,/g, '');
            det.subcs = this.cells[6].innerText.replace(/,/g, '');
            det.ivgcs = this.cells[7].innerText.replace("%", "");
            det.totcs = this.cells[8].innerText.replace(/,/g, '');

            detalle.push(det);
        });

        $.each($("#ventas tbody tr"), function () {
            let det = new Object();

            det.idvcs = this.cells[0].innerText;
            if (det.divcs != '') {
                ventas.push(det);
            }
        });
        /*agregado tabla imp*/
        let total = 0;
        $.each($("#StableImp tbody tr"), function () {
            let detalleCR = new Object();

            let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",", "");
            detalleCR.idregS = parseInt(this.cells[0].innerText);
            detalleCR.numImporS = this.cells[1].innerText;
            detalleCR.asignacionS = this.cells[3].innerText;
            //detalleCR.importeReg = parseFloat(this.cells[2].innerText);
            //total = (parseFloat(t.toString()) / 100) * parseInt(this.cells[2].innerText);
            //console.log("ccc" + total);
            detalleCR.montoAsigS = (this.cells[4].innerText).replace(",", "");
            detalleRegistro.push(detalleCR);
        });
      /*  let idregi = 0;
    let asi = 0;
    $.each($(detalleRegistro), function () {
        idregi = this.idreg;
        asi = this.montoAsig;

    });*/
        com.com = compra;
        com.det = detalle;
        com.pro = proveedor;
        com.serv = ventas;
        /*agregado*/
        com.detReg = detalleRegistro;
        doc = $("#tc option:selected").text().trim();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea generar el siguiente documento?<br/>Tipo: <b>' + doc + '</b><br/>Serie: <b>' + $("#ser").val() + '</b><br />Número: <b>' + $("#num").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/ComprasServ.aspx/Insertar`, {
                    method: 'POST', body: JSON.stringify({ info: JSON.stringify(com) }), headers: { 'Content-Type': 'application/json' }
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
        });



        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea generar el siguiente documento?<br/>Tipo: <b>' + doc + '</b><br/>Serie: <b>' + $("#ser").val() + '</b><br />Número: <b>' + $("#num").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/ComprasServ.aspx/Insertar`, {
                    method: 'POST', body: JSON.stringify({ info: JSON.stringify(com) }), headers: { 'Content-Type': 'application/json' }
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
                    Alerta("La compra se registró correctamente");
                    let param = new Object();

                    param.tip = 1;
                    param.est = 1;
                    param.fac = 0;
                    cargaOrdenes(param);
                    limpiaControles('info');

                    $("#info").hide();
                    $("#lista").show();
                    $("#dtitle").show();

                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function cargaImportaciones(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
            columnas: [
                { leyenda: 'Año', class: 'text-center', ordenable: false, columna: 'FECHA', filtro: true },
                { leyenda: 'Tipo de Oper.', class: 'text-center', style: 'white-space:nowrap', ordenable: false, columna: 'TIPO', filtro: true },
                { leyenda: '#', class: 'text-center', ordenable: false, columna: 'NUMERO', filtro: true },
                { leyenda: 'ETD', class: 'text-center', style: 'width:1%;display:none', ordenable: false, columna: '', filtro: true },
                { leyenda: 'ETA', class: 'text-center', style: 'width:1%;display:none', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Proveedor', class: 'text-center', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Especie', class: 'text-center', style: 'width:1%;display:none', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Monto', class: 'text-center', style: 'width:1%', ordenable: false, columna: '', filtro: true },
                { leyenda: 'Estado', class: 'text-center', style: 'width:1%', ordenable: false, columna: '', filtro: true },
            ],
            modelo: [
                {
                    propiedad: 'FECHA', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        tr[0].style.cursor = 'pointer';
                        return new Date(valor).getFullYear();
                    }
                },
                {
                    propiedad: 'TIPO', class: 'text-center px-2', style: "white-space:nowrap", formato: function (tr, obj, valor) {
                        if (valor === 1)
                            return "Importación Directa";
                        if (valor === 2)
                            return "Importación Indirecta";
                        if (valor === 3)
                            return "Exportación Indirecta";
                        if (valor === 4)
                            return "Exportación Directa";
                    }
                },
                { propiedad: 'NUMERO', class: 'text-center' },
                { propiedad: '', class: 'text-center px-3', style: ';display:none' },
                { propiedad: '', style: ';display:none' },
                {
                    propiedad: '', style: 'white-space:nowrap', formato: function (tr, obj) {
                        return obj.RAZON_SOCIAL;
                    }
                },
                { propiedad: '', style: ';display:none' },
                {
                    propiedad: 'TOTAL', class: 'text-right', style: 'vertical-align:middle', formato(tr, obj, value) {
                        return formatoMoneda(value, 2, true);
                    }
                },
                {
                    propiedad: 'ESTATUS', style: 'white-space:nowrap; vertical-algn:middle', class: 'text-center', formato: function (tr, obj, value) {
                        if (value === 1)
                            return "Nuevo";
                        if (value === 2)
                            return 'En Proceso';
                        if (value === 3)
                            return 'Ingresado a Cámara';
                    }
                }
            ],
            url: '/ws/registros.aspx/listarFacturar',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'id',
            loader: "pre0",
            columna_orden: 'ASC'
        };

    }
    function cargaImp(param) {
        $("#timp").empty().append('<option value=""></option>');
        $("#timpv").empty().append('<option value=""></option>');

        get('/ws/registros.aspx/ConsultarIO', JSON.stringify({ id: param }))
            .then(function (res) {
                var r = JSON.stringify(res);
                if (r.startsWith('[{"Error":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {
                    function fechaFormateada(fecha) {
                        let fechaFormateada = '';
                        if (fecha != null) {
                            let mes = fecha.substr(5, 2);
                            let ano = fecha.substr(0, 4);
                            let dia = fecha.substr(8, 2);
                            fechaFormateada = dia + "/" + mes + "/" + ano;
                        }

                        return fechaFormateada;
                    }
                    $(res).each(function () {
                        let mod = "";
                        switch (this.TIPO) {
                            case 1:
                                mod = "Importación Directa";
                                break;
                            case 2:
                                mod = "Importación Indirecta";
                                break;
                            case 3:
                                mod = "Exportación Indirecta";
                                break;
                            case 4:
                                mod = "Exportación Directa";
                                break;
                        }
                        $("#timp").append('<option modalidad="' + mod + '" nombreProducto="' + this.DESCRIPCION +
                            '" numeroRegistro="' + this.ID_REGISTRO + '" ruc="' + this.RUC + '" razonSocial="' + this.RAZON_SOCIAL + '" value="'
                            + this.ID_REGISTRO + '" tiporeg ="' + this.TIPOREG + '"imporS="' + this.IMP + '"> #' + this.IMP + " " + mod + " " + this.RAZON_SOCIAL + " " +
                            fechaFormateada(this.FECHA) +'</option>');
                        $("#timpv").append('<option modalidad="' + mod + '" nombreProducto="' + this.DESCRIPCION +
                            '" numeroRegistro="' + this.ID_REGISTRO + '" ruc="' + this.RUC + '" razonSocial="' + this.RAZON_SOCIAL + '" value="'
                            + this.ID_REGISTRO + '" tiporeg ="' + this.TIPOREG + '"imporS="' + this.IMP + '"> #' + this.IMP + " " + mod + " " + this.RAZON_SOCIAL + " " +
                            fechaFormateada(this.FECHA) + '</option>');
                    });

                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de registros<br />" + error, "ERROR!");
            });
    }
    function cargaVent(anio,mes) {
        get('/ws/RegVtas.aspx/ConsultarC', JSON.stringify({ id: 0 ,anio: anio,mes:mes}))
            .then(function (res) {
                var r = JSON.stringify(res);
                if (r.startsWith('[{"Error":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {
                    function fechaFormateada(fecha) {
                        let fechaFormateada = '';
                        if (fecha != null) {
                            let mes = fecha.substr(5, 2);
                            let ano = fecha.substr(0, 4);
                            let dia = fecha.substr(8, 2);
                            fechaFormateada = dia + "/" + mes + "/" + ano;
                        }

                        return fechaFormateada;
                    }
                    $("#vent").empty();
                    $("#ventv").empty();
                    $(res).each(function () {
                        $("#vent").append('<option value="' + this.ID_VENTAS + '"> ' + this.SERIE + " " + this.NUMERO + " " + this.RAZON_SOCIAL + " " +
                            this.NUMERO_DOCUMENTO + " " + formatoFecha(this.FECHAEMISION) + " " + this.TOTAL + '</option>');
                        $("#ventv").append('<option value="' + this.ID_VENTAS + '">' + this.SERIE + " " + this.NUMERO + " " + this.RAZON_SOCIAL + " " +
                            this.NUMERO_DOCUMENTO + " " + formatoFecha(this.FECHAEMISION) + " " + this.TOTAL + '</option>');

                    });

                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de ventas<br />" + error, "ERROR!");
            });
    }
    function getCorrelativo() {
        let reg = new Object();

        let registro = new Object();
        reg.fecemi = new Date($("#fec").attr("fecha"));
        registro.reg = reg;
        //funcion para obtener el correlativo
        get('/ws/ComprasServ.aspx/obtcorrelativo', JSON.stringify({ info: JSON.stringify(registro) }))
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
    function cargaServicios(id) {
        get('/ws/servicios.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#codp").val(this.cod);
                            $("#idpro").val(this.id);
                            $("#ump").val(this.um);
                            $("#ump").trigger("change");
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
    function cargaServicio() {
        $("#nomp").empty();
        $("#nompe").empty();
        get('/ws/servicios.aspx/ConsultarA', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#nomp").append('<option codigo=0 value=0>Seleccione</option>');
                        $("#nompe").append('<option codigo=0 value=0>Seleccione</option>');
                        $(res.Info).each(function () {
                            $("#nomp").append('<option codigo="' + this.copro + '" value="' + this.id + '">' + this.pro + '</option>');
                            $("#nompe").append('<option codigo="' + this.copro + '" value="' + this.id + '">' + this.pro + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de servicios<br />" + error, "ERROR!");
            });
        //$("#nomp").trigger("change");
        //$("#nompe").trigger("change");
    }
    function cargaServicioc(cod) {
        //get('/ws/servicios.aspx/ConsultarC', JSON.stringify({ cod: cod }))
        //    .then(function (res) {
        //        if (res.Respuesta === 1) {
        //            if (res.Info !== null) {
        //                if (res.Info.length > 0) {
        //                    $(res.Info).each(function () {
        //                        $("#nomp").val(this.nom);
        //                        $("#idpro").val(this.id);
        //                        $("#ump").val(this.um);
        //                    });
        //                } else {
        $("#nservicio").modal({ backdrop: 'static', keyboard: false });
        //            }                        
        //        } 
        //    }
        //    else {
        //        Alerta(res.Mensaje, "ERROR!");
        //    }
        //})
        //.catch(function (error) {
        //    Alerta("No fue posible cargar el listado de servicios<br />" + error, "ERROR!");
        //});
    }
    function editaRegistro(id) {
        $("#dtitle").hide();

        get('/ws/ComprasServ.aspx/Editar', JSON.stringify({ id: id }))
            .then(function (res) {
                let id;
                let pre;

                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#lista").hide();
                        $("#info").show();
                        $("#idc").val(res.Info.compra.id);
                        //cambio en select

                        $("#tc").val(res.Info.compra.tipcs);
                        $("#tc").change();
                        $("#ser").val(res.Info.compra.sercs);
                        $("#fec").val(formatoFecha(res.Info.compra.feccs, 1)).attr("fecha", new Date(res.Info.compra.feccs));
                        $("#num").val(res.Info.compra.numcs);
                        //cambio en select

                        $("#mon").val(res.Info.compra.moncs);
                        $("#mon").change();
                        //cambio en select

                        $("#timp").val(res.Info.compra.idccs);
                        $("#timp").change();
                        $("#doc").val(res.Info.compra.doccs);
                        $("#ruc").val(res.Info.exp.ruc);
                        //cambio en select

                        $("#raz").val(res.Info.exp.razs);
                        $("#raz").change();
                        $("#dir").val(res.Info.exp.dirf);
                        $("#ubi").val(res.Info.compra.iducs).change();

                        $("#des").val(res.Info.compra.dess);
                        //cambio en select
                        $("#alm").change();
                        $("#alm").val(res.Info.compra.idacs).change();
                        $("#gra").val(res.Info.compra.gracs);
                        $("#obs").val(res.Info.compra.obscs);

                        $("#gram").text(res.Info.compra.gramcs);
                        $("#ivgm").text(res.Info.compra.ivgcs);
                        $("#desm").text(res.Info.compra.desmcs);
                        $("#tot").text(res.Info.compra.totcs);
                        $("#fecvig").val(formatoFecha(res.Info.compra.fecvigcs, 1)).attr("fecha", new Date(res.Info.compra.fecvigcs));

                        //cambio en select

                        $("#tcimp").val(res.Info.compra.tcimp);
                        $("#tcimp").change();
                        //cambio en select

                        $("#tctrans").val(res.Info.compra.tctrans);
                        $("#tctrans").change();
                        //cambio en select

                        $("#tcptoe").val(res.Info.compra.tcpent);
                        $("#tcptoe").change();
                        //cambio en select

                        $("#tcalm").val(res.Info.compra.tcalm);
                        $("#tcalm").change();


                        $("#productos tbody").empty();

                        pre = "info";
                        $.each(res.Info.prods, function () {
                            id = $("#productos tbody tr").length;
                            $("#ump").val(this.umcs);
                            $("#ump").trigger("change");
                            $("#ivg").val(this.ivgcs);
                            $("#ivg").trigger("change");
                            fila = '<tr id="f' + pre + id + '">' +
                                '<td id="n' + pre + id + '" style="display: none">' + this.idprodcs + '</td>' +
                                '<td class="text-right"> ' + this.codpcs + '</td > ' +
                                '<td class="text-right">' + this.descs + '</td>' +
                                '<td class="text-center" um="' + this.umcs + '">' + $("#ump option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.cancs, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.precs, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.subcs, 2, true) + '</td>' +
                                '<td class="text-right">' + $("#ivg option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.totcs, 2, true) + '</td>' +
                                '<td class="text-center"><i id="e' + pre + id + '" class="fa fa-edit" title="Edita producto"></i>&nbsp;&nbsp;<i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

                            $("#productos tbody").append(fila);

                            fila = $("#productos tr:last");
                            $(fila).css({ "cursor": "pointer" });
                            $("#e" + pre + id).on("click", function () {
                                var result = [];
                                var i = 0;

                                $("#prodse").modal({ backdrop: 'static', keyboard: false });
                                limpiaControles('prodse');
                                $(this).closest('td').siblings().each(function () {
                                    // obtenemos el texto del td 
                                    if (i === 3) {
                                        result[i] = $(this).attr("um");
                                    } else {
                                        result[i] = $(this).text();
                                    }
                                    ++i;
                                });
                                $("#tdid").val("#f" + pre + id);
                                $("#idproe").val(result[0]);
                                $("#codpe").val(result[1]);
                                $("#nompe").val(result[0]);
                                $("#nompe").trigger("change");
                                $("#cantpe").val(result[4]);
                                $("#prepe").val(result[5]);
                                $("#subpe").val(result[6]);
                                if (result[7] === "0%") {
                                    $("#ivge").val(0);
                                } else {
                                    $("#ivge").val(result[7].replace(/%/g, ''));
                                }
                                $("#ivge").trigger("change");
                                $("#imppe").val(result[8]);
                                $("#umpe").val(result[3]);
                                $("#umpe").trigger("change");

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

                    /*vvv*/

                        $("#ventas tbody").empty();
                        let id3 = 0;
                        id3 = $("#ventas tbody tr").length;
                        console.log("size" + 3);
                        //let fila = "";
                        $.each(res.Info.ventas, function (i) {
                            console.log(res.Info.ventas);
                            $("#vent").val(this.idvcs).change();
                            fila = "<tr id='filaS" + i + "'>" +
                                "<td class='d-none'>" + this.idvcs + "</td>" +
                                "<td class='text-center' id='s" + i + "'>#" + this.descripcion+ "</td>" +
                                "<td class='text-center' id='t" + i + "'>" + "<i class='fa fa-trash text-danger' title='Eliminar venta'></i></td></tr > ";

                            $("#ventas tbody").append(fila);

                            $("#t" + i).on("click", function () {
                                Swal.fire({
                                    title: 'Confirmación',
                                    html: '¿Confirma que desea eliminar la venta N°<b>' + $("#s" + i).text() + '</b>?',
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#1cc88a',
                                    cancelButtonColor: '#6c757d',
                                    confirmButtonText: 'Si, eliminar',
                                    cancelButtonText: 'Cancelar'
                                }).then((result) => {
                                    if (result.value) {
                                        $("#filaS" + i).remove();

                                    }
                                });
                            });

                        });


                        /*importaciones*/
                        $("#StableImp tbody").empty();
                        //let id2 = 0;
                        //id2 = $("#StableImp tbody tr").length;
                        //console.log("size" + id2);
                        //let fila = "";
                        $.each(res.Info.detalleReg, function (i) {
                            fila = "<tr id='fila" + i + "'>" +
                                "<td class='d-none'>" + this.idregS + "</td>" +
                                "<td class='text-center' id='n" + i + "'>" + this.numImporS + "</td>" +
                                "<td class='text-center d-none'>" + "0" + "</td>" +
                                "<td class='text-center'>" + this.asignacionS + "</td>" +
                                "<td class='text-center'>" + formatoMoneda(this.montoAsigS, 2, true) + "</td>" +
                                "<td class='text-center' id='e" + i + "'>" + "<i class='fa fa-trash text-danger' title='Eliminar Importacion'></i></td></tr > ";
                            
                            $("#StableImp tbody").append(fila);

                            $("#e" + i).on("click", function () {
                                Swal.fire({
                                    title: 'Confirmación',
                                    html: '¿Confirma que desea eliminar la importación N°<b>' + $("#n" + i).text() + '</b>?',
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#1cc88a',
                                    cancelButtonColor: '#6c757d',
                                    confirmButtonText: 'Si, eliminar',
                                    cancelButtonText: 'Cancelar'
                                }).then((result) => {
                                    if (result.value) {
                                        $("#fila" + i).remove();

                                    }
                                });
                            });

                        });

                        $("#act").show();
                        $("#gua").hide();
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible editar el registro<br />" + error, "ERROR!");
            });
    }


    function consultaRegistro(id) {
        $("#dtitle").hide();
        $("#dtitleoc").hide();
        get('/ws/ComprasServ.aspx/Editar', JSON.stringify({ id: id }))
            .then(function (res) {
                let id = 0;
                let pre = "";
                let fila = "";
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#lista").hide();
                        $("#infov").show();
                        $("#idcv").val(res.Info.compra.id);
                        //cambio en select

                        $("#tcv").val(res.Info.compra.tipcs);
                        $("#tcv").change();
                        $("#serv").val(res.Info.compra.sercs);
                        $("#fecv").val(formatoFecha(res.Info.compra.feccs, 1)).attr("fecha", new Date(res.Info.compra.feccs));
                        $("#numv").val(res.Info.compra.numcs);
                        //cambio en select

                        $("#monv").val(res.Info.compra.moncs);
                        $("#monv").change();
                        //cambio en select

                        $("#timpv").val(res.Info.detalleReg[0].idregS);
                        $("#timpv").change();
                        $("#docv").val(res.Info.compra.doccs);
                        $("#rucv").val(res.Info.exp.ruc);
                        //cambio en select

                        $("#razv").val(res.Info.exp.razs);
                        $("#razv").change();
                        $("#dirv").val(res.Info.exp.dirf);
                        $("#ubiv").val(res.Info.compra.iducs).change();

                        $("#desv").val(res.Info.compra.dess);
                        //cambio en select
                        $("#almv").change();
                        $("#almv").val(res.Info.compra.idacs).change();
                        $("#grav").val(res.Info.compra.gracs);
                        $("#obsv").val(res.Info.compra.obscs);

                        $("#gramv").text(res.Info.compra.gramcs);
                        $("#ivgmv").text(res.Info.compra.ivgcs);
                        $("#desmv").text(res.Info.compra.desmcs);
                        $("#totv").text(res.Info.compra.totcs);
                        $("#fecvigv").val(formatoFecha(res.Info.compra.fecvigcs, 1)).attr("fecha", new Date(res.Info.compra.fecvigcs));

                        //cambio en select

                        $("#tcimpv").val(res.Info.compra.tcimp);
                        $("#tcimpv").change();
                        //cambio en select

                        $("#tctransv").val(res.Info.compra.tctrans);
                        $("#tctransv").change();
                        //cambio en select

                        $("#tcptoev").val(res.Info.compra.tcpent);
                        $("#tcptoev").change();
                        //cambio en select

                        $("#tcalmv").val(res.Info.compra.tcalm);
                        $("#tcalmv").change();
                        /*agregado campo % e imp*/

                        $("#Sasignacionv").val(res.Info.detalleReg[0].asignacion);

                        $("#productosv tbody").empty();

                        pre = "infov";
                        $.each(res.Info.prods, function () {
                            id = $("#productosv tbody tr").length;
                            $("#umpv").val(this.umcs);
                            $("#umpv").trigger("change");
                            $("#ivgv").val(this.ivgcs);
                            $("#ivgv").trigger("change");
                            fila = '<tr id="f' + pre + id + '">' +
                                '<td id="n' + pre + id + '" style="display: none">' + this.idprodcs  + '</td>' +
                                '<td class="text-right"> ' + this.codpcs  + '</td > ' +
                                '<td class="text-right">' + this.descs + '</td>' +
                                '<td class="text-center" um="' + this.umcs + '">' + $("#umpv option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.cancs, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.precs, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.subcs, 2, true) + '</td>' +
                                '<td class="text-right">' + $("#ivgv option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.totcs, 2, true) + '</td>' +
                                '</tr>';

                            $("#productosv tbody").append(fila);
                        });

                        $("#ventasv tbody").empty();
                        let id3 = 0;
                        id3 = $("#ventasv tbody tr").length;
                        console.log("size" + 3);
                        //let fila = "";
                        $.each(res.Info.ventas, function (i) {
                            $("#ventv").val(this.idvcs);
                            $("#ventv").trigger("change");
                            $("#ventv").val(this.idvcs).change();
                            fila = "<tr id='filaS" + i + "'>" +
                                "<td class='d-none'>" + this.idvcs + "</td>" +
                                "<td class='text-center' id='s" + i + "'>" + this.descripcion + "</td></tr > ";

                            $("#ventasv tbody").append(fila);
                        });

                        /*agregado importaciones*/
                        $("#StableImpv tbody").empty();
                        let id2 = 0;
                        id2 = $("#StableImpv tbody tr").length;
                        //let fila = "";
                        $.each(res.Info.detalleReg, function () {
                            fila = "<tr id='fila" + id2 + "'>" +
                                "<td class='d-none'>" + this.idregS  + "</td>" +
                                "<td class='text-center' id='n" + id2 + "'>" + this.numImporS + "</td>" +
                                "<td class='text-center d-none'>" + "0" + "</td>" +
                                "<td class='text-center'>" + this.asignacionS + "</td>" +
                                "<td class='text-center'>" + formatoMoneda(this.montoAsigS, 2, true) + "</td>" +
                                "<td class='text-center' id='e" + id2 + "'></td></tr > ";
                            $("#StableImpv tbody").append(fila);

                        });



                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible editar el registro<br />" + error, "ERROR!");
            });
    }






    function editaComprobante(opc,est) {
        let doc;
        let com = new Object();
        let compra = new Object();
        let detalle = new Array();
        let proveedor = new Object();
        /*agregado para detalle registros */
        let detalleRegistro = new Array();
        let ventas = new Array();
        var from = $("#fec").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);
        var from2 = $("#fecvig").val().split("/");
        var f2 = new Date(from2[2], from2[1] - 1, from2[0]);

        compra.id = $("#idc").val();
        compra.tipcs = opc;
        compra.sercs = $("#ser").val().trim();
        compra.numcs = $("#num").val().trim();
        compra.feccs = f;
        compra.moncs = $("#mon").val();
        compra.doccs = $("#raz option:selected").attr("tipoDoc");
        compra.idpcs = $("#raz option:selected").attr("idProveedor");
        compra.dircs = $("#dir").val().trim();
        compra.iducs = $("#ubi").val();
        compra.descs = $("#des").val().trim() === "" ? 0 : $("#des").val().trim();
        compra.idacs = $("#alm").val();
        compra.obscs = $("#obs").val().trim();
        compra.gracs = $("#gra").val() === "" ? 0 : $("#gra").val();
        compra.gramcs = $("#gram").text().replace("USD", "").replace("S/.", "");
        compra.ivgcs = $("#ivgm").text().replace("USD", "").replace("S/.", "");
        compra.desmcs = $("#desm").text().replace("USD", "").replace("S/.", "");
        compra.totcs = $("#tot").text().replace("USD", "").replace("S/.", "");
       // compra.idccs = $("#timp").val() === "" ? 0 : $("#timp").val();
        compra.statuscs = est;
        compra.fecvigcs = f2;


        compra.tcimp = $("#tcimp").val() == "" ? 0 : $("#tcimp").val();
        compra.tctrans = $("#tctrans").val() == "" ? 0 : $("#tctrans").val();
        compra.tcpent = $("#tcptoe").val() == "" ? 0 : $("#tcptoe").val();
        compra.tcalm = $("#tcalm").val() == "" ? 0 : $("#tcalm").val();

        compra.tipidoc = $("#timp").val() === "" ? null : $("#timp").val() === null ? null : $("#timp option:selected").attr("tiporeg");


        proveedor.id = $("#idp").val();
        proveedor.ruc = $("#ruc").val();
        proveedor.razs = $("#raz").val();
        proveedor.razc = $("#raz").val();
        proveedor.dirf = $("#dir").val();
        proveedor.dirc = $("#dir").val();
        proveedor.con = "";
        proveedor.tel = "";
        proveedor.cor = "";
        proveedor.est = 1;
        proveedor.idubi = $("#ubi").val();

        let i = 1;

        $.each($("#productos tbody tr"), function () {
            let det = new Object();
            det.id = compra.id;
            det.ordcs = i;
            det.idprodcs = this.cells[0].innerText;
            det.codpcs = this.cells[1].innerText;
            det.descs = this.cells[2].innerText;
            det.umcs = $(this.cells[3]).attr("um");
            det.cancs = this.cells[4].innerText.replace(/,/g, '');
            det.precs = this.cells[5].innerText.replace(/,/g, '');
            det.subcs = this.cells[6].innerText.replace(/,/g, '');
            det.ivgcs = this.cells[7].innerText.replace("%", "");
            det.totcs = this.cells[8].innerText.replace(/,/g, '');

            detalle.push(det);
        });

        $.each($("#ventas tbody tr"), function () {
            let det = new Object();

            det.idvcs = this.cells[0].innerText;
            if (det.divcs != '') {
                ventas.push(det);
            }
        });

        /*agregado tabla imp*/
        let total = 0;
        $.each($("#StableImp tbody tr"), function () {
            let detalleCR = new Object();

            let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",", "");
            detalleCR.idregS = parseInt(this.cells[0].innerText);
            detalleCR.numImporS = this.cells[1].innerText;
            detalleCR.asignacionS = this.cells[3].innerText;
            //detalleCR.importeReg = parseFloat(this.cells[2].innerText);
            //total = (parseFloat(t.toString()) / 100) * parseInt(this.cells[2].innerText);
            //console.log("ccc" + total);
            detalleCR.montoAsigS = (this.cells[4].innerText).replace(",", "");
            detalleRegistro.push(detalleCR);
        });
        /*agregado*/
        com.com = compra;
        com.det = detalle;
        com.pro = proveedor;
        com.serv = ventas;
        com.detReg = detalleRegistro;
        doc = $("#tc option:selected").text().trim();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea actualizar el registro?<br/>Tipo: <b>' + doc + '</b><br/>Serie: <b>' + $("#ser").val() + '</b><br />Número: <b>' + $("#num").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/ComprasServ.aspx/Edita`, {
                    method: 'POST', body: JSON.stringify({ info: JSON.stringify(com) }), headers: { 'Content-Type': 'application/json' }
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
                    Alerta("La compra se edito correctamente");
                    let param = new Object();

                    param.tip = 1 ;
                    param.est = 1;
                    param.fac = 0;
                    cargaOrdenes(param);
                    limpiaControles('info');

                    $("#info").hide();
                    $("#lista").show();
                    $("#dtitle").show();
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function cargaServicioce(cod) {
        get('/ws/servicios.aspx/ConsultarC', JSON.stringify({ cod: cod }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#nompe").val(this.id);
                            $("#nompe").trigger("change");
                            $("#idproe").val(this.id);

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
    function importeProductoe() {
        let ivg;
        let sub;
        let cant;
        let precio;

        ivg = $("#ivge").val();
        cant = $("#cantpe").val().trim().replace(/,/g, '');
        precio = $("#prepe").val().trim().replace(/,/g, '');

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

        $("#subpe").val(formatoMoneda(sub, 2, true));
        if (ivg > 0)
            $("#imppe").val(formatoMoneda(sub * (1 + (ivg / 100)), 2, true));
        else
            $("#imppe").val(formatoMoneda(sub, 2, true));

    }
    function cargaServiciose(id) {
        get('/ws/productos.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#codpe").val(this.cod);
                            $("#idproe").val(this.id);
                            $("#ump").val(this.um);
                            $("#ump").trigger("change");
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
    function cargaServiciodes(des) {
        get('/ws/servicios.aspx/ConsultarD', JSON.stringify({ des: des }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length > 0) {
                            $(res.Info).each(function () {
                                $("#codp").val(this.cod);
                                $("#nomp").val(this.nom);
                                $("#nomp").trigger("change");
                                $("#idpro").val(this.id);
                                $("#ump").val(this.um);
                                $("#ump").trigger("change");
                            });
                        } else {
                            $("#nservicio").modal({ backdrop: 'static', keyboard: false });
                        }
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de servicios<br />" + error, "ERROR!");
            });
    }
    function getSimboloMoneda(id) {
        get('/ws/monedas.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $.each(res.Info, function () {
                        $("#sgram").text(this.sim);
                        $("#sivgm").text(this.sim);
                        $("#sdesm").text(this.sim);
                        $("#stot").text(this.sim);
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
    function buscaProveedorruc(ruc) {
        get('/ws/exportadores.aspx/consultaFiltro', JSON.stringify({ info: ruc }))
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
    function guardaProv() {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el proveedor <b>' + $("#razs").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let exp = new Object();
                let tipos = new Array();
                let exportador = new Object();
                let detalle = new Array();

                exp.razs = $("#razs").val();
                exp.ruc = $("#rucp").val();
                exp.razc = $("#razc").val();
                exp.dirf = $("#dirf").val();
                exp.dirc = $("#dirc").val();
                exp.idubi = $("#ubip").val();
                exp.est = 1;
                exp.tipodoc = $("#td").val();

                let tip = new Object();
                tip.tip = 1;
                exp.tip = $("#tip").val();
                tipos.push(tip);

                exportador.exp = exp;
                exportador.det = detalle;
                exportador.tip = tipos;
                get("/ws/exportadores.aspx/InsertarAll", JSON.stringify({ info: JSON.stringify(exportador) }))
                    .then(function (res) {
                        if (res.Respuesta === 1) {
                            Alerta("El proveedor se agregó correctamente");
                            limpiaControles('proveedor');
                            $("#proveedor").modal("toggle");
                        }
                        else {
                            Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                        }
                    })
                    .catch(function (res) {
                        Alerta("No fue posible insertar el proveedor<br />" + res, "Error!", typIconoAlerta.error);
                    });
            }
        });
    }
    function buscaProveedorazid(razs) {
        get('/ws/exportadores.aspx/Consultar', JSON.stringify({ id: razs }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length === 1) {
                            $("#dir").val(res.Info[0].dirf);
                            $("#ubi").val(res.Info[0].idubi);
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
    //GUARDA NUEVO SERVICIO
    function GuardarNS() {
        let info = new Object();
        info.nom = $("#nom").val();
        info.cod = $("#cod").val();
        info.um = $("#um").val();
        info.edo = $("#status").val();

        get('/ws/servicios.aspx/Insertar', JSON.stringify({ info: JSON.stringify(info) }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    Alerta("El servicio se agegó correctamente");
                    $("#nom").val("");
                    $("#cod").val("");
                    $("#um").val("");
                    $("#um").trigger("change");
                    $("#status").val("");
                    $("#nservicio").modal("toggle");
                    cargaServicio();

                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta(error, "ERROR!");
            });
    }
    function cargaClientes() {
        $("#cli").empty().append('<option value=""></option>');
        get('/ws/Clientes.aspx/ConsultarCont', JSON.stringify({ id: 0 }))
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
    function buscaProveedorazs(razs) {
        get('/ws/exportadores.aspx/consultaRazs', JSON.stringify({ info: razs }))
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
    function cargarListRazonSocialProveedor() {
        get('/ws/exportadores.aspx/ListarParaSelect')
            .then(function (res) {
                if (res !== null) {
                    let html = "";
                    $(res).each(function () {
                        html += "<option idProveedor = '" + this.ID_EXPORTADOR + "' ruc='" + this.RUC + "' tipoDoc='" + this.TIPO_DOCUMENTO + "' value='" + this.RAZON_SOCIAL + "'>" + this.RAZON_SOCIAL +
                            "</option>";
                    });
                    $('#raz').html(html);
                    $('#razv').html(html);

                }
            })
            .catch(function (error) {
                Alerta("no fue posible cargar el listado de Proveedores<br />" + error);
            });
    }
    $('#ruc').on("keyup", function () {
        let filtro = $('#ruc').val();
        let validador = 0;
        let contador = 0;

        $('#raz option').each(function () {
            let razonSocialProveedor = $(this).text().toUpperCase();
            let rucProveedor = $(this).attr("ruc");

            if (razonSocialProveedor.indexOf(filtro.toUpperCase()) !== -1 || rucProveedor.indexOf(filtro) !== -1) {
                $(this).show();
                if (validador === 0) {
                    $(this).attr("selected", true);
                    $('#raz ').val($(this).val());
                    buscaProveedorazid($("#raz option:selected").attr("idProveedor"));

                    validador++;
                } else {
                    $(this).attr("selected", false);
                }
            } else {
                $(this).attr("selected", false);
                $(this).hide();
                contador++;
                if ($(this).attr("style") == "display: none;" && contador == $('#raz option').length) {
                    $('#raz ').val('');
                }
            }
            if (filtro == '') {
                //SELECCIONAR EL PRIMERO
                $(this).show();
                $('#raz option:first-child').attr("selected", true);
            }
        });
    });
    $('#txtFiltroImpoExpCompras').on("keyup", function () {
        let filtro = $('#txtFiltroImpoExpCompras').val();
        let validador = 0;
        let contador = 0;

        $('#timp option').each(function () {
            let razonSocialExportador = $(this).text().toUpperCase();
            let rucImportador = $(this).attr("ruc");

            if (razonSocialExportador.indexOf(filtro.toUpperCase()) !== -1 || rucImportador.indexOf(filtro) !== -1) {
                $(this).show();
                if (validador === 0) {
                    $(this).attr("selected", true);
                    $('#timp ').val($(this).val());
                    validador++;
                } else {
                    $(this).attr("selected", false);
                }
            } else {
                $(this).attr("selected", false);
                $(this).hide();
                contador++;
                if ($(this).attr("style") == "display: none;" && contador == $('#timp option').length) {
                    $('#timp ').val('');
                }
            }
            if (filtro == '') {
                //SELECCIONAR EL PRIMERO
                $(this).show();
                $('#timp option:first-child').attr("selected", true);
            }
        });
    });

    function cargaPuntosEntraga() {
        $("#tctrans").empty().append('<option value="0"></option>');
        $("#tctransv").empty().append('<option value="0"></option>');
        $("#tcptoe").empty().append('<option value="0"></option>');
        $("#tcptoev").empty().append('<option value="0"></option>');
        get('/ws/puntosentrega.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            if (this.nom.toUpperCase() != "CENTRAL") {
                                $("#tctrans").append('<option value="' + this.id + '">' + this.nom + '</option>');
                                $("#tctransv").append('<option value="' + this.id + '">' + this.nom + '</option>');
                                $("#tcptoe").append('<option value="' + this.id + '">' + this.nom + '</option>');
                                $("#tcptoev").append('<option value="' + this.id + '">' + this.nom + '</option>');
                            }
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            });
    }

    $(document).ready(function () {
        cargarListRazonSocialProveedor();
        cargaImp('%');
        cargaVent('','');
        cargaOrdenes();
        cargaUbigeos();
        cargaImpuestos();
        cargaAlmacenes();
        cargaUnidadesMedida();
        cargaTipocomprobantes();
        cargaServicio();
        cargaPuntosEntraga();

        Moneda.Consultar("#mon");
        Moneda.Consultar("#monv");

        //validar escribir solo numeros en los inputs con clase numeros
        $(".numeros").on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
        $('#femd').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date() });
        $('#femh').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date() });

        $('#fec').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
        $('#fecvig').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });

        $('.fecha').each(function () {
            $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy" });
        });

        $('.select2').each(function () {
            $(this).select2({
                width: '100%'
            });
        });


        //radiobutton change
        //$("#timp").prop("disabled", true);
        $('input[type=radio][name=tipo]').on('change', function () {
            if (this.value === "1") {
                $("#vent").prop("disabled", false);
                $("#timp").prop("disabled", true);
            }
            else if (this.value === "2") {
                $("#vent").prop("disabled", true);
                $("#timp").prop("disabled", false);
            }
        });
        //tipo de comprobante change        
        $('#tc').change(function () {

            if ($('#tc').val() != '') {
                cargaTipocomprobante($('#tc').val());
            }
            if ($("#tc option:selected").text().toUpperCase() === "FACTURA") {
                $("#ser").prop("readonly", false);
                $("#num").prop("readonly", false);
                $("#ser").val("");
                $("#num").val("");
            } else if ($("#tc option:selected").text().toUpperCase() === "BOLETA") {
                $("#ser").prop("readonly", false);
                $("#num").prop("readonly", false);
                $("#ser").val("");
                $("#num").val("");

            } else {
                $("#ser").prop("readonly", true);
                $("#num").prop("readonly", true);

            }

        });
        $("#bus").on("click", function () {
            let param = new Object();
            //agregado serie
            if ($('#serieValor').val() != "") {
                param.serie = $('#serieValor').val();
            }
            if ($('#compraValor').val() != "") {
                param.num = $('#compraValor').val();
            }
            if ($('#proveedorValor').val() != "") {
                param.prov = $('#proveedorValor').val();
            }
            if ($('#rucValor').val() != "") {
                param.ruc = $('#rucValor').val();
            }
            if ($('#bedo').val() != "0") {
                param.edo = $("#bedo").val();
            }
            if (jQuery.isEmptyObject(param)) {
                cargaOrdenes();
            }
            else {
                cargaOrdenes(param);
            }

        });
        $("#restablecerFiltros").on("click", function () {
            //Limpiar filtros
            $('#compraValor').val('');
            $('#proveedorValor').val('');
            $('#rucValor').val('');
            $('#bedo').val('0');
            $('#bedo').trigger('change');
            cargaOrdenes()
        });



        $("#opc").on("change", function () {
            $("#bfec").hide();
            $("#bfec").hide();

            $("#bval").hide();
            $(".gj-icon").parent().hide();

            if ($(this).val() === "3") {
                $("#bfec").show();
                $(".gj-icon").parent().show();
            }
            else if ($(this).val() === "5") {
                $("#bedo").show();
            } else if ($(this).val() !== "1") {
                $("#bval").show();
            } else if ($(this).val() !== "4") {
                $("#bval").show();
            } else if ($(this).val() !== "6") {
                $("#bval").show();
            }
            else if ($(this).val() !== "") {
                $("#bfec").hide();
                $("#bedo").hide();
                $("#bval").hide();
            }
        });
        $("#mon").on("change", function () {
            if ($("#mon").val() != "") getSimboloMoneda($("#mon").val());
        });
        /*modificado para asignaciones*/
        $("#gua").on("click", function () {
            if (valForm('info')) {


                if ($("#StableImp tbody tr").length > 0 || ($("#ventas tbody tr").length > 0) ){
                   // Alerta("Debe seleccionar al menos una importación", "AVISO!");
                //}/* else if (importe2 < 100) {
                    //Alerta("Las importaciones seleccionadas deben cumplir con el 100% de asignación." + "</br><strong>Monto total asignado:</strong> " +
                      //  formatoMoneda(parseFloat(importeAsignado), 2, true)  + "</br> <strong>Monto Pendiente: </strong>" + formatoMoneda(parseFloat(t) - importeAsignado, 2, true), "AVISO!");
                    if ($("#productos tbody tr").length > 0) {
                        let opc = $("#tc").val();

                        if (opc !== undefined && opc !== "") {



                            validaestado(opc);

                            //guardaComprobante(opc);
                        }
                        else {
                            Alerta("Debe especificar el tipo de comprobante a generar", "AVISO!");
                        }
                    }
                    else {
                        Alerta("Debe especificar al menos un producto", "AVISO!");
                    }
               }

                else {
                    Alerta("Debe asignar al menos una venta o una importación a la compra", "AVISO!");
                    
               }
            }
        });

        $("#act").on("click", function () {

            if (valForm('info')) {
                if ($("#StableImp tbody tr").length > 0 || ($("#ventas tbody tr").length > 0)) {
                    if ($("#productos tbody tr").length > 0) {
                        let opc = $("#tc").val();

                        if (opc !== undefined && opc !== "") {

                            Swal.fire({
                                title: 'La compra esta Pendiente o Cancelada?',
                                showDenyButton: true,
                                showCancelButton: false,
                                confirmButtonText: 'Pendiente',
                                denyButtonText: 'Cancelado',
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    editaComprobante(opc,1);
                                } else if (result.isDenied) {
                                    let importe2 = 0;
                                    let importeAsignado = 0;
                                    let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",", "");
                                    $("#StableImp tbody").children("tr").each(function () {
                                        let asig = $($(this).children("td")[3]).text();
                                        let monto = $($(this).children("td")[4]).text().replace("USD", "").replace("S/.", "").replace(",", "");
                                        importe2 += Number(asig);
                                        importeAsignado += Number(monto);
                                        console.log("aa" + asig);
                                    });
                                    if (importe2 < 100) {
                                        Alerta("Las importaciones seleccionadas deben cumplir con el 100% de asignación." + "</br><strong>Monto total asignado:</strong> " +
                                            formatoMoneda(parseFloat(importeAsignado), 2, true) + "</br> <strong>Monto Pendiente: </strong>" + formatoMoneda(parseFloat(t) - importeAsignado, 2, true), "AVISO!");

                                    } else {

                                        editaComprobante(opc, 3);
                                    }
                                }
                            });
                        }
                        else {
                            Alerta("Debe especificar el tipo de comprobante a generar", "AVISO!");
                        }
                    }
                    else {
                        Alerta("Debe especificar al menos un producto", "AVISO!");
                    }



                } else {
                    Alerta("Asigne una importación o una venta a la compra.", "AVISO!");

                }
            }
        });
        $("#npro").on("click", function () {
            $("#prods").modal({ backdrop: 'static', keyboard: false });
            limpiaControles('prods');
            $("#ivg").prop("selectedIndex", 0);
            if ($("#ivg option").length === 2) {
                $("#ivg").prop("selectedIndex", 1);
            }
            $("#ivg").trigger("change");
            $("#nomp").focus();
        });
        $("#bcod").on("click", function () {
            cargaServicioc($("#codp").val());
        });
        $("#bcode").on("click", function () {
            cargaServicioce($("#codpe").val());
        });

        $("#canpr").on("click", function () {
            $("#provs").modal("toggle");
        });
        $("#canp").on("click", function () {
            $("#prods").modal("toggle");
        });
        $("#agrp").on("click", function () {
            if ($("#nomp option:selected").val() !== "0") {
                if (valForm("prods")) {
                    let id;
                    let pre;
                    let fila;


                    if ($("#tabla").val() === "info") {
                        id = $("#productos tbody tr").length;
                        pre = "info";
                    }
                    else {
                        id = $("#prodlist tbody tr").length;
                        pre = "list";
                    }

                    fila = '<tr id="f' + pre + id + '">' + '<td id= "n' + pre + id + '" style="display: none">' + $("#nomp option:selected").val() + '</td> ' +
                        '<td class="text-right">' + $("#nomp option:selected").attr("codigo") + '</td>' +
                        '<td class="text-left" > ' + $("#nomp option:selected").html() + '</td > ' +
                        '<td class="text-center" um="' + $("#ump").val() + '">' + $("#ump option:selected").text() + '</td>' +
                        '<td class="text-right">' + formatoMoneda($("#cantp").val().replace(/,/g, ''), 2, true) + '</td>' +
                        '<td class="text-right">' + formatoMoneda($("#prep").val().replace(/,/g, ''), 2, true) + '</td>' +
                        '<td class="text-right">' + $("#subp").val() + '</td>' +
                        '<td class="text-right">' + $("#ivg option:selected").text() + '</td>' +
                        '<td class="text-right">' + $("#impp").val() + '</td>' +
                        '<td class="text-center"><i id="e' + pre + id + '" class="fa fa-edit" title="Edita producto"></i>&nbsp;&nbsp;<i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

                    if ($("#tabla").val() === "info") {
                        $("#productos tbody").append(fila);
                        fila = $("#productos tr:last");

                        if ($("#cov").prop("checked"))
                            comisionMonto();

                        if ($("#cop").prop("checked"))
                            comisionPorcentaje();
                    }
                    else {
                        $("#prodlist tbody").append(fila);
                        fila = $("#prodlist tr:last");
                    }



                    $(fila).css({ "cursor": "pointer" });
                    $("#e" + pre + id).on("click", function () {
                        var result = [];
                        var i = 0;

                        $("#prodse").modal({ backdrop: 'static', keyboard: false });
                        limpiaControles('prodse');
                        $(this).closest('td').siblings().each(function () {
                            // obtenemos el texto del td 
                            if (i === 3) {
                                result[i] = $(this).attr("um");
                            } else {
                                result[i] = $(this).text();
                            }
                            ++i;
                        });
                        $("#tdid").val("#f" + pre + id);
                        $("#idproe").val(result[0]);
                        $("#codpe").val(result[1]);
                        $("#nompe").val(result[0]);
                        $("#nompe").trigger("change");
                        $("#cantpe").val(result[4]);
                        $("#prepe").val(result[5]);
                        $("#subpe").val(result[6]);
                        if (result[7] === "0%") {
                            $("#ivge").val(0);
                            $("#ivge").trigger("change");
                        } else {
                            $("#ivge").val(result[7].replace(/%/g, ''));
                            $("#ivge").trigger("change");
                        }
                        $("#imppe").val(result[8]);
                        $("#umpe").val(result[3]);
                        $("#umpe").trigger("change");

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

                                if ($("#cop").prop("checked"))
                                    comisionPorcentaje();

                                if ($("#cov").prop("checked"))
                                    comisionMonto();
                            }
                        })
                    });


                    cargaServicio();
                    $("#filtroProductoPL").val("");
                    $("#ump").val("");
                    $("#ump").trigger("change");
                    $("#cantp").val("");
                    $("#prep").val("");
                    $("#subp").val("");
                    $("#impp").val("");
                    $("#nomp").val("").focus();
                    $("#nomp").trigger("change");

                    calculaTotales();
                }
            } else {
                Alerta("El código o el Nombre del Servicio no corresponden a un servicio dado de alta dentro del mantenimiento, debe dar de alta el Servicio", "ERROR!");
            }
        });

        $("#agrpe").on("click", function () {
            // if (valForm("prodse")) {
            var rowid = $("#tdid").val();
            $($('#productos').find('tr[' + 1 + ']')).children('td:eq(2)').text($("#codpe").val());
            $(rowid).find('td').eq('0').html($("#nompe option:selected").val());
            $(rowid).find('td').eq('1').html($("#nompe option:selected").attr("codigo"));
            $(rowid).find('td').eq('2').html($("#nompe option:selected").text().trim());
            $(rowid).find('td').eq('3').html($("#umpe option:selected").text());
            $(rowid).find('td').eq('3').attr("um", $("#umpe").val());
            $(rowid).find('td').eq('4').html(formatoMoneda($("#cantpe").val().replace(/,/g, ''), 2, true));
            $(rowid).find('td').eq('5').html(formatoMoneda($("#prepe").val().replace(/,/g, ''), 2, true));
            $(rowid).find('td').eq('6').html($("#subpe").val());
            $(rowid).find('td').eq('7').html($("#ivge option:selected").text());
            $(rowid).find('td').eq('8').html($("#imppe").val());

            $("#umpe").val("");
            $("#umpe").trigger("change");
            $("#cantpe").val("");
            $("#prepe").val("");
            $("#subpe").val("");
            $("#imppe").val("");
            $("#nompe").val("").focus();
            $("#nompe").trigger("change");
            calculaTotales();
            $("#prodse").modal("toggle");

            //}
        });
        $("#canpe").on("click", function () {
            $("#prodse").modal("toggle");
            cargaServicio();
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
        $('#filtroProductoEditar').on("keyup", function () {
            let filtro = $('#filtroProductoEditar').val();
            let _this = this;
            let validador = 0;
            let contador = 0;

            $('#nompe option').each(function () {
                let nombreProducto = $(this).text().toUpperCase();
                let codigoProducto = $(this).attr("codigo");

                if (nombreProducto.indexOf(filtro.toUpperCase()) !== -1 || codigoProducto.indexOf(filtro) !== -1) {

                    $(this).show();
                    if (validador === 0) {
                        $(this).attr("selected", true);
                        $('#nompe').val($(this).val());
                        validador++;
                    } else {
                        $(this).attr("selected", false);
                    }
                } else {
                    $(this).attr("selected", false);
                    $(this).hide();
                    contador++;
                    if ($(this).attr("style") == "display: none;" && contador == $('#nompe option').length) {
                        $('#nompe').val('');
                    }
                }
                if (filtro == '') {
                    //SELECCIONAR EL PRIMERO
                    $(this).show();
                    $('#nompe option:first-child').attr("selected", true);
                }
            });
        });

        $("#bruc").on("click", function () {
            if ($("#ruc").val() !== "") {
                buscaProveedor();
            }
            else {
                Alerta("Debe especificar un RUC a buscar", "AVISO!");
            }
        });
        $("#nue").on("click", function () {
            $("#act").hide();
            $("#gua").show();
            $("#gram").text("");
            $("#ivgm").text("");
            $("#desm").text("");
            $("#tot").text("");
            $("#productos tbody").empty();
            $("#StableImp tbody").empty();
            nuevaCompra(0);
            //getCorrelativo();
        });
        $("#can").on("click", function () {
            $("#dtitle").show();
            $("#lista").show();
            $("#info").hide();
        });
        $("#prep").on("change", function () {
            importeProducto();
        });
        $("#cantp").on("change", function () {
            importeProducto();
        });
        $('#ivg').change(function () {
            importeProducto();
        });
        $(".totales").on("change", function () {
            calculaTotales();
        });

        $("#des").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#ruc").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#prep").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#cantp").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        //$('#nomp').change(function () {
        //    cargaServicios($('#nomp').val());
        //});
        //$('#nomp').blur(function () {
        //    cargaServiciodes($('#nomp').val());
        //});
        $('#ivge').change(function () {
            importeProductoe();
        });
        $('#nompe').change(function () {
            cargaServiciose($('#nompe').val());
        });
        $("#cantpe").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#prepe").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#prepe").on("change", function () {
            importeProductoe();
        });
        $("#cantpe").on("change", function () {
            importeProductoe();
        });

        $("#nprov").on("click", function () {
            limpiaControles("proveedor");
            $("#proveedor").modal({ backdrop: 'static', keyboard: false });
        });
        $("#guaprov").on("click", function () {
            if (valForm("proveedor")) {
                guardaProv();
            }
        });
        $("#canprov").on("click", function () {
            $("#proveedor").modal("toggle");
        });
        $("#agre").on("click", function () {


            let ven = $("#vent").val();
            $("#ventas tbody").children("tr").each(function () {
                let vent = $($(this).children("td")[0]).text();
                if (ven == vent) {
                    ven = 1;
                }
            });
            if (ven == 1) {
                Alerta("La venta ya está agregada.", "AVISO!");
            } else {

                if (valForm("datos")) {
                    let id;
                    let pre;
                    let fila;

                    id = $("#ventas tbody tr").length;
                    pre = "info";


                    fila = '<tr id="f' + pre + id + '">' + '<td class="text-left" style="display: none">' + $("#vent").val() + '</td>' +
                        '<td class="text-left" id="s' + id + '">' + $('#vent option:selected').text().trim() + '</td>' + "<td class='text-center' id='t" + id + "'>" + "<i class='fa fa-trash text-danger' title='Eliminar venta'></i></td></tr > " + '</tr>';


                    $("#ventas tbody").append(fila);
                    fila = $("#ventas tr:last");
                    //$('#vent option:selected').remove();

                    $(fila).css({ "cursor": "pointer" });
                    $("#t" + id).on("click", function () {
                        Swal.fire({
                            title: 'Confirmación',
                            html: '¿Confirma que desea eliminar la venta N°<b>' + $("#s" + id).text() + '</b>?',
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
                    }
       }
        });
        //Nuevo servicio
        //Nuevo servicio
        $("#guans").on("click", function () {
            if (valForm("forma")) {
                GuardarNS();
                $('#filtroProductoPL').val("");
            }
        });
        $("#canns").on("click", function () {
            $("#nom").val("");
            $("#cod").val("");
            $("#um").val("");
            $("#um").trigger("change");
            $("#status").val("");
            cargaServicio()
            $("#can").hide();
            $("#id").val("");
            limpiaControles('nservicio');
            $('#filtroProductoPL').val("");
            $("#nservicio").modal("toggle");

        });
        $("#braz").on("click", function () {
            buscaProveedorazs($("#raz").val());
        });
        $('#raz').change(function () {
            let idprov = $("#raz option:selected").attr("idProveedor")
            if (typeof idprov == 'undefined') return;
            if (idprov != "") buscaProveedorazid(idprov);
        });
        $('#nservicio').on('hidden.bs.modal', function (e) {
            $('body').addClass('modal-open');
        });
        $("#canv").on("click", function () {
            $("#dtitle").show();
            $("#dtitleoc").show();
            $("#lista").show();
            $("#listaoc").show();
            $("#infov").hide();
            limpiaControles('infov');
        });
        /*agregado filtro por año importaciones*/
        $("#SfiltroAnio").on('keyup', function () {
            console.log("ssss");
            cargaImp($(this).val());
            $("#timp").removeAttr("disabled");

            if ($(this).val() == '') {

                cargaImp("%");
            }
        });
        /*asignacion*/
        $("#SagregaImp").on("click", function () {
            let porcentaje = 0;
            if ($("#Sasignacion").val() == "" || $("#timp option:selected").attr("imporS") == undefined) {

                Alerta("Selecciona una importación o ingresa la asignación que le corresponde", "AVISO!");
            } else if ($("#Sasignacion").val() < 1 || $("#Sasignacion").val() > 100) {
                Alerta("El porcentaje a ingresar debe estar entre 1 y 100", "AVISO!");
            } else {
                let importe2 = 0;
                $("#StableImp tbody").children("tr").each(function () {
                    let asig = $($(this).children("td")[3]).text();
                    importe2 += Number(asig);
                    console.log("aa" + asig);
                });

                porcentaje = importe2 + Number($("#Sasignacion").val());
                console.log("porc" + porcentaje);

                /*para verificar si ya está agregado en la tabla esa importacion*/
                let imp = $("#timp").val();
                $("#StableImp tbody").children("tr").each(function () {
                    let im = $($(this).children("td")[0]).text();
                    if (imp == im) {
                        imp = 1;
                    }
                });
                if (imp == 1) {
                    Alerta("Ya está agregada la importación", "AVISO!");
                } else if (porcentaje > 100) {
                    Alerta("No puede agregar la importación. El total de las asignaciones no debe sobrepasar el 100%.", "AVISO!");
                } else {
                    agreegarImpTable();

                    $("#Sasignacion").val("");
                }
            }
        });
        $("#SfiltroAnioVent").on("keyup", function () {
            cargaVent($(this).val(), $("#SfiltroMesVent").val());
        });

        $("#SfiltroMesVent").on("keyup", function () {
            cargaVent($("#SfiltroAnioVent").val(), $(this).val());
    });

        function agreegarImpTable() {

            let fila = "";
            let impor = $("#timp option:selected").attr("imporS");
            let id = $("#StableImp tbody tr").length;
            let asig = $("#Sasignacion").val();
            let t = $("#tot").text().replace("USD", "").replace("S/.", "").replace(",", "");
            let monto = 0.00;
            if (t < 1) {
                monto = 0;
            } else {
                monto = (parseFloat(t.toString()) / 100) * parseInt(asig);
            }

            fila = "<tr id='fila" + id + "'>" +
                "<td class='d-none'>" + $("#timp option:selected").attr("numeroregistro") + "</td>" +
                "<td class='text-center' id='n" + id + "'>" + impor + "</td>" +
                "<td class='text-center d-none'>" + $("#timp option:selected").attr("total") + "</td>" +
                "<td class='text-center'>" + asig + "</td>" +
                "<td class='text-center'>" + formatoMoneda(monto, 2, true) + "</td>" +
                "<td class='text-center' id='e" + id + "'>" + "<i class='fa fa-trash text-danger' title='Eliminar Importacion'></i></td></tr > ";
            $("#StableImp tbody").append(fila);
            $("#e" + id).on("click", function () {
                Swal.fire({
                    title: 'Confirmación',
                    html: '¿Confirma que desea eliminar la importación N°<b>' + $("#n" + id).text() + '</b>?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#1cc88a',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Si, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        $("#fila" + id).remove();

                    }
                });
            });
        };


    });
})(jQuery);