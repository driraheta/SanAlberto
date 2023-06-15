$(document).ready(function () {
    $("#id").val("");
    cargaAlmacenes();
    cargaProducto();

    $('.datepicker').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    });

    $('.select2').each(function () {
        $(this).select2({
            width: '100%'
        });
    });


    /*CAMBIO DE BUSQUEDA DE SELECT 2--EXPRESIONES REGULARES*/
    $("#selprod").select2({
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
    let fecha = new Date();
    $("#fecf").datepicker().value(fecha);
    fecha = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    $("#feci").datepicker().value(fecha);
    //Filtro
    $('#filtroProducto').on("keyup", function () {
        let filtro = $('#filtroProducto').val();
        let _this = this;
        $('#selprod option').each(function () {
            let nombreProducto = $(this).text().toUpperCase();
            let codigoProducto = $(this).attr("codigo");
            let validador = 0;
            let contador = 0;

            if (nombreProducto.indexOf(filtro.toUpperCase()) !== -1 || codigoProducto.indexOf(filtro) !== -1) {
                $(this).show();
                if (validador === 0) {
                    $(this).attr("selected", true);
                    $('#selprod').val($(this).val());
                    $("#txtcod").val(codigoProducto);

                    validador++;
                } else {
                    $(this).attr("selected", false);
                }
            } else {
                $(this).attr("selected", false);
                $(this).hide();
                contador++;
                if ($(this).attr("style") == "display: none;" && contador == $('#selprod option').length) {
                    $('#selprod').val('');
                }
            }
            if (filtro == '') {
                //SELECCIONAR EL PRIMERO
                $(this).show();
                $('#selprod option:first-child').attr("selected", true);
            }
        });
    });

});
function cargaAlmacenes() {
    let iduser = Cookies.get('idu');
    get('/ws/almacenes.aspx/ConsultarXUsuario', JSON.stringify({ idu: iduser }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#selalm").html(html);
                    var html = "";
                    //html += '<option value="0">Todos</option>';
                    $(res.Info).each(function () {
                        html += '<option value="' + this.ID_ALMACEN + '">' + this.ALMACEN + '</option>';
                    });
                    $("#selalm").html(html);
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

function cargaProducto() {
    get('/ws/productos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#selprod").html("");
                    var html = "<option codigo='0' value='0'>Todos</option>";
                    $(res.Info).each(function () {
                        html += '<option codigo="' + this.copro + '"value="' + this.id + '" data-cod="' + this.copro + '">' + this.copro + ' ' + this.pro + '</option>';
                    });
                    $("#selprod").html(html);
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

function traerInfo() {
    $("#reporte").show();
    $("#lista").hide();
    var fini = $("#feci").val();
    if (fini === null) {
        fini = "1990-01-01";
    }
    var ffin = $("#fecf").val();
    if (ffin === null) {
        ffin = "1990-01-01";
    }
    if (fini != "1990-01-01") {
        let filtroFIniFormat = fini.substr(6, 4) + "-" + fini.substr(3, 2) + "-" + fini.substr(0, 2);
        fini = filtroFIniFormat;
    }
    if (ffin != "1990-01-01") {
        let filtroFIniFormat = ffin.substr(6, 4) + "-" + ffin.substr(3, 2) + "-" + ffin.substr(0, 2);
        ffin = filtroFIniFormat;
    }
    if (!validarIntervaloFechas(fini, ffin)) {
        return;
    }
    var json = {
        IdProducto: $("#selprod").val(),
        fini: fini,
        fecf: ffin,
        idAlm: $("#selalm").val(),
        Tpo: $("#selValora").val()
    }
    get('/ws/KardesInvWs.aspx/Consultar', JSON.stringify(json))
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
                var ind = 1;
                $(res).each(function () {
                    var cls = "success";
                    var text = 'E';
                    if (this.Tipo === "Salidas") {
                        cls = "danger";
                        var text = 'S';
                    }
                    var desc = '<div class="media">' +
                        '<button type="button" class="btn btn-'+ cls +' btn-circle" >'+ text +'</button>' +
                        '<div class="media-body"> ' +
                        '<h5 class="media-heading text-primary">'+ this.Concepto +'</h5> ' +
                        '<span class=" text-secondary"><strong>' + this.Documento +'</strong></span>' +
                            '</div>' +
                            '</div>';
                    html += "<tr>";
                    html += "<td>" + this.CODIGO_PRODUCTO + "</td>";
                    html += "<td>" + this.PRODUCTO + "</td>";
                    html += "<td>" + formatoFecha(this.Fecha, 1) + "</td>";
                    html += "<td conc='" + this.Concepto + "' doc='" + this.Documento + "'>" + desc + "</td>";
                    html += "<td>" + this.STOCKINICIAL + "</td>";
                    html += "<td>" + this.STOCKFINAL + "</td>";
                    html += "<td class='bg-success text-white'>" + this.Entrada + "</td>";
                    html += "<td class='bg-success text-white'>" +  this.PrecioEntra + "</td>";
                    html += "<td class='bg-success text-white'>" + this.TotalEntra + "</td>";
                    html += "<td class='bg-info text-white'>" + this.Sale + "</td>";
                    html += "<td class='bg-info text-white'>" + this.PrecioSale + "</td>";
                    html += "<td class='bg-info text-white'>" + this.TotalSale + "</td>";
                    html += "<tr>";
                    ind = ind + 1;
                });
                $("#lproent tbody").html(html);
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
        });
}
function cerrar() {
    $("#reporte").hide();
    $("#lista").show();
}
function buscaCod() {
    var cod = $("#txtcod").val();
    $("#selprod option").each(function () {
        if ($(this).attr("data-cod") === cod) {
            $(this).attr("selected",true);
        }
    });
}

function exportar(tipo) {
    var jsondet = [];
    var tpon = "";
    var i = 1;
    $("#lproent tbody").children("tr").each(function (index) {
        var Cod = "", Prod, fechaoper, tipooper, cantentr, umentr, costounientr, costtorentr, cantsal, umsal, costounisal, costtorsal,stockini,stockfin;
        $(this).children("td").each(function (ind) {

            switch (ind) {
                case 0:
                    Cod = $(this).html();
                    break;
                case 1:
                    Prod = $(this).html();
                    break;
                case 2:
                   fechaoper = $(this).html();
                    break;
                case 3:
                    tipooper = $(this).attr("conc") + " " + $(this).attr("doc");
                    break;
                case 4:
                    stockini = $(this).html();
                    break;
                case 5:
                    stockfin = $(this).html();
                    break;
                case 6:
                    cantentr = $(this).html();
                    break;
                case 7:
                    costounientr = $(this).html();
                    break;
                case 8:
                    costtorentr = $(this).html();
                    break;
                case 9:
                    cantsal = $(this).html();
                    break;
                case 10:
                    costounisal = $(this).html();
                    break;
                case 11:
                    costtorsal = $(this).html();
                    break;
            }
        });
        if (Cod !== "") {
            var fila = {
                Codigo: Cod,
                Producto: Prod,
                Fechaoper: fechaoper,
                Tipooper: tipooper,
                StockIni: stockini,
                StockFin: stockfin,
                CantEntr: cantentr,
                UMEntr: "CAJA",
                CostoUniEntr: costounientr,
                CostoTotEntr: costtorentr,
                CantSal: cantsal,
                UMSal: "CAJA",
                CostoUniSal: costounisal,
                CostoTotSal: costtorsal
            };
            jsondet.push(fila);
        }
    });
    if (jsondet.length > 0) {
        var json = {
            json: JSON.stringify(jsondet),
            user: Cookies.get('nom')
        };
        get('/ws/KardesInvWs.aspx/Export', JSON.stringify(json))
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
                Alerta("No fue posible cargar el listado de almacenes<br />" + error, "ERROR!");
            });
    } else {
        Alerta("No hay nada que exportar", "Error!", typIconoAlerta.aviso);
    }
}

function GENPDF(tipo) {
    var jsondet = [];
    var tpon = "";
    var i = 1;
    $("#lproent tbody").children("tr").each(function (index) {
        var Cod = "", Prod, fechaoper, tipooper, cantentr, umentr, costounientr, costtorentr, cantsal, umsal, costounisal, costtorsal, stockini, stockfin;
        $(this).children("td").each(function (ind) {

            switch (ind) {
                case 0:
                    Cod = $(this).html();
                    break;
                case 1:
                    Prod = $(this).html();
                    break;
                case 2:
                    fechaoper = $(this).html();
                    break;
                case 3:
                    tipooper = $(this).attr("conc") + " " + $(this).attr("doc");
                    break;
                case 4:
                    stockini = $(this).html();
                    break;
                case 5:
                    stockfin = $(this).html();
                    break;
                case 6:
                    cantentr = $(this).html();
                    break;
                case 7:
                    costounientr = $(this).html();
                    break;
                case 8:
                    costtorentr = $(this).html();
                    break;
                case 9:
                    cantsal = $(this).html();
                    break;
                case 10:
                    costounisal = $(this).html();
                    break;
                case 11:
                    costtorsal = $(this).html();
                    break;
            }
        });
        if (Cod !== "") {
            var fila = {
                Codigo: Cod,
                Producto: Prod,
                Fechaoper: fechaoper,
                Tipooper: tipooper,
                StockIni: stockini,
                StockFin: stockfin,
                CantEntr: cantentr,
                UMEntr: "CAJA",
                CostoUniEntr: costounientr,
                CostoTotEntr: costtorentr,
                CantSal: cantsal,
                UMSal: "CAJA",
                CostoUniSal: costounisal,
                CostoTotSal: costtorsal
            };
            jsondet.push(fila);
        }
    });
    if (jsondet.length > 0) {
        var json = {
            json: JSON.stringify(jsondet),
            user: Cookies.get('nom')
        };
        get('/ws/KardesInvWs.aspx/PDF', JSON.stringify(json))
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
