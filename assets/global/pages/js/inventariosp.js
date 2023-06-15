
let tipoReporte = "";
$(document).ready(function () {

    $.when(cargaAlmacenes())
        .then(() => {
            $('#alm').on('change', function () {
                cargaInventP();
            });
            $('#selalmtrasO').on('change', function () {
                cargaInventT();
            });
            $('#selalmsal').on('change', function () {
                cargaInventS();
            });
        });
    cargaImp();
    BuscarEnable();
    
    $('.select2').each(function () {
        $(this).select2({
            width: '100%'
        });
    });

    var vc = Cookies.get('vacos');

    $("#info tbody ").on("click", "i", function () {
        var prodid = $(this).attr("pid");
        var i = $(this).attr("iid");
        var conceptoid = $(this).attr("fid");
        var almid = $(this).attr("alid");
        var fila = $("#fila-" + conceptoid);
        if (fila.css("display") === "none") {
            fila.css("display", "table-row");
            $(this).attr("class", "fas fa-minus-circle");
            //let r = cargaRegInvProd(i, prodid,almid);

        } else {
            fila.css("display", "none");
            $(this).attr("class", "fas fa-plus-circle");
        }
    });

    $("#tcierreinv tbody ").on("click", "i", function () {
        var idprod = $(this).attr("pid");
        var stockac = $(this).attr("stockact");
        var idalm = $(this).attr("idalm");

        creaAjuste(idprod, stockac, idalm);

    });

    if (vc === 'true') {
        $("#chkcosto").show();
    } else {
        $("#chkcosto").hide();
    }

    $("#viscosto").on("click", function () {
        if ($(this).prop("checked")) {
            $('#info tr td:nth-child(6), #info th:nth-child(6)').show();
            $('#info tr td:nth-child(7), #info th:nth-child(7)').show();
            $('#info tr td:nth-child(8), #info th:nth-child(8)').show();

        }
        else {
            $('#info tr td:nth-child(6), #info th:nth-child(6)').hide();
            $('#info tr td:nth-child(7), #info th:nth-child(7)').hide();
            $('#info tr td:nth-child(8), #info th:nth-child(8)').hide();

        }
    });

    //Filtro
    $('#filtroProducto').on("keyup", function () {
        let filtro = $('#filtroProducto').val();
        let _this = this;
        let validador = 0;
        let contador = 0;
        $('#selprosal option').each(function () {
            let nombreProducto = $(this).text().toUpperCase();
            let codigoProducto = $(this).attr("codigo");

            if (nombreProducto.indexOf(filtro.toUpperCase()) !== -1 || codigoProducto.indexOf(filtro) !== -1) {
                $(this).show();
                if (validador === 0) {
                    $(this).attr("selected", true);
                    $('#selprosal').val($(this).val());
                    traeInv('selprosal', 'txtinvActSal');
                    validador++;
                } else {
                    $(this).attr("selected", false);
                }
            } else {
                $(this).attr("selected", false);
                $(this).hide();
                contador++;
                if ($(this).attr("style") == "display: none;" && contador == $('#selprosal option').length) {
                    $('#selprosal').val('');
                }
            }
            if (filtro == '') {
                //SELECCIONAR EL PRIMERO
                $(this).show();
                $('#selprosal option:first-child').attr("selected", true);
            }
        });
    });

    $('#filtroProductoA').on("keyup", function () {
        let filtro = $('#filtroProductoA').val();
        let _this = this;
        let validador = 0;
        let contador = 0;
        $('#cinvprodocpac option').each(function () {
            let nombreProducto = $(this).text().toUpperCase();
            let codigoProducto = $(this).attr("codigo");

            if (nombreProducto.indexOf(filtro.toUpperCase()) !== -1 || codigoProducto.indexOf(filtro) !== -1) {
                $(this).show();
                if (validador === 0) {
                    $(this).attr("selected", true);
                    $('#cinvprodocpac').val($(this).val());
                    validador++;
                } else {
                    $(this).attr("selected", false);
                }
            } else {
                $(this).attr("selected", false);
                $(this).hide();
                contador++;
                if ($(this).attr("style") == "display: none;" && contador == $('#cinvprodocpac option').length) {
                    $('#cinvprodocpac').val('');
                }
            }
            if (filtro == '') {
                //SELECCIONAR EL PRIMERO
                $(this).show();
                $('#selprosal option:first-child').attr("selected", true);
            }
        });
    });

    $("#cansal").on("click", function () {
        limpiaControles("salidasModal");
        $("#salidasModal").modal("toggle");
    });

    $("#cantras").on("click", function () {
        limpiaControles("trasladosModal");
        $("#trasladosModal").modal("toggle");
    });
    //Cierre inventario
    $('#cinvfec').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });

    $('#cinvtpooper').change(function () {
        if ($(this).val() === "1") {
            $("#cinvocpac").prop("disabled", true);
            $("#cinvprodocpac").prop("disabled", true);
            $("#filtroProductoA").prop("disabled", true);
            $("#cinvocpac").val("");
            $("#cinvprodocpac").val("");
            $("#filtroProductoA").val("");
        }
        else if ($(this).val() === "2") {
            $("#cinvocpac").prop("disabled", true);
            $("#cinvprodocpac").prop("disabled", true);
            $("#filtroProductoA").prop("disabled", true);
            $("#filtroProductoA").val("");

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

    $("#btExportar").on("click", function () {
        if (tipoReporte == "excel") exportarExcelResumen();
        if (tipoReporte == "pdf") exportarPDFResumen();
    });

    $("#btCerrar").on("click", function () {
        limpiaControles("ModalDetParams");
        $("#ModalDetParams").modal("toggle");
    });

});

function nuevo() {

    $("#lproent tbody").html("");
    limpiaPantalla();
    $("#lista").hide();
    $("#forma").show();

    cargaImp();
}
function cerrar() {
    $("#forma").hide();
    $("#lista").show();
    cargaInvent('P');
}
function limpiaPantalla() {
    limpiaControles("forma");
    $("#almeent").prop("selectedIndex", 0);
    $("#info tbody").empty();
    $("#id").val("");
}
function cargaImp() {
    var tipo = "OC";
    get('/ws/inventarios.aspx/listarOCPack', JSON.stringify({ tipo: tipo }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var opt = "<option value='0' data-inv='0' data-sal='0'>Selecciona...</option>";
                $("#seloc").html("");
                $(res).each(function () {
                    opt += "<option value='" + this.id + "'>" + this.txt + "</option>";
                });
                $("#seloc").html(opt);
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de registros<br />" + error, "ERROR!");
        });
}
function cargaImpDisminuir() {
    var tipo = "OC";
    var idProducto = $("#selprosal").val();
    get('/ws/inventarios.aspx/listarOCPackDisminuir', JSON.stringify({ tipo: tipo, idProducto: idProducto }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                var opt = "<option value='0' data-inv='0' data-sal='0'>Selecciona...</option>";
                $("#selocdisminuir").html("");
                $(res).each(function () {
                    //opt += "<option value='" + this.id + "'>" + this.txt + "</option>";
                    if (this.ID_PRODUCTO == idProducto) {
                        opt += "<option value='" + this.ID_REGISTRO + "'>#" + this.NUMERO + "</option>";
                    }
                });
                $("#selocdisminuir").html(opt);
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de registros<br />" + error, "ERROR!");
        });
}
function getPackingDet() {
    /*get('/ws/inventarios.aspx/ListaProd', "")
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                ConsultaPack($("#seloc").val(),res);
            }
        })
        .catch(function (error) {
            Alerta("No fue posible editar el registro<br />" + error, "ERROR!");
        })*/
    ConsultaPack($("#seloc").val());
}
//function ConsultaPack(id,productos) {
function ConsultaPack(id) {
    if ($("#almeent").val() !== "0" && $("#almeent").val() !== null) {
        get('/ws/inventarios.aspx/Consultar', JSON.stringify({ id: id, idAlmacen: $("#almeent").val() }))
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
                    $(res).each(function () {
                        var Entradas = parseFloat(this.Entradas);
                        var Salidas = parseFloat(this.Salidas);
                        var Sumas = parseFloat(this.CANTIDAD);

                        fila = '<tr><td style="display:none;">' + this.ID_PRODUCTO + '</td>' +
                            '<td>' + this.CODIGO + '</td>' +
                            '<td class="text-center">' + this.DESCRIPCION + '</td>' +
                            '<td class="text-right">' + this.UNIDAD_MEDIDA + '</td>' +
                            '<td class="text-right" id="tdcant' + this.ORDEN + '">' + formatoMoneda(this.CANTIDAD, 2, true) + '</td>' +
                            '<td class="text-right">' + formatoMoneda(this.PRECIO, 2, true) + '</td>' +
                            '<td class="text-right" id="tdact' + this.ORDEN + '">' + (Entradas - Salidas) + '</td>' +
                            '<td class="text-right" id="tdnew' + this.ORDEN + '">' + ((Entradas - Salidas) + Sumas) + '</td>' +
                            '<td style="display:none;">' + this.SUB_TOTAL + '</td>' +
                            '<td style="display:none;">' + this.IVG + '</td>' +
                            '<td style="display:none;">' + this.TOTAL + '</td>' +
                            '</tr > ';

                        $("#lproent tbody").append(fila);

                        fila = $("#lproent tr:last");
                        $(fila).css({ "cursor": "pointer" });
                    });
                }
            })
            .catch(function (error) {
                Alerta("No fue posible editar el registro<br />" + error, "ERROR!");
            });
    }
    //else {
    //    Alerta("Tienes que seleccionar un almacen antes de continuar", "ERROR!");
    //}

}
function selProducto(id) {
    var ent = parseFloat($('#sel' + id + ' option:selected').attr('data-inv'));
    var sal = parseFloat($('#sel' + id + ' option:selected').attr('data-sal'));
    var cant = parseFloat($("#tdcant" + id).html());
    $("#tdact" + id).html(ent - sal);
    $("#tdnew" + id).html((ent - sal) + cant);
}
function cargaAlmacenes() {
    let iduser = Cookies.get('idu');
    get('/ws/almacenes.aspx/ConsultarXUsuario', JSON.stringify({ idu: iduser }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    var html = "";
                    $("#alm").html("");
                    $("#almeent").html("");
                    $("#selalmsal").html("");
                    $("#selalmtrasD").html("");
                    $("#selalmtrasO").html("");
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
                    $("#almeent").html(html);
                    //$("#selalmsal").html('<option value="0">Todos</option>'+html);
                    //$("#alm").html('<option selected value="0">Todos</option>'+html);
                    $("#selalmsal").html(html);
                    $("#alm").html(html);
                    $("#selalmtrasD").html(html);
                    $("#selalmtrasO").html(html);
                    $("#cinvalm").html(html);

                    //     $("#alm").trigger('change');
                    $("#almeent").trigger('change');
                    $("#selalmsal").trigger('change');
                    $("#selalmtrasD").trigger('change');
                    $("#selalmtrasO").trigger('change');
                    $("#cinvalm").trigger('change');
                }
                $.when(cargaInventP()).then(cargaInventS()).then(cargaInventT());

            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
        })
}
function cargaOrdenes() {
    let param = new Object();
    var alm = $("#alm").val();
    if (alm === null) {
        alm = 0;
    }
    param.where = fil;
    var data = {
        class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
        columnas: [
            { leyenda: 'ID', class: 'text-center', ordenable: false, columna: 'CODIGO_PRODUCTO', filtro: true },
            { leyenda: 'Producto/Servicio', class: 'text-center', style: 'white-space:nowrap', ordenable: false, columna: 'PRODUCTO', filtro: true },
            { leyenda: 'Unidad', class: 'text-center', ordenable: true, columna: 'UM', filtro: true },
            { leyenda: 'Costo', class: 'text-center', style: 'width:1%', ordenable: true, columna: 'costo', filtro: true },
            { leyenda: 'Precio Venta', class: 'text-center', style: 'width:1%', ordenable: true, columna: 'preciovta', filtro: true },
            { leyenda: 'Stock', class: 'text-center', style: 'width:1%', ordenable: false, columna: 'inv', filtro: true },
            { leyenda: 'Acción', class: 'text-center', style: 'width:1%', ordenable: false, columna: '', filtro: true }
        ],
        modelo: [
        ],
        url: '/ws/inventarios.aspx/listarInv',
        parametros: JSON.stringify({ idAlmacen: alm }),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'CODIGO_PRODUCTO',
        loader: "pre0",
        columna_orden: 'PRODUCTO'
    };

    $("#ordenes").MALCO(data);
}
function cargaInventP() {
    var alm = $("#alm").val();
    if (alm == 0 || alm == null) return;
    var opt = "#tinfobody";
    if (alm === null) {
        alm = 0;
    }
    get('/ws/inventarios.aspx/listarInv', JSON.stringify({ idAlmacen: alm }))
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
                var html = "";
                $(opt).html("");
                var i = 1;
                $(res).each(function () {
                    if (this.tipo == "cab") {
                        html += "<tr style='background-color: #578EBE !important; color:#F8F9FC !important;' id='trinv' ptd='" + i + "' almid='" + this.ID_ALMACEN + "'>";
                    } else {
                        html += "<tr id='trinv' ptd='" + i + "' almid='" + this.ID_ALMACEN + "'>";
                    }
                    // html += "<tr id='trinv' ptd='" + i + "' almid='" + this.ID_ALMACEN + "'>";
                    html += "<td style='display: none'>" + this.ID_PRODUCTO + "</td>";
                    html += "<td>" + this.CODIGO_PRODUCTO + "</td>";
                    html += "<td>" + this.PRODUCTO + "</td>";
                    html += "<td>" + this.UM + "</td>";
                    html += "<td>" + this.fechaing + "</td>";
                    html += "<td>" + formatoMoneda(this.costomoneda, 2, true) + "</td>";
                    html += "<td>" + formatoMoneda(this.costo, 2, true) + "</td>";
                    html += "<td>" + formatoMoneda(this.preciovta, 2, true) + "</td>";
                    html += "<td>" + this.diasantig + "</td>";
                    html += "<td></td>";
                    html += "<td>" + this.devolucion + "</td>";
                    html += "<td>" + this.inv + "</td>";
                    html += "<td>" + this.cantreserv + "</td>";
                    html += "<td>" + this.cantdisp + "</td>";
                    html += "</tr>";
                    i++;
                    //}
                });
                limpiaSalidas();
                limpiaTraslados();
                $(opt).html(html);
                //recorregridprin();
            }

            $('#info tr td:nth-child(7), #info th:nth-child(7)').hide();
            $('#info tr td:nth-child(8),#info th:nth-child(8)').hide();
            $('#info tr td:nth-child(9),#info th:nth-child(9)').hide();

        })
        .catch(function (error) {
            Alerta("No fue posible cargar el inventario<br />" + error, "ERROR!");
        });

}
function cargaInventT() {
    alm = $("#selalmtrasO").val();
    opt = "#selprotras";
    limpiaTraslados();
    if (alm === null) {
        alm = 0;
    }
    get('/ws/inventarios.aspx/listarInv', JSON.stringify({ idAlmacen: alm }))
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
                $(opt).html("");
                html = "<option codigo ='0' value='0'>Selecciona..</option>";
                $(res).each(function () {
                    if (this.CODIGO_PRODUCTO != "ESPECIE:") {
                        if (this.CODIGO_PRODUCTO != "VARIEDAD:") {
                            html += "<option codigo ='" + this.CODIGO_PRODUCTO + "' value='" + this.ID_PRODUCTO + "' data-cod='" + this.CODIGO_PRODUCTO + "' data-inv='" + this.inv + "' data-um='" + this.UM + "'>" + this.PRODUCTO + "</option>";
                        }
                    }
                });
                limpiaSalidas();
                limpiaTraslados();
                $(opt).html(html);
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
        });
}
function cargaInventS() {
    alm = $("#selalmsal").val();
    opt = "#selprosal";
    limpiaSalidas();
    if (alm === null) {
        alm = 0;
    }
    get('/ws/inventarios.aspx/listarInv', JSON.stringify({ idAlmacen: alm }))
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
                $(opt).html("");
                html = "<option codigo ='0' value='0'>Selecciona..</option>";
                $(res).each(function () {
                    if (this.CODIGO_PRODUCTO != "ESPECIE:") {
                        if (this.CODIGO_PRODUCTO != "VARIEDAD:") {
                            html += "<option codigo ='" + this.CODIGO_PRODUCTO + "' value='" + this.ID_PRODUCTO + "' data-cod='" + this.CODIGO_PRODUCTO + "' data-inv='" + this.inv + "' data-um='" + this.UM + "'>" + this.PRODUCTO + "</option>";
                        }
                    }
                });
                limpiaSalidas();
                limpiaTraslados();
                $(opt).html(html);
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el inventario<br />" + error, "ERROR!");
        });
}
function creaInv() {
    if ($("#seloc").val() !== "0") {
        if ($("#almeent").val() !== "0") {
            var prods = ListaProd();

            if (prods !== "ERR1") {
                var jsonInv = {
                    idOcSer: $("#seloc").val(),
                    idAlmacen: $("#almeent").val(),
                    Observacon: $("#txtobs").val(),
                    Tipo: "OC"
                };
                Swal.fire({
                    title: 'Confirmación',
                    html: 'Se actualizará el stock',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#1cc88a',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Guardar',
                    cancelButtonText: 'Cancelar',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        return fetch(`/ws/inventarios.aspx/CrearInv`, {
                            method: 'POST', body: JSON.stringify({ jsonCab: JSON.stringify(jsonInv), JsonDet: prods }), headers: { 'Content-Type': 'application/json' }
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
                    })
                    if (resp === "OK") {
                        Alerta("El registro se insertó correctamente");
                        cargaInvent('P');
                        cerrar();
                    } else {
                        Alerta(resp, "Error!", typIconoAlerta.error);
                    }
                })
            } else {
                Alerta("Tienes que seleccionar un producto por cada registro", "ERROR!");
            }
        } else {
            Alerta("Tienes que seleccionar el almacen antes de continuar", "ERROR!");
        }
    } else {
        Alerta("Tienes que seleccionar una OC antes de continuar", "ERROR!");
    }
}
function ListaProd() {
    var jsondet = [];
    $("#lproent tbody").children("tr").each(function (index) {
        var prod, cant, precio, um, subt, ivg, tot;
        $(this).children("td").each(function (ind) {
            switch (ind) {
                case 0:
                    //var selp = $(this).find('select');
                    prod = $(this).html();//selp.val();
                    break;
                case 3:
                    um = $(this).html();
                    break;
                case 4:
                    cant = $(this).html();
                    break;
                case 5:
                    precio = $(this).html();
                    break;
                case 8:
                    subt = $(this).html();
                    break;
                case 9:
                    ivg = $(this).html();
                    break;
                case 10:
                    tot = $(this).html();
                    break;
            }
        });
        if (prod !== "0") {
            var json = {
                ID_PRODUCTO: prod,
                CantidadIngres: cant,
                Precio: precio,
                UM: um,
                SubTotal: subt,
                IVG: ivg,
                Total: tot
            };
            jsondet.push(json);
        } else {
            return "ERR1";
        }
    });
    return JSON.stringify(jsondet);
}
async function recorregridprin() {
    var j = 1;
    $.each($("#info tbody tr"), async function () {
        var i = $(this).attr("ptd");
        if (typeof i !== typeof undefined) {
            var prodid = this.cells[0].innerText;
            var almid = $(this).attr("almid");
            let r = cargaRegInvProd(i, prodid, almid);
            j++;
        }
    });
}
function cargaRegInvProd(j, idprod, almid) {
    var resp = false;
    var opt = "#tdetbody" + j;

    get('/ws/inventarios.aspx/listarRegInvProd', JSON.stringify({ idProducto: idprod, idAlmacen: almid }))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"Error":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                $(opt).html("");

                $(res).each(function () {

                    var html = "";
                    html += "<tr>";
                    html += "<td>" + this.PRODUCTO + "</td>";
                    html += "<td>" + this.UM + "</td>";
                    html += "<td>" + formatoMoneda(this.costo, 2, true) + "</td>";
                    html += "<td>" + formatoMoneda(this.preciovta, 2, true) + "</td>";
                    html += "<td>" + this.inv + "</td>";

                    html += "</tr>";

                    $(opt).html(html);
                    resp = true;
                });
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de detalle<br />" + error, "ERROR!");
        });
    return resp;
}

//Salidas
function limpiaSalidas() {
    $("#txtinvActSal").val("0");
    $("#txtcantsale").val("0");
    $("#txtobssale").val("");
}
function generaSalida() {
    var invAct = $("#txtinvActSal").val();
    var invSale = $("#txtcantsale").val();
    var obs = $("#txtobssale").val();
    var almacen = $("#selalmsal").val();
    var producto = $("#selprosal").val();
    var oc = $("#selocdisminuir").val();
    if (invAct !== "0") {
        if (invSale !== "") {
            if (almacen !== null && almacen !== "0") {
                if (producto !== "" & producto !== null) {
                    invAct = parseFloat(invAct);
                    invSale = parseFloat(invSale);
                    if (invSale <= invAct) {
                        var json = {
                            idProducto: producto,
                            idAlmacen: almacen,
                            Cantidad: invSale,
                            Tipo: 'Salida',
                            Obs: obs,
                            idOC: oc
                        };
                        Swal.fire({
                            title: 'Confirmación',
                            html: '¿Disminuir inventario?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#1cc88a',
                            cancelButtonColor: '#6c757d',
                            confirmButtonText: 'Guardar',
                            cancelButtonText: 'Cancelar',
                            showLoaderOnConfirm: true,
                            preConfirm: () => {
                                return fetch(`/ws/inventarios.aspx/DisminuirInv`, {
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
                            })
                            if (resp === '"OK"') {
                                cargaInvent('P');
                                Alerta("Inventario disminuido correctamente");
                            } else {
                                Alerta(resp, "Error!", typIconoAlerta.error);
                            }
                        });
                    } else {
                        Alerta("La cantidad a disminuir no puede ser menor al inventario actual", "Error!", typIconoAlerta.error);
                    }
                } else {
                    Alerta("Tienes que seleccionar el producto antes de continuar", "Error!", typIconoAlerta.error);
                }
            } else {
                Alerta("Tienes que seleccionar el almacen antes de continurar", "Error!", typIconoAlerta.error);
            }
        } else {
            Alerta("Captura la cantidad antes de continuar", "Error!", typIconoAlerta.error);
        }
    } else {
        Alerta("El producto no tiene inventario", "Error!", typIconoAlerta.error);
    }

}

//Traslados
function traeInv(idSel, idtxt) {
    $("#" + idtxt).val($('#' + idSel + ' option:selected').attr('data-inv'));
    var um = $('#selprotras option:selected').attr('data-um');
    $("#umtras").html(um);
}
function traeImp(idSel, idtxt) {
    traeInv(idSel, idtxt);

    /* TODO Traer las importaciones, cargar el select y agregar atributos para costo imp y cant disponible 
     * 
     */
    let param = new Object();
    param.prod = $("#selprotras").val();
    param.um = 5; //Caja
    param.alm = $("#selalmtrasO").val();
    if (param.prod === null) return;
    if (param.alm === null) return;
    cargaImportaciones(param);
}
function cargaImportaciones(fil = "") {
    var nameprod = "";
    let param = new Object();
    param.where = fil;
    let parametros = new Object();
    parametros.pagina = 1;
    parametros.limite = 0;
    parametros.info = JSON.stringify(param);
    $("#selimportacion").empty().append('<option value=""></option>');
    get('/ws/registros.aspx/listarImportaciones', JSON.stringify(parametros))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        let dato = 'tipo="' + this.TPO
                            + '" numero="' + this.NUMERO
                            + '" idprod="' + this.ID_PRODUCTO
                            + '" cod="' + this.CODIGO_PRODUCTO
                            + '" desc="' + this.DESCRIPCION
                            + '" cant="' + this.STOCKUM
                            + '" cost="' + this.PRECIO
                            + '';
                        $("#selimportacion").append('<option ' + dato + '" value="' + this.ID_REGISTRO + '">' + this.NUMERO + " - Fecha:" + this.FECHA.substring(0, 10) + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de importaciones<br />" + error, "ERROR!");
        });
}
function traeDetImp() {
    $("#txtcostoimp").val($("#selimportacion option:selected").attr("cost"));
    $("#txtcosto").val($("#selimportacion option:selected").attr("cost"));
    $("#txtcantdisp").val($("#selimportacion option:selected").attr("cant"));
}

function agregarProducto() {
    var um = $('#selprotras option:selected').attr('data-um');
    var numero = $('#selimportacion option:selected').attr('numero');
    var tipo = $('#selimportacion option:selected').attr('tipo');
    var idp = $('#selprotras').val();
    var descp = $('#selprotras option:selected').html();
    var cantTras = $("#txtcanttras").val();
    var invact = $("#txtinvacttras").val();
    if (invact !== "0") {
        if (cantTras !== "0") {
            cantTras = parseFloat(cantTras);
            invact = parseFloat(invact);
            if (invact >= cantTras) {
                var flag = "0";
                $("#lprotras tbody").children("tr").each(function (index) {
                    $(this).children("td").each(function (ind) {
                        switch (ind) {
                            case 0:
                                if (idp === $(this).html()) {
                                    flag = "1";
                                }
                                break;
                        }
                    });
                });
                if (flag === "0") {
                    var fila = "<tr id='tr" + idp + "'>" +
                        "<td style='display:none;'>" + idp + "</td>" +
                        "<td style='display:none;'>" + numero + "</td>" +
                        "<td style='display:none;'>" + tipo + "</td>" +
                        "<td>" + descp + "</td>" +
                        "<td>" + um + "</td>" +
                        "<td>" + cantTras + "</td>" +
                        "<td class='text-center'><label class='btn btn-danger btn-sm' onclick='eliminaProTras(\"tr" + idp + "\")'><span class='fa fa-trash'></span>'</label></td>" +
                        "</tr > ";
                    $("#tbtrasp").append(fila);
                } else {
                    Alerta("El producto " + descp + " ya se encuentra en la tabla, eliminalo y ajusta la cantidad", "Error!", typIconoAlerta.error);
                }
            } else {
                Alerta("No hay suficiente inventario para hacer este movimiento", "Error!", typIconoAlerta.error);
            }
        } else {
            Alerta("Captura la cantidad a traspasar antes de continuar", "Error!", typIconoAlerta.error);
        }
    } else {
        Alerta("El producto no tiene inventario", "Error!", typIconoAlerta.error);
    }
}
function eliminaProTras(id) {
    $("#" + id).remove();
}
function limpiaTraslados() {
    $("#txtnotatras").val("");
    $("#txtcanttras").val("0");
    $("#txtinvacttras").val("0");
    $("#tbtrasp").html("");
}
function traspasar() {
    var jsondet = setDetTraspaso();
    var almO = $("#selalmtrasO").val();
    var almD = $("#selalmtrasD").val();
    var nota = $("#txtnotatras").val();
    if (almO !== "0") {
        if (almD !== "0") {
            if (almO !== almD) {
                var json = {
                    idAlmacenO: almO,
                    idAlmacenD: almD,
                    Notas: nota
                };
                Swal.fire({
                    title: 'Confirmación',
                    html: '¿Disminuir inventario?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#1cc88a',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Guardar',
                    cancelButtonText: 'Cancelar',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        return fetch(`/ws/inventarios.aspx/TraspasarInv`, {
                            method: 'POST', body: JSON.stringify({ json: JSON.stringify(json), jsondet: jsondet }), headers: { 'Content-Type': 'application/json' }
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
                    })
                    if (resp === '"OK"') {
                        cargaInvent('P');
                        Alerta("Traspaso reailizado correctamente");
                        $("#trasladosModal").modal("hide");
                    } else {
                        Alerta(resp, "Error!", typIconoAlerta.error);
                    }
                });
            } else {
                Alerta("El almacen origen y destino no pueden ser igual", "Error!", typIconoAlerta.error);
            }
        } else {
            Alerta("Selecciona un almacen destino antes de continuar", "Error!", typIconoAlerta.error);
        }
    } else {
        Alerta("Selecciona un almacen origen antes de continuar", "Error!", typIconoAlerta.error);
    }
}
function setDetTraspaso() {
    var jsondet = [];
    $("#lprotras tbody").children("tr").each(function (index) {
        var idp, num, tipo, cant;
        $(this).children("td").each(function (ind) {
            switch (ind) {
                case 0:
                    idp = $(this).html();
                    break;
                case 1:
                    num = $(this).html();
                    break;
                case 2:
                    tipo = $(this).html();
                    break;
                case 5:
                    cant = $(this).html();
                    break;
            }
        });
        var fila = {
            idProducto: idp,
            Cantidad: cant,
            NumImp: num,
            Tipo: tipo
        };
        jsondet.push(fila);
    });
    return JSON.stringify(jsondet);
}
function BuscarEnable() {
    $("#filtrar").keyup(function () {
        var palabra = $(this).val();
        var filtro = ".*" + palabra.replace(/\s+/g, ".*") + ".*";
        console.log(filtro);
        var rex = new RegExp(filtro, 'i');
        $(".buscar tr").hide();
        $(".buscar tr").filter(function () {
            return rex.test($(this).text());
        }).show();
    });
}
function exportar(tipo) {
    var jsondet = [];
    var tpon = "";
    var i = 1;
    var verco = $("#viscosto").prop("checked") ? 1 : 0;

    $("#info tbody").children("tr").each(function (index) {
        if ($(this).find("#tdinvdet").length) {
            var filad = {
                Codigo: "",
                Producto: "Producto/Servicio",
                Unidad: "Unidad de Medida",
                Costo: "Costo Unitario",
                PVta: "Precio Venta",
                Stock: "Stock"
            };
            jsondet.push(filad);
            $("#DTInvDet" + i + " tbody").children("tr").each(function (index) {

                var Codd = "", Prodd, Unidadd, Costod, PVtad, Stockd;
                $("#DTInvDet" + i + " tbody").children("tr").children("td").each(function (ind) {

                    switch (ind) {
                        case 0:
                            Prodd = $(this).html();
                            break;
                        case 1:
                            Unidadd = $(this).html();
                            break;
                        case 2:
                            Costod = $(this).html();
                            break;
                        case 3:
                            PVtad = $(this).html();
                            break;
                        case 4:
                            Stockd = $(this).html();
                            break;
                    }
                });
                if (Prodd !== "") {
                    var filatd = {
                        Codigo: Codd,
                        Producto: Prodd,
                        Unidad: Unidadd,
                        Costo: Costod,
                        PVta: PVtad,
                        Stock: Stockd
                    };
                    jsondet.push(filatd);
                }
            });
            i++;

        }
        else {
            console.log("entra al else");
            var Cod = "", Prod, Unidad, CostoSol, Costo, PVta, Stock, fecing, diasantig, urgmov, cantreserv, cantdisp;
            if (verco === 0) {
                $(this).children("td").each(function (ind1) {
                    switch (ind1) {
                        case 1:
                            Cod = $(this).html();
                            break;
                        case 2:
                            Prod = $(this).html();
                            break;
                        case 3:
                            Unidad = $(this).html();
                            break;
                        case 4:
                            fecing = $(this).html();
                            break;
                        case 8:
                            diasantig = $(this).html();
                            break;
                        case 9:
                            urgmov = $(this).html();
                            break;
                        case 10:
                            Stock = $(this).html();
                            break;
                        case 11:
                            cantreserv = $(this).html();
                            break;
                        case 12:
                            cantdisp = $(this).html();
                            break;
                    }
                });
                if (Cod !== "") {
                    if (diasantig !== undefined) {
                        var fila = {
                            Codigo: Cod,
                            Producto: Prod,
                            Unidad: Unidad,
                            FechaIng: fecing,
                            DiasAntig: diasantig,
                            UrgMov: urgmov,
                            Stock: Stock,
                            CantReserv: cantreserv,
                            CantDisp: cantdisp
                        };
                        jsondet.push(fila);
                    }
                }
            } else if (verco === 1) {
                $(this).children("td").each(function (ind2) {
                    switch (ind2) {
                        case 1:
                            Cod = $(this).html();
                            break;
                        case 2:
                            Prod = $(this).html();
                            break;
                        case 3:
                            Unidad = $(this).html();
                            break;
                        case 4:
                            fecing = $(this).html();
                            break;
                        case 5:
                            CostoSol = $(this).html();
                            break;
                        case 6:
                            Costo = $(this).html();
                            break;
                        case 7:
                            PVta = $(this).html();
                            break;
                        case 8:
                            diasantig = $(this).html();
                            break;
                        case 9:
                            urgmov = $(this).html();
                            break;
                        case 10:
                            Stock = $(this).html();
                            break;
                        case 11:
                            cantreserv = $(this).html();
                            break;
                        case 12:
                            cantdisp = $(this).html();
                            break;
                    }
                });
                if (Cod !== "") {
                    if (diasantig !== undefined) {
                        var fila = {
                            Codigo: Cod,
                            Producto: Prod,
                            Unidad: Unidad,
                            FechaIng: fecing,
                            CostoSol: CostoSol,
                            Costo: Costo,
                            PVta: PVta,
                            DiasAntig: diasantig,
                            UrgMov: urgmov,
                            Stock: Stock,
                            CantReserv: cantreserv,
                            CantDisp: cantdisp
                        };
                        jsondet.push(fila);
                    }
                }
            }
        }
    });
    if (jsondet.length > 0) {
        var json = {
            json: JSON.stringify(jsondet),
            vista: tpon,
            vercos: verco
        };
        get('/ws/inventarios.aspx/ExportaExcelDet', JSON.stringify(json))
            .then(function (res) {
                //var r = JSON.stringify(res);
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
                Alerta("No fue posible cargar el reporte <br />" + error, "ERROR!");
            });
    } else {
        Alerta("No hay nada que exportar", "Error!", typIconoAlerta.aviso);
    }
}
function exportars() {
    tipoReporte = "excel";
    $("#panio").val((new Date).getFullYear().toString());
    $("#pmes").val("0");
    $("#ModalDetParams").modal("toggle");
}
function genpdf() {
    var jsondet = [];
    var tpon = "";
    var i = 1;
    var verco = $("#viscosto").prop("checked") ? 1 : 0;

    $("#info tbody").children("tr").each(function (index) {
        if ($(this).find("#tdinvdet").length) {
            var filad = {
                Codigo: "",
                Producto: "Producto/Servicio",
                Unidad: "Unidad de Medida",
                Costo: "Costo Unitario",
                PVta: "Precio Venta",
                Stock: "Stock"
            };
            jsondet.push(filad);
            $("#DTInvDet" + i + " tbody").children("tr").each(function (index) {

                var Codd = "", Prodd, Unidadd, Costod, PVtad, Stockd;
                $("#DTInvDet" + i + " tbody").children("tr").children("td").each(function (ind) {

                    switch (ind) {
                        case 0:
                            Prodd = $(this).html();
                            break;
                        case 1:
                            Unidadd = $(this).html();
                            break;
                        case 2:
                            Costod = $(this).html();
                            break;
                        case 3:
                            PVtad = $(this).html();
                            break;
                        case 4:
                            Stockd = $(this).html();
                            break;
                    }
                });
                if (Prodd !== "") {
                    var filatd = {
                        Codigo: Codd,
                        Producto: Prodd,
                        Unidad: Unidadd,
                        Costo: Costod,
                        PVta: PVtad,
                        Stock: Stockd
                    };
                    jsondet.push(filatd);
                }
            });
            i++;

        }
        else {
            var Cod = "", Prod, Unidad, CostoSol, Costo, PVta, Stock, fecing, diasantig, urgmov, cantreserv, cantdisp;
            if (verco === 0) {
                $(this).children("td").each(function (ind1) {
                    switch (ind1) {
                        case 1:
                            Cod = $(this).html();
                            break;
                        case 2:
                            Prod = $(this).html();
                            break;
                        case 3:
                            Unidad = $(this).html();
                            break;
                        case 4:
                            fecing = $(this).html();
                            break;
                        case 8:
                            diasantig = $(this).html();
                            break;
                        case 9:
                            urgmov = $(this).html();
                            break;
                        case 10:
                            Stock = $(this).html();
                            break;
                        case 11:
                            cantreserv = $(this).html();
                            break;
                        case 12:
                            cantdisp = $(this).html();
                            break;
                    }
                });
                if (Cod !== "") {
                    if (diasantig !== undefined) {
                        var fila = {
                            Codigo: Cod,
                            Producto: Prod,
                            Unidad: Unidad,
                            FechaIng: fecing,
                            DiasAntig: diasantig,
                            UrgMov: urgmov,
                            Stock: Stock,
                            CantReserv: cantreserv,
                            CantDisp: cantdisp
                        };
                        jsondet.push(fila);
                    }
                }
            } else if (verco === 1) {
                $(this).children("td").each(function (ind2) {
                    switch (ind2) {
                        case 1:
                            Cod = $(this).html();
                            break;
                        case 2:
                            Prod = $(this).html();
                            break;
                        case 3:
                            Unidad = $(this).html();
                            break;
                        case 4:
                            fecing = $(this).html();
                            break;
                        case 5:
                            CostoSol = $(this).html();
                            break;
                        case 6:
                            Costo = $(this).html();
                            break;
                        case 7:
                            PVta = $(this).html();
                            break;
                        case 8:
                            diasantig = $(this).html();
                            break;
                        case 9:
                            urgmov = $(this).html();
                            break;
                        case 10:
                            Stock = $(this).html();
                            break;
                        case 11:
                            cantreserv = $(this).html();
                            break;
                        case 12:
                            cantdisp = $(this).html();
                            break;
                    }
                });
                if (Cod !== "") {
                    if (diasantig !== undefined) {
                        var fila = {
                            Codigo: Cod,
                            Producto: Prod,
                            Unidad: Unidad,
                            FechaIng: fecing,
                            CostoSol: CostoSol,
                            Costo: Costo,
                            PVta: PVta,
                            DiasAntig: diasantig,
                            UrgMov: urgmov,
                            Stock: Stock,
                            CantReserv: cantreserv,
                            CantDisp: cantdisp
                        };
                        jsondet.push(fila);
                    }
                }
            }
        }
    });
    if (jsondet.length > 0) {
        var json = {
            json: JSON.stringify(jsondet),
            vercos: verco
        };
        get('/ws/inventarios.aspx/GeneraPdfInv', JSON.stringify(json))
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
function genpdfs() {
    tipoReporte = "pdf";
    $("#panio").val((new Date).getFullYear().toString());
    $("#pmes").val("0");
    $("#ModalDetParams").modal("toggle");
}
function genpdfres() {
    let vidAlmacen = parseInt($("#alm").val());
    let vanio = parseInt($("#panio").val());
    let vmes = parseInt($("#pmes").val());

    let json = {
        idAlmacen: vidAlmacen,
        anio: vanio,
        mes: vmes
    }

    get('/ws/inventarios.aspx/GeneraPdfInvRes', JSON.stringify(json))
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
function exportarres() {
    let vidAlmacen = parseInt($("#alm").val());
    let vanio = parseInt($("#panio").val());
    let vmes = parseInt($("#pmes").val());

    let json = {
        idAlmacen: vidAlmacen,
        anio: vanio,
        mes: vmes
    }

    get('/ws/inventarios.aspx/GeneraXLSInvRes', JSON.stringify(json))
        .then(function (res) {
            //var r = JSON.stringify(res);
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
            Alerta("No fue posible generar el reporte <br />" + error);
        });
}
function exportarExcelResumen() {
    tipoReporte = "";
    exportarres();
    $("#ModalDetParams").modal("toggle");
}
function exportarPDFResumen() {
    tipoReporte = "";
    genpdfres()
    $("#ModalDetParams").modal("toggle");
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
//Cierre Inventario
function cargaInvCierre() {
    var alm = $("#alm").val();
    var opt = "#tcierreinvbody";
    console.log(alm);
    if (alm === null) {
        alm = 0;
    }
    get('/ws/inventarios.aspx/listarInvCierre', JSON.stringify({ idAlmacen: alm }))
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
                    html += "<td>" + this.fecemi + "</td>";
                    html += "<td>" + this.Ingresos + "</td>";
                    html += "<td>" + this.Salidas + "</td>";
                    html += "<td>" + this.Ajuste + "</td>";
                    html += "<td>" + this.stockfinal + "</td>";
                    html += "<td>" + this.fechareg + "</td>";
                    if (this.CODIGO_PRODUCTO != "") {
                        html += '<td>' + '<i pid="' + this.ID_PRODUCTO + '" stockact="' + this.StockInicial + '" idalm ="' + this.ID_ALMACEN + '"title="Ajuste (+/-)" style="cursor: pointer">Ajuste (+/-)</i>' + '</td>';
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
function cargaOCPAC() {
    get('/ws/inventarios.aspx/GETOCPAC')
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
    cargaOCPAC();
    $("#cierreinvModal").modal({ backdrop: 'static', keyboard: false });
    limpiaControles('cierreinvModal');
    $("#cinvalm").val(idalm);
    $("#cinvprod").val(idprod);
    $("#cinvstockact").val(stockac);
    $("#filtroProductoA").prop("disabled", true);

    $("#cinvocpac").prop("disabled", true);
    $("#cinvprodocpac").prop("disabled", true);

}
function GuardarCierre() {
    if ($("#cinvfec").val() != "") {
        if ($("#cinvtpooper").val() != null) {
            let info = new Object();
            var from = $("#cinvfec").val().split("/");
            var f = new Date(from[2], from[1] - 1, from[0]);

            info.idprodinv = $("#cinvprod").val();
            info.idalm = $("#cinvalm").val();
            info.tipooper = $("#cinvtpooper").val();
            info.fec = f;
            info.stockact = $("#cinvstockact").val();
            info.cantajus = $("#cinvcantajus").val();
            info.stockfin = $("#cinvstockfin").val();
            info.idocpac = $("#cinvocpac").val();
            info.idprodocpac = $("#cinvprodocpac").val();
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
                    return fetch(`/ws/inventarios.aspx/InsertarCierre`, {
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
                        cargaInvCierre();
                        cargaInvent('P');
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