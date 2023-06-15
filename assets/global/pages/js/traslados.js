

let tipoReporte = "";
let idImportacion = 0;
$(document).ready(function () {

    cargaTipocomprobantes();
    cargaMoneda();
    lstExportadoresTipoImportadorAndExportador();
    $.when(cargaAlmacenes())
        .then(() => {
            //$('#alm').on('change', function () {
            //    cargaInventP();
            //});
            $('#selalmtrasO').on('change', function () {
                //   cargaInventT();
                cargaInventT($('#selalmtrasO').val());

            });
            //    $('#selalmsal').on('change', function () {
            //        cargaInventS();
            //    });
        });
    cargaTraslados();
    //boton cancelas doc electroncio


    $('#canf').on("click", function () {

        limpiaControles("docElectronico");
        $("#docElectronico").modal("toggle");

        $("#cxc").prop("checked", false);
        $("#ig").prop("checked", false);


    });


    //boton nuevo proveedor
    $("#nprov").on("click", function () {
        limpiaControles("exporta");
        cargaUbigeos();
        $("#exporta").modal({ backdrop: 'static', keyboard: false });
    });


    $("#guaprov").on("click", function () {
        if (valForm("proveedor")) {
            //guardaProv();
        }
    });
    $("#canex").on("click", function () {
        $("#exporta").modal("toggle");
    });







    $('#nueDoc').click(function () {
        if (idImportacion == 0) {
            Alerta("No ha seleccionado un traslado", "Docs. Electrónicos", "warning");
            return;
        } else {
            $("#docElectronico").modal({ backdrop: 'static', keyboard: false });
        }
    });

    $('.select2').each(function () {
        $(this).select2({
            width: '100%'
        });
    });
    /*CAMBIO DE BUSQUEDA DE SELECT 2--EXPRESIONES REGULARES*/
    $("#selprotras").select2({
        width: '100%',
        placeholder: "Selecciona",
        allowClear: true,
        matcher: function (params, data) {
            // If there are no search terms, return all of the data
            if ($.trim(params.term) === '') {
                return data;
            }
            var palabra = params.term;
            var filtro = ".*" + palabra.replace(/\s+/g, ".*") + ".*";
            /*
            rex = new RegExp(filtro, 'i');
              Do not display the item if there is no 'text' property
              if (typeof data.text === 'undefined') {
                  return data;
              }
              */
            // `params.term` should be the term that is used for searching
            // `data.text` is the text that is displayed for the data object
            //console.log(data.text);

            if (data.text.toUpperCase().search(filtro.toUpperCase()) > -1) {
                var modifiedData = $.extend({}, data, true);
                modifiedData.text += '';
                // You can return modified objects from here
                // This includes matching the `children` how you want in nested data sets
                return modifiedData;
            }

            // Return `null` if the term should not be displayed
            return null;
        }

    });
    var vc = Cookies.get('vacos');

    $("#info tbody").on("click", "i", function () {
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

    //Traslados
    $("#cantras").on("click", function () {
        limpiaControles("trasladosModal");
        $("#trasladosModal").modal("toggle");
    });
});

function cargaUbigeos() {
    get('/ws/ubigeos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#ubi").empty().append('<option value=""></option>');
                    $("#iubi").empty().append('<option value=""></option>');
                    $("#ubipf").empty().append('<option value=""></option>');
                    $(res.Info).each(function () {
                        $("#ubi").append('<option value="' + this.id + '">' + this.ubi + '</option>');
                        $("#iubi").append('<option value="' + this.id + '">' + this.ubi + '</option>');
                        $("#ubipf").append('<option value="' + this.id + '">' + this.ubi + '</option>');

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

function lstExportadoresTipoImportadorAndExportador() {
    console.log("si");
    get('/ws/exportadores.aspx/ListarExportadoresTipoImportadorAndExportador')
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#idpro").empty().append('<option value=""></option>');
                    $.each(res.Info, function () {
                        $("#idpro").append('<option idproveedor="' + this.id + '" tipoDoc = "' + this.tipodoc + '"  ruc="' + this.ruc + '" value="' + this.id + '">' + this.ruc + ' ' + this.razs + '</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (res) {
            Alerta(res.Mensaje, "ERROR!");
        });
}



function cargaMoneda() {

    $("#monf").empty().append('<option value="">Seleccione</option>');
    $("#monf").empty().append('<option selected value=""></option>');

    $("#mone").empty().append('<option value=""></option>');

    get('/ws/monedas.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#monf").empty().append('<option value="">Seleccione</option>');

                $.each(res.Info, function () {
                    //se agregó las comillas para solucionarla la carga
                    $("#monf").append('<option value="' + this.id + '">' + this.mon + ' ' + '</option>' + '</br>');

                    $("#emonf").append('<option value="' + this.id + '">' + this.mon + '</option>');

                });
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
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
                            'NOTA DE CREDITO',
                            'OTRO DOCUMENTO',
                            'BL',
                            'CN',
                            'NOTA DEBITO'
                        ]
                        if (opciones.indexOf(this.desc.toUpperCase()) !== -1) {
                            $("#tcf").append('<option value="' + this.id + '">' + this.desc + '</option>');
                            $("#tcfe").append('<option value="' + this.id + '">' + this.desc + '</option>');
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



function cerrar() {
    $("#forma").hide();
    $("#lista").show();

}

function limpiaPantalla() {
    limpiaControles("forma");
    $("#almeent").prop("selectedIndex", 0);
    $("#info tbody").empty();
    $("#id").val("");
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
               // $.when(cargaInventS()).then(cargaInventT());

            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
        })
}

function cargaTraslados() {
    var opt = "#tinfobody";
    $(opt).html("");

    get('/ws/inventarios.aspx/listarTraslados', "")
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

                var i = 1;

                $(res).each(function () {
                    html += "<tr id='trinv' ptd='" + i + "' idprod = '" + this.ID_REGINV + "'>";
                    html += "<td style='display: none'>" + this.ID_PRODUCTO + "</td>";
                    html += "<td>" + this.ID_OCPAC + "</td>";
                    html += "<td>" + formatoFecha(this.FechaEntrada, 1) + "</td>";
                    /*CAMBIOS*/
                    if (this.ALMACEN == 'PIURA') {
                        html += '<td>' + 'LIMA' + '</td>';
                    } else {
                        html += '<td>' + 'PIURA' + '</td>';

                    }
                    html += '<td>' + this.ALMACEN + '</td>';
                    html += '<td>' + '' + '</td>'
                    html += '<td>' + '<i class="fa fa-search" title="Ver registro"></i>' + '</td>';
                    html += '<td>' + '<i class="fa fa-file-pdf" title="Ver PDF"></i>' + '</td>';
                    html += "</tr>";
                    i++;
                });

                $(opt).html(html);

                $("#trasladostable table tbody").children("tr").each(function () {
                    let row = $(this);
                /*cambio */
                    let ver = $(this).children()[6];
                    let pdf = $(this).children()[7];

                    $(row).on("click", function () {
                        let id = $(this).attr("idprod");
                        cargaFac(id);
                    });

                    $(ver).on("click", function () {
                        let id = $(this).parent().attr("idprod");
                        verTraslado(id);
                    });

                    $(pdf).on("click", function () {
                        let id = $(this).parent().attr("idprod");
                        alert(id);
                    });
                });
            }

        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado <br />" + error, "ERROR!");
        });

}

/*VER TRASLADO*/
/*ver traslado agregado*/

function verTraslado(id) {
    console.log(id);

    $('#trasladosModal').modal("toggle");
    $('#btnGuardarT').hide();

    get('/ws/inventarios.aspx/EditarTraslados', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {

                $("#selalmtrasD").val(res.Info.t.idalm).prop('disabled', 'disabled');
                $("selalmtrasD").change();
                if (res.Info.t.idalm == 4) {
                    $("#selalmtrasO").val(3).prop('disabled', 'disabled');
                    //cargaInventT(4);
                    $("#selprotras").val(res.Info.rpta[0].ID_PRODUCTO).change().prop('disabled', 'disabled');

                    // $("#selprotras").change();

                } else {
                    $("#selalmtrasO").val(4).prop('disabled', 'disabled');

                }

                // $("#selprotras").val(res.Info.rpta[0].ID_PRODUCTO).change(traeImp('selprotras', 'txtinvacttras')).prop('disabled', 'disabled');
                $("#selprotras").change();
                $("#txtcanttras").val("0").prop('readonly', true);
                $("#txtcanttras").val(res.Info.rpta[0].CantidadIngres).prop('readonly', true);
                $("#txtcosto").val("0.00").prop('readonly', true);
                $("#txtcosto").val(res.Info.rpta[0].Precio).prop('readonly', true);

                $("#txtnotatras").val(res.Info.t.obs).prop('readonly', true);
                // $("#btnAgrProd").prop('disabled', true);
                console.log("producto:" + res.Info.rpta[0].ID_PRODUCTO);
                $("#btnAP").hide();

                $("#tbtrasp").empty();
                var fila = "<tr id='tr" +/* idp*/"" + "'>" +
                    "<td style='display:none;'>" +/*+ idp +*/"" + "</td>" +
                    "<td style='display:none;'>" + /*numero*/ "" + "</td>" +
                    "<td style='display:none;'>" + /*tipo */"" + "</td>" +
                    "<td>" + $('#selprotras option:selected').html() + "</td>" +
                    "<td>" + res.Info.rpta[0].UM + "</td>" +
                    "<td>" + res.Info.rpta[0].CantidadIngres + "</td>" +
                    "<td class='text-center'> " + "" + "</tr > ";
                $("#tbtrasp").append(fila);





            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });

}














function cargaFac(idreg) {
    let fil = new Object();
    fil.idreg = idreg;
    let param = new Object();
    idImportacion = idreg;
    param.where = fil;
    var data = {
        class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
        id: 'docElect',
        columnas: [
            { leyenda: 'Tipo de Costo', class: 'text-center thp', ordenable: false, columna: '', filtro: false },
            { leyenda: 'Tipo de Doc.', class: 'text-center thp', ordenable: false, columna: '', filtro: false },
            { leyenda: 'Proveedor', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
            { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'SERIEF', filtro: false },
            { leyenda: '# de Documento Electrónico', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'NUMEROF', filtro: false },
            { leyenda: 'Fecha Emisión', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'FECHAF', filtro: false },
            { leyenda: 'Moneda', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'MONEDA', filtro: false },
            { leyenda: 'Importe', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
            { leyenda: '', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
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
                    if (valor === 5)
                        return "Flete Terrestre";
                }
            },
            {
                propiedad: 'TIPOCOMP', class: 'text-center tdp', ordenable: true, formato: function (tr, obj, valor) {
                    if (valor === 10)
                        return "FACTURA";
                    if (valor === 1013)
                        return "BOLETA";
                    if (valor === 1016)
                        return "NOTA DE CREDITO";
                }
            },

            {
                propiedad: 'RAZON_SOCIAL', class: 'tdp', style: 'white-space:nowrap', formato: function (tr, obj) {
                    return obj.RAZON_SOCIAL;
                }
            },
            {
                propiedad: 'RUC', class: 'tdp', style: 'display:none', formato: function (tr, obj) {
                    return obj.RUC;
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
            { propiedad: 'MONEDA', class: 'text-center tdp' },
            {
                propiedad: 'TOTAL', style: 'white-space:nowrap', class: 'text-center tdp', formato: function (tr, obj, value) {

                    if (value === 0)
                        return obj.IMPORTEFAC;
                    else
                        return formatoMoneda(obj.TOTAL, 2, true);
                }
            },

            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    edita = document.createElement("i");

                    $(edita).addClass("fa fa-edit").prop("title", "Editar registro").on("click", function () {
                        editaRegistroDocReg(obj.ID_FACTURA, obj.ID_REGISTRO);
                    });
                    container.appendChild(edita);

                    return container;
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

function cargaInventT(id) {
   // alm = $("#selalmtrasO").val();
    opt = "#selprotras";
    limpiaTraslados();
    if (id === null) {
        id = 0;
    }
    get('/ws/inventarios.aspx/listarInv', JSON.stringify({ idAlmacen: id }))
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
                            /*agregado*/
                            if (this.inv >= 0) {
                                html += "<option codigo ='" + this.CODIGO_PRODUCTO + "' value='" + this.ID_PRODUCTO + "' data-cod='" + this.CODIGO_PRODUCTO + "' data-inv='" + this.inv + "' data-um='" + this.UM + "'>" + this.PRODUCTO + "</option>";
                            } }
                    }
                });
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
                            + '" cant="' + this.STOCK /*cambiado por SOTCK, ANTES STOCKUM*/
                            + '" cost="' + this.COSTO
                            + '';
                        $("#selimportacion").append('<option ' + dato + '" value="' + this.ID_REGISTRO + '">' + this.NUMERO + " - Fecha: " + formatoFecha(this.FECHA, 1) + '</option>');
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
    $("#txtinvacttras").val($("#selimportacion option:selected").attr("cant"));

}

function agregarProducto() {
    var um = $('#selprotras option:selected').attr('data-um');
    var numero = $('#selimportacion option:selected').attr('value');
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

    console.log(jsondet);
    var almO = $("#selalmtrasO").val();
    var almD = $("#selalmtrasD").val();
    var nota = $("#txtnotatras").val();
    var precio = $("#txtcosto").val();
    if (almO !== "0") {
        if (almD !== "0") {
            if (almO !== almD) {
                var json = {
                    idAlmacenO: almO,
                    idAlmacenD: almD,
                    Notas: nota,
                    Precio : precio
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
                    cargaTraslados();
                    $(result.value).each(function () {
                        resp = this.d;
                    })
                    if (resp === '"OK"') {

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

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

/*codigo agregado reestablecer filtros*/
$("#restablecerFiltros").on("click", function () {

    cargaTraslados();
    $("#codigo").val(" ");
    $("#Fdesde").val("");
    $("#Fhasta").val("");
});


$("#Buscar").on("click", function () {

    let codigo = $("#codigo").val();
    let fechaDesde = $("#Fdesde").val();
    let fechaHasta = $("#Fhasta").val();

    /*if (codigo != null) {

        for (let i = 0; i < $("#tinfobody").children("tr").length; i++){

            let CCodigo = $($(this).children("td")[1]).text();



            if (codigo == CCodigo && codigo != null) {

                console.log("hacen match");
                
            }
}*/

    /*filtro codigo*/
    if (codigo != null) {
        $("#tinfobody").children("tr").each(function (index) {

            let CCodigo = $($(this).children("td")[1]).text();
            console.log(CCodigo.toString());
            if (codigo != CCodigo && codigo != null) {
                console.log("hacen match");

                var fila = $(this);
                fila.hide();

                console.log(fila.children("tr")[0]);

            } else {
                $(this).show();
            }

        });
    }

    /*FILTRO FECHA DESDE Y HASTA*/
    if (fechaDesde != "" && fechaHasta != "") {

        let fechaDesdeFormat = fechaDesde.substr(5, 2) + "/" + fechaDesde.substr(8, 2) + "/" + fechaDesde.substr(0, 4);
        let fechaHastaFormat = fechaHasta.substr(5, 2) + "/" + fechaHasta.substr(8, 2) + "/" + fechaHasta.substr(0, 4);

        if (validarIntervaloFechas(fechaDesdeFormat, fechaHastaFormat)) {
            $("#tinfobody").children("tr").each(function (index) {

                // let fecha = $($(this).children("td")[2]).text();
                let a = $($(this).children("td")[2]).text();
                let fechaformat = a.substr(3, 2) + "/" + a.substr(0, 2) + "/" + a.substr(6, 4);

                console.log("a:" + fechaformat);
                let fecha = new Date(fechaformat.toString());

                let Desde = new Date(fechaDesdeFormat.toString());
                let Hasta = new Date(fechaHastaFormat.toString());

                if (fecha.getTime() >= Desde.getTime() && fecha.getTime() <= Hasta.getTime()) {

                    $(this).show();

                } else {

                    $(this).hide();

                }



            });
        }


    }

});
