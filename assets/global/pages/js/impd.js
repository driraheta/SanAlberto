let idImportacion = 0;
(function ($) {
    $(document).ready(function () {
        lstExportadoresTipoImportadorAndExportador();
        cargaTablaPrincipal();
        cargarProductos();
        cargaPaises();
        //cargaOrdenes();
        cargaMercados();
        cargarProductosPackingList();
         //cargaInsumos("%");
        cargaImpuestos();
        cargaAlmacenes();
        cargaExportadores();
        cargaImportadores();
        /*agregado*/
        cargaPuertoDestino("ptodest");
        cargaPuertoOrigen("ptoorg");
        cargaPuertoDestino("ptodestv");
        cargaPuertoOrigen("ptoorgv");
        cargaLineaNaviera();
        cargaProvedorAgenciaAduana();
        cargaTiposEmbarque();
        cargaUnidadesMedida();
        cargaCondicionesPago();
        Moneda.Consultar("#mon");
        Moneda.Consultar("#monv");
        cargaEspecies(0);
        cargaCalidades(0, 0);
        cargaCalibres(0);
        cargaEmbalaje(0);
        cargaVariedades(0, 0);
        cargaPesos(0);
        cargaEtiquetas(0);
        var descprod = new Array(8);
       
        $("#accordionSidebar").addClass("toggled");
        $("#rcimp").hide();
        //$('#fecf').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
        //$('#fecfe').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
        //$('#fecvig').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
        //$('#fecvige').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date(), value: formatoFecha(new Date(), 1) });
        //$('#bfec').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        //$('#bfech').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        $('.datepicker').each(function () {
            $(this).datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        });
        $('#fecfac').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", defaultDate: new Date() });

        $('.select2').each(function () {
            $(this).select2({
                width: '100%'
            });
        });

        $(".numeros").on('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
        $('#umpimp').css('pointer-events', 'none');
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

            if ($("#opc").val() === "") {
                cargaOrdenes();
            }
            else {
                if ($("#opc").val() === "3") {
                    if ($("#bfec").val() !== "") {
                        param.feci = $("#bfec").datepicker().fecha()
                        param.fecf = $("#bfech").datepicker().fecha()

                    }
                    else {
                        Alerta("Debe especificar una fecha", "AVISO!");
                    }
                }
                else if ($("#opc").val() === "5") {
                    param.edo = $("#bedo").val();
                }
                else if ($("#opc").val() !== "") {
                    param.num = $("#bval").val().trim();

                    if ($("#opc").val() === "1")
                        param.tpo = 1;

                    if ($("#opc").val() === "2")
                        param.ped = 0;

                    if ($("#opc").val() === "4")
                        param.tdoc = $("#bval").val();
                }

                cargaOrdenes(param);
            }
        });
        $("#cov").on("click", function () {
            if ($(this).prop("checked")) {
                $("#cop").prop("checked", false);//.trigger("click");;
                $("#cpi").prop("disabled", true);
                $("#cpo").prop("disabled", true);
                $("#cvo").prop("disabled", false);//.trigger("change");
                $("#cvi").prop("disabled", false);//.trigger("change");
                comisionMonto();
            }
            else {
                $("#cvo").prop("disabled", true);
                $("#cvi").prop("disabled", true);
                $("#impc").val("");
            }
        });
        $("#cop").on("click", function () {
            if ($(this).prop("checked")) {
                $("#cov").prop("checked", false);//.trigger("click");
                $("#cpi").prop("disabled", false);//.trigger("change");
                $("#cpo").prop("disabled", false);//.trigger("change");
                $("#cvo").prop("disabled", true);
                $("#cvi").prop("disabled", true);
                comisionPorcentaje();
            }
            else {
                $("#cpi").prop("disabled", true);
                $("#cpo").prop("disabled", true);
                $("#impc").val("");
            }
        });
        $("#reg").on("click", function () {
            $("#datos").hide();
            $("#lista").show();
            limpiaPantalla();
            setTimeout(function () { window.scrollTo(0, 0); }, 400);


            
        });
        $("#regv").on("click", function () {
            $("#datosv").hide();
            $("#lista").show();
            limpiaPantallav();
            setTimeout(function () { window.scrollTo(0, 0); }, 400);
        });

        $("#gua").on("click", function () {

            if (valForm('info')) {

                    if ($("#productos tbody tr").length > 0) {
                        guardaRegistro();
                        cargaTablaPrincipal();
                    }
                    else {
                        Alerta("Debe especificar al menos un producto", "AVISO!");
                    }
                }
            
        });
        $("#pdf").on("click", function () {
            if ($("#num").val().trim() !== "" && !$("#num").val().endsWith("?")) {
                //enviaPDF();
                //cargaDatosPDF();
                //$("#modpdf").modal("show");
                GeneraPDF();

            }
            else {
                Alerta("Debe guardar la información antes de enviar el PDF", "Aviso!");
            }
        });
        $("#cani").on("click", function () {
            Swal.fire({
                html: '¿Confirma que desea cancelar la edición?',
                title: 'Confirmación',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sí'
            }).then((result) => {
                if (result.value) {
                    $("#importa").modal("toggle");
                }
            });
        });

    /****NUEVOS ELEMENTOS DE CATEGORIAS****/

        $("#nex").on("click", function () {
            limpiaControles("exporta");
            limpiaGridExportadores();
            cargaUbigeos();
            $("#exporta").modal({ backdrop: 'static', keyboard: false });

        });

        $("#nmon").on("click", function () {
            limpiaControles("mmoneda");
            $("#mmoneda").modal({ backdrop: 'static', keyboard: false });
        });

        $("#nmer").on("click", function () {
            limpiaControles("mmercado");
            $("#mmercado").modal({ backdrop: 'static', keyboard: false });
        });

        $("#npai").on("click", function () {
            limpiaControles("mpais");
            ddpais = "#pai";
            ddpaisd = "#paid";
            $("#mpais").modal({ backdrop: 'static', keyboard: false });
        });

        $("#npaid").on("click", function () {
            limpiaControles("mpais");
            ddpais = "#pai";
            ddpaisd = "#paid";
            $("#mpais").modal({ backdrop: 'static', keyboard: false });
        });

        $("#necp").on("click", function () {
            limpiaControles("mcondpago");
            ddcondpago = "#cp";
            $("#mcondpago").modal({ backdrop: 'static', keyboard: false });
        });

        /****_NUEVOS ELEMENTOS DE CATEGORIAS****/

        $("#nim").on("click", function () {
            //limpiaControles("importa");
            //cargaUbigeos();
            //$("#importa").modal({ backdrop: 'static', keyboard: false });
            limpiaControles("exporta");
            limpiaGridExportadores();
            cargaUbigeos();
            $("#exporta").modal({ backdrop: 'static', keyboard: false });

        });

        $("#baduana").on("click", function () {
            limpiaControles("exporta");
            limpiaGridExportadores();
            cargaUbigeos();
            $("#exporta").modal({ backdrop: 'static', keyboard: false });

        });

        $("#nue").on("click", function () {
            limpiaPantalla();
            getCorrelativo(new Date(), "CORRELATIVO");
            //getCorrelativo2(new Date(), "EMBARQUE");
            secuenciaReg();
            $("#lista").hide();
            $('#creditoDatos').hide();
            $("#datos").show();
            $("#pdf").hide();
            $("#pdf").prop('disabled', true);
            $("#gua").prop("disabled", false);
            $("#limp").show();
        });
        $("#pro").on("click", function () {
        });
        $("#canp").on("click", function () {
            $("#nvoCombo").addClass("d-none");
            $("#prods").modal("toggle");
            $("#nompValidar").hide();
            $("#nomp").removeClass("has-error");
            $("#nomp option").each(function () {
                $(this).show();
            });
        });
        $("#canpe").on("click", function () {
            $("#prodse").modal("toggle");
            $("#nompValidare").hide();
            $("#nompe").removeClass("has-error");
            $("#nompe option").each(function () {
                $(this).show();
            });
        });

        $("#canpimp").on("click", function () {
            $("#prodsimp").modal("toggle");
            $("#nompimp").val("");
            //$("#umpimp").val("").trigger('change');
            
            $("#cantpimp").val("");
            $("#prepimp").val("");
            $("#subpimp").val("");
            $("#imppimp").val("");
            $("#esp").val("");
            $("#var").val("");
            $("#inter").val("");
            $("#cali").val("");
            $("#cal").val("");
            $("#embp").val("");
            $("#grad").val("");
        });
        $("#canpimpe").on("click", function () {
            $("#prodsimpe").modal("toggle");
        });
        $("#npro").on("click", function () {
            $("#tabla").val("info");
            $("#prodsimp").modal({ backdrop: 'static', keyboard: false });
            limpiaControles('prodsimp');
            $("#ivgimp").val("0");
            $("#ivgimp").trigger("change");
            var i = 0;
            $("#umpimp option").each(function () {
                if ($(this).text().toUpperCase() === "CAJA") {
                    $("#umpimp").prop("selectedIndex", i);
                }
                i++;
            });
            $("#umpimp").trigger('change');
            $("#ivgimp").hide();
            $("#lbligvimp").hide();
            //if ($("#ivg option").length === 2) {
            //    $("#ivg").prop("selectedIndex", 1);
            //}
            //$("#nomp").focus();
        });
        $("#agrp").on("click", function () {
            if ($("#nomp").val() == undefined || $("#nomp").val() == "" || $("#nomp").val() == null) {
                $("#nompValidar").show();
                $("#nomp").addClass("has-error");
            } else {
                $("#nompValidar").hide();
                $("#nomp").removeClass("has-error");
            }
            if (valForm("prods")) {
                let id;
                let pre;
                let fila;
                let imp;

                if ($("#tabla").val() === "info") {
                    id = $("#productos tbody tr").length;
                    pre = "info";
                    imp = $("#impp").val();
                }
                else {
                    id = $("#prodlist tbody tr").length;
                    pre = "list";
                    imp = $("#impp").val();
                }


                fila = '<tr id="f' + pre + id + '">' +
                    '<td id= "n' + pre + id + '" class="text-right" style="display: none">' + $("#nomp").attr("idprod")+ '</td>' +
                    '<td class="text-right">' + $("#nomp").attr("codigo") + '</td>' +
                    '<td class="text-left">' + $("#nomp").val().trim() + '</td > ' +
                    '<td class="text-center" um="' + $("#ump").val() + '">' + $("#ump option:selected").text() + '</td>' +
                    '<td class="text-right">' + formatoMoneda($("#cantp").val().replace(/,/g, ''), 2, true) + '</td>' +
                    '<td class="text-right">' + formatoMoneda($("#prep").val().replace(/,/g, ''), 2, true) + '</td>' +
                    '<td class="text-right">' + $("#subp").val() + '</td>' +
                    '<td class="text-right">' + $("#ivg option:selected").text() + '</td>' +
                    '<td class="text-right">' + $("#impp").val() + '</td>' +
                    '<td class="text-center" almc="' + $("#alm").val() + '">' + $("#alm option:selected").text() + '</td>' +
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
                    if ($("#nomp").val() == undefined || $("#nomp").val() == "" || $("#nomp").val() == null) {
                        $("#nompValidar").show();
                        $("#nomp").addClass("has-error");

                    } else {
                        $("#nomp").removeClass("has-error");
                        $("#nompValidar").hide();
                        $("#prodlist tbody").append(fila);
                        fila = $("#prodlist tr:last");
                    }

                }

                let total;
                total = parseFloat($("#impp").val().trim().replace(/,/g, '')) + parseFloat($("#total").val().trim().replace(/,/g, ''));
                $("#total").val(formatoMoneda(total, 2, true));
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
                        } else if (i === 9) {
                            result[i] = $(this).attr("almc");
                        } else {
                            result[i] = $(this).text();
                        }
                        ++i;
                    });
                    $("#tdidprod").val("#f" + pre + id);
                    $("#nompe").val(result[0]);
                    $("#alme").val(result[9]);
                    $("#umpe").val(result[3]);
                    $("#cantpe").val(result[4]);
                    $("#prepe").val(result[5]);
                    $("#imppe").val(result[8]);
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
                            let totalact;
                            totalact = parseFloat($("#total").val().trim().replace(/,/g, '')) - parseFloat(imp.trim().replace(/,/g, ''));
                            $("#total").val(formatoMoneda(totalact, 2, true));

                            if ($("#cop").prop("checked"))
                                comisionPorcentaje();

                            if ($("#cov").prop("checked"))
                                comisionMonto();
                        }
                    });
                });

                $("#alm").val("").change();
                $("#nomp").val("");
                $("#ump").val("");
                $("#ump").trigger("change");
                $("#cantp").val("");
                $("#prep").val("");
                $("#subp").val("");
                $("#impp").val("");
                $("#filtroProductoPL").val("");
                //$("#nomp").val("").focus();
                let validador = 0;
                $('#nomp option').each(function () {
                    $(this).show();
                    if (validador === 0) {
                        $(this).attr("selected", true);
                        validador++;
                    } else {
                        $(this).attr("selected", false);
                    }
                });
                $('#nomp option:first-child').attr("selected", true);

            }
        });
        $("#agrpimp").on("click", function () {
            if (valForm("prodsimp")) {
                let id;
                let pre;
                let fila;
                let imp;
                let j;
                if ($("#tabla").val() === "info") {
                    id = $("#productos tbody tr").length;
                    pre = "info";
                    imp = $("#imppimp").val();
                    j = $("#productos tbody tr").length + 1;
                }
                else {
                    id = $("#prodlist tbody tr").length;
                    pre = "list";
                    imp = $("#imppimp").val();
                    j = $("#prodlist tbody tr").length + 1;
                }

                fila = '<tr id="f' + pre + id + '">' +
                    '<td id= "n' + pre + id + '" class="text-right">' + j + '</td>' +
                    '<td class="text-left oculta">' + $("#nompimp").val() + '</td > ' +
                    '<td class="text-center" um="' + $("#umpimp option:selected").val() + '">' + $("#umpimp option:selected").text() + '</td>' +
                    '<td class="text-right">' + formatoMoneda($("#cantpimp").val().replace(/,/g, ''), 2, true) + '</td>' +
                    '<td class="text-center" esp="' + $("#esp option:selected").val() + '">' + $("#esp option:selected").text() + '</td>' +
                    '<td class="text-center" var="' + $("#var option:selected").val() + '">' + $("#var option:selected").text() + '</td>' +
                    '<td class="text-center">' + $("#cali").val() + '</td>' +
                    '<td class="text-center">' + $("#cal").val() + '</td>' +
                    '<td class="text-center">' + $("#embp").val() + '</td>' +
                    '<td class="text-right">' + $("#grad").val() + '</td>' +
                    '<td class="text-right">' + formatoMoneda($("#prepimp").val().replace(/,/g, ''), 2, true) + '</td>' +
                    '<td class="text-right">' + $("#inter").val() + '</td>' +
                    '<td class="text-right" style="display: none">' + $("#ivgimp option:selected").text() + '</td>' +
                    '<td class="text-right">' + $("#imppimp").val() + '</td>' +
                    '<td class="text-right">' + $("#subpimp").val() + '</td>' +
                    '<td class="text-center"><i id="e' + pre + id + '" class="fa fa-edit" title="Editar"></i>&nbsp;&nbsp;<i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

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

                let total;
                total = parseFloat($("#imppimp").val().trim().replace(/,/g, '')) + parseFloat($("#total").val().trim().replace(/,/g, ''));
                $("#total").val(formatoMoneda(total, 2, true));
                $(fila).css({ "cursor": "pointer" });
                $("#e" + pre + id).on("click", function () {
                    var result = [];
                    var i = 0;
                    $("#prodsimpe").modal({ backdrop: 'static', keyboard: false });
                    limpiaControles('prodsimpe');

                    $(this).closest('td').siblings().each(function () {
                        // obtenemos el texto del td 

                        if (i === 2) {
                            result[i] = $(this).attr("um");
                        } else if (i === 4) {
                            result[i] = $(this).attr("esp");
                            cargaVariedades(0, result[i]);
                        } else if (i === 5) {
                            result[i] = $(this).attr("var");

                        } else {
                            result[i] = $(this).text();
                        }
                        ++i;
                    });
                    $("#tdidprodimp").val("#f" + pre + id);
                    $("#nompimpe").val(result[1]);
                    $("#umpimpe").val(result[2]).change();
                    $("#cantpimpe").val(result[3]);
                    $("#prepimpe").val(result[10]);
                    $("#imppimpe").val(result[13]);
                    $("#espe").val(result[4]).change();
                    $("#intere").val(result[11]);
                    $("#calie").val(result[6]);
                    $("#cale").val(result[7]);
                    $("#grade").val(result[9]);
                    $("#embpe").val(result[8]);
                    $("#vare").val(result[5]).change();
                    $("#subpimpe").val(result[14]);
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
                            let totalact;
                            totalact = parseFloat($("#total").val().trim().replace(/,/g, '')) - parseFloat(imp.trim().replace(/,/g, ''));
                            $("#total").val(formatoMoneda(totalact, 2, true));

                            if ($("#cop").prop("checked"))
                                comisionPorcentaje();

                            if ($("#cov").prop("checked"))
                                comisionMonto();
                        }
                    });
                });
               
                $("#nompimp").val("");
                $("#umpimp").val("5").trigger('change');
                $("#cantpimp").val("");
                $("#prepimp").val("");
                $("#subpimp").val("");
                $("#imppimp").val("");
                //$("#nomp").val("").focus();
                $("#esp").val("");
                $("#var").val("");
                $("#cali").val("");
                $("#cal").val("");
                $("#embp").val("");
                $("#grad").val("");
                $("#inter").val("");
            }

        });
        $("#agrpimpe").on("click", function () {
            var rowid = $("#tdidprodimp").val();
            $(rowid).find('td').eq('1').html($("#nompimpe").val());
            $(rowid).find('td').eq('2').html($("#umpimpe option:selected").text());
            $(rowid).find('td').eq('2').attr("um", $("#umpimpe").val());
            $(rowid).find('td').eq('3').html(formatoMoneda($("#cantpimpe").val().replace(/,/g, ''), 2, true));
            $(rowid).find('td').eq('10').html(formatoMoneda($("#prepimpe").val().replace(/,/g, ''), 2, true));
            $(rowid).find('td').eq('13').html($("#imppimpe").val());
            $(rowid).find('td').eq('14').html($("#subpimpe").val());
            $(rowid).find('td').eq('4').html($("#espe option:selected").text());
            $(rowid).find('td').eq('4').attr("esp", $("#espe").val());
            $(rowid).find('td').eq('5').html($("#vare option:selected").text());
            $(rowid).find('td').eq('5').attr("var", $("#varw").val());
            $(rowid).find('td').eq('11').html($("#intere").val());
            $(rowid).find('td').eq('7').html($("#calie").val());
            $(rowid).find('td').eq('6').html($("#cale").val());
            $(rowid).find('td').eq('9').html($("#grade").val());
            $(rowid).find('td').eq('8').html($("#embpe").val());

            $("#nompimpe").val("");
            $("#umpimpe").val("");
            $("#cantpimpe").val("");
            $("#prepimpe").val("");
            $("#imppimpe").val("");
            $("#espe").val("");
            $("#vare").val("");
            $("#intere").val("");
            $("#calie").val("");
            $("#cale").val("");
            $("#grade").val("");
            $("#embpe").val("");

            calculaTotales();
            $("#prodsimpe").modal("toggle");

            //}
        });
        $("#agrpe").on("click", function () {
            var rowid = $("#tdidprod").val();
            $(rowid).find('td').eq('0').html($("#nompe option:selected").val());
            $(rowid).find('td').eq('1').html($("#nompe option:selected").attr("codigo"));
            $(rowid).find('td').eq('2').html($("#nompe option:selected").text().trim());
            $(rowid).find('td').eq('3').attr("um", $("#umpe").val());
            $(rowid).find('td').eq('3').html($("#umpe option:selected").text().trim());
            $(rowid).find('td').eq('4').html(formatoMoneda($("#cantpe").val().replace(/,/g, ''), 2, true));
            $(rowid).find('td').eq('5').html(formatoMoneda($("#prepe").val().replace(/,/g, ''), 2, true));
            //$(rowid).find('td').eq('6').html($("#subpe").val());
            $(rowid).find('td').eq('6').html($("#imppe").val());
            $(rowid).find('td').eq('8').html($("#imppe").val());
            $(rowid).find('td').eq('9').attr("almc", $("#alme").val());
            $(rowid).find('td').eq('9').html($("#alm option:selected").text().trim());

            $("#nompe").val("");
            $("#umpe").val("");
            $("#cantpe").val("");
            $("#prepe").val("");
            $("#imppe").val("");
            $("#prodse").modal("toggle");
            $("#filtroProductoPLe").val("");
            //$("#nomp").val("").focus();
            let validador = 0;
            $('#nompe option').each(function () {
                $(this).show();
                if (validador === 0) {
                    $(this).attr("selected", true);
                    validador++;
                } else {
                    $(this).attr("selected", false);
                }
            });
            $('#nompe option:first-child').attr("selected", true);


        });
        $('#esp').change(function () {
            $('#cali option').remove();
            $('#var option').remove();
            $("#var").append('<option value=""></option>');
            $("#cali").append('<option value=""></option>');
            var ide = $('#esp').val() === "" ? 0 : $('#esp').val();
            cargaCalidades(0, ide);
            cargaVariedades(0, ide);
        });

        //nueva especie y variedad
        $("#nesp").on("click", function () {
            limpiaControles("mespecie");
            $("#mespecie").modal({ backdrop: 'static', keyboard: false });
        });

        $("#nvar").on("click", function () {
            limpiaControles("mvariedad");
            $("#mvariedad").modal({ backdrop: 'static', keyboard: false });
        });

        //guardar y cancelar
        $("#guaesp").on("click", function () {
            if (valForm("mespecie")) {
                GuardarEspecie();
            }
        });

        $("#guavar").on("click", function () {
            if (valForm("mvariedad")) {
                GuardarVariedad();
            }
        });

        $("#cane").on("click", function () {
            limpiaControles("mespecie");
            $("#mespecie").modal("toggle");
        });

        $("#canvar").on("click", function () {
            limpiaControles("mvariedad");
            $("#mvariedad").modal("toggle");
        });

        //Guardar Especie y Variedad
        function GuardarEspecie() {
            let info = new Object();

            info.esp = $("#desp").val();

            Swal.fire({
                title: 'Confirmación',
                html: '¿Confirma que desea agregar el registro de  <b>' + $("#desp").val() + '</b>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return fetch(`/ws/especies.aspx/Insertar`, {
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
                        $('#esp option').remove();
                        $('#espv option').remove();
                        $('#espc option').remove();
                        $("#esp").append('<option value=""></option>');
                        $("#espv").append('<option value=""></option>');
                        $("#espc").append('<option value=""></option>');

                        cargaEspecies(0);
                        $("#mespecie").modal("toggle");
                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                }
            });
        }

        function GuardarVariedad() {
            let info = new Object();
            info.var = $("#vari").val();
            info.esp = $("#espv").val();

            Swal.fire({
                title: 'Confirmación',
                html: '¿Confirma que desea agregar la variedad de  <b>' + $("#vari").val() + '</b>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return fetch(`/ws/variedades.aspx/Insertar`, {
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
                        $('#var option').remove();
                        $("#var").append('<option value=""></option>');

                        var ides = $('#esp').val() === "" ? 0 : $('#esp').val();
                        cargaVariedades(0, ides);
                        $("#mvariedad").modal("toggle");
                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                }
            });
        }

        $("#limp").on("click", function () {
            Swal.fire({
                html: '¿Confirma que desea limpiar la pantalla actual?',
                text: "Confirmación",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: "#1cc88a",
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sí, limpiar pantalla'
            }).then((result) => {
                if (result.value) {
                    $("#nue").trigger("click");
                    setTimeout(function () { window.scrollTo(0, 0); $("#mod").focus(); }, 400);
                }
            });
        });

        $("#glist").on("click", function () {
            if ($("#prodlist tbody tr").length > 0) {
                guardaPacking();
            } else {
                Alerta("Debe seleccionar al menos 1 producto para poder registrar el packing", "AVISO!");
            }
        });
        $("#upload").on("click", function () {
            $("#anexo").trigger("click");
        });
        $("#reglist").on("click", function () {
            $("#reg").trigger("click");
        });
        $("#reglistv").on("click", function () {
            $("#regv").trigger("click");
        });
        $("#nprolist").on("click", function () {
            $("#nvoCombo").addClass("d-none");
            $("#tabla").val("list");
            $("#prods").modal({ backdrop: 'static', keyboard: false });
            limpiaControles('prods');
            //if ($("#ivg option").length === 2) {
            //    $("#ivg").prop("selectedIndex", 1);
            //}
            $("#ivg").prop("selectedIndex", 0);
            var i = 0;
            $("#ump option").each(function () {
                if ($(this).text().toUpperCase() === "CAJA") {
                    $("#ump").prop("selectedIndex", i);
                    $("#ump").trigger("change");
                }
                i++;
            });
            //$("#nomp").focus();
        });

        $("#opc").on("change", function () {
            $("#bfec").hide();
            $("#bfech").hide();

            $("#bTodos").val("");
            filtrarTodos('MALCO-ordenes', 'nada', 'limpiar');
            $("#bTodos").hide();


            $("#bval").hide();
            $("#bedo").hide();

            $("#bus").show();

            $(".gj-icon").parent().hide();

            if ($(this).val() === "3") {
                $("#bfec").show();
                $("#bfech").show();

                $(".gj-icon").parent().show();
            }
            else if ($(this).val() === "5") {
                $("#bedo").show();
            }
            else if ($(this).val() !== "") {
                $("#bval").show();
            }
        });
        $("#cvi").on("change", function () {
            comisionMonto();
        });
        $("#cvo").on("change", function () {
            comisionMonto();
        });
        $("#cpi").on("change", function () {
            comisionPorcentaje();
        });
        $("#cpo").change(function () {
            comisionPorcentaje();
        });

        $('#cp').change(function (e) {
            $("#cp option:selected").each(function () {
                var select = $(this).text().split('-');
                limpiarCreditoDatos();
                if (select[0].toUpperCase() === 'Credito'.toUpperCase()) {
                    $('#creditoDatos').show();
                    $('#diasArribo').val(select[1]);
                }
                //correcion fiorella -- se coloca valor 000 a campos para que permita ingresar el valor al registrar/
                if (select[0].toUpperCase() === 'Contado'.toUpperCase()) {
                    console.log("va " + select[0].toUpperCase());
                    console.log("val " + $('#diasArribo').val(select[1]));
                    $('#diasArribo').val(select[1]);
                    $('#anticipo').val('0');
                    $('#saldo').val('0');
                    $('#creditoDatos').hide();
                }
            });
        });
        function limpiarCreditoDatos() {
            $('#anticipo').val('');
            $('#saldo').val('');
            $('#diasArribo').val('');
        }
        $("#mod").on("change", function () {
            let opc = $(this).val();
            $("#td").val("");

            if (opc !== "") {
                if (opc === "1") {//Importación Directa
                    $("#td").val("O/C");
                    $(".oculta").each(function () {
                        $(this).hide();
                    });
                }
                else if (opc === "2" || opc === "3") {
                    $("#td").val("Pedido");
                    $(".oculta").each(function () {
                        $(this).show();
                    });
                }
                else if (opc === "4") {
                    $("#td").val("O/C");
                    $(".oculta").each(function () {
                        $(this).hide();
                    });
                }
            }
        });
        $("#prep").on("change", function () {
            importeProducto();
        });
        $("#prepimp").on("change", function () {
            importeProductoimp();
        });
        $("#cantp").on("change", function () {
            importeProducto();
        });
        $("#cantpimp").on("change", function () {
            importeProductoimp();
        });
        $("#cantpimpe").on("change", function () {
            importeProductoimpe();
        });
        $("#prepimpe").on("change", function () {
            importeProductoimpe();
        });
        $("#cantpe").on("change", function () {
            importeProductoe();
        });
        $("#prepe").on("change", function () {
            importeProductoe();
        });

        $('#nomp').change(function () {
            cargaProductos($('#nomp').val());
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
        $("#bcod").on("click", function () {
            cargaProductosc($("#codp").val());
        });
        $("#bcodimp").on("click", function () {
            cargaProductoscimp($("#codpimp").val());
        });

        $("#cvi").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#cpi").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#prep").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#prepimp").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });

        $("#cantp").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#cantpimp").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });

        $("#pne").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#pbr").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $('#ivg').change(function () {
            importeProducto();
        });
        //$('#nompimp').blur(function () {
        //    cargaProductodes($('#nompimp').val());
        //});
        $("#pdfv").on("click", function () {
            GeneraPDFV();
        });

        //Facturas
        $('#ncfac').hide();

        Moneda.Consultar("#monf");
        Moneda.Consultar("#monfe");
        cargaTipocomprobantes();
        $("#datfac").on("click", function () {
            cargaFac($("#idrv").val());
            $("#mfacturas").modal({ backdrop: 'static', keyboard: false });
            //$("#mfacturas").modal();

        });
        $("#nuefac").on("click", function () {
            if (idImportacion == 0) {
                Alerta("No ha seleccionado una importación", "Docs Electronicos Venta", "warning");
                return;
            }
            limpiaControles("mnuefacturas");
            $("#productosf tbody").empty();
            $("input:radio").prop("checked", false);
            $("#divcomision").hide();

            if ($("#modv").val() === "1") {
                $("#divtcif").show();
                $("#divchk").show();
            }
            if ($("#modv").val() === "2" || $("#modv").val() === "3") {
                $("#divtcif").hide();
                $("#divchk").hide();
                $("#divcomision").show();

                if ($("#covv").prop("checked")) {
                    $("#covvdf").prop("checked", true);
                    $("#copvdf").prop("checked", false);
                    $("#cpivdf").val("");
                    $("#cpovdf").val("");
                    $("#cvivdf").val($("#cviv").val());
                    $("#cvovdf").val($("#cvov").val());
                    $("#impcvdf").val($("#impcv").val());
                }
                if ($("#copv").prop("checked")) {
                    $("#covvdf").prop("checked", false);
                    $("#copvdf").prop("checked", true);
                    $("#cpivdf").val($("#cpiv").val());
                    $("#cpovdf").val($("#cpov").val());
                    $("#cvovdf").val("");
                    $("#cvivdf").val("");
                    $("#impcvdf").val($("#impcv").val());
                }
                //cargadetbasicfac($("#idrv").val());
            }

            $("#mnuefacturas").modal({ backdrop: 'static', keyboard: false });
           

        });

        $("#cosuni").prop('readOnly', true);
        $("#cantf").prop('readOnly', true);
        $("#impfac").prop('readOnly', true);
        $('#facaso').change(function () {
            $("#fecfac").val(formatoFecha($("#facaso option:selected").attr("fec"), 1));
            $("#montfac").val($("#facaso option:selected").attr("import"));

        });
        $('#tcf').change(function () {
            if ($('#tcf option:selected').text().toUpperCase() === "NOTA DE CREDITO") {
                $('#ncfac').show();
            } else {
                $('#ncfac').hide();
            }
        });
        $("#agrefacas").on("click", function () {
            let id;
            let pre;
            let fila;

            id = $("#facas tbody tr").length;
            pre = "info";


            fila = '<tr id="f' + pre + id + '">' + '<td class="text-right" style="display: none">' + $('#facaso').val() + '</td>' +
                '<td class="text-center">' + $('#facaso option:selected').text() + '</td>' +
                '<td class="text-center">' + $('#fecfac').val() + '</td>' +
                '<td class="text-center">' + $('#montfac').val() + '</td>' +
                '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina menu"></i></td></tr>';


            $("#facas tbody").append(fila);
            fila = $("#facas tr:last");

            $(fila).css({ "cursor": "pointer" });
            $("#b" + pre + id).on("click", function () {
                Swal.fire({
                    title: 'Confirmación',
                    html: '¿Confirma que desea eliminar el menu <b>' + $("#n" + pre + id).text() + '</b>?',
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
                })
            });
        });

        //radiobutton change
        $('input[type=radio][name=tipom]').on('change', function () {
            var d = $("#prodlistv tbody tr").length;
            if (["1", "2", "3"].indexOf(this.value) > -1) {
                $("#impfac").prop('readOnly', this.value === 1);
                if (d > 0) cargaPckingfac($("#idrv").val())
                else cargadetbasicfac($("#idrv").val())
            }
        });
        $("#canf").on("click", function () {
            $("#productosf tbody").empty();
            limpiaControles("mnuefacturas");
            $("input:radio").prop("checked", false);
            $("#cxc").val(1);
            $("#mt").val(2);
            $("#ig").val(3);


            $("#mnuefacturas").modal("toggle");
        });
        $("#guaf").on("click", function () {
            if (valForm('doce')) {
                guardaDocReg();
            }
        });
        $("#guafe").on("click", function () {
            updateDocReg();
        });
        $('#rucf').blur(function () {
            buscaProveedorruc($('#rucf').val());
        });
        $("#raz").blur(function () {
            buscaProveedorazs($("#raz").val());
        });
        $('#rucfe').blur(function () {
            buscaProveedorruce($('#rucfe').val());
        });
        $("#raze").blur(function () {
            buscaProveedorazse($("#raze").val());
        });
        $("#nprov").on("click", function () {
            //limpiaControles("proveedor");
            //cargaUbigeos();

            //$("#proveedor").modal({ backdrop: 'static', keyboard: false });
            limpiaControles("exporta");
            cargaUbigeos();
            $("#exporta").modal({ backdrop: 'static', keyboard: false });

        });
        $("#nprove").on("click", function () {
            limpiaControles("exporta");
            cargaUbigeos();
            $("#exporta").modal({ backdrop: 'static', keyboard: false });

        });

        $("#guaprov").on("click", function () {
            if (valForm("proveedor")) {
                guardaProv();
            }
        });
        $("#canprov").on("click", function () {
            $("#proveedor").modal("toggle");
        });
        $('#impfac').blur(function () {
            let cant = $('#cantf').val();
            let imp = $('#impfac').val();
            let cosuni = imp / cant;
            $('#cosuni').val(formatoMoneda(cosuni, 2, true));
        });
        $("#tproductosfbody").on('input', '.pre', function () {

            var cant = $(this).parent().prev().children().val();
            var monto = Number($(this).val());
            monto = monto * cant;
            var ivg = $(this).parent().next().next().children().val();
            $trsub = $(this).parent().next().children();
            $trivg = $(this).parent().next().next().children();
            $trtot = $(this).parent().next().next().next().children();
            //suma los importes de cada concepto
            $trsub.val(monto);
            var ivgt = parseFloat(ivg);
            var tot = formatoMoneda(monto * (1 + (ivg / 100)), 2, true);
            $trtot.val(tot);
            $trtot.prop("readonly", true);
            //$trivg.prop("readonly", true);
            $trsub.prop("readonly", true);
            actualizaTotalesFact();
        });
        $("#tproductosfbody").on('input', '.can', function () {

            var monto = $(this).parent().next().children().val();
            var cant = Number($(this).val());
            monto = monto * cant;
            var ivg = $(this).parent().next().next().next().children().val();
            $trsub = $(this).parent().next().next().children();
            $trivg = $(this).parent().next().next().next().children();
            $trtot = $(this).parent().next().next().next().next().children();
            //suma los importes de cada concepto
            $trsub.val(monto);
            var ivgt = parseFloat(ivg);
            var tot = formatoMoneda(monto * (1 + (ivg / 100)), 2, true);
            $trtot.val(tot);
            $trtot.prop("readonly", true);
            $trivg.prop("readonly", true);
            $trsub.prop("readonly", true);
        });
        $("#tproductosfbody").on('input', '.ivg', function () {

            $trsub = $(this).parent().prev().children().val();
            var $ivg = $(this).val();
            $trtot = $(this).parent().next().children();
            var subt = Number($trsub);
            $ivg = $ivg.replace('%', '');
            var ivgt = parseFloat($ivg);
            var tot = formatoMoneda(subt * (1 + (ivgt / 100)), 2, true);
            //suma los importes de cada concepto
            $trtot.val(tot);
            actualizaTotalesFact();
        });
        $("#tproductosfbody").on('input', '.tot', function () {

            var cant = $(this).parent().prev().prev().prev().prev().children().val();
            var total = Number($(this).val());
            var ivg = $(this).parent().prev().children().val();

            var monto = total / cant;
            var sub = monto * cant;
            var ivgt = parseFloat(ivg);

            $trsub = $(this).parent().prev().prev().children();
            $trprep = $(this).parent().prev().prev().prev().children();
            //suma los importes de cada concepto
            $trsub.val(sub);
            $trprep.val(monto);
            actualizaTotalesFact();
        });
        $("#tproductosfebody").on('input', '.pre', function () {

            var cant = $(this).parent().prev().children().val();
            var monto = Number($(this).val());
            monto = monto * cant;
            var ivg = $(this).parent().next().next().children().val();
            $trsub = $(this).parent().next().children();
            $trivg = $(this).parent().next().next().children();
            $trtot = $(this).parent().next().next().next().children();
            //suma los importes de cada concepto
            $trsub.val(monto);
            var ivgt = parseFloat(ivg);
            var tot = formatoMoneda(monto * (1 + (ivg / 100)), 2, true);
            $trtot.val(tot);
            $trtot.prop("readonly", true);
            $trivg.prop("readonly", true);
            $trsub.prop("readonly", true);
            actualizaTotalesFacteE();
        });
        $("#tproductosfebody").on('input', '.can', function () {

            var monto = $(this).parent().next().children().val();
            var cant = Number($(this).val());
            monto = monto * cant;
            var ivg = $(this).parent().next().next().next().children().val();
            $trsub = $(this).parent().next().next().children();
            $trivg = $(this).parent().next().next().next().children();
            $trtot = $(this).parent().next().next().next().next().children();
            //suma los importes de cada concepto
            $trsub.val(monto);
            var ivgt = parseFloat(ivg);
            var tot = formatoMoneda(monto * (1 + (ivg / 100)), 2, true);
            $trtot.val(tot);
            $trtot.prop("readonly", true);
            $trivg.prop("readonly", true);
            $trsub.prop("readonly", true);
        });
        $("#tproductosfebody").on('input', '.tot', function () {

            var cant = $(this).parent().prev().prev().prev().prev().children().val();
            var total = Number($(this).val());
            var ivg = $(this).parent().prev().children().val();

            var monto = total / cant;
            var sub = monto * cant;
            var ivgt = parseFloat(ivg);

            $trsub = $(this).parent().prev().prev().children();
            $trprep = $(this).parent().prev().prev().prev().children();
            //suma los importes de cada concepto
            $trsub.val(sub);
            $trprep.val(monto);
            actualizaTotalesFacteE();
        });

        $("#braz").on("click", function () {
            buscaProveedorazs($("#raz").val());
        });
        $("#braze").on("click", function () {
            buscaProveedorazse($("#raze").val());
        });

        $("#cvivdf").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#cpivdf").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });
        $("#cvivdf").on("change", function () {
            comisionMontodf();
        });
        $("#cvovdf").on("change", function () {
            comisionMontodf();
        });
        $("#cpivdf").on("change", function () {
            comisionPorcentajedf();
        });
        $("#cpovdf").change(function () {
            comisionPorcentajedf();
        });
        //Edita la factura
        $('#divchke').hide();

        $("#canfe").on("click", function () {
            $("#productosfe tbody").empty();
            limpiaControles("meditfacturas");
            $("#meditfacturas").modal("toggle");
        });

        //$('#meditfacturas').on('hidden.bs.modal', function (e) {
        //    $('body').addClass('modal-open');
        //});

        //$('#mnuefacturas').on('hidden.bs.modal', function (e) {
        //    $('body').addClass('modal-open');
        //});
        //Costos Importacion
        $('#deg').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        $('#hasg').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        $('#def').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });
        $('#hasf').datepicker({ calendarWeeks: false, uiLibrary: 'bootstrap4', format: "dd/mm/yyyy", locale: "es-es" });

        $("#rcimp").on("click", function () {
            let param = new Object();
            param.idreg = $("#idr").val();
            param.cos = 1;
            cargaCFL(param);
            let param1 = new Object();
            param1.idreg = $("#idr").val();
            param1.cos = 2;
            cargaCG(param1);

            $("#costos").modal({ backdrop: 'static', keyboard: false });
        });
        $("#impf").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });

        $("#impg").on("keypress", function (evt) {
            return numerosDecimales(evt, this);
        });

        $("#canfl").on("click", function () {
            $(this).hide();
            $("#idf").val("");
            $("#tipfl").val("");
            $("#umfl").val("");
            $("#impf").val("");
            $("#def").val("");
            $("#hasf").val("");
        });
        $("#guafl").on("click", function () {
            if (valForm("fletem")) {
                guardaCosto(1);
            }
        });
        $("#guag").on("click", function () {
            if (valForm("gostos")) {
                guardaCosto(2);
            }
        });
        $("#cang").on("click", function () {
            $(this).hide();
            $("#idg").val("");
            $("#tipg").val("");
            $("#umg").val("");
            $("#impg").val("");
            $("#deg").val("");
            $("#hasg").val("");
        });

        $('#txtFiltroExportadorRUC').on("keyup", function () {
            let filtro = $('#txtFiltroExportadorRUC').val();
            let validador = 0;
            let contador = 0;

            $('#exp option').each(function () {
                let razonSocialExportador = $(this).text().toUpperCase();
                let rucExportador = $(this).attr("ruc");

                if (razonSocialExportador.indexOf(filtro.toUpperCase()) !== -1 || rucExportador.indexOf(filtro) !== -1) {
                    $(this).show();
                    if (validador === 0) {
                        $(this).attr("selected", true);
                        $('#exp ').val($(this).val());
                        validador++;
                    } else {
                        $(this).attr("selected", false);
                    }
                } else {
                    $(this).attr("selected", false);
                    $(this).hide();
                    contador++;
                    if ($(this).attr("style") == "display: none;" && contador == $('#exp option').length) {
                        $('#exp ').val('');
                    }
                }
                if (filtro == '') {
                    //SELECCIONAR EL PRIMERO
                    $(this).show();
                    $('#exp option:first-child').attr("selected", true);
                }
            });
        });
        $('#txtFiltroImportadorRUC').on("keyup", function () {
            let filtro = $('#txtFiltroImportadorRUC').val();
            let validador = 0;
            let contador = 0;

            $('#imp option').each(function () {
                let razonSocialExportador = $(this).text().toUpperCase();
                let rucImportador = $(this).attr("ruc");

                if (razonSocialExportador.indexOf(filtro.toUpperCase()) !== -1 || rucImportador.indexOf(filtro) !== -1) {
                    $(this).show();
                    if (validador === 0) {
                        $(this).attr("selected", true);
                        $('#imp ').val($(this).val());
                        validador++;
                    } else {
                        $(this).attr("selected", false);
                    }
                } else {
                    $(this).attr("selected", false);
                    $(this).hide();
                    contador++;
                    if ($(this).attr("style") == "display: none;" && contador == $('#imp option').length) {
                        $('#imp ').val('');
                    }
                }
                if (filtro == '') {
                    //SELECCIONAR EL PRIMERO
                    $(this).show();
                    $('#imp option:first-child').attr("selected", true);
                }
            });
        });

        // NUEVO AÑADIR
        $('#filtroProductoImp').on("keyup", function () {
            let filtro = $('#filtroProductoImp').val();
            let validador = 0;
            let contador = 0;

            $('#nompimp option').each(function () {
                let nombreProducto = $(this).text().toUpperCase();
                let codigoProducto = $(this).attr("codigo");

                if (nombreProducto.indexOf(filtro.toUpperCase()) !== -1 || codigoProducto.indexOf(filtro) !== -1) {
                    $(this).show();
                    if (validador === 0) {
                        $(this).attr("selected", true);
                        $('#nompimp').val($(this).val());
                        validador++;
                    } else {
                        $(this).attr("selected", false);
                    }
                } else {
                    $(this).attr("selected", false);
                    $(this).hide();
                    contador++;
                    if ($(this).attr("style") == "display: none;" && contador == $('#nompimp option').length) {
                        $('#nompimp').val('');
                    }
                }
                if (filtro == '') {
                    //SELECCIONAR EL PRIMERO
                    $(this).show();
                    $('#nompimp option:first-child').attr("selected", true);
                }
            });
        });
        $("#filtrarSelect").on("change", function () {
            let tipoFiltro = $(this).val();
            establecerFiltros(tipoFiltro);

        });

        $("#filtrarSelectdoc").on("change", function () {
            let tipoFiltro = $(this).val();
            establecerFiltrosD(tipoFiltro);

        });
        $("#filtroTodos").on("keyup", function () {
            let contadorRegistros = 0;
            contadorRegistros = filtrarTodos("ordenes2", this.id, "busqueda");
            validarRegistros(contadorRegistros);
            function validarRegistros(cantidadRegistros) {
                if (cantidadRegistros <= 0) {
                    $('#txtRegistros').html("No existen registros para los filtros aplicados");
                } else if (cantidadRegistros == 1) {
                    $('#txtRegistros').html("Total " + cantidadRegistros + " registro");
                } else {
                    $('#txtRegistros').html("Total " + cantidadRegistros + " registros");
                }
            }
            function filtrarTodos(idTabla, idInput, opcion) {
                let contadorRegistros = 0;
                let normalizarTexto = (function () {
                    let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç',
                        a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc',
                        re = new RegExp('[' + de + ']', 'ug');

                    return texto =>
                        texto.replace(
                            re,
                            match => a.charAt(de.indexOf(match))
                        );
                })();
                if (opcion === "busqueda") {
                    let textoBuscar = normalizarTexto($("#" + idInput).val().toLowerCase());

                    $.each($("#" + idTabla + " table tbody tr"), function () {

                        let texto = normalizarTexto($(this).text().toLowerCase());

                        if (texto.indexOf(textoBuscar) === -1)
                            $(this).hide();
                        else {
                            $(this).show();
                            contadorRegistros++;
                        }
                    });
                } else {
                    $.each($("#" + idTabla + " table tbody tr"), function () {
                        $(this).show();
                        contadorRegistros++;
                    });
                }
                return contadorRegistros;
            }
        });
        $("#restablecerFiltros").on("click", function () {
            cargaTablaPrincipal();
            $("#filtrarSelect").val("0");
            $("#filtroEstado").val("0").change();
            $("#ocValor").val("");
            $("#pedidoValor").val("");
            $("#proveedorValor").val("");
            $("#filtroFechaInicio").val("");
            $("#filtroFechaFin").val("");
            $("#anioValor").val("");
            $("#importacionValor").val("");
            establecerFiltros(0);
            restablecerTabla();
        });
        $("#restablecerFiltrosD").on("click", function () {
            cargaFac($("#idrv").val());
            $("#filtrarSelectD").val("0");
            $("#filtroValorD").val("");
            $("#filtroFechaInicioD").val("");
            $("#filtroFechaFinD").val("");
            $("#filtroValorRSocial").val("");
            $("#filtroValorRUC").val("");

            establecerFiltrosD(0);
            restablecerTablaD();
        });

        $("#filtrarBtn").on("click", function () {
            /*let ocValor = $("#ocValor").val();*/
            let pedidoValor = $("#pedidoValor").val();
            let proveedorValor = $("#proveedorValor").val();
            let filtroFechaInicio = $("#filtroFechaInicio").val();
            let filtroFechaFin = $("#filtroFechaFin").val();
            let estadoValor = $("#filtroEstado option:selected").val();
            let anioValor = $("#anioValor").val();
            let importacionValor = $("#importacionValor").val();
            //$("#oc").addClass("d-none");
            let cantidadRegistros = 0;

            $("#ordenes2 table tbody tr").show();

            if (anioValor != ''){
                //FILTRO PARA EL AÑO
                $("#ordenes2 table tbody").children("tr").each(function (index) {
                    let anio = $($(this).children("td")[0]).text();
                    if (anio.toUpperCase().startsWith(anioValor.toUpperCase())) {

                        $(".d-none").removeClass("d-none");
                        var fila = $(this);
                        if (!fila.is(":hidden")) {
                            fila.show();
                            cantidadRegistros++;
                        }
                    } else {
                        $(this).hide();
                    }
                });
                validarRegistros(cantidadRegistros);
            }

            if (importacionValor != ''){
                //FILTRO PARA imp
                $("#ordenes2 table tbody").children("tr").each(function (index) {
                    let importacion = $($(this).children("td")[2]).text();
                    if (importacion.toUpperCase().startsWith(importacionValor.toUpperCase())) {
                        $(".d-none").removeClass("d-none");
                        var fila = $(this);
                        if (!fila.is(":hidden")) {
                            fila.show();
                            cantidadRegistros++;
                        }
                    } else {
                        $(this).hide();
                    }
                });
                validarRegistros(cantidadRegistros);
            }

            if (pedidoValor != '') {
                //FILTRO DE NUMERO DE PEDIDO
                $("#ordenes2 table tbody").children("tr").each(function (index) {
                    let numeroPedido = $($(this).children("td")[1]).text();
                    if (numeroPedido.startsWith(pedidoValor) && pedidoValor != '') {
                        $(".d-none").removeClass("d-none");
                        var fila = $(this);
                        if (!fila.is(":hidden")) {
                            fila.show();
                            cantidadRegistros++;
                        }
                    } else {
                        $(this).hide();
                    }
                });
                validarRegistros(cantidadRegistros);
            }

            //if (pedidoValor != '' || ocValor != '') {
            //    //FILTRO DE NUMERO DE PEDIDO O DE ORDEN COMPRA
            //    $("#ordenes2 table tbody").children("tr").each(function (index) {
            //        let numeroPedido = $($(this).children("td")[1]).text();
            //        if ((numeroPedido.startsWith(pedidoValor) && pedidoValor != '') || (numeroPedido.startsWith(ocValor) && ocValor != '')) {
            //            var fila = $(this);
            //            if (!fila.is(":hidden")) {
            //                fila.show();
            //                cantidadRegistros++;
            //            }
            //        } else {
            //            $(this).hide();
            //        }
            //    });
            //    validarRegistros(cantidadRegistros);
            //}

            if (filtroFechaInicio != '' && filtroFechaFin != '') {
                let filtroFIniFormat = filtroFechaInicio.substr(6, 4) + "-" + filtroFechaInicio.substr(3, 2) + "-" + filtroFechaInicio.substr(0, 2);
                let filtroFFinFormat = filtroFechaFin.substr(6, 4) + "-" + filtroFechaFin.substr(3, 2) + "-" + filtroFechaFin.substr(0, 2);
                //FILTRO FECHA EMISION
                if (validarIntervaloFechas(filtroFIniFormat, filtroFFinFormat)) {
                    $("#ordenes2 table tbody").children("tr").each(function (index) {
                        let tblFechaIngresoCamara = $($(this).children("td")[6]).text();
                        let fechaEmision = tblFechaIngresoCamara.substr(6, 4) + "-" + tblFechaIngresoCamara.substr(3, 2) + "-" + tblFechaIngresoCamara.substr(0, 2);

                        console.log(fechaEmision);
                        console.log(filtroFechaInicio);
                        console.log(filtroFechaFin);

                        if (fechaEmision >= filtroFIniFormat && fechaEmision <= filtroFFinFormat) {
                            $(".d-none").removeClass("d-none");
                            var fila = $(this);
                            if (!fila.is(":hidden")) {
                                fila.show();
                                cantidadRegistros++;
                            }
                        } else {
                            $(this).hide();
                        }

                    });
                    validarRegistros(cantidadRegistros);
                }
            }

            if (proveedorValor != '') {
                //FILTRO PROVEEDOR
                $("#ordenes2 table tbody").children("tr").each(function (index) {
                    let proveedorTable = $($(this).children("td")[7]).text();
                    if (proveedorTable.toUpperCase().startsWith(proveedorValor.toUpperCase())) {
                        $(".d-none").removeClass("d-none");
                        var fila = $(this);
                        if (!fila.is(":hidden")) {
                            fila.show();
                            cantidadRegistros++;
                        }
                    } else {
                        $(this).hide();
                    }
                });
                validarRegistros(cantidadRegistros);
            }

            if (estadoValor != 0) {
                let estado = $("#filtroEstado option:selected").text();
                //FILTRO ESTADO
                //TIPO ESTADO: NUEVO                1
                //TIPO ESTADO: EN PROCESO           2
                //TIPO ESTADO: INGRESADO A CAMARA   3
                //TIPO ESTADO: FACTURADO            4
                //TIPO ESTADO: ENVIADO A DESTINO    5 --agregado anulado
                $("#ordenes2 table tbody").children("tr").each(function (index) {
                    estadoTabla = $($(this).children("td")[11]).text();
                    
                    if (estado == estadoTabla.substr(0, estado.length)) {

                        $(".d-none").removeClass("d-none");
                        
                            var fila = $(this);
                            if (!fila.is(":hidden")) {
                                fila.show();
                                cantidadRegistros++;
                            }
                        
                    }else {
                            $(this).hide();
                            
                        }
                    
                    
                });
                validarRegistros(cantidadRegistros);
            }

            function validarRegistros(cantidadRegistros) {
                if (cantidadRegistros <= 0) {
                    $('#txtRegistros').html("No existen registros para los filtros aplicados");
                } else if (cantidadRegistros == 1) {
                    $('#txtRegistros').html("Total " + cantidadRegistros + " registro");
                } else {
                    $('#txtRegistros').html("Total " + cantidadRegistros + " registros");
                }
            }
        });

        $("#filtrarBtnD").on("click", function () {
            //let tipoFiltro = $("#filtrarSelectdoc option:selected").val();
            let filtroValor = "";
            let filtroValorRUC = "";
            let filtroValorRSocial = "";
            let filtroFechaInicio;
            let filtroFechaFin;
            let cantidadRegistros = 0;

            filtroValorRUC = $("#filtroValorRUC").val();
            filtroValorRSocial = $("#filtroValorRSocial").val();
            filtroValorRUC = $.trim(filtroValorRUC);
            filtroValorRSocial = $.trim(filtroValorRSocial);
            filtroFechaInicio = $("#filtroFechaInicioD").val();
            filtroFechaFin = $("#filtroFechaFinD").val();

            if (filtroValorRSocial != '') {
                filtroValor = filtroValorRSocial;
                $("#MALCO-infofac tbody").children("tr").each(function (index) {
                    let razonsocial = $($(this).children("td")[2]).text();
                    if (razonsocial.includes(filtroValor)) {
                        var fila = $(this);
                        if (!fila.is(":hidden")) {
                            fila.show();
                            cantidadRegistros++;
                        }
                    } else {
                        $(this).hide();
                    }
                });
                validarRegistros(cantidadRegistros);
            }

            if (filtroValorRUC != '') {
                filtroValor = filtroValorRUC;
                $("#MALCO-infofac tbody").children("tr").each(function (index) {
                    let razonsocial = $($(this).children("td")[3]).text();
                    if (razonsocial.includes(filtroValor)) {
                        var fila = $(this);
                        if (!fila.is(":hidden")) {
                            fila.show();
                            cantidadRegistros++;
                        }
                    } else {
                        $(this).hide();
                        cantidadRegistros--;
                    }
                });
                validarRegistros(cantidadRegistros);
            }
            if ((filtroFechaInicio != '' && filtroFechaFin != '')) {
                //FILTRO FECHA EMISION
                let filtroFIniFormat = filtroFechaInicio.substr(6, 4) + "-" + filtroFechaInicio.substr(3, 2) + "-" + filtroFechaInicio.substr(0, 2);
                let filtroFFinFormat = filtroFechaFin.substr(6, 4) + "-" + filtroFechaFin.substr(3, 2) + "-" + filtroFechaFin.substr(0, 2);
                if (validarIntervaloFechas(filtroFIniFormat, filtroFFinFormat)) {
                    $("#MALCO-infofac tbody").children("tr").each(function (index) {
                        let tblFechaIngresoCamara = $($(this).children("td")[6]).text();
                        let fechaEmision = tblFechaIngresoCamara.substr(6, 4) + "-" + tblFechaIngresoCamara.substr(3, 2) + "-" + tblFechaIngresoCamara.substr(0, 2);
                        if (fechaEmision >= filtroFIniFormat && fechaEmision <= filtroFFinFormat) {
                            var fila = $(this);
                            if (!fila.is(":hidden")) {
                                fila.show();
                                cantidadRegistros++;
                            }
                        } else {
                            $(this).hide();
                        }
                    });
                    validarRegistros(cantidadRegistros);
                }
            }

            function validarRegistros(cantidadRegistros) {
                if (cantidadRegistros <= 0) {
                    $('#txtRegistrosD').html("No existen registros para los filtros aplicados");
                } else if (cantidadRegistros == 1) {
                    $('#txtRegistrosD').html("Total " + cantidadRegistros + " registro");
                } else {
                    $('#txtRegistrosD').html("Total " + cantidadRegistros + " registros");
                }
            }
        });

        $('#env').click(function () {
            if (ValidarFormatoEmail()) {
                enviaPDFImpo();
            }
            else {
                Alerta("Formato de email incorrecto", "ERROR!");
            }
        });

    /*añidr producto modal nuevo*/

        /*filtro
        $("#btnOpcion").add .on("click", function () {
            $("#btnOpcion").removeClass("d-none");
            console.log("e");

        });
        */
        /*PARA COMBO DE PRODUCTOS ANINDADO CON DIV*/
        $("#cuerpoPord").on("click", function () {
            $("#prodbody").bind("click"); 
            $("#prodbody").on("click", function () {

                $("#nvoCombo").empty();

                $("#nvoCombo").addClass("d-none");
            });

        });

        $("#nomp").on("click", function () {

            //$("#nvoCombo").removeClass("d-none");
            $("#nvoCombo button").removeClass("d-none");
            $("#prodbody").unbind("click"); 
            //if ($(this).val() == undefined || $(this).val() == '') {
            cargaInsumos("%");
            // $("#nvoCombo").removeClass("d-none");
          });

      
        $("#nomp").on('keyup', function () {
            var fin = "";
            var a = "%" + $("#nomp").val()+"%";

            fin = a.replace(" ", "%");
            console.log(fin); $("#prodbody").unbind("click"); 
            cargaInsumos(fin);
        });
    /*FIN PARA COMBO DE PRODUCTOS ANINDADO CON DIV*/

        $("#addProd").on("click", function () {

            $("#ModalproductoR").modal("show");
        });


        $("#can").on("click", function () {
            $("#ModalproductoR").modal("toggle");
            limpiaControles("ModalproductoR");
        });

        $("#guardarProd").on("click", function () {
            GuardarProductoNuevo();
        });
        $('#especieP').change(function () {
            $('#calidadP option').remove();
            $('#variedadP option').remove();
            $("#variedadP").append('<option value=""></option>');
            $("#calidadP").append('<option value=""></option>');
            var ide = $('#especieP').val() === "" ? 0 : $('#especieP').val();
            cargaCalidades(0, ide);
            cargaVariedades(0, ide);
            descprod[1] = $('#especieP option:selected').text();
            $('#descri').val(descprod.join(' '));
        });

        $('#variedadP').change(function () {
            descprod[2] = $('#variedadP option:selected').text().trim();
            $('#descri').val(descprod.join(' '));

        });
        $('#calidadP').change(function () {
            descprod[3] = $('#calidadP option:selected').text().trim();
            $('#descri').val(descprod.join(' '));
        });
        $('#calibreP').change(function () {
            descprod[4] = $('#calibreP option:selected').text().trim();
            $('#descri').val(descprod.join(' '));
        });
        $('#eti').change(function () {
            descprod[5] = $('#eti option:selected').text().trim();
            $('#descri').val(descprod.join(' '));
        });
        $('#embajaleP').change(function () {
            descprod[6] = $('#embajaleP option:selected').text().trim();
            $('#descri').val(descprod.join(' '));
        });
        $('#medidaP').change(function () {
            descprod[7] = $('#medidaP option:selected').text().trim();
            $('#descri').val(descprod.join(' '));

        });
        $('#peso').change(function () {
            descprod[8] = $('#peso option:selected').text().trim();
            $('#descri').val(descprod.join(' '));
        });
        /modales variedades/
        $("#nesp").on("click", function () {
            limpiaControles("mespecie");
            $("#mespecie").modal({ backdrop: 'static', keyboard: false });
        });
        $("#nvar").on("click", function () {
            limpiaControles("mvariedad");
            $("#mvariedad").modal({ backdrop: 'static', keyboard: false });
        });
        $("#ncal").on("click", function () {
            limpiaControles("mcalibre");
            $("#mcalibre").modal({ backdrop: 'static', keyboard: false });
        });
        $("#ncali").on("click", function () {
            limpiaControles("mcalidad");
            $("#mcalidad").modal({ backdrop: 'static', keyboard: false });
        });
        $("#neti").on("click", function () {
            limpiaControles("metiqueta");
            $("#metiqueta").modal({ backdrop: 'static', keyboard: false });
        });
        $("#nemb").on("click", function () {
            limpiaControles("membalaje");
            $("#membalaje").modal({ backdrop: 'static', keyboard: false });
        });
        $("#um").on("click", function () {
            limpiaControles("munidadmedida");
            $("#munidadmedida").modal({ backdrop: 'static', keyboard: false });
        });
        $("#npeso").on("click", function () {
            limpiaControles("mpeso");
            $("#mpeso").modal({ backdrop: 'static', keyboard: false });
        });
        /guardar variedades/
        $("#guaesp").on("click", function () {
            if (valForm("mespecie")) {
                GuardarEspecie();
            }
        });
        $("#guavar").on("click", function () {
            if (valForm("mvariedad")) {
                GuardarVariedad();
            }
        });
        $("#guacal").on("click", function () {
            if (valForm("mcalidad")) {
                GuardarCalidad();
            }
        });
        $("#guacalib").on("click", function () {
            if (valForm("mcalibre")) {
                GuardarCalibre();
            }
        });
        $("#guaeti").on("click", function () {
            if (valForm("metiqueta")) {
                GuardarEtiqueta();
            }
        });
        $("#guaemb").on("click", function () {
            if (valForm("membalaje")) {
                GuardarEmbalaje();
            }
        });
        $("#guaum").on("click", function () {
            if (valForm("munidadmedida")) {
                GuardarUnidadMedida();
            }
        });
        $("#guapeso").on("click", function () {
            if (valForm("mpeso")) {
                GuardarPesos();
            }
        });
    /*fin añadir producto*/
     /*puerto de origen y deestino y linea naviera*/
        let puerto = "";
        $("#btnNvoPOrg").on("click", function () {

            limpiaControles("mpOrigen");
            $("#mpOrigen h4").empty().append("Puerto Origen");
            $("#mpOrigen").modal({ backdrop: 'static', keyboard: false });
           // puerto = $("#mpOrigen h4").text();
        });

        $("#btnNvoPDes").on("click", function () {

            limpiaControles("mpOrigen");
            $("#mpOrigen h4").empty().append("Puerto Destino");
            $("#mpOrigen").modal({ backdrop: 'static', keyboard: false });
            //puerto = $("#mpOrigen h4").text();
        });



    });

    
    $("#btnMLinea").on("click", function () {

        limpiaControles("mpLineaNaviera");
        $("#mpLineaNaviera").modal({ backdrop:'static',keyboard:false });

    });

/*METODOS GUARDAR PRODUCTOS NUEVOS */
    function GuardarEspecie() {
        let info = new Object();

        info.esp = $("#desp").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#desp").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/especies.aspx/Insertar`, {
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
                    $('#esp option').remove();
                    $('#espv option').remove();
                    $('#espc option').remove();
                    $("#esp").append('<option value=""></option>');
                    $("#espv").append('<option value=""></option>');
                    $("#espc").append('<option value=""></option>');

                    cargaEspecies(0);
                    $("#mespecie").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarVariedad() {
        let info = new Object();
        info.var = $("#vari").val();
        info.esp = $("#espv").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar la variedad de  <b>' + $("#vari").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/variedades.aspx/Insertar`, {
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
                    $('#var option').remove();
                    $("#var").append('<option value=""></option>');

                    var ides = $('#esp').val() === "" ? 0 : $('#esp').val();
                    cargaVariedades(0, ides);
                    $("#mvariedad").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarCalidad() {
        let info = new Object();
        info.cal = $("#calid").val();
        info.esp = $("#espc").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar la calidad de  <b>' + $("#calid").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/calidad.aspx/Insertar`, {
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
                    $('#cali option').remove();
                    $("#cali").append('<option value=""></option>');

                    var ides = $('#esp').val() === "" ? 0 : $('#esp').val();
                    cargaCalidades(0, ides);
                    $("#mcalidad").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarCalibre() {
        let info = new Object();

        info.cal = $("#calibd").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#calibd").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/calibre.aspx/Insertar`, {
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
                    $('#cal option').remove();
                    $("#cal").append('<option value=""></option>');

                    cargaCalibres(0);
                    $("#mcalibre").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarEtiqueta() {
        let info = new Object();

        info.eti = $("#etid").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#etid").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/etiqueta.aspx/Insertar`, {
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
                    $('#eti option').remove();
                    $("#eti").append('<option value=""></option>');

                    cargaEtiquetas(0);
                    $("#metiqueta").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarEmbalaje() {
        let info = new Object();

        info.emb = $("#embd").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#embd").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/embalaje.aspx/Insertar`, {
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
                    $('#emb option').remove();
                    $("#emb").append('<option value=""></option>');

                    cargaEmbalaje(0);
                    $("#membalaje").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarUnidadMedida() {
        let info = new Object();

        info.um = $("#umd").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#umd").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/unidadesmedida.aspx/Insertar`, {
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
                    $('#um option').remove();
                    $("#um").append('<option value=""></option>');

                    cargaUnidadesMedida(0);
                    $("#munidadmedida").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
    function GuardarPesos() {
        let info = new Object();

        info.peso = $("#pes").val();
        info.nom = $("#nom").val();

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#umd").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/peso.aspx/Insertar`, {
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
                    $('#peso option').remove();
                    $("#peso").append('<option value=""></option>');

                    cargaPesos(0);
                    $("#mpeso").modal("toggle");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }

    function GuardarProductoNuevo() {
        let info = new Object();

        info.pro = $("#descri").val();
        info.esp = $("#especieP").val() === "" ? null : $("#especieP").val();
        info.var = $("#variedadP").val() === "" ? null : $("#variedadP").val();
        info.cali = $("#calidadP").val() === "" ? null : $("#calidadP").val();
        info.cal = $("#calibreP").val() === "" ? null : $("#calibreP").val();
        info.eti = $("#eti").val() === "" ? null : $("#eti").val();
        info.tipoProducto = $("#tipo").val() === "" ? null : $("#tipo").val();
        info.emb = $("#embajaleP").val() === "" ? null : $("#embajaleP").val();
        info.um = $("#medidaP").val() === "" ? null : $("#medidaP").val();
        info.copro = $("#copro").val();
        info.edo = $("#stp").val();
        info.canu = $("#cant").val();
        info.idpeso = $("#peso").val() === "" ? null : $("#peso").val();
        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#descri").val() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/productos.aspx/Insertar`, {
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
                    limpiaControles("ModalproductoR");
                    //cargarProductos();
                    //cargaInsumos("%");
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }
/*FIN METODOS GUARDAR PRODUCTOS NUEVOS */


    function ValidarFormatoEmail() {
        var email = $("#envcorr").val();
        var espacio = " ";
        var estado = true;
        var coma = ",";
        var arrayDeCadenas = email.split(coma);
        for (var i = 0; i < arrayDeCadenas.length; i++) {
            emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!emailRegex.test(arrayDeCadenas[i])) {
                return false;

            }
        }
        return estado;
    }

    function enviaPDFImpo() {
        get('/ws/registros.aspx/enviarPDFImpo', JSON.stringify({ path: $("#pathEmail").val(), email: $("#envcorr").val() }))
            .then(function (res) {
                if (res.Mensaje === "OK") {
                    Alerta("El PDF se envió correctamente");
                }
                else {
                    Alerta("No fue posible enviar el PDF", "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible enviar el PDF<br />" + error);
            });
    }

    function enviaPDF() {
        get('/ws/reportes.aspx/pdfImportacionDirecta', JSON.stringify({ id: $("#idr").val() }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    Alerta("El PDF se envió correctamente<br><span style='font-size:85%'>Puede descargar el documento dando clic <a download='doc.pdf' href='/tmp/" + res.Info + "' id = 'dd'" + $("#idr").val() + "'>aquí</a></span>");
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible enviar el PDF<br />" + error);
            });
    }

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

    function cargaInsumos(param) {
        var par = param.replace(" ", "%");
        get('/ws/productos.aspx/ListarInsumosPorConversion', JSON.stringify({ id: 1, prod: par}))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        //$("#nomp").empty();
                        $("#nompe").empty();
                        $("#nvoCombo").empty();
                        $("#nvoCombo button").remove();
                        if (res.Info.length == 0) {
                            $("#nvoCombo").append('<button class="form-control text-left bg-white border-0 w-100" >No existen productos</button >');
                            $("#nvoCombo").css("height", "auto");
                        }

                       
                        $(res.Info).each(function () {
                            //$("#nomp").append('<option codigo=' + this.CODIGO + ' value="' + this.ID_PRODUCTO + '">' + this.PRODUCTO + '</option>');
                            $("#nompe").append('<option codigo="' + this.CODIGO + '" value="' + this.ID_PRODUCTO + '">' + this.PRODUCTO + '</option>');
                            $("#nvoCombo").append('<button idprd="' + this.ID_PRODUCTO + '" codigo="' + this.CODIGO + '"  id="btn' + this.CODIGO + '" style="font-size:13px; height:auto;" class="form-control text-left bg-white border-0 rounded-0 w-100" >' + this.CODIGO + ' -- ' + this.PRODUCTO + '</button >');

                            $("#nvoCombo").removeClass("d-none");
                            
                            if (res.Info.length > 10) {

                                $("#nvoCombo").css("height", "400px");
                            } else {
                                $("#nvoCombo").css("height", "auto");
                            }
                            $("#btn" + this.CODIGO).on("click", function () {
                                let producto = $(this).text().trim().split("--");
                                $("#nomp").val(producto[1]);
                                $("#nvoCombo button").hide();
                                $("#nvoCombo").addClass("d-none");
                               // console.log("valor seleccionad" + $(this).attr("idprd"));
                                $("#nomp").attr("idprod", $(this).attr("idprd"));
                                $("#nomp").attr("codigo", $(this).attr("codigo"));


                            });

                            $("#btn" + this.CODIGO).hover(function () {

                                $(this).addClass("bg-secondary text-white");
                            }, function () {
                                    $(this).removeClass("bg-secondary text-white");
                            }
                            );


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
    // VOLVER 
    function cargaProductos(id) {
        $("#codp").val($("#nomp option:selected").attr("codigo"));
        $("#idp").val($("#nomp option:selected").val());


    }

    function cargaProductosc(cod) {
        get('/ws/productos.aspx/ConsultarC', JSON.stringify({ cod: cod }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#nomp").val(this.id);
                            ("#nomp").trigger("change");
                            $("#idp").val(this.id);

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

    function cargaProductoscimp(cod) {
        get('/ws/productos.aspx/ConsultarC', JSON.stringify({ cod: cod }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#nompimp").val(this.pro);
                            $("#idpimp").val(this.id);

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

    function cargarProductos() {
        get('/ws/productos.aspx/ListarTodosLosProductosCodigo')
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
                        $("#nompimp").append('<option codigo="' + this.CODIGO + '" value="' + this.ID + '">' + this.PRODUCTO + '</option>');
                    });
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
            });
    }

    function cargarProductosPackingList() {
        get('/ws/productos.aspx/ListarTodosLosProductosCodigo')
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
                        //$("#nomp").append('<option codigo="' + this.CODIGO + '" value="' + this.ID + '">' + this.PRODUCTO + '</option>');
                        //$("#nompe").append('<option codigo="' + this.CODIGO + '" value="' + this.ID + '">' + this.PRODUCTO + '</option>');
                    });
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de productos<br />" + error, "ERROR!");
            });
    }

    function cargaPaises() {
        get('/ws/paises.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $("#pai").empty().append('<option value=""></option>');
                    $("#lpai").empty().append('<option value=""></option>');
                    $("#paid").empty().append('<option value=""></option>');
                    $.each(res.Info, function () {
                        $("#pai").append('<option value="' + this.id + '">' + this.pai + '</option>');
                        $("#lpai").append('<option value="' + this.id + '">' + this.pai + '</option>');
                        $("#paiv").append('<option value="' + this.id + '">' + this.pai + '</option>');
                        $("#lpaiv").append('<option value="' + this.id + '">' + this.pai + '</option>');
                        $("#paid").append('<option value="' + this.id + '">' + this.pai + '</option>');
                        $("#paivd").append('<option value="' + this.id + '">' + this.pai + '</option>');
                    });
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de países<br />" + error, "ERROR!");
            });
    }

    function comisionMonto() {
        let mon;
        let tip;
        let tot;

        mon = $("#cvi").val().trim();
        if (mon === "")
            mon = 0;
        mon = parseFloat(mon);
        tip = $("#cvo").val();
        tot = 0;
        if (mon > 0 && tip !== "") {
            if (tip === "1") {//por unidad
                $("#productos tbody tr").each(function () {
                    let cant = parseFloat(this.cells[3].innerText.replace(/,/g, ''));
                    tot += cant * mon;

                });
            }
            else {
                $("#productos tbody tr").each(function () {

                    let total = parseFloat(this.cells[7].innerText.replace(/,/g, ''));

                    tot += total * mon;

                });
            }
        }

        $("#impc").val(formatoMoneda(tot, 2, true));
    }

    function cargaMercados() {
        $("#mer").empty().append('<option value=""></option>');
        $("#merv").empty().append('<option value=""></option>');

        get('/ws/mercados.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#mer").append('<option value="' + this.id + '">' + this.mer + '</option>');
                            $("#merv").append('<option value="' + this.id + '">' + this.mer + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de mercados<br/>" + error, "ERROR");
            });
    }

    function guardaPacking() {
        let pack = new Object();
        let reg = new Object();
        let detalle = new Array();
        let archs = new Array();
        let detallep = new Array();
        let registro = new Object();
        var from = $("#fec").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);
        reg.id = $("#idr").val();
        reg.tip = $("#mod").val();
        reg.idm = $("#mon").val();
        reg.fec = f;
        reg.tdoc = $("#td").val();
        reg.num = $("#num").val().replace("?", "");
        reg.sig = $("#sig").prop("checked") ? 1 : 0;
        reg.emb = $("#emb").val();
        reg.secu =  $("#secuencia").val();
        reg.idp = $("#pai").val();
        reg.idpd = $("#paid").val();
        reg.ide = $("#exp").val();
        reg.comi = 0;
        reg.idme = $("#mer").val();
        reg.pro = $("#pro").val();
        reg.idc = $("#cp").val();
        //campo importador, aduana añadido y se envía el id del usuario accediendo a las cookies
        reg.aduana = $("#aduana").val();
        reg.idimp = $("#imp").val();
        reg.idu = Cookies.get("idu").valueOf();
        reg.comv = 0;
        reg.como = 0;
        reg.comim = 0;
        reg.come = 0;
        reg.comu = 0;
        reg.comt = 0;
        if ($("#mod").val() === "2" || $("#mod").val() === "3") {
            reg.come = $("#come").prop("checked") ? 1 : 0;
            reg.comu = $("#comu").prop("checked") ? 1 : 0;

            if ($("#cov").prop("checked")) {
                reg.comt = 1; //tipo
                reg.comv = $("#cvi").val().trim().replace(/,/g, '');
                reg.como = $("#cvo").val(); //opcion

            }
            if ($("#cop").prop("checked")) {
                reg.comt = 2;
                reg.comv = $("#cpi").val().trim().replace(/,/g, '');
                reg.como = $("#cpo").val();
            }

            reg.comim = $("#impc").val().trim().replace(/,/g, '');
        }
        reg.est = 1;
        reg.tot = $("#total").val().replace(/,/g, '');
        reg.ptoorg = $("#ptoorg").val();
        reg.ptodest = $("#ptodest").val();
        reg.obs = $("#obs").val();

        let j = 1;
        $.each($("#productos tbody tr"), function () {
            let det = new Object();
            det.ord = j;
            //det.idprod = this.cells[0].innerText;
            det.id = $("#idr").val();
            det.codp = (this.cells[0].innerText).trim();
            det.des = this.cells[1].innerText;
            det.um = $(this.cells[2]).attr("um");
            det.can = this.cells[3].innerText.replace(/,/g, '');
            det.esp = $(this.cells[4]).attr("esp");
            det.var = $(this.cells[5]).attr("var") == "null" ? null : $(this.cells[5]).attr("var");
            det.cali = this.cells[6].innerText;
            det.cal = this.cells[7].innerText;
            det.emb = this.cells[8].innerText;
            det.grado = this.cells[9].innerText;
            det.pre = this.cells[10].innerText.replace(/,/g, '');
            det.inter = this.cells[10].innerText;
            det.ivg = 0; //this.cells[7].innerText.replace("%", "");
            det.sub = this.cells[13].innerText.replace(/,/g, '');
            det.tot = this.cells[14].innerText.replace(/,/g, '');
            det.idm = $("#mon").val();

            //det.grado = this.cells[13].innerText;
            detalle.push(det);
            j++;
        });

        pack.id = $("#idr").val();
        pack.idp = $("#lpai").val();
        pack.ide = $("#temb").val();
        pack.ide = reg.ide === "" ? 0 : pack.ide;
        pack.nav = $("#nav").val();
        pack.fza = $("#fza").val() === "" ? null : $("#fza").datepicker().fecha();
        pack.fll = $("#fll").val() === "" ? null : $("#fll").datepicker().fecha();
        pack.fca = $("#fca").val() === "" ? null : $("#fca").datepicker().fecha();
        pack.pud = $("#pud").val();
        pack.con = $("#cont").val();
        pack.lin = $("#lin").val();
        pack.pne = $("#pne").val() === "" ? 0 : $("#pne").val().replace(/,/g, '');
        pack.pbr = $("#pbr").val() === "" ? 0 : $("#pbr").val().replace(/,/g, '');
        pack.cp = $("#lcp").val();
        pack.bl = $("#bl").val();
        pack.tot = 0;

        let i = 1;
        $.each($("#prodlist tbody tr"), function () {
            let det = new Object();

            det.ord = i;
            det.id = reg.id;
            det.idprod = this.cells[0].innerText;
            det.codp = (this.cells[1].innerText).trim();
            det.des = this.cells[2].innerText;
            det.um = $(this.cells[3]).attr("um");
            det.can = this.cells[4].innerText.replace(/,/g, '');
            det.pre = this.cells[5].innerText.replace(/,/g, '');
            det.sub = this.cells[6].innerText.replace(/,/g, '');
            det.ivg = this.cells[7].innerText.replace("%", "");
            det.tot = this.cells[8].innerText.replace(/,/g, '');
            det.idalm = $(this.cells[9]).attr("almc");
            det.idm = $("#mon").val();

            detallep.push(det);

            i++;
        });

        i = 1;
        $.each($("#archs tbody tr"), function () {
            let arch = new Object();

            arch.id = $("#idr").val();
            arch.con = i;
            arch.nom = this.cells[0].innerText;

            archs.push(arch);
            i++;
        });

        registro.reg = reg;
        registro.det = detalle;
        registro.pack = pack;
        registro.detp = detallep;
        registro.archs = archs;

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea actualizar la información de la <b>' + $("#mod option:selected").text() + ' - ' + $("#num").val() + '?</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/registros.aspx/Packing`, {
                 method: 'POST', body: JSON.stringify({ info: JSON.stringify(registro) }), headers: { 'Content-Type': 'application/json' }
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
                    Alerta("El registro se actualizó correctamente");
                 
                    cargaTablaPrincipal();
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
        });
    }

    function cargaImpuestos() {
        $("#ivg").empty().append('<option value="0">0%</option>');
        $("#ivgimp").empty().append('<option value="0">0%</option>');
        get('/ws/impuestos.aspx/Consultar', JSON.stringify({ imp: 0.0 }))
            .then(function (res) {
                //console.log(res);
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#ivg").append('<option value="' + this.imp + '">' + this.imp + '%</option>');
                            $("#ivgimp").append('<option value="' + this.imp + '">' + this.imp + '%</option>');
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

    function limpiaPantalla() {
        limpiaControles("info");
        limpiaControles("pack");
        $("#mon").val(1);
        $("#fec").val(formatoFecha(new Date(), 1)).attr("fecha", new Date());
        //$("#imp").val(Cookies.get('idu'));
        // $("#num").val(formatoFecha(new Date(), 6, "-") + "-?");
        $("#productos tbody").empty();

        $(".oculta").each(function () {
            $(this).hide();
        });
        $("#sig").prop("checked", false);
        $("#come").prop("checked", false);
        $("#comi").prop("checked", false);
        $("#cov").prop("checked", false);
        $("#cop").prop("checked", false);

        $("#cvi").prop("disabled", true);
        $("#cvo").prop("disabled", true);
        $("#cpi").prop("disabled", true);
        $("#cpo").prop("disabled", true);

        $("#idr").val("");
        $("#limps").val("");
        $("#tabla").val("");
        $("#total").val(formatoMoneda("0", 2, true));

        $("#tab").removeClass("nav-tabs");
        $(".tab-content").removeClass("border").removeClass("py-3").removeClass("px-2");
        $(".tabula").hide();
        $("#ipk").removeClass("active");
        $("#info").removeClass("active");
        $("#pack").removeClass("active");
        $("#info").addClass("active");
        $("#pack").addClass("fade");

        $("#gua").show();
        $("#archs tbody").empty();

    }

    function limpiaGridExportadores() {
        $("#tipos tbody").empty();
        $("#contactos tbody").empty();
    };

    function guardaRegistro() {
        let reg = new Object();
        let detalle = new Array();
        let registro = new Object();
        var from = $("#fec").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);

        var from = $("#fec").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);
        reg.tip = $("#mod").val();
        reg.idm = $("#mon").val();
        //reg.fec = new Date($("#fec").attr("fecha"));
        /*cambio fecha*/
        reg.fec = f;
        reg.tdoc = $("#td").val();
        reg.num = $("#num").val().replace("?", "");
        reg.sig = $("#sig").prop("checked") ? 1 : 0;
        reg.emb = $("#emb").val();
        reg.idp = $("#pai").val();
        reg.idpd = $("#paid").val();
        reg.ide = $("#exp").val();
        reg.comi = 0;
        reg.idme = $("#mer").val();
        reg.pro = $("#pro").val();
        reg.idc = $("#cp").val();
        /*secuencia*/
        if ($("#emb").val() != "") {
            reg.secu = $("#secuencia").val();
        } else {
            reg.secu = 0;
        }

        //Cambio Fiorella no puede quedar vacio es necesario colocarle 000
        reg.anticiponc = $('#anticipo').val().trim() == '0' ? 0 : $('#anticipo').val();
        reg.saldonc = $('#saldo').val().trim() == '0' ? 0 : $('#saldo').val();;
        reg.diasanc = $('#diasArribo').val().trim() == '0' ? 0 : $('#diasArribo').val();;
    
        //campo importador añadido y se envía el id del usuario accediendo a las cookies
        reg.idimp = $("#imp").val();
        reg.idu = Cookies.get("idu").valueOf();
        /*campo agencia aduana añadido */
        reg.aduana = $("#aduana").val();
        reg.comv = 0;
        reg.como = 0;
        reg.comim = 0;
        reg.come = 0;
        reg.comu = 0;
        reg.comt = 0;
        if ($("#mod").val() === "2" || $("#mod").val() === "3") {
            reg.come = $("#come").prop("checked") ? 1 : 0;
            reg.comu = $("#comu").prop("checked") ? 1 : 0;

            if ($("#cov").prop("checked")) {
                reg.comt = 1; //tipo
                reg.comv = $("#cvi").val().trim().replace(/,/g, '');
                reg.como = $("#cvo").val(); //opcion    

            }
            if ($("#cop").prop("checked")) {
                reg.comt = 2;
                reg.comv = $("#cpi").val().trim().replace(/,/g, '');
                reg.como = $("#cpo").val();
            }

            reg.comim = $("#impc").val().trim().replace(/,/g, '');
            if (reg.comim === "") {
                reg.comim = 0;
            }
            else {
                reg.comim = parseFloat(reg.comim);
            }

        }
        reg.est = 1;
        reg.tot = 0;
        reg.ptoorg = $("#ptoorg").val();
        reg.ptodest = $("#ptodest").val();
        reg.obs = $("#obs").val();

        let i = 1;
        $.each($("#productos tbody tr"), function () {
            let det = new Object();
            det.ord = i;
            //det.idprod = this.cells[0].innerText;
            det.codp = this.cells[0].innerText;
            det.des = this.cells[1].innerText;
            det.um = $(this.cells[2]).attr("um");
            det.can = this.cells[3].innerText.replace(/,/g, '');
            det.esp = $(this.cells[4]).attr("esp");
            det.var = $(this.cells[5]).attr("var");
            det.cali = this.cells[6].innerText;
            det.cal = this.cells[7].innerText;
            det.emb = this.cells[8].innerText;
            det.grado = this.cells[9].innerText; 
            det.pre = this.cells[10].innerText.replace(/,/g, '');
            det.inter = this.cells[11].innerText;
            det.ivg = 0; //this.cel ls[7].innerText.replace("%", "");
            det.sub = this.cells[13].innerText.replace(/,/g, '');
            det.tot = this.cells[14].innerText.replace(/,/g, '');
            detalle.push(det);
        });

        registro.reg = reg;
        registro.det = detalle;

        Swal.fire({
            title: 'Confirmación',
            html: '¿Confirma que desea agregar el registro de  <b>' + $("#mod option:selected").text() + '</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1cc88a',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`/ws/registros.aspx/Insertar`, {
                    method: 'POST', body: JSON.stringify({ info: JSON.stringify(registro) }), headers: { 'Content-Type': 'application/json' }
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
                    $("#num").val(res.Info.reg.num);
                    $("#pdf").prop("disabled", false);
                    $("#idr").val(res.Info.reg.id);
                    $("#gua").prop("disabled", true);
                    $("#pdf").show();
                    cargaTablaPrincipal();
                }
                else {
                    Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                }
            }
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

    function importeProductoimp() {
        let ivg;
        let sub;
        let cant;
        let precio;

        ivg = $("#ivgimp").val();
        cant = $("#cantpimp").val().trim().replace(/,/g, '');
        precio = $("#prepimp").val().trim().replace(/,/g, '');

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

        $("#subpimp").val(formatoMoneda(sub, 2, true));
        if (ivg > 0)
            $("#imppimp").val(formatoMoneda(sub * (1 + (ivg / 100)), 2, true));
        else
            $("#imppimp").val(formatoMoneda(sub, 2, true));

    }

    function importeProductoimpe() {
        let ivg;
        let sub;
        let cant;
        let precio;

        ivg = $("#ivgimpe").val();
        cant = $("#cantpimpe").val().trim().replace(/,/g, '');
        precio = $("#prepimpe").val().trim().replace(/,/g, '');

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

        $("#subpimpe").val(formatoMoneda(sub, 2, true));
        if (ivg > 0)
            $("#imppimpe").val(formatoMoneda(sub * (1 + (ivg / 100)), 2, true));
        else
            $("#imppimpe").val(formatoMoneda(sub, 2, true));

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

    function editaRegistro(id) {
        console.log("id" + id);
        get('/ws/registros.aspx/Editar', JSON.stringify({ id: id }))
            .then(function (res) {
                let id;
                let pre;

                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#lista").hide();
                        $("#datos").show();
                        //Bloquea los campos e fecha camara, boton de agregar, condicion de pago cuando es exp/imp indirecta
                        if (res.Info.reg.tip === 2 && res.Info.reg.tip === 3) {
                            $("#divfca").hide();
                            $("#divcp").hide();
                            $("#nprolist").hide();
                        } else {
                            $("#divfca").show();
                            $("#divcp").show();
                            $("#nprolist").show();
                        }
                        $("#mod").val(res.Info.reg.tip);
                        $("#mod").trigger("change");
                        $("#mon").val(res.Info.mon.id);
                        $("#mon").trigger("change");
                        $("#fec").val(formatoFecha(res.Info.reg.fec, 1)).attr("fecha", new Date(res.Info.reg.fec));
                        $("#td").val(res.Info.reg.tdoc);
                        $("#num").val(res.Info.reg.num);
                        $("#sig").prop("checked", res.Info.reg.sig);
                    /*agregados*/

                        if (res.Info.reg.emb == "") {
                            getCorrelativo2(new Date(), "EMBARQUE");
                            secuenciaReg();
                        } else {
                            $("#emb").val(res.Info.reg.emb);
                            $("#secuencia").val(res.Info.reg.secu);
                        }
                        $("#pai").val(res.Info.pais.id).change();
                        // $("#paiv").trigger("change");
                        $("#paid").val(res.Info.paisd.id).change();
                        // $("#paid").trigger("change");
                        $("#lpai").val(res.Info.pais.id).change();
                        //$("#lpaiv").trigger("change");
                        $("#exp").val(res.Info.exp.id);
                        $("#exp").trigger("change");
                        $("#lexp").val(res.Info.exp.razs);
                        $("#lruc").val(res.Info.exp.ruc);
                        $("#mer").val(res.Info.mer.id);
                        $("#mer").trigger("change");
                        $("#pro").val(res.Info.reg.pro);
                        $("#cp").val(res.Info.cp.id).change();
                        $("#lcp").val(res.Info.cp.id);
                        $("#lcp").trigger("change");
                        $("#imp").val(res.Info.reg.idimp).change();
                        /*campo agencia aduana añadido */
                       // $("#aduana").val(res.Info.reg.aduana).change();
                        //$("#imp").trigger("change");
                        $("#aduana").val(res.Info.reg.aduana).change();
                        //$("#imp").val(res.Info.usu !== null ? res.Info.usu.id : "");
                        $("#ptoorg").val(res.Info.reg.ptoorg).change();
                        $("#ptodest").val(res.Info.reg.ptodest).change();
                        $("#pud").val($("#ptodest option:selected").text() /*res.Info.reg.ptodest*/);
                        //console.log($("#ptodest option:selected").text() + "texto");
                        $("#obs").val(res.Info.reg.obs);
                        $("#total").val(formatoMoneda(res.Info.reg.tot, 2, true));

                        $("#idr").val(res.Info.reg.id);
                        $("#productos tbody").empty();

                        pre = "info";
                        $.each(res.Info.det, function () {
                            id = $("#productos tbody tr").length;
                            $("#ump").val(this.um);
                            $("#ump").trigger("change");
                            $("#ivg").val(this.ivg);
                            $("#esp").val(this.esp);

                            $("#var").val(this.var);
                            $("#cali").val(this.cali);
                            $("#cal").val(this.cal);
                            $("#embp").val(this.emb);
                            //cambio para mostrar en el campo
                            $("#anticipo").val('0');
                            $("#saldo").val('100');
                            

                            fila = '<tr id="f' + pre + id + '">' +
                                '<td id="n' + pre + id + '"class="text-right"> ' + this.codp + '</td > ' +
                                '<td class="text-right oculta">' + this.des + '</td>' +
                                '<td class="text-center" um="' + this.um + '">' + $("#ump option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.can, 2, true) + '</td>' +
                                '<td class="text-center" esp="' + this.esp + '">' + $("#esp option:selected").text() + '</td>' +
                                '<td class="text-center" var="' + this.var + '">' + $("#var option:selected").text() + '</td>' +
                                '<td class="text-center" cali="' + this.cali + '">' + this.cali + '</td>' +
                                '<td class="text-center" cal="' + this.cal + '">' + this.cal + '</td>' +
                                '<td class="text-center" embp="' + this.emb + '">' + this.emb + '</td>' +
                                '<td class="text-center" embp="' + this.emb + '">' + this.grado + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.pre, 2, true) + '</td>' +
                                '<td class="text-right">' + this.inter + '</td>' +
                                '<td class="text-right oculta">' + $("#ivg option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.can * this.pre, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.tot, 2, true) + '</td>' +
                                '<td class="text-center"><i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

                            $("#productos tbody").append(fila);

                            fila = $("#productos tr:last");
                            $(fila).css({ "cursor": "pointer" });
                            $("#e" + pre + id).on("click", function () {

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

                        $("#gua").val("Actualizar");
                        if (res.Info.reg.tip === 1) {
                            $("#rcimp").show();
                        }
                        if (res.Info.reg.tip === 2 || res.Info.reg.tip === 3) {
                            $(".oculta").each(function () {
                                $(this).show();
                            });
                            $("#come").prop("checked", res.Info.reg.come);
                            $("#comi").prop("checked", res.Info.reg.comu);

                            if (res.Info.reg.comt === 1) {
                                $("#cov").prop("checked", true);
                                $("#cop").prop("checked", false);
                                $("#cpi").val("");
                                $("#cpo").val("");
                                $("#cvi").val(res.Info.reg.comv);
                                $("#cvo").val(res.Info.reg.como);
                                $("#impc").val(formatoMoneda(res.Info.reg.comim, 2, true));
                            }
                            if (res.Info.reg.comt === 2) {
                                $("#cov").prop("checked", false);
                                $("#cop").prop("checked", true);
                                $("#cpi").val(res.Info.reg.comv);
                                $("#cpo").val(res.Info.reg.como);
                                $("#cvo").val("");
                                $("#cvi").val("");
                                $("#impc").val(formatoMoneda(res.Info.reg.comim, 2, true));
                            }
                        }

                        $("#tab").addClass("nav-tabs");
                        $(".tab-content").addClass("border").addClass("py-3").addClass("px-2");
                        $(".nav-item").show();
                        $("#inb").removeClass("active");
                        $("#ipk").removeClass("active");
                        $("#info").removeClass("active");
                        $("#pack").removeClass("active");
                        $("#pack").removeClass("fade");
                        $("#ipk").addClass("active");
                        $("#pack").addClass("active");

                        if (res.Info.packing.reg !== null) {

                            $("#temb").val(res.Info.packing.reg.ide === 0 ? "" : res.Info.packing.reg.ide);
                            $("#temb").trigger("change");
                            $("#nav").val(res.Info.packing.reg.nav);
                            if (res.Info.packing.reg.fza !== null)
                                $("#fza").datepicker().value(new Date(formatoFecha(res.Info.packing.reg.fza, 2))).trigger("change");
                            if (res.Info.packing.reg.fll !== null)
                                $("#fll").datepicker().value(new Date(formatoFecha(res.Info.packing.reg.fll, 2))).trigger("change");
                            if (res.Info.packing.reg.fca !== null)
                                $("#fca").datepicker().value(new Date(formatoFecha(res.Info.packing.reg.fca, 2))).trigger("change");

                            $("#pud").val(res.Info.packing.reg.pud);
                            $("#cont").val(res.Info.packing.reg.con);
                            $("#lin").val(res.Info.packing.reg.lin).change();
                            $("#pne").val(formatoMoneda(res.Info.packing.reg.pne, 2, true));
                            $("#pbr").val(formatoMoneda(res.Info.packing.reg.pbr, 2, true));
                            $("#lcp").val(res.Info.packing.reg.cp);
                            $("#lcp").trigger("change");
                            $("#bl").val(res.Info.packing.reg.bl);

                        }

                        $(res.Info.packing.archs).each(function () {
                            //diraheta
                            let id = $("#archs tbody tr").length;
                            $("#archs tbody").append('<tr><td class="text-left">' + this.nom + '</td><td><i class="fa fa-trash text-danger" title="Eliminar archivo" id="arch' + id + '" style="cursor:pointer"></td><td><i class="fa fa-arrows-alt" id="doc'+ id +'" data-filename="'+ this.nom +'" title="Ver archivo" style="cursor:pointer"></td></tr>');

                            $("#arch" + id).on("click", function () {
                                $(this).parent().parent().remove();

                                let filas = 0;
                                $("#archs tbody tr").each(function () {
                                    this.cells[1].childNodes[0].id = "arch" + filas;
                                });
                            });

                            //diraheta
                            $("#doc" + id).on("click", function () {
                                let fileName = $(this).data('filename');
                                evaluarExtensionArchivo(fileName);
                            });

                        });

                        //funcion para evaluar el archivo y saber si se descarga o se muestra en pantalla.
                        function evaluarExtensionArchivo(fileName) {
                            // Obtener la extensión del archivo
                            var extension = fileName.split('.').pop().toLowerCase();
                            let folder = '/upload/';
                          
                            // Lista de extensiones de archivos que se pueden mostrar en el navegador
                            var extensionesMostrables = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'pdf'];

                            // Verificar si la extensión se encuentra en la lista de extensiones mostrables
                            if (extensionesMostrables.includes(extension)) {
                                $('#viewDocument').attr("src", folder + fileName);
                                $("#mpDocument").modal({ backdrop:'static',keyboard:false });
                            } else {
                              //crear un elemento <a> en la pagina
                              var link = document.createElement('a');
                              // Establecer el atributo href del enlace al archivo
                              link.href = folder + fileName;
                              ////link.download = true;
                              link.click();
                            }
                        }                        
                          


                        pre = "list";
                        $("#prodlist tbody").empty();
                        $(res.Info.packing.det).each(function () {
                            id = $("#prodlist tbody tr").length;
                            $("#ump").val(this.um).trigger("change");
                            $("#ivg").val(this.ivg).trigger("change");
                            $("#alm").val(this.idalm).trigger("change");

                            fila = '<tr id="f' + pre + id + '">' +
                                '<td id="n' + pre + id + '" style="display: none">' + this.idprod + '</td>' +
                                '<td class="text-right"> ' + this.codp + '</td > ' +
                                '<td class="text-right">' + this.des + '</td>' +
                                '<td class="text-center" um="' + this.um + '">' + $("#ump option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.can, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.pre, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.can * this.pre, 2, true) + '</td>' +
                                '<td class="text-right">' + $("#ivg option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.tot, 2, true) + '</td>' +
                                '<td class="text-center" almc="' + this.idalm + '">' + $("#alm option:selected").text() + '</td>' +
                                '<td class="text-center"><i id="e' + pre + id + '" class="fa fa-edit" title="Edita producto"></i>&nbsp;&nbsp;<i id="b' + pre + id + '" class="fa fa-trash text-danger" title="Elimina producto"></i></td></tr>';

                            $("#prodlist tbody").append(fila);

                            fila = $("#prodlist tr:last");
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
                                    } else if (i === 9) {
                                        result[i] = $(this).attr("almc");
                                    } else {
                                        result[i] = $(this).text();
                                    }
                                    ++i;
                                });
                                $("#tdidprod").val("#f" + pre + id);
                                $("#nompe").val(result[0]);
                                $("#alme").val(result[9]);
                                $("#umpe").val(result[3]);
                                $("#cantpe").val(result[4]);
                                $("#prepe").val(result[5]);
                                $("#imppe").val(result[8]);
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
                                        $("#f" + id).remove();
                                    }
                                });
                            });
                        });

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


    function cargaTiposEmbarque() {
        get('/ws/tipoembarques.aspx/Consultar')
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $(res.Info).each(function () {
                            $("#temb").append('<option value="' + this.id + '">' + this.emb + '</option>');
                            $("#tembv").append('<option value="' + this.id + '">' + this.emb + '</option>');

                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de embarques<br />" + error, "ERROR!");
            });
    }

    function comisionPorcentaje() {
        let mon;
        let tip;
        let tot;

        mon = $("#cpi").val().trim();
        if (mon === "")
            mon = 0;
        mon = parseFloat(mon);
        tip = $("#cpo").val();
        tot = 0;

        if (mon > 0 && tip !== "") {
            $("#productos tbody tr").each(function () {
                if (tip === "1") {//por unidad
                    let cant = parseFloat(this.cells[3].innerText.replace(/,/g, ''));
                    tot += cant * (mon / 100);
                }
                else {
                    tot += (mon / 100) * parseFloat(this.cells[7].innerText.replace(/,/g, ''));
                }
            });
        }

        $("#impc").val(formatoMoneda(tot, 2, true));
    }

    function cargaUnidadesMedida(i) {
        
        $("#ump").empty().append('<option value=""></option>');
        $("#umpv").empty().append('<option value=""></option>');
        $("#umpimp").empty().append('<option value=""></option>');
        $("#umfl").empty().append('<option value=""></option>');
        $("#umg").empty().append('<option value=""></option>');
        $("#umpimpe").empty().append('<option value=""></option>');
        $("#umpe").empty().append('<option value=""></option>');
        $("#medidaP").empty().append('<option value=""></option>');
        get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#ump").append('<option value="' + this.id + '">' + this.um + '</option>');
                            $("#umpv").append('<option value="' + this.id + '">' + this.um + '</option>');
                            $("#umpimp").append('<option value="' + this.id + '">' + this.um + '</option>');
                            $("#umfl").append('<option value="' + this.id + '">' + this.um + '</option>');
                            $("#umg").append('<option value="' + this.id + '">' + this.um + '</option>');
                            $("#umpimpe").append('<option value="' + this.id + '">' + this.um + '</option>');
                            $("#umpe").append('<option value="' + this.id + '">' + this.um + '</option>');
                            $("#medidaP").append('<option value="' + this.id + '">' + this.um + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            });
    }

    function cargaCondicionesPago() {
        $("#cp").empty().append('<option value=""></option>');
        get('/ws/condicionespago.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $.each(res.Info, function () {
                            $("#cp").append('<option value="' + this.id + '">' + this.con + '-' + this.nodias + '</option>');
                            $("#lcp").append('<option value="' + this.id + '">' + this.con + '-' + this.nodias + '</option>');
                            $("#cpv").append('<option value="' + this.id + '">' + this.con + '-' + this.nodias + '</option>');
                            $("#lcpv").append('<option value="' + this.id + '">' + this.con + '-' + this.nodias + '</option>');
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

    function cargaOrdenes(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
            columnas: [
                { leyenda: 'Año', class: 'text-center thp', ordenable: false, columna: 'FECHA', filtro: false },
                { leyenda: '#Pedido', class: 'text-center thp', ordenable: true, columna: 'NUMERO', filtro: false },
       
                { leyenda: 'Tipo de Oper.', class: 'text-center thp', style: 'white-space:nowrap', ordenable: false, columna: 'TIPO', filtro: false },
                { leyenda: 'ETD', class: 'text-center thp', style: 'width:1%', ordenable: true, columna: 'FECHA_LLEGADA', filtro: false },
                { leyenda: 'ETA', class: 'text-center thp', style: 'width:1%', ordenable: true, columna: 'FECHA_ZARPE', filtro: false },
                { leyenda: 'Fecha Ing. Camara', class: 'text-center thp', style: 'width:1%', ordenable: true, columna: 'FECHA_CAMARA', filtro: false },
                { leyenda: 'Proveedor', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
                { leyenda: 'Especie', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'ESPECIE', filtro: false },
                { leyenda: 'Monto', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
                { leyenda: 'Moneda', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'MONEDA', filtro: false },
                { leyenda: 'Estado', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: '', filtro: false },
                { leyenda: '#Contenedor', class: 'text-center thp', style: 'width:1%', ordenable: false, columna: 'CONTENEDOR', filtro: false },
                { leyenda: '', class: 'text-center thp', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
                { leyenda: '', class: 'text-center thp', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
            ],
            modelo: [
                {
                    propiedad: 'FECHA', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        tr[0].style.cursor = 'pointer';
                        return new Date(valor).getFullYear();
                    }
                },
                { propiedad: 'NUMERO', class: 'text-center tdp', ordenable: true },
              
                {
                    propiedad: 'TIPO', class: 'text-center px-2 tdp', style: "white-space:nowrap", formato: function (tr, obj, valor) {
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
                {
                    propiedad: 'FECHA_LLEGADA', class: ' tdp', formato: function (tr, obj, value) {
                        if (value !== null)
                            return formatoFecha(value, 1);
                    }
                },
                {
                    propiedad: 'FECHA_ZARPE', class: 'text-center tdp', formato: function (tr, obj, value) {
                        if (value !== null)
                            return formatoFecha(value, 1);
                    }
                },
                {
                    propiedad: 'FECHA_CAMARA', class: 'text-center tdp', formato: function (tr, obj, value) {
                        if (value !== null)
                            return formatoFecha(value, 1);
                    }
                },
                {
                    propiedad: '', class: 'tdp', style: 'white-space:nowrap', formato: function (tr, obj) {
                        return obj.RAZON_SOCIAL;
                    }
                },
                { propiedad: 'ESPECIE', class: 'text-center tdp' },
                {
                    propiedad: 'TOTAL', class: 'text-right tdp', formato(tr, obj, value) {
                        return formatoMoneda(value, 2, true);
                    }
                },
                { propiedad: 'MONEDA', class: 'text-center tdp' },
                {
                    propiedad: 'ESTATUS', style: 'white-space:nowrap', class: 'text-center tdp', formato: function (tr, obj, value) {
                        if (value === 1)
                            tr[0].style.color = 'blue';
                        if (value === 2)
                            tr[0].style.color = 'red';
                        if (value === 3 && (obj.TIPO === 1 || obj.TIPO === 4))
                            tr[0].style.color = 'green';
                        if (value === 3 && (obj.TIPO === 2 || obj.TIPO === 3))
                            tr[0].style.color = '#e6b800';
                        if (value === 2 && (obj.TIPO === 2 || obj.TIPO === 3))
                            tr[0].style.color = '#1F99A4';

                        if (value === 1)
                            return "Nuevo";
                        if (value === 2 && (obj.TIPO === 1 || obj.TIPO === 4))
                            return 'En Proceso';
                        if (value === 2 && (obj.TIPO === 2 || obj.TIPO === 3))
                            return 'Facturado';
                        if (value === 3 && (obj.TIPO === 1 || obj.TIPO === 4))
                            return 'Ingresado a Cámara';
                        if (value === 3 && (obj.TIPO === 2 || obj.TIPO === 3))
                            return 'Enviado a Destino';
                    }
                },
                { propiedad: 'CONTENEDOR', class: 'text-center tdp', ordenable: true },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        view = document.createElement("i");

                        $(view).addClass("fa fa-search").prop("title", "Ver registro").on("click", function () {
                            verRegistro(obj.ID_REGISTRO);
                        });
                        container.appendChild(view);

                        return container;
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");
                        estatus = document.createElement("i");

                        $(edita).addClass("fa fa-edit").prop("title", "Editar registro").on("click", function () {
                            editaRegistro(obj.ID_REGISTRO);
                        });
                        $(estatus).addClass("fa fa-exchange-alt text-primary ml-2").prop("title", "Actualiza Estado").on("click", function () {
                            cambiaEstatus(obj.ID_USUARIO, obj.ESTATUS, obj.NOMBRE);
                        });
                        container.appendChild(edita);
                        //container.appendChild(estatus);

                        return container;
                    }
                }
            ],
            url: '/ws/registros.aspx/Listar',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            //ordenable: true,
            limite: [20, 25, 50],
            columna: 'NUMERO',
            loader: "pre0",
            columna_orden: 'DESC'
        };

        $("#ordenes").MALCO(data);
    }
    //CARGAR ORDENES DE LA TABLA PRINCIPAL
    function cargaTablaPrincipal(filtro = "") {
        get('/ws/registros.aspx/ListarImportExportUnaEspecie', JSON.stringify({ filtro: filtro }))
            .then(function (res) {
                var r = JSON.stringify(res);
                if (r.startsWith('[{"ERROR":', 0)) {
                    var err = "";
                    $(res).each(function () {
                        err += this.Error;
                    });
                    Alerta(err, "ERROR 1!");
                } else {
                    let html = "";
                    let ocultar = "";
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
                        let color = '';
                        let estado = '';
                        let operacion = '';
                        let textoCentrado = 'class="text-center"';
                        let especie = '';
                        let contenedor = '';
                        let anular = '';
                        if (this.ESPECIE != null && this.ESPECIE != "SUBTABLADP" && this.ESPECIE != "SUBTABLADR") {
                            especie = this.ESPECIE;
                        }
                        if (this.CONTENEDOR != null) {
                            contenedor = this.CONTENEDOR;
                        }

                        if (this.TIPOOPERACION === 1)
                            operacion = "Importación Directa";
                        if (this.TIPOOPERACION === 2)
                            operacion = "Importación Indirecta";
                        if (this.TIPOOPERACION === 3)
                            operacion = "Exportación Indirecta";
                        if (this.TIPOOPERACION === 4)
                            operacion = "Exportación Directa";

                        if (this.ESTADO === 1)
                            color = 'style="color:blue !important;"';
                        if (this.ESTADO === 2 && (this.TIPOOPERACION === 1 || this.TIPOOPERACION === 4))
                            color = 'style="color:red !important;"';
                        if (this.ESTADO === 2 && (this.TIPOOPERACION === 2 || this.TIPOOPERACION === 3))
                            color = 'style="color:#1f5aa3 !important;"';
                        if (this.ESTADO === 3 && (this.TIPOOPERACION === 1 || this.TIPOOPERACION === 4))
                            color = 'style="color:green !important;"';
                        if (this.ESTADO === 3 && (this.TIPOOPERACION === 2 || this.TIPOOPERACION === 3))
                            color = 'style="color:#e6b800 !important;"';

                        if (this.ESTADO === 1)
                            estado = "<td style='color:white !important; background-color:#4472C4'>Nuevo</td>";
                        if (this.ESTADO === 2 && (this.TIPOOPERACION === 1 || this.TIPOOPERACION === 4))
                            estado = "<td style='color:white !important; background-color:#FFC000'>En Proceso</td>";
                        if (this.ESTADO === 2 && (this.TIPOOPERACION === 2 || this.TIPOOPERACION === 3))
                            estado = "<td style='color:white !important;background-color:#FFC000'>Facturado</td>";
                        if (this.ESTADO === 3 && (this.TIPOOPERACION === 1 || this.TIPOOPERACION === 4))
                            estado = "<td style='color:white !important;background-color:#A9D08E'>Ingresado a Cámara</td>";
                        if (this.ESTADO === 3 && (this.TIPOOPERACION === 2 || this.TIPOOPERACION === 3))
                            estado = "<td style='color:white !important;background-color:#FFC000'>Enviado a Destino</td>";
                        
                        if (this.ESTADO === 5) {
                            estado = "<td style='color:white !important;background-color:#FF0000'>Anulado</td>";
                        }
                            //textoCentrado = 'id="oc" class="text-center d-none "';
                        /*agregado} else {
                            textoCentrado = 'class="text-center"';
                        }*/
                        
                        if (this.ESTADO !== 5) {
                            anular = '<i class="fa fa-ban"  title="Anular registro"></i>';
                        } 
                        let anio = new Date();
                        if (this.ANO < anio.getFullYear().toString()) {
                            textoCentrado = 'id="ocultar" class="text-center d-none"';
                        } else {
                            textoCentrado = 'class="text-center"';
                        }

                        html += '<tr ' + textoCentrado  + color + ' registro="' + this.ID_REGISTRO + '">' +
                            '<td>' + this.ANO + '</td>' +
                            '<td>' + this.NUMERO + '</td>' +
                           '<td>'+this.EMBARQUE+'</td>'+
                            '<td>' + operacion + '</td>' +
                            '<td>' + fechaFormateada(this.ETD) + '</td>' +
                            '<td>' + fechaFormateada(this.ETA) + '</td>' +
                            '<td>' + fechaFormateada(this.FECHAINGRESOCAMARA) + '</td>' +
                            '<td>' + this.RAZON_SOCIAL + '</td>' +
                            '<td especie="' + this.ESPECIE + '">' + especie + '</td>' +
                            '<td>' + formatoMoneda(this.MONTO, 2, true) + '</td>' +
                            '<td>' + this.MONEDA + '</td>' +
                            estado +
                            //'<td>' + estado + '</td>' +
                            '<td>' + contenedor + '</td>' +
                            '<td>' + '<i class="fa fa-search" title="Ver registro"></i>' + '</td>' +
                            '<td>' + '<i class="fa fa-edit" title="Editar registro"></i>' + '</td>' +
                            '<td>' + anular + '</td>' + '</tr>';
                    });

                    $("#ordenes2 table tbody").html(html);

                    $("#ordenes2 table tbody").children("tr").each(function () {
                        let row = $(this);
                        let ver = $(this).children()[13];
                        let editar = $(this).children()[14];
                        /*anular*/
                        let anular = $(this).children()[15];

                        $(row).on("click", function () {
                            let id = $(this).attr("registro");
                            $("#cabdet").text($(this).children()[1].innerText);
                            $("#idrv").val(id);

                            //carga de informacion en la parte de abajo de la pagina
                            cargaFac(id);

                            listdocF(id);
                        });

                        $(editar).on("click", function () {
                            //cambio F
                            let id = $(this).parent().attr("registro");
                            editaRegistro(id);
                            $("#pdf").css("display", "visibility");
                            $("#limp").hide();
                        });

                        $(ver).on("click", function () {
                            //cambio F
                            let id = $(this).parent().attr("registro");

                            verRegistro(id);

                          });

                        /*anular --- 5 */
                        $(anular).on("click", function () {
                            let id = $(this).parent().attr("registro");
                            //alert(id);
                            anularReg(id,5);
                        });
                    });

                    $(function () {
                        //$("#ordenes2 table").tablesorter();
                        $("#tableordenes2").tablesorter({
                            dateFormat: 'dd/mm/yyyy',
                            headers:
                            {
                                3: { sorter: 'datetime', dateFormat: "ddmmyyyy" },
                                4: { sorter: "shortDate", dateFormat: "ddmmyyyy" },
                                5: { sorter: "shortDate", dateFormat: "ddmmyyyy" }
                            }
                        });
                    });

                    //LLENAR DETALLES
                    llenarDetalleTablaPrincipal();
                    //REGISTROS
                    $('#txtRegistros').attr("cantRegistros", res.length);

                    if (res.length <= 0) {
                        $('#txtRegistros').html("No existen registros para los filtros aplicados");
                    } else {
                        $('#txtRegistros').html("Total " + res.length + " registros");
                    }

                }
            })
            .catch(function (res) {
                Alerta(res, "ERROR 4!");
            });
    }

    /* metodo para cambiar el correlativo por la fecha de emision */
    $("#fec").change(function () {
        getCorrelativo($("#fec").datepicker().fecha(), "CORRELATIVO");
    });


    function getCorrelativo(fec,campo) {
        let reg = new Object();

        let registro = new Object();
        //reg.fec = new Date($("#fec").attr("fecha"));
        //registro.reg = reg;
        /*cambio*/
        reg.fec = fec;
        //reg.fec = new Date();
        registro.reg = reg;


        //funcion para obtener el correlativo
        get('/ws/registros.aspx/obtcorrelativo', JSON.stringify({ info: JSON.stringify(registro), campo: campo }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                        var d = new Date();
                        $("#num").val( res.Mensaje);
                        // $("#num").val(d.getFullYear().toString() + res.Mensaje);
                        // $("#num").val(d.getFullYear().toString() + res.Mensaje);
                     }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }

            })
            .catch(function (error) {
                Alerta("No fue posible cargar el correlativo<br/>" + error, "ERROR");
            });

    }

    /*correlativo 2*/
    function getCorrelativo2(id, campo) {
        let reg = new Object();
        let registro = new Object();
        //reg.fec = new Date($("#fec").attr("fecha"));
        //registro.reg = reg;
    /*cambio*/
        reg.fec = id;
       // reg.fec = fec;
        //reg.fec = new Date();
        registro.reg = reg;

        //funcion para obtener el correlativo
        get('/ws/registros.aspx/obtcorrelativo', JSON.stringify({ info: JSON.stringify(registro), campo: campo }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    var d = new Date();
                    //$("#num").val("0" + res.Mensaje);
                    $("#emb").val(res.Mensaje);
                    // $("#num").val(d.getFullYear().toString() + res.Mensaje);
                    // $("#num").val(d.getFullYear().toString() + res.Mensaje);
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }

            })
            .catch(function (error) {
                Alerta("No fue posible cargar el correlativo<br/>" + error, "ERROR");
            });
    }

    /*secuencia */
    function  secuenciaReg() {
        let reg = new Object(); 
        let registro = new Object();
        let campo = "";
        //reg.fec = new Date($("#fec").attr("fecha"));
        //registro.reg = reg;
        /*cambio*/
        reg.id = 0;

        //reg.fec = new Date();
        registro.reg = reg;

        //funcion para obtener el correlativo
        get('/ws/registros.aspx/obtcorrelativo', JSON.stringify({ info: JSON.stringify(registro), campo: campo }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    var d = new Date();
                    $("#secuencia").val(res.Mensaje);
                    // $("#num").val(d.getFullYear().toString() + res.Mensaje);
                    // $("#num").val(d.getFullYear().toString() + res.Mensaje);
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }

            })
            .catch(function (error) {
                Alerta("No fue posible cargar el correlativo<br/>" + error, "ERROR");
            });
    }

    function cargaDatosPDF() {
        get('/ws/registros.aspx/infoPDF', JSON.stringify({ id: $("#idr").val() }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $("#pdfrs").text(res.Info.imp.razs);
                    $("#pdfdir").text(res.Info.imp.dirf);
                    $("#pdfnum").text(res.Info.reg.num);

                    $("#pdfers").val(res.Info.imp.razs);
                    $("#pdfecor").val(res.Info.exp.cor);
                    $("#pdffecha").text(formatoFecha(res.Info.reg.fec, 1));

                    $("#pdfemb").val(res.Info.reg.emb);
                    $("#pdfpais").val(res.Info.pais.pai);
                    $("#pdfmercado").val(res.Info.mer.mer);
                    $("#pdfpro").val(res.Info.reg.pro);

                    $("#pdfprods tbody").empty();

                    $.each(res.Info.det, function () {
                        id = $("#pdfprods tbody tr").length;
                        $("#ump").val(this.um);
                        $("#ump").trigger("change");
                        $("#ivg").val(this.ivg);
                        fila = '<tr><td>' + this.des + '</td>' +
                            '<td class="text-center" um="' + this.um + '">' + $("#ump option:selected").text() + '</td>' +
                            '<td class="text-right">' + formatoMoneda(this.can, 2, true) + '</td>' +
                            '<td class="text-right">' + formatoMoneda(this.pre, 2, true) + '</td>' +
                            '<td class="text-right">' + formatoMoneda(this.can * this.pre, 2, true) + '</td>' +
                            '<td class="text-right">' + $("#ivg option:selected").text() + '</td>' +
                            '<td class="text-right">' + formatoMoneda(this.tot, 2, true) + '</td></tr>';

                        $("#pdfprods tbody").append(fila);
                    });

                    $("#pdfenom").val(res.Info.exp.razs);
                    $("#pdfeccor").val(res.Info.exp.ruc);
                    $("#pdfecraz").val(res.Info.exp.dirf);
                    $("#pdfedirs").val(res.Info.cont.nom);
                    $("#pdfetels").val(res.Info.cont.tel);
                    $("#pdfeemail").val(res.Info.cont.cor);

                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar la información del PDF<br />" + error, "ERROR!");
            });
    }




    function verRegistro(id) {

        get('/ws/registros.aspx/Editar', JSON.stringify({ id: id }))
            .then(function (res) {
                let id;
                let pre;
                let subtotal = 0;
                let impuesto = 0;
                let total = 0;
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#lista").hide();
                        $("#datos").hide();
                        $("#datosv").show();
                        //$("#modv2").val(res.Info.reg.tip);
                        $("#modv").val(res.Info.reg.tip);
                        $("#monv").val(res.Info.mon.id);
                        $("#monv").trigger('change');

                        $("#fecv").val(formatoFecha(res.Info.reg.fec, 1)).attr("fecha", new Date(res.Info.reg.fec));
                        $("#tdv").val(res.Info.reg.tdoc);
                        $("#numv").val(res.Info.reg.num);
                        $("#sigv").prop("checked", res.Info.reg.sig);
                        $("#embv").val(res.Info.reg.emb);
                        $("#paiv").val(res.Info.pais.id).change();
                        $("#paivd").val(res.Info.paisd.id).change();
                        $("#lpaiv").val(res.Info.pais.id);
                        $("#lpaiv").trigger("change");
                        $("#expv").val(res.Info.exp.id);
                        $("#expv").trigger('change');
                        $("#lexpv").val(res.Info.exp.razs);
                        $("#lrucv").val(res.Info.exp.ruc);
                        $("#merv").val(res.Info.mer.id);
                        $("#merv").trigger('change');

                        $("#prov").val(res.Info.reg.pro);
                        $("#cpv").val(res.Info.cp.id).change();
                        $("#lcpv").val(res.Info.cp.id);
                        $("#lcpv").trigger("change");
                        $("#impv").val(res.Info.reg.idimp);
                        $("#impv").trigger('change');
                        /*campo agencia aduana añadido */
                        $("#aduanav").val(res.Info.reg.aduana).change();
                        $("#ptoorgv").val(res.Info.reg.ptoorg).change();
                        $("#ptodestv").val(res.Info.reg.ptodest).change();
                        $("#obsv").val(res.Info.reg.obs);

                        $("#idrv").val(res.Info.reg.id);
                        $("#productosv tbody").empty();

                        pre = "infov";
                        $.each(res.Info.det, function () {
                            id = $("#productosv tbody tr").length;
                            $("#ump").val(this.um);
                            $("#ump").trigger("change");
                            $("#ivgv").val(this.ivg);
                            $("#esp").val(this.esp);

                            $("#var").val(this.var);
                            $("#cali").val(this.cali);
                            $("#cal").val(this.cal);
                            $("#embp").val(this.emb);

                            fila = '<tr id="f' + pre + id + '">' +
                                '<td id="n' + pre + id + '" class="oculta">' + this.idprod + '</td>' +
                                '<td class="text-right"> ' + this.codp + '</td > ' +
                                '<td class="text-right oculta">' + this.des + '</td>' +
                                '<td class="text-center" umv="' + this.um + '">' + $("#ump option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.can, 2, true) + '</td>' +
                                '<td class="text-center" esp="' + this.esp + '">' + $("#esp option:selected").text() + '</td>' +
                                '<td class="text-center" var="' + this.var + '">' + $("#var option:selected").text() + '</td>' +
                                '<td class="text-center" cali="' + this.cali + '">' + this.cali + '</td>' +
                                '<td class="text-center" cal="' + this.cal + '">' + this.cal + '</td>' +
                                '<td class="text-center" embp="' + this.emb + '">' + this.emb + '</td>' +
                                '<td class="text-center" embp="' + this.emb + '">' + this.grado + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.pre, 2, true) + '</td>' +
                                '<td class="text-right">' + this.inter + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.can * this.pre, 2, true) + '</td>' +
                                '<td class="text-right" style="display: none">' + $("#ivgv option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.tot, 2, true) + '</td>' +
                                '</tr>';

                            $("#productosv tbody").append(fila);

                            fila = $("#productosv tr:last");
                            $(fila).css({ "cursor": "pointer" });
                        });

                        if (res.Info.reg.tip === 2 || res.Info.reg.tip === 3) {
                            $(".oculta").each(function () {
                                $(this).show();
                            });
                            $("#comev").prop("checked", res.Info.reg.come);
                            $("#comiv").prop("checked", res.Info.reg.comu);

                            if (res.Info.reg.comt === 1) {
                                $("#covv").prop("checked", true);
                                $("#copv").prop("checked", false);
                                $("#cpiv").val("");
                                $("#cpov").val("");
                                $("#cviv").val(res.Info.reg.comv);
                                $("#cvov").val(res.Info.reg.como);
                                $("#impcv").val(formatoMoneda(res.Info.reg.comim, 2, true));
                            }
                            if (res.Info.reg.comt === 2) {
                                $("#covv").prop("checked", false);
                                $("#copv").prop("checked", true);
                                $("#cpiv").val(res.Info.reg.comv);
                                $("#cpov").val(res.Info.reg.como);
                                $("#cvov").val("");
                                $("#cviv").val("");
                                $("#impcv").val(formatoMoneda(res.Info.reg.comim, 2, true));
                            }
                        }

                        $("#tabv").addClass("nav-tabs");
                        $(".tab-content").addClass("border").addClass("py-3").addClass("px-2");
                        $(".nav-item").show();
                        $("#inbv").removeClass("active");
                        $("#ipkv").removeClass("active");
                        $("#infov").removeClass("active");
                        $("#packv").removeClass("active");
                        $("#packv").removeClass("fade");
                        $("#ipkv").addClass("active");
                        $("#packv").addClass("active");

                        if (res.Info.packing.reg !== null) {

                            $("#tembv").val(res.Info.packing.reg.ide === 0 ? "" : res.Info.packing.reg.ide);
                            $("#tembv").trigger('change');

                            $("#navv").val(res.Info.packing.reg.nav);
                            if (res.Info.packing.reg.fza !== null)
                                $("#fzav").val(formatoFecha(res.Info.packing.reg.fza, 1)).attr("fecha", new Date(res.Info.packing.reg.fza));

                            if (res.Info.packing.reg.fll !== null)
                                $("#fllv").val(formatoFecha(res.Info.packing.reg.fll, 1)).attr("fecha", new Date(res.Info.packing.reg.fll));
                            if (res.Info.packing.reg.fca !== null)
                                $("#fcav").val(formatoFecha(res.Info.packing.reg.fca, 1)).attr("fecha", new Date(res.Info.packing.reg.fca));

                            $("#pudv").val(res.Info.packing.reg.pud);
                            $("#contv").val(res.Info.packing.reg.con);
                            $("#linv").val(res.Info.packing.reg.lin).change();
                            $("#pnev").val(formatoMoneda(res.Info.packing.reg.pne, 2, true));
                            $("#pbrv").val(formatoMoneda(res.Info.packing.reg.pbr, 2, true));
                            $("#lcpv").val(res.Info.packing.reg.cp);

                        }

                        pre = "listv";
                        $("#prodlistv tbody").empty();
                        $(res.Info.packing.det).each(function () {
                            id = $("#prodlistv tbody tr").length;
                            $("#ump").val(this.um);
                            $("#ump").trigger("change");
                            $("#ivg").val(this.ivg);
                            subtotal += this.can * this.pre;
                            total += this.tot;

                            /*fin cambio por tipo de moneda*/
                            fila = '<tr id="f' + pre + id + '">' +
                                '<td id="n' + pre + id + '" style="display: none">' + this.idprod + '</td>' +
                                '<td class="text-right"> ' + this.codp + '</td > ' +
                                '<td class="text-right">' + this.des + '</td>' +
                                '<td class="text-center" umv="' + this.um + '">' + $("#ump option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.can, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.pre, 2, true) + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.can * this.pre, 2, true) + '</td>' +
                                '<td class="text-right">' + $("#ivg option:selected").text() + '</td>' +
                                '<td class="text-right">' + formatoMoneda(this.tot, 2, true) + '</td>' +
                                '</tr>';

                            $("#prodlistv tbody").append(fila);

                            fila = $("#prodlistv tr:last");
                            $(fila).css({ "cursor": "pointer" });
                        });



                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
                $("#txtsubTotal").val(formatoMoneda(subtotal, 2, true));

                $("#txtTotal").val(formatoMoneda(total, 2, true));
            })
            .catch(function (error) {
                Alerta("No fue posible editar el registro<br />" + error, "ERROR!");
            });
    }
    function limpiaPantallav() {
        limpiaControles("infov");
        limpiaControles("packv");
        $("#monv").val(1);
        $("#monv").trigger('change');

        $("#fecv").val(formatoFecha(new Date(), 1)).attr("fecha", new Date());
        $("#impv").val(Cookies.get('idu'));
        $("#impv").trigger("change");
        $("#productosv tbody").empty();

        $(".oculta").each(function () {
            $(this).hide();
        });
        $("#sigv").prop("checked", false);
        $("#comev").prop("checked", false);
        $("#comiv").prop("checked", false);
        $("#covv").prop("checked", false);
        $("#copv").prop("checked", false);

        $("#cviv").prop("disabled", true);
        $("#cvov").prop("disabled", true);
        $("#cpiv").prop("disabled", true);
        $("#cpov").prop("disabled", true);

        $("#idrv").val("");
        $("#limpsv").val("");
        $("#tablav").val("");

        $("#tabv").removeClass("nav-tabs");
        $(".tab-content").removeClass("border").removeClass("py-3").removeClass("px-2");
        $(".tabulav").hide();
        $("#inbv").removeClass("active");
        $("#ipkv").removeClass("active");
        $("#infov").addClass("active");
        $("#packv").removeClass("active").addClass("fade");
    }
    function GeneraPDF() {
        get('/ws/registros.aspx/GeneraPdf', JSON.stringify({ id: $("#idr").val(), tipo: $("#mod").val() }))
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
                            $("#pathEmail").val(res.Info);
                            $("#Reportelabel").text($("#mod option:selected").text());
                            $("#ContentReporte").height(height);
                            $("#ContentReporte").html($obj);
                            $('#ModalReporte').modal();
                        }
                    }
                    else {
                        Alerta("Error No es posible generar el PDF");
                    }
                    //Alerta("El PDF se envió correctamente<br><span style='font-size:85%'>Puede descargar el documento dando clic <a download='doc.pdf' href='/tmp/" + res.Info + "' id = 'dd'" + $("#idr").val() + "'>aquí</a></span>");
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible generar el PDF<br />" + error);
            });
    }
    function cargaProductodes(des) {
        get('/ws/productos.aspx/ConsultarD', JSON.stringify({ des: des }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length > 0) {
                            $(res.Info).each(function () {
                                $("#codpimp").val(this.copro);
                                $("#nompimp").val(this.pro);
                                $("#idpimp").val(this.id);
                                $("#ump").val(this.um);
                                $("#ump").trigger("change");
                            });
                        } else {
                            Alerta("El producto ingresado no existe, debe de darlo de alta en el mantenimiento<br />" + error, "ERROR!");
                        }
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible cargar el listado de prodcto<br />" + error, "ERROR!");
            });
    }
    function cargaAlmacenes() {
        ddAlmacen = "#alm";
        ddAlmacene = "#alme";
        cargaAlmacenesXUsuario();

    }
    function cargaEspecies(id) {
        $("#esp").empty().append('<option value=""></option>');
        $("#espe").empty().append('<option value=""></option>');
        $("#espv").empty().append('<option value=""></option>');
        $("#espc").empty().append('<option value=""></option>');
        get('/ws/especies.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        $("#esp").append('<option value="' + this.id + '">' + this.esp + '</option>');
                        $("#espe").append('<option value="' + this.id + '">' + this.esp + '</option>');
                        $("#especieP").append('<option value="' + this.id + '">' + this.esp + '</option>');
                        $("#espv").append('<option value="' + this.id + '">' + this.esp + '</option>');
                        $("#especieP").append('<option value="' + this.id + '">' + this.esp + '</option>');
                        $("#espc").append('<option value="' + this.id + '">' + this.esp + '</option>');
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
    function cargaEmbalaje(id) {
        $("#embp").empty().append('<option value=""></option>');
        $("#embpe").empty().append('<option value=""></option>');
        get('/ws/embalaje.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        $("#embp").append('<option value="' + this.id + '">' + this.emb + '</option>');
                        $("#embpe").append('<option value="' + this.id + '">' + this.emb + '</option>');
                        $("#embajaleP").append('<option value="' + this.id + '">' + this.emb + '</option>');
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
    function cargaCalibres(id) {
        $("#cal").empty().append('<option value=""></option>');
        $("#cale").empty().append('<option value=""></option>');
        get('/ws/calibre.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        $("#cal").append('<option value="' + this.id + '">' + this.cal + '</option>');
                        $("#cale").append('<option value="' + this.id + '">' + this.cal + '</option>');
                        $("#calibreP").append('<option value="' + this.id + '">' + this.cal + '</option>');
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
    function cargaCalidades(id, idesp) {
        $("#cali").empty().append('<option value=""></option>');
        $("#calie").empty().append('<option value=""></option>');

        get('/ws/calidad.aspx/Consultar', JSON.stringify({ id: id, idesp: idesp }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        $("#cali").append('<option value="' + this.id + '">' + this.cal + '</option>');
                        $("#calie").append('<option value="' + this.id + '">' + this.cal + '</option>');
                        $("#calidadP").append('<option value="' + this.id + '">' + this.cal + '</option>');
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
    function cargaVariedades(id, idesp) {
        $("#var").empty().append('<option value=""></option>');
        $("#vare").empty().append('<option value=""></option>');
        get('/ws/variedades.aspx/Consultar', JSON.stringify({ id: id, idesp: idesp }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        $("#var").append('<option value="' + this.id + '">' + this.var + '</option>');
                        $("#vare").append('<option value="' + this.id + '">' + this.var + '</option>');
                        $("#variedadP").append('<option value="' + this.id + '">' + this.var + '</option>');
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

    function cargaPesos(id) {
        get('/ws/peso.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $(res.Info).each(function () {
                        $("#peso").append('<option value="' + this.id + '">' + this.peso + " " + this.nom + '</option>');

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

    function cargaEtiquetas(id) {
        get('/ws/etiqueta.aspx/Consultar', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    $("#eti").empty().append('<option value=""></option>');
                    $(res.Info).each(function () {
                        $("#eti").append('<option value="' + this.id + '">' + this.eti + '</option>');
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

    function GeneraPDFV() {
        get('/ws/registros.aspx/GeneraPdf', JSON.stringify({ id: $("#idrv").val(), tipo: $("#modv").val() }))
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
                    //Alerta("El PDF se envió correctamente<br><span style='font-size:85%'>Puede descargar el documento dando clic <a download='doc.pdf' href='/tmp/" + res.Info + "' id = 'dd'" + $("#idr").val() + "'>aquí</a></span>");
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible generar el PDF<br />" + error);
            });
    }
    function calculaTotales() {
        let imp;

        imp = 0;

        $("#productos tbody tr").each(function () {
            imp += parseFloat(this.cells[7].innerText.replace(/,/g, ''));
        });

        $("#total").val(formatoMoneda(imp, 2, true));

    }

    /*Facturas*/
    function cargaUnidadesMedidaf(id, um) {
        get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#selum" + id).empty().append('<option value="0">Seleccionar</option>');
                        $.each(res.Info, function () {
                            $("#selum" + id).append('<option value="' + this.id + '">' + this.um + '</option>');
                        });
                        $("#selum" + id).val(um);
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            });
    }
    function cargaUnidadesMedidafe(id, um) {
        get('/ws/unidadesmedida.aspx/Consultar', JSON.stringify({ id: 0 }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {

                        $("#selumfe" + id).empty().append('<option value="0">Seleccionar</option>');
                        $.each(res.Info, function () {
                            $("#selumfe" + id).append('<option value="' + this.id + '">' + this.um + '</option>');
                        });
                        $("#selumfe" + id).val(um);
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
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
    function editaRegistroDocReg(idfac, idreg) {
        $("#productosedit tbody").empty();
        var st = 0;
        var t = 0;
        get('/ws/registros.aspx/ConsultarDocReg', JSON.stringify({ idfac: idfac, idreg: idreg }))
            .then(function (res) {
                let id;
                let j = 1;
                let ancho = "style='width:500px'";
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#meditfacturas").modal({ backdrop: 'static', keyboard: false });
                        $("#meditfacturas").show();
                        $("#iddocreg").val(res.Info.docreg.idreg);
                        $("#idfac").val(res.Info.docreg.id);
                        $("#tcfe").val(res.Info.docreg.tipcomp);
                        $("#tcfe").trigger("change");
                        $("#tcife").val(res.Info.docreg.tipcos);
                        $("#tcife").trigger("change");
                        $("#fecvige").val(formatoFecha(res.Info.docreg.fecvig, 1)).attr("fecha", new Date(res.Info.docreg.fecvig));
                        $("#serfe").val(res.Info.docreg.ser);
                        $("#numfe").val(res.Info.docreg.num);
                        $("#fecfe").val(formatoFecha(res.Info.docreg.fec, 1)).attr("fecha", new Date(res.Info.docreg.fec));
                        $("#monfe").val(res.Info.docreg.idm);
                        $("#docfe").val(res.Info.docreg.doc);
                        $("#idproe").val(res.Info.docreg.idp);
                        $("#idproe").trigger('change');
                        $("#rucfe").val(res.Info.exp.ruc);
                        $("#monfe").val(res.Info.docreg.idm);
                        $("#monfe").trigger('change');
                        $("#raze").val(res.Info.exp.razs);
                        $("#impface").val(res.Info.docreg.impfac);
                        $("#cantfe").val(res.Info.docreg.can);
                        $("#cosunie").val(res.Info.docreg.couni);
                        $("#tipome").val(res.Info.docreg.tipm);

                        let fila2 = "";

                        $("#productosedit tbody").empty();
                        $.each(res.Info.detdr, function () {
                            var selum = "selumfe" + j;
                            console.log(this.des);
                            fila2 = '<tr id="tr' + this.codp + '"><td style="display:none;" data-camp="id">' + this.idprod + '</td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" value="' + this.codp + '"></td>' +
                                '<td data-camp="" class="text-center  tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 des"' + ancho+' value="' + this.des + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><select class="text-xs form-control unm" id="' + selum + '"></td>' +
                                '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 can" value="' + this.can + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 pre" value="' + this.pre + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 sub" value="' + this.sub + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                                '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 tot" value="' + this.tot + '"></td>' +
                                '</tr> ';

                            $("#productosedit tbody").append(fila2);
                            cargaUnidadesMedidafe(j, this.um);
                            ++j;
                            st = st + this.sub;
                            t = t + this.tot;
                        });
                        $("#subtotalded").val(formatoMoneda(st, 2, true));

                        $("#totalded").val(formatoMoneda(t, 2, true));
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
    function cargaPckingfac(id) {
        let j = 1;

        $("#productosf tbody").empty();
        var st = 0;
        var t = 0;
        get('/ws/registros.aspx/packingdet', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    let rb = $('input:radio[name=tipom]:checked').val();
                    $(res.Info).each(function () {
                        let fila = "";
                        let ancho = "style ='width:250px'";
                        $("#ump").val(this.um);
                        $("#ump").trigger("change");
                        var selum = "selum" + j;
                        var tot = formatoMoneda(this.tot, 2, true);
                        var pre = formatoMoneda(this.pre, 2, true);
                        var sub = formatoMoneda(this.sub, 2, true);

                        if ($("#modv").val() === "2" || $("#modv").val() === "3") {
                            if (rb === "1") {
                                fila += '<tr id="tr' + this.idprod + '"><td style="display:none;" data-camp="id">' + this.idprod + '</td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><select class="text-xs form-control unm" readonly = "readonly" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center  tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 des"' + ancho + '  readonly="readonly" value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 can" value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 pre" value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 sub" readonly= "readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 tot" readonly="readonly" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            } else if (rb === "2") {
                                fila += '<tr id="tr' + this.idprod + '"><td style="display:none;" data-camp="id">' + this.idprod + '</td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><select class="text-xs form-control unm" disabled="disabled" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 des"' + ancho + ' readonly="readonly" value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 can"  readonly="readonly" value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 pre" readonly="readonly" value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 sub" readonly="readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 tot" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            }
                            //se descomenta nuevamente este segmento
                            else if (rb === "3") {
                                fila += '<tr id="tr' + this.idprod + '" style="display:none;"><td style="display:none;" data-camp="id">' + this.idprod + '</td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp"  value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><select class="text-xs form-control unm" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class=" text-xs form-control form-control-sm mb-2 mr-sm-2 des" ' + ancho + '  value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 can"  readonly="readonly" value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 pre"  readonly="readonly" value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 sub"  readonly="readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 ivg"  readonly="readonly" value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 tot" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            }
                        } else {
                            if (rb === "1") {
                                fila += '<tr id="tr' + this.idprod + '"><td style="display:none;" data-camp="id">' + this.idprod + '</td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><select class="text-xs form-control unm" disabled="disabled" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center  tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 des" ' + ancho + ' readonly="readonly" value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 can" value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 pre" value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 sub" readonly="readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 tot" readonly="readonly" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            } else if (rb === "2") {
                                fila += '<tr id="tr' + this.idprod + '"><td style="display:none;" data-camp="id">' + this.idprod + '</td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><select class="text-xs form-control unm" disabled="disabled" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center  tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 des" ' + ancho + ' readonly="readonly" value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 can"  readonly="readonly" value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 pre"  readonly="readonly" value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 sub"  readonly="readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class=" text-xs form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 tot" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            }
                            //Se descomenta nuevamente esta zona
                            else if (rb === "3") {
                                var tot = formatoMoneda(this.tot, 2, true);
                                var pre = formatoMoneda(this.pre, 2, true);
                                var sub = formatoMoneda(this.sub, 2, true);
                                fila += '<tr id="tr' + this.idprod + '" style="display:none;"><td style="display:none;" data-camp="id">' + this.idprod + '</td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp"  value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><select class="text-xs form-control unm" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class=" text-xs form-control form-control-sm mb-2 mr-sm-2 des"  ' + ancho + ' value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 can"  readonly="readonly" value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 pre"  readonly="readonly" value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 sub"  readonly="readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 ivg"  readonly="readonly" value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 tot" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            }
                        }

                        $("#productosf tbody").append(fila);
                        cargaUnidadesMedidaf(j, this.um);
                        ++j;
                    });
                    if (rb == 3) {
                        fila = "";
                        fila += '<tr id="tr"><td style="display:none;" data-camp="id"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp"></td>' +
                            '<td data-camp="" class="text-center tdp"><select class="form-control unm" id="selum1"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 des"></td>' +

                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 can"  readonly="readonly" value="' + 1 + '"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub" value="' + st + '"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tot" value="' + t + '"></td>' +
                            '</tr> ';
                        $("#productosf tbody").append(fila);
                        cargaUnidadesMedidaf(1, 0);
                    }
                    $("#subtotalde").val(formatoMoneda(st, 2, true));

                    $("#totalde").val(formatoMoneda(t, 2, true));
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta(error, "ERROR!");
            });
    }
    function cargaPckingfaccant(id) {
        let cant = 0;
        get('/ws/registros.aspx/packingdet', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {

                    $(res.Info).each(function () {
                        cant++;

                    });
                    $("#cantf").val(cant);
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta(error, "ERROR!");
            });
    }

    function cargadetbasicfac(id) {
        let j = 1;

        $("#productosf tbody").empty();
        var st = 0;
        var t = 0;
        get('/ws/registros.aspx/registrodet', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    let rb = $('input:radio[name=tipom]:checked').val();
                    $(res.Info).each(function () {
                        let fila = "";
                        let ancho = "style='width:400px'";
                        $("#ump").val(this.um);
                        $("#ump").trigger("change");
                        var selum = "selum" + j;
                        var tot = formatoMoneda(this.tot, 2, true);
                        var pre = formatoMoneda(this.pre, 2, true);
                        var sub = formatoMoneda(this.sub, 2, true);


                        if ($("#modv").val() === "2" || $("#modv").val() === "3") {
                            if (rb === "1") {
                                fila += '<tr id="tr' + this.codp + '"><td style="display:none;" data-camp="id">' + 0 + '</td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><select class="text-xs form-control unm" disabled="disabled" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center  tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 des" ' + ancho + 'readonly="readonly" value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 can" value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 pre" value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 sub" readonly="readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class=" text-xs  form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 tot" readonly="readonly" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            } else if (rb === "2") {
                                fila += '<tr id="tr' + this.idprod + '"><td style="display:none;" data-camp="id">' + 0 + '</td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><select class="text-xs form-control unm" disbled="disabled" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center text-xs tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 des"  ' + ancho + 'readonly="readonly" value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 can"  readonly="readonly" value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 pre"  readonly="readonly" value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 sub"  readonly="readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 tot" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            }
                            //Se descomenta nuevamente esta fila
                            //Se comenta otra vez esta fila 
                            /*
                            else if (rb === "3") {
                                fila += '<tr id="tr' + this.idprod + '"><td style="display:none;" data-camp="id">' + 0 + '</td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp"  value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><select class="form-control unm" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 des"  value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 can"  readonly="readonly" value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre"  readonly="readonly" value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub"  readonly="readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg"  readonly="readonly" value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tot" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            }
                            */

                        } else {
                            if (rb === "1") {
                                fila += '<tr id="tr' + this.codp + '"><td style="display:none;" data-camp="id">' + 0 + '</td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><select class="text-xs form-control unm" disabled="disabled" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class=" text-xs form-control form-control-sm mb-2 mr-sm-2 des" ' + ancho + ' readonly="readonly" value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 can"  value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 pre"  value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 sub" readonly="readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 ivg"  value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 tot" readonly="readonly" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            } else if (rb === "2") {
                                fila += '<tr id="tr' + this.idprod + '"><td style="display:none;" data-camp="id">' + 0 + '</td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" readonly="readonly" value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><select class="text-xs form-control unm" disabled="disabled" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center  tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 des" ' + ancho + ' readonly="readonly" value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 can"  readonly="readonly" value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 pre"  readonly="readonly" value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 sub"  readonly="readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 ivg" value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="text-xs form-control form-control-sm mb-2 mr-sm-2 tot" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            }
                            //se descomenta de nuevo esta fila
                            //Se comenta otra vez esta fila
                            /*
                            else if (rb === "3") {
                                fila += '<tr id="tr' + this.idprod + '"><td style="display:none;" data-camp="id">' + 0 + '</td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp" value="' + this.codp + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><select class="form-control unm" id="' + selum + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 des"  value="' + this.des + '"></td>' +

                                    '<td data-camp="" class="text-center tdp" style="display:none;"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 can"  readonly="readonly" value="' + this.can + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre"  readonly="readonly" value="' + pre + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub"  readonly="readonly" value="' + sub + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg"  readonly="readonly" value="' + this.ivg + '"></td>' +
                                    '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tot" value="' + tot + '"></td>' +
                                    '</tr> ';
                                st = st + this.sub;
                                t = t + this.tot;
                            }
                            */
                        }

                        $("#productosf tbody").append(fila);
                        cargaUnidadesMedidaf(j, this.um);
                        ++j;
                    });

                    if (rb == 3) {
                        fila = "";
                        fila += '<tr id="tr"><td style="display:none;" data-camp="id"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 codp"></td>' +
                            '<td data-camp="" class="text-center tdp"><select class="form-control unm" id="selum1"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 des"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 can"  readonly="readonly" value="' + 1 + '"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 pre"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 sub" value="' + st + '"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 ivg" value="0"></td>' +
                            '<td data-camp="" class="text-center tdp"><input type="text" class="form-control form-control-sm mb-2 mr-sm-2 tot" value="' + t + '"></td>' +
                            '</tr> ';
                        $("#productosf tbody").append(fila);
                        cargaUnidadesMedidaf(1, 0);
                    }
                    $("#subtotalde").val(formatoMoneda(st, 2, true));

                    $("#totalde").val(formatoMoneda(t, 2, true));

                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta(error, "ERROR!");
            });
    }

    function actualizaTotalesFact() {
        let subtotal = 0;
        let total = 0;
        $("#productosf tbody tr").each(function (index) {
            $(this).children("td").each(function (index2) {
                switch (index2) {
                    case 6: // Subtotal
                        subtotal += parseFloat($(this)[0].children[0].value.replace(/,/g, ''));
                        console.log($(this)[0].children[0].value);
                        break;
                    case 8: //Total
                        total += parseFloat($(this)[0].children[0].value.replace(/,/g, ''));
                        console.log($(this)[0].children[0].value);
                        break;

                    default:
                }
            });
        });
        $("#subtotalde").val(formatoMoneda(subtotal, 2, true));

        $("#totalde").val(formatoMoneda(total, 2, true));

    }

    function actualizaTotalesFacteE() {
        let subtotal = 0;
        let total = 0;
        $("#productosedit tbody tr").each(function (index) {
            $(this).children("td").each(function (index2) {
                switch (index2) {
                    case 6: // Subtotal
                        subtotal += parseFloat($(this)[0].children[0].value.replace(/,/g, ''));
                        console.log($(this)[0].children[0].value);
                        break;
                    case 8: //Total
                        total += parseFloat($(this)[0].children[0].value.replace(/,/g, ''));
                        console.log($(this)[0].children[0].value);
                        break;

                    default:
                }
            });
        });
        $("#subtotalded").val(formatoMoneda(subtotal, 2, true));

        $("#totalded").val(formatoMoneda(total, 2, true));

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

                        //    if (this.desc.toUpperCase() === "FACTURA") {
                        //        $("#tcf").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //        $("#tcfe").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //    } else if (this.desc.toUpperCase() === "BOLETA") {
                        //        $("#tcf").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //        $("#tcfe").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //    } else if (this.desc.toUpperCase() === "NOTA DE CREDITO") {
                        //        $("#tcf").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //        $("#tcfe").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //    } else if (this.desc.toUpperCase() === "OTRO DOCUMENTO") {
                        //        $("#tcf").append('<option value="' + this.id + '">' + this.desc + '</option>');
                        //        $("#tcfe").append('<option value="' + this.id + '">' + this.desc + '</option>');
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

    function guardaDocReg() {
        let reg = new Object();
        let detalle = new Array();
        let registro = new Object();
        let facturas = new Array();

        var from = $("#fecf").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);
        var from2 = $("#fecvig").val().split("/");
        var f2 = new Date(from2[2], from2[1] - 1, from2[0]);
        if ($("#fecvig").val() != "") {
            //reg.idreg = $("#idrv").val();
            reg.idreg = idImportacion;
            reg.tipcomp = $("#tcf").val();
            reg.tipcos = $("#tcif").val();
            reg.idm = $("#monf").val();
            reg.fec = f;
            reg.tdom = $("#tdom").val();
            reg.dua = $("#dua").val();
            reg.guia = $("#dua").val();
            reg.ser = $("#serf").val();
            reg.num = $("#numf").val().replace("?", "");
            reg.doc = $("#docf").val();
            reg.idp = $("#idpro").val();
            reg.tipm = $('input:radio[name=tipom]:checked').val();
            reg.impfac = $("#impfac").val() === "" ? 0 : $("#impfac").val();
            reg.can = $("#cantf").val() === "" ? 0 : $("#cantf").val();
            reg.couni = $("#cosuni").val() === "" ? 0 : $("#cosuni").val();
            if ($("#modv").val() === "2" || $("#modv").val() === "3") {
                reg.tot = $("#impcvdf").val().trim().replace(/,/g, '');;
            } else {
                reg.tot = 0;
            }
            reg.fecvig = f2;
            reg.edo = 1;
            reg.montpag = 0;
            let i = 1;
            $.each($("#productosf tbody tr"), function () {
                let det = new Object();
                /*Algoritmo anterior
                if (this.cells[0].innerText != "") {
                }
                */
                let $ivg = $(this).find('input.ivg').val();
                $ivg = $ivg.replace('%', '');
                det.idprod = $(this).find('input.codp').val();
                det.codp = $(this).find('input.codp').val();
                det.um = $(this).find('select.unm').val();
                det.des = $(this).find('input.des').val();

                det.can = $(this).find('input.can').val();
                det.pre = $(this).find('input.pre').val();
                det.sub = $(this).find('input.sub').val();
                det.ivg = $ivg;
                det.tot = $(this).find('input.tot').val();
                det.idreg = $("#idrv").val();

                detalle.push(det);

            });

            $.each($("#facas tbody tr"), function () {
                let fac = new Object();
                fac.idfas = this.cells[0].innerText;
                var fromFec = this.cells[2].innerText.split('/');
                var fec = new Date(fromFec[2], fromFec[1] - 1, fromFec[0]);
                fac.fec = fec;
                fac.montofac = this.cells[3].innerText;
                fac.idreg = $("#idrv").val();

                facturas.push(fac);
            });

            registro.docreg = reg;
            registro.detdr = detalle;
            registro.facdr = facturas;

            Swal.fire({
                title: 'Confirmación',
                html: '¿Confirma que desea agregar el registro ',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return fetch(`/ws/registros.aspx/InsertarDocReg`, {
                        method: 'POST', body: JSON.stringify({ info: JSON.stringify(registro) }), headers: { 'Content-Type': 'application/json' }
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
                        $("#productosf tbody").empty();
                        cargaFac($("#idrv").val());
                        limpiaControles("mnuefacturas");

                        $("input:radio").prop("checked", false);
                        $("#cxc").val(1);
                        $("# ").val(2);

                        $("#mnuefacturas").modal("toggle");

                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                }
            });
        } else {
            Alerta("Debe seleccionar la Fecha de Vigencia", "Error!", typIconoAlerta.error);
        }
    }
    function buscaProveedorruc(ruc) {
        get('/ws/exportadores.aspx/consultaFiltro', JSON.stringify({ info: ruc }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length === 1) {
                            $("#raz").val(res.Info[0].razs).trigger("change");
                            $("#idpro").val(res.Info[0].id);
                            $("#rucf").val(res.Info[0].ruc);
                            if (res.Info[0].tipodoc == 1) {
                                $("#docf").val("RUC");
                            } else if (res.Info[0].tipodoc == 2) {
                                $("#docf").val("DNI");
                            } else {
                                $("#docf").val("OTRO");
                            }
                            listdocreg(res.Info[0].id);

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
    function buscaProveedorazs(razs) {
        get('/ws/exportadores.aspx/consultaRazs', JSON.stringify({ info: razs }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length === 1) {
                            $("#raz").val(res.Info[0].razs).trigger("change");
                            $("#idpro").val(res.Info[0].id);
                            $("#rucf").val(res.Info[0].ruc);
                            if (res.Info[0].tipodoc == 1) {
                                $("#docf").val("RUC");
                            } else if (res.Info[0].tipodoc == 2) {
                                $("#docf").val("DNI");
                            } else {
                                $("#docf").val("OTRO");
                            }
                            listdocreg(res.Info[0].id);

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
    function buscaProveedorazse(razs) {
        get('/ws/exportadores.aspx/consultaRazs', JSON.stringify({ info: razs }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length === 1) {
                            $("#raze").val(res.Info[0].razs).trigger("change");
                            $("#idproe").val(res.Info[0].id);
                            $("#rucfe").val(res.Info[0].ruc);
                            if (res.Info[0].tipodoc == 1) {
                                $("#docfe").val("RUC");
                            } else if (res.Info[0].tipodoc == 2) {
                                $("#docfe").val("DNI");
                            } else {
                                $("#docfe").val("OTRO");
                            }

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
    function buscaProveedorruce(ruc) {
        get('/ws/exportadores.aspx/consultaFiltro', JSON.stringify({ info: ruc }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        if (res.Info.length === 1) {
                            $("#raze").val(res.Info[0].razs).trigger("change");
                            $("#idproe").val(res.Info[0].id);
                            $("#rucfe").val(res.Info[0].ruc);
                            if (res.Info[0].tipodoc == 1) {
                                $("#docfe").val("RUC");
                            } else if (res.Info[0].tipodoc == 2) {
                                $("#docfe").val("DNI");
                            } else {
                                $("#docfe").val("OTRO");
                            }

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

                exp.razs = $("#razsf").val();
                exp.ruc = $("#rucpf").val();
                exp.razc = $("#razcf").val();
                exp.dirf = $("#dirff").val();
                exp.dirc = $("#dircf").val();
                exp.idubi = $("#ubipf").val();
                exp.est = 1;
                exp.tipodoc = $("#tdf").val();

                let tip = new Object();
                tip.tip = $("#tipf").val();
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
    function comisionMontodf() {
        let mon;
        let tip;
        let tot;

        mon = $("#cvivdf").val().trim();
        if (mon === "")
            mon = 0;
        mon = parseFloat(mon);
        tip = $("#cvovdf").val();
        tot = 0;
        if (mon > 0 && tip !== "") {
            if (tip === "1") {//por unidad
                $("#productosf tbody tr").each(function () {
                    let cant = parseFloat($(this).find('input.can').val());
                    tot += cant * mon;

                });
            }
            else {
                $("#productosf tbody tr").each(function () {

                    let total = parseFloat($(this).find('input.tot').val());

                    tot += total * mon;

                });
            }
        }

        $("#impcvdf").val(formatoMoneda(tot, 2, true));
    }
    function comisionPorcentajedf() {
        let mon;
        let tip;
        let tot;

        mon = $("#cpivdf").val().trim();
        if (mon === "")
            mon = 0;
        mon = parseFloat(mon);
        tip = $("#cpovdf").val();
        tot = 0;

        if (mon > 0 && tip !== "") {
            $("#productosf tbody tr").each(function () {
                if (tip === "1") {//por unidad
                    let cant = parseFloat($(this).find('input.can').val());
                    tot += cant * (mon / 100);
                }
                else {
                    tot += (mon / 100) * parseFloat($(this).find('input.tot').val());
                }
            });
        }

        $("#impcvdf").val(formatoMoneda(tot, 2, true));
    }
    function updateDocReg() {
        let reg = new Object();
        let detalle = new Array();
        let registro = new Object();
        var from = $("#fecfe").val().split("/");
        var f = new Date(from[2], from[1] - 1, from[0]);
        var from2 = $("#fecvige").val().split("/");
        var f2 = new Date(from2[2], from2[1] - 1, from2[0]);
        if ($("#fecvige").val() != "") {
            reg.id = $("#idfac").val();
            reg.idreg = $("#iddocreg").val();
            reg.tipcomp = $("#tcfe").val();
            reg.tipcos = $("#tcife").val();
            reg.idm = $("#monfe").val();
            reg.fec = f;
            reg.ser = $("#serfe").val();
            reg.num = $("#numfe").val().replace("?", "");
            reg.doc = $("#docfe").val();
            reg.idp = $("#idproe").val();
            reg.tipm = $("#tipome").val();
            reg.impfac = $("#impface").val() === "" ? 0 : $("#impface").val();
            reg.can = $("#cantfe").val() === "" ? 0 : $("#cantfe").val();
            reg.couni = $("#cosunie").val() === "" ? 0 : $("#cosunie").val();
            if ($("#modv").val() === "2" || $("#modv").val() === "3") {
                reg.tot = $("#impcvdf").val().trim().replace(/,/g, '');;
            } else {
                reg.tot = 0;
            }
            reg.fecvig = f2;
            reg.montpag = 0;
            let i = 1;
            $.each($("#productosedit tbody tr"), function () {
                let det = new Object();
                det.idf = $("#idfac").val();
                det.idreg = $("#iddocreg").val();
                det.idprod = $(this).find('input.codp').val();
                det.codp = $(this).find('input.codp').val();
                det.des = $(this).find('input.des').val();
                det.um = $(this).find('select.unm').val();
                det.can = $(this).find('input.can').val();
                det.pre = $(this).find('input.pre').val();
                det.sub = $(this).find('input.sub').val();
                det.ivg = $(this).find('input.ivg').val();
                det.tot = $(this).find('input.tot').val();
                det.idreg = $("#iddocreg").val();

                detalle.push(det);
            });

            registro.docreg = reg;
            registro.detdr = detalle;

            Swal.fire({
                title: 'Confirmación',
                html: '¿Confirma que desea actualizar el registro ',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return fetch(`/ws/registros.aspx/ActualizarDocReg`, {
                        method: 'POST', body: JSON.stringify({ info: JSON.stringify(registro) }), headers: { 'Content-Type': 'application/json' }
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
                        Alerta("El registro se actualizo correctamente");
                        $("#productosedit tbody").empty();
                        cargaFac($("#idrv").val());
                        limpiaControles("meditfacturas");
                        $("input:radio").prop("checked", false);
                        $("#cxce").val(1);
                        $("#mte").val(2);

                        $("#meditfacturas").modal("toggle");

                    }
                    else {
                        Alerta(res.Mensaje, "Error!", typIconoAlerta.error);
                    }
                }
            });
        } else {
            Alerta("Debe seleccionar la Fecha de Vigencia", "Error!", typIconoAlerta.error);
        }
    }
    function listdocreg(id) {
        get('/ws/registros.aspx/ListarDocRegF', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#facaso").empty().append('<option value="0">Seleccionar</option>');
                        $.each(res.Info, function () {
                            console.log(res.Info);

                            $("#facaso").append('<option value="' + this.ID_FACTURA + '" fec="' + this.FECHAF + '" import="' + this.TOTAL + '">' + this.SERIEF + '-' + this.NUMEROF + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            });
    }
    function listdocF(id) {
        get('/ws/registros.aspx/ListarDocF', JSON.stringify({ id: id }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info !== null) {
                        $("#facaso").empty().append('<option value="0">Seleccionar</option>');
                        $.each(res.Info, function () {
                            console.log(res.Info);

                            $("#facaso").append('<option value="' + this.ID_FACTURA + '" fec="' + this.FECHAF + '" import="' + this.TOTAL + '">' + this.SERIEF + '-' + this.NUMEROF + '</option>');
                        });
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            });
    }

    /*Costos Importacion*/
    function guardaCosto(tipo) {
        let url;
        let costo = new Object();
        var f, h, from, hasta;
        if (tipo === 1) {
            from = $("#def").val().split("/");
            f = new Date(from[2], from[1] - 1, from[0]);
            hasta = $("#hasf").val().split("/");
            h = new Date(hasta[2], hasta[1] - 1, hasta[0]);
            costo.id = $("#idf").val();
            costo.idreg = $("#idr").val();
            costo.tip = $("#tipfl").val();
            costo.cos = 1;
            costo.um = $("#umfl").val();
            costo.imp = $("#impf").val().replace('/,/g', '');
            costo.des = f;
            costo.has = h;
        } else if (tipo === 2) {
            from = $("#deg").val().split("/");
            f = new Date(from[2], from[1] - 1, from[0]);
            hasta = $("#hasg").val().split("/");
            h = new Date(hasta[2], hasta[1] - 1, hasta[0]);
            costo.id = $("#idg").val();
            costo.idreg = $("#idr").val();
            costo.tip = $("#tipg").val();
            costo.cos = 2;
            costo.um = $("#umg").val();
            costo.imp = $("#impg").val().replace('/,/g', '');
            costo.des = f;
            costo.has = h;
        }
        url = costo.id === "0" ? "Insertar" : "Actualizar";

        get('/ws/CostoImp.aspx/' + url, JSON.stringify({ info: JSON.stringify(costo) }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    Alerta("El registro se guardó correctamente");
                    if (tipo === 1) {
                        $("#tipfl").val("");
                        $("#umfl").val("");
                        $("#impf").val("");
                        $("#def").val("");
                        $("#hasf").val("");
                        let param = new Object();
                        param.cos = 1;
                        param.idreg = $("#idr").val();
                        cargaCFL(param);
                    } else if (tipo === 2) {
                        $("#tipg").val("");
                        $("#umg").val("");
                        $("#impg").val("");
                        $("#deg").val("");
                        $("#hasg").val("");
                        let param1 = new Object();
                        param1.cos = 2;
                        param1.idreg = $("#idr").val();
                        cargaCG(param1);
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("no fue posible insertar la información <br />" + error, "ERROR!");
            });
    }
    function cargaCFL(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
            columnas: [
                { leyenda: 'Descripción', class: 'text-center', ordenable: false, columna: '', filtro: false },
                { leyenda: 'Unidad de Medida', class: 'text-center', ordenable: false, columna: 'UNIDAD_MEDIDA', filtro: false },
                { leyenda: 'Tarifa', class: 'text-center', ordenable: false, columna: 'IMPORTE', filtro: false },
                { leyenda: 'Desde', class: 'text-center', ordenable: false, columna: 'DESDE', filtro: false },
                { leyenda: 'Hasta', class: 'text-center', ordenable: false, columna: 'HASTA', filtro: false },
                { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
                { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
            ],
            modelo: [
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        return 'Flete Marino';
                    }
                }, { propiedad: 'UNIDAD_MEDIDA', class: 'text-center' },
                { propiedad: 'IMPORTE', class: 'text-center' },
                {
                    propiedad: 'DESDE', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        if (valor !== null)
                            return formatoFecha(valor, 1);
                    }
                },
                {
                    propiedad: 'HASTA', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        if (valor !== null)
                            return formatoFecha(valor, 1);
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");

                        $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                            editaCosto(obj.ID_COSTOIMP, obj.ID_REGISTRO, 1);
                        });
                        container.appendChild(edita);

                        return container;
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        elimina = document.createElement("i");

                        $(elimina).addClass("fa fa-trash text-danger").prop("title", "Elimina").on("click", function () {
                            eliminaCosto(obj.ID_COSTOIMP, obj.ID_REGISTRO, 1);
                        });
                        container.appendChild(elimina);

                        return container;
                    }
                }
            ],
            url: '/ws/CostoImp.aspx/Listar',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'PESO',
            loader: "pre0",
            columna_orden: 'DESC'
        };

        $("#fmarino").MALCO(data);
    }
    function cargaCG(fil = "") {
        let param = new Object();

        param.where = fil;
        var data = {
            class: 'table table-sm table-bordered table-hover table-striped table-condensed table-responsive',
            columnas: [
                { leyenda: 'Descripción', class: 'text-center', ordenable: false, columna: '', filtro: false },
                { leyenda: 'Unidad de Medida', class: 'text-center', ordenable: false, columna: 'UNIDAD_MEDIDA', filtro: false },
                { leyenda: 'Tarifa', class: 'text-center', ordenable: false, columna: 'IMPORTE', filtro: false },
                { leyenda: 'Desde', class: 'text-center', ordenable: false, columna: 'DESDE', filtro: false },
                { leyenda: 'Hasta', class: 'text-center', ordenable: false, columna: 'HASTA', filtro: false },
                { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' },
                { leyenda: '', class: 'text-center', style: 'color:#fff; width:30px"', ordenable: false, filtro: false, columna: '' }
            ],
            modelo: [
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        return 'Gasto Operador';
                    }
                }, { propiedad: 'UNIDAD_MEDIDA', class: 'text-center' },
                { propiedad: 'IMPORTE', class: 'text-center' },
                {
                    propiedad: 'DESDE', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        if (valor !== null)
                            return formatoFecha(valor, 1);
                    }
                },
                {
                    propiedad: 'HASTA', class: 'tdp', style: 'text-align:center;', formato: function (tr, obj, valor) {
                        if (valor !== null)
                            return formatoFecha(valor, 1);
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        edita = document.createElement("i");

                        $(edita).addClass("fa fa-edit").prop("title", "Editar").on("click", function () {
                            editaCosto(obj.ID_COSTOIMP, obj.ID_REGISTRO, 2);
                        });
                        container.appendChild(edita);

                        return container;
                    }
                },
                {
                    propiedad: '', class: 'text-center tdp', formato(tr, obj) {
                        container = document.createElement("div");
                        elimina = document.createElement("i");

                        $(elimina).addClass("fa fa-trash text-danger").prop("title", "Elimina").on("click", function () {
                            eliminaCosto(obj.ID_COSTOIMP, obj.ID_REGISTRO, 2);
                        });
                        container.appendChild(elimina);

                        return container;
                    }
                }
            ],
            url: '/ws/CostoImp.aspx/Listar',
            parametros: JSON.stringify(param),
            paginable: true,
            filtrable: false,
            limite: [10, 25, 50],
            columna: 'DESDE',
            loader: "pre0",
            columna_orden: 'DESC'
        };

        $("#gasto").MALCO(data);
    }
    function editaCosto(id, idreg, tipo) {
        get('/ws/CostoImp.aspx/Consultar', JSON.stringify({ id: id, idr: idreg }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (res.Info.length > 0) {
                        console.log("Tipo" + tipo);
                        if (tipo === 1) {
                            $("#tipfl").val(res.Info[0].tip);
                            $("#umfl").val(res.Info[0].um);
                            $("#impf").val(res.Info[0].imp);
                            $("#def").datepicker().value(new Date(formatoFecha(res.Info[0].des, 2)));
                            $("#hasf").datepicker().value(new Date(formatoFecha(res.Info[0].has, 2)));
                            $("#idf").val(id);
                        } else if (tipo === 2) {
                            $("#tipg").val(res.Info[0].tip);
                            $("#umg").val(res.Info[0].um);
                            $("#impg").val(res.Info[0].imp);
                            $("#deg").datepicker().value(new Date(formatoFecha(res.Info[0].des, 2)));
                            $("#hasg").datepicker().value(new Date(formatoFecha(res.Info[0].has, 2)));
                            $("#idg").val(id);
                        }
                    }
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            });
    }
    function eliminaCosto(id, idreg, tipo) {
        get('/ws/CostoImp.aspx/Eliminar', JSON.stringify({ id: id, idreg: idreg }))
            .then(function (res) {
                if (res.Respuesta === 1) {
                    if (tipo === 1) {
                        let param = new Object();
                        param.cos = 1;
                        param.idreg = $("#id").val();
                        cargaCFL(param);
                    } else if (tipo === 2) {
                        let param1 = new Object();
                        param1.cos = 1;
                        param1.idreg = $("#idr").val();
                        cargaCG(param1);
                    }
                    Alerta("El registro se eliminó correctamente");
                }
                else {
                    Alerta(res.Mensaje, "ERROR!");
                }
            })
            .catch(function (error) {
                Alerta("No fue posible eliminar el costo especificado<br />" + error);
            });
    }

    function restablecerTabla() {
        $("#ordenes2 table tbody").children("tr").each(function (index) {
            $(this).show();
        });
    }

    function restablecerTablaD() {
        $("#MALCO-infofac tbody").children("tr").each(function (index) {
            $(this).show();
        });
    }
    function establecerFiltrosD(tipoFiltro) {
    }

    function establecerFiltrosD_bak(tipoFiltro) {
        if (tipoFiltro == 0) {
            //TODOS
            $("#filtroTodosD").show();

            $("#filtroFechaInicioD").hide();
            $("#filtroFechaFinD").hide();

            $("#filtroValorD").hide();

            $("#filtrarBtnD").hide();
        }
        else if (tipoFiltro == 1) {
            //NUMERO O/C
            $("#filtroValorD").show();

            $("#filtroFechaInicioD").hide();
            $("#filtroFechaFinD").hide();

            $("#filtroTodosD").hide();

            $("#filtrarBtnD").show();
        }
        else if (tipoFiltro == 2) {
            //NUMERO PEDIDO
            $("#filtroValorD").show();

            $("#filtroFechaInicioD").hide();
            $("#filtroFechaFinD").hide();

            $("#filtroTodosD").hide();

            $("#filtrarBtnD").show();
        }
        else if (tipoFiltro == 3) {
            //FECHA EMISION
            $("#filtroFechaInicioD").show();
            $("#filtroFechaFinD").show();

            $("#filtroValorD").hide();

            $("#filtroTodosD").hide();

            $("#filtroEstadoD").hide();

            $("#filtrarBtnD").show();
        }

    }

    function llenarDetalleTablaPrincipal() {
        $("#ordenes2 table tbody").children("tr").each(function (index) {

            $(this).children("td").each(function (index) {
                if (index == 8) {
                    let tipo = $(this).attr("especie");
                    if (tipo == "SUBTABLADP" || tipo == "SUBTABLADR") {
                        let fila = $($(this).parent()).children();
                        let idRegistro = $(this).parent().attr("registro");
                        let especie = $(fila[8]).text();
                        let moneda = $(fila[10]).text();
                        let estado = $(fila[11]).text();
                        get('/ws/registros.aspx/ListarDetalleImportExportVariasEspecies', JSON.stringify({ idRegistro: idRegistro, tipo: tipo }))
                            .then(function (res) {
                                var r = JSON.stringify(res);
                                if (r.startsWith('[{"ERROR":', 0)) {
                                    var err = "";
                                    $(res).each(function () {
                                        err += this.Error;
                                    });
                                    Alerta(err, "ERROR 2!");
                                } else {
                                    let newEspecie = "";
                                    let newMonto = "";
                                    let newMoneda = "";
                                    let newEstado = "";
                                    let tmpEstado = "";
                                    let total = 0.0;
                                    $(res).each(function () {
                                        newEspecie += "</br>" + this.ESPECIE;
                                        newMonto += "</br>" + formatoMoneda(this.MONTO, 2, true);
                                        newMoneda += "</br>" + this.MONEDA;
                                        newEstado += "</br>";

                                        if (this.ESTATUS === 1)
                                            tmpEstado = "Nuevo";
                                        if (this.ESTATUS === 2)
                                            tmpEstado = 'En Proceso';
                                        if (this.ESTATUS === 3 && (this.TIPOOPERACION === 1 || this.TIPOOPERACION === 4))
                                            tmpEstado = 'Ingresado a Cámara';
                                        if (this.ESTATUS === 3 && (this.TIPOOPERACION === 2 || this.TIPOOPERACION === 3))
                                            tmpEstado = 'Enviado a Destino';

                                        newEstado += tmpEstado;
                                        total += this.MONTO;
                                    });
                                    $(fila[8]).html(especie + newEspecie);
                                    $(fila[9]).html(newMonto);
                                    $(fila[10]).html(moneda + newMoneda);
                                    $(fila[11]).html(estado + newEstado);
                                }
                            }).catch(function (error) {
                                Alerta(error, "ERROR  3!");

                            });
                    }
                }
            });
        });
    }

    /*AGREGADO ANULAR REGISTRO*/
    function anularReg(id,estd) {
      
        Swal.fire({
            title: '¿Estás seguro de anular la importación?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText :'Cancelar',
            confirmButtonText: 'Sí, anúlala!'
        }).then((result) => {
            if (result.isConfirmed) {
                get('/ws/registros.aspx/AnularRegistro', JSON.stringify({ id: id, status: estd }))
                    .then(function (res) {
                        if (res.Info === 1) {

                            Alerta("La importación/exportación ha sido anulada");
                            cargaTablaPrincipal();
                        }
                        else {
                            Alerta(res.Mensaje, "ERROR!");
                        }
                    })
                    .catch(function (error) {
                        Alerta("Error al actualizar el estado de la i/e<br />" + error);
                    });
            }
        });   
    };

    /*AGREGADO LISTADO DE PUERTO Y AGREGAR*/
  



    /**
     *  EN DESUSO
     *  **/
    function establecerFiltros(tipoFiltro) {
        //if (tipoFiltro == 0) {
        //    //TODOS
        //    $("#filtroTodos").show();

        //    $("#filtroFechaInicioDiv").hide();
        //    $("#filtroFechaFinDiv").hide();
        //    $("#filtroFechaInicio").hide();
        //    $("#filtroFechaFin").hide();

        //    $("#filtroValor").hide();

        //    $("#filtroEstado").hide();

        //    $("#filtrarBtn").hide();
        //}
        //else if (tipoFiltro == 1) {
        //    //NUMERO O/C
        //    $("#filtroValor").show();

        //    $("#filtroFechaInicio").hide();
        //    $("#filtroFechaFin").hide();
        //    $("#filtroFechaInicioDiv").hide();
        //    $("#filtroFechaFinDiv").hide();

        //    $("#filtroTodos").hide();

        //    $("#filtroEstado").hide();

        //    $("#filtrarBtn").show();
        //}
        //else if (tipoFiltro == 2) {
        //    //NUMERO PEDIDO
        //    $("#filtroValor").show();

        //    $("#filtroFechaInicio").hide();
        //    $("#filtroFechaFin").hide();
        //    $("#filtroFechaInicioDiv").hide();
        //    $("#filtroFechaFinDiv").hide();

        //    $("#filtroTodos").hide();

        //    $("#filtroEstado").hide();

        //    $("#filtrarBtn").show();
        //}
        //else if (tipoFiltro == 3) {
        //    //FECHA EMISION
        //    $("#filtroFechaInicio").show();
        //    $("#filtroFechaFin").show();
        //    $("#filtroFechaInicioDiv").show();
        //    $("#filtroFechaFinDiv").show();

        //    $("#filtroValor").hide();

        //    $("#filtroTodos").hide();

        //    $("#filtroEstado").hide();

        //    $("#filtrarBtn").show();
        //}
        //else if (tipoFiltro == 4) {
        //    //PROVEEDOR
        //    $("#filtroValor").show();

        //    $("#filtroFechaInicio").hide();
        //    $("#filtroFechaFin").hide();
        //    $("#filtroFechaInicioDiv").hide();
        //    $("#filtroFechaFinDiv").hide();

        //    $("#filtroTodos").hide();

        //    $("#filtroEstado").hide();

        //    $("#filtrarBtn").show();
        //}
        //else if (tipoFiltro == 5) {
        //    //ESTADO
        //    $("#filtroEstado").show();

        //    $("#filtroFechaInicio").hide();
        //    $("#filtroFechaFin").hide();

        //    $("#filtroTodos").hide();

        //    $("#filtroValor").hide();

        //    $("#filtrarBtn").show();

        //}
    }



})(jQuery);