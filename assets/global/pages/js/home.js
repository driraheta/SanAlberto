(function ($) {
    $(document).ready(function () {
        llenarTabla();
        $('.datepicker').each(function () {
            $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        });

        //INDICADOR 01
        get('/ws/dashboard.aspx/GenerarCantidadPedidosVentaHoy')
            .then(function (res) {
                var r = JSON.stringify(res);
                if (r.startsWith('[{"ERROR":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR!");
                } else {
                    console.log("INDICADOR 01----");
                    let tmpT = 0;
                    let meta = 500;
                    let texto = '';

                    $(res).each(function () {
                        console.log(this.CANTIDAD)
                        if (this.CANTIDAD > 0) {
                            tmpT = this.CANTIDAD;
                        } else {
                        }
                    });

                    if (parseInt(tmpT) >= meta) {
                        $("#indicadorIcon01").attr('Style', 'color:#35df39');
                    }
                    texto = '' + tmpT;
                    maquinaEscribir(texto, $("#indicador01 div"));
                }
            }).catch(function (error) {
                Alerta(error, "ERROR!");
            });

        $("#hoy").html(hoy());

        $("#bienvenidoTxt").html("Bienvenido: " + $("#nomUsu").html());

        $("#filtrarBtn").on("click", function () {
            llenarTabla();
        });

        $("#restablecerFiltros").on("click", function () {
            $("#filtroFechaInicio").val("");
            $("#filtroFechaFin").val("");
            $("#rpCodigo").val("");
            $("#rpProducto").val("");

            llenarTabla();
        });


    });
    //TABLA 01
    function llenarTabla() {
        let info = new Object();
        let reg = new Object();
        reg.fini = new Date(formatoFecha($("#filtroFechaInicio").datepicker().fecha(), 2));
        reg.ffin = new Date(formatoFecha($("#filtroFechaFin").datepicker().fecha(), 2));
        reg.fechaHoy = hoy("normal");
        reg.cod = $("#rpCodigo").val();
        reg.desc = $("#rpProducto").val(); 
        info.info = JSON.stringify(reg)
        let cant = 0;
        get('/ws/registroPrecios.aspx/listarProductosStockPrecioVenta', JSON.stringify(info))
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
                        if (this.STOCK > 0) {
                            tbodyHtml += "<tr>";
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
                            tbodyHtml += this.STOCK;
                            tbodyHtml += "</td>";
                            tbodyHtml += "</tr>";
                            cant++;
                        }
                    });

                    $('#txtRegistros').attr("cantRegistros", cant);
                    if (cant <= 0) {
                        $('#txtRegistros').html("No existen registros para los filtros aplicados");
                        //if (presionado) {
                        //    Alerta("No existen registros para el filtro aplicado.</br>" +
                        //        "<b>Fecha Inicio: </b>" + fechaIni + "</br>" +
                        //        "<b>Fecha Fin:</b> " + fechaFin + "</br>" +
                        //        "<b>Cliente: </b>" + $('#clientesSelect option:selected').text(), "AVISO");
                        //}
                    } else {
                        $('#txtRegistros').html(cant + " registros");
                    }
                    $("#tblProductos table tbody").html(tbodyHtml);
                }
            }).catch(function (error) {
                Alerta(error, "ERROR!");
            });
    }

    //FUNCIONES AUXILIARES
    function maquinaEscribir(texto, ubicacion) {

        let arrFromStr = texto.split('');


        let i = 0;
        ubicacion.html('');
        let printStr = setInterval(function () {

            ubicacion.html(ubicacion.html() + arrFromStr[i]);
            i++;
            if (i === arrFromStr.length) {
                clearInterval(printStr);
            }
        }, 70);
    }

    /*
    var ctxChart05 = document.getElementById('myChart05').getContext('2d');
    var myChart05 = new Chart(ctxChart05, configChart05);
    */
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

})(jQuery);