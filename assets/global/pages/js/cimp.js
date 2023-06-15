(function ($) {
    function guardaFlete() {
        let url;
        let flete = new Object();

        flete.id = $("#idf").val();
        flete.tip = $("#tipf").val();
        flete.imp = $("#impf").val().replace('/,/g', '');
        flete.des = new Date(formatoFecha($("#def").datepicker().fecha(), 2));
        flete.has = new Date(formatoFecha($("#hasf").datepicker().fecha(), 2));

        url = flete.id === "0" ? "Insertar" : "Actualizar";


        get('/ws/fletesmarinos.aspx/' + url, JSON.stringify({ info: JSON.stringify(flete) }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    Alerta("El registro se guardó correctamente");
                    cargaFletes(0);
                    $("#tipf").val("");
                    $("#impf").val("");
                    $("#def").val("");
                    $("#hasf").val("");
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("no fue posible insertar la información del flete marino<br />" + error, "ERROR!");
            });
    }
    function cargaGastos(id) {
        $("#gasto tbody").empty();
        get('/ws/gastosoperacion.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            let fila = '<tr><td>Gasto Operador</td>' +
                                '<td class="text-center">' + (this.tip === 1 ? 'Tarifa por Caja' : 'Monto Final') + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.imp, 1, true) + '</td>' +
                                '<td class="text-center">' + formatoFecha(this.des, 1) + '</td>' +
                                '<td class="text-center">' + formatoFecha(this.has, 1) + '</td>' +
                                '<td style="width:1%; white-space:nowrap"><i style="cursor:pointer" title="Editar Gasto" class="fa fa-edit" id="ef' + this.id + '"></i>&nbsp;&nbsp;' +
                                '<i title="Eliminar Gasto" style="cursor:pointer" class="fa fa-trash text-danger" id = "ef' + this.id + '" ></i></tr>';

                            $("#gasto").append(fila);
                            fila = $("#gasto tbody tr:last")[0];
                            $(fila.cells[5].childNodes[2]).on("click", function () {
                                eliminaFlete(this.id.substring(2));
                            });
                            $(fila.cells[5].childNodes[0]).on("click", function () {
                                editaGasto(this.id.substring(2));
                            });
                        })
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de gastos de operador<br/>" + error, "ERROR!");
            })
    }
    function editaFlete(id) {
        get('/ws/fletesmarinos.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info.length > 0) {
                        $("#tipf").val(res.Info[0].tip);
                        $("#impf").val(res.Info[0].imp);
                        $("#def").datepicker().value(new Date(formatoFecha(res.Info[0].des, 2)));
                        $("#hasf").datepicker().value(new Date(formatoFecha(res.Info[0].has, 2)));

                        $("#idf").val(id);
                        $("#canf").show();
                    }
                }
                else {

                }
            })
    }
    function cargaFletes(id) {
        $("#fmarino tbody").empty();
        get('/ws/fletesmarinos.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            let fila = '<tr><td>Flete Marino</td>' +
                                '<td class="text-center">' + (this.tip === 1 ? 'Tarifa por Caja' : 'Monto Final') + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.imp, 1, true) + '</td>' +
                                '<td class="text-center">' + formatoFecha(this.des, 1) + '</td>' +
                                '<td class="text-center">' + formatoFecha(this.has, 1) + '</td>' +
                                '<td style="width:1%; white-space:nowrap"><i style="cursor:pointer" title="Editar Flete" class="fa fa-edit" id="ef' + this.id + '"></i>&nbsp;&nbsp;' +
                                '<i title="Eliminar Flete" style="cursor:pointer" class="fa fa-trash text-danger" id = "ef' + this.id + '" ></i></tr>';

                            $("#fmarino").append(fila);
                            fila = $("#fmarino tbody tr:last")[0];
                            $(fila.cells[5].childNodes[2]).on("click", function () {
                                eliminaFlete(this.id.substring(2));
                            });
                            $(fila.cells[5].childNodes[0]).on("click", function () {
                                editaFlete(this.id.substring(2));
                            });
                        })
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de fletes marinos<br/>" + error, "ERROR!");
            })
    }
    function eliminaFlete(id) {
        get('/ws/fletesmarinos.aspx/Eliminar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    cargaFletes(0);
                    Alerta("El registro se eliminó correctamente");
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible eliminar el flete marino especificado<br />" + error);
            })
    }
    function guardaGasto() {
        let url;
        let flete = new Object();

        flete.id = $("#idg").val();
        flete.tip = $("#tipg").val();
        flete.imp = $("#impg").val().replace('/,/g', '');
        flete.des = new Date(formatoFecha($("#deg").datepicker().fecha(), 2));
        flete.has = new Date(formatoFecha($("#hasg").datepicker().fecha(), 2));

        url = flete.id === "0" ? "Insertar" : "Actualizar";


        get('/ws/gastosoperacion.aspx/' + url, JSON.stringify({ info: JSON.stringify(flete) }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    Alerta("El registro se guardó correctamente");
                    cargaGastos(0);
                    $("#tipg").val("");
                    $("#impg").val("");
                    $("#deg").val("");
                    $("#hasg").val("");

                    $("#guaf").hide();
                    $("#guaf").hide();
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("no fue posible insertar la información del gasto de operador<br />" + error, "ERROR!");
            });
    }
    function editaGasto(id) {
        get('/ws/gastosoperacion.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info.length > 0) {
                        $("#tipg").val(res.Info[0].tip);
                        $("#impg").val(res.Info[0].imp);
                        $("#deg").datepicker().value(new Date(formatoFecha(res.Info[0].des, 2)));
                        $("#hasg").datepicker().value(new Date(formatoFecha(res.Info[0].has, 2)));

                        $("#idg").val(id);
                        $("#cang").show();
                    }
                }
                else {

                }
            })
    }
    function eliminaFlete(id) {
        get('/ws/gastosoperacion.aspx/Eliminar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    cargaGastos(0);
                    Alerta("El registro se eliminó correctamente");
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible eliminar el gasto de operador especificado<br />" + error);
            })
    }

    $(document).ready(function () {

        cargaGastos(0);
        cargaFletes(0);


        $('#def').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        $('#hasf').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        $('#deg').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        $('#hasg').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });

        $(".gj-icon").css({ "margin-top": "-4px" });

        $("#canf").on("click", function () {
            $(this).hide();
            $("#idf").val("");

            $("#tipf").val("");
            $("#impf").val("");
            $("#def").val("");
            $("#hasf").val("");
        })
        $("#guaf").on("click", function () {
            if (valForm("fletem")) {
                guardaFlete();
            }
        });
        $("#impf").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });

        $("#cang").on("click", function () {
            $(this).hide();
            $("#idg").val("");

            $("#tipg").val("");
            $("#impg").val("");
            $("#deg").val("");
            $("#hasg").val("");
        })
        $("#guag").on("click", function () {
            if (valForm("gastos")) {
                guardaGasto();
            }
        });
        $("#impg").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
    });
})(jQuery);