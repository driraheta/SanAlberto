let detProdArray = new Array();
let oUnidades = new Array();
$(document).ready(function () {
    cargaProductos();
    cargaAlmacenes();
    //cargaInvElaborados();
    BuscarEnable();
    //cargaImp();
    //cargaInv();
    //cargaInvP('S');
    //cargaInvP('T');
    //cargaInvCierre();
    cargaUnidadesMedida(0);
    //DatePickers
    $('#fregistro').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
    $('#fregajuste').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });

    //validar escribir solo numeros en los inputs con clase numeros
    $(".numeros").on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
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
        $('#fregajuste').val(formatoFecha(new Date().toString(), 1));
        $("#salidasModal").modal("toggle");
    });
    $("#cantras").on("click", function () {
        limpiaControles("trasladosModal");
        $("#trasladosModal").modal("toggle");
    });
    //Cierre unventario
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
});
function nuevo() {
    detProdArray.length = 0;
    $("#lproent tbody").html("");
    limpiaPantalla();
    $("#lista").hide();
    $("#forma").show();
    $("#almeent").prop("selectedIndex", 0);
    cargaImp();
}
function cerrar() {
    $("#forma").hide();
    $("#lista").show();
    cargaInv('P');
}
function limpiaPantalla() {
    limpiaControles("forma");
    $('#fregistro').val(formatoFecha(new Date().toString(), 1));
    $('#btCargar').val('Cargar');
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
    } else {
        Alerta("Tienes que seleccionar un almacen antes de continuar", "ERROR!");
    }

}
function selProducto(id) {
    var ent = parseFloat($('#sel' + id + ' option:selected').attr('data-inv'));
    var sal = parseFloat($('#sel' + id + ' option:selected').attr('data-sal'));
    var cant = parseFloat($("#tdcant" + id).html());
    $("#tdact" + id).html(ent - sal);
    $("#tdnew" + id).html((ent - sal) + cant);
}
function cargaAlmacenes() {
    get('/ws/almacenes.aspx/Consultar', JSON.stringify({ id: 0 }))
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
                            html += '<option value="' + this.id + '" selected>' + this.alm + '</option>';
                            flag = false;
                        } else {
                            html += '<option value="' + this.id + '">' + this.alm + '</option>';
                        }
                    });
                    $("#almeent").html(html);
                    $("#selalm").html('<option value="0">Todos</option>' + html);
                    $("#selalmsal").html('<option value="0">Todos</option>' + html);
                    $("#alm").html('<option selected value="0">Todos</option>' + html);
                    $("#selalmtrasD").html(html);
                    $("#selalmtrasO").html(html);
                    $("#cinvalm").html(html);
                }
                cargaInvElaborados();

            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
        })
}

function cargaUnidadesMedida(id) {
    get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $(res.Info).each(function () {
                    oUnidad = {}
                    oUnidad.id = this.id;
                    oUnidad.um = this.um;
                    oUnidades.push(oUnidad);
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

function copiaUnidadesMedida() {
    let opciones = "";
    $.each(oUnidades, (index, value) => {
        opciones += '<option value="' + value.id + '">' + value.um + '</option>';
    });
    return opciones;
}


function cargaProductos() {
    get('/ws/productos.aspx/ListarProductosElaborados')
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#selprod").append('<option value="' + this.ID_PRODUCTO + '">' + this.PRODUCTO + '</option>');
                        $("#selprodajuste").append('<option value="' + this.ID_PRODUCTO + '">' + this.PRODUCTO + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
        });
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

function cargaInvElaborados() {
    var alm = $("#alm").val();
    var opt = "#tinfobody";
    if (alm === null) {
        alm = 0;
    }
    get('/ws/inventarios.aspx/listarInvElaborados', JSON.stringify({ idAlmacen: alm }))
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
                var i = 1
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
                    //html += "<td>" + formatoMoneda(this.costo, 2, true) + "</td>";
                    html += "<td>" + this.cantdisp + "</td>";
                    html += "</tr>";
                    i++;
                    //}
                });

                //if (tpo === "P") {
                //    var i = 1;

                //} else {
                //    html = "<option codigo ='0' value='0'>Selecciona..</option>";
                //    $(res).each(function () {
                //        if (this.CODIGO_PRODUCTO != "ESPECIE:") {
                //            if (this.CODIGO_PRODUCTO != "VARIEDAD:") {
                //                html += "<option codigo ='" + this.CODIGO_PRODUCTO + "' value='" + this.ID_PRODUCTO + "' data-cod='" + this.CODIGO_PRODUCTO + "' data-inv='" + this.inv + "' data-um='" + this.UM + "'>" + this.PRODUCTO + "</option>";
                //            }
                //        }
                //    });
                //}
                //limpiaSalidas();
                //limpiaTraslados();
                $(opt).html(html);
                //recorregridprin();
            }

            //$('#info tr td:nth-child(7), #info th:nth-child(7)').hide();
            //$('#info tr td:nth-child(8),#info th:nth-child(8)').hide();
            //$('#info tr td:nth-child(9),#info th:nth-child(9)').hide();

        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
        });

}
function cargaInvP(tpo) {
    var alm = $("#alm").val();
    var opt = "#tinfobody";
    if (tpo === "S") {
        alm = $("#selalmsal").val();
        opt = "#selprosal";
        limpiaSalidas();
    } else if (tpo === "T") {
        alm = $("#selalmtrasO").val();
        opt = "#selprotras";
    }
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
                        cargaInv('P');
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

function selOrdenCompra(idprod, posicion) {
    var resp = false;
    var modalOrdenes = $("#modalOrdenCompra");
    var tbprodscon = $("#lprocon");
    var lblnombreproducto = tbprodscon.children(1).children()[posicion].children[1].innerHTML;
    var lblcantproducto = tbprodscon.children(1).children()[posicion].children[2].innerHTML;
    var opt = $("#tbOrdenBody");
    $("#nomProducto").text(lblnombreproducto);
    $("#cantProducto").text(lblcantproducto);
    $("#cantProductoRest").text(lblcantproducto);
    $("#idProdComposite").val(idprod);

    get('/ws/compras.aspx/ListarSaldoCompraXProducto', JSON.stringify({ idProducto: idprod }))
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
                if (res.Info.length == 0) {
                    Alerta("No hay compras disponibles", "AVISO");
                }
                else {
                    let i = 1;
                    let acumProdComposite = 0;
                    var html = "";
                    $(res.Info).each(function () {
                        let registro = {};
                        let idCompra = this.ID_COMPRA;
                        if (detProdArray.length > 0) {
                            let detProdLocal = detProdArray.filter(function (detProd) {
                                return detProd.idOrden == idCompra;
                            });
                            if (detProdLocal.length > 0) {
                                registro = detProdLocal[0];
                            }
                        }
                        var inputcant = '';
                        var saldoNuevo = '';
                        if (jQuery.isEmptyObject(registro)) {
                            inputcant = '<input type="text" class="form-control" onchange="calculaStockOC(' + i + ')" id="detcantoc' + i + '"/>';
                            saldoNuevo = this.SaldoOC;
                        }
                        else {
                            inputcant = '<input type="text" class="form-control" value="' + registro.cantidad + '" onchange="calculaStockOC(' + i + ')" id="detcantoc' + i + '"/>';
                            saldoNuevo = registro.saldoNuevo;
                            acumProdComposite += parseFloat(registro.cantidad);
                        }
                        html += "<tr>";
                        html += "<td style='display: none'>" + this.ID_COMPRA + "</td>";
                        html += "<td>" + this.NUMERO + "</td>";
                        html += "<td>" + this.RAZON_SOCIAL + "</td>";
                        html += "<td>" + this.FECHA + "</td>";
                        html += "<td  align='right'>" + this.SaldoOC + "</td>";
                        html += "<td align='right'>" + this.SaldoOC + "</td>";
                        html += "<td>" + inputcant + "</td>";
                        html += "<td align='right'>" + saldoNuevo + "</td>";
                        html += "<td style='display: none'>" + this.Precio + "</td>";
                        html += "</tr>";
                        i++;
                        resp = true;
                    });
                    $(opt).html(html);
                    if (acumProdComposite > 0) {
                        let eCantProdComposite = parseFloat(lblcantproducto);
                        let saldoProdComposite = eCantProdComposite - acumProdComposite;
                        $("#cantProductoRest").text(saldoProdComposite);
                    }
                    modalOrdenes.modal("show");
                }
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de productos de convesion<br />" + error, "ERROR!");
        });
    return resp;
}

function cargaProdsDetConversion() {
    var resp = false;
    var idprod = $("#selprod").val();
    var opt = "#lprocondet";
    let cantgen = 0;
    var scantgen = $("#cantgen").val();
    if (scantgen != '') {
        cantgen = parseFloat(scantgen)
    }
    get('/ws/productos.aspx/ListarProductosDetConversion', JSON.stringify({ idprodmaster: idprod }))
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
                var html = "";
                let i = 1;
                $(res).each(function () {
                    var cantConvert = parseFloat(this.CANTIDAD) * cantgen
                    var selum = '<select class="form-control rounded form-control-sm" id="detum' + i + '">'
                        + copiaUnidadesMedida() + '</select>';
                    var inputcant = '<input type="text" class="form-control" id="detcant' + i + '"/>';
                    var inputcunit = '<input type="text" class="form-control" id="detcu' + i + '"/>';
                    var inputpv = '<input type="text" class="form-control" id="detpv' + i + '"/>';
                    var btnoc = '<button type="button" class="bt btn-success" onclick="selOrdenCompra(' + this.ID_PRODUCTO + ',' + i + ')" id="btCargar">'
                        + '<i class="d-md-inline-block d-none ml-1 mr-2 fa fa-plus-circle" ></i></button>';
                    html += "<tr>";
                    html += "<td>" + this.ID_PRODUCTO + "</td>";
                    html += "<td>" + this.PRODUCTO + "</td>";
                    //html += "<td>" + selum + "</td>";
                    html += "<td align='right'>" + cantConvert.toString() + "</td>";
                    html += "<td>" + inputcunit + "</td>";
                    html += "<td>" + inputpv + "</td>";
                    html += "<td>" + btnoc + "</td>";
                    html += "<td align='right'>" + "0" + "</td>";
                    html += "<td align='right'>" + "0" + "</td>";
                    html += "</tr>";
                    i++;
                    resp = true;
                });
                $(opt).html(html);

            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de productos de convesion<br />" + error, "ERROR!");
        });
    return resp;
}

function validaCantProducto(posicion) {
    let cantidadProdRestante = $("#cantProductoRest").text();
    let cantidadOC = $("#detcantoc" + posicion).val();
    let cantActualOC = $("#tbOrdenBody").children()[posicion - 1].children[5].innerHTML;
    let cantSaldoOC = $("#tbOrdenBody").children()[posicion - 1].children[7].innerHTML;
    //validar que la cantidad no sobrepase la restante
    let eCantidadOCAnte = parseFloat(cantActualOC) - parseFloat(cantSaldoOC); 
    if (parseFloat(cantidadOC) > (parseFloat(cantidadProdRestante) + eCantidadOCAnte)) {
        valida = false;
        alert("la cantidad ingresada es mayor a la cantidad por solicitar del producto")
        return false;
    }
    //validar que la cantidad no sobrepase al saldo de la OC
    if (parseFloat(cantidadOC) > parseFloat(cantActualOC)) {
        valida = false;
        alert("la cantidad ingresada es mayor a la cantidad por solicitar del producto")
        return false;
    }
    return true;

}

function calculaStockOC(posicion) {
    if (!validaCantProducto(posicion)) {
        $("#detcantoc" + posicion).val("0");
    }
    let cantidadProd = $("#cantProducto").text();
    let eCantidadProd = parseFloat(cantidadProd);
    let cantidadOC = $("#detcantoc" + posicion).val();
    let bodyOC = $("#tbOrdenBody");
    let cantActualOC = bodyOC.children()[posicion - 1].children[5].innerHTML;
    let SaldoOC = parseFloat(cantActualOC) - parseFloat(cantidadOC);
    bodyOC.children()[posicion - 1].children[7].innerHTML = SaldoOC;
    let sumCantOc = 0;
    let eCantidadOc = parseFloat(cantidadOC);
    let cantRows = $('#tbOrden > tbody  > tr').length;
    var i = 0;
    while (++i <= cantRows) {
        localVal = $("#detcantoc" + i).val();
        if ($.trim(localVal) != '')
        {
            sumCantOc += parseFloat(localVal);
        }
    }
    //Actualizar la cantidad de producto restante
    $("#cantProductoRest").text(eCantidadProd - sumCantOc);
    
}

function tomarProductoOrden() {
    //se borran los datos correspondientes al producto en cuestión para cargar los datos nuevos
    borrarInstanciaProdArray();
    //se cargan los datos nuevos y se los mantiene
    cargaArrayProdsInsumo();
    //Se carga costo unitario, saldo anterior y saldo nuevo del insumo de la composición
    cargarResultadoProdComposite();
    //Se carga el costo unitario del Producto Elaborado.
    calculaCUnitElaborado();
}

function borrarInstanciaProdArray() {
    if (detProdArray.length > 0) {
        let idProd = $("#idProdComposite").val();
        detProdArray = detProdArray.filter(function (detProd) {
            return detProd.idProd !== idProd;
        });
    }
}

function cargaArrayProdsInsumo() {
    let idProd = $("#idProdComposite").val();
    let cantRows = $('#tbOrden > tbody  > tr').length;
    let bodyOC = $("#tbOrdenBody");

    var i = 0;
    while (++i <= cantRows) {
        let registro = {};
        let idOC = bodyOC.children()[i-1].children[0].innerHTML;
        localVal = $("#detcantoc" + i).val();
        if ($.trim(localVal) != '') {
            registro.idProd = idProd;
            registro.idOrden = idOC;
            registro.cantidad = localVal;
            registro.saldoAnt = bodyOC.children()[i - 1].children[5].innerHTML;
            registro.saldoNuevo = bodyOC.children()[i - 1].children[7].innerHTML;
            registro.Precio = bodyOC.children()[i - 1].children[8].innerHTML;
            detProdArray.push(registro);
        }
    }
}

function cargarResultadoProdComposite() {
    if (detProdArray.length > 0) {
        let idProd = $("#idProdComposite").val();
        let i = 0;
        let acumCantidad = 0;
        let acumCosto = 0;
        let acumSaldoAnt = 0;
        let acumSaldoNuevo = 0;
        do {
            let currRegistro = detProdArray[i];
            if (currRegistro.idProd == idProd) {
                acumCantidad += parseFloat(currRegistro.cantidad);
                acumCosto += parseFloat(currRegistro.cantidad) * parseFloat(currRegistro.Precio);
                acumSaldoAnt += parseFloat(currRegistro.saldoAnt);
                acumSaldoNuevo += parseFloat(currRegistro.saldoNuevo);
            }
        } while (++i < detProdArray.length);
        let costoUnitario = acumCosto / acumCantidad;
        //
        let tbodyProdComposite = $("#lprocondet");
        let posicion = -1;
        let j = 0;
        do {
            if (tbodyProdComposite.children()[j].children[0].innerHTML === idProd) {
                posicion = j;
                break;
            }
        } while (++j < tbodyProdComposite.children.length)
        if (posicion >= 0) {
            tbodyProdComposite.children()[posicion].children[6].innerHTML = acumSaldoAnt;
            tbodyProdComposite.children()[posicion].children[7].innerHTML = acumSaldoNuevo;
            $("#detcu" + (posicion + 1)).val(costoUnitario);
        }
    }

}

function calculaCUnitElaborado() {
    let tbodyProdComposite = $("#lprocondet");
    let acantProdElaborado = $("#cantgen").val();
    let sumCosto = 0;
    let j = 0;
    do {
        let cant = parseFloat(tbodyProdComposite.children()[j].children[2].innerHTML) 
        let acosto = $("#detcu" + (j + 1)).val();
        if ($.trim(acosto) != '') {
            let costo = parseFloat(acosto);
            sumCosto += cant * costo;
        }
    } while (++j < tbodyProdComposite.children.length)

    let cantProdElab = parseFloat(acantProdElaborado);
    let costoProdElab = 0;
    if (cantProdElab > 0) {
        costoProdElab = sumCosto / cantProdElab;
    }
    $("#cunit").val(costoProdElab);
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
function traeInv(idSel, idtxt) {
    $("#" + idtxt).val($('#' + idSel + ' option:selected').attr('data-inv'));
    var um = $('#selprotras option:selected').attr('data-um');
    $("#umtras").html(um);
}
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
                                cargaInv('P');
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
function agregarProducto() {
    var um = $('#selprotras option:selected').attr('data-um');
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
                        cargaInv('P');
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
        var idp, cant;
        $(this).children("td").each(function (ind) {
            switch (ind) {
                case 0:
                    idp = $(this).html();
                    break;
                case 3:
                    cant = $(this).html();
                    break;
            }
        });
        var fila = {
            idProducto: idp,
            Cantidad: cant
        };
        jsondet.push(fila);
    });
    return JSON.stringify(jsondet);
}

function BuscarEnable() {
    $("#filtrar").keyup(function () {
        var rex = new RegExp($(this).val(), 'i');
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
        get('/ws/inventarios.aspx/Prueba', JSON.stringify(json))
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
                Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
            });
    } else {
        Alerta("No hay nada que exportar", "Error!", typIconoAlerta.aviso);
    }
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

function guardaRegistro() {
    //Variables
    let reg = new Object();
    let idalm = $("#selalm").val();
    let detalle = new Array();
    let detalleoc = new Array();
    let registro = new Object();
    let observacion = $("#txtobs").val();

    //Datos del producto elaborado	 
    let idElaborado = $("#selprod").val();
    let cantElaborado = $("#cantgen").val();
    let cunitElaborado = $("#cantgen").val();

    var from = $("#fregistro").val().split("/");
    let fecElaborado = new Date(from[2], from[1] - 1, from[0]);
    let umElaborado = 'UNIDAD';


    //DATOS DE COMPOSICION
    let i = 0;
    do {
        let localreg = detProdArray[i];
        let det = new Object();
        det.idprod = localreg.idProd;
        det.idoc = localreg.idOrden;
        det.cant = localreg.cantidad;
        det.um = "UNIDAD";
        detalleoc.push(det);
    } while (++i < detProdArray.length)


    //Insertar datos 
    let detIng = new Object();
    detIng.idprod = idElaborado;
    detIng.cant = cantElaborado;
    detIng.costo = cunitElaborado;
    detIng.um = umElaborado;
    //detIng.det = detalleoc;

    detalle.push(detIng);

    reg.fec = fecElaborado;
    reg.alm = idalm;
    reg.obs = observacion;
    reg.status = 1;

    registro.reg = reg;
    registro.det = detalle;
    registro.detcomp = detalleoc;
    Swal.fire({
        title: 'Confirmación',
        html: '¿Confirma que desea agregar el registro',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return fetch(`/ws/elaborados.aspx/Insertar`, {
                method: 'POST',
                body: JSON.stringify({ info: JSON.stringify(registro) }),
                headers: { 'Content-Type': 'application/json' }
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
                // $("#num").val(res.Info.reg.num);
                // $("#idr").val(res.Info.reg.id);
                // $("#gua").prop("disabled", true);
                detProdArray.length = 0;
                $("#lista").show();
                $("#forma").hide();
            } else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
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
                        cargaInv('P');
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

