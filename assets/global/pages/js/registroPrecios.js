//VARIABLES LOCALES
let idPrecioVentaProducto;

$(document).ready(function () {
    //LLENADO DE DATOS DESDE SERVIDOR
    //Llenado select Importacion y exportacion
    cargaMoneda();
    ddAlmacen = "#alm";
    cargaAlmacenesXUsuario();
    //Llenado select Unidad de Medida
    CargarUnidadesMedida();
    //Llenado select Nombre Productos
    //get('/ws/registroPrecios.aspx/ListarTodosLosProductosT')
    CargarProductos();
    //Llenado de tabla
    llenarTabla();

    //LLENADO DE input por defecto
    $("#txtUnidadMedida").val(0);
    $("#txtProducto").val(0);
    $("#txtDesde").val(hoy("normal"));;
    $("#txtHasta").val(hoy("normal"));;

    $('#alm').change(function () {
        CargarImportaciones();
    });

    $('#txtCodigo').on('keyup', function () {
        //FILTRAR SELECT PRODUCTO POR NOMBRE DE PRODUCTO O POR CODIGO DE PRODUCTO
        let validador = 0;
        let contador = 0;
        let filtro = $('#txtCodigo').val();

        $('#txtProducto option').each(function () {
            let nombreProducto = $(this).text().toUpperCase();
            let txtCodigo = $(this).attr("codproducto");
            let selectImportExport;

            if (nombreProducto.indexOf(filtro.toUpperCase()) !== -1 || txtCodigo.indexOf(filtro) !== -1) {
                $(this).show();
                if (validador === 0) {
                    $(this).attr("selected", true);
                    $('#txtProducto ').val($(this).val());
                    validador++;
                    resetearImportExport();
                    filtrarImportExport();
                } else {
                    $(this).attr("selected", false);
                }
            } else {

                $(this).attr("selected", false);
                $(this).hide();
                contador++;
                if ($(this).attr("style") == "display: none;" && contador == $('#txtProducto option').length) {
                    $('#txtProducto ').val('');
                }
            }
            if (filtro == '') {
                //SELECCIONAR EL PRIMERO
                $(this).show();
                resetearImportExport();
                $('#txtProducto option:first-child').attr("selected", true);
            }
        });

    });

    $('.datepicker').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    });
    //FUNCIONES aUXILIARES PERMANENTES
    $('#btnGuardar').on('click', function myfunction() {
        let idProducto = $('#txtProducto').val();
        let idUnidadMedida = $('#txtUnidadMedida').val();
        let tarifa = $('#txtImporte').val();
        let desde = $('#txtDesde').val();
        let hasta = $('#txtHasta').val();
        let idregistro = $('#timp').val();
        let idmoneda = $('#txtMoneda').val();
        if (validarIntervaloFechas()) {
            if (idProducto > 0) {
                if (idUnidadMedida > 0) {
                    if (tarifa >= 0) {
                        let info = {
                            idProducto: idProducto,
                            idUnidadMedida: idUnidadMedida,
                            tarifa: tarifa,
                            desde: desde,
                            hasta: hasta,
                            idregistro: idregistro,
                            idmoneda: idmoneda
                        };
                        insertarPrecioProducto(info);
                        //INSERTAR
                        llenarTabla();
                    } else {
                        Alerta("TARIFA NO PUEDE SER NEGATIVA", "ERROR!");
                    }
                } else {
                    Alerta("NO SE HA SELECCIONADO UNA UNIDAD DE MEDIDA", "ERROR!");
                }
            } else {
                Alerta("NO SE HA SELECCIONADO UN PRODUCTO", "ERROR!");
            }
        }
    });

    $('#btnEditar').on('click', function myfunction() {
        let idUnidadMedida;
        let tarifa;
        let desde;
        let hasta;
        //let idregistro = $($("#tblPrecioProductoEditar table tbody tr")[0]).attr("idregistro");
        let idPrecioVentaProducto = $($("#tblPrecioProductoEditar table tbody tr")[0]).attr("idprecioproducto");
        let idregistro = $('#timpe').val();
        let idmoneda = $('#txtMonedae').val();

        if (validarIntervaloFechas("#txtDesdeEditado", "#txtHastaEditado")) {
            idUnidadMedida = $("#txtUnidadMedidaEditado").val();
            tarifa = $("#txtImporteEditado").val();
            desde = $("#txtDesdeEditado").val();
            hasta = $("#txtHastaEditado").val();
            let info2 = {
                idPrecioVentaProducto: idPrecioVentaProducto,
                idUnidadMedida: idUnidadMedida,
                desde: desde,
                hasta: hasta,
                tarifa: tarifa,
                idregistro: idregistro,
                idmoneda: idmoneda
            }
            //SERVICIO
            let msj = "";
            let tituloAlerta = "";
            let iconoAlerta = "";

            get('/ws/registroPrecios.aspx/EditarProductoPrecio', JSON.stringify(info2))
                .then(function (res) {
                    var r = JSON.stringify(res);
                    if (r.startsWith('[{"ERROR":', 0)) {
                        var err = "";
                        $(res).each(function () {
                            err += this.Error;
                        });
                        Alerta(err, "ERROR!");
                    } else {
                        $(res).each(function () {
                            if (this.CONTADOR == 0 && this.STATUS == "ACTUALIZADO") {
                                msj = "Se actualizó correctamente";
                                tituloAlerta = "OK";
                                iconoAlerta = "success";
                            } else {
                                msj = "NO ACTUALIZADO <br>" + this.MENSAJE + " PRECIO EN ESE RANGO";
                                tituloAlerta = "ATENCIÓN";
                                iconoAlerta = "warning";

                            }
                        });
                        if (tituloAlerta == "OK") {
                            Alerta(msj, tituloAlerta, iconoAlerta);
                            llenarTabla();
                            $('#registroBody').show("slow");
                            $('#editarRegistroModal').hide();
                        } else {
                            Alerta(msj, tituloAlerta, iconoAlerta);
                        }
                    }
                }).catch(function (error) {
                    Alerta(error, "ERROR!");
                });

        }
    });

    $('#btnRegresar').on('click', function myfunction() {
        $('#registroBody').show("slow");
        $('#editarRegistroModal').hide();
    });

    $('#txtProducto').on('change', function myfunction() {
        console.log("funciona?");
        resetearImportExport()
        filtrarImportExport()
    });

    $('.select2').each(function () {
        $(this).select2({
            width: '100%'
        });
    });



    /*CAMBIO DE BUSQUEDA DE SELECT 2--EXPRESIONES REGULARES*/
    $("#txtProducto").select2({
        width: '100%',
        placeholder: "productos",
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

});

//FUNCIONES AUXILIARES TEMPORALES
function resetearImportExport() {
    $('#timp option').each(function () {
        $(this).show();
        $(this).attr("selected", false);
    });
    $($('#timp option')[0]).attr("selected",true);
}

function filtrarImportExport() {
    let contador = 0;
    let validador = 0;
    $('#timp option').each(function () {
        let productoSeleccionado = $('#txtProducto option:selected').text().toUpperCase();
        let selectImportExport = $(this).text().toUpperCase();

        $(this).show();
        if (validador === 0) {
            $(this).attr("selected", true);
            $('#timp ').val($(this).val());
            validador++;
        } else {
            $(this).attr("selected", false);
        }
        /*if (selectImportExport.indexOf(productoSeleccionado.toUpperCase()) !== -1) {
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
        }*/
        if (productoSeleccionado == '') {
            //SELECCIONAR EL PRIMERO
            $(this).show();
            $('#timp option:first-child').attr("selected", true);
        }
    });
}

function validarRegistrosTabla() {
    let existenRegistros = false;
    if ($('#txtRegistros').attr("cantRegistros") != undefined && $('#txtRegistros').attr("cantRegistros") > 0) {
        existenRegistros = true;
    } else {
        Alerta("NO EXISTEN REGISTROS EN LA TABLA<br> Aplicar otro filtro para cargar registros en la tabla.", "AVISO");
    }
    return existenRegistros;
}

function validarIntervaloFechas() {
    fechaIni = $("#txtDesde").val();
    fechaFin = $("#txtHasta").val();
    let valido = false;

    if (fechaIni !== undefined || fechaFin !== undefined) {
        if (fechaIni < fechaFin) {

            valido = true;
        } else {
            Alerta("INTERVALO DE FECHAS NO PERMITIDO<br>Fecha Inicio es mayor a Fecha Final", "ERROR!");
        }
    } else {
        Alerta("INTERVALO DE FECHAS NO DEFINIDO", "ERROR!");
    }

    return valido;
}

function hoy(formato = "requerimiento") {
    let hoy = new Date();
    let fechaHoy = '';
    let ano = '';
    let mes = '';
    let dia = '';
    ano = hoy.getFullYear();

    if (hoy.getDate() < 10) {
        dia = '0' + hoy.getDate();
    } else {
        dia = hoy.getDate();
    }

    if ((hoy.getMonth() + 1) < 10) {
        mes = '0' + (parseInt(hoy.getMonth()) + 1);
    } else {
        mes = '' + (parseInt(hoy.getMonth()) + 1);
    }
    if (formato == "normal") {
        fechaHoy = ano + '-' + mes + '-' + dia;
    } else {
        fechaHoy = dia + '/' + mes + '/' + ano;
    }

    return fechaHoy;
}

function eliminarPrecioProducto(objDOMHtml) {
    let idPrecioVentaProducto = $(objDOMHtml).parent().parent().attr('idPrecioVentaProducto');
    let descripcionProducto = $($($(objDOMHtml).parent().parent().html())[1]).html();
    let unidadMedida = $($($(objDOMHtml).parent().parent().html())[2]).html();
    let tarifa = $($($(objDOMHtml).parent().parent().html())[3]).html();
    eliminarPrecioProducto(idPrecioVentaProducto);
    function eliminarPrecioProducto(idPrecioVentaProducto) {
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea eliminar el precio de <b>' +
                descripcionProducto + '</b> con tarifa de S/<b>' +
                tarifa + '</b> y unidad de medida <b>' +
                unidadMedida + '</b>?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, Eliminar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                let info = {
                    id: idPrecioVentaProducto
                }
                return get('/ws/registroPrecios.aspx/EliminarProductoPrecio', JSON.stringify(info))
                    .then(function (res) {
                        var r = JSON.stringify(res);
                        if (r.startsWith('[{"ERROR":', 0)) {
                            var err = "";
                            $(res).each(function () {
                                err += this.Error;
                            });
                            Alerta(err, "ERROR!");
                        } else {
                            $(res).each(function () {
                                let msj = "";
                                if (this.RESULTADO == 1) {
                                    msj = "ELIMINADO";
                                    Alerta(msj, "OK");
                                    llenarTabla()
                                } else {
                                    msj = this.MENSAJE;
                                    Alerta(msj, "ERROR");
                                }
                            });
                        }
                    }).catch(function (error) {
                        Alerta(error, "ERROR!");
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then(function (res) {
            if (res.value == true && res.isConfirmed == true) {
                console.log("PROCESADO SATISFACTORIAMENTE");
            } else {
                Alerta("NO SE PROCESO LA SOLICITUD", "ERROR!");
                console.log("NO SE PROCESO LA SOLICITUD");
            }

        });
    }
}

function editarPrecioProducto(objDOMHtml) {
    let idPrecioVentaProducto = $(objDOMHtml).parent().parent().attr('idPrecioVentaProducto');
    let idRegistro = $(objDOMHtml).parent().parent().attr('idRegistro');
    let idMoneda = $(objDOMHtml).parent().parent().attr('idMoneda');

    let codigoProducto = $($($(objDOMHtml).parent().parent().html())[0]).html();
    let descripcionProducto = $($($(objDOMHtml).parent().parent().html())[1]).html();
    let unidadMedida = $($($(objDOMHtml).parent().parent().html())[2]).html();
    let tarifa = $($($(objDOMHtml).parent().parent().html())[3]).html();
    let desde = $($($(objDOMHtml).parent().parent().html())[4]).html();
    let hasta = $($($(objDOMHtml).parent().parent().html())[5]).html();
    let tmpDesde = '';
    let tmpHasta = '';

    tmpDesde = "" + (desde.substring(6, 10).toString()) + "-" + (desde.substring(3, 5).toString()) + "-" + (desde.substring(0, 2).toString());
    tmpHasta = "" + (hasta.substring(6, 10).toString()) + "-" + (hasta.substring(3, 5).toString()) + "-" + (hasta.substring(0, 2).toString());

    let tbodyHTML = '';
    let idUnidadMedida = 0;
    $('#editarRegistroModal').show("slow");
    $('#registroBody').hide();

    tbodyHTML += "<tr idregistro='" + idRegistro + "' idPrecioProducto='" + idPrecioVentaProducto + "'>" +
        "<td>" + codigoProducto + "</td>" +
        "<td>" + descripcionProducto + "</td>" +
        "<td>" + unidadMedida + "</td>" +
        "<td>" + tarifa + "</td>" +
        "<td>" + desde + "</td>" +
        "<td>" + hasta + "</td>" +
        "</tr>";
    $("#txtUnidadMedidaEditado option").each(function () {
        if ($(this).html() == unidadMedida) {
            idUnidadMedida = $(this).val();
        }
    });
    $("#timpe").val(idRegistro);
    $("#txtUnidadMedidaEditado").val(idUnidadMedida);
    $("#txtImporteEditado").val(tarifa);
    $("#txtDesdeEditado").val(tmpDesde);
    $("#txtHastaEditado").val(tmpHasta);
    $('#tblPrecioProductoEditar table tbody').html(tbodyHTML);
    $("#txtMonedae").val(idMoneda);

    //ACCION DEL BOTON EDITAR
}

function cargaMoneda() {
    $("#txtMoneda").empty();
    $("#txtMoneda").append('<option value=""></option>');
    $("#txtMonedae").empty();
    $("#txtMonedae").append('<option value=""></option>');
    get('/ws/monedas.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $.each(res.Info, function () {
                    $("#txtMoneda").append('<option value="' + this.id + '">' + this.mon + '</option>');
                    $("#txtMonedae").append('<option value="' + this.id + '">' + this.mon + '</option>');

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

function insertarPrecioProducto(info) {

    get('/ws/registroPrecios.aspx/InsertarProductoPrecio', JSON.stringify(info))
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let msj = "";
                $(res).each(function () {
                    if (this.STATUS == "EXISTE") {
                        msj += "<b>PRECIO PARA ESE PRODUCTO EN ESE RANGO DE FECHA YA EXISTE</b>";
                        Alerta(msj, titulo = "AVISO");
                    } else if (this.STATUS == "ERROR") {
                        Alerta("OCURRIO UN ERROR EN LA CONSULTA", titulo = "AVISO");
                    } else {
                        Alerta("PRECIO REGISTRADO", "OK");
                    }
                });
                llenarTabla();
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function llenarTabla(presionado = false) {
    get('/ws/registroPrecios.aspx/ListarProductosPrecios')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let tbodyHtml = "";
                $(res).each(function () {
                    
                    tbodyHtml += "<tr idMoneda ='"+this.IDMONEDA +"' idRegistro='" + this.IDREGISTRO + "' idPrecioVentaProducto='" + this.IDPRECIOVENTAPRODUCTO + "'>";
                    tbodyHtml += "<td>";
                    tbodyHtml += this.CODIGOPRODUCTO;
                    tbodyHtml += "</td>";
                    tbodyHtml += "<td>";
                    tbodyHtml += this.DESCRIPCION;
                    tbodyHtml += "</td>";
                    tbodyHtml += "<td>";
                    tbodyHtml += this.UNIDADMEDIDA;
                    tbodyHtml += "</td>";
                    tbodyHtml += "<td>";
                    tbodyHtml += this.TARIFA;
                    tbodyHtml += "</td>";
                    tbodyHtml += "<td>";
                    tbodyHtml += this.FECHADESDE;
                    tbodyHtml += "</td>";
                    tbodyHtml += "<td>";
                    tbodyHtml += this.FECHAHASTA;
                    tbodyHtml += "</td>";
                    tbodyHtml += "<td>";
                    tbodyHtml += "<i class='fa fa-edit text-primary' onclick='editarPrecioProducto(this)'></i>";
                    tbodyHtml += "</td>";
                    tbodyHtml += "<td>";
                    tbodyHtml += "<i class='fa fa-trash text-danger' onclick='eliminarPrecioProducto(this)'></i>";
                    tbodyHtml += "</td>";
                    tbodyHtml += "</tr>";
                });

                $('#txtRegistros').attr("cantRegistros", res.length);
                if (res.length <= 0) {
                    $('#txtRegistros').html("No existen registros para los filtros aplicados");
                    if (presionado) {
                        Alerta("No existen registros para el filtro aplicado.</br>" +
                            "<b>Fecha Inicio: </b>" + fechaIni + "</br>" +
                            "<b>Fecha Fin:</b> " + fechaFin + "</br>" +
                            "<b>Cliente: </b>" + $('#clientesSelect option:selected').text(), "AVISO");
                    }
                } else {
                    $('#txtRegistros').html(res.length + " registros");
                }
                $("#tblPreciosProductos table tbody").html(tbodyHtml);
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function validarIntervaloFechas(desde = "#txtDesde", hasta = "#txtHasta") {
    fechaIni = $(desde).val();
    fechaFin = $(hasta).val();
    let valido = false;

    if (fechaIni !== undefined || fechaFin !== undefined) {
        if (fechaIni < fechaFin) {
            valido = true;
        } else {
            Alerta("INTERVALO DE FECHAS NO PERMITIDO<br>Fecha Desde es mayor a Fecha Hasta", "ERROR!");
        }
    } else {
        Alerta("INTERVALO DE FECHAS NO DEFINIDO", "ERROR!");
    }
    return valido;
}

function CargarImportaciones() {
    let vidalm = 0;
    let alm = $("#alm").val();
    if (alm !== "") vidalm = parseInt(alm);
    get('/ws/registros.aspx/ConsultarXAlmacen', JSON.stringify({ idalm: vidalm }))
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
                    var mod = "";
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
                    //$("#timpe").append('<option value="' + this.ID_REGISTRO + '"> #' + this.NUMERO + " " + mod + " " + this.RAZON_SOCIAL + " " + this.DESCRIPCION + '</option>');
                    //$("#timp").append('<option value="' + this.ID_REGISTRO + '"> #' + this.NUMERO + " " + mod + " " + this.RAZON_SOCIAL + " " + this.DESCRIPCION + '</option>');
                    $("#timpe").append('<option value="' + this.ID_REGISTRO + '"> #' + this.NUMERO + " " + mod + " " + this.RAZON_SOCIAL + '</option>');
                    $("#timp").append('<option value="' + this.ID_REGISTRO + '"> #' + this.NUMERO + " " + mod + " " + this.RAZON_SOCIAL + '</option>');
                });

            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de registros<br />" + error, "ERROR!");
        });
}

function CargarUnidadesMedida()
{
    get('/ws/registroPrecios.aspx/ListarTodosUnidadMedida')
        .then(function (res) {
            var r = JSON.stringify(res);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let selectHtml = "<option value='0'>Seleccione Unidad Medida</option>";
                $(res).each(function () {
                    selectHtml += "<option value='" + this.ID + "'>" + this.UNIDADMEDIDA + "</option>";
                });
                $("#txtUnidadMedida").html(selectHtml);
                $("#txtUnidadMedidaEditado").html(selectHtml);
                $("#txtUnidadMedida").val(2);
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });

}

function CargarProductos() {
    get('/ws/productos.aspx/ListarTodosLosProductosPorConversion', JSON.stringify({ tipoConversion: 2 }))
        .then(function (res) {
            var r = JSON.stringify(res.Respuesta);
            if (r.startsWith('[{"ERROR":', 0)) {
                var err = "";
                $(res.Respuesta).each(function () {
                    err += this.Error;
                });
                Alerta(err, "ERROR!");
            } else {
                let selectHtml = "";

                $(res.Info).each(function () {
                    //selectHtml += "<option codProducto='" + this.CODIGOPRODUCTO + "' value='" + this.IDPRODUCTO + "'>" + this.DESCRIPCION + "</option>";
                    selectHtml += "<option codProducto='" + this.CODIGO_PRODUCTO + "' value='" + this.ID_PRODUCTO + "'>" + this.PRODUCTO + "</option>";
                });
                $("#txtProducto").html(selectHtml);
                $($("#txtProducto option")[0]).attr("selected", true);
                filtrarImportExport();
            }
        }).catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
