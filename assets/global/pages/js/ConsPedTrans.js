function cargaVentas2(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
        columnas: [
            { leyenda: '#Viaje', class: 'text-center thp', ordenable: false, columna: 'NoViaje', filtro: true },
            { leyenda: 'Empresa', class: 'text-center thp',  ordenable: false, columna: 'NOMBRE1', filtro: false },
            { leyenda: 'Marca', class: 'text-center thp',  ordenable: false, columna: 'MARCANOMBRE', filtro: true },
            { leyenda: 'Placa', class: 'text-center thp',  ordenable: false, columna: 'PLACA', filtro: false },
            { leyenda: 'Conductor', class: 'text-center thp',  ordenable: false, columna: 'TRANSPORTISTA', filtro: true },
            { leyenda: 'Producto', class: 'text-center thp',  ordenable: false, columna: 'DESCRIPCION', filtro: true },
            { leyenda: 'Unidad Medida', class: 'text-center thp', ordenable: false, columna: 'UNIDAD_MEDIDA', filtro: true },
            { leyenda: 'Cantidad', class: 'text-center thp',ordenable: false, columna: 'CANTIDAD', filtro: true },
        ],
        modelo: [
            { propiedad: 'NoViaje', class: 'text-center tdp' },
            { propiedad: 'NOMBRE1', class: 'text-center tdp' },
            { propiedad: 'MARCANOMBRE', class: 'text-center tdp' },
            { propiedad: 'PLACA', class: 'text-center tdp' },
            { propiedad: 'TRANSPORTISTA', class: 'text-center tdp' },
            { propiedad: 'DESCRIPCION', class: 'text-center tdp' },
            { propiedad: 'UNIDAD_MEDIDA', class: 'text-center tdp' },
            { propiedad: 'CANTIDAD', class: 'text-center tdp' },

        ],
        url: '/ws/RegVtas.aspx/ListarVentTrans',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [20, 25, 50],
        columna: 'NOMBRE',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#PedTrans").MALCO(data);
}
function cargaViajes() {
    $("#viaje").empty().append('<option value="0">--Seleccionar--</option>');

    get('/ws/ViajeNo.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#viaje").append('<option value="' + this.id + '">' + this.no + '</option>');
                    });
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de viajes<br/>" + error, "ERROR");
        });
}
function cargaTransportista() {
    $("#tranp").empty().append('<option value="0">Seleccionar</option>');
    get('/ws/Transportistas.aspx/ConsultarT', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#tranp").append('<option value="' + this.ID_TRANSPORTISTA + '">' + this.NOMBRE + " " + this.MARCANOMBRE + " " + this.NUMERO_DOCUMENTO + " " + this.TRANSPORTISTA + '</option>');
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

function cargaVentas() {
    let param = new Object();
    var from = $("#bfec").val().split("/");
    var f = new Date(from[2], from[1] - 1, from[0]);
    var hasta = $("#bfech").val().split("/");
    var h = new Date(hasta[2], hasta[1] - 1, hasta[0]);
    var viaje = $("#viaje").val();
    var empresa = $("#tranp").val();
    $("#infoven tbody").empty();
    get('/ws/RegVtas.aspx/ListarVentTrans', JSON.stringify({ desde: f, hasta: h, viaje: viaje, empresa: empresa }))
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
                        id = $("#infoven tbody tr").length;
                        let fila = "";
                        let idvent = this.id;
                        fila = '<tr id="f' + id + '">' +
                            '<td class="tdp">' + this.Viaje + '</td>' +
                            '<td class="tdp">' + this.Empresa + '</td>' +
                            '<td class="tdp">' + this.Marca + '</td>' +
                            '<td class="tdp">' + this.Placa + '</td>' +
                            '<td class="tdp">' + this.Conductor + '</td>' +
                            '<td class="tdp">' + this.Producto + '</td>' +
                            '<td class="tdp">' + this.UM + '</td>' +
                            '<td class="tdp">' + this.Cantidad + '</td>' +
                            '<td class="tdp" style="display: none;">' + this.Categoria + '</td>' +
                            '<td class="tdp" style="display: none;">' + this.Codigo + '</td>' +
                            '<td class="tdp" style="display: none;">' + this.FechaEmision + '</td>' +
                            '</tr>';
                        $("#infoven tbody").append(fila);   
                    });
            }


        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
        });

}


//REportes e pdf y excel
function exportar(tipo) {
    var jsondet = [];
    var i = 1;

    $("#infoven tbody").children("tr").each(function (index) {
        var viaje,empresa,marca,placa,conductor,producto,um,cant;
        $(this).children("td").each(function (ind1) {
            switch (ind1) {
                case 0:
                    viaje = $(this).html();
                    break;
                case 1:
                    empresa = $(this).html();
                    break;
                case 2:
                    marca = $(this).html();
                    break;
                case 3:
                    placa = $(this).html();
                    break;
                case 4:
                    conductor = $(this).html();
                    break;
                case 5:
                    producto = $(this).html();
                    break;
                case 6:
                    um = $(this).html();
                    break;
                case 7:
                    cant = $(this).html();
                    break;
                
            }
        });
        var fila = {
            Viaje: viaje,
            Empresa: empresa,
            Marca: marca,
            Placa: placa,
            Conductor: conductor,
            Producto: producto,
            UM: um,
            Cant: cant
        };
        jsondet.push(fila);
             
        
    });
    if (jsondet.length > 0) {
        var json = {
            json: JSON.stringify(jsondet),
        };
        get('/ws/RegVtas.aspx/ExportarPedidosT', JSON.stringify(json))
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
                Alerta("No fue posible generar el archivo<br />" + error, "ERROR!");
            });
    } else {
        Alerta("No hay nada que exportar", "Error!", typIconoAlerta.aviso);
    }
}

function genpdf() {
    var jsondet = [];
    var i = 1;

    $("#infoven tbody").children("tr").each(function (index) {
        var viaje, empresa, marca, placa, conductor, producto, um, cant, cod, cat, fecemi;
        $(this).children("td").each(function (ind1) {
            switch (ind1) {
                case 0:
                    viaje = $(this).html();
                    break;
                case 1:
                    empresa = $(this).html();
                    break;
                case 2:
                    marca = $(this).html();
                    break;
                case 3:
                    placa = $(this).html();
                    break;
                case 4:
                    conductor = $(this).html();
                    break;
                case 5:
                    producto = $(this).html();
                    break;
                case 6:
                    um = $(this).html();
                    break;
                case 7:
                    cant = $(this).html();
                    break;
                case 8:
                    cat = $(this).html();
                    break;
                case 9:
                    cod = $(this).html();
                    break;
                case 10:
                    fecemi = $(this).html();
                    break;
            }
        });
        var fila = {
            Viaje: viaje,
            Empresa: empresa,
            Marca: marca,
            Placa: placa,
            Conductor: conductor,
            Producto: producto,
            UM: um,
            Cant: cant,
            Codigo: cod,
            Categoria: cat,
            FechaEmision: fecemi
        };
        jsondet.push(fila);


    });
    if (jsondet.length > 0) {
        var desde = $("#bfec").val().split("/");
        var d = new Date(desde[2], desde[1] - 1, desde[0]);
        var hasta = $("#bfech").val().split("/");
        var h = new Date(hasta[2], hasta[1] - 1, hasta[0]);

        var json = {
            json: JSON.stringify(jsondet),
            rangoFecha: JSON.stringify({
                desde: d,
                hasta: h
            })
        };
        get('/ws/RegVtas.aspx/GeneraPdfPedidosT', JSON.stringify(json))
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



$(document).ready(function () {
    cargaTransportista();
    cargaViajes();
    $("#accordionSidebar").addClass("toggled");
    $('#bfec').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es", defaultDate: new Date(), value: formatoFecha(new Date(), 1)  });
    $('#bfech').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });

    $(".gj-icon").each(function () {
        if ($(this).parent().parent().parent().parent()[0].id === "busqueda") {
            $(this).css({ "margin-left": "-2px", "margin-top": "-5px" }).parent().height("17px").css({ "margin-left": "-7px", "margin-right": "10px" }).hide();
        }
        else {
            $(this).css({ "margin-top": "0" });
        }
    });

    $("#bus").on("click", function () {
        let param = new Object();
        var from = $("#bfec").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);
        param.fecemi = f;
        cargaVentas();        
    });

    $("#regvent").on("click", function () {
        window.location.href = "/pages/vtas/Ventas.aspx";

    });

    //convertir el combo en select2
    $('.select2').each(function () {
        $(this).select2({
            width: '100%'
        });
    });
    /*CAMBIO DE BUSQUEDA DE SELECT 2--EXPRESIONES REGULARES*/
    $("#tranp").select2({
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


});
