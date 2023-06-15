var aplica = true;


$(document).ready(function () {
    // cargaCXC();
    cargaCXC2();
    cargaCXCDF();
    //cargaClientes(0);
    cargaContactos();
    $('.datepicker').each(function () {
        $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    });
    $('#bfecd2').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#bfeca2').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });

    $('#bfecd').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
    $('#bfeca').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });

    $('#fecp').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
    $('#fecp2').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });

    $(".gj-icon").each(function () {
        if ($(this).parent().parent().parent().parent()[0].id === "busqueda") {
            $(this).css({ "margin-left": "-2px", "margin-top": "-5px" }).parent().height("17px").css({ "margin-left": "-7px", "margin-right": "10px" }).hide();
        }
        else {
            $(this).css({ "margin-top": "0" });
        }
        if ($(this).parent().parent().parent().parent()[0].id === "busqueda2") {
            $(this).css({ "margin-left": "-2px", "margin-top": "-5px" }).parent().height("17px").css({ "margin-left": "-7px", "margin-right": "10px" }).hide();
        }
        else {
            $(this).css({ "margin-top": "0" });
        }
    });
    $("#selectall").on("click", function () {
        $(".case").prop("checked", this.checked);
    });
    $("#selectall2").on("click", function () {
        $(".case2").prop("checked", this.checked);
    });
    $(".case").on("click", function () {
        if ($(".case").length === $(".case:checked").length) {
            $("#selectall").prop("checked", true);
        } else {
            $("#selectall").prop("checked", false);
        }
    });
    $(".case2").on("click", function () {
        if ($(".case2").length === $(".case:checked").length) {
            $("#selectall2").prop("checked", true);
        } else {
            $("#selectall2").prop("checked", false);
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
    $("#opc2").on("change", function () {
        $("#bfecd2").hide();
        $("#bfeca2").hide();
        $("#bval2").hide();
        $(".gj-icon").parent().hide();

        if ($(this).val() === "3") {
            $("#bfecd2").show();
            $("#bfeca2").show();

            $(".gj-icon").parent().show();
        }
        else if ($(this).val() === "1") {
            $("#bval2").show();
        } else if ($(this).val() === "2") {
            $("#bval2").show();
        }
        else if ($(this).val() === "0") {
            $("#bfecd2").hide();
            $("#bfeca2").hide();
            $("#bval2").hide();
            $(".gj-icon").parent().hide();

        }
    });

    //$("#bus").on("click", function () {
    //    let param = new Object();

    //    if ($("#opc").val() === "") {
    //        cargaCXC2();
    //    }
    //    else {
    //        if ($("#opc").val() === "4") {
    //            if ($("#bfecd").val() !== "" && $("#bfeca").val() !== "") {

    //                param.feci = $("#bfecd").datepicker().fecha();
    //                param.fecf = $("#bfeca").datepicker().fecha();

    //            }
    //            else {
    //                Alerta("Debe especificar una fecha", "AVISO!");
    //            }
    //        }
    //        else if ($("#opc").val() !== "") {
    //            //param.num = $("#bval").val().trim();

    //            if ($("#opc").val() === "1")
    //                param.nom = $("#bval").val().trim();

    //            if ($("#opc").val() === "2")
    //                param.cont = $("#bval").val().trim();

    //            if ($("#opc").val() === "3")
    //                param.ruc = $("#bval").val().trim();
    //        }

    //        cargaCXC2(param);
    //    }
    //});

    $("#bus").on("click", function () {
        cargaCXCMain();
    });

    $("#restablecerFiltros").on("click", function () {
        limpiaFiltros();
        cargaCXC2();
    });

    $("#bus2").on("click", function () {
        let param = new Object();

        if ($("#opc2").val() === "") {
            cargaCXCDF();
        }
        else {
            if ($("#opc2").val() === "3") {
                if ($("#bfecd2").val() !== "" && $("#bfeca2").val() !== "") {

                    param.feci = $("#bfecd2").datepicker().fecha();
                    param.fecf = $("#bfeca2").datepicker().fecha();

                }
                else {
                    Alerta("Debe especificar una fecha", "AVISO!");
                }
            }
            else if ($("#opc2").val() !== "") {
                //param.num = $("#bval").val().trim();

                if ($("#opc2").val() === "1")
                    param.nom = $("#bval2").val().trim();

                if ($("#opc2").val() === "2")
                    param.cont = $("#bval2").val().trim();

                if ($("#opc2").val() === "3")
                    param.ruc = $("#bval2").val().trim();
            }

            cargaCXCDF(param);
        }
    });

    $("#regpago").on("click", function () {
        validacont();
        if (aplica) {
            $("#mregpagos").modal({ backdrop: 'static', keyboard: false });

            getdata();
        } else {
            Alerta("Uno de los Registros seleccionados no tiene el mismo Contacto", "ERROR!");
        }
    });
    $("#canp").on("click", function () {
        $("#mregpagos").modal("toggle");
    });
    $("#agrp").on("click", function () {
        guardaRegistro();
    });
    //Evento para  calcular el monto total a pagar
    $("#tinforpbody").on('input', '.montoap', function () {
        var total = 0;
        var monto = 0;
        //suma los importes de cada concepto
        $("#tinforpbody .montoap").each(function () {
            monto += Number($(this).val());
        });
        total = Number($("#totdeuda").val());
        var pendiente = total - monto;
        $("#totapagar").val(monto);
        $("#deudapendiente").val(pendiente);

    });

    //evento cuando cambia el metodo de pago
    $("#tinforpbody").on('input', '.mod', function () {
        $trBanco = $(this).parent().next().children();
        $trNoOper = $(this).parent().next().next().children();
        //si el metodo de pago es Deposito o Transefencia
        if ($(this).find('option:selected').text().toUpperCase() === "CONTADO") {

            $trBanco.prop("selectedIndex", 0);
            $trBanco.prop("disabled", true);
            $trNoOper.prop("readonly", true);
        } else {
            $trBanco.prop("disabled", false);
            $trNoOper.prop("readonly", false);
        }
    });

    $("#regpago2").on("click", function () {
        $("#mregpagos2").modal({ backdrop: 'static', keyboard: false });

        getdataDF();
    });
    $("#canp2").on("click", function () {
        $("#mregpagos2").modal("toggle");
    });

    //Evento para  calcular el monto total a pagar
    $("#tinforpbody2").on('input', '.montoap', function () {
        var monto = 0;
        //suma los importes de cada concepto
        $("#tinforpbody2 .montoap").each(function () {
            monto += Number($(this).val());
        });
        $("#totapagar2").val(monto);
    });

    //evento cuando cambia el metodo de pago
    $("#tinforpbody2").on('input', '.mod', function () {
        $trBanco = $(this).parent().next().children();
        $trNoOper = $(this).parent().next().next().children();
        //si el metodo de pago es Deposito o Transefencia
        if ($(this).find('option:selected').text().toUpperCase() === "DEPOSITO" || $(this).find('option:selected').text().toUpperCase() === "TTRANSFERENCIA") {
            $trBanco.prop("disabled", false);
            $trNoOper.prop("readonly", false);

        } else {
            $trBanco.prop("selectedIndex", 0);
            $trBanco.prop("disabled", true);
            $trNoOper.prop("readonly", true);
        }
    });
    $("#agrp2").on("click", function () {
        guardaRegistro2();
    });


    //Evento para ver los pagos
    $("#info tbody ").on("click", "i", function () {
        var idv = $(this).attr("idvent");
        cargaPagos(idv);
        $("#mpagos").modal({ backdrop: 'static', keyboard: false });
    });
});

function limpiaFiltros() {
    $("#bfecd").val("");
    $("#bfeca").val("");
    $("#clienteValor").val("");
    $("#contactoValor").val("");
    $("#rucValor").val("");
    $("#seltpo").val("");

}
function cargaCXCMain() {
    let param = new Object();

    if ($("#bfecd").val() !== "") param.feci = $("#bfecd").datepicker().fecha();

    if ($("#bfeca").val() !== "") param.fecf = $("#bfeca").datepicker().fecha();

    if ($("#clienteValor").val() !== "") param.nom = $("#clienteValor").val();

    if ($("#contactoValor").val() !== "")  param.cont = $("#contactoValor").val();
   
    if ($("#rucValor").val() !== "")   param.ruc = $("#rucValor").val();

    if ($("#seltpo").val() !== "") param.estado = $("#seltpo").val();
    if ($("#serieValor").val() !== "") param.serie = $("#serieValor").val();
    if ($("#numeroValor").val() !== "") param.numero = $("#numeroValor").val();

    cargaCXC2(param);
}
function cargaCXC(fil = "") {
    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
        columnas: [
            { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'SERIE', filtro: false },
            { leyenda: 'Número', class: 'text-center thp', ordenable: false, columna: 'NUMERO', filtro: false },
            { leyenda: 'Formas de Pago', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'FORMAPAGO', filtro: false },
            { leyenda: 'Fecha Emisión', class: 'text-center thp', ordenable: false, columna: 'FECHAEMISION', filtro: true },
            { leyenda: 'Cliente', class: 'text-center thp', ordenable: false, columna: 'NOMBRE_CLIENTE', filtro: true },
            { leyenda: 'Días Pendiente de pago', class: 'text-center thp', ordenable: false, columna: '', filtro: true },
            { leyenda: 'Importe', class: 'text-center thp', ordenable: false, columna: 'TOTAL', filtro: true },
            { leyenda: 'Estado', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: true },
            { leyenda: '', class: 'thp', edittype: 'checkbox', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
        ],
        modelo: [

            { propiedad: 'SERIE', class: 'text-center tdp' },
            { propiedad: 'NUMERO', class: 'text-center tdp' },
            { propiedad: 'FORMAPAGO', class: 'text-center tdp' },
            {
                propiedad: 'FECHAEMISION', class: 'text-center tdp', formato: function (tr, obj, value) {
                    if (value !== null)
                        return formatoFecha(value, 1);
                }
            },
            { propiedad: 'NOMBRE_CLIENTE', class: 'text-center tdp' },
            {
                propiedad: 'FECHAEMISION', class: 'text-center tdp', formato: function (tr, obj, value) {
                    if (value !== null)
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
            { propiedad: 'TOTAL', class: 'text-center tdp' },
            {
                propiedad: 'STATUS', style: 'white-space:nowrap', class: 'text-center tdp', formato: function (tr, obj, value) {

                    if (value === 1)
                        return "Pendiente";
                    if (value === 2)
                        return 'Cancelado';
                }
            },
            {
                propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                    container = document.createElement("div");
                    // creating checkbox element 
                    var checkbox = document.createElement('input');

                    // Assigning the attributes 
                    // to created checkbox 
                    checkbox.type = "checkbox";
                    checkbox.name = "name";
                    checkbox.value = "value";
                    checkbox.id = "id";


                    container.appendChild(checkbox);

                    return container;
                }
            }
        ],
        url: '/ws/cuentasporcobrar.aspx/ListarCXC',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'NOMBRE',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#cxppendientes").MALCO(data);
}
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
                    let color = '';
                    var fecha1 = '';
                    var ocultar = '';
                    var currentTime = new Date();
                    var currentDate = currentTime.toLocaleDateString();
                    var currentTimeString = currentDate.toString("dd/mm/yyyy");
                    if (this.FECHAEMISION != "") {

                        fecha1 = formatoFecha(this.FECHAEMISION, 1);
                        //var aaFecha1 = this.FECHAEMISION.split(' ');
                        console.log(this.FECHAEMISION);
                        console.log("id_formapag" + this.ID_FORMAPAGO);
                        //console.log("formato:"+formatoFecha(this.FECHAEMISION, 1));
                        //fecha1 = aaFecha1[0];
                    }
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
                        case "1":
                            edo = "Pendiente";
                            td = '<input type="checkbox" class="case" name="case[]" value="' + f + '">';
                            color = 'style="background-color:#FFC000;"';
                            ocultar = ' class="';
                            break;
                        case "2":
                            edo = "Cancelado";
                            td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            color = 'style="background-color:#A9D08E;"';
                            if (info != "") {
                                ocultar = ' class="" ';
                            } else {
                                ocultar = ' class="ocultar d-none"';
                            }
                            break;
                        case "3":
                            edo = "Facturado";
                            td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            color = 'style="color:white !important; background-color:#4472C4;"';
                            if (info != "") {
                                ocultar = ' class="" ';
                            } else {
                                ocultar = ' class="ocultar d-none"';
                            }
                            break;
                    }

                    var totalaux = this.TOTAL - this.MONTOPAGADO;

                    if (totalaux == 0) {
                        totalaux = this.TOTAL;
                    }
                    //if (this.TOTAL > 0) {
                    if (this.TIPO == "cab") {
                        fila += '<tr ' + ocultar + ' style="background-color: #578EBE; color: #F8F9FC;" id="tr' + this.ID_VENTAS + '" > ';
                    } else {
                        fila += '<tr ' + ocultar + ' id="tr' + this.ID_VENTAS + '" ' + color + '> ';
                    }
                    fila += '<td style="display:none;" data-camp="id">' + this.ID_VENTAS + '</td>';
                    fila += '<td data-camp="" class="text-right tdp">' + this.SERIE + '</td>';
                    fila += '<td data-camp="" class="text-right tdp">' + this.NUMERO + '</td>';
                    fila += '<td data-camp="" class="text-right tdp">' + this.FORMAPAGO + '</td>';
                    if (this.TIPO == "cab") {
                        fila += '<td data-camp="" class="text-right tdp" ></td>';
                    } else {
                        fila += '<td data-camp="" class="text-right tdp" >' + fecha1 + '</td>';
                    }
                    fila += '<td data-camp="" class="text-right tdp" >' + this.NOMBRE_CLIENTE + '</td>';
                    fila += '<td data-camp="" class="text-right tdp" >' + this.NOMBRE + '</td>';
                    if (this.TIPO == "cab") {
                        fila += '<td data-camp="" class="text-right tdp" ></td>';
                        fila += '<td data-camp="" class="text-right tdp" ></td>';

                    } else {
                        fila += '<td data-camp="" class="text-center tdp">' + dias + '</td>';
                        fila += '<td data-camp="" class="text-center tdp">' + totalaux + '</td>';

                    }
                    if (this.STATUS != "" && this.FORMAPAGO != "") {
                        fila += '<td data-camp="" class="text-center tdp" ' + color + '>' + edo + '</td>';
                    } else if (this.STATUS != "" && this.FORMAPAGO == "") {
                        fila += '<td data-camp=""  class="text-center tdp d-none">' + edo + '</td>';
                    }

                    if (this.TIPO == "cab") {
                        fila += '<td data-camp="" class="text-right tdp" ></td>';
                        fila += '<td data-camp="" class="text-right tdp" ></td>';
                    } else {
                        fila += '<td data-camp="" class="text-center tdp">' + this.MONEDA + '</td>';

                        fila += '<td data-camp="">' + td + '</td>';
                    }
                    fila += '<td style="display:none;">' + this.ID_CLIENTE + '</td>';
                    fila += '<td style="display:none;">' + this.ID_VENDEDOR + '</td>';
                    fila += '<td style="display:none;">' + this.MONTOPAGADO + '</td>';
                    fila += '<td style="display:none;">' + this.ID_CONTACTO + '</td>';
                    if (this.TIPO == "cab") {
                        fila += '<td data-camp="" class="text-right tdp" ></td>';
                    } else {
                        fila += '<td>' + '<i id="e' + this.ID_VENTAS + '" idvent ="' + this.ID_VENTAS + '" class="fa fa-search" title="Ver registro"></i>' + '</td>';
                    }
                    fila += '<td data-camp="" class="text-right d-none" >'+this.ID_FORMAPAGO+'</td>';
                    fila += '</tr> ';

                    //}
                });
              
                $("#tinfobody").html(fila);
                f++;

            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function cargaCondicionesPago(cid) {
    //$("#cp" + cid).append('<option value="0">Seleccionar</option>');
    //$("#cp" + cid).append('<option value="1">Contado</option>');
    //$("#cp" + cid).append('<option value="2">Deposito</option>');
    //$("#cp" + cid).append('<option value="3">Transferencia</option>');

    get('/ws/cxp.aspx/consultaModalidadPago', "")
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
                    $("#cp" + cid).append('<option value="' + this.ID_FORMAPAGO + '">' + this.FORMAPAGO + '</option>');
                });
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de condiciones de pago<br/>" + error, "ERROR");
        });
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
function cargaMoneda(id) {

    get('/ws/monedas.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $.each(res.Info, function () {
                    let selected = this.mon.toUpperCase() == 'SOLES' ? "Selected" : "";
                    $("#selmon" + id).append('<option ' + selected + ' value="' + this.id + '">' + this.mon + '</option>');
                });
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}

function cargaExportadores(id) {
    $("#exp").empty().append('<option value=""></option>');

    get('/ws/exportadores.aspx/Consultar', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                $("#exp").empty().append('<option value=""></option>');
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#exp").append('<option value="' + this.id + '">' + this.razs + '</option>');
                    })

                    $("#exp").val(exp);
                    $("#expv").val(exp);
                }
            }
            else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (res) {
            Alerta(res.Mensaje, "ERROR!");
        })
}
function cargaVendedores() {
    $("#exp").empty().append('<option value=""></option>');
    get('/ws/Vendedores.aspx/Consultar', JSON.stringify({ id: 0 }))
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


function getdata() {
    let detalle = new Array();
    let j = 1;
    var fila = "";
    let totaldeu = 0;
    var currentTime = new Date();

    var currentDate = currentTime.toLocaleDateString();
    var currentTimeString = currentDate.toString("dd/mm/yyyy");
    $("#fecp").attr("fecha", new Date());
    var seriealm;
    // para cada checkbox "chequeado"
    $("#info").find("input[type=checkbox]:checked").each(function () {
        var result = [];
        var i = 0;
        let det = new Object();
        if (this.attributes['id'] !== undefined && this.attributes['id'].value === 'selectall') return; //si es el selectall ir al siguiente

        // buscamos el td más cercano en el DOM hacia "arriba"
        // luego encontramos los td adyacentes a este
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td 
            result[i] = $(this).text();
            ++i;
        });

      

        var cp = "cp" + j;
        var selBanco = "selBanco" + j;
        var selMon = "selmon" + j;

        var bfec = "bfec" + j;
        var imp = result[8]; /*- result[12];*/
        fila += '<tr id="tr' + result[0] + '"><td style="display:none;" data-camp="id">' + result[0] + '</td>' +
            '<td data-camp="" class="text-center tdp">' + result[1] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[2] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[4] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[5] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[7] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + imp + '</td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 montoap"></td>' +
            '<td data-camp="" class="text-right tdp" ><select class="form-control moneda" id="' + selMon + '"></td>' +
            '<td data-camp="" class="text-right tdp" ><select class="form-control mod" id="' + cp + '"></td>' +
            '<td data-camp="" class="text-right tdp" ><select class="form-control banco" id="' + selBanco + '"></td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 noop"></td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ob"></td>' +
            '<td data-camp="" class="text-right tdp" style="display:none;">' + result[13] + '</td>' +
            '<td data-camp="" class="text-right tdp" style="display:none;">' + result[11] + '</td>' +
            '<td data-camp="" class="text-right" style="display:none;">' + result[16]+'</td>'+
            '</tr> ';
        console.log("condicion pago" + result[16]);
        cargaBanco(j);
        cargaCondicionesPago(j);
        cargaMoneda(j)
        ++j;

        totaldeu = Number(totaldeu) + Number(imp);
        $("#contac").val(result[14]);
        $("#idcli").val(result[11]);
        //cargaCliente(result[10]);
        //$("#lincredus").val(result[12]);
        cargaContLincre(result[14]);
        seriealm = result[1];
    });
    $("#tinforpbody").html(fila);
    $("#totdeuda").val(totaldeu);
    $("#seriealm").val(seriealm);

}
function cargaContactos() {
    $("#contac").empty().append('<option value=""></option>');

    get('/ws/Contactos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $(res.Info).each(function () {
                        $("#contac").append('<option value="' + this.id + '">' + this.nom + '</option>');
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar el listado de contactos<br />" + error, "ERROR!");
        });
}
function validacont() {
    var j = 0;
    var ruci = "";
    aplica = true;

    // para cada checkbox "chequeado"
    $("input[type=checkbox]:checked").each(function () {
        var resultv = [];
        var i = 0;
        if (this.attributes['id'] !== undefined && this.attributes['id'].value === 'selectall') return; //si es el selectall ir al siguiente
        // buscamos el td más cercano en el DOM hacia "arriba"
        // luego encontramos los td adyacentes a este
        $(this).closest('td').siblings().each(function () {
            // obtenemos el texto del td 
            resultv[i] = $(this).text();

            if (j == 0) {
                if (i == 6) {
                    ruci = resultv[i];
                }
            }
            else {
                if (i == 6) {
                    if (ruci != resultv[i]) {
                        aplica = false;
                        return false;
                    }
                }
            }
            ++i;
        });
        j++;
    });
}
function cargaContLincre(id) {
    get('/ws/Clientes.aspx/ConsultarLincreCont', JSON.stringify({ idcont: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        console.log("Lincred" + this.lineacredito);
                        if (this.lineacredito == null) {
                            $("#lincred").val(0);
                        } else {
                            $("#lincred").val(this.lineacredito);
                        }
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar lainformacion<br/>" + error, "ERROR");
        });
    cargaContPenPag(id);
}
function cargaContPenPag(id) {
    $("#lincredus").val("");
    get('/ws/RegVtas.aspx/VentasCont', JSON.stringify({ idc: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        var pen = Number(this.PENDIENTE) - Number(this.MONTOPAGADO);
                        $("#lincredus").val(formatoMoneda(pen, 2, true));
                    });
                }
            } else {
                Alerta(res.Mensaje, "ERROR!");
            }
        })
        .catch(function (error) {
            Alerta("No fue posible cargar la informacion<br/>" + error, "ERROR");
        });
}

function guardaRegistro() {
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
        det.tot = this.cells[6].innerText;
        det.cond = this.cells[15].innerText;
        det.idbanc = $(this).find('select.banco').val();
        det.nooper = $(this).find('input.noop').val();
        det.fepago = f;
        det.codpago = $(this).find('select.mod').val() ;
        /* por confirmar cambio*/
        det.recibpago = $("#codp").val();

        det.obs = $(this).find('input.ob').val();
        det.idexp = this.cells[14].innerText;
        det.lincre = $("#lincred").val();
        det.totaldeu = $("#totdeuda").val();
        det.montoapag = $(this).find('input.montoap').val(); 
        det.diasp = this.cells[5].innerText;
        det.totalapag = $("#totapagar").val();
        det.idmon = $(this).find('select.moneda').val();

        detalle.push(det);

        v.id = this.cells[0].innerText;
        let tp = parseFloat($(this).find('input.montoap').val().trim().replace(/,/g, ''));
        let ta = parseFloat(this.cells[6].innerText.trim().replace(/,/g, ''));
        if (tp < ta) {
            v.status = 1;
        } else {
            v.status = 2;
        }
        v.montpag = parseFloat(this.cells[13].innerText) + parseFloat($(this).find('input.montoap').val());
        vent.push(v);
    });

    cli.id = $("#idcli").val();
    //cli.lincre = parseFloat($("#lincred").val().trim().replace(/,/g, '')) - parseFloat($("#totapagar").val().trim().replace(/,/g, ''));

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
                $("#totapagar").val("");
                cargaCXC2();
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });
}
function cargaCliente(id) {
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
function cargaClientes(id) {
    $("#exp").empty().append('<option value=""></option>');
    get('/ws/Clientes.aspx/ConsultarCont', JSON.stringify({ id: id }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $.each(res.Info, function () {
                        $("#exp").append('<option value="' + this.ID_CLIENTE + '">' + this.NOMBRE_CLIENTE + '</option>');
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

function exportar() {
    let param = new Object();
    param = "";
    if ($("#bfecd").val() !== "" && $("#bfeca").val() !== "") {

        param.feci = $("#bfecd").datepicker().fecha();
        param.fecf = $("#bfeca").datepicker().fecha();

    }
    else {
        Alerta("Debe especificar una fecha", "AVISO!");
        return;
    }
    if ($("#clienteValor").val() !== "") param.nom = $("#clienteValor").val();

    if ($("#contactoValor").val() !== "") param.cont = $("#contactoValor").val();

    if ($("#rucValor").val() !== "") param.ruc = $("#rucValor").val();

    if ($("#seltpo").val() !== "") param.estado = $("#seltpo").val();
    if ($("#serieValor").val() !== "") param.serie = $("#serieValor").val();
    if ($("#numeroValor").val() !== "") param.numero = $("#numeroValor").val();

    get('/ws/cuentasporcobrar.aspx/ExportarExcelCXC', JSON.stringify({ info: param, user: Cookies.get('nom') }))
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
//FActuras de datos de facturacion de importacion
function cargaCXCDF(fil = "") {
    $("#tinfobody2").html("");
    let info = new Object();

    info = fil;

    get('/ws/cuentasporcobrar.aspx/ListarCXCoDF', JSON.stringify({ info: JSON.stringify(info) }))
        .then(function (res) {
            let color = '';

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
                    var fecha1 = formatoFecha(this.FECHAF, 1);
                    var aFecha1 = fecha1.split('/');
                    var aFecha2 = currentTimeString.split('/');
                    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
                    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
                    var dif = fFecha2 - fFecha1;
                    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));


                    var edo = this.DOCREGSTATUS;
                    var td = "";
                    switch (this.DOCREGSTATUS) {
                        case 1:
                            edo = "Pendiente";
                            td = '<input type="checkbox" class="case2" name="case[]" value="' + f + '">';
                            color = 'style="color:red;"';
                            break;
                        case 2:
                            edo = "Cancelado";
                            td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            color = 'style="color:green;"';
                            break;
                        case 3:
                            edo = "Anulado";
                            td = '<input type="checkbox" disabled="disabled" name="case[]" value="' + f + '">';
                            break;
                    }

                    fila += '<tr id="tr' + this.ID_FACTURA + '" ' + color + '><td style="display:none;" data-camp="id">' + this.ID_FACTURA + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.SERIEF + '</td>' +
                        '<td data-camp="" class="text-right tdp">' + this.NUMEROF + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + fecha1 + '</td>' +
                        '<td data-camp="" class="text-right tdp" >' + this.RAZON_SOCIAL + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + dias + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + this.TOTAL + '</td>' +
                        '<td data-camp="" class="text-center tdp">' + edo + '</td>' +
                        '<td data-camp="">' + td + '</td>' +
                        '<td style="display:none;">' + this.ID_PROVEEDOR + '</td>' +
                        '<td style="display:none;">' + this.ID_REGISTRO + '</td>' +
                        '<td style="display:none;">' + this.DOCREGMONTOPAGADO + '</td>' +
                        '</tr> ';
                });

                $("#tinfobody2").html(fila);
                f++;
            }
        })
        .catch(function (error) {
            Alerta(error, "ERROR!");
        });
}
function getdataDF() {
    let detalle = new Array();
    let j = 1;
    var fila = "";
    let totaldeu = 0;
    var currentTime = new Date();

    var currentDate = currentTime.toLocaleDateString();
    var currentTimeString = currentDate.toString("dd/mm/yyyy");
    $("#fecp2").val(currentTimeString).attr("fecha", new Date());

    // para cada checkbox "chequeado"
    $("#info2").find("input[type=checkbox]:checked").each(function () {
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

        var cp = "cpdf" + j;
        var selBanco = "selBancodf" + j;
        var bfec = "bfecdf" + j;
        var imp = result[6] - result[10];;
        fila += '<tr id="tr' + this.ID_VENTAS + '"><td style="display:none;" data-camp="id">' + result[0] + '</td>' +
            '<td data-camp="" class="text-center tdp">' + result[1] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[2] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[3] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + result[5] + '</td>' +
            '<td data-camp="" class="text-right tdp">' + imp + '</td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 montoap"></td>' +
            '<td data-camp="" class="text-right tdp" ><select class="form-control mod" id="' + cp + '"></td>' +
            '<td data-camp="" class="text-right tdp" ><select class="form-control banco" id="' + selBanco + '"></td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 noop"></td>' +
            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ob"></td>' +
            '<td data-camp="" class="text-right tdp" style="display:none;">' + 0 + '</td>' +
            '<td data-camp="" class="text-right tdp" style="display:none;">' + result[9] + '</td>' +
            '</tr> ';

        cargaBanco2(j);
        cargaCondicionesPago2(j);
        ++j;

        totaldeu = Number(totaldeu) + Number(result[6]);
        $("#nmprov").val(result[4]);
        $("#idprov").val(result[8]);
    });
    $("#tinforpbody2").html(fila);

    $("#totdeuda2").val(totaldeu);
}
function cargaCondicionesPago2(cid) {
    //$("#cpdf" + cid).append('<option value="0">Seleccionar</option>');
    //$("#cpdf" + cid).append('<option value="1">Contado</option>');
    //$("#cpdf" + cid).append('<option value="2">Deposito</option>');
    //$("#cpdf" + cid).append('<option value="3">Transferencia</option>');
    get('/ws/FormaPago.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#cpdf" + cid).append('<option value="0">Seleccionar</option>');
                    $.each(res.Info, function () {
                        $("#cpdf" + cid).append('<option value="' + this.id + '">' + this.fp + '</option>');
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
function cargaBanco2(id) {
    get('/ws/bancos.aspx/Consultar', JSON.stringify({ id: 0 }))
        .then(function (res) {
            if (res.Respuesta === 1) {
                if (res.Info !== null) {
                    $("#selBancodf" + id).append('<option value="0">Seleccionar</option>');
                    $.each(res.Info, function () {
                        $("#selBancodf" + id).append('<option value="' + this.id + '">' + this.banc + '</option>');
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
function guardaRegistro2() {
    let detalle = new Array();
    let docreg = new Array();


    let i = 1;
    var from1 = $("#fecp2").val().split("/");
    var f = new Date(from1[2], from1[1] - 1, from1[0]);

    $.each($("#datosregpag2 tbody tr"), function () {
        let det = new Object();
        let d = new Object();

        //var f = new Date($(this).find('input[type="date"]').val());
        var from = this.cells[3].innerText.split("/");
        var f2 = new Date(from[2], from[1] - 1, from[0]);

        det.ord = i;
        det.idf = this.cells[0].innerText;
        det.idr = this.cells[12].innerText;
        det.ser = this.cells[1].innerText;
        det.num = this.cells[2].innerText;
        det.fecemi = f2;
        det.tot = this.cells[5].innerText;
        det.cond = $(this).find('select.mod').val();
        det.idbanc = $(this).find('select.banco').val();
        det.nooper = $(this).find('input.noop').val();
        det.fepago = f;
        det.obs = $(this).find('input.ob').val();
        det.idexp = $("#idprov").val();
        det.lincre = 0;
        det.totaldeu = $("#totdeuda2").val();
        det.montoapag = $(this).find('input.montoap').val();
        det.diasp = this.cells[4].innerText;
        det.totalapag = $("#totapagar2").val();
        detalle.push(det);

        d.id = this.cells[0].innerText;
        d.idreg = this.cells[12].innerText;
        let tp = parseFloat($(this).find('input.montoap').val().trim().replace(/,/g, ''));
        let ta = parseFloat(this.cells[5].innerText.trim().replace(/,/g, ''));
        if (tp < ta) {
            d.edo = 1;
        } else {
            d.edo = 2;
        }
        d.montpag = parseFloat(this.cells[11].innerText) + parseFloat($(this).find('input.montoap').val());
        docreg.push(d);
    });


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
            return fetch(`/ws/cuentasporcobrar.aspx/InsertarDF`, {
                method: 'POST', body: JSON.stringify({ info: JSON.stringify(detalle), doc: JSON.stringify(docreg) }), headers: { 'Content-Type': 'application/json' }
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
                $("#mregpagos2").modal("toggle");

                cargaCXCDF();
            }
            else {
                Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
            }
        }
    });
}
function exportar2() {
    let param = new Object();
    param = "";
    if ($("#opc2").val() === "3") {
        if ($("#bfecd2").val() !== "" && $("#bfeca2").val() !== "") {

            param.feci = $("#bfecd2").datepicker().fecha();
            param.fecf = $("#bfeca2").datepicker().fecha();

        }
        else {
            Alerta("Debe especificar una fecha", "AVISO!");
        }
    }
    else if ($("#opc2").val() !== "") {
        //param.num = $("#bval").val().trim();

        if ($("#opc2").val() === "1")
            param.nom = $("#bval2").val().trim();


        if ($("#opc2").val() === "2")
            param.ruc = $("#bval2").val().trim();
    }

    get('/ws/cuentasporcobrar.aspx/ExportarExcelCXCDF', JSON.stringify({ info: param }))
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
//ListarPagos
function cargaPagos(idvent) {
    let fil = new Object();
    fil.idv = idvent;

    let param = new Object();

    param.where = fil;
    var data = {
        class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
        columnas: [
            { leyenda: 'Serie', class: 'text-center thp', ordenable: false, columna: 'SERIE', filtro: false },
            { leyenda: 'Número', class: 'text-center thp', ordenable: false, columna: 'NUMERO', filtro: false },
            { leyenda: 'Formas de Pago', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'FORMAPAGO', filtro: false },
            { leyenda: 'Fecha Emisión', class: 'text-center thp', ordenable: false, columna: 'FECHA_EMISION', filtro: true },
            { leyenda: 'Cliente', class: 'text-center thp', ordenable: false, columna: 'NOMBRE_CLIENTE', filtro: true },
            { leyenda: 'Fecha Pago', class: 'text-center thp', ordenable: false, columna: 'FECHA_PAGO', filtro: true },
            { leyenda: 'Cod Pago', class: 'text-center thp', ordenable: false, columna: 'COD_PAGO', filtro: true },
            { leyenda: 'Importe', class: 'text-center thp', ordenable: false, columna: 'TOTAL_A_PAGAR', filtro: true },
            { leyenda: 'Observaciones', class: 'text-center thp', ordenable: false, columna: 'OBSERVACIONES', filtro: true }
        ],
        modelo: [

            { propiedad: 'SERIE', class: 'text-center tdp' },
            { propiedad: 'NUMERO', class: 'text-center tdp' },
            { propiedad: 'FORMAPAGO', class: 'text-center tdp' },
            {
                propiedad: 'FECHA_EMISION', class: 'text-center tdp', formato: function (tr, obj, value) {
                    if (value !== null) return formatoFecha(value, 1);
                }
            },
            { propiedad: 'NOMBRE_CLIENTE', class: 'text-center tdp' },
            {
                propiedad: 'FECHA_PAGO', class: 'text-center tdp', formato: function (tr, obj, value) {
                    if (value !== null) return formatoFecha(value, 1);
                }
            },
            { propiedad: 'COD_PAGO', class: 'text-center tdp' },
            { propiedad: 'TOTAL_A_PAGAR', class: 'text-center tdp' },
            { propiedad: 'OBSERVACIONES', class: 'text-center tdp' },
        ],
        url: '/ws/cuentasporcobrar.aspx/ListarPagos',
        parametros: JSON.stringify(param),
        paginable: true,
        filtrable: false,
        limite: [10, 25, 50],
        columna: 'SERIE',
        loader: "pre0",
        columna_orden: 'DESC'
    };

    $("#infopag").MALCO(data);
}
